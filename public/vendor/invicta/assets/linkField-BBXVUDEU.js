import{_ as g}from"./FieldBase-BRjCaeMG.js";import{y,o,f as i,w as d,k as B,u,af as E,d as m,F as f,p as _,aG as I,aV as O,aH as w}from"./vendor-B5dxeCwz.js";/* empty css               */import{u as x}from"./FormBase-i20P8R_i.js";import{u as S}from"./field-NqNsB3oD.js";/* empty css                  *//* empty css                      *//* empty css             */import"./main-BQVKugMo.js";import"./dynamic-import-helper-BheWnx7M.js";const q={__name:"linkField",props:{formId:String,data:Object,path:String},setup(a){const e=a,b=x(e.formId),p=S(e),n=p.value(),k=y(()=>{let t=b.remoteData.get("linkField");return console.log("I have options",t),"resources"in e.data?t.filter(r=>e.data.resources.includes(r.handle)):t});return(t,r)=>{const F=I,h=O,v=w,V=g;return o(),i(V,{"form-id":a.formId,"field-props":e,key:a.path},{default:d(()=>{var c;return[B(v,{modelValue:u(n),"onUpdate:modelValue":r[0]||(r[0]=l=>E(n)?n.value=l:null),filterable:"",clearable:"","allow-create":"",placeholder:(c=a.data.props)==null?void 0:c.placeholder,disabled:u(p).disabled},{default:d(()=>[(o(!0),m(f,null,_(u(k),l=>(o(),i(h,{key:l.label,label:l.label},{default:d(()=>[(o(!0),m(f,null,_(l.options,s=>(o(),i(F,{key:s.value,value:s.value,label:s.label},null,8,["value","label"]))),128))]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue","placeholder","disabled"])]}),_:1},8,["form-id","field-props"])}}};export{q as default};