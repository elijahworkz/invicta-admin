import{y as B,A as R,C as $,i as x,P as j,I as A,r as N,Q as L,R as v,S as C,U as h,V as T,W as O,X as U,d as o,b as F,N as Y,s as W,c as g,k as _,F as H,o as E,a as M,t as b,u as r,x as X,j as P,l as D,E as G}from"./main-c4840b76.js";import{E as Q}from"./card-3a2a2218.js";import{E as Z,a as q}from"./form-50aae665.js";/* empty css                  */import{_ as J}from"./EmptyLayout-9c533fac.js";import{P as y,i as k,a as K}from"./vnode-d7113936.js";import{E as ee}from"./index-399c7794.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";const te=B({prefixCls:{type:String}}),z=R({name:"ElSpaceItem",props:te,setup(e,{slots:p}){const t=$("space"),u=x(()=>`${e.prefixCls||t.b()}__item`);return()=>j("div",{class:u.value},A(p,"default"))}}),I={small:8,default:12,large:16};function se(e){const p=$("space"),t=x(()=>[p.b(),p.m(e.direction),e.class]),u=N(0),m=N(0),w=x(()=>{const s=e.wrap||e.fill?{flexWrap:"wrap",marginBottom:`-${m.value}px`}:{},a={alignItems:e.alignment};return[s,a,e.style]}),i=x(()=>{const s={paddingBottom:`${m.value}px`,marginRight:`${u.value}px`},a=e.fill?{flexGrow:1,minWidth:`${e.fillRatio}%`}:{};return[s,a]});return L(()=>{const{size:s="small",wrap:a,direction:l,fill:n}=e;if(v(s)){const[c=0,d=0]=s;u.value=c,m.value=d}else{let c;C(s)?c=s:c=I[s||"small"]||I.small,(a||n)&&l==="horizontal"?u.value=m.value=c:l==="horizontal"?(u.value=c,m.value=0):(m.value=c,u.value=0)}}),{classes:t,containerStyle:w,itemStyle:i}}const ae=B({direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},class:{type:h([String,Object,Array]),default:""},style:{type:h([String,Array,Object]),default:""},alignment:{type:h(String),default:"center"},prefixCls:{type:String},spacer:{type:h([Object,String,Number,Array]),default:null,validator:e=>T(e)||C(e)||O(e)},wrap:Boolean,fill:Boolean,fillRatio:{type:Number,default:100},size:{type:[String,Array,Number],values:U,validator:e=>C(e)||v(e)&&e.length===2&&e.every(C)}}),oe=R({name:"ElSpace",props:ae,setup(e,{slots:p}){const{classes:t,containerStyle:u,itemStyle:m}=se(e);function w(i,s="",a=[]){const{prefixCls:l}=e;return i.forEach((n,c)=>{k(n)?v(n.children)&&n.children.forEach((d,S)=>{k(d)&&v(d.children)?w(d.children,`${s+S}-`,a):a.push(o(z,{style:m.value,prefixCls:l,key:`nested-${s+S}`},{default:()=>[d]},y.PROPS|y.STYLE,["style","prefixCls"]))}):K(n)&&a.push(o(z,{style:m.value,prefixCls:l,key:`LoopKey${s+c}`},{default:()=>[n]},y.PROPS|y.STYLE,["style","prefixCls"]))}),a}return()=>{var i;const{spacer:s,direction:a}=e,l=A(p,"default",{key:0},()=>[]);if(((i=l.children)!=null?i:[]).length===0)return null;if(v(l.children)){let n=w(l.children);if(s){const c=n.length-1;n=n.reduce((d,S,f)=>{const V=[...d,S];return f!==c&&V.push(o("span",{style:[m.value,a==="vertical"?"width: 100%":null],key:f},[T(s)?s:F(s,y.TEXT)],y.STYLE)),V},[])}return o("div",{class:t.value,style:u.value},n,y.STYLE|y.CLASS)}return l.children}}}),le=Y(oe);const ne={class:"app-branding-auth"},re=["textContent"],ie=["textContent"],ce=["textContent"],me={layout:J},he=Object.assign(me,{__name:"ResetPassword",props:{actionUrl:String,email:String,token:String},setup(e){const p=e,t=W({token:p.token,email:p.email,password:"",password_confirmation:""}),u=Invicta.getConfig("appName"),m=()=>{t.post(p.actionUrl,{onFinish:()=>t.reset("password","password_confirmation")})};return(w,i)=>{const s=D("Head"),a=ee,l=Z,n=G,c=q,d=Q,S=le;return E(),g(H,null,[o(s,{title:"Reset password"}),o(S,{direction:"vertical"},{default:_(()=>[M("h1",ne,b(r(u)),1),o(d,{class:"auth-card"},{default:_(()=>[o(c,{model:r(t),"label-position":"top",onSubmit:X(m,["prevent"])},{default:_(()=>[o(l,{label:"Email",prop:"email"},{default:_(()=>[o(a,{modelValue:r(t).email,"onUpdate:modelValue":i[0]||(i[0]=f=>r(t).email=f),autofocus:"",autocomplete:"username"},null,8,["modelValue"]),r(t).errors.email?(E(),g("div",{key:0,class:"el-form-item__error",textContent:b(r(t).errors.email)},null,8,re)):P("",!0)]),_:1}),o(l,{label:"Password",prop:"password"},{default:_(()=>[o(a,{type:"password",modelValue:r(t).password,"onUpdate:modelValue":i[1]||(i[1]=f=>r(t).password=f),"show-password":"",autocomplete:"new-password"},null,8,["modelValue"]),r(t).errors.password?(E(),g("div",{key:0,class:"el-form-item__error",textContent:b(r(t).errors.password)},null,8,ie)):P("",!0)]),_:1}),o(l,{label:"Confirm Password",prop:"password_confirmation"},{default:_(()=>[o(a,{type:"password",modelValue:r(t).password_confirmation,"onUpdate:modelValue":i[2]||(i[2]=f=>r(t).password_confirmation=f),"show-password":"",autocomplete:"new-password"},null,8,["modelValue"]),r(t).errors.password_confirmation?(E(),g("div",{key:0,class:"el-form-item__error",textContent:b(r(t).errors.password_confirmationemail)},null,8,ce)):P("",!0)]),_:1}),o(l,{class:"justify-center"},{default:_(()=>[o(n,{type:"primary","native-type":"submit"},{default:_(()=>[F("Reset Password")]),_:1})]),_:1})]),_:1},8,["model","onSubmit"])]),_:1})]),_:1})],64)}}});export{he as default};