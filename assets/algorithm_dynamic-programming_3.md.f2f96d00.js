import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.12b7deed.js";const l=JSON.parse('{"title":"新21点","description":"","frontmatter":{"title":"新21点","head":[["meta",{"name":"og:title","content":"新21点 | VitePress"}]]},"headers":[],"relativePath":"algorithm/dynamic-programming/3.md","filePath":"algorithm/dynamic-programming/3.md","lastUpdated":1698918793000}'),o={name:"algorithm/dynamic-programming/3.md"},e=p(`<h2 id="题目" tabindex="-1">题目 <a class="header-anchor" href="#题目" aria-label="Permalink to &quot;题目&quot;">​</a></h2><p>爱丽丝参与一个大致基于纸牌游戏 “21 点” 规则的游戏，描述如下：</p><p>爱丽丝以 0 分开始，并在她的得分少于 k 分时抽取数字。 抽取时，她从 [1, maxPts] 的范围中随机获得一个整数作为分数进行累计，其中 maxPts 是一个整数。 每次抽取都是独立的，其结果具有相同的概率。</p><p>当爱丽丝获得 k 分 或更多分 时，她就停止抽取数字。</p><p>爱丽丝的分数不超过 n 的概率是多少？</p><p>与实际答案误差不超过  10-5 的答案将被视为正确答案。</p><p>示例 1：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">输入：n = 10, k = 1, maxPts = 10</span></span>
<span class="line"><span style="color:#e1e4e8;">输出：1.00000</span></span>
<span class="line"><span style="color:#e1e4e8;">解释：爱丽丝得到一张牌，然后停止。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">输入：n = 10, k = 1, maxPts = 10</span></span>
<span class="line"><span style="color:#24292e;">输出：1.00000</span></span>
<span class="line"><span style="color:#24292e;">解释：爱丽丝得到一张牌，然后停止。</span></span></code></pre></div><p>示例 2：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">输入：n = 6, k = 1, maxPts = 10</span></span>
<span class="line"><span style="color:#e1e4e8;">输出：0.60000</span></span>
<span class="line"><span style="color:#e1e4e8;">解释：爱丽丝得到一张牌，然后停止。 在 10 种可能性中的 6 种情况下，她的得分不超过 6 分。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">输入：n = 6, k = 1, maxPts = 10</span></span>
<span class="line"><span style="color:#24292e;">输出：0.60000</span></span>
<span class="line"><span style="color:#24292e;">解释：爱丽丝得到一张牌，然后停止。 在 10 种可能性中的 6 种情况下，她的得分不超过 6 分。</span></span></code></pre></div><p>示例 3：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">输入：n = 21, k = 17, maxPts = 10</span></span>
<span class="line"><span style="color:#e1e4e8;">输出：0.73278</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">输入：n = 21, k = 17, maxPts = 10</span></span>
<span class="line"><span style="color:#24292e;">输出：0.73278</span></span></code></pre></div><p>提示：</p><ul><li>0 &lt;= k &lt;= n &lt;= 104</li><li>1 &lt;= maxPts &lt;= 104</li></ul><h2 id="理解题目" tabindex="-1">理解题目 <a class="header-anchor" href="#理解题目" aria-label="Permalink to &quot;理解题目&quot;">​</a></h2><p>首先爱丽丝的低分是 0 分，开始从【1，W】中随机抽取分数，抽取到的分数一直累加，一直累加至 K 分或者 k 分以上的时候就停止抽取分数，这个时候 K 分不超过 N 分的概率是多少</p><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-label="Permalink to &quot;题解&quot;">​</a></h2><p>想象一下，如果说我使用的是示例 3，当最大达到什么分数时还可以抽牌呢，答案是 16 ，从【1,10】中抽取任意一张牌不超过 21 的有 1,2,3,4,5，超过的有 6,7,8,9,10。所以 n=16 时，再抽取一张牌的分数不超过 21 的概率为 0.5</p><p>再看当 n=15 时，从【1,10】中抽取任意一张牌不超过 21 的有 1,2,3,4,5,6,超过的有 7,8,9,10。当抽到 1 时 n=16 还可以再抽牌，所以两次抽取的概率相乘 0.1*0.5=0.05，其他的都超过 17 了不允许再抽牌了，所以 n=15 的不超过 21 分的概率为 0.55</p><p>再看当 n=14 时，从【1,10】中抽取任意一张牌不超过 21 的有 1,2,3,4,5,6,7,超过的有 8,9,10。当抽到 1 时 n=15 概率为 0.1<em>0.55,当抽取 2 时 n=16 概率为 0.1</em>0.5 其他的都超过 17 了不允许再抽牌了，所以 n=15 的不超过 21 分的概率为 0.605</p><p>由此可以得知</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">a16 = (1+1+1+1+1+0+0+0+0+0)/10 = 1/2</span></span>
<span class="line"><span style="color:#e1e4e8;">a15 = (a16+1+1+1+1+1+0+0+0+0)/10 = 0.55</span></span>
<span class="line"><span style="color:#e1e4e8;">a14 = (a15+a16+1+1+1+1+1+0+0+0)/=0.605</span></span>
<span class="line"><span style="color:#e1e4e8;">.</span></span>
<span class="line"><span style="color:#e1e4e8;">.</span></span>
<span class="line"><span style="color:#e1e4e8;">.</span></span>
<span class="line"><span style="color:#e1e4e8;">a(x+1)=(a(x+2)+a(x+3)+......+a(x+w+1))/10</span></span>
<span class="line"><span style="color:#e1e4e8;">a(x)=(a(x+1)+a(x+2)+a(x+3)+......+a(x+w))/10</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">a16 = (1+1+1+1+1+0+0+0+0+0)/10 = 1/2</span></span>
<span class="line"><span style="color:#24292e;">a15 = (a16+1+1+1+1+1+0+0+0+0)/10 = 0.55</span></span>
<span class="line"><span style="color:#24292e;">a14 = (a15+a16+1+1+1+1+1+0+0+0)/=0.605</span></span>
<span class="line"><span style="color:#24292e;">.</span></span>
<span class="line"><span style="color:#24292e;">.</span></span>
<span class="line"><span style="color:#24292e;">.</span></span>
<span class="line"><span style="color:#24292e;">a(x+1)=(a(x+2)+a(x+3)+......+a(x+w+1))/10</span></span>
<span class="line"><span style="color:#24292e;">a(x)=(a(x+1)+a(x+2)+a(x+3)+......+a(x+w))/10</span></span></code></pre></div><p>根据<code>a(x)-a(x+1)</code>可以得出我们的状态转移方程为<code>a(x)=(a(x+1)-a(x+w+1))/10 + a(x+1)</code></p><h2 id="答案" tabindex="-1">答案 <a class="header-anchor" href="#答案" aria-label="Permalink to &quot;答案&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">new21Game</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">n</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">k</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">maxPts</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (k </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> dp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Array</span><span style="color:#E1E4E8;">(k </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> maxPts).</span><span style="color:#B392F0;">fill</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> k; i </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> n; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    dp[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  dp[k </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">1.0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> Math.</span><span style="color:#B392F0;">min</span><span style="color:#E1E4E8;">(n </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> k </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, maxPts)) </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> maxPts;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> k </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    dp[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> dp[i </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> (dp[i </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> dp[i </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> maxPts </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]) </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> maxPts;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> dp[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">new21Game</span><span style="color:#24292E;">(</span><span style="color:#E36209;">n</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">, </span><span style="color:#E36209;">k</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">, </span><span style="color:#E36209;">maxPts</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (k </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> dp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Array</span><span style="color:#24292E;">(k </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> maxPts).</span><span style="color:#6F42C1;">fill</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> k; i </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> n; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    dp[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  dp[k </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">1.0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> Math.</span><span style="color:#6F42C1;">min</span><span style="color:#24292E;">(n </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> k </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, maxPts)) </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> maxPts;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> k </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    dp[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> dp[i </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> (dp[i </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> dp[i </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> maxPts </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]) </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> maxPts;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> dp[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,25),t=[e];function c(y,E,i,d,F,m){return a(),n("div",null,t)}const r=s(o,[["render",c]]),u=Object.freeze(Object.defineProperty({__proto__:null,__pageData:l,default:r},Symbol.toStringTag,{value:"Module"}));export{u as _,l as __pageData,r as default};
