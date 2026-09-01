---
name: quchiai-design-system
description: 曲尺AI开放平台设计规范参考。当用户需要为曲尺AI平台（quchiai.com）创建、修改、复现任何 UI 界面、组件、页面、落地页、营销模块时，必须使用此 skill。同样适用于：需要遵循曲尺AI视觉风格进行开发的前端任务、对齐曲尺平台设计语言的原型制作、以及任何提到"曲尺"或"曲尺AI"风格的设计需求。包含色彩/字体/组件/布局、品牌图标（quchi.svg）、业务向内联 SVG 功能图标、UTF-8 与响应式布局防错规范及 QA 自检清单。
---

# 曲尺AI开放平台设计规范

本 skill 记录了 https://www.quchiai.com 的完整设计语言，供 Claude 在生成 UI 时精准复现该平台的视觉风格。

读取本文件后，无需再询问设计偏好——直接按照以下规范执行。

**交付前必读**：
1. `references/delivery-checklist.md` — UTF-8 编码、布局防错
2. `references/icons.md` — 功能图标 sprite（**禁止** Lucide 等通用库）
3. **§十二 QA 自检**

组件示例：`references/components.md`；布局模式：`references/layouts.md`；参考页：`examples/quchiai-product-homepage.html`。

---

## 一、设计语言总结

**风格定位**：科技感 · 专业 · 清朗 · 面向中国企业级 AI 平台

**核心特征**：
- 以浅蓝灰色（`#EDF2FB` 系）为主背景，营造轻盈、科技感的氛围
- 主色调为宝石蓝系渐变，传递信任与专业感
- 大量使用白色卡片 + 轻阴影，内容层次清晰
- 排版以中文为主，标题字重粗（700~900），正文适中（400）
- 图形语言偏向 3D 等距插图、渐变光晕球体、流线型科技元素

---

## 二、色彩系统

### 主色（Primary Blue）
```
品牌蓝（主按钮、强调、激活态）: #2563EB  → #1D4ED8（hover）
深品牌蓝（次级按钮、深色背景）: #1E3A8A
```

### 渐变
```
主渐变（Banner CTA、Footer 背景）: linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)
次渐变（标签、角标）:              linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)
橙色强调渐变（特殊标签）:          linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)
```

### 背景色
```
页面主背景（浅蓝灰）:  #EEF2F9  /  #F0F4FC
区块白色背景:          #FFFFFF
深色区块（Footer等）:  #0F172A  /  #1E293B
```

### 文字色
```
主标题:    #0F172A（近黑）
次级标题:  #1E293B
正文:      #475569
辅助文字:  #94A3B8
白色文字:  #FFFFFF（用于深色/蓝色背景）
```

### 功能色
```
成功/勾选图标:  #22C55E
链接/激活:      #2563EB
边框（卡片）:   #E2E8F0
```

---

## 三、字体规范

**字体栈（中文优先）**：
```css
font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
```

### 字号与字重层级

| 用途               | 字号        | 字重 | 示例                   |
|--------------------|-------------|------|------------------------|
| Hero 大标题        | 48–64px     | 900  | 找软件定开，上曲尺AI   |
| 页面节标题         | 36–40px     | 700  | 曲尺AI软件定制         |
| 卡片/模块标题      | 20–24px     | 700  | 大模型API服务          |
| 正文               | 14–16px     | 400  | 描述性文案             |
| 辅助/标签文字      | 12–13px     | 400  | 按量付费               |
| 导航               | 14px        | 500  | 首页、软件定制         |

### 行高
```
标题: line-height: 1.25
正文: line-height: 1.75
```

---

## 四、间距与圆角系统

### 间距（基于 8px 网格）
```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
3xl: 64px
4xl: 96px
```

### 圆角
```
按钮、标签:       border-radius: 8px
卡片（标准）:     border-radius: 12px
卡片（大型）:     border-radius: 16px
图片/媒体卡片:    border-radius: 16px
全圆（头像/图标）: border-radius: 50%
CTA 输入框/按钮:  border-radius: 12px
```

---

## 五、阴影系统

```css
/* 默认卡片阴影（白色背景卡片） */
box-shadow: 0 2px 12px rgba(37, 99, 235, 0.06);

/* 悬浮态 */
box-shadow: 0 8px 32px rgba(37, 99, 235, 0.12);

/* 浮层/弹窗 */
box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
```

---

## 六、核心组件规范

### 6.1 按钮

**主按钮（Primary）**：
```css
background: #2563EB;
color: #FFFFFF;
padding: 12px 28px;
border-radius: 8px;
font-size: 15px;
font-weight: 600;
/* 右侧通常带有 → 箭头图标 */
```

**主按钮 Hover**：
```css
background: #1D4ED8;
transform: translateY(-1px);
box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
```

**次级按钮（Outline）**：
```css
background: transparent;
border: 1.5px solid #2563EB;
color: #2563EB;
padding: 11px 27px;
border-radius: 8px;
```

**深色按钮（深蓝填充，用于白色区块内）**：
```css
background: #1E3A8A;
color: #FFFFFF;
```

### 6.2 卡片

**标准内容卡片**：
```css
background: #FFFFFF;
border-radius: 12px;
padding: 32px;
box-shadow: 0 2px 12px rgba(37, 99, 235, 0.06);
border: 1px solid #E2E8F0;  /* 可选，极细边框 */
```

**浅色背景卡片（在 #EEF2F9 背景上）**：
```css
background: #FFFFFF;
border-radius: 16px;
padding: 40px;
box-shadow: 0 4px 20px rgba(37, 99, 235, 0.08);
```

**深色卡片（数据展示、算力中心等）**：
```css
background: rgba(255,255,255,0.08);
border: 1px solid rgba(255,255,255,0.12);
border-radius: 12px;
backdrop-filter: blur(8px);
color: #FFFFFF;
```

### 6.3 功能特性列表（Feature List）

特性列表前缀使用 **业务 SVG**（`references/icons.md` 中 `qc-check`），**禁止**用 `quchi.svg` 充当勾选：
```html
<div class="feature-item">
  <svg class="biz-icon biz-icon--sm biz-icon--accent" aria-hidden="true"><use href="#qc-check"/></svg>
  <div>
    <strong>按量付费</strong>
    <p>极致性价比，仅为您的有效调用付费</p>
  </div>
</div>
```

### 6.4 导航栏

```css
/* 导航栏 */
height: 64px;
background: #FFFFFF;
border-bottom: 1px solid #E2E8F0;
padding: 0 40px;

/* Logo 区 */
font-size: 18px; font-weight: 700; color: #0F172A;

/* 导航链接 */
font-size: 14px; font-weight: 500; color: #475569;
/* 激活态 */ color: #2563EB;

/* 右侧登录按钮 */
/* 同主按钮样式 */
```

### 6.5 角标 / Badge

```css
/* 蓝色角标（海量模型、1V1专属服务等） */
background: linear-gradient(135deg, #3B82F6, #6366F1);
color: #FFFFFF;
padding: 2px 10px;
border-radius: 20px;
font-size: 12px;
font-weight: 600;

/* 橙色角标 */
background: linear-gradient(135deg, #F59E0B, #EF4444);
color: #FFFFFF;
```

### 6.6 流程步骤（Step Flow）

横向步骤条，图标 + 标题 + 描述，步骤间用虚线箭头连接：
```
[图标] → [图标] → [图标] → ...
标题         标题         标题
描述         描述         描述
```
- 图标：40px 圆形，蓝色渐变背景，白色 **业务 SVG**（见 §十一、`references/icons.md`）
- 连接线：`border-top: 1.5px dashed #93C5FD`
- 当前步骤：图标放大，蓝色加深

### 6.7 Footer

```css
/* Footer 背景 */
background: #0F172A;
color: #94A3B8;

/* Footer 标题 */
color: #FFFFFF; font-weight: 600; margin-bottom: 16px;

/* Footer 链接 */
color: #94A3B8; font-size: 14px;
/* hover */ color: #FFFFFF;
```

---

## 七、布局模式

### 页面最大宽度
```css
max-width: 1280px;
margin: 0 auto;
padding: 0 40px;
```

### 常用布局模式（参见 references/layouts.md 获取完整示例）

1. **Hero Section**：左文字右 3D 插图，背景为浅蓝渐变（`#EEF2F9 → #DBEAFE`）
2. **2 栏对比卡片**：并排两个大卡片，各带 badge 角标
3. **3 栏等宽卡片**：功能/产品列表，白底卡片
4. **横向步骤流**：6 步流程，图标连线
5. **左侧 Tab + 右侧内容**：产品展示（曲尺AI / 智能体中心 / 小程序）
6. **全宽 CTA Banner**：蓝色渐变背景，居中大字 + 输入框按钮
7. **深色 Footer**：6 列链接 + 二维码

---

## 八、图形与插图规范

- **Hero 区域**：使用蓝色系 3D 等距图形（齿轮、六边形、科技组件），悬浮标签卡片（AI需求分析、高效开发等）
- **功能卡片**：可选 `assets/quchi.svg` 低透明度**品牌水印**，置于卡片右下角（仅装饰，非功能图标）
- **图片卡片**：真实场景图 + 深色渐变蒙层，标题白色覆盖于底部
- **品牌浮动徽章**：圆形底 + `assets/quchi.svg`，带投影，用于 Hero/配图区的品牌点缀

---

## 九、动效规范

- **按钮 hover**：`translateY(-1px)` + 阴影加深，`transition: 0.2s ease`
- **卡片 hover**：`translateY(-4px)` + 阴影增强，`transition: 0.25s ease`
- **页面滚动进入**：`opacity: 0 → 1`，`translateY(20px → 0)`，`0.4s ease-out`，子元素错落延迟 `0.1s`
- **导航激活**：底部 `2px solid #2563EB` 指示线，平滑过渡

---

## 十、特殊模块记录

### 悬浮客服按钮（右下角固定）
```css
position: fixed; right: 0; bottom: 120px;
background: #2563EB; color: #FFFFFF;
border-radius: 8px 0 0 8px;
padding: 12px 10px;
writing-mode: vertical-rl;
font-size: 13px;
```

### 滚动至顶部按钮
```css
position: fixed; right: 16px; bottom: 80px;
background: #FFFFFF; border: 1px solid #E2E8F0;
border-radius: 50%; width: 40px; height: 40px;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
```

---

## 十一、图标规范（强制）

图标分两类，**不可混用**：

| 类型 | 资产 | 用途 |
|------|------|------|
| **品牌图标** | `assets/quchi.svg`（技能内置，与官网同源） | Logo、Favicon、品牌水印、品牌浮动徽章 |
| **功能图标** | `references/icons.md` 业务内联 SVG | 勾选、步骤、导航工具、按钮箭头等一切 UI 语义图标 |

### 11.1 品牌图标 — 仅用 `assets/quchi.svg`

| 场景 | 尺寸建议 | 说明 |
|------|----------|------|
| 导航 Logo | 高 28–32px | 禁止用文字或第三方 Logo 替代 |
| Footer 品牌区 | 高 24–28px | 与 Logo 同源 |
| 卡片品牌水印 | 48–64px，opacity 0.08–0.15 | 右下角装饰，非交互 |
| Hero / 配图品牌徽章 | 20–24px 宽 | 圆形底 + 居中 quchi |
| Favicon / PWA | 32×32、180×180 | 由 quchi.svg 缩放导出 |

**品牌图标禁止**：
- ❌ 将 quchi.svg 用于特性列表勾选、步骤流、语言/搜索等工具按钮
- ❌ 修改 SVG 内 `#2F5BEB` / `#34DDE8` 品牌色（仅允许整体缩放）

**引用方式**：
```html
<img class="quchi-icon quchi-icon--lg" src="assets/quchi.svg" alt="曲尺AI" />
<img class="quchi-icon quchi-icon--watermark" src="assets/quchi.svg" alt="" aria-hidden="true" />
```

```css
.quchi-icon { display: block; width: auto; height: 28px; flex-shrink: 0; }
.quchi-icon--lg { height: 32px; }
.quchi-icon--watermark { height: 56px; opacity: 0.12; pointer-events: none; }
```

### 11.2 功能图标 — 业务内联 SVG（禁止 quchi.svg · 禁止通用图标库）

**唯一来源**：`references/icons.md` 中的 SVG Sprite / 内联 path。图标造型需贴合 AI 平台业务（密钥、接口、镜像、芯片等），**避免** Lucide / Heroicons / Font Awesome / Material Icons（易显「AI 模板感」）。

| 场景 | symbol | 样式 |
|------|--------|------|
| 特性列表勾选 | `qc-check` | 16px，`#22C55E` |
| 步骤流圆形容器 | `qc-user` / `qc-key` / `qc-api` / `qc-chart` 等 | 白色，置于渐变圆底 |
| 移动菜单 | `qc-menu` | `#475569` |
| 按钮 / 卡片箭头 | `qc-arrow-right` | 继承文字色；勿用裸 `→` 字符（防编码损坏） |
| 回到顶部 | `qc-arrow-up` | `#475569` |

**功能图标规范**：
- 统一 `stroke-width: 1.75`、`stroke-linecap: round`
- 颜色：`#475569` 默认，强调 `#2563EB`，成功 `#22C55E`
- 装饰性设 `aria-hidden="true"`；按钮保留 `aria-label`

**功能图标禁止**：
- ❌ Lucide、Heroicons、Font Awesome、emoji
- ❌ 用 `quchi.svg` 充当勾选、步骤、菜单、箭头等
- ❌ 未在 `icons.md` 登记的新图标风格与全站不一致

详见 `references/icons.md` 完整 sprite 与 `references/delivery-checklist.md`。

### 11.3 项目集成

- `assets/quchi.svg` → `public/` 或 `src/assets/`，**仅**品牌场景
- 功能图标：复制 sprite 到入口 HTML，或拆为 Vue/React 内联组件（路径来自 `icons.md`）

---

## 十一附、编码与布局（强制）

生成含中文的 HTML/模板时，**必须先读** `references/delivery-checklist.md`。

要点摘要：
- 文件 **UTF-8 无 BOM** + `<meta charset="UTF-8" />`
- 禁止乱码交付；禁止未闭合标签
- `body { overflow-x: hidden }`；栅格 `minmax(0, 1fr)`；导航 `navbar-inner { position: relative }`
- 断点：1024px / 640px；交付前查 1280 / 1024 / 375 三档

---

## 十二、QA 自检清单

交付任何曲尺风格 UI 前，**逐项勾选**；任一项未通过须修复后再交付。

### A. 编码与文案

- [ ] 文件 UTF-8 无 BOM，`<meta charset="UTF-8" />` 已设置
- [ ] 中文无 `` / 异常 `?`；所有 `</p>` `</button>` 等标签完整闭合
- [ ] 箭头优先 `qc-arrow-right` SVG，避免裸 `→` 导致编码损坏

### B. 品牌与图标

- [ ] 品牌场景（Logo、Favicon、水印）使用 `assets/quchi.svg`
- [ ] 功能场景使用 `references/icons.md` 业务 SVG，**未**误用 quchi.svg
- [ ] **未**使用 Lucide / Heroicons / Font Awesome / emoji
- [ ] 未改动 quchi.svg 品牌双色（`#2F5BEB`、`#34DDE8`）

### C. 布局

- [ ] 1280 / 1024 / 375 无横向滚动、无重叠
- [ ] 导航折叠正常；Hero 浮动标签不溢出
- [ ] 容器 `max-width: 1280px`，栅格窄屏单列

### D. 色彩

- [ ] 页面背景为 `#EEF2F9` / `#F0F4FC` 系浅蓝灰，非纯白铺满
- [ ] 主按钮为 `#2563EB`，hover `#1D4ED8`
- [ ] 主渐变 CTA 为 `135deg, #2563EB → #06B6D4`
- [ ] 标题 `#0F172A`，正文 `#475569`，辅助 `#94A3B8`
- [ ] Footer 背景 `#0F172A`，链接 `#94A3B8`、hover 变白

### E. 字体与排版

- [ ] 字体栈含 PingFang SC / Microsoft YaHei
- [ ] Hero 标题 48–64px、字重 900；节标题 36–40px、700
- [ ] 正文 14–16px、行高约 1.75；标题行高约 1.25
- [ ] 中文文案为主，无英文占位 lorem 残留

### F. 间距与形状

- [ ] 间距遵循 8px 网格（16 / 24 / 32 / 48 / 64…）
- [ ] 按钮圆角 8px；标准卡片 12px；大卡片 16px
- [ ] 页面内容区 `max-width: 1280px`，左右 padding 约 40px

### G. 组件

- [ ] 白底卡片带 `0 2px 12px rgba(37,99,235,0.06)` 轻阴影
- [ ] 卡片 hover：`translateY(-4px)` + 阴影增强
- [ ] 主按钮 hover：`translateY(-1px)` + 蓝色光晕阴影
- [ ] Badge 使用蓝紫或橙红渐变，非纯色块
- [ ] 导航激活态文字 `#2563EB` 或底部 2px 指示线

### H. 布局模块

- [ ] Hero：左文右图，背景浅蓝渐变
- [ ] 双栏对比 / 三栏卡片 / 步骤流 / Tab 内容区符合 §七 模式之一
- [ ] 全宽 CTA Banner 使用主渐变 + 居中白字
- [ ] 右下角悬浮客服条（竖排蓝底）按需出现

### I. 动效与体验

- [ ] 交互 transition 0.2–0.25s ease，无突兀跳变
- [ ] 滚动进入动画（可选）opacity + translateY，错落延迟 ≤0.1s
- [ ] 可点击元素有 hover 反馈；装饰性图标设 `aria-hidden`，品牌 Logo 保留 `alt="曲尺AI"`

### J. 技术收尾

- [ ] 响应式：1280 / 768 / 375 三档无明显溢出或重叠
- [ ] 对比度：深色底上白字、浅色底上深字可读
- [ ] 无与设计规范冲突的「AI 通用紫渐变 / Inter-only」等风格漂移

**自检结论**：全部勾选 → 可交付；否则列出未通过项编号（如 B-2、A-1）并修复。

---

## 参考文件索引

| 文件 | 内容 |
|------|------|
| `assets/quchi.svg` | 曲尺品牌图标（仅 Logo / Favicon / 品牌水印） |
| `assets/quchi-tokens.css` | 设计令牌（`:root` CSS 变量，全站唯一来源） |
| `references/icons.md` | 业务功能 SVG sprite（禁止通用图标库） |
| `references/delivery-checklist.md` | UTF-8 编码与布局防错 |
| `references/components.md` | HTML/CSS 组件代码片段 |
| `references/layouts.md` | 各板块布局代码示例 |
| `examples/quchiai-product-homepage.html` | 合规参考页 |