import{b as C,a as N}from"./main-C2GO1rf1.js";import{j as O,o as l,d as _,h as n,t as f,k as d,u as e,aD as D,H as E,w,aE as j,g as m,J as A,I as T,Z as U,a2 as z,f as y,aF as L,i as M,F as H,ab as J}from"./vendor-B-0EznW0.js";import{_ as R}from"./AssetSelector-BQKtr4Kn.js";import{_ as Z}from"./FieldBase-DQk5SoWl.js";import{_ as q}from"./GridView-DgVWvRP3.js";import{_ as G}from"./resource-CytHVYIe.js";import{u as K}from"./field-0JKawy9A.js";import{u as P}from"./FormBase-BIOjwarC.js";import{f as Q}from"./functions-C7t8cZDa.js";/* empty css               */import"./Loading-DU56X2kS.js";/* empty css                 *//* empty css                  *//* empty css                 *//* empty css                      *//* empty css             */import"./dynamic-import-helper-BheWnx7M.js";const W={class:"w-full flex flex-col"},X={class:"p-3 flex items-center justify-between"},Y={class:"preview"},ee={class:"image-transparent-back"},te=["src"],se={class:"flex p-3"},oe={key:0,class:"el-icon is-loading"},ae={__name:"AssetForm",props:{asset:Object},emits:["close"],setup(a,{emit:g}){const r=a,t=g,$=p=>window.open(p,"_blank"),u=O(!1),o=()=>{u.value=!0,Invicta.axios.post(`api/assets/${r.asset.id}`,{alt:r.asset.alt}).then(()=>{u.value=!1,t("close",!0)})};return(p,c)=>{const x=C,b=T,i=U;return l(),_("div",W,[n("header",X,[n("h1",null,f(a.asset.img_name||a.asset.name),1),n("span",{class:"preview-item ml-auto mr-4",onClick:c[0]||(c[0]=s=>$(a.asset.src)),title:"Click to open asset in new tab"},[d(x,{icon:e(D)},null,8,["icon"])]),d(b,{icon:e(E),text:"",circle:"",bg:"",onClick:c[1]||(c[1]=s=>p.$emit("close"))},null,8,["icon"])]),n("main",Y,[n("div",ee,[n("img",{src:a.asset.src},null,8,te)])]),n("footer",null,[n("div",se,[d(i,{modelValue:a.asset.alt,"onUpdate:modelValue":c[2]||(c[2]=s=>a.asset.alt=s),class:"mr-2",placeholder:"Specify Alt attribute for the image"},null,8,["modelValue"]),d(b,{type:"primary",onClick:o,disabled:!a.asset.alt},{default:w(()=>[e(u)?(l(),_("i",oe,[d(e(j))])):m("",!0),A(" Update Alt ")]),_:1},8,["disabled"])])])])}}},ne={key:0,class:"asset-wrap"},le=["src"],ie={class:"asset-details mr-auto"},re={key:2,class:"asset-wrap"},Fe={__name:"assetField",props:{formId:String,data:Object,path:String},setup(a){const g=a,r=K(g),t=r.value(),u=P(g.formId).remoteData.get("assetActions"),o=z({state:!1,context:"library"}),p=i=>{t.value=i,o.state=!1},c=()=>{r.disabled||(o.context="edit",o.state=!0)},x=({action:i,item:s})=>{console.log("action call",i,s),J.confirm("Are you sure you want to run this action?",i.name,{confirmButtonText:i.action_button,cancelButtonText:"Cancel",confirmButtonClass:i.dangerous?"el-button--danger":"el-button--primary"}).then(()=>{let h={class:i.class,selected:[s.id]};Invicta.axios.post("api/resource/assets/actions",h).then(({data:k})=>{Invicta.message(k.message),t.value=k.asset})}).catch(()=>console.log("cancel"))},b=()=>{o.context="library",o.state=!0};return(i,s)=>{const h=G,k=C,F=q,B=Z,I=R,S=ae,V=N;return l(),_(H,null,[d(B,{"form-id":a.formId,"field-props":g},{default:w(()=>{var v;return[e(t)?(l(),_("div",ne,[n("div",{class:"asset",onClick:c},[n("img",{src:e(t).src},null,8,le)]),n("div",ie,[n("strong",null,f(e(t).name),1),A(" "+f(e(t).width)+"x"+f(e(t).height)+" | "+f(e(t).size?e(Q)(e(t).size):"n/a")+" "+f(e(t).alt?e(t).alt:"No Alt!"),1)]),e(u).length?(l(),y(h,{key:0,actions:e(u),item:e(t),onSelected:x,class:"mr-3"},null,8,["actions","item"])):m("",!0),e(r).disabled?m("",!0):(l(),_("span",{key:1,class:"mr-3 action-icon",onClick:s[0]||(s[0]=ce=>t.value=null)},[d(k,{icon:e(L),width:18},null,8,["icon"])]))])):e(r).disabled?e(r).disabled?(l(),_("div",re,"No image")):m("",!0):(l(),y(F,{key:1,type:"browse",onUploadComplete:p,onOpenLibrary:b,single:!0,folder:((v=a.data.props)==null?void 0:v.folder)||null},null,8,["folder"]))]}),_:1},8,["form-id","field-props"]),e(o).state?(l(),y(V,{key:0,onClose:s[3]||(s[3]=v=>e(o).state=!1),style:M({width:e(o).context=="library"?"80%":""})},{default:w(()=>[e(o).context=="library"?(l(),y(I,{key:0,onSelected:p,onCancel:s[1]||(s[1]=v=>e(o).state=!1)})):m("",!0),e(o).context=="edit"?(l(),y(S,{key:1,asset:e(t),onClose:s[2]||(s[2]=v=>e(o).state=!1)},null,8,["asset"])):m("",!0)]),_:1},8,["style"])):m("",!0)],64)}}};export{Fe as default};