import{W as p,j as n,y as d,O as _,B as f,d as v,u as e,l as g,f as h,g as x,X as y,o as i}from"./vendor-C9Ftzu-z.js";/* empty css                */import{_ as I}from"./FormBase-Dj4VTUt2.js";import{_ as b}from"./main-BO1bNoOs.js";/* empty css                      *//* empty css             */import"./dynamic-import-helper-BxLOqBCD.js";/* empty css             */const B={class:"py-6 px-10"},E=!1,R=Object.assign({beforeRouteEnter:async function(r){let{data:o}=await Invicta.axios.get(`api${r.path}`,{params:r.query});r.meta.data=o}},{__name:"ResourceEdit",props:{data:null|Object},setup(r){const o=r,a=p(),s=n(!1),t=n(o.data);Invicta.user,n([]);const u=d(()=>`resource/${a.params.handle}/${a.params.id||"create"}`);return _(()=>a.params.handle+a.params.id,()=>{console.log("I see params change"),s.value=!0,t.value=null,Invicta.axios.get(`api${a.path}`).then(({data:c})=>{t.value=c,s.value=!1})}),f(()=>{}),(c,j)=>{const m=I,l=y;return i(),v("div",B,[e(t)?g((i(),h(m,{key:0,"form-id":e(u),resource:e(t),"action-url":e(t).meta.actionUrl,breadcrumb:{name:"resourceIndex",params:{handle:e(a).params.handle},text:e(t).meta.indexTitle},"read-only":E,"page-form":!0},null,8,["form-id","resource","action-url","breadcrumb"])),[[l,e(s)]]):x("v-if",!0)])}}}),F=b(R,[["__file","/Users/ilyagromov/code/Invicta/invicta-admin/resources/js/pages/ResourceEdit.vue"]]);export{F as default};