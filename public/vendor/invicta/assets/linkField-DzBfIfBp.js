import{_ as V}from"./FieldBase-CJqAS9Xu.js";import{y,o,f as i,w as d,k as B,u,ag as E,d as m,F as f,p as _,aF as I,aU as O,aG as w}from"./vendor-DNNQIDVf.js";/* empty css               */import{u as x}from"./FormBase-DYw9ghXD.js";import{u as S}from"./field-B4hST7Z8.js";/* empty css                  *//* empty css                      *//* empty css             */import"./main-bEgEWTd2.js";import"./dynamic-import-helper-BheWnx7M.js";const z={__name:"linkField",props:{formId:String,data:Object,path:String},setup(a){const e=a,b=x(e.formId),p=S(e),n=p.value(),F=y(()=>{let t=b.remoteData.get("linkField");return console.log("I have options",t),"resources"in e.data?t.filter(r=>e.data.resources.includes(r.handle)):t});return(t,r)=>{const k=I,h=O,v=w,g=V;return o(),i(g,{"form-id":a.formId,"field-props":e,key:a.path},{default:d(()=>{var c;return[B(v,{modelValue:u(n),"onUpdate:modelValue":r[0]||(r[0]=l=>E(n)?n.value=l:null),filterable:"",clearable:"","allow-create":"",placeholder:(c=a.data.props)==null?void 0:c.placeholder,disabled:u(p).disabled},{default:d(()=>[(o(!0),m(f,null,_(u(F),l=>(o(),i(h,{key:l.label,label:l.label},{default:d(()=>[(o(!0),m(f,null,_(l.options,s=>(o(),i(k,{key:s.value,value:s.value,label:s.label},null,8,["value","label"]))),128))]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue","placeholder","disabled"])]}),_:1},8,["form-id","field-props"])}}};export{z as default};
