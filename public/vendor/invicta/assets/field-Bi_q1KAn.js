import{u as m,b as y}from"./FormBase-OGw2L5uy.js";import{y as i,am as o,ae as u,bf as O}from"./vendor-DJE8ga0U.js";const h=t=>{const l=m(t.formId),e=t.data,f=(a=null,n=null)=>{const{path:s}="path"in t.data?t.data:t,c="defaultValue"in t.data?t.data.defaultValue:a;return i({get(){return l.get(s,c)},set(r){r=n?n(r):r,l.set(s,r)}})},d=i(()=>l.readOnly?!0:e.readOnly?typeof e.readOnly=="boolean"?e.readOnly:y(e.readOnly,t.formId).value:!1);return{has(a){return o(e,a)},check(a,n){return u(e,a)==n},get(a,n=null){return u(e,a,n)},label(){let a=d.value?" <span>Read Only</span>":"";if(o(e,"label"))return`${e.label}${a}`;let n=e.id.split(".").pop()||e.id;return`${O(n)}${a}`},info(){u(e,"info",!1)},value:f,disabled:d.value}};export{h as u};
