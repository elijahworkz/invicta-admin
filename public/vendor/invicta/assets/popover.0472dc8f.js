import{j as R,bF as d,bG as f,bu as a,z as U,l as T,B as n,m as $,A as D,e as p,Y as V,o as u,f as H,w as c,c as O,t as v,n as z,g as b,p as m,i as F,aq as I,b5 as L,_ as j,bH as q,s as G}from"./main.75dc240c.js";const K=R({trigger:d.trigger,placement:f.placement,disabled:d.disabled,visible:a.visible,transition:a.transition,popperOptions:f.popperOptions,tabindex:f.tabindex,content:a.content,popperStyle:a.popperStyle,popperClass:a.popperClass,enterable:{...a.enterable,default:!0},effect:{...a.effect,default:"light"},teleported:a.teleported,title:String,width:{type:[String,Number],default:150},offset:{type:Number,default:void 0},showAfter:{type:Number,default:0},hideAfter:{type:Number,default:200},autoClose:{type:Number,default:0},showArrow:{type:Boolean,default:!0},persistent:{type:Boolean,default:!0},"onUpdate:visible":{type:Function}}),Y={"update:visible":t=>U(t),"before-enter":()=>!0,"before-leave":()=>!0,"after-enter":()=>!0,"after-leave":()=>!0},J={name:"ElPopover"},M=T({...J,props:K,emits:Y,setup(t,{expose:r,emit:s}){const o=t,g="onUpdate:visible",w=n(()=>o[g]),l=$("popover"),i=D(),y=n(()=>{var e;return(e=p(i))==null?void 0:e.popperRef}),P=n(()=>[{width:V(o.width)},o.popperStyle]),C=n(()=>[l.b(),o.popperClass,{[l.m("plain")]:!!o.content}]),E=n(()=>o.transition===`${l.namespace.value}-fade-in-linear`),k=()=>{var e;(e=i.value)==null||e.hide()},B=()=>{s("before-enter")},S=()=>{s("before-leave")},A=()=>{s("after-enter")},N=()=>{s("update:visible",!1),s("after-leave")};return r({popperRef:y,hide:k}),(e,_)=>(u(),H(p(L),I({ref_key:"tooltipRef",ref:i},e.$attrs,{trigger:e.trigger,placement:e.placement,disabled:e.disabled,visible:e.visible,transition:e.transition,"popper-options":e.popperOptions,tabindex:e.tabindex,content:e.content,offset:e.offset,"show-after":e.showAfter,"hide-after":e.hideAfter,"auto-close":e.autoClose,"show-arrow":e.showArrow,"aria-label":e.title,effect:e.effect,enterable:e.enterable,"popper-class":p(C),"popper-style":p(P),teleported:e.teleported,persistent:e.persistent,"gpu-acceleration":p(E),"onUpdate:visible":p(w),onBeforeShow:B,onBeforeHide:S,onShow:A,onHide:N}),{content:c(()=>[e.title?(u(),O("div",{key:0,class:z(p(l).e("title")),role:"title"},v(e.title),3)):b("v-if",!0),m(e.$slots,"default",{},()=>[F(v(e.content),1)])]),default:c(()=>[e.$slots.reference?m(e.$slots,"reference",{key:0}):b("v-if",!0)]),_:3},16,["trigger","placement","disabled","visible","transition","popper-options","tabindex","content","offset","show-after","hide-after","auto-close","show-arrow","aria-label","effect","enterable","popper-class","popper-style","teleported","persistent","gpu-acceleration","onUpdate:visible"]))}});var Q=j(M,[["__file","/home/runner/work/element-plus/element-plus/packages/components/popover/src/popover.vue"]]);const h=(t,r)=>{const s=r.arg||r.value,o=s==null?void 0:s.popperRef;o&&(o.triggerRef=t)};var W={mounted(t,r){h(t,r)},updated(t,r){h(t,r)}};const X="popover",Z=q(W,X),ee=G(Q,{directive:Z});export{ee as E};