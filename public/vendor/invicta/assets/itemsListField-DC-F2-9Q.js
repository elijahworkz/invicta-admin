import{_ as u}from"./FieldBase-DF0ymt1p.js";import{_ as f}from"./ItemsList-C6leebsM.js";import{u as h}from"./FormBase-CohRuygb.js";import{y as s,o as _,f as w,w as I,k as F,u as i,aq as g}from"./vendor-DwU9H8nE.js";/* empty css                  */import"./field-CoOOIqFY.js";import"./main-DnzsR3Gc.js";import"./ItemsSelector-BsOprzaW.js";import"./resource-BkqrofhC.js";/* empty css                 */import"./Loading-BBag9RkF.js";/* empty css               */import"./functions-BmgSoNWW.js";import"./Filters-B9z-yrJB.js";/* empty css                    */import"./vuedraggable.umd-DXyQcb_O.js";import"./vue.runtime.esm-bundler-CNw3Z0hu.js";/* empty css             *//* empty css                      *//* empty css             */import"./dynamic-import-helper-BheWnx7M.js";const G={__name:"itemsListField",props:{formId:String,data:Object,path:String},setup(e){const t=e,o=h(t.formId),m=`/api/resource/${t.data.resource}/items`,c=s(()=>"actions"in t.data?t.data.actions:{addItems:!0,createItems:!0}),n=s(()=>o.get(t.path,[]));function p(r){let a=[...g(r)];o.set(t.path,a)}return(r,a)=>{const d=f,l=u;return _(),w(l,{"form-id":e.formId,"field-props":t,class:"related-field"},{default:I(()=>[F(d,{list:i(n),sortable:!0,"items-url":m,"field-data":e.data,resource:e.data.resource,options:i(c),select:e.data.select,where:e.data.where,onUpdated:p},null,8,["list","field-data","resource","options","select","where"])]),_:1},8,["form-id","field-props"])}}};export{G as default};