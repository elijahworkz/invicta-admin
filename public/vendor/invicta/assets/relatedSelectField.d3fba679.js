import{A as p,Q as x,o as c,f as _,w as g,b as S,c as E,aL as I,F as R,aq as w,e as B,b3 as N}from"./main.e6f303be.js";import{E as $,a as L}from"./select.3fb5e1c0.js";import{_ as U}from"./FieldBase.77ccd8ae.js";import{u as j}from"./FormBase.b4520349.js";import{u as A}from"./field.21e9b426.js";import{m as b}from"./map.4f98a6a8.js";import{g as F}from"./_baseSet.c3e683ab.js";import"./index.019b2677.js";import"./typescript.72bf8adc.js";import"./scroll.5ca22065.js";import"./validator.69d3e4b0.js";/* empty css                  */import"./form.73945a37.js";import"./card.5f0ced9f.js";import"./popover.dfc64d42.js";import"./lodash.f32bfe2d.js";import"./_baseIteratee.ab00b31c.js";import"./_getTag.94dc7fd9.js";const le={__name:"relatedSelectField",props:{formId:String,data:Object,path:String},setup(r){const a=r,d=p(!1),s=A(a).value([]),y=j(a.formId),i=F(a.data,"titleField","title"),h=F(a.data,"remote",!1),k=`/resource/${y.meta.handle}/relationship/${a.data.id}`,l=p([]),f=p([]);x(()=>{h?f.value=l.value=b(s.value,e=>({key:e.id,value:{id:e.id,name:e[i]},label:e[i]})):v({title:i})});async function O(e){e!==""?await v({title:i,search:e},!0):l.value=[]}function v(e,o=!1){d.value=!0,Invicta.axios.get(k,{params:e}).then(({data:m})=>{let n=b(m,(t,u)=>{let V="path"in a.data?Number(u):{id:Number(u)};return{key:u,value:V,label:t}});o?l.value=[...f.value,...n]:l.value=n,d.value=!1})}return(e,o)=>{const m=$,n=L;return c(),_(U,{"form-id":r.formId,"field-props":a,class:"related-field"},{default:g(()=>[S(n,w({modelValue:B(s),"onUpdate:modelValue":o[0]||(o[0]=t=>N(s)?s.value=t:null),valueKey:"id","remote-method":O,loading:d.value,teleported:!1,disabled:r.data.readOnly},r.data.props),{default:g(()=>[(c(!0),E(R,null,I(l.value,t=>(c(),_(m,{key:t.key,value:t.value,label:t.label},null,8,["value","label"]))),128))]),_:1},16,["modelValue","loading","disabled"])]),_:1},8,["form-id","field-props"])}}};export{le as default};