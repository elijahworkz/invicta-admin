import{aP as C,r as f,a as B,o as s,c as a,b as l,d as e,t as c,w as r,F as d,aQ as E,aL as g,e as L,i as y,n as i}from"./main.e6f303be.js";import{E as O}from"./card.5f0ced9f.js";import{d as R,D}from"./DragHandle.a3c31a85.js";import"./_plugin-vue_export-helper.cdc0426e.js";const H={class:"py-6 px-10"},N={class:"flex items-end justify-start mb-4"},V={class:"mb-1"},j={class:"ml-auto"},F=y("Cancel"),I=y("Save Order"),P={class:"sort-table"},S=e("th",null,null,-1),U=["width"],$={class:"drag-cell"},z={key:1},J={__name:"ResourceReorder",props:{resource:Object},setup(t){const b=t,{pageUrl:v}=C().props.value;function x(){let u=b.resource.data.map((_,n)=>({id:_.id,order:parseInt(`1100${n}`)}));E.Inertia.post(v,{order:u})}return(u,_)=>{const n=f("Head"),k=f("Link"),h=B,w=O;return s(),a(d,null,[l(n,{title:t.resource.title},null,8,["title"]),e("div",H,[e("div",N,[e("div",null,[e("h1",V,c(t.resource.title),1)]),e("div",j,[l(h,null,{default:r(()=>[l(k,{href:`${t.resource.indexUrl}`},{default:r(()=>[F]),_:1},8,["href"])]),_:1}),l(h,{type:"primary",onClick:x},{default:r(()=>[I]),_:1})])]),l(w,{"body-style":"padding: 10px 0 0",class:""},{default:r(()=>[e("table",P,[e("thead",null,[e("tr",null,[S,(s(!0),a(d,null,g(t.resource.columns,o=>(s(),a("th",{width:o.width,class:i(o.headerAlign)},c(o.label),11,U))),256))])]),l(L(R),{list:t.resource.data,tag:"tbody",handle:".drag-handle","item-key":"index",class:"items-stack w-full"},{item:r(({element:o,index:A})=>[e("tr",null,[e("td",$,[l(D)]),(s(!0),a(d,null,g(t.resource.columns,(m,p)=>(s(),a("td",{class:i(m.align)},[m.boolean?(s(),a("i",{key:0,class:i(["icon-status",{success:o[p]==1}])},null,2)):(s(),a("span",z,c(o[p]),1))],2))),256))])]),_:1},8,["list"])])]),_:1})])],64)}}};export{J as default};