(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{112:function(e,t,a){e.exports=a(146)},117:function(e,t,a){},146:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(16),s=a.n(o),l=(a(117),a(6)),i=a(7),c=a(9),p=a(8),u=a(10),m=a(20),d=a(37),h=a(206),f=a(211),g=a(106),b=a(77),v=a.n(b),E=Object(g.a)({overrides:{MuiAppBar:{root:{boxShadow:"none"}},MuiFormControl:{marginDense:{marginBottom:"6px"}},MuiFormHelperText:{root:{"&$error":{color:"#df5353",marginTop:"3px",marginBottom:"6px"}}},MuiInputLabel:{root:{fontSize:".9rem","&$error":{color:"rgba(0, 0, 0, 0.54)",zIndex:99}}},MuiOutlinedInput:{root:{"& $notchedOutline":{borderColor:"rgba(0, 0, 0, 0.23)",borderRadius:0},"&$error $notchedOutline":{borderColor:"rgba(0, 0, 0, 0.23)",backgroundColor:"#ffe8e6"}},input:{zIndex:99}}},typography:{fontFamily:"Roboto"},palette:{primary:{main:v.a[900]},secondary:{main:v.a[50]}}}),j=a(13),w=a(4),y=a(197),O=a(149),x=a(104),S=a.n(x),k=a(198),C=a(147),B=a(194),T=a(195),D=a(103),N=a.n(D),I=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(C.a,{classes:{root:e.navItem}},this.props.children)}}]),t}(n.Component),L=Object(w.a)(function(e){return{navItem:{"& > a":{paddingTop:"5px",textDecoration:"none",color:"#fff",letterSpacing:"1px",fontSize:".8em",whiteSpace:"nowrap","&:hover":{borderTop:"2px solid #fff",webkitTransition:"all 0.1s ease-in",mozTransition:"all 0.1s ease-in",msTransition:"all 0.1s ease-in",oTransition:"all 0.1s ease-in",transition:"all 0.1s ease-in"}}}}})(I),z=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).createNavActions=function(){var e=[],t=null;return"/login"===window.location.pathname&&"shopper"===a.props.userType?(t=r.a.createElement(L,null,r.a.createElement(m.b,{to:"/register"},"Create Shop")),e.push(t)):"/register"===window.location.pathname&&"shopper"===a.props.userType&&(t=r.a.createElement(L,null,r.a.createElement(m.b,{to:"/login"},"Shop Login")),e.push(t)),e},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(B.a,{classes:{root:e.list},component:"ul"},this.createNavActions().map(function(e,t){return r.a.createElement(T.a,{component:"li",key:t},e)}),r.a.createElement(T.a,null,r.a.createElement(O.a,{classes:{root:e.iconButton},component:m.b,to:"/placeholder",edge:"start",color:"secondary","aria-label":"Menu"},r.a.createElement(N.a,{fontSize:"small"}))))}}]),t}(n.Component),A=Object(w.a)(function(e){return{list:{display:"flex",flexDirection:"row",alignItems:"center",padding:0,listStyle:"none"}}})(z),R=a(196),M=a(210),P=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).createNavActions=function(e){var t;return"shopper"===e?t={"My Cart":"/cart","Create Shop":"/register","Shop Login":"/login"}:"shopkeeper"===e&&(t={"My Cart":"/placeholder",Logout:"/placeholder"}),Object.entries(t)},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.classes,n=t.close,o=t.navLinksShopper,s=t.navLinksShopKeeper,l=t.show,i=t.userType;return r.a.createElement("div",null,r.a.createElement(M.a,{open:l,onClose:n},r.a.createElement("div",{className:a.list},r.a.createElement(B.a,null,o.map(function(e){return r.a.createElement(T.a,{component:"li",key:e[0]},r.a.createElement(C.a,{classes:{root:a.navItem}},r.a.createElement(m.b,{to:e[1],onClick:n},e[0])))})),r.a.createElement(R.a,null),"shopkeeper"===i?r.a.createElement(B.a,null,s.map(function(e){return r.a.createElement(T.a,{component:"li",key:e[0]},r.a.createElement(C.a,{classes:{root:a.navItem}},r.a.createElement(m.b,{to:e[1],onClick:n},e[0])))})):"","shopkeeper"===i?r.a.createElement(R.a,null):"",r.a.createElement(B.a,null,e.createNavActions(i).map(function(e){return r.a.createElement(T.a,{component:"li",key:e[0]},r.a.createElement(C.a,{classes:{root:a.navItem}},r.a.createElement(m.b,{to:e[1],onClick:n},e[0])))})))))}}]),t}(n.Component),U=Object(w.a)(function(e){return{list:{width:"200px"},navItem:{"& > a":{paddingTop:"5px",textDecoration:"none",color:"#000",fontWeight:600,fontSize:".9em"}}}})(P),W=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.navLinksShopper,n=e.navLinksShopKeeper;return r.a.createElement("div",{className:t.listContainer},r.a.createElement(B.a,{classes:{root:t.list},component:"ul"},a.map(function(e){return r.a.createElement(T.a,{component:"li",key:e[0]},r.a.createElement(L,null,r.a.createElement(m.b,{to:e[1]},e[0])))})),r.a.createElement(B.a,{classes:{root:t.list},component:"ul"},n.map(function(e){return r.a.createElement(T.a,{component:"li",key:e[0]},r.a.createElement(L,null,r.a.createElement(m.b,{to:e[1]},e[0])))})))}}]),t}(n.Component),F=Object(w.a)(function(e){return{listContainer:Object(j.a)({flexGrow:1,display:"flex",flexDirection:"row",justifyContent:"space-between",padding:0},e.breakpoints.between("xs","sm"),{display:"none"}),list:{display:"flex",flexDirection:"row",listStyle:"none"}}})(W),H=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={userType:a.props.userType,navDrawerOpen:!1},a.backdropClickHandler=function(){a.setState({navDrawerOpen:!1})},a.createNavLinksShopper=function(){var e;return e={Women:"/placeholder",Men:"/placeholder"},Object.entries(e)},a.createNavLinksShopKeeper=function(e){var t;return t="shopkeeper"===e?{"My Shop":"/mystore"}:0,Object.entries(t)},a.drawerToggleClickHandler=function(){a.setState(function(e){return{navDrawerOpen:!e.navDrawerOpen}})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.createNavLinksShopper(),a=this.createNavLinksShopKeeper(this.state.userType);return r.a.createElement("div",null,r.a.createElement(y.a,{position:"static",id:"navBar",color:"primary"},r.a.createElement(k.a,{classes:{root:e.toolBar},component:"nav"},r.a.createElement("div",{className:e.navMain},r.a.createElement(O.a,{onClick:this.drawerToggleClickHandler,classes:{root:e.menuButton},color:"secondary","aria-label":"Menu"},r.a.createElement(S.a,null)),r.a.createElement(C.a,{classes:{root:e.logo},color:"secondary",component:"h1"},r.a.createElement(m.b,{to:"/"},"Jackets Shop"))),r.a.createElement(F,{navLinksShopper:t,navLinksShopKeeper:a}),r.a.createElement(A,{userType:this.state.userType}))),r.a.createElement(U,{show:this.state.navDrawerOpen,close:this.backdropClickHandler,navLinksShopper:t,navLinksShopKeeper:a,userType:this.state.userType}))}}],[{key:"getDerivedStateFromProps",value:function(e){return{userType:e.userType}}}]),t}(n.Component),J=Object(d.e)(Object(w.a)(function(e){return{menuButton:Object(j.a)({},e.breakpoints.up("md"),{display:"none"}),navMain:{display:"flex",flexDirection:"row",alignItems:"center"},toolBar:{justifyContent:"space-between"},logo:{"& > a":Object(j.a)({fontFamily:"Source Sans Pro",textTransform:"uppercase",padding:"0 30px 0 15px",margin:"0 16px 0 0",whiteSpace:"nowrap",fontWeight:600,letterSpacing:"3px",color:"#fff",textDecoration:"none"},e.breakpoints.up("md"),{borderRight:"1px solid #444"})}}})(H)),$=a(32),K=a.n($),G=a(50),q=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.children;return r.a.createElement("div",{className:t.container},a)}}]),t}(n.Component),X=Object(w.a)(function(e){return{container:Object(j.a)({margin:"auto",padding:"50px 0px",width:"90%"},e.breakpoints.up("lg"),{width:"1030px"})}})(q),V=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.children;return r.a.createElement(C.a,{classes:{root:t.title},component:"h1"},a)}}]),t}(n.Component),_=Object(w.a)(function(e){return{title:{fontWeight:600,letterSpacing:"1px",textDecoration:"none",fontSize:"28px",width:"100%",lineHeight:"34px"}}})(V),Q=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.children;return r.a.createElement(C.a,{classes:{root:t.title},component:"h1"},a)}}]),t}(n.Component),Y=Object(w.a)(function(e){return{title:{margin:"6px 0 20px 0",fontWeight:600,letterSpacing:"1px",textDecoration:"none",fontSize:"19px"}}})(Q),Z=a(213),ee=a(199),te=a(200),ae=a(72),ne=a.n(ae),re=a(208),oe=a(212),se=a(202),le=a(201),ie=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={type:"",size:"",price:"",responseError:""},a.handleChange=function(e){e.preventDefault(),e.persist(),a.setState(Object(j.a)({},e.target.name,e.target.value)),a.props.update(a.state,Object(j.a)({},e.target.name,e.target.value))},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.expansionPanelContainer},r.a.createElement(Z.a,null,r.a.createElement(ee.a,{expandIcon:r.a.createElement(ne.a,null),"aria-controls":"panel1a-content",id:"panel1a-header"},r.a.createElement(C.a,{className:e.heading},"Jacket Type")),r.a.createElement(te.a,null,r.a.createElement("div",{className:e.root},r.a.createElement(le.a,{component:"fieldset",className:e.formControl},r.a.createElement(oe.a,{"aria-label":"JacketType",name:"type",className:e.group,value:this.state.type,onChange:this.handleChange},r.a.createElement(se.a,{value:"",control:r.a.createElement(re.a,{color:"primary"}),label:"All"}),r.a.createElement(se.a,{value:"denim",control:r.a.createElement(re.a,{color:"primary"}),label:"Denim"}),r.a.createElement(se.a,{value:"vintage",control:r.a.createElement(re.a,{color:"primary"}),label:"Vintage"})))))),r.a.createElement(Z.a,null,r.a.createElement(ee.a,{expandIcon:r.a.createElement(ne.a,null),"aria-controls":"panel2a-content",id:"panel2a-header"},r.a.createElement(C.a,{className:e.heading},"Size")),r.a.createElement(te.a,null,r.a.createElement(C.a,null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."))),r.a.createElement(Z.a,null,r.a.createElement(ee.a,{expandIcon:r.a.createElement(ne.a,null),"aria-controls":"panel3a-content",id:"panel3a-header"},r.a.createElement(C.a,{className:e.heading},"Price"))))}}]),t}(n.Component),ce=Object(w.a)(function(e){return{}})(ie),pe=a(31),ue=a.n(pe),me=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={jacketsSelected:[{photos:[{URL:"",ID:""}]}],responseError:""},a.componentDidMount=Object(G.a)(K.a.mark(function e(){return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ue()({method:"get",url:"http://localhost:3001/products/"}).then(function(e){console.log("responsemount",e),a.setState({jacketsSelected:e.data})}).catch(function(e){e.response?a.setState({responseError:e.response.data.errors.message}):a.setState({responseError:"Something went wrong :("})});case 2:case"end":return e.stop()}},e)})),a.handleFilterChange=function(){var e=Object(G.a)(K.a.mark(function e(t,n){return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return Object.keys(n).forEach(function(e){t[e]=n[e]}),e.next=4,ue()({method:"get",url:"http://localhost:3001/products/",params:n}).then(function(e){console.log("response",e),a.setState({jacketsSelected:e.data})}).catch(function(e){e.response?a.setState({responseError:e.response.data.errors.message}):a.setState({responseError:"Something went wrong :("})});case 4:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.state.jacketsSelected,a=[];return t.forEach(function(e){a.push(r.a.createElement("div",null,e.photos[0]&&e.photos[0].URL?r.a.createElement(m.b,{to:"/product/".concat(e._id)},r.a.createElement("img",{src:e.photos[0].URL})):"",r.a.createElement("div",null,e.name),r.a.createElement("div",null,e.price)))}),r.a.createElement("div",null,r.a.createElement(X,null,r.a.createElement(Y,null,"Discover Jackets"),r.a.createElement("div",{className:e.container},r.a.createElement("div",{className:e.filter},r.a.createElement(ce,{update:this.handleFilterChange})),r.a.createElement("div",{className:e.jackets},a))))}}]),t}(n.Component),de=Object(w.a)(function(e){return{container:{display:"flex",flexDirection:"row"},expansionPanelContainer:{width:"25%"},filter:{width:"20%"},jackets:{display:"grid",gridTemplateColumns:"100px 50px 100px",gridTemplateRows:"80px auto 80px",gridColumnGap:"10px",gridRowGap:"15px",width:"80%",backgroundColor:"yellow"}}})(me),he=a(70),fe=a(203),ge=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.children,n=e.type,o="white"===n?"outlined":"contained",s="white"===n?"inherit":"primary";return r.a.createElement(fe.a,{variant:o,size:"medium",color:s,classes:{contained:t.button,outlined:t.button}},a)}}]),t}(n.Component),be=Object(w.a)(function(e){return{button:{borderRadius:0,boxShadow:"none"}}})(ge),ve=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.children;return r.a.createElement("div",{className:t.error},a)}}]),t}(n.Component),Ee=Object(w.a)(function(e){return{error:{border:"1px solid rgba(0, 0, 0, 0.23)",color:"#df5353",textAlign:"center",padding:"8px",margin:"8px",backgroundColor:"#ffd0cc",width:"100%"}}})(ve),je=a(150),we=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.children;return r.a.createElement(je.a,{classes:{root:t.paper},square:!0},a)}}]),t}(n.Component),ye=Object(w.a)(function(e){var t;return{paper:(t={display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginTop:"60px"},Object(j.a)(t,e.breakpoints.up("md"),{width:"370px",padding:"30px 50px"}),Object(j.a)(t,e.breakpoints.between("xs","sm"),{width:"320px",padding:"30px 26.6px"}),t)}})(we),Oe=a(207),xe=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.error,a=e.label,n=e.helperText,o=e.id,s=e.onBlur,l=e.onChange,i=e.type,c=e.value;return r.a.createElement(Oe.a,{error:t,fullWidth:!0,helperText:n,id:o,label:a,margin:"dense",onBlur:s,onChange:l,type:i,value:c,variant:"outlined"})}}]),t}(n.Component),Se=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",touched:{email:!1,password:!1},errors:{},responseError:""},a.handleSubmit=function(e){e.preventDefault();var t=a.validateInput(a.state.email,a.state.password);if(Object.keys(t).some(function(e){return t[e]})){a.setState({touched:{email:!0,password:!0}})}else{var n={email:a.state.email,password:a.state.password};ue()({method:"post",url:"http://localhost:3001/users/login",data:n}).then(function(e){localStorage.setItem("token",e.data.token),a.props.updateUserType("shopkeeper"),a.props.history.push("/mystore")}).catch(function(e){e.response?a.setState({responseError:e.response.data.errors.message}):a.setState({responseError:"Something went wrong :("})})}},a.handleBlur=function(e){return function(t){a.setState({touched:Object(he.a)({},a.state.touched,Object(j.a)({},e,!0))})}},a.validateInput=function(e,t){var a,n;return(1!==e.split("").filter(function(e){return"@"===e}).length||-1===e.indexOf(".")||e.length<6)&&(a="Please enter your email address."),0===t.length&&(n="Please enter your password."),{email:a,password:n}},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes,a=this.validateInput(this.state.email,this.state.password);return r.a.createElement("div",{className:t.container},r.a.createElement(ye,null,r.a.createElement(Y,null,"Shop Login"),r.a.createElement("form",{onSubmit:this.handleSubmit,className:t.form,noValidate:!0},r.a.createElement(xe,{error:!!this.state.touched.email&&!!a.email,helperText:this.state.touched.email?a.email:"",id:"email",label:"Email",onChange:function(t){return e.setState({email:t.target.value})},onBlur:this.handleBlur("email"),type:"text",value:this.state.email}),r.a.createElement(xe,{error:!!this.state.touched.password&&!!a.password,helperText:this.state.touched.password?a.password:"",id:"password",label:"Password",onChange:function(t){return e.setState({password:t.target.value})},onBlur:this.handleBlur("password"),type:"password",value:this.state.password}),this.state.responseError?r.a.createElement(Ee,null,this.state.responseError):"",r.a.createElement(be,{type:"submit",classes:{button:t.button}},"Login"))))}}]),t}(n.Component),ke=Object(w.a)(function(e){return{button:{marginTop:"25px"},container:{display:"flex",flexDirection:"column",alignItems:"center"},form:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%"}}})(Se),Ce=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={name:"",email:"",password1:"",password2:"",touched:{name:!1,email:!1,password1:!1,password2:!1},errors:{},responseError:""},a.handleSubmit=function(e){e.preventDefault();var t=a.validateInput(a.state.name,a.state.email,a.state.password1,a.state.password2);if(Object.keys(t).some(function(e){return t[e]})){var n={name:!0,email:!0,password1:!0,password2:!0};a.setState({touched:n,responseError:""}),a.setState({touched:n})}else{var r={name:a.state.name,email:a.state.email,password:a.state.password1,isShopOwner:!0};ue()({method:"post",url:"http://localhost:3001/users",data:r}).then(function(e){localStorage.setItem("token",e.data.token),a.props.updateUserType("shopkeeper"),a.props.history.push("/mystore")}).catch(function(e){e.response?a.setState({responseError:e.response.data.errors.message}):a.setState({responseError:"Something went wrong :("})})}},a.handleBlur=function(e){return function(t){a.setState({touched:Object(he.a)({},a.state.touched,Object(j.a)({},e,!0))})}},a.validateInput=function(e,t,a,n){var r,o,s,l;return 0===e.length&&(r="Please enter a name."),(1!==t.split("").filter(function(e){return"@"===e}).length||-1===t.indexOf(".")||t.length<6)&&(o="Please enter a valid email address."),a.length<6&&(s="Password must be at least 6 characters long."),0===n.length?l="Please confirm password.":a!==n&&(l="Passwords do not match."),{name:r,email:o,password1:s,password2:l}},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes,a=this.validateInput(this.state.name,this.state.email,this.state.password1,this.state.password2);return r.a.createElement("div",{className:t.container},r.a.createElement(ye,null,r.a.createElement(Y,null,"Create Shop"),r.a.createElement("form",{onSubmit:this.handleSubmit,className:t.form,noValidate:!0},r.a.createElement(xe,{error:!!this.state.touched.name&&!!a.name,helperText:this.state.touched.name?a.name:"",id:"name",label:"Name",onBlur:this.handleBlur("name"),onChange:function(t){return e.setState({name:t.target.value})},type:"text",value:this.state.name}),r.a.createElement(xe,{error:!!this.state.touched.email&&!!a.email,helperText:this.state.touched.email?a.email:"",id:"email",label:"Email",onChange:function(t){return e.setState({email:t.target.value})},onBlur:this.handleBlur("email"),type:"text",value:this.state.email}),r.a.createElement(xe,{error:!!this.state.touched.password1&&!!a.password1,helperText:this.state.touched.password1?a.password1:"",id:"password1",label:"Create Password",onChange:function(t){return e.setState({password1:t.target.value})},onBlur:this.handleBlur("password1"),type:"password",value:this.state.password1}),r.a.createElement(xe,{error:!!this.state.touched.password2&&!!a.password2,helperText:this.state.touched.password2?a.password2:"",id:"password2",label:"Confirm Password",onChange:function(t){return e.setState({password2:t.target.value})},onBlur:this.handleBlur("password2"),type:"password",value:this.state.password2}),this.state.responseError?r.a.createElement(Ee,null,this.state.responseError):"",r.a.createElement(be,{type:"submit",classes:{button:t.button}},"Create"))))}}]),t}(n.Component),Be=Object(w.a)(function(e){return{button:{marginTop:"25px"},container:{display:"flex",flexDirection:"column",alignItems:"center"},form:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%"}}})(Ce),Te=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={currentImage:0},a.imageClick=function(e){a.setState({currentImage:e})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.classes,n=t.images,o=[];return n.forEach(function(t,n){var s=a.imageScrollOption;n===e.state.currentImage&&(s=a.imageScrollCurrent),o.push(r.a.createElement("img",{src:t.URL,onClick:function(){return e.imageClick(n)},className:s,key:n,alt:"jacket"}))}),r.a.createElement("div",{className:a.container},r.a.createElement("div",{className:a.imageScrollSideContainer},o),r.a.createElement("div",{className:a.imageMainContainer},r.a.createElement("img",{src:n[this.state.currentImage].URL,className:a.imageMain,alt:"jacket"}),r.a.createElement("div",{className:a.imageScrollBottomContainer},o)))}}]),t}(n.Component),De=Object(w.a)(function(e){var t,a;return{container:{display:"flex",flexDirection:"row",justifyContent:"flex-start",flexShrink:"0"},imageMain:{width:"100%"},imageMainContainer:Object(j.a)({display:"flex",flexDirection:"column",width:"75%"},e.breakpoints.down("sm"),{width:"100%"}),imageScrollBottomContainer:Object(j.a)({display:"flex",flexDirection:"row",justifyContent:"flex-start",width:"100%"},e.breakpoints.up("md"),{display:"none"}),imageScrollSideContainer:Object(j.a)({display:"flex",flexDirection:"column",justifyContent:"flex-start",paddingRight:"40px",width:"25%"},e.breakpoints.down("sm"),{display:"none"}),imageScrollCurrent:(t={width:"100%",marginBottom:"10px"},Object(j.a)(t,e.breakpoints.down("sm"),{width:"25%",height:"auto"}),Object(j.a)(t,"opacity",1),Object(j.a)(t,"cursor","pointer"),Object(j.a)(t,"&:hover",{opacity:1}),t),imageScrollOption:(a={width:"100%",marginBottom:"10px"},Object(j.a)(a,e.breakpoints.down("sm"),{width:"25%",height:"auto"}),Object(j.a)(a,"opacity",.55),Object(j.a)(a,"cursor","pointer"),Object(j.a)(a,"&:hover",{opacity:1}),a)}})(Te),Ne=a(151),Ie=Object(Ne.a)(function(e){return{image:{width:"30px",height:"30px",borderRadius:"50%",marginRight:"10px"},profile:{display:"flex",flexDirection:"row",alignItems:"center",fontWeight:"600"}}}),Le=function(){var e=Ie();return r.a.createElement("div",{className:e.profile},r.a.createElement("img",{src:"https://cactus-jacketshop.s3.us-east-2.amazonaws.com/profilepic.jpg",className:e.image,alt:"profile"}),r.a.createElement("p",null,"Jessica Smith"))},ze=a(204),Ae=a(214),Re=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={size:""},a.handleSize=function(e,t){a.setState({size:t})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.classes,a=e.sizesAvailable;return r.a.createElement("div",{className:t.toggleContainer},"Size:",r.a.createElement(Ae.a,{value:this.state.size,size:"small",exclusive:!0,onChange:this.handleSize,classes:{root:t.toggleButtonGroup}},r.a.createElement(ze.a,{value:"xsmall",disabled:!a.xsmall,classes:{root:t.toggleButton,selected:t.toggleButtonSelected,disabled:t.toggleButtonDisabled}},"XS"),r.a.createElement(ze.a,{value:"small",disabled:!a.small,classes:{root:t.toggleButton,selected:t.toggleButtonSelected,disabled:t.toggleButtonDisabled}},"S"),r.a.createElement(ze.a,{value:"medium",disabled:!a.medium,classes:{root:t.toggleButton,selected:t.toggleButtonSelected,disabled:t.toggleButtonDisabled}},"M"),r.a.createElement(ze.a,{value:"large",disabled:!a.large,classes:{root:t.toggleButton,selected:t.toggleButtonSelected,disabled:t.toggleButtonDisabled}},"L"),r.a.createElement(ze.a,{value:"xlarge",disabled:!a.xlarge,classes:{root:t.toggleButton,selected:t.toggleButtonSelected,disabled:t.toggleButtonDisabled}},"XL"),r.a.createElement(ze.a,{value:"xxlarge",disabled:!a.xxlarge,classes:{root:t.toggleButton,selected:t.toggleButtonSelected,disabled:t.toggleButtonDisabled}},"XXL")))}}]),t}(n.Component),Me=Object(w.a)(function(e){return{toggleContainer:{display:"flex",flexDirection:"row",alignItems:"center",fontWeight:"600"},toggleButton:{margin:"5px !important",border:"1px solid rgba(0, 0, 0, .6) !important",borderRadius:"0 !important",color:"#000",width:"40px"},toggleButtonDisabled:{border:"1px solid rgba(0, 0, 0, .2) !important",color:"rgba(0, 0, 0, .2) !important"},toggleButtonGroup:{marginLeft:"5px",backgroundColor:"transparent",flexWrap:"wrap"},toggleButtonSelected:{backgroundColor:"rgba(0, 0, 0, .83) !important",color:"#fff !important"}}})(Re),Pe=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={data:{name:"",description:"",price:"",sizes:{xsmall:0,small:0,medium:0,large:0,xlarge:0,xxlarge:0},photos:[{URL:"",ID:""}]},responseError:""},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=window.location.pathname.replace("/product/","");ue()({method:"get",url:"http://localhost:3001/products/".concat(t)}).then(function(t){e.setState({data:t.data})}).catch(function(t){t?e.setState({responseError:t}):e.setState({responseError:"Something went wrong :("})})}},{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(X,null,r.a.createElement("div",{className:e.container},r.a.createElement(De,{images:this.state.data.photos,classes:{container:e.imageScroll}}),r.a.createElement("div",{className:e.infoContainer},r.a.createElement(Le,null),r.a.createElement(_,{classes:{title:e.title}},this.state.data.name),r.a.createElement("div",{className:e.description},this.state.data.description),r.a.createElement("div",{className:e.price},"CAD $",this.state.data.price),r.a.createElement("div",{className:e.sizePicker},r.a.createElement(Me,{sizesAvailable:this.state.data.sizes})),r.a.createElement("div",{className:e.buttonContainer},r.a.createElement(be,{type:"black",classes:{button:e.button}},"Add to Cart"),r.a.createElement(be,{type:"white",classes:{button:e.button}},"Request a Custom Design")),r.a.createElement("div",{className:e.question},"Have a question about an item? ",r.a.createElement("span",{className:e.message},"Send a message."),r.a.createElement("br",null),"The seller usually responds in a few hours."))))}}]),t}(n.Component),Ue=Object(w.a)(function(e){return{button:{marginRight:"10px",marginBottom:"10px"},buttonContainer:{marginTop:"50px"},container:Object(j.a)({display:"flex",flexDirection:"row",justifyContent:"space-between"},e.breakpoints.down("xs"),{flexDirection:"column",justifyContent:"flex-start"}),description:{marginTop:"15px",color:"#777",fontSize:"16px"},imageScroll:Object(j.a)({width:"57%"},e.breakpoints.down("xs"),{width:"100%"}),infoContainer:Object(j.a)({width:"40%",paddingRight:"30px"},e.breakpoints.down("xs"),{width:"100%"}),message:{fontWeight:600,textDecoration:"underline"},price:{fontWeight:600,fontSize:"15px",marginTop:"30px"},sizePicker:{marginTop:"30px"},title:{marginTop:"25px"}}})(Pe),We=a(205),Fe=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={storeName:"My Store!",storeDesc:"default description",coverURL:"https://source.unsplash.com/user/erondu"},a.fetchStoreData=Object(G.a)(K.a.mark(function e(){return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("hereeeee"),e.next=3,ue()({method:"get",url:"http://localhost:3001/shops",headers:{Authorization:localStorage.token}}).then(function(e){console.log("got shop info",e.data)}).catch(function(e){console.log("ERROR",e.response),e.response?a.setState({responseError:e.response}):a.setState({responseError:"Something went wrong :("})});case 3:case"end":return e.stop()}},e)})),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=Object(G.a)(K.a.mark(function e(){return K.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchStoreData();case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",null,r.a.createElement(We.a,{container:!0,direction:"column"},r.a.createElement("div",{className:e.storeBanner},r.a.createElement(We.a,{container:!0,item:!0,direction:"row",justify:"flex-start",alignItems:"center"},r.a.createElement(We.a,{item:!0,md:5},r.a.createElement("div",null,r.a.createElement(C.a,{component:"h1",variant:"h3",color:"inherit",gutterBottom:!0},this.state.storeName),r.a.createElement(C.a,{variant:"h5",color:"inherit",paragraph:!0},this.state.storeDesc),r.a.createElement("br",null)," ",r.a.createElement("br",null)," ",r.a.createElement("br",null),r.a.createElement(be,{type:"button",classes:{button:e.button}},"Edit Cover"))),r.a.createElement(We.a,{item:!0,md:7},r.a.createElement("div",{className:e.coverPhoto},r.a.createElement("img",{style:{height:"100%",width:"100%"},src:this.state.coverURL,alt:"background"}))))),r.a.createElement("div",null,r.a.createElement(We.a,{container:!0,item:!0,direction:"row"},r.a.createElement(We.a,{container:!0,item:!0,direction:"column",justify:"flex-start",alignItems:"center"},r.a.createElement(We.a,{item:!0,md:4}),r.a.createElement(We.a,{item:!0,md:4}),r.a.createElement(We.a,{item:!0,md:4}))))))}}]),t}(n.Component),He=Object(w.a)(function(e){return{button:{marginTop:"25px"},container:{display:"flex",flexDirection:"column",alignItems:"center"},form:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%"},storeBanner:{alignItems:"center",justify:"center",textAlign:"center"},coverPhoto:{height:"450px",overflow:"hidden",objectFit:"cover"}}})(Fe),Je=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={userType:"shopper"},a.updateUserType=function(e){console.log("userType",e),a.setState({userType:e})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(f.a,{theme:E},r.a.createElement(h.a,null),r.a.createElement(m.a,null,r.a.createElement(J,{userType:this.state.userType}),r.a.createElement(d.a,{exact:!0,path:"/",component:de}),r.a.createElement(d.a,{exact:!0,path:"/login",render:function(t){return r.a.createElement(ke,Object.assign({},t,{updateUserType:e.updateUserType}))}}),r.a.createElement(d.a,{exact:!0,path:"/register",render:function(t){return r.a.createElement(Be,Object.assign({},t,{updateUserType:e.updateUserType}))}}),r.a.createElement(d.a,{exact:!0,path:"/mystore",component:He}),r.a.createElement(d.a,{path:"/product",component:Ue})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(Je,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[112,1,2]]]);
//# sourceMappingURL=main.f937894e.chunk.js.map