import{s as r,p as t,g as f}from"./index-5634fb36.js";import{ab as c,a as n,c as I,o as h,z as m,an as w,K as y}from"./runtime-core.esm-bundler-1c6b45c9.js";const U=()=>{const a=c(r,void 0),u=c(t,void 0);return{form:a,formItem:u}},j=(a,{formItemContext:u,disableIdGeneration:d,disableIdManagement:l})=>{d||(d=n(!1)),l||(l=n(!1));const s=n();let i;const p=I(()=>{var v;return!!(!a.label&&u&&u.inputIds&&((v=u.inputIds)==null?void 0:v.length)<=1)});return h(()=>{i=m([w(a,"id"),d],([v,e])=>{const o=v??(e?void 0:f().value);o!==s.value&&(u!=null&&u.removeInputId&&(s.value&&u.removeInputId(s.value),!(l!=null&&l.value)&&!e&&o&&u.addInputId(o)),s.value=o)},{immediate:!0})}),y(()=>{i&&i(),u!=null&&u.removeInputId&&s.value&&u.removeInputId(s.value)}),{isLabeledByFormItem:p,inputId:s}};export{j as a,U as u};