import{_ as l}from"./FormBase-981fa4a3.js";import{J as u}from"./pinia-2da5345b.js";import{a as d,X as _,c as f,l as b,m as x,u as t,g as h,e as B,F as $,v as k,b as i}from"./runtime-core.esm-bundler-7f0fe3b3.js";import"./base-d2be032a.js";/* empty css             */import"./card-efc298e9.js";import"./FormField-8a990b1d.js";import"./preload-helper-a8e14176.js";import"./lodash-42c17880.js";import"./condition-13023752.js";import"./index-5877d402.js";import"./dropdown-28fb02a9.js";import"./flatten-799e71f7.js";import"./_initCloneObject-0f0e4037.js";import"./isEqual-55877968.js";import"./checkbox-1b6f50eb.js";import"./index-b92fe0ad.js";import"./event-9519ab40.js";import"./index-167a10d9.js";import"./button-89d56e76.js";import"./index-8323e681.js";import"./index-15acff50.js";import"./popper-8d437ae5.js";import"./index-de312e67.js";import"./isNil-c75b1b34.js";import"./scrollbar-b8d23954.js";/* empty css                      *//* empty css                      */import"./tooltip-584fa521.js";/* empty css             */import"./typescript-defaf979.js";import"./strings-446bef3a.js";import"./vnode-466384f0.js";import"./index-edac63f2.js";import"./index-c1a29d2b.js";const y={class:"py-6 px-10"},ar={__name:"Edit",props:{resource:Object},setup(a){var o;const e=a;u().props.auth.user,d([]);const r=_(e.resource);f(()=>`resource.${e.resource.meta.handle}.${e.resource.meta.id}`);const p=`${r.meta.handle}.${((o=r.meta)==null?void 0:o.id)||"new"}`,s=!1;return(g,v)=>{var m;const c=k("Head"),n=l;return i(),b($,null,[x(c,{title:t(r).meta.pageTitle},null,8,["title"]),h("div",y,[(i(),B(n,{key:((m=t(r).meta)==null?void 0:m.id)||"new","form-id":p,resource:t(r),"action-url":t(r).meta.actionUrl,breadcrumb:{url:t(r).meta.indexUrl,text:t(r).meta.indexTitle},"read-only":s},null,8,["resource","action-url","breadcrumb"]))])],64)}}};export{ar as default};