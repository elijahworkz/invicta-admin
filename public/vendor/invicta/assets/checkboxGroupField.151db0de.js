import{_ as d}from"./FieldBase.779261ff.js";import{A as u,Q as f,o as s,f as c,w as _,c as k,aL as h,e as l,F as b,n as v,E as x}from"./main.21f2ebaa.js";import{u as F}from"./field.01dde281.js";/* empty css                  */import"./FormBase.e643a291.js";import"./form.83a6d1e2.js";import"./card.b922e4ca.js";import"./_baseSet.cde345e7.js";import"./icon.5fb5a865.js";import"./typescript.72bf8adc.js";import"./_hasPath.edb79627.js";const z={__name:"checkboxGroupField",props:{formId:String,data:Object,path:String},setup(o){const e=o,t=F(e).value(),a=u([]);return f(()=>{Array.isArray(e.data.options)?a.value=e.data.options:Invicta.axios.get(e.data.options).then(({data:n})=>{a.value=n})}),(n,y)=>{const i=x,m=d;return s(),c(m,{"form-id":o.formId,"field-props":e,class:v(["checkbox-group",{stacked:o.data.stacked}])},{default:_(()=>[(s(!0),k(b,null,h(l(t),(B,r)=>(s(),c(i,{modelValue:l(t)[r],"onUpdate:modelValue":p=>l(t)[r]=p,label:a.value[r]},null,8,["modelValue","onUpdate:modelValue","label"]))),256))]),_:1},8,["form-id","field-props","class"])}}};export{z as default};