import{_ as f}from"./FieldBase.f1435146.js";import{_ as u}from"./ItemsList.7f6ac889.js";import{u as _}from"./FormBase.9be26eae.js";import{m as I}from"./map.d9b08131.js";import{B as h,Q as g,o as x,f as $,w as b,b as B,e as m}from"./main.75dc240c.js";/* empty css                  */import"./field.0ce052f7.js";import"./_baseSet.8721e116.js";import"./form.e8182a08.js";import"./DragHandle.c0a54291.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./ItemsSelector.df81170e.js";import"./ResourceTable.281a7124.js";import"./select.72058e73.js";import"./index.458aa6e4.js";import"./typescript.72bf8adc.js";import"./scroll.864c50f4.js";import"./validator.6a5d6570.js";import"./functions.a68ec433.js";import"./popover.0472dc8f.js";import"./resource.c4f35c5e.js";import"./_baseIteratee.8f15eccb.js";import"./_getTag.1688db6d.js";import"./_getAllKeysIn.150c0a69.js";import"./FilterBadges.6c6f203b.js";import"./Popover.be482954.js";import"./Loading.2840328d.js";import"./card.98da5424.js";import"./lodash.fee999a4.js";const Y={__name:"dynamicRelatedListField",props:{formId:String,data:Object,path:String},setup(o){const i=o,t=_(i.formId),a=t.id,r=i.data.id,s=`/resource/${t.meta.handle}/relationship/${r}`,d=h(()=>t.get(r,[]));g(()=>{Invicta.axios.get(s,{params:{item:a}}).then(({data:e})=>{let p=I(e,(l,c)=>({id:parseInt(c),title:l}));t.set(r,p)})});function n(e){t.set(r,e)}return(e,p)=>(x(),$(f,{"form-id":o.formId,"field-props":i,class:"related-field"},{default:b(()=>[B(u,{list:m(d),sortable:!1,"items-url":s,"field-data":o.data,resource:m(r),"item-id":m(a),options:{addItems:!0,createItems:!0},onUpdated:n},null,8,["list","field-data","resource","item-id"])]),_:1},8,["form-id","field-props"]))}};export{Y as default};