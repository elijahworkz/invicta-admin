import{a7 as N,o as a,c,d as v,h as _,u as t,a as m,t as p,b as S,f as n,e as A,i as l,ai as B,F as V,D as h,_ as D}from"./main-d76c405e.js";import{_ as I}from"./AssetForm-29060125.js";import{_ as E}from"./AssetSelector-2f13c514.js";import{_ as L}from"./FieldBase-ec963e46.js";import{_ as O}from"./GridView-dae72828.js";import"./icon-01818d2e.js";import{u as U}from"./field-13d28324.js";import"./index-68976928.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./resource-d52adc69.js";import"./select-4fe08bbc.js";import"./scroll-6db420aa.js";import"./index-6e1d63a7.js";import"./validator-385c5413.js";import"./checkbox-377f2af3.js";import"./ActionsDropdown-3df3a538.js";import"./CheckTree-ca33f2a5.js";import"./functions-3a992e53.js";import"./Loading-0e78665a.js";import"./Search-eef62d41.js";/* empty css                  */import"./FormBase-93f0d5f2.js";import"./form-e63502e9.js";import"./card-d402f5ea.js";/* empty css                      */import"./vnode-deea4f76.js";import"./progress-f85a11a9.js";/* empty css             */import"./el-overlay-33eae5af.js";const j={key:0,class:"asset-wrap"},z=["src"],T={class:"asset-details"},q={key:2,class:"asset-wrap"},kt={__name:"assetField",props:{formId:String,data:Object,path:String},setup(d){const f=d,r=U(f),o=r.value(),e=N({state:!1,context:"library"}),u=y=>{o.value=y,e.state=!1},b=()=>{r.disabled||(e.context="edit",e.state=!0)},k=()=>{e.context="library",e.state=!0};return(y,s)=>{const x=h,g=O,$=L,w=E,C=I,F=D;return a(),c(V,null,[v($,{"form-id":d.formId,"field-props":f},{default:_(()=>{var i;return[t(o)?(a(),c("div",j,[m("div",{class:"asset",onClick:b},[m("img",{src:t(o).src},null,8,z)]),m("div",T,[m("strong",null,p(t(o).name),1),S(" "+p(t(o).width)+"x"+p(t(o).height)+" | "+p(t(o).alt?t(o).alt:"No Alt!"),1)]),t(r).disabled?l("",!0):(a(),n(x,{key:0,class:"ml-auto mr-3 action-icon",onClick:s[0]||(s[0]=G=>o.value=null)},{default:_(()=>[v(t(A))]),_:1}))])):t(r).disabled?t(r).disabled?(a(),c("div",q,"No image")):l("",!0):(a(),n(g,{key:1,type:"browse",onUploadComplete:u,onOpenLibrary:k,multiple:!1,folder:((i=d.data.props)==null?void 0:i.folder)||null},null,8,["folder"]))]}),_:1},8,["form-id","field-props"]),t(e).state?(a(),n(F,{key:0,onClose:s[3]||(s[3]=i=>t(e).state=!1),style:B({width:t(e).context=="library"?"80%":""})},{default:_(()=>[t(e).context=="library"?(a(),n(w,{key:0,onSelected:u,onCancel:s[1]||(s[1]=i=>t(e).state=!1)})):l("",!0),t(e).context=="edit"?(a(),n(C,{key:1,asset:t(o),onClose:s[2]||(s[2]=i=>t(e).state=!1)},null,8,["asset"])):l("",!0)]),_:1},8,["style"])):l("",!0)],64)}}};export{kt as default};