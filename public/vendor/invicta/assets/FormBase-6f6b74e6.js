import{ai as useRouter,j as ref,an as get,ao as set,a9 as isString,ap as split,y as computed,aq as shallowRef,u as unref,o as openBlock,d as createElementBlock,f as createBlock,U as resolveDynamicComponent,n as normalizeClass,g as createCommentVNode,w as withCtx,k as createVNode,F as Fragment,p as renderList,h as createBaseVNode,J as createTextVNode,t as toDisplayString,ah as mdiTranslate,I as ElButton,L as ElDropdownItem,a7 as ElDropdownMenu,M as ElDropdown,r as resolveComponent,a4 as arrow_left_default,a6 as ElIcon,ar as onBeforeRouteLeave,as as has,B as onMounted,O as watch,at as onKeyStroke,e as renderSlot,ae as isRef,l as withDirectives,v as vShow,au as mergeProps,a5 as arrow_down_default,av as plus_default,aw as ElRadio,ax as ElRadioGroup,ay as ElPopover,ad as ElButtonGroup,az as ElTabPane,aA as ElTabs,aa as ElCard,a0 as ElForm}from"./vendor-e43ae8f2.js";/* empty css                      *//* empty css             */import{_ as __vitePreload,b as _sfc_main$4}from"./main-33d5bcdf.js";import{_ as __variableDynamicImportRuntimeHelper}from"./dynamic-import-helper-be004503.js";/* empty css             */const tabs="",tabPane="",remoteData=new Map,definedForms=new Map,Invicta$1=window.Invicta,useResourceForm=t=>(definedForms.has(t)||definedForms.set(t,defineResourceForm()),definedForms.get(t)),defineResourceForm=t=>{const i=useRouter(),e=ref(null),r={id:null,handle:null,actionUrl:"",mode:"create",currentLocale:"en",blueprint:{}};let d;const E=ref(!1),g={},V=ref(Invicta$1.errors),n=ref(!1),b=ref(!1);async function B(o,s,m={}){var u,v;if(e.value){Invicta$1.emit("resource-form-ready");return}d=m,r.handle=((u=o.meta)==null?void 0:u.handle)??null,r.id=((v=o.meta)==null?void 0:v.id)??null,r.actionUrl=s,r.mode=o.item?"edit":"create",r.blueprint=o.blueprint;let a=o.item??null;e.value=D(o.blueprint,a),await y(),Invicta$1.emit("resource-form-ready")}function h(o){r.currentLocale=o}function D(o,s=null){const m=l=>{let _="path"in l?l.path:l.id;_=_.includes(".")?split(_,".")[0]:_;let c="defaultValue"in l?l.defaultValue:null;return s&&_ in s?s[_]:c},a=l=>{l.type=="link"&&(remoteData.has("linkField")||remoteData.set("linkField",l.optionsUrl??"/api/fields/resource-link/options")),l.type=="textEditor"&&(remoteData.has("textEditor")||remoteData.set("textEditor","/api/fields/texteditor/resources")),l.type=="asset"&&(remoteData.has("assetActions")||remoteData.set("assetActions","/api/fields/assets/field-actions")),"options"in l&&isString(l.options)&&l.type!=="terms"&&(remoteData.has(l.options)||remoteData.set(l.options,l.options))},u=(l,_)=>l.reduce((c,f)=>{if(f.fields){let w=f.id?`${_}.${f.id}`:_,P=u(f.fields,w);return{...c,...P}}else if(f.id)if(f.type.includes("related")){let w=m(f);return c[f.id]=w,c}else g[`${_}.${f.id}`]=f.validation?f.validation:"nullable",a(f)},{}),v=l=>l.reduce((_,c)=>{if(c.id){let f="path"in c?c.path:c.id,w=f.includes(".")?split(f,"."):!1,P=w?w[0]:f,I=m(c);if(c.type=="toggle"&&typeof I=="number"&&(I=!!I),_[P]=I,c.fields){let C=u(c.fields,c.id);_={..._,...C}}else g[f]=c.validation?c.validation:"nullable";if(w&&c.type.includes("related")){let C=w[w.length-1];_[C]=s?s[C]:null}return a(c),_}else if(c.type=="row"){let f=v(c.fields);_={..._,...f}}return _},{});let k={};return o.fields&&(k=v(o.fields)),o.sidebar&&o.sidebar.fields&&(k={...k,...v(o.sidebar.fields)}),o.sections&&o.sections.forEach(l=>{l.fields&&(k={...k,...v(l.fields)})}),k}function F(o){function s(m){return m.map(a=>a.fields?s(a.fields):(("path"in a?a.path:a.id)==o&&(a.readOnly=!0),a)),m}R(s)}function R(o){r.blueprint.fields&&(r.blueprint.fields=o(r.blueprint.fields)),r.blueprint.sidebar&&r.blueprint.sidebar.fields&&(r.blueprint.sidebar.fields=o(r.blueprint.sidebar.fields)),r.blueprint.sections&&r.blueprint.sections.forEach((s,m)=>{s.fields&&(r.blueprint.sections[m].fields=o(s.fields))})}function y(){for(let[o,s]of remoteData)console.log("getRemoteData",o,s),isString(s)&&Invicta$1.axios.get(s).then(({data:m})=>{remoteData.set(o,m)})}function L(o,s=!1){let m={fields:e.value,validation:g,...d};console.log("we have form submit",m),Invicta$1.axios.post(r.actionUrl,m).then(({data:a})=>{console.log("post submit result",a),Invicta$1.message(a.message),Invicta$1.emit("resource-form-submitted"),b.value=!1,o!=="edit"&&(e.value=null),o=="create"&&s&&i.push({name:"resourceCreate"}),o=="back"&&s&&i.go(-1)}).catch(({response:a})=>{if(console.log("api submit errors",a),a.status&&a.status==422){let u={};for(const[v,k]of Object.entries(a.data.errors))u[v]=Array.isArray(k)?k[0]:k;Invicta$1.setErrors(u)}})}return{init:B,get(o,s=null){let m=get(e.value,o,s);return!m&&s?s:m},set(o,s){b.value=!0,set(e.value,o,s)},readOnly:E,processing:n,isDirty:b,errors:V,remoteData,formData:e,settings:r,setReadOnly:F,setLocale:h,submit:L}};function getFields(t){return t.reduce((i,e)=>{if(e.fields){let r=getFields(e.fields);return{...i,...r}}else if(e.id)return i[e.id]="",i;return i},{})}const useFieldCondition=(t,i)=>computed(()=>{let e=get(t,"if",null)||get(t,"if_any",null)||get(t,"if_all",null);if(!e)return!0;if(Array.isArray(e)){if("if_all"in t)return e.every(d=>processCondition(i,d));if("if_any"in t){let r=!1;return e.forEach(d=>{processCondition(i,d)&&(r=!0)}),r}}return processCondition(i,e)});function processCondition(formId,condition){const resourceForm=useResourceForm(formId);let target=resourceForm.get(condition.id);console.log("target",target,condition.id);let operator=prepareOperator(condition.operator),loperand=prepareOperand(target,operator),roperand=prepareOperand(condition.value,operator);if(operator=="in"||operator=="not in")return passesIncludesCondition(roperand,loperand,!operator.includes("not"));let expression=`${loperand} ${operator} ${roperand}`;return console.log("condition expression",expression),eval(expression)}function passesIncludesCondition(t,i,e){const r=t.includes(i);return console.log(`is ${i} includes in ${t}: ${r}`),console.log(`included: ${e}`),e?r:!r}function prepareOperand(t,i){return[">",">=","<","<="].includes(i)?Number(t):isString(t)?JSON.stringify(t.trim()):t}function prepareOperator(t){switch(t){case"==":case"equal":case"equals":case"is":return"==";case"not equals":case"not equal":return"!==";case">":case"more":case"more than":return">";case">=":case"more or equal":case"more or equals":return">=";case"<":case"less":case"less than":return"<";case"<=":case"less or equal":case"less or equals":return"<=";default:return t}return t}const _sfc_main$3={__name:"FormField",props:{formId:String,fieldData:Object,dataPath:String},setup(t){const i=t;let e=shallowRef("textField");i.dataPath&&i.dataPath.includes(".")?split(i.dataPath,".")[0]:i.dataPath;const r=useFieldCondition(i.fieldData,i.formId);if(r)if(Invicta.componentExists(i.fieldData.type))e.value=i.fieldData.type;else{let g=i.fieldData.type.replace("-","");g=g=="group"?"json":g,__variableDynamicImportRuntimeHelper(Object.assign({"./fields/assetField.vue":()=>__vitePreload(()=>import("./assetField-15c8f91f.js"),["assets/assetField-15c8f91f.js","assets/main-33d5bcdf.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/main-c03ffced.css","assets/AssetSelector-db5007bb.js","assets/resource-3342f103.js","assets/Loading-8b3af1c7.js","assets/Loading-f263c3e6.css","assets/checkbox-8e4b7931.css","assets/functions-c7eedc44.js","assets/resource-2ec94ee7.css","assets/icon-c883f2bf.css","assets/select-b04604b5.css","assets/GridView-f641e44a.js","assets/GridView-fc47c4d7.css","assets/progress-72ebe088.css","assets/AssetSelector-bb222d60.css","assets/FieldBase-b9b0f427.js","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/dynamic-import-helper-be004503.js","assets/assetField-1fefe6fa.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css"]),"./fields/blueprintField.vue":()=>__vitePreload(()=>import("./blueprintField-da5b2ee3.js"),["assets/blueprintField-da5b2ee3.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/select-b04604b5.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/checkboxGroupField.vue":()=>__vitePreload(()=>import("./checkboxGroupField-7ed07e63.js"),["assets/checkboxGroupField-7ed07e63.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/checkboxGroupField-64672769.css","assets/checkbox-8e4b7931.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/codeField.vue":()=>__vitePreload(()=>import("./codeField-74d7f4c7.js"),["assets/codeField-74d7f4c7.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/functions-c7eedc44.js","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/codeField-7fc921d6.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/copyField.vue":()=>__vitePreload(()=>import("./copyField-a6f1c824.js"),["assets/copyField-a6f1c824.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/dateField.vue":()=>__vitePreload(()=>import("./dateField-9ae2085a.js"),["assets/dateField-9ae2085a.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/dateField-effb14de.css","assets/date-picker-45200c59.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/dividerField.vue":()=>__vitePreload(()=>import("./dividerField-0ce4fb29.js"),["assets/dividerField-0ce4fb29.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/dividerField-f4d3946e.css"]),"./fields/googlePreviewField.vue":()=>__vitePreload(()=>import("./googlePreviewField-68472b02.js"),["assets/googlePreviewField-68472b02.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/googlePreviewField-dfed5c47.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/hiddenField.vue":()=>__vitePreload(()=>import("./hiddenField-a6642b8b.js"),["assets/hiddenField-a6642b8b.js","assets/field-ac33109e.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/infoPanelField.vue":()=>__vitePreload(()=>import("./infoPanelField-1060e3f6.js"),["assets/infoPanelField-1060e3f6.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css"]),"./fields/itemsListField.vue":()=>__vitePreload(()=>import("./itemsListField-8829d049.js"),["assets/itemsListField-8829d049.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/ItemsList-0b13fedf.js","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/ItemsSelector-e3e2c908.js","assets/resource-3342f103.js","assets/Loading-8b3af1c7.js","assets/Loading-f263c3e6.css","assets/checkbox-8e4b7931.css","assets/functions-c7eedc44.js","assets/resource-2ec94ee7.css","assets/icon-c883f2bf.css","assets/select-b04604b5.css","assets/Filters-40de431b.js","assets/Filters-03608747.css","assets/date-picker-45200c59.css","assets/vuedraggable.umd-67ae588c.js","assets/vue.runtime.esm-bundler-c3a309ec.js","assets/ItemsList-f63bf8fa.css","assets/link-790eddeb.css","assets/dynamic-import-helper-be004503.js","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css"]),"./fields/jsonField.vue":()=>__vitePreload(()=>import("./jsonField-0e305c36.js"),["assets/jsonField-0e305c36.js","assets/field-ac33109e.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/keyValueField.vue":()=>__vitePreload(()=>import("./keyValueField-888eb72a.js"),["assets/keyValueField-888eb72a.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/keyValueField-ec387ca6.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/linkField.vue":()=>__vitePreload(()=>import("./linkField-5a200d37.js"),["assets/linkField-5a200d37.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/select-b04604b5.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/metaField.vue":()=>__vitePreload(()=>import("./metaField-01802f90.js"),["assets/metaField-01802f90.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/metaField-5e4d3e63.css","assets/progress-72ebe088.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/numberField.vue":()=>__vitePreload(()=>import("./numberField-6b500f29.js"),["assets/numberField-6b500f29.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/numberField-1c2c372a.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/rateField.vue":()=>__vitePreload(()=>import("./rateField-a7f8a075.js"),["assets/rateField-a7f8a075.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/rateField-de1fed42.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/relatedListField.vue":()=>__vitePreload(()=>import("./relatedListField-1ca69186.js"),["assets/relatedListField-1ca69186.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/ItemsList-0b13fedf.js","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/ItemsSelector-e3e2c908.js","assets/resource-3342f103.js","assets/Loading-8b3af1c7.js","assets/Loading-f263c3e6.css","assets/checkbox-8e4b7931.css","assets/functions-c7eedc44.js","assets/resource-2ec94ee7.css","assets/icon-c883f2bf.css","assets/select-b04604b5.css","assets/Filters-40de431b.js","assets/Filters-03608747.css","assets/date-picker-45200c59.css","assets/vuedraggable.umd-67ae588c.js","assets/vue.runtime.esm-bundler-c3a309ec.js","assets/ItemsList-f63bf8fa.css","assets/link-790eddeb.css","assets/dynamic-import-helper-be004503.js","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css"]),"./fields/relatedSelectField.vue":()=>__vitePreload(()=>import("./relatedSelectField-7aa46a3b.js"),["assets/relatedSelectField-7aa46a3b.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/relatedSelectField-f4b990d3.css","assets/select-b04604b5.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/repeaterField.vue":()=>__vitePreload(()=>import("./repeaterField-93bc00b2.js"),["assets/repeaterField-93bc00b2.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/vuedraggable.umd-67ae588c.js","assets/vue.runtime.esm-bundler-c3a309ec.js","assets/dynamic-import-helper-be004503.js","assets/repeaterField-72fbdec8.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/rowField.vue":()=>__vitePreload(()=>import("./rowField-178be2c7.js"),["assets/rowField-178be2c7.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/selectField.vue":()=>__vitePreload(()=>import("./selectField-bcfb1fcb.js"),["assets/selectField-bcfb1fcb.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/select-b04604b5.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/slugField.vue":()=>__vitePreload(()=>import("./slugField-38388c40.js"),["assets/slugField-38388c40.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/tableField.vue":()=>__vitePreload(()=>import("./tableField-59f23153.js"),["assets/tableField-59f23153.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/resource-3342f103.js","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/Loading-8b3af1c7.js","assets/Loading-f263c3e6.css","assets/checkbox-8e4b7931.css","assets/functions-c7eedc44.js","assets/resource-2ec94ee7.css","assets/icon-c883f2bf.css","assets/select-b04604b5.css","assets/Filters-40de431b.js","assets/Filters-03608747.css","assets/date-picker-45200c59.css","assets/loading-4b56e1a7.css"]),"./fields/tagsField.vue":()=>__vitePreload(()=>import("./tagsField-5b531345.js"),["assets/tagsField-5b531345.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/tagsField-5bdf7faf.css","assets/icon-c883f2bf.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css"]),"./fields/termsField.vue":()=>__vitePreload(()=>import("./termsField-a97bf2d5.js"),["assets/termsField-a97bf2d5.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/termsField-02d6246d.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/textEditorField.vue":()=>__vitePreload(()=>import("./textEditorField-7cb5e6d4.js"),["assets/textEditorField-7cb5e6d4.js","assets/main-33d5bcdf.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/main-c03ffced.css","assets/ItemsSelector-e3e2c908.js","assets/resource-3342f103.js","assets/Loading-8b3af1c7.js","assets/Loading-f263c3e6.css","assets/checkbox-8e4b7931.css","assets/functions-c7eedc44.js","assets/resource-2ec94ee7.css","assets/icon-c883f2bf.css","assets/select-b04604b5.css","assets/Filters-40de431b.js","assets/Filters-03608747.css","assets/date-picker-45200c59.css","assets/AssetSelector-db5007bb.js","assets/GridView-f641e44a.js","assets/GridView-fc47c4d7.css","assets/progress-72ebe088.css","assets/AssetSelector-bb222d60.css","assets/FieldBase-b9b0f427.js","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/vue.runtime.esm-bundler-c3a309ec.js","assets/dynamic-import-helper-be004503.js","assets/textEditorField-328cc2ba.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css"]),"./fields/textField.vue":()=>__vitePreload(()=>import("./textField-0492ce8d.js"),["assets/textField-0492ce8d.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/textareaField.vue":()=>__vitePreload(()=>import("./textareaField-56908813.js"),["assets/textareaField-56908813.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/toggleField.vue":()=>__vitePreload(()=>import("./toggleField-8f5a5621.js"),["assets/toggleField-8f5a5621.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/switch-52ab10b3.css","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/videoField.vue":()=>__vitePreload(()=>import("./videoField-1dc26925.js"),["assets/videoField-1dc26925.js","assets/FieldBase-b9b0f427.js","assets/vendor-e43ae8f2.js","assets/vendor-dd464266.css","assets/field-ac33109e.js","assets/form-item-e3b0c442.css","assets/main-33d5bcdf.js","assets/main-c03ffced.css","assets/dynamic-import-helper-be004503.js","assets/dropdown-menu-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"])}),`./fields/${g}Field.vue`).then(V=>e.value=V.default).catch(V=>console.log(V))}const{type:d}=i.fieldData,E=()=>d=="divider"&&i.fieldData.section?"section":d=="row"?["field-row-full","inline-fields"]:d=="hidden"?"hidden":[`field-row-${get(i.fieldData,"width","full")}`,get(i.fieldData,"customClass","")];return(g,V)=>unref(r)?(openBlock(),createElementBlock("div",{key:0,class:normalizeClass(E())},[(openBlock(),createBlock(resolveDynamicComponent(unref(e)),{"form-id":t.formId,data:t.fieldData,path:t.dataPath},null,8,["form-id","data","path"]))],2)):createCommentVNode("",!0)}},popover="",radioGroup="",radio="",_hoisted_1$1={class:"ml-2"},_sfc_main$2={__name:"Localizations",props:{localizations:Object,formId:String,resourceUrl:String},setup(t){const i=useRouter(),e=t,r=useResourceForm(e.formId),d=computed(()=>{let{localizations:n}=e;return Object.values(n).filter(b=>b.origin!==null)[0].origin}),E=Object.values(e.localizations).filter(n=>n.current)[0].iso;r.setLocale(E);const g=n=>n.origin?"Original":n.current?"Current translation":`${n.translation?"Edit":"Create"} ${n.name} translation`,V=n=>{let b=n.translation?n.translation:n.origin?n.origin:null,B=r.settings.handle;b?i.push({name:"resourceEdit",params:{id:b,handle:B}}):Invicta.axios.post(`/api/resource/${B}/${d.value}/localize/${n.iso}`).then(({data:h})=>{console.log("I have created localized version of this page",h),i.push({name:"resourceEdit",params:{id:h,handle:B}})})};return(n,b)=>{const B=_sfc_main$4,h=ElButton,D=ElDropdownItem,F=ElDropdownMenu,R=ElDropdown;return openBlock(),createBlock(R,{class:"mr-4",onCommand:V},{dropdown:withCtx(()=>[createVNode(F,null,{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(t.localizations,y=>(openBlock(),createBlock(D,{key:y.iso,command:y,disabled:y.current,title:g(y)},{default:withCtx(()=>[createBaseVNode("i",{class:normalizeClass(["icon-status",{success:y.translation||y.origin}])},null,2),createTextVNode(),createBaseVNode("span",_hoisted_1$1,toDisplayString(y.name),1)]),_:2},1032,["command","disabled","title"]))),128))]),_:1})]),default:withCtx(()=>[createVNode(h,{size:"small",text:"",type:"info"},{default:withCtx(()=>[createVNode(B,{icon:unref(mdiTranslate),width:15,class:"mr-2"},null,8,["icon"]),createTextVNode(" Language ")]),_:1})]),_:1})}}},_sfc_main$1={__name:"BackLink",props:{data:Object},setup(t){return(i,e)=>{const r=ElIcon,d=resolveComponent("router-link");return openBlock(),createBlock(d,{to:t.data,class:"breadcrumb"},{default:withCtx(()=>[createVNode(r,null,{default:withCtx(()=>[createVNode(unref(arrow_left_default))]),_:1}),createTextVNode(" "+toDisplayString(t.data.text),1)]),_:1},8,["to"])}}},FormBase_vue_vue_type_style_index_0_lang="",_hoisted_1={key:0,class:"flex items-end justify-between mb-4"},_hoisted_2={class:"mb-1"},_hoisted_3=["href"],_hoisted_4=["innerHTML"],_hoisted_5=createBaseVNode("svg",{class:"ml-2",viewBox:"0 0 24 24",width:"22"},[createBaseVNode("path",{fill:"currentColor",d:"M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"})],-1),_hoisted_6=["innerHTML"],_hoisted_7={class:"resource-actions flex items-center ml-auto"},_hoisted_8={class:"unsaved-indicator"},_hoisted_9={key:0,class:"fieldset"},_hoisted_10={key:1},_hoisted_11={key:0,class:"fieldset"},_hoisted_12={key:0,class:"sidebar"},_hoisted_13={key:0,class:"fieldset"},_sfc_main={__name:"FormBase",props:{formId:String,resource:Object,breadcrumb:Object,actionUrl:String,headless:{type:Boolean,default:!1},postSubmitActions:{type:Array,default:["back","edit","create"]},params:Object,readOnly:{type:Boolean,default:!1},pageForm:{type:Boolean,default:!1}},emits:["submitted","form-ready"],setup(t,{emit:i}){const e=t,r=i,d=useResourceForm(e.formId);d.readOnly=e.readOnly;const{resource:E,actionUrl:g,params:V}=e;d.init(E,g,V),r("form-ready"),onBeforeRouteLeave((a,u)=>{if(d.isDirty.value&&!window.confirm("Do you really want to leave? you have unsaved changes!"))return!1}),Invicta.on("lock-form",a=>{console.log("I hear a call to lock form",a,e.formId),a==e.formId&&(d.data.readOnly=!0)}),Invicta.on("unlock-form",a=>{a==e.formId&&(d.data.readOnly=!1)});const n=d.settings.blueprint,b=get(n.settings,"form",{"label-position":"top"}),B=has(n,"sections");let h=ref(null),D=null;B&&n.sections.length&&("tabs"in n.settings?(h.value="active"in n.settings.tabs?n.settings.tabs.active:n.sections[0].id,D="type"in n.settings.tabs?n.settings.tabs.type:"border-card"):h.value=n.sections[0].id);const F=has(n,"sidebar"),R=computed(()=>{let a=e.headless?"w-full":F?"w-sidebar":"w-compact";return b.class||a}),y=computed(()=>{if(e.headless)return"";let a=e.resource.meta,u=e.resource.item??null,v=a.pageTitle;return u&&a.titleField!=="id"&&a.titleField in u&&(v=get(u,a.titleField)),u&&"published"in u&&(v=`<i class="icon-status ${get(u,"published")?"success":""} mr-2"></i> ${v}`),v}),L=computed(()=>d.processing.value||!d.isDirty.value),o=ref(e.postSubmitActions[0]),s={back:{icon:arrow_left_default,button:"Save & Back",option:"Go back"},close:{icon:arrow_left_default,button:"Save & Close",option:"Close Form"},edit:{icon:arrow_down_default,button:"Save & Stay",option:"Continue Editing"},create:{icon:plus_default,button:"Save & New",option:"Add New Item"}};onMounted(()=>{if(window.location.hash.length>0){let a=window.location.hash.substr(1)||"";h.value=a}o.value=e.postSubmitActions.length>1&&Invicta.remember("post-submit-action")||e.postSubmitActions[0]}),watch(h,a=>{e.pageForm&&window.history.pushState(window.history.state,null,`#${a}`)}),watch(o,a=>Invicta.remember("post-submit-action",a));const m=()=>{d.submit(o.value,e.pageForm),r("submitted",{action:o.value})};return onKeyStroke("Enter",a=>{e.headless&&(a.preventDefault(),m())}),(a,u)=>{const v=_sfc_main$1,k=_sfc_main$2,l=ElButton,_=ElRadio,c=ElRadioGroup,f=ElPopover,w=ElButtonGroup,P=_sfc_main$3,I=ElTabPane,C=ElTabs,O=ElCard,T=ElForm;return openBlock(),createBlock(T,mergeProps({class:["invicta-form",unref(R)]},unref(b)),{default:withCtx(()=>[t.headless?createCommentVNode("",!0):(openBlock(),createElementBlock("div",_hoisted_1,[createBaseVNode("div",null,[t.breadcrumb?(openBlock(),createBlock(v,{key:0,class:"breadcrumb",data:t.breadcrumb},null,8,["data"])):createCommentVNode("",!0),createBaseVNode("h1",_hoisted_2,[unref(E).meta.itemUrl?(openBlock(),createElementBlock("a",{key:0,class:"flex items-center",href:unref(E).meta.itemUrl,title:"Visit URL",target:"_blank"},[createBaseVNode("span",{class:"flex items-center",innerHTML:unref(y)},null,8,_hoisted_4),_hoisted_5],8,_hoisted_3)):(openBlock(),createElementBlock("span",{key:1,class:"flex items-center",innerHTML:unref(y)},null,8,_hoisted_6))])]),createBaseVNode("div",_hoisted_7,[unref(E).localizations?(openBlock(),createBlock(k,{key:0,localizations:unref(E).localizations,"form-id":t.formId,"resource-url":unref(E).meta.indexUrl},null,8,["localizations","form-id","resource-url"])):createCommentVNode("",!0),renderSlot(a.$slots,"form-actions"),createVNode(w,{class:"relative"},{default:withCtx(()=>[createVNode(l,{type:"primary",onClick:m,disabled:unref(L)},{default:withCtx(()=>[createTextVNode(toDisplayString(s[unref(o)].button),1)]),_:1},8,["disabled"]),createVNode(f,{title:"After Saving",teleported:!1},{reference:withCtx(()=>[createVNode(l,{disabled:unref(L),type:"primary",icon:s[unref(o)].icon},null,8,["disabled","icon"])]),default:withCtx(()=>[createVNode(c,{modelValue:unref(o),"onUpdate:modelValue":u[0]||(u[0]=p=>isRef(o)?o.value=p:null)},{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(t.postSubmitActions,p=>(openBlock(),createBlock(_,{label:p},{default:withCtx(()=>[createTextVNode(toDisplayString(s[p].option),1)]),_:2},1032,["label"]))),256))]),_:1},8,["modelValue"])]),_:1}),withDirectives(createBaseVNode("sup",_hoisted_8,null,512),[[vShow,unref(d).isDirty.value]])]),_:1})])])),createBaseVNode("div",{class:normalizeClass(["form-wrapper",{card:unref(D)=="card"}])},[createBaseVNode("div",{class:normalizeClass(["main-panel",{"el-card is-always-shadow":!unref(B)&&!t.headless,"has-sidebar":unref(F)}])},[unref(B)?(openBlock(),createBlock(C,mergeProps({key:0,modelValue:unref(h),"onUpdate:modelValue":u[1]||(u[1]=p=>isRef(h)?h.value=p:h=p),type:"border-card"},unref(n).settings.tabs),{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(unref(n).sections,p=>(openBlock(),createBlock(I,{label:p.title,name:p.id},{default:withCtx(()=>[p.fields?(openBlock(),createElementBlock("div",_hoisted_9,[(openBlock(!0),createElementBlock(Fragment,null,renderList(p.fields,(x,A)=>(openBlock(),createBlock(P,{"form-id":t.formId,"field-data":x,"data-path":x.id},null,8,["form-id","field-data","data-path"]))),256))])):createCommentVNode("",!0)]),_:2},1032,["label","name"]))),256))]),_:1},16,["modelValue"])):(openBlock(),createElementBlock("div",_hoisted_10,[unref(n).fields?(openBlock(),createElementBlock("div",_hoisted_11,[(openBlock(!0),createElementBlock(Fragment,null,renderList(unref(n).fields,(p,x)=>(openBlock(),createBlock(P,{"form-id":t.formId,"field-data":p,"data-path":p.id},null,8,["form-id","field-data","data-path"]))),256))])):createCommentVNode("",!0)]))],2),unref(F)?(openBlock(),createElementBlock("div",_hoisted_12,[createVNode(O,null,{default:withCtx(()=>[unref(n).sidebar.fields?(openBlock(),createElementBlock("div",_hoisted_13,[(openBlock(!0),createElementBlock(Fragment,null,renderList(unref(n).sidebar.fields,(p,x)=>(openBlock(),createBlock(P,{"form-id":t.formId,"field-data":p,"data-path":p.id},null,8,["form-id","field-data","data-path"]))),256))])):createCommentVNode("",!0)]),_:1})])):createCommentVNode("",!0)],2)]),_:3},16,["class"])}}};export{_sfc_main as _,_sfc_main$1 as a,_sfc_main$3 as b,useFieldCondition as c,getFields as g,useResourceForm as u};