import{_ as E}from"./FieldBase.f2724441.js";import{A as V,Q as x,o as l,f as n,w as s,b as B,c,aM as f,F as _,e as b,aX as g}from"./main.0ef6c703.js";import{E as I,c as O,a as S}from"./select.1764d41f.js";import{u as w}from"./field.f4488650.js";/* empty css                  */import"./FormBase.a4200675.js";import"./form.d0870869.js";import"./card.2a16bc6c.js";import"./icon.acbdc9cd.js";import"./typescript.72bf8adc.js";import"./index.7b3a76dc.js";import"./scroll.aabcd561.js";import"./index.42e2bd35.js";import"./validator.4d5ad03d.js";const z={__name:"linkField",props:{formId:String,data:Object,path:String},setup(o){const i=o,p=w(i),t=p.value([]),u=V([]);return x(()=>{Invicta.axios.get("/fields/resource-link/options").then(({data:a})=>{a.push({label:"",options:[{label:"None",value:""}]}),u.value=a})}),(a,d)=>{const v=I,k=O,h=S,F=E;return l(),n(F,{"form-id":o.formId,"field-props":i},{default:s(()=>{var m;return[B(h,{modelValue:b(t),"onUpdate:modelValue":d[0]||(d[0]=e=>g(t)?t.value=e:null),filterable:"",placeholder:(m=o.data.props)==null?void 0:m.placeholder,disabled:b(p).disabled},{default:s(()=>[(l(!0),c(_,null,f(u.value,e=>(l(),n(k,{key:e.label,label:e.label},{default:s(()=>[(l(!0),c(_,null,f(e.options,r=>(l(),n(v,{key:r.value,value:r.value,label:r.label},null,8,["value","label"]))),128))]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue","placeholder","disabled"])]}),_:1},8,["form-id","field-props"])}}};export{z as default};