import{b as n,l as r,c as t,e as c,i as s,u as l}from"./runtime-core.esm-bundler-7f0fe3b3.js";const u={__name:"PagePlaceholder",props:{props:Object},setup(p){return(e,a)=>(n(),r("h1",null,"Page Placeholder"))}},g={__name:"Page",props:{page:String},setup(p){const e=p,a=t(()=>e.page&&Invicta.componentExists(e.page)?Invicta.app.component(e.page):u);return(o,m)=>(n(),c(s(l(a)),{props:o.$page.props},null,8,["props"]))}};export{g as default};