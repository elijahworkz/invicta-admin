import{h as S,s as v,ao as k,N as x,o as r,c as d,aP as B,u as e,w as y,i as p,bt as F,ap as U,bb as z,G as C,a7 as I,z as P,d as u,e as c,f as V,t as j,a4 as E}from"./vendor-0fe75759.js";import{u as b,_ as R}from"./ResourceTable-73e85e20.js";/* empty css               */import{_ as $}from"./Loading-0552770b.js";import{a as w,_ as N}from"./Filters-bf1bc384.js";import{d as T}from"./functions-582b82eb.js";/* empty css                 */import"./ActionsDropdown-6670124b.js";import"./main-1b37edeb.js";import"./CheckTree-b647ed57.js";/* empty css             *//* empty css                    */const D={__name:"FiltersSearch",props:{currentSearch:{type:String,default:""},searchStrings:{type:Object,default:()=>({placeholder:"Search",title:"Type to search"})},handle:String,filters:String},setup(s){const n=s,l=b(n.handle),t=S(n.currentSearch),a=v(()=>!k(l.activeFilters)||t.value!=="");x(t,T(m=>{Invicta.emit("search-change",{query:m,handle:n.handle})},400));const o=()=>{t.value="",Invicta.emit("clear-filters",n.handle)};return(m,i)=>{const h=w,f=C,_=I;return r(),d(_,{modelValue:e(t),"onUpdate:modelValue":i[0]||(i[0]=g=>U(t)?t.value=g:null),placeholder:s.searchStrings.placeholder,title:s.searchStrings.title,"prefix-icon":e(z),"input-style":{width:"250px"}},B({prepend:y(()=>[p(h,{"resource-handle":s.handle,filters:s.filters},null,8,["resource-handle","filters"])]),_:2},[e(a)?{name:"append",fn:y(()=>[p(f,{icon:e(F),onClick:o,title:"Clear all filters"},null,8,["icon"])]),key:"0"}:void 0]),1032,["modelValue","placeholder","title","prefix-icon"])}}},O={class:"mb-2"},q={key:0,class:"flex items-center"},G={class:"ml-auto"},L={key:1,class:"my-3"},M={key:2,class:"flex items-center justify-center h-full py-10"},se={__name:"tableField",props:{formId:String,data:Object,path:String},setup(s){const n=s,l=S(!1),t=S(),a=b(n.data.id);return P(()=>{l.value=!0,Invicta.axios.get(n.data.resourceUrl).then(({data:o})=>{a.init(n.data.resourceUrl,o,!0),t.value=o,l.value=!1})}),(o,m)=>{const i=D,h=N,f=$,_=R,g=E;return r(),u("div",O,[e(l)?c("",!0):(r(),u("div",q,[e(t)&&s.data.searchFilter?(r(),d(i,{key:0,currentSearch:e(t).meta.search,handle:e(a).handle,filters:e(t).meta.filters},null,8,["currentSearch","handle","filters"])):c("",!0),V("strong",G,"Total: "+j(e(a).total),1)])),e(l)?c("",!0):(r(),u("div",L,[p(h,{badges:e(a).filterBadges},null,8,["badges"])])),e(l)?(r(),u("div",M,[p(f)])):e(t)?(r(),d(_,{key:s.data.id,"resource-handle":e(a).handle,data:e(a).resourceData,"table-props":e(t).meta.table,columns:e(t).meta.columns,"columns-select":!1,"can-edit":!1,"can-delete":!1,"has-detail":!1,"no-select":!0},null,8,["resource-handle","data","table-props","columns"])):c("",!0),e(t)&&e(t).meta.last_page>1?(r(),d(g,{key:4,background:"",small:"",layout:"prev, pager, next, jumper",class:"mt-2 justify-end","current-page":e(a).currentPage,"page-size":e(a).perPage,"pager-count":5,total:e(a).total,"onUpdate:pageSize":e(a).pageSizeChange,"onUpdate:currentPage":e(a).pageChange},null,8,["current-page","page-size","total","onUpdate:pageSize","onUpdate:currentPage"])):c("",!0)])}}};export{se as default};