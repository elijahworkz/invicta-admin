import{J as F,o as a,c as y,b as m,w as p,e as o,d as r,t as n,i as S,aU as A,f as i,g as c,q as B,F as N,a9 as V,aT as I}from"./main.0ef6c703.js";import{_ as U}from"./AssetForm.60019935.js";import{_ as h}from"./AssetSelector.ad1c65c0.js";import{_ as D}from"./FieldBase.f2724441.js";import{_ as E}from"./GridView.1f0447ac.js";import"./icon.acbdc9cd.js";import{u as L}from"./field.f4488650.js";import"./index.7b3a76dc.js";import"./typescript.72bf8adc.js";import"./resource.e9584138.js";import"./select.1764d41f.js";import"./scroll.aabcd561.js";import"./index.42e2bd35.js";import"./validator.4d5ad03d.js";import"./ActionsDropdown.b49d60a1.js";import"./functions.796266bd.js";import"./events.7b36ce45.js";import"./Loading.34fc89b5.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./Search.7135fbb2.js";/* empty css                  */import"./FormBase.a4200675.js";import"./form.d0870869.js";import"./card.2a16bc6c.js";import"./progress.4739a3a1.js";/* empty css             */import"./el-overlay.e09a628c.js";import"./vnode.c7d8b8b6.js";const O={key:0,class:"asset-wrap"},T=["src"],j={class:"asset-details"},ut={__name:"assetField",props:{formId:String,data:Object,path:String},setup(d){const _=d,e=L(_).value(),t=F({state:!1,context:"library"}),f=u=>{e.value=u,t.state=!1},v=()=>{t.context="edit",t.state=!0},x=()=>{t.context="library",t.state=!0};return(u,s)=>{const k=V,b=E,g=D,$=h,w=U,C=I;return a(),y(N,null,[m(g,{"form-id":d.formId,"field-props":_},{default:p(()=>[o(e)?(a(),y("div",O,[r("div",{class:"asset",onClick:v},[r("img",{src:o(e).src},null,8,T)]),r("div",j,[r("strong",null,n(o(e).name),1),S(" "+n(o(e).width)+"x"+n(o(e).height)+" | "+n(o(e).alt?o(e).alt:"No Alt!"),1)]),m(k,{class:"ml-auto mr-3 action-icon",onClick:s[0]||(s[0]=l=>e.value=null)},{default:p(()=>[m(o(A))]),_:1})])):(a(),i(b,{key:1,type:"browse",onUploadComplete:f,onOpenLibrary:x,multiple:!1}))]),_:1},8,["form-id","field-props"]),t.state?(a(),i(C,{key:0,onClose:s[3]||(s[3]=l=>t.state=!1),style:B({width:t.context=="library"?"80%":""})},{default:p(()=>[t.context=="library"?(a(),i($,{key:0,onSelected:f,onCancel:s[1]||(s[1]=l=>t.state=!1)})):c("",!0),t.context=="edit"?(a(),i(w,{key:1,asset:o(e),onClose:s[2]||(s[2]=l=>t.state=!1)},null,8,["asset"])):c("",!0)]),_:1},8,["style"])):c("",!0)],64)}}};export{ut as default};