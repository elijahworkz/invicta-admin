import{u}from"./FormBase-09fee5e0.js";import{B as r,o as m,c as v,a as o,t as p,u as a}from"./main-07bc4afd.js";import"./form-54beed3a.js";import"./card-8e588c1e.js";/* empty css                      */import"./icon-b01a07f6.js";import"./event-9519ab40.js";import"./typescript-defaf979.js";import"./vnode-4df357b1.js";const w={class:"google-preview"},h=o("div",{class:"google-preview_label mb-2"}," Google search preview ",-1),F={class:"google-preview_box mb-2"},f={class:"google-preview_title"},b={class:"google-preview_link"},x={class:"google-preview_description"},D={__name:"googlePreviewField",props:{formId:String,data:Object,path:String},setup(_){var n;const e=_,i=u(e.formId),l=(n=i.data)==null?void 0:n.uri,c=r(()=>i.get("slug")??""),g=r(()=>{if(!l)return c.value;let t=l.split("/");return t[t.length-1]=c.value,t.join("/")}),s=r(()=>{const t=e.data.props&&e.data.props.titleField?e.data.props.titleField:"seo.title",d=e.data.props&&e.data.props.descriptionField?e.data.props.descriptionField:"seo.description";return{title:i.get(t),url:Invicta.config.appUrl+"/"+g.value,description:i.get(d)}});return(t,d)=>(m(),v("div",w,[h,o("div",F,[o("p",f,p(a(s).title),1),o("p",b,p(a(s).url),1),o("p",x,p(a(s).description),1)])]))}};export{D as default};