import{s as Y,W as fe,S as G,Q as Ne,V as Q,al as ve,r as M,B as v,b5 as H,y as V,a1 as me,A as Z,aq as $,aK as Re,a2 as pe,a7 as he,aJ as be,b6 as ee,o as J,c as ge,H as R,C as A,u,K as ye,b7 as _e,X as q,b8 as X,aQ as $e,g as Se,b9 as Fe,aU as qe,aR as ze,d as z,F as Oe,ar as We,z as je,an as ke,ba as Te,Y as se,bb as K,bc as oe,h as U,f as De,G as Ke,ai as ne,b as Ue,t as ie,i as ue,a as de,bd as Ge,be as Qe,M as He,a3 as Je}from"./main-d76c405e.js";const Xe=Y({size:{type:String,values:fe},disabled:Boolean}),Ye=Y({...Xe,model:Object,rules:{type:G(Object)},labelPosition:{type:String,values:["left","right","top"],default:"right"},requireAsteriskPosition:{type:String,values:["left","right"],default:"left"},labelWidth:{type:[String,Number],default:""},labelSuffix:{type:String,default:""},inline:Boolean,inlineMessage:Boolean,statusIcon:Boolean,showMessage:{type:Boolean,default:!0},validateOnRuleChange:{type:Boolean,default:!0},hideRequiredAsterisk:{type:Boolean,default:!1},scrollToError:Boolean}),Ze={validate:(d,p,e)=>(Ne(d)||Q(d))&&ve(p)&&Q(e)};function et(){const d=M([]),p=v(()=>{if(!d.value.length)return"0";const i=Math.max(...d.value);return i?`${i}px`:""});function e(i){const n=d.value.indexOf(i);return n===-1&&p.value,n}function c(i,n){if(i&&n){const f=e(n);d.value.splice(f,1,i)}else i&&d.value.push(i)}function t(i){const n=e(i);n>-1&&d.value.splice(n,1)}return{autoLabelWidth:p,registerLabelWidth:c,deregisterLabelWidth:t}}const N=(d,p)=>{const e=H(p);return e.length>0?d.filter(c=>c.prop&&e.includes(c.prop)):d},tt="ElForm",lt=V({name:tt}),rt=V({...lt,props:Ye,emits:Ze,setup(d,{expose:p,emit:e}){const c=d,t=[],i=me(),n=Z("form"),f=v(()=>{const{labelPosition:a,inline:o}=c;return[n.b(),n.m(i.value||"default"),{[n.m(`label-${a}`)]:a,[n.m("inline")]:o}]}),C=a=>{t.push(a)},g=a=>{a.prop&&t.splice(t.indexOf(a),1)},s=(a=[])=>{c.model&&N(t,a).forEach(o=>o.resetField())},b=(a=[])=>{N(t,a).forEach(o=>o.clearValidate())},y=v(()=>!!c.model),E=a=>{if(t.length===0)return[];const o=N(t,a);return o.length?o:[]},x=async a=>w(void 0,a),W=async(a=[])=>{if(!y.value)return!1;const o=E(a);if(o.length===0)return!0;let _={};for(const S of o)try{await S.validate("")}catch(I){_={..._,...I}}return Object.keys(_).length===0?!0:Promise.reject(_)},w=async(a=[],o)=>{const _=!_e(o);try{const S=await W(a);return S===!0&&(o==null||o(S)),S}catch(S){if(S instanceof Error)throw S;const I=S;return c.scrollToError&&L(Object.keys(I)[0]),o==null||o(!1,I),_&&Promise.reject(I)}},L=a=>{var o;const _=N(t,a)[0];_&&((o=_.$el)==null||o.scrollIntoView())};return $(()=>c.rules,()=>{c.validateOnRuleChange&&x().catch(a=>Re())},{deep:!0}),pe(ee,he({...be(c),emit:e,resetFields:s,clearValidate:b,validateField:w,addField:C,removeField:g,...et()})),p({validate:x,validateField:w,resetFields:s,clearValidate:b,scrollToField:L}),(a,o)=>(J(),ge("form",{class:A(u(f))},[R(a.$slots,"default")],2))}});var at=ye(rt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/form/src/form.vue"]]);const st=["","error","validating","success"],ot=Y({label:String,labelWidth:{type:[String,Number],default:""},prop:{type:G([String,Array])},required:{type:Boolean,default:void 0},rules:{type:G([Object,Array])},error:String,validateStatus:{type:String,values:st},for:String,inlineMessage:{type:[String,Boolean],default:""},showMessage:{type:Boolean,default:!0},size:{type:String,values:fe}}),ce="ElLabelWrap";var nt=V({name:ce,props:{isAutoWidth:Boolean,updateAll:Boolean},setup(d,{slots:p}){const e=q(ee,void 0),c=q(X);c||$e(ce,"usage: <el-form-item><label-wrap /></el-form-item>");const t=Z("form"),i=M(),n=M(0),f=()=>{var s;if((s=i.value)!=null&&s.firstElementChild){const b=window.getComputedStyle(i.value.firstElementChild).width;return Math.ceil(Number.parseFloat(b))}else return 0},C=(s="update")=>{We(()=>{p.default&&d.isAutoWidth&&(s==="update"?n.value=f():s==="remove"&&(e==null||e.deregisterLabelWidth(n.value)))})},g=()=>C("update");return Se(()=>{g()}),Fe(()=>{C("remove")}),qe(()=>g()),$(n,(s,b)=>{d.updateAll&&(e==null||e.registerLabelWidth(s,b))}),ze(v(()=>{var s,b;return(b=(s=i.value)==null?void 0:s.firstElementChild)!=null?b:null}),g),()=>{var s,b;if(!p)return null;const{isAutoWidth:y}=d;if(y){const E=e==null?void 0:e.autoLabelWidth,x=c==null?void 0:c.hasLabel,W={};if(x&&E&&E!=="auto"){const w=Math.max(0,Number.parseInt(E,10)-n.value),L=e.labelPosition==="left"?"marginRight":"marginLeft";w&&(W[L]=`${w}px`)}return z("div",{ref:i,class:[t.be("item","label-wrap")],style:W},[(s=p.default)==null?void 0:s.call(p)])}else return z(Oe,{ref:i},[(b=p.default)==null?void 0:b.call(p)])}}});const it=["role","aria-labelledby"],ut=V({name:"ElFormItem"}),dt=V({...ut,props:ot,setup(d,{expose:p}){const e=d,c=je(),t=q(ee,void 0),i=q(X,void 0),n=me(void 0,{formItem:!1}),f=Z("form-item"),C=ke().value,g=M([]),s=M(""),b=Te(s,100),y=M(""),E=M();let x,W=!1;const w=v(()=>{if((t==null?void 0:t.labelPosition)==="top")return{};const l=se(e.labelWidth||(t==null?void 0:t.labelWidth)||"");return l?{width:l}:{}}),L=v(()=>{if((t==null?void 0:t.labelPosition)==="top"||t!=null&&t.inline)return{};if(!e.label&&!e.labelWidth&&Ie)return{};const l=se(e.labelWidth||(t==null?void 0:t.labelWidth)||"");return!e.label&&!c.label?{marginLeft:l}:{}}),a=v(()=>[f.b(),f.m(n.value),f.is("error",s.value==="error"),f.is("validating",s.value==="validating"),f.is("success",s.value==="success"),f.is("required",xe.value||e.required),f.is("no-asterisk",t==null?void 0:t.hideRequiredAsterisk),(t==null?void 0:t.requireAsteriskPosition)==="right"?"asterisk-right":"asterisk-left",{[f.m("feedback")]:t==null?void 0:t.statusIcon}]),o=v(()=>ve(e.inlineMessage)?e.inlineMessage:(t==null?void 0:t.inlineMessage)||!1),_=v(()=>[f.e("error"),{[f.em("error","inline")]:o.value}]),S=v(()=>e.prop?Q(e.prop)?e.prop:e.prop.join("."):""),I=v(()=>!!(e.label||c.label)),O=v(()=>e.for||g.value.length===1?g.value[0]:void 0),j=v(()=>!O.value&&I.value),Ie=!!i,te=v(()=>{const l=t==null?void 0:t.model;if(!(!l||!e.prop))return K(l,e.prop).value}),k=v(()=>{const{required:l}=e,r=[];e.rules&&r.push(...H(e.rules));const h=t==null?void 0:t.rules;if(h&&e.prop){const m=K(h,e.prop).value;m&&r.push(...H(m))}if(l!==void 0){const m=r.map((F,P)=>[F,P]).filter(([F])=>Object.keys(F).includes("required"));if(m.length>0)for(const[F,P]of m)F.required!==l&&(r[P]={...F,required:l});else r.push({required:l})}return r}),Ce=v(()=>k.value.length>0),Ee=l=>k.value.filter(h=>!h.trigger||!l?!0:Array.isArray(h.trigger)?h.trigger.includes(l):h.trigger===l).map(({trigger:h,...m})=>m),xe=v(()=>k.value.some(l=>l.required)),Me=v(()=>{var l;return b.value==="error"&&e.showMessage&&((l=t==null?void 0:t.showMessage)!=null?l:!0)}),le=v(()=>`${e.label||""}${(t==null?void 0:t.labelSuffix)||""}`),B=l=>{s.value=l},Le=l=>{var r,h;const{errors:m,fields:F}=l;(!m||!F)&&console.error(l),B("error"),y.value=m?(h=(r=m==null?void 0:m[0])==null?void 0:r.message)!=null?h:`${e.prop} is required`:"",t==null||t.emit("validate",e.prop,!1,y.value)},Be=()=>{B("success"),t==null||t.emit("validate",e.prop,!0,"")},Pe=async l=>{const r=S.value;return new Qe({[r]:l}).validate({[r]:te.value},{firstFields:!0}).then(()=>(Be(),!0)).catch(m=>(Le(m),Promise.reject(m)))},re=async(l,r)=>{if(W||!e.prop)return!1;const h=_e(r);if(!Ce.value)return r==null||r(!1),!1;const m=Ee(l);return m.length===0?(r==null||r(!0),!0):(B("validating"),Pe(m).then(()=>(r==null||r(!0),!0)).catch(F=>{const{fields:P}=F;return r==null||r(!1,P),h?!1:Promise.reject(P)}))},T=()=>{B(""),y.value="",W=!1},ae=async()=>{const l=t==null?void 0:t.model;if(!l||!e.prop)return;const r=K(l,e.prop);W=!0,r.value=oe(x),await We(),T(),W=!1},Ae=l=>{g.value.includes(l)||g.value.push(l)},Ve=l=>{g.value=g.value.filter(r=>r!==l)};$(()=>e.error,l=>{y.value=l||"",B(l?"error":"")},{immediate:!0}),$(()=>e.validateStatus,l=>B(l||""));const D=he({...be(e),$el:E,size:n,validateState:s,labelId:C,inputIds:g,isGroup:j,hasLabel:I,addInputId:Ae,removeInputId:Ve,resetField:ae,clearValidate:T,validate:re});return pe(X,D),Se(()=>{e.prop&&(t==null||t.addField(D),x=oe(te.value))}),Fe(()=>{t==null||t.removeField(D)}),p({size:n,validateMessage:y,validateState:s,validate:re,clearValidate:T,resetField:ae}),(l,r)=>{var h;return J(),ge("div",{ref_key:"formItemRef",ref:E,class:A(u(a)),role:u(j)?"group":void 0,"aria-labelledby":u(j)?u(C):void 0},[z(u(nt),{"is-auto-width":u(w).width==="auto","update-all":((h=u(t))==null?void 0:h.labelWidth)==="auto"},{default:U(()=>[u(I)?(J(),De(Ke(u(O)?"label":"div"),{key:0,id:u(C),for:u(O),class:A(u(f).e("label")),style:ne(u(w))},{default:U(()=>[R(l.$slots,"label",{label:u(le)},()=>[Ue(ie(u(le)),1)])]),_:3},8,["id","for","class","style"])):ue("v-if",!0)]),_:3},8,["is-auto-width","update-all"]),de("div",{class:A(u(f).e("content")),style:ne(u(L))},[R(l.$slots,"default"),z(Ge,{name:`${u(f).namespace.value}-zoom-in-top`},{default:U(()=>[u(Me)?R(l.$slots,"error",{key:0,error:y.value},()=>[de("div",{class:A(u(_))},ie(y.value),3)]):ue("v-if",!0)]),_:3},8,["name"])],6)],10,it)}}});var we=ye(dt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/form/src/form-item.vue"]]);const ft=He(at,{FormItem:we}),vt=Je(we);export{vt as E,ft as a};