import{_ as g}from"./FieldBase-7af0f01d.js";import{r as k,g as y,o as s,f as p,k as u,d as V,aA as x,u as a,aD as B,c as E,F as h,a0 as A}from"./main-c4840b76.js";import{E as I,a as O}from"./select-32ad0900.js";import{u as S}from"./field-c3ce0291.js";/* empty css                  */import"./FormBase-146c11ff.js";import"./form-50aae665.js";import"./card-3a2a2218.js";/* empty css                      */import"./icon-c71ea081.js";import"./event-9519ab40.js";import"./typescript-defaf979.js";import"./vnode-d7113936.js";import"./index-399c7794.js";import"./scroll-232b026c.js";import"./index-516b048b.js";import"./validator-75b450b9.js";const Q={__name:"selectField",props:{formId:String,data:Object,path:String},setup(o){const e=o,n=S(e),r=n.value(),i=k([]),c=e.data.valueField||"value",f=e.data.labelField||"label";y(()=>{var t;Array.isArray(e.data.options)?i.value=e.data.options:(t=e.data.props)!=null&&t.remote||d()});function d(){Invicta.axios.get(e.data.options).then(({data:t})=>{i.value=t})}return(t,m)=>{const v=I,_=O,F=g;return s(),p(F,{"form-id":o.formId,"field-props":e},{default:u(()=>[V(_,x({modelValue:a(r),"onUpdate:modelValue":m[0]||(m[0]=l=>B(r)?r.value=l:null)},o.data.props,{"value-key":o.data.valueKey||null,teleported:!1,"remote-method":d,disabled:a(n).disabled}),{default:u(()=>[(s(!0),E(h,null,A(a(i),(l,b)=>(s(),p(v,{key:b,value:l[a(c)],label:l[a(f)]},null,8,["value","label"]))),128))]),_:1},16,["modelValue","value-key","disabled"])]),_:1},8,["form-id","field-props"])}}};export{Q as default};