import{s as computed,ar as get,o as openBlock,d as createElementBlock,b as renderSlot,n as normalizeClass,u as unref,as as defineStore,ai as T,at as set,aj as pickBy,au as split,ak as isString,av as shallowRef,c as createBlock,w as withCtx,ah as resolveDynamicComponent,e as createCommentVNode,i as createVNode,F as Fragment,k as renderList,f as createBaseVNode,H as createTextVNode,t as toDisplayString,an as mdiTranslate,O as Oe,G as ElButton,J as ElDropdownItem,ag as ElDropdownMenu,L as ElDropdown,r as resolveComponent,ae as arrow_left_default,a5 as ElIcon,al as toRaw,aw as has,h as ref,z as onMounted,N as watch,ax as onKeyStroke,ap as isRef,j as withDirectives,v as vShow,ay as mergeProps,af as arrow_down_default,az as plus_default,aA as ElRadio,aB as ElRadioGroup,aC as ElPopover,a0 as ElButtonGroup,aD as ElTabPane,aE as ElTabs,a1 as ElCard,aa as ElForm}from"./vendor-0fe75759.js";/* empty css             *//* empty css             */import{b as __vitePreload,a as _sfc_main$5}from"./main-1b37edeb.js";/* empty css                      *//* empty css             */const tabs="",tabPane="",_sfc_main$4={__name:"FieldRow",props:{fieldData:Object},setup(i){const e=i,{type:t}=e.fieldData,o=computed(()=>{let r;return t=="divider"&&e.fieldData.section?r="section":t=="row"?r=["field-row-full","inline-fields"]:r=[`field-row-${get(e.fieldData,"width","full")}`,get(e.fieldData,"customClass","")],r});return(r,a)=>(openBlock(),createElementBlock("div",{class:normalizeClass(unref(o))},[renderSlot(r.$slots,"default")],2))}},Invicta$1=window.Invicta,definedForms=new Map,useResourceForm=i=>{let e=`resourceForm-${i}`;return definedForms.has(e)||definedForms.set(e,defineResourceForm(i)),definedForms.get(e)},defineResourceForm=i=>defineStore(`resourceForm-${i}`,{state:()=>({mode:"create",form:null,meta:{},localizations:null,actionUrl:null,readOnly:!0,blueprint:{},rules:{},assetActions:[],api:!1,errors:Invicta$1.errors}),actions:{init(e,t,o){var d;let r=e.item?e.item:null;this.meta=e.meta,this.mode=(d=e.meta)!=null&&d.id?"edit":"create",this.actionUrl=t,this.blueprint=e.blueprint,this.localizations=e.localizations,this.api=o;let a=this.prepareFields(this.blueprint,r);this.form=T(a),Invicta$1.emit("resource-form-ready"),this.getAssetActions()},get(e,t=null){let o=get(this.form,e,t);return!o&&t?t:o},set(e,t){set(this.form,e,t)},setRelated(e){this.form[e]=this.data[e]},prepareFields(e,t=null){const o=n=>{let l="path"in n?n.path:n.id;l=l.includes(".")?split(l,".")[0]:l;let s="defaultValue"in n?n.defaultValue:null;return t&&l in t?t[l]:s},r=n=>n.reduce((l,s)=>{if(s.fields){let c=r(s.fields);return{...l,...c}}else if(s.id&&s.type.includes("related")){let c=o(s);return l[s.id]=c,l}return l},{}),a=n=>n.reduce((l,s)=>{if(s.id){let c="path"in s?s.path:s.id,m=c.includes(".")?split(c,"."):!1;c=m?m[0]:c,c=c=="data"?"_data":c;let f=o(s);if(s.type=="toggle"&&typeof f=="number"&&(f=!!f),l[c]=f,this.rules[c]=s.validation?s.validation:"nullable",s.fields)if(s.type=="json"&&s.hasOwnProperty("populateFields")&&s.populateFields)f===null&&(l[c]=s.fields.reduce((p,u)=>(p[u.id]=u.defaultValue||null,p),{}));else{let p=r(s.fields);l={...l,...p}}if(m&&s.type.includes("related")){let p=m[m.length-1];l[p]=t?t[p]:null}return l}else if(s.type=="row"){let c=a(s.fields);l={...l,...c}}return l},{});let d={};return e.fields&&(d=a(e.fields)),e.sidebar&&e.sidebar.fields&&(d={...d,...a(e.sidebar.fields)}),e.sections&&e.sections.forEach(n=>{n.fields&&(d={...d,...a(n.fields)})}),d},setReadOnly(e){function t(o){return o.map(r=>r.fields?t(r.fields):(("path"in r?r.path:r.id)==e&&(r.readOnly=!0),r)),o}this.parseBlueprint(t)},parseBlueprint(e){this.blueprint.fields&&(this.blueprint.fields=e(this.blueprint.fields)),this.blueprint.sidebar&&this.blueprint.sidebar.fields&&(this.blueprint.sidebar.fields=e(this.blueprint.sidebar.fields)),this.blueprint.sections&&this.blueprint.sections.forEach((t,o)=>{t.fields&&(this.blueprint.sections[o].fields=e(t.fields))})},getAssetActions(){Invicta$1.axios.get("api/assets/field-actions").then(({data:e})=>{this.assetActions=e})},formData(){return this.form.transform(e=>({...pickBy(e)})).data()},submit(e){if(this.api){this.apiSubmit();return}document.removeEventListener("inertia:before",this.confirmUnsavedChanges);let t=this.rules;this.form.transform(o=>({...o,postSubmitAction:e,validation:t})).post(this.actionUrl,{onSuccess:()=>{e=="create"&&this.form.reset(),this.dirty=!1,Invicta$1.emit("resource-form-submitted")}})},apiSubmit(){let e={fields:this.formData(),validation:this.rules};typeof this.api=="object"&&(e={...e,...this.api}),Invicta$1.axios.post(this.actionUrl,e).then(({data:t})=>{Invicta$1.message(t.message),Invicta$1.emit("resource-form-submitted")}).catch(({response:t})=>{if(t.status==422){let o={};for(const[r,a]of Object.entries(t.data.errors))o[r]=Array.isArray(a)?a[0]:a;Invicta$1.setErrors(o)}})},confirmUnsavedChanges(e){this.dirty&&(confirm("You have unsaved changes. Leave anyway?")?document.removeEventListener("inertia:before",this.confirmUnsavedChanges):e.preventDefault())}},getters:{title(){let e=this.meta.pageTitle;return this.mode=="edit"&&this.meta.titleField!=="id"&&this.meta.titleField in this.form&&(e=get(this.form,this.meta.titleField)),"published"in this.form&&(e=`<i class="icon-status ${get(this.form,"published")?"success":""} mr-2"></i> ${e}`),e},id(){return get(this.form,"id")}}})();function getFields(i){return i.reduce((e,t)=>{if(t.fields){let o=getFields(t.fields);return{...e,...o}}else if(t.id)return e[t.id]="",e;return e},{})}const useFieldCondition=(i,e)=>computed(()=>{let t=get(i,"if",null)||get(i,"if_any",null)||get(i,"if_all",null);if(!t)return!0;if(Array.isArray(t)){if("if_all"in i)return t.every(r=>processCondition(e,r));if("if_any"in i){let o=!1;return t.forEach(r=>{processCondition(e,r)&&(o=!0)}),o}}return processCondition(e,t)});function processCondition(formId,condition){const resourceForm=useResourceForm(formId);let target=resourceForm.get(condition.id);console.log("target",target,condition.id);let operator=prepareOperator(condition.operator),loperand=prepareOperand(target,operator),roperand=prepareOperand(condition.value,operator);if(operator=="in"||operator=="not in")return passesIncludesCondition(roperand,loperand,!operator.includes("not"));let expression=`${loperand} ${operator} ${roperand}`;return console.log("condition expression",expression),eval(expression)}function passesIncludesCondition(i,e,t){const o=i.includes(e);return console.log(`is ${e} includes in ${i}: ${o}`),console.log(`included: ${t}`),t?o:!o}function prepareOperand(i,e){return[">",">=","<","<="].includes(e)?Number(i):isString(i)?JSON.stringify(i.trim()):i}function prepareOperator(i){switch(i){case"==":case"equal":case"equals":case"is":return"==";case"not equals":case"not equal":return"!==";case">":case"more":case"more than":return">";case">=":case"more or equal":case"more or equals":return">=";case"<":case"less":case"less than":return"<";case"<=":case"less or equal":case"less or equals":return"<=";default:return i}return i}const __variableDynamicImportRuntimeHelper=(i,e)=>{const t=i[e];return t?typeof t=="function"?t():Promise.resolve(t):new Promise((o,r)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+e)))})},_sfc_main$3={__name:"FormField",props:{formId:String,fieldData:Object,dataPath:String},setup(i){const e=i;let t=shallowRef("textField"),r=(e.dataPath&&e.dataPath.includes(".")?split(e.dataPath,".")[0]:e.dataPath)=="data"?`_${e.dataPath}`:e.dataPath;const a=useFieldCondition(e.fieldData,e.formId);if(a)if(Invicta.componentExists(e.fieldData.type))t.value=e.fieldData.type;else{let d=e.fieldData.type.replace("-","");d=d=="group"?"json":d,__variableDynamicImportRuntimeHelper(Object.assign({"./fields/assetField.vue":()=>__vitePreload(()=>import("./assetField-835c1362.js"),["assets/assetField-835c1362.js","assets/main-1b37edeb.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/main-72fff4e5.css","assets/AssetForm-a6b50c4a.js","assets/AssetForm-99927c67.css","assets/AssetSelector-7b69d7f1.js","assets/ResourceTable-73e85e20.js","assets/ActionsDropdown-6670124b.js","assets/CheckTree-b647ed57.js","assets/checkbox-8e4b7931.css","assets/functions-582b82eb.js","assets/ResourceTable-4dddd1d4.css","assets/icon-c883f2bf.css","assets/select-b04604b5.css","assets/Loading-0552770b.js","assets/Loading-f263c3e6.css","assets/GridView-b8a665b3.js","assets/GridView-fc47c4d7.css","assets/progress-72ebe088.css","assets/base-b6e288d4.css","assets/el-overlay-747e8031.css","assets/Search-63278062.js","assets/AssetSelector-bb222d60.css","assets/FieldBase-4661e4c5.js","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/assetField-e4717b21.css","assets/form-1d91e64a.css","assets/card-2df547ab.css"]),"./fields/blueprintField.vue":()=>__vitePreload(()=>import("./blueprintField-ff3a7677.js"),["assets/blueprintField-ff3a7677.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/select-b04604b5.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/checkboxGroupField.vue":()=>__vitePreload(()=>import("./checkboxGroupField-e187be1d.js"),["assets/checkboxGroupField-e187be1d.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/checkboxGroupField-64672769.css","assets/checkbox-8e4b7931.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/codeField.vue":()=>__vitePreload(()=>import("./codeField-6f12bcf8.js"),["assets/codeField-6f12bcf8.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/functions-582b82eb.js","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/codeField-bbb6195c.css","assets/base-b6e288d4.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/copyField.vue":()=>__vitePreload(()=>import("./copyField-66047b18.js"),["assets/copyField-66047b18.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/dateField.vue":()=>__vitePreload(()=>import("./dateField-0b6129c8.js"),["assets/dateField-0b6129c8.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/dateField-effb14de.css","assets/date-picker-45200c59.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/dividerField.vue":()=>__vitePreload(()=>import("./dividerField-06997e62.js"),["assets/dividerField-06997e62.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/dividerField-f4d3946e.css"]),"./fields/dynamicRelatedListField.vue":()=>__vitePreload(()=>import("./dynamicRelatedListField-ae29089b.js"),["assets/dynamicRelatedListField-ae29089b.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/ItemsList-f8ffd29e.js","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/ItemsSelector-a66574d0.js","assets/ResourceTable-73e85e20.js","assets/ActionsDropdown-6670124b.js","assets/CheckTree-b647ed57.js","assets/checkbox-8e4b7931.css","assets/functions-582b82eb.js","assets/ResourceTable-4dddd1d4.css","assets/icon-c883f2bf.css","assets/select-b04604b5.css","assets/Loading-0552770b.js","assets/Loading-f263c3e6.css","assets/Filters-bf1bc384.js","assets/Filters-f5948a4a.css","assets/date-picker-45200c59.css","assets/Search-63278062.js","assets/vuedraggable.umd-b9f3684b.js","assets/vue.runtime.esm-bundler-b3f6c0a0.js","assets/ItemsList-f63bf8fa.css","assets/link-790eddeb.css","assets/form-1d91e64a.css","assets/card-2df547ab.css"]),"./fields/googlePreviewField.vue":()=>__vitePreload(()=>import("./googlePreviewField-67f15ad1.js"),["assets/googlePreviewField-67f15ad1.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/googlePreviewField-dfed5c47.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/dropdown-menu-e3b0c442.css","assets/icon-c883f2bf.css"]),"./fields/hiddenField.vue":()=>__vitePreload(()=>import("./hiddenField-a17beaba.js"),["assets/hiddenField-a17beaba.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/dropdown-menu-e3b0c442.css","assets/icon-c883f2bf.css"]),"./fields/infoPanelField.vue":()=>__vitePreload(()=>import("./infoPanelField-7ec64c26.js"),["assets/infoPanelField-7ec64c26.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css"]),"./fields/itemsListField.vue":()=>__vitePreload(()=>import("./itemsListField-91b4c8cc.js"),["assets/itemsListField-91b4c8cc.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/ItemsList-f8ffd29e.js","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/ItemsSelector-a66574d0.js","assets/ResourceTable-73e85e20.js","assets/ActionsDropdown-6670124b.js","assets/CheckTree-b647ed57.js","assets/checkbox-8e4b7931.css","assets/functions-582b82eb.js","assets/ResourceTable-4dddd1d4.css","assets/icon-c883f2bf.css","assets/select-b04604b5.css","assets/Loading-0552770b.js","assets/Loading-f263c3e6.css","assets/Filters-bf1bc384.js","assets/Filters-f5948a4a.css","assets/date-picker-45200c59.css","assets/Search-63278062.js","assets/vuedraggable.umd-b9f3684b.js","assets/vue.runtime.esm-bundler-b3f6c0a0.js","assets/ItemsList-f63bf8fa.css","assets/link-790eddeb.css","assets/form-1d91e64a.css","assets/card-2df547ab.css"]),"./fields/jsonField.vue":()=>__vitePreload(()=>import("./jsonField-4f3ab340.js"),["assets/jsonField-4f3ab340.js","assets/field-4b4595bf.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/dropdown-menu-e3b0c442.css","assets/icon-c883f2bf.css"]),"./fields/keyValueField.vue":()=>__vitePreload(()=>import("./keyValueField-8b02f36a.js"),["assets/keyValueField-8b02f36a.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/keyValueField-ec387ca6.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/linkField.vue":()=>__vitePreload(()=>import("./linkField-d839beb2.js"),["assets/linkField-d839beb2.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/select-b04604b5.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/metaField.vue":()=>__vitePreload(()=>import("./metaField-f297ba49.js"),["assets/metaField-f297ba49.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/metaField-5e4d3e63.css","assets/progress-72ebe088.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/numberField.vue":()=>__vitePreload(()=>import("./numberField-cca9d6c7.js"),["assets/numberField-cca9d6c7.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/numberField-1c2c372a.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/rateField.vue":()=>__vitePreload(()=>import("./rateField-e7326a02.js"),["assets/rateField-e7326a02.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/rateField-de1fed42.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/relatedListField.vue":()=>__vitePreload(()=>import("./relatedListField-06847e2d.js"),["assets/relatedListField-06847e2d.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/ItemsList-f8ffd29e.js","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/ItemsSelector-a66574d0.js","assets/ResourceTable-73e85e20.js","assets/ActionsDropdown-6670124b.js","assets/CheckTree-b647ed57.js","assets/checkbox-8e4b7931.css","assets/functions-582b82eb.js","assets/ResourceTable-4dddd1d4.css","assets/icon-c883f2bf.css","assets/select-b04604b5.css","assets/Loading-0552770b.js","assets/Loading-f263c3e6.css","assets/Filters-bf1bc384.js","assets/Filters-f5948a4a.css","assets/date-picker-45200c59.css","assets/Search-63278062.js","assets/vuedraggable.umd-b9f3684b.js","assets/vue.runtime.esm-bundler-b3f6c0a0.js","assets/ItemsList-f63bf8fa.css","assets/link-790eddeb.css","assets/form-1d91e64a.css","assets/card-2df547ab.css"]),"./fields/relatedSelectField.vue":()=>__vitePreload(()=>import("./relatedSelectField-1b3b0b33.js"),["assets/relatedSelectField-1b3b0b33.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/relatedSelectField-f4b990d3.css","assets/select-b04604b5.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/repeaterField.vue":()=>__vitePreload(()=>import("./repeaterField-7ea98289.js"),["assets/repeaterField-7ea98289.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/vuedraggable.umd-b9f3684b.js","assets/vue.runtime.esm-bundler-b3f6c0a0.js","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/repeaterField-04b29806.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/rowField.vue":()=>__vitePreload(()=>import("./rowField-b7b102d4.js"),["assets/rowField-b7b102d4.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/dropdown-menu-e3b0c442.css","assets/icon-c883f2bf.css"]),"./fields/selectField.vue":()=>__vitePreload(()=>import("./selectField-5c873bb8.js"),["assets/selectField-5c873bb8.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/select-b04604b5.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/slugField.vue":()=>__vitePreload(()=>import("./slugField-711f864e.js"),["assets/slugField-711f864e.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/tableField.vue":()=>__vitePreload(()=>import("./tableField-299d2486.js"),["assets/tableField-299d2486.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/ResourceTable-73e85e20.js","assets/ActionsDropdown-6670124b.js","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/CheckTree-b647ed57.js","assets/checkbox-8e4b7931.css","assets/functions-582b82eb.js","assets/ResourceTable-4dddd1d4.css","assets/icon-c883f2bf.css","assets/select-b04604b5.css","assets/Loading-0552770b.js","assets/Loading-f263c3e6.css","assets/Filters-bf1bc384.js","assets/Filters-f5948a4a.css","assets/date-picker-45200c59.css"]),"./fields/tagsField.vue":()=>__vitePreload(()=>import("./tagsField-611c2f91.js"),["assets/tagsField-611c2f91.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/tagsField-5bdf7faf.css","assets/icon-c883f2bf.css","assets/form-1d91e64a.css","assets/card-2df547ab.css"]),"./fields/termsField.vue":()=>__vitePreload(()=>import("./termsField-f0a307d4.js"),["assets/termsField-f0a307d4.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/termsField-02d6246d.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/textEditorField.vue":()=>__vitePreload(()=>import("./textEditorField-998128a1.js"),["assets/textEditorField-998128a1.js","assets/main-1b37edeb.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/main-72fff4e5.css","assets/ItemsSelector-a66574d0.js","assets/ResourceTable-73e85e20.js","assets/ActionsDropdown-6670124b.js","assets/CheckTree-b647ed57.js","assets/checkbox-8e4b7931.css","assets/functions-582b82eb.js","assets/ResourceTable-4dddd1d4.css","assets/icon-c883f2bf.css","assets/select-b04604b5.css","assets/Loading-0552770b.js","assets/Loading-f263c3e6.css","assets/Filters-bf1bc384.js","assets/Filters-f5948a4a.css","assets/date-picker-45200c59.css","assets/Search-63278062.js","assets/AssetSelector-7b69d7f1.js","assets/GridView-b8a665b3.js","assets/GridView-fc47c4d7.css","assets/progress-72ebe088.css","assets/base-b6e288d4.css","assets/el-overlay-747e8031.css","assets/AssetSelector-bb222d60.css","assets/FieldBase-4661e4c5.js","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/vue.runtime.esm-bundler-b3f6c0a0.js","assets/textEditorField-328cc2ba.css","assets/form-1d91e64a.css","assets/card-2df547ab.css"]),"./fields/textField.vue":()=>__vitePreload(()=>import("./textField-b406583e.js"),["assets/textField-b406583e.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/textareaField.vue":()=>__vitePreload(()=>import("./textareaField-70270acc.js"),["assets/textareaField-70270acc.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/toggleField.vue":()=>__vitePreload(()=>import("./toggleField-87998cb6.js"),["assets/toggleField-87998cb6.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/switch-52ab10b3.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"]),"./fields/videoField.vue":()=>__vitePreload(()=>import("./videoField-fc1fde3e.js"),["assets/videoField-fc1fde3e.js","assets/FieldBase-4661e4c5.js","assets/vendor-0fe75759.js","assets/vendor-e4e6910a.css","assets/field-4b4595bf.js","assets/dropdown-menu-e3b0c442.css","assets/main-1b37edeb.js","assets/main-72fff4e5.css","assets/form-1d91e64a.css","assets/card-2df547ab.css","assets/icon-c883f2bf.css"])}),`./fields/${d}Field.vue`).then(n=>t.value=n.default).catch(n=>console.log(n))}return(d,n)=>{const l=_sfc_main$4;return unref(a)?(openBlock(),createBlock(l,{key:0,"field-data":i.fieldData},{default:withCtx(()=>[(openBlock(),createBlock(resolveDynamicComponent(unref(t)),{"form-id":i.formId,data:i.fieldData,path:unref(r)},null,8,["form-id","data","path"]))]),_:1},8,["field-data"])):createCommentVNode("",!0)}}},popover="",radioGroup="",radio="",_hoisted_1$1={class:"ml-2"},_sfc_main$2={__name:"Localizations",props:{localizations:Object,formId:String,resourceUrl:String},setup(i){const e=i;useResourceForm(e.formId);const t=computed(()=>{let{localizations:a}=e;return Object.values(a).filter(d=>d.origin!==null)[0].origin}),o=a=>a.origin?"Original":a.current?"Current translation":`${a.translation?"Edit":"Create"} ${a.name} translation`,r=a=>{let d=a.translation?a.translation:a.origin?a.origin:null,n=d?`${d}/edit`:`${t.value}/localize`;d?Oe.get(`${e.resourceUrl}/${n}`):Oe.get(`${e.resourceUrl}/${n}/${a.iso}`)};return(a,d)=>{const n=_sfc_main$5,l=ElButton,s=ElDropdownItem,c=ElDropdownMenu,m=ElDropdown;return openBlock(),createBlock(m,{class:"mr-4",onCommand:r},{dropdown:withCtx(()=>[createVNode(c,null,{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(i.localizations,f=>(openBlock(),createBlock(s,{key:f.iso,command:f,disabled:f.current,title:o(f)},{default:withCtx(()=>[createBaseVNode("i",{class:normalizeClass(["icon-status",{success:f.translation||f.origin}])},null,2),createTextVNode(),createBaseVNode("span",_hoisted_1$1,toDisplayString(f.name),1)]),_:2},1032,["command","disabled","title"]))),128))]),_:1})]),default:withCtx(()=>[createVNode(l,{size:"small",text:"",type:"info"},{default:withCtx(()=>[createVNode(n,{icon:unref(mdiTranslate),width:15,class:"mr-2"},null,8,["icon"]),createTextVNode(" Language ")]),_:1})]),_:1})}}},_sfc_main$1={__name:"BackLink",props:{data:Object},setup(i){return(e,t)=>{const o=ElIcon,r=resolveComponent("Link");return openBlock(),createBlock(r,{href:i.data.url,class:"breadcrumb"},{default:withCtx(()=>[createVNode(o,null,{default:withCtx(()=>[createVNode(unref(arrow_left_default))]),_:1}),createTextVNode(" "+toDisplayString(i.data.text),1)]),_:1},8,["href"])}}},FormBase_vue_vue_type_style_index_0_lang="",_hoisted_1={key:0,class:"flex items-end justify-between mb-4"},_hoisted_2={class:"mb-1"},_hoisted_3=["href"],_hoisted_4=["innerHTML"],_hoisted_5=createBaseVNode("svg",{class:"ml-2",viewBox:"0 0 24 24",width:"22"},[createBaseVNode("path",{fill:"currentColor",d:"M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"})],-1),_hoisted_6=["innerHTML"],_hoisted_7={class:"resource-actions flex items-center ml-auto"},_hoisted_8={class:"unsaved-indicator"},_hoisted_9={key:0,class:"fieldset"},_hoisted_10={key:1},_hoisted_11={key:0,class:"fieldset"},_hoisted_12={key:0,class:"sidebar"},_hoisted_13={key:0,class:"fieldset"},_sfc_main={__name:"FormBase",props:{formId:String,resource:Object,breadcrumb:Object,actionUrl:String,headless:{type:Boolean,default:!1},postSubmitActions:{type:Array,default:["back","edit","create"]},api:Boolean|Object,readOnly:{type:Boolean,default:!1}},emits:["submit","form-ready"],setup(i,{emit:e}){const t=i,o=useResourceForm(t.formId);o.readOnly=t.readOnly,o.init(toRaw(t.resource),t.actionUrl,t.api),e("form-ready"),Invicta.on("lock-form",u=>{console.log("I hear a call to lock form",u,t.formId),u==t.formId&&(o.readOnly=!0)}),Invicta.on("unlock-form",u=>{u==t.formId&&(o.readOnly=!1)});const r=o.blueprint,a=get(r.settings,"form",{"label-position":"top"}),d=has(r,"sections");let n=ref(null),l=null;d&&r.sections.length&&("tabs"in r.settings?(n.value="active"in r.settings.tabs?r.settings.tabs.active:r.sections[0].id,l="type"in r.settings.tabs?r.settings.tabs.type:"border-card"):n.value=r.sections[0].id);const s=has(r,"sidebar");onMounted(()=>{if(window.location.hash.length>0){let u=window.location.hash.substr(1)||"";n.value=u}}),watch(n,u=>{window.location.hash=u});const c=computed(()=>{let u=t.headless?"w-full":s?"w-sidebar":"w-compact";return a.class||u}),m=ref(t.postSubmitActions[0]),f={back:{icon:arrow_left_default,button:"Save & Back",option:"Go back"},close:{icon:arrow_left_default,button:"Save & Close",option:"Close Form"},edit:{icon:arrow_down_default,button:"Save & Stay",option:"Continue Editing"},create:{icon:plus_default,button:"Save & New",option:"Add New Item"}};onMounted(()=>{m.value=t.postSubmitActions.length>1&&Invicta.remember("post-submit-action")||t.postSubmitActions[0]}),watch(m,u=>Invicta.remember("post-submit-action",u));const p=()=>{o.submit(m.value)};return onKeyStroke("Enter",u=>{t.headless&&(u.preventDefault(),p())}),document.addEventListener("inertia:before",o.confirmUnsavedChanges),(u,v)=>{const b=_sfc_main$1,k=_sfc_main$2,g=ElButton,y=ElRadio,B=ElRadioGroup,w=ElPopover,V=ElButtonGroup,E=_sfc_main$3,F=ElTabPane,P=ElTabs,I=ElCard,D=ElForm;return openBlock(),createBlock(D,mergeProps({class:["invicta-form",unref(c)]},unref(a)),{default:withCtx(()=>[i.headless?createCommentVNode("",!0):(openBlock(),createElementBlock("div",_hoisted_1,[createBaseVNode("div",null,[i.breadcrumb?(openBlock(),createBlock(b,{key:0,class:"breadcrumb",data:i.breadcrumb},null,8,["data"])):createCommentVNode("",!0),createBaseVNode("h1",_hoisted_2,[unref(o).meta.itemUrl?(openBlock(),createElementBlock("a",{key:0,class:"flex items-center",href:unref(o).meta.itemUrl,title:"Visit URL",target:"_blank"},[createBaseVNode("span",{class:"flex items-center",innerHTML:unref(o).title},null,8,_hoisted_4),_hoisted_5],8,_hoisted_3)):(openBlock(),createElementBlock("span",{key:1,class:"flex items-center",innerHTML:unref(o).title},null,8,_hoisted_6))])]),createBaseVNode("div",_hoisted_7,[unref(o).localizations?(openBlock(),createBlock(k,{key:0,localizations:unref(o).localizations,"form-id":i.formId,"resource-url":i.resource.meta.indexUrl},null,8,["localizations","form-id","resource-url"])):createCommentVNode("",!0),renderSlot(u.$slots,"form-actions"),createVNode(V,{class:"relative"},{default:withCtx(()=>[createVNode(g,{type:"primary",onClick:p,disabled:unref(o).form.processing||!unref(o).form.isDirty},{default:withCtx(()=>[createTextVNode(toDisplayString(f[unref(m)].button),1)]),_:1},8,["disabled"]),createVNode(w,{title:"After Saving",teleported:!1},{reference:withCtx(()=>[createVNode(g,{disabled:unref(o).form.processing||!unref(o).form.isDirty,type:"primary",icon:f[unref(m)].icon},null,8,["disabled","icon"])]),default:withCtx(()=>[createVNode(B,{modelValue:unref(m),"onUpdate:modelValue":v[0]||(v[0]=_=>isRef(m)?m.value=_:null)},{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(i.postSubmitActions,_=>(openBlock(),createBlock(y,{label:_},{default:withCtx(()=>[createTextVNode(toDisplayString(f[_].option),1)]),_:2},1032,["label"]))),256))]),_:1},8,["modelValue"])]),_:1}),withDirectives(createBaseVNode("sup",_hoisted_8,null,512),[[vShow,unref(o).form.isDirty]])]),_:1})])])),createBaseVNode("div",{class:normalizeClass(["form-wrapper",{card:unref(l)=="card"}])},[createBaseVNode("div",{class:normalizeClass(["main-panel",{"el-card is-always-shadow":!unref(d)&&!i.headless,"has-sidebar":unref(s)}])},[unref(d)?(openBlock(),createBlock(P,mergeProps({key:0,modelValue:unref(n),"onUpdate:modelValue":v[1]||(v[1]=_=>isRef(n)?n.value=_:n=_),type:"border-card"},unref(r).settings.tabs),{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(unref(r).sections,_=>(openBlock(),createBlock(F,{label:_.title,name:_.id},{default:withCtx(()=>[_.fields?(openBlock(),createElementBlock("div",_hoisted_9,[(openBlock(!0),createElementBlock(Fragment,null,renderList(_.fields,(h,C)=>(openBlock(),createBlock(E,{"form-id":i.formId,"field-data":h,"data-path":h.id},null,8,["form-id","field-data","data-path"]))),256))])):createCommentVNode("",!0)]),_:2},1032,["label","name"]))),256))]),_:1},16,["modelValue"])):(openBlock(),createElementBlock("div",_hoisted_10,[unref(r).fields?(openBlock(),createElementBlock("div",_hoisted_11,[(openBlock(!0),createElementBlock(Fragment,null,renderList(unref(r).fields,(_,h)=>(openBlock(),createBlock(E,{"form-id":i.formId,"field-data":_,"data-path":_.id},null,8,["form-id","field-data","data-path"]))),256))])):createCommentVNode("",!0)]))],2),unref(s)?(openBlock(),createElementBlock("div",_hoisted_12,[createVNode(I,null,{default:withCtx(()=>[unref(r).sidebar.fields?(openBlock(),createElementBlock("div",_hoisted_13,[(openBlock(!0),createElementBlock(Fragment,null,renderList(unref(r).sidebar.fields,(_,h)=>(openBlock(),createBlock(E,{"form-id":i.formId,"field-data":_,"data-path":_.id},null,8,["form-id","field-data","data-path"]))),256))])):createCommentVNode("",!0)]),_:1})])):createCommentVNode("",!0)],2)]),_:3},16,["class"])}}};export{_sfc_main as _,_sfc_main$1 as a,_sfc_main$3 as b,useFieldCondition as c,getFields as g,useResourceForm as u};