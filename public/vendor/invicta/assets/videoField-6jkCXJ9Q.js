import{_ as I}from"./FieldBase-CJqAS9Xu.js";import{o as R,f as Z,w as z,k as P,aw as T,u as _,ag as $,Z as E}from"./vendor-DNNQIDVf.js";import{u as V}from"./field-B4hST7Z8.js";/* empty css                  */import"./FormBase-DYw9ghXD.js";/* empty css                      *//* empty css             */import"./main-bEgEWTd2.js";import"./dynamic-import-helper-BheWnx7M.js";/*! get-video-id v3.7.0 | @license MIT © Michael Wuergler | https://github.com/radiovisual/get-video-id */function u(t){return t.includes("?")&&(t=t.split("?")[0]),t.includes("/")&&(t=t.split("/")[0]),t.includes("&")&&(t=t.split("&")[0]),t}function j(t){var e=t;e=e.replace(/#t=.*$/,""),e=e.replace(/^https?:\/\//,"");var r=/youtube:\/\/|youtu\.be\/|y2u\.be\//g;if(r.test(e)){var i=e.split(r)[1];return u(i)}var s=/\/shorts\//g;if(s.test(e))return u(e.split(s)[1]);var o=/v=|vi=/g;if(o.test(e)){var n=e.split(o);return u(n[1].split("&")[0])}var a=/\/v\/|\/vi\/|\/watch\//g;if(a.test(e)){var d=e.split(a)[1];return u(d)}var l=/\/an_webp\//g;if(l.test(e)){var c=e.split(l)[1];return u(c)}var f=/\/e\//g;if(f.test(e)){var m=e.split(f)[1];return u(m)}var v=/\/embed\//g;if(v.test(e)){var p=e.split(v)[1];return u(p)}var g=/\/user\/([a-zA-Z\d]*)$/g;if(!g.test(e)){var w=/\/user\/(?!.*videos)/g;if(w.test(e)){var A=e.split("/");return u(A.pop())}var b=/\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;if(b.test(e))return u(e.match(b)[1]);var h=/\/live\//g;if(h.test(e)){var k=e.split(h)[1];return u(k)}}}function y(t,e){return F(t)||U(t,e)||B(t,e)||C()}function F(t){if(Array.isArray(t))return t}function U(t,e){var r=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(r!=null){var i=[],s=!0,o=!1,n,a;try{for(r=r.call(t);!(s=(n=r.next()).done)&&(i.push(n.value),!(e&&i.length===e));s=!0);}catch(d){o=!0,a=d}finally{try{!s&&r.return!=null&&r.return()}finally{if(o)throw a}}return i}}function B(t,e){if(t){if(typeof t=="string")return x(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);if(r==="Object"&&t.constructor&&(r=t.constructor.name),r==="Map"||r==="Set")return Array.from(t);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return x(t,e)}}function x(t,e){(e==null||e>t.length)&&(e=t.length);for(var r=0,i=new Array(e);r<e;r++)i[r]=t[r];return i}function C(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function O(t){var e=t;if(e.includes("#")){var r=e.split("#"),i=y(r,1);e=i[0]}if(e.includes("?")&&!e.includes("clip_id=")){var s=e.split("?"),o=y(s,1);e=o[0]}var n,a,d=/https?:\/\/vimeo\.com\/event\/(\d+)$/,l=d.exec(e);if(l&&l[1])return l[1];var c=/https?:\/\/vimeo\.com\/(\d+)/,f=c.exec(e);if(f&&f[1])return f[1];var m=["https?://player.vimeo.com/video/[0-9]+$","https?://vimeo.com/channels","groups","album"].join("|"),v=new RegExp(m,"gim");if(v.test(e))a=e.split("/"),a&&a.length>0&&(n=a.pop());else if(/clip_id=/gim.test(e)&&(a=e.split("clip_id="),a&&a.length>0)){var p=a[1].split("&"),g=y(p,1);n=g[0]}return n}function M(t){var e=/https:\/\/vine\.co\/v\/([a-zA-Z\d]*)\/?/,r=e.exec(t);if(r&&r.length>1)return r[1]}function D(t){var e;if(t.includes("embed"))return e=/embed\/(\w{8})/,t.match(e)[1];e=/\/v\/(\w{8})/;var r=t.match(e);if(r&&r.length>0)return r[1]}function H(t){var e=t.includes("embed")?/https:\/\/web\.microsoftstream\.com\/embed\/video\/([a-zA-Z\d-]*)\/?/:/https:\/\/web\.microsoftstream\.com\/video\/([a-zA-Z\d-]*)\/?/,r=e.exec(t);if(r&&r.length>1)return r[1]}function L(t){var e=/tiktok\.com(.*)\/video\/(\d+)/gm,r=e.exec(t);if(r&&r.length>2)return r[2]}function N(t){var e=/dailymotion\.com(.*)(video)\/([a-zA-Z\d]+)/gm,r=e.exec(t);if(r)return r[3];var i=/dai\.ly\/([a-zA-Z\d]+)/gm,s=i.exec(t);if(s&&s.length>1)return s[1];var o=/dailymotion\.com(.*)video=([a-zA-Z\d]+)/gm,n=o.exec(t);if(n&&n.length>2)return n[2]}function W(t){if(typeof t!="string")throw new TypeError("getSrc expected a string");var e=/src="(.*?)"/gm,r=e.exec(t);if(r&&r.length>=2)return r[1]}function q(t){if(typeof t!="string")throw new TypeError("get-video-id expects a string");var e=t;/<iframe/gi.test(e)&&(e=W(e)||""),e=e.trim(),e=e.replace("-nocookie",""),e=e.replace("/www.","/");var r={id:null,service:null};if(/\/\/google/.test(e)){var i=e.match(/url=([^&]+)&/);i&&(e=decodeURIComponent(i[1]))}return/youtube|youtu\.be|y2u\.be|i.ytimg\./.test(e)?r={id:j(e),service:"youtube"}:/vimeo/.test(e)?r={id:O(e),service:"vimeo"}:/vine/.test(e)?r={id:M(e),service:"vine"}:/videopress/.test(e)?r={id:D(e),service:"videopress"}:/microsoftstream/.test(e)?r={id:H(e),service:"microsoftstream"}:/tiktok\.com/.test(e)?r={id:L(e),service:"tiktok"}:/(dailymotion\.com|dai\.ly)/.test(e)&&(r={id:N(e),service:"dailymotion"}),r}const re={__name:"videoField",props:{formId:String,data:Object,path:String},setup(t){const e=t,r=V(e),i=r.value(null,s);function s(o){return q(o).id}return(o,n)=>{const a=E,d=I;return R(),Z(d,{"form-id":t.formId,"field-props":e},{default:z(()=>[P(a,T({modelValue:_(i),"onUpdate:modelValue":n[0]||(n[0]=l=>$(i)?i.value=l:null)},t.data.props,{disabled:_(r).disabled}),null,16,["modelValue","disabled"])]),_:1},8,["form-id","field-props"])}}};export{re as default};
