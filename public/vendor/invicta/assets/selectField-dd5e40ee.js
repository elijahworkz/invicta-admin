import{_ as g}from"./FieldBase-e1c18d99.js";import{r as k,g as y,o as s,f as p,h as u,d as x,ax as V,u as a,aA as h,c as B,F as E,$ as A}from"./main-07bc4afd.js";import{E as I,a as O}from"./select-3eeae54e.js";import{u as S}from"./field-177788f4.js";/* empty css                  */import"./FormBase-09fee5e0.js";import"./form-54beed3a.js";import"./card-8e588c1e.js";/* empty css                      */import"./icon-b01a07f6.js";import"./event-9519ab40.js";import"./typescript-defaf979.js";import"./vnode-4df357b1.js";import"./index-5835aaf9.js";import"./scroll-9631f539.js";import"./index-d2a909f4.js";import"./validator-0057f661.js";const Q={__name:"selectField",props:{formId:String,data:Object,path:String},setup(o){const e=o,n=S(e),r=n.value(),i=k([]),c=e.data.valueField||"value",f=e.data.labelField||"label";y(()=>{var t;Array.isArray(e.data.options)?i.value=e.data.options:(t=e.data.props)!=null&&t.remote||d()});function d(){Invicta.axios.get(e.data.options).then(({data:t})=>{i.value=t})}return(t,m)=>{const v=I,_=O,F=g;return s(),p(F,{"form-id":o.formId,"field-props":e},{default:u(()=>[x(_,V({modelValue:a(r),"onUpdate:modelValue":m[0]||(m[0]=l=>h(r)?r.value=l:null)},o.data.props,{"value-key":o.data.valueKey||null,teleported:!1,"remote-method":d,disabled:a(n).disabled}),{default:u(()=>[(s(!0),B(E,null,A(a(i),(l,b)=>(s(),p(v,{key:b,value:l[a(c)],label:l[a(f)]},null,8,["value","label"]))),128))]),_:1},16,["modelValue","value-key","disabled"])]),_:1},8,["form-id","field-props"])}}};export{Q as default};