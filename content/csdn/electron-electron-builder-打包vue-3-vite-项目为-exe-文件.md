---
title: "【electron】electron-builder 打包Vue 3 + Vite 项目为 .exe 文件"
date: "2025-10-13"
tags: []
csdnUrl: "https://blog.csdn.net/weixin_63110324/article/details/153181870"
source: csdn
---
## 项目架构
 
Vue 3 + TypeScript + Vite 
  Vue.js: ^3.5.17Vue Router: ^4.5.1TypeScript: ~5.8.0Element Plus: ^2.10.4Vite: ^7.0.0 @types/node: ^22.15.32@tsconfig/node22: ^22.0.2Electron: ^38.2.2Electron Builder: ^26.0.12 

## 一、Electron 桌面应用打包流程
 

#### 1.先保证vue项目可运行，下载打包工具
 
一定要本地先跑一遍vue项目，保证没有本地运行错误 

```javascript
npm i -D electron  
npm i -D electron-builder
```
 

#### 2.在项目根目录下（在你能看到vite.cnfig.ts文件的目录下，不是src目录下）创建main.js
 

```javascript
// main.js
// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 加载 index.html
  mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html')); //使用绝对路径

  // 打开开发工具
  // mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。

```
 

#### 3.在根目录下创建preload.js
 

```javascript
// preload.js

// All the Node.js APIs are available in the preload process.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })
  
```
 

#### 4.在原有package.json文件种，添加electron启动命令
 

```javascript
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite build",
    "type-check": "vue-tsc --build",
    "lint": "eslint . --fix",
    "clean": "rm -rf dist node_modules",
    "start": "electron ." //对比参考自己的scripts设置，其他命令可以不做修改，主要是添加此命令，方便之后npm run start直接启动exe文件
  }
```
 

#### 5.运行 npm run build, 生成dist文件。
 

![image](https://i-blog.csdnimg.cn/direct/f3d40d8a26424ea9ba419139ee0a861e.png)
 

#### 6.最后在终端运行 npm run start，即可看到打包好的程序
 

![image](https://i-blog.csdnimg.cn/direct/6adca8434eef4deeb95936a8db8fa76f.png)
 

## 二、打包可能遇到的问题
 

#### 1.无法启动应用：Electron 找不到入口
 

![image](https://i-blog.csdnimg.cn/direct/72257ecce5ae4e35a2230ae4093676a6.png)
解决方案： 
        将Vite 配置项目中 package.json 中的 "type":"moudle" 移除,添加   "main": "main.js"，确保都使用CommonJs  或者  如果想保留 "type":"moudle"则需要将main.js改为ES模块语法，这里不进行详细修改，主要思路是将require改为使用 import。 

#### 2.启动后应用为白屏
 

![image](https://i-blog.csdnimg.cn/direct/c4171279b4ce4aa6a9dc464b00c2da9e.png)
 
解决方案： 
        1.在main.js中使用绝对路径，上文代码块中已有注解，确保能够正确找到对应index.html文件 
        2.检查vite.config.ts配置，确保base设置为  ./ 

```javascript
export default defineConfig({
  base: './',
  // ... 其他配置
});
```
 
        3.检查路由配置：如果 Vue 应用使用了路由，并且是 history 模式，那么可能会需要配置服务器以返回 index.html。在 Electron 中，需要确保所有路由都指向 index.html，需要修改为哈希模式————在 src 目录下找到 router 文件夹，修改history模式，改为createWebHashHistory 

![image](https://i-blog.csdnimg.cn/direct/489d9a2190d147af9d8f31af8da3c95a.png)
 

## 拓展——热更新  完成实时更新，而非重新构建dist文件
 
1.下载工具 

```javascript
npm i concurrently -D
npm i wait-on -D
```
 
2.修改 main.js 配置 

```javascript
  console.log("isPackaged: ", app.isPackaged);
  if (!app.isPackaged) {
    mainWindow.loadURL("http://localhost:3333/");
  } else {
    mainWindow.loadFile("./dist/index.html");
  }

```
 
3.在 package.json 中增加打包命令。 

```javascript
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite build",
    "type-check": "vue-tsc --build",
    "lint": "eslint . --fix",
    "clean": "rm -rf dist node_modules",
    "start": "electron .",
    "electron": "wait-on tcp:8223 && electron .", //和main.js中端口值保持一致
    "run-exe": "concurrently  -k \"npm run dev\" \"npm run electron\"", //可自定义
    "exe-build": "vite build && electron-builder  --config electron.config.json" //增加exe配置文件
  },
```
 
4.项目根目录创建 electron.config.json 

```javascript
{
    "files": ["main.js", "preload.js", "./dist"],
    "productName": "test"
  }
```
 

![image](https://i-blog.csdnimg.cn/direct/7627012453df4d66a73ab34c56656400.png)
 
5. 运行打包命令，等待执行结束，dist文件夹下会多一个win-unpacked，其里面有一个exe文件就是程序执行文件，文件名为上一步设置：productName——test，点击即可运行。 

```javascript
npm run exe-build
```
 

![image](https://i-blog.csdnimg.cn/direct/581a72123649491b9496e097178281d3.png)
 
参考其他大佬的教程： 
[【electron】 vite + electron-builder 打包配置vite + electron-build - 掘金](https://juejin.cn/post/7144999655594524708?searchId=20251013093103974E186BB4A0EBC5F30F) 
[【教程】将Vue项目打包为exe项目的教程-我的第一个原生Vue项目_vue打包exe-CSDN博客](https://blog.csdn.net/Hsk_03/article/details/137785662)
                
        
                    
## 项目架构
 
Vue 3 + TypeScript + Vite 
  Vue.js: ^3.5.17Vue Router: ^4.5.1TypeScript: ~5.8.0Element Plus: ^2.10.4Vite: ^7.0.0 @types/node: ^22.15.32@tsconfig/node22: ^22.0.2Electron: ^38.2.2Electron Builder: ^26.0.12 

## 一、Electron 桌面应用打包流程
 

#### 1.先保证vue项目可运行，下载打包工具
 
一定要本地先跑一遍vue项目，保证没有本地运行错误 

```javascript
npm i -D electron  
npm i -D electron-builder
```
 

#### 2.在项目根目录下（在你能看到vite.cnfig.ts文件的目录下，不是src目录下）创建main.js
 

```javascript
// main.js
// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 加载 index.html
  mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html')); //使用绝对路径

  // 打开开发工具
  // mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。

```
 

#### 3.在根目录下创建preload.js
 

```javascript
// preload.js

// All the Node.js APIs are available in the preload process.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })
  
```
 

#### 4.在原有package.json文件种，添加electron启动命令
 

```javascript
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite build",
    "type-check": "vue-tsc --build",
    "lint": "eslint . --fix",
    "clean": "rm -rf dist node_modules",
    "start": "electron ." //对比参考自己的scripts设置，其他命令可以不做修改，主要是添加此命令，方便之后npm run start直接启动exe文件
  }
```
 

#### 5.运行 npm run build, 生成dist文件。
 

![image](https://i-blog.csdnimg.cn/direct/f3d40d8a26424ea9ba419139ee0a861e.png)
 

#### 6.最后在终端运行 npm run start，即可看到打包好的程序
 

![image](https://i-blog.csdnimg.cn/direct/6adca8434eef4deeb95936a8db8fa76f.png)
 

## 二、打包可能遇到的问题
 

#### 1.无法启动应用：Electron 找不到入口
 

![image](https://i-blog.csdnimg.cn/direct/72257ecce5ae4e35a2230ae4093676a6.png)
解决方案： 
        将Vite 配置项目中 package.json 中的 "type":"moudle" 移除,添加   "main": "main.js"，确保都使用CommonJs  或者  如果想保留 "type":"moudle"则需要将main.js改为ES模块语法，这里不进行详细修改，主要思路是将require改为使用 import。 

#### 2.启动后应用为白屏
 

![image](https://i-blog.csdnimg.cn/direct/c4171279b4ce4aa6a9dc464b00c2da9e.png)
 
解决方案： 
        1.在main.js中使用绝对路径，上文代码块中已有注解，确保能够正确找到对应index.html文件 
        2.检查vite.config.ts配置，确保base设置为  ./ 

```javascript
export default defineConfig({
  base: './',
  // ... 其他配置
});
```
 
        3.检查路由配置：如果 Vue 应用使用了路由，并且是 history 模式，那么可能会需要配置服务器以返回 index.html。在 Electron 中，需要确保所有路由都指向 index.html，需要修改为哈希模式————在 src 目录下找到 router 文件夹，修改history模式，改为createWebHashHistory 

![image](https://i-blog.csdnimg.cn/direct/489d9a2190d147af9d8f31af8da3c95a.png)
 

## 拓展——热更新  完成实时更新，而非重新构建dist文件
 
1.下载工具 

```javascript
npm i concurrently -D
npm i wait-on -D
```
 
2.修改 main.js 配置 

```javascript
  console.log("isPackaged: ", app.isPackaged);
  if (!app.isPackaged) {
    mainWindow.loadURL("http://localhost:3333/");
  } else {
    mainWindow.loadFile("./dist/index.html");
  }

```
 
3.在 package.json 中增加打包命令。 

```javascript
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite build",
    "type-check": "vue-tsc --build",
    "lint": "eslint . --fix",
    "clean": "rm -rf dist node_modules",
    "start": "electron .",
    "electron": "wait-on tcp:8223 && electron .", //和main.js中端口值保持一致
    "run-exe": "concurrently  -k \"npm run dev\" \"npm run electron\"", //可自定义
    "exe-build": "vite build && electron-builder  --config electron.config.json" //增加exe配置文件
  },
```
 
4.项目根目录创建 electron.config.json 

```javascript
{
    "files": ["main.js", "preload.js", "./dist"],
    "productName": "test"
  }
```
 

![image](https://i-blog.csdnimg.cn/direct/7627012453df4d66a73ab34c56656400.png)
 
5. 运行打包命令，等待执行结束，dist文件夹下会多一个win-unpacked，其里面有一个exe文件就是程序执行文件，文件名为上一步设置：productName——test，点击即可运行。 

```javascript
npm run exe-build
```
 

![image](https://i-blog.csdnimg.cn/direct/581a72123649491b9496e097178281d3.png)
 
参考其他大佬的教程： 
[【electron】 vite + electron-builder 打包配置vite + electron-build - 掘金](https://juejin.cn/post/7144999655594524708?searchId=20251013093103974E186BB4A0EBC5F30F) 
[【教程】将Vue项目打包为exe项目的教程-我的第一个原生Vue项目_vue打包exe-CSDN博客](https://blog.csdn.net/Hsk_03/article/details/137785662)