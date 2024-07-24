import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.12b7deed.js";const l=JSON.parse('{"title":"React Hooks 大丰收！","description":"","frontmatter":{"title":"React Hooks 大丰收！","head":[["meta",{"name":"og:title","content":"React Hooks 大丰收！ | VitePress"}]]},"headers":[],"relativePath":"react/hooks.md","filePath":"react/hooks.md","lastUpdated":1698918793000}'),p={name:"react/hooks.md"},t=e(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>React 除了类组件还有函数式组件，函数式组件中并没有类式组件的生命周期等特性的函数，但是我们需要使用的时候要怎么办呢？别担心有办法解决。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c01d04be48441948a454267b08b077d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>以上图片内容来自 React 官网。看我们这个<code>useState</code>就很像类式组件的<code>state</code>和<code>setState</code>的组合使用。</p><p>接下来逐一介绍 <strong>9 种 React Hook</strong></p><h2 id="usestate" tabindex="-1">useState <a class="header-anchor" href="#usestate" aria-label="Permalink to &quot;useState&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">state</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">setState</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useState</span><span style="color:#E1E4E8;">(initialState);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">state</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">setState</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useState</span><span style="color:#24292E;">(initialState);</span></span></code></pre></div><blockquote><p>当我们使用  <code>useState</code>  定义 state 变量时候，它返回一个有两个值的数组。第一个值是当前的 state，第二个值是更新 state 的函数。</p></blockquote><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React, { useState } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">example2</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">React</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">FunctionComponentElement</span><span style="color:#E1E4E8;">&lt;{}&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">count</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">setCount</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useState</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">change</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setCount</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">count</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> count </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FFAB70;">Count</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">{</span><span style="color:#FFAB70;">count</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">button onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{change}</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">增加</span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">button</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React, { useState } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">example2</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">React</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">FunctionComponentElement</span><span style="color:#24292E;">&lt;{}&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">count</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">setCount</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useState</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">change</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setCount</span><span style="color:#24292E;">((</span><span style="color:#E36209;">count</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> count </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#E36209;">Count</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">{</span><span style="color:#E36209;">count</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">button onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{change}</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">增加</span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">button</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;/&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="所谓-state-产生的闭包" tabindex="-1">所谓 State 产生的闭包 <a class="header-anchor" href="#所谓-state-产生的闭包" aria-label="Permalink to &quot;所谓 State 产生的闭包&quot;">​</a></h3><p>关于 useState 产生的闭包，我们来看这样一段代码:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React, { useState } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">example2</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">React</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">FunctionComponentElement</span><span style="color:#E1E4E8;">&lt;{}&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">count</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">setCount</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useState</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">change</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setCount</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">count</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> count </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getCount</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(count);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }, </span><span style="color:#79B8FF;">2000</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">div style</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{{ </span><span style="color:#B392F0;">margin</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;40px&quot;</span><span style="color:#E1E4E8;"> }}</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FFAB70;">Count</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">{</span><span style="color:#FFAB70;">count</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">div style</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{{ </span><span style="color:#B392F0;">marginTop</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;20px&quot;</span><span style="color:#E1E4E8;"> }}</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">&lt;/</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">button onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{change}</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">增加</span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">button</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">button onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{getCount}</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">获取Count的值</span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">button</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React, { useState } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">example2</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">React</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">FunctionComponentElement</span><span style="color:#24292E;">&lt;{}&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">count</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">setCount</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useState</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">change</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setCount</span><span style="color:#24292E;">((</span><span style="color:#E36209;">count</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> count </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getCount</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(count);</span></span>
<span class="line"><span style="color:#24292E;">    }, </span><span style="color:#005CC5;">2000</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">div style</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{{ </span><span style="color:#6F42C1;">margin</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;40px&quot;</span><span style="color:#24292E;"> }}</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">Count</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">{</span><span style="color:#E36209;">count</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">div style</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{{ </span><span style="color:#6F42C1;">marginTop</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;20px&quot;</span><span style="color:#24292E;"> }}</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">&lt;/</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">button onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{change}</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">增加</span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">button</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">button onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{getCount}</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">获取Count的值</span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">button</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;/&gt;</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div align="center"><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf671a5bd2e4401da498cf3bd7467d20~tplv-k3u1fbpfcp-watermark.image"></div><p>页面上会渲染:</p><ul><li>一个增加 Button ， 当我们点击 Button 时 count 的值会递增加一。</li><li>一个获取 Count 值 Button， 当我们点击 Button 标签时定时器会在 2s 后打印出 count 的值。</li></ul><p>接下来让我们进行这样的操作:</p><p>先点击获取 Count 的值 Button，然后快速点击三次增加 Button。</p><p>效果图：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4507ff62ce0a484dab9eef50cd4e4c41~tplv-k3u1fbpfcp-watermark.image?" alt="useState闭包问题.gif"></p><p>此时 count 的值在页面上已经更新为 4 ，但是在 2s 后的 setTimeout 中打印仍然会是 1。</p><p><strong>其实当 DemoState 函数每次运行我们都称他为每一次渲染，每一次渲染函数内部都拥有自己独立的 props 和 state,当在 jsx 中调用代码中的 state 进行渲染时，每一次渲染都会获得各自渲染作用域内的 props 和 state 。</strong></p><p>所以当定时器触发生时，拿到的 count 因为闭包原因是 getCount 函数第一次渲染时内部的 count 值，alert 的结果为 0 也就不足为奇了。</p><blockquote><p>如果你对这里的基础内容仍然还是存在不解，可以移步<a href="https://juejin.cn/post/6996171186719686693" title="https://juejin.cn/post/6996171186719686693" target="_blank" rel="noreferrer">细说 React 中的 useRef</a>。</p></blockquote><h3 id="所谓批量更新原则" tabindex="-1">所谓批量更新原则 <a class="header-anchor" href="#所谓批量更新原则" aria-label="Permalink to &quot;所谓批量更新原则&quot;">​</a></h3><p>熟悉 React 的同学都清楚所谓 state 的变化 React 内部遵循的是<strong>批量更新</strong>原则。</p><p><strong>所谓异步批量是指在一次页面更新中如果涉及多次 state 修改时，会合并多次 state 修改的结果得到最终结果从而进行一次页面更新。</strong></p><p>关于批量更新原则也仅仅在<strong>合成事件</strong>中通过开启 isBatchUpdating 状态才会开启批量更新，简单来说&quot;</p><ol><li><strong>凡是<code>React</code>可以管控的地方，他就是异步批量更新</strong>。比如事件函数，生命周期函数中，组件内部同步代码。</li><li><strong>凡是<code>React</code>不能管控的地方，就是同步批量更新</strong>。比如<code>setTimeout</code>,<code>setInterval</code>,<code>源生DOM</code>事件中，<strong>包括<code>Promise</code>中</strong>都是同步批量更新。</li></ol><blockquote><p>在 React 18 中通过 createRoot 中对外部事件处理程序进行批量处理，换句话说最新的 React 中关于 setTimeout、setInterval 等不能管控的地方都变为了批量更新。</p></blockquote><blockquote><p>关于合成事件与批量更新，你可以移步<a href="https://juejin.cn/post/7000742887583383583" title="https://juejin.cn/post/7000742887583383583" target="_blank" rel="noreferrer">深入挖掘 React 中的 state</a>这篇文章。</p></blockquote><h3 id="实现-usesetstate" tabindex="-1">实现 useSetState <a class="header-anchor" href="#实现-usesetstate" aria-label="Permalink to &quot;实现 useSetState&quot;">​</a></h3><p>在 Class Component 中的 this.setState 中支持传入<strong>合并传入 setState 参数</strong>，在 useState 中如果传入 object 类型会发生覆盖。</p><p>假使我们需要在 useState 中实现这个需求，我们可以通过额外封装一个 useSetState Hook 去实现:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { useCallback, useState } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">function useSetState&lt;T extends {}&gt;(</span></span>
<span class="line"><span style="color:#e1e4e8;">  initialState: T = {} as T</span></span>
<span class="line"><span style="color:#e1e4e8;">): [T, (patch: Partial&lt;T&gt; | ((prevState: T) =&gt; Partial&lt;T&gt;)) =&gt; void] {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const [state, set] = useState&lt;T&gt;(initialState);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  const setState = useCallback((patch) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    set((preState) =&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      Object.assign(</span></span>
<span class="line"><span style="color:#e1e4e8;">        {},</span></span>
<span class="line"><span style="color:#e1e4e8;">        preState,</span></span>
<span class="line"><span style="color:#e1e4e8;">        typeof patch === &#39;function&#39; ? patch(preState) : patch</span></span>
<span class="line"><span style="color:#e1e4e8;">      )</span></span>
<span class="line"><span style="color:#e1e4e8;">    );</span></span>
<span class="line"><span style="color:#e1e4e8;">  }, []);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  return [state, setState];</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export default useSetState;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { useCallback, useState } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">function useSetState&lt;T extends {}&gt;(</span></span>
<span class="line"><span style="color:#24292e;">  initialState: T = {} as T</span></span>
<span class="line"><span style="color:#24292e;">): [T, (patch: Partial&lt;T&gt; | ((prevState: T) =&gt; Partial&lt;T&gt;)) =&gt; void] {</span></span>
<span class="line"><span style="color:#24292e;">  const [state, set] = useState&lt;T&gt;(initialState);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  const setState = useCallback((patch) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    set((preState) =&gt;</span></span>
<span class="line"><span style="color:#24292e;">      Object.assign(</span></span>
<span class="line"><span style="color:#24292e;">        {},</span></span>
<span class="line"><span style="color:#24292e;">        preState,</span></span>
<span class="line"><span style="color:#24292e;">        typeof patch === &#39;function&#39; ? patch(preState) : patch</span></span>
<span class="line"><span style="color:#24292e;">      )</span></span>
<span class="line"><span style="color:#24292e;">    );</span></span>
<span class="line"><span style="color:#24292e;">  }, []);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  return [state, setState];</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export default useSetState;</span></span></code></pre></div><h2 id="useeffect" tabindex="-1">useEffect <a class="header-anchor" href="#useeffect" aria-label="Permalink to &quot;useEffect&quot;">​</a></h2><p>useEffect 被称为副作用钩子，这个 Hook 和 useState 一样是一个基础钩子。Effect Hook  可以让你在函数组件中执行副作用操作。</p><p>useEffect Hook 支持两个参数，第一个参数为一个函数表示副作用效应函数，默认情况下它在第一次渲染之后和每次更新之后都会执行。</p><p>第二个参数是一个数组，指定了第一个参数（副效应函数）的依赖项。只有该数组中的变量发生变化时，副效应函数才会执行。</p><blockquote><p>关于 useEffect 这个 Hook ，更多基础用法你可以查阅<a href="https://link.juejin.cn?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fhooks-effect.html" title="https://zh-hans.reactjs.org/docs/hooks-effect.html" target="_blank" rel="noreferrer">React 官方文档</a>，文档中关于 useEffect 的内容还是比较全面的，我就不累赘了。</p></blockquote><h3 id="实现-useupdateeffect" tabindex="-1">实现 useUpdateEffect <a class="header-anchor" href="#实现-useupdateeffect" aria-label="Permalink to &quot;实现 useUpdateEffect&quot;">​</a></h3><p>在 Class 组件中存在 componentDidUpdate 生命周期。它会在更新后会被立即调用，首次渲染不会执行此方法。</p><p>在 Function Component 中我们可以借助 useEffect 额外封装实现 componentDidUpdate 的功能:</p><p>首先我们可以通过 useRef 实现一个判断是否是首次渲染的 Hook:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { useRef } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export function useFirstMountState(): boolean {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const isFirst = useRef(true);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  if (isFirst.current) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    isFirst.current = false;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    return true;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  return isFirst.current;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { useRef } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export function useFirstMountState(): boolean {</span></span>
<span class="line"><span style="color:#24292e;">  const isFirst = useRef(true);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  if (isFirst.current) {</span></span>
<span class="line"><span style="color:#24292e;">    isFirst.current = false;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    return true;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  return isFirst.current;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>如果你还不是特别了解 useRef 的作用，没关系我会带你在后边详细了解它的机制。这里你仅需要了解这个 useFirstMountState 这个 hook 会在组件首次渲染时返回 true ， 其余时候返回 false。</p><p>接下来就很简单了，借助 useFirstMountState 我们可以判断是否是页面首次渲染。那么仅需要在 Effect 中判断是否是首次更新即可:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { useEffect } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">import { useFirstMountState } from &#39;./useFirstMountState&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const useUpdateEffect: typeof useEffect = (effect, deps) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const isFirstMount = useFirstMountState();</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  useEffect(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (!isFirstMount) {</span></span>
<span class="line"><span style="color:#e1e4e8;">      return effect();</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }, deps);</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export default useUpdateEffect;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { useEffect } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;">import { useFirstMountState } from &#39;./useFirstMountState&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const useUpdateEffect: typeof useEffect = (effect, deps) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  const isFirstMount = useFirstMountState();</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  useEffect(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    if (!isFirstMount) {</span></span>
<span class="line"><span style="color:#24292e;">      return effect();</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  }, deps);</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export default useUpdateEffect;</span></span></code></pre></div><h2 id="usecontext" tabindex="-1">useContext <a class="header-anchor" href="#usecontext" aria-label="Permalink to &quot;useContext&quot;">​</a></h2><p>Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。</p><p>熟悉 React 中 Context Api 和 Vue 中的 provide/inject Api 的同学可能会对这个钩子的作用深有体会。</p><p>假设这样一种场景:</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16afb234389648928c25f05d59f742fb~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"></p><p>在根级别组件上我们需要向下传递一个用户名 username 的属性给每一个子组件进行使用。</p><p>此时，如果使用 props 的方法进行层层传递那么无疑是一种噩梦。而且如果我们的 G 组件需要使用 username 但是 B、E 并不需要，如果使用 props 的方法难免在 B、E 组件内部也要显式声明 username。</p><p>React 中正是为了解决这样的场景提出来 Context Api。</p><p>可以通过 React.createContext 创建 context 对象，在跟组件中通过 Context.Provider 的 value 属性进行传递 username ，从而在 Function Component 中使用 useContext(Context) 获取对应的值。</p><blockquote><p>useContext(MyContext)  只是让你能够读取  context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用  &lt;MyContext.Provider&gt;  来为下层组件提供  context。</p></blockquote><blockquote><p>关于 Context &amp;&amp; useContext 详细的用法可以<a href="https://link.juejin.cn?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fcontext.html" title="https://zh-hans.reactjs.org/docs/context.html" target="_blank" rel="noreferrer">查看这里</a>，具体 API 在官网中已经给予了非常全面的说明。</p></blockquote><h2 id="usereducer" tabindex="-1">useReducer <a class="header-anchor" href="#usereducer" aria-label="Permalink to &quot;useReducer&quot;">​</a></h2><p>上边我们提到过基础的状态管理钩子 useState ，在 React Hook 中额外提供了一个关于状态管理的 useReducer。</p><h3 id="usereducer-用法" tabindex="-1">useReducer 用法 <a class="header-anchor" href="#usereducer-用法" aria-label="Permalink to &quot;useReducer 用法&quot;">​</a></h3><p><code>const [state, dispatch] = useReducer(reducer, initialArg, init);</code></p><p>useReducer 接受三个参数分别是 reducer 函数、初始值 initialArg 以及一个可选的惰性初始化的 init 函数。</p><p>它接收一个形如  <code>(state, action) =&gt; newState</code>  的 reducer，并返回当前的 state 以及与其配套的  <code>dispatch</code>  方法。</p><p>让我们通过一个简单的计数器例子来了解一下它的基础用法:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { useReducer } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">interface IState {</span></span>
<span class="line"><span style="color:#e1e4e8;">  count: number;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">interface IAction {</span></span>
<span class="line"><span style="color:#e1e4e8;">  type: &#39;add&#39; | &#39;subtract&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">  payload: number;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const initialState: IState = { count: 0 };</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const reducer = (state: IState, action: IAction) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  switch (action.type) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    case &#39;add&#39;:</span></span>
<span class="line"><span style="color:#e1e4e8;">      return { count: state.count + action.payload };</span></span>
<span class="line"><span style="color:#e1e4e8;">    case &#39;subtract&#39;:</span></span>
<span class="line"><span style="color:#e1e4e8;">      return { count: state.count - action.payload };</span></span>
<span class="line"><span style="color:#e1e4e8;">    default:</span></span>
<span class="line"><span style="color:#e1e4e8;">      throw new Error(&#39;Illegal operation in reducer.&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">function Counter() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const [state, dispatch] = useReducer(reducer, initialState);</span></span>
<span class="line"><span style="color:#e1e4e8;">  return (</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;h1&gt;Hello , My name is 19Qingfeng.&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;p&gt;Counter: {state.count}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;p&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">        &lt;button onClick={() =&gt; dispatch({ type: &#39;add&#39;, payload: 1 })}&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">          add 1!</span></span>
<span class="line"><span style="color:#e1e4e8;">        &lt;/button&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;/p&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;p&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">        &lt;button onClick={() =&gt; dispatch({ type: &#39;subtract&#39;, payload: 1 })}&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">          subtract 1!</span></span>
<span class="line"><span style="color:#e1e4e8;">        &lt;/button&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;/p&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;/&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  );</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export default Counter;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { useReducer } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">interface IState {</span></span>
<span class="line"><span style="color:#24292e;">  count: number;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">interface IAction {</span></span>
<span class="line"><span style="color:#24292e;">  type: &#39;add&#39; | &#39;subtract&#39;;</span></span>
<span class="line"><span style="color:#24292e;">  payload: number;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const initialState: IState = { count: 0 };</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const reducer = (state: IState, action: IAction) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  switch (action.type) {</span></span>
<span class="line"><span style="color:#24292e;">    case &#39;add&#39;:</span></span>
<span class="line"><span style="color:#24292e;">      return { count: state.count + action.payload };</span></span>
<span class="line"><span style="color:#24292e;">    case &#39;subtract&#39;:</span></span>
<span class="line"><span style="color:#24292e;">      return { count: state.count - action.payload };</span></span>
<span class="line"><span style="color:#24292e;">    default:</span></span>
<span class="line"><span style="color:#24292e;">      throw new Error(&#39;Illegal operation in reducer.&#39;);</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">function Counter() {</span></span>
<span class="line"><span style="color:#24292e;">  const [state, dispatch] = useReducer(reducer, initialState);</span></span>
<span class="line"><span style="color:#24292e;">  return (</span></span>
<span class="line"><span style="color:#24292e;">    &lt;&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;h1&gt;Hello , My name is 19Qingfeng.&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;p&gt;Counter: {state.count}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;p&gt;</span></span>
<span class="line"><span style="color:#24292e;">        &lt;button onClick={() =&gt; dispatch({ type: &#39;add&#39;, payload: 1 })}&gt;</span></span>
<span class="line"><span style="color:#24292e;">          add 1!</span></span>
<span class="line"><span style="color:#24292e;">        &lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;p&gt;</span></span>
<span class="line"><span style="color:#24292e;">        &lt;button onClick={() =&gt; dispatch({ type: &#39;subtract&#39;, payload: 1 })}&gt;</span></span>
<span class="line"><span style="color:#24292e;">          subtract 1!</span></span>
<span class="line"><span style="color:#24292e;">        &lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;/&gt;</span></span>
<span class="line"><span style="color:#24292e;">  );</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export default Counter;</span></span></code></pre></div><p>这里我们创建了一个简单的 Counter 计数器组件，内部通过 useReducer 管理 couter 的状态。</p><blockquote><p>你可以在<a href="https://link.juejin.cn?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Felastic-kilby-x3kco" title="https://codesandbox.io/s/elastic-kilby-x3kco" target="_blank" rel="noreferrer">这里</a>来体验这个计数器小例子。</p></blockquote><h3 id="usestate-usereducer" tabindex="-1">useState &amp; useReducer <a class="header-anchor" href="#usestate-usereducer" aria-label="Permalink to &quot;useState &amp; useReducer&quot;">​</a></h3><p>上边的计数器小例子我们其实通过 setState 完全也可以实现，大部分同学在写 component 时应该有存在这样一个疑问:</p><p>「什么时候使用 useState 又什么时候使用 useReducer ，useReducer 相比 useState 存在什么优势/不足呢？」</p><p>其实在日常大多数情况下使用 useState 完全可以满足日常开发的作用，毕竟如果对于一个简单的操作如果使用 action -&gt; reducer -&gt; store 这种方式去管理状态实在是有点大材小用。</p><p>关于状态管理究竟是使用 useState 还是 useReducer 绝大多数文章会告诉你 useReducer 适用于复杂的状态逻辑。</p><p>没错，日常应用中我我也是这样使用的，存在多种复杂状态管理时利用 reducer 函数根据不同 action 去派发状态更新。</p><p>但是话又说回来如果某个 state 下存在很多操作状态，每个操作都有很多逻辑，对于这样复杂的状态，使用 useState 拥有单独的功能管理相比 reducer 中单个函数中的多个不同动作也许会更加清晰一些。</p><p>关于「什么时候使用 useState 又什么时候使用 useReducer」，在我个人看来这两种方式的使用更像是一种取舍<strong>总而言之尽量使用你觉得舒服的方法，对你和同事来说更容易理解就可以了。</strong></p><h3 id="深更新的组件做性能优化" tabindex="-1">深更新的组件做性能优化 <a class="header-anchor" href="#深更新的组件做性能优化" aria-label="Permalink to &quot;深更新的组件做性能优化&quot;">​</a></h3><p>在 useReducer 的官方文档中存在这样一句介绍:</p><blockquote><p>并且，使用  <code>useReducer</code>  还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递  <code>dispatch</code>  而不是回调函数</p></blockquote><p>在某些场景下我们通常会将函数作为 props 传递到 child component 中去，这样的话，每次父组件 re-render 时即使我们并没有修改当作 props 的函数，子组件也会重新渲染。</p><p>我们来一起看一下这个例子:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 父组件</span></span>
<span class="line"><span style="color:#e1e4e8;">import { useState } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">import ChildComponent from &#39;./Child&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">function ParentComponent() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const [count, setCount] = useState(0);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  const callback = () =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 10;</span></span>
<span class="line"><span style="color:#e1e4e8;">  };</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  return (</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;h3&gt;Hello This is Parent Component!&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;p&gt;ParentCount: {count}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;Click Me!&lt;/button&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;br /&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;ChildComponent callback={callback} /&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  );</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export default ParentComponent;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 父组件</span></span>
<span class="line"><span style="color:#24292e;">import { useState } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;">import ChildComponent from &#39;./Child&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">function ParentComponent() {</span></span>
<span class="line"><span style="color:#24292e;">  const [count, setCount] = useState(0);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  const callback = () =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    return 10;</span></span>
<span class="line"><span style="color:#24292e;">  };</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  return (</span></span>
<span class="line"><span style="color:#24292e;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;h3&gt;Hello This is Parent Component!&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;p&gt;ParentCount: {count}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;Click Me!&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;br /&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;ChildComponent callback={callback} /&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292e;">  );</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export default ParentComponent;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 子组件</span></span>
<span class="line"><span style="color:#e1e4e8;">import React, { FC, useEffect } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">interface Props {</span></span>
<span class="line"><span style="color:#e1e4e8;">  callback?: () =&gt; number;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const ChildComponent: FC&lt;Props&gt; = ({ callback }) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  useEffect(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    alert(&#39;child re-render&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">  }, [callback]);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  return (</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;h1&gt;Hello This is Child Component&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;p&gt;{callback &amp;&amp; callback()}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;/&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  );</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export default ChildComponent;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 子组件</span></span>
<span class="line"><span style="color:#24292e;">import React, { FC, useEffect } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">interface Props {</span></span>
<span class="line"><span style="color:#24292e;">  callback?: () =&gt; number;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const ChildComponent: FC&lt;Props&gt; = ({ callback }) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  useEffect(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    alert(&#39;child re-render&#39;);</span></span>
<span class="line"><span style="color:#24292e;">  }, [callback]);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  return (</span></span>
<span class="line"><span style="color:#24292e;">    &lt;&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;h1&gt;Hello This is Child Component&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;p&gt;{callback &amp;&amp; callback()}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;/&gt;</span></span>
<span class="line"><span style="color:#24292e;">  );</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export default ChildComponent;</span></span></code></pre></div><p>这里我们在父组件中传递给子组件一个 callback 函数作为 props ，当我们点击页面上的按钮来看看会发生什么:</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d77cc16dc3e475b857dd52ce85996dc~tplv-k3u1fbpfcp-zoom-1.image" alt="QQ20211219-144858-HD.gif"></p><p>每次点击父组件的 button 时，子组件中的 effect 中被执行了。</p><p>此时其实我们传入子组件的 callback 并没有做什么改变，我们自然期望子组件中的 Effect 不会执行。</p><blockquote><p>产生这个原因的机制是 React 每次渲染都会重新执行组件函数，当重新执行父组件时会重新生成一个 callback 函数。因为 React 内部使用 Object.is 判断，所以 React 会认为子组件的 props 发生了变化。</p></blockquote><blockquote><p>你可以点击这里查看<a href="https://link.juejin.cn?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Fblue-wave-r5qs5" title="https://codesandbox.io/s/blue-wave-r5qs5" target="_blank" rel="noreferrer"> CodeSanBox 例子</a></p></blockquote><p><strong>而在 useReduce 中返回的 dispatch 正是一个函数，但是 useReducer 的好处之一便是， dispatch 不会随着 re-render 而重新分配记忆位置，比方上述我们将 dispatch 作为 props 传入 child component 中时子组件中的 Effect 也并不会被执行。</strong></p><p>有兴趣的同学可以私下自己去尝试下，当然使用 useCallback 包括我们上述 Demo 中父组件的函数也是可以达到相同的效果，但是如此也就意味着說我们有非常多的 callback 需要绑在  useCallback  里边，这也许并不是一件好事。</p><h2 id="usecallback" tabindex="-1">useCallback <a class="header-anchor" href="#usecallback" aria-label="Permalink to &quot;useCallback&quot;">​</a></h2><p>接下来我们来聊一聊 useCallback ，它的最大作用体现在 React 中的性能优化。</p><p>老样子，我们先来看看基础用法:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">const memoizedCallback = useCallback(</span></span>
<span class="line"><span style="color:#e1e4e8;">  () =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    doSomething(a, b);</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  [a, b],</span></span>
<span class="line"><span style="color:#e1e4e8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">const memoizedCallback = useCallback(</span></span>
<span class="line"><span style="color:#24292e;">  () =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    doSomething(a, b);</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  [a, b],</span></span>
<span class="line"><span style="color:#24292e;">);</span></span></code></pre></div><p>useCallback 接受两个参数:</p><ul><li>第一个参数是一个函数，这个函数仅会在对应依赖项发生变化之后才会被重新生成，或者说这个函数被产生「记忆」。</li><li>第二个参数是一个数组，它表示第一个参数所依赖的依赖项，仅在该数组中某一项发生变化时第一个参数的函数才会「清除记忆」重新生成。</li></ul><p>也许大多数接触 React 的朋友会好奇这个 Hook 的使用场景，此时让我们来回忆一下在 useReducer 章节讲到的例子。</p><p>我们在父组件中传递了一个 callback 函数作为 props 传递给了子组件，每次渲染中我们并没有改变 callback 但是每次父组件 re-render ，React 仍然会认为 callback 发生变化从而造成多余的子组件 re-render 。</p><p>如果忘记了这个例子的朋友可以翻到 useReducer 环节重新温习一下。</p><p>此时，使用 useCallback 就可以很好的解决这个例子。</p><p>让我们稍微来改造一下上边父组件中的代码:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { useCallback, useState } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">import ChildComponent from &#39;./Child&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">function ParentComponent() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const [count, setCount] = useState(0);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  // 这里我们使用了 useCallback 进行包裹</span></span>
<span class="line"><span style="color:#e1e4e8;">  const callback = useCallback(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 10;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }, []);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  return (</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;h3&gt;Hello This is Parent Component!&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;p&gt;ParentCount: {count}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;Click Me!&lt;/button&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;br /&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;ChildComponent callback={callback} /&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  );</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export default ParentComponent;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { useCallback, useState } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;">import ChildComponent from &#39;./Child&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">function ParentComponent() {</span></span>
<span class="line"><span style="color:#24292e;">  const [count, setCount] = useState(0);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  // 这里我们使用了 useCallback 进行包裹</span></span>
<span class="line"><span style="color:#24292e;">  const callback = useCallback(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    return 10;</span></span>
<span class="line"><span style="color:#24292e;">  }, []);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  return (</span></span>
<span class="line"><span style="color:#24292e;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;h3&gt;Hello This is Parent Component!&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;p&gt;ParentCount: {count}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;Click Me!&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;br /&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;ChildComponent callback={callback} /&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292e;">  );</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export default ParentComponent;</span></span></code></pre></div><p>可以看到我们使用 useCallback 包裹了传入子组件的回调函数，同时第二个依赖项参数传递一个空数组。</p><p>此时我们来看看页面的展示效果:</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87043eedba8e402ea9b7d24e8991e8e7~tplv-k3u1fbpfcp-zoom-1.image" alt="QQ20211219-161720-HD.gif"></p><p>此时即使我们多次点击按钮，子组件的 Effect 也并不会执行了。</p><blockquote><p>你可以点击<a href="https://link.juejin.cn?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Fkind-wood-0l7k6%3Ffile%3D%2Fsrc%2FParent.tsx" title="https://codesandbox.io/s/kind-wood-0l7k6?file=/src/Parent.tsx" target="_blank" rel="noreferrer">这里查看 CodeSanBox。</a></p></blockquote><h2 id="usememo" tabindex="-1">useMemo <a class="header-anchor" href="#usememo" aria-label="Permalink to &quot;useMemo&quot;">​</a></h2><h3 id="usememo-作用" tabindex="-1">useMemo 作用 <a class="header-anchor" href="#usememo-作用" aria-label="Permalink to &quot;useMemo 作用&quot;">​</a></h3><p>如果说 useCallback 是 React 团队提供给开发者作为对于函数的优化手段，那么 useMemo 就可以看作用于「记忆」值从而带来性能优化。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">const memoizedValue = useMemo(() =&gt; computeExpensiveValue(a, b), [a, b]);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">const memoizedValue = useMemo(() =&gt; computeExpensiveValue(a, b), [a, b]);</span></span></code></pre></div><p>useMemo 同样是作为性能优化提供的 Hook ，它相比 useCallback 来说支持任意类型的值都可以被记忆。</p><p>同样它支持两个参数:</p><ul><li>第一参数接受传入一个函数，传入的函数调用返回值会被「记忆」。仅仅当依赖项发生变化时，传入的函数才会重新执行计算新的返回结果。</li><li>第二个参数同样也是一个数组，它表示第一个参数对应的依赖项。</li></ul><p>我们来看这样一个例子:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import React, { useState } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const data = [</span></span>
<span class="line"><span style="color:#e1e4e8;">  { name: &#39;数学&#39;, id: 0 },</span></span>
<span class="line"><span style="color:#e1e4e8;">  { name: &#39;语文&#39;, id: 1 },</span></span>
<span class="line"><span style="color:#e1e4e8;">  { name: &#39;英语&#39;, id: 2 },</span></span>
<span class="line"><span style="color:#e1e4e8;">  { name: &#39;化学&#39;, id: 3 },</span></span>
<span class="line"><span style="color:#e1e4e8;">  { name: &#39;生物&#39;, id: 4 },</span></span>
<span class="line"><span style="color:#e1e4e8;">];</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">function Demo(): React.ReactElement {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const [count, setCount] = useState(0);</span></span>
<span class="line"><span style="color:#e1e4e8;">  const renderSubject = (() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;Recalculate renderSubject !&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">    return data.map((i) =&gt; &lt;li key={i.id}&gt;{i.name}&lt;/li&gt;);</span></span>
<span class="line"><span style="color:#e1e4e8;">  })();</span></span>
<span class="line"><span style="color:#e1e4e8;">  return (</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;p&gt;count: {count}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;Click Me !&lt;/button&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;br /&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;h1&gt;科目:&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;ul&gt;{renderSubject}&lt;/ul&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  );</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export default Demo;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import React, { useState } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const data = [</span></span>
<span class="line"><span style="color:#24292e;">  { name: &#39;数学&#39;, id: 0 },</span></span>
<span class="line"><span style="color:#24292e;">  { name: &#39;语文&#39;, id: 1 },</span></span>
<span class="line"><span style="color:#24292e;">  { name: &#39;英语&#39;, id: 2 },</span></span>
<span class="line"><span style="color:#24292e;">  { name: &#39;化学&#39;, id: 3 },</span></span>
<span class="line"><span style="color:#24292e;">  { name: &#39;生物&#39;, id: 4 },</span></span>
<span class="line"><span style="color:#24292e;">];</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">function Demo(): React.ReactElement {</span></span>
<span class="line"><span style="color:#24292e;">  const [count, setCount] = useState(0);</span></span>
<span class="line"><span style="color:#24292e;">  const renderSubject = (() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;Recalculate renderSubject !&#39;);</span></span>
<span class="line"><span style="color:#24292e;">    return data.map((i) =&gt; &lt;li key={i.id}&gt;{i.name}&lt;/li&gt;);</span></span>
<span class="line"><span style="color:#24292e;">  })();</span></span>
<span class="line"><span style="color:#24292e;">  return (</span></span>
<span class="line"><span style="color:#24292e;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;p&gt;count: {count}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;Click Me !&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;br /&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;h1&gt;科目:&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;ul&gt;{renderSubject}&lt;/ul&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292e;">  );</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export default Demo;</span></span></code></pre></div><p>当我们每次点击 button 组件 re-render 时，renderSubject 的值都会重新计算也就是说每次都会打印出 <code>Recalculate renderSubject !</code>。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c66cdbcbdab74e2987103c66bf389ca3~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>此时让我们在换成 useMemo 包裹 renderSubject ,告诉 React 「记忆」 renderSubject 的值再重新试一试:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import React, { useMemo, useState } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const data = [</span></span>
<span class="line"><span style="color:#e1e4e8;">  { name: &#39;数学&#39;, id: 0 },</span></span>
<span class="line"><span style="color:#e1e4e8;">  { name: &#39;语文&#39;, id: 1 },</span></span>
<span class="line"><span style="color:#e1e4e8;">  { name: &#39;英语&#39;, id: 2 },</span></span>
<span class="line"><span style="color:#e1e4e8;">  { name: &#39;化学&#39;, id: 3 },</span></span>
<span class="line"><span style="color:#e1e4e8;">  { name: &#39;生物&#39;, id: 4 },</span></span>
<span class="line"><span style="color:#e1e4e8;">];</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">function Demo(): React.ReactElement {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const [count, setCount] = useState(0);</span></span>
<span class="line"><span style="color:#e1e4e8;">  const renderSubject = useMemo(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return (() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">      console.log(&#39;Recalculate renderSubject !&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">      return data.map((i) =&gt; &lt;li key={i.id}&gt;{i.name}&lt;/li&gt;);</span></span>
<span class="line"><span style="color:#e1e4e8;">    })();</span></span>
<span class="line"><span style="color:#e1e4e8;">  }, []);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  return (</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;p&gt;count: {count}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;Click Me !&lt;/button&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;br /&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;h1&gt;科目:&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;ul&gt;{renderSubject}&lt;/ul&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  );</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export default Demo;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import React, { useMemo, useState } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const data = [</span></span>
<span class="line"><span style="color:#24292e;">  { name: &#39;数学&#39;, id: 0 },</span></span>
<span class="line"><span style="color:#24292e;">  { name: &#39;语文&#39;, id: 1 },</span></span>
<span class="line"><span style="color:#24292e;">  { name: &#39;英语&#39;, id: 2 },</span></span>
<span class="line"><span style="color:#24292e;">  { name: &#39;化学&#39;, id: 3 },</span></span>
<span class="line"><span style="color:#24292e;">  { name: &#39;生物&#39;, id: 4 },</span></span>
<span class="line"><span style="color:#24292e;">];</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">function Demo(): React.ReactElement {</span></span>
<span class="line"><span style="color:#24292e;">  const [count, setCount] = useState(0);</span></span>
<span class="line"><span style="color:#24292e;">  const renderSubject = useMemo(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    return (() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">      console.log(&#39;Recalculate renderSubject !&#39;);</span></span>
<span class="line"><span style="color:#24292e;">      return data.map((i) =&gt; &lt;li key={i.id}&gt;{i.name}&lt;/li&gt;);</span></span>
<span class="line"><span style="color:#24292e;">    })();</span></span>
<span class="line"><span style="color:#24292e;">  }, []);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  return (</span></span>
<span class="line"><span style="color:#24292e;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;p&gt;count: {count}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;Click Me !&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;br /&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;h1&gt;科目:&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;ul&gt;{renderSubject}&lt;/ul&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292e;">  );</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export default Demo;</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/940fdbe71d2c48a99311dfef30d2fa37~tplv-k3u1fbpfcp-zoom-1.image" alt="QQ20211219-212306-HD.gif"></p><p>此时当我们点击页面上的 button 时，count 发生变化页面 re-render 时，因为我们使用 useMemo 传入的函数中返回 <code>data.map((i) =&gt; &lt;li key={i.id}&gt;{i.name}&lt;/li&gt;)</code> 并且第二个参数是一个空数组。</p><p>无论页面如何 re-render ，只要依赖项不发生变化那么 useMemo 中返回的值就不会重新计算。</p><blockquote><p>文章中的示例代码为了展示 Hook 的作用故意设计如此的，这里大家理解需要表达的意义即可。</p></blockquote><h3 id="关于性能优化我想说的事" tabindex="-1">关于性能优化我想说的事 <a class="header-anchor" href="#关于性能优化我想说的事" aria-label="Permalink to &quot;关于性能优化我想说的事&quot;">​</a></h3><p>关于 useCallback 以及 useMemo 这两个 Hook 都是 React 提供给开发者作为性能优化手段的方法。</p><p><strong>但是大多数时候，你不需要考虑去优化不必要的重新渲染</strong>。 React 是非常快的，我能想到你可以利用时间去做很多事情，比起做这些类似的优化要好得多。</p><p>对于 useCallback 和 useMemo 来说，我个人认为不合理的利用这两个 Hook 不仅仅会使代码更加复杂，同时有可能会通过调用内置的 Hook 防止依赖项和 memoized 的值被垃圾回收从而导致性能变差。</p><p>如果说，有些情况下比如交互特别复杂的图表、动画之类，使用这两个 Hook 可以使你获得了必要的性能收益，那么这些成本都是值得承担的，但<strong>最好使用之前先测量一下</strong>。</p><blockquote><p>官方文档指出，<a href="https://link.juejin.cn/?target=https%3A%2F%2Freactjs.org%2Fdocs%2Fhooks-faq.html%23are-hooks-slow-because-of-creating-functions-in-render" title="https://link.juejin.cn/?target=https%3A%2F%2Freactjs.org%2Fdocs%2Fhooks-faq.html%23are-hooks-slow-because-of-creating-functions-in-render" target="_blank" rel="noreferrer">无需担心创建函数会导致性能问题</a>。我们上述提供的例子仅仅是为了向大家展示它们的用法，实际场景下非常不建议这样使用。</p></blockquote><blockquote><p>关于 useCallback 、 useMemo 的误区用法，你可以查看这篇文章<a href="https://juejin.cn/post/6847902217261809671#heading-3" title="https://juejin.cn/post/6847902217261809671#heading-3" target="_blank" rel="noreferrer">useCallback/useMemo 的使用误区</a></p></blockquote><h2 id="useref" tabindex="-1">useRef <a class="header-anchor" href="#useref" aria-label="Permalink to &quot;useRef&quot;">​</a></h2><p>useRef Hook 的作用主要有两个:</p><ul><li>多次渲染之间保证唯一值的纽带。</li></ul><p>useRef 会在所有的 render 中保持对返回值的唯一引用。因为所有对<code>ref</code>的赋值和取值拿到的都是最终的状态，并不会因为不同的 render 中存在不同的隔离。</p><p>这点我们在开头的 useEffect Hook 中就已经展示了它的示例，判断是否是由于页面更新而非首次渲染:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { useRef } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">export function useFirstMountState(): boolean {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const isFirst = useRef(true);</span></span>
<span class="line"><span style="color:#e1e4e8;">  if (isFirst.current) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    isFirst.current = false;</span></span>
<span class="line"><span style="color:#e1e4e8;">    return true;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">  return isFirst.current;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { useRef } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;">export function useFirstMountState(): boolean {</span></span>
<span class="line"><span style="color:#24292e;">  const isFirst = useRef(true);</span></span>
<span class="line"><span style="color:#24292e;">  if (isFirst.current) {</span></span>
<span class="line"><span style="color:#24292e;">    isFirst.current = false;</span></span>
<span class="line"><span style="color:#24292e;">    return true;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">  return isFirst.current;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>获取 Dom 元素，在 Function Component 中我们可以通过 useRef 来获取对应的 Dom 元素。</li></ul><blockquote><p>关于 useRef 的作用和用法，我在这篇<a href="https://juejin.cn/post/6996171186719686693" title="https://juejin.cn/post/6996171186719686693" target="_blank" rel="noreferrer">[细说 Reac t 中的 useRef] 做了详尽说明。</a>，你可以点击链接查看。</p></blockquote><h2 id="useimperativehandle" tabindex="-1">useImperativeHandle <a class="header-anchor" href="#useimperativehandle" aria-label="Permalink to &quot;useImperativeHandle&quot;">​</a></h2><p>useImperativeHandle 这个 Hook 很多同学日常可能用的不是很多，但是在某些情况下它会帮助我们实现一些意向不到的效果。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">useImperativeHandle(ref, createHandle, [deps])</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">useImperativeHandle(ref, createHandle, [deps])</span></span></code></pre></div><ul><li>ref 表示需要被赋值的 ref 对象。</li><li>createHandle 函数的返回值作为 ref.current 的值。</li><li>deps 依赖数组，依赖发生变化会重新执行 createHandle 函数。</li></ul><blockquote><p>useImperativeHandle   可以让你在使用  ref  时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle  应当与  <a href="https://link.juejin.cn?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Freact-api.html%23reactforwardref" title="https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref" target="_blank" rel="noreferrer">forwardRef</a>  一起使用。</p></blockquote><p>我们来看这样一个例子:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import React, {</span></span>
<span class="line"><span style="color:#e1e4e8;">  ForwardRefRenderFunction,</span></span>
<span class="line"><span style="color:#e1e4e8;">  useImperativeHandle,</span></span>
<span class="line"><span style="color:#e1e4e8;">  forwardRef,</span></span>
<span class="line"><span style="color:#e1e4e8;">  useRef,</span></span>
<span class="line"><span style="color:#e1e4e8;">} from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">interface Props {</span></span>
<span class="line"><span style="color:#e1e4e8;">  name: string;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const Input: ForwardRefRenderFunction&lt;{ focus: () =&gt; void }, Props&gt; = (</span></span>
<span class="line"><span style="color:#e1e4e8;">  props,</span></span>
<span class="line"><span style="color:#e1e4e8;">  ref</span></span>
<span class="line"><span style="color:#e1e4e8;">) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const inputRef = useRef&lt;HTMLInputElement&gt;(null);</span></span>
<span class="line"><span style="color:#e1e4e8;">  useImperativeHandle(</span></span>
<span class="line"><span style="color:#e1e4e8;">    ref,</span></span>
<span class="line"><span style="color:#e1e4e8;">    () =&gt; ({</span></span>
<span class="line"><span style="color:#e1e4e8;">      focus: () =&gt; inputRef.current?.focus(),</span></span>
<span class="line"><span style="color:#e1e4e8;">    }),</span></span>
<span class="line"><span style="color:#e1e4e8;">    []</span></span>
<span class="line"><span style="color:#e1e4e8;">  );</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  return (</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;input ref={inputRef}&gt;&lt;/input&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  );</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const ExportInput = forwardRef(Input);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export default ExportInput;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import React, {</span></span>
<span class="line"><span style="color:#24292e;">  ForwardRefRenderFunction,</span></span>
<span class="line"><span style="color:#24292e;">  useImperativeHandle,</span></span>
<span class="line"><span style="color:#24292e;">  forwardRef,</span></span>
<span class="line"><span style="color:#24292e;">  useRef,</span></span>
<span class="line"><span style="color:#24292e;">} from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">interface Props {</span></span>
<span class="line"><span style="color:#24292e;">  name: string;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const Input: ForwardRefRenderFunction&lt;{ focus: () =&gt; void }, Props&gt; = (</span></span>
<span class="line"><span style="color:#24292e;">  props,</span></span>
<span class="line"><span style="color:#24292e;">  ref</span></span>
<span class="line"><span style="color:#24292e;">) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  const inputRef = useRef&lt;HTMLInputElement&gt;(null);</span></span>
<span class="line"><span style="color:#24292e;">  useImperativeHandle(</span></span>
<span class="line"><span style="color:#24292e;">    ref,</span></span>
<span class="line"><span style="color:#24292e;">    () =&gt; ({</span></span>
<span class="line"><span style="color:#24292e;">      focus: () =&gt; inputRef.current?.focus(),</span></span>
<span class="line"><span style="color:#24292e;">    }),</span></span>
<span class="line"><span style="color:#24292e;">    []</span></span>
<span class="line"><span style="color:#24292e;">  );</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  return (</span></span>
<span class="line"><span style="color:#24292e;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;input ref={inputRef}&gt;&lt;/input&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292e;">  );</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const ExportInput = forwardRef(Input);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export default ExportInput;</span></span></code></pre></div><p>在上边的例子中，我们利用 useImperativeHandle 函数包括了外部传入的 ref 对象。</p><p>我们规定当外部通过 ref 获取该组件实例时，仅向外暴露出了个一个 focus 方法。</p><p>这正好对应了我们上边所提到的通过 useImperativeHandle  让你在使用  ref  时自定义暴露给父组件的实例值。</p><p>当然，在日常 React 开发中可能会存在这样一种情况。<strong>我们希望在父组件中调用子组件的方法</strong>，虽然 React 官方并不推荐这样声明式的写法，但是有时候我们不得不这样做。</p><p>我们稍微来改写一些上边的例子:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import React, {</span></span>
<span class="line"><span style="color:#e1e4e8;">  ForwardRefRenderFunction,</span></span>
<span class="line"><span style="color:#e1e4e8;">  useImperativeHandle,</span></span>
<span class="line"><span style="color:#e1e4e8;">  forwardRef,</span></span>
<span class="line"><span style="color:#e1e4e8;">  useRef,</span></span>
<span class="line"><span style="color:#e1e4e8;">} from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">interface Props {</span></span>
<span class="line"><span style="color:#e1e4e8;">  name: string;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export interface InputExportMethod {</span></span>
<span class="line"><span style="color:#e1e4e8;">  focus: () =&gt; void;</span></span>
<span class="line"><span style="color:#e1e4e8;">  domeSomeThing: () =&gt; void;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const Input: ForwardRefRenderFunction&lt;InputExportMethod, Props&gt; = (</span></span>
<span class="line"><span style="color:#e1e4e8;">  props,</span></span>
<span class="line"><span style="color:#e1e4e8;">  ref</span></span>
<span class="line"><span style="color:#e1e4e8;">) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const inputRef = useRef&lt;HTMLInputElement&gt;(null);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  // 子组件方法</span></span>
<span class="line"><span style="color:#e1e4e8;">  const domeSomeThing = () =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    // dosomething</span></span>
<span class="line"><span style="color:#e1e4e8;">    console.log(&#39;do smething&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">  };</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  useImperativeHandle(</span></span>
<span class="line"><span style="color:#e1e4e8;">    ref,</span></span>
<span class="line"><span style="color:#e1e4e8;">    () =&gt; ({</span></span>
<span class="line"><span style="color:#e1e4e8;">      focus: () =&gt; inputRef.current?.focus(),</span></span>
<span class="line"><span style="color:#e1e4e8;">      domeSomeThing: () =&gt; domeSomeThing(),</span></span>
<span class="line"><span style="color:#e1e4e8;">    }),</span></span>
<span class="line"><span style="color:#e1e4e8;">    []</span></span>
<span class="line"><span style="color:#e1e4e8;">  );</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  return (</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;input ref={inputRef}&gt;&lt;/input&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  );</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const ExportInput = forwardRef(Input);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export default ExportInput;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import React, {</span></span>
<span class="line"><span style="color:#24292e;">  ForwardRefRenderFunction,</span></span>
<span class="line"><span style="color:#24292e;">  useImperativeHandle,</span></span>
<span class="line"><span style="color:#24292e;">  forwardRef,</span></span>
<span class="line"><span style="color:#24292e;">  useRef,</span></span>
<span class="line"><span style="color:#24292e;">} from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">interface Props {</span></span>
<span class="line"><span style="color:#24292e;">  name: string;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export interface InputExportMethod {</span></span>
<span class="line"><span style="color:#24292e;">  focus: () =&gt; void;</span></span>
<span class="line"><span style="color:#24292e;">  domeSomeThing: () =&gt; void;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const Input: ForwardRefRenderFunction&lt;InputExportMethod, Props&gt; = (</span></span>
<span class="line"><span style="color:#24292e;">  props,</span></span>
<span class="line"><span style="color:#24292e;">  ref</span></span>
<span class="line"><span style="color:#24292e;">) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  const inputRef = useRef&lt;HTMLInputElement&gt;(null);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  // 子组件方法</span></span>
<span class="line"><span style="color:#24292e;">  const domeSomeThing = () =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    // dosomething</span></span>
<span class="line"><span style="color:#24292e;">    console.log(&#39;do smething&#39;);</span></span>
<span class="line"><span style="color:#24292e;">  };</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  useImperativeHandle(</span></span>
<span class="line"><span style="color:#24292e;">    ref,</span></span>
<span class="line"><span style="color:#24292e;">    () =&gt; ({</span></span>
<span class="line"><span style="color:#24292e;">      focus: () =&gt; inputRef.current?.focus(),</span></span>
<span class="line"><span style="color:#24292e;">      domeSomeThing: () =&gt; domeSomeThing(),</span></span>
<span class="line"><span style="color:#24292e;">    }),</span></span>
<span class="line"><span style="color:#24292e;">    []</span></span>
<span class="line"><span style="color:#24292e;">  );</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  return (</span></span>
<span class="line"><span style="color:#24292e;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;input ref={inputRef}&gt;&lt;/input&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292e;">  );</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const ExportInput = forwardRef(Input);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export default ExportInput;</span></span></code></pre></div><p>此时我可以在使用 Input 的父组件中通过 ref 调用到子组件通过 useImperativeHandle 暴露出的方法:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import React, { useEffect, useRef } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">import Input, { InputExportMethod } from &#39;./index&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">const Parent: React.FC = () =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const inputRef = useRef&lt;InputExportMethod&gt;(null);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  useEffect(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (inputRef.current) {</span></span>
<span class="line"><span style="color:#e1e4e8;">      console.log(inputRef.current.domeSomeThing());</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }, []);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  return &lt;Input ref={inputRef} name=&quot;19Qingfeng&quot;&gt;&lt;/Input&gt;;</span></span>
<span class="line"><span style="color:#e1e4e8;">};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export default Parent;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import React, { useEffect, useRef } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;">import Input, { InputExportMethod } from &#39;./index&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">const Parent: React.FC = () =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  const inputRef = useRef&lt;InputExportMethod&gt;(null);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  useEffect(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    if (inputRef.current) {</span></span>
<span class="line"><span style="color:#24292e;">      console.log(inputRef.current.domeSomeThing());</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  }, []);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  return &lt;Input ref={inputRef} name=&quot;19Qingfeng&quot;&gt;&lt;/Input&gt;;</span></span>
<span class="line"><span style="color:#24292e;">};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export default Parent;</span></span></code></pre></div><p>此时当我们打开页面就会发现控制台成功的打印出:</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5f96ece06a14a28b07b10c147099da2~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"></p><h2 id="uselayouteffect" tabindex="-1">useLayoutEffect <a class="header-anchor" href="#uselayouteffect" aria-label="Permalink to &quot;useLayoutEffect&quot;">​</a></h2><p>useLayoutEffect 与 useEffect 使用方式是完全一致的，useLayoutEffect 的区别在于它会在所有的 DOM 变更之后同步调用 effect。</p><p>可以使用它来读取 DOM 布局并同步触发重渲染。在<strong>浏览器执行绘制之前</strong>， useLayoutEffect  内部的更新计划将被同步刷新。</p><p>通常对于一些通过 JS 计算的布局，如果你想减少 useEffect 带来的「页面抖动」,你可以考虑使用 useLayoutEffect 来代替它。</p><p>来看看这样一段代码:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import React, { useEffect, useRef, useState } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">function Demo() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const ref = useRef&lt;HTMLDivElement&gt;(null);</span></span>
<span class="line"><span style="color:#e1e4e8;">  const [style, setStyle] = useState&lt;React.CSSProperties&gt;({</span></span>
<span class="line"><span style="color:#e1e4e8;">    position: &#39;absolute&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    top: &#39;200px&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    background: &#39;blue&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  });</span></span>
<span class="line"><span style="color:#e1e4e8;">  useEffect(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    for (let i = 0; i &lt; 1000; i++) {</span></span>
<span class="line"><span style="color:#e1e4e8;">      console.log(i);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (ref.current) {</span></span>
<span class="line"><span style="color:#e1e4e8;">      const { width, height, top, left } = ref.current.getBoundingClientRect();</span></span>
<span class="line"><span style="color:#e1e4e8;">      setStyle({</span></span>
<span class="line"><span style="color:#e1e4e8;">        width: width + &#39;px&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        height: height + &#39;px&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        top: top + &#39;px&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        left: left + &#39;px&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      });</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }, []);</span></span>
<span class="line"><span style="color:#e1e4e8;">  return (</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;div</span></span>
<span class="line"><span style="color:#e1e4e8;">        ref={ref}</span></span>
<span class="line"><span style="color:#e1e4e8;">        style={{ width: &#39;200px&#39;, height: &#39;200px&#39;, margin: &#39;30px&#39; }}</span></span>
<span class="line"><span style="color:#e1e4e8;">      &gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">        Hello</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;div style={{ ...style, position: &#39;absolute&#39; }}&gt; This is 19Qingfeng.&lt;/div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  );</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export default Demo;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import React, { useEffect, useRef, useState } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">function Demo() {</span></span>
<span class="line"><span style="color:#24292e;">  const ref = useRef&lt;HTMLDivElement&gt;(null);</span></span>
<span class="line"><span style="color:#24292e;">  const [style, setStyle] = useState&lt;React.CSSProperties&gt;({</span></span>
<span class="line"><span style="color:#24292e;">    position: &#39;absolute&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    top: &#39;200px&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    background: &#39;blue&#39;,</span></span>
<span class="line"><span style="color:#24292e;">  });</span></span>
<span class="line"><span style="color:#24292e;">  useEffect(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    for (let i = 0; i &lt; 1000; i++) {</span></span>
<span class="line"><span style="color:#24292e;">      console.log(i);</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    if (ref.current) {</span></span>
<span class="line"><span style="color:#24292e;">      const { width, height, top, left } = ref.current.getBoundingClientRect();</span></span>
<span class="line"><span style="color:#24292e;">      setStyle({</span></span>
<span class="line"><span style="color:#24292e;">        width: width + &#39;px&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        height: height + &#39;px&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        top: top + &#39;px&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        left: left + &#39;px&#39;,</span></span>
<span class="line"><span style="color:#24292e;">      });</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  }, []);</span></span>
<span class="line"><span style="color:#24292e;">  return (</span></span>
<span class="line"><span style="color:#24292e;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;div</span></span>
<span class="line"><span style="color:#24292e;">        ref={ref}</span></span>
<span class="line"><span style="color:#24292e;">        style={{ width: &#39;200px&#39;, height: &#39;200px&#39;, margin: &#39;30px&#39; }}</span></span>
<span class="line"><span style="color:#24292e;">      &gt;</span></span>
<span class="line"><span style="color:#24292e;">        Hello</span></span>
<span class="line"><span style="color:#24292e;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;div style={{ ...style, position: &#39;absolute&#39; }}&gt; This is 19Qingfeng.&lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292e;">  );</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export default Demo;</span></span></code></pre></div><p>这里我们使用了 useEffect 在页面刷新后重新计算了 This is 19Qingfeng. 这个 div 的位置。</p><blockquote><p>大多数情况下刷新浏览器你可能得不到任何感知，让我们来降低浏览器 CPU 速率试试再来试试。</p></blockquote><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b41a17277b384d9392aa649ad5c5a543~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"></p><p>这里我在 chrome performance 下降低了 CPU 速率，此时让我们再来看看效果:</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/595083f232f443469836f04dd181e305~tplv-k3u1fbpfcp-zoom-1.image" alt="QQ20211220-201523-HD.gif"></p><p>上边的 gif 中明显可以看到页面最初有一个蓝色 div 在跳动，而且通过 performance 分析明显可以看到使用 useEffect 页面出现了闪烁:</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/212a750296314cfcb53a1ec3e3fac665~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"></p><p>如果我们将 useEffect 更换称为 useLayoutEffect ，那么页面 useLayoutEffect 中的内容会在页面渲染前进行同步更新，有兴趣的同学可以私下自己验证一下。</p><blockquote><p>当然 React 中所有的 Hook 都是 JS 脚本计算，如果你曾经碰到过在 Hook 中获取到不正确的页面元素位置时，或许这篇<a href="https://juejin.cn/post/7017807404645482504" title="https://juejin.cn/post/7017807404645482504" target="_blank" rel="noreferrer">一次 useEffect 引发浏览器执行机制的思考</a>会帮你解惑。</p></blockquote><p>当然 useLayoutEffect 的使用还存在一些特殊情况:</p><p>有时你可能需要使用另外一个情况下使用 useLayoutEffect ，而不是   useEffect ，<strong>如果你要更新的值（像 ref ），此时你需要确保它是在最新的任何其他代码运行之前</strong>。例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">const ref = React.useRef()</span></span>
<span class="line"><span style="color:#e1e4e8;">React.useEffect(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  ref.current = &#39;some value&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// then, later in another hook or something</span></span>
<span class="line"><span style="color:#e1e4e8;">React.useLayoutEffect(() =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  console.log(ref.current) // &lt;-- this logs an old value because this runs first!</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">const ref = React.useRef()</span></span>
<span class="line"><span style="color:#24292e;">React.useEffect(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  ref.current = &#39;some value&#39;</span></span>
<span class="line"><span style="color:#24292e;">})</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// then, later in another hook or something</span></span>
<span class="line"><span style="color:#24292e;">React.useLayoutEffect(() =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">  console.log(ref.current) // &lt;-- this logs an old value because this runs first!</span></span>
<span class="line"><span style="color:#24292e;">})</span></span></code></pre></div><p>在这种特殊情况下，使用 useLayoutEffect 是一个非常不错的解决方案。</p><blockquote><p>本质上还是 useLayoutEffect 的实现是基于 micro ，而 Effect 是基于 macro ，所以 useLayoutEffect 会在页面更新前去执行。</p></blockquote><h2 id="usedebugvalue" tabindex="-1">useDebugValue <a class="header-anchor" href="#usedebugvalue" aria-label="Permalink to &quot;useDebugValue&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">useDebugValue(value , fn)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">useDebugValue(value , fn)</span></span></code></pre></div><p>useDebugValue   可用于在 React 开发者工具中显示自定义 hook 的标签，它接受两个参数:</p><ul><li>value 为我们要重点关注的变量，该参数表示在 DevTools 中显示的 hook 标志。</li><li>fn 表明如何格式化变量 value , 该函数只有在 Hook 被检查时才会被调用。它接受 debug 值作为参数，并且会返回一个格式化的显示值。</li></ul><p>当我们自定义一些 Hook 时，可以通过 useDebugValue 配合 React DevTools 快速定位我们自己定义的 Hook。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import { useDebugValue, useState } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">function useName() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const [state] = useState(&#39;19Qingfeng&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">  useDebugValue(&#39;19Qingfeng&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">  return state;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">function App() {</span></span>
<span class="line"><span style="color:#e1e4e8;">  const name = useName();</span></span>
<span class="line"><span style="color:#e1e4e8;">  return &lt;div&gt;{name}&lt;/div&gt;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import { useDebugValue, useState } from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">function useName() {</span></span>
<span class="line"><span style="color:#24292e;">  const [state] = useState(&#39;19Qingfeng&#39;);</span></span>
<span class="line"><span style="color:#24292e;">  useDebugValue(&#39;19Qingfeng&#39;);</span></span>
<span class="line"><span style="color:#24292e;">  return state;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">function App() {</span></span>
<span class="line"><span style="color:#24292e;">  const name = useName();</span></span>
<span class="line"><span style="color:#24292e;">  return &lt;div&gt;{name}&lt;/div&gt;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>这段代码中我通过 useDebug 定义了一个 19Qingfeng 的标示，此时我们来查看一下 React DevTools :</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adea376925394eef8e2e07d92f1c1493~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png"></p><p>需要额外注意的是:</p><ul><li>useDebugValue 应该在自定义 hook 中使用，如果直接在组件内使用是无效的。</li><li>大部分情况下你不需要使用这个 Hook ，除非你在编写一些公共库的 Hook 时，显式标志该 Hook。</li></ul><p>2、如果使用 useDebugValue，最好设置第 2 个参数，用于每次检查时格式化第一个参数。</p>`,188),o=[t];function c(i,y,u,d,g,E){return n(),a("div",null,o)}const r=s(p,[["render",c]]),h=Object.freeze(Object.defineProperty({__proto__:null,__pageData:l,default:r},Symbol.toStringTag,{value:"Module"}));export{h as _,l as __pageData,r as default};
