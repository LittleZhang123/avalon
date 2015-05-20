require(["pages/timeline/dest/treeConfig","pages/timeline/dest/bezier","dialog/avalon.dialog.js"],function(e,t){function c(e){if("querySelector"in document&&typeof document.querySelector=="function")return document.querySelectorAll("."+e);if("getElementsByClassName"in document&&typeof document.getElementsByClassName=="function")return document.getElementsByClassName(e);elements=document.all;var t=[];pattern=new RegExp("(^|\\s)"+e+"(\\s|$)");for(i=0;i<elements.length;i++)pattern.test(elements[i].className)&&t.push(elements[i]);return t}var n={};n.getComputedStyle=avalon.css;var r=avalon(document.getElementById("parallax")).offset(),s=c("parallax0")[0],o=c("parallax1")[0],u=c("parallax2")[0],a=0;s.style.top=r.top+"px",o.style.top=r.top+"px",u.style.top=r.top+"px";var f=r.top,l=[1,1.5,1.8];avalon.define("www_uiguide",function(t){function x(){var e=k(this);if(!e)return;var t=e.className.match(/tree__item--m(\d+)/)[1],r=c("month--m"+t)[0],h=L(e);T(e,"tree__item--right")?r.style.left=C(120,250)+"px":r.style.left=parseInt(n.getComputedStyle(e,"width"),10)+C(120,250)+"px",h-=f,r.style.top=(h-a)*(l[1]-1)+C(h,h+parseInt(n.getComputedStyle(e,"height"),10)-parseInt(n.getComputedStyle(r,"height"),10))+"px",i++,avalon.Array.ensure(d,s),avalon.Array.ensure(d,o),avalon.Array.ensure(d,u)}function T(e,t){return(new RegExp("(^|s*)"+t+"(s*|$)")).test(e.className)}function N(e){for(var t=0;t<h.length;t++)if(h[t].key==e)return h[t].item.length}function C(e,t){return e+Math.random()*(-e+t)}function k(e){var t=e.childNodes;for(var n=0;n<t.length;n++)if(t.item(n).nodeType===1)return t.item(n)}function L(e){var t=e.offsetTop,n=e.offsetParent;while(n!==null)t+=n.offsetTop,n=n.offsetParent;return t}function A(){var e,t=parseInt(document.body.scrollTop||document.documentElement.scrollTop,10);if(d.length<1)return;for(var n=0;n<d.length;n++)e=d[n],e.style.top=-(t*l[n])+"px"}function O(e){var t=document.body||document.documentElement,n=t.style,r=[],i=e;if(typeof n[e]=="string")return!0;i=i.charAt(0).toUpperCase()+i.substr(1);for(var s=0;s<r.length;s++)if(typeof n[r[s]+i]=="string")return!0;return!1}function M(e,t){window.requestAnimationFrame&&!t?m=window.requestAnimationFrame(function(){e(),m=window.requestAnimationFrame(arguments.callee)}):m=window.setTimeout(function(){e(),window.setTimeout(arguments.callee,1e3/60)},1e3*(t||1)/60)}function _(e){window.cancelAnimationFrame?window.cancelAnimationFrame(e):window.clearTimeout(e)}var r=!O("transition"),i=0,h=[],p=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],d=[],v=800,m,g=document.body.scrollTop||document.documentElement.scrollTop;for(var y in e)e.hasOwnProperty(y)&&h.push({key:y,item:e[y]});t.circles=p,h.sort(function(e,t){return t.key+e.key}),t.imgUrl="",t.showBigPic=function(e){t.imgUrl=e,avalon.vmodels.treeLeafBig.toggle=!0},t.$dialogOpts={width:840,type:"alert",title:"组件使用演示",confirmName:"关闭"},t.months=h,t.cb=x,t.circleCb=function(){var e=c("circle");for(var t=0;t<e.length;t++)e[t].style.top=(t+1)*C(270,540)+"px"},t.outerHeight=n.getComputedStyle(s,"height"),M(function(){t.outerHeight=n.getComputedStyle(s,"height")},300);var b=!0,w,E;E=Bezier.unitBezier(.18,.73,.25,1),avalon.bind(window,"scroll",function(){var e=document.body.scrollTop||document.documentElement.scrollTop,i=g>e?-1:1;g=e;if(r)A();else{_(m);var o=parseInt(e,10),u,a,c=5,h,p,y=[],b=(new Date).getTime(),w;for(var S=0;S<d.length;S++)y[S]=parseInt(d[S].style.top,10)||0;M(function(){for(var e=0;e<d.length;e++){w=d[e];var r=i<0?f:0,o=x(y[e],e)*l[e]+r,u=o<0?-o:o,a=parseInt(n.getComputedStyle(s,"height"));t.outerHeight=a;if(a-u<=f*2+120&&w===s)continue;w.style.top=o+"px"}});function x(e,t){if(isNaN(+e))return;return h=Math.min(((new Date).getTime()-b)/v,1),p=e/l[t]+E(h,800)*(-o-e/l[t]),i>0?Math.max(p,-o):Math.min(p,-o)}}});var S=0;t.nowIndex={};for(var y=0;y<h.length;y++)t.nowIndex[h[y].key]=S,S+=h[y].item.length}),avalon.scan()});