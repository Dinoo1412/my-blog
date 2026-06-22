---
title: "Python在Linux上挂载"
date: "2025-11-07"
tags: []
csdnUrl: "https://blog.csdn.net/weixin_63110324/article/details/154533313"
source: csdn
---
## 配置环境
 
腾讯云服务器 
CentOs 7.6  
python3：默认版本 3.6.8 

![image](https://i-blog.csdnimg.cn/direct/599900e331a945b784ea28ea0b28231a.png)
 

## Python在Linux上挂载
 
前期准备工作：首先先使用winscp可视化打开云服务器上的文件 
  加载文件时发生错误，使用936（ANSI/OEM-简体中文GBK）编码在编辑=配置中增加关联应用程序编辑器，选择外置编辑器——记事本，上移至最顶上，成为默认打开的编辑器[使用WINSCP编辑文件时报错：加载文件时发生错误，使用936（ANSI/OEM-简体中文GBK）编码_使用936 ansi oem简体中文gbk编码-CSDN博客](https://blog.csdn.net/dlzcw/article/details/104442289) 在/home文件夹内创建新文件——即自己自定义的py文件[CentOS 7实现服务常驻后台：使用systemd与nohup命令详解 - 云原生实践](https://www.oryoy.com/news/centos-7-shi-xian-fu-wu-chang-zhu-hou-tai-shi-yong-systemd-yu-nohup-ming-ling-xiang-jie.html#:~:text=systemd%EF%BC%9A%20%E9%80%82%E7%94%A8%E4%BA%8E%E9%9C%80%E8%A6%81%E9%95%BF%E6%9C%9F%E8%BF%90%E8%A1%8C%E3%80%81%E9%9C%80%E8%A6%81%E5%A4%8D%E6%9D%82%E9%85%8D%E7%BD%AE%E5%92%8C%E4%BE%9D%E8%B5%96%E7%AE%A1%E7%90%86%E7%9A%84%E6%9C%8D%E5%8A%A1%E3%80%82%20nohup%EF%BC%9A%20%E9%80%82%E7%94%A8%E4%BA%8E%E4%B8%B4%E6%97%B6%E4%BB%BB%E5%8A%A1%E6%88%96%E7%AE%80%E5%8D%95%E8%84%9A%E6%9C%AC%E7%9A%84%E5%90%8E%E5%8F%B0%E8%BF%90%E8%A1%8C%E3%80%82,%E5%9C%A8CentOS%207%E4%B8%AD%EF%BC%8C%E5%AE%9E%E7%8E%B0%E6%9C%8D%E5%8A%A1%E5%B8%B8%E9%A9%BB%E5%90%8E%E5%8F%B0%E6%9C%89%E5%A4%9A%E7%A7%8D%E6%96%B9%E6%B3%95%EF%BC%8Csystemd%E5%92%8Cnohup%E6%98%AF%E5%85%B6%E4%B8%AD%E4%B8%A4%E7%A7%8D%E5%B8%B8%E8%A7%81%E4%B8%94%E9%AB%98%E6%95%88%E7%9A%84%E6%96%B9%E5%BC%8F%E3%80%82%20%E9%80%9A%E8%BF%87systemd%EF%BC%8C%E5%8F%AF%E4%BB%A5%E6%96%B9%E4%BE%BF%E5%9C%B0%E7%AE%A1%E7%90%86%E5%92%8C%E9%85%8D%E7%BD%AE%E9%95%BF%E6%9C%9F%E8%BF%90%E8%A1%8C%E7%9A%84%E6%9C%8D%E5%8A%A1%EF%BC%9B%E8%80%8Cnohup%E5%88%99%E9%80%82%E7%94%A8%E4%BA%8E%E4%B8%B4%E6%97%B6%E6%88%96%E7%AE%80%E5%8D%95%E7%9A%84%E5%90%8E%E5%8F%B0%E4%BB%BB%E5%8A%A1%E3%80%82%20%E6%A0%B9%E6%8D%AE%E5%AE%9E%E9%99%85%E9%9C%80%E6%B1%82%E9%80%89%E6%8B%A9%E5%90%88%E9%80%82%E7%9A%84%E6%96%B9%E6%B3%95%EF%BC%8C%E8%83%BD%E5%A4%9F%E6%9C%89%E6%95%88%E6%8F%90%E5%8D%87%E6%9C%8D%E5%8A%A1%E7%9A%84%E7%AE%A1%E7%90%86%E6%95%88%E7%8E%87%E5%92%8C%E7%A8%B3%E5%AE%9A%E6%80%A7%E3%80%82) 
  nohup 
    优点： 
      极其简单：一行命令即可。无需配置：适合快速测试。 缺点： 
      管理不便：你需要自己记录PID，如果要停止服务，需要执行 kill <PID>。无自动恢复：如果进程因为某种原因（非正常退出）挂掉了，它不会自动重启。日志混乱：所有输出都堆在一个文件里，时间长了大文件难以处理。不专业：不适合用于生产环境的关键服务  systemd托管 
    优点： 
      专业化管理：启动、停止、重启、查看状态都有统一命令。高可靠性：自动重启机制确保服务7x24小时可用。集中日志：日志被系统统一管理，方便查询和调试。依赖管理：确保服务按正确顺序启动。资源控制：避免单个服务耗尽系统资源。标准化：是管理Linux服务的现代标准方式。 缺点： 
      配置稍复杂：需要学习单元文件的语法。需要root权限：创建系统服务文件需要sudo权限。   1.nohup--暂时性方法 --一直在后台运行，但是不会自动重启 
  nohup python -u script.py > output.log 2>&1 & 
    nohup：忽略挂断信号，确保脚本持续运行。-u：禁用 Python 输出缓冲，实时写入日志。>：将标准输出重定向到 output.log。2>&1：将错误输出重定向到标准输出。&：将命令放入后台运行 实时查看日志内容 
    tail -f output.log 使用以下命令查找正在运行的脚本进程： 
    ps aux | grep script.py 查看所有运行的进程 
    ps -aux 找到进程 ID (PID) 后，使用以下命令终止进程： 
    kill -9 PID  2.使用systemd托管——关闭shell之后不会停止服务 
  1.编写.service文件 
    编辑文件 # vim /etc/systemd/system/my_script.service 
      按i进入编辑模式，:wq写入并退出，按exit退出编辑模式，:q直接退出，:q!强制退出不保存 或者直接用winscp直接导入 2.配置相关参数 
    [使用systemctl托管linux后台程序 - 咸鱼先锋](https://xyuxf.com/archives/2264)  --详细参数进行参考当时的配置  使用python3启动/总是自动重启/无限次数重启   
[Unit]  Description=RZX script After=network.target [Service] ExecStart=/usr/bin/python3 /home/文件夹名称/文件名 Restart=always User=root RestartSec=5 StartLimitInterval=0 [Install] WantedBy=multi-user.target  
 
  3.配置好后使用命令操作.service文件，完成服务启动 
    service xxx start   # 启动服务   或systemctl start 文件名service xxx stop    # 停止服务service xxx restart # 重启服务（先停止再启动）service xxx status  # 查看指定服务的状态       或systemctl status 文件名注：如果对配置文件进行修改了一定要重新加载服务器# systemctl daemon-reload 配置成功应该显示： active  
 

![image](https://i-blog.csdnimg.cn/img_convert/bfe40dc1bb5fe83018a04f0fa4ae4557.png)
 

                
        
                    
## 配置环境
 
腾讯云服务器 
CentOs 7.6  
python3：默认版本 3.6.8 

![image](https://i-blog.csdnimg.cn/direct/599900e331a945b784ea28ea0b28231a.png)
 

## Python在Linux上挂载
 
前期准备工作：首先先使用winscp可视化打开云服务器上的文件 
  加载文件时发生错误，使用936（ANSI/OEM-简体中文GBK）编码在编辑=配置中增加关联应用程序编辑器，选择外置编辑器——记事本，上移至最顶上，成为默认打开的编辑器[使用WINSCP编辑文件时报错：加载文件时发生错误，使用936（ANSI/OEM-简体中文GBK）编码_使用936 ansi oem简体中文gbk编码-CSDN博客](https://blog.csdn.net/dlzcw/article/details/104442289) 在/home文件夹内创建新文件——即自己自定义的py文件[CentOS 7实现服务常驻后台：使用systemd与nohup命令详解 - 云原生实践](https://www.oryoy.com/news/centos-7-shi-xian-fu-wu-chang-zhu-hou-tai-shi-yong-systemd-yu-nohup-ming-ling-xiang-jie.html#:~:text=systemd%EF%BC%9A%20%E9%80%82%E7%94%A8%E4%BA%8E%E9%9C%80%E8%A6%81%E9%95%BF%E6%9C%9F%E8%BF%90%E8%A1%8C%E3%80%81%E9%9C%80%E8%A6%81%E5%A4%8D%E6%9D%82%E9%85%8D%E7%BD%AE%E5%92%8C%E4%BE%9D%E8%B5%96%E7%AE%A1%E7%90%86%E7%9A%84%E6%9C%8D%E5%8A%A1%E3%80%82%20nohup%EF%BC%9A%20%E9%80%82%E7%94%A8%E4%BA%8E%E4%B8%B4%E6%97%B6%E4%BB%BB%E5%8A%A1%E6%88%96%E7%AE%80%E5%8D%95%E8%84%9A%E6%9C%AC%E7%9A%84%E5%90%8E%E5%8F%B0%E8%BF%90%E8%A1%8C%E3%80%82,%E5%9C%A8CentOS%207%E4%B8%AD%EF%BC%8C%E5%AE%9E%E7%8E%B0%E6%9C%8D%E5%8A%A1%E5%B8%B8%E9%A9%BB%E5%90%8E%E5%8F%B0%E6%9C%89%E5%A4%9A%E7%A7%8D%E6%96%B9%E6%B3%95%EF%BC%8Csystemd%E5%92%8Cnohup%E6%98%AF%E5%85%B6%E4%B8%AD%E4%B8%A4%E7%A7%8D%E5%B8%B8%E8%A7%81%E4%B8%94%E9%AB%98%E6%95%88%E7%9A%84%E6%96%B9%E5%BC%8F%E3%80%82%20%E9%80%9A%E8%BF%87systemd%EF%BC%8C%E5%8F%AF%E4%BB%A5%E6%96%B9%E4%BE%BF%E5%9C%B0%E7%AE%A1%E7%90%86%E5%92%8C%E9%85%8D%E7%BD%AE%E9%95%BF%E6%9C%9F%E8%BF%90%E8%A1%8C%E7%9A%84%E6%9C%8D%E5%8A%A1%EF%BC%9B%E8%80%8Cnohup%E5%88%99%E9%80%82%E7%94%A8%E4%BA%8E%E4%B8%B4%E6%97%B6%E6%88%96%E7%AE%80%E5%8D%95%E7%9A%84%E5%90%8E%E5%8F%B0%E4%BB%BB%E5%8A%A1%E3%80%82%20%E6%A0%B9%E6%8D%AE%E5%AE%9E%E9%99%85%E9%9C%80%E6%B1%82%E9%80%89%E6%8B%A9%E5%90%88%E9%80%82%E7%9A%84%E6%96%B9%E6%B3%95%EF%BC%8C%E8%83%BD%E5%A4%9F%E6%9C%89%E6%95%88%E6%8F%90%E5%8D%87%E6%9C%8D%E5%8A%A1%E7%9A%84%E7%AE%A1%E7%90%86%E6%95%88%E7%8E%87%E5%92%8C%E7%A8%B3%E5%AE%9A%E6%80%A7%E3%80%82) 
  nohup 
    优点： 
      极其简单：一行命令即可。无需配置：适合快速测试。 缺点： 
      管理不便：你需要自己记录PID，如果要停止服务，需要执行 kill <PID>。无自动恢复：如果进程因为某种原因（非正常退出）挂掉了，它不会自动重启。日志混乱：所有输出都堆在一个文件里，时间长了大文件难以处理。不专业：不适合用于生产环境的关键服务  systemd托管 
    优点： 
      专业化管理：启动、停止、重启、查看状态都有统一命令。高可靠性：自动重启机制确保服务7x24小时可用。集中日志：日志被系统统一管理，方便查询和调试。依赖管理：确保服务按正确顺序启动。资源控制：避免单个服务耗尽系统资源。标准化：是管理Linux服务的现代标准方式。 缺点： 
      配置稍复杂：需要学习单元文件的语法。需要root权限：创建系统服务文件需要sudo权限。   1.nohup--暂时性方法 --一直在后台运行，但是不会自动重启 
  nohup python -u script.py > output.log 2>&1 & 
    nohup：忽略挂断信号，确保脚本持续运行。-u：禁用 Python 输出缓冲，实时写入日志。>：将标准输出重定向到 output.log。2>&1：将错误输出重定向到标准输出。&：将命令放入后台运行 实时查看日志内容 
    tail -f output.log 使用以下命令查找正在运行的脚本进程： 
    ps aux | grep script.py 查看所有运行的进程 
    ps -aux 找到进程 ID (PID) 后，使用以下命令终止进程： 
    kill -9 PID  2.使用systemd托管——关闭shell之后不会停止服务 
  1.编写.service文件 
    编辑文件 # vim /etc/systemd/system/my_script.service 
      按i进入编辑模式，:wq写入并退出，按exit退出编辑模式，:q直接退出，:q!强制退出不保存 或者直接用winscp直接导入 2.配置相关参数 
    [使用systemctl托管linux后台程序 - 咸鱼先锋](https://xyuxf.com/archives/2264)  --详细参数进行参考当时的配置  使用python3启动/总是自动重启/无限次数重启   
[Unit]  Description=RZX script After=network.target [Service] ExecStart=/usr/bin/python3 /home/文件夹名称/文件名 Restart=always User=root RestartSec=5 StartLimitInterval=0 [Install] WantedBy=multi-user.target  
 
  3.配置好后使用命令操作.service文件，完成服务启动 
    service xxx start   # 启动服务   或systemctl start 文件名service xxx stop    # 停止服务service xxx restart # 重启服务（先停止再启动）service xxx status  # 查看指定服务的状态       或systemctl status 文件名注：如果对配置文件进行修改了一定要重新加载服务器# systemctl daemon-reload 配置成功应该显示： active  
 

![image](https://i-blog.csdnimg.cn/img_convert/bfe40dc1bb5fe83018a04f0fa4ae4557.png)