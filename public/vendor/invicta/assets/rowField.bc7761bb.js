import{b as m}from"./FormBase.a4200675.js";import{o as n,c as s,aM as c,f,F as l}from"./main.0ef6c703.js";import"./form.d0870869.js";import"./card.2a16bc6c.js";import"./icon.acbdc9cd.js";import"./typescript.72bf8adc.js";const x={__name:"rowField",props:{formId:String,data:Object,path:String},setup(a){const i=a,{path:e}=i,p=r=>{if(typeof e>"u")return r;let t=e.split(".");return t.pop(),t.push(r),t.join(".")};return(r,t)=>{const d=m;return n(!0),s(l,null,c(a.data.fields,o=>(n(),f(d,{"form-id":a.formId,"field-data":o,"data-path":p(o.id)},null,8,["form-id","field-data","data-path"]))),256)}}};export{x as default};