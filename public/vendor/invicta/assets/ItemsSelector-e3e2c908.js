import{j as f,y as k,B as q,aJ as N,o,d as g,h as n,f as d,w as m,F as T,p as A,u as e,ae as D,g as h,k as i,J as v,t as H,aE as J,aF as L,s as O,am as M,I as G}from"./vendor-e43ae8f2.js";import{c as K,b as Q,a as W}from"./resource-3342f103.js";/* empty css               */import{_ as X}from"./Loading-8b3af1c7.js";import{a as Y,_ as Z}from"./Filters-40de431b.js";const ee={class:"w-full flex flex-col"},te={class:"p-3"},ae={class:"flex items-center justify-between gap-2"},le={class:"bg-white px-2 pt-2"},se={key:0,class:"flex items-center justify-center h-full"},ne={class:"pagination px-2"},oe={class:"button-row"},re={class:"mr-2"},pe={__name:"ItemsSelector",props:{resourceHandle:String,exclude:Array,requestUrl:String,titleField:String,select:{type:Array,default:[]},columns:{type:Object,default:()=>({id:{label:"ID",sortable:!0,align:"center",width:70},title:{label:"Title",sortable:!0},created:{label:"Created"}})},singleSelect:{type:Boolean,default:!1},resources:{type:Array,default:[]},where:String},emits:["selected"],setup(u,{emit:F}){const a=u,w=F,p=f(!1),t=K(`items-${a.resourceHandle}`),l=f({handle:a.resourceHandle}),b=k(()=>a.resources.length?l.value.titleField:a.titleField);q(()=>{a.resources.length&&(l.value=a.resources[0]),t.setPage(1),S()});const y=f([]),U=s=>{y.value=s},B=k(()=>y.value.map(s=>({id:s.id,[b.value]:s.title,item:N(s)}))),$=()=>{Invicta.emit("clear-filters"),w("selected",B.value)};function S(){p.value=!0;let s={paginate:!0,title:b.value,exclude:a.exclude};a.select.length&&(s.select=a.select),a.where!=""&&(s.where=a.where);let r=a.resources.length?`api/resource/${l.value.handle}/items`:a.requestUrl;Invicta.axios.get(r,{params:s}).then(({data:_})=>{t.initForm(r,_),t.getResourceFilters(l.value.handle),p.value=!1})}return(s,r)=>{const _=J,P=L,R=Q,C=Y,E=Z,I=X,V=W,z=O,j=M,x=G;return o(),g("div",ee,[n("header",te,[n("div",ae,[u.resources.length?(o(),d(P,{key:0,modelValue:e(l),"onUpdate:modelValue":r[0]||(r[0]=c=>D(l)?l.value=c:null),"value-key":"handle",teleported:!1,onChange:S},{default:m(()=>[(o(!0),g(T,null,A(u.resources,c=>(o(),d(_,{key:c.handle,label:c.label,value:c},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])):h("",!0),e(l).handle?(o(),d(R,{key:1,size:"default",handle:e(l).handle,onUpdate:e(t).setSearch},null,8,["handle","onUpdate"])):h("",!0),e(l).handle&&e(t).static.filters?(o(),d(C,{key:2,"resource-handle":e(l).handle,filters:e(t).static.filters,"active-filters":e(t).data.activeFilters},null,8,["resource-handle","filters","active-filters"])):h("",!0)])]),n("div",le,[i(E,{badges:e(t).data.filterBadges},null,8,["badges"])]),n("main",null,[e(p)?(o(),g("div",se,[i(I)])):(o(),d(z,{key:1},{default:m(()=>[i(V,{"resource-handle":e(l).handle,data:e(t).data.resourceData,columns:u.columns,"columns-select":!1,"no-actions":!0,"single-select":u.singleSelect,onSelect:U},null,8,["resource-handle","data","columns","single-select"])]),_:1}))]),n("footer",null,[n("div",ne,[i(j,{background:"",small:"",layout:"prev, pager, next, jumper","current-page":e(t).data.currentPage,"page-size":e(t).data.perPage,"pager-count":5,total:e(t).data.total,"onUpdate:pageSize":e(t).setPageSize,"onUpdate:currentPage":e(t).setPage},null,8,["current-page","page-size","total","onUpdate:pageSize","onUpdate:currentPage"])]),n("div",oe,[n("div",re,[v("Total: "),n("strong",null,H(e(t).total),1)]),i(x,{class:"ml-auto mr-2",text:"",onClick:r[1]||(r[1]=c=>s.$emit("cancel"))},{default:m(()=>[v("Cancel")]),_:1}),i(x,{type:"primary",onClick:$},{default:m(()=>[v("Select")]),_:1})])])])}}};export{pe as _};