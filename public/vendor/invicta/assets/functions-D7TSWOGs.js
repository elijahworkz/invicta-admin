import{b5 as j,b6 as E,bt as F}from"./vendor-DNNQIDVf.js";var k={exports:{}};(function(e,i){(function(r,o){e.exports=o()})(j,function(){return function(r,o,d){r=r||{};var n=o.prototype,x={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function g(t,a,l,h){return n.fromToBase(t,a,l,h)}d.en.relativeTime=x,n.fromToBase=function(t,a,l,h,b){for(var m,c,M,p=l.$locale().relativeTime||x,v=r.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],w=v.length,f=0;f<w;f+=1){var u=v[f];u.d&&(m=h?d(t).diff(l,u.d,!0):l.diff(t,u.d,!0));var s=(r.rounding||Math.round)(Math.abs(m));if(M=m>0,s<=u.r||!u.r){s<=1&&f>0&&(u=v[f-1]);var B=p[u.l];b&&(s=b(""+s)),c=typeof B=="string"?B.replace("%d",s):B(s,a,u.l,M);break}}if(a)return c;var T=M?p.future:p.past;return typeof T=="function"?T(c):T.replace("%s",c)},n.to=function(t,a){return g(t,a,this,!0)},n.from=function(t,a){return g(t,a,this)};var y=function(t){return t.$u?d.utc():d()};n.toNow=function(t){return this.to(y(this),t)},n.fromNow=function(t){return this.from(y(this),t)}}})})(k);var $=k.exports;const G=E($);F.extend(G);const C=(e,i=0)=>{let r;return(...o)=>{clearTimeout(r),r=setTimeout(()=>{e(...o)},i)}};function N(e){return e.reduce((i,r)=>{if(!r.checked)return i;let o=r.children?N(r.children):[];return[...i,r.value,...o]},[])}function D(e,i){if(e==0)return"0 B";let r=1024,o=i||2,d=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],n=Math.floor(Math.log(e)/Math.log(r));return parseFloat((e/Math.pow(r,n)).toFixed(o))+" "+d[n]}export{N as c,C as d,D as f};
