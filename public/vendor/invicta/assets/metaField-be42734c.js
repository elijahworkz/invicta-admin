import{_ as b}from"./FieldBase-bfa75bd1.js";import{s as c,z as k,N as w,o as g,c as F,w as V,i as _,at as $,u as r,ao as y,d as B,e as I,ab as M,aR as E}from"./vendor-729ab78d.js";/* empty css                 */import{u as N}from"./field-ae2f09e1.js";import{u as R}from"./FormBase-278ff588.js";/* empty css                  *//* empty css             *//* empty css             */import"./main-69b98684.js";/* empty css                      *//* empty css             */const Y=["innerHTML"],A={__name:"metaField",props:{formId:String,data:Object,path:String},setup(l){const e=l,o={normal:e.data.props&&e.data.props.length_normal?e.data.props.length_normal:20,max:e.data.props&&e.data.props.lengths_max?e.data.props.lengths_max:70},u=N(e),s=u.value(""),i=R(e.formId),d=c(()=>e.data.props&&e.data.props.source?i.get(e.data.props.source):null),m=c(()=>{var a,p;const t=(a=e.data.props)!=null&&a.separator?` ${e.data.props.separator} `:" | ";return(p=e.data.props)!=null&&p.site_name?t+e.data.props.site_name:""});function f(t){i.mode=="create"&&(s.value=t+m.value)}k(()=>{var t;i.mode=="edit"&&!s.value&&(s.value=d.value?d.value+m.value:(t=e.data.props)==null?void 0:t.site_name)}),w(d,t=>{f(t)});const n=c(()=>{const t=s.value.length,a={};switch(a.percentage=Math.ceil(t*100/o.max),a.percentage=a.percentage>100?100:a.percentage,!0){case t<o.normal:a.status="warning",a.caption=`Your meta ${e.data.id} could be longer.`;break;case(t>=o.normal&&t<=o.max):a.status="success",a.caption=`Your meta ${e.data.id} is a good length.`;break;case t>o.max:a.status="exception",a.caption=`Your meta ${e.data.id} is too long, <strong>the ideal length is between ${o.normal} and ${o.max} characters.</strong>`;break}return a});return(t,a)=>{const p=M,h=E,x=b;return g(),F(x,{"form-id":l.formId,"field-props":e},{default:V(()=>[_(p,$({modelValue:r(s),"onUpdate:modelValue":a[0]||(a[0]=v=>y(s)?s.value=v:null),type:"textarea"},l.data.props,{disabled:r(u).disabled}),null,16,["modelValue","disabled"]),_(h,{class:"mt-2",percentage:r(n).percentage,"stroke-width":3,"text-inside":!0,status:r(n).status},null,8,["percentage","status"]),r(n).caption?(g(),B("span",{key:0,class:"info",innerHTML:r(n).caption},null,8,Y)):I("",!0)]),_:1},8,["form-id","field-props"])}}};export{A as default};