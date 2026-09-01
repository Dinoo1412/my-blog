# 演示资料模块：新增文件夹指南

演示资料页采用“文件夹驱动”设计。构建时会扫描：

```text
public/demo-materials/collections/*/collection.json
```

每个包含 `collection.json` 的一级文件夹会自动成为 `/demos` 页面中的一个资料分区，不需要修改 React 页面。

## 目录约定

```text
public/demo-materials/collections/
├── skill-design/
│   ├── collection.json
│   ├── landing-page.html
│   └── downloads/
│       └── slides.pptx
└── new-topic/
    ├── collection.json
    ├── examples/
    │   └── example.html
    └── downloads/
        └── guide.pdf
```

文件夹名称必须使用 ASCII 小写字母、数字和连字符，例如：

- `figma-workflow`
- `agent-testing`
- `product-design-2026`

不要使用中文、空格或特殊符号作为文件夹名，以避免 Cloudflare 静态资源路径兼容问题。

## 新增文件夹

### 1. 创建资料目录

```powershell
New-Item -ItemType Directory -Force `
  "public/demo-materials/collections/你的英文目录名"
```

### 2. 放入资料

可以放入：

- HTML 页面：作为在线演示打开；
- PPTX、PDF、DOCX、Markdown：作为资料下载；
- 图片、CSS、JavaScript：保持 HTML 原有相对目录关系即可；
- ZIP：作为完整资料包下载。

### 3. 创建 `collection.json`

```json
{
  "version": 1,
  "title": "资料分区名称",
  "description": "这个文件夹收录的内容与用途。",
  "eyebrow": "Optional English label",
  "accent": "emerald",
  "order": 20,
  "demos": [
    {
      "title": "案例名称",
      "subtitle": "案例副标题",
      "description": "案例简介。",
      "file": "examples/example.html",
      "label": "案例类型",
      "accent": "blue"
    }
  ],
  "resources": [
    {
      "title": "资料名称",
      "detail": "PDF 文档",
      "file": "downloads/guide.pdf",
      "kind": "document"
    }
  ]
}
```

## 可用字段

### 分区字段

| 字段 | 必填 | 说明 |
|---|---|---|
| `version` | 是 | 当前固定为 `1` |
| `title` | 是 | 分区标题 |
| `description` | 是 | 分区说明 |
| `eyebrow` | 否 | 标题上方的英文标签 |
| `accent` | 否 | 分区主题色 |
| `order` | 否 | 排序数字，越小越靠前 |
| `demos` | 否 | 在线演示数组 |
| `resources` | 否 | 下载资料数组 |

### 主题色

`accent` 可选：

```text
amber, blue, cyan, emerald, lime, orange, zinc
```

### 资料类型

`kind` 可选：

```text
archive, document, presentation, skill
```

## 验证和发布

在项目根目录执行：

```powershell
npm run build
```

构建过程会检查 `collection.json` 中引用的文件。如果路径错误或文件不存在，构建会直接报错，避免发布失效链接。

验证通过后提交到 `dev`，再合并到 `main`：

```powershell
git checkout dev
git add public/demo-materials/collections
git commit -m "feat(demos): 新增资料文件夹"
git push

git checkout main
git merge --ff-only dev
git push
```

Cloudflare 会在 `main` 更新后自动重新部署。
