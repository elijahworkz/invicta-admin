import{h as u,z as w,as as $,b6 as x,b7 as B,b8 as S,B as D,o as t,d as n,f as a,b as h,u as v,c as N,n as C,e as g,C as O,F as m,i as k,w as b,b9 as z,t as y,k as A}from"./vendor-729ab78d.js";import{a as P}from"./main-69b98684.js";const V=["aria-expanded"],F={class:"popover-content"},I={__name:"Popover",props:{disabled:{type:Boolean,default:!1},placement:{type:String,default:"bottom-end"}},setup(o){const d=o,s=u(!1),p=u(),e=u();let c;w(()=>{d.disabled||i()});const _=()=>{s.value=!0,c.update()},r=()=>s.value=!1,f=()=>s.value?r():_();$("esc",l=>{l.preventDefault(),r()});function i(){c=x(p.value,e.value,{placement:d.placement,modifiers:[B,S]})}return D(e,()=>r()),(l,T)=>(t(),n(m,null,[a("div",{onClick:f,ref_key:"trigger",ref:p,class:"popover-trigger","aria-haspopup":"true","aria-expanded":v(s)},[h(l.$slots,"trigger")],8,V),(t(),N(O,{to:"#poppers"},[o.disabled?g("",!0):(t(),n("div",{key:0,ref_key:"popover",ref:e,class:C(["popover",{open:v(s)}])},[a("div",F,[h(l.$slots,"default",{close:r})])],2))]))],64))}},M={class:"actions-popover flex items-center"},j={title:"More actions",class:"action-icon"},E={class:"text-center my-2 opacity-60"},H=a("div",{class:"divider"},null,-1),K=["onClick"],L={key:0,class:"divider"},J={__name:"ActionsDropdown",props:{actions:Array,item:Number|Object,title:String},emits:["close","selected"],setup(o,{emit:d}){const s=o;u();const p=e=>{console.log("inside actions dropdown",e);let c="action"in e?e.action:e;d("selected",{action:c,item:s.item})};return(e,c)=>{const _=P,r=I;return t(),n("div",M,[k(r,null,{trigger:b(()=>[a("span",j,[k(_,{icon:v(z),width:18},null,8,["icon"])])]),default:b(({close:f})=>[o.title?(t(),n(m,{key:0},[a("p",E,y(o.title),1),H],64)):g("",!0),a("ul",null,[(t(!0),n(m,null,A(o.actions,i=>(t(),n(m,null,[a("li",{onClick:l=>{p(i),f()},class:C(["el-dropdown-menu__item",{danger:i.danger}])},y(i.name),11,K),i.divider?(t(),n("li",L)):g("",!0)],64))),256))])]),_:1})])}}};export{J as _,I as a};