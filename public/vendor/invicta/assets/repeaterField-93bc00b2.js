import{_ as E}from"./FieldBase-b9b0f427.js";import{u as L,g as j,b as U}from"./FormBase-6f6b74e6.js";import{u as H}from"./field-ac33109e.js";import{o as n,d as k,k as f,w as s,h as w,f as y,g as v,e as x,u as o,aD as P,J as O,t as F,a_ as I,aJ as B,I as S,al as q,n as z,H as J,a$ as G,b0 as K,y as D,U as M,F as Q,p as W}from"./vendor-e43ae8f2.js";import{b as X}from"./main-33d5bcdf.js";import{d as T,_ as V}from"./vuedraggable.umd-67ae588c.js";/* empty css                  *//* empty css                      *//* empty css             */import"./dynamic-import-helper-be004503.js";/* empty css             */import"./vue.runtime.esm-bundler-c3a309ec.js";const Y={class:"inline-repeater-field"},Z={class:"field-row flex items-center"},ee={key:0,class:"mt-3"},te={__name:"InlineRepeater",props:{list:{type:Array,default:[],required:!0},default:{type:Object,default(e){return{}}},itemName:String,itemTitle:Function,panelClass:String,disableDraggable:{type:Boolean,default:!1},readOnly:{type:Boolean,default:!1}},emits:["updated"],setup(e,{emit:i}){const t=e,_=i,p=t.list.length?t.list[0]:t.default;function m(){let a=I(p),r=[...B(t.list),a];_("updated",r)}function b(a){t.list.splice(a,1)}return(a,d)=>{const r=V,g=X,h=S;return n(),k("div",Y,[f(o(T),{list:e.list,handle:".handle","item-key":"index",disabled:e.disableDraggable,onUpdate:d[0]||(d[0]=$=>a.$emit("updated",e.list))},{item:s(({element:$,index:u})=>[w("div",Z,[!e.disableDraggable&&!e.readOnly?(n(),y(r,{key:0,class:"handle cursor-grab opacity-50"})):v("",!0),x(a.$slots,"default",{item:$,index:u}),e.readOnly?v("",!0):(n(),y(h,{key:1,text:"",onClick:l=>b(u)},{default:s(()=>[f(g,{icon:o(P),width:18},null,8,["icon"])]),_:2},1032,["onClick"]))])]),_:3},8,["list","disabled"]),e.readOnly?v("",!0):(n(),k("div",ee,[f(h,{type:"primary",onClick:m},{default:s(()=>[O("Add "+F(e.itemName),1)]),_:1})]))])}}};const ae={class:"repeater-field"},le={class:"ml-2"},ne={class:"delete-row-button ml-auto mr-4"},ie={class:"flex-1 text-right"},se={key:0,class:"mt-3"},oe={__name:"CollapseRepeater",props:{list:{type:Array,default:[],required:!0},default:{type:Object,default(e){return{}}},itemName:{type:String,default:"row"},itemTitle:{type:Function,default(e,i){return"Empty"}},panelClass:{type:String,default:""},disableDraggable:{type:Boolean,default:!1},readOnly:{type:Boolean,default:!1}},emits:["updated"],setup(e,{emit:i}){const t=e,_=i,p=t.list.length?t.list[0]:t.default;function m(){let a=I(p),r=[...B(t.list),a];_("updated",r)}function b(a){t.list.splice(a,1)}return(a,d)=>{const r=V,g=S,h=G,$=K;return n(),k("div",ae,[f($,{accordion:""},{default:s(()=>[f(o(T),{list:e.list,handle:".handle","item-key":"index",disabled:e.disableDraggable,onUpdate:d[0]||(d[0]=u=>a.$emit("updated",e.list))},{item:s(({element:u,index:l})=>[f(h,{name:l,disabled:e.readOnly},{title:s(()=>[e.disableDraggable?v("",!0):(n(),y(r,{key:0,class:"handle cursor-grab"})),w("span",le,F(e.itemTitle(u,l)),1),w("div",ne,[e.readOnly?v("",!0):(n(),y(g,{key:0,text:"",icon:o(q),onClick:c=>b(l)},null,8,["icon","onClick"]))])]),default:s(()=>[w("div",{class:z(["panel py-3",e.panelClass])},[w("div",ie,[f(g,{type:"danger",text:"",size:"small",icon:o(J),onClick:c=>b(l)},{default:s(()=>[O("Remove "+F(e.itemName),1)]),_:2},1032,["icon","onClick"])]),x(a.$slots,"default",{item:u,index:l})],2)]),_:2},1032,["name","disabled"])]),_:3},8,["list","disabled"])]),_:3}),e.readOnly?v("",!0):(n(),k("div",se,[f(g,{type:"primary",onClick:m},{default:s(()=>[O("Add "+F(e.itemName),1)]),_:1})]))])}}},$e={__name:"repeaterField",props:{formId:String,data:Object,path:String},setup(e){const i=e,{data:t,path:_}=i,p=L(i.formId),m=H(i),b=D(()=>m.get("inline",!1)?te:oe),a=!m.get("draggable",!0),d=D(()=>j(t.fields)),r=D(()=>p.get(i.path,[d.value])),g=m.get("itemName","row");function h(l,c){let C="titleField"in t?t.titleField:"title",R=[_,c,C];return p.get(R.join("."),`${C} #${c}`)}const $=(l,c)=>`${_}.${c}.${l}`;function u(l){let c=[...B(l)];p.set(i.path,c)}return(l,c)=>{const C=U,R=E;return n(),y(R,{"form-id":e.formId,"field-props":i},{default:s(()=>[(n(),y(M(o(b)),{list:o(r),"item-name":o(g),"item-title":h,"default-row":o(d),"disable-draggable":a,"read-only":o(m).disabled,"panel-class":"group",onUpdated:u},{default:s(A=>[(n(!0),k(Q,null,W(o(t).fields,N=>(n(),y(C,{"form-id":e.formId,"field-data":N,"data-path":$(N.id,A.index)},null,8,["form-id","field-data","data-path"]))),256))]),_:1},40,["list","item-name","default-row","read-only"]))]),_:1},8,["form-id","field-props"])}}};export{$e as default};