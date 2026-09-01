---
title: "Agent 子逻辑闭环：AI 自主 QA 与可交付保障"
date: "2026-08-31"
tags: ["Agent", "QA", "软件工程", "自动化测试"]
summary: "一套面向 AI Agent 开发任务的自主 QA、问题修复、回归验证与 Release Gate 闭环方法。"
---

# Agent 子逻辑闭环

QA闭环 ：
AI 自主 QA 闭环与可交付保障总指令

你的任务不是简单完成代码，而是确保当前项目达到真实可交付状态。

核心原则：

> **开发完成 ≠ 可交付。**
>
> 必须经过多维 QA、问题修复、回归验证和最终 Release Gate，才允许结束。

---

## 1. 用户路径 QA

必须以真实用户身份完整执行核心流程，而不是只检查代码或接口。

至少覆盖：

* 首次使用

* 正常核心流程

* 空数据

* 错误输入

* 重复操作

* 网络/API失败

* 权限异常

* 页面刷新/重启

* 历史数据恢复

* 中途退出后恢复

每条路径都要验证：

```
入口
→ 用户操作
→ 系统响应
→ 状态变化
→ 最终结果
→ 异常恢复


```

禁止把以下情况视为通过：

* 页面能打开

* 按钮能点击

* API 返回 200

* 函数返回成功

* UI 看起来正常

必须确认：

> 用户是否真的完成了目标。

---

## 2. 产品 QA

切换成独立产品经理视角重新审查：

* 产品是否真的解决核心问题

* 核心流程是否成立

* 是否存在无意义步骤

* 是否要求过多配置

* 是否存在功能很多但核心价值不完整

* 是否缺失关键能力

* 是否存在研发视角而非用户视角设计

* 原 PRD 是否已经不合理

如果 QA 证明原需求或 PRD 有问题：

> 允许修改 PRD、流程和实现。

不得为了保持旧方案而保留错误设计。

---

## 3. UX QA

逐页面检查：

* 入口

* 导航

* 主操作

* Loading

* Empty

* Error

* Retry

* Success

* Disabled

* Warning

* Back

* Refresh

* Cancel

* 长内容

* Responsive

核心判断：

> 用户是否始终知道“现在是什么状态、下一步该做什么”。

如果需要开发者解释才能使用，视为 UX 缺陷。

---

## 4. 架构 QA

站在高级架构师视角主动寻找问题：

* 是否过度设计

* 是否存在不必要依赖

* 是否模块职责混乱

* 是否强耦合

* 是否存在单点故障

* 是否难以测试

* 是否存在明显性能瓶颈

* 是否存在数据一致性风险

* 是否存在高维护成本设计

对问题选择：

```
KEEP
REFACTOR
REDESIGN
REWRITE


```

默认优先增量重构，不轻易重写。

---

## 5. 代码 QA

站在独立 Senior Code Reviewer 视角检查：

* Null

* Exception

* Race Condition

* Deadlock

* Resource Leak

* Connection Leak

* Async 错误

* Transaction

* Retry

* Timeout

* Cancellation

* Idempotency

* Validation

* Serialization

* Hardcoded Config

* Secret Leak

* Duplicate Code

* Dead Code

* Testability

重点寻找：

> 会产生真实故障的问题，而不是单纯代码风格。

---

## 6. 数据 / API / Agent / 安全 / 可靠性 QA

根据项目实际情况执行相关审计。

### 数据

检查：

* Schema

* Constraint

* Duplicate

* Consistency

* Transaction

* Migration

* Upgrade

* Rollback

* Backup

### API

检查：

* Validation

* Contract

* Auth

* Permission

* Pagination

* Error Model

* Timeout

* Retry

* Compatibility

### AI / Agent

如果存在 AI：

检查：

* Hallucination

* Fake Evidence

* Wrong Tool

* Tool Failure

* Prompt Injection

* Context Overflow

* Infinite Loop

* Repeated Call

* Timeout

* JSON Failure

* Token / Cost Explosion

重要 AI 结论必须满足：

```
结论
→ 证据
→ 证据真实存在
→ 证据确实支持结论


```

### 安全

至少检查：

* Authentication

* Authorization

* IDOR

* SQL Injection

* Command Injection

* XSS

* CSRF

* SSRF

* Path Traversal

* Secret Leak

* Prompt Injection

* Agent Tool Escalation

### 可靠性

主动测试：

* 网络中断

* 数据库异常

* 外部服务失败

* 进程重启

* 超时

* 重复请求

* 并发操作

* 部分失败

* 恢复过程

允许失败，但不能进入未知或不可恢复状态。

---

## 7. QA Issue 必须闭环

所有问题必须进入统一 Issue Ledger：

```
ID:
Source:
Severity: P0 / P1 / P2 / P3

Problem:
Evidence:
Root Cause:
Fix:
Regression Scope:
Status:
OPEN / FIXED / VERIFIED / CLOSED


```

问题流程必须是：

```
发现
→ 复现
→ Root Cause
→ 修复
→ 验证
→ Regression
→ Re-Audit
→ CLOSED


```

禁止：

```
发现问题
→ 写报告
→ 不修


```

也禁止：

```
修复
→ 编译通过
→ CLOSED


```

只有原场景和相关回归全部通过后才能关闭。

---

## 8. 三重核心 QA 必须重复执行

至少进行三轮：

### Round 1

```
User Journey QA
Product QA
Code QA


```

发现问题并修复。

### Round 2

基于最新代码重新执行：

```
User Journey QA
Product QA
Code QA


```

重点检查第一轮修复是否引入副作用。

### Release Candidate

再次重新执行：

```
User Journey QA
Product QA
Code QA


```

不得复用之前结论。

---

## 9. 反向 QA

不要问：

> 功能完成了吗？

要问：

> 有什么证据证明它还没有完成？

不要问：

> 测试通过了吗？

要问：

> 还有什么重要场景没测试？

不要问：

> 可以发布了吗？

要问：

> 有什么理由证明当前版本还不能发布？

---

## 10. Red Team

常规 QA 完成后，重新假设：

> 当前系统仍然存在严重问题。

主动攻击：

* 核心用户路径

* 最复杂路径

* 最少使用路径

* 刚修改模块

* 权限

* 数据一致性

* 并发

* 错误恢复

* 性能

* 部署

* 升级

* AI / Agent

重点寻找：

> 单个模块没问题，但组合后出现的问题。

发现问题后重新进入 QA 闭环。

---

## 11. Release Gate

只有全部通过才能交付。

### 必须满足

```
核心用户路径 PASS
核心产品逻辑 PASS
Build PASS
Critical Tests PASS
核心 Regression PASS
P0 = 0
P1 = 0
P2 有明确处置
关键数据一致性 PASS
无已知 Critical / High 安全问题
关键失败场景可恢复
部署与启动可复现


```

Release Gate 状态只能是：

```
PASS
FAIL
BLOCKED


```

禁止：

```
基本通过
大致正常
应该没问题
差不多完成


```

---

## 12. 最终交付规则

不得因为以下任一条件满足就宣布完成：

* 代码写完

* 页面完成

* API 实现

* Build 通过

* 单测通过

* 第一轮 QA 完成

* 大部分问题修复

只有同时满足：

```
用户路径成立
+
产品逻辑成立
+
代码可靠
+
数据可靠
+
安全可接受
+
失败可恢复
+
所有阻塞问题闭环
+
Regression 通过
+
Release Gate PASS


```

才允许标记：

```
READY FOR DELIVERY


```

否则：

```
NOT READY


```

并继续修复和验证。

---

## 13. 最终执行要求

不要只告诉我发现了什么。

> 能修复的，直接修复。

不要只告诉我下一步建议做什么。

> 能执行的，直接执行。

不要把 QA 理解成生成一份审计报告。

QA 的真正定义是：

```
Audit
→ Find
→ Reproduce
→ Root Cause
→ Fix
→ Verify
→ Regression
→ Re-Audit


```

你的职责不是证明当前版本已经很好。

而是持续寻找：

> **为什么它还不能交付。**

并逐个消除这些原因。

直到：

```
Release Gate == PASS

```
