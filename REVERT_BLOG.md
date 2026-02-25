# 還原 Algorithms Blog 暫時搬移的變更

DocSearch 審核通過後，請幫我還原以下所有暫時的變更：

## 1. docusaurus.config.js 還原

- `title` 從 `"Bîn-hiân ê 演算法練習"` 改回 `"現代鳥仔名台語新詞討論"`
- `tagline` 從 `"LeetCode 刷題筆記"` 改回 `"鳥仔 | 台語 | 賞鳥簿仔 | eBird | 軟工 | 演算法 | 遊戲"`
- `docs` 從 `false` 改回：
  ```js
  docs: {
    routeBasePath: '/',
    sidebarPath: "./sidebars.js",
    sidebarCollapsed: false,
  },
  ```
- `blog` 從目前的設定改回 `false`
- `onBrokenLinks` 從 `"warn"` 改回 `"throw"`
- 移除 `markdown.hooks.onBrokenMarkdownLinks` 設定
- 還原 `themeConfig.metadata` 為原本的鳥仔台語相關 keywords/og 設定
- 還原 `themeConfig.navbar.title` 為 `"現代鳥仔名台語新詞討論"`
- 移除 prism `additionalLanguages: ['cpp', 'java', 'python']`
- 取消 algolia 的註解（恢復啟用）

## 2. 刪除暫時的檔案

- 刪除 `blog/` 目錄（整個，裡面是 284 篇 LeetCode 題解）

## 3. src/theme/BlogListPage/index.js 還原

- 分頁路徑從 `/` 改回 `/blog/`（共 4 處）
- header 標題從 `"所有題目"` 改回 `"最近的文章"`
- header 描述從 `"LeetCode 刷題筆記與解題思路"` 改回原本的

## 4. 驗證

- 跑 `npm run build` 確認 build 成功
