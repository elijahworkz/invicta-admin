import{_ as ve}from"./FieldBase-2e1b6f77.js";import{z as he,A as D,B as ye,_ as be,E as Ve}from"./base-efd572b7.js";import{u as we}from"./field-3ca8e767.js";import{v as W}from"./pinia-e557e134.js";import{H as g,i as U,I as xe,E as q}from"./index-ba770437.js";import{m as G}from"./typescript-defaf979.js";import{i as _e}from"./validator-48dd0e0c.js";import{C as Ce,U as S}from"./event-9519ab40.js";import{j as X,s as ge,p as Ie,d as Se,y as J}from"./index-5634fb36.js";import{d as oe,ab as Q,a as N,c as i,O as B,M as Y,a8 as H,q as Z,z as Ee,b as c,l as y,F as ee,x as Te,n as b,u as l,m as te,w as F,f as ae,e as V,i as M,j as k,h as le,t as De,at as Ne,ac as Be}from"./runtime-core.esm-bundler-1c6b45c9.js";import{a as He}from"./index-5dcf4fdc.js";import{E as I}from"./aria-60e0cdc6.js";/* empty css                  */import"./index-d303f183.js";import"./lodash-42c17880.js";import"./index-c0c4279c.js";import"./index-a6671ae7.js";import"./_initCloneObject-1265d3af.js";import"./condition-69d55c79.js";const Me=he({modelValue:{type:Number,default:0},id:{type:String,default:void 0},lowThreshold:{type:Number,default:2},highThreshold:{type:Number,default:4},max:{type:Number,default:5},colors:{type:D([Array,Object]),default:()=>G(["","",""])},voidColor:{type:String,default:""},disabledVoidColor:{type:String,default:""},icons:{type:D([Array,Object]),default:()=>[g,g,g]},voidIcon:{type:U,default:()=>xe},disabledVoidIcon:{type:U,default:()=>g},disabled:{type:Boolean},allowHalf:{type:Boolean},showText:{type:Boolean},showScore:{type:Boolean},textColor:{type:String,default:""},texts:{type:D(Array),default:()=>G(["Extremely bad","Disappointed","Fair","Satisfied","Surprise"])},scoreTemplate:{type:String,default:"{value}"},size:{type:String,validator:_e},label:{type:String,default:void 0},clearable:{type:Boolean,default:!1}}),ke={[Ce]:u=>X(u),[S]:u=>X(u)},Fe=["id","aria-label","aria-labelledby","aria-valuenow","aria-valuetext","aria-valuemax"],je=["onMousemove","onClick"],Ae=oe({name:"ElRate"}),Oe=oe({...Ae,props:Me,emits:ke,setup(u,{expose:w,emit:f}){const e=u;function x(a,o){const t=n=>Y(n),d=Object.keys(o).map(n=>+n).filter(n=>{const C=o[n];return(t(C)?C.excluded:!1)?a<n:a<=n}).sort((n,C)=>n-C),h=o[d[0]];return t(h)&&h.value||h}const v=Q(ge,void 0),_=Q(Ie,void 0),E=Se(),r=ye("rate"),{inputId:se,isLabeledByFormItem:j}=He(e,{formItemContext:_}),s=N(e.modelValue),T=N(-1),p=N(!0),re=i(()=>[r.b(),r.m(E.value)]),m=i(()=>e.disabled||(v==null?void 0:v.disabled)),ne=i(()=>r.cssVarBlock({"void-color":e.voidColor,"disabled-void-color":e.disabledVoidColor,"fill-color":z.value})),A=i(()=>{let a="";return e.showScore?a=e.scoreTemplate.replace(/\{\s*value\s*\}/,m.value?`${e.modelValue}`:`${s.value}`):e.showText&&(a=e.texts[Math.ceil(s.value)-1]),a}),O=i(()=>e.modelValue*100-Math.floor(e.modelValue)*100),ie=i(()=>B(e.colors)?{[e.lowThreshold]:e.colors[0],[e.highThreshold]:{value:e.colors[1],excluded:!0},[e.max]:e.colors[2]}:e.colors),z=i(()=>{const a=x(s.value,ie.value);return Y(a)?"":a}),ue=i(()=>{let a="";return m.value?a=`${O.value}%`:e.allowHalf&&(a="50%"),{color:z.value,width:a}}),P=i(()=>{let a=B(e.icons)?[...e.icons]:{...e.icons};return a=H(a),B(a)?{[e.lowThreshold]:a[0],[e.highThreshold]:{value:a[1],excluded:!0},[e.max]:a[2]}:a}),de=i(()=>x(e.modelValue,P.value)),ce=i(()=>m.value?Z(e.disabledVoidIcon)?e.disabledVoidIcon:H(e.disabledVoidIcon):Z(e.voidIcon)?e.voidIcon:H(e.voidIcon)),me=i(()=>x(s.value,P.value));function $(a){const o=m.value&&O.value>0&&a-1<e.modelValue&&a>e.modelValue,t=e.allowHalf&&p.value&&a-.5<=s.value&&a>s.value;return o||t}function K(a){e.clearable&&a===e.modelValue&&(a=0),f(S,a),e.modelValue!==a&&f("change",a)}function fe(a){m.value||(e.allowHalf&&p.value?K(s.value):K(a))}function pe(a){if(m.value)return;let o=s.value;const t=a.code;return t===I.up||t===I.right?(e.allowHalf?o+=.5:o+=1,a.stopPropagation(),a.preventDefault()):(t===I.left||t===I.down)&&(e.allowHalf?o-=.5:o-=1,a.stopPropagation(),a.preventDefault()),o=o<0?0:o,o=o>e.max?e.max:o,f(S,o),f("change",o),o}function R(a,o){if(!m.value){if(e.allowHalf){let t=o.target;J(t,r.e("item"))&&(t=t.querySelector(`.${r.e("icon")}`)),(t.clientWidth===0||J(t,r.e("decimal")))&&(t=t.parentNode),p.value=o.offsetX*2<=t.clientWidth,s.value=p.value?a-.5:a}else s.value=a;T.value=a}}function L(){m.value||(e.allowHalf&&(p.value=e.modelValue!==Math.floor(e.modelValue)),s.value=e.modelValue,T.value=-1)}return Ee(()=>e.modelValue,a=>{s.value=a,p.value=e.modelValue!==Math.floor(e.modelValue)}),e.modelValue||f(S,0),w({setCurrentValue:R,resetCurrentValue:L}),(a,o)=>{var t;return c(),y("div",{id:l(se),class:b([l(re),l(r).is("disabled",l(m))]),role:"slider","aria-label":l(j)?void 0:a.label||"rating","aria-labelledby":l(j)?(t=l(_))==null?void 0:t.labelId:void 0,"aria-valuenow":s.value,"aria-valuetext":l(A)||void 0,"aria-valuemin":"0","aria-valuemax":a.max,tabindex:"0",style:le(l(ne)),onKeydown:pe},[(c(!0),y(ee,null,Te(a.max,(d,h)=>(c(),y("span",{key:h,class:b(l(r).e("item")),onMousemove:n=>R(d,n),onMouseleave:L,onClick:n=>fe(d)},[te(l(q),{class:b([l(r).e("icon"),{hover:T.value===d},l(r).is("active",d<=s.value)])},{default:F(()=>[$(d)?k("v-if",!0):(c(),y(ee,{key:0},[ae((c(),V(M(l(me)),null,null,512)),[[W,d<=s.value]]),ae((c(),V(M(l(ce)),null,null,512)),[[W,!(d<=s.value)]])],64)),$(d)?(c(),V(l(q),{key:1,style:le(l(ue)),class:b([l(r).e("icon"),l(r).e("decimal")])},{default:F(()=>[(c(),V(M(l(de))))]),_:1},8,["style","class"])):k("v-if",!0)]),_:2},1032,["class"])],42,je))),128)),a.showText||a.showScore?(c(),y("span",{key:0,class:b(l(r).e("text"))},De(l(A)),3)):k("v-if",!0)],46,Fe)}}});var ze=be(Oe,[["__file","/home/runner/work/element-plus/element-plus/packages/components/rate/src/rate.vue"]]);const Pe=Ve(ze);const na={__name:"rateField",props:{formId:String,data:Object,path:String},setup(u){const w=u,f=we(w),e=f.value();return(x,v)=>{const _=Pe,E=ve;return c(),V(E,{"form-id":u.formId,"field-props":w},{default:F(()=>[te(_,Ne({modelValue:l(e),"onUpdate:modelValue":v[0]||(v[0]=r=>Be(e)?e.value=r:null)},u.data.props,{disabled:l(f).disabled,colors:u.data.colors}),null,16,["modelValue","disabled","colors"])]),_:1},8,["form-id","field-props"])}}};export{na as default};