import{ca as j,a4 as B}from"./main-d76c405e.js";var g={},N={get exports(){return g},set exports(t){g=t}};(function(t,i){(function(e,a){t.exports=a()})(j,function(){return function(e,a,f){e=e||{};var d=a.prototype,x={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function b(r,n,s,h){return d.fromToBase(r,n,s,h)}f.en.relativeTime=x,d.fromToBase=function(r,n,s,h,k){for(var l,m,p,y=s.$locale().relativeTime||x,v=e.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],$=v.length,c=0;c<$;c+=1){var o=v[c];o.d&&(l=h?f(r).diff(s,o.d,!0):s.diff(r,o.d,!0));var u=(e.rounding||Math.round)(Math.abs(l));if(p=l>0,u<=o.r||!o.r){u<=1&&c>0&&(o=v[c-1]);var M=y[o.l];k&&(u=k(""+u)),m=typeof M=="string"?M.replace("%d",u):M(u,n,o.l,p);break}}if(n)return m;var T=p?y.future:y.past;return typeof T=="function"?T(m):T.replace("%s",m)},d.to=function(r,n){return b(r,n,this,!0)},d.from=function(r,n){return b(r,n,this)};var w=function(r){return r.$u?f.utc():f()};d.toNow=function(r){return this.to(w(this),r)},d.fromNow=function(r){return this.from(w(this),r)}}})})(N);const S=g;B.extend(S);function G(t){return t=typeof t=="number"?t*1e3:t,new Date(t).toLocaleString(["en-US"],{month:"short",day:"2-digit",year:"numeric"})}const L=(t,i=0)=>{let e;return(...a)=>{clearTimeout(e),e=setTimeout(()=>{t(...a)},i)}};function D(t){return t.reduce((i,e)=>{if(!e.checked)return i;let a=e.children?D(e.children):[];return[...i,e.value,...a]},[])}export{L as a,D as c,G as d};