import{_ as y}from"./FieldBase.264e3152.js";import{A as B,B as V,o as r,f as x,w as u,d as n,b as i,c as m,aM as E,t as T,e as p,b5 as b,F as w,a9 as C}from"./main.31862163.js";import"./icon.cc985839.js";import{u as I}from"./field.169dfc97.js";import{E as S}from"./index.dec2a5a9.js";/* empty css                  */import"./FormBase.803ad2a4.js";import"./form.239eb997.js";import"./card.a62b76fe.js";import"./typescript.72bf8adc.js";const A={class:"tags-field"},N={class:"flex items-center mb-3"},$={class:"tags-list"},H={__name:"tagsField",props:{formId:String,data:Object,path:String},setup(c){const d=c,t=I(d).value(),a=B(""),o=V(()=>t.value===null?[]:t.value),_=()=>{let e=a.value.trim();e.length===0||o.value.includes(e)||(t.value=[...o.value,e],a.value="")},f=e=>{t.value=o.value.filter(s=>s!==e)},v=e=>{e.keyCode===13&&(e.stopPropagation(),_())};return(e,s)=>{const g=S,h=C,k=y;return r(),x(k,{"form-id":c.formId,"field-props":d},{default:u(()=>[n("div",A,[n("div",N,[i(g,{modelValue:a.value,"onUpdate:modelValue":s[0]||(s[0]=l=>a.value=l),placeholder:"Add Tag...",class:"mr-2",onKeydown:v},null,8,["modelValue"])]),n("div",$,[(r(!0),m(w,null,E(p(o),(l,F)=>(r(),m("span",{class:"tag",key:F},[n("span",null,T(l),1),i(h,{class:"remove-tag",onClick:D=>f(l),title:"Remove Tag"},{default:u(()=>[i(p(b))]),_:2},1032,["onClick"])]))),128))])])]),_:1},8,["form-id","field-props"])}}};export{H as default};