import{A as m,Q as v,o,c as l,f as u,g as s,d as y,t as k,e as a,b as p}from"./main.0ef6c703.js";import{u as b,_ as S,E as x}from"./resource.e9584138.js";import"./select.1764d41f.js";import{_ as B}from"./Loading.34fc89b5.js";import{_ as U}from"./Filters.c9e26bcf.js";import{_ as z}from"./FiltersSearch.df1312aa.js";import{u as F}from"./FormBase.a4200675.js";import"./typescript.72bf8adc.js";import"./index.7b3a76dc.js";import"./ActionsDropdown.b49d60a1.js";import"./icon.acbdc9cd.js";import"./index.42e2bd35.js";import"./functions.796266bd.js";import"./events.7b36ce45.js";import"./scroll.aabcd561.js";import"./validator.4d5ad03d.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./date-picker.0cae1537.js";import"./form.d0870869.js";import"./card.2a16bc6c.js";const P={class:"mb-2"},j={key:0,class:"flex items-center"},R={class:"ml-auto"},C={key:1,class:"my-3"},E={key:2,class:"flex items-center justify-center h-full py-10"},ee={__name:"tableField",props:{formId:String,data:Object,path:String},setup(c){const n=c,r=m(!1),t=m(),e=b(n.data.id);return F(n.formId),v(()=>{r.value=!0,Invicta.axios.get(n.data.resourceUrl).then(({data:i})=>{console.log("got this from data"),e.init(n.data.resourceUrl,i),t.value=i,r.value=!1})}),(i,I)=>{const d=z,_=U,g=B,f=S,h=x;return o(),l("div",P,[r.value?s("",!0):(o(),l("div",j,[t.value&&c.data.searchFilter?(o(),u(d,{key:0,currentSearch:t.value.meta.search,handle:t.value.handle,filters:t.value.meta.filters},null,8,["currentSearch","handle","filters"])):s("",!0),y("strong",R,"Total: "+k(a(e).total),1)])),r.value?s("",!0):(o(),l("div",C,[p(_,{badges:a(e).filterBadges},null,8,["badges"])])),r.value?(o(),l("div",E,[p(g)])):t.value?(o(),u(f,{key:c.data.id,"resource-handle":t.value.handle,data:a(e).resource,columns:a(e).columns,"can-edit":!1,"can-delete":!1,"has-detail":!1,"no-select":!0},null,8,["resource-handle","data","columns"])):s("",!0),t.value&&t.value.meta.last_page>1?(o(),u(h,{key:4,background:"",small:"",layout:"prev, pager, next, jumper",class:"mt-2 justify-end","current-page":a(e).currentPage,"page-size":a(e).perPage,"pager-count":5,total:a(e).total,"onUpdate:pageSize":a(e).pageSizeChange,"onUpdate:currentPage":a(e).pageChange},null,8,["current-page","page-size","total","onUpdate:pageSize","onUpdate:currentPage"])):s("",!0)])}}};export{ee as default};