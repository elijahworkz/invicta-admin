import{c as S,_ as I,a as N,b as V}from"./dropdown-menu-BywocuEX.js";import{_ as D}from"./AssetForm-BPtMDpe0.js";import{_ as T}from"./FieldBase-BSGhD4x6.js";import{b as z}from"./main-DjFvluOL.js";import{u as O}from"./field-C_2VJjWP.js";import{u as E}from"./FormBase-ChJL8YBd.js";import{V as L,o as a,d as u,k as v,w as x,u as e,h as f,t as c,B as U,f as m,g as r,W as j,i as M,F as R,ac as W}from"./vendor-DpzuCX-L.js";import{f as q}from"./Loading-BgLNKlre.js";/* empty css             */const G={key:0,class:"asset-wrap"},H=["src"],J={class:"asset-details mr-auto"},K={key:2,class:"asset-wrap"},re={__name:"assetField",props:{formId:String,data:Object,path:String},setup(p){const _=p,l=O(_),t=l.value(),g=E(_.formId).remoteData.get("assetActions"),s=L({state:!1,context:"library"}),b=n=>{t.value=n,s.state=!1},k=()=>{l.disabled||(s.context="edit",s.state=!0)},h=({action:n,item:o})=>{console.log("action call",n,o),W.confirm("Are you sure you want to run this action?",n.name,{confirmButtonText:n.action_button,cancelButtonText:"Cancel",confirmButtonClass:n.dangerous?"el-button--danger":"el-button--primary"}).then(()=>{let y={class:n.class,selected:[o.id]};Invicta.axios.post("api/resource/assets/actions",y).then(({data:d})=>{Invicta.message(d.message),t.value=d.asset})}).catch(()=>console.log("cancel"))},w=()=>{s.context="library",s.state=!0};return(n,o)=>{const y=S,d=z,B=I,C=T,F=N,$=D,A=V;return a(),u(R,null,[v(C,{"form-id":p.formId,"field-props":_},{default:x(()=>{var i;return[e(t)?(a(),u("div",G,[f("div",{class:"asset",onClick:k},[f("img",{src:e(t).src},null,8,H)]),f("div",J,[f("strong",null,c(e(t).name),1),U(" "+c(e(t).width)+"x"+c(e(t).height)+" | "+c(e(t).size?e(q)(e(t).size):"n/a")+" "+c(e(t).alt?e(t).alt:"No Alt!"),1)]),e(g).length?(a(),m(y,{key:0,actions:e(g),item:e(t),onSelected:h,class:"mr-3"},null,8,["actions","item"])):r("",!0),e(l).disabled?r("",!0):(a(),u("span",{key:1,class:"mr-3 action-icon",onClick:o[0]||(o[0]=Q=>t.value=null)},[v(d,{icon:e(j),width:18},null,8,["icon"])]))])):e(l).disabled?e(l).disabled?(a(),u("div",K,"No image")):r("",!0):(a(),m(B,{key:1,type:"browse",onUploadComplete:b,onOpenLibrary:w,single:!0,folder:((i=p.data.props)==null?void 0:i.folder)||null},null,8,["folder"]))]}),_:1},8,["form-id","field-props"]),e(s).state?(a(),m(A,{key:0,onClose:o[3]||(o[3]=i=>e(s).state=!1),style:M({width:e(s).context=="library"?"80%":""})},{default:x(()=>[e(s).context=="library"?(a(),m(F,{key:0,onSelected:b,onCancel:o[1]||(o[1]=i=>e(s).state=!1)})):r("",!0),e(s).context=="edit"?(a(),m($,{key:1,asset:e(t),onClose:o[2]||(o[2]=i=>e(s).state=!1)},null,8,["asset"])):r("",!0)]),_:1},8,["style"])):r("",!0)],64)}}};export{re as default};
