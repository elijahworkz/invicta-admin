import{o as l,f as m,w as s,b as p,aq as n,e as d,b3 as f}from"./main.75dc240c.js";import{E as c}from"./switch.0ca6fee4.js";import{_ as u}from"./FieldBase.f1435146.js";import{u as g}from"./field.0ce052f7.js";import"./validator.6a5d6570.js";/* empty css                  */import"./form.e8182a08.js";import"./FormBase.9be26eae.js";import"./card.98da5424.js";import"./popover.0472dc8f.js";import"./_baseSet.8721e116.js";import"./lodash.fee999a4.js";import"./typescript.72bf8adc.js";const C={__name:"toggleField",props:{formId:String,data:Object,path:String},setup(e){const t=e,o=g(t).value(!1);return(b,a)=>{const r=c;return l(),m(u,{"form-id":e.formId,"field-props":t,"field-class":{"inline-label":e.data.inline}},{default:s(()=>[p(r,n({modelValue:d(o),"onUpdate:modelValue":a[0]||(a[0]=i=>f(o)?o.value=i:null)},e.data.props),null,16,["modelValue"])]),_:1},8,["form-id","field-props","field-class"])}}};export{C as default};