import{j as d,k as n,l as c,m as p,o,c as t,n as r,e as s,p as l,i,t as u,g as m,d as y,q as f,_ as h,s as v}from"./main.9b9a57ec.js";const S=d({header:{type:String,default:""},bodyStyle:{type:n([String,Object,Array]),default:""},shadow:{type:String,values:["always","hover","never"],default:"always"}}),_={name:"ElCard"},w=c({..._,props:S,setup(g){const a=p("card");return(e,k)=>(o(),t("div",{class:r([s(a).b(),s(a).is(`${e.shadow}-shadow`)])},[e.$slots.header||e.header?(o(),t("div",{key:0,class:r(s(a).e("header"))},[l(e.$slots,"header",{},()=>[i(u(e.header),1)])],2)):m("v-if",!0),y("div",{class:r(s(a).e("body")),style:f(e.bodyStyle)},[l(e.$slots,"default")],6)],2))}});var b=h(w,[["__file","/home/runner/work/element-plus/element-plus/packages/components/card/src/card.vue"]]);const E=v(b);export{E};