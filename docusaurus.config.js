import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Bîn-hiân ê 演算法練習",
  tagline: "LeetCode 刷題筆記",
  favicon: "img/favicon.ico",
  trailingSlash: true,

  url: "https://taigichiau.pages.dev",
  baseUrl: "/",

  onBrokenLinks: "warn",
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
        docs: false,
        blog: {
          blogTitle: 'Bîn-hiân ê 演算法練習',
          blogDescription: 'LeetCode 刷題筆記',
          postsPerPage: 9,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '所有題目',
          routeBasePath: '/',
        },
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
          content: "LeetCode, algorithms, 演算法, 刷題, 程式設計"
        },
        {
          name: "description",
          content: "LeetCode 刷題筆記與解題思路"
        },
      ],
      navbar: {
        title: "Bîn-hiân ê 演算法練習",
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
        additionalLanguages: ['cpp', 'java', 'python'],
      },
      docs: {
        sidebar: {
          hideable: false,
          autoCollapseCategories: true,
        },
      },
      // algolia: {
      //   container: '#docsearch',
      //   appId: '42JNGUSU4Z',
      //   indexName: 'taigibird.siansiansu.com',
      //   apiKey: 'd780517812fd228ff2b7371cc449973c',
      // },
    }),
};

export default config;
