import{_ as d}from"./FieldBase-2e1b6f77.js";import"./base-efd572b7.js";import{E as u}from"./checkbox-f109af74.js";import{u as f}from"./field-3ca8e767.js";import{a as _,o as k,b as i,e as m,w as b,l as h,F as x,x as v,u as e,n as F}from"./runtime-core.esm-bundler-1c6b45c9.js";/* empty css                  */import"./index-d303f183.js";import"./pinia-e557e134.js";import"./lodash-42c17880.js";import"./index-c0c4279c.js";import"./index-5634fb36.js";import"./index-a6671ae7.js";import"./_initCloneObject-1265d3af.js";import"./event-9519ab40.js";import"./index-5dcf4fdc.js";import"./isEqual-4cc0101c.js";import"./pick-6bddc984.js";import"./flatten-a74deb27.js";import"./condition-69d55c79.js";const K={__name:"checkboxGroupField",props:{formId:String,data:Object,path:String},setup(t){const o=t,a=f(o).value(),r=_([]);return k(()=>{Array.isArray(o.data.options)?r.value=o.data.options:Invicta.axios.get(o.data.options).then(({data:l})=>{r.value=l})}),(l,y)=>{const n=u,p=d;return i(),m(p,{"form-id":t.formId,"field-props":o,class:F(["checkbox-group",{stacked:t.data.stacked}])},{default:b(()=>[(i(!0),h(x,null,v(e(a),(B,s)=>(i(),m(n,{modelValue:e(a)[s],"onUpdate:modelValue":c=>e(a)[s]=c,label:e(r)[s]},null,8,["modelValue","onUpdate:modelValue","label"]))),256))]),_:1},8,["form-id","field-props","class"])}}};export{K as default};