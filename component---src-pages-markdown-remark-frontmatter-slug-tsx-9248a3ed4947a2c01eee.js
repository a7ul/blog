(self.webpackChunkatul_blog=self.webpackChunkatul_blog||[]).push([[141],{7228:function(e){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r},e.exports.default=e.exports,e.exports.__esModule=!0},3646:function(e,t,n){var r=n(7228);e.exports=function(e){if(Array.isArray(e))return r(e)},e.exports.default=e.exports,e.exports.__esModule=!0},6860:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},319:function(e,t,n){var r=n(3646),a=n(6860),o=n(379),i=n(8206);e.exports=function(e){return r(e)||a(e)||o(e)||i()},e.exports.default=e.exports,e.exports.__esModule=!0},379:function(e,t,n){var r=n(7228);e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},6546:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return y}});var r=n(7294),a=n(5414),o=n(7361),i=n.n(o),s=n(4332),l=n(6259),c=n(5732),u=n(5108),d=n(721),m=function(e){var t=e.postData,n=i()(t,"frontmatter.keywords",""),o=i()(t,"frontmatter.title",""),s=i()(t,"frontmatter.description",t.excerpt),l=""+d.Z.url+i()(t,"frontmatter.slug","");return r.createElement(a.Z,null,r.createElement("meta",{name:"description",content:s}),r.createElement("meta",{name:"image",content:""}),r.createElement("meta",{name:"keywords",content:n}),r.createElement("meta",{property:"og:url",content:l}),r.createElement("meta",{property:"og:type",content:"article"}),r.createElement("meta",{property:"og:title",content:o}),r.createElement("meta",{property:"og:description",content:s}),r.createElement("meta",{property:"og:image",content:""}),r.createElement("meta",{property:"fb:app_id",content:d.Z.fbAppID}),r.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),r.createElement("meta",{name:"twitter:creator",content:d.Z.twitter}),r.createElement("meta",{name:"twitter:title",content:o}),r.createElement("meta",{name:"twitter:description",content:s}),r.createElement("meta",{name:"twitter:image",content:""}))},p={container:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",paddingBottom:(0,u.qZ)(1)},shareText:{textAlign:"center",display:"inline-box",fontSize:"small",fontWeight:"bold",color:"#007acc"},social:{display:"inline-block",position:"relative",textAlign:"center"},commentText:{textAlign:"center"}},f=function(e){var t=e.text,n=e.url;return r.createElement(r.Fragment,null,r.createElement("p",{key:"top-comment",style:p.commentText},r.createElement("strong",null,"Like what you read? ❤"),r.createElement("br",null)),r.createElement("aside",{key:"container",style:p.container},r.createElement("div",{style:p.social},r.createElement("a",{className:"resp-sharing-button__link",href:"https://twitter.com/intent/tweet/?text="+t+"&amp;url="+n,target:"_blank",rel:"noopener noreferrer","aria-label":""},r.createElement("div",{className:"resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small"},r.createElement("div",{"aria-hidden":"true",className:"resp-sharing-button__icon resp-sharing-button__icon--solid"},r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},r.createElement("path",{d:"M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"}))))),r.createElement("a",{className:"resp-sharing-button__link",href:"https://news.ycombinator.com/submitlink?u="+n+"&t="+t,target:"_blank",rel:"noopener noreferrer","aria-label":""},r.createElement("div",{className:"resp-sharing-button resp-sharing-button--hackernews resp-sharing-button--small"},r.createElement("div",{"aria-hidden":"true",className:"resp-sharing-button__icon resp-sharing-button__icon--solid"},r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 140 140"},r.createElement("path",{fillRule:"evenodd",d:"M60.94 82.314L17 0h20.08l25.85 52.093c.397.927.86 1.888 1.39 2.883.53.994.995 2.02 1.393 3.08.265.4.463.764.596 1.095.13.334.262.63.395.898.662 1.325 1.26 2.618 1.79 3.877.53 1.26.993 2.42 1.39 3.48 1.06-2.254 2.22-4.673 3.48-7.258 1.26-2.585 2.552-5.27 3.877-8.052L103.49 0h18.69L77.84 83.308v53.087h-16.9v-54.08z"})))))),r.createElement("div",{style:p.shareText},"Share this post")))};function h(e){var t=e.headings.filter((function(e){return e.depth<=2}));return 0===t.length?null:r.createElement("ol",{className:"toc-container"},r.createElement("h4",{className:"toc-header"},"Table of contents"),t.map((function(e){return r.createElement("li",{key:e.value},r.createElement("a",{href:"#"+e.value.replace(/\s+/g,"-").toLowerCase()},e.value))})))}var g=n.p+"static/coffee-e208eb2ebad601320fbcf3302080dc8f.svg",w={date:Object.assign({},(0,u.bA)(-.2),{display:"block"}),header:{margin:0,border:"1px solid #e6e6e6"},post:{paddingBottom:(0,u.qZ)(1)},donateText:{textAlign:"center",fontSize:"small",fontWeight:"bold",marginTop:(0,u.qZ)(-.5)},donate:{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}},y=function(e){var t=i()(e,"data.markdownRemark"),n=i()(e,"data.site.siteMetadata.title"),o=""+t.frontmatter.title,u=e.location,p={identifier:t.id,title:o},y=""+d.Z.url+i()(t,"frontmatter.slug","");return(0,r.useEffect)((function(){(window.adsbygoogle||[]).push({})}),[]),r.createElement(c.Z,{location:u},r.createElement(m,{postData:t}),r.createElement(a.Z,{title:o+" | "+n}),r.createElement("header",{className:"page-spacing"},r.createElement("h1",{style:{textAlign:"start",marginBottom:5}},o)),r.createElement("main",{className:"main-area"},r.createElement("aside",{className:"left-side-area"},r.createElement("div",{className:"side-area-wrapper"},r.createElement(h,{headings:t.headings}),r.createElement("ins",{class:"adsbygoogle",style:{display:"block"},"data-ad-client":"ca-pub-7851801517117579","data-ad-slot":"9312053399","data-ad-format":"auto","data-full-width-responsive":"true"}))),r.createElement("section",{className:"page-spacing center-area"},r.createElement("p",{style:w.date},t.frontmatter.date),r.createElement("article",{style:w.post,dangerouslySetInnerHTML:{__html:t.html}})),r.createElement("aside",{className:"right-side-area"},r.createElement("div",{className:"side-area-wrapper"},r.createElement(f,{text:o,url:y}),r.createElement("a",{href:"https://revolut.me/atul",target:"_blank",rel:"noopener noreferrer",style:w.donate},r.createElement("img",{className:"coffee",src:g,alt:"coffee"}),r.createElement("div",{style:w.donateText},"Buy me coffee "))))),r.createElement("footer",{className:"page-spacing"},r.createElement(s.h$,{config:p}),r.createElement(l.Z,null)))}},9413:function(e,t,n){"use strict";var r=n(5318);t.__esModule=!0,t.default=void 0;var a=r(n(7154)),o=r(n(7316)),i=r(n(5354)),s=r(n(7294)),l=r(n(5697)),c=n(9462),u=(0,c.debounce)((function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})}),300,!1),d=function(e){function t(t){var n;return(n=e.call(this,t)||this).shortname="atulr",n}(0,i.default)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(e){return this.props!==e&&(0,c.shallowComparison)(this.props,e)},n.componentDidUpdate=function(){this.loadInstance()},n.componentWillUnmount=function(){this.cleanInstance()},n.loadInstance=function(){window.document.getElementById("dsq-count-scr")?u():(0,c.insertScript)("https://"+this.shortname+".disqus.com/count.js","dsq-count-scr",window.document.body)},n.cleanInstance=function(){(0,c.removeScript)("dsq-count-scr",window.document.body),window.DISQUSWIDGETS=void 0},n.render=function(){var e=this.props,t=e.config,n=e.placeholder,r=(0,o.default)(e,["config","placeholder"]);return s.default.createElement("span",(0,a.default)({className:"disqus-comment-count","data-disqus-identifier":t.identifier,"data-disqus-url":t.url},r,{__self:this,__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/CommentCount.jsx",lineNumber:53,columnNumber:7}}),n)},t}(s.default.Component);t.default=d,d.defaultProps={placeholder:"..."},d.propTypes={config:l.default.shape({identifier:l.default.string,title:l.default.string,url:l.default.string}),placeholder:l.default.string}},6748:function(e,t,n){"use strict";var r=n(5318);t.__esModule=!0,t.default=void 0;var a=r(n(5354)),o=r(n(7294)),i=r(n(5697)),s=function(e){function t(){return e.apply(this,arguments)||this}(0,a.default)(t,e);var n=t.prototype;return n.getSrc=function(){return"https://embed.disqus.com/p/"+Number(this.props.commentId).toString(36)+"?p="+(this.props.showParentComment?"1":"0")+"&m="+(this.props.showMedia?"1":"0")},n.render=function(){return o.default.createElement("iframe",{src:this.getSrc(),width:this.props.width,height:this.props.height,seamless:"seamless",scrolling:"no",frameBorder:"0",__self:this,__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/CommentEmbed.jsx",lineNumber:17,columnNumber:13}})},t}(o.default.Component);t.default=s,s.defaultProps={width:420,height:320,showMedia:!0,showParentComment:!0},s.propTypes={commentId:i.default.string.isRequired,width:i.default.number,height:i.default.number,showMedia:i.default.bool,showParentComment:i.default.bool}},4838:function(e,t,n){"use strict";var r=n(5318);t.__esModule=!0,t.default=void 0;var a=r(n(7154)),o=r(n(7316)),i=r(n(5354)),s=r(n(7294)),l=r(n(5697)),c=n(9462),u=function(e){function t(t){var n;return(n=e.call(this,t)||this).shortname="atulr",n.embedUrl="https://"+n.shortname+".disqus.com/embed.js",n}(0,i.default)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(e){return this.props!==e&&(0,c.shallowComparison)(this.props,e)},n.componentDidUpdate=function(){this.loadInstance()},n.componentWillUnmount=function(){this.cleanInstance()},n.getDisqusConfig=function(e){return function(){this.page.identifier=e.identifier,this.page.url=e.url,this.page.title=e.title,this.page.remote_auth_s3=e.remoteAuthS3,this.page.api_key=e.apiKey,this.language=e.language}},n.loadInstance=function(){"undefined"!=typeof window&&window.document&&(window.disqus_config=this.getDisqusConfig(this.props.config),window.document.getElementById("dsq-embed-scr")?this.reloadInstance():(0,c.insertScript)(this.embedUrl,"dsq-embed-scr",window.document.body))},n.reloadInstance=function(){window&&window.DISQUS&&window.DISQUS.reset({reload:!0})},n.cleanInstance=function(){(0,c.removeScript)("dsq-embed-scr",window.document.body);try{delete window.DISQUS}catch(n){window.DISQUS=void 0}var e=window.document.getElementById("disqus_thread");if(e)for(;e.hasChildNodes();)e.removeChild(e.firstChild);if(window.document.querySelector('[id^="dsq-app"]')){var t=window.document.getElementById(window.document.querySelector('[id^="dsq-app"]').id);t.parentNode.removeChild(t)}},n.render=function(){var e=this.props,t=(e.config,(0,o.default)(e,["config"]));return s.default.createElement("div",(0,a.default)({id:"disqus_thread"},t,{__self:this,__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/Disqus.jsx",lineNumber:86,columnNumber:7}}))},t}(s.default.Component);t.default=u,u.propTypes={config:l.default.shape({identifier:l.default.string,title:l.default.string,url:l.default.string,language:l.default.string,remoteAuthS3:l.default.string,apiKey:l.default.string})}},4332:function(e,t,n){"use strict";var r=n(5318);var a=r(n(4838));t.h$=a.default,r(n(9413)).default,r(n(6748)).default,a.default},9462:function(e,t,n){"use strict";var r=n(5318);t.__esModule=!0,t.insertScript=function(e,t,n){var r=window.document.createElement("script");return r.async=!0,r.src=e,r.id=t,n.appendChild(r),r},t.removeScript=function(e,t){var n=window.document.getElementById(e);n&&t.removeChild(n)},t.debounce=function(e,t,n){var r;return function(){var a=this,o=arguments,i=function(){r=null,n||e.apply(a,o)},s=n&&!r;window.clearTimeout(r),r=setTimeout(i,t),s&&e.apply(a,o)}},t.isReactElement=i,t.shallowComparison=function e(t,n){var r,o=new Set(Object.keys(t).concat(Object.keys(n)));return 0!==(r=[]).concat.apply(r,(0,a.default)(o)).filter((function(r){if("object"==typeof t[r]){if(e(t[r],n[r]))return!0}else if(t[r]!==n[r]&&!i(t[r]))return!0})).length};var a=r(n(319)),o=r(n(7294));function i(e){return!!o.default.isValidElement(e)||!!Array.isArray(e)&&e.some((function(e){return o.default.isValidElement(e)}))}}}]);
//# sourceMappingURL=component---src-pages-markdown-remark-frontmatter-slug-tsx-9248a3ed4947a2c01eee.js.map