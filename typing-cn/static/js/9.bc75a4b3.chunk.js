(this["webpackJsonptyping-cn"]=this["webpackJsonptyping-cn"]||[]).push([[9],{341:function(e,t,n){},342:function(e){e.exports=JSON.parse('[["","!\\n1","@\\n2","#\\n3","$\\n4","%\\n5","^\\n6","&\\n7","*\\n8","(\\n9",")\\n0","_\\n-","+\\n=",{"w":2},""],[{"w":1.5},"","Q","W","E","R","T","Y","U","I","O","P","{\\n[","}\\n]",{"w":1.5},""],[{"w":1.75},"","A","S","D","F","G","H","J","K","L",":\\n;","\\"\\n\'",{"w":2.25},""],[{"w":2.25},"","Z","X","C","V","B","N","M","<\\n,",">\\n.","?\\n/",{"w":2.75},""],[{"w":3.75},"",{"w":6.25}," ",{"w":5},""]]')},343:function(e,t,n){},364:function(e,t,n){"use strict";n.r(t);var a=n(43),c=n(275),r=n(276),i=n(0),u=n.n(i),l=n(277),o=n(278),s=(n(341),n(342).map((function(e){var t=[];return e.forEach((function(n,a){if("string"===typeof n){var c={w:1,t:n},r=e[a-1];a>0&&"object"===typeof r&&(c={w:r.w,t:n}),t.push(c)}})),t}))),f=function(e){var t=function(t){setTimeout((function(){e.finishAnimate&&e.finishAnimate(t)}),250)},n=function(n){var a="key-item";if(""===n)a+=" placeholder";else{var c=n.split("\n").pop()||"";e.highlightKeys.has(c)&&(a+=" high-light"),e.correctedKey&&e.correctedKey===c&&(a+=" keyCorrect",t(c)),e.wrongKey&&e.wrongKey===c&&(a+=" headShake",t(c)),e.blurKeys&&e.blurKeys.has(c)&&(a+=" blur")}return a};return u.a.createElement("div",{className:"Keyboard"},s.map((function(e,t){return u.a.createElement(l.a,{key:t,justify:"space-between"},e.map((function(e,t){return u.a.createElement(o.a,{className:n(e.t),key:t,style:{width:"".concat(60*e.w,"px")},dangerouslySetInnerHTML:{__html:e.t.replace("\n","<br>")}})})))})))},m=(n(343),["Q","W","E","R","T","A","S","D","F","G","Z","X","C","V","B"]),h=["1","2","3","4","5","6"],p=["Y","U","I","O","P","H","J","K","L","N","M"],y=["7","8","9","0"],g=["-","=","[","]",";","'",",",".","/"],b=function(e,t){var n={leftNum:h.join(""),left:m.join(""),rightNum:y.join(""),right:p.join(""),charAll:"",num:""};n.charAll=n.left+n.right,n.num=n.leftNum+n.rightNum;var a,c,r=(n[e]||n.charAll).replace(t||"","");return r.charAt((a=0,c=r.length-1,a="undefined"!==typeof a?a:0,c="undefined"!==typeof c?c:9007199254740992,Math.round(Math.random()*(c-a))+a))};t.default=function(){var e=Object(i.useState)(""),t=Object(a.a)(e,2),n=t[0],l=t[1],o=Object(i.useState)(""),s=Object(a.a)(o,2),w=s[0],d=s[1],j=Object(i.useRef)(null),v=Object(i.useState)("charAll"),O=Object(a.a)(v,2),E=O[0],S=O[1],K=Object(i.useState)(new Set([])),N=Object(a.a)(K,2),k=N[0],A=N[1],T=Object(i.useState)(),C=Object(a.a)(T,2),_=C[0],B=C[1],J=Object(i.useState)(),M=Object(a.a)(J,2),U=M[0],D=M[1],L=Object(i.useState)(new Set([])),G=Object(a.a)(L,2),H=G[0],I=G[1],P=Object(i.useState)(0),R=Object(a.a)(P,2),V=R[0],x=R[1],F=Object(i.useState)(0),Q=Object(a.a)(F,2),W=Q[0],X=Q[1];return Object(i.useEffect)((function(){""===n?d(""):" "===n?d("Space"):1===n.length?d(n.toLocaleUpperCase()):d(n)}),[n]),Object(i.useEffect)((function(){var e=[].concat(g);"charAll"===E?I(new Set(e.concat(h,y))):"left"===E?I(new Set(e.concat(p,h,y))):"right"===E?I(new Set(e.concat(m,h,y))):"num"===E&&I(new Set(e.concat(m,p))),A(new Set([b(E)])),x(0),X(0),j.current.focus()}),[E]),u.a.createElement("div",{className:"Training"},u.a.createElement("div",{className:"Training-mode"},u.a.createElement(c.a.Group,{onChange:function(e){return S(e.target.value)},defaultValue:E},u.a.createElement(c.a.Button,{value:"left"},"\u5de6\u624b\u6a21\u5f0f"),u.a.createElement(c.a.Button,{value:"charAll"},"\u5168\u90e8"),u.a.createElement(c.a.Button,{value:"right"},"\u53f3\u624b\u6a21\u5f0f"),u.a.createElement(c.a.Button,{value:"num"},"\u6570\u5b57\u6a21\u5f0f"))),u.a.createElement(f,{highlightKeys:k,correctedKey:_,wrongKey:U,finishAnimate:function(e){B(""),D("")},blurKeys:H}),u.a.createElement("div",{className:"Training__input"},u.a.createElement(r.a,{ref:j,onKeyDown:function(e){l(e.key);var t=1===e.key.length?e.key.toUpperCase():e.key,n=Array.from(k)[0];t===n?(B(n),x((function(e){return e+1})),A(new Set([b(E,n)]))):(D(n),X((function(e){return e+1}))),e.persist(),e.preventDefault(),e.stopPropagation()},onKeyUp:function(e){console.log(e.key,e.keyCode,e.metaKey),e.persist()}})),u.a.createElement("div",{className:"Training__desc"},u.a.createElement("div",null,w)),u.a.createElement("div",{className:"Training-count"},u.a.createElement("div",{className:"correct"},V),u.a.createElement("div",{className:"wrong"},W)))}}}]);
//# sourceMappingURL=9.bc75a4b3.chunk.js.map