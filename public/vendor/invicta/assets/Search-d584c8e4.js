import{h as s,z as i,N as u,o as h,c as p,u as o,at as d,bc as f,ab as m}from"./vendor-a8a416a2.js";import{a as g}from"./functions-5d36d463.js";const v={__name:"Search",props:{handle:String,currentSearch:{type:String,default:""},searchStrings:{type:Object,default:()=>({placeholder:"Search",title:"Type to search"})}},setup(t){const a=t,e=s(a.currentSearch);return i(()=>{a.currentSearch&&console.log("we have some initial search",a.currentSearch)}),u(e,g(l=>{console.log("debouncing works",l),Invicta.emit("search-change",{query:l,handle:a.handle})},400)),(l,r)=>{const c=m;return h(),p(c,{modelValue:o(e),"onUpdate:modelValue":r[0]||(r[0]=n=>d(e)?e.value=n:null),clearable:"",placeholder:t.searchStrings.placeholder,title:t.searchStrings.title,"prefix-icon":o(f),size:"large",onClear:r[1]||(r[1]=n=>e.value="")},null,8,["modelValue","placeholder","title","prefix-icon"])}}};export{v as _};