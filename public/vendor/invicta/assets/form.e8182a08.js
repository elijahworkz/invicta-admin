import{j as ce,k as U,v as fe,x as Ne,y as K,z as ve,A as E,B as f,C as G,l as Q,D as me,m as X,G as A,H as $e,I as pe,J as he,K as ge,L as Y,o as H,c as be,p as V,n as L,e as i,_ as ye,M as _e,N,O as J,P as qe,Q as Se,R as Fe,S as ze,T as Re,b as $,F as Oe,U as We,V as je,W as ke,X as Te,Y as ae,Z as T,$ as se,w as D,f as De,i as Ue,t as oe,q as ne,a0 as Ke,g as ie,d as ue,a1 as Ge,a2 as He,s as Je,a3 as Qe}from"./main.75dc240c.js";const Xe=ce({model:Object,rules:{type:U(Object)},labelPosition:{type:String,values:["left","right","top"],default:"right"},requireAsteriskPosition:{type:String,values:["left","right"],default:"left"},labelWidth:{type:[String,Number],default:""},labelSuffix:{type:String,default:""},inline:Boolean,inlineMessage:Boolean,statusIcon:Boolean,showMessage:{type:Boolean,default:!0},size:{type:String,values:fe},disabled:Boolean,validateOnRuleChange:{type:Boolean,default:!0},hideRequiredAsterisk:{type:Boolean,default:!1},scrollToError:Boolean}),Ye={validate:(u,m,e)=>(Ne(u)||K(u))&&ve(m)&&K(e)};function Ze(){const u=E([]),m=f(()=>{if(!u.value.length)return"0";const n=Math.max(...u.value);return n?`${n}px`:""});function e(n){return u.value.indexOf(n)}function p(n,d){if(n&&d){const c=e(d);u.value.splice(c,1,n)}else n&&u.value.push(n)}function t(n){const d=e(n);d>-1&&u.value.splice(d,1)}return{autoLabelWidth:m,registerLabelWidth:p,deregisterLabelWidth:t}}const P=(u,m)=>{const e=G(m);return e.length>0?u.filter(p=>p.prop&&e.includes(p.prop)):u},et={name:"ElForm"},tt=Q({...et,props:Xe,emits:Ye,setup(u,{expose:m,emit:e}){const p=u,t=[],n=me(),d=X("form"),c=f(()=>{const{labelPosition:r,inline:o}=p;return[d.b(),d.m(n.value||"default"),{[d.m(`label-${r}`)]:r,[d.m("inline")]:o}]}),W=r=>{t.push(r)},g=r=>{r.prop&&t.splice(t.indexOf(r),1)},a=(r=[])=>{!p.model||P(t,r).forEach(o=>o.resetField())},h=(r=[])=>{P(t,r).forEach(o=>o.clearValidate())},y=f(()=>!!p.model),w=r=>{if(t.length===0)return[];const o=P(t,r);return o.length?o:[]},I=async r=>x(void 0,r),S=async(r=[])=>{if(!y.value)return!1;const o=w(r);if(o.length===0)return!0;let _={};for(const F of o)try{await F.validate("")}catch(C){_={..._,...C}}return Object.keys(_).length===0?!0:Promise.reject(_)},x=async(r=[],o)=>{const _=!_e(o);try{const F=await S(r);return F===!0&&(o==null||o(F)),F}catch(F){const C=F;return p.scrollToError&&M(Object.keys(C)[0]),o==null||o(!1,C),_&&Promise.reject(C)}},M=r=>{var o;const _=P(t,r)[0];_&&((o=_.$el)==null||o.scrollIntoView())};return A(()=>p.rules,()=>{p.validateOnRuleChange&&I().catch(r=>$e())},{deep:!0}),pe(Y,he({...ge(p),emit:e,resetFields:a,clearValidate:h,validateField:x,addField:W,removeField:g,...Ze()})),m({validate:I,validateField:x,resetFields:a,clearValidate:h,scrollToField:M}),(r,o)=>(H(),be("form",{class:L(i(c))},[V(r.$slots,"default")],2))}});var lt=ye(tt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/form/src/form.vue"]]);const rt=["","error","validating","success"],at=ce({label:String,labelWidth:{type:[String,Number],default:""},prop:{type:U([String,Array])},required:{type:Boolean,default:void 0},rules:{type:U([Object,Array])},error:String,validateStatus:{type:String,values:rt},for:String,inlineMessage:{type:[String,Boolean],default:""},showMessage:{type:Boolean,default:!0},size:{type:String,values:fe}}),de="ElLabelWrap";var st=Q({name:de,props:{isAutoWidth:Boolean,updateAll:Boolean},setup(u,{slots:m}){const e=N(Y,void 0);N(J)||qe(de,"usage: <el-form-item><label-wrap /></el-form-item>");const t=X("form"),n=E(),d=E(0),c=()=>{var a;if((a=n.value)!=null&&a.firstElementChild){const h=window.getComputedStyle(n.value.firstElementChild).width;return Math.ceil(Number.parseFloat(h))}else return 0},W=(a="update")=>{We(()=>{m.default&&u.isAutoWidth&&(a==="update"?d.value=c():a==="remove"&&(e==null||e.deregisterLabelWidth(d.value)))})},g=()=>W("update");return Se(()=>{g()}),Fe(()=>{W("remove")}),ze(()=>g()),A(d,(a,h)=>{u.updateAll&&(e==null||e.registerLabelWidth(a,h))}),Re(f(()=>{var a,h;return(h=(a=n.value)==null?void 0:a.firstElementChild)!=null?h:null}),g),()=>{var a,h;if(!m)return null;const{isAutoWidth:y}=u;if(y){const w=e==null?void 0:e.autoLabelWidth,I={};if(w&&w!=="auto"){const S=Math.max(0,Number.parseInt(w,10)-d.value),x=e.labelPosition==="left"?"marginRight":"marginLeft";S&&(I[x]=`${S}px`)}return $("div",{ref:n,class:[t.be("item","label-wrap")],style:I},[(a=m.default)==null?void 0:a.call(m)])}else return $(Oe,{ref:n},[(h=m.default)==null?void 0:h.call(m)])}}});const ot=["role","aria-labelledby"],nt={name:"ElFormItem"},it=Q({...nt,props:at,setup(u,{expose:m}){const e=u,p=je(),t=N(Y,void 0),n=N(J,void 0),d=me(void 0,{formItem:!1}),c=X("form-item"),W=ke().value,g=E([]),a=E(""),h=Te(a,100),y=E(""),w=E();let I,S=!1;const x=f(()=>{if((t==null?void 0:t.labelPosition)==="top")return{};const l=ae(e.labelWidth||(t==null?void 0:t.labelWidth)||"");return l?{width:l}:{}}),M=f(()=>{if((t==null?void 0:t.labelPosition)==="top"||(t==null?void 0:t.inline))return{};if(!e.label&&!e.labelWidth&&Ie)return{};const l=ae(e.labelWidth||(t==null?void 0:t.labelWidth)||"");return!e.label&&!p.label?{marginLeft:l}:{}}),r=f(()=>[c.b(),c.m(d.value),c.is("error",a.value==="error"),c.is("validating",a.value==="validating"),c.is("success",a.value==="success"),c.is("required",Ee.value||e.required),c.is("no-asterisk",t==null?void 0:t.hideRequiredAsterisk),(t==null?void 0:t.requireAsteriskPosition)==="right"?"asterisk-right":"asterisk-left",{[c.m("feedback")]:t==null?void 0:t.statusIcon}]),o=f(()=>ve(e.inlineMessage)?e.inlineMessage:(t==null?void 0:t.inlineMessage)||!1),_=f(()=>[c.e("error"),{[c.em("error","inline")]:o.value}]),F=f(()=>e.prop?K(e.prop)?e.prop:e.prop.join("."):""),C=f(()=>!!(e.label||p.label)),q=f(()=>e.for||g.value.length===1?g.value[0]:void 0),z=f(()=>!q.value&&C.value),Ie=!!n,Z=f(()=>{const l=t==null?void 0:t.model;if(!(!l||!e.prop))return T(l,e.prop).value}),R=f(()=>{const l=e.rules?G(e.rules):[],s=t==null?void 0:t.rules;if(s&&e.prop){const v=T(s,e.prop).value;v&&l.push(...G(v))}return e.required!==void 0&&l.push({required:!!e.required}),l}),xe=f(()=>R.value.length>0),Ce=l=>R.value.filter(v=>!v.trigger||!l?!0:Array.isArray(v.trigger)?v.trigger.includes(l):v.trigger===l).map(({trigger:v,...b})=>b),Ee=f(()=>R.value.some(l=>l.required===!0)),Be=f(()=>{var l;return h.value==="error"&&e.showMessage&&((l=t==null?void 0:t.showMessage)!=null?l:!0)}),ee=f(()=>`${e.label||""}${(t==null?void 0:t.labelSuffix)||""}`),B=l=>{a.value=l},Le=l=>{var s,v;const{errors:b,fields:k}=l;(!b||!k)&&console.error(l),B("error"),y.value=b?(v=(s=b==null?void 0:b[0])==null?void 0:s.message)!=null?v:`${e.prop} is required`:"",t==null||t.emit("validate",e.prop,!1,y.value)},Me=()=>{B("success"),t==null||t.emit("validate",e.prop,!0,"")},Pe=async l=>{const s=F.value;return new He({[s]:l}).validate({[s]:Z.value},{firstFields:!0}).then(()=>(Me(),!0)).catch(b=>(Le(b),Promise.reject(b)))},te=async(l,s)=>{if(S)return!1;const v=_e(s);if(!xe.value)return s==null||s(!1),!1;const b=Ce(l);return b.length===0?(s==null||s(!0),!0):(B("validating"),Pe(b).then(()=>(s==null||s(!0),!0)).catch(k=>{const{fields:re}=k;return s==null||s(!1,re),v?!1:Promise.reject(re)}))},O=()=>{B(""),y.value="",S=!1},le=async()=>{const l=t==null?void 0:t.model;if(!l||!e.prop)return;const s=T(l,e.prop);S=!0,s.value=se(I),await We(),O(),S=!1},Ve=l=>{g.value.includes(l)||g.value.push(l)},Ae=l=>{g.value=g.value.filter(s=>s!==l)};A(()=>e.error,l=>{y.value=l||"",B(l?"error":"")},{immediate:!0}),A(()=>e.validateStatus,l=>B(l||""));const j=he({...ge(e),$el:w,size:d,validateState:a,labelId:W,inputIds:g,isGroup:z,addInputId:Ve,removeInputId:Ae,resetField:le,clearValidate:O,validate:te});return pe(J,j),Se(()=>{e.prop&&(t==null||t.addField(j),I=se(Z.value))}),Fe(()=>{t==null||t.removeField(j)}),m({size:d,validateMessage:y,validateState:a,validate:te,clearValidate:O,resetField:le}),(l,s)=>{var v;return H(),be("div",{ref_key:"formItemRef",ref:w,class:L(i(r)),role:i(z)?"group":void 0,"aria-labelledby":i(z)?i(W):void 0},[$(i(st),{"is-auto-width":i(x).width==="auto","update-all":((v=i(t))==null?void 0:v.labelWidth)==="auto"},{default:D(()=>[i(C)?(H(),De(Ke(i(q)?"label":"div"),{key:0,id:i(W),for:i(q),class:L(i(c).e("label")),style:ne(i(x))},{default:D(()=>[V(l.$slots,"label",{label:i(ee)},()=>[Ue(oe(i(ee)),1)])]),_:3},8,["id","for","class","style"])):ie("v-if",!0)]),_:3},8,["is-auto-width","update-all"]),ue("div",{class:L(i(c).e("content")),style:ne(i(M))},[V(l.$slots,"default"),$(Ge,{name:`${i(c).namespace.value}-zoom-in-top`},{default:D(()=>[i(Be)?V(l.$slots,"error",{key:0,error:y.value},()=>[ue("div",{class:L(i(_))},oe(y.value),3)]):ie("v-if",!0)]),_:3},8,["name"])],6)],10,ot)}}});var we=ye(it,[["__file","/home/runner/work/element-plus/element-plus/packages/components/form/src/form-item.vue"]]);const dt=Je(lt,{FormItem:we}),ct=Qe(we);export{ct as E,dt as a};