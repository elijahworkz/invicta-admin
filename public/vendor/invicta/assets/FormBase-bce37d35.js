import{z as M,B as X,_ as Z,E as Ce,F as $e,T as nt,A as ke}from"./base-efd572b7.js";/* empty css             */import{E as st}from"./card-b51794fe.js";import{_ as lt}from"./FormField-1c0aefce.js";import{F as he,E as rt,G as it,z as dt,D as ut}from"./index-2440c2f9.js";import{u as Be,a as K,E as ct}from"./popper-22a3aa8c.js";import{E as Ae,o as pt}from"./button-5da7087e.js";import"./scrollbar-ab81658a.js";/* empty css                      *//* empty css                      */import{h as ft,_ as mt}from"./tooltip-84badc71.js";import{u as Oe}from"./index-d303f183.js";import{m as Ve,w as Fe,v as Ue,a as Te}from"./pinia-e557e134.js";import{a7 as bt,p as vt,q as _e,a as $,ab as ue,c as k,d as U,b as w,l as P,g as F,f as ce,u as t,ac as de,n as O,k as W,y as H,t as q,D as ne,h as De,o as ae,ak as Le,a9 as Ge,ag as ht,z as L,e as D,w as C,j as G,at as we,U as pe,X as gt,m as _,al as yt,K as _t,F as J,x as Q,Y as wt,v as St}from"./runtime-core.esm-bundler-1c6b45c9.js";/* empty css             */import{l as ge}from"./lodash-42c17880.js";import{E as oe,g as re,h as Et,c as Ct,A as xe,a as $t}from"./index-ba770437.js";import{f as Me,j as Se,l as Ee,d as kt,e as Nt,g as Bt,w as Tt,h as Pt,t as Ne,k as Ke,D as Rt,E as It,r as Pe,F as Re}from"./index-5634fb36.js";import{U as se,C as zt}from"./event-9519ab40.js";import{u as At,a as Ot}from"./index-5dcf4fdc.js";import{m as je}from"./typescript-defaf979.js";import{c as j}from"./strings-639cf51a.js";import{E as ie}from"./aria-60e0cdc6.js";import{f as Vt}from"./vnode-f4ba14ce.js";import{u as Ft}from"./index-c5c99baf.js";import{a as Ut}from"./index-c0c4279c.js";const He=Symbol("radioGroupKey"),fe=Symbol("tabsRootContextKey"),Dt=(e,i,s)=>Vt(e.subTree).filter(o=>{var l;return vt(o)&&((l=o.type)==null?void 0:l.name)===i&&!!o.component}).map(o=>o.component.uid).map(o=>s[o]).filter(o=>!!o),Lt=(e,i)=>{const s={},a=bt([]);return{children:a,addChild:l=>{s[l.uid]=l,a.value=Dt(e,i,s)},removeChild:l=>{delete s[l],a.value=a.value.filter(p=>p.uid!==l)}}},qe=M({size:Me,disabled:Boolean,label:{type:[String,Number,Boolean],default:""}}),Gt=M({...qe,modelValue:{type:[String,Number,Boolean],default:""},name:{type:String,default:""},border:Boolean}),We={[se]:e=>_e(e)||Se(e)||Ee(e),[zt]:e=>_e(e)||Se(e)||Ee(e)},Xe=(e,i)=>{const s=$(),a=ue(He,void 0),r=k(()=>!!a),o=k({get(){return r.value?a.modelValue:e.modelValue},set(f){r.value?a.changeEvent(f):i&&i(se,f),s.value.checked=e.modelValue===e.label}}),l=kt(k(()=>a==null?void 0:a.size)),p=Nt(k(()=>a==null?void 0:a.disabled)),u=$(!1),m=k(()=>p.value||r.value&&o.value!==e.label?-1:0);return{radioRef:s,isGroup:r,radioGroup:a,focus:u,size:l,disabled:p,tabIndex:m,modelValue:o}},xt=["value","name","disabled"],Mt=U({name:"ElRadio"}),Kt=U({...Mt,props:Gt,emits:We,setup(e,{emit:i}){const s=e,a=X("radio"),{radioRef:r,radioGroup:o,focus:l,size:p,disabled:u,modelValue:m}=Xe(s,i);function f(){ne(()=>i("change",m.value))}return(n,d)=>{var b;return w(),P("label",{class:O([t(a).b(),t(a).is("disabled",t(u)),t(a).is("focus",t(l)),t(a).is("bordered",n.border),t(a).is("checked",t(m)===n.label),t(a).m(t(p))])},[F("span",{class:O([t(a).e("input"),t(a).is("disabled",t(u)),t(a).is("checked",t(m)===n.label)])},[ce(F("input",{ref_key:"radioRef",ref:r,"onUpdate:modelValue":d[0]||(d[0]=h=>de(m)?m.value=h:null),class:O(t(a).e("original")),value:n.label,name:n.name||((b=t(o))==null?void 0:b.name),disabled:t(u),type:"radio",onFocus:d[1]||(d[1]=h=>l.value=!0),onBlur:d[2]||(d[2]=h=>l.value=!1),onChange:f},null,42,xt),[[Ve,t(m)]]),F("span",{class:O(t(a).e("inner"))},null,2)],2),F("span",{class:O(t(a).e("label")),onKeydown:d[3]||(d[3]=Fe(()=>{},["stop"]))},[W(n.$slots,"default",{},()=>[H(q(n.label),1)])],34)],2)}}});var jt=Z(Kt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue"]]);const Ht=M({...qe,name:{type:String,default:""}}),qt=["value","name","disabled"],Wt=U({name:"ElRadioButton"}),Xt=U({...Wt,props:Ht,setup(e){const i=e,s=X("radio"),{radioRef:a,focus:r,size:o,disabled:l,modelValue:p,radioGroup:u}=Xe(i),m=k(()=>({backgroundColor:(u==null?void 0:u.fill)||"",borderColor:(u==null?void 0:u.fill)||"",boxShadow:u!=null&&u.fill?`-1px 0 0 0 ${u.fill}`:"",color:(u==null?void 0:u.textColor)||""}));return(f,n)=>{var d;return w(),P("label",{class:O([t(s).b("button"),t(s).is("active",t(p)===f.label),t(s).is("disabled",t(l)),t(s).is("focus",t(r)),t(s).bm("button",t(o))])},[ce(F("input",{ref_key:"radioRef",ref:a,"onUpdate:modelValue":n[0]||(n[0]=b=>de(p)?p.value=b:null),class:O(t(s).be("button","original-radio")),value:f.label,type:"radio",name:f.name||((d=t(u))==null?void 0:d.name),disabled:t(l),onFocus:n[1]||(n[1]=b=>r.value=!0),onBlur:n[2]||(n[2]=b=>r.value=!1)},null,42,qt),[[Ve,t(p)]]),F("span",{class:O(t(s).be("button","inner")),style:De(t(p)===f.label?t(m):{}),onKeydown:n[3]||(n[3]=Fe(()=>{},["stop"]))},[W(f.$slots,"default",{},()=>[H(q(f.label),1)])],38)],2)}}});var Ye=Z(Xt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue"]]);const Yt=M({id:{type:String,default:void 0},size:Me,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:""},fill:{type:String,default:""},label:{type:String,default:void 0},textColor:{type:String,default:""},name:{type:String,default:void 0},validateEvent:{type:Boolean,default:!0}}),Jt=We,Qt=["id","aria-label","aria-labelledby"],Zt=U({name:"ElRadioGroup"}),eo=U({...Zt,props:Yt,emits:Jt,setup(e,{emit:i}){const s=e,a=X("radio"),r=Bt(),o=$(),{formItem:l}=At(),{inputId:p,isLabeledByFormItem:u}=Ot(s,{formItemContext:l}),m=n=>{i(se,n),ne(()=>i("change",n))};ae(()=>{const n=o.value.querySelectorAll("[type=radio]"),d=n[0];!Array.from(n).some(b=>b.checked)&&d&&(d.tabIndex=0)});const f=k(()=>s.name||r.value);return Le(He,Ge({...ht(s),changeEvent:m,name:f})),L(()=>s.modelValue,()=>{s.validateEvent&&(l==null||l.validate("change").catch(n=>Tt()))}),(n,d)=>(w(),P("div",{id:t(p),ref_key:"radioGroupRef",ref:o,class:O(t(a).b("group")),role:"radiogroup","aria-label":t(u)?void 0:n.label||"radio-group","aria-labelledby":t(u)?t(l).labelId:void 0},[W(n.$slots,"default")],10,Qt))}});var Je=Z(eo,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue"]]);const to=Ce(jt,{RadioButton:Ye,RadioGroup:Je}),oo=$e(Je);$e(Ye);const ao=M({trigger:Be.trigger,placement:he.placement,disabled:Be.disabled,visible:K.visible,transition:K.transition,popperOptions:he.popperOptions,tabindex:he.tabindex,content:K.content,popperStyle:K.popperStyle,popperClass:K.popperClass,enterable:{...K.enterable,default:!0},effect:{...K.effect,default:"light"},teleported:K.teleported,title:String,width:{type:[String,Number],default:150},offset:{type:Number,default:void 0},showAfter:{type:Number,default:0},hideAfter:{type:Number,default:200},autoClose:{type:Number,default:0},showArrow:{type:Boolean,default:!0},persistent:{type:Boolean,default:!0},"onUpdate:visible":{type:Function}}),no={"update:visible":e=>Ee(e),"before-enter":()=>!0,"before-leave":()=>!0,"after-enter":()=>!0,"after-leave":()=>!0},so="onUpdate:visible",lo=U({name:"ElPopover"}),ro=U({...lo,props:ao,emits:no,setup(e,{expose:i,emit:s}){const a=e,r=k(()=>a[so]),o=X("popover"),l=$(),p=k(()=>{var c;return(c=t(l))==null?void 0:c.popperRef}),u=k(()=>[{width:Pt(a.width)},a.popperStyle]),m=k(()=>[o.b(),a.popperClass,{[o.m("plain")]:!!a.content}]),f=k(()=>a.transition===`${o.namespace.value}-fade-in-linear`),n=()=>{var c;(c=l.value)==null||c.hide()},d=()=>{s("before-enter")},b=()=>{s("before-leave")},h=()=>{s("after-enter")},N=()=>{s("update:visible",!1),s("after-leave")};return i({popperRef:p,hide:n}),(c,g)=>(w(),D(t(ct),we({ref_key:"tooltipRef",ref:l},c.$attrs,{trigger:c.trigger,placement:c.placement,disabled:c.disabled,visible:c.visible,transition:c.transition,"popper-options":c.popperOptions,tabindex:c.tabindex,content:c.content,offset:c.offset,"show-after":c.showAfter,"hide-after":c.hideAfter,"auto-close":c.autoClose,"show-arrow":c.showArrow,"aria-label":c.title,effect:c.effect,enterable:c.enterable,"popper-class":t(m),"popper-style":t(u),teleported:c.teleported,persistent:c.persistent,"gpu-acceleration":t(f),"onUpdate:visible":t(r),onBeforeShow:d,onBeforeHide:b,onShow:h,onHide:N}),{content:C(()=>[c.title?(w(),P("div",{key:0,class:O(t(o).e("title")),role:"title"},q(c.title),3)):G("v-if",!0),W(c.$slots,"default",{},()=>[H(q(c.content),1)])]),default:C(()=>[c.$slots.reference?W(c.$slots,"reference",{key:0}):G("v-if",!0)]),_:3},16,["trigger","placement","disabled","visible","transition","popper-options","tabindex","content","offset","show-after","hide-after","auto-close","show-arrow","aria-label","effect","enterable","popper-class","popper-style","teleported","persistent","gpu-acceleration","onUpdate:visible"]))}});var io=Z(ro,[["__file","/home/runner/work/element-plus/element-plus/packages/components/popover/src/popover.vue"]]);const Ie=(e,i)=>{const s=i.arg||i.value,a=s==null?void 0:s.popperRef;a&&(a.triggerRef=e)};var uo={mounted(e,i){Ie(e,i)},updated(e,i){Ie(e,i)}};const co="popover",po=nt(uo,co),fo=Ce(io,{directive:po}),mo=M({tabs:{type:ke(Array),default:()=>je([])}}),Qe="ElTabBar",bo=U({name:Qe}),vo=U({...bo,props:mo,setup(e,{expose:i}){const s=e,a=pe(),r=ue(fe);r||Ne(Qe,"<el-tabs><el-tab-bar /></el-tabs>");const o=X("tabs"),l=$(),p=$(),u=()=>{let f=0,n=0;const d=["top","bottom"].includes(r.props.tabPosition)?"width":"height",b=d==="width"?"x":"y",h=b==="x"?"left":"top";return s.tabs.every(N=>{var c,g;const B=(g=(c=a.parent)==null?void 0:c.refs)==null?void 0:g[`tab-${N.uid}`];if(!B)return!1;if(!N.active)return!0;f=B[`offset${j(h)}`],n=B[`client${j(d)}`];const T=window.getComputedStyle(B);return d==="width"&&(s.tabs.length>1&&(n-=Number.parseFloat(T.paddingLeft)+Number.parseFloat(T.paddingRight)),f+=Number.parseFloat(T.paddingLeft)),!1}),{[d]:`${n}px`,transform:`translate${j(b)}(${f}px)`}},m=()=>p.value=u();return L(()=>s.tabs,async()=>{await ne(),m()},{immediate:!0}),Ke(l,()=>m()),i({ref:l,update:m}),(f,n)=>(w(),P("div",{ref_key:"barRef",ref:l,class:O([t(o).e("active-bar"),t(o).is(t(r).props.tabPosition)]),style:De(p.value)},null,6))}});var ho=Z(vo,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-bar.vue"]]);const go=M({panes:{type:ke(Array),default:()=>je([])},currentName:{type:[String,Number],default:""},editable:Boolean,type:{type:String,values:["card","border-card",""],default:""},stretch:Boolean}),yo={tabClick:(e,i,s)=>s instanceof Event,tabRemove:(e,i)=>i instanceof Event},ze="ElTabNav",_o=U({name:ze,props:go,emits:yo,setup(e,{expose:i,emit:s}){const a=pe(),r=ue(fe);r||Ne(ze,"<el-tabs><tab-nav /></el-tabs>");const o=X("tabs"),l=Rt(),p=It(),u=$(),m=$(),f=$(),n=$(!1),d=$(0),b=$(!1),h=$(!0),N=k(()=>["top","bottom"].includes(r.props.tabPosition)?"width":"height"),c=k(()=>({transform:`translate${N.value==="width"?"X":"Y"}(-${d.value}px)`})),g=()=>{if(!u.value)return;const y=u.value[`offset${j(N.value)}`],E=d.value;if(!E)return;const S=E>y?E-y:0;d.value=S},B=()=>{if(!u.value||!m.value)return;const y=m.value[`offset${j(N.value)}`],E=u.value[`offset${j(N.value)}`],S=d.value;if(y-S<=E)return;const z=y-S>E*2?S+E:y-E;d.value=z},T=async()=>{const y=m.value;if(!n.value||!f.value||!u.value||!y)return;await ne();const E=f.value.querySelector(".is-active");if(!E)return;const S=u.value,z=["top","bottom"].includes(r.props.tabPosition),I=E.getBoundingClientRect(),v=S.getBoundingClientRect(),A=z?y.offsetWidth-v.width:y.offsetHeight-v.height,V=d.value;let R=V;z?(I.left<v.left&&(R=V-(v.left-I.left)),I.right>v.right&&(R=V+I.right-v.right)):(I.top<v.top&&(R=V-(v.top-I.top)),I.bottom>v.bottom&&(R=V+(I.bottom-v.bottom))),R=Math.max(R,0),d.value=Math.min(R,A)},x=()=>{if(!m.value||!u.value)return;const y=m.value[`offset${j(N.value)}`],E=u.value[`offset${j(N.value)}`],S=d.value;if(E<y){const z=d.value;n.value=n.value||{},n.value.prev=z,n.value.next=z+E<y,y-z<E&&(d.value=y-E)}else n.value=!1,S>0&&(d.value=0)},ee=y=>{const E=y.code,{up:S,down:z,left:I,right:v}=ie;if(![S,z,I,v].includes(E))return;const A=Array.from(y.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)")),V=A.indexOf(y.target);let R;E===I||E===S?V===0?R=A.length-1:R=V-1:V<A.length-1?R=V+1:R=0,A[R].focus({preventScroll:!0}),A[R].click(),le()},le=()=>{h.value&&(b.value=!0)},te=()=>b.value=!1;return L(l,y=>{y==="hidden"?h.value=!1:y==="visible"&&setTimeout(()=>h.value=!0,50)}),L(p,y=>{y?setTimeout(()=>h.value=!0,50):h.value=!1}),Ke(f,x),ae(()=>setTimeout(()=>T(),0)),gt(()=>x()),i({scrollToActiveTab:T,removeFocus:te}),L(()=>e.panes,()=>a.update(),{flush:"post"}),()=>{const y=n.value?[_("span",{class:[o.e("nav-prev"),o.is("disabled",!n.value.prev)],onClick:g},[_(oe,null,{default:()=>[_(re,null,null)]})]),_("span",{class:[o.e("nav-next"),o.is("disabled",!n.value.next)],onClick:B},[_(oe,null,{default:()=>[_(Et,null,null)]})])]:null,E=e.panes.map((S,z)=>{var I,v,A,V;const R=S.uid,me=S.props.disabled,be=(v=(I=S.props.name)!=null?I:S.index)!=null?v:`${z}`,ve=!me&&(S.isClosable||e.editable);S.index=`${z}`;const tt=ve?_(oe,{class:"is-icon-close",onClick:Y=>s("tabRemove",S,Y)},{default:()=>[_(Ct,null,null)]}):null,ot=((V=(A=S.slots).label)==null?void 0:V.call(A))||S.props.label,at=!me&&S.active?0:-1;return _("div",{ref:`tab-${R}`,class:[o.e("item"),o.is(r.props.tabPosition),o.is("active",S.active),o.is("disabled",me),o.is("closable",ve),o.is("focus",b.value)],id:`tab-${be}`,key:`tab-${R}`,"aria-controls":`pane-${be}`,role:"tab","aria-selected":S.active,tabindex:at,onFocus:()=>le(),onBlur:()=>te(),onClick:Y=>{te(),s("tabClick",S,be,Y)},onKeydown:Y=>{ve&&(Y.code===ie.delete||Y.code===ie.backspace)&&s("tabRemove",S,Y)}},[ot,tt])});return _("div",{ref:f,class:[o.e("nav-wrap"),o.is("scrollable",!!n.value),o.is(r.props.tabPosition)]},[y,_("div",{class:o.e("nav-scroll"),ref:u},[_("div",{class:[o.e("nav"),o.is(r.props.tabPosition),o.is("stretch",e.stretch&&["top","bottom"].includes(r.props.tabPosition))],ref:m,style:c.value,role:"tablist",onKeydown:ee},[e.type?null:_(ho,{tabs:[...e.panes]},null),E])])])}}}),wo=M({type:{type:String,values:["card","border-card",""],default:""},activeName:{type:[String,Number]},closable:Boolean,addable:Boolean,modelValue:{type:[String,Number]},editable:Boolean,tabPosition:{type:String,values:["top","right","bottom","left"],default:"top"},beforeLeave:{type:ke(Function),default:()=>!0},stretch:Boolean}),ye=e=>_e(e)||Se(e),So={[se]:e=>ye(e),tabClick:(e,i)=>i instanceof Event,tabChange:e=>ye(e),edit:(e,i)=>["remove","add"].includes(i),tabRemove:e=>ye(e),tabAdd:()=>!0};var Eo=U({name:"ElTabs",props:wo,emits:So,setup(e,{emit:i,slots:s,expose:a}){var r,o;const l=X("tabs"),{children:p,addChild:u,removeChild:m}=Lt(pe(),"ElTabPane"),f=$(),n=$((o=(r=e.modelValue)!=null?r:e.activeName)!=null?o:"0"),d=g=>{n.value=g,i(se,g),i("tabChange",g)},b=async g=>{var B,T,x;if(!(n.value===g||Pe(g)))try{await((B=e.beforeLeave)==null?void 0:B.call(e,g,n.value))!==!1&&(d(g),(x=(T=f.value)==null?void 0:T.removeFocus)==null||x.call(T))}catch{}},h=(g,B,T)=>{g.props.disabled||(b(B),i("tabClick",g,T))},N=(g,B)=>{g.props.disabled||Pe(g.props.name)||(B.stopPropagation(),i("edit",g.props.name,"remove"),i("tabRemove",g.props.name))},c=()=>{i("edit",void 0,"add"),i("tabAdd")};return Ft({from:'"activeName"',replacement:'"model-value" or "v-model"',scope:"ElTabs",version:"2.3.0",ref:"https://element-plus.org/en-US/component/tabs.html#attributes",type:"Attribute"},k(()=>!!e.activeName)),L(()=>e.activeName,g=>b(g)),L(()=>e.modelValue,g=>b(g)),L(n,async()=>{var g;await ne(),(g=f.value)==null||g.scrollToActiveTab()}),Le(fe,{props:e,currentName:n,registerPane:u,unregisterPane:m}),a({currentName:n}),()=>{const g=e.editable||e.addable?_("span",{class:l.e("new-tab"),tabindex:"0",onClick:c,onKeydown:x=>{x.code===ie.enter&&c()}},[_(oe,{class:l.is("icon-plus")},{default:()=>[_(xe,null,null)]})]):null,B=_("div",{class:[l.e("header"),l.is(e.tabPosition)]},[g,_(_o,{ref:f,currentName:n.value,editable:e.editable,type:e.type,panes:p.value,stretch:e.stretch,onTabClick:h,onTabRemove:N},null)]),T=_("div",{class:l.e("content")},[W(s,"default")]);return _("div",{class:[l.b(),l.m(e.tabPosition),{[l.m("card")]:e.type==="card",[l.m("border-card")]:e.type==="border-card"}]},[...e.tabPosition!=="bottom"?[B,T]:[T,B]])}}});const Co=M({label:{type:String,default:""},name:{type:[String,Number]},closable:Boolean,disabled:Boolean,lazy:Boolean}),$o=["id","aria-hidden","aria-labelledby"],Ze="ElTabPane",ko=U({name:Ze}),No=U({...ko,props:Co,setup(e){const i=e,s=pe(),a=yt(),r=ue(fe);r||Ne(Ze,"usage: <el-tabs><el-tab-pane /></el-tabs/>");const o=X("tab-pane"),l=$(),p=k(()=>i.closable||r.props.closable),u=Re(()=>{var b;return r.currentName.value===((b=i.name)!=null?b:l.value)}),m=$(u.value),f=k(()=>{var b;return(b=i.name)!=null?b:l.value}),n=Re(()=>!i.lazy||m.value||u.value);L(u,b=>{b&&(m.value=!0)});const d=Ge({uid:s.uid,slots:a,props:i,paneName:f,active:u,index:l,isClosable:p});return ae(()=>{r.registerPane(d)}),_t(()=>{r.unregisterPane(d.uid)}),(b,h)=>t(n)?ce((w(),P("div",{key:0,id:`pane-${t(f)}`,class:O(t(o).b()),role:"tabpanel","aria-hidden":!t(u),"aria-labelledby":`tab-${t(f)}`},[W(b.$slots,"default")],10,$o)),[[Ue,t(u)]]):G("v-if",!0)}});var et=Z(No,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-pane.vue"]]);const Bo=Ce(Eo,{TabPane:et}),To=$e(et);const Po={class:"ml-2"},Ro={__name:"Localizations",props:{localizations:Object,formId:String,resourceUrl:String},setup(e){const i=e;Oe(i.formId);const s=k(()=>{let{localizations:o}=i;return Object.values(o).filter(l=>l.origin!==null)[0].origin}),a=o=>o.origin?"Original":o.current?"Current translation":`${o.translation?"Edit":"Create"} ${o.name} translation`,r=o=>{let l=o.translation?o.translation:o.origin?o.origin:null,p=l?`${l}/edit`:`${s.value}/localize`;l?Te.get(`${i.resourceUrl}/${p}`):Te.get(`${i.resourceUrl}/${p}/${o.iso}`)};return(o,l)=>{const p=mt,u=Ae,m=rt,f=it,n=dt;return w(),D(n,{class:"mr-4",onCommand:r},{dropdown:C(()=>[_(f,null,{default:C(()=>[(w(!0),P(J,null,Q(e.localizations,d=>(w(),D(m,{key:d.iso,command:d,disabled:d.current,title:a(d)},{default:C(()=>[F("i",{class:O(["icon-status",{success:d.translation||d.origin}])},null,2),H(),F("span",Po,q(d.name),1)]),_:2},1032,["command","disabled","title"]))),128))]),_:1})]),default:C(()=>[_(u,{size:"small",text:"",type:"info"},{default:C(()=>[_(p,{icon:t(ft),width:15,class:"mr-2"},null,8,["icon"]),H(" Language ")]),_:1})]),_:1})}}};const Io={key:0,class:"flex items-end justify-between mb-4"},zo=["innerHTML"],Ao={class:"resource-actions flex items-center ml-auto"},Oo={class:"unsaved-indicator"},Vo={key:0,class:"fieldset"},Fo={key:1},Uo={key:0,class:"fieldset"},Do={key:0,class:"sidebar"},Lo={key:0,class:"fieldset"},fa={__name:"FormBase",props:{formId:String,resource:Object,breadcrumb:Object,actionUrl:String,headless:{type:Boolean,default:!1},postSubmitActions:{type:Array,default:["back","edit","create"]},api:Boolean|Object,readOnly:{type:Boolean,default:!1}},emits:["submit","form-ready"],setup(e,{emit:i}){const s=e,a=Oe(s.formId);a.readOnly=s.readOnly,a.init(wt(s.resource),s.actionUrl,s.api),i("form-ready"),Invicta.on("lock-form",h=>{console.log("I hear a call to lock form",h,s.formId),h==s.formId&&(a.readOnly=!0)}),Invicta.on("unlock-form",h=>{h==s.formId&&(a.readOnly=!1)});const r=a.blueprint,o=ge.get(r.settings,"form",{"label-position":"top"}),l=ge.has(r,"sections");let p=$(null),u=null;l&&r.sections.length&&("tabs"in r.settings?(p.value="active"in r.settings.tabs?r.settings.tabs.active:r.sections[0].id,u="type"in r.settings.tabs?r.settings.tabs.type:"border-card"):p.value=r.sections[0].id);const m=ge.has(r,"sidebar");ae(()=>{if(window.location.hash.length>0){let h=window.location.hash.substr(1)||"";p.value=h}}),L(p,h=>{window.location.hash=h});const f=k(()=>{let h=s.headless?"w-full":m?"w-sidebar":"w-compact";return o.class||h}),n=$(s.postSubmitActions[0]),d={back:{icon:re,button:"Save & Back",option:"Go back"},close:{icon:re,button:"Save & Close",option:"Close Form"},edit:{icon:$t,button:"Save & Stay",option:"Continue Editing"},create:{icon:xe,button:"Save & New",option:"Add New Item"}};ae(()=>{n.value=s.postSubmitActions.length>1&&Invicta.remember("post-submit-action")||s.postSubmitActions[0]}),L(n,h=>Invicta.remember("post-submit-action",h));const b=()=>{a.submit(n.value)};return ut("Enter",h=>{s.headless&&(h.preventDefault(),b())}),document.addEventListener("inertia:before",a.confirmUnsavedChanges),(h,N)=>{const c=oe,g=St("Link"),B=Ro,T=Ae,x=to,ee=oo,le=fo,te=pt,y=lt,E=To,S=Bo,z=st,I=Ut;return w(),D(I,we({class:["invicta-form",t(f)]},t(o)),{default:C(()=>[e.headless?G("",!0):(w(),P("div",Io,[F("div",null,[e.breadcrumb?(w(),D(g,{key:0,href:e.breadcrumb.url,class:"breadcrumb"},{default:C(()=>[_(c,null,{default:C(()=>[_(t(re))]),_:1}),H(" "+q(e.breadcrumb.text),1)]),_:1},8,["href"])):G("",!0),F("h1",{class:"mb-1 flex items-center",innerHTML:t(a).title},null,8,zo)]),F("div",Ao,[t(a).localizations?(w(),D(B,{key:0,localizations:t(a).localizations,"form-id":e.formId,"resource-url":e.resource.meta.indexUrl},null,8,["localizations","form-id","resource-url"])):G("",!0),W(h.$slots,"form-actions"),_(te,{class:"relative"},{default:C(()=>[_(T,{type:"primary",onClick:b,disabled:t(a).form.processing||!t(a).form.isDirty},{default:C(()=>[H(q(d[t(n)].button),1)]),_:1},8,["disabled"]),_(le,{title:"After Saving",teleported:!1},{reference:C(()=>[_(T,{disabled:t(a).form.processing||!t(a).form.isDirty,type:"primary",icon:d[t(n)].icon},null,8,["disabled","icon"])]),default:C(()=>[_(ee,{modelValue:t(n),"onUpdate:modelValue":N[0]||(N[0]=v=>de(n)?n.value=v:null)},{default:C(()=>[(w(!0),P(J,null,Q(e.postSubmitActions,v=>(w(),D(x,{label:v},{default:C(()=>[H(q(d[v].option),1)]),_:2},1032,["label"]))),256))]),_:1},8,["modelValue"])]),_:1}),ce(F("sup",Oo,null,512),[[Ue,t(a).form.isDirty]])]),_:1})])])),F("div",{class:O(["form-wrapper",{card:t(u)=="card"}])},[F("div",{class:O(["main-panel",{"el-card is-always-shadow":!t(l)&&!e.headless,"has-sidebar":t(m)}])},[t(l)?(w(),D(S,we({key:0,modelValue:t(p),"onUpdate:modelValue":N[1]||(N[1]=v=>de(p)?p.value=v:p=v),type:"border-card"},t(r).settings.tabs),{default:C(()=>[(w(!0),P(J,null,Q(t(r).sections,v=>(w(),D(E,{label:v.title,name:v.id},{default:C(()=>[v.fields?(w(),P("div",Vo,[(w(!0),P(J,null,Q(v.fields,(A,V)=>(w(),D(y,{"form-id":e.formId,"field-data":A,"data-path":A.id},null,8,["form-id","field-data","data-path"]))),256))])):G("",!0)]),_:2},1032,["label","name"]))),256))]),_:1},16,["modelValue"])):(w(),P("div",Fo,[t(r).fields?(w(),P("div",Uo,[(w(!0),P(J,null,Q(t(r).fields,(v,A)=>(w(),D(y,{"form-id":e.formId,"field-data":v,"data-path":v.id},null,8,["form-id","field-data","data-path"]))),256))])):G("",!0)]))],2),t(m)?(w(),P("div",Do,[_(z,null,{default:C(()=>[t(r).sidebar.fields?(w(),P("div",Lo,[(w(!0),P(J,null,Q(t(r).sidebar.fields,(v,A)=>(w(),D(y,{"form-id":e.formId,"field-data":v,"data-path":v.id},null,8,["form-id","field-data","data-path"]))),256))])):G("",!0)]),_:1})])):G("",!0)],2)]),_:3},16,["class"])}}};export{fa as _};