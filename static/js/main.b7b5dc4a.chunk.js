(this["webpackJsonpusers-list"]=this["webpackJsonpusers-list"]||[]).push([[0],{105:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(15),i=n.n(s),c=n(25),o=(n(92),n(13)),l=(n(93),n(2)),u=function(){return Object(l.jsxs)("div",{children:[Object(l.jsx)("h4",{children:"You can go to:"}),Object(l.jsxs)("ul",{children:[Object(l.jsx)("li",{children:Object(l.jsx)(c.b,{to:"/users",children:"Users List"})}),Object(l.jsx)("li",{children:Object(l.jsx)(c.b,{to:"/users/create",children:"Add new user"})}),Object(l.jsx)("li",{children:Object(l.jsx)(c.b,{to:"/login",children:"Quit"})})]})]})},j=n(9),d=n(8),b=n(11),h="https://users-list-server.herokuapp.com",m={items:{}},p={context:m,setContext:function(){throw new Error("Please add the LocalContextxProvider to your page!")}},O=r.a.createContext(p),x=function(e){var t=e.children,n=Object(a.useState)(m),r=Object(b.a)(n,2),s=r[0],i=r[1];return Object(l.jsx)(O.Provider,{value:{context:s,setContext:i},children:t})},f=function(){var e=Object(a.useContext)(O),t=e.context,n=e.setContext;return Object(d.a)(Object(d.a)({},t),{},{addNewItem:function(e){n((function(t){return Object(d.a)(Object(d.a)({},t),{},{items:Object(d.a)(Object(d.a)({},t.items),{},Object(j.a)({},e.id,e))})}))},deleteItem:function(e){n((function(t){var n=Object(d.a)({},t.items);return delete n[e],Object(d.a)(Object(d.a)({},t),{},{items:n})}))}})},g=n(5),v=n(154),w=n(159),C=n(157),y=n(155),T=n(156),N=n(158),P=n(73),E=n.n(P),L=n(74),S=n.n(L),k=n(107),B=n(59),I=n.n(B),F=n(58),z=n.n(F),A=n(160),R=n(75),U=n.n(R),D=Object(g.a)((function(e){return{root:{width:"100%",marginTop:e.spacing(),overflowX:"auto",backgroundColor:"transparent"},table:{minWidth:700},head:{fontSize:20},body:{fontSize:16},floatingButton:{position:"fixed",top:"auto",right:"10%",bottom:"2%",left:"auto"}}}))((function(e){var t=e.classes,n=Object(o.g)(),s="sort-by-first-name-up",i="sort-by-first-name-down",c="sort-by-last-name-up",u="sort-by-last-name-down",m="sort-by-position-up",p="sort-by-position-down",O={sortByFirstNameUp:"primary",sortByFirstNameDown:"default",sortByLastNameUp:"default",sortByLastNameDown:"default",sortByPositionUp:"default",sortByPositionDown:"default"},x=f(),g=x.items,P=x.addNewItem,L=Object(a.useState)({}),B=Object(b.a)(L,2),F=B[0],R=B[1],D=Object(a.useState)(s),q=Object(b.a)(D,2),J=q[0],G=q[1],M=Object(a.useState)(Object.values(F)),V=Object(b.a)(M,2),H=V[0],W=V[1],Q=function(e,t,n){return e.sort((function(e,a){return"up"===t?e[n].toLowerCase()>a[n].toLowerCase()?1:e[n].toLowerCase()<a[n].toLowerCase()?-1:0:e[n].toLowerCase()<a[n].toLowerCase()?1:e[n].toLowerCase()>a[n].toLowerCase()?-1:0})),e},X=Object(a.useMemo)((function(){switch(function(e){for(var t in e)e.hasOwnProperty(t)&&(e[t]="default")}(O),J){case s:return O.sortByFirstNameUp="primary",Q(H,"up","firstname");case i:return O.sortByFirstNameDown="primary",Q(H,"down","firstname");case c:return O.sortByLastNameUp="primary",Q(H,"up","lastname");case u:return O.sortByLastNameDown="primary",Q(H,"down","lastname");case m:return O.sortByPositionUp="primary",Q(H,"up","position");case p:return O.sortByPositionDown="primary",Q(H,"down","position");default:return H}}),[J,H]),Y=function(e){var t=e.currentTarget.value;fetch("".concat(h,"/users/delete"),{method:"delete",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t})}).then((function(e){return e.json()})).then((function(e){"success"===e?R((function(e){var n=Object(d.a)({},e);return delete n[t],n})):console.log(e)})).catch(console.log)},$=function(e){P(F[e.currentTarget.value]),n.push("/users/".concat(e.currentTarget.value))};return r.a.useEffect((function(){g.search?W(Object.values(F).filter((function(e){return!!e.firstname&&(e.firstname.toLowerCase().includes(g.search.name.toLowerCase())||e.lastname.toLowerCase().includes(g.search.name.toLowerCase()))}))):W(Object.values(F))}),[g.search,F]),r.a.useEffect((function(){R({}),fetch("".concat(h,"/users")).then((function(e){return e.json()})).then((function(e){e.forEach((function(e){R((function(t){return Object(d.a)(Object(d.a)({},t),{},Object(j.a)({},e.id,e))}))}))})).catch(console.log)}),[]),Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(k.a,{className:t.root,children:Object(l.jsxs)(v.a,{className:t.table,children:[Object(l.jsx)(y.a,{children:Object(l.jsxs)(T.a,{children:[Object(l.jsxs)(C.a,{className:t.head,align:"center",children:[Object(l.jsx)("span",{children:"First Name"}),Object(l.jsx)(N.a,{"aria-label":"sort",value:s,className:t.margin,size:"small",color:O.sortByFirstNameUp,onClick:function(){return G(s)},children:Object(l.jsx)(z.a,{fontSize:"inherit"})}),Object(l.jsx)(N.a,{"aria-label":"sort",value:i,className:t.margin,size:"small",color:O.sortByFirstNameDown,onClick:function(){return G(i)},children:Object(l.jsx)(I.a,{fontSize:"inherit"})})]}),Object(l.jsxs)(C.a,{className:t.head,align:"center",children:[Object(l.jsx)("span",{children:"Last Name"}),Object(l.jsx)(N.a,{"aria-label":"sort",value:c,className:t.margin,size:"small",color:O.sortByLastNameUp,onClick:function(){return G(c)},children:Object(l.jsx)(z.a,{fontSize:"inherit"})}),Object(l.jsx)(N.a,{"aria-label":"sort",value:u,className:t.margin,size:"small",color:O.sortByLastNameDown,onClick:function(){return G(u)},children:Object(l.jsx)(I.a,{fontSize:"inherit"})})]}),Object(l.jsxs)(C.a,{className:t.head,align:"center",children:[Object(l.jsx)("span",{children:"Position"}),Object(l.jsx)(N.a,{"aria-label":"sort",value:m,className:t.margin,size:"small",color:O.sortByPositionUp,onClick:function(){return G(m)},children:Object(l.jsx)(z.a,{fontSize:"inherit"})}),Object(l.jsx)(N.a,{"aria-label":"sort",value:p,className:t.margin,size:"small",color:O.sortByPositionDown,onClick:function(){return G(p)},children:Object(l.jsx)(I.a,{fontSize:"inherit"})})]}),Object(l.jsx)(C.a,{align:"center"})]})}),Object(l.jsx)(w.a,{children:X.map((function(e){return Object(l.jsxs)(T.a,{children:[Object(l.jsx)(C.a,{className:t.body,align:"center",children:e.firstname}),Object(l.jsx)(C.a,{className:t.body,align:"center",children:e.lastname}),Object(l.jsx)(C.a,{className:t.body,align:"center",children:e.position}),Object(l.jsxs)(C.a,{align:"right",children:[Object(l.jsx)(N.a,{"aria-label":"edit",value:e.id,onClick:$,children:Object(l.jsx)(E.a,{})}),Object(l.jsx)(N.a,{"aria-label":"delete",value:e.id,onClick:Y,children:Object(l.jsx)(S.a,{})})]})]},e.id)}))})]})}),Object(l.jsx)("div",{className:t.floatingButton,children:Object(l.jsx)(A.a,{color:"primary","aria-label":"add",onClick:function(){n.push("/users/create")},children:Object(l.jsx)(U.a,{})})})]})})),q=n(161),J=n(169),G=function(e){var t=e.onTextChange,n=e.label,a=e.inputRef;return Object(l.jsx)(J.a,{id:"outlined-with-placeholder-".concat(n),label:n,margin:"normal",variant:"outlined",inputRef:a,onChange:t})},M=function(){var e=Object(o.g)(),t=Object(a.useState)({firstname:"",lastname:"",position:""}),n=Object(b.a)(t,2),r=n[0],s=n[1],i=[1,2,3],c=function(e,t){i[t]=e},u=Object(a.useState)(!0),m=Object(b.a)(u,2),p=m[0],O=m[1],x=function(e,t){s((function(n){return Object(d.a)(Object(d.a)({},n),{},Object(j.a)({},t,e.target.value))}))};return Object(l.jsxs)("div",{children:[Object(l.jsx)("h3",{children:"Add new user"}),Object(l.jsxs)("div",{children:[Object(l.jsx)(G,{label:"First name",inputRef:function(e){return c(e,0)},onTextChange:function(e){return x(e,"firstname")}}),Object(l.jsx)(G,{label:"Last name",inputRef:function(e){return c(e,1)},onTextChange:function(e){return x(e,"lastname")}}),Object(l.jsx)(G,{label:"Position",inputRef:function(e){return c(e,2)},onTextChange:function(e){return x(e,"position")}})]}),p?Object(l.jsx)(l.Fragment,{}):Object(l.jsx)("p",{children:"Enter valid User's Data"}),Object(l.jsx)("div",{children:Object(l.jsx)(q.a,{variant:"contained",onClick:function(){r&&r.firstname&&r.lastname&&r.position?(O(!0),fetch("".concat(h,"/users/create"),{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then((function(e){return e.json()})).then((function(t){return t.id?(i.forEach((function(e){e.value=""})),e.push("/users")):(O(!1),console.log(t))})).catch(console.log)):O(!1)},children:"SAVE"})})]})},V=function(){var e=Object(o.g)(),t=Object(o.h)(),n=f(),a=n.items,s=n.deleteItem,i=t.pathname.split("/"),c=i[i.length-1],u=r.a.useState(a[c]),m=Object(b.a)(u,2),p=m[0],O=m[1],x=function(e,t){O((function(n){return Object(d.a)(Object(d.a)({},n),{},Object(j.a)({},t,e.target.value))}))};return r.a.useEffect((function(){a[c]&&s(c)}),[p.id]),p.id?Object(l.jsxs)("div",{children:[Object(l.jsxs)("h3",{children:["Edit ",p.firstname,"'s data"]}),Object(l.jsx)(J.a,{id:"outlined-helperText-firstname",label:"First Name",defaultValue:p.firstname,variant:"outlined",onChange:function(e){return x(e,"firstname")}}),Object(l.jsx)(J.a,{id:"outlined-helperText-lastname",label:"Larst Name",defaultValue:p.lastname,variant:"outlined",onChange:function(e){return x(e,"lastname")}}),Object(l.jsx)(J.a,{id:"outlined-helperText-position",label:"Position",defaultValue:p.position,variant:"outlined",onChange:function(e){return x(e,"position")}}),Object(l.jsx)(q.a,{style:{height:"55px"},variant:"contained",onClick:function(){fetch("".concat(h,"/users/").concat(c),{method:"put",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)}).then((function(e){return e.json()})).then((function(t){return t.includes("success")?e.push("/users"):console.log('The server responded with "'.concat(t,'"'))})).catch(console.log),e.push("/users")},children:"Save"})]}):Object(l.jsx)("div",{children:Object(l.jsx)("h3",{children:"An error in loading user's data"})})},H=n(162),W=n(170),Q=n(163),X=n(164),Y=n(171),$=Object(H.a)({paperRoot:{margin:"10% auto",boxShadow:"0 3px 10px rgb(0 0 0 / 0.2)",background:"transparent"},button:{margin:"10px 0px 20px 0px",width:"30%"},input:{width:"60%"}}),K=function(){var e=Object(o.g)(),t=f(),n=t.items,s=t.addNewItem,i=t.deleteItem,c=Object(a.useState)(),u=Object(b.a)(c,2),m=u[0],p=void 0===m?{}:m,O=u[1],x=Object(a.useState)({helperTextEmail:"",helperTextPass:"",helperTextPassConfirm:""}),g=Object(b.a)(x,2),v=g[0],w=g[1];r.a.useEffect((function(){n.CurrentAdmin&&i("CurrentAdmin")}),[]);var C=$(),y=r.a.useState(0),T=Object(b.a)(y,2),N=T[0],P=T[1],E=function(e,t){O((function(n){return Object(d.a)(Object(d.a)({},n),{},Object(j.a)({},t,e.target.value))}))},L=Object(a.useState)(!0),S=Object(b.a)(L,2),B=S[0],I=S[1];r.a.useEffect((function(){B||O((function(e){return Object(d.a)(Object(d.a)({},e),{},{firstname:"",lastname:"",position:""})}))}),[B]);var F=function(e,t){return w((function(n){return Object(d.a)(Object(d.a)({},n),{},Object(j.a)({},e,t))})),!t},z=function(e){return F("helperTextEmail",""),e?!!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(e)||F("helperTextEmail","Enter valid email"):F("helperTextEmail","Enter email")},A=function(){return F("helperTextPass",""),F("helperTextPassConfirm",""),p.password?p.passwordConfirm?p.password.length<6?F("helperTextPass","The password must be more than 6 symbols"):p.passwordConfirm.length<6?F("helperTextPassConfirm","The password must be more than 6 symbols"):p.password===p.passwordConfirm||(F("helperTextPass","Passwords are not the same"),F("helperTextPassConfirm","Passwords are not the same"),!1):F("helperTextPassConfirm","Enter confirm password"):F("helperTextPass","Enter password")};return Object(l.jsx)("section",{style:{textAlign:"center"},children:Object(l.jsx)("div",{id:"tabs-container",style:{margin:"0 auto",display:"table",width:"40%"},children:Object(l.jsxs)(k.a,{className:C.paperRoot,children:[Object(l.jsxs)(W.a,{value:N,onChange:function(e,t){P(t)},indicatorColor:"primary",textColor:"primary",centered:!0,variant:"fullWidth",children:[Object(l.jsx)(Q.a,{label:"LOGIN"}),Object(l.jsx)(Q.a,{label:"REGISTER"})]}),N?Object(l.jsx)(l.Fragment,{}):Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{children:Object(l.jsx)(J.a,{className:C.input,required:!0,id:"outlined-required-email",error:!!v.helperTextEmail,helperText:v.helperTextEmail,label:"Email",type:"email",variant:"outlined",margin:"normal",onBlur:function(){return z(p.loginEmail)},onChange:function(e){return E(e,"loginEmail")}})}),Object(l.jsx)("div",{children:Object(l.jsx)(J.a,{className:C.input,id:"outlined-password-input-pass",error:!!v.helperTextPass,helperText:v.helperTextPass,label:"Password",type:"password",autoComplete:"current-password",variant:"outlined",margin:"normal",onBlur:function(e){e.target.value?F("helperTextPass",""):F("helperTextPass","Enter password")},onChange:function(e){return E(e,"loginPassword")}})}),Object(l.jsx)("div",{children:Object(l.jsx)(q.a,{className:C.button,variant:"contained",onClick:function(){z(p.loginEmail)&&p.loginPassword&&fetch("".concat(h,"/login"),{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)}).then((function(e){return e.json()})).then((function(t){return t.id?(s(Object(d.a)(Object(d.a)({},t),{},{id:"CurrentAdmin"})),e.push("/")):(console.log(t),w((function(e){return Object(d.a)(Object(d.a)({},e),{},{helperTextEmail:"Invalid login data",helperTextPass:"Invalid login data"})})))})).catch(console.log)},children:"LogIn"})})]}),N?Object(l.jsxs)("div",{children:[Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{children:Object(l.jsx)(J.a,{required:!0,className:C.input,error:!!v.helperTextEmail,helperText:v.helperTextEmail,id:"outlined-required-email",label:"Email",variant:"outlined",margin:"normal",onBlur:function(){return z(p.email)},onChange:function(e){return E(e,"email")}})}),Object(l.jsx)("div",{children:Object(l.jsx)(J.a,{className:C.input,id:"outlined-password-input-pass",label:"Password",type:"password",autoComplete:"new-password",variant:"outlined",margin:"normal",error:!!v.helperTextPass,helperText:v.helperTextPass,onBlur:A,onChange:function(e){return E(e,"password")}})}),Object(l.jsx)("div",{children:Object(l.jsx)(J.a,{className:C.input,id:"outlined-password-input-pass-confirm",label:"Confirm password",type:"password",autoComplete:"new-password",variant:"outlined",margin:"normal",error:!!v.helperTextPassConfirm,helperText:v.helperTextPassConfirm,onBlur:A,onChange:function(e){return E(e,"passwordConfirm")}})})]}),Object(l.jsx)("div",{children:Object(l.jsx)(X.a,{control:Object(l.jsx)(Y.a,{checked:B,onChange:function(){I(!B)},name:"checkedB",color:"primary"}),label:"Add me to the users list"})}),B?Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{children:Object(l.jsx)(J.a,{className:C.input,id:"outlined-required-first-name",label:"First Name",variant:"outlined",margin:"normal",error:!!v.helperTextFN,helperText:v.helperTextFN,onChange:function(e){return E(e,"firstname")}})}),Object(l.jsx)("div",{children:Object(l.jsx)(J.a,{className:C.input,id:"outlined-required-last-name",label:"Last Name",variant:"outlined",margin:"normal",error:!!v.helperTextLN,helperText:v.helperTextLN,onChange:function(e){return E(e,"lastname")}})}),Object(l.jsx)("div",{children:Object(l.jsx)(J.a,{className:C.input,id:"outlined-required-position",label:"Position",variant:"outlined",margin:"normal",error:!!v.helperTextPOS,helperText:v.helperTextPOS,onChange:function(e){return E(e,"position")}})})]}):Object(l.jsx)(l.Fragment,{}),Object(l.jsx)("div",{children:Object(l.jsx)(q.a,{className:C.button,variant:"contained",onClick:function(){(B?z(p.email)&&A()&&(w((function(e){return Object(d.a)(Object(d.a)({},e),{},{helperTextFN:"",helperTextLN:"",helperTextPOS:""})})),p.firstname?p.lastname?p.position||F("helperTextPOS","Enter Position"):F("helperTextLN","Enter Last Name"):F("helperTextFN","Enter First Name")):z(p.email)&&A())&&fetch("".concat(h,"/login/register"),{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)}).then((function(e){return e.json()})).then((function(t){return t.id?(s(Object(d.a)(Object(d.a)({},t),{},{id:"CurrentAdmin"})),e.push("/")):t.includes("exists")?F("helperTextEmail","This email is already occupied"):void console.log(t)})).catch(console.log)},children:"Register"})})]}):Object(l.jsx)(l.Fragment,{})]})})})},Z=n(14),_=n(165),ee=n(166),te=n(50),ne=n(81),ae=n(173),re=n(76),se=n.n(re),ie=n(167),ce=n(168),oe=n(77),le=n.n(oe),ue=n(79),je=n.n(ue),de=n(78),be=n.n(de),he=n(80),me=n.n(he),pe=n(172),Oe=Object(H.a)((function(e){return{root:{flexGrow:1,backgroundColor:e.palette.success.light},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1},search:Object(j.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(Z.a)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(Z.a)(e.palette.common.white,.25)},marginRight:e.spacing(2),marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(3),width:"auto"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(j.a)({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("md"),{width:"20ch"})}})),xe=Object(g.a)({paper:{border:"1px solid #d3d4d5"}})((function(e){return Object(l.jsx)(ne.a,Object(d.a)({elevation:0,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"}},e))})),fe=Object(g.a)((function(e){return{root:{"&:focus":{backgroundColor:e.palette.success.light,"& .MuiListItemIcon-root, & .MuiListItemText-primary":{color:e.palette.common.white}}}}}))(ae.a),ge=function(){var e=r.a.useState(null),t=Object(b.a)(e,2),n=t[0],s=t[1],i=function(e){e&&(s(null),m.push(e))},c=f(),u=c.items,j=c.addNewItem,d=c.deleteItem,h=Oe(),m=Object(o.g)(),p=Object(o.h)(),O=Object(a.useState)(u.CurrentAdmin?"logout":"login"),x=Object(b.a)(O,2),g=x[0],v=x[1],w=Object(a.useState)(),C=Object(b.a)(w,2),y=C[0],T=C[1];return Object(a.useEffect)((function(){v((function(){return u.CurrentAdmin?"logout":"login"}))}),[u.CurrentAdmin]),Object(a.useEffect)((function(){var e;if(-1!==p.pathname.search("/users/")&&"/users/create"!==p.pathname)e="Editing User data";else switch(p.pathname){case"/":e="Home Page";break;case"/login":e="LogIn";break;case"/register":e="Register";break;case"/users":e="Users List";break;case"/users/create":e="Add New User";break;default:e=p.pathname}T((function(){return e}))}),[p]),Object(l.jsx)("div",{children:Object(l.jsx)(_.a,{position:"static",className:h.root,children:Object(l.jsxs)(ee.a,{children:[Object(l.jsx)(N.a,{edge:"start",className:h.menuButton,color:"inherit","aria-label":"menu",onClick:function(e){s(e.currentTarget)},children:Object(l.jsx)(se.a,{})}),Object(l.jsxs)(xe,{id:"customized-menu",anchorEl:n,keepMounted:!0,open:Boolean(n),onClose:function(){s(null)},children:[Object(l.jsxs)(fe,{onClick:function(){return i("/")},children:[Object(l.jsx)(ie.a,{children:Object(l.jsx)(le.a,{fontSize:"small"})}),Object(l.jsx)(ce.a,{primary:"Home"})]}),Object(l.jsxs)(fe,{onClick:function(){return i("/users")},children:[Object(l.jsx)(ie.a,{children:Object(l.jsx)(be.a,{fontSize:"small"})}),Object(l.jsx)(ce.a,{primary:"Users List"})]}),Object(l.jsxs)(fe,{onClick:function(){return i("/users/create")},children:[Object(l.jsx)(ie.a,{children:Object(l.jsx)(je.a,{fontSize:"small"})}),Object(l.jsx)(ce.a,{primary:"Add new user"})]})]}),Object(l.jsx)(te.a,{variant:"h6",className:h.title,children:"Users List App: ".concat(y)}),"Users List"===y?Object(l.jsxs)("div",{className:h.search,children:[Object(l.jsx)("div",{className:h.searchIcon,children:Object(l.jsx)(me.a,{})}),Object(l.jsx)(pe.a,{placeholder:"Search\u2026",classes:{root:h.inputRoot,input:h.inputInput},inputProps:{"aria-label":"search"},onChange:function(e){var t;(t=e).target.value?j({id:"search",name:t.target.value}):d("search")}})]}):Object(l.jsx)(l.Fragment,{}),Object(l.jsx)(q.a,{color:"inherit",onClick:function(){"logout"===g&&m.push("/login")},children:g})]})})})},ve=n(3),we=["children"],Ce=function(e){var t=e.children,n=Object(ve.a)(e,we),a=!!f().items.CurrentAdmin;return Object(l.jsx)(o.b,Object(d.a)(Object(d.a)({},n),{},{render:function(){return a?t:Object(l.jsx)(o.a,{to:"/login"})}}))},ye=function(){return Object(l.jsxs)(x,{children:[Object(l.jsx)(ge,{}),Object(l.jsxs)(o.d,{children:[Object(l.jsx)(Ce,{exact:!0,path:"/",children:Object(l.jsx)(u,{})}),Object(l.jsx)(Ce,{exact:!0,path:"/users",children:Object(l.jsx)(D,{})}),Object(l.jsx)(Ce,{exact:!0,path:"/users/create",children:Object(l.jsx)(M,{})}),Object(l.jsx)(Ce,{exact:!0,path:"/users/:id",children:Object(l.jsx)(V,{})}),Object(l.jsx)(o.b,{path:"/login",component:K})]})]})};i.a.render(Object(l.jsx)(c.a,{basename:"/",children:Object(l.jsx)(ye,{})}),document.getElementById("root"))},92:function(e,t,n){},93:function(e,t,n){}},[[105,1,2]]]);
//# sourceMappingURL=main.b7b5dc4a.chunk.js.map