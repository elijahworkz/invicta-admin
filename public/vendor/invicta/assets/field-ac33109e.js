import{u as c,c as m}from"./FormBase-6f6b74e6.js";import{y as u,as as i,an as o,bq as y}from"./vendor-e43ae8f2.js";const b=r=>{const l=c(r.formId),e=r.data,f=(t=null,n=null)=>{const{path:s}="path"in r.data?r.data:r;return u({get(){return l.get(s)||t},set(a){console.log("setting field",s,a),a=n?n(a):a,l.set(s,a)}})},d=u(()=>l.readOnly?!0:e.readOnly?typeof e.readOnly=="boolean"?e.readOnly:m(e.readOnly,r.formId).value:!1);return{has(t){return i(e,t)},check(t,n){return o(e,t)==n},get(t,n=null){return o(e,t,n)},label(){let t=d.value?" <span>Read Only</span>":"";if(i(e,"label"))return`${e.label}${t}`;let n=e.id.split(".").pop()||e.id;return`${y(n)}${t}`},info(){o(e,"info",!1)},value:f,disabled:d.value}};export{b as u};