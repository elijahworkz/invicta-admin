import{_}from"./FieldBase-9693a1b3.js";import{aj as b,o as n,f as d,w as u,k as v,u as c,af as F,d as g,F as h,p as k,aF as B,aG as V}from"./vendor-c78d3678.js";/* empty css               */import{u as w}from"./field-2d5bc30f.js";/* empty css                  */import"./FormBase-943ad0d7.js";/* empty css                      *//* empty css             */import"./main-d8039d25.js";import"./dynamic-import-helper-be004503.js";/* empty css             */const G={__name:"blueprintField",props:{formId:String,data:Object,path:String},setup(o){const t=o;b();const s=w(t),r=s.value(),p=i=>{if("redirect"in t.data?t.data.redirect:!0){const a=new URL(location.href);a.searchParams.set("blueprint",i),location.assign(a.search)}};return(i,l)=>{const a=B,m=V,f=_;return n(),d(f,{"form-id":o.formId,"field-props":t},{default:u(()=>[v(m,{modelValue:c(r),"onUpdate:modelValue":l[0]||(l[0]=e=>F(r)?r.value=e:null),onChange:p,disabled:c(s).disabled},{default:u(()=>[(n(!0),g(h,null,k(o.data.options,e=>(n(),d(a,{key:e.value,value:e.value,label:e.label},null,8,["value","label"]))),128))]),_:1},8,["modelValue","disabled"])]),_:1},8,["form-id","field-props"])}}};export{G as default};