define(["avalon","text!./avalon.at.html","css!../chameleon/oniui-common.css","css!./avalon.at.css"],function(e,t){function r(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function i(e,t){var n=t._datalist.size();switch(e.keyCode){case 13:t._select(e);break;case 9:case 27:e.preventDefault();break;case 38:case 63233:e.preventDefault();var r=t.activeIndex-1;r<0&&(r=n-1),t.activeIndex=r;break;case 40:case 63235:e.preventDefault();var r=t.activeIndex+1;r===n&&(r=0),t.activeIndex=r}}var n=e.ui.at=function(n,s,o){var u=s.atOptions,a=e(n),f,l,c;u.template=u.getTemplate(t,u);var h=new Date-0,p=e.define(s.atId,function(t){e.mix(t,u),t.$skipArray=["at","widgetElement","datalist","template"],t.widgetElement=n;var s=document.documentMode?"bdo":"bdi";t.$init=function(t){var d=[p].concat(o);l=a.bind("blur",function(e){!p.$model.__mouseenter__&&p.toggle&&(p.toggle=!1)}),f=a.bind("keyup",function(t){var n=this.value,o=u.at,a=n.lastIndexOf(o);if(a>-1){if(!p.toggle){var f=n.replace(/\s+$/g,""),l=f.length===1;f=f.split("").join("<wbr>")+"<wbr>",l&&(f="<wbr>"+f),f=f.replace(new RegExp(r("<wbr>"+o+"<wbr>"),"img"),"<"+s+">"+o+"</"+s+">"),c=p._popup.call(this,f),c&&(p.activeIndex=0,e.scan(c,d),e(c).bind("mouseleave",function(){p.$model.__mouseenter__=!1}))}var v=n.substr(a+1,u.maxLength);if(v.length>=u.minLength){var m=v.match(/^\S+/)||[""],g=p.query=m[0];function y(){var e=p.filterData(p),t=e.join(",");p.$model.__toString__!==t&&(e=e.map(function(e){return p.highlightData(e,g)}),p._datalist=e,p.$model.__toString__=t),p.toggle=!!e.length,!p.toggle&&c&&c.parentNode.removeChild(c)}var b=new Date;h-b>p.delay&&typeof p.updateData=="function"&&(p.updateData(y),h=b),y(),p.$model.__keyup__=!0,i(t,p),setTimeout(function(){p.$model.__keyup__=!1},150)}}}),t?t():(e.log("请尽快升到avalon1.3.7+"),e.scan(n,d),typeof u.onInit=="function"&&u.onInit.call(n,p,u,o))},t.$remove=function(){e(n).unbind("keyup",f).unbind("blur",l),t.toggle=!1,e.log("at $remove")},t._popup=function(t){var n=document.createElement("pre");n.innerHTML=t,document.body.appendChild(n);var r=window.getComputedStyle?getComputedStyle(this,null):this.currentStyle,i=e(n);for(var o in r)if(typeof r[o]!="function")try{i.css(o,r[o])}catch(u){}i.css({width:this.offsetWidth,height:this.offsetHeight,border:"1px solid red",display:"block","word-wrap":"break-word","word-break":"break-all"});var a=e(this).offset(),f=n.getBoundingClientRect(),l=n.getElementsByTagName(s),h=l[l.length-1];if(!h)return;if(document.createRange&&document.documentMode!=9){var d=document.createRange();d.selectNode(h);var v=d.getBoundingClientRect()}else v=h.getBoundingClientRect();var m=v.bottom-f.top,g=v.left-f.left;return c=document.createElement("div"),c.innerHTML=p.template,document.body.appendChild(c),c.className="ui-at",c.setAttribute("ms-visible","toggle"),e(c).css({top:a.top+m,left:a.left+g,position:"absolute"}),document.body.removeChild(n),n=null,c},t._hover=function(e,n){e.preventDefault();var r=p.$model;r.__mouseenter__=!0,r.__keyup__||(t.activeIndex=n)},t.$watch("toggle",function(e){e===!1&&c&&c.parentNode&&(c.parentNode.removeChild(c),c=null)}),t._select=function(e){e.stopPropagation(),e.preventDefault();var t=p._datalist[p.activeIndex],r=document.createElement("span");r.innerHTML=t,t=r.textContent||r.innerText;var i=n.value,s=i.replace(/\s+$/g,"").lastIndexOf(p.at);n.value=i.slice(0,s)+"@‌"+t,n.focus(),p.toggle=!1}});return p};return n.vertion=1,n.defaults={at:"@",datalist:[],_datalist:[],template:"",toggle:!1,activeIndex:0,query:"",limit:5,maxLength:20,minLength:1,delay:500,updateData:e.noop,getTemplate:function(e,t){return e},filterData:function(e){var t={},n=e.query,r=n.toLowerCase(),i=e.datalist.filter(function(e){if(e.indexOf(n)===0)return t[e]=1,!0});return e.datalist.forEach(function(e){var n=e.toLowerCase();t[e]||n.indexOf(r)>-1&&(t[e]=1,i.push(e))}),i.slice(0,e.limit)},highlightData:function(e,t){var n=r(t);return e.replace(new RegExp("("+n+")","ig"),function(e,t){return'<strong style="color:#FF6600;">'+t+"</strong>"})}},e});