import{_ as I}from"./FieldBase-BSGhD4x6.js";import{j as c,o as n,f,w as v,k as x,ap as A,u as t,ao as B,d as h,F as E,p as O,g as R,aG as S,aH as j}from"./vendor-DpzuCX-L.js";import"./dropdown-menu-BywocuEX.js";import{u as w}from"./FormBase-ChJL8YBd.js";import{u as C}from"./field-C_2VJjWP.js";import"./Loading-BgLNKlre.js";import"./main-DjFvluOL.js";/* empty css             */const $={__name:"selectField",props:{formId:String,data:Object,path:String},setup(l){var u;const e=l,o=c(!1),i=w(e.formId),d=C(e),s=d.value(),a=c([]),F=e.data.valueField||"value",_=e.data.labelField||"label";Array.isArray(e.data.options)?(a.value=e.data.options,o.value=!0):(u=e.data.props)!=null&&u.remote||(a.value=i.remoteData.get(e.data.options),Array.isArray(a.value)?o.value=!0:Invicta.on(e.data.options,()=>{a.value=i.remoteData.get(e.data.options),o.value=!0}));function y(){Invicta.axios.get(e.data.options).then(({data:m})=>{a.value=m,o.value=!0})}return(m,p)=>{const b=S,g=j,k=I;return n(),f(k,{"form-id":l.formId,"field-props":e},{default:v(()=>[x(g,A({modelValue:t(s),"onUpdate:modelValue":p[0]||(p[0]=r=>B(s)?s.value=r:null)},l.data.props,{"value-key":l.data.valueKey||null,teleported:!1,"remote-method":y,disabled:t(d).disabled}),{default:v(()=>[t(o)?(n(!0),h(E,{key:0},O(t(a),(r,V)=>(n(),f(b,{key:V,value:r[t(F)],label:r[t(_)]},null,8,["value","label"]))),128)):R("",!0)]),_:1},16,["modelValue","value-key","disabled"])]),_:1},8,["form-id","field-props"])}}};export{$ as default};
