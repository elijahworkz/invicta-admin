import{_ as f}from"./FieldBase.75788826.js";import{_ as u}from"./ItemsList.ffeceb99.js";import{u as _}from"./FormBase.2c88231c.js";import{B as I,Q as h,aL as x,o as g,f as B,w as F,b as $,e as m}from"./main.a5ff2e24.js";/* empty css                  */import"./field.de67f8da.js";import"./form.14015558.js";import"./ItemsSelector.59d272c2.js";import"./resource.177ca908.js";import"./select.95ce181f.js";import"./index.1151f2e6.js";import"./typescript.72bf8adc.js";import"./icon.dfc20686.js";import"./scroll.e25d9b63.js";import"./validator.b92c0772.js";import"./ActionsDropdown.847b3c30.js";import"./functions.a7c921db.js";import"./events.93559d81.js";import"./Loading.49970fec.js";import"./_plugin-vue_export-helper.cdc0426e.js";import"./Filters.8986dc00.js";import"./Search.111be25c.js";import"./vuedraggable.umd.4efdb093.js";import"./link.d3e1f2ae.js";import"./card.1650c4a6.js";const P={__name:"dynamicRelatedListField",props:{formId:String,data:Object,path:String},setup(r){const i=r,t=_(i.formId),p=t.id,e=i.data.id,d=`/resource/${t.meta.handle}/relationship/${e}`,c=I(()=>t.get(e,[]));h(()=>{Invicta.axios.get(d,{params:{item:p}}).then(({data:o})=>{let n=x.exports.map(o,(a,s)=>({id:parseInt(s),title:a}));t.set(e,n)})});function l(o){t.set(e,o)}return(o,n)=>{const a=u,s=f;return g(),B(s,{"form-id":r.formId,"field-props":i,class:"related-field"},{default:F(()=>[$(a,{list:m(c),sortable:!1,"items-url":d,"field-data":r.data,resource:m(e),"item-id":m(p),options:{addItems:!0,createItems:!0},onUpdated:l},null,8,["list","field-data","resource","item-id"])]),_:1},8,["form-id","field-props"])}}};export{P as default};