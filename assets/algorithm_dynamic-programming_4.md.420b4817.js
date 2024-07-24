import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.12b7deed.js";const l=JSON.parse('{"title":"统计字典序元音字符串的数目","description":"","frontmatter":{"title":"统计字典序元音字符串的数目","head":[["meta",{"name":"og:title","content":"统计字典序元音字符串的数目 | VitePress"}]]},"headers":[],"relativePath":"algorithm/dynamic-programming/4.md","filePath":"algorithm/dynamic-programming/4.md","lastUpdated":1698918793000}'),o={name:"algorithm/dynamic-programming/4.md"},e=p(`<h2 id="题目" tabindex="-1">题目 <a class="header-anchor" href="#题目" aria-label="Permalink to &quot;题目&quot;">​</a></h2><p>给你一个整数 n，请返回长度为 n 、仅由元音 (a, e, i, o, u) 组成且按 字典序排列 的字符串数量。</p><p>字符串 s 按 字典序排列 需要满足：对于所有有效的 i，s[i] 在字母表中的位置总是与 s[i+1] 相同或在 s[i+1] 之前。</p><p>示例 1：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">输入：n = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">输出：5</span></span>
<span class="line"><span style="color:#e1e4e8;">解释：仅由元音组成的 5 个字典序字符串为 [&quot;a&quot;,&quot;e&quot;,&quot;i&quot;,&quot;o&quot;,&quot;u&quot;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">输入：n = 1</span></span>
<span class="line"><span style="color:#24292e;">输出：5</span></span>
<span class="line"><span style="color:#24292e;">解释：仅由元音组成的 5 个字典序字符串为 [&quot;a&quot;,&quot;e&quot;,&quot;i&quot;,&quot;o&quot;,&quot;u&quot;]</span></span></code></pre></div><p>示例 2：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">输入：n = 2</span></span>
<span class="line"><span style="color:#e1e4e8;">输出：15</span></span>
<span class="line"><span style="color:#e1e4e8;">解释：仅由元音组成的 15 个字典序字符串为</span></span>
<span class="line"><span style="color:#e1e4e8;">[&quot;aa&quot;,&quot;ae&quot;,&quot;ai&quot;,&quot;ao&quot;,&quot;au&quot;,&quot;ee&quot;,&quot;ei&quot;,&quot;eo&quot;,&quot;eu&quot;,&quot;ii&quot;,&quot;io&quot;,&quot;iu&quot;,&quot;oo&quot;,&quot;ou&quot;,&quot;uu&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">注意，&quot;ea&quot; 不是符合题意的字符串，因为 &#39;e&#39; 在字母表中的位置比 &#39;a&#39; 靠后</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">输入：n = 2</span></span>
<span class="line"><span style="color:#24292e;">输出：15</span></span>
<span class="line"><span style="color:#24292e;">解释：仅由元音组成的 15 个字典序字符串为</span></span>
<span class="line"><span style="color:#24292e;">[&quot;aa&quot;,&quot;ae&quot;,&quot;ai&quot;,&quot;ao&quot;,&quot;au&quot;,&quot;ee&quot;,&quot;ei&quot;,&quot;eo&quot;,&quot;eu&quot;,&quot;ii&quot;,&quot;io&quot;,&quot;iu&quot;,&quot;oo&quot;,&quot;ou&quot;,&quot;uu&quot;]</span></span>
<span class="line"><span style="color:#24292e;">注意，&quot;ea&quot; 不是符合题意的字符串，因为 &#39;e&#39; 在字母表中的位置比 &#39;a&#39; 靠后</span></span></code></pre></div><p>示例 3：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">输入：n = 33</span></span>
<span class="line"><span style="color:#e1e4e8;">输出：66045</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">输入：n = 33</span></span>
<span class="line"><span style="color:#24292e;">输出：66045</span></span></code></pre></div><p>提示：</p><ul><li>1 &lt;= n &lt;= 50</li></ul><h2 id="理解题目" tabindex="-1">理解题目 <a class="header-anchor" href="#理解题目" aria-label="Permalink to &quot;理解题目&quot;">​</a></h2><p>给定一个长度 n，按元音字母的顺序进行组成排列的字符串，这个字符串的长度不能超过 n，而且不可以将顺序调换进行组成例如&#39;ea&#39;，最后返回组成的一种有多少种</p><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-label="Permalink to &quot;题解&quot;">​</a></h2><p>拿示例 2 来看，a 只能作为 a 自己的结尾，e 可以作为 a 和 e 的结尾，以此类推 u 可以作为所有元音的结尾了。</p><p>假设利用一个数组 dp[i]存取我们的每个元音结尾的个数，起始都是 1，那么 a 的个数就是 dp[0],e 的个数就是 dp[0]+dp[1] u 的个数就是 dp[0]+dp[1]+dp[2]+dp[3]+dp[4]</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">dp[0]=1</span></span>
<span class="line"><span style="color:#e1e4e8;">dp[1]=dp[1]+dp[0]</span></span>
<span class="line"><span style="color:#e1e4e8;">dp[2]=dp[2]+dp[1]+dp[0]</span></span>
<span class="line"><span style="color:#e1e4e8;">dp[3]=dp[3]+dp[2]+dp[1]+dp[0]</span></span>
<span class="line"><span style="color:#e1e4e8;">dp[4]=dp[4]+dp[3]+dp[2]+dp[1]+dp[0]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">dp[0]=1</span></span>
<span class="line"><span style="color:#24292e;">dp[1]=dp[1]+dp[0]</span></span>
<span class="line"><span style="color:#24292e;">dp[2]=dp[2]+dp[1]+dp[0]</span></span>
<span class="line"><span style="color:#24292e;">dp[3]=dp[3]+dp[2]+dp[1]+dp[0]</span></span>
<span class="line"><span style="color:#24292e;">dp[4]=dp[4]+dp[3]+dp[2]+dp[1]+dp[0]</span></span></code></pre></div><p>而组成的数量是当 1 到 n 时的 dp 内数组次数的相加，因为我们的下标是从 0 开始的，如果我们是 n=2 的话，这样我们就会遍历了 3 次，就会出现长度为 3 的字符串，但是需要的是长度为 2 的字符串，所以我们需要从下标为 1 开始。</p><p>所以状态转移方程是<code>dp[i] = dp[i]+dp[i-1]+...+dp[0]</code></p><h2 id="答案" tabindex="-1">答案 <a class="header-anchor" href="#答案" aria-label="Permalink to &quot;答案&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">countVowelStrings</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">n</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> dp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Array</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">fill</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> n; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> j </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">; j </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; j</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 字母j（从u开始）</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> k </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> j </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">; k </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; k</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 字母 j 前面的字母都可以用 j 当作结尾</span></span>
<span class="line"><span style="color:#E1E4E8;">        dp[j] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> dp[j] </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> dp[k];</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> num </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> dp.</span><span style="color:#B392F0;">reduce</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> b);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> num;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">countVowelStrings</span><span style="color:#24292E;">(</span><span style="color:#E36209;">n</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> dp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Array</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">fill</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> n; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> j </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">; j </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; j</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 字母j（从u开始）</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> k </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> j </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">; k </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; k</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 字母 j 前面的字母都可以用 j 当作结尾</span></span>
<span class="line"><span style="color:#24292E;">        dp[j] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> dp[j] </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> dp[k];</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> num </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> dp.</span><span style="color:#6F42C1;">reduce</span><span style="color:#24292E;">((</span><span style="color:#E36209;">a</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> b);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> num;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,21),t=[e];function c(y,E,i,u,d,q){return a(),n("div",null,t)}const r=s(o,[["render",c]]),F=Object.freeze(Object.defineProperty({__proto__:null,__pageData:l,default:r},Symbol.toStringTag,{value:"Module"}));export{F as _,l as __pageData,r as default};
