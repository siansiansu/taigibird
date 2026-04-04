// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightDocSearch from '@astrojs/starlight-docsearch';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://taigichiau.pages.dev',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: '現代鳥仔名台語新詞討論',
      defaultLocale: 'root',
      locales: {
        root: { label: '繁體中文', lang: 'zh-TW' },
      },
      plugins: [
        starlightDocSearch({
          appId: 'VI6SD4P5S4',
          apiKey: '641f15a0dc32483cac99847618f1a6e8',
          indexName: 'Taigichiau Website',
        }),
      ],
      social: [],
      components: {
        Header: './src/components/Header.astro',
        Footer: './src/components/Footer.astro',
      },
      customCss: ['./src/styles/custom.css'],
      head: [
        { tag: 'script', attrs: { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-CSVZ230KDP' } },
        { tag: 'script', content: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-CSVZ230KDP')" },
        { tag: 'link', attrs: { rel: 'preload', href: '/fonts/jf-openhuninn-2.1.ttf', as: 'font', type: 'font/ttf', crossorigin: 'anonymous' } },
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://taigichiau.pages.dev/img/profile.jpg' } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://taigichiau.pages.dev/img/profile.jpg' } },
        { tag: 'meta', attrs: { name: 'keywords', content: '台語, 鳥, 鳥仔, 台語鳥名, 鳥類, 鳥類台語, 鳥名, 鳥仔 ê 名, 台語教學, 認識鳥類, 台語動物名' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/apple-touch-icon.png' } },
        { tag: 'link', attrs: { rel: 'manifest', href: '/manifest.json' } },
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          content: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: '現代鳥仔名台語新詞討論',
            url: 'https://taigichiau.pages.dev',
            description: '為著予大家認捌鳥仔 ê 台語，我整理了這个清單，予大家方便揣鳥仔 ê 台語名。',
            inLanguage: 'zh-TW',
            author: { '@type': 'Person', name: 'Bîn-hiân' },
          }),
        },
      ],
      sidebar: [
        { label: '常用資料整理', autogenerate: { directory: 'references' } },
        { label: '雁形目 gān-hîng-ba̍k', autogenerate: { directory: 'anseriformes' } },
        { label: '雞形目 ke-hîng-ba̍k', autogenerate: { directory: 'galliformes' } },
        { label: '鴿形目 kho-hîng-ba̍k', autogenerate: { directory: 'columbiformes' } },
        { label: '鵑形目 kuan-hîng-ba̍k', autogenerate: { directory: 'cuculiformes' } },
        { label: '石磯仔目 tsio̍h-ki-á-ba̍k', autogenerate: { directory: 'caprimulgiformes' } },
        { label: '雨燕仔目 hōo-iàn-á-ba̍k', autogenerate: { directory: 'apodiformes' } },
        { label: '鶴形目 ho̍h-hîng-ba̍k', autogenerate: { directory: 'gruiformes' } },
        { label: '鴴形目 hîng-hîng-ba̍k', autogenerate: { directory: 'charadriiformes' } },
        { label: '紅鸛目 âng-kuàn-ba̍k', autogenerate: { directory: 'phoenicopteriformes' } },
        { label: '水避仔目 tsuí-pī-á-ba̍k', autogenerate: { directory: 'podicipediformes' } },
        { label: '鸏形目 bông-hîng-ba̍k', autogenerate: { directory: 'phaethontiformes' } },
        { label: '藏水鳥目 tshàng-tsuí-tsiáu-ba̍k', autogenerate: { directory: 'gaviiformes' } },
        { label: '鸌形目 hōo-hîng-ba̍k', autogenerate: { directory: 'procellariiformes' } },
        { label: '鸛形目 kuàn-hîng-ba̍k', autogenerate: { directory: 'ciconiiformes' } },
        { label: '海雞母目 hái-ke-bó-ba̍k', autogenerate: { directory: 'suliformes' } },
        { label: '鵜形目 thê-hîng-ba̍k', autogenerate: { directory: 'pelecaniformes' } },
        { label: '鷹形目 ing-hîng-ba̍k', autogenerate: { directory: 'accipitriformes' } },
        { label: '鴞形目 hiau-hîng-ba̍k', autogenerate: { directory: 'strigiformes' } },
        { label: '犀鳥目 sai-tsiáu-ba̍k', autogenerate: { directory: 'bucerotiformes' } },
        { label: '山鸚哥目 suann-ing-ko-ba̍k', autogenerate: { directory: 'coraciiformes' } },
        { label: '啄樹鳥目 tok-tshiū-tsiáu-ba̍k', autogenerate: { directory: 'piciformes' } },
        { label: '隼形目 tsún-hîng-ba̍k', autogenerate: { directory: 'falconiformes' } },
        { label: '鸚形目 ing-hîng-ba̍k', autogenerate: { directory: 'psittaciformes' } },
        { label: '雀形目 tshiok-hêng-ba̍k', autogenerate: { directory: 'passeriformes' } },
      ],
    }),
    sitemap(),
  ],
});
