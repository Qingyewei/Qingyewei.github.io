import{_ as c,C as t,o,c as i,k as n,a as e,H as s,Q as p}from"./chunks/framework.12b7deed.js";const r=JSON.parse('{"title":"Vue3源码共读：第一期：源码学习方法分享，模块之间依赖关系，初始化整体流程分析","description":"","frontmatter":{"title":"Vue3源码共读：第一期：源码学习方法分享，模块之间依赖关系，初始化整体流程分析","head":[["meta",{"name":"og:title","content":"Vue3源码共读：第一期：源码学习方法分享，模块之间依赖关系，初始化整体流程分析 | VitePress"}]]},"headers":[],"relativePath":"vue3/source-code-to-1.md","filePath":"vue3/source-code-to-1.md","lastUpdated":1698918793000}'),d={name:"vue3/source-code-to-1.md"},m=p("",67),b=p("",7);function f(l,u,k,h,v,j){const a=t("App");return o(),i("div",null,[m,n("p",null,[e("渲染器是个对象，一个是renderer的方法：react中有个React.render("),s(a),e(',"#app")是一样的功能，它把接收到的虚拟DOM转换成DOM对象，追加到宿主元素上去。一个是hydrate的方法，服务端SSR渲染，将一个虚拟DOM直接生成HTML字符串。一个creatApp的方法：创建app实例，是通过ceartAppApi这个工厂函数返回的')]),b])}const g=c(d,[["render",f]]),y=Object.freeze(Object.defineProperty({__proto__:null,__pageData:r,default:g},Symbol.toStringTag,{value:"Module"}));export{y as _,r as __pageData,g as default};