const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-1eaDZLIJ.js","assets/vendor-CalzCiyh.js","assets/vendor-5dkqLkPm.css","assets/ResourceIndex-pjNO_8Ks.js","assets/dynamic-import-helper-BheWnx7M.js","assets/ResourceEdit-obbacM7C.js","assets/FormBase-CxW-ONTk.js","assets/dropdown-menu-hHkMNFC_.js","assets/Loading-BOKjay5j.js","assets/Loading-Co7eYvO5.css","assets/dropdown-menu-4jf60RXO.css","assets/FormBase-DAi7XNfV.css","assets/card-if1rWvME.css","assets/loading-oV0W9nDj.css","assets/ResourceDetail-CfShZzv5.js","assets/NavigationEdit-DfAZfRAw.js","assets/AssetForm-B-Dhit5V.js","assets/AssetForm-CctfFtGL.css","assets/vuedraggable.umd-bW_ec9ha.js","assets/vue.runtime.esm-bundler-BiL7ZFGN.js","assets/NavigationEdit-C6JxGR1-.css","assets/switch-BVq8NMY0.css","assets/link-CTQ9-Exe.css","assets/PermissionEdit-C49UGUTI.js","assets/CommandsIndex-ZU2loQRr.js","assets/CommandsIndex-Cm0DpwB1.css"])))=>i.map(i=>d[i]);
import{a as N,E as V,c as H,b as j,r as A,o as u,d as p,e as x,f as b,w as m,t as v,u as d,n as S,g as w,h as r,i as U,j as O,k as c,m as M,l as q,F as I,p as T,v as z,q as F,s as R,x as J,y,z as W,A as G,B as k,C as K,D as Z,G as B,H as D,I as Q,J as X,K as Y,L as tt,M as et,N as nt,O as ot}from"./vendor-CalzCiyh.js";function st(n){const t=N.create();return t.defaults.withCredentials=!0,t.defaults.baseURL=n,t.interceptors.response.use(e=>e,e=>{let{data:o,status:i,statusText:a="Error",message:s="Uknown error occured"}=e.response;o&&"message"in o&&(s=o.message);let l=`${i}: ${a}`;return i===419&&(s="Session expired. Please reload"),i===422||V.error({title:l,message:s,duration:0}),Promise.reject(e)}),t}const at="modulepreload",it=function(n){return"/vendor/invicta/"+n},P={},g=function(t,e,o){let i=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));i=Promise.allSettled(e.map(_=>{if(_=it(_),_ in P)return;P[_]=!0;const h=_.endsWith(".css"),E=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${_}"]${E}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":at,h||(f.as="script"),f.crossOrigin="",f.href=_,l&&f.setAttribute("nonce",l),document.head.appendChild(f),h)return new Promise(($,C)=>{f.addEventListener("load",$),f.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${_}`)))})}))}function a(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return i.then(s=>{for(const l of s||[])l.status==="rejected"&&a(l.reason);return t().catch(a)})},rt=()=>g(()=>import("./Home-1eaDZLIJ.js"),__vite__mapDeps([0,1,2])),ct=(n=null)=>H({history:j(n),linkActiveClass:"active",routes:[{path:"/",component:rt},{path:"/resource/:handle",component:()=>g(()=>import("./ResourceIndex-pjNO_8Ks.js"),__vite__mapDeps([3,4,1,2])),name:"resourceIndex",props:!0},{path:"/resource/:handle/create",component:()=>g(()=>import("./ResourceEdit-obbacM7C.js"),__vite__mapDeps([5,1,2,6,7,8,9,10,4,11,12,13])),name:"resourceCreate",props:e=>({data:e.meta.data})},{path:"/resource/:handle/:id/edit",component:()=>g(()=>import("./ResourceEdit-obbacM7C.js"),__vite__mapDeps([5,1,2,6,7,8,9,10,4,11,12,13])),name:"resourceEdit",props:e=>({data:e.meta.data})},{path:"/resource/:handle/:id",component:()=>g(()=>import("./ResourceDetail-CfShZzv5.js"),__vite__mapDeps([14,6,1,2,7,8,9,10,4,11,12])),name:"resourceDetail",props:e=>({...e.meta.data})},{path:"/navigation/:id/items",component:()=>g(()=>import("./NavigationEdit-DfAZfRAw.js"),__vite__mapDeps([15,1,2,7,8,9,10,16,17,18,19,20,13,21,22])),name:"navEditItems"},{path:"/group/:id/permissions",component:()=>g(()=>import("./PermissionEdit-C49UGUTI.js"),__vite__mapDeps([23,1,2,8,9,12]))},{path:"/tools/commands",component:()=>g(()=>import("./CommandsIndex-ZU2loQRr.js"),__vite__mapDeps([24,1,2,25,12])),props:e=>({...e.meta.data})}]}),lt=["href"],ut={__name:"NavLink",props:{item:Object},setup(n){return(t,e)=>{const o=A("router-link");return n.item.external?(u(),p("a",{key:0,href:n.item.url,class:"nav-link",target:"_blank"},[x(t.$slots,"default")],8,lt)):(u(),b(o,{key:1,class:"nav-link",to:n.item.url},{default:m(()=>[x(t.$slots,"default")]),_:3},8,["to"]))}}},dt={__name:"Badge",props:{data:{type:Object,default:()=>({content:null,event:null})}},setup(n){var i,a,s;const t=n;let e=((i=t.data)==null?void 0:i.content)||null,o=((a=t.data)==null?void 0:a.type)||"info";return window.Echo&&((s=t.data)!=null&&s.event)&&window.Echo.private("invicta-admin").listen(t.data.event,l=>{console.log("I got this message",l),e=e+1,typeof l=="object"&&"message"in l&&Invicta.message({type:"info",title:l.message})}),(l,_)=>n.data?(u(),p("span",{key:0,class:S(["badge",d(o)])},v(d(e)),3)):w("",!0)}},mt=["innerHTML"],pt=["width","height"],_t=["d"],ht="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",L={__name:"SvgIcon",props:{icon:String,width:{type:Number,default:24},height:{type:Number,default:24},style:{type:Object,default:()=>{}}},setup(n){const t=n,e=t.icon&&t.icon.includes("viewBox"),o=t.icon?t.icon:ht;return(i,a)=>d(e)?(u(),p("span",{key:0,innerHTML:n.icon},null,8,mt)):(u(),p("svg",{key:1,viewBox:"0 0 24 24",width:n.width,height:n.height,style:U(n.style)},[r("path",{fill:"currentColor",d:d(o)},null,8,_t)],12,pt))}},ft={class:"sidebar-mini"},gt={class:"sidebar-normal"},vt={class:"sidebar-mini"},bt={class:"sidebar-normal"},Et={class:"submenu"},wt={class:"nav"},It={class:"sidebar-normal"},$t={__name:"NavItem",props:{item:Object},setup(n){const t=O(!1),e=o=>o.filter(i=>i.badge).length;return Invicta.on("close-sidebar-submenus",()=>t.value=!1),(o,i)=>{const a=L,s=dt,l=ut,_=F;return u(),p(I,null,[n.item.children?w("",!0):(u(),b(l,{key:0,item:n.item},{default:m(()=>[r("span",ft,[c(a,{icon:n.item.icon},null,8,["icon"])]),r("span",gt,v(n.item.name),1),c(s,{data:n.item.badge||null},null,8,["data"])]),_:1},8,["item"])),n.item.children?(u(),p("div",{key:1,class:S(["has-children",{open:d(t),"has-badges":e(n.item.children)}])},[r("div",{class:"nav-link",onClick:i[0]||(i[0]=h=>t.value=!d(t))},[r("span",vt,[c(a,{icon:n.item.icon},null,8,["icon"])]),r("span",bt,v(n.item.name),1),c(a,{icon:d(M),class:"ml-auto nav-arrow"},null,8,["icon"])]),c(_,null,{default:m(()=>[q(r("div",Et,[r("ul",wt,[(u(!0),p(I,null,T(n.item.children,(h,E)=>(u(),p("li",{key:E,class:"nav-item"},[c(l,{item:h},{default:m(()=>[r("span",It,v(h.name),1),c(s,{data:h.badge||null},null,8,["data"])]),_:2},1032,["item"])]))),128))])],512),[[z,d(t)]])]),_:1})],2)):w("",!0)],64)}}},Ct={class:"app-nav"},yt={class:"nav"},kt={key:0,class:"nav-group"},xt={__name:"Sidebar",setup(n){const t=Invicta.getConfig("menu");return Invicta.log("Menu",t),(e,o)=>{const i=$t,a=R;return u(),p("div",Ct,[c(a,null,{default:m(()=>[r("ul",yt,[(u(!0),p(I,null,T(d(t),s=>(u(),p(I,null,[s.group?(u(),p("li",kt,[r("span",null,v(s.group),1)])):w("",!0),r("li",{class:S(["nav-item",{divider:s.divider,external:!s.inertia}])},[c(i,{item:s},null,8,["item"])],2)],64))),256))])]),_:1})])}}},St={class:"user flex items-center"},Lt={class:"avatar"},Pt={class:"font-bold mr-2 leading-0"},Vt={__name:"User",setup(n){J(a=>({"4beb594f":d(o),"030bf48b":d(i)}));const t=Invicta.user,e=y(()=>{let a=t.name||"";const s=a.split(" ");return s.length==1?a=s[0]?s[0].charAt(0):"?":a=s[0].charAt(0)+s[1].charAt(0),a}),o=y(()=>{let a="var(--el-color-primary-dark-2)";return"avatar"in t.data&&t.data.avatar&&("src"in t.data.avatar&&t.data.avatar.src,a=`url(${t.data.avatar.src})`),a}),i=y(()=>"avatar"in t.data&&t.data.avatar?"transparent":"#fff");return(a,s)=>(u(),p("div",St,[r("span",Lt,v(d(e)),1),r("div",Pt,v(d(t).name),1)]))}},At=["href"],Ot={__name:"Impersonator",setup(n){const t=Invicta.getConfig("impersonateRoute");return(e,o)=>{const i=L,a=G;return u(),b(a,{content:"Stop impersonating"},{default:m(()=>[r("a",{href:d(t),class:"text-red-600 mr-4"},[c(i,{icon:d(W)},null,8,["icon"])],8,At)]),_:1})}}},Tt={__name:"SiteLinks",setup(n){const t=e=>{let o=Invicta.getConfig("appUrl");switch(e){case"production":o=Invicta.getConfig("appProductionUrl");break}window.open(o,"_blank")};return(e,o)=>{const i=Z,a=B,s=D;return u(),b(s,{onCommand:t},{dropdown:m(()=>[c(a,{command:"current"},{default:m(()=>o[1]||(o[1]=[k("Local site")])),_:1}),c(a,{command:"production"},{default:m(()=>o[2]||(o[2]=[k("Production site")])),_:1})]),default:m(()=>[c(i,{icon:d(K),text:""},{default:m(()=>o[0]||(o[0]=[k("Site links")])),_:1},8,["icon"])]),_:1})}}},Rt={class:"app-header"},Bt=["title"],Dt={class:"ml-auto flex items-center"},Nt={__name:"Header",setup(n){const t=Invicta.getConfig("appName"),e=Invicta.getConfig("appVersion");Invicta.getConfig("currentLocale");const o=Invicta.getConfig("impersonator"),i=()=>{document.body.classList.toggle("sidebar-mini"),Invicta.emit("close-sidebar-submenus")},a=()=>{Invicta.axios.post("/logout").then(()=>window.location.reload())};return(s,l)=>{const _=L,h=Tt,E=Ot,f=Vt,$=B,C=D;return u(),p("header",Rt,[r("span",{class:"sidebar-toggle",title:"Minimize sidebar",onClick:i},[c(_,{icon:d(Q)},null,8,["icon"])]),r("div",{class:"app-branding",title:d(e)},v(d(t)),9,Bt),r("div",Dt,[c(h,{class:"mr-3"}),d(o)?(u(),b(E,{key:0})):w("",!0),c(C,null,{dropdown:m(()=>[c($,null,{default:m(()=>[r("span",{class:"text-gray-400",onClick:a},"Logout")]),_:1})]),default:m(()=>[c(f)]),_:1})])])}}},Ht=(n,t)=>{const e=n.__vccOpts||n;for(const[o,i]of t)e[o]=i;return e},jt={},Ut={class:"app-body"},Mt={class:"app-sidebar"},qt={class:"app-main"};function zt(n,t){const e=Nt,o=xt,i=R;return u(),p(I,null,[c(e),r("div",Ut,[r("aside",Mt,[c(o)]),r("main",qt,[c(i,null,{default:m(()=>[x(n.$slots,"default")]),_:3})])])],64)}const Ft=Ht(jt,[["render",zt]]),Jt={__name:"App",setup(n){return X(()=>{document.body.classList.add("app-ready")}),Y(Invicta.errors,t=>{if(t){let e=0;for(let o in t)Invicta.message({type:"error",title:"Error",message:t[o],duration:5e3,offset:e}),e+=80}}),(t,e)=>{const o=A("router-view");return u(),b(Ft,null,{default:m(()=>[c(o)]),_:1})}}};let Wt=class{constructor(){this.app=null,this.mountElement="#app",this.bootingCallbacks=[],this.eventBus=tt(),this.errors=O({}),this.loadingElement=document.querySelector(".loading.pulse"),this.user={data:null,name:null}}loadingStatus(t){this.loadingElement.textContent=t}booting(t){this.bootingCallbacks.push(t)}boot(){this.bootingCallbacks.forEach(t=>t(this.app))}init(t){this.config=t,this.axios=st(`${this.getConfig("appUrl")}${this.getConfig("appPath")}`),this.user=JSON.parse(atob(this.getConfig("user"))),delete this.config.user,this.app=et(Jt),this.setupRouter(),this.app.use(this.router),this.start()}getConfig(t){return this.config&&Object.prototype.hasOwnProperty.call(this.config,t)?this.config[t]:[]}can(t){return this.user.dev==null||this.user.permissions==null?!1:this.user.dev?!0:this.user.permissions.includes(t)}start(){console.log(" i am starting"),this.boot(),this.app.mount(this.mountElement)}setupRouter(){this.router=ct(this.getConfig("appPath"))}componentExists(t){return!nt(this.app._context.components[t])}component(t,e){this.componentExists(t)||this.app.component(t,e)}event(t,e=null){let o=e?new CustomEvent(t,{detail:{data:e}}):new Event(t);document.dispatchEvent(o)}on(t,e){this.eventBus.on(t,e)}off(t,e){this.eventBus.off(t,e)}emit(t,e={}){this.eventBus.emit(t,e)}pageTitle(t){ot(t,{titleTemplate:`%s - ${this.getConfig("appName")}`})}setErrors(t){this.errors.value=t}remember(t,e=null){if(t=`invicta-${t}`,e)localStorage.setItem(t,e);else return localStorage.getItem(t)}message(t){V({...t})}log(t,e=null){e?console.log(`[Invicta] ${t}`,e):console.log("[Invicta]",t)}};window.Invicta=new Wt;export{g as _,L as a,Ht as b};
