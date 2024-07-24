import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.12b7deed.js";const l=JSON.parse('{"title":"ES6的解构赋值、Object.assign、[].concat它们是深拷贝还是浅拷贝？","description":"","frontmatter":{"title":"ES6的解构赋值、Object.assign、[].concat它们是深拷贝还是浅拷贝？","head":[["meta",{"name":"og:title","content":"ES6的解构赋值、Object.assign、[].concat它们是深拷贝还是浅拷贝？ | VitePress"}]]},"headers":[],"relativePath":"javaScript/clone.md","filePath":"javaScript/clone.md","lastUpdated":1698918793000}'),o={name:"javaScript/clone.md"},e=p(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>在开发项目的时候，发现用ES6的解构赋值和[].contant对数组进行新的赋值时，发现还是会影响到旧数组的数据。无奈之下，最后用了JSON.parse(JSON.stringify(obj))进行深拷贝。</p><p>先认识一下深拷贝和浅拷贝的定义</p><blockquote><p>深拷贝：修改新变量的值不会影响原有变量的值。默认情况下基本数据类型（number，string，null，undefined，boolean）都是深拷贝。</p></blockquote><blockquote><p>浅拷贝：修改新变量的值会影响原有的变量的值。默认情况下引用类型（object）都是浅拷贝。</p></blockquote><p>对深拷贝和浅拷贝有了简单的认识了，下面我们开始今天的旅程吧。</p><h2 id="es6的解构赋值" tabindex="-1">ES6的解构赋值 <a class="header-anchor" href="#es6的解构赋值" aria-label="Permalink to &quot;ES6的解构赋值&quot;">​</a></h2><p>下面开看一个简单的例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> obj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;张三&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">18</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> obj1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">obj}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">obj1.age </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">20</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj,obj1)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> obj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;张三&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">18</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> obj1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">obj}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">obj1.age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj,obj1)</span></span></code></pre></div><p>打印结果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a296efebb2e843f4accede409a1027cb~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>很多伙伴就会说，这是深拷贝啊</p><p>那我们再看看一个例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> obj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;张三&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">18</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    info: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        company: </span><span style="color:#9ECBFF;">&quot;周星星公司&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> obj1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">obj</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">obj1.info.company </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;朱茵公司&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj, obj1)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> obj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;张三&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">18</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    info: {</span></span>
<span class="line"><span style="color:#24292E;">        company: </span><span style="color:#032F62;">&quot;周星星公司&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> obj1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">obj</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">obj1.info.company </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;朱茵公司&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj, obj1)</span></span></code></pre></div><p>打印结果：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6fcef7f7bbe4d929a836a36510d1c18~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>是不是很意外，是不是很惊喜。这是为什么，这不是深拷贝吗？why？</p><p>发现解构赋值出来的对象将原对象obj中的company的数据修改了，这样看还是浅拷贝。</p><h2 id="object-assign" tabindex="-1">Object.assign <a class="header-anchor" href="#object-assign" aria-label="Permalink to &quot;Object.assign&quot;">​</a></h2><p>这个之前有个伙伴跟我跟，他可以深拷贝和浅拷贝，我之前以为一直都是浅拷贝而已。</p><p>只要这样就可以进行深拷贝了：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Object.</span><span style="color:#B392F0;">assign</span><span style="color:#E1E4E8;">({},obj)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Object.</span><span style="color:#6F42C1;">assign</span><span style="color:#24292E;">({},obj)</span></span></code></pre></div><p>确实这样能达到深拷贝，可以看下面一个例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> obj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;周星星&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">18</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> obj1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Object.</span><span style="color:#B392F0;">assign</span><span style="color:#E1E4E8;">({},obj)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">obj1.age </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">20</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj, obj1)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> obj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;周星星&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">18</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> obj1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Object.</span><span style="color:#6F42C1;">assign</span><span style="color:#24292E;">({},obj)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">obj1.age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj, obj1)</span></span></code></pre></div><p>打印结果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b97eec877404f29a24aff114ba8c2fc~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>这是为什么呢，因为我们重新定义了一个空对象<code>{}</code>,在空数组里面添加新的属性，因为Object.assign中前对象会被后对象的值所覆盖。确实让我认识到了一个新写法。</p><p>但是，我们再看看这个例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> obj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;周星星&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">18</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    info:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        company:</span><span style="color:#9ECBFF;">&quot;周星星的公司&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> obj1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Object.</span><span style="color:#B392F0;">assign</span><span style="color:#E1E4E8;">({},obj)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">obj1.info.company </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;朱茵的公司&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(obj, obj1)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> obj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;周星星&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">18</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    info:{</span></span>
<span class="line"><span style="color:#24292E;">        company:</span><span style="color:#032F62;">&quot;周星星的公司&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> obj1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Object.</span><span style="color:#6F42C1;">assign</span><span style="color:#24292E;">({},obj)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">obj1.info.company </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;朱茵的公司&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(obj, obj1)</span></span></code></pre></div><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8e5f2f0bba74d0bb78ac7ffd5396188~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>惊喜总是那么的意外啊。依旧是<code>company</code>修改了，合着旧数据一起被改掉了，还是浅拷贝。</p><h2 id="concat" tabindex="-1">[].concat <a class="header-anchor" href="#concat" aria-label="Permalink to &quot;[].concat&quot;">​</a></h2><p>依旧我们先来个例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> list1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [].</span><span style="color:#B392F0;">concat</span><span style="color:#E1E4E8;">(list)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">list1[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(list, list1)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> list1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [].</span><span style="color:#6F42C1;">concat</span><span style="color:#24292E;">(list)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">list1[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(list, list1)</span></span></code></pre></div><p>打印结果：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afe5c44e8f5840409c84c8602385469e~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> 有人看到这个第一眼也会说，这是个深拷贝，这可以解决问题，那我就用这个吧</p><p>那我们再来看看这个例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [{</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;周星星&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">18</span></span>
<span class="line"><span style="color:#E1E4E8;">}, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: </span><span style="color:#9ECBFF;">&quot;朱茵&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    age: </span><span style="color:#79B8FF;">16</span></span>
<span class="line"><span style="color:#E1E4E8;">}]</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> list1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [].</span><span style="color:#B392F0;">concat</span><span style="color:#E1E4E8;">(list)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">list1[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">].age </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(list, list1)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [{</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;周星星&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">18</span></span>
<span class="line"><span style="color:#24292E;">}, {</span></span>
<span class="line"><span style="color:#24292E;">    name: </span><span style="color:#032F62;">&quot;朱茵&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    age: </span><span style="color:#005CC5;">16</span></span>
<span class="line"><span style="color:#24292E;">}]</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> list1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [].</span><span style="color:#6F42C1;">concat</span><span style="color:#24292E;">(list)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">list1[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">].age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(list, list1)</span></span></code></pre></div><p>打印结果：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efd8c2793424449e82d71206f5b199bb~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>这是为什么啊，我明明给了个新数组了，改的也是新数组的数据，但是旧数据还是会变的呢,最终还是个浅拷贝</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><ul><li>如果所解构的原对象是一维数组或对象，其本质就是对基本数据类型进行等号赋值，那它们就是深拷贝；</li><li>如果是多维数组或对象，其本质就是对引用类型数据进项等号赋值，那它们就是浅拷贝；</li></ul><blockquote><p>结论：它们都是浅拷贝（因为它确实不能对多维数组或对象达到深拷贝的作用）；</p></blockquote><p>如果需要使用它们用作深拷贝，需要保证是一维的。</p><h2 id="拓展-深拷贝方法" tabindex="-1">拓展-深拷贝方法 <a class="header-anchor" href="#拓展-深拷贝方法" aria-label="Permalink to &quot;拓展-深拷贝方法&quot;">​</a></h2><h3 id="递归" tabindex="-1">递归 <a class="header-anchor" href="#递归" aria-label="Permalink to &quot;递归&quot;">​</a></h3><p>原理：我们在拷贝的时候判断一下属性值的类型，如果是对象，我们递归调用深拷贝函数就好了</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">deepCopy</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">obj</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 只拷贝对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> obj </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;object&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 根据obj的类型判断是新建一个数组还是对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> newObj </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> obj </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Array</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> [] </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {};</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 遍历obj，并且判断是obj的属性才拷贝</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> key </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> obj) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (obj.</span><span style="color:#B392F0;">hasOwnProperty</span><span style="color:#E1E4E8;">(key)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 如果obj的子属性是对象，则进行递归操作,否则直接赋值</span></span>
<span class="line"><span style="color:#E1E4E8;">            newObj[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> obj[key] </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;object&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">deepCopy</span><span style="color:#E1E4E8;">(obj[key]) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> obj[key];</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> newObj;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">deepCopy</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">obj</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 只拷贝对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> obj </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;object&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 根据obj的类型判断是新建一个数组还是对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> newObj </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> obj </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Array</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> [] </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {};</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 遍历obj，并且判断是obj的属性才拷贝</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> key </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> obj) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (obj.</span><span style="color:#6F42C1;">hasOwnProperty</span><span style="color:#24292E;">(key)) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 如果obj的子属性是对象，则进行递归操作,否则直接赋值</span></span>
<span class="line"><span style="color:#24292E;">            newObj[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> obj[key] </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;object&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">deepCopy</span><span style="color:#24292E;">(obj[key]) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> obj[key];</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> newObj;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="json-parse-json-stringify-obj" tabindex="-1">JSON.parse(JSON.stringify(obj)) <a class="header-anchor" href="#json-parse-json-stringify-obj" aria-label="Permalink to &quot;JSON.parse(JSON.stringify(obj))&quot;">​</a></h3><p>为什么前面会说无奈之举才会有用JSON.stringify和JSON.parse进行深拷贝呢？</p><p>这行代码的运行过程，就是利用 JSON.stringify 将js对象序列化（JSON字符串），再使用JSON.parse来反序列化（还原）js对象；序列化的作用是存储和传输。（对象本身存储的是一个地址映射，如果断电，对象将不存在，所以要将对象的内容转换成字符串的形式再保存在磁盘上）<br> 不过，这种实现深拷贝的方法有局限性，它只适用于一般数据的拷贝（对象、数组），有以下情况需要注意：</p><p><strong>1.如果json里面有时间对象，则序列化结果：时间对象=&gt;字符串的形式；</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    let obj = {</span></span>
<span class="line"><span style="color:#e1e4e8;">        age: 18,</span></span>
<span class="line"><span style="color:#e1e4e8;">        date: new Date()</span></span>
<span class="line"><span style="color:#e1e4e8;">    };</span></span>
<span class="line"><span style="color:#e1e4e8;">    let objCopy = JSON.parse(JSON.stringify(obj));</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;obj&#39;, obj);</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;objCopy&#39;, objCopy);</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(typeof obj.date); // object</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(typeof objCopy.date); // string</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    let obj = {</span></span>
<span class="line"><span style="color:#24292e;">        age: 18,</span></span>
<span class="line"><span style="color:#24292e;">        date: new Date()</span></span>
<span class="line"><span style="color:#24292e;">    };</span></span>
<span class="line"><span style="color:#24292e;">    let objCopy = JSON.parse(JSON.stringify(obj));</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;obj&#39;, obj);</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;objCopy&#39;, objCopy);</span></span>
<span class="line"><span style="color:#24292e;">    console.log(typeof obj.date); // object</span></span>
<span class="line"><span style="color:#24292e;">    console.log(typeof objCopy.date); // string</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d9b4a50f7154e6899fa84f1039efd6d~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"></p><p><strong>2.如果json里有RegExp、Error对象，则序列化的结果将只得到空对象 RegExp、Error =&gt; {}；</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    let obj = {</span></span>
<span class="line"><span style="color:#e1e4e8;">        age: 18,</span></span>
<span class="line"><span style="color:#e1e4e8;">        reg: new RegExp(&#39;\\w+&#39;),</span></span>
<span class="line"><span style="color:#e1e4e8;">        err: new Error(&#39;error message&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    };</span></span>
<span class="line"><span style="color:#e1e4e8;">    let objCopy = JSON.parse(JSON.stringify(obj));</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;obj&#39;, obj);</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;objCopy&#39;, objCopy);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    let obj = {</span></span>
<span class="line"><span style="color:#24292e;">        age: 18,</span></span>
<span class="line"><span style="color:#24292e;">        reg: new RegExp(&#39;\\w+&#39;),</span></span>
<span class="line"><span style="color:#24292e;">        err: new Error(&#39;error message&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    };</span></span>
<span class="line"><span style="color:#24292e;">    let objCopy = JSON.parse(JSON.stringify(obj));</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;obj&#39;, obj);</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;objCopy&#39;, objCopy);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0aa8396d7bb742a7a3849cbdd8fb7ea5~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"></p><p><strong>3.如果json里有 function,undefined，则序列化的结果会把 function,undefined 丢失；</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    let obj = {</span></span>
<span class="line"><span style="color:#e1e4e8;">        age: 18,</span></span>
<span class="line"><span style="color:#e1e4e8;">        fn: function () {</span></span>
<span class="line"><span style="color:#e1e4e8;">            console.log(&#39;fn&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">        },</span></span>
<span class="line"><span style="color:#e1e4e8;">        hh: undefined</span></span>
<span class="line"><span style="color:#e1e4e8;">    };</span></span>
<span class="line"><span style="color:#e1e4e8;">    let objCopy = JSON.parse(JSON.stringify(obj));</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;obj&#39;, obj);</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;objCopy&#39;, objCopy);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    let obj = {</span></span>
<span class="line"><span style="color:#24292e;">        age: 18,</span></span>
<span class="line"><span style="color:#24292e;">        fn: function () {</span></span>
<span class="line"><span style="color:#24292e;">            console.log(&#39;fn&#39;);</span></span>
<span class="line"><span style="color:#24292e;">        },</span></span>
<span class="line"><span style="color:#24292e;">        hh: undefined</span></span>
<span class="line"><span style="color:#24292e;">    };</span></span>
<span class="line"><span style="color:#24292e;">    let objCopy = JSON.parse(JSON.stringify(obj));</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;obj&#39;, obj);</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;objCopy&#39;, objCopy);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a10ccba7127349b2b6a52d0a651f612b~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"></p><p><strong>4.如果json里有NaN、Infinity和-Infinity，则序列化的结果会变成null；</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    let obj = {</span></span>
<span class="line"><span style="color:#e1e4e8;">        age: 18,</span></span>
<span class="line"><span style="color:#e1e4e8;">        hh: NaN,</span></span>
<span class="line"><span style="color:#e1e4e8;">        isInfinite: 1.7976931348623157E+10308,</span></span>
<span class="line"><span style="color:#e1e4e8;">        minusInfinity: -1.7976931348623157E+10308</span></span>
<span class="line"><span style="color:#e1e4e8;">    };</span></span>
<span class="line"><span style="color:#e1e4e8;">    let objCopy = JSON.parse(JSON.stringify(obj));</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;obj&#39;, obj);</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;objCopy&#39;, objCopy);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    let obj = {</span></span>
<span class="line"><span style="color:#24292e;">        age: 18,</span></span>
<span class="line"><span style="color:#24292e;">        hh: NaN,</span></span>
<span class="line"><span style="color:#24292e;">        isInfinite: 1.7976931348623157E+10308,</span></span>
<span class="line"><span style="color:#24292e;">        minusInfinity: -1.7976931348623157E+10308</span></span>
<span class="line"><span style="color:#24292e;">    };</span></span>
<span class="line"><span style="color:#24292e;">    let objCopy = JSON.parse(JSON.stringify(obj));</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;obj&#39;, obj);</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;objCopy&#39;, objCopy);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14d67e173cd64dd9a9ff61042e85de0e~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"></p><p><strong>5.如果json里有对象是由构造函数生成的，则序列化的结果会丢弃对象的 constructor；</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    function Person(name) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        this.name = name;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    let obj = {</span></span>
<span class="line"><span style="color:#e1e4e8;">        age: 18,</span></span>
<span class="line"><span style="color:#e1e4e8;">        p1: new Person(&#39;lxcan&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    };</span></span>
<span class="line"><span style="color:#e1e4e8;">    let objCopy = JSON.parse(JSON.stringify(obj));</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;obj&#39;, obj);</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;objCopy&#39;, objCopy);</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(obj.p1.__proto__.constructor === Person); // true</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(objCopy.p1.__proto__.constructor === Object); // true</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    function Person(name) {</span></span>
<span class="line"><span style="color:#24292e;">        this.name = name;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    let obj = {</span></span>
<span class="line"><span style="color:#24292e;">        age: 18,</span></span>
<span class="line"><span style="color:#24292e;">        p1: new Person(&#39;lxcan&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    };</span></span>
<span class="line"><span style="color:#24292e;">    let objCopy = JSON.parse(JSON.stringify(obj));</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;obj&#39;, obj);</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;objCopy&#39;, objCopy);</span></span>
<span class="line"><span style="color:#24292e;">    console.log(obj.p1.__proto__.constructor === Person); // true</span></span>
<span class="line"><span style="color:#24292e;">    console.log(objCopy.p1.__proto__.constructor === Object); // true</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48e00ca25092428083d8460a86630926~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"></p><p><strong>6.如果对象中存在循环引用的情况也无法实现深拷贝</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    let obj = {</span></span>
<span class="line"><span style="color:#e1e4e8;">        age: 18</span></span>
<span class="line"><span style="color:#e1e4e8;">    };</span></span>
<span class="line"><span style="color:#e1e4e8;">    obj.obj = obj;</span></span>
<span class="line"><span style="color:#e1e4e8;">    let objCopy = JSON.parse(JSON.stringify(obj));</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;obj&#39;, obj);</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;objCopy&#39;, objCopy);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    let obj = {</span></span>
<span class="line"><span style="color:#24292e;">        age: 18</span></span>
<span class="line"><span style="color:#24292e;">    };</span></span>
<span class="line"><span style="color:#24292e;">    obj.obj = obj;</span></span>
<span class="line"><span style="color:#24292e;">    let objCopy = JSON.parse(JSON.stringify(obj));</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;obj&#39;, obj);</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;objCopy&#39;, objCopy);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/050cd87cf8344fe99c3b56d29986f5ac~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"></p><p>以上，如果拷贝的对象不涉及上面的情况，可以使用 JSON.parse(JSON.stringify(obj)) 实现深拷贝。</p>`,71),c=[e];function t(y,i,E,b,g,j){return n(),a("div",null,c)}const r=s(o,[["render",t]]),u=Object.freeze(Object.defineProperty({__proto__:null,__pageData:l,default:r},Symbol.toStringTag,{value:"Module"}));export{u as _,l as __pageData,r as default};
