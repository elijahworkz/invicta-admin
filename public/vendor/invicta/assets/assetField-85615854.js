import{a8 as S,o as a,c as y,d as x,k as v,u as t,a as p,t as c,b as I,f as r,j as i,e as N,al as V,F as E,G as z,_ as D}from"./main-c4840b76.js";import{_ as T}from"./AssetForm-46d32f2f.js";import{_ as j}from"./AssetSelector-423db1bf.js";import{_ as L}from"./FieldBase-7af0f01d.js";import{_ as O}from"./GridView-57745312.js";import"./icon-c71ea081.js";import{_ as U}from"./ActionsDropdown-ce877857.js";import{u as G}from"./field-c3ce0291.js";import{u as M}from"./FormBase-146c11ff.js";/* empty css             */import{E as R}from"./el-overlay-c458fd8d.js";import{f as q}from"./functions-cbb8bef5.js";import"./index-399c7794.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./resource-440ef54f.js";import"./select-32ad0900.js";import"./scroll-232b026c.js";import"./index-516b048b.js";import"./validator-75b450b9.js";import"./checkbox-20821d37.js";import"./CheckTree-338fbd2f.js";import"./Loading-bc1c37e6.js";import"./Search-5cdd5476.js";/* empty css                  */import"./form-50aae665.js";import"./progress-62b05e5e.js";import"./card-3a2a2218.js";/* empty css                      */import"./vnode-d7113936.js";const H={key:0,class:"asset-wrap"},J=["src"],K={class:"asset-details mr-auto"},P={key:2,class:"asset-wrap"},Ct={__name:"assetField",props:{formId:String,data:Object,path:String},setup(u){const f=u,l=G(f),e=l.value(),g=M(f.formId),s=S({state:!1,context:"library"}),b=n=>{e.value=n,s.state=!1},k=()=>{l.disabled||(s.context="edit",s.state=!0)},F=({action:n,item:o})=>{console.log("action call",event),R.confirm("Are you sure you want to run this action?",n.name,{confirmButtonText:n.action_button,cancelButtonText:"Cancel",confirmButtonClass:n.dangerous?"el-button--danger":"el-button--primary"}).then(()=>{let _={class:n.class,asset:o};Invicta.axios.post("api/assets/actions",_).then(({data:d})=>{Invicta.message(d.message),e.value=d.asset})}).catch(()=>console.log("cancel"))},w=()=>{s.context="library",s.state=!0};return(n,o)=>{const _=U,d=z,A=O,B=L,C=j,$=T,h=D;return a(),y(E,null,[x(B,{"form-id":u.formId,"field-props":f},{default:v(()=>{var m;return[t(e)?(a(),y("div",H,[p("div",{class:"asset",onClick:k},[p("img",{src:t(e).src},null,8,J)]),p("div",K,[p("strong",null,c(t(e).name),1),I(" "+c(t(e).width)+"x"+c(t(e).height)+" | "+c(t(e).size?t(q)(t(e).size):"n/a")+" "+c(t(e).alt?t(e).alt:"No Alt!"),1)]),t(g).assetActions.length?(a(),r(_,{key:0,actions:t(g).assetActions,item:t(e),onSelected:F,class:"mr-3"},null,8,["actions","item"])):i("",!0),t(l).disabled?i("",!0):(a(),r(d,{key:1,class:"mr-3 action-icon",onClick:o[0]||(o[0]=Q=>e.value=null)},{default:v(()=>[x(t(N))]),_:1}))])):t(l).disabled?t(l).disabled?(a(),y("div",P,"No image")):i("",!0):(a(),r(A,{key:1,type:"browse",onUploadComplete:b,onOpenLibrary:w,multiple:!1,folder:((m=u.data.props)==null?void 0:m.folder)||null},null,8,["folder"]))]}),_:1},8,["form-id","field-props"]),t(s).state?(a(),r(h,{key:0,onClose:o[3]||(o[3]=m=>t(s).state=!1),style:V({width:t(s).context=="library"?"80%":""})},{default:v(()=>[t(s).context=="library"?(a(),r(C,{key:0,onSelected:b,onCancel:o[1]||(o[1]=m=>t(s).state=!1)})):i("",!0),t(s).context=="edit"?(a(),r($,{key:1,asset:t(e),onClose:o[2]||(o[2]=m=>t(s).state=!1)},null,8,["asset"])):i("",!0)]),_:1},8,["style"])):i("",!0)],64)}}};export{Ct as default};