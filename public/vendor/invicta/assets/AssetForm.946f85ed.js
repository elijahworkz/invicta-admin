import{j as H,k as M,l as J,m as K,B as p,c1 as X,c2 as Y,ar as Z,c3 as ee,bo as q,M as te,y as W,o as s,c as r,n as k,e as t,d as o,q as P,p as j,t as I,g as d,f as N,w as U,a0 as se,a9 as ae,_ as oe,s as ne,A as T,r as O,h as V,b as f,c4 as le,bf as G,c5 as ie,c6 as re,i as F,a as L,c7 as ce,c8 as R,F as ue,aL as de,c9 as pe,bk as fe,ca as Q,aR as me,aQ as ve}from"./main.9b9a57ec.js";import{E as ge}from"./card.fc84e5f9.js";import{c as ye}from"./el-overlay.27823c35.js";import{E as he}from"./index.e11d1b94.js";const _e=H({type:{type:String,default:"line",values:["line","circle","dashboard"]},percentage:{type:Number,default:0,validator:a=>a>=0&&a<=100},status:{type:String,default:"",values:["","success","exception","warning"]},indeterminate:{type:Boolean,default:!1},duration:{type:Number,default:3},strokeWidth:{type:Number,default:6},strokeLinecap:{type:M(String),default:"round"},textInside:{type:Boolean,default:!1},width:{type:Number,default:126},showText:{type:Boolean,default:!0},color:{type:M([String,Array,Function]),default:""},format:{type:M(Function),default:a=>`${a}%`}}),ke=["aria-valuenow"],be={viewBox:"0 0 100 100"},$e=["d","stroke","stroke-width"],we=["d","stroke","opacity","stroke-linecap","stroke-width"],Ce={key:0},Se={name:"ElProgress"},Ie=J({...Se,props:_e,setup(a){const n=a,m={success:"#13ce66",exception:"#ff4949",warning:"#e6a23c",default:"#20a0ff"},l=K("progress"),y=p(()=>({width:`${n.percentage}%`,animationDuration:`${n.duration}s`,backgroundColor:z(n.percentage)})),v=p(()=>(n.strokeWidth/n.width*100).toFixed(1)),u=p(()=>["circle","dashboard"].includes(n.type)?Number.parseInt(`${50-Number.parseFloat(v.value)/2}`,10):0),h=p(()=>{const e=u.value,w=n.type==="dashboard";return`
          M 50 50
          m 0 ${w?"":"-"}${e}
          a ${e} ${e} 0 1 1 0 ${w?"-":""}${e*2}
          a ${e} ${e} 0 1 1 0 ${w?"":"-"}${e*2}
          `}),g=p(()=>2*Math.PI*u.value),b=p(()=>n.type==="dashboard"?.75:1),S=p(()=>`${-1*g.value*(1-b.value)/2}px`),i=p(()=>({strokeDasharray:`${g.value*b.value}px, ${g.value}px`,strokeDashoffset:S.value})),$=p(()=>({strokeDasharray:`${g.value*b.value*(n.percentage/100)}px, ${g.value}px`,strokeDashoffset:S.value,transition:"stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s"})),c=p(()=>{let e;return n.color?e=z(n.percentage):e=m[n.status]||m.default,e}),x=p(()=>n.status==="warning"?X:n.type==="line"?n.status==="success"?Y:Z:n.status==="success"?ee:q),_=p(()=>n.type==="line"?12+n.strokeWidth*.4:n.width*.111111+2),A=p(()=>n.format(n.percentage));function E(e){const w=100/e.length;return e.map((C,B)=>W(C)?{color:C,percentage:(B+1)*w}:C).sort((C,B)=>C.percentage-B.percentage)}const z=e=>{var w;const{color:D}=n;if(te(D))return D(e);if(W(D))return D;{const C=E(D);for(const B of C)if(B.percentage>e)return B.color;return(w=C[C.length-1])==null?void 0:w.color}};return(e,w)=>(s(),r("div",{class:k([t(l).b(),t(l).m(e.type),t(l).is(e.status),{[t(l).m("without-text")]:!e.showText,[t(l).m("text-inside")]:e.textInside}]),role:"progressbar","aria-valuenow":e.percentage,"aria-valuemin":"0","aria-valuemax":"100"},[e.type==="line"?(s(),r("div",{key:0,class:k(t(l).b("bar"))},[o("div",{class:k(t(l).be("bar","outer")),style:P({height:`${e.strokeWidth}px`})},[o("div",{class:k([t(l).be("bar","inner"),{[t(l).bem("bar","inner","indeterminate")]:e.indeterminate}]),style:P(t(y))},[(e.showText||e.$slots.default)&&e.textInside?(s(),r("div",{key:0,class:k(t(l).be("bar","innerText"))},[j(e.$slots,"default",{percentage:e.percentage},()=>[o("span",null,I(t(A)),1)])],2)):d("v-if",!0)],6)],6)],2)):(s(),r("div",{key:1,class:k(t(l).b("circle")),style:P({height:`${e.width}px`,width:`${e.width}px`})},[(s(),r("svg",be,[o("path",{class:k(t(l).be("circle","track")),d:t(h),stroke:`var(${t(l).cssVarName("fill-color-light")}, #e5e9f2)`,"stroke-width":t(v),fill:"none",style:P(t(i))},null,14,$e),o("path",{class:k(t(l).be("circle","path")),d:t(h),stroke:t(c),fill:"none",opacity:e.percentage?1:0,"stroke-linecap":e.strokeLinecap,"stroke-width":t(v),style:P(t($))},null,14,we)]))],6)),(e.showText||e.$slots.default)&&!e.textInside?(s(),r("div",{key:2,class:k(t(l).e("text")),style:P({fontSize:`${t(_)}px`})},[j(e.$slots,"default",{percentage:e.percentage},()=>[e.status?(s(),N(t(ae),{key:1},{default:U(()=>[(s(),N(se(t(x))))]),_:1})):(s(),r("span",Ce,I(t(A)),1))])],6)):d("v-if",!0)],10,ke))}});var xe=oe(Ie,[["__file","/home/runner/work/element-plus/element-plus/packages/components/progress/src/progress.vue"]]);const De=ne(xe);const Be={key:0,enctype:"multipart/form-data",novalidate:""},Pe=["onDrop"],Te=["multiple","accept","disabled"],Ne={key:0,class:"dropbox-initial"},Ue={class:"dropbox-text"},Ae=o("span",null,[F("Drop file here or "),o("strong",null,"click to select")],-1),Ee={key:1,class:"dropbox-saving"},Fe={key:1,class:"button-upload"},Me=["multiple","accept","disabled"],Ve={key:0,class:"el-icon is-loading"},Oe={key:1,class:"el-icon"},Le={key:2},ze=F("Media Library"),We={__name:"Uploader",props:{type:{type:String,default:"button"},accept:{type:String,default:"image/*,audio/*,.pdf"},multiple:{type:Boolean,default:!0}},emits:["upload-complete","open-library"],setup(a,{emit:n}){const m=T(!0),l=T(!1),y=T(!1),v=T(),u=T(0),h=p(()=>u.value==100?"Saving to database...":"Uploading to server..."),g=$=>{y.value=!1,m.value=!1,l.value=!0;const c=$.target.files.length!==0?$.target.files:$.dataTransfer.files;if(c.length!=0)for(let x of c)S(x)},b=()=>{v.value.value=null,v.value.click()};function S($){v.value=null;let c=new FormData;c.append("file",$);const x={onUploadProgress:_=>{_.lengthComputable&&(u.value=Math.round(_.loaded*100/_.total))}};Invicta.axios.post("/assets",c,x).then(({data:_})=>{Invicta.message(_.message),n("upload-complete",_.asset),Invicta.emit("refresh-resource"),i()}).catch(_=>{i()})}function i(){l.value=!1,m.value=!0,Invicta.emit("refresh-library",!0)}return($,c)=>{const x=O("SvgIcon"),_=De,A=L;return s(),r("div",{class:k(["image-uploader",a.type])},[m.value||l.value?(s(),r("form",Be,[a.type=="drag"?(s(),r("div",{key:0,class:k(["dropbox",{"is-dragover":y.value,"is-initial":m.value}]),onDrop:V(g,["prevent"]),onDragover:c[0]||(c[0]=V(E=>y.value=!0,["prevent"])),onDragleave:c[1]||(c[1]=V(E=>y.value=!1,["prevent"]))},[o("input",{type:"file",ref_key:"uploadImage",ref:v,multiple:a.multiple,accept:a.accept,class:"input-file",disabled:l.value,onChange:g},null,40,Te),m.value?(s(),r("div",Ne,[o("div",Ue,[f(x,{icon:t(le)},null,8,["icon"]),Ae])])):d("",!0),l.value?(s(),r("div",Ee,[f(_,{type:"circle",percentage:u.value},null,8,["percentage"]),o("div",null,I(t(h)),1)])):d("",!0)],42,Pe)):(s(),r("div",Fe,[o("span",{class:"el-button el-button--primary",onClick:b,title:"Upload new asset"},[o("input",{type:"file",ref_key:"uploadImage",ref:v,multiple:a.multiple,accept:a.accept,class:"input-file",disabled:l.value,onChange:g},null,40,Me),l.value?(s(),r("i",Ve,[f(t(G))])):d("",!0),l.value?d("",!0):(s(),r("i",Oe,[f(t(ie))])),a.type==="button"?(s(),r("span",Le,"Upload")):d("",!0)]),a.type==="browse"?(s(),N(A,{key:0,icon:t(re),onClick:c[2]||(c[2]=E=>$.$emit("open-library"))},{default:U(()=>[ze]),_:1},8,["icon"])):d("",!0)]))])):d("",!0)],2)}}},je={class:"p-4"},Re={class:"cards-wrapper grid"},qe={class:"media-asset"},Ge={key:0,class:"image-transparent-back"},Qe=["src"],He={class:"media-details"},Je={class:"name"},Ke={class:"bottom"},Xe={key:0},Ye={key:0,class:"actions-layer"},Ze=F("Select Image"),et={key:1,class:"actions-layer"},tt=["onClick","title"],st=["onClick"],at=["onClick","title"],ot=["onClick"],yt={__name:"GridView",props:{resource:Object,multiple:Boolean,selector:{type:Boolean,default:!1}},setup(a){const n=a,{isSupported:m,copy:l}=ce();R("clipboard-read"),R("clipboard-write");const y=u=>{ye.confirm("This action will permanently delete records from database. Are you sure you want to continue?","Deleting",{confirmButtonText:"Delete",cancelButtonText:"Cancel",confirmButtonClass:"el-button--danger"}).then(()=>{ve.Inertia.delete(n.resource.meta.path,{data:{selected:u}})}).catch(()=>console.log("cancel"))},v=u=>window.open(u,"_blank");return(u,h)=>{const g=L,b=O("SvgIcon"),S=ge;return s(),r("div",je,[a.selector?d("",!0):(s(),N(We,{key:0,type:"drag",multiple:a.multiple},null,8,["multiple"])),o("div",Re,[(s(!0),r(ue,null,de(a.resource,(i,$)=>(s(),r("div",{class:"card-wrap",key:i.img_name},[f(S,{"body-style":"padding: 0px",title:i.img_name},{default:U(()=>[o("div",qe,[i.type=="image"?(s(),r("div",Ge,[o("img",{src:i.src},null,8,Qe)])):d("",!0)]),o("div",He,[o("div",Je,I(i.img_name),1),o("div",Ke,[o("span",null,I(i.created),1),i.type=="image"?(s(),r("span",Xe,I(i.dimensions)+"px",1)):d("",!0),o("span",null,I(i.size),1)])]),a.selector?(s(),r("div",Ye,[i.type=="image"?(s(),N(g,{key:0,type:"primary",onClick:c=>u.$emit("asset-selected",i)},{default:U(()=>[Ze]),_:2},1032,["onClick"])):d("",!0)])):(s(),r("div",et,[t(m)?(s(),r("span",{key:0,class:"copy-item",onClick:c=>t(l)(i.img_name),title:`Copy filename to clipboard: ${i.img_name}`},[f(t(pe))],8,tt)):d("",!0),i.type=="image"?(s(),r("span",{key:1,class:"preview-item",onClick:c=>u.$emit("edit",i),title:"Click to preview image"},[f(t(fe))],8,st)):d("",!0),o("span",{class:"preview-item",onClick:c=>v(i.src),title:`Click to open ${i.type} in new tab`},[f(b,{icon:t(Q)},null,8,["icon"])],8,at),o("span",{class:"delete-item",onClick:c=>y([i.id]),title:"Click to delete image"},[f(t(me))],8,ot)]))]),_:2},1032,["title"])]))),128))])])}}};const nt={class:"w-full flex flex-col"},lt={class:"p-3 flex items-center justify-between"},it={class:"preview"},rt={class:"image-transparent-back"},ct=["src"],ut={class:"flex p-3"},dt={key:0,class:"el-icon is-loading"},pt=F(" Update Alt "),ht={__name:"AssetForm",props:{asset:Object},emits:["close"],setup(a,{emit:n}){const m=a,l=u=>window.open(u,"_blank"),y=T(!1),v=()=>{y.value=!0,Invicta.axios.post(`assets/${m.asset.id}`,{alt:m.asset.alt}).then(()=>{y.value=!1,n("close",!0)})};return(u,h)=>{const g=O("SvgIcon"),b=L,S=he;return s(),r("div",nt,[o("header",lt,[o("h1",null,I(a.asset.img_name||a.asset.name),1),o("span",{class:"preview-item ml-auto mr-4",onClick:h[0]||(h[0]=i=>l(a.asset.src)),title:"Click to open asset in new tab"},[f(g,{icon:t(Q)},null,8,["icon"])]),f(b,{icon:t(q),text:"",circle:"",bg:"",onClick:h[1]||(h[1]=i=>u.$emit("close"))},null,8,["icon"])]),o("main",it,[o("div",rt,[o("img",{src:a.asset.src},null,8,ct)])]),o("footer",null,[o("div",ut,[f(S,{modelValue:a.asset.alt,"onUpdate:modelValue":h[2]||(h[2]=i=>a.asset.alt=i),class:"mr-2",placeholder:"Specify Alt attribute for the image"},null,8,["modelValue"]),f(b,{type:"primary",onClick:v,disabled:!a.asset.alt},{default:U(()=>[y.value?(s(),r("i",dt,[f(t(G))])):d("",!0),pt]),_:1},8,["disabled"])])])])}}};export{We as _,yt as a,ht as b};