import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.12b7deed.js";const p=JSON.parse('{"title":"Vue源码探秘之数据响应式原理","description":"","frontmatter":{"title":"Vue源码探秘之数据响应式原理","head":[["meta",{"name":"og:title","content":"Vue源码探秘之数据响应式原理 | VitePress"}]]},"headers":[],"relativePath":"vue2/responsive.md","filePath":"vue2/responsive.md","lastUpdated":1698918793000}'),o={name:"vue2/responsive.md"},e=l(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>每当有人问起。你知道vue的数据响应式原理嘛？你就会说我知道，是通过Object.definePrototype对数据进行监听，通过get去获取数据读取，set去劫持数据的变化起到一个监听的效果，最后通知 watcher重新计算，从而致使它关联的组件得以更新。</p><p>漂亮，我以为能答的很完美了，内心总是以为能过了这次。这种全国人民都知道的答案显然不能让你脱颖而出的</p><p>今天为了能让脱颖而出，决定手写数据响应式原理吧</p><h2 id="了解mvvm是啥" tabindex="-1">了解MVVM是啥 <a class="header-anchor" href="#了解mvvm是啥" aria-label="Permalink to &quot;了解MVVM是啥&quot;">​</a></h2><p><strong>MVVM</strong>是<code>Model-View-ViewModel</code>缩写，也就是把<code>MVC</code>中的<code>Controller</code>演变成<code>ViewModel。Model</code>层代表数据模型，<code>View</code>代表UI组件，<code>ViewModel</code>是<code>View</code>和<code>Model</code>层的桥梁，数据会绑定到<code>viewModel</code>层并自动将数据渲染到页面中，视图变化的时候会通知<code>viewModel</code>层更新数据。</p><p>为了实现这种功能，尤小右找到了<strong>上帝的钥匙</strong></p><h2 id="object-defineproperty-方法" tabindex="-1">Object.defineProperty()方法 <a class="header-anchor" href="#object-defineproperty-方法" aria-label="Permalink to &quot;Object.defineProperty()方法&quot;">​</a></h2><p>作用：在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。</p><h3 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h3><p>语法：<code>Object.defineProperty(obj, prop, descriptor)</code></p><p>参数：</p><ol><li>要添加属性的对象</li><li>要定义或修改的属性的名称或 [<code>Symbol</code>]</li><li>要定义或修改的属性描述符</li></ol><p>看一个简单的例子</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> person </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> personName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;lihua&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//在person对象上添加属性namep,值为personName</span></span>
<span class="line"><span style="color:#E1E4E8;">Object.</span><span style="color:#B392F0;">defineProperty</span><span style="color:#E1E4E8;">(person, </span><span style="color:#9ECBFF;">&#39;namep&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//但是默认是不可枚举的(for in打印打印不出来)，可：enumerable: true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//默认不可以修改，可：wirtable：true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//默认不可以删除，可：configurable：true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;触发了get方法&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> personName</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">val</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;触发了set方法&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        personName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> val</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//当读取person对象的namp属性时，触发get方法</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(person.namep)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//当修改personName时，重新访问person.namep发现修改成功</span></span>
<span class="line"><span style="color:#E1E4E8;">personName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;liming&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(person.namep)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 对person.namep进行修改，触发set方法</span></span>
<span class="line"><span style="color:#E1E4E8;">person.namep </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;huahua&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(person.namep)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> person </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> personName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;lihua&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//在person对象上添加属性namep,值为personName</span></span>
<span class="line"><span style="color:#24292E;">Object.</span><span style="color:#6F42C1;">defineProperty</span><span style="color:#24292E;">(person, </span><span style="color:#032F62;">&#39;namep&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//但是默认是不可枚举的(for in打印打印不出来)，可：enumerable: true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//默认不可以修改，可：wirtable：true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//默认不可以删除，可：configurable：true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;触发了get方法&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> personName</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">val</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;触发了set方法&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        personName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> val</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//当读取person对象的namp属性时，触发get方法</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(person.namep)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//当修改personName时，重新访问person.namep发现修改成功</span></span>
<span class="line"><span style="color:#24292E;">personName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;liming&#39;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(person.namep)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 对person.namep进行修改，触发set方法</span></span>
<span class="line"><span style="color:#24292E;">person.namep </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;huahua&#39;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(person.namep)</span></span></code></pre></div><p>更多详细内容，可以去看这篇文章<a href="https://www.jianshu.com/p/8fe1382ba135" target="_blank" rel="noreferrer">深入浅出Object.defineProperty()</a></p><p>这里就不做详细的讲解了。</p><h2 id="基本思路" tabindex="-1">基本思路 <a class="header-anchor" href="#基本思路" aria-label="Permalink to &quot;基本思路&quot;">​</a></h2><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ffdbe9e7d6d4a72a713d405b9eb2823~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> 这是vue2官网的一张图</p><p>DOM树被“Touch” 然后getter告诉Watcher去收集depend依赖，通过setter去notify通知Watcher，Watcher再去通过虚拟DOm和diff算法，最后渲染上树，大致就是这样的一个流程。</p><h2 id="创建项目" tabindex="-1">创建项目 <a class="header-anchor" href="#创建项目" aria-label="Permalink to &quot;创建项目&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">npm i </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">D</span><span style="color:#E1E4E8;"> webpack@</span><span style="color:#79B8FF;">5.11</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> webpack</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">cli@</span><span style="color:#79B8FF;">3.3</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;"> webpack</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">dev</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">server@</span><span style="color:#79B8FF;">3.11</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">npm i </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">D</span><span style="color:#24292E;"> webpack@</span><span style="color:#005CC5;">5.11</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> webpack</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">cli@</span><span style="color:#005CC5;">3.3</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">12</span><span style="color:#24292E;"> webpack</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">dev</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">server@</span><span style="color:#005CC5;">3.11</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//webpack.config.js</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;path&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    entry:</span><span style="color:#9ECBFF;">&quot;./src/index.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    output:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        publicPath:</span><span style="color:#9ECBFF;">&quot;zxx&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        filename:</span><span style="color:#9ECBFF;">&quot;bundle.js&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    devServer:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        port:</span><span style="color:#79B8FF;">8080</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        contentBase:</span><span style="color:#9ECBFF;">&quot;www&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//webpack.config.js</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;path&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    entry:</span><span style="color:#032F62;">&quot;./src/index.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    output:{</span></span>
<span class="line"><span style="color:#24292E;">        publicPath:</span><span style="color:#032F62;">&quot;zxx&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        filename:</span><span style="color:#032F62;">&quot;bundle.js&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    devServer:{</span></span>
<span class="line"><span style="color:#24292E;">        port:</span><span style="color:#005CC5;">8080</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        contentBase:</span><span style="color:#032F62;">&quot;www&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="index-js入口文件" tabindex="-1">index.js入口文件 <a class="header-anchor" href="#index-js入口文件" aria-label="Permalink to &quot;index.js入口文件&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> observe </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./observe.js&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Watcher </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./Watcher.js&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> obj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    a: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        m: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            n: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    b: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    c: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        d: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            e: {</span></span>
<span class="line"><span style="color:#E1E4E8;">                f: </span><span style="color:#79B8FF;">6666</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    g: [</span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">33</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">44</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">55</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">observe</span><span style="color:#E1E4E8;">(obj);</span></span>
<span class="line"><span style="color:#6A737D;">// new Watcher(obj, &#39;a.m.n&#39;, (val) =&gt; {</span></span>
<span class="line"><span style="color:#6A737D;">//     console.log(&#39;★我是watcher，我在监控a.m.n&#39;, val);</span></span>
<span class="line"><span style="color:#6A737D;">// });</span></span>
<span class="line"><span style="color:#6A737D;">// obj.a.m.n = 88;</span></span>
<span class="line"><span style="color:#E1E4E8;">obj.g.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">66</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> observe </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./observe.js&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Watcher </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./Watcher.js&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> obj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    a: {</span></span>
<span class="line"><span style="color:#24292E;">        m: {</span></span>
<span class="line"><span style="color:#24292E;">            n: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    b: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    c: {</span></span>
<span class="line"><span style="color:#24292E;">        d: {</span></span>
<span class="line"><span style="color:#24292E;">            e: {</span></span>
<span class="line"><span style="color:#24292E;">                f: </span><span style="color:#005CC5;">6666</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    g: [</span><span style="color:#005CC5;">22</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">33</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">44</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">55</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">observe</span><span style="color:#24292E;">(obj);</span></span>
<span class="line"><span style="color:#6A737D;">// new Watcher(obj, &#39;a.m.n&#39;, (val) =&gt; {</span></span>
<span class="line"><span style="color:#6A737D;">//     console.log(&#39;★我是watcher，我在监控a.m.n&#39;, val);</span></span>
<span class="line"><span style="color:#6A737D;">// });</span></span>
<span class="line"><span style="color:#6A737D;">// obj.a.m.n = 88;</span></span>
<span class="line"><span style="color:#24292E;">obj.g.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">66</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj);</span></span></code></pre></div><h2 id="observe-js" tabindex="-1">observe.js <a class="header-anchor" href="#observe-js" aria-label="Permalink to &quot;observe.js&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Observer </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./Observer.js&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果value不是对象，什么都不做</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> value </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;object&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 定义ob</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> ob;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> value.__ob__ </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;undefined&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ob </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> value.__ob__;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ob </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Observer</span><span style="color:#E1E4E8;">(value);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ob;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Observer </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./Observer.js&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果value不是对象，什么都不做</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> value </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;object&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 定义ob</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> ob;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> value.__ob__ </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;undefined&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        ob </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> value.__ob__;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        ob </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Observer</span><span style="color:#24292E;">(value);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ob;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="utils-js" tabindex="-1">utils.js <a class="header-anchor" href="#utils-js" aria-label="Permalink to &quot;utils.js&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">obj</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">enumerable</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Object.</span><span style="color:#B392F0;">defineProperty</span><span style="color:#E1E4E8;">(obj, key, {</span></span>
<span class="line"><span style="color:#E1E4E8;">        value,</span></span>
<span class="line"><span style="color:#E1E4E8;">        enumerable,</span></span>
<span class="line"><span style="color:#E1E4E8;">        writable: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        configurable: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">def</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">obj</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#E36209;">value</span><span style="color:#24292E;">, </span><span style="color:#E36209;">enumerable</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    Object.</span><span style="color:#6F42C1;">defineProperty</span><span style="color:#24292E;">(obj, key, {</span></span>
<span class="line"><span style="color:#24292E;">        value,</span></span>
<span class="line"><span style="color:#24292E;">        enumerable,</span></span>
<span class="line"><span style="color:#24292E;">        writable: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        configurable: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="observer-js" tabindex="-1">Observer.js <a class="header-anchor" href="#observer-js" aria-label="Permalink to &quot;Observer.js&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { def } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./utils.js&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> defineReactive </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./defineReactive.js&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { arrayMethods } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./array.js&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> observe </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./observe.js&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Dep </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./Dep.js&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Observer</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 每一个Observer的实例身上，都有一个dep</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.dep </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Dep</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 给实例（this，一定要注意，构造函数中的this不是表示类本身，而是表示实例）添加了__ob__属性，值是这次new的实例</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">def</span><span style="color:#E1E4E8;">(value, </span><span style="color:#9ECBFF;">&#39;__ob__&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// console.log(&#39;我是Observer构造器&#39;, value);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 不要忘记初心，Observer类的目的是：将一个正常的object转换为每个层级的属性都是响应式（可以被侦测的）的object</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 检查它是数组还是对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (Array.</span><span style="color:#B392F0;">isArray</span><span style="color:#E1E4E8;">(value)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 如果是数组，要非常强行的蛮干：将这个数组的原型，指向arrayMethods</span></span>
<span class="line"><span style="color:#E1E4E8;">            Object.</span><span style="color:#B392F0;">setPrototypeOf</span><span style="color:#E1E4E8;">(value, arrayMethods);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 让这个数组变的observe</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">observeArray</span><span style="color:#E1E4E8;">(value);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">(value);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 遍历</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> k </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> value) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">defineReactive</span><span style="color:#E1E4E8;">(value, k);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 数组的特殊遍历</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">observeArray</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, l </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> l; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 逐项进行observe</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">observe</span><span style="color:#E1E4E8;">(arr[i]);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { def } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./utils.js&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> defineReactive </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./defineReactive.js&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { arrayMethods } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./array.js&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> observe </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./observe.js&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Dep </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./Dep.js&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Observer</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 每一个Observer的实例身上，都有一个dep</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.dep </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Dep</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 给实例（this，一定要注意，构造函数中的this不是表示类本身，而是表示实例）添加了__ob__属性，值是这次new的实例</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">def</span><span style="color:#24292E;">(value, </span><span style="color:#032F62;">&#39;__ob__&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// console.log(&#39;我是Observer构造器&#39;, value);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 不要忘记初心，Observer类的目的是：将一个正常的object转换为每个层级的属性都是响应式（可以被侦测的）的object</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 检查它是数组还是对象</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (Array.</span><span style="color:#6F42C1;">isArray</span><span style="color:#24292E;">(value)) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 如果是数组，要非常强行的蛮干：将这个数组的原型，指向arrayMethods</span></span>
<span class="line"><span style="color:#24292E;">            Object.</span><span style="color:#6F42C1;">setPrototypeOf</span><span style="color:#24292E;">(value, arrayMethods);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 让这个数组变的observe</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">observeArray</span><span style="color:#24292E;">(value);</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">(value);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 遍历</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">(</span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> k </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> value) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">defineReactive</span><span style="color:#24292E;">(value, k);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 数组的特殊遍历</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">observeArray</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, l </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> l; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 逐项进行observe</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">observe</span><span style="color:#24292E;">(arr[i]);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>这个需要去遍历对象中全部的属性添加上<code>__ob__</code>属性 基本思路如下图：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4260267e1c164250ab4e5a1db1331ce4~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="definereactive-js" tabindex="-1">defineReactive.js <a class="header-anchor" href="#definereactive-js" aria-label="Permalink to &quot;defineReactive.js&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> observe </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./observe.js&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Dep </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./Dep.js&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineReactive</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">val</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dep</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Dep</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// console.log(&#39;我是defineReactive&#39;, key);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        val </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> data[key];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 子元素要进行observe，至此形成了递归。这个递归不是函数自己调用自己，而是多个函数、类循环调用</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> childOb </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">observe</span><span style="color:#E1E4E8;">(val);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    Object.</span><span style="color:#B392F0;">defineProperty</span><span style="color:#E1E4E8;">(data, key, {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 可枚举</span></span>
<span class="line"><span style="color:#E1E4E8;">        enumerable: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 可以被配置，比如可以被delete</span></span>
<span class="line"><span style="color:#E1E4E8;">        configurable: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// getter</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;你试图访问&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> key </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;属性&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 如果现在处于依赖收集阶段</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (Dep.target) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                dep.</span><span style="color:#B392F0;">depend</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (childOb) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    childOb.dep.</span><span style="color:#B392F0;">depend</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> val;</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// setter</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">newValue</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;你试图改变&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> key </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;属性&#39;</span><span style="color:#E1E4E8;">, newValue);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (val </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> newValue) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            val </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newValue;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 当设置了新值，这个新值也要被observe</span></span>
<span class="line"><span style="color:#E1E4E8;">            childOb </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">observe</span><span style="color:#E1E4E8;">(newValue);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 发布订阅模式，通知dep</span></span>
<span class="line"><span style="color:#E1E4E8;">            dep.</span><span style="color:#B392F0;">notify</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> observe </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./observe.js&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Dep </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./Dep.js&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineReactive</span><span style="color:#24292E;">(</span><span style="color:#E36209;">data</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#E36209;">val</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">dep</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Dep</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// console.log(&#39;我是defineReactive&#39;, key);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        val </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> data[key];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 子元素要进行observe，至此形成了递归。这个递归不是函数自己调用自己，而是多个函数、类循环调用</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> childOb </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">observe</span><span style="color:#24292E;">(val);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    Object.</span><span style="color:#6F42C1;">defineProperty</span><span style="color:#24292E;">(data, key, {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 可枚举</span></span>
<span class="line"><span style="color:#24292E;">        enumerable: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 可以被配置，比如可以被delete</span></span>
<span class="line"><span style="color:#24292E;">        configurable: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// getter</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;你试图访问&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> key </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;属性&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 如果现在处于依赖收集阶段</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (Dep.target) {</span></span>
<span class="line"><span style="color:#24292E;">                dep.</span><span style="color:#6F42C1;">depend</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (childOb) {</span></span>
<span class="line"><span style="color:#24292E;">                    childOb.dep.</span><span style="color:#6F42C1;">depend</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> val;</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// setter</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#E36209;">newValue</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;你试图改变&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> key </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;属性&#39;</span><span style="color:#24292E;">, newValue);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (val </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> newValue) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            val </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newValue;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 当设置了新值，这个新值也要被observe</span></span>
<span class="line"><span style="color:#24292E;">            childOb </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">observe</span><span style="color:#24292E;">(newValue);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 发布订阅模式，通知dep</span></span>
<span class="line"><span style="color:#24292E;">            dep.</span><span style="color:#6F42C1;">notify</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="array-js" tabindex="-1">array.js <a class="header-anchor" href="#array-js" aria-label="Permalink to &quot;array.js&quot;">​</a></h2><p>在vue中是对以下数组中的七种方法改写：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ca76fe66bf54a41a091f1e22ec2db0b~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> 那我们改写的时候，大概思路就是：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3509fb28ab764399872a6145bf94f374~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { def } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./utils.js&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 得到Array.prototype</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">arrayPrototype</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Array</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 以Array.prototype为原型创建arrayMethods对象，并暴露</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">arrayMethods</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Object.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(arrayPrototype);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 要被改写的7个数组方法</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">methodsNeedChange</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;push&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;pop&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;shift&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;unshift&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;splice&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;sort&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;reverse&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">methodsNeedChange.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">methodName</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 备份原来的方法，因为push、pop等7个函数的功能不能被剥夺</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">original</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arrayPrototype[methodName];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 定义新的方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">def</span><span style="color:#E1E4E8;">(arrayMethods, methodName, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 恢复原来的功能</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">result</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> original.</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 把类数组对象变为数组</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">args</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#F97583;">...</span><span style="color:#79B8FF;">arguments</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 把这个数组身上的__ob__取出来，__ob__已经被添加了，为什么已经被添加了？因为数组肯定不是最高层，比如obj.g属性是数组，obj不能是数组，第一次遍历obj这个对象的第一层的时候，已经给g属性（就是这个数组）添加了__ob__属性。</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ob</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.__ob__;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 有三种方法push\\unshift\\splice能够插入新项，现在要把插入的新项也要变为observe的</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> inserted </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;"> (methodName) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;push&#39;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;unshift&#39;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                inserted </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> args;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;splice&#39;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// splice格式是splice(下标, 数量, 插入的新项)</span></span>
<span class="line"><span style="color:#E1E4E8;">                inserted </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> args.</span><span style="color:#B392F0;">splice</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 判断有没有要插入的新项，让新项也变为响应的</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (inserted) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            ob.</span><span style="color:#B392F0;">observeArray</span><span style="color:#E1E4E8;">(inserted);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;啦啦啦&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        ob.dep.</span><span style="color:#B392F0;">notify</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { def } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./utils.js&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 得到Array.prototype</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">arrayPrototype</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Array</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 以Array.prototype为原型创建arrayMethods对象，并暴露</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">arrayMethods</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Object.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(arrayPrototype);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 要被改写的7个数组方法</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">methodsNeedChange</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;push&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;pop&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;shift&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;unshift&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;splice&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;sort&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;reverse&#39;</span></span>
<span class="line"><span style="color:#24292E;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">methodsNeedChange.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#E36209;">methodName</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 备份原来的方法，因为push、pop等7个函数的功能不能被剥夺</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">original</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arrayPrototype[methodName];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 定义新的方法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">def</span><span style="color:#24292E;">(arrayMethods, methodName, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 恢复原来的功能</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">result</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> original.</span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 把类数组对象变为数组</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">args</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#D73A49;">...</span><span style="color:#005CC5;">arguments</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 把这个数组身上的__ob__取出来，__ob__已经被添加了，为什么已经被添加了？因为数组肯定不是最高层，比如obj.g属性是数组，obj不能是数组，第一次遍历obj这个对象的第一层的时候，已经给g属性（就是这个数组）添加了__ob__属性。</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ob</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.__ob__;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 有三种方法push\\unshift\\splice能够插入新项，现在要把插入的新项也要变为observe的</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> inserted </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">switch</span><span style="color:#24292E;"> (methodName) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;push&#39;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;unshift&#39;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                inserted </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> args;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;splice&#39;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// splice格式是splice(下标, 数量, 插入的新项)</span></span>
<span class="line"><span style="color:#24292E;">                inserted </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> args.</span><span style="color:#6F42C1;">splice</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 判断有没有要插入的新项，让新项也变为响应的</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (inserted) {</span></span>
<span class="line"><span style="color:#24292E;">            ob.</span><span style="color:#6F42C1;">observeArray</span><span style="color:#24292E;">(inserted);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;啦啦啦&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        ob.dep.</span><span style="color:#6F42C1;">notify</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">    }, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><h2 id="依赖收集" tabindex="-1">依赖收集 <a class="header-anchor" href="#依赖收集" aria-label="Permalink to &quot;依赖收集&quot;">​</a></h2><ul><li>把依赖收集的代码封装成一个Dep类，它专门用来管理依赖，<strong>每个Observer的实例，成员中都有一个Dep的实例</strong>；</li><li>Watcher是一个中介，数据发生变化时通过Watcher中转，通知组件；</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adb0d08efb9c4971a8c32bf7702fa920~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><ul><li>依赖就是Watcher。只有Watcher触发的getter才会收集依赖，哪个Watcher触发了getter，就把哪个Watcher收集到Dep中。</li><li>Dep使用发布订阅模式，当数据发生变化时，会循环依赖列表，把所有的Watcher都通知一遍。</li><li>代码实现的巧妙之处：Watcher把自己设置到全局的一个指定位置，然后读取数据，因为读取了数据，所以会触发这个数据的getter。在getter中就能得到当前正在读取数据的Watcher，并把这个Watcher收集到Dep中。</li></ul><p>思路图 <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3639c3a72f4e4ebd9d6a4f4071bccffa~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="dep-js" tabindex="-1">Dep.js <a class="header-anchor" href="#dep-js" aria-label="Permalink to &quot;Dep.js&quot;">​</a></h2><p>Dep就是一个简单的订阅发布模式</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> uid </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Dep</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;我是DEP类的构造器&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> uid</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 用数组存储自己的订阅者。subs是英语subscribes订阅者的意思。</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 这个数组里面放的是Watcher的实例</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.subs </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 添加订阅</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">addSub</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">sub</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.subs.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(sub);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 添加依赖</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">depend</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Dep.target就是一个我们自己指定的全局的位置，你用window.target也行，只要是全剧唯一，没有歧义就行</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (Dep.target) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">addSub</span><span style="color:#E1E4E8;">(Dep.target);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 通知更新</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">notify</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;我是notify&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 浅克隆一份</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">subs</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.subs.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 遍历</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, l </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> subs.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> l; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            subs[i].</span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> uid </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Dep</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;我是DEP类的构造器&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> uid</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 用数组存储自己的订阅者。subs是英语subscribes订阅者的意思。</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 这个数组里面放的是Watcher的实例</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.subs </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 添加订阅</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">addSub</span><span style="color:#24292E;">(</span><span style="color:#E36209;">sub</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.subs.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(sub);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 添加依赖</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">depend</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Dep.target就是一个我们自己指定的全局的位置，你用window.target也行，只要是全剧唯一，没有歧义就行</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (Dep.target) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">addSub</span><span style="color:#24292E;">(Dep.target);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 通知更新</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">notify</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;我是notify&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 浅克隆一份</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">subs</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.subs.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 遍历</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, l </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> subs.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> l; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            subs[i].</span><span style="color:#6F42C1;">update</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="watcher-js" tabindex="-1">Watcher.js <a class="header-anchor" href="#watcher-js" aria-label="Permalink to &quot;Watcher.js&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Dep </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./Dep&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> uid </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Watcher</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">expression</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">callback</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;我是Watcher类的构造器&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> uid</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.target </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> target;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.getter </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parsePath</span><span style="color:#E1E4E8;">(expression);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.callback </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> callback;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 进入依赖收集阶段。让全局的Dep.target设置为Watcher本身，那么就是进入依赖收集阶段</span></span>
<span class="line"><span style="color:#E1E4E8;">        Dep.target </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.target;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> value;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 只要能找，就一直找</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">getter</span><span style="color:#E1E4E8;">(obj);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            Dep.target </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> value;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">getAndInvoke</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.callback);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">getAndInvoke</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">cb</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (value </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.value </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> value </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;object&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">oldValue</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.value;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> value;</span></span>
<span class="line"><span style="color:#E1E4E8;">            cb.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.target, value, oldValue);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parsePath</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">str</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> segments </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> str.</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;.&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">obj</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> segments.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">obj) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            obj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj[segments[i]]</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> obj;</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Dep </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./Dep&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> uid </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Watcher</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">expression</span><span style="color:#24292E;">, </span><span style="color:#E36209;">callback</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;我是Watcher类的构造器&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> uid</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.target </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> target;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.getter </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parsePath</span><span style="color:#24292E;">(expression);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.callback </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> callback;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">update</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 进入依赖收集阶段。让全局的Dep.target设置为Watcher本身，那么就是进入依赖收集阶段</span></span>
<span class="line"><span style="color:#24292E;">        Dep.target </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.target;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> value;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 只要能找，就一直找</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">getter</span><span style="color:#24292E;">(obj);</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            Dep.target </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> value;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">getAndInvoke</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.callback);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">getAndInvoke</span><span style="color:#24292E;">(</span><span style="color:#E36209;">cb</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (value </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.value </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> value </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;object&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">oldValue</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.value;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> value;</span></span>
<span class="line"><span style="color:#24292E;">            cb.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.target, value, oldValue);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parsePath</span><span style="color:#24292E;">(</span><span style="color:#E36209;">str</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> segments </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> str.</span><span style="color:#6F42C1;">split</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;.&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">obj</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> segments.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">obj) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            obj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj[segments[i]]</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> obj;</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>内容是自己跟着学习，然后自己手写的，学习是真的</p>`,52),c=[e];function t(E,y,i,F,d,u){return n(),a("div",null,c)}const r=s(o,[["render",t]]),D=Object.freeze(Object.defineProperty({__proto__:null,__pageData:p,default:r},Symbol.toStringTag,{value:"Module"}));export{D as _,p as __pageData,r as default};
