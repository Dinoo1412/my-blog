/**
 * CSDN 文章同步脚本
 * 用法: node scripts/sync-csdn.js <csdn用户名>
 * 例如: node scripts/sync-csdn.js your_csdn_username
 *
 * 原理: 抓取 CSDN 个人主页的文章列表，逐篇爬取正文，保存为 Markdown 文件
 * 注意: 请遵守 CSDN 使用条款，设置合理的抓取间隔
 */

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const USERNAME = process.argv[2];
const OUT_DIR = path.join(process.cwd(), "content/csdn");
const DELAY_MS = 2000; // 每篇间隔2秒，避免被封

if (!USERNAME) {
  console.error("用法: node scripts/sync-csdn.js <csdn用户名>");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Referer: "https://www.csdn.net/",
};

/** 获取用户文章列表（通过 CSDN 个人页 API） */
async function fetchArticleList(page = 1) {
  const url = `https://blog.csdn.net/${USERNAME}/article/list/${page}`;
  const res = await axios.get(url, { headers: HEADERS, timeout: 10000 });
  const $ = cheerio.load(res.data);

  const articles = [];
  $(".article-item-box").each((_, el) => {
    const linkEl = $(el).find("h4 a, .article-title a").first();
    const href = linkEl.attr("href");
    const title = linkEl.text().trim();
    const dateStr = $(el).find(".date").text().trim() || $(el).find(".time").text().trim();
    if (href && title) {
      articles.push({ href, title, dateStr });
    }
  });

  const hasNext = $(".page-item.next:not(.disabled)").length > 0;
  return { articles, hasNext };
}

/** 爬取单篇文章正文 */
async function fetchArticleContent(url) {
  const res = await axios.get(url, { headers: HEADERS, timeout: 15000 });
  const $ = cheerio.load(res.data);

  const title = $("h1.title-article, h1").first().text().trim();
  const dateStr = $("span.time").first().text().replace("于", "").trim();
  const tagsEls = $(".tag-link");
  const tags = [];
  tagsEls.each((_, el) => tags.push($(el).text().trim()));

  // 获取文章正文 HTML，转成简单文本（保留代码块）
  const contentEl = $("#article_content, .article_content, #content_views");

  // 提取代码块
  contentEl.find("pre code, .hljs").each((_, el) => {
    const lang = $(el).attr("class")?.match(/language-(\w+)/)?.[1] || "";
    const code = $(el).text();
    $(el).closest("pre").replaceWith(`\n\`\`\`${lang}\n${code}\n\`\`\`\n`);
  });

  // 转换标题
  contentEl.find("h1,h2,h3,h4,h5,h6").each((_, el) => {
    const level = parseInt(el.tagName[1]);
    const prefix = "#".repeat(level);
    $(el).replaceWith(`\n${prefix} ${$(el).text().trim()}\n`);
  });

  // 转换链接
  contentEl.find("a").each((_, el) => {
    const href = $(el).attr("href") || "";
    const text = $(el).text().trim();
    $(el).replaceWith(text && href ? `[${text}](${href})` : text);
  });

  // 转换图片
  contentEl.find("img").each((_, el) => {
    const src = $(el).attr("src") || $(el).attr("data-src") || "";
    const alt = $(el).attr("alt") || "image";
    $(el).replaceWith(src ? `\n![${alt}](${src})\n` : "");
  });

  const content = contentEl.text().replace(/\n{3,}/g, "\n\n").trim();

  return { title, dateStr, tags, content };
}

/** 生成安全的文件名 */
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w一-龥-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/** 保存为 Markdown 文件 */
function saveMarkdown(article, url) {
  const slug = slugify(article.title);
  const filename = `${slug}.md`;
  const filepath = path.join(OUT_DIR, filename);

  // 跳过已存在的文章
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ 已存在，跳过: ${filename}`);
    return;
  }

  const date = article.dateStr
    ? new Date(article.dateStr).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  const frontmatter = [
    "---",
    `title: "${article.title.replace(/"/g, '\\"')}"`,
    `date: "${date}"`,
    `tags: [${article.tags.map((t) => `"${t}"`).join(", ")}]`,
    `csdnUrl: "${url}"`,
    `source: csdn`,
    "---",
    "",
  ].join("\n");

  fs.writeFileSync(filepath, frontmatter + article.content, "utf-8");
  console.log(`  ✓ 已保存: ${filename}`);
}

async function main() {
  console.log(`\n🚀 开始同步 CSDN 用户 @${USERNAME} 的文章\n`);

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  let page = 1;
  let totalSynced = 0;

  while (true) {
    console.log(`📄 抓取第 ${page} 页文章列表...`);
    let result;
    try {
      result = await fetchArticleList(page);
    } catch (err) {
      console.error(`  ✗ 获取列表失败: ${err.message}`);
      break;
    }

    if (result.articles.length === 0) {
      console.log("  没有更多文章了");
      break;
    }

    for (const item of result.articles) {
      console.log(`\n📝 处理: ${item.title}`);
      try {
        const detail = await fetchArticleContent(item.href);
        saveMarkdown(detail, item.href);
        totalSynced++;
      } catch (err) {
        console.error(`  ✗ 抓取失败: ${err.message}`);
      }
      await sleep(DELAY_MS);
    }

    if (!result.hasNext) break;
    page++;
    await sleep(DELAY_MS);
  }

  console.log(`\n✅ 同步完成！共处理 ${totalSynced} 篇文章\n`);
}

main().catch(console.error);
