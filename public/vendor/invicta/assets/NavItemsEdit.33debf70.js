import{B as O,A as f,Q as Z,o as g,c as D,d as c,t as k,e as I,b as l,b5 as ee,w as s,i as x,a as R,r as L,f as $,J as te,aL as le,a9 as oe,aO as ae,cg as ne,aP as se,g as V,F as B,aR as ie,aT as re,b3 as ue,aM as de,aN as ce}from"./main.0ef6c703.js";import{E as me,a as pe}from"./form.d0870869.js";import{E as _e}from"./switch.06785058.js";/* empty css                  */import{E as ve}from"./index.7b3a76dc.js";import{_ as fe}from"./ItemsSelector.39c61ca1.js";import{_ as he}from"./ActionsDropdown.b49d60a1.js";import{E as be}from"./link.4b740b26.js";import{d as ge,_ as xe}from"./vuedraggable.umd.831c6b5e.js";import"./icon.acbdc9cd.js";import"./events.7b36ce45.js";import"./validator.4d5ad03d.js";import"./typescript.72bf8adc.js";import"./resource.e9584138.js";import"./select.1764d41f.js";import"./scroll.aabcd561.js";import"./index.42e2bd35.js";import"./functions.796266bd.js";import"./Loading.34fc89b5.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./Filters.c9e26bcf.js";import"./date-picker.0cae1537.js";import"./Search.7135fbb2.js";const Ie={class:"p-4 w-full"},ye={class:"mb-4 flex items-center justify-between"},we=c("div",{class:"info info-bottom opacity-60"},"Navigation label.",-1),Ce=c("div",{class:"info info-bottom opacity-60"},"Leave blank to make simple text item.",-1),$e=c("div",{class:"info info-bottom opacity-60"},"Set custom CSS classes.",-1),ke=c("div",{class:"info info-bottom opacity-60"},"Open link in the new tab.",-1),Ee={class:"text-right"},Ne={__name:"NavItemForm",props:{mode:String,itemData:Object},setup(p){const r=p,i=O(()=>r.mode=="create"?"Create Item":"Edit Item"),u=f(r.itemData),_=f(!1);return Z(()=>{if("id"in r.itemData&&r.itemData.id){_.value=!0;let a=`/resource/${r.itemData.handle}/${r.itemData.id}/uri`;Invicta.axios.get(a).then(({data:o})=>{u.value.url=o})}else _.value=!1}),(a,o)=>{const h=R,m=ve,b=me,y=_e,v=pe;return g(),D("div",Ie,[c("header",ye,[c("h1",null,k(I(i)),1),l(h,{icon:I(ee),text:"",circle:"",bg:"",onClick:o[0]||(o[0]=d=>a.$emit("close"))},null,8,["icon"])]),l(v,{"label-position":"top",class:"invicta-form"},{default:s(()=>[l(b,{label:"Label"},{default:s(()=>[l(m,{size:"large",modelValue:u.value.label,"onUpdate:modelValue":o[1]||(o[1]=d=>u.value.label=d)},null,8,["modelValue"]),we]),_:1}),l(b,{label:"URL"},{default:s(()=>[l(m,{size:"large",modelValue:u.value.url,"onUpdate:modelValue":o[2]||(o[2]=d=>u.value.url=d),disabled:_.value},null,8,["modelValue","disabled"]),Ce]),_:1}),l(b,{label:"CSS class"},{default:s(()=>[l(m,{size:"large",modelValue:u.value.css,"onUpdate:modelValue":o[3]||(o[3]=d=>u.value.css=d)},null,8,["modelValue"]),$e]),_:1}),l(b,{label:"Open in new tab"},{default:s(()=>[l(y,{size:"large",modelValue:u.value.external,"onUpdate:modelValue":o[4]||(o[4]=d=>u.value.external=d)},null,8,["modelValue"]),ke]),_:1}),c("div",Ee,[l(h,{type:"primary",size:"large",onClick:o[5]||(o[5]=d=>a.$emit("saved",u.value))},{default:s(()=>[x("Save Item")]),_:1})])]),_:1})])}}};const Se={class:"item flex items-center justify-start border rounded bg-white mb-1 p-2"},Ve={class:"ml-auto item-type"},De={__name:"NavTree",props:{list:Array,childActions:Array},emits:["addChild","editItem","removeItem"],setup(p,{emit:r}){const i=p,u=a=>{a.action=="remove"?(i.list.splice(a.item.index,1),r("removeItem",!0)):r("addChild",a)},_=a=>{console.log("editing",a),r("editItem",a)};return(a,o)=>{const h=xe,m=be,b=he,y=L("NavTree",!0);return g(),$(I(ge),{list:p.list,tag:"ul",group:{name:"g1"},"item-key":"label"},{item:s(({element:v,index:d})=>[c("li",null,[c("div",Se,[l(h,{class:"mr-2 text-gray-300 hover:text-gray-400"}),l(m,{underline:!1,onClick:N=>_(v)},{default:s(()=>[x(k(v.label),1)]),_:2},1032,["onClick"]),c("div",Ve,k(v.type),1),l(b,{actions:p.childActions,item:{index:d,...v},onSelected:u,class:"ml-3"},null,8,["actions","item"])]),l(y,{list:v.children,"child-actions":p.childActions,onAddChild:u,onEditItem:_,onRemoveItem:o[0]||(o[0]=N=>a.$emit("removeItem",!0))},null,8,["list","child-actions"])])]),_:1},8,["list"])}}};const Le={class:"py-6 px-10"},Ae={class:"w-1/2 mx-auto"},Ue={class:"flex items-end justify-between mb-4"},Fe={class:"mb-1"},Te={class:"nav-actions"},st={__name:"NavItemsEdit",props:{indexUrl:String,actionUrl:String,menu:Object,resources:Object},setup(p){const r=p,i=te({state:!1,context:"list"}),u=f(""),_=f(),a=f("link"),o=f(null),h=f(!1),m=f(r.menu.tree||[]),b=O(()=>m.value.reduce((e,n)=>(e[n.handle]=e[n.handle]||[],e[n.handle].push(n.id),e),{})),y=(e,n)=>(e.forEach(t=>{t.id==o.value.id&&t.handle==o.value.handle&&t.label==o.value.label?(console.log("debugging items",t.id,o.value.id,t.handle,o.value.handle),t.children.push(...n)):t.children.length&&(console.log("nav items have children"),y(t.children,n))}),e),v=e=>{i.state=!1;let n=e.map(t=>{var w;return{label:t[_.value],url:t==null?void 0:t.url,id:t==null?void 0:t.id,handle:a.value,type:((w=r.resources[a.value])==null?void 0:w.title)||(t==null?void 0:t.type),css:t==null?void 0:t.css,external:t==null?void 0:t.external,children:[]}});o.value?m.value=y(m.value,n):m.value=[...m.value,...n],o.value=null,a.value="custom",h.value=!0},d=le.exports.map(r.resources,(e,n)=>({name:e.title,action:n}));d.push({name:"Custom Link",action:"custom",divider:!0}),d.push({name:"Remove Item",action:"remove",danger:!0}),d.push({name:"Change Comment Name",action:"remove",danger:!0});const N=e=>{e=="custom"?U():A(e),a.value=e},z=e=>{console.log("adding child",e),o.value=e.item,a.value=e.action,e.action=="custom"?U():A(e.action)};function A(e){i.context="list",_.value=r.resources[e].titleField,u.value=`/resource/${e}/items`,i.state=!0}const E=f("create"),S=f({}),M={label:"",url:"",css:"",external:!1},U=()=>{E.value="create",S.value={...M},i.context="form",i.state=!0},j=e=>{i.state=!1,_.value="label",e.type=e.url==""?"Text":"Link",E.value=="create"&&v([e]),h.value=!0},H=e=>{console.log("editing item",e),E.value="edit",S.value=e,i.context="form",i.state=!0},q=()=>{ie.Inertia.post(r.actionUrl,{tree:m.value})};return(e,n)=>{const t=L("Head"),w=oe,J=L("Link"),F=R,T=ae,P=ne,Q=se,G=De,K=fe,W=Ne,X=re;return g(),D(B,null,[l(t,{title:p.menu.title},null,8,["title"]),c("div",Le,[c("div",Ae,[c("div",Ue,[c("div",null,[l(J,{href:p.indexUrl,class:"breadcrumb"},{default:s(()=>[l(w,null,{default:s(()=>[l(I(ue))]),_:1}),x("Navigation")]),_:1},8,["href"]),c("h1",Fe,k(p.menu.title),1)]),c("div",Te,[l(Q,{onCommand:N,class:"mr-2"},{dropdown:s(()=>[l(P,null,{default:s(()=>[(g(!0),D(B,null,de(p.resources,(C,Y)=>(g(),$(T,{command:Y},{default:s(()=>[x(k(C.title),1)]),_:2},1032,["command"]))),256)),l(T,{command:"custom"},{default:s(()=>[x("Custom Link")]),_:1})]),_:1})]),default:s(()=>[l(F,null,{default:s(()=>[x(" New Item"),l(w,{class:"el-icon--right"},{default:s(()=>[l(I(ce))]),_:1})]),_:1})]),_:1}),l(F,{type:"primary",onClick:q,disabled:!h.value},{default:s(()=>[x("Save Changes")]),_:1},8,["disabled"])])]),l(G,{list:m.value,"child-actions":I(d),onAddChild:z,onEditItem:H,onRemoveItem:n[0]||(n[0]=C=>h.value=!0)},null,8,["list","child-actions"])])]),i.state?(g(),$(X,{key:0,style:{width:"400px"},onClose:n[3]||(n[3]=C=>i.state=!1)},{default:s(()=>[i.context=="list"?(g(),$(K,{key:0,columns:{title:{label:"Title",sortable:!0}},exclude:I(b)[a.value],"request-url":u.value,"title-field":_.value,"resource-handle":a.value,onSelected:v,onCancel:n[1]||(n[1]=C=>i.state=!1)},null,8,["exclude","request-url","title-field","resource-handle"])):V("",!0),i.context=="form"?(g(),$(W,{key:1,mode:E.value,"item-data":S.value,onSaved:j,onClose:n[2]||(n[2]=C=>i.state=!1)},null,8,["mode","item-data"])):V("",!0)]),_:1})):V("",!0)],64)}}};export{st as default};