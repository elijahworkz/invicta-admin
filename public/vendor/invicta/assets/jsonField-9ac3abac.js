import{a as F}from"./FormBase-93f0d5f2.js";import{u as k}from"./field-13d28324.js";import{o as e,c as a,u as t,t as c,i as p,a as b,F as d,$ as B,f as $,C as y}from"./main-d76c405e.js";import"./form-e63502e9.js";import"./card-d402f5ea.js";/* empty css                      */import"./icon-01818d2e.js";import"./event-9519ab40.js";import"./typescript-defaf979.js";import"./vnode-deea4f76.js";const C={key:0,class:"el-form-item__label"},S={key:1,class:"info info-top"},P={__name:"jsonField",props:{formId:String,data:Object,path:String},setup(o){const r=o,{data:f,path:u}=r,{get:n,label:_}=k(r),s=n("seamless",!0),i=n("info",!1),h=l=>`${u}.${l}`;return(l,j)=>{const g=F;return e(),a(d,null,[t(s)?p("",!0):(e(),a("label",C,c(t(_)()),1)),!t(s)&&t(i)?(e(),a("span",S,c(t(i)),1)):p("",!0),b("div",{class:y([{seamless:t(s)},"group fieldset"])},[(e(!0),a(d,null,B(t(f).fields,m=>(e(),$(g,{"form-id":o.formId,"field-data":m,"data-path":h(m.id)},null,8,["form-id","field-data","data-path"]))),256))],2)],64)}}};export{P as default};