import{j as p,J as V,o as r,d as w,h as l,k as o,u as e,w as c,ad as I,ae as D,f as _,g as d,n as E,B as g,t as G,D as L,af as N,al as T}from"./vendor-DNNQIDVf.js";import{c as j,b as F,a as R}from"./resource-C3BDN6Jg.js";/* empty css               */import{_ as A}from"./CheckTree-DMv88Hj1.js";import{a as J}from"./GridView-SzY-msMj.js";import{a as M}from"./main-CO7w6Fmb.js";const O={class:"w-full flex flex-col asset-library"},q={class:"p-3"},H={class:"flex items-center justify-between"},K={class:"ml-2"},Q={class:"pagination px-2"},W={key:0,class:"button-row"},X={class:"mr-2"},ne={__name:"AssetSelector",emits:["selected"],setup(Y,{emit:y}){const b=y,s=j("assets"),i=p(!1),n=p();V(()=>{s.data.currentPage>1&&s.setPage(1),i.value=!0,n.value=Invicta.remember("media-layout")||"grid",Invicta.axios.get("api/resource/assets",{params:{settings:!0}}).then(({data:t})=>{i.value=!1,console.log("I got this data",t),s.initForm("api/resource/assets",t)})});const f=t=>{n.value=t,Invicta.remember("media-layout",t)},m=p([]),v=t=>{m.value={id:t.id,src:t.src,path:t.path,name:t.img_name,alt:t.alt,width:t.width,height:t.height}},x=t=>{v(t),h()};function h(){console.log("i shoudld submit selected asset",m.value),b("selected",m.value)}return(t,a)=>{const P=F,S=M,u=L,$=N,C=R,B=J,z=A,U=T;return r(),w("div",O,[l("header",q,[l("div",H,[o(P,{class:"flex-1",handle:"assets",onUpdate:e(s).setSearch},null,8,["onUpdate"]),l("div",K,[o($,null,{default:c(()=>[o(u,{onClick:a[0]||(a[0]=k=>f("list")),title:"List view",active:e(n)=="list"},{default:c(()=>[o(S,{icon:e(I),width:16},null,8,["icon"])]),_:1},8,["active"]),o(u,{onClick:a[1]||(a[1]=k=>f("grid")),title:"Grid view",active:e(n)=="grid"},{default:c(()=>[o(S,{icon:e(D),width:16},null,8,["icon"])]),_:1},8,["active"])]),_:1})])])]),l("main",{class:E({loading:e(i),"assets grid":e(n)=="grid"})},[!e(i)&&e(n)=="list"?(r(),_(C,{key:0,"resource-handle":"assets",data:e(s).data.resourceData,columns:e(s).static.settings.columns,"no-actions":!0,"single-select":!0,onSingleSelect:v},null,8,["data","columns"])):d("",!0),!e(i)&&e(n)=="grid"?(r(),_(B,{key:1,resource:e(s).data.resourceData,selector:!0,onAssetSelected:x},null,8,["resource"])):d("",!0),e(i)?(r(),_(z,{key:2})):d("",!0)],2),l("footer",null,[l("div",Q,[o(U,{background:"",small:"",layout:"prev, pager, next, jumper","current-page":e(s).data.currentPage,"page-size":e(s).data.perPage,"pager-count":5,total:e(s).data.total,"onUpdate:pageSize":e(s).setPageSize,"onUpdate:currentPage":e(s).setPage},null,8,["current-page","page-size","total","onUpdate:pageSize","onUpdate:currentPage"])]),e(n)=="list"?(r(),w("div",W,[l("div",X,[a[3]||(a[3]=g("Total: ")),l("strong",null,G(e(s).total),1)]),o(u,{class:"ml-auto mr-2",text:"",onClick:a[2]||(a[2]=k=>t.$emit("cancel"))},{default:c(()=>a[4]||(a[4]=[g("Cancel")])),_:1}),o(u,{type:"primary",onClick:h},{default:c(()=>a[5]||(a[5]=[g("Select")])),_:1})])):d("",!0)])])}}};export{ne as _};