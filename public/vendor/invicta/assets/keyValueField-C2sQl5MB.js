import{_ as B}from"./FieldBase-BZCqSXH4.js";import{j as $,K as F,aa as g,a5 as S,o as i,f as x,w as f,h as e,t as c,d as _,F as C,p as L,u as h,l as k,bj as v,k as y,ak as N,B as U,D as j}from"./vendor-CalzCiyh.js";import{u as D}from"./field-ohOzcyTb.js";import"./dropdown-menu-hHkMNFC_.js";import"./Loading-BOKjay5j.js";import"./main-qjqVsijA.js";import"./FormBase-CxW-ONTk.js";/* empty css             */import"./dynamic-import-helper-BheWnx7M.js";const O={class:"keyValue-table"},E={colspan:"2"},I={class:"w-1/4"},K=["name","onUpdate:modelValue"],R=["name","onUpdate:modelValue"],T={class:"action"},A={class:"mt-3"},Y={__name:"keyValueField",props:{formId:String,data:Object,path:String},setup(a){const m=a,p=D(m).value({}),o=$(V(p.value));F(()=>o.value,(t,u)=>{p.value=t.reduce((l,n)=>(l[n.key]=n.value,l),{})},{deep:!0});function V(t){return g(t)&&(t=JSON.parse(t)),S(Object.entries(t),([u,l])=>({key:`${u}`,value:l}))}function b(){let t={key:"",value:""};o.value.push(t)}function w(t){o.value.splice(t,1)}return(t,u)=>{const l=j,n=B;return i(),x(n,{"form-id":a.formId,"field-props":m},{default:f(()=>[e("table",O,[e("thead",null,[e("tr",null,[e("th",null,c(a.data.keyLabel||"Key"),1),e("th",E,c(a.data.valueLabel||"Value"),1)])]),e("tbody",null,[(i(!0),_(C,null,L(h(o),(s,r)=>(i(),_("tr",null,[e("td",I,[k(e("input",{name:`${a.data.id}-key-${r}`,"onUpdate:modelValue":d=>s.key=d},null,8,K),[[v,s.key]])]),e("td",null,[k(e("input",{name:`${a.data.id}-value-${r}`,"onUpdate:modelValue":d=>s.value=d},null,8,R),[[v,s.value]])]),e("td",T,[y(l,{text:"",onClick:d=>w(r),icon:h(N)},null,8,["onClick","icon"])])]))),256))])]),e("div",A,[y(l,{type:"primary",onClick:b},{default:f(()=>[U(c(a.data.addLabel||"Add"),1)]),_:1})])]),_:1},8,["form-id","field-props"])}}};export{Y as default};
