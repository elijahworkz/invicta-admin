import{_ as F}from"./FieldBase-b9b0f427.js";import{j as $,O as g,a9 as B,a3 as S,o as r,f as x,w as _,h as e,t as c,d as f,F as C,p as L,u as h,l as k,aS as y,k as v,al as N,J as O,I as U}from"./vendor-e43ae8f2.js";import{u as I}from"./field-ac33109e.js";/* empty css                  */import"./FormBase-6f6b74e6.js";/* empty css                      *//* empty css             */import"./main-33d5bcdf.js";import"./dynamic-import-helper-be004503.js";/* empty css             */const j={class:"keyValue-table"},D={colspan:"2"},E={class:"w-1/4"},J=["name","onUpdate:modelValue"],R=["name","onUpdate:modelValue"],T={class:"action"},A={class:"mt-3"},Z={__name:"keyValueField",props:{formId:String,data:Object,path:String},setup(a){const m=a,p=I(m).value({}),o=$(V(p.value));g(()=>o.value,(t,u)=>{p.value=t.reduce((l,n)=>(l[n.key]=n.value,l),{})},{deep:!0});function V(t){return B(t)&&(t=JSON.parse(t)),S(Object.entries(t),([u,l])=>({key:`${u}`,value:l}))}function b(){let t={key:"",value:""};o.value.push(t)}function w(t){o.value.splice(t,1)}return(t,u)=>{const l=U,n=F;return r(),x(n,{"form-id":a.formId,"field-props":m},{default:_(()=>[e("table",j,[e("thead",null,[e("tr",null,[e("th",null,c(a.data.keyLabel||"Key"),1),e("th",D,c(a.data.valueLabel||"Value"),1)])]),e("tbody",null,[(r(!0),f(C,null,L(h(o),(s,i)=>(r(),f("tr",null,[e("td",E,[k(e("input",{name:`${a.data.id}-key-${i}`,"onUpdate:modelValue":d=>s.key=d},null,8,J),[[y,s.key]])]),e("td",null,[k(e("input",{name:`${a.data.id}-value-${i}`,"onUpdate:modelValue":d=>s.value=d},null,8,R),[[y,s.value]])]),e("td",T,[v(l,{text:"",onClick:d=>w(i),icon:h(N)},null,8,["onClick","icon"])])]))),256))])]),e("div",A,[v(l,{type:"primary",onClick:b},{default:_(()=>[O(c(a.data.addLabel||"Add"),1)]),_:1})])]),_:1},8,["form-id","field-props"])}}};export{Z as default};