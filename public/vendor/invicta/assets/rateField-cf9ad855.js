import{_ as pe}from"./FieldBase-e1c18d99.js";import{s as he,S as D,cF as g,af as L,cG as be,a0 as ye,R as G,y as oe,X as U,b6 as Ve,b8 as we,a1 as xe,A as _e,aI as Ce,r as B,B as i,Q as H,bB as q,cH as N,V as X,aq as ge,o as c,c as b,F as Q,$ as Ie,C as y,u as o,d as te,h as k,w as J,f as V,G as F,v as Y,i as M,D as Z,ai as ee,t as Se,K as Ee,aW as I,bH as ae,M as Te,ax as De,aA as Be}from"./main-07bc4afd.js";import{u as He}from"./field-177788f4.js";import{m as le}from"./typescript-defaf979.js";import{C as Ne,U as S}from"./event-9519ab40.js";/* empty css                  */import"./FormBase-09fee5e0.js";import"./form-54beed3a.js";import"./card-8e588c1e.js";/* empty css                      */import"./icon-b01a07f6.js";import"./vnode-4df357b1.js";const Fe=he({modelValue:{type:Number,default:0},id:{type:String,default:void 0},lowThreshold:{type:Number,default:2},highThreshold:{type:Number,default:4},max:{type:Number,default:5},colors:{type:D([Array,Object]),default:()=>le(["","",""])},voidColor:{type:String,default:""},disabledVoidColor:{type:String,default:""},icons:{type:D([Array,Object]),default:()=>[g,g,g]},voidIcon:{type:L,default:()=>be},disabledVoidIcon:{type:L,default:()=>g},disabled:Boolean,allowHalf:Boolean,showText:Boolean,showScore:Boolean,textColor:{type:String,default:""},texts:{type:D(Array),default:()=>le(["Extremely bad","Disappointed","Fair","Satisfied","Surprise"])},scoreTemplate:{type:String,default:"{value}"},size:ye,label:{type:String,default:void 0},clearable:{type:Boolean,default:!1}}),Me={[Ne]:u=>G(u),[S]:u=>G(u)},ke=["id","aria-label","aria-labelledby","aria-valuenow","aria-valuetext","aria-valuemax"],Ae=["onMousemove","onClick"],Pe=oe({name:"ElRate"}),Oe=oe({...Pe,props:Fe,emits:Me,setup(u,{expose:w,emit:m}){const e=u;function x(a,l){const t=n=>q(n),d=Object.keys(l).map(n=>+n).filter(n=>{const C=l[n];return(t(C)?C.excluded:!1)?a<n:a<=n}).sort((n,C)=>n-C),h=l[d[0]];return t(h)&&h.value||h}const p=U(Ve,void 0),_=U(we,void 0),E=xe(),r=_e("rate"),{inputId:se,isLabeledByFormItem:A}=Ce(e,{formItemContext:_}),s=B(e.modelValue),T=B(-1),v=B(!0),re=i(()=>[r.b(),r.m(E.value)]),f=i(()=>e.disabled||(p==null?void 0:p.disabled)),ne=i(()=>r.cssVarBlock({"void-color":e.voidColor,"disabled-void-color":e.disabledVoidColor,"fill-color":$.value})),P=i(()=>{let a="";return e.showScore?a=e.scoreTemplate.replace(/\{\s*value\s*\}/,f.value?`${e.modelValue}`:`${s.value}`):e.showText&&(a=e.texts[Math.ceil(s.value)-1]),a}),O=i(()=>e.modelValue*100-Math.floor(e.modelValue)*100),ie=i(()=>H(e.colors)?{[e.lowThreshold]:e.colors[0],[e.highThreshold]:{value:e.colors[1],excluded:!0},[e.max]:e.colors[2]}:e.colors),$=i(()=>{const a=x(s.value,ie.value);return q(a)?"":a}),ue=i(()=>{let a="";return f.value?a=`${O.value}%`:e.allowHalf&&(a="50%"),{color:$.value,width:a}}),j=i(()=>{let a=H(e.icons)?[...e.icons]:{...e.icons};return a=N(a),H(a)?{[e.lowThreshold]:a[0],[e.highThreshold]:{value:a[1],excluded:!0},[e.max]:a[2]}:a}),de=i(()=>x(e.modelValue,j.value)),ce=i(()=>f.value?X(e.disabledVoidIcon)?e.disabledVoidIcon:N(e.disabledVoidIcon):X(e.voidIcon)?e.voidIcon:N(e.voidIcon)),fe=i(()=>x(s.value,j.value));function z(a){const l=f.value&&O.value>0&&a-1<e.modelValue&&a>e.modelValue,t=e.allowHalf&&v.value&&a-.5<=s.value&&a>s.value;return l||t}function K(a){e.clearable&&a===e.modelValue&&(a=0),m(S,a),e.modelValue!==a&&m("change",a)}function me(a){f.value||(e.allowHalf&&v.value?K(s.value):K(a))}function ve(a){if(f.value)return;let l=s.value;const t=a.code;return t===I.up||t===I.right?(e.allowHalf?l+=.5:l+=1,a.stopPropagation(),a.preventDefault()):(t===I.left||t===I.down)&&(e.allowHalf?l-=.5:l-=1,a.stopPropagation(),a.preventDefault()),l=l<0?0:l,l=l>e.max?e.max:l,m(S,l),m("change",l),l}function R(a,l){if(!f.value){if(e.allowHalf&&l){let t=l.target;ae(t,r.e("item"))&&(t=t.querySelector(`.${r.e("icon")}`)),(t.clientWidth===0||ae(t,r.e("decimal")))&&(t=t.parentNode),v.value=l.offsetX*2<=t.clientWidth,s.value=v.value?a-.5:a}else s.value=a;T.value=a}}function W(){f.value||(e.allowHalf&&(v.value=e.modelValue!==Math.floor(e.modelValue)),s.value=e.modelValue,T.value=-1)}return ge(()=>e.modelValue,a=>{s.value=a,v.value=e.modelValue!==Math.floor(e.modelValue)}),e.modelValue||m(S,0),w({setCurrentValue:R,resetCurrentValue:W}),(a,l)=>{var t;return c(),b("div",{id:o(se),class:y([o(re),o(r).is("disabled",o(f))]),role:"slider","aria-label":o(A)?void 0:a.label||"rating","aria-labelledby":o(A)?(t=o(_))==null?void 0:t.labelId:void 0,"aria-valuenow":s.value,"aria-valuetext":o(P)||void 0,"aria-valuemin":"0","aria-valuemax":a.max,tabindex:"0",style:ee(o(ne)),onKeydown:ve},[(c(!0),b(Q,null,Ie(a.max,(d,h)=>(c(),b("span",{key:h,class:y(o(r).e("item")),onMousemove:n=>R(d,n),onMouseleave:W,onClick:n=>me(d)},[te(o(Z),{class:y([o(r).e("icon"),{hover:T.value===d},o(r).is("active",d<=s.value)])},{default:k(()=>[z(d)?M("v-if",!0):(c(),b(Q,{key:0},[J((c(),V(F(o(fe)),null,null,512)),[[Y,d<=s.value]]),J((c(),V(F(o(ce)),null,null,512)),[[Y,!(d<=s.value)]])],64)),z(d)?(c(),V(o(Z),{key:1,style:ee(o(ue)),class:y([o(r).e("icon"),o(r).e("decimal")])},{default:k(()=>[(c(),V(F(o(de))))]),_:1},8,["style","class"])):M("v-if",!0)]),_:2},1032,["class"])],42,Ae))),128)),a.showText||a.showScore?(c(),b("span",{key:0,class:y(o(r).e("text"))},Se(o(P)),3)):M("v-if",!0)],46,ke)}}});var $e=Ee(Oe,[["__file","/home/runner/work/element-plus/element-plus/packages/components/rate/src/rate.vue"]]);const je=Te($e);const ea={__name:"rateField",props:{formId:String,data:Object,path:String},setup(u){const w=u,m=He(w),e=m.value();return(x,p)=>{const _=je,E=pe;return c(),V(E,{"form-id":u.formId,"field-props":w},{default:k(()=>[te(_,De({modelValue:o(e),"onUpdate:modelValue":p[0]||(p[0]=r=>Be(e)?e.value=r:null)},u.data.props,{disabled:o(m).disabled,colors:u.data.colors}),null,16,["modelValue","disabled","colors"])]),_:1},8,["form-id","field-props"])}}};export{ea as default};