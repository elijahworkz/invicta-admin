import{p as C,r as g,g as w,B as P,c as i,d as o,a as s,h as m,u as _,F as u,o as r,b as j,$ as F,a8 as h,j as N,E as S,t as V,i as T}from"./main-d76c405e.js";import{a as H}from"./form-e63502e9.js";import{E as O}from"./card-d402f5ea.js";import{_ as U}from"./CheckTree-ca33f2a5.js";import{c as $}from"./functions-3a992e53.js";import"./checkbox-377f2af3.js";import"./event-9519ab40.js";const D={class:"py-6 px-10"},L={class:"flex items-end justify-between mb-4"},M=s("div",null,[s("h1",{class:"mb-1"},"Permissions")],-1),q={class:"w-full"},z={class:"pb-6"},A={key:0,class:"text-base font-bold pb-2"},G={class:"px-5"},Z={__name:"Edit",props:{tree:Object,permissions:Object,actionUrl:String},setup(f){const n=f,a=C({permissions:[]}),c=g([]);w(()=>{b(n.tree)});function b(e){e.map(t=>{c.value.push({label:t.label,checked:!0,children:t.permissions.map(l=>p(l))})})}function p(e){return{label:e.label,value:e.permission,checked:n.permissions.length?n.permissions.includes(e.permission):!1,children:e.children?e.children.map(t=>p(t)):[]}}const v=P(()=>{const e=$(c.value);return h.pickBy(e,h.isString)});function k(){a.permissions=v,a.post(n.actionUrl,{onFinish:()=>a.reset("password")})}return(e,t)=>{const l=N("Head"),x=S,E=U,y=O,B=H;return r(),i(u,null,[o(l,{title:"Permissions"}),s("div",D,[o(B,{class:"invicta-form w-2/3",model:_(a)},{default:m(()=>[s("div",L,[M,o(x,{type:"primary",onClick:k},{default:m(()=>[j("Save")]),_:1})]),s("div",q,[(r(!0),i(u,null,F(_(c),d=>(r(),i("div",z,[d.label?(r(),i("header",A,V(d.label),1)):T("",!0),o(y,null,{default:m(()=>[s("div",G,[o(E,{"initial-items":d.children,disabled:!1,depth:1},null,8,["initial-items"])])]),_:2},1024)]))),256))])]),_:1},8,["model"])])],64)}}};export{Z as default};