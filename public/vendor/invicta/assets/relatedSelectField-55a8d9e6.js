import{_ as I}from"./FieldBase-c2f2dbd8.js";import{j as m,ao as h,B as S,a3 as y,o as f,f as k,w as B,k as R,av as E,u as i,af as N,d as $,F as j,p as P,aF as U,aG as C}from"./vendor-8ceb49d3.js";/* empty css               */import{u as G}from"./field-376d6f63.js";import{u as K}from"./FormBase-16a67fb0.js";/* empty css                  *//* empty css                      *//* empty css             */import"./main-96037291.js";import"./dynamic-import-helper-be004503.js";/* empty css             */const Y={__name:"relatedSelectField",props:{formId:String,data:Object,path:String},setup(u){const t=u,p=m(!1),_=G(t),s=_.value(),v=K(t.formId);console.log("I have resource form",v);const d=h(t.data,"titleField","title"),O="props"in t.data?h(t.data.props,"remote",!1):!1,w=`/api/resource/${v.settings.handle}/relationship/${t.data.id}`,o=m([]),g=m([]);S(()=>{if(O)g.value=o.value=y(s.value,e=>({key:e.id,value:{id:e.id,name:e[d]},label:e[d]}));else{let e={title:d};e=b(e),F(e)}});async function V(e){if(e!==""){let a={title:d,search:e};a=b(a),await F(a,!0)}else o.value=[]}function F(e,a=!1){p.value=!0,Invicta.axios.get(w,{params:e}).then(({data:c})=>{let n=y(c,(r,l)=>{let x="path"in t.data?Number(r):{id:Number(r)};return{key:r,value:x,label:l}});a?o.value=[...g.value,...n]:o.value=n,p.value=!1})}function b(e){return t.data.where&&(e.where=t.data.where),t.data.sortBy&&(e.sort_by=t.data.sortBy),t.data.sortOrder&&(e.sort_order=t.data.sortOrder),e}return(e,a)=>{const c=U,n=C,r=I;return f(),k(r,{"form-id":u.formId,"field-props":t,class:"related-field"},{default:B(()=>[R(n,E({modelValue:i(s),"onUpdate:modelValue":a[0]||(a[0]=l=>N(s)?s.value=l:null),valueKey:"id","remote-method":V,loading:i(p),teleported:!1,disabled:i(_).disabled},u.data.props),{default:B(()=>[(f(!0),$(j,null,P(i(o),l=>(f(),k(c,{key:l.key,value:l.value,label:l.label},null,8,["value","label"]))),128))]),_:1},16,["modelValue","loading","disabled"])]),_:1},8,["form-id","field-props"])}}};export{Y as default};