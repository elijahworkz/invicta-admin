import{s as m,af as y,y as u,A as h,B as v,o as a,c as t,f as r,h as b,G as C,u as o,D as E,i,C as c,H as d,K as B,M as _}from"./main-d76c405e.js";const g=m({type:{type:String,values:["primary","success","warning","info","danger","default"],default:"default"},underline:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},href:{type:String,default:""},icon:{type:y}}),w={click:l=>l instanceof MouseEvent},$=["href"],L=u({name:"ElLink"}),P=u({...L,props:g,emits:w,setup(l,{emit:f}){const s=l,n=h("link"),p=v(()=>[n.b(),n.m(s.type),n.is("disabled",s.disabled),n.is("underline",s.underline&&!s.disabled)]);function k(e){s.disabled||f("click",e)}return(e,D)=>(a(),t("a",{class:c(o(p)),href:e.disabled||!e.href?void 0:e.href,onClick:k},[e.icon?(a(),r(o(E),{key:0},{default:b(()=>[(a(),r(C(e.icon)))]),_:1})):i("v-if",!0),e.$slots.default?(a(),t("span",{key:1,class:c(o(n).e("inner"))},[d(e.$slots,"default")],2)):i("v-if",!0),e.$slots.icon?d(e.$slots,"icon",{key:2}):i("v-if",!0)],10,$))}});var S=B(P,[["__file","/home/runner/work/element-plus/element-plus/packages/components/link/src/link.vue"]]);const K=_(S);export{K as E};