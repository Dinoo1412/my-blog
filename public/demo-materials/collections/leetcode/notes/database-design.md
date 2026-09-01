# CoPaw 数据库设计文档

## 概述

CoPaw 数据库采用 MySQL 8.0，使用 `utf8mb4` 字符集以支持完整的 Unicode 字符（包括 Emoji）。数据库设计遵循第三范式，同时考虑查询性能做了适当的冗余设计。

**数据库名称**：`rj_copaw`

---

## 表结构详解

### 1. users（用户表）

存储系统中所有注册用户的基本信息。

| 字段名 | 数据类型 | 约束 | 默认值 | 说明 |
|--------|----------|------|--------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | - | 用户唯一标识 |
| email | VARCHAR(255) | NOT NULL, UNIQUE | - | 登录邮箱，系统唯一 |
| hashed_password | VARCHAR(255) | NOT NULL | - | 密码哈希值（bcrypt算法） |
| username | VARCHAR(100) | - | - | 用户昵称 |
| is_active | BOOLEAN | - | TRUE | 账户是否激活 |
| is_superuser | BOOLEAN | - | FALSE | 是否为超级管理员 |
| created_at | TIMESTAMP | - | CURRENT_TIMESTAMP | 账户创建时间 |
| updated_at | TIMESTAMP | - | CURRENT_TIMESTAMP | 最后更新时间 |

**索引**：
- `idx_users_email`：邮箱索引，加速登录查询
- `idx_users_is_active`：激活状态索引

**业务规则**：
- 邮箱必须唯一，用于登录和找回密码
- 密码使用 bcrypt 算法加密，存储哈希值而非明文
- 软删除通过 `is_active` 字段实现

---

### 2. projects（项目表）

存储用户创建的项目信息。

| 字段名 | 数据类型 | 约束 | 默认值 | 说明 |
|--------|----------|------|--------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | - | 项目唯一标识 |
| user_id | BIGINT | FOREIGN KEY → users(id), NOT NULL | - | 所属用户ID |
| name | VARCHAR(255) | NOT NULL | - | 项目名称 |
| description | TEXT | - | - | 项目描述 |
| status | ENUM | - | 'draft' | 项目状态 |
| created_at | TIMESTAMP | - | CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | - | CURRENT_TIMESTAMP | 更新时间 |

**status 枚举值**：
| 值 | 中文 | 说明 |
|----|------|------|
| draft | 草稿 | 项目已创建，未开始生成 |
| processing | 处理中 | 正在执行生成任务 |
| completed | 已完成 | 最后一次生成任务完成 |
| failed | 失败 | 最后一次生成任务失败 |

**索引**：
- `idx_projects_user_id`：用户ID索引，用于查询用户的所有项目
- `idx_projects_status`：状态索引，用于按状态筛选项目
- `idx_projects_created_at`：创建时间索引，用于排序

**外键约束**：
- `user_id` → `users(id)`，删除用户时级联删除项目（ON DELETE CASCADE）

**业务规则**：
- 每个用户可以创建多个项目
- 项目状态随任务状态自动更新
- 项目删除时，关联的输入和任务记录自动删除

---

### 3. project_inputs（项目输入表）

存储项目的详细输入信息，即用户填写的需求表单数据。

| 字段名 | 数据类型 | 约束 | 默认值 | 说明 |
|--------|----------|------|--------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | - | 记录唯一标识 |
| project_id | BIGINT | FOREIGN KEY → projects(id), UNIQUE, NOT NULL | - | 关联项目ID |
| user_company | VARCHAR(255) | - | - | 用户所属公司 |
| user_role | VARCHAR(100) | - | - | 用户角色/职位 |
| user_department | VARCHAR(100) | - | - | 用户所在部门 |
| user_background | TEXT | - | - | 用户背景详细描述 |
| project_background | TEXT | - | - | 项目背景详细描述 |
| project_goals | TEXT | - | - | 项目目标 |
| target_users | TEXT | - | - | 目标用户群体 |
| key_features | TEXT | - | - | 核心功能需求 |
| constraints | TEXT | - | - | 约束条件/限制 |
| additional_requirements | TEXT | - | - | 额外需求说明 |
| created_at | TIMESTAMP | - | CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | - | CURRENT_TIMESTAMP | 更新时间 |

**索引**：
- `idx_project_inputs_project_id`：项目ID索引

**外键约束**：
- `project_id` → `projects(id)`，删除项目时级联删除（ON DELETE CASCADE）

**业务规则**：
- 与项目表是 1:1 关系，一个项目只有一条输入记录
- `project_id` 字段设置 UNIQUE 约束确保一对一关系
- 用户可以在创建项目时填写，也可以后续补充

---

### 4. tasks（任务表）

存储每次"生成"操作的执行记录和状态。

| 字段名 | 数据类型 | 约束 | 默认值 | 说明 |
|--------|----------|------|--------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | - | 任务唯一标识 |
| project_id | BIGINT | FOREIGN KEY → projects(id), NOT NULL | - | 所属项目ID |
| user_id | BIGINT | FOREIGN KEY → users(id), NOT NULL | - | 所属用户ID（冗余） |
| status | ENUM | - | 'pending' | 任务状态 |
| current_stage | ENUM | - | 'init' | 当前执行阶段 |
| stage_progress | JSON | - | - | 各阶段详细进度 |
| error_message | TEXT | - | - | 错误信息 |
| celery_task_id | VARCHAR(255) | - | - | Celery异步任务ID |
| started_at | TIMESTAMP | - | - | 任务开始时间 |
| completed_at | TIMESTAMP | - | - | 任务完成时间 |
| created_at | TIMESTAMP | - | CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | - | CURRENT_TIMESTAMP | 更新时间 |

**status 枚举值**：
| 值 | 中文 | 说明 |
|----|------|------|
| pending | 等待中 | 任务已创建，等待执行 |
| running | 运行中 | 任务正在执行 |
| completed | 已完成 | 任务执行成功 |
| failed | 失败 | 任务执行失败 |
| cancelled | 已取消 | 任务被用户取消 |

**current_stage 枚举值**：
| 值 | 中文 | 说明 |
|----|------|------|
| init | 初始化 | 任务初始化阶段 |
| requirement_analysis | 需求分析 | 分析用户需求和背景 |
| prd_generation | PRD生成 | 生成产品需求文档 |
| prototype_design | 原型设计 | 设计产品原型 |
| code_generation | 代码生成 | 生成项目代码 |
| deployment | 部署准备 | 准备部署和演示环境 |
| completed | 已完成 | 所有阶段完成 |

**stage_progress JSON 格式示例**：
```json
{
  "requirement_analysis": {
    "status": "completed",
    "progress": 20,
    "message": "需求分析完成",
    "updated_at": "2024-01-15T10:30:00Z"
  },
  "prd_generation": {
    "status": "running",
    "progress": 15,
    "message": "正在生成PRD文档...",
    "updated_at": "2024-01-15T10:35:00Z"
  },
  "prototype_design": {
    "status": "pending",
    "progress": 0,
    "message": ""
  }
}
```

**索引**：
- `idx_tasks_project_id`：项目ID索引
- `idx_tasks_user_id`：用户ID索引
- `idx_tasks_status`：状态索引
- `idx_tasks_celery_task_id`：Celery任务ID索引
- `idx_tasks_created_at`：创建时间索引

**外键约束**：
- `project_id` → `projects(id)`，级联删除
- `user_id` → `users(id)`，级联删除

**业务规则**：
- 一个项目可以有多个任务（支持多次生成）
- `user_id` 冗余存储，便于权限校验和查询
- 任务执行过程通过 SSE 实时推送到前端

---

### 5. task_artifacts（任务产物表）

存储任务生成的各类产物（文档、代码、链接等）。

| 字段名 | 数据类型 | 约束 | 默认值 | 说明 |
|--------|----------|------|--------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | - | 产物唯一标识 |
| task_id | BIGINT | FOREIGN KEY → tasks(id), NOT NULL | - | 所属任务ID |
| type | ENUM | NOT NULL | - | 产物类型 |
| name | VARCHAR(255) | NOT NULL | - | 产物名称 |
| content | LONGTEXT | - | - | 文本内容 |
| file_path | VARCHAR(500) | - | - | 文件存储路径 |
| file_size | BIGINT | - | - | 文件大小（字节） |
| mime_type | VARCHAR(100) | - | - | MIME类型 |
| metadata | JSON | - | - | 额外元数据 |
| created_at | TIMESTAMP | - | CURRENT_TIMESTAMP | 创建时间 |

**type 枚举值**：
| 值 | 中文 | 存储方式 | 说明 |
|----|------|----------|------|
| prd | PRD文档 | content 字段 | 产品需求文档（Markdown格式） |
| prototype | 原型 | file_path 字段 | 设计原型文件 |
| demo_url | 演示链接 | content 字段 | 在线演示地址 |
| source_code | 源代码 | file_path 字段 | 生成的代码文件 |
| documentation | 文档 | content/file_path | 其他文档 |
| other | 其他 | - | 其他类型产物 |

**索引**：
- `idx_task_artifacts_task_id`：任务ID索引
- `idx_task_artifacts_type`：产物类型索引

**外键约束**：
- `task_id` → `tasks(id)`，级联删除

**业务规则**：
- 一个任务可以产生多个产物
- 文本类产物（PRD、链接）存储在 `content` 字段
- 文件类产物存储在文件系统，`file_path` 记录路径

---

### 6. refresh_tokens（刷新令牌表）

管理JWT刷新令牌，支持令牌吊销和会话管理。

| 字段名 | 数据类型 | 约束 | 默认值 | 说明 |
|--------|----------|------|--------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | - | 记录唯一标识 |
| user_id | BIGINT | FOREIGN KEY → users(id), NOT NULL | - | 所属用户ID |
| token_hash | VARCHAR(255) | UNIQUE, NOT NULL | - | 令牌哈希值（SHA256） |
| expires_at | TIMESTAMP | NOT NULL | - | 令牌过期时间 |
| revoked | BOOLEAN | - | FALSE | 是否已吊销 |
| created_at | TIMESTAMP | - | CURRENT_TIMESTAMP | 创建时间 |

**索引**：
- `idx_refresh_tokens_user_id`：用户ID索引
- `idx_refresh_tokens_token_hash`：令牌哈希索引
- `idx_refresh_tokens_expires_at`：过期时间索引

**外键约束**：
- `user_id` → `users(id)`，级联删除

**业务规则**：
- 刷新令牌有效期 7 天
- 存储令牌的 SHA256 哈希值而非原始值
- 用户可以主动吊销令牌（退出登录）
- 支持多点登录，一个用户可有多个有效令牌

---

### 7. task_events（任务事件日志表）

记录任务执行过程中的所有事件，用于SSE推送和历史查询。

| 字段名 | 数据类型 | 约束 | 默认值 | 说明 |
|--------|----------|------|--------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | - | 事件唯一标识 |
| task_id | BIGINT | FOREIGN KEY → tasks(id), NOT NULL | - | 所属任务ID |
| event_type | VARCHAR(50) | NOT NULL | - | 事件类型 |
| stage | VARCHAR(50) | - | - | 相关阶段 |
| message | TEXT | - | - | 事件消息 |
| progress | INT | - | 0 | 进度百分比(0-100) |
| data | JSON | - | - | 额外数据 |
| created_at | TIMESTAMP | - | CURRENT_TIMESTAMP | 事件时间 |

**event_type 事件类型**：
| 值 | 中文 | 说明 |
|----|------|------|
| task_started | 任务开始 | 任务开始执行 |
| stage_started | 阶段开始 | 某个阶段开始执行 |
| stage_completed | 阶段完成 | 某个阶段执行完成 |
| task_done | 任务完成 | 整个任务执行成功 |
| task_failed | 任务失败 | 任务执行失败 |

**索引**：
- `idx_task_events_task_id`：任务ID索引
- `idx_task_events_created_at`：创建时间索引

**外键约束**：
- `task_id` → `tasks(id)`，级联删除

**业务规则**：
- 每个任务产生的事件按时间顺序存储
- 前端通过 SSE 订阅事件流，实现实时进度更新
- 支持断点续传，通过 `since_id` 参数获取后续事件

---

## 表关系图

### ER 图

```
                                    ┌─────────────────────┐
                                    │       users         │
                                    │─────────────────────│
                                    │ PK id               │
                                    │    email            │
                                    │    hashed_password  │
                                    │    username         │
                                    └──────────┬──────────┘
                                               │
                              ┌────────────────┴────────────────┐
                              │                                 │
                              │ 1:N                             │ 1:N
                              ▼                                 ▼
                    ┌─────────────────────┐           ┌─────────────────────┐
                    │      projects       │           │   refresh_tokens    │
                    │─────────────────────│           │─────────────────────│
                    │ PK id               │           │ PK id               │
                    │ FK user_id    ──────┼───────────│ FK user_id          │
                    │    name             │           │    token_hash       │
                    │    description      │           │    expires_at       │
                    │    status           │           │    revoked          │
                    └──────────┬──────────┘           └─────────────────────┘
                               │
                               │ 1:1
                               ▼
                    ┌─────────────────────┐
                    │   project_inputs    │
                    │─────────────────────│
                    │ PK id               │
                    │ FK project_id  ─────┤ UK
                    │    user_company     │
                    │    user_role        │
                    │    user_background  │
                    │    project_background
                    │    key_features     │
                    └─────────────────────┘


                    ┌─────────────────────┐
                    │      projects       │
                    └──────────┬──────────┘
                               │
                               │ 1:N
                               ▼
                    ┌─────────────────────┐
                    │        tasks        │
                    │─────────────────────│
                    │ PK id               │
                    │ FK project_id  ─────┤
                    │ FK user_id    ──────┼───┐ (冗余)
                    │    status           │   │
                    │    current_stage    │   │
                    │    stage_progress   │   │
                    │    celery_task_id   │   │
                    └──────────┬──────────┘   │
                               │              │
              ┌────────────────┴────────┐     │
              │ 1:N                     │ 1:N│
              ▼                         ▼    │
    ┌─────────────────────┐  ┌─────────────────────┐
    │   task_artifacts    │  │     task_events     │
    │─────────────────────│  │─────────────────────│
    │ PK id               │  │ PK id               │
    │ FK task_id     ─────┤  │ FK task_id     ─────┤
    │    type             │  │    event_type       │
    │    name             │  │    stage            │
    │    content          │  │    message          │
    │    file_path        │  │    progress         │
    └─────────────────────┘  └─────────────────────┘
```

### 关系总结

| 主表 | 从表 | 关系 | 说明 |
|------|------|------|------|
| users | projects | 1:N | 一个用户可以创建多个项目 |
| users | refresh_tokens | 1:N | 一个用户可以有多个登录会话 |
| projects | project_inputs | 1:1 | 一个项目对应一条输入记录 |
| projects | tasks | 1:N | 一个项目可以多次生成 |
| tasks | task_artifacts | 1:N | 一个任务产生多个产物 |
| tasks | task_events | 1:N | 一个任务产生多个事件记录 |

---

## 业务流程

### 1. 用户注册与登录流程

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   用户注册   │────▶│ users 表    │────▶│  密码加密   │
└─────────────┘     │ 插入记录    │     │  (bcrypt)   │
                    └─────────────┘     └─────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   用户登录   │────▶│ 验证密码    │────▶│ 生成 Token  │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                    ┌─────────────┐     ┌──────▼──────┐
                    │refresh_tokens│◀───│  存储 Token │
                    │  插入记录    │     │  哈希值    │
                    └─────────────┘     └─────────────┘
```

### 2. 项目创建与输入流程

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  创建项目   │────▶│ projects 表 │────▶│ status=draft│
└─────────────┘     │ 插入记录    │     └─────────────┘
                    └─────────────┘
                           │
                           ▼
┌─────────────┐     ┌─────────────┐
│  填写表单   │────▶│project_inputs│
│  用户背景   │     │  插入记录   │
│  项目背景   │     └─────────────┘
└─────────────┘
```

### 3. 任务生成流程

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ 开始生成    │────▶│ tasks 表    │────▶│ Celery 异步 │
└─────────────┘     │ status=pending│   │  任务启动   │
                    └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ stages...   │◀───│task_events  │◀───│  各阶段执行 │
│ 需求分析    │     │ 记录事件    │     │  更新进度   │
│ PRD生成     │     └─────────────┘     └─────────────┘
│ 原型设计    │
│ 代码生成    │
│ 部署准备    │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ 生成产物    │────▶│task_artifacts│────▶│ 更新 status │
│ PRD/原型/链接│    │  插入记录   │     │ = completed │
└─────────────┘     └─────────────┘     └─────────────┘
```

### 4. SSE 实时推送流程

```
┌─────────────┐                    ┌─────────────┐
│   前端      │                    │   后端      │
│ EventSource │                    │ SSE Endpoint│
└──────┬──────┘                    └──────┬──────┘
       │                                  │
       │  GET /tasks/{id}/stream          │
       │─────────────────────────────────▶│
       │                                  │
       │                    ┌─────────────┴─────────────┐
       │                    │ 轮询 task_events 表       │
       │                    │ SELECT * WHERE id > last │
       │                    └─────────────┬─────────────┘
       │                                  │
       │  event: task_update              │
       │◀─────────────────────────────────│
       │  data: {stage, progress, ...}    │
       │                                  │
       │  event: task_complete            │
       │◀─────────────────────────────────│
       │  data: {status: "completed"}     │
       │                                  │
       │  连接关闭                         │
       │                                  │
```

---

## 数据隔离与安全

### 强制用户过滤

所有涉及用户数据的查询都必须包含 `user_id` 过滤条件：

```sql
-- 项目查询
SELECT * FROM projects WHERE id = ? AND user_id = ?

-- 任务查询
SELECT * FROM tasks WHERE id = ? AND user_id = ?

-- 产物查询（通过任务关联）
SELECT a.* FROM task_artifacts a
JOIN tasks t ON a.task_id = t.id
WHERE t.id = ? AND t.user_id = ?
```

### JWT 认证流程

```
请求 → Bearer Token → 验证签名 → 检查过期 → 获取 user_id → 查询用户 → 权限校验
                                                    │
                                                    ▼
                                          后续查询携带 user_id
```

---

## 性能优化建议

### 索引使用

| 查询场景 | 推荐索引 | 说明 |
|----------|----------|------|
| 用户登录 | idx_users_email | 邮箱查询 |
| 项目列表 | idx_projects_user_id + idx_projects_created_at | 用户项目分页查询 |
| 任务状态 | idx_tasks_status + idx_tasks_user_id | 任务状态筛选 |
| SSE轮询 | idx_task_events_task_id + 主键 | 事件增量查询 |

### 分区建议

对于数据量较大的表，建议按时间分区：

```sql
-- task_events 表按月分区（示例）
ALTER TABLE task_events PARTITION BY RANGE (YEAR(created_at) * 100 + MONTH(created_at)) (
    PARTITION p202401 VALUES LESS THAN (202402),
    PARTITION p202402 VALUES LESS THAN (202403),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);
```

### 归档策略

建议定期归档历史数据：

- `task_events`：保留最近 3 个月，超期归档
- `tasks`：保留最近 1 年，超期归档
- `task_artifacts`：文件定期清理或转存对象存储

---

## 附录

### 完整建表 SQL

详见 `database/init.sql` 文件。

### 数据字典版本

| 版本 | 日期 | 修改内容 |
|------|------|----------|
| 1.0 | 2026-04-10 | 初始版本 |
