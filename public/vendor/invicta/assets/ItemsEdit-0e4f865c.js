import{_ as ne}from"./main-cb73a6cf.js";import{s as A,h,z as ae,o as b,d as N,f as _,t as V,u as t,i as o,D as se,e as E,w as i,H as k,G as H,aa as M,ab as re,ac as ie,ad as ce,ae as de,r as U,c as S,n as ue,af as me,ag as _e,ah as pe,F as R,O as fe,L as ve,ai as he,k as ge,aj as be,a5 as ye,J as Ie,ak as ke}from"./vendor-a8a416a2.js";/* empty css             *//* empty css               *//* empty css                  */import{_ as xe}from"./ItemsSelector-2331aca0.js";import{_ as $e}from"./ActionsDropdown-aed3486a.js";/* empty css             */import{d as Ce,_ as we}from"./vuedraggable.umd-d3d544b4.js";/* empty css                      *//* empty css             */import"./ResourceTable-b5e47700.js";/* empty css                 */import"./CheckTree-da22beb6.js";/* empty css               */import"./functions-5d36d463.js";import"./Loading-5dd6b4df.js";import"./Filters-13ee5ac9.js";/* empty css                    */import"./Search-d584c8e4.js";import"./vue.runtime.esm-bundler-ff9cd1d9.js";const Ee={class:"p-4 w-full"},Se={class:"mb-4 flex items-center justify-between"},Ne={key:0,class:"mb-2"},Ve=_("div",{class:"info info-bottom opacity-60"},"Navigation label.",-1),De=_("div",{class:"info info-bottom opacity-60"},"Leave blank to make simple text item.",-1),Te=_("div",{class:"info info-bottom opacity-60"},"Set custom CSS classes.",-1),Ae=_("div",{class:"info info-bottom opacity-60"},"Open link in the new tab.",-1),Le={class:"text-right"},Ue={__name:"NavItemForm",props:{mode:String,itemData:Object},setup(f){const u=f,c=A(()=>u.mode=="create"?"Create Item":"Edit Item"),m=h(u.itemData),g=h(!1),a=h(!1),d=h("");return ae(()=>{if("id"in u.itemData){g.value=!0;let v=`/api/resource/${u.itemData.handle}/${u.itemData.id}/uri`;Invicta.axios.get(v).then(({data:r})=>{r||(a.value=!0,d.value=`${u.itemData.type} not found`),m.value.url=r})}else g.value=!1}),(v,r)=>{const x=H,$=M,s=re,y=ie,I=ce,D=de;return b(),N("div",Ee,[_("header",Se,[_("h1",null,V(t(c)),1),o(x,{icon:t(se),text:"",circle:"",bg:"",onClick:r[0]||(r[0]=p=>v.$emit("close"))},null,8,["icon"])]),t(a)?(b(),N("div",Ne,[o($,{title:t(d),type:"error",effect:"dark","show-icon":"",closable:!1},null,8,["title"])])):E("",!0),o(D,{"label-position":"top",class:"invicta-form"},{default:i(()=>[o(y,{label:"Label"},{default:i(()=>[o(s,{size:"large",modelValue:t(m).label,"onUpdate:modelValue":r[1]||(r[1]=p=>t(m).label=p)},null,8,["modelValue"]),Ve]),_:1}),o(y,{label:"URL"},{default:i(()=>[o(s,{size:"large",modelValue:t(m).url,"onUpdate:modelValue":r[2]||(r[2]=p=>t(m).url=p),disabled:t(g)},null,8,["modelValue","disabled"]),De]),_:1}),o(y,{label:"CSS class"},{default:i(()=>[o(s,{size:"large",modelValue:t(m).css,"onUpdate:modelValue":r[3]||(r[3]=p=>t(m).css=p)},null,8,["modelValue"]),Te]),_:1}),o(y,{label:"Open in new tab"},{default:i(()=>[o(I,{size:"large",modelValue:t(m).external,"onUpdate:modelValue":r[4]||(r[4]=p=>t(m).external=p)},null,8,["modelValue"]),Ae]),_:1}),_("div",Le,[o(x,{type:"primary",size:"large",onClick:r[5]||(r[5]=p=>v.$emit("saved",t(m)))},{default:i(()=>[k("Save Item")]),_:1})])]),_:1})])}}};const Fe={class:"ml-auto item-type"},ze={__name:"NavTree",props:{list:Array,childActions:Array},emits:["addChild","editItem","removeItem","change"],setup(f,{emit:u}){const c=f,m=a=>{a.action=="remove"?(c.list.splice(a.item.index,1),u("removeItem",!0)):u("addChild",a)},g=a=>{console.log("editing",a),u("editItem",a)};return(a,d)=>{const v=we,r=me,x=$e,$=U("NavTree",!0);return b(),S(t(Ce),{list:f.list,tag:"ul",group:{name:"g1"},"item-key":"label",onChange:d[2]||(d[2]=s=>a.$emit("change",!0))},{item:i(({element:s,index:y})=>[_("li",null,[_("div",{class:ue(["item flex items-center justify-start border rounded bg-white mb-1 p-2",{error:s.error}])},[o(v,{class:"mr-2 text-gray-300 hover:text-gray-400"}),o(r,{underline:!1,onClick:I=>g(s)},{default:i(()=>[k(V(s.label),1)]),_:2},1032,["onClick"]),_("div",Fe,V(s.error?`${s.type} | Error`:s.type),1),o(x,{actions:f.childActions,item:{index:y,...s},title:"New Child Item",onSelected:m,class:"ml-3"},null,8,["actions","item"])],2),o($,{list:s.children,"child-actions":f.childActions,onChange:d[0]||(d[0]=I=>a.$emit("change",!0)),onAddChild:m,onEditItem:g,onRemoveItem:d[1]||(d[1]=I=>a.$emit("removeItem",!0))},null,8,["list","child-actions"])])]),_:1},8,["list"])}}};const Oe={class:"py-6 px-10"},Be={class:"w-1/2 mx-auto"},Re={class:"flex items-end justify-between mb-4"},He={class:"mb-1"},Me={class:"nav-actions"},je={key:0,class:"mb-3"},ut={__name:"ItemsEdit",props:{indexUrl:String,actionUrl:String,menuTitle:String,tree:Array,resources:Object},setup(f){const u=f,c=_e({state:!1,context:"list"}),m=h(""),g=h(),a=h("link"),d=h(null),v=h(!1),r=A(()=>$(u.tree)),x=A(()=>v.value&&!r.value);function $(e){let n=!1;for(let l of e){if("error"in l){n=!0;break}l.children.length&&(n=$(l.children))}return n}const s=h(u.tree),y=A(()=>s.value.reduce((e,n)=>(e[n.handle]=e[n.handle]||[],e[n.handle].push(n.id),e),{})),I=(e,n)=>(e.forEach(l=>{l.id==d.value.id&&l.handle==d.value.handle&&l.label==d.value.label?(console.log("debugging items",l.id,d.value.id,l.handle,d.value.handle),l.children.push(...n)):l.children.length&&(console.log("nav items have children"),I(l.children,n))}),e),D=e=>{c.state=!1;let n=e.map(l=>{var w;return{label:l[g.value],url:l==null?void 0:l.url,id:l==null?void 0:l.id,handle:a.value,type:((w=u.resources[a.value])==null?void 0:w.title)||(l==null?void 0:l.type),css:l==null?void 0:l.css,external:l==null?void 0:l.external,children:[]}});d.value?s.value=I(s.value,n):s.value=[...s.value,...n],d.value=null,a.value="custom",v.value=!0},p=pe(u.resources,(e,n)=>({name:e.title,action:n}));p.push({name:"Custom Link",action:"custom",divider:!0}),p.push({name:"Remove Item",action:"remove",danger:!0});const j=e=>{e=="custom"?z():F(e),a.value=e},q=e=>{console.log("adding child",e),d.value=e.item,a.value=e.action,e.action=="custom"?z():F(e.action)};function F(e){c.context="list",g.value=u.resources[e].titleField,m.value=`/api/resource/${e}/items`,c.state=!0}const T=h("create"),L=h({}),G={label:"",url:"",css:"",external:!1},z=()=>{T.value="create",L.value={...G},c.context="form",c.state=!0},J=e=>{c.state=!1,g.value="label",e.id||(console.log("check for type",e.url,e.url==""),e.type=e.url==""?"Text":"Link"),T.value=="create"&&D([e]),v.value=!0},K=e=>{console.log("editing item",e),T.value="edit",L.value=e,c.context="form",c.state=!0},P=()=>{fe.post(u.actionUrl,{tree:s.value})};return(e,n)=>{const l=U("Head"),w=ye,Q=U("Link"),O=H,B=Ie,W=ke,X=ve,Y=M,Z=ze,ee=xe,te=Ue,le=ne;return b(),N(R,null,[o(l,{title:f.menuTitle},null,8,["title"]),_("div",Oe,[_("div",Be,[_("div",Re,[_("div",null,[o(Q,{href:f.indexUrl,class:"breadcrumb"},{default:i(()=>[o(w,null,{default:i(()=>[o(t(he))]),_:1}),k("Navigation")]),_:1},8,["href"]),_("h1",He,V(f.menuTitle),1)]),_("div",Me,[o(X,{onCommand:j,class:"mr-2"},{dropdown:i(()=>[o(W,null,{default:i(()=>[(b(!0),N(R,null,ge(f.resources,(C,oe)=>(b(),S(B,{command:oe},{default:i(()=>[k(V(C.title),1)]),_:2},1032,["command"]))),256)),o(B,{command:"custom"},{default:i(()=>[k("Custom Link")]),_:1})]),_:1})]),default:i(()=>[o(O,null,{default:i(()=>[k(" New Item"),o(w,{class:"el-icon--right"},{default:i(()=>[o(t(be))]),_:1})]),_:1})]),_:1}),o(O,{type:"primary",onClick:P,disabled:!t(x)},{default:i(()=>[k("Save Changes")]),_:1},8,["disabled"])])]),t(r)?(b(),N("div",je,[o(Y,{title:"This navigation has errors! Save disabled.",type:"error",effect:"dark","show-icon":"",closable:!1})])):E("",!0),o(Z,{list:t(s),"child-actions":t(p),onAddChild:q,onEditItem:K,onChange:n[0]||(n[0]=C=>v.value=!0),onRemoveItem:n[1]||(n[1]=C=>v.value=!0)},null,8,["list","child-actions"])])]),t(c).state?(b(),S(le,{key:0,style:{width:"400px"},onClose:n[4]||(n[4]=C=>t(c).state=!1)},{default:i(()=>[t(c).context=="list"?(b(),S(ee,{key:0,columns:{title:{label:"Title",sortable:!0}},exclude:t(y)[t(a)],"request-url":t(m),"title-field":t(g),"resource-handle":t(a),onSelected:D,onCancel:n[2]||(n[2]=C=>t(c).state=!1)},null,8,["exclude","request-url","title-field","resource-handle"])):E("",!0),t(c).context=="form"?(b(),S(te,{key:1,mode:t(T),"item-data":t(L),onSaved:J,onClose:n[3]||(n[3]=C=>t(c).state=!1)},null,8,["mode","item-data"])):E("",!0)]),_:1})):E("",!0)],64)}}};export{ut as default};