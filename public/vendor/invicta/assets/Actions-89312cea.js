import{y as W,ai as ne,A as q,aj as re,Y as G,ak as ie,i as y,o as h,c as U,a as V,I as S,D,u as e,t as z,d as I,k as i,f as T,H as ue,G as X,j as Z,al as x,L as ee,am as ce,an as de,U as fe,ao as me,ap as pe,aq as Y,r as _,ar as ve,as as ye,Z as ge,at as H,au as be,g as Ce,av as he,aw as J,ax as _e,B as ke,ay as Q,C as we,a3 as Ie,w as Ae,az as De,aA as $e,aB as Ee,v as Be,K as Fe,aC as Se,N as Te,a9 as Re,b as j,aD as Pe,E as oe,F as Ne,a0 as Le,ac as Me,ad as Oe,aa as Ue}from"./main-c4840b76.js";import{u as Ve,_ as ze}from"./FormBase-146c11ff.js";import{u as je,a as qe,b as Ke,c as Ze}from"./el-overlay-c458fd8d.js";import{U as te}from"./event-9519ab40.js";import"./icon-c71ea081.js";const ae=Symbol("dialogInjectionKey"),le=W({center:{type:Boolean,default:!1},alignCenter:{type:Boolean,default:!1},closeIcon:{type:ne},customClass:{type:String,default:""},draggable:{type:Boolean,default:!1},fullscreen:{type:Boolean,default:!1},showClose:{type:Boolean,default:!0},title:{type:String,default:""}}),Ge={close:()=>!0},Ye=["aria-label"],He=["id"],Je=q({name:"ElDialogContent"}),Qe=q({...Je,props:le,emits:Ge,setup(o){const c=o,{t:g}=re(),{Close:t}=ce,{dialogRef:a,headerRef:d,bodyId:b,ns:s,style:r}=G(ae),{focusTrapRef:p}=G(ie),f=de(p,a),k=y(()=>c.draggable);return je(a,d,k),(l,v)=>(h(),U("div",{ref:e(f),class:D([e(s).b(),e(s).is("fullscreen",l.fullscreen),e(s).is("draggable",e(k)),e(s).is("align-center",l.alignCenter),{[e(s).m("center")]:l.center},l.customClass]),style:x(e(r)),tabindex:"-1"},[V("header",{ref_key:"headerRef",ref:d,class:D(e(s).e("header"))},[S(l.$slots,"header",{},()=>[V("span",{role:"heading",class:D(e(s).e("title"))},z(l.title),3)]),l.showClose?(h(),U("button",{key:0,"aria-label":e(g)("el.dialog.close"),class:D(e(s).e("headerbtn")),type:"button",onClick:v[0]||(v[0]=R=>l.$emit("close"))},[I(e(X),{class:D(e(s).e("close"))},{default:i(()=>[(h(),T(ue(l.closeIcon||e(t))))]),_:1},8,["class"])],10,Ye)):Z("v-if",!0)],2),V("div",{id:e(b),class:D(e(s).e("body"))},[S(l.$slots,"default")],10,He),l.$slots.footer?(h(),U("footer",{key:0,class:D(e(s).e("footer"))},[S(l.$slots,"footer")],2)):Z("v-if",!0)],6))}});var We=ee(Qe,[["__file","/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog-content.vue"]]);const Xe=W({...le,appendToBody:{type:Boolean,default:!1},beforeClose:{type:fe(Function)},destroyOnClose:{type:Boolean,default:!1},closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:{type:Boolean,default:!1},modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:{type:Boolean,default:!1}}),xe={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[te]:o=>me(o),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},eo=(o,c)=>{const t=he().emit,{nextZIndex:a}=pe();let d="";const b=Y(),s=Y(),r=_(!1),p=_(!1),f=_(!1),k=_(o.zIndex||a());let l,v;const R=ve("namespace",ye),m=y(()=>{const C={},F=`--${R.value}-dialog`;return o.fullscreen||(o.top&&(C[`${F}-margin-top`]=o.top),o.width&&(C[`${F}-width`]=ge(o.width))),C}),u=y(()=>o.alignCenter?{display:"flex"}:{});function P(){t("opened")}function $(){t("closed"),t(te,!1),o.destroyOnClose&&(f.value=!1)}function N(){t("close")}function E(){v==null||v(),l==null||l(),o.openDelay&&o.openDelay>0?{stop:l}=J(()=>w(),o.openDelay):w()}function L(){l==null||l(),v==null||v(),o.closeDelay&&o.closeDelay>0?{stop:v}=J(()=>O(),o.closeDelay):O()}function M(){function C(F){F||(p.value=!0,r.value=!1)}o.beforeClose?o.beforeClose(C):L()}function K(){o.closeOnClickModal&&M()}function w(){_e&&(r.value=!0)}function O(){r.value=!1}function n(){t("openAutoFocus")}function A(){t("closeAutoFocus")}function B(C){var F;((F=C.detail)==null?void 0:F.focusReason)==="pointer"&&C.preventDefault()}o.lockScroll&&qe(r);function se(){o.closeOnPressEscape&&M()}return H(()=>o.modelValue,C=>{C?(p.value=!1,E(),f.value=!0,k.value=o.zIndex?k.value++:a(),be(()=>{t("open"),c.value&&(c.value.scrollTop=0)})):r.value&&L()}),H(()=>o.fullscreen,C=>{c.value&&(C?(d=c.value.style.transform,c.value.style.transform=""):c.value.style.transform=d)}),Ce(()=>{o.modelValue&&(r.value=!0,f.value=!0,E())}),{afterEnter:P,afterLeave:$,beforeLeave:N,handleClose:M,onModalClick:K,close:L,doClose:O,onOpenAutoFocus:n,onCloseAutoFocus:A,onCloseRequested:se,onFocusoutPrevented:B,titleId:b,bodyId:s,closed:p,style:m,overlayDialogStyle:u,rendered:f,visible:r,zIndex:k}},oo=["aria-label","aria-labelledby","aria-describedby"],to=q({name:"ElDialog",inheritAttrs:!1}),ao=q({...to,props:Xe,emits:xe,setup(o,{expose:c}){const g=o,t=ke();Q({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},y(()=>!!t.title)),Q({scope:"el-dialog",from:"custom-class",replacement:"class",version:"2.3.0",ref:"https://element-plus.org/en-US/component/dialog.html#attributes",type:"Attribute"},y(()=>!!g.customClass));const a=we("dialog"),d=_(),b=_(),s=_(),{visible:r,titleId:p,bodyId:f,style:k,overlayDialogStyle:l,rendered:v,zIndex:R,afterEnter:m,afterLeave:u,beforeLeave:P,handleClose:$,onModalClick:N,onOpenAutoFocus:E,onCloseAutoFocus:L,onCloseRequested:M,onFocusoutPrevented:K}=eo(g,d);Ie(ae,{dialogRef:d,headerRef:b,bodyId:f,ns:a,rendered:v,style:k});const w=Ze(N),O=y(()=>g.draggable&&!g.fullscreen);return c({visible:r,dialogContentRef:s}),(n,A)=>(h(),T(Se,{to:"body",disabled:!n.appendToBody},[I(Fe,{name:"dialog-fade",onAfterEnter:e(m),onAfterLeave:e(u),onBeforeLeave:e(P),persisted:""},{default:i(()=>[Ae(I(e(Ke),{"custom-mask-event":"",mask:n.modal,"overlay-class":n.modalClass,"z-index":e(R)},{default:i(()=>[V("div",{role:"dialog","aria-modal":"true","aria-label":n.title||void 0,"aria-labelledby":n.title?void 0:e(p),"aria-describedby":e(f),class:D(`${e(a).namespace.value}-overlay-dialog`),style:x(e(l)),onClick:A[0]||(A[0]=(...B)=>e(w).onClick&&e(w).onClick(...B)),onMousedown:A[1]||(A[1]=(...B)=>e(w).onMousedown&&e(w).onMousedown(...B)),onMouseup:A[2]||(A[2]=(...B)=>e(w).onMouseup&&e(w).onMouseup(...B))},[I(e(De),{loop:"",trapped:e(r),"focus-start-el":"container",onFocusAfterTrapped:e(E),onFocusAfterReleased:e(L),onFocusoutPrevented:e(K),onReleaseRequested:e(M)},{default:i(()=>[e(v)?(h(),T(We,$e({key:0,ref_key:"dialogContentRef",ref:s},n.$attrs,{"custom-class":n.customClass,center:n.center,"align-center":n.alignCenter,"close-icon":n.closeIcon,draggable:e(O),fullscreen:n.fullscreen,"show-close":n.showClose,title:n.title,onClose:e($)}),Ee({header:i(()=>[n.$slots.title?S(n.$slots,"title",{key:1}):S(n.$slots,"header",{key:0,close:e($),titleId:e(p),titleClass:e(a).e("title")})]),default:i(()=>[S(n.$slots,"default")]),_:2},[n.$slots.footer?{name:"footer",fn:i(()=>[S(n.$slots,"footer")])}:void 0]),1040,["custom-class","center","align-center","close-icon","draggable","fullscreen","show-close","title","onClose"])):Z("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,oo)]),_:3},8,["mask","overlay-class","z-index"]),[[Be,e(r)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])],8,["disabled"]))}});var lo=ee(ao,[["__file","/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog.vue"]]);const so=Te(lo);const no={key:1},mo={__name:"ActionsModal",props:{actionsUrl:String},emits:["close"],setup(o,{emit:c}){const g=o,t=_(!1),a=_({name:"Action",blueprint:[],dangerous:!1}),d=_([]),b=y(()=>({class:a.value.class,selected:d.value})),s=y(()=>{var m,u;return(u=(m=a.value.blueprint)==null?void 0:m.fields)!=null&&u.length?b.value:!1}),r=y(()=>`${f.value}.${d.value.join("")}`),p=y(()=>!Re.isEmpty(a.value.blueprint)),f=_(),k=y(()=>a.value.dangerous?"danger":"primary"),l=y(()=>a.value.action_button??"Run Action");Invicta.on("show-action-modal",m=>{a.value=m.action,f.value=`action.${m.action.class}`,d.value=m.selected||[],t.value=!0}),Invicta.on("resource-form-submitted",()=>t.value=!1);const v=y(()=>({blueprint:a.value.blueprint})),R=()=>{if(s.value)Ve(f.value).apiSubmit();else{let m={...b.value,fields:[],validation:[]};if(a.value.redirect){let u="/admin"+g.actionsUrl+`?class=${b.value.class}&selected[]=${b.value.selected.join(",")}`;window.location=u}else Invicta.axios.post(g.actionsUrl,m).then(({data:u})=>{Invicta.message(u.message),Invicta.emit("refresh-resource")});t.value=!1}};return(m,u)=>{const P=ze,$=oe,N=so;return h(),T(N,{modelValue:e(t),"onUpdate:modelValue":u[1]||(u[1]=E=>Pe(t)?t.value=E:null),title:e(a).name,width:"30%"},{footer:i(()=>[I($,{onClick:u[0]||(u[0]=E=>t.value=!1)},{default:i(()=>[j("Cancel")]),_:1}),I($,{type:e(k),onClick:R},{default:i(()=>[j(z(e(l)),1)]),_:1},8,["type"])]),default:i(()=>[e(p)?(h(),T(P,{headless:!0,"form-id":e(f),resource:e(v),"action-url":o.actionsUrl,api:e(s),key:e(r)},null,8,["form-id","resource","action-url","api"])):(h(),U("div",no,"Are you sure you want to run this action?"))]),_:1},8,["modelValue","title"])}}},po={__name:"Actions",props:{name:{type:String,default:"Actions"},global:{type:Boolean,default:!1},actions:Array,selected:{type:Array,default:[]}},setup(o){const c=o,g=t=>{console.log("have command",t);let a={action:t,selected:c.selected.length?c.selected:[]};Invicta.emit("action-called",a)};return(t,a)=>{const d=X,b=oe,s=Oe,r=Ue;return h(),T(r,{trigger:"click",onCommand:g,class:"mr-2"},{dropdown:i(()=>[(h(!0),U(Ne,null,Le(o.actions,p=>(h(),T(s,{command:p},{default:i(()=>[j(z(p.name),1)]),_:2},1032,["command"]))),256))]),default:i(()=>[I(b,null,{default:i(()=>[j(z(o.name)+" ",1),I(d,{class:"el-icon--right"},{default:i(()=>[I(e(Me))]),_:1})]),_:1})]),_:1})}}};export{po as _,mo as a};