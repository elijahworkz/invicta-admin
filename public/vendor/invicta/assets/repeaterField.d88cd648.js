import{_ as I}from"./FieldBase.779261ff.js";import{u as R,g as k,a as v}from"./FormBase.e643a291.js";import{u as x}from"./field.01dde281.js";import{B as c,o as i,f as d,w as g,a0 as C,e as s,aZ as V,c as D,aL as L,F as S}from"./main.21f2ebaa.js";/* empty css                  */import"./form.83a6d1e2.js";import"./card.b922e4ca.js";import"./_baseSet.cde345e7.js";import"./icon.5fb5a865.js";import"./typescript.72bf8adc.js";import"./_hasPath.edb79627.js";const G={__name:"repeaterField",props:{formId:String,data:Object,path:String},setup(n){const t=n,{data:a,path:p}=t,F=R(t.formId),m=x(t),_=c(()=>m.get("inline",!1)?InlineRepeater:CollapseRepeater),$=!m.get("draggable",!0),f=c(()=>k(a.fields));let o=m.value([f.value]);function w(r,e){return F.get(`${p}.${e}.${a.title}`,`${a.title} #${e}`)}const b=(r,e)=>`${p}.${e}.${r}`;return(r,e)=>{const B=v,h=I;return i(),d(h,{"form-id":n.formId,"field-props":t},{default:g(()=>[(i(),d(C(s(_)),{modelValue:s(o),"onUpdate:modelValue":e[0]||(e[0]=l=>V(o)?o.value=l:o=l),"item-name":"row","item-title":w,"default-row":s(f),"disable-draggable":$,"panel-class":"group"},{default:g(l=>[(i(!0),D(S,null,L(s(a).fields,u=>(i(),d(B,{"form-id":n.formId,"field-data":u,"data-path":b(u.id,l.index)},null,8,["form-id","field-data","data-path"]))),256))]),_:1},8,["modelValue","default-row"]))]),_:1},8,["form-id","field-props"])}}};export{G as default};