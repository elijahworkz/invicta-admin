import{_ as d}from"./FieldBase.264e3152.js";import{A as u,Q as f,o as l,f as c,w as _,c as k,aM as h,e as r,F as b,n as v,E as x}from"./main.31862163.js";import{u as F}from"./field.169dfc97.js";/* empty css                  */import"./FormBase.803ad2a4.js";import"./form.239eb997.js";import"./card.a62b76fe.js";import"./icon.cc985839.js";import"./typescript.72bf8adc.js";const U={__name:"checkboxGroupField",props:{formId:String,data:Object,path:String},setup(o){const e=o,a=F(e).value(),t=u([]);return f(()=>{Array.isArray(e.data.options)?t.value=e.data.options:Invicta.axios.get(e.data.options).then(({data:n})=>{t.value=n})}),(n,y)=>{const i=x,m=d;return l(),c(m,{"form-id":o.formId,"field-props":e,class:v(["checkbox-group",{stacked:o.data.stacked}])},{default:_(()=>[(l(!0),k(b,null,h(r(a),(B,s)=>(l(),c(i,{modelValue:r(a)[s],"onUpdate:modelValue":p=>r(a)[s]=p,label:t.value[s]},null,8,["modelValue","onUpdate:modelValue","label"]))),256))]),_:1},8,["form-id","field-props","class"])}}};export{U as default};