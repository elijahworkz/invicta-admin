import{z as M,B as X,_ as Z,E as Ce,F as ke,T as at,A as $e}from"./base-72e786ad.js";/* empty css             */import{E as ot}from"./card-f42e8663.js";import{_ as st}from"./FormField-f612b4ad.js";import{F as he,E as nt,G as lt,z as rt,D as it}from"./dropdown-63e433a1.js";import{u as Te,a as K,E as dt}from"./popper-f48344f7.js";import{E as Ae,o as ut}from"./button-eed7db75.js";import"./scrollbar-bf92d097.js";/* empty css                      *//* empty css                      */import{h as ct,_ as pt}from"./tooltip-d593d8ee.js";import{a6 as ft,p as bt,q as ye,a as k,aa as ue,c as P,d as F,b as y,l as B,g as D,f as ce,u as t,ab as de,n as V,k as W,y as H,t as q,H as se,h as Ie,o as oe,ag as Ve,a8 as Oe,af as mt,z as U,e as L,w as C,j as G,an as we,T as pe,W as vt,m as _,as as ht,M as gt,F as J,x as Q,X as _t,v as yt}from"./runtime-core.esm-bundler-7f0fe3b3.js";/* empty css             */import{u as wt}from"./index-78de64d9.js";import{m as Fe,w as De,v as Le}from"./pinia-2da5345b.js";import{l as ge}from"./lodash-42c17880.js";import{E as ae,g as re,h as St,c as Et,z as Ue,a as Ct}from"./index-fdcfd54f.js";import{h as Ge,j as Se,k as Ee,f as kt,g as $t,d as Nt,m as Tt,e as Bt,t as Ne,n as xe,D as Pt,E as Rt,l as Be,F as Pe}from"./index-c36ce5e6.js";import{U as ne,C as zt}from"./event-9519ab40.js";import{u as At,a as It}from"./index-5b8066f6.js";import{m as Me}from"./typescript-defaf979.js";import{c as j}from"./strings-446bef3a.js";import{E as ie}from"./index-6a0de497.js";import{f as Vt}from"./vnode-466384f0.js";import{u as Ot}from"./index-15acff50.js";import{a as Ft}from"./index-9849c84f.js";const Ke=Symbol("radioGroupKey"),fe=Symbol("tabsRootContextKey"),Dt=(e,i,n)=>Vt(e.subTree).filter(r=>{var s;return bt(r)&&((s=r.type)==null?void 0:s.name)===i&&!!r.component}).map(r=>r.component.uid).map(r=>n[r]).filter(r=>!!r),Lt=(e,i)=>{const n={},o=ft([]);return{children:o,addChild:s=>{n[s.uid]=s,o.value=Dt(e,i,n)},removeChild:s=>{delete n[s],o.value=o.value.filter(f=>f.uid!==s)}}},je=M({size:Ge,disabled:Boolean,label:{type:[String,Number,Boolean],default:""}}),Ut=M({...je,modelValue:{type:[String,Number,Boolean],default:""},name:{type:String,default:""},border:Boolean}),He={[ne]:e=>ye(e)||Se(e)||Ee(e),[zt]:e=>ye(e)||Se(e)||Ee(e)},qe=(e,i)=>{const n=k(),o=ue(Ke,void 0),l=P(()=>!!o),r=P({get(){return l.value?o.modelValue:e.modelValue},set(b){l.value?o.changeEvent(b):i&&i(ne,b),n.value.checked=e.modelValue===e.label}}),s=kt(P(()=>o==null?void 0:o.size)),f=$t(P(()=>o==null?void 0:o.disabled)),d=k(!1),m=P(()=>f.value||l.value&&r.value!==e.label?-1:0);return{radioRef:n,isGroup:l,radioGroup:o,focus:d,size:s,disabled:f,tabIndex:m,modelValue:r}},Gt=["value","name","disabled"],xt=F({name:"ElRadio"}),Mt=F({...xt,props:Ut,emits:He,setup(e,{emit:i}){const n=e,o=X("radio"),{radioRef:l,radioGroup:r,focus:s,size:f,disabled:d,modelValue:m}=qe(n,i);function b(){se(()=>i("change",m.value))}return(a,u)=>{var c;return y(),B("label",{class:V([t(o).b(),t(o).is("disabled",t(d)),t(o).is("focus",t(s)),t(o).is("bordered",a.border),t(o).is("checked",t(m)===a.label),t(o).m(t(f))])},[D("span",{class:V([t(o).e("input"),t(o).is("disabled",t(d)),t(o).is("checked",t(m)===a.label)])},[ce(D("input",{ref_key:"radioRef",ref:l,"onUpdate:modelValue":u[0]||(u[0]=S=>de(m)?m.value=S:null),class:V(t(o).e("original")),value:a.label,name:a.name||((c=t(r))==null?void 0:c.name),disabled:t(d),type:"radio",onFocus:u[1]||(u[1]=S=>s.value=!0),onBlur:u[2]||(u[2]=S=>s.value=!1),onChange:b},null,42,Gt),[[Fe,t(m)]]),D("span",{class:V(t(o).e("inner"))},null,2)],2),D("span",{class:V(t(o).e("label")),onKeydown:u[3]||(u[3]=De(()=>{},["stop"]))},[W(a.$slots,"default",{},()=>[H(q(a.label),1)])],34)],2)}}});var Kt=Z(Mt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue"]]);const jt=M({...je,name:{type:String,default:""}}),Ht=["value","name","disabled"],qt=F({name:"ElRadioButton"}),Wt=F({...qt,props:jt,setup(e){const i=e,n=X("radio"),{radioRef:o,focus:l,size:r,disabled:s,modelValue:f,radioGroup:d}=qe(i),m=P(()=>({backgroundColor:(d==null?void 0:d.fill)||"",borderColor:(d==null?void 0:d.fill)||"",boxShadow:d!=null&&d.fill?`-1px 0 0 0 ${d.fill}`:"",color:(d==null?void 0:d.textColor)||""}));return(b,a)=>{var u;return y(),B("label",{class:V([t(n).b("button"),t(n).is("active",t(f)===b.label),t(n).is("disabled",t(s)),t(n).is("focus",t(l)),t(n).bm("button",t(r))])},[ce(D("input",{ref_key:"radioRef",ref:o,"onUpdate:modelValue":a[0]||(a[0]=c=>de(f)?f.value=c:null),class:V(t(n).be("button","original-radio")),value:b.label,type:"radio",name:b.name||((u=t(d))==null?void 0:u.name),disabled:t(s),onFocus:a[1]||(a[1]=c=>l.value=!0),onBlur:a[2]||(a[2]=c=>l.value=!1)},null,42,Ht),[[Fe,t(f)]]),D("span",{class:V(t(n).be("button","inner")),style:Ie(t(f)===b.label?t(m):{}),onKeydown:a[3]||(a[3]=De(()=>{},["stop"]))},[W(b.$slots,"default",{},()=>[H(q(b.label),1)])],38)],2)}}});var We=Z(Wt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue"]]);const Xt=M({id:{type:String,default:void 0},size:Ge,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:""},fill:{type:String,default:""},label:{type:String,default:void 0},textColor:{type:String,default:""},name:{type:String,default:void 0},validateEvent:{type:Boolean,default:!0}}),Yt=He,Jt=["id","aria-label","aria-labelledby"],Qt=F({name:"ElRadioGroup"}),Zt=F({...Qt,props:Xt,emits:Yt,setup(e,{emit:i}){const n=e,o=X("radio"),l=Nt(),r=k(),{formItem:s}=At(),{inputId:f,isLabeledByFormItem:d}=It(n,{formItemContext:s}),m=a=>{i(ne,a),se(()=>i("change",a))};oe(()=>{const a=r.value.querySelectorAll("[type=radio]"),u=a[0];!Array.from(a).some(c=>c.checked)&&u&&(u.tabIndex=0)});const b=P(()=>n.name||l.value);return Ve(Ke,Oe({...mt(n),changeEvent:m,name:b})),U(()=>n.modelValue,()=>{n.validateEvent&&(s==null||s.validate("change").catch(a=>Tt()))}),(a,u)=>(y(),B("div",{id:t(f),ref_key:"radioGroupRef",ref:r,class:V(t(o).b("group")),role:"radiogroup","aria-label":t(d)?void 0:a.label||"radio-group","aria-labelledby":t(d)?t(s).labelId:void 0},[W(a.$slots,"default")],10,Jt))}});var Xe=Z(Zt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue"]]);const ea=Ce(Kt,{RadioButton:We,RadioGroup:Xe}),ta=ke(Xe);ke(We);const aa=M({trigger:Te.trigger,placement:he.placement,disabled:Te.disabled,visible:K.visible,transition:K.transition,popperOptions:he.popperOptions,tabindex:he.tabindex,content:K.content,popperStyle:K.popperStyle,popperClass:K.popperClass,enterable:{...K.enterable,default:!0},effect:{...K.effect,default:"light"},teleported:K.teleported,title:String,width:{type:[String,Number],default:150},offset:{type:Number,default:void 0},showAfter:{type:Number,default:0},hideAfter:{type:Number,default:200},autoClose:{type:Number,default:0},showArrow:{type:Boolean,default:!0},persistent:{type:Boolean,default:!0},"onUpdate:visible":{type:Function}}),oa={"update:visible":e=>Ee(e),"before-enter":()=>!0,"before-leave":()=>!0,"after-enter":()=>!0,"after-leave":()=>!0},sa="onUpdate:visible",na=F({name:"ElPopover"}),la=F({...na,props:aa,emits:oa,setup(e,{expose:i,emit:n}){const o=e,l=P(()=>o[sa]),r=X("popover"),s=k(),f=P(()=>{var p;return(p=t(s))==null?void 0:p.popperRef}),d=P(()=>[{width:Bt(o.width)},o.popperStyle]),m=P(()=>[r.b(),o.popperClass,{[r.m("plain")]:!!o.content}]),b=P(()=>o.transition===`${r.namespace.value}-fade-in-linear`),a=()=>{var p;(p=s.value)==null||p.hide()},u=()=>{n("before-enter")},c=()=>{n("before-leave")},S=()=>{n("after-enter")},$=()=>{n("update:visible",!1),n("after-leave")};return i({popperRef:f,hide:a}),(p,h)=>(y(),L(t(dt),we({ref_key:"tooltipRef",ref:s},p.$attrs,{trigger:p.trigger,placement:p.placement,disabled:p.disabled,visible:p.visible,transition:p.transition,"popper-options":p.popperOptions,tabindex:p.tabindex,content:p.content,offset:p.offset,"show-after":p.showAfter,"hide-after":p.hideAfter,"auto-close":p.autoClose,"show-arrow":p.showArrow,"aria-label":p.title,effect:p.effect,enterable:p.enterable,"popper-class":t(m),"popper-style":t(d),teleported:p.teleported,persistent:p.persistent,"gpu-acceleration":t(b),"onUpdate:visible":t(l),onBeforeShow:u,onBeforeHide:c,onShow:S,onHide:$}),{content:C(()=>[p.title?(y(),B("div",{key:0,class:V(t(r).e("title")),role:"title"},q(p.title),3)):G("v-if",!0),W(p.$slots,"default",{},()=>[H(q(p.content),1)])]),default:C(()=>[p.$slots.reference?W(p.$slots,"reference",{key:0}):G("v-if",!0)]),_:3},16,["trigger","placement","disabled","visible","transition","popper-options","tabindex","content","offset","show-after","hide-after","auto-close","show-arrow","aria-label","effect","enterable","popper-class","popper-style","teleported","persistent","gpu-acceleration","onUpdate:visible"]))}});var ra=Z(la,[["__file","/home/runner/work/element-plus/element-plus/packages/components/popover/src/popover.vue"]]);const Re=(e,i)=>{const n=i.arg||i.value,o=n==null?void 0:n.popperRef;o&&(o.triggerRef=e)};var ia={mounted(e,i){Re(e,i)},updated(e,i){Re(e,i)}};const da="popover",ua=at(ia,da),ca=Ce(ra,{directive:ua}),pa=M({tabs:{type:$e(Array),default:()=>Me([])}}),Ye="ElTabBar",fa=F({name:Ye}),ba=F({...fa,props:pa,setup(e,{expose:i}){const n=e,o=pe(),l=ue(fe);l||Ne(Ye,"<el-tabs><el-tab-bar /></el-tabs>");const r=X("tabs"),s=k(),f=k(),d=()=>{let b=0,a=0;const u=["top","bottom"].includes(l.props.tabPosition)?"width":"height",c=u==="width"?"x":"y",S=c==="x"?"left":"top";return n.tabs.every($=>{var p,h;const N=(h=(p=o.parent)==null?void 0:p.refs)==null?void 0:h[`tab-${$.uid}`];if(!N)return!1;if(!$.active)return!0;b=N[`offset${j(S)}`],a=N[`client${j(u)}`];const T=window.getComputedStyle(N);return u==="width"&&(n.tabs.length>1&&(a-=Number.parseFloat(T.paddingLeft)+Number.parseFloat(T.paddingRight)),b+=Number.parseFloat(T.paddingLeft)),!1}),{[u]:`${a}px`,transform:`translate${j(c)}(${b}px)`}},m=()=>f.value=d();return U(()=>n.tabs,async()=>{await se(),m()},{immediate:!0}),xe(s,()=>m()),i({ref:s,update:m}),(b,a)=>(y(),B("div",{ref_key:"barRef",ref:s,class:V([t(r).e("active-bar"),t(r).is(t(l).props.tabPosition)]),style:Ie(f.value)},null,6))}});var ma=Z(ba,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-bar.vue"]]);const va=M({panes:{type:$e(Array),default:()=>Me([])},currentName:{type:[String,Number],default:""},editable:Boolean,type:{type:String,values:["card","border-card",""],default:""},stretch:Boolean}),ha={tabClick:(e,i,n)=>n instanceof Event,tabRemove:(e,i)=>i instanceof Event},ze="ElTabNav",ga=F({name:ze,props:va,emits:ha,setup(e,{expose:i,emit:n}){const o=pe(),l=ue(fe);l||Ne(ze,"<el-tabs><tab-nav /></el-tabs>");const r=X("tabs"),s=Pt(),f=Rt(),d=k(),m=k(),b=k(),a=k(!1),u=k(0),c=k(!1),S=k(!0),$=P(()=>["top","bottom"].includes(l.props.tabPosition)?"width":"height"),p=P(()=>({transform:`translate${$.value==="width"?"X":"Y"}(-${u.value}px)`})),h=()=>{if(!d.value)return;const g=d.value[`offset${j($.value)}`],E=u.value;if(!E)return;const w=E>g?E-g:0;u.value=w},N=()=>{if(!d.value||!m.value)return;const g=m.value[`offset${j($.value)}`],E=d.value[`offset${j($.value)}`],w=u.value;if(g-w<=E)return;const A=g-w>E*2?w+E:g-E;u.value=A},T=async()=>{const g=m.value;if(!a.value||!b.value||!d.value||!g)return;await se();const E=b.value.querySelector(".is-active");if(!E)return;const w=d.value,A=["top","bottom"].includes(l.props.tabPosition),z=E.getBoundingClientRect(),v=w.getBoundingClientRect(),I=A?g.offsetWidth-v.width:g.offsetHeight-v.height,O=u.value;let R=O;A?(z.left<v.left&&(R=O-(v.left-z.left)),z.right>v.right&&(R=O+z.right-v.right)):(z.top<v.top&&(R=O-(v.top-z.top)),z.bottom>v.bottom&&(R=O+(z.bottom-v.bottom))),R=Math.max(R,0),u.value=Math.min(R,I)},x=()=>{if(!m.value||!d.value)return;const g=m.value[`offset${j($.value)}`],E=d.value[`offset${j($.value)}`],w=u.value;if(E<g){const A=u.value;a.value=a.value||{},a.value.prev=A,a.value.next=A+E<g,g-A<E&&(u.value=g-E)}else a.value=!1,w>0&&(u.value=0)},ee=g=>{const E=g.code,{up:w,down:A,left:z,right:v}=ie;if(![w,A,z,v].includes(E))return;const I=Array.from(g.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)")),O=I.indexOf(g.target);let R;E===z||E===w?O===0?R=I.length-1:R=O-1:O<I.length-1?R=O+1:R=0,I[R].focus({preventScroll:!0}),I[R].click(),le()},le=()=>{S.value&&(c.value=!0)},te=()=>c.value=!1;return U(s,g=>{g==="hidden"?S.value=!1:g==="visible"&&setTimeout(()=>S.value=!0,50)}),U(f,g=>{g?setTimeout(()=>S.value=!0,50):S.value=!1}),xe(b,x),oe(()=>setTimeout(()=>T(),0)),vt(()=>x()),i({scrollToActiveTab:T,removeFocus:te}),U(()=>e.panes,()=>o.update(),{flush:"post"}),()=>{const g=a.value?[_("span",{class:[r.e("nav-prev"),r.is("disabled",!a.value.prev)],onClick:h},[_(ae,null,{default:()=>[_(re,null,null)]})]),_("span",{class:[r.e("nav-next"),r.is("disabled",!a.value.next)],onClick:N},[_(ae,null,{default:()=>[_(St,null,null)]})])]:null,E=e.panes.map((w,A)=>{var z,v,I,O;const R=w.uid,be=w.props.disabled,me=(v=(z=w.props.name)!=null?z:w.index)!=null?v:`${A}`,ve=!be&&(w.isClosable||e.editable);w.index=`${A}`;const Ze=ve?_(ae,{class:"is-icon-close",onClick:Y=>n("tabRemove",w,Y)},{default:()=>[_(Et,null,null)]}):null,et=((O=(I=w.slots).label)==null?void 0:O.call(I))||w.props.label,tt=!be&&w.active?0:-1;return _("div",{ref:`tab-${R}`,class:[r.e("item"),r.is(l.props.tabPosition),r.is("active",w.active),r.is("disabled",be),r.is("closable",ve),r.is("focus",c.value)],id:`tab-${me}`,key:`tab-${R}`,"aria-controls":`pane-${me}`,role:"tab","aria-selected":w.active,tabindex:tt,onFocus:()=>le(),onBlur:()=>te(),onClick:Y=>{te(),n("tabClick",w,me,Y)},onKeydown:Y=>{ve&&(Y.code===ie.delete||Y.code===ie.backspace)&&n("tabRemove",w,Y)}},[et,Ze])});return _("div",{ref:b,class:[r.e("nav-wrap"),r.is("scrollable",!!a.value),r.is(l.props.tabPosition)]},[g,_("div",{class:r.e("nav-scroll"),ref:d},[_("div",{class:[r.e("nav"),r.is(l.props.tabPosition),r.is("stretch",e.stretch&&["top","bottom"].includes(l.props.tabPosition))],ref:m,style:p.value,role:"tablist",onKeydown:ee},[e.type?null:_(ma,{tabs:[...e.panes]},null),E])])])}}}),_a=M({type:{type:String,values:["card","border-card",""],default:""},activeName:{type:[String,Number]},closable:Boolean,addable:Boolean,modelValue:{type:[String,Number]},editable:Boolean,tabPosition:{type:String,values:["top","right","bottom","left"],default:"top"},beforeLeave:{type:$e(Function),default:()=>!0},stretch:Boolean}),_e=e=>ye(e)||Se(e),ya={[ne]:e=>_e(e),tabClick:(e,i)=>i instanceof Event,tabChange:e=>_e(e),edit:(e,i)=>["remove","add"].includes(i),tabRemove:e=>_e(e),tabAdd:()=>!0};var wa=F({name:"ElTabs",props:_a,emits:ya,setup(e,{emit:i,slots:n,expose:o}){var l,r;const s=X("tabs"),{children:f,addChild:d,removeChild:m}=Lt(pe(),"ElTabPane"),b=k(),a=k((r=(l=e.modelValue)!=null?l:e.activeName)!=null?r:"0"),u=h=>{a.value=h,i(ne,h),i("tabChange",h)},c=async h=>{var N,T,x;if(!(a.value===h||Be(h)))try{await((N=e.beforeLeave)==null?void 0:N.call(e,h,a.value))!==!1&&(u(h),(x=(T=b.value)==null?void 0:T.removeFocus)==null||x.call(T))}catch{}},S=(h,N,T)=>{h.props.disabled||(c(N),i("tabClick",h,T))},$=(h,N)=>{h.props.disabled||Be(h.props.name)||(N.stopPropagation(),i("edit",h.props.name,"remove"),i("tabRemove",h.props.name))},p=()=>{i("edit",void 0,"add"),i("tabAdd")};return Ot({from:'"activeName"',replacement:'"model-value" or "v-model"',scope:"ElTabs",version:"2.3.0",ref:"https://element-plus.org/en-US/component/tabs.html#attributes",type:"Attribute"},P(()=>!!e.activeName)),U(()=>e.activeName,h=>c(h)),U(()=>e.modelValue,h=>c(h)),U(a,async()=>{var h;await se(),(h=b.value)==null||h.scrollToActiveTab()}),Ve(fe,{props:e,currentName:a,registerPane:d,unregisterPane:m}),o({currentName:a}),()=>{const h=e.editable||e.addable?_("span",{class:s.e("new-tab"),tabindex:"0",onClick:p,onKeydown:x=>{x.code===ie.enter&&p()}},[_(ae,{class:s.is("icon-plus")},{default:()=>[_(Ue,null,null)]})]):null,N=_("div",{class:[s.e("header"),s.is(e.tabPosition)]},[h,_(ga,{ref:b,currentName:a.value,editable:e.editable,type:e.type,panes:f.value,stretch:e.stretch,onTabClick:S,onTabRemove:$},null)]),T=_("div",{class:s.e("content")},[W(n,"default")]);return _("div",{class:[s.b(),s.m(e.tabPosition),{[s.m("card")]:e.type==="card",[s.m("border-card")]:e.type==="border-card"}]},[...e.tabPosition!=="bottom"?[N,T]:[T,N]])}}});const Sa=M({label:{type:String,default:""},name:{type:[String,Number]},closable:Boolean,disabled:Boolean,lazy:Boolean}),Ea=["id","aria-hidden","aria-labelledby"],Je="ElTabPane",Ca=F({name:Je}),ka=F({...Ca,props:Sa,setup(e){const i=e,n=pe(),o=ht(),l=ue(fe);l||Ne(Je,"usage: <el-tabs><el-tab-pane /></el-tabs/>");const r=X("tab-pane"),s=k(),f=P(()=>i.closable||l.props.closable),d=Pe(()=>{var c;return l.currentName.value===((c=i.name)!=null?c:s.value)}),m=k(d.value),b=P(()=>{var c;return(c=i.name)!=null?c:s.value}),a=Pe(()=>!i.lazy||m.value||d.value);U(d,c=>{c&&(m.value=!0)});const u=Oe({uid:n.uid,slots:o,props:i,paneName:b,active:d,index:s,isClosable:f});return oe(()=>{l.registerPane(u)}),gt(()=>{l.unregisterPane(u.uid)}),(c,S)=>t(a)?ce((y(),B("div",{key:0,id:`pane-${t(b)}`,class:V(t(r).b()),role:"tabpanel","aria-hidden":!t(d),"aria-labelledby":`tab-${t(b)}`},[W(c.$slots,"default")],10,Ea)),[[Le,t(d)]]):G("v-if",!0)}});var Qe=Z(ka,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-pane.vue"]]);const $a=Ce(wa,{TabPane:Qe}),Na=ke(Qe);const Ta={__name:"Localizations",props:{localizations:Object,resourceUrl:String},emits:["change"],setup(e,{emit:i}){const o=find(e.localizations.value,"origin"),l=s=>s.origin?"Original":s.current?"Current translation":`${s.translation?"Edit":"Create"} ${s.name} translation`,r=s=>{console.log("handle me",s);let f=s.translation?s.translation:s.origin?s.origin:null,d=f?`${f}/edit`:`${o.value}/duplicate`;console.log("getting",d)};return(s,f)=>{const d=pt,m=Ae,b=nt,a=lt,u=rt;return y(),L(u,{class:"mr-4",onCommand:r},{dropdown:C(()=>[_(a,null,{default:C(()=>[(y(!0),B(J,null,Q(e.localizations,c=>(y(),L(b,{key:c.iso,command:c,disabled:c.current,title:l(c)},{default:C(()=>[D("i",{class:V(["icon-status",{success:c.translation||c.origin}])},null,2),H(" "+q(c.name),1)]),_:2},1032,["command","disabled","title"]))),128))]),_:1})]),default:C(()=>[_(m,{size:"small",text:"",type:"info"},{default:C(()=>[_(d,{icon:t(ct),width:15,class:"mr-2"},null,8,["icon"]),H(" Language ")]),_:1})]),_:1})}}};const Ba={key:0,class:"flex items-end justify-between mb-4"},Pa=["innerHTML"],Ra={class:"resource-actions flex items-center ml-auto"},za={class:"unsaved-indicator"},Aa={key:0,class:"fieldset"},Ia={key:1},Va={key:0,class:"fieldset"},Oa={key:0,class:"sidebar"},Fa={key:0,class:"fieldset"},co={__name:"FormBase",props:{formId:String,resource:Object,breadcrumb:Object,actionUrl:String,headless:{type:Boolean,default:!1},postSubmitActions:{type:Array,default:["back","edit","create"]},api:Boolean|Object},emits:["submit","form-ready"],setup(e,{emit:i}){const n=e,o=wt(n.formId);o.init(_t(n.resource),n.actionUrl,n.api),i("form-ready");const l=o.blueprint,r=ge.get(l.settings,"form",{"label-position":"top"}),s=ge.has(l,"sections");let f=k(null),d=null;s&&l.sections.length&&("tabs"in l.settings?(f.value="active"in l.settings.tabs?l.settings.tabs.active:l.sections[0].id,d="type"in l.settings.tabs?l.settings.tabs.type:"border-card"):f.value=l.sections[0].id);const m=ge.has(l,"sidebar");oe(()=>{if(window.location.hash.length>0){let S=window.location.hash.substr(1)||"";f.value=S}}),U(f,S=>{window.location.hash=S});const b=P(()=>{let S=n.headless?"w-full":m?"w-sidebar":"w-compact";return r.class||S}),a=k(n.postSubmitActions[0]),u={back:{icon:re,button:"Save & Back",option:"Go back"},close:{icon:re,button:"Save & Close",option:"Close Form"},edit:{icon:Ct,button:"Save & Stay",option:"Continue Editing"},create:{icon:Ue,button:"Save & New",option:"Add New Item"}};oe(()=>{a.value=n.postSubmitActions.length>1&&Invicta.remember("post-submit-action")||n.postSubmitActions[0]}),U(a,S=>Invicta.remember("post-submit-action",S));const c=()=>{o.submit(a.value)};return it("Enter",S=>{n.headless&&(S.preventDefault(),c())}),document.addEventListener("inertia:before",o.confirmUnsavedChanges),(S,$)=>{const p=ae,h=yt("Link"),N=Ta,T=Ae,x=ea,ee=ta,le=ca,te=ut,g=st,E=Na,w=$a,A=ot,z=Ft;return y(),L(z,we({class:["invicta-form",t(b)]},t(r)),{default:C(()=>[e.headless?G("",!0):(y(),B("div",Ba,[D("div",null,[e.breadcrumb?(y(),L(h,{key:0,href:e.breadcrumb.url,class:"breadcrumb"},{default:C(()=>[_(p,null,{default:C(()=>[_(t(re))]),_:1}),H(" "+q(e.breadcrumb.text),1)]),_:1},8,["href"])):G("",!0),D("h1",{class:"mb-1 flex items-center",innerHTML:t(o).title},null,8,Pa)]),D("div",Ra,[t(o).localizations?(y(),L(N,{key:0,localizations:t(o).localizations,"resource-url":e.resource.meta.indexUrl},null,8,["localizations","resource-url"])):G("",!0),W(S.$slots,"form-actions"),_(te,{class:"relative"},{default:C(()=>[_(T,{type:"primary",onClick:c,disabled:t(o).form.processing||!t(o).form.isDirty},{default:C(()=>[H(q(u[t(a)].button),1)]),_:1},8,["disabled"]),_(le,{title:"After Saving",teleported:!1},{reference:C(()=>[_(T,{disabled:t(o).form.processing||!t(o).form.isDirty,type:"primary",icon:u[t(a)].icon},null,8,["disabled","icon"])]),default:C(()=>[_(ee,{modelValue:t(a),"onUpdate:modelValue":$[0]||($[0]=v=>de(a)?a.value=v:null)},{default:C(()=>[(y(!0),B(J,null,Q(e.postSubmitActions,v=>(y(),L(x,{label:v},{default:C(()=>[H(q(u[v].option),1)]),_:2},1032,["label"]))),256))]),_:1},8,["modelValue"])]),_:1}),ce(D("sup",za,null,512),[[Le,t(o).form.isDirty]])]),_:1})])])),D("div",{class:V(["form-wrapper",{card:t(d)=="card"}])},[D("div",{class:V(["main-panel",{"el-card is-always-shadow":!t(s)&&!e.headless,"has-sidebar":t(m)}])},[t(s)?(y(),L(w,we({key:0,modelValue:t(f),"onUpdate:modelValue":$[1]||($[1]=v=>de(f)?f.value=v:f=v),type:"border-card"},t(l).settings.tabs),{default:C(()=>[(y(!0),B(J,null,Q(t(l).sections,v=>(y(),L(E,{label:v.title,name:v.id},{default:C(()=>[v.fields?(y(),B("div",Aa,[(y(!0),B(J,null,Q(v.fields,(I,O)=>(y(),L(g,{"form-id":e.formId,"field-data":I,"data-path":I.id},null,8,["form-id","field-data","data-path"]))),256))])):G("",!0)]),_:2},1032,["label","name"]))),256))]),_:1},16,["modelValue"])):(y(),B("div",Ia,[t(l).fields?(y(),B("div",Va,[(y(!0),B(J,null,Q(t(l).fields,(v,I)=>(y(),L(g,{"form-id":e.formId,"field-data":v,"data-path":v.id},null,8,["form-id","field-data","data-path"]))),256))])):G("",!0)]))],2),t(m)?(y(),B("div",Oa,[_(A,null,{default:C(()=>[t(l).sidebar.fields?(y(),B("div",Fa,[(y(!0),B(J,null,Q(t(l).sidebar.fields,(v,I)=>(y(),L(g,{"form-id":e.formId,"field-data":v,"data-path":v.id},null,8,["form-id","field-data","data-path"]))),256))])):G("",!0)]),_:1})])):G("",!0)],2)]),_:3},16,["class"])}}};export{co as _};