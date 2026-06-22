---
title: "在GitHub上搭建个人博客"
date: "2024-05-31"
tags: []
csdnUrl: "https://blog.csdn.net/weixin_63110324/article/details/131760300"
source: csdn
---
本篇文章主要记录我个人建立博客时的疑难解决过程，希望对你有所帮助 
主要参考这位博客园大神的文章（真的很详细） 
[https://www.cnblogs.com/chenlove/p/15058170.htmlhttps://www.cnblogs.com/chenlove/p/15058170.html](https://www.cnblogs.com/chenlove/p/15058170.html) 
第一个问题：在git中提示bash: npm: command not found 
原因没有配置变量 
参考这篇文章直接配置就能直接解决，注意别把安装路径弄混就行 
[https://www.cnblogs.com/chenlove/p/15058170.htmlhttps://www.cnblogs.com/chenlove/p/15058170.html](https://www.cnblogs.com/chenlove/p/15058170.html)
![image](https://i-blog.csdnimg.cn/blog_migrate/b5b25c4346fd1b138b394f50a1957e37.png)
 
 第二个问题：在配置进行到hexo init这步时报错 not empty 
你想要配置到哪个盘，相应的hexo就要装到哪个盘哈 
检查发现 

![image](https://i-blog.csdnimg.cn/blog_migrate/4a7d7b4b8b441d461877e7d9b9d64c5f.png)
 
删除后再尝试（ok啦！学好英文还是很重要的） 

![image](https://i-blog.csdnimg.cn/blog_migrate/3b570a7400cd26ce66e6e62f70cfde16.png)
 
第三个问题：显示git not found 
没有安装相关插件 

![image](https://i-blog.csdnimg.cn/blog_migrate/dd51a9f790271ae8aed9687c2aaea7e1.png)
 

```
$ npm install hexo-deployer-git --save

```
 
冒号后必须有空格！！！！！！ 

![image](https://i-blog.csdnimg.cn/blog_migrate/5ac40c3a4df9097e2dc76ab93478640f.png)
 
 
 后续就没有什么问题了，只差美化就可以了~~~ 
 
 

                
        
                    本篇文章主要记录我个人建立博客时的疑难解决过程，希望对你有所帮助 
主要参考这位博客园大神的文章（真的很详细） 
[https://www.cnblogs.com/chenlove/p/15058170.htmlhttps://www.cnblogs.com/chenlove/p/15058170.html](https://www.cnblogs.com/chenlove/p/15058170.html) 
第一个问题：在git中提示bash: npm: command not found 
原因没有配置变量 
参考这篇文章直接配置就能直接解决，注意别把安装路径弄混就行 
[https://www.cnblogs.com/chenlove/p/15058170.htmlhttps://www.cnblogs.com/chenlove/p/15058170.html](https://www.cnblogs.com/chenlove/p/15058170.html)
![image](https://i-blog.csdnimg.cn/blog_migrate/b5b25c4346fd1b138b394f50a1957e37.png)
 
 第二个问题：在配置进行到hexo init这步时报错 not empty 
你想要配置到哪个盘，相应的hexo就要装到哪个盘哈 
检查发现 

![image](https://i-blog.csdnimg.cn/blog_migrate/4a7d7b4b8b441d461877e7d9b9d64c5f.png)
 
删除后再尝试（ok啦！学好英文还是很重要的） 

![image](https://i-blog.csdnimg.cn/blog_migrate/3b570a7400cd26ce66e6e62f70cfde16.png)
 
第三个问题：显示git not found 
没有安装相关插件 

![image](https://i-blog.csdnimg.cn/blog_migrate/dd51a9f790271ae8aed9687c2aaea7e1.png)
 

```
$ npm install hexo-deployer-git --save

```
 
冒号后必须有空格！！！！！！ 

![image](https://i-blog.csdnimg.cn/blog_migrate/5ac40c3a4df9097e2dc76ab93478640f.png)
 
 
 后续就没有什么问题了，只差美化就可以了~~~