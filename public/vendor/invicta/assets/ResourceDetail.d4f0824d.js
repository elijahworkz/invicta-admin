import{_ as u}from"./FormBase.6d11ffb3.js";import{r as o,a9 as m,o as a,c as n,b as t,d as r,w as s,g as f,F as h,e as _,b3 as x,i as b,t as T}from"./main.f6278b25.js";import"./icon.7d6595df.js";import"./form.9c68ba6b.js";import"./card.72bb6b00.js";import"./typescript.72bf8adc.js";const v={class:"py-6 px-10"},H={class:"flex items-end justify-between mb-4"},L=["innerHTML"],g=["innerHTML"],C={__name:"ResourceDetail",props:{resource:Object},setup(e){return(k,p)=>{const c=o("Head"),i=m,l=o("Link"),d=u;return a(),n(h,null,[t(c,{title:e.resource.meta.pageTitle},null,8,["title"]),r("div",v,[r("div",H,[r("div",null,[t(l,{href:e.resource.meta.indexUrl,class:"breadcrumb"},{default:s(()=>[t(i,null,{default:s(()=>[t(_(x))]),_:1}),b(" "+T(e.resource.meta.indexTitle),1)]),_:1},8,["href"]),r("div",{innerHTML:e.resource.header.title},null,8,L)]),e.resource.header.info?(a(),n("div",{key:0,class:"header-details text-right",innerHTML:e.resource.header.info},null,8,g)):f("",!0)]),t(d,{"form-id":`${e.resource.meta.handle}.${e.resource.meta.id}.detail`,resource:e.resource,headless:!0,"action-url":""},null,8,["form-id","resource"])])],64)}}};export{C as default};