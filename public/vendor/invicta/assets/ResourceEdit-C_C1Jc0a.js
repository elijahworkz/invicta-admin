import{j as n,y as d,K as p,J as f,d as _,u as e,l as h,f as v,g,R as x,o as i,S as b}from"./vendor-DNNQIDVf.js";/* empty css                */import{_ as y}from"./FormBase-By4T4NDk.js";/* empty css                      *//* empty css             */import"./main-CO7w6Fmb.js";import"./dynamic-import-helper-BheWnx7M.js";const I={class:"py-6 px-10"},$=!1,C=Object.assign({beforeRouteEnter:async function(r){let{data:o}=await Invicta.axios.get(`api${r.path}`,{params:r.query});r.meta.data=o}},{__name:"ResourceEdit",props:{data:null|Object},setup(r){const o=r,a=b(),s=n(!1),t=n(o.data);Invicta.user,n([]);const m=d(()=>`resource/${a.params.handle}/${a.params.id||"create"}`);return p(()=>a.params.handle+a.params.id,()=>{console.log("I see params change"),s.value=!0,t.value=null,Invicta.axios.get(`api${a.path}`).then(({data:c})=>{t.value=c,s.value=!1})}),f(()=>{}),(c,k)=>{const u=y,l=x;return i(),_("div",I,[e(t)?h((i(),v(u,{key:0,"form-id":e(m),resource:e(t),"action-url":e(t).meta.actionUrl,breadcrumb:{name:"resourceIndex",params:{handle:e(a).params.handle},text:e(t).meta.indexTitle},"read-only":$,"page-form":!0},null,8,["form-id","resource","action-url","breadcrumb"])),[[l,e(s)]]):g("",!0)])}}});export{C as default};