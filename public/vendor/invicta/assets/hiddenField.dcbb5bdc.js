import{o as l,f as n,e as a,aX as i}from"./main.8bf8a0a0.js";import{u as m}from"./field.8ba22b36.js";import{E as s}from"./index.c036fc84.js";import"./FormBase.80b74b91.js";import"./form.3885301f.js";import"./card.59290f5d.js";import"./icon.389921a3.js";import"./typescript.72bf8adc.js";const x={__name:"hiddenField",props:{formId:String,data:Object,path:String},setup(t){const e=m(t).value();return(f,o)=>{const r=s;return l(),n(r,{type:"hidden",modelValue:a(e),"onUpdate:modelValue":o[0]||(o[0]=p=>i(e)?e.value=p:null)},null,8,["modelValue"])}}};export{x as default};