!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("TicketWidget",[],e):"object"==typeof exports?exports.TicketWidget=e():t.TicketWidget=e()}(window,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=3)}([function(t,e){t.exports=require("react")},function(t,e){t.exports=require("react-icons/ai")},function(t,e){t.exports=require("react-jss")},function(t,e,n){t.exports=n(4)},function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return d}));var r=n(0),o=n.n(r),i=n(1),a=n(2);function c(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,a,c=[],l=!0,u=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;l=!1}else for(;!(l=(r=i.call(n)).done)&&(c.push(r.value),c.length!==e);l=!0);}catch(t){u=!0,o=t}finally{try{if(!l&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(u)throw o}}return c}}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var u="http://localhost:3000",s=Object(a.createUseStyles)({ticketButton:{position:"fixed",bottom:0,left:0,color:"white",padding:0,background:"linear-gradient(126.63deg, #2D348C 11.98%, #2D348C 83.35%)",width:"40px",height:"40px",borderRadius:"0 100px 0 0",outline:"none",border:"none !important",transition:"0.2s all ease-in-out",cursor:"pointer","&:hover":{transform:"scale(1.4)",bottom:10,left:10},zIndex:100},ticketButtonIcon:{fontSize:"26px",transform:"rotate(45deg)",position:"relative",top:"5px",right:"5px"},wPopOver:function(t){return{padding:12,position:"fixed",bottom:10,left:10,width:300,height:700,borderRadius:6,boxShadow:"0px 0px 10px 3px rgba(0, 0, 0, 0.20)",animation:t.animation}},iframeISY:{minWidth:300,height:650,border:"none",background:"unset"},"@keyframes slideFromBottom ":{from:{transform:"translateY(100%)"},to:{transform:"translateY(0)"}},"@keyframes slideToBottom ":{from:{transform:"translateY(0)"},to:{transform:"translateY(100%)"}}});function f(t){var e=t.hidePopup,n=void 0===e?function(){}:e,i=t.classes,a=void 0===i?{iframeISY:{},wPopOver:{}}:i,c=t.loading,l=t.setLoading;return Object(r.useEffect)((function(){function t(t){document.getElementById("isy-container").contains(t.target)||n()}return document.addEventListener("click",t,!0),function(){document.removeEventListener("click",t,!0)}}),[n]),o.a.createElement("div",{id:"isy-container",className:a.wPopOver},o.a.createElement("iframe",{className:a.iframeISY,src:u+"/tickets",onLoad:function(){return l(!1)}}),c?o.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100px",height:"100px",viewBox:"0 0 100 100",style:{position:"absolute",top:"50%",left:"50%",transform:"translateX(-50%) translateY(-50%)"}},o.a.createElement("path",{d:"M 50,50 L 33,60.5 a 20 20 -210 1 1 34,0 z",fill:"lightgray"},o.a.createElement("animateTransform",{attributeName:"transform",type:"rotate",from:"0 50 50",to:"360 50 50",dur:"1.2s",repeatCount:"indefinite"})),o.a.createElement("circle",{cx:"50",cy:"50",r:"16",fill:"white"})):null,o.a.createElement("img",{src:u+"/img/ISY-Logo_landing_black.png",style:{maxHeight:50,display:"block",margin:"auto"}}))}function d(t){var e=c(Object(r.useState)(!0),2),n=e[0],a=e[1],l=c(Object(r.useState)(0),2),u=l[0],d=l[1],m=s({animation:2===u?"0.5s ease 0s 1 $slideToBottom":"0.5s ease 0s 1 $slideFromBottom"}),p=function(){d(2),setTimeout((function(){return d(0)}),490)};return o.a.createElement(o.a.Fragment,null,o.a.createElement("button",{className:m.ticketButton,onClick:function(){switch(u){case 0:d(1);break;case 1:p()}}},0!==u?o.a.createElement(i.AiFillPlusCircle,{className:m.ticketButtonIcon}):o.a.createElement(i.AiFillBug,{className:m.ticketButtonIcon})),0!==u?o.a.createElement(f,{hidePopup:p,classes:m,loading:n,setLoading:a,popOverVisible:u,setPopOverVisible:d}):null)}}])}));
//# sourceMappingURL=TicketWidget.js.map