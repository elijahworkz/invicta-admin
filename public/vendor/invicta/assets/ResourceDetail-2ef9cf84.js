import{a as i,_ as m}from"./FormBase-4b369342.js";import{o as r,d as n,h as a,k as s,g as d}from"./vendor-ab507162.js";/* empty css                      *//* empty css             */import"./main-87130347.js";import"./dynamic-import-helper-be004503.js";/* empty css             */const l={class:"py-6 px-10"},u={class:"flex items-end justify-between mb-4"},h=["innerHTML"],f=["innerHTML"],y=Object.assign({beforeRouteEnter:async function(e){let{data:t}=await Invicta.axios.get(`api${e.path}`,{params:e.query});e.meta.data=t}},{__name:"ResourceDetail",props:{resourceItem:Object},setup(e){const t=e;return Invicta.pageTitle(t.resourceItem.meta.pageTitle),(I,x)=>{const o=i,c=m;return r(),n("div",l,[a("div",u,[a("div",null,[s(o,{class:"breadcrumb",data:{name:"resourceIndex",params:{handle:e.resourceItem.meta.handle},text:e.resourceItem.meta.indexTitle}},null,8,["data"]),a("div",{innerHTML:e.resourceItem.header.title},null,8,h)]),e.resourceItem.header.info?(r(),n("div",{key:0,class:"header-details text-right",innerHTML:e.resourceItem.header.info},null,8,f)):d("",!0)]),s(c,{"form-id":`${e.resourceItem.meta.handle}.${e.resourceItem.meta.id}.detail`,resource:e.resourceItem,headless:!0,"action-url":""},null,8,["form-id","resource"])])}}});export{y as default};