import{_ as k}from"./FieldBase-b9b0f427.js";import{j as y,B,o as n,f as u,w as m,k as V,au as x,u as t,ae as E,d as I,F as h,p as O,aE as S,aF as j}from"./vendor-e43ae8f2.js";/* empty css               */import{u as w}from"./FormBase-6f6b74e6.js";import{u as A}from"./field-ac33109e.js";/* empty css                  *//* empty css                      *//* empty css             */import"./main-33d5bcdf.js";import"./dynamic-import-helper-be004503.js";/* empty css             */const z={__name:"selectField",props:{formId:String,data:Object,path:String},setup(o){const e=o,p=w(e.formId),i=A(e),r=i.value(),l=y([]),c=e.data.valueField||"value",f=e.data.labelField||"label";B(()=>{var a;Array.isArray(e.data.options)?l.value=e.data.options:(a=e.data.props)!=null&&a.remote||(l.value=p.remoteData.get(e.data.options))});function v(){Invicta.axios.get(e.data.options).then(({data:a})=>{l.value=a})}return(a,d)=>{const F=S,_=j,b=k;return n(),u(b,{"form-id":o.formId,"field-props":e},{default:m(()=>[V(_,x({modelValue:t(r),"onUpdate:modelValue":d[0]||(d[0]=s=>E(r)?r.value=s:null)},o.data.props,{"value-key":o.data.valueKey||null,teleported:!1,"remote-method":v,disabled:t(i).disabled}),{default:m(()=>[(n(!0),I(h,null,O(t(l),(s,g)=>(n(),u(F,{key:g,value:s[t(c)],label:s[t(f)]},null,8,["value","label"]))),128))]),_:1},16,["modelValue","value-key","disabled"])]),_:1},8,["form-id","field-props"])}}};export{z as default};