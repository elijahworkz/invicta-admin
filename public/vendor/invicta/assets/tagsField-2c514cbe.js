import{_ as y}from"./FieldBase-e07d0721.js";import{h as V,s as x,o as r,c as B,w as m,f as n,i,u as c,ap as T,d as p,F as w,k as C,t as E,D as I,a8 as S,ak as b}from"./vendor-6f7baac1.js";/* empty css             */import{u as D}from"./field-d0ec925e.js";/* empty css                  */import"./FormBase-8dc6e386.js";/* empty css             *//* empty css             */import"./main-94816a90.js";/* empty css                      */const N={class:"tags-field"},R={class:"flex items-center mb-3"},$={class:"tags-list"},M={__name:"tagsField",props:{formId:String,data:Object,path:String},setup(d){const u=d,a=D(u).value(),t=V(""),s=x(()=>a.value===null?[]:a.value),_=()=>{let e=t.value.trim();e.length===0||s.value.includes(e)||(a.value=[...s.value,e],t.value="")},f=e=>{a.value=s.value.filter(o=>o!==e)},g=e=>{e.keyCode===13&&(e.stopPropagation(),_())};return(e,o)=>{const v=S,k=b,h=y;return r(),B(h,{"form-id":d.formId,"field-props":u},{default:m(()=>[n("div",N,[n("div",R,[i(v,{modelValue:c(t),"onUpdate:modelValue":o[0]||(o[0]=l=>T(t)?t.value=l:null),placeholder:"Add Tag...",class:"mr-2",onKeydown:g},null,8,["modelValue"])]),n("div",$,[(r(!0),p(w,null,C(c(s),(l,F)=>(r(),p("span",{class:"tag",key:F},[n("span",null,E(l),1),i(k,{class:"remove-tag",onClick:A=>f(l),title:"Remove Tag"},{default:m(()=>[i(c(I))]),_:2},1032,["onClick"])]))),128))])])]),_:1},8,["form-id","field-props"])}}};export{M as default};