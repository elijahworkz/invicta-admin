import{A as n,G as s,o as i,f as u,e as h,bO as p}from"./main.f6278b25.js";import{d}from"./functions.177d6bff.js";import{E as m}from"./index.35541a22.js";const b={__name:"Search",props:{handle:String,currentSearch:String,searchStrings:{type:Object,default:()=>({placeholder:"Search",title:"Type to search"})}},setup(e){const t=e,r=n(t.currentSearch);return s(r,d(a=>{console.log("debouncing works",a),Invicta.emit("search-change",{query:a,handle:t.handle})},400)),(a,l)=>{const c=m;return i(),u(c,{modelValue:r.value,"onUpdate:modelValue":l[0]||(l[0]=o=>r.value=o),clearable:"",placeholder:e.searchStrings.placeholder,title:e.searchStrings.title,"prefix-icon":h(p)},null,8,["modelValue","placeholder","title","prefix-icon"])}}};export{b as _};