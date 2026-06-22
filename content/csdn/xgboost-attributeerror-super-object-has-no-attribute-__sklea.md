---
title: "XGboost Attributeerror:super object has no attribute ‘__sklearn_tags__‘_‘ 报错处理"
date: "2025-02-07"
tags: []
csdnUrl: "https://blog.csdn.net/weixin_63110324/article/details/145489630"
source: csdn
---
## 工作 XGBClassifier 模型出现报错
 
error: subprocess-exited-with-error × Getting requirements to build wheel did not run successfully. 
使用工具：anaconda pycharm 
使用虚拟环境配置运行环境，添加解释器的时候需要选择现有，然后再选择创建的虚拟环境中的python.exe文件，具体配置请参考，但是最新版本的pycharm直接选择添加解释器，然后选择anaconda中你所创建虚拟环境中python.exe文件即可。 
[【Python】 pycharm+conda配置虚拟环境_conda pycharm-CSDN博客](https://blog.csdn.net/weixin_43848614/article/details/139769525?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522bda44cace5a281314919a8293ce56c2b%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=bda44cace5a281314919a8293ce56c2b&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-139769525-null-null.142^v101^control&utm_term=pycharm%E9%85%8D%E7%BD%AE%E8%99%9A%E6%8B%9F%E7%8E%AF%E5%A2%83&spm=1018.2226.3001.4187) 

![image](https://i-blog.csdnimg.cn/direct/96746e4a8ef9452697493d7b995eaea6.png)

![image](https://i-blog.csdnimg.cn/direct/36addb73532f4334b4e5a9983096cd87.png)
 

![image](https://i-blog.csdnimg.cn/direct/b0695cf3fe5446bf992c7be848922dd4.png)
 

### 1. 分类器代码出错
 
在完成基础代码编写后发现编译出错，导致XGboost分类器报错。 
重建分类器 

```
voting_cfl = VotingClassifier(
    estimators=[
        ('xgb', xgb_cfl),
        ('lgb', lgb_cfl),
        ('rf', rf_cfl)
    ],
    voting='soft',
    weights=[1, 3.33, 1]
)
```
 
若还有更多报错情况，请参考 
[【亲测有效】 XGBoost 自定义模型解决方案：解决 ‘super’ object has no attribute ‘sklearn_tags’ 问题_xgboost scikit-learn 版本兼容性最好-CSDN博客](https://blog.csdn.net/keshangan/article/details/145063584) 

### 2. scikit-learn版本问题
 
筛选完代码逻辑问题后发现可能python内依赖包出错。 
下载scikit-learn包（通常是最新版本1.6） 

```
pip install scikit-learn
```
 
这个sklearn_tags版本可能不适配 xgboost python 对象的使用。 
1.保证自己的虚拟环境纯净，没有其他的依赖包冲突。 
不确定就直接重新下载虚拟环境中的python，卸载所有的依赖包 
2.更新版本（未成功） 
scikit-learn 版本不兼容： 不同版本的 scikit-learn 对 sklearn_tags的处理方式可能不同。如果您使用的模板基于旧版本，而在新版本中运行，就可能出现此错误。 
解决方案： 
升级 scikit-learn：尝试将 scikit-learn 升级到最新版本。可以在命令行中执行： 
```
pip install --upgrade scikit-learn

```
 或者，如果使用 conda： 
```
conda update scikit-learn
```
  
3.降级（成功） 
将版本降至1.6以下 

```
pip install scikit-learn==1.5.2
```
 
同时要确保别的依赖包已安装 

![image](https://i-blog.csdnimg.cn/direct/b19c68ca29074fb28d55f89576cde821.png)
 

### tips:
 
在运行anaconda prompt时要注意管理员身份运行，不然容易出现安装依赖包failed的情况，因为不够权限写入文件夹。 
新版本说明及更多解释 
[scikit-learn 开发者 API 的变化和发展 - scikit-learn Blog](https://blog.scikit-learn.org/updates/dev-api/) 
[Adapt to scikit-learn 1.6 estimator tag changes by jameslamb · Pull Request #11021 · dmlc/xgboost](https://github.com/dmlc/xgboost/pull/11021)
                
        
                    
## 工作 XGBClassifier 模型出现报错
 
error: subprocess-exited-with-error × Getting requirements to build wheel did not run successfully. 
使用工具：anaconda pycharm 
使用虚拟环境配置运行环境，添加解释器的时候需要选择现有，然后再选择创建的虚拟环境中的python.exe文件，具体配置请参考，但是最新版本的pycharm直接选择添加解释器，然后选择anaconda中你所创建虚拟环境中python.exe文件即可。 
[【Python】 pycharm+conda配置虚拟环境_conda pycharm-CSDN博客](https://blog.csdn.net/weixin_43848614/article/details/139769525?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522bda44cace5a281314919a8293ce56c2b%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=bda44cace5a281314919a8293ce56c2b&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-139769525-null-null.142^v101^control&utm_term=pycharm%E9%85%8D%E7%BD%AE%E8%99%9A%E6%8B%9F%E7%8E%AF%E5%A2%83&spm=1018.2226.3001.4187) 

![image](https://i-blog.csdnimg.cn/direct/96746e4a8ef9452697493d7b995eaea6.png)

![image](https://i-blog.csdnimg.cn/direct/36addb73532f4334b4e5a9983096cd87.png)
 

![image](https://i-blog.csdnimg.cn/direct/b0695cf3fe5446bf992c7be848922dd4.png)
 

### 1. 分类器代码出错
 
在完成基础代码编写后发现编译出错，导致XGboost分类器报错。 
重建分类器 

```
voting_cfl = VotingClassifier(
    estimators=[
        ('xgb', xgb_cfl),
        ('lgb', lgb_cfl),
        ('rf', rf_cfl)
    ],
    voting='soft',
    weights=[1, 3.33, 1]
)
```
 
若还有更多报错情况，请参考 
[【亲测有效】 XGBoost 自定义模型解决方案：解决 ‘super’ object has no attribute ‘sklearn_tags’ 问题_xgboost scikit-learn 版本兼容性最好-CSDN博客](https://blog.csdn.net/keshangan/article/details/145063584) 

### 2. scikit-learn版本问题
 
筛选完代码逻辑问题后发现可能python内依赖包出错。 
下载scikit-learn包（通常是最新版本1.6） 

```
pip install scikit-learn
```
 
这个sklearn_tags版本可能不适配 xgboost python 对象的使用。 
1.保证自己的虚拟环境纯净，没有其他的依赖包冲突。 
不确定就直接重新下载虚拟环境中的python，卸载所有的依赖包 
2.更新版本（未成功） 
scikit-learn 版本不兼容： 不同版本的 scikit-learn 对 sklearn_tags的处理方式可能不同。如果您使用的模板基于旧版本，而在新版本中运行，就可能出现此错误。 
解决方案： 
升级 scikit-learn：尝试将 scikit-learn 升级到最新版本。可以在命令行中执行： 
```
pip install --upgrade scikit-learn

```
 或者，如果使用 conda： 
```
conda update scikit-learn
```
  
3.降级（成功） 
将版本降至1.6以下 

```
pip install scikit-learn==1.5.2
```
 
同时要确保别的依赖包已安装 

![image](https://i-blog.csdnimg.cn/direct/b19c68ca29074fb28d55f89576cde821.png)
 

### tips:
 
在运行anaconda prompt时要注意管理员身份运行，不然容易出现安装依赖包failed的情况，因为不够权限写入文件夹。 
新版本说明及更多解释 
[scikit-learn 开发者 API 的变化和发展 - scikit-learn Blog](https://blog.scikit-learn.org/updates/dev-api/) 
[Adapt to scikit-learn 1.6 estimator tag changes by jameslamb · Pull Request #11021 · dmlc/xgboost](https://github.com/dmlc/xgboost/pull/11021)