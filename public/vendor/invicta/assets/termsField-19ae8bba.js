import{_ as b}from"./FieldBase-2e1b6f77.js";import"./base-efd572b7.js";import{l as F,_ as I}from"./tooltip-84badc71.js";import{E as w}from"./popper-22a3aa8c.js";import{u as C}from"./index-d303f183.js";import{u as V}from"./field-3ca8e767.js";import{w as B}from"./pinia-e557e134.js";import{c as P,a as S,o as $,b as c,e as E,w as f,l as m,F as M,x as N,u as l,n as h,g as n,t as j,m as v,j as O}from"./runtime-core.esm-bundler-1c6b45c9.js";/* empty css                  */import"./index-c0c4279c.js";import"./index-5634fb36.js";import"./index-a6671ae7.js";import"./_initCloneObject-1265d3af.js";import"./aria-60e0cdc6.js";import"./isNil-c75b1b34.js";import"./index-aab15e85.js";import"./lodash-42c17880.js";import"./condition-69d55c79.js";const z=["value","id","checked"],D=n("span",{class:"el-checkbox__inner"},null,-1),L=["for"],R=["onClick"],ce={__name:"termsField",props:{formId:String,data:Object,path:String},setup(d){const s=d,u=C(s.formId),o=V(s).value([]),i=P(()=>o.value.map(e=>e.id)),k=e=>{let a=parseInt(e.target.value);o.value.length||(o.value=[]),i.value.includes(a)?o.value=o.value.filter(r=>r.id!==a):(console.log("we should push here"),o.value.push({id:a,pivot:{primary:0}}))},p=e=>{let a=o.value.filter(r=>r.id==e)[0];return a?a.pivot.primary==1:!1},x=e=>{o.value=o.value.map(r=>(r.pivot.primary=r.id==e?1:0,r));let a={resource:u.meta.handle,resource_id:u.meta.id,related:s.data.id,term_id:e,sync:[...i.value]};Invicta.axios.post(s.data.options,a)},_=S([]);return $(()=>{let e=u.meta.handle;Invicta.axios.get(s.data.options,{params:{resource:e}}).then(({data:a})=>{_.value=a})}),(e,a)=>{const r=I,y=w,g=b;return c(),E(g,{"form-id":d.formId,"field-props":s,class:"checkbox-group stacked"},{default:f(()=>[(c(!0),m(M,null,N(l(_),(t,q)=>(c(),m("label",{class:h(["el-checkbox el-checkbox--large !mx-0",{"is-checked":l(i).includes(t.id),primary:p(t.id)}])},[n("span",{class:h(["el-checkbox__input",{"is-checked":l(i).includes(t.id)}])},[n("input",{class:"el-checkbox__original",type:"checkbox",value:t.id,id:`term-${t.id}`,checked:l(i).includes(t.id),onChange:k},null,40,z),D],2),n("label",{for:`term-${t.id}`,class:"el-checkbox__label"},j(t.title),9,L),d.data.hasPrimary&&l(i).includes(t.id)?(c(),m("span",{key:0,class:"ml-auto make-primary",onClick:B(A=>x(t.id),["prevent"])},[v(y,{content:p(t.id)?"Primary":"Make Primary",placement:"left"},{default:f(()=>[v(r,{icon:l(F),width:16,class:"action-icon"},null,8,["icon"])]),_:2},1032,["content"])],8,R)):O("",!0)],2))),256))]),_:1},8,["form-id","field-props"])}}};export{ce as default};