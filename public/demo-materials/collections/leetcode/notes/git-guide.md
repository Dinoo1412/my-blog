# Git 使用文档

## 1. Git 多账号配置（GitHub / GitLab / 码云）

参考：

* [Git 配置多端多个账号（码云、GitHub、GitLab）](https://www.cnblogs.com/DL-CODER/p/17302223.html?utm_source=chatgpt.com)

### 1.1 删除全局账号配置

```bash
git config --global --unset user.name
git config --global --unset user.email
```

---

### 1.2 为单个项目配置账号

进入项目目录后执行：

```bash
git config user.name "用户名"
git config user.email "邮箱"
```

查看当前仓库配置：

```bash
git config --list
```

---

# 2. Git 基础教程

## 2.1 Git 冲突处理

参考：

* [解决冲突 - Git教程 - 廖雪峰](https://liaoxuefeng.com/books/git/branch/merge/index.html?utm_source=chatgpt.com)

---

## 2.2 Git Rebase（变基）

参考：

* [Git - 变基](https://git-scm.com/book/zh/v2/Git-分支-变基?utm_source=chatgpt.com)
* [git rebase VS git merge](https://www.cnblogs.com/FraserYu/p/11192840.html?utm_source=chatgpt.com)

---

# 3. Git 远程分支关联

## 3.1 本地已有分支，关联远程分支

```bash
git branch --set-upstream-to=origin/远程分支名
```

---

## 3.2 本地没有分支，创建并推送

### 创建本地分支

```bash
git checkout -b 新分支名
```

### 推送到远程并建立关联

```bash
git push --set-upstream origin 分支名
```

或：

```bash
git push -u origin 分支名
```

---

# 4. 从已有分支创建新分支

## 示例：从 dev 创建 ai_doc

### 1）切换到 dev

```bash
git checkout dev
```

### 2）创建新分支

```bash
git checkout -b ai_doc
```

### 3）推送到远程

```bash
git push -u origin ai_doc
```

---

# 5. Git 分支与状态查看

## 5.1 查看提交记录

```bash
git log --oneline
```

---

## 5.2 查看远程仓库

```bash
git remote -v
```

---

## 5.3 查看本地分支

```bash
git branch
```

---

## 5.4 查看工作区改动

```bash
git status
git diff
```

---

# 6. Git Tag 标签管理

## 6.1 创建注释标签

```bash
git tag -a 标签名 -m "注释内容"
```

---

## 6.2 查看标签

```bash
git tag
```

---

## 6.3 删除本地标签

```bash
git tag -d 标签名
```

---

## 6.4 删除远程标签

```bash
git push origin :refs/tags/标签名
```

---

## 6.5 不同分支使用同名标签

Git 默认会将同名标签指向最近提交。

推荐使用：

```bash
git tag 分支名/标签名
```

例如：

```bash
git tag dev/v1.0
```

---

# 7. Git Rebase（变基）完整流程

## 7.1 开始变基

```bash
git checkout feature
git rebase main
```

含义：

* feature 分支基于 main 最新提交重新排列
* 提交历史会更加线性

---

## 7.2 发生冲突后的处理

### 手动解决冲突

编辑冲突文件。

---

### 标记已解决

```bash
git add .
```

---

### 继续变基

```bash
git rebase --continue
```

---

### 跳过当前提交（谨慎）

```bash
git rebase --skip
```

---

### 中止变基

```bash
git rebase --abort
```

---

# 8. 推送代码到不同远程仓库

## 8.1 添加远程仓库

```bash
git remote add 仓库名 仓库地址
```

例如：

```bash
git remote add github https://github.com/xxx/demo.git
git remote add gitlab https://gitlab.com/xxx/demo.git
```

---

## 8.2 推送指定分支

```bash
git push 远程仓库名 本地分支名:远程分支名
```

例如：

```bash
git push github dev:main
```

---

## 8.3 强制推送覆盖远程主分支

```bash
git push origin feature-branch:master -f
```

注意：

* 会覆盖远程 master
* 谨慎使用

---

# 9. Git Stash 临时保存修改

适用场景：

* 当前功能未开发完成
* 需要紧急切换分支处理问题
* 不希望现在提交代码

---

## 9.1 保存当前修改

```bash
git stash
```

带备注：

```bash
git stash save "临时保存：登录功能开发中"
```

---

## 9.2 查看 stash 列表

```bash
git stash list
```

---

## 9.3 切换分支

```bash
git checkout dev
```

---

## 9.4 恢复最近一次 stash

恢复并删除：

```bash
git stash pop
```

恢复但保留：

```bash
git stash apply
```

---

## 9.5 恢复指定 stash

```bash
git stash pop stash@{1}
```

---

## 9.6 删除 stash

删除指定：

```bash
git stash drop stash@{0}
```

清空全部：

```bash
git stash clear
```

---

# 10. 设置 Upstream 跟踪分支

```bash
git branch --set-upstream-to=upstream/main main
```

---

# 11. Git Reflog 恢复误删提交

参考：

* [利用 git reflog 恢复 Git 操作历史](https://zhuanlan.zhihu.com/p/685073933?utm_source=chatgpt.com)

---

## 11.1 查看 reflog

```bash
git reflog
```

---

## 11.2 恢复到指定提交

```bash
git reset --hard commit_id
```

适用于：

* reset --hard 后恢复
* 删除分支后恢复
* 找回历史提交

---

# 12. 修改 Commit 信息

## 修改最近一次 commit 信息

```bash
git commit --amend
```

保存退出：

```bash
:wq
```

---

# 13. 撤销 Commit 但保留代码

## 13.1 撤销最近一次提交（保留 add）

```bash
git reset --soft HEAD^
```

等价：

```bash
git reset --soft HEAD~1
```

---

## 13.2 撤销最近两次提交

```bash
git reset --soft HEAD~2
```

---

# 14. 常见工作流

## 14.1 临时切换任务工作流

### 保存当前修改

```bash
git stash
```

---

### 切换历史分支

```bash
git checkout <commit-id>
```

---

### 拉取最新代码

```bash
git pull
```

---

### 恢复之前工作

```bash
git stash pop
```

---

### 正常提交流程

```bash
git add .
git commit -m "提交说明"
git push
```

---

# 15. 常用命令速查表

| 功能        | 命令                                |
| --------- | --------------------------------- |
| 查看状态      | `git status`                      |
| 查看差异      | `git diff`                        |
| 查看日志      | `git log --oneline`               |
| 查看分支      | `git branch`                      |
| 创建分支      | `git checkout -b dev`             |
| 切换分支      | `git checkout dev`                |
| 拉取代码      | `git pull`                        |
| 推送代码      | `git push`                        |
| 暂存修改      | `git stash`                       |
| 恢复 stash  | `git stash pop`                   |
| 查看远程仓库    | `git remote -v`                   |
| 创建标签      | `git tag -a v1.0 -m "备注"`         |
| 删除本地标签    | `git tag -d v1.0`                 |
| 删除远程标签    | `git push origin :refs/tags/v1.0` |
| 变基        | `git rebase main`                 |
| 中止变基      | `git rebase --abort`              |
| 查看 reflog | `git reflog`                      |
| 回退提交      | `git reset --soft HEAD~1`         |

# 16. Git 底层引用操作（update-ref）

## 16.1 update-ref 命令说明

```bash
git update-ref refs/heads/dev 4dda26c
```

作用：

```text
将 dev 分支强制指向 commit 4dda26c
```

本质上是：

```text
dev -> 4dda26c
```

------

## 16.2 命令结构

```bash
git update-ref <ref> <commit>
```

示例：

```bash
git update-ref refs/heads/dev 4dda26c
```

含义：

| 部分           | 含义              |
| -------------- | ----------------- |
| refs/heads/dev | 本地 dev 分支引用 |
| 4dda26c        | 目标 commit hash  |

------

## 16.3 等价理解

类似于：

```bash
git branch -f dev 4dda26c
```

或者：

```bash
git reset --hard 4dda26c
```

但区别如下：

| 命令             | 是否修改 HEAD | 是否修改工作区 |
| ---------------- | ------------- | -------------- |
| git update-ref   | 否            | 否             |
| git branch -f    | 否            | 否             |
| git reset --hard | 是            | 是             |

------

## 16.4 update-ref 的本质

属于 Git 底层 plumbing 命令。

它不会：

- checkout 分支
- 修改工作区
- 修改暂存区

只会直接修改：

```text
.git/refs/heads/dev
```

因此它是一个非常底层、非常直接的 Git 操作。

------

## 16.5 分支移动示例

原始状态：

```text
A --- B --- C   dev
```

执行：

```bash
git update-ref refs/heads/dev A
```

结果：

```text
A   dev
 \
  B --- C
```

说明：

- commit B/C 并未删除
- 只是 dev 分支指针移动了
- 可以通过 reflog 找回

------

## 16.6 常见用途

### （1）恢复误操作分支

```bash
git reflog
git update-ref refs/heads/dev <旧commit>
```

------

### （2）CI/CD 自动回滚

```bash
git update-ref refs/heads/release <safe_commit>
```

------

### （3）修复 refs 损坏

例如：

```text
fatal: bad object refs/heads/dev
```

可以通过 update-ref 手动修复引用。

------

## 16.7 危险点

因为 update-ref：

- 不检查 merge
- 不检查冲突
- 不检查工作区
- 不检查 HEAD

因此容易：

- 覆盖分支历史
- 丢失引用
- 导致分支混乱

通常不建议新手直接使用。

------

## 16.8 查看 ref 实际内容

查看分支引用：

```bash
cat .git/refs/heads/dev
```

你会看到：

```text
4dda26c...
```

说明：

```text
Git 分支本质上只是一个保存 commit hash 的文件
```

而：

```bash
git update-ref
```

本质上就是在直接修改这个 commit 指针。



**`git push --force-with-lease origin dev`** 可以拆成几部分理解：

# 17.Git push命令结构

| 部分                 | 含义                                            |
| -------------------- | ----------------------------------------------- |
| `git push`           | 把本地提交推送到远程                            |
| `--force-with-lease` | **有条件的强制推送**                            |
| `origin`             | 远程仓库名（一般是 GitLab/GitHub 上的那个地址） |
| `dev`                | 要推送的本地分支，对应远程的 `dev`              |

---

## 17.1 不同 `git push` 的区别

**普通推送**（`git push origin dev`）要求：远程 `dev` 必须是你本地 `dev` 的「直接后继」，不能分叉。  
若远程已有你本地没有的提交，会推送失败。

**强制推送**（`git push --force origin dev`）会**直接用本地覆盖远程**，不管远程上多出来的提交，可能被误删。

**`--force-with-lease`** 介于两者之间：

- 允许**改写**远程 `dev` 的历史（例如用本地正确的 `e3d760d` 替换错误的 `082ccc0`）
- 但会先检查：远程 `dev` 是否还是你以为的那个版本  
  - 若远程在你上次拉取之后**又被别人更新过**，推送会**失败**，避免覆盖他人新提交  
  - 若远程只是你之前推错的那次提交，且本地已修正，则可以安全覆盖

---

## 17.2 适用场景

![image-20260624160622214](C:\Users\19139\AppData\Roaming\Typora\typora-user-images\image-20260624160622214.png)当时情况是：

- 本地：`e3d760d`（正确说明）
- 远程：`082ccc0`（错误说明，内容相同但 hash 不同）

两者从同一祖先分叉，普通 `git push` 推不上去。  
你要求「以本地为准」，所以用 `--force-with-lease`，让远程 `dev` 指向本地的 `e3d760d`，分叉消失。

---

## 17.3 和 `--force` 的对比

- **`--force`**：不管远程现状，直接覆盖，风险更大  
- **`--force-with-lease`**：只有远程仍符合你的预期时才覆盖，相对更安全  

**注意**：仍会改写远程历史。若其他人已经基于旧的 `082ccc0` 开发，他们需要重新同步（例如 `git fetch` 后再 `git reset` 到新的 `origin/dev`）。

# 18.重命名 Git 分支

## 1. 重命名本地分支

**如果当前就在要改名的分支上：**
```powershell
git branch -m 新分支名
```

**如果在其他分支上：**
```powershell
git branch -m 旧分支名 新分支名
```

示例：
```powershell
git branch -m migrate-delta-from-aigov-web feature-migrate-aigov
```

---

## 2. 同步到远程（旧分支已推送过）

Git 没有“远程重命名”命令，需要：**推新名 → 删旧名**。

```powershell
# 推送新分支并设置跟踪
git push origin 新分支名 -u

# 删除远程旧分支
git push origin --delete 旧分支名
```

完整示例：
```powershell
git branch -m migrate-delta-from-aigov-web feature-migrate-aigov
git push origin feature-migrate-aigov -u
git push origin --delete migrate-delta-from-aigov-web
```

---

## 3. 验证

```powershell
git branch -vv          # 看本地分支及跟踪关系
git branch -r           # 看远程分支
```

---

### 注意事项

1. **先确认当前分支**：`git branch --show-current`
2. **远程旧分支删除后**，其他人需要更新：
   ```powershell
   git fetch origin
   git branch -u origin/新分支名 新分支名
   git remote prune origin
   ```
3. **如果旧远程分支受保护**（GitLab 设置），需要先在仓库设置里解除保护，才能删除。
4. **只改本地、还没推送过**的分支，用 `git branch -m` 就够了，不需要动远程。

---

### 快速对照

| 场景                   | 命令                                                         |
| ---------------------- | ------------------------------------------------------------ |
| 只改本地               | `git branch -m 新名`                                         |
| 本地 + 远程都改        | `git branch -m 新名` → `git push origin 新名 -u` → `git push origin --delete 旧名` |
| 让本地分支跟踪新远程名 | `git branch -u origin/新名`                                  |
