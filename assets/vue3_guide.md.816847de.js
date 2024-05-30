import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.12b7deed.js";const p=JSON.parse('{"title":"Vue3新特性","description":"","frontmatter":{"title":"Vue3新特性","head":[["meta",{"name":"og:title","content":"Vue3新特性 | VitePress"}]]},"headers":[],"relativePath":"vue3/guide.md","filePath":"vue3/guide.md","lastUpdated":1698918793000}'),o={name:"vue3/guide.md"},e=l(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>Vue3.0从20年九月发布第一个One Piece版本，到现在一直在更新优化；中文版的官方文档也已经放出；根据自己的学习和总结给大家分享一下Vue3新增了哪些功能和特性。</p><h2 id="ref" tabindex="-1"><strong>ref</strong> <a class="header-anchor" href="#ref" aria-label="Permalink to &quot;**ref**&quot;">​</a></h2><ul><li>ref可以代理字符串、数字、boolean等基本类型值</li><li>ref声明的值需要通过.value去改变</li><li>ref目的是为了引用原始类型值，但仍然可以引用非基本类型值例如对象</li><li>ref 本质也是reactive 可以简单地把 ref(1) 理解为这个样子 reactive({value: 1})，有兴趣的可以看一下源码</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ref } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">//用法1、代理基本类型</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> refBaseType </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  refBaseType.value</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#6A737D;">//用法二、</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">refObj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">({ num: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//需要通过.value去访问</span></span>
<span class="line"><span style="color:#E1E4E8;">  refObj.value.num </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//值改变，触发视图更新</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法三、</span></span>
<span class="line"><span style="color:#6A737D;">//可以通过ref代理某个对象下面的值，复制修改响应式数据不影响原对象</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">refObj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { num: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">refBaseType</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(refObj.num)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    refBaseType.value</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(refBaseType.value) </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(refObj.num) </span><span style="color:#6A737D;">//值不变</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ref } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">//用法1、代理基本类型</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> refBaseType </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  refBaseType.value</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#6A737D;">//用法二、</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">refObj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">({ num: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">//需要通过.value去访问</span></span>
<span class="line"><span style="color:#24292E;">  refObj.value.num </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//值改变，触发视图更新</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法三、</span></span>
<span class="line"><span style="color:#6A737D;">//可以通过ref代理某个对象下面的值，复制修改响应式数据不影响原对象</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">refObj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { num: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">refBaseType</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(refObj.num)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    refBaseType.value</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(refBaseType.value) </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(refObj.num) </span><span style="color:#6A737D;">//值不变</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="reactive" tabindex="-1"><strong>reactive</strong> <a class="header-anchor" href="#reactive" aria-label="Permalink to &quot;**reactive**&quot;">​</a></h2><ul><li>reactive接受一个可代理的对象，但不能是字符串、数字、boolean等基本类型值</li><li>reactive不需要通过.value去访问属性值</li><li>reactive解构会造成响应式丢失</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { reactive,ref,toRefs } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({num:</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj.num</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// reactive解构会造成响应式丢失</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">book</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  author: </span><span style="color:#9ECBFF;">&#39;尤雨溪&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  year: </span><span style="color:#9ECBFF;">&#39;2020&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;Vue 3 Guide&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  description: </span><span style="color:#9ECBFF;">&#39;You are reading this book right now ;)&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  price: </span><span style="color:#9ECBFF;">&#39;free&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> { author, title } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> book </span></span>
<span class="line"><span style="color:#E1E4E8;">title </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue3 good&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 响应式丢失,视图不更新</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// // 解决办法</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> { author, title } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toRefs</span><span style="color:#E1E4E8;">(book) </span></span>
<span class="line"><span style="color:#E1E4E8;">title.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue3 good&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 通过.value 因为现在title为ref,视图更新</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//直接赋值会造成响应式丢失</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">book</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  author: </span><span style="color:#9ECBFF;">&#39;尤雨溪&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  year: </span><span style="color:#9ECBFF;">&#39;2020&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;Vue 3 Guide&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  description: </span><span style="color:#9ECBFF;">&#39;You are reading this book right now ;)&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  price: </span><span style="color:#9ECBFF;">&#39;free&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> book1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(()</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;我要更新book1对象&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    book1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> book  </span><span style="color:#6A737D;">//直接赋值，视图不更新</span></span>
<span class="line"><span style="color:#E1E4E8;">    book1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toRefs</span><span style="color:#E1E4E8;">(book) </span><span style="color:#6A737D;">//toRefs创建ref类型的数据，视图不更新</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span><span style="color:#79B8FF;">3000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//解决办法</span></span>
<span class="line"><span style="color:#6A737D;">//将一开始的book1对象就用ref去创建，因为.value改变的时候可以做到响应式</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">book1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">({})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(()</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;我要更新book1对象&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    book1.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> book  </span><span style="color:#6A737D;">//直接赋值，视图更新</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span><span style="color:#79B8FF;">3000</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { reactive,ref,toRefs } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({num:</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  obj.num</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// reactive解构会造成响应式丢失</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">book</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  author: </span><span style="color:#032F62;">&#39;尤雨溪&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  year: </span><span style="color:#032F62;">&#39;2020&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;Vue 3 Guide&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  description: </span><span style="color:#032F62;">&#39;You are reading this book right now ;)&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  price: </span><span style="color:#032F62;">&#39;free&#39;</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> { author, title } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> book </span></span>
<span class="line"><span style="color:#24292E;">title </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue3 good&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 响应式丢失,视图不更新</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// // 解决办法</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> { author, title } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toRefs</span><span style="color:#24292E;">(book) </span></span>
<span class="line"><span style="color:#24292E;">title.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue3 good&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 通过.value 因为现在title为ref,视图更新</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//直接赋值会造成响应式丢失</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">book</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  author: </span><span style="color:#032F62;">&#39;尤雨溪&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  year: </span><span style="color:#032F62;">&#39;2020&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;Vue 3 Guide&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  description: </span><span style="color:#032F62;">&#39;You are reading this book right now ;)&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  price: </span><span style="color:#032F62;">&#39;free&#39;</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> book1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;我要更新book1对象&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    book1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> book  </span><span style="color:#6A737D;">//直接赋值，视图不更新</span></span>
<span class="line"><span style="color:#24292E;">    book1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toRefs</span><span style="color:#24292E;">(book) </span><span style="color:#6A737D;">//toRefs创建ref类型的数据，视图不更新</span></span>
<span class="line"><span style="color:#24292E;">},</span><span style="color:#005CC5;">3000</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//解决办法</span></span>
<span class="line"><span style="color:#6A737D;">//将一开始的book1对象就用ref去创建，因为.value改变的时候可以做到响应式</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">book1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">({})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;我要更新book1对象&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    book1.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> book  </span><span style="color:#6A737D;">//直接赋值，视图更新</span></span>
<span class="line"><span style="color:#24292E;">},</span><span style="color:#005CC5;">3000</span><span style="color:#24292E;">)</span></span></code></pre></div><h2 id="shallowreactive" tabindex="-1"><strong>shallowReactive</strong> <a class="header-anchor" href="#shallowreactive" aria-label="Permalink to &quot;**shallowReactive**&quot;">​</a></h2><ul><li>用法同reactive，用于定义一个浅响应数据只代理第一层，当数据结构比较复杂时，每层都用proxy代理消耗性能</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { shallowReactive } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">shallowReactive</span><span style="color:#E1E4E8;">({ foo: { bar: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> } })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj.foo.bar </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//值改变，不触发视图更新</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj.foo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { bar: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> } </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { shallowReactive } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">shallowReactive</span><span style="color:#24292E;">({ foo: { bar: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> } })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  obj.foo.bar </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//值改变，不触发视图更新</span></span>
<span class="line"><span style="color:#24292E;">  obj.foo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { bar: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> } </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="readonly" tabindex="-1"><strong>readonly</strong> <a class="header-anchor" href="#readonly" aria-label="Permalink to &quot;**readonly**&quot;">​</a></h2><ul><li>用于定义一个只可读数据,接受一个Object对象</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { readonly } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">readonly</span><span style="color:#E1E4E8;">({ text: </span><span style="color:#9ECBFF;">&#39;hi&#39;</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj.text </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Hello&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//报错，无法分配到 &quot;text&quot; ，因为它是只读属性。</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { readonly } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">readonly</span><span style="color:#24292E;">({ text: </span><span style="color:#032F62;">&#39;hi&#39;</span><span style="color:#24292E;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  obj.text </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Hello&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//报错，无法分配到 &quot;text&quot; ，因为它是只读属性。</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="shallowreadonly" tabindex="-1"><strong>shallowReadonly</strong> <a class="header-anchor" href="#shallowreadonly" aria-label="Permalink to &quot;**shallowReadonly**&quot;">​</a></h2><p>-用于定义一个浅只读的数据，接受一个Object对象</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { shallowReadonly } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">shallowReadonly</span><span style="color:#E1E4E8;">({ text: {num:</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">} })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj.text.num </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { shallowReadonly } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">shallowReadonly</span><span style="color:#24292E;">({ text: {num:</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">} })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  obj.text.num </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="toref" tabindex="-1"><strong>toRef</strong> <a class="header-anchor" href="#toref" aria-label="Permalink to &quot;**toRef**&quot;">​</a></h2><ul><li>创建一个ref类型数据, 并和以前的数据关联</li><li>相当于引用, 修改响应式数据会影响原始数据</li><li>第一个参数为object对象；第二个参数为对象中的属性名</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//用法：如果想让响应式数据和原始的数据关联起来, 并且更新响应式数据之后还不想更新UI, 那么就可以使用toRef</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { num: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#6A737D;">//const obj = reactive({ num: 1}) //reactive创建的对象会触发视图更新</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">refVal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toRef</span><span style="color:#E1E4E8;">(obj, </span><span style="color:#9ECBFF;">&#39;num&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    refVal.value</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(refVal.value) </span><span style="color:#6A737D;">//值改变，视图不更新</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj.num) </span><span style="color:#6A737D;">//值改变，视图不更新</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//用法：如果想让响应式数据和原始的数据关联起来, 并且更新响应式数据之后还不想更新UI, 那么就可以使用toRef</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { num: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#6A737D;">//const obj = reactive({ num: 1}) //reactive创建的对象会触发视图更新</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">refVal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toRef</span><span style="color:#24292E;">(obj, </span><span style="color:#032F62;">&#39;num&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    refVal.value</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(refVal.value) </span><span style="color:#6A737D;">//值改变，视图不更新</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj.num) </span><span style="color:#6A737D;">//值改变，视图不更新</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="torefs" tabindex="-1"><strong>toRefs</strong> <a class="header-anchor" href="#torefs" aria-label="Permalink to &quot;**toRefs**&quot;">​</a></h2><ul><li>创建一个ref类型数据, 并和以前的数据关联</li><li>相当于引用, 修改响应式数据会影响原始数据</li><li>传入的参数只有一个且为object对象</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//用法一、reactive解构赋值会失去响应式，那么就可以使用toRefs</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { reactive, toRefs } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({ text: </span><span style="color:#9ECBFF;">&quot;hi&quot;</span><span style="color:#E1E4E8;">, num: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> { text, num } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toRefs</span><span style="color:#E1E4E8;">(obj)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  text.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Hello&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#E1E4E8;">  num.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法二、批量创建ref类型数据, 并和以前数据关联，不触发视图更新</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { reactive, toRefs } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { foo: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, num: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#6A737D;">//const obj = reactive({ foo: 1, num: 1 })  //reactive创建的对象会触发视图更新</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">state</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toRefs</span><span style="color:#E1E4E8;">(obj)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  state.foo.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  state.num.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(state.foo.value) </span><span style="color:#6A737D;">// 2 值改变，视图不更新</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj.foo) </span><span style="color:#6A737D;">// 2 值改变，视图不更新</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//用法一、reactive解构赋值会失去响应式，那么就可以使用toRefs</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { reactive, toRefs } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({ text: </span><span style="color:#032F62;">&quot;hi&quot;</span><span style="color:#24292E;">, num: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> { text, num } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toRefs</span><span style="color:#24292E;">(obj)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  text.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Hello&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#24292E;">  num.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法二、批量创建ref类型数据, 并和以前数据关联，不触发视图更新</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { reactive, toRefs } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { foo: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, num: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#6A737D;">//const obj = reactive({ foo: 1, num: 1 })  //reactive创建的对象会触发视图更新</span></span>
<span class="line"><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">state</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toRefs</span><span style="color:#24292E;">(obj)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  state.foo.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  state.num.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(state.foo.value) </span><span style="color:#6A737D;">// 2 值改变，视图不更新</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj.foo) </span><span style="color:#6A737D;">// 2 值改变，视图不更新</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="shallowref" tabindex="-1"><strong>shallowRef</strong> <a class="header-anchor" href="#shallowref" aria-label="Permalink to &quot;**shallowRef**&quot;">​</a></h2><ul><li>这是一个浅层的 ref ,只代理.value 可用于优化性能</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { shallowRef, triggerRef } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">shallowRef</span><span style="color:#E1E4E8;">({ num: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//shallowRef只代理 ref 对象本身，也就是说只有 .value 是被代理的，而 .value 所引用的对象并没有被代理</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj.value.num </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//值改变，视图不更新</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">triggerRef</span><span style="color:#E1E4E8;">(obj) </span><span style="color:#6A737D;">// 可通过修改值后立即驱动视图更新</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#E1E4E8;">  obj.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { num: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> } </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { shallowRef, triggerRef } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">shallowRef</span><span style="color:#24292E;">({ num: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//shallowRef只代理 ref 对象本身，也就是说只有 .value 是被代理的，而 .value 所引用的对象并没有被代理</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  obj.value.num </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//值改变，视图不更新</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">triggerRef</span><span style="color:#24292E;">(obj) </span><span style="color:#6A737D;">// 可通过修改值后立即驱动视图更新</span></span>
<span class="line"><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#24292E;">  obj.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { num: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> } </span><span style="color:#6A737D;">//值改变，视图更新</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="unref" tabindex="-1"><strong>unref</strong> <a class="header-anchor" href="#unref" aria-label="Permalink to &quot;**unref**&quot;">​</a></h2><ul><li>接收一个值，如果这个值是 ref 就返回 .value，否则原样返回</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//vue3 unref 源码 </span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">unref</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#FFAB70;">ref</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Ref</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">infer</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">V</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">V</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isRef</span><span style="color:#E1E4E8;">(ref) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> (ref.value </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> ref </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法一</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ref, unref } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">val</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;hi&quot;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">refVal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">unrefVal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">unref</span><span style="color:#E1E4E8;">(val) </span><span style="color:#6A737D;">//输出hi</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">unrefObj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">unref</span><span style="color:#E1E4E8;">(refVal) </span><span style="color:#6A737D;">//输出1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//vue3 unref 源码 </span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">unref</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">&gt;(</span><span style="color:#E36209;">ref</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">T</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Ref</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">infer</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">V</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">V</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">T</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isRef</span><span style="color:#24292E;">(ref) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> (ref.value </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> ref </span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法一</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ref, unref } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">val</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;hi&quot;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">refVal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">unrefVal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">unref</span><span style="color:#24292E;">(val) </span><span style="color:#6A737D;">//输出hi</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">unrefObj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">unref</span><span style="color:#24292E;">(refVal) </span><span style="color:#6A737D;">//输出1</span></span></code></pre></div><h2 id="markraw" tabindex="-1"><strong>markRaw</strong> <a class="header-anchor" href="#markraw" aria-label="Permalink to &quot;**markRaw**&quot;">​</a></h2><ul><li>将原始数据标记为非响应式的，即使用 ref 或 reactive 将其包装，仍无法实现数据响应式，其接收一个参数，即原始数据，并返回被标记后的数据</li></ul><p>markRaw 函数所做的事情，就是在数据对象上定义 __v_skip 属性，从而跳过代理</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { markRaw, reactive } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//通过markRow代理过的对象，不会触发视图更新</span></span>
<span class="line"><span style="color:#6A737D;">//markRow可用来数据改变但不需要视图改变的情况，用于提升性能。</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { foo: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">markRaw</span><span style="color:#E1E4E8;">(obj)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">state</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">(obj2)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  state.foo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//值改变，视图不更新</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(state) </span><span style="color:#6A737D;">//2</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj) </span><span style="color:#6A737D;">//2 </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { markRaw, reactive } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//通过markRow代理过的对象，不会触发视图更新</span></span>
<span class="line"><span style="color:#6A737D;">//markRow可用来数据改变但不需要视图改变的情况，用于提升性能。</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { foo: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">markRaw</span><span style="color:#24292E;">(obj)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">state</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">(obj2)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  state.foo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//值改变，视图不更新</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(state) </span><span style="color:#6A737D;">//2</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj) </span><span style="color:#6A737D;">//2 </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Vue3 的 VNode 对象带有 <code>__v_skip: true</code> 标识，用于跳过代理（实际上，只要带有 <code>__v_skip</code> 属性并且值为 <code>true</code> 的对象，都不会是被代理），例如：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// obj 是原始数据对象</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  foo: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  __v_skip: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// obj 是原始数据对象</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  foo: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  __v_skip: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="toraw" tabindex="-1"><strong>toRaw</strong> <a class="header-anchor" href="#toraw" aria-label="Permalink to &quot;**toRaw**&quot;">​</a></h2><ul><li>toRaw方法用于拿到原始数据，对原始数据进行修改,不会更新UI界面，</li><li>与markRow()方法类似可用于提升性能，不同的是 markRow接收的不是被代理过的响应式数据</li><li>toRaw 方法是用于获取 ref 或 reactive 对象的原始数据的</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { toRaw, reactive, ref } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//代理reactive对象</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({ num: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toRaw</span><span style="color:#E1E4E8;">(obj)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj2.num </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//值改变，视图不会更新</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//代理ref创建的对象</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">({ num: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toRaw</span><span style="color:#E1E4E8;">(obj.value) </span></span>
<span class="line"><span style="color:#6A737D;">//与reactive不同的是，需要用.value去获取原始数据</span></span>
<span class="line"><span style="color:#6A737D;">//因为经过Vue处理之后,.value中保存的才是当初创建时传入的那个原始数据</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   obj2.num </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//值改变，视图不会更新</span></span>
<span class="line"><span style="color:#E1E4E8;">   console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj.value) </span><span style="color:#6A737D;">//输出 { num: 2 }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { toRaw, reactive, ref } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//代理reactive对象</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({ num: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toRaw</span><span style="color:#24292E;">(obj)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  obj2.num </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//值改变，视图不会更新</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//代理ref创建的对象</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">({ num: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toRaw</span><span style="color:#24292E;">(obj.value) </span></span>
<span class="line"><span style="color:#6A737D;">//与reactive不同的是，需要用.value去获取原始数据</span></span>
<span class="line"><span style="color:#6A737D;">//因为经过Vue处理之后,.value中保存的才是当初创建时传入的那个原始数据</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   obj2.num </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//值改变，视图不会更新</span></span>
<span class="line"><span style="color:#24292E;">   console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj.value) </span><span style="color:#6A737D;">//输出 { num: 2 }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="isref" tabindex="-1"><strong>isRef</strong> <a class="header-anchor" href="#isref" aria-label="Permalink to &quot;**isRef**&quot;">​</a></h2><ul><li>用于判断数据是否是ref创建的，Vue3创建ref的时候会增加__v_isRef: true属性来标识ref数据</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ref, isRef } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">val</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">isRef</span><span style="color:#E1E4E8;">(val)) </span><span style="color:#6A737D;">//true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ref, isRef } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">val</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">isRef</span><span style="color:#24292E;">(val)) </span><span style="color:#6A737D;">//true</span></span></code></pre></div><h2 id="isreactive" tabindex="-1"><strong>isReactive</strong> <a class="header-anchor" href="#isreactive" aria-label="Permalink to &quot;**isReactive**&quot;">​</a></h2><ul><li>判断数据对象是否是 reactive</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { reactive, isReactive } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({ foo: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">isReactive</span><span style="color:#E1E4E8;">(obj)) </span><span style="color:#6A737D;">//true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { reactive, isReactive } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({ foo: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">isReactive</span><span style="color:#24292E;">(obj)) </span><span style="color:#6A737D;">//true</span></span></code></pre></div><h2 id="isreadonly" tabindex="-1"><strong>isReadonly</strong> <a class="header-anchor" href="#isreadonly" aria-label="Permalink to &quot;**isReadonly**&quot;">​</a></h2><ul><li>判断数据对象是否是readonly只可读</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { readonly, isReadonly } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">val</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">readonly</span><span style="color:#E1E4E8;">({ foo: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">isReadonly</span><span style="color:#E1E4E8;">(val)) </span><span style="color:#6A737D;">//true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { readonly, isReadonly } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">val</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">readonly</span><span style="color:#24292E;">({ foo: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">isReadonly</span><span style="color:#24292E;">(val)) </span><span style="color:#6A737D;">//true</span></span></code></pre></div><h2 id="isproxy" tabindex="-1"><strong>isProxy</strong> <a class="header-anchor" href="#isproxy" aria-label="Permalink to &quot;**isProxy**&quot;">​</a></h2><ul><li>用于判断对象是否是reactive 或 readonly 创建的代理对象</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { readonly, reactive, isProxy } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({ foo: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">val</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">readonly</span><span style="color:#E1E4E8;">({ foo: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">isProxy</span><span style="color:#E1E4E8;">(obj)) </span><span style="color:#6A737D;">//true</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">isProxy</span><span style="color:#E1E4E8;">(val)) </span><span style="color:#6A737D;">//true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { readonly, reactive, isProxy } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({ foo: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">val</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">readonly</span><span style="color:#24292E;">({ foo: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">isProxy</span><span style="color:#24292E;">(obj)) </span><span style="color:#6A737D;">//true</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">isProxy</span><span style="color:#24292E;">(val)) </span><span style="color:#6A737D;">//true</span></span></code></pre></div><h2 id="computed" tabindex="-1"><strong>computed</strong> <a class="header-anchor" href="#computed" aria-label="Permalink to &quot;**computed**&quot;">​</a></h2><ul><li>跟vue2是计算属性</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//写法-</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">val</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//vue3中计算属性的函数中如果只传入一个回调函数，表示的是get</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">doubule</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">computed</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> val.value </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  val.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(doubule.value) </span><span style="color:#6A737D;">// 6 需要通过.value去访问</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">//写法二</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">val</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> obj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { foo: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">doubule</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">computed</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;">//dobule的返回值</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> obj.foo </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;">//写你的逻辑代码</span></span>
<span class="line"><span style="color:#E1E4E8;">     val.value</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">     obj.foo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> val.value</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//写法-</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">val</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//vue3中计算属性的函数中如果只传入一个回调函数，表示的是get</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">doubule</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">computed</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> val.value </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  val.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(doubule.value) </span><span style="color:#6A737D;">// 6 需要通过.value去访问</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">//写法二</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">val</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> obj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { foo: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">doubule</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">computed</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;">//dobule的返回值</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> obj.foo </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;">//写你的逻辑代码</span></span>
<span class="line"><span style="color:#24292E;">     val.value</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">     obj.foo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> val.value</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span></code></pre></div><h2 id="watch" tabindex="-1"><strong>watch</strong> <a class="header-anchor" href="#watch" aria-label="Permalink to &quot;**watch**&quot;">​</a></h2><ul><li>watch监听某个属性的变化，一旦发生变化，就会触发对应的回调函数执行，在里面进行一些具体的操作，从而达到事件监听的效果。</li><li>需手动传入监听的数据，返回新值和旧值。</li><li>一共传入三个参数： <ul><li>第一个参数是：选择要监听的属性。</li><li>第二个参数是：设置的回调函数。即监听到变化时应该执行的函数 。</li><li>第三个参数是：可以设置deep (深度监听) 其值为true和false。还可以设置immediate (是否以当前值执行回调函数) 其值为true和false。</li></ul></li><li>与vue2不同的是 vue2需要通过computed计算才会返回新值和旧值，否则返回的都是新值。</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ref, reactive, watch } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#6A737D;">//用法一、监听ref创建的数据</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">val</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(val,(</span><span style="color:#FFAB70;">newVal</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">oldVal</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">     console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(newVal) </span><span style="color:#6A737D;">//1 输出新值</span></span>
<span class="line"><span style="color:#E1E4E8;">     console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(oldVal) </span><span style="color:#6A737D;">//0 输出旧值</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    immediate: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//是否在初始化监听</span></span>
<span class="line"><span style="color:#E1E4E8;">    deep: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//是否开启深度监听</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   val.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//值改变</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法二、监听多个ref创建的数据</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> mes </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;会好的&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> mess </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;我是谁&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  [mes, mess],</span></span>
<span class="line"><span style="color:#E1E4E8;">  (</span><span style="color:#FFAB70;">newValue</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">odlValue</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;变化----&quot;</span><span style="color:#E1E4E8;">, newValue, odlValue);</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { immediate: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(()</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  mes.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;会更好的&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  mess.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;我是谁啊&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//第三种情况 监听reactive创建的数据</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> rea </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: </span><span style="color:#9ECBFF;">&quot;我是谁&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    salary: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  rea,</span></span>
<span class="line"><span style="color:#E1E4E8;">  (</span><span style="color:#FFAB70;">newValue</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">oldValue</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;变化----&quot;</span><span style="color:#E1E4E8;">, newValue, oldValue);</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  { immediate: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法四、监听reactive创建数据的属性（基本数据）</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> rea </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: </span><span style="color:#9ECBFF;">&quot;我是谁&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    salary: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> rea.name,</span></span>
<span class="line"><span style="color:#E1E4E8;">  (</span><span style="color:#FFAB70;">newValue</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">oldValue</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;变化----&quot;</span><span style="color:#E1E4E8;">, newValue, oldValue);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  rea.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;我是谁啊&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;改变rea.obj&quot;</span><span style="color:#E1E4E8;">, rea);</span></span>
<span class="line"><span style="color:#E1E4E8;">}, </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法五、监听reactive创建数据的属性（引用数据）</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> rea </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: </span><span style="color:#9ECBFF;">&quot;我是谁&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    salary: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#B392F0;">watch</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> rea.obj,</span></span>
<span class="line"><span style="color:#E1E4E8;">  (</span><span style="color:#FFAB70;">newValue</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">oldValue</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;变化----&quot;</span><span style="color:#E1E4E8;">, newValue, oldValue);</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    deep:</span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  rea.obj.salary </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">18</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;改变rea.obj&quot;</span><span style="color:#E1E4E8;">, rea);</span></span>
<span class="line"><span style="color:#E1E4E8;">}, </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ref, reactive, watch } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#6A737D;">//用法一、监听ref创建的数据</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">val</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(val,(</span><span style="color:#E36209;">newVal</span><span style="color:#24292E;">, </span><span style="color:#E36209;">oldVal</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">     console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(newVal) </span><span style="color:#6A737D;">//1 输出新值</span></span>
<span class="line"><span style="color:#24292E;">     console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(oldVal) </span><span style="color:#6A737D;">//0 输出旧值</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    immediate: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//是否在初始化监听</span></span>
<span class="line"><span style="color:#24292E;">    deep: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//是否开启深度监听</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   val.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//值改变</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法二、监听多个ref创建的数据</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> mes </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;会好的&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> mess </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;我是谁&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  [mes, mess],</span></span>
<span class="line"><span style="color:#24292E;">  (</span><span style="color:#E36209;">newValue</span><span style="color:#24292E;">, </span><span style="color:#E36209;">odlValue</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;变化----&quot;</span><span style="color:#24292E;">, newValue, odlValue);</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  { immediate: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  mes.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;会更好的&quot;</span></span>
<span class="line"><span style="color:#24292E;">  mess.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;我是谁啊&quot;</span></span>
<span class="line"><span style="color:#24292E;">},</span><span style="color:#005CC5;">200</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//第三种情况 监听reactive创建的数据</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> rea </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  name: </span><span style="color:#032F62;">&quot;我是谁&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  obj: {</span></span>
<span class="line"><span style="color:#24292E;">    salary: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  rea,</span></span>
<span class="line"><span style="color:#24292E;">  (</span><span style="color:#E36209;">newValue</span><span style="color:#24292E;">, </span><span style="color:#E36209;">oldValue</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;变化----&quot;</span><span style="color:#24292E;">, newValue, oldValue);</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  { immediate: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法四、监听reactive创建数据的属性（基本数据）</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> rea </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  name: </span><span style="color:#032F62;">&quot;我是谁&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  obj: {</span></span>
<span class="line"><span style="color:#24292E;">    salary: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> rea.name,</span></span>
<span class="line"><span style="color:#24292E;">  (</span><span style="color:#E36209;">newValue</span><span style="color:#24292E;">, </span><span style="color:#E36209;">oldValue</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;变化----&quot;</span><span style="color:#24292E;">, newValue, oldValue);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  rea.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;我是谁啊&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;改变rea.obj&quot;</span><span style="color:#24292E;">, rea);</span></span>
<span class="line"><span style="color:#24292E;">}, </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法五、监听reactive创建数据的属性（引用数据）</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> rea </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  name: </span><span style="color:#032F62;">&quot;我是谁&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  obj: {</span></span>
<span class="line"><span style="color:#24292E;">    salary: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#6F42C1;">watch</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> rea.obj,</span></span>
<span class="line"><span style="color:#24292E;">  (</span><span style="color:#E36209;">newValue</span><span style="color:#24292E;">, </span><span style="color:#E36209;">oldValue</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;变化----&quot;</span><span style="color:#24292E;">, newValue, oldValue);</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    deep:</span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  rea.obj.salary </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">18</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;改变rea.obj&quot;</span><span style="color:#24292E;">, rea);</span></span>
<span class="line"><span style="color:#24292E;">}, </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">);</span></span></code></pre></div><h2 id="watcheffect" tabindex="-1"><strong>watchEffect</strong> <a class="header-anchor" href="#watcheffect" aria-label="Permalink to &quot;**watchEffect**&quot;">​</a></h2><ul><li>watchEffect也是监听数据变化。</li><li>当 watchEffect 在组件的 setup() 函数或生命周期钩子被调用时，侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。</li><li>与watch不同的是: <ul><li>不需要手动传入依赖</li><li>每次初始化都会执行</li><li>无法获取到原值，只能得到变化后的值</li></ul></li><li>一共有两个参数： <ul><li>第一个参数effect --- 也是函数 --- 也有参数：叫<code>onInvalidate</code>，也是一个函数，用于清除 <code>effect</code> 产生的副作用。</li><li>第二个参数options --- 主要作用是指定调度器，即何时运行副作用函数，配置项有： <ul><li><code>flush</code>：（默认pre（更新前），post （更新后）， sync （同步，低效不建议使用））</li><li><code>onTrack</code> 和 <code>onTrigger</code> 选项可用于调试一个侦听器的行为（当然只开发阶段有效）</li></ul></li></ul></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ref, reactive, watchEffect } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#6A737D;">//用法一、</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({ foo: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">val</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">watchEffect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj.foo)</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(val.value)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">stop</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">watchEffect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/* ... */</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 手动停止依赖</span></span>
<span class="line"><span style="color:#B392F0;">stop</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  val.value</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">  obj.foo</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">//用法二、watchEffect接受一个函数作为参数 ，可用于清除副作用</span></span>
<span class="line"><span style="color:#B392F0;">watchEffect</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fetch</span><span style="color:#E1E4E8;">(obj.foo);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//当 obj.foo 变化后，意味着将会再次发送请求，那么之前的请求怎么办呢？是否应该将之前的请求标记为 invalidate</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">watchEffect</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">onInvalidate</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> validate </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onInvalidate</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    validate </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fetch</span><span style="color:#E1E4E8;">(obj.foo);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (validate) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/* 正常使用 data */</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/* 说明当前副作用已经无效了，抛弃即可 */</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#B392F0;">watchEffect</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">onInvalidate</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> timer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getList</span><span style="color:#E1E4E8;">(title.value);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 清除副作用</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onInvalidate</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">clearTimeout</span><span style="color:#E1E4E8;">(timer);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 在组件更新后触发，这样你就可以访问更新的 DOM。</span></span>
<span class="line"><span style="color:#6A737D;">// 注意：这也将推迟副作用的初始运行，直到组件的首次渲染完成。（默认pre（更新前），post （更新后）， sync （同步，低效不建议使用））</span></span>
<span class="line"><span style="color:#B392F0;">watchEffect</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/* ... */</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    flush: </span><span style="color:#9ECBFF;">&quot;post&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ref, reactive, watchEffect } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#6A737D;">//用法一、</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({ foo: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">val</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">watchEffect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj.foo)</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(val.value)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">stop</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">watchEffect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/* ... */</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 手动停止依赖</span></span>
<span class="line"><span style="color:#6F42C1;">stop</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  val.value</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">  obj.foo</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">//用法二、watchEffect接受一个函数作为参数 ，可用于清除副作用</span></span>
<span class="line"><span style="color:#6F42C1;">watchEffect</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fetch</span><span style="color:#24292E;">(obj.foo);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//当 obj.foo 变化后，意味着将会再次发送请求，那么之前的请求怎么办呢？是否应该将之前的请求标记为 invalidate</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">watchEffect</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">onInvalidate</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> validate </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onInvalidate</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    validate </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fetch</span><span style="color:#24292E;">(obj.foo);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (validate) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/* 正常使用 data */</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/* 说明当前副作用已经无效了，抛弃即可 */</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#6F42C1;">watchEffect</span><span style="color:#24292E;">((</span><span style="color:#E36209;">onInvalidate</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> timer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getList</span><span style="color:#24292E;">(title.value);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 清除副作用</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onInvalidate</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">clearTimeout</span><span style="color:#24292E;">(timer);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 在组件更新后触发，这样你就可以访问更新的 DOM。</span></span>
<span class="line"><span style="color:#6A737D;">// 注意：这也将推迟副作用的初始运行，直到组件的首次渲染完成。（默认pre（更新前），post （更新后）， sync （同步，低效不建议使用））</span></span>
<span class="line"><span style="color:#6F42C1;">watchEffect</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/* ... */</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    flush: </span><span style="color:#032F62;">&quot;post&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div><h2 id="customref" tabindex="-1"><strong>customRef</strong> <a class="header-anchor" href="#customref" aria-label="Permalink to &quot;**customRef**&quot;">​</a></h2><ul><li>自定义 ref，常用来定义需要异步获取的响应式数据</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { customRef, defineComponent, ref } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// 自定义hook防抖的函数</span></span>
<span class="line"><span style="color:#6A737D;">// value传入的数据,将来数据的类型不确定,所以,用泛型,delay防抖的间隔时间.默认是200毫秒</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useDebouncedRef</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#FFAB70;">value</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">delay</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 准备一个存储定时器的id的变量</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> timeOutId</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">customRef</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">track</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">trigger</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 返回数据的</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 告诉Vue追踪数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">track</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 设置数据的</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">newValue</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">T</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 清理定时器</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">clearTimeout</span><span style="color:#E1E4E8;">(timeOutId)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 开启定时器</span></span>
<span class="line"><span style="color:#E1E4E8;">        timeOutId </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newValue</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 告诉Vue更新界面</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">trigger</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        }, delay)</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">keyword</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useDebouncedRef</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;abc&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { customRef, defineComponent, ref } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// 自定义hook防抖的函数</span></span>
<span class="line"><span style="color:#6A737D;">// value传入的数据,将来数据的类型不确定,所以,用泛型,delay防抖的间隔时间.默认是200毫秒</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useDebouncedRef</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">&gt;(</span><span style="color:#E36209;">value</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">, </span><span style="color:#E36209;">delay</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 准备一个存储定时器的id的变量</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> timeOutId</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">customRef</span><span style="color:#24292E;">((</span><span style="color:#E36209;">track</span><span style="color:#24292E;">, </span><span style="color:#E36209;">trigger</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 返回数据的</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 告诉Vue追踪数据</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">track</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> value</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 设置数据的</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#E36209;">newValue</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 清理定时器</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">clearTimeout</span><span style="color:#24292E;">(timeOutId)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 开启定时器</span></span>
<span class="line"><span style="color:#24292E;">        timeOutId </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newValue</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 告诉Vue更新界面</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">trigger</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        }, delay)</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">keyword</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useDebouncedRef</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;abc&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">500</span><span style="color:#24292E;">)</span></span></code></pre></div><h2 id="proptype" tabindex="-1"><strong>PropType</strong> <a class="header-anchor" href="#proptype" aria-label="Permalink to &quot;**PropType**&quot;">​</a></h2><ul><li>更好的推断TS类型</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//父组件</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">CompositionAPI</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">:list=&quot;[{id:1,num:2}]&quot;&gt;&lt;/CompositionAPI&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//子组件</span></span>
<span class="line"><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;"> { PropType } </span><span style="color:#B392F0;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#FDAEB7;font-style:italic;">;</span></span>
<span class="line"><span style="color:#B392F0;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">myList</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  id: number;</span></span>
<span class="line"><span style="color:#E1E4E8;">  num: number;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">defineProps({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">list:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Array</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">PropType&lt;myList[]&gt;,</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//父组件</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">CompositionAPI</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">:list=&quot;[{id:1,num:2}]&quot;&gt;&lt;/CompositionAPI&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//子组件</span></span>
<span class="line"><span style="color:#6F42C1;">import</span><span style="color:#24292E;"> { PropType } </span><span style="color:#6F42C1;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span><span style="color:#B31D28;font-style:italic;">;</span></span>
<span class="line"><span style="color:#6F42C1;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">myList</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  id: number;</span></span>
<span class="line"><span style="color:#24292E;">  num: number;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">defineProps({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">list:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Array</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">as</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">PropType&lt;myList[]&gt;,</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">});</span></span></code></pre></div><h2 id="withdefaults-defineprops-defineemits" tabindex="-1"><strong>withDefaults&amp;defineProps &amp; defineEmits</strong> <a class="header-anchor" href="#withdefaults-defineprops-defineemits" aria-label="Permalink to &quot;**withDefaults&amp;defineProps &amp; defineEmits**&quot;">​</a></h2><ul><li>在setup中直接用于接受props和emit，可做ts类型推导</li><li>withDefaults给props设置默认值</li><li>只能在<code>&lt;script setup&gt;</code>中使用</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Props</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/** banner类型 */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">type</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;1&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;2&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;3&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/** 主题颜色 */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">color</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">withDefaults</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">defineProps</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">Props</span><span style="color:#E1E4E8;">&gt;(), {</span></span>
<span class="line"><span style="color:#E1E4E8;">  type: </span><span style="color:#9ECBFF;">&#39;1&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  color: </span><span style="color:#9ECBFF;">&#39;#409eff&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Emits</span></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Emits</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  (</span><span style="color:#FFAB70;">e</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;close&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">id</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">void</span></span>
<span class="line"><span style="color:#E1E4E8;">  (</span><span style="color:#FFAB70;">e</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;show&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">age</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">void</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">emit</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineEmits</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">Emits</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;close&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;show&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;1&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//参数相同时</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">emit</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineEmits</span><span style="color:#E1E4E8;">&lt;(</span><span style="color:#FFAB70;">e</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;close&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;show&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">id</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">void</span><span style="color:#E1E4E8;">&gt;()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;close&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;show&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Props</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/** banner类型 */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">type</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;1&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;2&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;3&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/** 主题颜色 */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">color</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">withDefaults</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">defineProps</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">Props</span><span style="color:#24292E;">&gt;(), {</span></span>
<span class="line"><span style="color:#24292E;">  type: </span><span style="color:#032F62;">&#39;1&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  color: </span><span style="color:#032F62;">&#39;#409eff&#39;</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Emits</span></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Emits</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  (</span><span style="color:#E36209;">e</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;close&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">id</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">void</span></span>
<span class="line"><span style="color:#24292E;">  (</span><span style="color:#E36209;">e</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;show&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">name</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">, </span><span style="color:#E36209;">age</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">void</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">emit</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineEmits</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">Emits</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;close&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;show&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;1&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//参数相同时</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">emit</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineEmits</span><span style="color:#24292E;">&lt;(</span><span style="color:#E36209;">e</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;close&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;show&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">id</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">void</span><span style="color:#24292E;">&gt;()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;close&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;show&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span></code></pre></div><h2 id="defineasynccomponent" tabindex="-1"><strong>defineAsyncComponent</strong> <a class="header-anchor" href="#defineasynccomponent" aria-label="Permalink to &quot;**defineAsyncComponent**&quot;">​</a></h2><ul><li>用于引入一部组件</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { defineAsyncComponent } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">CompositionAPI</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineAsyncComponent</span><span style="color:#E1E4E8;">( () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./CompositionAPI.vue&#39;</span><span style="color:#E1E4E8;">) )</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { defineAsyncComponent } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">CompositionAPI</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineAsyncComponent</span><span style="color:#24292E;">( () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./CompositionAPI.vue&#39;</span><span style="color:#24292E;">) )</span></span></code></pre></div><h2 id="style-vars" tabindex="-1"><strong>style vars</strong> <a class="header-anchor" href="#style-vars" aria-label="Permalink to &quot;**style vars**&quot;">​</a></h2><ul><li>支持将组件状态驱动的 CSS 变量注入到“单个文件组件”样式中。</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;m-CompositionAPI&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;测试style vars&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">const color = &quot;#3b6af9&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;less&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">.m-CompositionAPI {</span></span>
<span class="line"><span style="color:#E1E4E8;">  .text {</span></span>
<span class="line"><span style="color:#E1E4E8;">    color: v</span><span style="color:#F97583;">-</span><span style="color:#B392F0;">bind</span><span style="color:#E1E4E8;">(color);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;m-CompositionAPI&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">&gt;测试style vars&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">const color = &quot;#3b6af9&quot;;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;less&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">.m-CompositionAPI {</span></span>
<span class="line"><span style="color:#24292E;">  .text {</span></span>
<span class="line"><span style="color:#24292E;">    color: v</span><span style="color:#D73A49;">-</span><span style="color:#6F42C1;">bind</span><span style="color:#24292E;">(color);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="provide-inject" tabindex="-1"><strong>provide &amp;&amp; inject</strong> <a class="header-anchor" href="#provide-inject" aria-label="Permalink to &quot;**provide &amp;&amp; inject**&quot;">​</a></h2><ul><li>与 Vue2中的 provide 和 inject 作用相同，只不过在Vue3中需要手动从 vue 中导入</li><li>这里简单说明一下这两个方法的作用： <ul><li>provide ：向子组件以及子孙组件传递数据。接收两个参数，第一个参数是 key，即数据的名称；第二个参数为 value，即数据的值</li><li>inject ：接收父组件或祖先组件传递过来的数据。接收一个参数 key，即父组件或祖先组件传递的数据名称</li></ul></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// A.vue</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import {provide} from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">export default {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        const obj</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            name: </span><span style="color:#9ECBFF;">&#39;前端印象&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            age: </span><span style="color:#79B8FF;">22</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 向子组件以及子孙组件传递名为info的数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">provide</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;info&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">obj</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">// B.vue</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import {inject} from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">export default {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() {   </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 接收A.vue传递过来的数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">inject</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;info&#39;</span><span style="color:#E1E4E8;">)  </span><span style="color:#6A737D;">// {name: &#39;前端印象&#39;, age: 22}</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">// C.vue</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import {inject} from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">export default {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() {   </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 接收A.vue传递过来的数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">inject</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;info&#39;</span><span style="color:#E1E4E8;">)  </span><span style="color:#6A737D;">// {name: &#39;前端印象&#39;, age: 22}</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//在ts中需要类型检查</span></span>
<span class="line"><span style="color:#6A737D;">//新建context.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { InjectionKey } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">exprot </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserInfo</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">id</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">injectKeyUser</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InjectionKey</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">UserInfo</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//parent.vue</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { provide } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { injectKeyUser } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./context&#39;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">  	</span><span style="color:#B392F0;">provide</span><span style="color:#E1E4E8;">(injectKeyUser, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  	   id: </span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">  	   name:</span><span style="color:#9ECBFF;">&#39;小燕&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  	})</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//child.vue</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { inject } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { injectKeyUser } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./context&#39;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">  	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">user</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">inject</span><span style="color:#E1E4E8;">(injectKeyUser)</span></span>
<span class="line"><span style="color:#E1E4E8;">  	</span><span style="color:#6A737D;">//UserInfo | undefined</span></span>
<span class="line"><span style="color:#E1E4E8;">  	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(user){</span></span>
<span class="line"><span style="color:#E1E4E8;">  		console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(user.name) </span><span style="color:#6A737D;">//小燕</span></span>
<span class="line"><span style="color:#E1E4E8;">  	}</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// A.vue</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">import {provide} from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#24292E;">export default {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        const obj</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            name: </span><span style="color:#032F62;">&#39;前端印象&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            age: </span><span style="color:#005CC5;">22</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 向子组件以及子孙组件传递名为info的数据</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">provide</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;info&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">obj</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">// B.vue</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">import {inject} from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#24292E;">export default {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() {   </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 接收A.vue传递过来的数据</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">inject</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;info&#39;</span><span style="color:#24292E;">)  </span><span style="color:#6A737D;">// {name: &#39;前端印象&#39;, age: 22}</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">// C.vue</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">import {inject} from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#24292E;">export default {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() {   </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 接收A.vue传递过来的数据</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">inject</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;info&#39;</span><span style="color:#24292E;">)  </span><span style="color:#6A737D;">// {name: &#39;前端印象&#39;, age: 22}</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//在ts中需要类型检查</span></span>
<span class="line"><span style="color:#6A737D;">//新建context.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { InjectionKey } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">exprot </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserInfo</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">id</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">name</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">injectKeyUser</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InjectionKey</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">UserInfo</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//parent.vue</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { provide } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { injectKeyUser } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./context&#39;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">  	</span><span style="color:#6F42C1;">provide</span><span style="color:#24292E;">(injectKeyUser, {</span></span>
<span class="line"><span style="color:#24292E;">  	   id: </span><span style="color:#005CC5;">7</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">  	   name:</span><span style="color:#032F62;">&#39;小燕&#39;</span></span>
<span class="line"><span style="color:#24292E;">  	})</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//child.vue</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { inject } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { injectKeyUser } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./context&#39;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">  	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">user</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">inject</span><span style="color:#24292E;">(injectKeyUser)</span></span>
<span class="line"><span style="color:#24292E;">  	</span><span style="color:#6A737D;">//UserInfo | undefined</span></span>
<span class="line"><span style="color:#24292E;">  	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(user){</span></span>
<span class="line"><span style="color:#24292E;">  		console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(user.name) </span><span style="color:#6A737D;">//小燕</span></span>
<span class="line"><span style="color:#24292E;">  	}</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="getcurrentinstance" tabindex="-1"><strong>getCurrentInstance</strong> <a class="header-anchor" href="#getcurrentinstance" aria-label="Permalink to &quot;**getCurrentInstance**&quot;">​</a></h2><ul><li>获取当前实例,和vue2中的this相同，用于setup函数中(不建议使用) <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e326b38df844a4f9496d009ab700bcb~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { getCurrentInstance } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">internalInstance</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getCurrentInstance</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(internalInstance);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { getCurrentInstance } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">internalInstance</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getCurrentInstance</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(internalInstance);</span></span></code></pre></div><h2 id="vue-router里的hooks" tabindex="-1"><strong>vue-router里的hooks</strong> <a class="header-anchor" href="#vue-router里的hooks" aria-label="Permalink to &quot;**vue-router里的hooks**&quot;">​</a></h2><ul><li><code>useRoute</code> ：返回当前路由地址。相当于在模板中使用 <code>$route</code></li><li><code>useRouter</code>：返回 router实例。相当于在模板中使用 <code>$router</code>。</li><li>必须在setup中使用</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useRoute, useRouter } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue-router&#39;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">route</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useRoute</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">router</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useRouter</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(route.params.id)</span></span>
<span class="line"><span style="color:#E1E4E8;">router.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/xxx/xxx&#39;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useRoute, useRouter } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue-router&#39;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">route</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useRoute</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">router</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useRouter</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(route.params.id)</span></span>
<span class="line"><span style="color:#24292E;">router.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/xxx/xxx&#39;</span><span style="color:#24292E;">)</span></span></code></pre></div><h2 id="vuex-里的-hooks" tabindex="-1"><strong>vuex 里的 hooks</strong> <a class="header-anchor" href="#vuex-里的-hooks" aria-label="Permalink to &quot;**vuex 里的 hooks**&quot;">​</a></h2><ul><li>获取 store 实例</li><li>目前vuex是4.x，官方提出了一个 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Frfcs%2Fdiscussions%2F270" title="https://github.com/vuejs/rfcs/discussions/270" target="_blank" rel="noreferrer">Vuex 5</a> 的全新提案部分灵感是借鉴于Pinia</li></ul><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9dc67ebf1b794227b59d15648a5861d6~tplv-k3u1fbpfcp-watermark.image?" alt="1642576267(1).jpg"></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useStore } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue-router&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">store</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useStore</span><span style="color:#E1E4E8;">()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useStore } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue-router&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">store</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useStore</span><span style="color:#24292E;">()</span></span></code></pre></div><h2 id="在script-setup-lang-ts-语法糖中自定义指令" tabindex="-1"><strong>在script setup lang=&quot;ts&quot;语法糖中自定义指令</strong> <a class="header-anchor" href="#在script-setup-lang-ts-语法糖中自定义指令" aria-label="Permalink to &quot;**在script setup lang=&quot;ts&quot;语法糖中自定义指令**&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//focus.ts</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> { Directive } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">focus</span><span style="color:#F97583;">:</span><span style="color:#B392F0;">Directive</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">mounted</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">el</span><span style="color:#F97583;">:</span><span style="color:#B392F0;">HTMLDivElement</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    el.</span><span style="color:#B392F0;">focus</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> focus</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import focus from &#39;@/direvtive/focus&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//focus.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> { Directive } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">focus</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;">Directive</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">mounted</span><span style="color:#24292E;">(</span><span style="color:#E36209;">el</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;">HTMLDivElement</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    el.</span><span style="color:#6F42C1;">focus</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> focus</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">import focus from &#39;@/direvtive/focus&#39;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="fragment、suspense、teleport新增组件" tabindex="-1"><strong>Fragment、Suspense、Teleport新增组件</strong> <a class="header-anchor" href="#fragment、suspense、teleport新增组件" aria-label="Permalink to &quot;**Fragment、Suspense、Teleport新增组件**&quot;">​</a></h2><ul><li>在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中好处: 减少标签层级, 减小内存占用</li><li><code>Suspense</code>组件可用于当组件引入使用时，网络不好可能会出现的延迟加载时候，跟React的Suspense组件是一样的效果只不过写的方式不一样。</li></ul><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/334e8e808b6f459a8bcd7591cae1cb7f~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><ul><li><code>Teleport</code>组件可以挂载到任意div下，不受父级影响</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//Fragment用法</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;测试1&lt;/</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;测试2&lt;/</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//Suspense用法</span></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">1.default插槽 用于成功后显示</span></span>
<span class="line"><span style="color:#6A737D;">2.fallback插槽 用于加载之前和加载失败显示</span></span>
<span class="line"><span style="color:#6A737D;">3.Suspense下的子组件setup可以使用 async</span></span>
<span class="line"><span style="color:#6A737D;">4.子组件返回一个promise</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">Suspense</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">#default&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">&lt;div</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">:key=&quot;1&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">click</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">here</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;template</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">#fallback&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">&lt;h1&gt;Waiting</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">for</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">data&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/Suspense&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法Teleport</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;Teleport</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">to</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;#app&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    /* ... */</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#79B8FF;">Teleport</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//Fragment用法</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;测试1&lt;/</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;测试2&lt;/</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//Suspense用法</span></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">1.default插槽 用于成功后显示</span></span>
<span class="line"><span style="color:#6A737D;">2.fallback插槽 用于加载之前和加载失败显示</span></span>
<span class="line"><span style="color:#6A737D;">3.Suspense下的子组件setup可以使用 async</span></span>
<span class="line"><span style="color:#6A737D;">4.子组件返回一个promise</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">Suspense</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">#default&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">&lt;div</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">:key=&quot;1&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">click</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">here</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;template</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">#fallback&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">&lt;h1&gt;Waiting</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">for</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">data&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/Suspense&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//用法Teleport</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;Teleport</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">to</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;#app&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    /* ... */</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#005CC5;">Teleport</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="注册store仓库" tabindex="-1"><strong>注册store仓库</strong> <a class="header-anchor" href="#注册store仓库" aria-label="Permalink to &quot;**注册store仓库**&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 创建自己的store</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { InjectionKey, App, inject } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyState</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">id</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">myStateKey</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InjectionKey</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">MyState</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Symbol</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createMyStore</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">state</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">app</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      app.</span><span style="color:#B392F0;">provide</span><span style="color:#E1E4E8;">(myStateKey, state)</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useMyStore</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">inject</span><span style="color:#E1E4E8;">(myStateKey)</span><span style="color:#F97583;">!</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 用法</span></span>
<span class="line"><span style="color:#6A737D;">// main.js  const App = createApp(App) app.use(createMyStore())</span></span>
<span class="line"><span style="color:#6A737D;">// 任意页面  const state = useMyStore()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 创建自己的store</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { InjectionKey, App, inject } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyState</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">id</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">myStateKey</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InjectionKey</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">MyState</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Symbol</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createMyStore</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">state</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">install</span><span style="color:#24292E;">(</span><span style="color:#E36209;">app</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      app.</span><span style="color:#6F42C1;">provide</span><span style="color:#24292E;">(myStateKey, state)</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useMyStore</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">inject</span><span style="color:#24292E;">(myStateKey)</span><span style="color:#D73A49;">!</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 用法</span></span>
<span class="line"><span style="color:#6A737D;">// main.js  const App = createApp(App) app.use(createMyStore())</span></span>
<span class="line"><span style="color:#6A737D;">// 任意页面  const state = useMyStore()</span></span></code></pre></div><h2 id="defineexpose" tabindex="-1"><strong>defineExpose</strong> <a class="header-anchor" href="#defineexpose" aria-label="Permalink to &quot;**defineExpose**&quot;">​</a></h2><ul><li>使用 script setup 的组件是默认关闭的，也即通过模板 ref 或者 $parent 链获取到的组件的公开实例比如你需要 通过ref拿到子组件的方法，则需要通过 defineExpose将方法暴露出来。</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import { ref } from &#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">const a = 1</span></span>
<span class="line"><span style="color:#E1E4E8;">const b = ref(2)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">defineExpose({</span></span>
<span class="line"><span style="color:#E1E4E8;">  a,</span></span>
<span class="line"><span style="color:#E1E4E8;">  b</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">import { ref } from &#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">const a = 1</span></span>
<span class="line"><span style="color:#24292E;">const b = ref(2)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">defineExpose({</span></span>
<span class="line"><span style="color:#24292E;">  a,</span></span>
<span class="line"><span style="color:#24292E;">  b</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="useslots和-useattr" tabindex="-1"><strong>useSlots和 useAttr</strong> <a class="header-anchor" href="#useslots和-useattr" aria-label="Permalink to &quot;**useSlots和 useAttr**&quot;">​</a></h2><ul><li>分别可以访问到<code>$slots</code>和<code>$attrs</code></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">lang</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">// 可以访问到$slots和$attrs</span></span>
<span class="line"><span style="color:#E1E4E8;">import { useSlots, useAttrs } from &#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">const slots = useSlots()</span></span>
<span class="line"><span style="color:#E1E4E8;">const attrs = useAttrs()</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">lang</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;ts&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">// 可以访问到$slots和$attrs</span></span>
<span class="line"><span style="color:#24292E;">import { useSlots, useAttrs } from &#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">const slots = useSlots()</span></span>
<span class="line"><span style="color:#24292E;">const attrs = useAttrs()</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="拓展" tabindex="-1"><strong>拓展</strong> <a class="header-anchor" href="#拓展" aria-label="Permalink to &quot;**拓展**&quot;">​</a></h2><ul><li><a href="https://v3.cn.vuejs.org/guide/introduction.html#vue-js-%E6%98%AF%E4%BB%80%E4%B9%88" target="_blank" rel="noreferrer">Vue3</a></li></ul>`,104),t=[e];function c(E,y,i,F,u,d){return n(),a("div",null,t)}const r=s(o,[["render",c]]),D=Object.freeze(Object.defineProperty({__proto__:null,__pageData:p,default:r},Symbol.toStringTag,{value:"Module"}));export{D as _,p as __pageData,r as default};
