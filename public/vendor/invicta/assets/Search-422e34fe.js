import{h as s,N as i,o as u,c as h,u as c,ao as p,b3 as d,a8 as f}from"./vendor-93dcaded.js";import{a as m}from"./functions-5ce8409c.js";const b={__name:"Search",props:{handle:String,currentSearch:{type:String,default:""},searchStrings:{type:Object,default:()=>({placeholder:"Search",title:"Type to search"})}},setup(a){const r=a,e=s(r.currentSearch);return i(e,m(t=>{console.log("debouncing works",t),Invicta.emit("search-change",{query:t,handle:r.handle})},400)),(t,l)=>{const n=f;return u(),h(n,{modelValue:c(e),"onUpdate:modelValue":l[0]||(l[0]=o=>p(e)?e.value=o:null),clearable:"",placeholder:a.searchStrings.placeholder,title:a.searchStrings.title,"prefix-icon":c(d)},null,8,["modelValue","placeholder","title","prefix-icon"])}}};export{b as _};