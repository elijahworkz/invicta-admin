import{_ as F}from"./FieldBase-KzsvndNt.js";import{j as V,o as l,f as y,w as u,h as r,k as i,u as n,af as x,d as c,F as B,p as C,t as I,H as T,g as w,Z as E,a6 as j}from"./vendor-C9Ftzu-z.js";/* empty css             */import{u as N}from"./field-Cp00ZWfN.js";import{_ as S}from"./main-BO1bNoOs.js";/* empty css                  */import"./FormBase-Dj4VTUt2.js";/* empty css                      *//* empty css             */import"./dynamic-import-helper-BxLOqBCD.js";const b={class:"tags-field"},R={class:"flex items-center mb-3"},U={key:0,class:"tags-list"},A={__name:"tagsField",props:{formId:String,data:Object,path:String},setup(d){const m=d,t=N(m).value([]),o=V(""),p=()=>{let e=o.value.trim();e.length===0||t.value.includes(e)||(t.value=[...t.value,e],o.value="")},f=e=>{t.value=t.value.filter(a=>a!==e)},_=e=>{e.keyCode===13&&(e.stopPropagation(),p())};return(e,a)=>{const g=E,v=j,h=F;return l(),y(h,{"form-id":d.formId,"field-props":m},{default:u(()=>[r("div",b,[r("div",R,[i(g,{modelValue:n(o),"onUpdate:modelValue":a[0]||(a[0]=s=>x(o)?o.value=s:null),placeholder:"Add Tag...",class:"mr-2",onKeydown:_},null,8,["modelValue"])]),n(t).length?(l(),c("div",U,[(l(!0),c(B,null,C(n(t),(s,k)=>(l(),c("span",{class:"tag",key:k},[r("span",null,I(s),1),i(v,{class:"remove-tag",onClick:H=>f(s),title:"Remove Tag"},{default:u(()=>[i(n(T))]),_:2},1032,["onClick"])]))),128))])):w("v-if",!0)])]),_:1},8,["form-id","field-props"])}}},M=S(A,[["__file","/Users/ilyagromov/code/Invicta/invicta-admin/resources/js/components/form/fields/tagsField.vue"]]);export{M as default};