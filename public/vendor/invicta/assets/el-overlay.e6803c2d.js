import{Q as be,aw as Se,R as ye,Y as ie,b3 as he,P as Te,m as le,bw as Ie,at as Ce,bb as ue,G as N,bd as Le,ba as Ae,bx as Oe,bc as Pe,as as x,U as H,bs as $e,j as ze,k as de,l as Ee,b as k,p as se,av as we,a as Re,aI as Ve,a9 as De,a6 as He,az as Ne,A as L,aD as Ue,J as Fe,B as A,a5 as ce,W as fe,D as Ye,K as Xe,_ as Ke,r as O,o as c,f as y,w as p,a7 as _,a8 as ee,d as v,n as u,q as me,h as W,c as ne,a0 as j,g as P,t as D,aX as q,i as te,a1 as We,y as je,ax as G,by as Me,a_ as pe,au as qe,bz as Ge}from"./main.e6f303be.js";import{E as Ze}from"./index.019b2677.js";import{P as oe}from"./vnode.5df83872.js";import{i as Je}from"./validator.69d3e4b0.js";import{g as Qe}from"./scroll.5ca22065.js";const xe='a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])',_e=e=>getComputedStyle(e).position==="fixed"?!1:e.offsetParent!==null,ve=e=>Array.from(e.querySelectorAll(xe)).filter(n=>en(n)&&_e(n)),en=e=>{if(e.tabIndex>0||e.tabIndex===0&&e.getAttribute("tabIndex")!==null)return!0;if(e.disabled)return!1;switch(e.nodeName){case"A":return!!e.href&&e.rel!=="ignore";case"INPUT":return!(e.type==="hidden"||e.type==="file");case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}},nn=(e,n,o)=>{let l={offsetX:0,offsetY:0};const s=d=>{const f=d.clientX,g=d.clientY,{offsetX:C,offsetY:E}=l,r=e.value.getBoundingClientRect(),m=r.left,z=r.top,w=r.width,T=r.height,F=document.documentElement.clientWidth,Z=document.documentElement.clientHeight,J=-m+C,M=-z+E,Y=F-m-w+C,Q=Z-z-T+E,X=R=>{const K=Math.min(Math.max(C+R.clientX-f,J),Y),V=Math.min(Math.max(E+R.clientY-g,M),Q);l={offsetX:K,offsetY:V},e.value.style.transform=`translate(${ie(K)}, ${ie(V)})`},B=()=>{document.removeEventListener("mousemove",X),document.removeEventListener("mouseup",B)};document.addEventListener("mousemove",X),document.addEventListener("mouseup",B)},a=()=>{n.value&&e.value&&n.value.addEventListener("mousedown",s)},t=()=>{n.value&&e.value&&n.value.removeEventListener("mousedown",s)};be(()=>{Se(()=>{o.value?a():t()})}),ye(()=>{t()})},tn=e=>{he(e)||Te("[useLockscreen]","You need to pass a ref param to this function");const n=le("popup"),o=Ie(()=>n.bm("parent","hidden"));if(!Ce||ue(document.body,o.value))return;let l=0,s=!1,a="0";const t=()=>{Pe(document.body,o.value),s&&(document.body.style.width=a)};N(e,d=>{if(!d){t();return}s=!ue(document.body,o.value),s&&(a=document.body.style.width),l=Qe(n.namespace.value);const f=document.documentElement.clientHeight<document.body.scrollHeight,g=Le(document.body,"overflowY");l>0&&(f||g==="scroll")&&s&&(document.body.style.width=`calc(100% - ${l}px)`),Ae(document.body,o.value)}),Oe(()=>t())},on=(e,n)=>{let o;N(()=>e.value,l=>{var s,a;l?(o=document.activeElement,he(n)&&((a=(s=n.value).focus)==null||a.call(s))):o.focus()})},Be=e=>{if(!e)return{onClick:x,onMousedown:x,onMouseup:x};let n=!1,o=!1;return{onClick:t=>{n&&o&&e(t),n=o=!1},onMousedown:t=>{n=t.target===t.currentTarget},onMouseup:t=>{o=t.target===t.currentTarget}}},ae="_trap-focus-children",S=[],ge=e=>{if(S.length===0)return;const n=S[S.length-1][ae];if(n.length>0&&e.code===$e.tab){if(n.length===1){e.preventDefault(),document.activeElement!==n[0]&&n[0].focus();return}const o=e.shiftKey,l=e.target===n[0],s=e.target===n[n.length-1];l&&o&&(e.preventDefault(),n[n.length-1].focus()),s&&!o&&(e.preventDefault(),n[0].focus())}},sn={beforeMount(e){e[ae]=ve(e),S.push(e),S.length<=1&&document.addEventListener("keydown",ge)},updated(e){H(()=>{e[ae]=ve(e)})},unmounted(){S.shift(),S.length===0&&document.removeEventListener("keydown",ge)}},an=ze({mask:{type:Boolean,default:!0},customMaskEvent:{type:Boolean,default:!1},overlayClass:{type:de([String,Array,Object])},zIndex:{type:de([String,Number])}}),ln={click:e=>e instanceof MouseEvent};var rn=Ee({name:"ElOverlay",props:an,emits:ln,setup(e,{slots:n,emit:o}){const l=le("overlay"),s=f=>{o("click",f)},{onClick:a,onMousedown:t,onMouseup:d}=Be(e.customMaskEvent?void 0:s);return()=>e.mask?k("div",{class:[l.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:a,onMousedown:t,onMouseup:d},[se(n,"default")],oe.STYLE|oe.CLASS|oe.PROPS,["onClick","onMouseup","onMousedown"]):we("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[se(n,"default")])}});const un=rn,dn=Ee({name:"ElMessageBox",directives:{TrapFocus:sn},components:{ElButton:Re,ElFocusTrap:Ve,ElInput:Ze,ElOverlay:un,ElIcon:De,...He},inheritAttrs:!1,props:{buttonSize:{type:String,validator:Je},modal:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},showClose:{type:Boolean,default:!0},closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},closeOnHashChange:{type:Boolean,default:!0},center:Boolean,draggable:Boolean,roundButton:{default:!1,type:Boolean},container:{type:String,default:"body"},boxType:{type:String,default:""}},emits:["vanish","action"],setup(e,{emit:n}){const{t:o}=Ne(),l=le("message-box"),s=L(!1),{nextZIndex:a}=Ue(),t=Fe({autofocus:!0,beforeClose:null,callback:null,cancelButtonText:"",cancelButtonClass:"",confirmButtonText:"",confirmButtonClass:"",customClass:"",customStyle:{},dangerouslyUseHTMLString:!1,distinguishCancelAndClose:!1,icon:"",inputPattern:null,inputPlaceholder:"",inputType:"text",inputValue:null,inputValidator:null,inputErrorMessage:"",message:null,modalFade:!0,modalClass:"",showCancelButton:!1,showConfirmButton:!0,type:"",title:void 0,showInput:!1,action:"",confirmButtonLoading:!1,cancelButtonLoading:!1,confirmButtonDisabled:!1,editorErrorMessage:"",validateError:!1,zIndex:a()}),d=A(()=>{const i=t.type;return{[l.bm("icon",i)]:i&&ce[i]}}),f=fe(),g=fe(),C=Ye(A(()=>e.buttonSize),{prop:!0,form:!0,formItem:!0}),E=A(()=>t.icon||ce[t.type]||""),r=A(()=>!!t.message),m=L(),z=L(),w=L(),T=L(),F=L(),Z=A(()=>t.confirmButtonClass);N(()=>t.inputValue,async i=>{await H(),e.boxType==="prompt"&&i!==null&&R()},{immediate:!0}),N(()=>s.value,i=>{var b,I;i&&(e.boxType!=="prompt"&&(t.autofocus?w.value=(I=(b=F.value)==null?void 0:b.$el)!=null?I:m.value:w.value=m.value),t.zIndex=a()),e.boxType==="prompt"&&(i?H().then(()=>{var re;T.value&&T.value.$el&&(t.autofocus?w.value=(re=K())!=null?re:m.value:w.value=m.value)}):(t.editorErrorMessage="",t.validateError=!1))});const J=A(()=>e.draggable);nn(m,z,J),be(async()=>{await H(),e.closeOnHashChange&&window.addEventListener("hashchange",M)}),ye(()=>{e.closeOnHashChange&&window.removeEventListener("hashchange",M)});function M(){!s.value||(s.value=!1,H(()=>{t.action&&n("action",t.action)}))}const Y=()=>{e.closeOnClickModal&&B(t.distinguishCancelAndClose?"close":"cancel")},Q=Be(Y),X=i=>{if(t.inputType!=="textarea")return i.preventDefault(),B("confirm")},B=i=>{var b;e.boxType==="prompt"&&i==="confirm"&&!R()||(t.action=i,t.beforeClose?(b=t.beforeClose)==null||b.call(t,i,t,M):M())},R=()=>{if(e.boxType==="prompt"){const i=t.inputPattern;if(i&&!i.test(t.inputValue||""))return t.editorErrorMessage=t.inputErrorMessage||o("el.messagebox.error"),t.validateError=!0,!1;const b=t.inputValidator;if(typeof b=="function"){const I=b(t.inputValue);if(I===!1)return t.editorErrorMessage=t.inputErrorMessage||o("el.messagebox.error"),t.validateError=!0,!1;if(typeof I=="string")return t.editorErrorMessage=I,t.validateError=!0,!1}}return t.editorErrorMessage="",t.validateError=!1,!0},K=()=>{const i=T.value.$refs;return i.input||i.textarea},V=()=>{B("close")},ke=()=>{e.closeOnPressEscape&&V()};return e.lockScroll&&tn(s),on(s),{...Xe(t),ns:l,overlayEvent:Q,visible:s,hasMessage:r,typeClass:d,contentId:f,inputId:g,btnSize:C,iconComponent:E,confirmButtonClasses:Z,rootRef:m,focusStartRef:w,headerRef:z,inputRef:T,confirmRef:F,doClose:M,handleClose:V,onCloseRequested:ke,handleWrapperClick:Y,handleInputEnter:X,handleAction:B,t:o}}}),cn=["aria-label","aria-describedby"],fn=["aria-label"],mn=["id"];function pn(e,n,o,l,s,a){const t=O("el-icon"),d=O("close"),f=O("el-input"),g=O("el-button"),C=O("el-focus-trap"),E=O("el-overlay");return c(),y(We,{name:"fade-in-linear",onAfterLeave:n[11]||(n[11]=r=>e.$emit("vanish")),persisted:""},{default:p(()=>[_(k(E,{"z-index":e.zIndex,"overlay-class":[e.ns.is("message-box"),e.modalClass],mask:e.modal},{default:p(()=>[v("div",{role:"dialog","aria-label":e.title,"aria-modal":"true","aria-describedby":e.showInput?void 0:e.contentId,class:u(`${e.ns.namespace.value}-overlay-message-box`),onClick:n[8]||(n[8]=(...r)=>e.overlayEvent.onClick&&e.overlayEvent.onClick(...r)),onMousedown:n[9]||(n[9]=(...r)=>e.overlayEvent.onMousedown&&e.overlayEvent.onMousedown(...r)),onMouseup:n[10]||(n[10]=(...r)=>e.overlayEvent.onMouseup&&e.overlayEvent.onMouseup(...r))},[k(C,{loop:"",trapped:e.visible,"focus-trap-el":e.rootRef,"focus-start-el":e.focusStartRef,onReleaseRequested:e.onCloseRequested},{default:p(()=>[v("div",{ref:"rootRef",class:u([e.ns.b(),e.customClass,e.ns.is("draggable",e.draggable),{[e.ns.m("center")]:e.center}]),style:me(e.customStyle),tabindex:"-1",onClick:n[7]||(n[7]=W(()=>{},["stop"]))},[e.title!==null&&e.title!==void 0?(c(),ne("div",{key:0,ref:"headerRef",class:u(e.ns.e("header"))},[v("div",{class:u(e.ns.e("title"))},[e.iconComponent&&e.center?(c(),y(t,{key:0,class:u([e.ns.e("status"),e.typeClass])},{default:p(()=>[(c(),y(j(e.iconComponent)))]),_:1},8,["class"])):P("v-if",!0),v("span",null,D(e.title),1)],2),e.showClose?(c(),ne("button",{key:0,type:"button",class:u(e.ns.e("headerbtn")),"aria-label":e.t("el.messagebox.close"),onClick:n[0]||(n[0]=r=>e.handleAction(e.distinguishCancelAndClose?"close":"cancel")),onKeydown:n[1]||(n[1]=q(W(r=>e.handleAction(e.distinguishCancelAndClose?"close":"cancel"),["prevent"]),["enter"]))},[k(t,{class:u(e.ns.e("close"))},{default:p(()=>[k(d)]),_:1},8,["class"])],42,fn)):P("v-if",!0)],2)):P("v-if",!0),v("div",{id:e.contentId,class:u(e.ns.e("content"))},[v("div",{class:u(e.ns.e("container"))},[e.iconComponent&&!e.center&&e.hasMessage?(c(),y(t,{key:0,class:u([e.ns.e("status"),e.typeClass])},{default:p(()=>[(c(),y(j(e.iconComponent)))]),_:1},8,["class"])):P("v-if",!0),e.hasMessage?(c(),ne("div",{key:1,class:u(e.ns.e("message"))},[se(e.$slots,"default",{},()=>[e.dangerouslyUseHTMLString?(c(),y(j(e.showInput?"label":"p"),{key:1,for:e.showInput?e.inputId:void 0,innerHTML:e.message},null,8,["for","innerHTML"])):(c(),y(j(e.showInput?"label":"p"),{key:0,for:e.showInput?e.inputId:void 0},{default:p(()=>[te(D(e.dangerouslyUseHTMLString?"":e.message),1)]),_:1},8,["for"]))])],2)):P("v-if",!0)],2),_(v("div",{class:u(e.ns.e("input"))},[k(f,{id:e.inputId,ref:"inputRef",modelValue:e.inputValue,"onUpdate:modelValue":n[2]||(n[2]=r=>e.inputValue=r),type:e.inputType,placeholder:e.inputPlaceholder,"aria-invalid":e.validateError,class:u({invalid:e.validateError}),onKeydown:q(e.handleInputEnter,["enter"])},null,8,["id","modelValue","type","placeholder","aria-invalid","class","onKeydown"]),v("div",{class:u(e.ns.e("errormsg")),style:me({visibility:e.editorErrorMessage?"visible":"hidden"})},D(e.editorErrorMessage),7)],2),[[ee,e.showInput]])],10,mn),v("div",{class:u(e.ns.e("btns"))},[e.showCancelButton?(c(),y(g,{key:0,loading:e.cancelButtonLoading,class:u([e.cancelButtonClass]),round:e.roundButton,size:e.btnSize,onClick:n[3]||(n[3]=r=>e.handleAction("cancel")),onKeydown:n[4]||(n[4]=q(W(r=>e.handleAction("cancel"),["prevent"]),["enter"]))},{default:p(()=>[te(D(e.cancelButtonText||e.t("el.messagebox.cancel")),1)]),_:1},8,["loading","class","round","size"])):P("v-if",!0),_(k(g,{ref:"confirmRef",type:"primary",loading:e.confirmButtonLoading,class:u([e.confirmButtonClasses]),round:e.roundButton,disabled:e.confirmButtonDisabled,size:e.btnSize,onClick:n[5]||(n[5]=r=>e.handleAction("confirm")),onKeydown:n[6]||(n[6]=q(W(r=>e.handleAction("confirm"),["prevent"]),["enter"]))},{default:p(()=>[te(D(e.confirmButtonText||e.t("el.messagebox.confirm")),1)]),_:1},8,["loading","class","round","disabled","size"]),[[ee,e.showConfirmButton]])],2)],6)]),_:3},8,["trapped","focus-trap-el","focus-start-el","onReleaseRequested"])],42,cn)]),_:3},8,["z-index","overlay-class","mask"]),[[ee,e.visible]])]),_:3})}var vn=Ke(dn,[["render",pn],["__file","/home/runner/work/element-plus/element-plus/packages/components/message-box/src/index.vue"]]);const U=new Map,gn=(e,n,o=null)=>{const l=we(vn,e);return l.appContext=o,Me(l,n),document.body.appendChild(n.firstElementChild),l.component},bn=()=>document.createElement("div"),yn=(e,n)=>{const o=bn();e.onVanish=()=>{Me(null,o),U.delete(s)},e.onAction=a=>{const t=U.get(s);let d;e.showInput?d={value:s.inputValue,action:a}:d=a,e.callback?e.callback(d,l.proxy):a==="cancel"||a==="close"?e.distinguishCancelAndClose&&a!=="cancel"?t.reject("close"):t.reject("cancel"):t.resolve(d)};const l=gn(e,o,n),s=l.proxy;for(const a in e)pe(e,a)&&!pe(s.$props,a)&&(s[a]=e[a]);return N(()=>s.message,(a,t)=>{G(a)?l.slots.default=()=>[a]:G(t)&&!G(a)&&delete l.slots.default},{immediate:!0}),s.visible=!0,s};function $(e,n=null){if(!Ce)return Promise.reject();let o;return je(e)||G(e)?e={message:e}:o=e.callback,new Promise((l,s)=>{const a=yn(e,n!=null?n:$._context);U.set(a,{options:e,callback:o,resolve:l,reject:s})})}const hn=["alert","confirm","prompt"],Cn={alert:{closeOnPressEscape:!1,closeOnClickModal:!1},confirm:{showCancelButton:!0},prompt:{showCancelButton:!0,showInput:!0}};hn.forEach(e=>{$[e]=En(e)});function En(e){return(n,o,l,s)=>{let a="";return qe(o)?(l=o,a=""):Ge(o)?a="":a=o,$(Object.assign({title:a,message:n,type:"",...Cn[e]},l,{boxType:e}),s)}}$.close=()=>{U.forEach((e,n)=>{n.doClose()}),U.clear()};$._context=null;const h=$;h.install=e=>{h._context=e._context,e.config.globalProperties.$msgbox=h,e.config.globalProperties.$messageBox=h,e.config.globalProperties.$alert=h.alert,e.config.globalProperties.$confirm=h.confirm,e.config.globalProperties.$prompt=h.prompt};const Tn=h;export{un as E,tn as a,Be as b,Tn as c,nn as u};