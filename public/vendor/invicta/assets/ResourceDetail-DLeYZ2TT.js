import{a as i,_ as m}from"./FormBase-OGw2L5uy.js";import{d as r,h as a,k as n,g as d,o as s}from"./vendor-DJE8ga0U.js";import"./dropdown-menu-C_E2RjSt.js";import"./Loading-BFgnQjTV.js";import"./main-B4RZwH-e.js";/* empty css             */const l={class:"py-6 px-10"},u={class:"flex items-end justify-between mb-4"},h=["innerHTML"],f=["innerHTML"],k=Object.assign({beforeRouteEnter:async function(e){let{data:t}=await Invicta.axios.get(`api${e.path}`,{params:e.query});e.meta.data=t}},{__name:"ResourceDetail",props:{resourceItem:Object},setup(e){const t=e;return Invicta.pageTitle(t.resourceItem.meta.pageTitle),(I,x)=>{const o=i,c=m;return s(),r("div",l,[a("div",u,[a("div",null,[n(o,{class:"breadcrumb",data:{name:"resourceIndex",params:{handle:e.resourceItem.meta.handle},text:e.resourceItem.meta.indexTitle}},null,8,["data"]),a("div",{innerHTML:e.resourceItem.header.title},null,8,h)]),e.resourceItem.header.info?(s(),r("div",{key:0,class:"header-details text-right",innerHTML:e.resourceItem.header.info},null,8,f)):d("",!0)]),n(c,{"form-id":`${e.resourceItem.meta.handle}.${e.resourceItem.meta.id}.detail`,resource:e.resourceItem,headless:!0,"page-form":!0,"action-url":""},null,8,["form-id","resource"])])}}});export{k as default};
