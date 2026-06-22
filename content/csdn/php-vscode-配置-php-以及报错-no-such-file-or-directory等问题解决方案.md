---
title: "【PHP】VScode 配置 PHP 以及报错 No such file or directory等问题解决方案"
date: "2026-06-20"
tags: []
csdnUrl: "https://blog.csdn.net/weixin_63110324/article/details/153637714"
source: csdn
---
Xdebug 2 升级到 3 之后，网上很多配置是错误的，以下流程在 VScode 配置 PHP 8.4 + Xdebug3 亲测有效 

### 一、配置环境
 
操作系统：Windows11 
VScode：version 1.105 

### 二、配置PHP
 

#### 1. 下载适合系统版本的PHP
 
PHP 官网 :[PHP](https://www.php.net/)选择适合你系统的版本：如果你的系统是 32 位，选择 x86 版本。 
点击官网中的 Downloads ，选择合适版本下载安装包 
我这里选择的是PHP Version 8.4.13 

![image](https://i-blog.csdnimg.cn/direct/2a8546cf118c4c8c9a7ce23aa598c29a.png)
 

![image](https://i-blog.csdnimg.cn/direct/2fbc758124104eeea7d991a68e4c824a.png)
 
 

#### 2. 解压 PHP
 
        将下载的 ZIP 文件进行解压（如 D:\PHP），直接在此根目录内，找到 php.ini-development 文件，进行配置，可以为了保险复制一份 php.ini-development，改名为 php.ini ，也可以直接将此文件改名为  php.ini ，VScode会优先加载此文件 

#### 3. 激活配置
 
直接用记事本打开已经重命名为 php.ini 的文件，去除代码前面引号 

```
extension_dir = "ext"
extension=curl
extension=gd
extension=mbstring
extension=mysqli
extension=pdo_mysql
extension=openssl

```
 
并且设置时区 

```
date.timezone = Asia/Shanghai
```
 

![image](https://i-blog.csdnimg.cn/direct/e08c7564b3494612a942bc8307e02e32.png)
 

#### 4. 配置环境变量
 
打开电脑高级系统设置——环境变量——系统变量——Path——新建变量——保存 

![image](https://i-blog.csdnimg.cn/direct/8a831723edf944afa013dc24edc739b0.png)
 
新建的环境变量路径为解压PHP文件夹路径，三下确定保存 

![image](https://i-blog.csdnimg.cn/direct/83e8ef8582ea4c35b14263fea273fdbe.png)
 

#### 5. 验证安装是否成功——查看 PHP 版本
 
打开 cmd 命令提示符（快捷键：Win + R  输入cmd 回车打开） 
输入 

```
php -v
```
 
若正确安装应该出现版本信息 8.4.13 即是 PHP 版本 

![image](https://i-blog.csdnimg.cn/direct/a94fec6de08b4fdb94b7ca9d76d6ba57.png)
 

### 三、下载Xdebug
 

#### 1. 确定版本，下载正确版本
 
Xdebug 的下载有一个非常重要的点：必须和 PHP 版本匹配，不然很容易出现报错： 
查看对应版本支持的官方网站：[Xdebug: Support — Tailored Installation Instructions](https://xdebug.org/wizard) 
打开 cmd ，运行以下命令，获取 php 版本信息 

```
php -i
```
 

![image](https://i-blog.csdnimg.cn/direct/b06dddb46c45460c983d395b2acdf62e.png)
 
将所有的输出信息全部复制，点击下方按钮进行分析 

![image](https://i-blog.csdnimg.cn/direct/9201a24f6790462d90299c356e1a0280.png)
 
出现以下分析信息： 
如果之前没有下载过 Xdebug的话， 会显示 Xdebug installed ：no 

![image](https://i-blog.csdnimg.cn/direct/1d669b0ee67144d08fb9cf1e66cca994.png)
 

#### 2. 将文件放置到正确位置，并重命名文件
 
将文件重命名为php_xdebug.dll，将文件移动至 PHP 解压后的 ext 文件夹下 
即 ：D:\PHP\ext 

![image](https://i-blog.csdnimg.cn/direct/61dcf60634ee497598ac158e505f5a17.png)
 

#### 3. 修改 php.ini 文件
 
回到 PHP 解压文件夹根目录，即 D:\PHP ，找到 php.ini 文件，在文件末尾增加以下配置，保存修改。 

```
[xdebug]
zend_extension= xdebug
xdebug.mode=debug
```
 

### 四、下载相关插件
 
打开 VScode 下载 PHP 运行相关插件 
以下是我下载的插件：仅供参考 

![image](https://i-blog.csdnimg.cn/direct/5e25c07d88a543ba85d0c7a8593754a4.png)
 

### 五、运行项目测试
 

![image](https://i-blog.csdnimg.cn/direct/f201687792304dcf88607b98bfa5a608.png)
 
 

                
        
                    Xdebug 2 升级到 3 之后，网上很多配置是错误的，以下流程在 VScode 配置 PHP 8.4 + Xdebug3 亲测有效 

### 一、配置环境
 
操作系统：Windows11 
VScode：version 1.105 

### 二、配置PHP
 

#### 1. 下载适合系统版本的PHP
 
PHP 官网 :[PHP](https://www.php.net/)选择适合你系统的版本：如果你的系统是 32 位，选择 x86 版本。 
点击官网中的 Downloads ，选择合适版本下载安装包 
我这里选择的是PHP Version 8.4.13 

![image](https://i-blog.csdnimg.cn/direct/2a8546cf118c4c8c9a7ce23aa598c29a.png)
 

![image](https://i-blog.csdnimg.cn/direct/2fbc758124104eeea7d991a68e4c824a.png)
 
 

#### 2. 解压 PHP
 
        将下载的 ZIP 文件进行解压（如 D:\PHP），直接在此根目录内，找到 php.ini-development 文件，进行配置，可以为了保险复制一份 php.ini-development，改名为 php.ini ，也可以直接将此文件改名为  php.ini ，VScode会优先加载此文件 

#### 3. 激活配置
 
直接用记事本打开已经重命名为 php.ini 的文件，去除代码前面引号 

```
extension_dir = "ext"
extension=curl
extension=gd
extension=mbstring
extension=mysqli
extension=pdo_mysql
extension=openssl

```
 
并且设置时区 

```
date.timezone = Asia/Shanghai
```
 

![image](https://i-blog.csdnimg.cn/direct/e08c7564b3494612a942bc8307e02e32.png)
 

#### 4. 配置环境变量
 
打开电脑高级系统设置——环境变量——系统变量——Path——新建变量——保存 

![image](https://i-blog.csdnimg.cn/direct/8a831723edf944afa013dc24edc739b0.png)
 
新建的环境变量路径为解压PHP文件夹路径，三下确定保存 

![image](https://i-blog.csdnimg.cn/direct/83e8ef8582ea4c35b14263fea273fdbe.png)
 

#### 5. 验证安装是否成功——查看 PHP 版本
 
打开 cmd 命令提示符（快捷键：Win + R  输入cmd 回车打开） 
输入 

```
php -v
```
 
若正确安装应该出现版本信息 8.4.13 即是 PHP 版本 

![image](https://i-blog.csdnimg.cn/direct/a94fec6de08b4fdb94b7ca9d76d6ba57.png)
 

### 三、下载Xdebug
 

#### 1. 确定版本，下载正确版本
 
Xdebug 的下载有一个非常重要的点：必须和 PHP 版本匹配，不然很容易出现报错： 
查看对应版本支持的官方网站：[Xdebug: Support — Tailored Installation Instructions](https://xdebug.org/wizard) 
打开 cmd ，运行以下命令，获取 php 版本信息 

```
php -i
```
 

![image](https://i-blog.csdnimg.cn/direct/b06dddb46c45460c983d395b2acdf62e.png)
 
将所有的输出信息全部复制，点击下方按钮进行分析 

![image](https://i-blog.csdnimg.cn/direct/9201a24f6790462d90299c356e1a0280.png)
 
出现以下分析信息： 
如果之前没有下载过 Xdebug的话， 会显示 Xdebug installed ：no 

![image](https://i-blog.csdnimg.cn/direct/1d669b0ee67144d08fb9cf1e66cca994.png)
 

#### 2. 将文件放置到正确位置，并重命名文件
 
将文件重命名为php_xdebug.dll，将文件移动至 PHP 解压后的 ext 文件夹下 
即 ：D:\PHP\ext 

![image](https://i-blog.csdnimg.cn/direct/61dcf60634ee497598ac158e505f5a17.png)
 

#### 3. 修改 php.ini 文件
 
回到 PHP 解压文件夹根目录，即 D:\PHP ，找到 php.ini 文件，在文件末尾增加以下配置，保存修改。 

```
[xdebug]
zend_extension= xdebug
xdebug.mode=debug
```
 

### 四、下载相关插件
 
打开 VScode 下载 PHP 运行相关插件 
以下是我下载的插件：仅供参考 

![image](https://i-blog.csdnimg.cn/direct/5e25c07d88a543ba85d0c7a8593754a4.png)
 

### 五、运行项目测试
 

![image](https://i-blog.csdnimg.cn/direct/f201687792304dcf88607b98bfa5a608.png)