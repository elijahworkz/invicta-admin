import{j as p,B as k,o as a,d as i,u as e,f as c,g as n,k as m,l as F,h as u,J as x,t as S,an as U,X as j}from"./vendor-C9Ftzu-z.js";/* empty css                */import{c as B,b as P,a as z}from"./resource-CAfWRGzR.js";/* empty css               */import{a as w}from"./Loading-CMQXhIDh.js";import{a as N,_ as R}from"./Filters-wBFbPNPb.js";import{_ as V}from"./main-BO1bNoOs.js";/* empty css                 *//* empty css                  *//* empty css             */import"./functions-Chu8Drqh.js";/* empty css                    */const D={class:"mb-2"},I={key:0,class:"flex items-center justify-between"},T={key:1,class:"my-3"},E={key:2,class:"flex items-center justify-center h-full py-10"},L={class:"flex items-center justify-between p-3 mt-2"},C={__name:"tableField",props:{formId:String,data:Object,path:String},setup(l){const o=l,r=p(!1),s=p(),t=B(o.data.id);return k(()=>{r.value=!0,Invicta.axios.get(o.data.resourceUrl,{params:{settings:!0}}).then(({data:d})=>{t.initForm(o.data.resourceUrl,d),s.value=d,r.value=!1,o.data.searchFilter&&t.getResourceFilters(t.static.settings.handle)})}),(d,J)=>{const _=P,g=N,f=R,h=w,v=z,b=U,y=j;return a(),i("div",D,[e(s)&&l.data.searchFilter?(a(),i("div",I,[(a(),c(_,{size:"default",class:"max-w-sm",currentSearch:e(s).meta.search,key:e(t).static.settings.handle,onUpdate:e(t).setSearch},null,8,["currentSearch","onUpdate"])),e(t).static.filters?(a(),c(g,{key:0,"resource-handle":e(t).static.settings.handle,filters:e(t).static.filters,"active-filters":e(t).data.activeFilters},null,8,["resource-handle","filters","active-filters"])):n("v-if",!0)])):n("v-if",!0),e(r)?n("v-if",!0):(a(),i("div",T,[m(f,{badges:e(t).data.filterBadges},null,8,["badges"])])),e(r)?(a(),i("div",E,[m(h)])):e(s)?F((a(),c(v,{key:l.data.id,"resource-handle":e(t).static.settings.handle,data:e(t).data.resourceData,"table-props":e(t).static.settings.table,columns:e(t).static.settings.columns,"columns-select":!1,"can-edit":!1,"can-delete":!1,"has-detail":!1,"no-select":!0},null,8,["resource-handle","data","table-props","columns"])),[[y,e(t).data.loading]]):n("v-if",!0),u("div",L,[u("div",null,[x("Total: "),u("strong",null,S(e(t).data.total),1)]),e(s)&&e(s).meta.last_page>1?(a(),c(b,{key:0,background:"",small:"",layout:"prev, pager, next, jumper","current-page":e(t).data.currentPage,"page-size":e(t).data.perPage,"pager-count":5,total:e(t).data.total,"onUpdate:pageSize":e(t).setPageSize,"onUpdate:currentPage":e(t).setPage},null,8,["current-page","page-size","total","onUpdate:pageSize","onUpdate:currentPage"])):n("v-if",!0)])])}}},$=V(C,[["__file","/Users/ilyagromov/code/Invicta/invicta-admin/resources/js/components/form/fields/tableField.vue"]]);export{$ as default};