import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Engenharia de Software',
  tagline: 'Projeto focado em Boas Práticas de Programação e Arquitetura',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
    [
      'redocusaurus',
      {
        // Plugin Options for customizing check https://github.com/rohit-gohri/redocusaurus#full-options
        specs: [
          {
            spec: 'static/openapi.json',
            route: '/api/',
          },
        ],
        // Theme Options for customizing how redoc looks check https://github.com/rohit-gohri/redocusaurus#theme-options
        theme: {
          // Section to pass options to lib-dom-native-scroll
          primaryColor: '#1890ff',
          hideDownloadButton: true,
        },
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Todo List',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentação',
        },
        {
          to: '/api',
          label: 'API',
          position: 'left',
        },
        {
          href: 'https://github.com/MarcosDataScientist/Project_todo_list_over_engineering',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Links Rápidos',
          items: [
            {
              label: 'Processo de Desenvolvimento',
              to: '/docs/geral/processo-desenvolvimento',
            },
            {
              label: 'CI/CD',
              to: '/docs/geral/ci-cd',
            },
          ],
        },
        {
          title: 'Tecnologias',
          items: [
            {
              label: 'Backend',
              to: '/docs/backend/best-practices',
            },
            {
              label: 'Frontend',
              to: '/docs/frontend/best-practices',
            },
            {
              label: 'Supabase',
              to: '/docs/supabase/best-practices',
            },
          ],
        },
        {
          title: 'Código Fonte',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/MarcosDataScientist/Project_todo_list_over_engineering',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Engenharia de Software. Todo List Over Engineering.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
