import{A as n,G as s,o as i,f as u,e as h,c3 as p}from"./main.a5ff2e24.js";import{d}from"./functions.a7c921db.js";import{E as m}from"./index.1151f2e6.js";const _={__name:"Search",props:{handle:String,currentSearch:String,searchStrings:{type:Object,default:()=>({placeholder:"Search",title:"Type to search"})}},setup(e){const t=e,r=n(t.currentSearch);return s(r,d(a=>{console.log("debouncing works",a),Invicta.emit("search-change",{query:a,handle:t.handle})},400)),(a,c)=>{const l=m;return i(),u(l,{modelValue:r.value,"onUpdate:modelValue":c[0]||(c[0]=o=>r.value=o),clearable:"",placeholder:e.searchStrings.placeholder,title:e.searchStrings.title,"prefix-icon":h(p)},null,8,["modelValue","placeholder","title","prefix-icon"])}}};export{_};