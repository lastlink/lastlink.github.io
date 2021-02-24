import glob from 'glob'
import path from 'path'
import postcssImport from 'postcss-import'
import postcssNesting from 'postcss-nesting'
import postcssPresetEnv from 'postcss-preset-env'
import * as SITE_INFO from './assets/content/site/info.json'
import { COLOR_MODE_FALLBACK } from './utils/globals.js'
import * as fs from "fs";

const dynamicContentPath = 'assets/content' // ? No prepending/appending backslashes here
const dynamicRoutesContent = getDynamicPaths(
  {
    blog: 'blog/*.json',
    projects: 'projects/*.json'
  },
  dynamicContentPath
)


console.log("::: dynamic routes ::::")
console.log(dynamicRoutesContent);
const dynamicRoutes = []
const docs = [];
dynamicRoutesContent.forEach(page => {
  if (page.route) {
    dynamicRoutes.push(page.route)
  }
  if (page.content) {
    docs.push(page.content)
  }
});

console.log(dynamicRoutes);

export default {
  // ? The env Property: https://nuxtjs.org/api/configuration-env/
  env: {
    url:
      process.env.NODE_ENV === 'production'
        ? process.env.URL || 'http://createADotEnvFileAndSetURL'
        : 'http://localhost:3000',
    lang: SITE_INFO.sitelang || 'en-US'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: SITE_INFO.sitename || process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: SITE_INFO.sitedescription || process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400&display=swap'
      }
    ] // ? Imports the font 'Karla' and is optimized by the netlify plugin 'Subfont'
  },
  generate: {
    routes: dynamicRoutes,
    fallback: true,
    subFolders: false,
    dir: 'public'
  },
  router: {
    // base: 'PATHPREFIXTOREPLACE'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#f3f5f4' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/tailwind.css', '@/assets/css/main.pcss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/color-mode', '@nuxtjs/tailwindcss', '@nuxtjs/svg', '@nuxtjs/pwa',

    // Simple usage
    '@nuxtjs/lunr-module',

    // With options
    {
      src: '@nuxtjs/lunr-module',
      // These are the default options:
      /*
      options: {
        includeComponent: true,
        globalComponent: false,
        css: true,
        defaultLanguage: 'en',
        languages: false,
        path: 'search-index',
        ref: 'id',
        fields: [
          'title',
          'body'
        ]
      } */
    }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/markdownit', 'nuxt-purgecss'],
  markdownit: {
    injected: true
  },
  hooks: {
    ready(nuxt) {
      let documentIndex = 1

      // this call is just for increasing coverage
      // (the example is also just as test fixture)
      nuxt.callHook('lunr:document')

      // trigger 'not adding doc' warning to increase coverage
      nuxt.callHook('lunr:document', {
        document: true
      })

      for (const doc of docs) {

        nuxt.callHook('lunr:document', {
          locale: documentIndex === 1 ? 'fr' : (documentIndex % 2 ? 'en' : 'af'),
          document: {
            id: documentIndex,
            ...doc
          },
          /* !! WARNING: Do NOT copy this blindly !!
          *
          * When adding the full document as meta the json of your
          * search index will become very large very quickly. Parsing that
          * json on the client (especially mobile clients) could become a
          * performance issue
          *
          * Normally you'd only need to include 'enough' meta info to properly
          * recognise the document and to display your search results.
          * E.g. The path and title of the page the document refers to, but
          * _not_ the full text that was used for indexing
          */
          meta: doc
        })
        documentIndex++
      }


    }
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    postcss: {
      plugins: {
        'postcss-import': postcssImport,
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
        'postcss-nesting': postcssNesting,
        'postcss-preset-env': postcssPresetEnv({
          stage: 1,
          features: {
            'nesting-rules': false
          }
        })
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  },
  /*
   ** Custom additions configuration
   */
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    exposeConfig: false // enables `import { theme } from '~tailwind.config'`
  },
  purgeCSS: {
    mode: 'postcss',
    whitelist: ['dark-mode', 'light-mode', 'btn', 'icon', 'main'],
    whitelistPatterns: [/^article/, /image$/]
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: COLOR_MODE_FALLBACK, // fallback value if not system preference found
    componentName: 'ColorScheme',
    cookie: {
      options: {
        sameSite: 'lax'
      }
    }
  },
  pwa: {
    icon: {
      source: 'static/icon.png',
      filename: 'icon.png'
    },
    manifest: { name: SITE_INFO.sitename || process.env.npm_package_name || '', lang: process.env.lang },
    meta: {
      name: SITE_INFO.sitename || process.env.npm_package_name || '',
      lang: process.env.lang,
      ogHost: process.env.URL,
      ogImage: '/ogp.jpg'
    }
  }
}

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable - example below
 * {
 *   blog: 'blog/*.json',
 *   projects: 'projects/*.json'
 * }
 *
 * @return {Array} - Will return those files into urls for SSR generated .html's like
 * [
 *   /blog/2019-08-27-incidunt-laborum-e ,
 *   /projects/story-test-story-1
 * ]
 */
function getDynamicPaths(urlFilepathTable, cwdPath) {
  console.log('Going to generate dynamicRoutes for these collection types: ', urlFilepathTable)
  const dynamicPaths = [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      const filepathGlob = urlFilepathTable[url]
      return glob.sync(filepathGlob, { cwd: cwdPath }).map(filepath => {
        const relativePath = cwdPath + "/" + filepath;
        console.log(relativePath);

        const pageResult = JSON.parse(
          fs.readFileSync(relativePath, "utf8")
        );
        let page = {}
        page.route = `/${url}/${path.basename(filepath, '.json')}`
        page.content = pageResult
        return page;
      })
    })
  )
  console.log('Found these dynamicPaths that will be SSR generated:', dynamicPaths)
  return dynamicPaths
}
