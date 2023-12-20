import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.12b7deed.js";const l=JSON.parse('{"title":"组件生命周期","description":"","frontmatter":{"title":"组件生命周期","head":[["meta",{"name":"og:title","content":"组件生命周期 | VitePress"}]]},"headers":[],"relativePath":"react/life-cycle.md","filePath":"react/life-cycle.md","lastUpdated":1698918793000}'),o={name:"react/life-cycle.md"},e=p(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>没有坚固的底盘，如何构建高楼大厦。就像深圳华强北赛格大厦倾斜但是倒不了一样，随风飘扬。</p><p>今天主要是讲一下<strong>React的生命周期</strong></p><p>简直就是底盘的底盘，生命都没有了，哪来的生存。</p><p>下面我们来看一下简单的例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React, { Component } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Index1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Component</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">state</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    opacity: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">timer</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">componentDidMount</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;componentDidMount&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.timer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setInterval</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> { opacity } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state;</span></span>
<span class="line"><span style="color:#E1E4E8;">      opacity </span><span style="color:#F97583;">-=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0.1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (opacity </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) opacity </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">setState</span><span style="color:#E1E4E8;">({ opacity });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }, </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//组件将要卸载</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">componentWillUnmount</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;componentWillUnmount&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//清除定时器</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">clearInterval</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.timer)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">React</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ReactNode</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">style</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{{ opacity: </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state.opacity }}&gt;李嘉欣来你家了&lt;/</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">example12</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Component</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">state</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    status: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">changeIndex</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">setState</span><span style="color:#E1E4E8;">({ status: </span><span style="color:#F97583;">!</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state.status });</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;生命周期&lt;/</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state.status </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#79B8FF;">Index1</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#79B8FF;">Index1</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.changeIndex}&gt;李嘉欣不见了&lt;/</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React, { Component } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Index1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Component</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">state</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    opacity: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">timer</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">componentDidMount</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;componentDidMount&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.timer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setInterval</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> { opacity } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state;</span></span>
<span class="line"><span style="color:#24292E;">      opacity </span><span style="color:#D73A49;">-=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0.1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (opacity </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) opacity </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">setState</span><span style="color:#24292E;">({ opacity });</span></span>
<span class="line"><span style="color:#24292E;">    }, </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//组件将要卸载</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">componentWillUnmount</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;componentWillUnmount&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//清除定时器</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">clearInterval</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.timer)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">React</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">ReactNode</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      &lt;&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">h2</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">style</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{{ opacity: </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state.opacity }}&gt;李嘉欣来你家了&lt;/</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/&gt;</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">example12</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Component</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">state</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    status: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">changeIndex</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">setState</span><span style="color:#24292E;">({ status: </span><span style="color:#D73A49;">!</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state.status });</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      &lt;&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;生命周期&lt;/</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        {</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state.status </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> &lt;</span><span style="color:#005CC5;">Index1</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#005CC5;">Index1</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.changeIndex}&gt;李嘉欣不见了&lt;/</span><span style="color:#22863A;">button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/&gt;</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>效果图：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae9e459d796145eaa0ddba70c0d2894a~tplv-k3u1fbpfcp-watermark.image?" alt="生命周期1.gif"></p><p>从上面我们可以看出个大概：组件渲染时会执行<code>componentDidMount</code>，组件卸载时会执行<code>componentWillUnmount</code>。</p><p>哪还有其他的生命周期吗?有的。</p><h2 id="生命周期-旧" tabindex="-1">生命周期（旧） <a class="header-anchor" href="#生命周期-旧" aria-label="Permalink to &quot;生命周期（旧）&quot;">​</a></h2><p>在React 16以前的生命周期图是这样的：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd36a46618ca497cae01dcb296d41309~tplv-k3u1fbpfcp-watermark.image?" alt="2_react生命周期(旧).png"></p><p>用一个简单的例子来看一下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React, { Component } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Index1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Component</span><span style="color:#E1E4E8;">&lt;{ </span><span style="color:#B392F0;">death</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">void</span><span style="color:#E1E4E8;">; </span><span style="color:#FFAB70;">carName</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> }, { </span><span style="color:#FFAB70;">count</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> }&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">constructor</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">props</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> { </span><span style="color:#B392F0;">death</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">void</span><span style="color:#E1E4E8;">; </span><span style="color:#FFAB70;">carName</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Readonly</span><span style="color:#E1E4E8;">&lt;{ </span><span style="color:#B392F0;">death</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">void</span><span style="color:#E1E4E8;">; </span><span style="color:#FFAB70;">carName</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> }&gt;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Count---constructor&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">(props);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//初始化状态</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { count: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> };</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//获取原状态</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">count</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//更新状态</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">setState</span><span style="color:#E1E4E8;">({ count: count </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> });</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">force</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">forceUpdate</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//组件将要挂载的钩子</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">componentWillMount</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Count---componentWillMount&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//组件将要挂载完毕的钩子</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">componentDidMount</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Count---componentDidMount&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//组件将要卸载的钩子</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">componentWillUnmount</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Count---componentWillUnmount&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//控制组件更细的阀门</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">shouldComponentUpdate</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Count---shouldComponentUpdate&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//组件将要更新的钩子</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">componentWillUpdate</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Count---componentWillUpdate&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//组件更新完毕的钩子</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">componentDidUpdate</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Count --- componentDidUpdate&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">React</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ReactNode</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Count---render&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">death</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">carName</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.props;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">count</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">h3</span><span style="color:#E1E4E8;">&gt;当前求和为：{count}&lt;/</span><span style="color:#85E89D;">h3</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">h3</span><span style="color:#E1E4E8;">&gt;我现在开：{carName}&lt;/</span><span style="color:#85E89D;">h3</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.add}&gt;点我+1&lt;/</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">death</span><span style="color:#E1E4E8;">()}&gt;卸载组件&lt;/</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.force}&gt;不更改任何状态中的数据，强制更新一下&lt;/</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">example12</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Component</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">state</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    status: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    carName: </span><span style="color:#9ECBFF;">&quot;奔驰&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">changeIndex</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">setState</span><span style="color:#E1E4E8;">({ status: </span><span style="color:#F97583;">!</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state.status });</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">changCar</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">setState</span><span style="color:#E1E4E8;">({ carName: </span><span style="color:#9ECBFF;">&quot;奥拓&quot;</span><span style="color:#E1E4E8;"> });</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;父组件的render&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;生命周期&lt;/</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state.status </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#79B8FF;">Index1</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">death</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.changeIndex} </span><span style="color:#B392F0;">carName</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.state.carName}&gt;&lt;/</span><span style="color:#79B8FF;">Index1</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">hr</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.changCar}&gt;换车&lt;/</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React, { Component } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Index1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Component</span><span style="color:#24292E;">&lt;{ </span><span style="color:#6F42C1;">death</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">void</span><span style="color:#24292E;">; </span><span style="color:#E36209;">carName</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> }, { </span><span style="color:#E36209;">count</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> }&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">props</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> { </span><span style="color:#6F42C1;">death</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">void</span><span style="color:#24292E;">; </span><span style="color:#E36209;">carName</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Readonly</span><span style="color:#24292E;">&lt;{ </span><span style="color:#6F42C1;">death</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">void</span><span style="color:#24292E;">; </span><span style="color:#E36209;">carName</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> }&gt;) {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Count---constructor&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">(props);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//初始化状态</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { count: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> };</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//获取原状态</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">count</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//更新状态</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">setState</span><span style="color:#24292E;">({ count: count </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> });</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">force</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">forceUpdate</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//组件将要挂载的钩子</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">componentWillMount</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Count---componentWillMount&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//组件将要挂载完毕的钩子</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">componentDidMount</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Count---componentDidMount&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//组件将要卸载的钩子</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">componentWillUnmount</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Count---componentWillUnmount&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//控制组件更细的阀门</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">shouldComponentUpdate</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Count---shouldComponentUpdate&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//组件将要更新的钩子</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">componentWillUpdate</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Count---componentWillUpdate&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//组件更新完毕的钩子</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">componentDidUpdate</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Count --- componentDidUpdate&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">React</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">ReactNode</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Count---render&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">death</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">carName</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.props;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">count</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      &lt;&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">h3</span><span style="color:#24292E;">&gt;当前求和为：{count}&lt;/</span><span style="color:#22863A;">h3</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">h3</span><span style="color:#24292E;">&gt;我现在开：{carName}&lt;/</span><span style="color:#22863A;">h3</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.add}&gt;点我+1&lt;/</span><span style="color:#22863A;">button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">death</span><span style="color:#24292E;">()}&gt;卸载组件&lt;/</span><span style="color:#22863A;">button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.force}&gt;不更改任何状态中的数据，强制更新一下&lt;/</span><span style="color:#22863A;">button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/&gt;</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">example12</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Component</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">state</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    status: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    carName: </span><span style="color:#032F62;">&quot;奔驰&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">changeIndex</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">setState</span><span style="color:#24292E;">({ status: </span><span style="color:#D73A49;">!</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state.status });</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">changCar</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">setState</span><span style="color:#24292E;">({ carName: </span><span style="color:#032F62;">&quot;奥拓&quot;</span><span style="color:#24292E;"> });</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;父组件的render&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      &lt;&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;生命周期&lt;/</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        {</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state.status </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> &lt;</span><span style="color:#005CC5;">Index1</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">death</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.changeIndex} </span><span style="color:#6F42C1;">carName</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.state.carName}&gt;&lt;/</span><span style="color:#005CC5;">Index1</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">hr</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.changCar}&gt;换车&lt;/</span><span style="color:#22863A;">button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/&gt;</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>效果图：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7d5adaea02e496c9a299861eb28fce6~tplv-k3u1fbpfcp-watermark.image?" alt="生命周期旧.gif"></p><p>可以从上面总结出以下知识点：</p><ol><li>初始化阶段: 由父级render()触发---初次渲染 <ul><li>constructor()</li><li>componentWillMount()</li><li>render()</li><li>omponentDidMount() =====&gt; 常用，一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息</li></ul></li><li>更新阶段: 由组件内部this.setSate()或父组件render触发 <ul><li>shouldComponentUpdate()</li><li>componentWillUpdate()</li><li>render() =====&gt; 必须使用的一个</li><li>componentDidUpdate()</li></ul></li><li>卸载组件: 由父组件的changeIndex事件触发 <ul><li>componentWillUnmount() =====&gt; 常用，一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息</li></ul></li></ol><p>好奇的伙伴们就会发现右侧有一些警告：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8aa49593f184af1ac7f20c2742d9930~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>对于这个官方是这样解释的：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18361454880f452d9334a4c42656a919~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>大概的意思就是React准备启用这几个Api了，如果你需要使用的话，请在前面的加上前缀<code>UNSAFE_</code></p><p>但是改了之后还是会报警告：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aadddb5167704ea28e815b41ceb96886~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>这个的大概意思就是，严格模式下使用UNSAFE_componentWillMount，咦我们什么时候开启了严格模式了？其实是用vite创建项目的使用自动给我们加上了：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4575349665444893aeb123d74c8881a7~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> 只要把<code>React.StrictMode</code>注释就可以了。更多可以<a href="https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html" target="_blank" rel="noreferrer">去React对这块的解释</a></p><p>看完旧的让我们看一下新的</p><h2 id="生命周期-新" tabindex="-1">生命周期（新） <a class="header-anchor" href="#生命周期-新" aria-label="Permalink to &quot;生命周期（新）&quot;">​</a></h2><h3 id="_1、生命周期有哪些" tabindex="-1">1、生命周期有哪些？ <a class="header-anchor" href="#_1、生命周期有哪些" aria-label="Permalink to &quot;1、生命周期有哪些？&quot;">​</a></h3><p><a href="https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/" target="_blank" rel="noreferrer">React 16以上官网给的生命周期</a>是这样的：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d254be70eac143b89d2ae416779fa7fa~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>根据上面的图片归纳一下：</p><p>将组件生命周期分为三个阶段：</p><ul><li>装载阶段（Mount），组件第一次在DOM树中被渲染的过程；</li><li>更新过程（Update），组件状态发生变化，重新更新渲染的过程；</li><li>卸载过程（Unmount），组件从DOM树中被移除的过程；</li></ul><h4 id="_1-组件挂载阶段" tabindex="-1">1）组件挂载阶段 <a class="header-anchor" href="#_1-组件挂载阶段" aria-label="Permalink to &quot;1）组件挂载阶段&quot;">​</a></h4><p>挂载阶段组件被创建，然后组件实例插入到 DOM 中，完成组件的第一次渲染，该过程只会发生一次，在此阶段会依次调用以下这些方法：</p><ul><li>constructor</li><li>getDerivedStateFromProps</li><li>render</li><li>componentDidMount</li></ul><h5 id="_1-constructor" tabindex="-1">（1）constructor <a class="header-anchor" href="#_1-constructor" aria-label="Permalink to &quot;（1）constructor&quot;">​</a></h5><p>组件的构造函数，第一个被执行，若没有显式定义它，会有一个默认的构造函数，但是若显式定义了构造函数，我们必须在构造函数中执行 <code>super(props)</code>，否则无法在构造函数中拿到this。</p><p>如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数<strong>Constructor</strong>。</p><p>constructor中通常只做两件事：</p><ul><li>初始化组件的 state</li><li>给事件处理方法绑定 this，一般都是箭头函数代替了</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">constructor(props: { death: () =&gt; void; carName: string } | Readonly&lt;{ death: () =&gt; void; carName: string }&gt;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(&quot;Count---constructor&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">  super(props);</span></span>
<span class="line"><span style="color:#e1e4e8;">  //初始化状态</span></span>
<span class="line"><span style="color:#e1e4e8;">  this.state = { count: 0 };</span></span>
<span class="line"><span style="color:#e1e4e8;">  this.add = this.add.bind(this);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">constructor(props: { death: () =&gt; void; carName: string } | Readonly&lt;{ death: () =&gt; void; carName: string }&gt;) {</span></span>
<span class="line"><span style="color:#24292e;">  console.log(&quot;Count---constructor&quot;);</span></span>
<span class="line"><span style="color:#24292e;">  super(props);</span></span>
<span class="line"><span style="color:#24292e;">  //初始化状态</span></span>
<span class="line"><span style="color:#24292e;">  this.state = { count: 0 };</span></span>
<span class="line"><span style="color:#24292e;">  this.add = this.add.bind(this);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h5 id="_2-getderivedstatefromprops" tabindex="-1">（2）getDerivedStateFromProps <a class="header-anchor" href="#_2-getderivedstatefromprops" aria-label="Permalink to &quot;（2）getDerivedStateFromProps&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">static getDerivedStateFromProps(props, state)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">static getDerivedStateFromProps(props, state)</span></span></code></pre></div><p>这是个静态方法，所以不能在这个函数里使用 <code>this</code>，有两个参数 <code>props</code> 和 <code>state</code>，分别指接收到的新参数和当前组件的 <code>state</code> 对象，这个函数会返回一个对象用来更新当前的 <code>state</code> 对象，如果不需要更新可以返回 <code>null</code>。</p><p>该函数会在装载时，接收到新的 <code>props</code> 或者调用了 <code>setState</code> 和 <code>forceUpdate</code> 时被调用。如当接收到新的属性想修改 <code>state</code> ，就可以使用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import React, { Component } from &quot;react&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">class Index1 extends Component&lt;{ count: number }&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  state = {</span></span>
<span class="line"><span style="color:#e1e4e8;">    count: 0,</span></span>
<span class="line"><span style="color:#e1e4e8;">  };</span></span>
<span class="line"><span style="color:#e1e4e8;">  static getDerivedStateFromProps(props, state) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (props.count !== state.count) {</span></span>
<span class="line"><span style="color:#e1e4e8;">      return {</span></span>
<span class="line"><span style="color:#e1e4e8;">        count: props.count,</span></span>
<span class="line"><span style="color:#e1e4e8;">      };</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    return null;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">  add = () =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    this.setState({</span></span>
<span class="line"><span style="color:#e1e4e8;">      count: this.state.count + 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">    });</span></span>
<span class="line"><span style="color:#e1e4e8;">  };</span></span>
<span class="line"><span style="color:#e1e4e8;">  render() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return (</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">        &lt;h1&gt;现在的计算的Count：{this.state.count}&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">        &lt;button onClick={this.add}&gt;点我+1&lt;/button&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;/&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export default class example14 extends Component {</span></span>
<span class="line"><span style="color:#e1e4e8;">  render() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return &lt;Index1 count={10}&gt;&lt;/Index1&gt;;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import React, { Component } from &quot;react&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">class Index1 extends Component&lt;{ count: number }&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  state = {</span></span>
<span class="line"><span style="color:#24292e;">    count: 0,</span></span>
<span class="line"><span style="color:#24292e;">  };</span></span>
<span class="line"><span style="color:#24292e;">  static getDerivedStateFromProps(props, state) {</span></span>
<span class="line"><span style="color:#24292e;">    if (props.count !== state.count) {</span></span>
<span class="line"><span style="color:#24292e;">      return {</span></span>
<span class="line"><span style="color:#24292e;">        count: props.count,</span></span>
<span class="line"><span style="color:#24292e;">      };</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    return null;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">  add = () =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    this.setState({</span></span>
<span class="line"><span style="color:#24292e;">      count: this.state.count + 1,</span></span>
<span class="line"><span style="color:#24292e;">    });</span></span>
<span class="line"><span style="color:#24292e;">  };</span></span>
<span class="line"><span style="color:#24292e;">  render() {</span></span>
<span class="line"><span style="color:#24292e;">    return (</span></span>
<span class="line"><span style="color:#24292e;">      &lt;&gt;</span></span>
<span class="line"><span style="color:#24292e;">        &lt;h1&gt;现在的计算的Count：{this.state.count}&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#24292e;">        &lt;button onClick={this.add}&gt;点我+1&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;/&gt;</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export default class example14 extends Component {</span></span>
<span class="line"><span style="color:#24292e;">  render() {</span></span>
<span class="line"><span style="color:#24292e;">    return &lt;Index1 count={10}&gt;&lt;/Index1&gt;;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>现在可以显式传入 <code>count</code> ，但是这里有个问题，如果想要通过点击实现 <code>state.count</code> 的增加，但这时会发现值不会发生任何变化，一直保持 <code>props</code> 传进来的值。这是由于在 React 16.4^ 的版本中 <code>setState</code> 和 <code>forceUpdate</code> 也会触发这个生命周期，所以当组件内部 <code>state</code> 变化后，就会重新走这个方法，同时会把 <code>state</code> 值赋值为 <code>props</code> 的值。因此需要多加一个字段来记录之前的 <code>props</code> 值，这样就会解决上述问题。具体如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">......其他都一样，省略了</span></span>
<span class="line"><span style="color:#e1e4e8;">state = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  count: 0,</span></span>
<span class="line"><span style="color:#e1e4e8;">  preCount: 0,</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;">static getDerivedStateFromProps(props, state) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  if (props.count !== state.preCount) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return {</span></span>
<span class="line"><span style="color:#e1e4e8;">      count: props.count,</span></span>
<span class="line"><span style="color:#e1e4e8;">      preCount: props.count,</span></span>
<span class="line"><span style="color:#e1e4e8;">    };</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">  return null;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">......其他都一样，省略了</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">......其他都一样，省略了</span></span>
<span class="line"><span style="color:#24292e;">state = {</span></span>
<span class="line"><span style="color:#24292e;">  count: 0,</span></span>
<span class="line"><span style="color:#24292e;">  preCount: 0,</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;">static getDerivedStateFromProps(props, state) {</span></span>
<span class="line"><span style="color:#24292e;">  if (props.count !== state.preCount) {</span></span>
<span class="line"><span style="color:#24292e;">    return {</span></span>
<span class="line"><span style="color:#24292e;">      count: props.count,</span></span>
<span class="line"><span style="color:#24292e;">      preCount: props.count,</span></span>
<span class="line"><span style="color:#24292e;">    };</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">  return null;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">......其他都一样，省略了</span></span></code></pre></div><h5 id="_3-render" tabindex="-1">（3）render <a class="header-anchor" href="#_3-render" aria-label="Permalink to &quot;（3）render&quot;">​</a></h5><p>render是React 中最核心的方法，一个组件中必须要有这个方法，它会根据状态 <code>state</code> 和属性 <code>props</code> 渲染组件。这个函数只做一件事，就是返回需要渲染的内容，所以不要在这个函数内做其他业务逻辑，通常调用该方法会返回以下类型中一个：</p><ul><li><strong>React 元素</strong>：这里包括原生的 DOM 以及 React 组件；</li><li><strong>数组和 Fragment（片段）</strong> ：可以返回多个元素；</li><li><strong>Portals（插槽）</strong> ：可以将子元素渲染到不同的 DOM 子树种；</li><li><strong>字符串和数字</strong>：被渲染成 DOM 中的 text 节点；</li><li><strong>布尔值或 null</strong>：不渲染任何内容。</li></ul><h5 id="_4-componentdidmount" tabindex="-1">（4）componentDidMount() <a class="header-anchor" href="#_4-componentdidmount" aria-label="Permalink to &quot;（4）componentDidMount()&quot;">​</a></h5><p>componentDidMount()会在组件挂载后（插入 DOM 树中）立即调。该阶段通常进行以下操作：</p><ul><li>执行依赖于DOM的操作；</li><li>发送网络请求；（官方建议）</li><li>添加订阅消息（会在componentWillUnmount取消订阅）；</li></ul><p>如果在 <code>componentDidMount</code> 中调用 <code>setState</code> ，就会触发一次额外的渲染，多调用了一次 <code>render</code> 函数，由于它是在浏览器刷新屏幕前执行的，所以用户对此是没有感知的，但是我应当避免这样使用，这样会带来一定的性能问题，尽量是在 <code>constructor</code> 中初始化 <code>state</code> 对象。</p><p>在组件装载之后，将计数数字变为1：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">......其他都一样，省略了</span></span>
<span class="line"><span style="color:#e1e4e8;">componentDidMount () {</span></span>
<span class="line"><span style="color:#e1e4e8;">  this.setState({</span></span>
<span class="line"><span style="color:#e1e4e8;">    count: 1</span></span>
<span class="line"><span style="color:#e1e4e8;">  })</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">......其他都一样，省略了</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">......其他都一样，省略了</span></span>
<span class="line"><span style="color:#24292e;">componentDidMount () {</span></span>
<span class="line"><span style="color:#24292e;">  this.setState({</span></span>
<span class="line"><span style="color:#24292e;">    count: 1</span></span>
<span class="line"><span style="color:#24292e;">  })</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">......其他都一样，省略了</span></span></code></pre></div><h4 id="_2-组件更新阶段" tabindex="-1">2）组件更新阶段 <a class="header-anchor" href="#_2-组件更新阶段" aria-label="Permalink to &quot;2）组件更新阶段&quot;">​</a></h4><p>当组件的 <code>props</code> 改变了，或组件内部调用了 <code>setState/forceUpdate</code>，会触发更新重新渲染，这个过程可能会发生多次。这个阶段会依次调用下面这些方法：</p><ul><li>getDerivedStateFromProps</li><li>shouldComponentUpdate</li><li>render</li><li>getSnapshotBeforeUpdate</li><li>componentDidUpdate</li></ul><h5 id="_1-shouldcomponentupdate" tabindex="-1">（1）shouldComponentUpdate <a class="header-anchor" href="#_1-shouldcomponentupdate" aria-label="Permalink to &quot;（1）shouldComponentUpdate&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">shouldComponentUpdate(nextProps, nextState)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">shouldComponentUpdate(nextProps, nextState)</span></span></code></pre></div><p>在说这个生命周期函数之前，来看两个问题：</p><ul><li><strong>setState 函数在任何情况下都会导致组件重新渲染吗？例如下面这种情况：</strong></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">this.setState({number: this.state.number})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">this.setState({number: this.state.number})</span></span></code></pre></div><ul><li><strong>如果没有调用 setState，props 值也没有变化，是不是组件就不会重新渲染？</strong></li></ul><p>第一个问题答案是 <strong>会</strong> ，第二个问题如果是父组件重新渲染时，不管传入的 props 有没有变化，都会引起子组件的重新渲染。</p><p>那么有没有什么方法解决在这两个场景下不让组件重新渲染进而提升性能呢？这个时候 <code>shouldComponentUpdate</code> 登场了，这个生命周期函数是用来提升速度的，它是在重新渲染组件开始前触发的，默认返回 <code>true</code>，可以比较 <code>this.props</code> 和 <code>nextProps</code> ，<code>this.state</code> 和 <code>nextState</code> 值是否变化，来确认返回 true 或者 <code>false</code>。当返回 <code>false</code> 时，组件的更新过程停止，后续的 <code>render</code>、<code>componentDidUpdate</code> 也不会被调用。</p><p><strong>注意：</strong> 添加 <code>shouldComponentUpdate</code> 方法时，不建议使用深度相等检查（如使用 <code>JSON.stringify()</code>），因为深比较效率很低，可能会比重新渲染组件效率还低。而且该方法维护比较困难，建议使用该方法会产生明显的性能提升时使用。</p><h5 id="_2-getsnapshotbeforeupdate" tabindex="-1">（2）getSnapshotBeforeUpdate <a class="header-anchor" href="#_2-getsnapshotbeforeupdate" aria-label="Permalink to &quot;（2）getSnapshotBeforeUpdate&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">getSnapshotBeforeUpdate(prevProps, prevState)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">getSnapshotBeforeUpdate(prevProps, prevState)</span></span></code></pre></div><p>这个方法在 <code>render</code> 之后，<code>componentDidUpdate</code> 之前调用，有两个参数 <code>prevProps</code> 和 <code>prevState</code>，表示更新之前的 <code>props</code> 和 <code>state</code>，这个函数必须要和 <code>componentDidUpdate</code> 一起使用，并且要有一个返回值，默认是 <code>null</code>，这个返回值作为第三个参数传给 <code>componentDidUpdate</code>。</p><h5 id="_3-componentdidupdate" tabindex="-1">（3）componentDidUpdate <a class="header-anchor" href="#_3-componentdidupdate" aria-label="Permalink to &quot;（3）componentDidUpdate&quot;">​</a></h5><p>componentDidUpdate() 会在更新后会被立即调用，首次渲染不会执行此方法。 该阶段通常进行以下操作：</p><ul><li>当组件更新后，对 DOM 进行操作；</li><li>如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求；（例如，当 props 未发生变化时，则不会执行网络请求）。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">componentDidUpdate(prevProps, prevState, snapshot){}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">componentDidUpdate(prevProps, prevState, snapshot){}</span></span></code></pre></div><p>该方法有三个参数：</p><ul><li>prevProps: 更新前的props</li><li>prevState: 更新前的state</li><li>snapshot: getSnapshotBeforeUpdate()生命周期的返回值</li></ul><h4 id="_3-组件卸载阶段" tabindex="-1">3）组件卸载阶段 <a class="header-anchor" href="#_3-组件卸载阶段" aria-label="Permalink to &quot;3）组件卸载阶段&quot;">​</a></h4><p>卸载阶段只有一个生命周期函数，componentWillUnmount() 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作：</p><ul><li>清除 timer，取消网络请求或清除</li><li>取消在 componentDidMount() 中创建的订阅等；</li></ul><p>这个生命周期在一个组件被卸载和销毁之前被调用，因此你不应该再这个方法中使用 <code>setState</code>，因为组件一旦被卸载，就不会再装载，也就不会重新渲染。</p><h4 id="_4-错误处理阶段" tabindex="-1">4）错误处理阶段 <a class="header-anchor" href="#_4-错误处理阶段" aria-label="Permalink to &quot;4）错误处理阶段&quot;">​</a></h4><p>componentDidCatch(error, info)，此生命周期在后代组件抛出错误后被调用。 它接收两个参数∶</p><ul><li>error：抛出的错误。</li><li>info：带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息</li></ul><p>React常见的生命周期如下： <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/216b388289964f20b56764530ac0fe5e~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"> <strong>React常见生命周期的过程大致如下：</strong></p><ul><li>挂载阶段，首先执行constructor构造方法，来创建组件</li><li>创建完成之后，就会执行render方法，该方法会返回需要渲染的内容</li><li>随后，React会将需要渲染的内容挂载到DOM树上</li><li><strong>挂载完成之后就会执行componentDidMount生命周期函数</strong></li><li>如果我们给组件创建一个props（用于组件通信）、调用setState（更改state中的数据）、调用forceUpdate（强制更新组件）时，都会重新调用render函数</li><li>render函数重新执行之后，就会重新进行DOM树的挂载</li><li><strong>挂载完成之后就会执行componentDidUpdate生命周期函数</strong></li><li><strong>当移除组件时，就会执行componentWillUnmount生命周期函数</strong></li></ul><p><strong>React主要生命周期总结：</strong></p><ol><li><strong>getDefaultProps</strong>：这个函数会在组件创建之前被调用一次（有且仅有一次），它被用来初始化组件的 Props；</li><li><strong>getInitialState</strong>：用于初始化组件的 state 值；</li><li><strong>componentWillMount</strong>：在组件创建后、render 之前，会走到 componentWillMount 阶段。这个阶段我个人一直没用过、非常鸡肋。后来React 官方已经不推荐大家在 componentWillMount 里做任何事情、到现在 <strong>React16 直接废弃了这个生命周期</strong>，足见其鸡肋程度了；</li><li><strong>render</strong>：这是所有生命周期中唯一一个你必须要实现的方法。一般来说需要返回一个 jsx 元素，这时 React 会根据 props 和 state 来把组件渲染到界面上；不过有时，你可能不想渲染任何东西，这种情况下让它返回 null 或者 false 即可；</li><li><strong>componentDidMount</strong>：会在组件挂载后（插入 DOM 树中后）立即调用，标志着组件挂载完成。一些操作如果依赖获取到 DOM 节点信息，我们就会放在这个阶段来做。此外，这还是 React 官方推荐的发起 ajax 请求的时机。该方法和 componentWillMount 一样，有且仅有一次调用。</li></ol><h3 id="_2-react-废弃了哪些生命周期-为什么" tabindex="-1">2. React 废弃了哪些生命周期？为什么？ <a class="header-anchor" href="#_2-react-废弃了哪些生命周期-为什么" aria-label="Permalink to &quot;2. React 废弃了哪些生命周期？为什么？&quot;">​</a></h3><p>被废弃的三个函数都是在render之前，因为fber的出现，很可能因为高优先级任务的出现而打断现有任务导致它们会被执行多次。另外的一个原因则是，React想约束使用者，好的框架能够让人不得已写出容易维护和扩展的代码，这一点又是从何谈起，可以从新增加以及即将废弃的生命周期分析入手</p><p><strong>1) componentWillMount</strong></p><p>首先这个函数的功能完全可以使用componentDidMount和 constructor来代替，异步获取的数据的情况上面已经说明了，而如果抛去异步获取数据，其余的即是初始化而已，这些功能都可以在constructor中执行，除此之外，如果在 willMount 中订阅事件，但在服务端这并不会执行 willUnMount事件，也就是说服务端会导致内存泄漏所以componentWilIMount完全可以不使用，但使用者有时候难免因为各 种各样的情况在 componentWilMount中做一些操作，那么React为了约束开发者，干脆就抛掉了这个API</p><p><strong>2) componentWillReceiveProps</strong></p><p>在老版本的 React 中，如果组件自身的某个 state 跟其 props 密切相关的话，一直都没有一种很优雅的处理方式去更新 state，而是需要在 componentWilReceiveProps 中判断前后两个 props 是否相同，如果不同再将新的 props更新到相应的 state 上去。这样做一来会破坏 state 数据的单一数据源，导致组件状态变得不可预测，另一方面也会增加组件的重绘次数。类似的业务需求也有很多，如一个可以横向滑动的列表，当前高亮的 Tab 显然隶属于列表自身的时，根据传入的某个值，直接定位到某个 Tab。为了解决这些问题，React引入了第一个新的生命周期：getDerivedStateFromProps。它有以下的优点∶</p><ul><li>getDSFP是静态方法，在这里不能使用this，也就是一个纯函数，开发者不能写出副作用的代码</li><li>开发者只能通过prevState而不是prevProps来做对比，保证了state和props之间的简单关系以及不需要处理第一次渲染时prevProps为空的情况</li><li>基于第一点，将状态变化（setState）和昂贵操作（tabChange）区分开，更加便于 render 和 commit 阶段操作或者说优化。</li></ul><p><strong>3) componentWillUpdate</strong></p><p>与 componentWillReceiveProps 类似，许多开发者也会在 componentWillUpdate 中根据 props 的变化去触发一些回调 。 但不论是 componentWilReceiveProps 还 是 componentWilUpdate，都有可能在一次更新中被调用多次，也就是说写在这里的回调函数也有可能会被调用多次，这显然是不可取的。与 componentDidMount 类 似， componentDidUpdate 也不存在这样的问题，一次更新中 componentDidUpdate 只会被调用一次，所以将原先写在 componentWillUpdate 中 的 回 调 迁 移 至 componentDidUpdate 就可以解决这个问题。</p><p>另外一种情况则是需要获取DOM元素状态，但是由于在fber中，render可打断，可能在wilMount中获取到的元素状态很可能与实际需要的不同，这个通常可以使用第二个新增的生命函数的解决 getSnapshotBeforeUpdate(prevProps, prevState)</p><p><strong>4) getSnapshotBeforeUpdate(prevProps, prevState)</strong></p><p>返回的值作为componentDidUpdate的第三个参数。与willMount不同的是，getSnapshotBeforeUpdate会在最终确定的render执行之前执行，也就是能保证其获取到的元素状态与didUpdate中获取到的元素状态相同。参考代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//无论新增多少条新闻，保持滚动条的位置</span></span>
<span class="line"><span style="color:#e1e4e8;">import React, { Component } from &quot;react&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">import &quot;./example16.css&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">class NewsList extends Component {</span></span>
<span class="line"><span style="color:#e1e4e8;">  list = React.createRef&lt;HTMLDivElement&gt;();</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  state = { newsArr: [] };</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  componentDidMount() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    setInterval(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">      //获取原状态</span></span>
<span class="line"><span style="color:#e1e4e8;">      const { newsArr } = this.state;</span></span>
<span class="line"><span style="color:#e1e4e8;">      //模拟一条新闻</span></span>
<span class="line"><span style="color:#e1e4e8;">      const news = &quot;新闻&quot; + (newsArr.length + 1);</span></span>
<span class="line"><span style="color:#e1e4e8;">      //更新状态</span></span>
<span class="line"><span style="color:#e1e4e8;">      this.setState({ newsArr: [news, ...newsArr] });</span></span>
<span class="line"><span style="color:#e1e4e8;">    }, 1000);</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  getSnapshotBeforeUpdate() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return this.list.current.scrollHeight;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  componentDidUpdate(preProps, preState, height) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    this.list.current.scrollTop += this.list.current.scrollHeight - height;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  render() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return (</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;div className=&quot;list&quot; ref={this.list}&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">        {this.state.newsArr.map((n, index) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">          return (</span></span>
<span class="line"><span style="color:#e1e4e8;">            &lt;div key={index} className=&quot;news&quot;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">              {n}</span></span>
<span class="line"><span style="color:#e1e4e8;">            &lt;/div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">          );</span></span>
<span class="line"><span style="color:#e1e4e8;">        })}</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export default class example16 extends Component {</span></span>
<span class="line"><span style="color:#e1e4e8;">  render() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return (</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">        &lt;NewsList&gt;&lt;/NewsList&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;/&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//无论新增多少条新闻，保持滚动条的位置</span></span>
<span class="line"><span style="color:#24292e;">import React, { Component } from &quot;react&quot;;</span></span>
<span class="line"><span style="color:#24292e;">import &quot;./example16.css&quot;</span></span>
<span class="line"><span style="color:#24292e;">class NewsList extends Component {</span></span>
<span class="line"><span style="color:#24292e;">  list = React.createRef&lt;HTMLDivElement&gt;();</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  state = { newsArr: [] };</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  componentDidMount() {</span></span>
<span class="line"><span style="color:#24292e;">    setInterval(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">      //获取原状态</span></span>
<span class="line"><span style="color:#24292e;">      const { newsArr } = this.state;</span></span>
<span class="line"><span style="color:#24292e;">      //模拟一条新闻</span></span>
<span class="line"><span style="color:#24292e;">      const news = &quot;新闻&quot; + (newsArr.length + 1);</span></span>
<span class="line"><span style="color:#24292e;">      //更新状态</span></span>
<span class="line"><span style="color:#24292e;">      this.setState({ newsArr: [news, ...newsArr] });</span></span>
<span class="line"><span style="color:#24292e;">    }, 1000);</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  getSnapshotBeforeUpdate() {</span></span>
<span class="line"><span style="color:#24292e;">    return this.list.current.scrollHeight;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  componentDidUpdate(preProps, preState, height) {</span></span>
<span class="line"><span style="color:#24292e;">    this.list.current.scrollTop += this.list.current.scrollHeight - height;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  render() {</span></span>
<span class="line"><span style="color:#24292e;">    return (</span></span>
<span class="line"><span style="color:#24292e;">      &lt;div className=&quot;list&quot; ref={this.list}&gt;</span></span>
<span class="line"><span style="color:#24292e;">        {this.state.newsArr.map((n, index) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">          return (</span></span>
<span class="line"><span style="color:#24292e;">            &lt;div key={index} className=&quot;news&quot;&gt;</span></span>
<span class="line"><span style="color:#24292e;">              {n}</span></span>
<span class="line"><span style="color:#24292e;">            &lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292e;">          );</span></span>
<span class="line"><span style="color:#24292e;">        })}</span></span>
<span class="line"><span style="color:#24292e;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export default class example16 extends Component {</span></span>
<span class="line"><span style="color:#24292e;">  render() {</span></span>
<span class="line"><span style="color:#24292e;">    return (</span></span>
<span class="line"><span style="color:#24292e;">      &lt;&gt;</span></span>
<span class="line"><span style="color:#24292e;">        &lt;NewsList&gt;&lt;/NewsList&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;/&gt;</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>效果图：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d321e05d42b42899f7f5e4d26737172~tplv-k3u1fbpfcp-watermark.image?" alt="保持滚动条位置.gif"></p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>React的生命周期就介绍到这里了，只要是想从就得开始引入，慢慢的去学习新的。这样好入手一些。</p>`,110),t=[e];function c(y,E,i,d,u,g){return n(),a("div",null,t)}const r=s(o,[["render",c]]),h=Object.freeze(Object.defineProperty({__proto__:null,__pageData:l,default:r},Symbol.toStringTag,{value:"Module"}));export{h as _,l as __pageData,r as default};
