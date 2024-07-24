import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.12b7deed.js";const p=JSON.parse('{"title":"讲一下断点续传方法的实现","description":"","frontmatter":{"title":"讲一下断点续传方法的实现","head":[["meta",{"name":"og:title","content":"讲一下断点续传方法的实现 | VitePress"}]]},"headers":[],"relativePath":"other/breakpoint-continuation.md","filePath":"other/breakpoint-continuation.md","lastUpdated":1698918793000}'),o={name:"other/breakpoint-continuation.md"},e=l(`<h2 id="原理" tabindex="-1">原理 <a class="header-anchor" href="#原理" aria-label="Permalink to &quot;原理&quot;">​</a></h2><p>js将大文件分成多分，全部上传成功之后，调用合并接口合成文件。如果传输中断，下次上传的时候过滤掉已经上传成功的分片，将剩余的分片上传，成功之后合并文件。</p><h2 id="文件切片" tabindex="-1">文件切片 <a class="header-anchor" href="#文件切片" aria-label="Permalink to &quot;文件切片&quot;">​</a></h2><p>首先我们要将大文件进行切片，大致的步骤如下：</p><ul><li>提供默认切片大小根据文件大小计算该文件一共有多少片</li><li>利用是<code>spark-md5</code>,去创建一个计算<code>ArrayBuffer</code>的对象，获取文件的MD5值，这个就跟人的身份证一样，是唯一的标识。</li><li>创建一个<code>fileReader</code>对象,在读取完成时触发<code>onload</code>是将每一个切片<code>spark.append</code>增量计算md5，一直将所有的切片<code>append</code>完后，结束，<code>spark.end()</code>就是最后文件的MD5hash值<code>(即fileHash)</code></li><li>通过一个上传切片接口携带<code>fileHash</code>,将所有切片上传。将所有已经上传成功的切片对应的切片下标值存入<code>localstorage</code>中</li><li>最后通过一个合并接口告诉服务端将所有的切片合并</li></ul><h2 id="前端整体代码" tabindex="-1">前端整体代码 <a class="header-anchor" href="#前端整体代码" aria-label="Permalink to &quot;前端整体代码&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> axios </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;axios&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">baseURL</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;http://localhost:3001&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">controller</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AbortController</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">uploadFile</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">url</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">formData</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">onUploadProgress</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> { }) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">axios</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    method: </span><span style="color:#9ECBFF;">&#39;post&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    url,</span></span>
<span class="line"><span style="color:#E1E4E8;">    baseURL,</span></span>
<span class="line"><span style="color:#E1E4E8;">    signal: controller.signal,</span></span>
<span class="line"><span style="color:#E1E4E8;">    headers: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;Content-Type&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;multipart/form-data&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    data: formData,</span></span>
<span class="line"><span style="color:#E1E4E8;">    onUploadProgress</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mergeChunks</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">url</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">axios</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    method: </span><span style="color:#9ECBFF;">&#39;post&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    url,</span></span>
<span class="line"><span style="color:#E1E4E8;">    baseURL,</span></span>
<span class="line"><span style="color:#E1E4E8;">    headers: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;Content-Type&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;application/json&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    data</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> axios </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;axios&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">baseURL</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;http://localhost:3001&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">controller</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AbortController</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">uploadFile</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">url</span><span style="color:#24292E;">, </span><span style="color:#E36209;">formData</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">onUploadProgress</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> { }) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">axios</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    method: </span><span style="color:#032F62;">&#39;post&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    url,</span></span>
<span class="line"><span style="color:#24292E;">    baseURL,</span></span>
<span class="line"><span style="color:#24292E;">    signal: controller.signal,</span></span>
<span class="line"><span style="color:#24292E;">    headers: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;Content-Type&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;multipart/form-data&#39;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    data: formData,</span></span>
<span class="line"><span style="color:#24292E;">    onUploadProgress</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mergeChunks</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">url</span><span style="color:#24292E;">, </span><span style="color:#E36209;">data</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">axios</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    method: </span><span style="color:#032F62;">&#39;post&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    url,</span></span>
<span class="line"><span style="color:#24292E;">    baseURL,</span></span>
<span class="line"><span style="color:#24292E;">    headers: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;Content-Type&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;application/json&#39;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    data</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import { computed, ref } from &quot;vue&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">import * as SparkMD5 from &quot;spark-md5&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">import { uploadFile, mergeChunks, controller } from &quot;./request&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 默认分块大小</span></span>
<span class="line"><span style="color:#E1E4E8;">const DefualtChunkSize = 5 * 1024 * 1024;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 当前处理文件</span></span>
<span class="line"><span style="color:#E1E4E8;">const currFile = ref({});</span></span>
<span class="line"><span style="color:#E1E4E8;">// 当前文件分块</span></span>
<span class="line"><span style="color:#E1E4E8;">const fileChunkList = ref([]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 文件变化</span></span>
<span class="line"><span style="color:#E1E4E8;">const fileChange = async (event) =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  const [file] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> event.target.files;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">file) return;</span></span>
<span class="line"><span style="color:#E1E4E8;">  currFile.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> file;</span></span>
<span class="line"><span style="color:#E1E4E8;">  fileChunkList.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">  let { fileHash } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getFileChunk</span><span style="color:#E1E4E8;">(file);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">uploadChunks</span><span style="color:#E1E4E8;">(fileHash);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 用来测试已经中断上传的</span></span>
<span class="line"><span style="color:#E1E4E8;">let num = 0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 上传请求</span></span>
<span class="line"><span style="color:#E1E4E8;">const uploadChunks = (fileHash) =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  const requests </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fileChunkList.value.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">index</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">uploadedIndex</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> localStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(fileHash)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">uploadedArray</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> uploadedIndex </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> uploadedIndex.</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;-&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(uploadedArray.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">index</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">)) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">formData</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FormData</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    formData.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">currFile</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">value</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">name</span><span style="color:#9ECBFF;">}-\${</span><span style="color:#E1E4E8;">fileHash</span><span style="color:#9ECBFF;">}-\${</span><span style="color:#E1E4E8;">index</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">, item.chunk);</span></span>
<span class="line"><span style="color:#E1E4E8;">    formData.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;filename&quot;</span><span style="color:#E1E4E8;">, currFile.value.name);</span></span>
<span class="line"><span style="color:#E1E4E8;">    formData.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hash&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">fileHash</span><span style="color:#9ECBFF;">}-\${</span><span style="color:#E1E4E8;">index</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    formData.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;fileHash&quot;</span><span style="color:#E1E4E8;">, fileHash);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">uploadFile</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/upload&#39;</span><span style="color:#E1E4E8;">, formData, </span><span style="color:#B392F0;">onUploadProgress</span><span style="color:#E1E4E8;">(item)).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">      num </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">uploadedIndex</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> localStorage.</span><span style="color:#B392F0;">getItem</span><span style="color:#E1E4E8;">(fileHash)</span></span>
<span class="line"><span style="color:#E1E4E8;">      localStorage.</span><span style="color:#B392F0;">setItem</span><span style="color:#E1E4E8;">(fileHash,uploadedIndex</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">uploadedIndex</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&#39;-&#39;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">index</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">index)</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(uploadedIndex,index,num)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// if(num === 4){</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">//   controller.abort()</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// }</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">all</span><span style="color:#E1E4E8;">(requests).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 合并请求</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">mergeChunks</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/mergeChunks&#39;</span><span style="color:#E1E4E8;">, { size: DefualtChunkSize, filename: currFile.value.name }).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(res)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(res.data.data.code </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2000</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        localStorage.</span><span style="color:#B392F0;">removeItem</span><span style="color:#E1E4E8;">(fileHash)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 获取文件分块</span></span>
<span class="line"><span style="color:#E1E4E8;">const getFileChunk = (file, chunkSize = DefualtChunkSize) =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  return </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">resovle</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> blobSlice </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">File</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.slice </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">File</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.mozSlice </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">File</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">.webkitSlice,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 计算该文件一共有多少个分片</span></span>
<span class="line"><span style="color:#E1E4E8;">      chunks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Math.</span><span style="color:#B392F0;">ceil</span><span style="color:#E1E4E8;">(file.size </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> chunkSize),</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 当前分片</span></span>
<span class="line"><span style="color:#E1E4E8;">      currentChunk </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 创建一个spark md5计算arraybuffer的对象，获取文件的md5的值，作为唯一标识</span></span>
<span class="line"><span style="color:#E1E4E8;">      spark </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> SparkMD5.</span><span style="color:#B392F0;">ArrayBuffer</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 创建一个fileReader对象</span></span>
<span class="line"><span style="color:#E1E4E8;">      fileReader </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FileReader</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    fileReader.</span><span style="color:#B392F0;">onload</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">//当前的分片和总分片可以了解当前上传的进度</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// console.log(&#39;read chunk nr&#39;, currentChunk + 1, &#39;of&#39;);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">chunk</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> e.target.result;</span></span>
<span class="line"><span style="color:#E1E4E8;">      spark.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(chunk);</span></span>
<span class="line"><span style="color:#E1E4E8;">      currentChunk</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (currentChunk </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> chunks) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 当前分片的md5 hash值</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// console.log(&#39;current chunck hash:&#39;,SparkMD5.ArrayBuffer.hash(e.target.result));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 不是最后一个分片，加载下一个分片</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">loadNext</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//最后一个分片，结束，spark.end()就是最后文件的MD5hash值</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> fileHash </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> spark.</span><span style="color:#B392F0;">end</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;finished computed hash&#39;</span><span style="color:#E1E4E8;">, fileHash);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">resovle</span><span style="color:#E1E4E8;">({ fileHash });</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    fileReader.</span><span style="color:#B392F0;">onerror</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;oops, something went wrong.&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loadNext</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">//开始位置</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> start </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> currentChunk </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> chunkSize,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">//结束位置</span></span>
<span class="line"><span style="color:#E1E4E8;">        end </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ((start </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> chunkSize) </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> file.size) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> file.size </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> start </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> chunkSize;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> chunk </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> blobSlice.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(file, start, end);</span></span>
<span class="line"><span style="color:#E1E4E8;">      fileChunkList.value.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">({ chunk, size: chunk.size, name: currFile.value.name });</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">//fileReader读取下一个文件分片</span></span>
<span class="line"><span style="color:#E1E4E8;">      fileReader.</span><span style="color:#B392F0;">readAsArrayBuffer</span><span style="color:#E1E4E8;">(chunk);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">loadNext</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 总进度条</span></span>
<span class="line"><span style="color:#E1E4E8;">const totalPercentage = computed(() =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">fileChunkList.value.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">) return </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  const loaded </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fileChunkList.value</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> item.size </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> item.percentage)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">reduce</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">curr</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">next</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> curr </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> next);</span></span>
<span class="line"><span style="color:#E1E4E8;">  return </span><span style="color:#B392F0;">parseInt</span><span style="color:#E1E4E8;">((loaded </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> currFile.value.size).</span><span style="color:#B392F0;">toFixed</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">// 分块进度条</span></span>
<span class="line"><span style="color:#E1E4E8;">const onUploadProgress = (item) =&gt; (e) =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  item.percentage </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">parseInt</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">((e.loaded </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> e.total) </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;大文件分片上传&lt;/</span><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;file&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@change=&quot;fileChange&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;总进度：{{ totalPercentage }} %&lt;/</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;percentage total&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;bg&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">:style=&quot;\`width:\${totalPercentage</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">0}%\`&quot;&gt;&lt;/p&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&lt;/div&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&lt;div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;progress&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-if</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;fileChunkList.length&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;progress-chunk&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-for</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;(item, index) in fileChunkList&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;clonm flex-1&quot;</span><span style="color:#E1E4E8;">&gt;{{ item.name }}_{{ index }}&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;clonm size&quot;</span><span style="color:#E1E4E8;">&gt;{{ item.size }} kb&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;clonm flex-1&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;percentage&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;bg&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">:style=&quot;\`width:\${item.percentage</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">0}%\`&quot;&gt;&lt;/p&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FDAEB7;font-style:italic;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FDAEB7;font-style:italic;">&lt;span</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">&gt;{{ item.percentage || </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> }}%&lt;/</span><span style="color:#85E89D;">span</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">* {</span></span>
<span class="line"><span style="color:#E1E4E8;">  margin: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  padding: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">#app {</span></span>
<span class="line"><span style="color:#E1E4E8;">  font</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">family: Avenir, Helvetica, Arial, sans</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">serif;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">webkit</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">font</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">smoothing: antialiased;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">moz</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">osx</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">font</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">smoothing: grayscale;</span></span>
<span class="line"><span style="color:#E1E4E8;">  text</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">align: center;</span></span>
<span class="line"><span style="color:#E1E4E8;">  color: #2c3e50;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">h1,</span></span>
<span class="line"><span style="color:#E1E4E8;">h2 {</span></span>
<span class="line"><span style="color:#E1E4E8;">  margin: 20px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">90</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">.total {</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">91</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  margin: auto;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">.progress {</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">90</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  margin: 20px auto;</span></span>
<span class="line"><span style="color:#E1E4E8;">  border: 1px solid #</span><span style="color:#79B8FF;">0677e9</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  padding: 10px;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">.progress-chunk {</span></span>
<span class="line"><span style="color:#E1E4E8;">  display: flex;</span></span>
<span class="line"><span style="color:#E1E4E8;">  padding: 10px </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  border</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">bottom: 1px solid #c5d1dd;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">.clonm {</span></span>
<span class="line"><span style="color:#E1E4E8;">  display: flex;</span></span>
<span class="line"><span style="color:#E1E4E8;">  align</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">items: center;</span></span>
<span class="line"><span style="color:#E1E4E8;">  word</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">break: break</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">word;</span></span>
<span class="line"><span style="color:#E1E4E8;">  text</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">align: center;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">.size {</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: 200px;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">.flex-1 {</span></span>
<span class="line"><span style="color:#E1E4E8;">  flex: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">.percentage {</span></span>
<span class="line"><span style="color:#E1E4E8;">  flex: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  background</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">color: #bdc1c5;</span></span>
<span class="line"><span style="color:#E1E4E8;">  border</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">radius: 3px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  height: 6px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  display: flex;</span></span>
<span class="line"><span style="color:#E1E4E8;">  align</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">items: center;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">.bg {</span></span>
<span class="line"><span style="color:#E1E4E8;">  height: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  border</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">radius: 3px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  background: </span><span style="color:#B392F0;">rgb</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">245</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">.text {</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: 45px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  padding: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> 5px;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">import { computed, ref } from &quot;vue&quot;</span></span>
<span class="line"><span style="color:#24292E;">import * as SparkMD5 from &quot;spark-md5&quot;</span></span>
<span class="line"><span style="color:#24292E;">import { uploadFile, mergeChunks, controller } from &quot;./request&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 默认分块大小</span></span>
<span class="line"><span style="color:#24292E;">const DefualtChunkSize = 5 * 1024 * 1024;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 当前处理文件</span></span>
<span class="line"><span style="color:#24292E;">const currFile = ref({});</span></span>
<span class="line"><span style="color:#24292E;">// 当前文件分块</span></span>
<span class="line"><span style="color:#24292E;">const fileChunkList = ref([]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 文件变化</span></span>
<span class="line"><span style="color:#24292E;">const fileChange = async (event) =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  const [file] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> event.target.files;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">file) return;</span></span>
<span class="line"><span style="color:#24292E;">  currFile.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> file;</span></span>
<span class="line"><span style="color:#24292E;">  fileChunkList.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">  let { fileHash } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getFileChunk</span><span style="color:#24292E;">(file);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">uploadChunks</span><span style="color:#24292E;">(fileHash);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 用来测试已经中断上传的</span></span>
<span class="line"><span style="color:#24292E;">let num = 0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 上传请求</span></span>
<span class="line"><span style="color:#24292E;">const uploadChunks = (fileHash) =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  const requests </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fileChunkList.value.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">((</span><span style="color:#E36209;">item</span><span style="color:#24292E;">, </span><span style="color:#E36209;">index</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">uploadedIndex</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> localStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(fileHash)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">uploadedArray</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> uploadedIndex </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> uploadedIndex.</span><span style="color:#6F42C1;">split</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;-&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(uploadedArray.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">index</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">)) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">formData</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FormData</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    formData.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">currFile</span><span style="color:#032F62;">.</span><span style="color:#24292E;">value</span><span style="color:#032F62;">.</span><span style="color:#24292E;">name</span><span style="color:#032F62;">}-\${</span><span style="color:#24292E;">fileHash</span><span style="color:#032F62;">}-\${</span><span style="color:#24292E;">index</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">, item.chunk);</span></span>
<span class="line"><span style="color:#24292E;">    formData.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;filename&quot;</span><span style="color:#24292E;">, currFile.value.name);</span></span>
<span class="line"><span style="color:#24292E;">    formData.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hash&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">fileHash</span><span style="color:#032F62;">}-\${</span><span style="color:#24292E;">index</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    formData.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;fileHash&quot;</span><span style="color:#24292E;">, fileHash);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">uploadFile</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/upload&#39;</span><span style="color:#24292E;">, formData, </span><span style="color:#6F42C1;">onUploadProgress</span><span style="color:#24292E;">(item)).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">((</span><span style="color:#E36209;">res</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">      num </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">uploadedIndex</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> localStorage.</span><span style="color:#6F42C1;">getItem</span><span style="color:#24292E;">(fileHash)</span></span>
<span class="line"><span style="color:#24292E;">      localStorage.</span><span style="color:#6F42C1;">setItem</span><span style="color:#24292E;">(fileHash,uploadedIndex</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">uploadedIndex</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&#39;-&#39;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">index</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">index)</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(uploadedIndex,index,num)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// if(num === 4){</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">//   controller.abort()</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// }</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">all</span><span style="color:#24292E;">(requests).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 合并请求</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">mergeChunks</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/mergeChunks&#39;</span><span style="color:#24292E;">, { size: DefualtChunkSize, filename: currFile.value.name }).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">((</span><span style="color:#E36209;">res</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(res)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(res.data.data.code </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2000</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        localStorage.</span><span style="color:#6F42C1;">removeItem</span><span style="color:#24292E;">(fileHash)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 获取文件分块</span></span>
<span class="line"><span style="color:#24292E;">const getFileChunk = (file, chunkSize = DefualtChunkSize) =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  return </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">((</span><span style="color:#E36209;">resovle</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> blobSlice </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">File</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.slice </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">File</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.mozSlice </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">File</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">.webkitSlice,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 计算该文件一共有多少个分片</span></span>
<span class="line"><span style="color:#24292E;">      chunks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Math.</span><span style="color:#6F42C1;">ceil</span><span style="color:#24292E;">(file.size </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> chunkSize),</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 当前分片</span></span>
<span class="line"><span style="color:#24292E;">      currentChunk </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 创建一个spark md5计算arraybuffer的对象，获取文件的md5的值，作为唯一标识</span></span>
<span class="line"><span style="color:#24292E;">      spark </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> SparkMD5.</span><span style="color:#6F42C1;">ArrayBuffer</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 创建一个fileReader对象</span></span>
<span class="line"><span style="color:#24292E;">      fileReader </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FileReader</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    fileReader.</span><span style="color:#6F42C1;">onload</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">//当前的分片和总分片可以了解当前上传的进度</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// console.log(&#39;read chunk nr&#39;, currentChunk + 1, &#39;of&#39;);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">chunk</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> e.target.result;</span></span>
<span class="line"><span style="color:#24292E;">      spark.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(chunk);</span></span>
<span class="line"><span style="color:#24292E;">      currentChunk</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (currentChunk </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> chunks) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 当前分片的md5 hash值</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// console.log(&#39;current chunck hash:&#39;,SparkMD5.ArrayBuffer.hash(e.target.result));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 不是最后一个分片，加载下一个分片</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">loadNext</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//最后一个分片，结束，spark.end()就是最后文件的MD5hash值</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> fileHash </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> spark.</span><span style="color:#6F42C1;">end</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;finished computed hash&#39;</span><span style="color:#24292E;">, fileHash);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">resovle</span><span style="color:#24292E;">({ fileHash });</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    fileReader.</span><span style="color:#6F42C1;">onerror</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;oops, something went wrong.&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loadNext</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">//开始位置</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> start </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> currentChunk </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> chunkSize,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">//结束位置</span></span>
<span class="line"><span style="color:#24292E;">        end </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ((start </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> chunkSize) </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> file.size) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> file.size </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> start </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> chunkSize;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> chunk </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> blobSlice.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(file, start, end);</span></span>
<span class="line"><span style="color:#24292E;">      fileChunkList.value.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">({ chunk, size: chunk.size, name: currFile.value.name });</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">//fileReader读取下一个文件分片</span></span>
<span class="line"><span style="color:#24292E;">      fileReader.</span><span style="color:#6F42C1;">readAsArrayBuffer</span><span style="color:#24292E;">(chunk);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">loadNext</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 总进度条</span></span>
<span class="line"><span style="color:#24292E;">const totalPercentage = computed(() =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">fileChunkList.value.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">) return </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  const loaded </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fileChunkList.value</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(</span><span style="color:#E36209;">item</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> item.size </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> item.percentage)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">reduce</span><span style="color:#24292E;">((</span><span style="color:#E36209;">curr</span><span style="color:#24292E;">, </span><span style="color:#E36209;">next</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> curr </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> next);</span></span>
<span class="line"><span style="color:#24292E;">  return </span><span style="color:#6F42C1;">parseInt</span><span style="color:#24292E;">((loaded </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> currFile.value.size).</span><span style="color:#6F42C1;">toFixed</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">// 分块进度条</span></span>
<span class="line"><span style="color:#24292E;">const onUploadProgress = (item) =&gt; (e) =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  item.percentage </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">parseInt</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">((e.loaded </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> e.total) </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;大文件分片上传&lt;/</span><span style="color:#22863A;">h1</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">input</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;file&quot;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@change=&quot;fileChange&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;总进度：{{ totalPercentage }} %&lt;/</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;percentage total&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;bg&quot;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">:style=&quot;\`width:\${totalPercentage</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">||</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">0}%\`&quot;&gt;&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&lt;/div&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&lt;div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;progress&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-if</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;fileChunkList.length&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;progress-chunk&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-for</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;(item, index) in fileChunkList&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;clonm flex-1&quot;</span><span style="color:#24292E;">&gt;{{ item.name }}_{{ index }}&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;clonm size&quot;</span><span style="color:#24292E;">&gt;{{ item.size }} kb&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;clonm flex-1&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;percentage&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;bg&quot;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">:style=&quot;\`width:\${item.percentage</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">||</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">0}%\`&quot;&gt;&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#B31D28;font-style:italic;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#B31D28;font-style:italic;">&lt;span</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">&gt;{{ item.percentage || </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> }}%&lt;/</span><span style="color:#22863A;">span</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">* {</span></span>
<span class="line"><span style="color:#24292E;">  margin: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  padding: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">#app {</span></span>
<span class="line"><span style="color:#24292E;">  font</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">family: Avenir, Helvetica, Arial, sans</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">serif;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">webkit</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">font</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">smoothing: antialiased;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">moz</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">osx</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">font</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">smoothing: grayscale;</span></span>
<span class="line"><span style="color:#24292E;">  text</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">align: center;</span></span>
<span class="line"><span style="color:#24292E;">  color: #2c3e50;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">h1,</span></span>
<span class="line"><span style="color:#24292E;">h2 {</span></span>
<span class="line"><span style="color:#24292E;">  margin: 20px;</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">90</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">.total {</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">91</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  margin: auto;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">.progress {</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">90</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  margin: 20px auto;</span></span>
<span class="line"><span style="color:#24292E;">  border: 1px solid #</span><span style="color:#005CC5;">0677e9</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  padding: 10px;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">.progress-chunk {</span></span>
<span class="line"><span style="color:#24292E;">  display: flex;</span></span>
<span class="line"><span style="color:#24292E;">  padding: 10px </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  border</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">bottom: 1px solid #c5d1dd;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">.clonm {</span></span>
<span class="line"><span style="color:#24292E;">  display: flex;</span></span>
<span class="line"><span style="color:#24292E;">  align</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">items: center;</span></span>
<span class="line"><span style="color:#24292E;">  word</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">break: break</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">word;</span></span>
<span class="line"><span style="color:#24292E;">  text</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">align: center;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">.size {</span></span>
<span class="line"><span style="color:#24292E;">  width: 200px;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">.flex-1 {</span></span>
<span class="line"><span style="color:#24292E;">  flex: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">.percentage {</span></span>
<span class="line"><span style="color:#24292E;">  flex: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  background</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">color: #bdc1c5;</span></span>
<span class="line"><span style="color:#24292E;">  border</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">radius: 3px;</span></span>
<span class="line"><span style="color:#24292E;">  height: 6px;</span></span>
<span class="line"><span style="color:#24292E;">  display: flex;</span></span>
<span class="line"><span style="color:#24292E;">  align</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">items: center;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">.bg {</span></span>
<span class="line"><span style="color:#24292E;">  height: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  border</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">radius: 3px;</span></span>
<span class="line"><span style="color:#24292E;">  background: </span><span style="color:#6F42C1;">rgb</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">22</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">245</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">.text {</span></span>
<span class="line"><span style="color:#24292E;">  width: 45px;</span></span>
<span class="line"><span style="color:#24292E;">  padding: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> 5px;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="服务端整体代码" tabindex="-1">服务端整体代码 <a class="header-anchor" href="#服务端整体代码" aria-label="Permalink to &quot;服务端整体代码&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Koa</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;koa&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">router</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;koa-router&#39;</span><span style="color:#E1E4E8;">)();</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">cors</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;koa2-cors&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">koaBody</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;koa-body&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">fs</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;fs&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;path&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">outputPath</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(__dirname, </span><span style="color:#9ECBFF;">&#39;resources&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">app</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Koa</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> currChunk </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {}; </span><span style="color:#6A737D;">// 当前 chunk 信息</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*  */</span></span>
<span class="line"><span style="color:#6A737D;">// 处理跨域</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">cors</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//设置允许来自指定域名请求</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">origin</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">ctx</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;*&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 允许来自所有域名请求</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  maxAge: </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//指定本次预检请求的有效期，单位为秒。</span></span>
<span class="line"><span style="color:#E1E4E8;">  credentials: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">//是否允许发送Cookie</span></span>
<span class="line"><span style="color:#E1E4E8;">  allowMethods: [</span><span style="color:#9ECBFF;">&#39;GET&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;POST&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;PUT&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;DELETE&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;OPTIONS&#39;</span><span style="color:#E1E4E8;">], </span><span style="color:#6A737D;">//设置所允许的HTTP请求方法</span></span>
<span class="line"><span style="color:#E1E4E8;">  allowHeaders: [</span><span style="color:#9ECBFF;">&#39;Content-Type&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;Authorization&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;Accept&#39;</span><span style="color:#E1E4E8;">], </span><span style="color:#6A737D;">//设置服务器支持的所有头信息字段</span></span>
<span class="line"><span style="color:#E1E4E8;">  exposeHeaders: [</span><span style="color:#9ECBFF;">&#39;WWW-Authenticate&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;Server-Authorization&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#6A737D;">//设置获取其他自定义字段</span></span>
<span class="line"><span style="color:#E1E4E8;">}));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 处理 body 数据</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">koaBody</span><span style="color:#E1E4E8;">({}));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">dirname</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (fs.</span><span style="color:#B392F0;">existsSync</span><span style="color:#E1E4E8;">(dirname)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;">(path.</span><span style="color:#B392F0;">dirname</span><span style="color:#E1E4E8;">(dirname))) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      fs.</span><span style="color:#B392F0;">mkdirSync</span><span style="color:#E1E4E8;">(dirname);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 上传请求</span></span>
<span class="line"><span style="color:#E1E4E8;">router.</span><span style="color:#B392F0;">post</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;/upload&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理文件 form-data 数据</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">koaBody</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    multipart: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    formidable: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      uploadDir: outputPath,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onFileBegin</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">file</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> nameStr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> name.</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;-&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> fileHash </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> nameStr[nameStr.</span><span style="color:#79B8FF;">length</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> nameStr[nameStr.</span><span style="color:#79B8FF;">length</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> filename </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> nameStr.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,nameStr.</span><span style="color:#79B8FF;">length</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">join</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;-&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        filename </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;_&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> filename</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">dir</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> path.</span><span style="color:#B392F0;">join</span><span style="color:#E1E4E8;">(outputPath, filename);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 保存当前 chunk 信息，发生错误时进行返回</span></span>
<span class="line"><span style="color:#E1E4E8;">        currChunk </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          filename,</span></span>
<span class="line"><span style="color:#E1E4E8;">          fileHash,</span></span>
<span class="line"><span style="color:#E1E4E8;">          index</span></span>
<span class="line"><span style="color:#E1E4E8;">        };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 检查文件夹是否存在如果不存在则新建文件夹</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">fs.</span><span style="color:#B392F0;">existsSync</span><span style="color:#E1E4E8;">(dir)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;">(dir)</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// fs.mkdirSync(dir);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// console.log(&quot;创建路径&quot;, dir, fileHash, name)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// console.log(&quot;创建路径&quot;, filename)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 覆盖文件存放的完整路径</span></span>
<span class="line"><span style="color:#E1E4E8;">        file.path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">dir</span><span style="color:#9ECBFF;">}/\${</span><span style="color:#E1E4E8;">fileHash</span><span style="color:#9ECBFF;">}-\${</span><span style="color:#E1E4E8;">index</span><span style="color:#9ECBFF;">}\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onError</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">error</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        app.status </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">400</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        app.body </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          code: </span><span style="color:#79B8FF;">400</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          msg: </span><span style="color:#9ECBFF;">&quot;上传失败&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          data: currChunk</span></span>
<span class="line"><span style="color:#E1E4E8;">        };</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  }),</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理响应</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">ctx</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ctx.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Content-Type&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;application/json&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    ctx.body </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      code: </span><span style="color:#79B8FF;">2000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      message: </span><span style="color:#9ECBFF;">&#39;upload successfully！&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 合并请求</span></span>
<span class="line"><span style="color:#E1E4E8;">router.</span><span style="color:#B392F0;">post</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/mergeChunks&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">ctx</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">filename</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">size</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ctx.request.body;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 合并 chunks</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// await mergeFileChunk(path.join(outputPath, &#39;_&#39; + filename), filename, size);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mergeFileChunk</span><span style="color:#E1E4E8;">(path.</span><span style="color:#B392F0;">join</span><span style="color:#E1E4E8;">(outputPath, filename), </span><span style="color:#9ECBFF;">&#39;_&#39;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">filename, size);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理响应</span></span>
<span class="line"><span style="color:#E1E4E8;">  ctx.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Content-Type&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;application/json&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  ctx.body </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    data: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      code: </span><span style="color:#79B8FF;">2000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      filename,</span></span>
<span class="line"><span style="color:#E1E4E8;">      size</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    message: </span><span style="color:#9ECBFF;">&#39;merge chunks successful！&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 通过管道处理流 </span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">pipeStream</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">path</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">writeStream</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">readStream</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fs.</span><span style="color:#B392F0;">createReadStream</span><span style="color:#E1E4E8;">(path);</span></span>
<span class="line"><span style="color:#E1E4E8;">    readStream.</span><span style="color:#B392F0;">pipe</span><span style="color:#E1E4E8;">(writeStream);</span></span>
<span class="line"><span style="color:#E1E4E8;">    readStream.</span><span style="color:#B392F0;">on</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;end&quot;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      fs.</span><span style="color:#B392F0;">unlinkSync</span><span style="color:#E1E4E8;">(path);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 合并切片</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mergeFileChunk</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">filePath</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">filename</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">size</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">chunkDir</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> path.</span><span style="color:#B392F0;">join</span><span style="color:#E1E4E8;">(outputPath, filename);</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;chunkDir&#39;</span><span style="color:#E1E4E8;">, chunkDir)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">chunkPaths</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fs.</span><span style="color:#B392F0;">readdirSync</span><span style="color:#E1E4E8;">(chunkDir);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">chunkPaths.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 根据切片下标进行排序，否则直接读取目录的获得的顺序可能会错乱</span></span>
<span class="line"><span style="color:#E1E4E8;">  chunkPaths.</span><span style="color:#B392F0;">sort</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> a.</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;-&quot;</span><span style="color:#E1E4E8;">)[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> b.</span><span style="color:#B392F0;">split</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;-&quot;</span><span style="color:#E1E4E8;">)[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]);</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;chunkPaths = &quot;</span><span style="color:#E1E4E8;">, chunkPaths);</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;filePath = &quot;</span><span style="color:#E1E4E8;">, filePath);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">all</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    chunkPaths.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">chunkPath</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">index</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">pipeStream</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        path.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(chunkDir, chunkPath),</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 指定位置创建可写流</span></span>
<span class="line"><span style="color:#E1E4E8;">        fs.</span><span style="color:#B392F0;">createWriteStream</span><span style="color:#E1E4E8;">(filePath, {</span></span>
<span class="line"><span style="color:#E1E4E8;">          start: index </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> size,</span></span>
<span class="line"><span style="color:#E1E4E8;">          end: (index </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> size</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">      )</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 合并后删除保存切片的目录</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">deleteFolderRecursive</span><span style="color:#E1E4E8;">(chunkDir)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// fs.rmdirSync(chunkDir);</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">deleteFolderRecursive</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">url</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> files </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 判断给定的路径是否存在</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (fs.</span><span style="color:#B392F0;">existsSync</span><span style="color:#E1E4E8;">(url)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回文件和子目录的数组</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    files </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fs.</span><span style="color:#B392F0;">readdirSync</span><span style="color:#E1E4E8;">(url);</span></span>
<span class="line"><span style="color:#E1E4E8;">    files.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">file</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">index</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> curPath </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> path.</span><span style="color:#B392F0;">join</span><span style="color:#E1E4E8;">(url, file);</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;curPath&quot;</span><span style="color:#E1E4E8;">,curPath)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (fs.</span><span style="color:#B392F0;">statSync</span><span style="color:#E1E4E8;">(curPath).</span><span style="color:#B392F0;">isDirectory</span><span style="color:#E1E4E8;">()) { </span><span style="color:#6A737D;">// recurse</span></span>
<span class="line"><span style="color:#E1E4E8;">        Book.</span><span style="color:#B392F0;">deleteFolderRecursive</span><span style="color:#E1E4E8;">(curPath);</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        fs.</span><span style="color:#B392F0;">unlinkSync</span><span style="color:#E1E4E8;">(curPath);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 清除文件夹</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    fs.</span><span style="color:#B392F0;">rmdirSync</span><span style="color:#E1E4E8;">(url);</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;路径不存在&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 注册路由</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(router.</span><span style="color:#B392F0;">routes</span><span style="color:#E1E4E8;">(), router.</span><span style="color:#B392F0;">allowedMethods</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 启动服务，监听端口</span></span>
<span class="line"><span style="color:#E1E4E8;">app.</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3001</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">error</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">error) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;server is runing at port 3001...&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Koa</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;koa&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">router</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;koa-router&#39;</span><span style="color:#24292E;">)();</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">cors</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;koa2-cors&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">koaBody</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;koa-body&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">fs</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;fs&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;path&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">outputPath</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(__dirname, </span><span style="color:#032F62;">&#39;resources&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">app</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Koa</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> currChunk </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {}; </span><span style="color:#6A737D;">// 当前 chunk 信息</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*  */</span></span>
<span class="line"><span style="color:#6A737D;">// 处理跨域</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">cors</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//设置允许来自指定域名请求</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">origin</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">ctx</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;*&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 允许来自所有域名请求</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  maxAge: </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//指定本次预检请求的有效期，单位为秒。</span></span>
<span class="line"><span style="color:#24292E;">  credentials: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">//是否允许发送Cookie</span></span>
<span class="line"><span style="color:#24292E;">  allowMethods: [</span><span style="color:#032F62;">&#39;GET&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;POST&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;PUT&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;DELETE&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;OPTIONS&#39;</span><span style="color:#24292E;">], </span><span style="color:#6A737D;">//设置所允许的HTTP请求方法</span></span>
<span class="line"><span style="color:#24292E;">  allowHeaders: [</span><span style="color:#032F62;">&#39;Content-Type&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;Authorization&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;Accept&#39;</span><span style="color:#24292E;">], </span><span style="color:#6A737D;">//设置服务器支持的所有头信息字段</span></span>
<span class="line"><span style="color:#24292E;">  exposeHeaders: [</span><span style="color:#032F62;">&#39;WWW-Authenticate&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;Server-Authorization&#39;</span><span style="color:#24292E;">] </span><span style="color:#6A737D;">//设置获取其他自定义字段</span></span>
<span class="line"><span style="color:#24292E;">}));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 处理 body 数据</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">koaBody</span><span style="color:#24292E;">({}));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;">(</span><span style="color:#E36209;">dirname</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (fs.</span><span style="color:#6F42C1;">existsSync</span><span style="color:#24292E;">(dirname)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;">(path.</span><span style="color:#6F42C1;">dirname</span><span style="color:#24292E;">(dirname))) {</span></span>
<span class="line"><span style="color:#24292E;">      fs.</span><span style="color:#6F42C1;">mkdirSync</span><span style="color:#24292E;">(dirname);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 上传请求</span></span>
<span class="line"><span style="color:#24292E;">router.</span><span style="color:#6F42C1;">post</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;/upload&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理文件 form-data 数据</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">koaBody</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    multipart: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    formidable: {</span></span>
<span class="line"><span style="color:#24292E;">      uploadDir: outputPath,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onFileBegin</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">name</span><span style="color:#24292E;">, </span><span style="color:#E36209;">file</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> nameStr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> name.</span><span style="color:#6F42C1;">split</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;-&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> fileHash </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> nameStr[nameStr.</span><span style="color:#005CC5;">length</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> nameStr[nameStr.</span><span style="color:#005CC5;">length</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> filename </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> nameStr.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,nameStr.</span><span style="color:#005CC5;">length</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">join</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;-&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        filename </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;_&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> filename</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">dir</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> path.</span><span style="color:#6F42C1;">join</span><span style="color:#24292E;">(outputPath, filename);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 保存当前 chunk 信息，发生错误时进行返回</span></span>
<span class="line"><span style="color:#24292E;">        currChunk </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          filename,</span></span>
<span class="line"><span style="color:#24292E;">          fileHash,</span></span>
<span class="line"><span style="color:#24292E;">          index</span></span>
<span class="line"><span style="color:#24292E;">        };</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 检查文件夹是否存在如果不存在则新建文件夹</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">fs.</span><span style="color:#6F42C1;">existsSync</span><span style="color:#24292E;">(dir)) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;">(dir)</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// fs.mkdirSync(dir);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// console.log(&quot;创建路径&quot;, dir, fileHash, name)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// console.log(&quot;创建路径&quot;, filename)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 覆盖文件存放的完整路径</span></span>
<span class="line"><span style="color:#24292E;">        file.path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">dir</span><span style="color:#032F62;">}/\${</span><span style="color:#24292E;">fileHash</span><span style="color:#032F62;">}-\${</span><span style="color:#24292E;">index</span><span style="color:#032F62;">}\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onError</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">error</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        app.status </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">400</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        app.body </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          code: </span><span style="color:#005CC5;">400</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          msg: </span><span style="color:#032F62;">&quot;上传失败&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          data: currChunk</span></span>
<span class="line"><span style="color:#24292E;">        };</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  }),</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理响应</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">ctx</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    ctx.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Content-Type&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;application/json&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    ctx.body </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      code: </span><span style="color:#005CC5;">2000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      message: </span><span style="color:#032F62;">&#39;upload successfully！&#39;</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 合并请求</span></span>
<span class="line"><span style="color:#24292E;">router.</span><span style="color:#6F42C1;">post</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/mergeChunks&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">ctx</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">filename</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">size</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ctx.request.body;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 合并 chunks</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// await mergeFileChunk(path.join(outputPath, &#39;_&#39; + filename), filename, size);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mergeFileChunk</span><span style="color:#24292E;">(path.</span><span style="color:#6F42C1;">join</span><span style="color:#24292E;">(outputPath, filename), </span><span style="color:#032F62;">&#39;_&#39;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">filename, size);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理响应</span></span>
<span class="line"><span style="color:#24292E;">  ctx.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Content-Type&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;application/json&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  ctx.body </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    data: {</span></span>
<span class="line"><span style="color:#24292E;">      code: </span><span style="color:#005CC5;">2000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      filename,</span></span>
<span class="line"><span style="color:#24292E;">      size</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    message: </span><span style="color:#032F62;">&#39;merge chunks successful！&#39;</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 通过管道处理流 </span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">pipeStream</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">path</span><span style="color:#24292E;">, </span><span style="color:#E36209;">writeStream</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">(</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">readStream</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fs.</span><span style="color:#6F42C1;">createReadStream</span><span style="color:#24292E;">(path);</span></span>
<span class="line"><span style="color:#24292E;">    readStream.</span><span style="color:#6F42C1;">pipe</span><span style="color:#24292E;">(writeStream);</span></span>
<span class="line"><span style="color:#24292E;">    readStream.</span><span style="color:#6F42C1;">on</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;end&quot;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      fs.</span><span style="color:#6F42C1;">unlinkSync</span><span style="color:#24292E;">(path);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 合并切片</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mergeFileChunk</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">filePath</span><span style="color:#24292E;">, </span><span style="color:#E36209;">filename</span><span style="color:#24292E;">, </span><span style="color:#E36209;">size</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">chunkDir</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> path.</span><span style="color:#6F42C1;">join</span><span style="color:#24292E;">(outputPath, filename);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;chunkDir&#39;</span><span style="color:#24292E;">, chunkDir)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">chunkPaths</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fs.</span><span style="color:#6F42C1;">readdirSync</span><span style="color:#24292E;">(chunkDir);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">chunkPaths.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 根据切片下标进行排序，否则直接读取目录的获得的顺序可能会错乱</span></span>
<span class="line"><span style="color:#24292E;">  chunkPaths.</span><span style="color:#6F42C1;">sort</span><span style="color:#24292E;">((</span><span style="color:#E36209;">a</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> a.</span><span style="color:#6F42C1;">split</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;-&quot;</span><span style="color:#24292E;">)[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> b.</span><span style="color:#6F42C1;">split</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;-&quot;</span><span style="color:#24292E;">)[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;chunkPaths = &quot;</span><span style="color:#24292E;">, chunkPaths);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;filePath = &quot;</span><span style="color:#24292E;">, filePath);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">all</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    chunkPaths.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">((</span><span style="color:#E36209;">chunkPath</span><span style="color:#24292E;">, </span><span style="color:#E36209;">index</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">pipeStream</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        path.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(chunkDir, chunkPath),</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 指定位置创建可写流</span></span>
<span class="line"><span style="color:#24292E;">        fs.</span><span style="color:#6F42C1;">createWriteStream</span><span style="color:#24292E;">(filePath, {</span></span>
<span class="line"><span style="color:#24292E;">          start: index </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> size,</span></span>
<span class="line"><span style="color:#24292E;">          end: (index </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> size</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">      )</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 合并后删除保存切片的目录</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">deleteFolderRecursive</span><span style="color:#24292E;">(chunkDir)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// fs.rmdirSync(chunkDir);</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">deleteFolderRecursive</span><span style="color:#24292E;">(</span><span style="color:#E36209;">url</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> files </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 判断给定的路径是否存在</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (fs.</span><span style="color:#6F42C1;">existsSync</span><span style="color:#24292E;">(url)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回文件和子目录的数组</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    files </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fs.</span><span style="color:#6F42C1;">readdirSync</span><span style="color:#24292E;">(url);</span></span>
<span class="line"><span style="color:#24292E;">    files.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">file</span><span style="color:#24292E;">, </span><span style="color:#E36209;">index</span><span style="color:#24292E;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> curPath </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> path.</span><span style="color:#6F42C1;">join</span><span style="color:#24292E;">(url, file);</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;curPath&quot;</span><span style="color:#24292E;">,curPath)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">       * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数</span></span>
<span class="line"><span style="color:#6A737D;">       */</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (fs.</span><span style="color:#6F42C1;">statSync</span><span style="color:#24292E;">(curPath).</span><span style="color:#6F42C1;">isDirectory</span><span style="color:#24292E;">()) { </span><span style="color:#6A737D;">// recurse</span></span>
<span class="line"><span style="color:#24292E;">        Book.</span><span style="color:#6F42C1;">deleteFolderRecursive</span><span style="color:#24292E;">(curPath);</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        fs.</span><span style="color:#6F42C1;">unlinkSync</span><span style="color:#24292E;">(curPath);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * 清除文件夹</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    fs.</span><span style="color:#6F42C1;">rmdirSync</span><span style="color:#24292E;">(url);</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;路径不存在&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 注册路由</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(router.</span><span style="color:#6F42C1;">routes</span><span style="color:#24292E;">(), router.</span><span style="color:#6F42C1;">allowedMethods</span><span style="color:#24292E;">())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 启动服务，监听端口</span></span>
<span class="line"><span style="color:#24292E;">app.</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3001</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">error</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">error) {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;server is runing at port 3001...&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div>`,10),c=[e];function t(E,y,i,F,u,d){return n(),a("div",null,c)}const r=s(o,[["render",t]]),D=Object.freeze(Object.defineProperty({__proto__:null,__pageData:p,default:r},Symbol.toStringTag,{value:"Module"}));export{D as _,p as __pageData,r as default};
