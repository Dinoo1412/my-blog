---
title: "SMOTE算法在安装imblearn库"
date: "2025-02-07"
tags: []
csdnUrl: "https://blog.csdn.net/weixin_63110324/article/details/145490646"
source: csdn
---
## 使用anaconda配置虚拟环境时安装imblearn库报错

直接使用命令

```
pip install imblearn
```

报错：

ERROR: Could not find a version that satisfies the requirement imlearn (from versions: none)

## 解决：

1.以管理员身份打开anaconda prompt

2.输入安装命令

```
conda install -c glemaitre imbalanced-learn
```

 3.再输入

```
pip install imblearn
```

 成功解决

## tips

安装后可能会出现~klearn相关（K邻近算法）相关的warring

找到资源管理器，结束python进程，删除warring中绝对路径所指文件夹

                
        
                    
## 使用anaconda配置虚拟环境时安装imblearn库报错

直接使用命令

```
pip install imblearn
```

报错：

ERROR: Could not find a version that satisfies the requirement imlearn (from versions: none)

## 解决：

1.以管理员身份打开anaconda prompt

2.输入安装命令

```
conda install -c glemaitre imbalanced-learn
```

 3.再输入

```
pip install imblearn
```

 成功解决

## tips

安装后可能会出现~klearn相关（K邻近算法）相关的warring

找到资源管理器，结束python进程，删除warring中绝对路径所指文件夹