import{q as y,o as r,a as c,b as t,t as k,g as i,k as m,u as e,R as $,a0 as S,V as j,f as C,h as b,s as V,c as L,j as g,a1 as T,F as h,l as _,a2 as M,C as N,n as z}from"./vendor.b6c77bf0.js";import{_ as A}from"./PageComponent.33bd0c93.js";import{d as B}from"./app.e708f137.js";const D={class:"flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[31rem]"},H=["src","alt"],F={class:"mt-4 text-lg font-bold"},P=["innerHTML"],E={class:"flex justify-between items-center mt-3"},O=b(" Edit "),R={class:"flex items-center"},q={props:{survey:Object},emits:["delete"],setup(s,{emit:a}){return(d,o)=>{const f=y("router-link");return r(),c("div",D,[t("img",{src:s.survey.image_url,alt:s.survey.title,class:"w-full h-48 object-cover"},null,8,H),t("h4",F,k(s.survey.title),1),t("p",{innerHTML:s.survey.description,class:"overflow-hidden flex-1"},null,8,P),t("div",E,[i(f,{to:{name:"SurveyView",params:{id:s.survey.id}},class:"flex py-2 px-4 border border-transparent text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},{default:m(()=>[i(e($),{class:"h-5 w-5 mr-2"}),O]),_:1},8,["to"]),t("div",R,[i(f,{to:{name:"SurveyPublicView",params:{slug:s.survey.slug}},target:"_blank",class:"h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},{default:m(()=>[i(e(S),{class:"h-5 w-5"})]),_:1},8,["to"]),s.survey.id?(r(),c("button",{key:0,type:"button",onClick:o[0]||(o[0]=v=>a("delete",s.survey)),class:"h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"},[i(e(j),{class:"h-5 w-5 -mt-1 inline-block"})])):C("",!0)])])])}}},G={class:"flex justify-between items-center"},I=t("h1",{class:"text-3xl font-bold text-gray-900"},"Surveys",-1),J=b(" Add New Survey "),K={key:1},Q={class:"grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"},U={class:"flex justify-center mt-5"},W={class:"relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px","aria-label":"Pagination"},X=["disabled","onClick","innerHTML"],se={setup(s){const a=B(),{surveys:d}=V(a);a.getSurveys();const o=L(()=>({active:"z-10 bg-indigo-50 border-indigo-500 text-indigo-600",noActive:"bg-white border-gray-300 text-gray-500 hover:bg-gray-50",first:"rounded-l-md",last:"rounded-r-md"})),f=l=>{confirm("Are you sure you want to delete this survey? Operation can't be undone!")&&a.deleteSurvey(l)},v=l=>{!l.url||l.active||a.getSurveys({url:l.url})};return(l,Y)=>{const x=y("router-link"),p=y("loading-component");return r(),g(e(A),null,{header:m(()=>[t("div",G,[I,i(x,{to:{name:"SurveyCreate"},class:"py-2 px-3 text-white bg-emerald-500 hover:bg-emerald-600 rounded-md"},{default:m(()=>[i(e(T),{class:"h-4 w-4 -mt-1 inline-block"}),J]),_:1})])]),default:m(()=>[e(d).loading?(r(),g(p,{key:0})):(r(),c("div",K,[t("div",Q,[(r(!0),c(h,null,_(e(d).data,(n,u)=>(r(),g(q,{key:n.id,survey:n,class:"opacity-0 animate-fade-in-down",style:M({animationDelay:`${u*.1}s`}),onDelete:w=>f(n)},null,8,["survey","style","onDelete"]))),128))]),t("div",U,[t("nav",W,[(r(!0),c(h,null,_(e(d).links,(n,u)=>(r(),c("a",{key:u,disabled:!n.url,href:"#",onClick:N(w=>v(n),["prevent"]),"aria-current":"page",class:z(["relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap",[n.active?e(o).active:e(o).noActive,u===0?e(o).first:"",u===e(d).links.length-1?e(o).last:""]]),innerHTML:n.label},null,10,X))),128))])])]))]),_:1})}}};export{se as default};
