import{a as h}from"./FormBase.9be26eae.js";import{u as k}from"./field.0ce052f7.js";import{o as e,c as a,e as t,t as c,g as d,d as F,F as p,aL as b,f as B,n as y}from"./main.75dc240c.js";import"./form.e8182a08.js";import"./card.98da5424.js";import"./popover.0472dc8f.js";import"./_baseSet.8721e116.js";import"./lodash.fee999a4.js";import"./typescript.72bf8adc.js";const S={key:0,class:"el-form-item__label"},$={key:1,class:"info info-top"},E={__name:"jsonField",props:{formId:String,data:Object,path:String},setup(o){const r=o,{data:f,path:u}=r,{get:n,label:_}=k(r),s=n("seamless",!0),i=n("info",!1),g=l=>`${u}.${l}`;return(l,j)=>(e(),a(p,null,[t(s)?d("",!0):(e(),a("label",S,c(t(_)()),1)),!t(s)&&t(i)?(e(),a("span",$,c(t(i)),1)):d("",!0),F("div",{class:y([{seamless:t(s)},"group fieldset"])},[(e(!0),a(p,null,b(t(f).fields,m=>(e(),B(h,{"form-id":o.formId,"field-data":m,"data-path":g(m.id)},null,8,["form-id","field-data","data-path"]))),256))],2)],64))}};export{E as default};