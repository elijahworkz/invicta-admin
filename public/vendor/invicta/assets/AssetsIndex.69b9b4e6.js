import{A as v,o as i,c as E,d as t,i as $,t as y,a7 as C,a8 as D,b as a,e as m,aW as G,f as g,aT as k,a as S,aS as N,Q as P,r as O,bg as R,w as d,g as b,F as H,aV as M,ck as Q,cl as W,cc as q}from"./main.21f2ebaa.js";import{_ as J}from"./AssetForm.5ba4a6bc.js";import{E as K}from"./card.b922e4ca.js";import{_ as X,E as Y}from"./ResourceTable.c9a0c49a.js";import"./select.1d160943.js";import{_ as Z,a as ee}from"./GridView.95d808f0.js";import{u as te}from"./resource.ac0ced9a.js";/* empty css             */import{c as ae}from"./el-overlay.ba6b2c3f.js";import{_ as oe}from"./Search.5d6724d5.js";import"./index.e69b7e78.js";import"./typescript.72bf8adc.js";import"./ActionsDropdown.562b7af2.js";import"./icon.5fb5a865.js";import"./functions.d13d8296.js";import"./scroll.4f14d599.js";import"./validator.bc7ec2ec.js";import"./progress.5c8dac3d.js";import"./_baseSet.cde345e7.js";import"./_hasPath.edb79627.js";import"./vnode.09d20a61.js";const ne={class:"flex items-center justify-start p-3"},le={class:"mr-2"},se={class:"ml-auto flex items-center"},ce={class:"ml-3",title:"Delete Selected"},re={__name:"ListView",props:{resource:Object,canEdit:Boolean,canDelete:Boolean},setup(e){const _=e,r=v([]),u=o=>{console.log("selection",o),r.value=o.map(c=>c.id)},l=o=>{ae.confirm("This action will permanently delete records from database. Are you sure you want to continue?","Deleting",{confirmButtonText:"Delete",cancelButtonText:"Cancel",confirmButtonClass:"el-button--danger"}).then(()=>{k.Inertia.delete(_.resource.meta.path,{data:{selected:o}})}).catch(()=>console.log("cancel"))},p=()=>{r.value.length&&l(r.value)};return(o,c)=>{const f=S,s=X;return i(),E("div",null,[t("div",ne,[t("div",le,[$("Total: "),t("strong",null,y(e.resource.meta.total),1)]),t("div",se,[C(t("div",ce,[a(f,{icon:m(G),onClick:p,disabled:!r.value.length},null,8,["icon","disabled"])],512),[[D,e.canDelete]])])]),(i(),g(s,{key:e.resource.slug,data:e.resource.data,"table-props":e.resource.table,columns:e.resource.columns,"can-edit":e.canEdit,"can-delete":e.canDelete,onSelect:u,onEdit:c[0]||(c[0]=n=>o.$emit("edit",n)),onDelete:l},null,8,["data","table-props","columns","can-edit","can-delete"]))])}}},ie={class:"py-6 px-10 asset-library"},ue={class:"flex items-end justify-start mb-4"},de={class:"mb-1"},me={class:"ml-auto"},pe={class:"flex items-center justify-between p-3 mt-2"},ze={__name:"AssetsIndex",props:{resource:Object,multiUpload:Boolean,canCreate:Boolean,canEdit:Boolean,canDelete:Boolean},setup(e){const _=e,{pageUrl:r}=N().props.value,u=te();u.init(r);const l=v();P(()=>{l.value=Invicta.remember("media-layout")||"grid"});const p=s=>{l.value=s,Invicta.remember("media-layout",s)},o=v(!1),c=v(),f=s=>{let n=typeof s=="number"?_.resource.data.filter(h=>h.id==s)[0]:s;o.value=!0,c.value=n};return Invicta.on("refresh-resource",()=>{k.Inertia.reload()}),(s,n)=>{const h=O("Head"),T=oe,w=q,x=S,U=R,V=Z,I=re,j=ee,z=Y,A=K,L=J,F=M;return i(),E(H,null,[a(h,{title:e.resource.title},null,8,["title"]),t("div",ie,[t("div",ue,[t("div",null,[t("h1",de,y(e.resource.title),1),a(T,{currentSearch:e.resource.meta.search},null,8,["currentSearch"])]),t("div",me,[a(U,{class:"mr-2"},{default:d(()=>[a(x,{onClick:n[0]||(n[0]=B=>p("list")),title:"List view",active:l.value=="list"},{default:d(()=>[a(w,{icon:m(Q),width:16},null,8,["icon"])]),_:1},8,["active"]),a(x,{onClick:n[1]||(n[1]=B=>p("grid")),title:"Grid view",active:l.value=="grid"},{default:d(()=>[a(w,{icon:m(W),width:16},null,8,["icon"])]),_:1},8,["active"])]),_:1}),C(a(V,{multiple:e.multiUpload},null,8,["multiple"]),[[D,e.canCreate]])])]),a(A,{"body-style":"padding: 0px"},{default:d(()=>[l.value=="list"?(i(),g(I,{key:0,resource:e.resource,"can-edit":e.canEdit,"can-delete":e.canDelete,onEdit:f},null,8,["resource","can-edit","can-delete"])):b("",!0),l.value=="grid"?(i(),g(j,{key:1,resource:e.resource.data,multiple:e.multiUpload,onEdit:f},null,8,["resource","multiple"])):b("",!0),t("div",pe,[t("div",null,[$("Total: "),t("strong",null,y(e.resource.meta.total),1)]),a(z,{background:"",small:"",layout:"jumper, prev, pager, next, sizes","current-page":e.resource.meta.current_page,"page-size":e.resource.meta.per_page,total:e.resource.meta.total,"onUpdate:pageSize":m(u).pageSizeChange,"onUpdate:currentPage":m(u).pageChange},null,8,["current-page","page-size","total","onUpdate:pageSize","onUpdate:currentPage"])])]),_:1})]),o.value?(i(),g(F,{key:0,onClose:n[2]||(n[2]=B=>o.value=!1)},{default:d(()=>[a(L,{asset:c.value},null,8,["asset"])]),_:1})):b("",!0)],64)}}};export{ze as default};