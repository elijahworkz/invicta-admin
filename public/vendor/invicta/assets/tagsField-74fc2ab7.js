import{_ as y}from"./FieldBase-bfa75bd1.js";import{h as V,s as x,o as r,c as B,w as m,f as n,i,u as c,ao as T,d as p,F as w,k as C,t as E,D as I,ab as b,a5 as S}from"./vendor-729ab78d.js";/* empty css             */import{u as D}from"./field-ae2f09e1.js";/* empty css                  */import"./FormBase-278ff588.js";/* empty css             *//* empty css             */import"./main-69b98684.js";/* empty css                      */const N={class:"tags-field"},R={class:"flex items-center mb-3"},$={class:"tags-list"},M={__name:"tagsField",props:{formId:String,data:Object,path:String},setup(d){const u=d,a=D(u).value(),t=V(""),o=x(()=>a.value===null?[]:a.value),_=()=>{let e=t.value.trim();e.length===0||o.value.includes(e)||(a.value=[...o.value,e],t.value="")},f=e=>{a.value=o.value.filter(s=>s!==e)},g=e=>{e.keyCode===13&&(e.stopPropagation(),_())};return(e,s)=>{const v=b,h=S,k=y;return r(),B(k,{"form-id":d.formId,"field-props":u},{default:m(()=>[n("div",N,[n("div",R,[i(v,{modelValue:c(t),"onUpdate:modelValue":s[0]||(s[0]=l=>T(t)?t.value=l:null),placeholder:"Add Tag...",class:"mr-2",onKeydown:g},null,8,["modelValue"])]),n("div",$,[(r(!0),p(w,null,C(c(o),(l,F)=>(r(),p("span",{class:"tag",key:F},[n("span",null,E(l),1),i(h,{class:"remove-tag",onClick:A=>f(l),title:"Remove Tag"},{default:m(()=>[i(c(I))]),_:2},1032,["onClick"])]))),128))])])]),_:1},8,["form-id","field-props"])}}};export{M as default};