import{_ as m}from"./FieldBase.e97aa930.js";import{o as p,f as n,w as f,b as u,aq as c,e as i,aX as _}from"./main.8bf8a0a0.js";import{E as b}from"./date-picker.f054ed8e.js";import{u as v}from"./field.8ba22b36.js";/* empty css                  */import"./FormBase.80b74b91.js";import"./form.3885301f.js";import"./card.59290f5d.js";import"./icon.389921a3.js";import"./typescript.72bf8adc.js";import"./index.c036fc84.js";import"./index.bf7d1c23.js";const j={__name:"dateField",props:{formId:String,data:Object,path:String},setup(e){const t=e,a=v(t),o=a.value();return(F,r)=>{const s=b,l=m;return p(),n(l,{"form-id":e.formId,"field-props":t},{default:f(()=>[u(s,c({modelValue:i(o),"onUpdate:modelValue":r[0]||(r[0]=d=>_(o)?o.value=d:null)},e.data.props,{disabled:i(a).disabled}),null,16,["modelValue","disabled"])]),_:1},8,["form-id","field-props"])}}};export{j as default};