import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.12b7deed.js";const p=JSON.parse('{"title":"公交站间的距离","description":"","frontmatter":{"title":"公交站间的距离","head":[["meta",{"name":"og:title","content":"公交站间的距离 | VitePress"}]]},"headers":[],"relativePath":"algorithm/5.md","filePath":"algorithm/5.md","lastUpdated":1698918793000}'),o={name:"algorithm/5.md"},e=l(`<h2 id="题目" tabindex="-1">题目 <a class="header-anchor" href="#题目" aria-label="Permalink to &quot;题目&quot;">​</a></h2><p>环形公交路线上有  n  个站，按次序从  0  到  n - 1  进行编号。我们已知每一对相邻公交站之间的距离，distance[i]  表示编号为  i  的车站和编号为  (i + 1) % n  的车站之间的距离。</p><p>环线上的公交车都可以按顺时针和逆时针的方向行驶。</p><p>返回乘客从出发点  start  到目的地  destination  之间的最短距离。</p><p>示例 1：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">输入：distance = [1,2,3,4], start = 0, destination = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">输出：1</span></span>
<span class="line"><span style="color:#e1e4e8;">解释：公交站 0 和 1 之间的距离是 1 或 9，最小值是 1。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">输入：distance = [1,2,3,4], start = 0, destination = 1</span></span>
<span class="line"><span style="color:#24292e;">输出：1</span></span>
<span class="line"><span style="color:#24292e;">解释：公交站 0 和 1 之间的距离是 1 或 9，最小值是 1。</span></span></code></pre></div><p>示例 2：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">输入：distance = [1,2,3,4], start = 0, destination = 2</span></span>
<span class="line"><span style="color:#e1e4e8;">输出：3</span></span>
<span class="line"><span style="color:#e1e4e8;">解释：公交站 0 和 2 之间的距离是 3 或 7，最小值是 3。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">输入：distance = [1,2,3,4], start = 0, destination = 2</span></span>
<span class="line"><span style="color:#24292e;">输出：3</span></span>
<span class="line"><span style="color:#24292e;">解释：公交站 0 和 2 之间的距离是 3 或 7，最小值是 3。</span></span></code></pre></div><p>示例 3：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">输入：distance = [1,2,3,4], start = 0, destination = 3</span></span>
<span class="line"><span style="color:#e1e4e8;">输出：4</span></span>
<span class="line"><span style="color:#e1e4e8;">解释：公交站 0 和 3 之间的距离是 6 或 4，最小值是 4。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">输入：distance = [1,2,3,4], start = 0, destination = 3</span></span>
<span class="line"><span style="color:#24292e;">输出：4</span></span>
<span class="line"><span style="color:#24292e;">解释：公交站 0 和 3 之间的距离是 6 或 4，最小值是 4。</span></span></code></pre></div><p>提示：</p><ul><li>1 &lt;= n &lt;= 10^4</li><li>distance.length == n</li><li>0 &lt;= start, destination &lt; n</li><li>0 &lt;= distance[i] &lt;= 10^4</li></ul><h2 id="理解题目" tabindex="-1">理解题目 <a class="header-anchor" href="#理解题目" aria-label="Permalink to &quot;理解题目&quot;">​</a></h2><p>计算 start 到 destination 最短距离</p><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-label="Permalink to &quot;题解&quot;">​</a></h2><p>本题的实质是环形数组前缀和。 根据前缀和我们可以得到任意两点之间的顺时针距离和逆时针距离 (即使题目扩充为很多点也无所谓)， 返回两者中最小值即可。</p><h2 id="答案" tabindex="-1">答案 <a class="header-anchor" href="#答案" aria-label="Permalink to &quot;答案&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">distanceBetweenBusStops</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">distance</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">[], </span><span style="color:#FFAB70;">start</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">destination</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> total</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,s</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,min</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">Math.</span><span style="color:#B392F0;">min</span><span style="color:#E1E4E8;">(start,destination),max</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">Math.</span><span style="color:#B392F0;">max</span><span style="color:#E1E4E8;">(start,destination)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">i</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">d</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">of</span><span style="color:#E1E4E8;"> distance.</span><span style="color:#B392F0;">entries</span><span style="color:#E1E4E8;">() ){</span></span>
<span class="line"><span style="color:#E1E4E8;">        total</span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;">d</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(min </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">max){</span></span>
<span class="line"><span style="color:#E1E4E8;">            s</span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;">d</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Math.</span><span style="color:#B392F0;">min</span><span style="color:#E1E4E8;">(s,total</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">s)</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">distanceBetweenBusStops</span><span style="color:#24292E;">(</span><span style="color:#E36209;">distance</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">[], </span><span style="color:#E36209;">start</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">, </span><span style="color:#E36209;">destination</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> total</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,s</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,min</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">Math.</span><span style="color:#6F42C1;">min</span><span style="color:#24292E;">(start,destination),max</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">Math.</span><span style="color:#6F42C1;">max</span><span style="color:#24292E;">(start,destination)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">i</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">d</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">of</span><span style="color:#24292E;"> distance.</span><span style="color:#6F42C1;">entries</span><span style="color:#24292E;">() ){</span></span>
<span class="line"><span style="color:#24292E;">        total</span><span style="color:#D73A49;">+=</span><span style="color:#24292E;">d</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(min </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">max){</span></span>
<span class="line"><span style="color:#24292E;">            s</span><span style="color:#D73A49;">+=</span><span style="color:#24292E;">d</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Math.</span><span style="color:#6F42C1;">min</span><span style="color:#24292E;">(s,total</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">s)</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div>`,18),t=[e];function c(i,y,E,d,h,u){return a(),n("div",null,t)}const r=s(o,[["render",c]]),m=Object.freeze(Object.defineProperty({__proto__:null,__pageData:p,default:r},Symbol.toStringTag,{value:"Module"}));export{m as _,p as __pageData,r as default};
