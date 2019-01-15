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
    "url": "webpack-runtime-e9b323f8c3b32d271b94.js"
  },
  {
    "url": "app-294dbf27ae264cdb5e6a.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-bf6bd356ce4b5f67a800.js"
  },
  {
    "url": "index.html",
    "revision": "51f23cc5e1f5b5f69bb88712c333f4d9"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "643632973af37880310a7f18cf8e5e30"
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
    "url": "static/d/178/path---index-6a9-4SffK8C8u6vHzweIy79TlbKQFQ.json",
    "revision": "f1a9b57342bb04434da710a74b1c2b35"
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
