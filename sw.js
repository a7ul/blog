/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.5.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.5.0"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-1a4a341604a10c67a392.js"
  },
  {
    "url": "app-294dbf27ae264cdb5e6a.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-bf6bd356ce4b5f67a800.js"
  },
  {
    "url": "index.html",
    "revision": "16ec380bd796405fa990966f9b9189fa"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "eb0d270846c1f1189928203ec09f684b"
  },
  {
    "url": "0.31297af502a80877093a.css"
  },
  {
    "url": "0-fcb7bb8aef7a1b0c428d.js"
  },
  {
    "url": "component---src-pages-index-js-b3a43c59365d6bdfc07a.js"
  },
  {
    "url": "static/d/388/path---index-6a9-Z0IxJEfcCNo5gUyUmBMWZTfhvec.json",
    "revision": "9f7138c0f61cec35c81318899b92e4c3"
  },
  {
    "url": "component---src-pages-404-js-a53cd175da9a5d367574.js"
  },
  {
    "url": "static/d/164/path---404-html-516-62a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
