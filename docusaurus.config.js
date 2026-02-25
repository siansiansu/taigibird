import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "現代鳥仔名台語新詞討論",
  tagline: "鳥仔 | 台語 | 賞鳥簿仔 | eBird | 軟工 | 演算法 | 遊戲",
  favicon: "img/favicon.ico",
  trailingSlash: true,

  url: "https://taigichiau.pages.dev",
  baseUrl: "/",

  onBrokenLinks: "throw",
  i18n: {
    defaultLocale: "zh-TW",
    locales: ["zh-TW"],
  },
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: "./sidebars.js",
          sidebarCollapsed: false,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-CSVZ230KDP",
        },
        sitemap: {
          ignorePatterns: ['/search/**'],
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
      type: "text/css",
      integrity:
        "sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==",
      crossorigin: "anonymous",
      rel: "preload",
      as: "style",
      onload: "this.onload=null;this.rel='stylesheet'",
    },
  ],

  plugins: [
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: false,
      },
    ],
  ],

  themeConfig: ({
      metadata: [
        {
          name: "keywords",
          content: "台語, 鳥, 鳥仔, 台語鳥名, 鳥類, 鳥類台語, 鳥名, 鳥仔 ê 名, 台語教學, 認識鳥類, 台語動物名"
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "og:title",
          content: "現代鳥仔名台語新詞討論"
        },
        {
          name: "og:url",
          content: "https://taigichiau.pages.dev/"
        },
        {
          name: "description",
          content: "為著予大家認捌鳥仔 ê 台語，我整理了這个清單，予大家方便揣鳥仔 ê 台語名。《鳥仔 ê 名 - 認捌鳥仔 ê 台語》依據上新 ê 鳥類分類研究 kah 號明理路，盡量為每一種鳥仔揣適合 ê 名，希望會當藉著認捌鳥仔 ê 名，嘛有愈來愈濟人來使用這个漸漸消失 ê 語言。"
        },
        {
          name: "og:description",
          content: "了解鳥類的台語名稱，學習台語中鳥仔的知識"
        },
        {
          name: "og:image",
          content: "https://taigichiau.pages.dev/img/profile.jpg"
        },
        {
          name: "twitter:image",
          content: "https://taigichiau.pages.dev/img/profile.jpg"
        },
        {
          name: "og:type",
          content: "article"
        },
      ],
      image: "img/profile.jpg",
      navbar: {
        title: "現代鳥仔名台語新詞討論",
        items: [
          {
            href: "https://portaly.cc/siansiansu",
            label: "作品集",
            position: "left",
          },
          {
            href: "https://portaly.cc/siansiansu/support",
            label: "贊助支持",
            position: "left",
          },
          {
            type: "search",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        copyright: `Copyright © 2024 Bîn-hiân`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      docs: {
        sidebar: {
          hideable: false,
          autoCollapseCategories: true,
        },
      },
      algolia: {
        container: '#docsearch',
        appId: 'VI6SD4P5S4',
        indexName: 'Taigichiau Website',
        apiKey: '641f15a0dc32483cac99847618f1a6e8',
      },
    }),
};

export default config;
