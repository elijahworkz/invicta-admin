import{_ as y}from"./FieldBase-33d4f749.js";import{h as V,s as x,o as r,c as B,w as m,f as n,i,u as c,ao as T,d as p,F as w,k as C,t as E,D as I,a7 as S,aj as b}from"./vendor-8718f028.js";/* empty css             */import{u as j}from"./field-944c4217.js";/* empty css                  */import"./FormBase-ac0c398b.js";/* empty css             *//* empty css             */import"./main-beb1e615.js";/* empty css                      */const D={class:"tags-field"},N={class:"flex items-center mb-3"},R={class:"tags-list"},M={__name:"tagsField",props:{formId:String,data:Object,path:String},setup(d){const u=d,a=j(u).value(),t=V(""),o=x(()=>a.value===null?[]:a.value),_=()=>{let e=t.value.trim();e.length===0||o.value.includes(e)||(a.value=[...o.value,e],t.value="")},f=e=>{a.value=o.value.filter(s=>s!==e)},g=e=>{e.keyCode===13&&(e.stopPropagation(),_())};return(e,s)=>{const v=S,h=b,k=y;return r(),B(k,{"form-id":d.formId,"field-props":u},{default:m(()=>[n("div",D,[n("div",N,[i(v,{modelValue:c(t),"onUpdate:modelValue":s[0]||(s[0]=l=>T(t)?t.value=l:null),placeholder:"Add Tag...",class:"mr-2",onKeydown:g},null,8,["modelValue"])]),n("div",R,[(r(!0),p(w,null,C(c(o),(l,F)=>(r(),p("span",{class:"tag",key:F},[n("span",null,E(l),1),i(h,{class:"remove-tag",onClick:A=>f(l),title:"Remove Tag"},{default:m(()=>[i(c(I))]),_:2},1032,["onClick"])]))),128))])])]),_:1},8,["form-id","field-props"])}}};export{M as default};