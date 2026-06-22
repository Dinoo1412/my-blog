---
title: "【electron】python+vue 前后端打包"
date: "2026-05-30"
tags: []
csdnUrl: "https://blog.csdn.net/weixin_63110324/article/details/153197789"
source: csdn
---
## 前置条件：
 
已打包好python后端项目为exe文件 
vue项目文件可成功运行： 
不会打包的请参考[【electron】electron-builder 打包Vue 3 + Vite 项目为 .exe 文件-CSDN博客](https://blog.csdn.net/weixin_63110324/article/details/153181870?spm=1001.2014.3001.5501) 

## 整合项目流程：
 

#### 1. 在项目根目录下创建后端资源文件夹backend，将后端打包文件复制进此文件夹中
 

![image](https://i-blog.csdnimg.cn/direct/7260edf3e151443fb12d0c222dc7d471.png)
 

#### 2.在 Electron 主进程启动时启动后端 exe，并管理其生命周期。先修改 main.js 实现该逻辑。
 
增加后端配置代码 

```javascript
const { spawn } = require('child_process')
const fs = require('fs')

// 后端进程管理
let backendProcess = null

// 启动后端服务
const startBackend = () => {
  try {
    // 根据是否打包来确定后端exe的路径
    let backendPath
    if (app.isPackaged) {
      // 打包后的路径 - 使用 extraResources 中的文件
      backendPath = path.join(process.resourcesPath, 'backend', 'app.exe')
    } else {
      // 开发环境路径
      backendPath = path.join(__dirname, '..', 'backend', 'dist', 'app.exe')
    }

    console.log('Backend path:', backendPath)
    
    // 检查文件是否存在
    if (!fs.existsSync(backendPath)) {
      console.error('Backend executable not found at:', backendPath)
      return false
    }

    // 启动后端进程
    backendProcess = spawn(backendPath, [], {
      cwd: path.dirname(backendPath),
      stdio: ['ignore', 'pipe', 'pipe']
    })

    // 监听后端进程输出
    backendProcess.stdout.on('data', (data) => {
      console.log('Backend stdout:', data.toString())
    })

    backendProcess.stderr.on('data', (data) => {
      console.error('Backend stderr:', data.toString())
    })

    // 监听后端进程退出
    backendProcess.on('close', (code) => {
      console.log(`Backend process exited with code ${code}`)
      backendProcess = null
    })

    backendProcess.on('error', (err) => {
      console.error('Failed to start backend process:', err)
      backendProcess = null
    })

    console.log('Backend process started successfully')
    return true
  } catch (error) {
    console.error('Error starting backend:', error)
    return false
  }
}

// 停止后端服务
const stopBackend = () => {
  if (backendProcess) {
    console.log('Stopping backend process...')
    backendProcess.kill()
    backendProcess = null
  }
}

```
 

```javascript
// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(async () => {
  // 先启动后端服务
  console.log('Starting backend service...')
  const backendStarted = startBackend()
  
  if (backendStarted) {
    // 等待后端服务启动
    await new Promise(resolve => setTimeout(resolve, 3000))
    console.log('Backend service started, creating window...')
  } else {
    console.warn('Backend service failed to start, but continuing with frontend...')
  }
  
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
  // 停止后端服务
  stopBackend()
  if (process.platform !== 'darwin') app.quit()
})

// 应用退出前清理资源
app.on('before-quit', () => {
  stopBackend()
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。
```
 

#### 3.更新 electron-builder 配置，将后端 exe 打包进应用，修改ectron.config.json
 

```javascript
{
    "files": [
      "main.js", 
      "preload.js", 
      "./dist",
      {
        "from": "../backend/dist",
        "to": "backend",
        "filter": ["**/*"]
      }
    ],
    "extraResources": [
      {
        "from": "../backend/dist",
        "to": "backend",
        "filter": ["**/*"]
      }
    ],
    "productName": "打证助手", //自定义
    "appId": "com.zhengwu.certificate", //自定义
    "directories": {
      "output": "dist"
    },
    "win": {
      "target": "nsis",
      "icon": "build/icons/icon.ico"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true
    }
  }
```
 

#### 4. 增加整体打包命令，修改package.json ，在scripts中增加
 
打包命令也可以自定义 

```javascript
"build-integrated": "npm run build && npm run exe-build",
```
 

#### 5.执行命令，打包文件
 

```javascript
npm run build-integrated
```
 

#### 6.生成可执行文件
 
项目\dist\win-unpacked\打证助手.exe 
点击即可运行 
 

## 可能遇到的问题
 

#### app.asar 即后端应用被占用：EBUSY: resource busy or locked
 
解决方案： 
        按照顺序依次尝试，如果不行就第二步；关闭electron ->关闭编码idle ->重启电脑 后，重新运行打包命令  npm run build-integrated 

#### ⨯ image 项目\public\app.ico must be at least 256x256
 
解决方案： 
        很明显，是自定义设置的icon大小出现了问题 
        1.直接将icon修改为256*256大小 
        2.或者修改源文件：项目使用`electron-icon-builder`自动生成符合要求的图标 
         - 使用`npm run generate-icon`重新生成图标 

```javascript
npm install --save-dev electron-icon-builder
```
 
        - 检查`build/icons/icon.ico`文件是否生成成功 

```javascript
npm run generate-icon
```
 
        - 如果仍有问题，可以尝试使用其他PNG文件作为源 

#### 3.后端服务没有自启动
 
解决方案: 
        修复打包配置，确保后端文件被打包，请检查ectron.config.json文件，确认 main.js 中的路径解析正确，确保后端文件被正确应用 

```javascript
   "extraResources": [
     {
       "from": "../backend/dist",
       "to": "backend",
       "filter": ["**/*"]
     }
   ]
```

                
        
                    
## 前置条件：
 
已打包好python后端项目为exe文件 
vue项目文件可成功运行： 
不会打包的请参考[【electron】electron-builder 打包Vue 3 + Vite 项目为 .exe 文件-CSDN博客](https://blog.csdn.net/weixin_63110324/article/details/153181870?spm=1001.2014.3001.5501) 

## 整合项目流程：
 

#### 1. 在项目根目录下创建后端资源文件夹backend，将后端打包文件复制进此文件夹中
 

![image](https://i-blog.csdnimg.cn/direct/7260edf3e151443fb12d0c222dc7d471.png)
 

#### 2.在 Electron 主进程启动时启动后端 exe，并管理其生命周期。先修改 main.js 实现该逻辑。
 
增加后端配置代码 

```javascript
const { spawn } = require('child_process')
const fs = require('fs')

// 后端进程管理
let backendProcess = null

// 启动后端服务
const startBackend = () => {
  try {
    // 根据是否打包来确定后端exe的路径
    let backendPath
    if (app.isPackaged) {
      // 打包后的路径 - 使用 extraResources 中的文件
      backendPath = path.join(process.resourcesPath, 'backend', 'app.exe')
    } else {
      // 开发环境路径
      backendPath = path.join(__dirname, '..', 'backend', 'dist', 'app.exe')
    }

    console.log('Backend path:', backendPath)
    
    // 检查文件是否存在
    if (!fs.existsSync(backendPath)) {
      console.error('Backend executable not found at:', backendPath)
      return false
    }

    // 启动后端进程
    backendProcess = spawn(backendPath, [], {
      cwd: path.dirname(backendPath),
      stdio: ['ignore', 'pipe', 'pipe']
    })

    // 监听后端进程输出
    backendProcess.stdout.on('data', (data) => {
      console.log('Backend stdout:', data.toString())
    })

    backendProcess.stderr.on('data', (data) => {
      console.error('Backend stderr:', data.toString())
    })

    // 监听后端进程退出
    backendProcess.on('close', (code) => {
      console.log(`Backend process exited with code ${code}`)
      backendProcess = null
    })

    backendProcess.on('error', (err) => {
      console.error('Failed to start backend process:', err)
      backendProcess = null
    })

    console.log('Backend process started successfully')
    return true
  } catch (error) {
    console.error('Error starting backend:', error)
    return false
  }
}

// 停止后端服务
const stopBackend = () => {
  if (backendProcess) {
    console.log('Stopping backend process...')
    backendProcess.kill()
    backendProcess = null
  }
}

```
 

```javascript
// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(async () => {
  // 先启动后端服务
  console.log('Starting backend service...')
  const backendStarted = startBackend()
  
  if (backendStarted) {
    // 等待后端服务启动
    await new Promise(resolve => setTimeout(resolve, 3000))
    console.log('Backend service started, creating window...')
  } else {
    console.warn('Backend service failed to start, but continuing with frontend...')
  }
  
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
  // 停止后端服务
  stopBackend()
  if (process.platform !== 'darwin') app.quit()
})

// 应用退出前清理资源
app.on('before-quit', () => {
  stopBackend()
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。
```
 

#### 3.更新 electron-builder 配置，将后端 exe 打包进应用，修改ectron.config.json
 

```javascript
{
    "files": [
      "main.js", 
      "preload.js", 
      "./dist",
      {
        "from": "../backend/dist",
        "to": "backend",
        "filter": ["**/*"]
      }
    ],
    "extraResources": [
      {
        "from": "../backend/dist",
        "to": "backend",
        "filter": ["**/*"]
      }
    ],
    "productName": "打证助手", //自定义
    "appId": "com.zhengwu.certificate", //自定义
    "directories": {
      "output": "dist"
    },
    "win": {
      "target": "nsis",
      "icon": "build/icons/icon.ico"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true
    }
  }
```
 

#### 4. 增加整体打包命令，修改package.json ，在scripts中增加
 
打包命令也可以自定义 

```javascript
"build-integrated": "npm run build && npm run exe-build",
```
 

#### 5.执行命令，打包文件
 

```javascript
npm run build-integrated
```
 

#### 6.生成可执行文件
 
项目\dist\win-unpacked\打证助手.exe 
点击即可运行 
 

## 可能遇到的问题
 

#### app.asar 即后端应用被占用：EBUSY: resource busy or locked
 
解决方案： 
        按照顺序依次尝试，如果不行就第二步；关闭electron ->关闭编码idle ->重启电脑 后，重新运行打包命令  npm run build-integrated 

#### ⨯ image 项目\public\app.ico must be at least 256x256
 
解决方案： 
        很明显，是自定义设置的icon大小出现了问题 
        1.直接将icon修改为256*256大小 
        2.或者修改源文件：项目使用`electron-icon-builder`自动生成符合要求的图标 
         - 使用`npm run generate-icon`重新生成图标 

```javascript
npm install --save-dev electron-icon-builder
```
 
        - 检查`build/icons/icon.ico`文件是否生成成功 

```javascript
npm run generate-icon
```
 
        - 如果仍有问题，可以尝试使用其他PNG文件作为源 

#### 3.后端服务没有自启动
 
解决方案: 
        修复打包配置，确保后端文件被打包，请检查ectron.config.json文件，确认 main.js 中的路径解析正确，确保后端文件被正确应用 

```javascript
   "extraResources": [
     {
       "from": "../backend/dist",
       "to": "backend",
       "filter": ["**/*"]
     }
   ]
```