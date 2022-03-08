import{s as J,z as E,c as F,o as c,a as g,b as e,t as $,g as y,u as i,U,V as N,w as _,W as b,X as I,F as q,l as R,f as j,h as w,Y as L,p as Y,Z as H,q as X,j as A,k as T,$ as G,A as W,C as Z}from"./vendor.b6c77bf0.js";import{_ as K}from"./PageComponent.33bd0c93.js";import{d as B}from"./app.e708f137.js";var S,P=new Uint8Array(16);function ee(){if(!S&&(S=typeof crypto!="undefined"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto!="undefined"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!S))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return S(P)}var te=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function se(o){return typeof o=="string"&&te.test(o)}var l=[];for(var Q=0;Q<256;++Q)l.push((Q+256).toString(16).substr(1));function oe(o){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,f=(l[o[t+0]]+l[o[t+1]]+l[o[t+2]]+l[o[t+3]]+"-"+l[o[t+4]]+l[o[t+5]]+"-"+l[o[t+6]]+l[o[t+7]]+"-"+l[o[t+8]]+l[o[t+9]]+"-"+l[o[t+10]]+l[o[t+11]]+l[o[t+12]]+l[o[t+13]]+l[o[t+14]]+l[o[t+15]]).toLowerCase();if(!se(f))throw TypeError("Stringified UUID is invalid");return f}function M(o,t,f){o=o||{};var p=o.random||(o.rng||ee)();if(p[6]=p[6]&15|64,p[8]=p[8]&63|128,t){f=f||0;for(var x=0;x<16;++x)t[f+x]=p[x];return t}return oe(p)}const ne={class:"flex items-center justify-between"},ie={class:"text-lg font-bold"},ae={class:"flex items-center"},de=w(" Add "),re=w(" Delete "),le={class:"grid gap-3 grid-cols-12"},ue={class:"mt-3 col-span-9"},ce=["for"],me=["id","name"],pe={class:"mt-3 col-span-3"},ge=["for"],fe=["id","name"],ye=["value"],_e={class:"mt-3 col-span-9"},xe=["for"],ve=["name","id"],he={key:0,class:"mt-2"},be={class:"mb-1 flex justify-between items-center"},we=e("h4",{class:"text-sm font-semibold"},"Options",-1),ke=w(" Add Option "),$e={key:0,class:"text-xs text-gray-600 text-center py-3"},Se={class:"w-6 text-sm"},qe=["onUpdate:modelValue"],Ce=["onClick"],Ve=e("hr",{class:"my-4"},null,-1),Oe={props:{question:Object,index:Number},emits:["change","addQuestion","deleteQuestion"],setup(o,{emit:t}){const f=o,p=B(),{questionTypes:x}=J(p),n=E(JSON.parse(JSON.stringify(f.question))),s=F(()=>["select","radio","checkbox"].includes(n.value.type)),k=()=>n.value.data.options,h=m=>n.value.data.options=m,C=m=>{h([...k(),{uuid:M(),text:""}]),v()},V=m=>h(k().filter(d=>d!==m)),O=()=>{s&&h(k()||[]),v()},v=()=>{const m=JSON.parse(JSON.stringify(n.value));s||delete m.data.options,t("change",m)},r=()=>{t("addQuestion",f.index+1)},a=()=>{t("deleteQuestion",f.question)};return(m,d)=>(c(),g(q,null,[e("div",ne,[e("h3",ie,$(o.index+1)+". "+$(n.value.question),1),e("div",ae,[e("button",{type:"button",onClick:r,class:"flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"},[y(i(U),{class:"h-4 w-4"}),de]),e("button",{type:"button",onClick:a,class:"flex items-center text-xs py-1 px-3 mr-2 rounded-sm border border-transparent text-red-500 hover:border-red-600"},[y(i(N),{class:"h-4 w-4"}),re])])]),e("div",le,[e("div",ue,[e("label",{for:`question_text_${n.value.id}`,class:"block text-sm font-medium text-gray-700"}," Question Text ",8,ce),_(e("input",{"onUpdate:modelValue":d[0]||(d[0]=u=>n.value.question=u),onChange:v,id:`question_text_${n.value.id}`,name:`question_text_${n.value.id}`,type:"text",class:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,40,me),[[b,n.value.question]])]),e("div",pe,[e("label",{for:`question_type_${n.value.id}`,class:"block text-sm font-medium text-gray-700"}," Question Type ",8,ge),_(e("select",{"onUpdate:modelValue":d[1]||(d[1]=u=>n.value.type=u),onChange:O,id:`question_type_${n.value.id}`,name:`question_type_${n.value.id}`,class:"mt-1 py-2 px-3 border border-gray-300 bg-white block w-full shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md capitalize"},[(c(!0),g(q,null,R(i(x),u=>(c(),g("option",{class:"capitalize",key:u,value:u},$(u),9,ye))),128))],40,fe),[[I,n.value.type]])])]),e("div",_e,[e("label",{for:`question_description_${n.value.id}`,class:"block text-sm font-medium text-gray-700"}," Description ",8,xe),_(e("textarea",{"onUpdate:modelValue":d[2]||(d[2]=u=>n.value.description=u),onChange:v,name:`question_description_${n.value.id}`,id:`question_description_${n.value.id}`,rows:"3",class:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"},null,40,ve),[[b,n.value.description]])]),e("div",null,[i(s)?(c(),g("div",he,[e("div",be,[we,e("button",{type:"button",onClick:C,class:"flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"},[y(i(U),{class:"h-4 w-4"}),ke])]),n.value.data&&n.value.data.options&&!n.value.data.options.length?(c(),g("p",$e," You don't have any options defined ")):n.value.data?(c(!0),g(q,{key:1},R(n.value.data.options,(u,z)=>(c(),g("div",{key:u.uuid,class:"flex items-center mb-1"},[e("span",Se,$(z+1)+".",1),_(e("input",{type:"text","onUpdate:modelValue":D=>u.text=D,onChange:v,class:"w-full rounded-md py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500"},null,40,qe),[[b,u.text]]),e("button",{type:"button",onClick:D=>V(u),class:"h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100"},[y(i(N),{class:"h-3 w-3 text-red-500"})],8,Ce)]))),128)):j("",!0)])):j("",!0)]),Ve],64))}},Qe={class:"flex justify-between items-center"},Ue={class:"text-3xl font-bold text-gray-900"},Ne=w(" Delete Survey "),Re=["onSubmit"],je={class:"shadow sm:rounded-md sm:overflow-hidden"},De={class:"px-4 py-5 bg-white space-y-6 sm:p-6"},Ae=e("label",{for:"image",class:"block text-sm font-medium text-gray-700"}," Image ",-1),Te={class:"mt-1 flex items-center"},Je=["src","alt"],Ee={key:1,class:"flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"},Be={type:"button",class:"relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},Me=w(" Change "),ze=e("label",{for:"title",class:"block text-sm font-medium text-gray-700"},"Title",-1),Fe=e("label",{for:"description",class:"block text-sm font-medium text-gray-700"},"Description",-1),Ie=e("label",{for:"expire_date",class:"block text-sm font-medium text-gray-700"},"Expire Date",-1),Le={class:"flex items-start"},Ye={class:"flex items-center h-5"},He=e("div",{class:"ml-3 text-sm"},[e("label",{for:"status",class:"font-medium text-gray-700"},"Active")],-1),Xe={class:"px-5 py-5 bg-white space-y-6 sm:p-6"},Ge={class:"flex items-center justify-between"},We=e("h3",{class:"text-2xl font-semibold"},"Questions",-1),Ze=w(" Add Question "),Ke={key:0,class:"text-center text-gray-600"},Pe=e("div",{class:"px-4 py-3 bg-gray-50 text-right sm:px-6"},[e("button",{type:"submit",class:"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}," Save ")],-1),ot={setup(o){const t=L(),f=Y(),p=B(),{surveys:x,currentSurvey:n}=J(p);let s=E({id:null,title:null,status:!1,description:null,image:null,image_url:null,expire_date:null,questions:[]});H(()=>n.value.data,(r,a)=>{s.value={...JSON.parse(JSON.stringify(r)),status:r.status!=="draft"}}),t.params.id&&p.getSurvey(t.params.id);const k=r=>{s.value.questions=s.value.questions.map(a=>a.id===r.id?JSON.parse(JSON.stringify(r)):a)},h=r=>{const a={id:M(),type:"text",question:null,description:null,data:{}};s.value.questions.splice(r,0,a)},C=r=>{s.value.questions=s.value.questions.filter(a=>a!==r)},V=async()=>{try{const r=await p.saveSurvey(s.value);p.notify({type:"success",message:"Survey was successfully updated!"}),f.push({name:"SurveyView",params:{id:r.data.id}})}catch(r){console.error(r)}},O=r=>{const a=r.target.files[0],m=new FileReader;m.onload=()=>{s.value.image=m.result,s.value.image_url=m.result},m.readAsDataURL(a)},v=()=>{confirm("Are you sure you want to delete this survey? Oparation can't be done")&&(p.deleteSurvey(s.value),f.push({name:"Surveys"}))};return(r,a)=>{const m=X("loading-component");return c(),A(i(K),null,{header:T(()=>[e("div",Qe,[e("h1",Ue,$(i(t).params.id?i(s).title:"Create a Survey"),1),i(t).params.id?(c(),g("button",{key:0,onClick:v,type:"button",class:"py-2 px-3 text-white bg-red-500 hover:bg-red-600 rounded-md"},[y(i(N),{class:"h-5 w-6 -mt-1 inline-block"}),Ne])):j("",!0)])]),default:T(()=>[i(n).loading?(c(),A(m,{key:0})):(c(),g("form",{key:1,onSubmit:Z(V,["prevent"]),class:"animate-fade-in-down",novalidate:""},[e("div",je,[e("div",De,[e("div",null,[Ae,e("div",Te,[i(s).image_url?(c(),g("img",{key:0,src:i(s).image_url,alt:i(s).title,class:"w-64 h-64 object-cover"},null,8,Je)):(c(),g("span",Ee,[y(i(G),{class:"h-[80%] w-[80%] text-gray-300"})])),e("button",Be,[e("input",{id:"image",onChange:O,type:"file",accept:"image/*",class:"absolute inset-0 opacity-0 cursor-pointer"},null,32),Me])])]),e("div",null,[ze,_(e("input",{"onUpdate:modelValue":a[0]||(a[0]=d=>i(s).title=d),autocomplete:"survey_title",class:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md",type:"text",name:"title",id:"title"},null,512),[[b,i(s).title]])]),e("div",null,[Fe,_(e("textarea",{"onUpdate:modelValue":a[1]||(a[1]=d=>i(s).description=d),autocomplete:"survey_description",placeholder:"Describe your survey",rows:"3",class:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md",name:"description",id:"description"},`
            `,512),[[b,i(s).description]])]),e("div",null,[Ie,_(e("input",{"onUpdate:modelValue":a[2]||(a[2]=d=>i(s).expire_date=d),autocomplete:"survey_expire_date",class:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md",type:"date",name:"expire_date",id:"expire_date"},null,512),[[b,i(s).expire_date]])]),e("div",Le,[e("div",Ye,[_(e("input",{"onUpdate:modelValue":a[3]||(a[3]=d=>i(s).status=d),class:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded",type:"checkbox",id:"status",name:"status"},null,512),[[W,i(s).status]])]),He])]),e("div",Xe,[e("div",Ge,[We,e("button",{type:"button",onClick:h,class:"flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"},[y(i(U),{class:"h-4 w-4"}),Ze])]),i(s).questions&&i(s).questions.length?(c(!0),g(q,{key:1},R(i(s).questions,(d,u)=>(c(),g("div",{key:d.id},[y(Oe,{question:d,index:u,onChange:k,onAddQuestion:h,onDeleteQuestion:C},null,8,["question","index"])]))),128)):(c(),g("div",Ke," You don't have any questions created "))]),Pe])],40,Re))]),_:1})}}};export{ot as default};
