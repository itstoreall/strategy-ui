if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>n(e,i),u={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>u[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts("notification-sw.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/479ba886-9b68a9ff01923148.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/545-b46e49ff3ea03e19.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/567-917ab597f3b77c43.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/593-aed068e6ada7ba53.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/5e22fd23-1ffb01ca2b30d817.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/648-cec2d15d7a316598.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/770-426c5839f059efb1.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/775-3de811ebf2a2253f.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/799-2c6097f20ea9df38.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/934-a4442225fe02c5a8.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/997-6e221d6c0cc78015.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/app/_not-found/page-4bb4ead5dec53a75.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/app/admin/page-2b1c5e43914e09f1.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/app/auth/error/page-c89d2e22e9be3d67.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/app/auth/sign-in/page-3e394f1179382d42.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/app/auth/sign-up/page-0a71aff889b9c6d5.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/app/auth/success/page-f5a462a04afc060c.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/app/chart/page-5abd3beabcce8a6f.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/app/dashboard/page-ea79dd2a39682f14.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/app/layout-fdff7bd9b212ebfa.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/app/page-141d999be3d41d57.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/app/settings/page-7ef72822f42c3073.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/app/strategy/%5Bslug%5D/page-a47982d3520efce9.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/ee560e2c-595a3b183b736b0b.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/eec3d76d-f2c229b45eca9aad.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/fd9d1056-7f03e1a049f0b345.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/main-app-982ad5ac33e76fea.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/main-d45f15365368c7e5.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-30e79c73eaad64dd.js",revision:"gUUQ1cFnpe48eAu35DEIB"},{url:"/_next/static/css/6a39324fe508ab19.css",revision:"6a39324fe508ab19"},{url:"/_next/static/css/6deaddf1127271c3.css",revision:"6deaddf1127271c3"},{url:"/_next/static/gUUQ1cFnpe48eAu35DEIB/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/gUUQ1cFnpe48eAu35DEIB/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.png",revision:"f3caf454467fdf554741e1404161a06a"},{url:"/icons/logo-192.png",revision:"ab50fdb96c1f6c9bdb2481e96cf5adc2"},{url:"/icons/logo-256.png",revision:"98d894a79ae5ae8fbd4e18469cd7346c"},{url:"/icons/logo-32.png",revision:"f3caf454467fdf554741e1404161a06a"},{url:"/icons/logo-384.png",revision:"fc31a6516f781ec3544c860cdde9b385"},{url:"/icons/logo-512.png",revision:"36ea55fadc4395b272ea9d20953d05fa"},{url:"/manifest.json",revision:"7ad32f35452a3da71d845d091288a934"},{url:"/notification-sw.js",revision:"24423ba0bd8f5b85b0e0678b4086c8cc"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
