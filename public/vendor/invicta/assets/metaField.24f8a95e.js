import{_ as b}from"./FieldBase.350d1bd8.js";import{B as c,G as k,o as d,f as v,w,b as m,aq as F,e as r,aX as V,c as $,g as B}from"./main.f6278b25.js";import{E}from"./progress.781f22b9.js";import{u as y}from"./field.7fdaf25c.js";import{u as I}from"./FormBase.6d11ffb3.js";import{E as M}from"./index.35541a22.js";/* empty css                  */import"./form.9c68ba6b.js";import"./card.72bb6b00.js";import"./icon.7d6595df.js";import"./typescript.72bf8adc.js";const Y=["innerHTML"],O={__name:"metaField",props:{formId:String,data:Object,path:String},setup(l){const e=l,o={normal:e.data.props&&e.data.props.length_normal?e.data.props.length_normal:20,max:e.data.props&&e.data.props.lengths_max?e.data.props.lengths_max:70},p=y(e),s=p.value(""),i=I(e.formId),u=c(()=>e.data.props&&e.data.props.source?i.get(e.data.props.source):null);function f(a){if(i.mode=="create"){let t=e.data.props&&e.data.props.postfix?e.data.props.postfix:"";s.value=a+t,console.log(s.value)}}k(u,a=>{f(a)});const n=c(()=>{const a=s.value.length,t={};switch(t.percentage=Math.ceil(a*100/o.max),!0){case a<o.normal:t.status="warning",t.caption=`Your meta ${e.data.id} could be longer.`;break;case(a>=o.normal&&a<=o.max):t.status="success",t.caption=`Your meta ${e.data.id} is a good length.`;break;case a>o.max:t.status="exception",t.caption=`Your meta ${e.data.id} is too long, <strong>the ideal length is between ${o.normal} and ${o.max} characters.</strong>`;break}return t});return(a,t)=>{const g=M,_=E,h=b;return d(),v(h,{"form-id":l.formId,"field-props":e},{default:w(()=>[m(g,F({modelValue:r(s),"onUpdate:modelValue":t[0]||(t[0]=x=>V(s)?s.value=x:null),type:"textarea"},l.data.props,{disabled:r(p).disabled}),null,16,["modelValue","disabled"]),m(_,{class:"mt-2",percentage:r(n).percentage,"stroke-width":3,"text-inside":"true",status:r(n).status},null,8,["percentage","status"]),r(n).caption?(d(),$("span",{key:0,class:"info",innerHTML:r(n).caption},null,8,Y)):B("",!0)]),_:1},8,["form-id","field-props"])}}};export{O as default};