if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>a(e,i),o={module:{uri:i},exports:c,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts("notification-sw.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/370b0802-2397ae1dd3662b01.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/479ba886-9b68a9ff01923148.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/5e22fd23-1ffb01ca2b30d817.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/73-b61ccf52a24be6a0.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/934-9989217ab6bf1a4d.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/969-e83f9abe23c587f5.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/972-1782ed22077677d6.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/997-c631ddc060cad9cc.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/app/_not-found/page-6a2aff8f47394c40.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/app/admin/page-1319b0b207354286.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/app/auth/error/page-ac9bccec656767b5.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/app/auth/sign-in/page-845ff43e2b7052e0.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/app/auth/sign-up/page-56c810a1bbf2e756.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/app/auth/success/page-2173090b15158a21.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/app/dashboard/page-f0af37a767eff798.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/app/layout-1f92d65dd68b2052.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/app/page-4bb74cd8895198f6.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/app/settings/page-9ee6f6cba04f0d06.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/eec3d76d-26130be5fcda94b3.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/fd9d1056-f81993f023ad2394.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/main-47e6da97f09db0d9.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/main-app-982ad5ac33e76fea.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-4af536d87a205c69.js",revision:"xeU5UOhHapXLJDewGdwah"},{url:"/_next/static/css/d2346f1bb3ed7748.css",revision:"d2346f1bb3ed7748"},{url:"/_next/static/xeU5UOhHapXLJDewGdwah/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/xeU5UOhHapXLJDewGdwah/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icons/next-logo-192.png",revision:"38b5410dad42e21cab76e776a0221cc5"},{url:"/icons/next-logo-256.png",revision:"d42e3b889d15309948f47122b53d341d"},{url:"/icons/next-logo-384.png",revision:"0d2984796a4d815181a73b868e52d4b2"},{url:"/icons/next-logo-512.png",revision:"beb97063df7137aa7067c51c3f62d732"},{url:"/manifest.json",revision:"b7c1d01a9447eb64f9b45cc01001269f"},{url:"/notification-sw.js",revision:"45c0fcd50062e07f80b97ee29a2e7910"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
