import{r as u,a as L,o,c as i,b as r,d as t,t as s,f as d,w as c,g as k,F as _,i as f,aM as C,e as E,aR as h}from"./main.a5ff2e24.js";import{E as H}from"./card.1650c4a6.js";import{_ as V}from"./ActionsDropdown.847b3c30.js";import"./events.93559d81.js";/* empty css             */import{c as D}from"./el-overlay.007e1a77.js";import"./index.1151f2e6.js";import"./typescript.72bf8adc.js";import"./vnode.d77630c0.js";import"./validator.b92c0772.js";import"./scroll.e25d9b63.js";const $={class:"p-10 w-2/3 mx-auto"},v={class:"flex items-end justify-start mb-4"},U={class:"mb-1"},A={class:"ml-auto"},N={class:"list-table"},S={key:1},T={class:"w-1"},I={key:1,class:"opacity-10"},M=t("svg",{viewBox:"0 0 24 24",width:"200",class:"mx-auto"},[t("path",{fill:"currentColor",d:"M11,10H5L3,8L5,6H11V3L12,2L13,3V4H19L21,6L19,8H13V10H19L21,12L19,14H13V20A2,2 0 0,1 15,22H9A2,2 0 0,1 11,20V10Z"})],-1),j=[M],X={__name:"NavIndex",props:{title:String,navs:Object,createUrl:String,editUrl:String,canCreate:Boolean,canEdit:Boolean,canDelete:Boolean},setup(n){const l=n,p=[{name:"Edit",divider:!0,action:"edit"},{name:"Delete",action:"delete",danger:!0}].filter(e=>{switch(e.action){case"edit":return l.canEdit;case"delete":return l.canDelete}return!0}),g=e=>{console.log("got event",e),e.action=="edit"&&h.Inertia.get(`${l.editUrl}/${e.item}`),e.action=="delete"&&y(e.item)};function y(e){D.confirm("This action will permanently delete records from database. Are you sure you want to continue?","Deleting",{confirmButtonText:"Delete",cancelButtonText:"Cancel",confirmButtonClass:"el-button--danger"}).then(()=>{h.Inertia.delete(`${l.editUrl}/${e}`)}).catch(()=>console.log("cancel"))}return(e,F)=>{const x=u("Head"),m=u("Link"),B=L,b=V,w=H;return o(),i(_,null,[r(x,{title:n.title},null,8,["title"]),t("div",$,[t("div",v,[t("div",null,[t("h1",U,s(n.title),1)]),t("div",A,[n.canCreate?(o(),d(B,{key:0,type:"primary"},{default:c(()=>[r(m,{href:n.createUrl},{default:c(()=>[f("Create new")]),_:1},8,["href"])]),_:1})):k("",!0)])]),n.navs.data.length?(o(),d(w,{key:0,"body-style":"padding: 0px"},{default:c(()=>[t("table",N,[t("tbody",null,[(o(!0),i(_,null,C(n.navs.data,a=>(o(),i("tr",null,[t("td",null,[n.canEdit?(o(),d(m,{key:0,href:`${n.editUrl}/${a.id}/items`},{default:c(()=>[f(s(a.title),1)]),_:2},1032,["href"])):(o(),i("span",S,s(a.title),1))]),t("td",null,s(a.handle),1),t("td",T,[r(b,{actions:E(p),item:a.id,onSelected:g},null,8,["actions","item"])])]))),256))])])]),_:1})):(o(),i("div",I,j))])],64)}}};export{X as default};