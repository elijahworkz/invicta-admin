import{_ as s}from"./FieldBase.264e3152.js";import{o as m,f as n,w as d,b as p,aq as f,e as c,aX as u}from"./main.31862163.js";import{E as _}from"./switch.1aa58ecb.js";import{u as g}from"./field.169dfc97.js";/* empty css                  */import"./FormBase.803ad2a4.js";import"./form.239eb997.js";import"./card.a62b76fe.js";import"./icon.cc985839.js";import"./typescript.72bf8adc.js";import"./validator.4f509ee9.js";const q={__name:"toggleField",props:{formId:String,data:Object,path:String},setup(e){const t=e,o=g(t).value(!1);return(F,a)=>{const l=_,i=s;return m(),n(i,{"form-id":e.formId,"field-props":t,"field-class":{"inline-label":e.data.inline}},{default:d(()=>[p(l,f({modelValue:c(o),"onUpdate:modelValue":a[0]||(a[0]=r=>u(o)?o.value=r:null)},e.data.props),null,16,["modelValue"])]),_:1},8,["form-id","field-props","field-class"])}}};export{q as default};