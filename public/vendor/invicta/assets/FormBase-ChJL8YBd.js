const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/assetField-z5z1CO3u.js","assets/dropdown-menu-BywocuEX.js","assets/vendor-DpzuCX-L.js","assets/vendor-5dkqLkPm.css","assets/Loading-BgLNKlre.js","assets/Loading-Co7eYvO5.css","assets/main-DjFvluOL.js","assets/main-DUQ5G3w0.css","assets/dropdown-menu-4jf60RXO.css","assets/AssetForm-BPtMDpe0.js","assets/AssetForm-CctfFtGL.css","assets/FieldBase-BSGhD4x6.js","assets/field-C_2VJjWP.js","assets/assetField-CtwHbVhF.css","assets/card-if1rWvME.css","assets/blueprintField-D2-_cKkX.js","assets/checkboxGroupField-qr_auNOW.js","assets/checkboxGroupField-DNmEmEf6.css","assets/codeField-B6rsyTof.js","assets/codeField-CFrRrBnm.css","assets/copyField-PRhlCIYq.js","assets/dateField-Ci6jaDAK.js","assets/dateField-B6Nwj7fx.css","assets/dividerField-BvCGwHwK.js","assets/dividerField-Cb-skUuy.css","assets/googlePreviewField-V_TxnjQH.js","assets/googlePreviewField-X1H7GG9J.css","assets/groupSelectField-ZR9f_U2_.js","assets/hiddenField-DcMupirh.js","assets/infoPanelField-CvfOmL3p.js","assets/itemsListField-CdYbO7uV.js","assets/ItemsList-C2rxzAZK.js","assets/vuedraggable.umd-CkP7SAQI.js","assets/vue.runtime.esm-bundler-5zREEY8-.js","assets/ItemsList-Du7UpnpG.css","assets/link-CTQ9-Exe.css","assets/jsonField-DjD-xlwj.js","assets/keyValueField-BcnZ8phh.js","assets/keyValueField-JgmDjP7S.css","assets/linkField-DFE3HpW0.js","assets/metaField-Cl3t-FmB.js","assets/metaField-BS4Wreev.css","assets/numberField-BRcI92yW.js","assets/numberField-D1HGASrn.css","assets/radioGroupField-cec0bmzO.js","assets/radioGroupField-BppKV64B.css","assets/rateField-CjCU7UUD.js","assets/rateField-CAXSqGxf.css","assets/relatedListField-CQhSnZOX.js","assets/relatedSelectField-CbhY-S3w.js","assets/relatedSelectField--pxSjDvT.css","assets/repeaterField-CO2scEqU.js","assets/repeaterField-DBw5Lt23.css","assets/rowField-CKctaLIc.js","assets/selectField-B2D5x8-9.js","assets/slugField-BHS0ZGyA.js","assets/tableField-BzkvXKvL.js","assets/loading-oV0W9nDj.css","assets/tagsField-BJGzBpIU.js","assets/tagsField-CWF3kKbh.css","assets/termsField-eoDqGTmd.js","assets/termsField-C-0YJyLo.css","assets/textEditorField-Bm-6d-1N.js","assets/textEditorField-C47Dhxta.css","assets/textField-c1wQZ1yi.js","assets/textareaField-B-r_Oc-9.js","assets/toggleField-C64yLbVX.js","assets/switch-BVq8NMY0.css","assets/videoField-C2KjL1yJ.js"])))=>i.map(i=>d[i]);
import{a3 as useRouter,j as ref,ae as get,af as set,ag as toRaw,aa as isString,ah as split,y as computed,u as unref,o as openBlock,f as createBlock,w as withCtx,g as createCommentVNode,i as normalizeStyle,ai as shallowRef,d as createElementBlock,I as resolveDynamicComponent,n as normalizeClass,k as createVNode,F as Fragment,p as renderList,aj as mdiTextBoxEditOutline,ak as mdiPlus,h as createBaseVNode,t as toDisplayString,a2 as mdiTranslate,B as createTextVNode,D as ElButton,G as ElDropdownItem,a4 as ElDropdownMenu,H as ElDropdown,r as resolveComponent,a6 as arrow_left_default,a8 as ElIcon,al as onBeforeRouteLeave,am as has,L as onMounted,M as watch,an as onKeyStroke,e as renderSlot,ao as isRef,l as withDirectives,v as vShow,ap as mergeProps,a7 as arrow_down_default,aq as plus_default,ar as ElRadio,as as ElRadioGroup,at as ElPopover,au as ElButtonGroup,av as ElTabPane,aw as ElTabs,ab as ElCard,a0 as ElForm}from"./vendor-DpzuCX-L.js";import{a as _sfc_main$5,d as _sfc_main$6,b as _sfc_main$7}from"./dropdown-menu-BywocuEX.js";/* empty css             */import{_ as __variableDynamicImportRuntimeHelper,a as __vitePreload,b as _sfc_main$8,c as _sfc_main$9}from"./main-DjFvluOL.js";const remoteData=new Map,definedForms=new Map,Invicta$1=window.Invicta,useResourceForm=e=>(definedForms.has(e)||definedForms.set(e,defineResourceForm()),definedForms.get(e)),defineResourceForm=e=>{const a=useRouter(),t=ref(null),r={id:null,handle:null,actionUrl:"",mode:"create",currentLocale:"en",blueprint:{}};let i;const v=ref(!1),y={},k=ref(Invicta$1.errors),n=ref(!1),b=ref(!1);async function f(o,l,h={}){var s,d;if(t.value){Invicta$1.emit("resource-form-ready");return}i=h,r.handle=((s=o.meta)==null?void 0:s.handle)??null,r.id=((d=o.meta)==null?void 0:d.id)??null,r.actionUrl=l,r.mode=o.item?"edit":"create",r.blueprint=o.blueprint;let E=toRaw(o.item)??null;t.value=I(o.blueprint,E),x(),Invicta$1.emit("resource-form-ready")}function _(o){r.currentLocale=o}function I(o,l=null){const h=c=>{let p="path"in c?c.path:c.id;p=p.includes(".")?split(p,".")[0]:p;let u="defaultValue"in c?c.defaultValue:null;return l&&p in l?l[p]:u},E=c=>{c.type=="link"&&(remoteData.has("linkField")||remoteData.set("linkField",c.optionsUrl??"/api/fields/resource-link/options")),c.type=="textEditor"&&(remoteData.has("textEditor")||remoteData.set("textEditor","/api/fields/texteditor/resources")),c.type=="asset"&&(remoteData.has("assetActions")||remoteData.set("assetActions","/api/fields/assets/field-actions")),"options"in c&&isString(c.options)&&c.type!=="terms"&&(remoteData.has(c.options)||remoteData.set(c.options,c.options))},s=(c,p)=>c.reduce((u,m)=>{if(m.fields){let w=m.id?m.type=="repeater"?`${p}.${m.id}.*`:`${p}.${m.id}`:p,D=s(m.fields,w);return{...u,...D}}else if(m.id)if(y[`${p}.${m.id}`]=m.validation?m.validation:"nullable",m.type.includes("related")){let w=h(m);return u[m.id]=w,u}else E(m)},{}),d={},B=c=>c.reduce((p,u)=>{if(u.id){let m="path"in u?u.path:u.id,w=m.includes(".")?split(m,"."):!1,D=w?w.shift():m;w&&(d[D]=d[D]||{});let C=h(u);if(w&&!l&&(C=set(d[D],w,C)),u.type=="toggle"&&typeof C=="number"&&(C=!!C),p[D]=C,u.fields){let $=u.type=="repeater"?`${u.id}.*`:u.id,O=s(u.fields,$);p={...p,...O}}else y[m]=u.validation?u.validation:"nullable";if(w&&u.type.includes("related")){let $=w[w.length-1];p[$]=l?l[$]:null}return E(u),p}else if(u.type=="row"){let m=B(u.fields);p={...p,...m}}return p},{});let V={};return o.fields&&(V=B(o.fields)),o.sidebar&&o.sidebar.fields&&(V={...V,...B(o.sidebar.fields)}),o.sections&&o.sections.forEach(c=>{c.fields&&(V={...V,...B(c.fields)})}),V}function P(o){function l(h){return h.map(E=>E.fields?l(E.fields):(("path"in E?E.path:E.id)==o&&(E.readOnly=!0),E)),h}R(l)}function R(o){r.blueprint.fields&&(r.blueprint.fields=o(r.blueprint.fields)),r.blueprint.sidebar&&r.blueprint.sidebar.fields&&(r.blueprint.sidebar.fields=o(r.blueprint.sidebar.fields)),r.blueprint.sections&&r.blueprint.sections.forEach((l,h)=>{l.fields&&(r.blueprint.sections[h].fields=o(l.fields))})}function x(){for(let[o,l]of remoteData)console.log("getRemoteData",o,l),isString(l)&&Invicta$1.axios.get(l).then(({data:h})=>{remoteData.set(o,h),Invicta$1.emit(l,!0)})}function F(o,l=!1){let h={fields:t.value,validation:y,...i};console.log("we have form submit",h),Invicta$1.axios.post(r.actionUrl,h).then(({data:E})=>{console.log("post submit result",E),console.log("postSubmitAction",o),Invicta$1.message(E.message),k.value={},Invicta$1.emit("resource-form-submitted",{action:o}),b.value=!1,o=="create"&&(t.value=null,l&&a.push({name:"resourceCreate"})),o=="edit"&&l&&a.push({name:"resourceEdit",params:{id:E.item}}),o=="back"&&l&&a.push({name:"resourceIndex"})}).catch(E=>{const{response:s}=E;if(s.status&&s.status==422){let d={};for(const[B,V]of Object.entries(s.data.errors))d[B]=Array.isArray(V)?V[0]:V;Invicta$1.setErrors(d)}})}return{init:f,get(o,l=null){let h=get(t.value,o,l);return h===null&&l!==void 0?l:h},set(o,l){b.value=!0,set(t.value,o,l)},readOnly:v,processing:n,isDirty:b,errors:k,remoteData,formData:t,settings:r,setReadOnly:P,setLocale:_,submit:F}};function getFields(e){return e.reduce((a,t)=>{if(t.fields){let r=getFields(t.fields);return{...a,...r}}else if(t.id)return a[t.id]="",a;return a},{})}const _sfc_main$4={__name:"TextEditorDrawer",props:{formId:String},setup(e){const t=useResourceForm(e.formId),r=computed(()=>t.remoteData.get("textEditor")),i=ref(!1),v=ref("assets"),y={title:{label:"Title",sortable:!0},uri:{label:"Uri"}};let k="media-item-select";Invicta.on("open-media-library",f=>{k=f.name,v.value="assets",i.value=!0}),Invicta.on("open-resource-links",f=>{k=f.name,v.value="items",i.value=!0});function n(f){console.log("selecting asset",f,k),Invicta.emit(k,f),i.value=!1}function b(f){Invicta.emit(k,f),i.value=!1}return(f,_)=>{const I=_sfc_main$5,P=_sfc_main$6,R=_sfc_main$7;return unref(i)?(openBlock(),createBlock(R,{key:0,onClose:_[2]||(_[2]=x=>i.value=!1),style:normalizeStyle({width:unref(v)=="assets"?"80%":"500px"})},{default:withCtx(()=>[unref(v)=="assets"?(openBlock(),createBlock(I,{key:0,onSelected:n,onCancel:_[0]||(_[0]=x=>i.value=!1)})):createCommentVNode("",!0),unref(v)=="items"?(openBlock(),createBlock(P,{key:1,"single-select":!0,select:["uri"],columns:y,resources:unref(r),onSelected:b,onCancel:_[1]||(_[1]=x=>i.value=!1)},null,8,["resources"])):createCommentVNode("",!0)]),_:1},8,["style"])):createCommentVNode("",!0)}}},useFieldCondition=(e,a)=>computed(()=>{let t=get(e,"if",null)||get(e,"if_any",null)||get(e,"if_all",null);if(!t)return!0;if(Array.isArray(t)){if("if_all"in e)return t.every(i=>processCondition(a,i));if("if_any"in e){let r=!1;return t.forEach(i=>{processCondition(a,i)&&(r=!0)}),r}}return processCondition(a,t)});function processCondition(formId,condition){const resourceForm=useResourceForm(formId);let target=resourceForm.get(condition.id);console.log("target",target,condition.id);let operator=prepareOperator(condition.operator),loperand=prepareOperand(target,operator),roperand=prepareOperand(condition.value,operator);if(operator=="in"||operator=="not in")return passesIncludesCondition(roperand,loperand,!operator.includes("not"));let expression=`${loperand} ${operator} ${roperand}`;return console.log("condition expression",expression),eval(expression)}function passesIncludesCondition(e,a,t){const r=e.includes(a);return console.log(`is ${a} includes in ${e}: ${r}`),console.log(`included: ${t}`),t?r:!r}function prepareOperand(e,a){return[">",">=","<","<="].includes(a)?Number(e):isString(e)?JSON.stringify(e.trim()):e}function prepareOperator(e){switch(e){case"==":case"equal":case"equals":case"is":return"==";case"not equals":case"not equal":return"!==";case">":case"more":case"more than":return">";case">=":case"more or equal":case"more or equals":return">=";case"<":case"less":case"less than":return"<";case"<=":case"less or equal":case"less or equals":return"<=";default:return e}return e}const _sfc_main$3={__name:"FormField",props:{formId:String,fieldData:Object,dataPath:String},setup(e){const a=e;let t=shallowRef("textField");a.dataPath&&a.dataPath.includes(".")?split(a.dataPath,".")[0]:a.dataPath;const r=useFieldCondition(a.fieldData,a.formId);if(r)if(Invicta.componentExists(a.fieldData.type))t.value=a.fieldData.type;else{let y=a.fieldData.type.replace("-","");y=y=="group"?"json":y,__variableDynamicImportRuntimeHelper(Object.assign({"./fields/assetField.vue":()=>__vitePreload(()=>import("./assetField-z5z1CO3u.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14])),"./fields/blueprintField.vue":()=>__vitePreload(()=>import("./blueprintField-D2-_cKkX.js"),__vite__mapDeps([15,11,2,3,1,4,5,6,7,8,12,14])),"./fields/checkboxGroupField.vue":()=>__vitePreload(()=>import("./checkboxGroupField-qr_auNOW.js"),__vite__mapDeps([16,11,2,3,1,4,5,6,7,8,12,17,14])),"./fields/codeField.vue":()=>__vitePreload(()=>import("./codeField-B6rsyTof.js"),__vite__mapDeps([18,11,2,3,1,4,5,6,7,8,12,19,14])),"./fields/copyField.vue":()=>__vitePreload(()=>import("./copyField-PRhlCIYq.js"),__vite__mapDeps([20,11,2,3,1,4,5,6,7,8,12,14])),"./fields/dateField.vue":()=>__vitePreload(()=>import("./dateField-Ci6jaDAK.js"),__vite__mapDeps([21,11,2,3,1,4,5,6,7,8,12,22,14])),"./fields/dividerField.vue":()=>__vitePreload(()=>import("./dividerField-BvCGwHwK.js"),__vite__mapDeps([23,2,3,24])),"./fields/googlePreviewField.vue":()=>__vitePreload(()=>import("./googlePreviewField-V_TxnjQH.js"),__vite__mapDeps([25,2,3,1,4,5,6,7,8,26,14])),"./fields/groupSelectField.vue":()=>__vitePreload(()=>import("./groupSelectField-ZR9f_U2_.js"),__vite__mapDeps([27,11,2,3,1,4,5,6,7,8,12,14])),"./fields/hiddenField.vue":()=>__vitePreload(()=>import("./hiddenField-DcMupirh.js"),__vite__mapDeps([28,12,2,3,1,4,5,6,7,8,14])),"./fields/infoPanelField.vue":()=>__vitePreload(()=>import("./infoPanelField-CvfOmL3p.js"),__vite__mapDeps([29,2,3])),"./fields/itemsListField.vue":()=>__vitePreload(()=>import("./itemsListField-CdYbO7uV.js"),__vite__mapDeps([30,11,2,3,1,4,5,6,7,8,12,31,32,33,34,35,14])),"./fields/jsonField.vue":()=>__vitePreload(()=>import("./jsonField-DjD-xlwj.js"),__vite__mapDeps([36,12,2,3,1,4,5,6,7,8,14])),"./fields/keyValueField.vue":()=>__vitePreload(()=>import("./keyValueField-BcnZ8phh.js"),__vite__mapDeps([37,11,2,3,1,4,5,6,7,8,12,38,14])),"./fields/linkField.vue":()=>__vitePreload(()=>import("./linkField-DFE3HpW0.js"),__vite__mapDeps([39,11,2,3,1,4,5,6,7,8,12,14])),"./fields/metaField.vue":()=>__vitePreload(()=>import("./metaField-Cl3t-FmB.js"),__vite__mapDeps([40,11,2,3,1,4,5,6,7,8,12,41,14])),"./fields/numberField.vue":()=>__vitePreload(()=>import("./numberField-BRcI92yW.js"),__vite__mapDeps([42,11,2,3,1,4,5,6,7,8,12,43,14])),"./fields/radioGroupField.vue":()=>__vitePreload(()=>import("./radioGroupField-cec0bmzO.js"),__vite__mapDeps([44,11,2,3,1,4,5,6,7,8,12,45,14])),"./fields/rateField.vue":()=>__vitePreload(()=>import("./rateField-CjCU7UUD.js"),__vite__mapDeps([46,11,2,3,1,4,5,6,7,8,12,47,14])),"./fields/relatedListField.vue":()=>__vitePreload(()=>import("./relatedListField-CQhSnZOX.js"),__vite__mapDeps([48,11,2,3,1,4,5,6,7,8,12,31,32,33,34,35,14])),"./fields/relatedSelectField.vue":()=>__vitePreload(()=>import("./relatedSelectField-CbhY-S3w.js"),__vite__mapDeps([49,11,2,3,1,4,5,6,7,8,12,50,14])),"./fields/repeaterField.vue":()=>__vitePreload(()=>import("./repeaterField-CO2scEqU.js"),__vite__mapDeps([51,11,2,3,1,4,5,6,7,8,12,32,33,52,14])),"./fields/rowField.vue":()=>__vitePreload(()=>import("./rowField-CKctaLIc.js"),__vite__mapDeps([53,2,3,1,4,5,6,7,8,14])),"./fields/selectField.vue":()=>__vitePreload(()=>import("./selectField-B2D5x8-9.js"),__vite__mapDeps([54,11,2,3,1,4,5,6,7,8,12,14])),"./fields/slugField.vue":()=>__vitePreload(()=>import("./slugField-BHS0ZGyA.js"),__vite__mapDeps([55,11,2,3,1,4,5,6,7,8,12,14])),"./fields/tableField.vue":()=>__vitePreload(()=>import("./tableField-BzkvXKvL.js"),__vite__mapDeps([56,2,3,1,4,5,6,7,8,57])),"./fields/tagsField.vue":()=>__vitePreload(()=>import("./tagsField-BJGzBpIU.js"),__vite__mapDeps([58,11,2,3,1,4,5,6,7,8,12,59,14])),"./fields/termsField.vue":()=>__vitePreload(()=>import("./termsField-eoDqGTmd.js"),__vite__mapDeps([60,11,2,3,1,4,5,6,7,8,12,61,14])),"./fields/textEditorField.vue":()=>__vitePreload(()=>import("./textEditorField-Bm-6d-1N.js"),__vite__mapDeps([62,11,2,3,1,4,5,6,7,8,12,33,63,14])),"./fields/textField.vue":()=>__vitePreload(()=>import("./textField-c1wQZ1yi.js"),__vite__mapDeps([64,11,2,3,1,4,5,6,7,8,12,14])),"./fields/textareaField.vue":()=>__vitePreload(()=>import("./textareaField-B-r_Oc-9.js"),__vite__mapDeps([65,11,2,3,1,4,5,6,7,8,12,14])),"./fields/toggleField.vue":()=>__vitePreload(()=>import("./toggleField-C64yLbVX.js"),__vite__mapDeps([66,11,2,3,1,4,5,6,7,8,12,67,14])),"./fields/videoField.vue":()=>__vitePreload(()=>import("./videoField-C2KjL1yJ.js"),__vite__mapDeps([68,11,2,3,1,4,5,6,7,8,12,14]))}),`./fields/${y}Field.vue`,3).then(k=>t.value=k.default).catch(k=>console.log(k))}const{type:i}=a.fieldData,v=()=>i=="divider"&&a.fieldData.section?"section":i=="row"?["field-row-full","inline-fields"]:i=="hidden"?"hidden":[`field-row-${get(a.fieldData,"width","full")}`,get(a.fieldData,"customClass","")];return(y,k)=>unref(r)?(openBlock(),createElementBlock("div",{key:0,class:normalizeClass(v())},[(openBlock(),createBlock(resolveDynamicComponent(unref(t)),{"form-id":e.formId,data:e.fieldData,path:e.dataPath},null,8,["form-id","data","path"]))],2)):createCommentVNode("",!0)}},_hoisted_1$1={class:"mx-2"},_hoisted_2$1={class:"ml-2"},_sfc_main$2={__name:"Localizations",props:{localizations:Object,formId:String,resourceUrl:String},setup(e){const a=e,t=useRouter(),r=useResourceForm(a.formId),i=computed(()=>{let{localizations:n}=a;return Object.values(n).filter(b=>b.origin!==null)[0].origin}),v=Object.values(a.localizations).filter(n=>n.current)[0].iso,y=n=>n.origin?"Original":n.current?"Current translation":`${n.translation?"Edit":"Create"} ${n.name} translation`,k=n=>{console.log("i have this.",n);let b=n.translation?n.translation:n.origin?n.origin:null,f=r.settings.handle;if(b){let _=t.resolve({name:"resourceEdit",params:{id:b,handle:f}});window.location.href=`${_.href}?locale=${n.iso}`}else Invicta.axios.post(`/api/resource/${f}/${i.value}/localize/${n.iso}`).then(({data:_})=>{console.log("I have created localized version of this page",_);let I=t.resolve({name:"resourceEdit",params:{id:_,handle:f}});window.location.href=I.href})};return(n,b)=>{const f=_sfc_main$8,_=_sfc_main$9,I=ElButton,P=ElDropdownItem,R=ElDropdownMenu,x=ElDropdown;return openBlock(),createBlock(x,{class:"mr-4",onCommand:k},{dropdown:withCtx(()=>[createVNode(R,null,{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(e.localizations,F=>(openBlock(),createElementBlock(Fragment,{key:F.iso},[F.current?createCommentVNode("",!0):(openBlock(),createBlock(P,{key:0,command:F,title:y(F)},{default:withCtx(()=>[F.translation||F.origin?(openBlock(),createBlock(f,{key:0,icon:unref(mdiTextBoxEditOutline),width:18,class:"opacity-50"},null,8,["icon"])):(openBlock(),createBlock(f,{key:1,icon:unref(mdiPlus),width:18},null,8,["icon"])),createBaseVNode("span",_hoisted_2$1,toDisplayString(F.name),1)]),_:2},1032,["command","title"]))],64))),128))]),_:1})]),default:withCtx(()=>[createVNode(I,{size:"small",text:"",type:"info"},{default:withCtx(()=>[createVNode(f,{icon:unref(mdiTranslate),width:15},null,8,["icon"]),b[0]||(b[0]=createTextVNode()),createBaseVNode("span",_hoisted_1$1,toDisplayString(e.localizations[unref(v)].name),1),createVNode(_,{country:e.localizations[unref(v)].flag},null,8,["country"])]),_:1})]),_:1})}}},_sfc_main$1={__name:"BackLink",props:{data:Object},setup(e){return(a,t)=>{const r=ElIcon,i=resolveComponent("router-link");return openBlock(),createBlock(i,{to:e.data,class:"breadcrumb"},{default:withCtx(()=>[createVNode(r,null,{default:withCtx(()=>[createVNode(unref(arrow_left_default))]),_:1}),createTextVNode(" "+toDisplayString(e.data.text),1)]),_:1},8,["to"])}}},_hoisted_1={key:0,class:"flex items-end justify-between mb-4"},_hoisted_2={class:"resource-title"},_hoisted_3={class:"mb-1"},_hoisted_4=["href"],_hoisted_5=["innerHTML"],_hoisted_6=["innerHTML"],_hoisted_7={class:"resource-actions flex items-center ml-auto"},_hoisted_8={class:"unsaved-indicator"},_hoisted_9={key:0,class:"fieldset"},_hoisted_10={key:1},_hoisted_11={key:0,class:"fieldset"},_hoisted_12={key:0,class:"sidebar"},_hoisted_13={key:0,class:"fieldset"},_sfc_main={__name:"FormBase",props:{formId:String,resource:Object,breadcrumb:Object,actionUrl:String,headless:{type:Boolean,default:!1},postSubmitActions:{type:Array,default:["back","edit","create"]},params:Object,readOnly:{type:Boolean,default:!1},pageForm:{type:Boolean,default:!1}},emits:["submitted","form-ready"],setup(e,{emit:a}){const t=e,r=a,i=useResourceForm(t.formId);i.readOnly=t.readOnly;const{resource:v,actionUrl:y,params:k}=t;i.init(v,y,k),r("form-ready"),onBeforeRouteLeave((s,d)=>{if(console.log("trying to leave",i.isDirty),i.isDirty.value&&!window.confirm("Do you really want to leave? you have unsaved changes!"))return!1}),Invicta.on("lock-form",s=>{console.log("I hear a call to lock form",s,t.formId),s==t.formId&&(i.data.readOnly=!0)}),Invicta.on("unlock-form",s=>{s==t.formId&&(i.data.readOnly=!1)});const n=i.settings.blueprint,b=get(n.settings,"form",{"label-position":"top"}),f=has(n,"sections");let _=ref(null),I=null;f&&n.sections.length&&("tabs"in n.settings?(_.value="active"in n.settings.tabs?n.settings.tabs.active:n.sections[0].id,I="type"in n.settings.tabs?n.settings.tabs.type:"border-card"):_.value=n.sections[0].id);const P=has(n,"sidebar"),R=computed(()=>{let s=t.headless?"w-full":P?"w-sidebar":"w-compact";return b.class||s}),x=computed(()=>{if(t.headless)return"";let s=t.resource.meta,d=t.resource.item??null,B=s.pageTitle;return d&&s.titleField!=="id"&&s.titleField in d&&(B=get(d,s.titleField)),d&&"published"in d&&(B=`<i class="icon-status ${get(d,"published")?"success":""} mr-2"></i> ${B}`),B}),F=computed(()=>i.processing.value||!i.isDirty.value);computed(()=>t.postSubmitActions[0]);const o=ref(t.postSubmitActions[0]),l={back:{icon:arrow_left_default,button:"Save & Back",option:"Go back"},close:{icon:arrow_left_default,button:"Save & Close",option:"Close Form"},edit:{icon:arrow_down_default,button:"Save & Stay",option:"Continue Editing"},create:{icon:plus_default,button:"Save & New",option:"Add New Item"}};onMounted(()=>{if(window.location.hash.length>0){let d=window.location.hash.substr(1)||"";_.value=d}let s=Invicta.remember("post-submit-action");s&&t.postSubmitActions.includes(s)&&(o.value=s)}),watch(_,s=>{t.pageForm&&window.history.pushState(window.history.state,null,`#${s}`)}),watch(o,s=>Invicta.remember("post-submit-action",s));const h=()=>{i.submit(o.value,t.pageForm)},E=()=>r("submitted",{action:o.value});return Invicta.on("resource-form-ready",()=>console.log("form base form ready event")),Invicta.on("resource-form-submitted",E),onKeyStroke("Enter",s=>{t.headless&&(s.preventDefault(),h())}),(s,d)=>{const B=_sfc_main$1,V=_sfc_main$2,c=ElButton,p=ElRadio,u=ElRadioGroup,m=ElPopover,w=ElButtonGroup,D=_sfc_main$3,C=ElTabPane,$=ElTabs,O=ElCard,T=_sfc_main$4,A=ElForm;return openBlock(),createBlock(A,mergeProps({class:["invicta-form",unref(R)]},unref(b)),{default:withCtx(()=>[e.headless?createCommentVNode("",!0):(openBlock(),createElementBlock("div",_hoisted_1,[createBaseVNode("div",_hoisted_2,[e.breadcrumb?(openBlock(),createBlock(B,{key:0,class:"breadcrumb",data:e.breadcrumb},null,8,["data"])):createCommentVNode("",!0),createBaseVNode("h1",_hoisted_3,[unref(v).meta.itemUrl?(openBlock(),createElementBlock("a",{key:0,class:"flex items-center",href:unref(v).meta.itemUrl,title:"Visit URL",target:"_blank"},[createBaseVNode("span",{class:"flex items-center",innerHTML:unref(x)},null,8,_hoisted_5),d[2]||(d[2]=createBaseVNode("svg",{class:"ml-2",viewBox:"0 0 24 24",width:"22"},[createBaseVNode("path",{fill:"currentColor",d:"M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"})],-1))],8,_hoisted_4)):(openBlock(),createElementBlock("span",{key:1,class:"flex items-center",innerHTML:unref(x)},null,8,_hoisted_6))])]),createBaseVNode("div",_hoisted_7,[unref(v).localizations?(openBlock(),createBlock(V,{key:0,localizations:unref(v).localizations,"form-id":e.formId,"resource-url":unref(v).meta.indexUrl},null,8,["localizations","form-id","resource-url"])):createCommentVNode("",!0),renderSlot(s.$slots,"form-actions"),createVNode(w,{class:"relative"},{default:withCtx(()=>[createVNode(c,{type:"primary",size:e.pageForm?"large":"default",onClick:h,disabled:unref(F)},{default:withCtx(()=>[createTextVNode(toDisplayString(l[unref(o)].button),1)]),_:1},8,["size","disabled"]),createVNode(m,{title:"After Saving",teleported:!0},{reference:withCtx(()=>[createVNode(c,{disabled:unref(F),type:"primary",size:e.pageForm?"large":"default",icon:l[unref(o)].icon},null,8,["disabled","size","icon"])]),default:withCtx(()=>[createVNode(u,{modelValue:unref(o),"onUpdate:modelValue":d[0]||(d[0]=g=>isRef(o)?o.value=g:null)},{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(e.postSubmitActions,g=>(openBlock(),createBlock(p,{value:g,label:g},{default:withCtx(()=>[createTextVNode(toDisplayString(l[g].option),1)]),_:2},1032,["value","label"]))),256))]),_:1},8,["modelValue"])]),_:1}),withDirectives(createBaseVNode("sup",_hoisted_8,null,512),[[vShow,unref(i).isDirty.value]])]),_:1})])])),createBaseVNode("div",{class:normalizeClass(["form-wrapper",{card:unref(I)=="card"}])},[createBaseVNode("div",{class:normalizeClass(["main-panel",{"el-card is-always-shadow":!unref(f)&&!e.headless,"has-sidebar":unref(P)}])},[unref(f)?(openBlock(),createBlock($,mergeProps({key:0,modelValue:unref(_),"onUpdate:modelValue":d[1]||(d[1]=g=>isRef(_)?_.value=g:_=g),type:"border-card"},unref(n).settings.tabs),{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(unref(n).sections,g=>(openBlock(),createBlock(C,{label:g.title,name:g.id},{default:withCtx(()=>[g.fields?(openBlock(),createElementBlock("div",_hoisted_9,[(openBlock(!0),createElementBlock(Fragment,null,renderList(g.fields,(L,N)=>(openBlock(),createBlock(D,{"form-id":e.formId,"field-data":L,"data-path":L.id},null,8,["form-id","field-data","data-path"]))),256))])):createCommentVNode("",!0)]),_:2},1032,["label","name"]))),256))]),_:1},16,["modelValue"])):(openBlock(),createElementBlock("div",_hoisted_10,[unref(n).fields?(openBlock(),createElementBlock("div",_hoisted_11,[(openBlock(!0),createElementBlock(Fragment,null,renderList(unref(n).fields,(g,L)=>(openBlock(),createBlock(D,{"form-id":e.formId,"field-data":g,"data-path":g.id},null,8,["form-id","field-data","data-path"]))),256))])):createCommentVNode("",!0)]))],2),unref(P)?(openBlock(),createElementBlock("div",_hoisted_12,[createVNode(O,null,{default:withCtx(()=>[unref(n).sidebar.fields?(openBlock(),createElementBlock("div",_hoisted_13,[(openBlock(!0),createElementBlock(Fragment,null,renderList(unref(n).sidebar.fields,(g,L)=>(openBlock(),createBlock(D,{"form-id":e.formId,"field-data":g,"data-path":g.id},null,8,["form-id","field-data","data-path"]))),256))])):createCommentVNode("",!0)]),_:1})])):createCommentVNode("",!0)],2),createVNode(T,{"form-id":e.formId},null,8,["form-id"])]),_:3},16,["class"])}}};export{_sfc_main as _,_sfc_main$1 as a,useFieldCondition as b,_sfc_main$3 as c,getFields as g,useResourceForm as u};
