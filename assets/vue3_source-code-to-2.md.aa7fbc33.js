import{_ as s,o as a,c as p,Q as n}from"./chunks/framework.12b7deed.js";const e=JSON.parse('{"title":"Vue3源码共读：第二期打包脚本解析，查找入口文件，源码层面解读初始化过程","description":"","frontmatter":{"title":"Vue3源码共读：第二期打包脚本解析，查找入口文件，源码层面解读初始化过程","head":[["meta",{"name":"og:title","content":"Vue3源码共读：第二期打包脚本解析，查找入口文件，源码层面解读初始化过程 | VitePress"}]]},"headers":[],"relativePath":"vue3/source-code-to-2.md","filePath":"vue3/source-code-to-2.md","lastUpdated":1698918793000}'),t={name:"vue3/source-code-to-2.md"},l=n(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>上次所使用的的方法是单步调式法，这次从package.json去分析我们的入口文件,原一开始的时候，都是从这里看到的项目的基本配置的信息的，很少去用单步调式法去分析，也是听村长这样调式了一波学习到了。</p><h2 id="package-json" tabindex="-1">package.json <a class="header-anchor" href="#package-json" aria-label="Permalink to &quot;package.json&quot;">​</a></h2><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78978fedf89b40a4ac5ace3f0f152f19~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>这个执行打包的时候，真正执行的脚本是<code>scripts/dev.js</code>，发生一个非常重要的文件</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34ee7ff86d774173ab3947603a4393a6~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca3ecd62c2b94110ae4ea9f9014bfcdd~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>在dev.js文件中就可以获取到我们的入口文件了,走到这的时候，我们发现没有录可以走了，这个是时候我们应该去看打包配置文件，一般吸纳按个webpack、vite这些都是有打包配置文件的</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85fac866dda34baf88425f7ce89e1bd5~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> 从rollup.config.js中可以得到package目录，打包格式cjs、es、iife，entryFile</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf351c250a3b45efa63091e91328b7c3~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>这里是个正则表达式，去校验是都有<code>-runtime</code>的字样，决定入口文件。由于dev上没有带，所以是index.ts</p><h2 id="index-ts" tabindex="-1">index.ts <a class="header-anchor" href="#index-ts" aria-label="Permalink to &quot;index.ts&quot;">​</a></h2><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a682fb008aa4bacabc1c63cbf1ebb83~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> 这个就是入口文件的内容了</p><p>现在我们写个案例来调试一波</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">     &lt;</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;{{title}}&lt;/</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">src</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;../dist/vue.global.js&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">     const { createApp }  = Vue</span></span>
<span class="line"><span style="color:#E1E4E8;">     createApp({</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">             return{</span></span>
<span class="line"><span style="color:#E1E4E8;">                 </span><span style="color:#B392F0;">title</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;你好&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">             }</span></span>
<span class="line"><span style="color:#E1E4E8;">         }</span></span>
<span class="line"><span style="color:#E1E4E8;">     }).mount(&quot;#app&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">     &lt;</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;{{title}}&lt;/</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;"> &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">src</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;../dist/vue.global.js&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">     const { createApp }  = Vue</span></span>
<span class="line"><span style="color:#24292E;">     createApp({</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">             return{</span></span>
<span class="line"><span style="color:#24292E;">                 </span><span style="color:#6F42C1;">title</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;你好&quot;</span></span>
<span class="line"><span style="color:#24292E;">             }</span></span>
<span class="line"><span style="color:#24292E;">         }</span></span>
<span class="line"><span style="color:#24292E;">     }).mount(&quot;#app&quot;)</span></span>
<span class="line"><span style="color:#24292E;"> &lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>运行在浏览器，打开控制台，Ctrl+p输入vuesrcindex，就会自动过滤出来了。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20809023be3045f9a456deedc0f634b2~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>再教大家一个学习方法，可以利用调用栈CallStack，执行的顺序都一览无余都在上面了</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9b2f1cdd1dd453ab8eb1f9a01ffe633~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>这样旧完全可以看到是谁调用了<code>compileToFunction</code></p><p>接下来的顺序就跟第一期的顺序是一样的了：package/runtime-dom/index.ts,里面的createApp方法，利用vscode的Ctrl+鼠标点击自动跳转了。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d12df4aff92e49e7be7aa3babde30738~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6f3b831095d4f7383ea39d180f1cb94~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>兼容vue2</p><h2 id="提问-compiletofunction何时调用" tabindex="-1">提问: compileToFunction何时调用 <a class="header-anchor" href="#提问-compiletofunction何时调用" aria-label="Permalink to &quot;提问: compileToFunction何时调用&quot;">​</a></h2><p><code>finishComponentSetup</code>方法在没有render函数的时候，就触发了。这就是为为什么组件没有render函数也能渲染出来</p><h2 id="data和setup哪个优先级高" tabindex="-1">data和setup哪个优先级高 <a class="header-anchor" href="#data和setup哪个优先级高" aria-label="Permalink to &quot;data和setup哪个优先级高&quot;">​</a></h2><p>setup优先级高</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>时常复习好牢记</p>`,30),o=[l];function c(i,E,d,u,y,f){return a(),p("div",null,o)}const r=s(t,[["render",c]]),g=Object.freeze(Object.defineProperty({__proto__:null,__pageData:e,default:r},Symbol.toStringTag,{value:"Module"}));export{g as _,e as __pageData,r as default};
