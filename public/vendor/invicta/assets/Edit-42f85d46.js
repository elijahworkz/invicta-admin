import{_ as u}from"./FormBase-93f0d5f2.js";import{r as d,B as p,g as _,ae as f,c as x,d as B,u as r,a as b,f as $,F as h,j as k,o as s}from"./main-d76c405e.js";import"./form-e63502e9.js";import"./card-d402f5ea.js";/* empty css                      */import"./icon-01818d2e.js";import"./event-9519ab40.js";import"./typescript-defaf979.js";import"./vnode-deea4f76.js";const y={class:"py-6 px-10"},U={__name:"Edit",props:{resource:Object},setup(n){var o;const t=n;Invicta.user,d([]),p(()=>`resource.${t.resource.meta.handle}.${t.resource.meta.id}`),_(()=>{});const e=f(t.resource),c=`${e.meta.handle}.${((o=e.meta)==null?void 0:o.id)||"new"}`,m=!1;return(g,v)=>{var a;const i=k("Head"),l=u;return s(),x(h,null,[B(i,{title:r(e).meta.pageTitle},null,8,["title"]),b("div",y,[(s(),$(l,{key:((a=r(e).meta)==null?void 0:a.id)||"new","form-id":c,resource:r(e),"action-url":r(e).meta.actionUrl,breadcrumb:{url:r(e).meta.indexUrl,text:r(e).meta.indexTitle},"read-only":m},null,8,["resource","action-url","breadcrumb"]))])],64)}}};export{U as default};