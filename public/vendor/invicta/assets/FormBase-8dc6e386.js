import{s as computed,A as lodashExports,o as openBlock,d as createElementBlock,b as renderSlot,n as normalizeClass,u as unref,ar as defineStore,a6 as T,as as shallowRef,c as createBlock,w as withCtx,am as resolveDynamicComponent,e as createCommentVNode,i as createVNode,F as Fragment,k as renderList,f as createBaseVNode,H as createTextVNode,t as toDisplayString,ao as mdiTranslate,O as Oe,G as ElButton,J as ElDropdownItem,al as ElDropdownMenu,L as ElDropdown,an as toRaw,h as ref,z as onMounted,N as watch,at as onKeyStroke,r as resolveComponent,ai as arrow_left_default,ap as isRef,j as withDirectives,v as vShow,au as mergeProps,aj as arrow_down_default,av as plus_default,ak as ElIcon,aw as ElRadio,ax as ElRadioGroup,ay as ElPopover,a1 as ElButtonGroup,az as ElTabPane,aA as ElTabs,a2 as ElCard,a7 as ElForm}from"./vendor-6f7baac1.js";/* empty css             *//* empty css             */import{b as __vitePreload,a as _sfc_main$4}from"./main-94816a90.js";/* empty css                      *//* empty css             */const tabs="",tabPane="",_sfc_main$3={__name:"FieldRow",props:{fieldData:Object},setup(r){const e=r,{type:t}=e.fieldData,o=computed(()=>{let i;return t=="divider"&&e.fieldData.section?i="section":t=="row"?i=["field-row-full","inline-fields"]:i=[`field-row-${lodashExports.get(e.fieldData,"width","full")}`,lodashExports.get(e.fieldData,"customClass","")],i});return(i,a)=>(openBlock(),createElementBlock("div",{class:normalizeClass(unref(o))},[renderSlot(i.$slots,"default")],2))}},Invicta$1=window.Invicta,definedForms=new Map,useResourceForm=r=>{let e=`resourceForm-${r}`;return definedForms.has(e)||definedForms.set(e,defineResourceForm(r)),definedForms.get(e)},defineResourceForm=r=>defineStore(`resourceForm-${r}`,{state:()=>({mode:"create",form:null,meta:{},localizations:null,actionUrl:null,readOnly:!0,blueprint:{},rules:{},assetActions:[],api:!1,errors:Invicta$1.errors}),actions:{init(e,t,o){var d;let i=e.item?e.item:null;this.meta=e.meta,this.mode=(d=e.meta)!=null&&d.id?"edit":"create",this.actionUrl=t,this.blueprint=e.blueprint,this.localizations=e.localizations,this.api=o;let a=this.prepareFields(this.blueprint,i);this.form=T(a),Invicta$1.emit("resource-form-ready"),this.getAssetActions()},get(e,t=null){let o=lodashExports.get(this.form,e,t);return!o&&t?t:o},set(e,t){lodashExports.set(this.form,e,t)},setRelated(e){this.form[e]=this.data[e]},prepareFields(e,t=null){const o=n=>{let l="path"in n?n.path:n.id;l=l.includes(".")?lodashExports.split(l,".")[0]:l;let s="defaultValue"in n?n.defaultValue:null;return t&&l in t?t[l]:s},i=n=>n.reduce((l,s)=>{if(s.fields){let c=i(s.fields);return{...l,...c}}else if(s.id&&s.type.includes("related")){let c=o(s);return l[s.id]=c,l}return l},{}),a=n=>n.reduce((l,s)=>{if(s.id){let c="path"in s?s.path:s.id,m=c.includes(".")?lodashExports.split(c,"."):!1;c=m?m[0]:c,c=c=="data"?"_data":c;let f=o(s);if(s.type=="toggle"&&typeof f=="number"&&(f=!!f),l[c]=f,this.rules[c]=s.validation?s.validation:"nullable",s.fields)if(s.type=="json"&&s.hasOwnProperty("populateFields")&&s.populateFields)f===null&&(l[c]=s.fields.reduce((p,u)=>(p[u.id]=u.defaultValue||null,p),{}));else{let p=i(s.fields);l={...l,...p}}if(m&&s.type.includes("related")){let p=m[m.length-1];l[p]=t?t[p]:null}return l}else if(s.type=="row"){let c=a(s.fields);l={...l,...c}}return l},{});let d={};return e.fields&&(d=a(e.fields)),e.sidebar&&e.sidebar.fields&&(d={...d,...a(e.sidebar.fields)}),e.sections&&e.sections.forEach(n=>{n.fields&&(d={...d,...a(n.fields)})}),d},setReadOnly(e){function t(o){return o.map(i=>i.fields?t(i.fields):(("path"in i?i.path:i.id)==e&&(i.readOnly=!0),i)),o}this.parseBlueprint(t)},parseBlueprint(e){this.blueprint.fields&&(this.blueprint.fields=e(this.blueprint.fields)),this.blueprint.sidebar&&this.blueprint.sidebar.fields&&(this.blueprint.sidebar.fields=e(this.blueprint.sidebar.fields)),this.blueprint.sections&&this.blueprint.sections.forEach((t,o)=>{t.fields&&(this.blueprint.sections[o].fields=e(t.fields))})},getAssetActions(){Invicta$1.axios.get("api/assets/field-actions").then(({data:e})=>{this.assetActions=e})},formData(){return this.form.transform(e=>({...lodashExports.pickBy(e)})).data()},submit(e){if(this.api){this.apiSubmit();return}document.removeEventListener("inertia:before",this.confirmUnsavedChanges);let t=this.rules;this.form.transform(o=>({...o,postSubmitAction:e,validation:t})).post(this.actionUrl,{onSuccess:()=>{e=="create"&&this.form.reset(),this.dirty=!1,Invicta$1.emit("resource-form-submitted")}})},apiSubmit(){let e={fields:this.formData(),validation:this.rules};typeof this.api=="object"&&(e={...e,...this.api}),Invicta$1.axios.post(this.actionUrl,e).then(({data:t})=>{Invicta$1.message(t.message),Invicta$1.emit("resource-form-submitted")}).catch(({response:t})=>{if(t.status==422){let o={};for(const[i,a]of Object.entries(t.data.errors))o[i]=Array.isArray(a)?a[0]:a;Invicta$1.setErrors(o)}})},confirmUnsavedChanges(e){this.dirty&&(confirm("You have unsaved changes. Leave anyway?")?document.removeEventListener("inertia:before",this.confirmUnsavedChanges):e.preventDefault())}},getters:{title(){let e=this.meta.pageTitle;return this.mode=="edit"&&this.meta.titleField!=="id"&&this.meta.titleField in this.form&&(e=lodashExports.get(this.form,this.meta.titleField)),"published"in this.form&&(e=`<i class="icon-status ${lodashExports.get(this.form,"published")?"success":""} mr-2"></i> ${e}`),e},id(){return lodashExports.get(this.form,"id")}}})();function getFields(r){return r.reduce((e,t)=>{if(t.fields){let o=getFields(t.fields);return{...e,...o}}else if(t.id)return e[t.id]="",e;return e},{})}const useFieldCondition=(r,e)=>computed(()=>{let t=lodashExports.get(r,"if",null)||lodashExports.get(r,"if_any",null)||lodashExports.get(r,"if_all",null);if(!t)return!0;if(Array.isArray(t)){if("if_all"in r)return t.every(i=>processCondition(e,i));if("if_any"in r){let o=!1;return t.forEach(i=>{processCondition(e,i)&&(o=!0)}),o}}return processCondition(e,t)});function processCondition(formId,condition){const resourceForm=useResourceForm(formId);let target=resourceForm.get(condition.id);console.log("target",target,condition.id);let operator=prepareOperator(condition.operator),loperand=prepareOperand(target,operator),roperand=prepareOperand(condition.value,operator);if(operator=="in"||operator=="not in")return passesIncludesCondition(roperand,loperand,!operator.includes("not"));let expression=`${loperand} ${operator} ${roperand}`;return console.log("condition expression",expression),eval(expression)}function passesIncludesCondition(r,e,t){const o=r.includes(e);return console.log(`is ${e} includes in ${r}: ${o}`),console.log(`included: ${t}`),t?o:!o}function prepareOperand(r,e){return[">",">=","<","<="].includes(e)?Number(r):lodashExports.isString(r)?JSON.stringify(r.trim()):r}function prepareOperator(r){switch(r){case"==":case"equal":case"equals":case"is":return"==";case"not equals":case"not equal":return"!==";case">":case"more":case"more than":return">";case">=":case"more or equal":case"more or equals":return">=";case"<":case"less":case"less than":return"<";case"<=":case"less or equal":case"less or equals":return"<=";default:return r}return r}const __variableDynamicImportRuntimeHelper=(r,e)=>{const t=r[e];return t?typeof t=="function"?t():Promise.resolve(t):new Promise((o,i)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(i.bind(null,new Error("Unknown variable dynamic import: "+e)))})},_sfc_main$2={__name:"FormField",props:{formId:String,fieldData:Object,dataPath:String},setup(r){const e=r;let t=shallowRef("textField"),i=(e.dataPath&&e.dataPath.includes(".")?lodashExports.split(e.dataPath,".")[0]:e.dataPath)=="data"?`_${e.dataPath}`:e.dataPath;const a=useFieldCondition(e.fieldData,e.formId);if(a)if(Invicta.componentExists(e.fieldData.type))t.value=e.fieldData.type;else{let d=e.fieldData.type.replace("-","");d=d=="group"?"json":d,__variableDynamicImportRuntimeHelper(Object.assign({"./fields/assetField.vue":()=>__vitePreload(()=>import("./assetField-c7d0f1af.js"),["assets/assetField-c7d0f1af.js","assets/main-94816a90.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/main-71a1cfa9.css","assets/AssetForm-2923bbe4.js","assets/AssetForm-e344239b.css","assets/AssetSelector-781d0f5f.js","assets/ResourceTable-b3f026c8.js","assets/ActionsDropdown-b83c43eb.js","assets/CheckTree-9f37d1c1.js","assets/checkbox-db9b718a.css","assets/functions-5f649594.js","assets/ResourceTable-2cbecc8f.css","assets/select-e36d143f.css","assets/icon-f1b10c7a.css","assets/Loading-7c973ae3.js","assets/Loading-a6bb133d.css","assets/GridView-e78cdd1c.js","assets/GridView-a3c75e7a.css","assets/progress-544a2eea.css","assets/base-b6e288d4.css","assets/el-overlay-507e7e2b.css","assets/Search-56a2dda1.js","assets/AssetSelector-2aec6231.css","assets/FieldBase-e07d0721.js","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/assetField-6838aa0f.css","assets/form-814f6ece.css","assets/card-36a99b14.css"]),"./fields/blueprintField.vue":()=>__vitePreload(()=>import("./blueprintField-e4b50acd.js"),["assets/blueprintField-e4b50acd.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/select-e36d143f.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/checkboxGroupField.vue":()=>__vitePreload(()=>import("./checkboxGroupField-5cfeee9f.js"),["assets/checkboxGroupField-5cfeee9f.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/checkboxGroupField-bbdd39f9.css","assets/checkbox-db9b718a.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/codeField.vue":()=>__vitePreload(()=>import("./codeField-bd83a126.js"),["assets/codeField-bd83a126.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/functions-5f649594.js","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/codeField-772ffbda.css","assets/base-b6e288d4.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/dateField.vue":()=>__vitePreload(()=>import("./dateField-10f61763.js"),["assets/dateField-10f61763.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/dateField-9f37c22e.css","assets/date-picker-c2072ae1.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/dividerField.vue":()=>__vitePreload(()=>import("./dividerField-1acf0752.js"),["assets/dividerField-1acf0752.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/dividerField-49242f3d.css"]),"./fields/dynamicRelatedListField.vue":()=>__vitePreload(()=>import("./dynamicRelatedListField-1f77d7b6.js"),["assets/dynamicRelatedListField-1f77d7b6.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/ItemsList-1b4569e2.js","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/ItemsSelector-4dcc8026.js","assets/ResourceTable-b3f026c8.js","assets/ActionsDropdown-b83c43eb.js","assets/CheckTree-9f37d1c1.js","assets/checkbox-db9b718a.css","assets/functions-5f649594.js","assets/ResourceTable-2cbecc8f.css","assets/select-e36d143f.css","assets/icon-f1b10c7a.css","assets/Loading-7c973ae3.js","assets/Loading-a6bb133d.css","assets/Filters-5a48d43c.js","assets/Filters-d53a1a87.css","assets/date-picker-c2072ae1.css","assets/Search-56a2dda1.js","assets/vuedraggable.umd-44879d62.js","assets/_plugin-vue_export-helper-c27b6911.js","assets/ItemsList-90667153.css","assets/link-46d2d342.css","assets/form-814f6ece.css","assets/card-36a99b14.css"]),"./fields/googlePreviewField.vue":()=>__vitePreload(()=>import("./googlePreviewField-6669470e.js"),["assets/googlePreviewField-6669470e.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/googlePreviewField-b93b43aa.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/dropdown-menu-cd550505.css","assets/icon-f1b10c7a.css"]),"./fields/hiddenField.vue":()=>__vitePreload(()=>import("./hiddenField-5f8c2ac0.js"),["assets/hiddenField-5f8c2ac0.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/dropdown-menu-cd550505.css","assets/icon-f1b10c7a.css"]),"./fields/infoPanelField.vue":()=>__vitePreload(()=>import("./infoPanelField-5252784c.js"),["assets/infoPanelField-5252784c.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css"]),"./fields/itemsListField.vue":()=>__vitePreload(()=>import("./itemsListField-f5ecd023.js"),["assets/itemsListField-f5ecd023.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/ItemsList-1b4569e2.js","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/ItemsSelector-4dcc8026.js","assets/ResourceTable-b3f026c8.js","assets/ActionsDropdown-b83c43eb.js","assets/CheckTree-9f37d1c1.js","assets/checkbox-db9b718a.css","assets/functions-5f649594.js","assets/ResourceTable-2cbecc8f.css","assets/select-e36d143f.css","assets/icon-f1b10c7a.css","assets/Loading-7c973ae3.js","assets/Loading-a6bb133d.css","assets/Filters-5a48d43c.js","assets/Filters-d53a1a87.css","assets/date-picker-c2072ae1.css","assets/Search-56a2dda1.js","assets/vuedraggable.umd-44879d62.js","assets/_plugin-vue_export-helper-c27b6911.js","assets/ItemsList-90667153.css","assets/link-46d2d342.css","assets/form-814f6ece.css","assets/card-36a99b14.css"]),"./fields/jsonField.vue":()=>__vitePreload(()=>import("./jsonField-7e10e495.js"),["assets/jsonField-7e10e495.js","assets/field-d0ec925e.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/dropdown-menu-cd550505.css","assets/icon-f1b10c7a.css"]),"./fields/keyValueField.vue":()=>__vitePreload(()=>import("./keyValueField-f33e67c0.js"),["assets/keyValueField-f33e67c0.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/keyValueField-76906079.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/linkField.vue":()=>__vitePreload(()=>import("./linkField-68220a1d.js"),["assets/linkField-68220a1d.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/select-e36d143f.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/metaField.vue":()=>__vitePreload(()=>import("./metaField-09be636a.js"),["assets/metaField-09be636a.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/metaField-782787ed.css","assets/progress-544a2eea.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/rateField.vue":()=>__vitePreload(()=>import("./rateField-47a65453.js"),["assets/rateField-47a65453.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/rateField-be745c6c.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/relatedListField.vue":()=>__vitePreload(()=>import("./relatedListField-3914a2fc.js"),["assets/relatedListField-3914a2fc.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/ItemsList-1b4569e2.js","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/ItemsSelector-4dcc8026.js","assets/ResourceTable-b3f026c8.js","assets/ActionsDropdown-b83c43eb.js","assets/CheckTree-9f37d1c1.js","assets/checkbox-db9b718a.css","assets/functions-5f649594.js","assets/ResourceTable-2cbecc8f.css","assets/select-e36d143f.css","assets/icon-f1b10c7a.css","assets/Loading-7c973ae3.js","assets/Loading-a6bb133d.css","assets/Filters-5a48d43c.js","assets/Filters-d53a1a87.css","assets/date-picker-c2072ae1.css","assets/Search-56a2dda1.js","assets/vuedraggable.umd-44879d62.js","assets/_plugin-vue_export-helper-c27b6911.js","assets/ItemsList-90667153.css","assets/link-46d2d342.css","assets/form-814f6ece.css","assets/card-36a99b14.css"]),"./fields/relatedSelectField.vue":()=>__vitePreload(()=>import("./relatedSelectField-992904e4.js"),["assets/relatedSelectField-992904e4.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/relatedSelectField-0c78ca73.css","assets/select-e36d143f.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/repeaterField.vue":()=>__vitePreload(()=>import("./repeaterField-d656a29f.js"),["assets/repeaterField-d656a29f.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/vuedraggable.umd-44879d62.js","assets/_plugin-vue_export-helper-c27b6911.js","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/repeaterField-cded0c13.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/rowField.vue":()=>__vitePreload(()=>import("./rowField-7d3be815.js"),["assets/rowField-7d3be815.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/dropdown-menu-cd550505.css","assets/icon-f1b10c7a.css"]),"./fields/selectField.vue":()=>__vitePreload(()=>import("./selectField-d205f9b3.js"),["assets/selectField-d205f9b3.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/select-e36d143f.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/slugField.vue":()=>__vitePreload(()=>import("./slugField-9e667a50.js"),["assets/slugField-9e667a50.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/tableField.vue":()=>__vitePreload(()=>import("./tableField-f09ae7aa.js"),["assets/tableField-f09ae7aa.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/ResourceTable-b3f026c8.js","assets/ActionsDropdown-b83c43eb.js","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/CheckTree-9f37d1c1.js","assets/checkbox-db9b718a.css","assets/functions-5f649594.js","assets/ResourceTable-2cbecc8f.css","assets/select-e36d143f.css","assets/icon-f1b10c7a.css","assets/Loading-7c973ae3.js","assets/Loading-a6bb133d.css","assets/Filters-5a48d43c.js","assets/Filters-d53a1a87.css","assets/date-picker-c2072ae1.css","assets/FiltersSearch-63962052.js"]),"./fields/tagsField.vue":()=>__vitePreload(()=>import("./tagsField-2c514cbe.js"),["assets/tagsField-2c514cbe.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/tagsField-dcc2dfc4.css","assets/icon-f1b10c7a.css","assets/form-814f6ece.css","assets/card-36a99b14.css"]),"./fields/termsField.vue":()=>__vitePreload(()=>import("./termsField-c44197d2.js"),["assets/termsField-c44197d2.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/termsField-28e729dd.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/textEditorField.vue":()=>__vitePreload(()=>import("./textEditorField-3f83411f.js"),["assets/textEditorField-3f83411f.js","assets/main-94816a90.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/main-71a1cfa9.css","assets/ItemsSelector-4dcc8026.js","assets/ResourceTable-b3f026c8.js","assets/ActionsDropdown-b83c43eb.js","assets/CheckTree-9f37d1c1.js","assets/checkbox-db9b718a.css","assets/functions-5f649594.js","assets/ResourceTable-2cbecc8f.css","assets/select-e36d143f.css","assets/icon-f1b10c7a.css","assets/Loading-7c973ae3.js","assets/Loading-a6bb133d.css","assets/Filters-5a48d43c.js","assets/Filters-d53a1a87.css","assets/date-picker-c2072ae1.css","assets/Search-56a2dda1.js","assets/AssetSelector-781d0f5f.js","assets/GridView-e78cdd1c.js","assets/GridView-a3c75e7a.css","assets/progress-544a2eea.css","assets/base-b6e288d4.css","assets/el-overlay-507e7e2b.css","assets/AssetSelector-2aec6231.css","assets/FieldBase-e07d0721.js","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/_plugin-vue_export-helper-c27b6911.js","assets/textEditorField-f7792af3.css","assets/form-814f6ece.css","assets/card-36a99b14.css"]),"./fields/textField.vue":()=>__vitePreload(()=>import("./textField-599bceec.js"),["assets/textField-599bceec.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/textareaField.vue":()=>__vitePreload(()=>import("./textareaField-b93d3cb6.js"),["assets/textareaField-b93d3cb6.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/toggleField.vue":()=>__vitePreload(()=>import("./toggleField-d2189f62.js"),["assets/toggleField-d2189f62.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/switch-d2efaf55.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"]),"./fields/videoField.vue":()=>__vitePreload(()=>import("./videoField-2245cea4.js"),["assets/videoField-2245cea4.js","assets/FieldBase-e07d0721.js","assets/vendor-6f7baac1.js","assets/vendor-526c9daa.css","assets/field-d0ec925e.js","assets/dropdown-menu-cd550505.css","assets/main-94816a90.js","assets/main-71a1cfa9.css","assets/form-814f6ece.css","assets/card-36a99b14.css","assets/icon-f1b10c7a.css"])}),`./fields/${d}Field.vue`).then(n=>t.value=n.default).catch(n=>console.log(n))}return(d,n)=>{const l=_sfc_main$3;return unref(a)?(openBlock(),createBlock(l,{key:0,"field-data":r.fieldData},{default:withCtx(()=>[(openBlock(),createBlock(resolveDynamicComponent(unref(t)),{"form-id":r.formId,data:r.fieldData,path:unref(i)},null,8,["form-id","data","path"]))]),_:1},8,["field-data"])):createCommentVNode("",!0)}}},popover="",radioGroup="",radio="",_hoisted_1$1={class:"ml-2"},_sfc_main$1={__name:"Localizations",props:{localizations:Object,formId:String,resourceUrl:String},setup(r){const e=r;useResourceForm(e.formId);const t=computed(()=>{let{localizations:a}=e;return Object.values(a).filter(d=>d.origin!==null)[0].origin}),o=a=>a.origin?"Original":a.current?"Current translation":`${a.translation?"Edit":"Create"} ${a.name} translation`,i=a=>{let d=a.translation?a.translation:a.origin?a.origin:null,n=d?`${d}/edit`:`${t.value}/localize`;d?Oe.get(`${e.resourceUrl}/${n}`):Oe.get(`${e.resourceUrl}/${n}/${a.iso}`)};return(a,d)=>{const n=_sfc_main$4,l=ElButton,s=ElDropdownItem,c=ElDropdownMenu,m=ElDropdown;return openBlock(),createBlock(m,{class:"mr-4",onCommand:i},{dropdown:withCtx(()=>[createVNode(c,null,{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(r.localizations,f=>(openBlock(),createBlock(s,{key:f.iso,command:f,disabled:f.current,title:o(f)},{default:withCtx(()=>[createBaseVNode("i",{class:normalizeClass(["icon-status",{success:f.translation||f.origin}])},null,2),createTextVNode(),createBaseVNode("span",_hoisted_1$1,toDisplayString(f.name),1)]),_:2},1032,["command","disabled","title"]))),128))]),_:1})]),default:withCtx(()=>[createVNode(l,{size:"small",text:"",type:"info"},{default:withCtx(()=>[createVNode(n,{icon:unref(mdiTranslate),width:15,class:"mr-2"},null,8,["icon"]),createTextVNode(" Language ")]),_:1})]),_:1})}}},FormBase_vue_vue_type_style_index_0_lang="",_hoisted_1={key:0,class:"flex items-end justify-between mb-4"},_hoisted_2=["innerHTML"],_hoisted_3={key:1,class:"text-gray-400"},_hoisted_4={href:"{{ resourceForm.meta.itemUrl }}",target:"_blank"},_hoisted_5={class:"resource-actions flex items-center ml-auto"},_hoisted_6={class:"unsaved-indicator"},_hoisted_7={key:0,class:"fieldset"},_hoisted_8={key:1},_hoisted_9={key:0,class:"fieldset"},_hoisted_10={key:0,class:"sidebar"},_hoisted_11={key:0,class:"fieldset"},_sfc_main={__name:"FormBase",props:{formId:String,resource:Object,breadcrumb:Object,actionUrl:String,headless:{type:Boolean,default:!1},postSubmitActions:{type:Array,default:["back","edit","create"]},api:Boolean|Object,readOnly:{type:Boolean,default:!1}},emits:["submit","form-ready"],setup(r,{emit:e}){const t=r,o=useResourceForm(t.formId);o.readOnly=t.readOnly,o.init(toRaw(t.resource),t.actionUrl,t.api),e("form-ready"),Invicta.on("lock-form",u=>{console.log("I hear a call to lock form",u,t.formId),u==t.formId&&(o.readOnly=!0)}),Invicta.on("unlock-form",u=>{u==t.formId&&(o.readOnly=!1)});const i=o.blueprint,a=lodashExports.get(i.settings,"form",{"label-position":"top"}),d=lodashExports.has(i,"sections");let n=ref(null),l=null;d&&i.sections.length&&("tabs"in i.settings?(n.value="active"in i.settings.tabs?i.settings.tabs.active:i.sections[0].id,l="type"in i.settings.tabs?i.settings.tabs.type:"border-card"):n.value=i.sections[0].id);const s=lodashExports.has(i,"sidebar");onMounted(()=>{if(window.location.hash.length>0){let u=window.location.hash.substr(1)||"";n.value=u}}),watch(n,u=>{window.location.hash=u});const c=computed(()=>{let u=t.headless?"w-full":s?"w-sidebar":"w-compact";return a.class||u}),m=ref(t.postSubmitActions[0]),f={back:{icon:arrow_left_default,button:"Save & Back",option:"Go back"},close:{icon:arrow_left_default,button:"Save & Close",option:"Close Form"},edit:{icon:arrow_down_default,button:"Save & Stay",option:"Continue Editing"},create:{icon:plus_default,button:"Save & New",option:"Add New Item"}};onMounted(()=>{m.value=t.postSubmitActions.length>1&&Invicta.remember("post-submit-action")||t.postSubmitActions[0]}),watch(m,u=>Invicta.remember("post-submit-action",u));const p=()=>{o.submit(m.value)};return onKeyStroke("Enter",u=>{t.headless&&(u.preventDefault(),p())}),document.addEventListener("inertia:before",o.confirmUnsavedChanges),(u,h)=>{const b=ElIcon,y=resolveComponent("Link"),k=_sfc_main$1,g=ElButton,w=ElRadio,F=ElRadioGroup,B=ElPopover,P=ElButtonGroup,E=_sfc_main$2,V=ElTabPane,I=ElTabs,x=ElCard,D=ElForm;return openBlock(),createBlock(D,mergeProps({class:["invicta-form",unref(c)]},unref(a)),{default:withCtx(()=>[r.headless?createCommentVNode("",!0):(openBlock(),createElementBlock("div",_hoisted_1,[createBaseVNode("div",null,[r.breadcrumb?(openBlock(),createBlock(y,{key:0,href:r.breadcrumb.url,class:"breadcrumb"},{default:withCtx(()=>[createVNode(b,null,{default:withCtx(()=>[createVNode(unref(arrow_left_default))]),_:1}),createTextVNode(" "+toDisplayString(r.breadcrumb.text),1)]),_:1},8,["href"])):createCommentVNode("",!0),createBaseVNode("h1",{class:"mb-1 flex items-center",innerHTML:unref(o).title},null,8,_hoisted_2),unref(o).meta.itemUrl?(openBlock(),createElementBlock("span",_hoisted_3,[createBaseVNode("a",_hoisted_4,toDisplayString(unref(o).meta.itemUrl),1)])):createCommentVNode("",!0)]),createBaseVNode("div",_hoisted_5,[unref(o).localizations?(openBlock(),createBlock(k,{key:0,localizations:unref(o).localizations,"form-id":r.formId,"resource-url":r.resource.meta.indexUrl},null,8,["localizations","form-id","resource-url"])):createCommentVNode("",!0),renderSlot(u.$slots,"form-actions"),createVNode(P,{class:"relative"},{default:withCtx(()=>[createVNode(g,{type:"primary",onClick:p,disabled:unref(o).form.processing||!unref(o).form.isDirty},{default:withCtx(()=>[createTextVNode(toDisplayString(f[unref(m)].button),1)]),_:1},8,["disabled"]),createVNode(B,{title:"After Saving",teleported:!1},{reference:withCtx(()=>[createVNode(g,{disabled:unref(o).form.processing||!unref(o).form.isDirty,type:"primary",icon:f[unref(m)].icon},null,8,["disabled","icon"])]),default:withCtx(()=>[createVNode(F,{modelValue:unref(m),"onUpdate:modelValue":h[0]||(h[0]=_=>isRef(m)?m.value=_:null)},{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(r.postSubmitActions,_=>(openBlock(),createBlock(w,{label:_},{default:withCtx(()=>[createTextVNode(toDisplayString(f[_].option),1)]),_:2},1032,["label"]))),256))]),_:1},8,["modelValue"])]),_:1}),withDirectives(createBaseVNode("sup",_hoisted_6,null,512),[[vShow,unref(o).form.isDirty]])]),_:1})])])),createBaseVNode("div",{class:normalizeClass(["form-wrapper",{card:unref(l)=="card"}])},[createBaseVNode("div",{class:normalizeClass(["main-panel",{"el-card is-always-shadow":!unref(d)&&!r.headless,"has-sidebar":unref(s)}])},[unref(d)?(openBlock(),createBlock(I,mergeProps({key:0,modelValue:unref(n),"onUpdate:modelValue":h[1]||(h[1]=_=>isRef(n)?n.value=_:n=_),type:"border-card"},unref(i).settings.tabs),{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(unref(i).sections,_=>(openBlock(),createBlock(V,{label:_.title,name:_.id},{default:withCtx(()=>[_.fields?(openBlock(),createElementBlock("div",_hoisted_7,[(openBlock(!0),createElementBlock(Fragment,null,renderList(_.fields,(v,C)=>(openBlock(),createBlock(E,{"form-id":r.formId,"field-data":v,"data-path":v.id},null,8,["form-id","field-data","data-path"]))),256))])):createCommentVNode("",!0)]),_:2},1032,["label","name"]))),256))]),_:1},16,["modelValue"])):(openBlock(),createElementBlock("div",_hoisted_8,[unref(i).fields?(openBlock(),createElementBlock("div",_hoisted_9,[(openBlock(!0),createElementBlock(Fragment,null,renderList(unref(i).fields,(_,v)=>(openBlock(),createBlock(E,{"form-id":r.formId,"field-data":_,"data-path":_.id},null,8,["form-id","field-data","data-path"]))),256))])):createCommentVNode("",!0)]))],2),unref(s)?(openBlock(),createElementBlock("div",_hoisted_10,[createVNode(x,null,{default:withCtx(()=>[unref(i).sidebar.fields?(openBlock(),createElementBlock("div",_hoisted_11,[(openBlock(!0),createElementBlock(Fragment,null,renderList(unref(i).sidebar.fields,(_,v)=>(openBlock(),createBlock(E,{"form-id":r.formId,"field-data":_,"data-path":_.id},null,8,["form-id","field-data","data-path"]))),256))])):createCommentVNode("",!0)]),_:1})])):createCommentVNode("",!0)],2)]),_:3},16,["class"])}}};export{_sfc_main as _,_sfc_main$2 as a,useFieldCondition as b,getFields as g,useResourceForm as u};