import{r as w,g as V,o as a,c as v,u as n,f as c,k as u,d as y,b as h,j as r,E as q,t as F,a8 as H,i as x,a as C,H as z,cG as G,cH as M,cI as P,F as T,af as S,q as J,_ as K}from"./main-c4840b76.js";import{u as Q,_ as X}from"./FormBase-146c11ff.js";import{_ as Y}from"./ItemsSelector-4f2d0062.js";import{d as Z,_ as ee}from"./vuedraggable.umd-8e0569ad.js";import{E as te}from"./link-5f877a14.js";const ne={class:"w-9/12 pt-12 mx-auto"},se={__name:"ItemsForm",props:{requestUrl:String,createWith:Object},setup(s){const f=s,e=w(null),d=w(null),{createWith:t}=f;V(()=>{Invicta.axios.get(f.requestUrl).then(({data:o})=>{e.value=o,d.value=o.meta.id?`${o.meta.handle}.${o.meta.id}`:`${o.meta.handle}.new`})});const k=()=>{if(t){const o=Q(d.value);console.log("I see createWith",t,t.field,t.value,o.form),o.set(t.field,t.value),o.setReadOnly(t.field)}};return(o,_)=>{const $=q,g=X;return a(),v("div",ne,[n(e)?(a(),c(g,{key:0,"form-id":n(d),resource:n(e),"action-url":n(e).meta.actionUrl,"post-submit-actions":["close","edit","create"],onFormReady:k},{"form-actions":u(()=>[y($,{class:"ml-auto mr-2",text:"",onClick:_[0]||(_[0]=D=>o.$emit("cancel"))},{default:u(()=>[h("Cancel")]),_:1})]),_:1},8,["form-id","resource","action-url"])):r("",!0)])}}},ie={key:1,class:"px-2"},le={__name:"ItemListItem",props:{item:Object,titleField:String,canEdit:Boolean},setup(s){return(f,e)=>{const d=te;return s.canEdit?(a(),c(d,{key:0,underline:!1,class:"px-2",onClick:e[0]||(e[0]=t=>f.$emit("edit",s.item.id))},{default:u(()=>[h(F(s.item[s.titleField]),1)]),_:1})):(a(),v("div",ie,F(s.item[s.titleField]),1))}}};const ae={class:"item flex items-center justify-start mb-2 border rounded"},oe={class:"ml-auto flex items-center"},re={key:0,class:"mr-2 text-gray-400"},ce={key:1,class:"action-icon",title:"Remove Item"},de={class:"flex mt-4"},ye={__name:"ItemsList",props:{list:{type:Array,default:[],required:!0},itemsUrl:String,fieldData:Object,resource:String,itemId:Number,sortable:Boolean,options:{type:Object,default:()=>({addItems:!1,createItems:!0})},select:{type:Array,default:[]},where:String},emits:["updated"],setup(s,{emit:f}){const e=s,d=`api/resource/${e.resource}`,t=H({state:!1,context:"list"}),k=x(()=>e.options.createItems&&Invicta.can(`create ${e.resource}`)),o=Invicta.can(`edit ${e.resource}`),_="titleField"in e.fieldData?e.fieldData.titleField:"title",$=x(()=>e.fieldData.itemComponent&&Invicta.componentExists(e.fieldData.itemComponent)?e.fieldData.itemComponent:le),g=x(()=>e.list.map(i=>i.id));function D(i){e.list.splice(e.list.findIndex(l=>l.id==i),1),f("updated",e.list)}const L=i=>{t.state=!1;let l=S(e.list),p=S(i),I=[...l,...p];f("updated",I)},b=w(""),j=i=>{t.context="form",t.state=!0,b.value=`${d}/${i}`},B=()=>{t.context="list",t.state=!0},R=x(()=>{if("createWith"in e.fieldData){let i=e.fieldData.createWith,l=typeof i=="object"?i.field:i,p=e.itemId;return typeof i=="object"&&(p="multiple"in createwith&&i.multiple?[{id:e.itemId}]:{id:e.itemId}),{field:l,value:p}}return null}),U=()=>{t.context="form",t.state=!0,b.value=`${d}/create`};return(i,l)=>{const p=ee,I=J,E=q,W=Y,O=se,N=K;return a(),v(T,null,[y(n(Z),{list:s.list,disabled:!s.sortable,handle:".drag-handle","item-key":"index",class:"items-stack w-full",onChange:l[0]||(l[0]=m=>i.$emit("updated",s.list))},{item:u(({element:m,index:A})=>[C("div",ae,[s.sortable?(a(),c(p,{key:0,class:"text-gray-300 hover:text-gray-400 mr-1"})):r("",!0),(a(),c(z(n($)),{item:m,index:A,"title-field":n(_),"can-edit":n(o),onEdit:j,class:"ml-1"},null,40,["item","index","title-field","can-edit"])),C("div",oe,[m.locale?(a(),v("span",re,F(m.locale),1)):r("",!0),s.options.addItems?(a(),v("span",ce,[y(I,{icon:n(G),onClick:me=>D(m.id),width:16},null,8,["icon","onClick"])])):r("",!0)])])]),footer:u(()=>[C("div",de,[n(k)?(a(),c(E,{key:0,type:"primary",text:"",bg:"",size:"small",onClick:U},{default:u(()=>[y(I,{icon:n(M),width:15,class:"mr-1"},null,8,["icon"]),h(" Create new ")]),_:1})):r("",!0),s.options.addItems?(a(),c(E,{key:1,type:"primary",text:"",bg:"",size:"small",onClick:B},{default:u(()=>[y(I,{icon:n(P),width:15,class:"mr-1"},null,8,["icon"]),h(" Add existing ")]),_:1})):r("",!0)])]),_:1},8,["list","disabled"]),n(t).state?(a(),c(N,{key:0,onClose:l[3]||(l[3]=m=>n(t).state=!1)},{default:u(()=>[n(t).context=="list"?(a(),c(W,{key:0,exclude:n(g),"resource-handle":s.resource,"request-url":s.itemsUrl,"title-field":n(_),select:s.select,where:s.where,onSelected:L,onCancel:l[1]||(l[1]=m=>n(t).state=!1)},null,8,["exclude","resource-handle","request-url","title-field","select","where"])):r("",!0),n(t).context=="form"?(a(),c(O,{key:1,"request-url":n(b),"create-with":n(R),onCancel:l[2]||(l[2]=m=>n(t).state=!1)},null,8,["request-url","create-with"])):r("",!0)]),_:1})):r("",!0)],64)}}};export{ye as _};