---
title: "报错model.js:515 Uncaught TypeError: Cannot read properties of undefined (reading ‘__ec_inner_30‘)"
date: "2025-09-29"
tags: []
csdnUrl: "https://blog.csdn.net/weixin_63110324/article/details/151989045"
source: csdn
---
使用 Vue3框架+vite 前端渲染echarts报错

应用场景：用echarts渲染知识图谱节点

问题排查：
1.是否因为是数据初始化为空，导致echarts不能渲染成功：

解决方式：api没有返回数据前不绘制渲染图形,等待有真实数据才返回echart渲染图形

在 initChart 中添加数据检查：如果 graphData.value.nodes.length 为 0，则显示"暂无图谱数据"错误，不初始化图表。在 loadGraphData 中：先设置数据，再调用 initChart，只有初始化成功才渲染图表。在 onMounted 中：先设置监听器，再加载数据，确保数据驱动图表创建。

解决效果：依然报错
![image](https://i-blog.csdnimg.cn/direct/5f1ac060ceae4b74935867802edbd6d2.png)

2.检查数据格式是否有问题

解决方式：

修正数据返回格式，特别是层级数据和图谱数据的转换参考

解决效果：依然报同类型错误，添加调试信息继续查看数据层级信息是否正确返回

3.检查是否为Echarts渲染的内部错误

通过2的调试信息可知，数据已被成功转换，是内部渲染出错，检查是否为图形元素状态不一致导致的。

解决方式：

在展开节点时先清理所有图形元素，避免 ECharts 内部状态冲突。先设置 { graphic: [] } 清空所有图形，然后等待一帧确保清理完成，再重新渲染图表。添加 try-catch 保护和完整的图形元素清理。

解决效果：成功解决

![image](https://i-blog.csdnimg.cn/direct/bd469cfdf1cc4d718406c511761dd932.png)

                
        
                    使用 Vue3框架+vite 前端渲染echarts报错

应用场景：用echarts渲染知识图谱节点

问题排查：
1.是否因为是数据初始化为空，导致echarts不能渲染成功：

解决方式：api没有返回数据前不绘制渲染图形,等待有真实数据才返回echart渲染图形

在 initChart 中添加数据检查：如果 graphData.value.nodes.length 为 0，则显示"暂无图谱数据"错误，不初始化图表。在 loadGraphData 中：先设置数据，再调用 initChart，只有初始化成功才渲染图表。在 onMounted 中：先设置监听器，再加载数据，确保数据驱动图表创建。

解决效果：依然报错
![image](https://i-blog.csdnimg.cn/direct/5f1ac060ceae4b74935867802edbd6d2.png)

2.检查数据格式是否有问题

解决方式：

修正数据返回格式，特别是层级数据和图谱数据的转换参考

解决效果：依然报同类型错误，添加调试信息继续查看数据层级信息是否正确返回

3.检查是否为Echarts渲染的内部错误

通过2的调试信息可知，数据已被成功转换，是内部渲染出错，检查是否为图形元素状态不一致导致的。

解决方式：

在展开节点时先清理所有图形元素，避免 ECharts 内部状态冲突。先设置 { graphic: [] } 清空所有图形，然后等待一帧确保清理完成，再重新渲染图表。添加 try-catch 保护和完整的图形元素清理。

解决效果：成功解决

![image](https://i-blog.csdnimg.cn/direct/bd469cfdf1cc4d718406c511761dd932.png)