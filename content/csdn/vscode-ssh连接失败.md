---
title: "VSCode SSH连接失败"
date: "2025-12-26"
tags: []
csdnUrl: "https://blog.csdn.net/weixin_63110324/article/details/156295810"
source: csdn
---
### 问题出现场景：

云服务器重装系统后，未修改ssh配置文件，使用原配置报错

```
[10:22:22.923] > 
[10:22:22.974] > @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
[10:22:22.995] > @    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
> @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
> IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
> Someone could be eavesdropping on you right now (man-in-the-middle attack)!
> It is also possible that a host key has just been changed.
> The fingerprint for the ED25519 key sent by the remote host is
> SHA256:eL6vWKQxmLqWpndR1+BD4GMocD6IYwV/4i8k+738OrA.
> Please contact your system administrator.
> Add correct host key in C:\\Users\\19139/.ssh/known_hosts to get rid of this message.
> Offending ECDSA key in C:\\Users\\19139/.ssh/known_hosts:6
> Host key for 113.46.148.44 has changed and you have requested strict checking.
> Host key verification failed.
> 过程试图写入的管道不存在。
[10:22:24.259] "install" terminal command done
[10:22:24.259] Install terminal quit with output: 过程试图写入的管道不存在。
[10:22:24.260] Received install output: 过程试图写入的管道不存在。
[10:22:24.260] WARN: $PLATFORM is undefined in installation script output.  Errors may be dropped.
[10:22:24.260] Failed to parse remote port from server output
[10:22:24.260] Resolver error: Error

```

> Host key for XXXX（ip地址） has changed and you have requested strict checking. > Host key verification failed.

### 解决方式：

1.找到  \用户名\.ssh\known_hosts，比如我的就是   C:\Users\19139\.ssh\known_hosts

        找到对应的ip地址，删除对应行

![image](https://i-blog.csdnimg.cn/direct/b01ba24e7d46462b984a7a9f0378fff2.png)

2.保存文件

3.使用管理员身份打开vscode，按照正常流程重新连接

        不是管理员身份运行可能会导致权限不够，报错

                
        
                    
### 问题出现场景：

云服务器重装系统后，未修改ssh配置文件，使用原配置报错

```
[10:22:22.923] > 
[10:22:22.974] > @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
[10:22:22.995] > @    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
> @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
> IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
> Someone could be eavesdropping on you right now (man-in-the-middle attack)!
> It is also possible that a host key has just been changed.
> The fingerprint for the ED25519 key sent by the remote host is
> SHA256:eL6vWKQxmLqWpndR1+BD4GMocD6IYwV/4i8k+738OrA.
> Please contact your system administrator.
> Add correct host key in C:\\Users\\19139/.ssh/known_hosts to get rid of this message.
> Offending ECDSA key in C:\\Users\\19139/.ssh/known_hosts:6
> Host key for 113.46.148.44 has changed and you have requested strict checking.
> Host key verification failed.
> 过程试图写入的管道不存在。
[10:22:24.259] "install" terminal command done
[10:22:24.259] Install terminal quit with output: 过程试图写入的管道不存在。
[10:22:24.260] Received install output: 过程试图写入的管道不存在。
[10:22:24.260] WARN: $PLATFORM is undefined in installation script output.  Errors may be dropped.
[10:22:24.260] Failed to parse remote port from server output
[10:22:24.260] Resolver error: Error

```

> Host key for XXXX（ip地址） has changed and you have requested strict checking. > Host key verification failed.

### 解决方式：

1.找到  \用户名\.ssh\known_hosts，比如我的就是   C:\Users\19139\.ssh\known_hosts

        找到对应的ip地址，删除对应行

![image](https://i-blog.csdnimg.cn/direct/b01ba24e7d46462b984a7a9f0378fff2.png)

2.保存文件

3.使用管理员身份打开vscode，按照正常流程重新连接

        不是管理员身份运行可能会导致权限不够，报错