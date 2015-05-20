define(["avalon"],function(e){function b(e,t){var n="page"+t;return c?e.changedTouches[0][n]:e[n]}function w(e,t,n,r,i){var s=b(e,r);if(n.containment){var o=r==="X"?n.containment[0]:n.containment[1],u=r==="X"?n.containment[2]:n.containment[3],a=s-(r==="X"?n.clickX:n.clickY);a<o?s+=Math.abs(o-a):a>u&&(s-=Math.abs(u-a))}n["page"+r]=s;var f=m[r],l=f.toLowerCase(),c=n["start"+f]+s-n["startPage"+r]+(i?n["end"+f]:0);n[l]=c,n["drag"+r]&&(t.style[l]=c+"px")}function C(t,n){if(!t.containment){if(Array.isArray(n.containment))return;n.containment=null;return}var r=n.$element.width(),i=n.$element.height();if(t.containment==="window"){var s=e(window);n.containment=[s.scrollLeft(),s.scrollTop(),s.scrollLeft()+s.width()-n.marginLeft-r,s.scrollTop()+s.height()-n.marginTop-i];return}if(t.containment==="document"){n.containment=[0,0,e(document).width()-n.marginLeft,e(document).height()-n.marginTop];return}if(Array.isArray(t.containment)){var o=t.containment;n.containment=[o[0],o[1],o[2]-r,o[3]-i];return}if(t.containment==="parent"||t.containment.charAt(0)==="#"){var u;t.containment==="parent"?u=n.element.parentNode:u=document.getElementById(t.containment.slice(1));if(u){var a=e(u).offset();n.containment=[a.left+n.marginLeft,a.top+n.marginTop,a.left+u.offsetWidth-n.marginLeft-r,a.top+u.offsetHeight-n.marginTop-i]}}}var t={ghosting:!1,delay:0,axis:"xy",started:!0,start:e.noop,beforeStart:e.noop,drag:e.noop,beforeStop:e.noop,stop:e.noop,scrollPlugin:!0,scrollSensitivity:20,scrollSpeed:20},n=document.getElementById("avalonStyle"),r=".ui-helper-global-drag *{ -webkit-touch-callout: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}.ui-helper-global-drag img{-webkit-user-drag:none; pointer-events:none;}";try{n.innerHTML+=r}catch(i){n.styleSheet.cssText+=r}var s,o=navigator.userAgent,u=/Android/i.test(o),a=/BlackBerry/i.test(o),f=/IEMobile/i.test(o),l=/iPhone|iPad|iPod/i.test(o),c=u||a||f||l;if(!c)var h="mousedown",p="mousemove",d="mouseup";else h="touchstart",p="touchmove",d="touchend";var v=e.bindingHandlers.draggable=function(n,r){var i=n.value.match(e.rword)||[],o=i[0]||"$",u=i[1]||"draggable",a,f;if(o!="$"){a=e.vmodels[o];if(!a)return}n.element.removeAttribute("ms-draggable"),a||(a=r.length?r[0]:null);var l=a||{};a&&typeof a[u]=="object"&&(f=a[u],f.$model&&(f=f.$model),l=f);var c=n.element,p=e(c),d=e.mix({},t,f||{},n[u]||{},e.getWidgetData(c,"draggable"));"drag,stop,start,beforeStart,beforeStop".replace(e.rword,function(e){var t=d[e];typeof t=="string"&&typeof l[t]=="function"&&(d[e]=l[t])}),d.axis!==""&&!/^(x|y|xy)$/.test(d.axis)&&(d.axis="xy"),s=document.body,p.bind(h,function(t){var n=e.mix({},d,{element:c,$element:p,pageX:b(t,"X"),pageY:b(t,"Y"),marginLeft:parseFloat(p.css("marginLeft"))||0,marginTop:parseFloat(p.css("marginTop"))||0});n.startPageX=n.pageX,n.startPageY=n.pageY,d.axis.replace(/./g,function(e){n["drag"+e.toUpperCase()]=!0}),!n.dragX&&!n.dragY&&(n.started=!1),typeof d.beforeStart=="function"&&d.beforeStart.call(n.element,t,n);if(n.handle&&l){var r=l[n.handle];r=typeof r=="function"?r:n.handle;if(typeof r=="function"){var i=r.call(c,t,n);if(!i||i.nodeType!==1)return;if(!c.contains(i))return}}S();var o=p.css("position");/^(?:r|a|f)/.test(o)||(c.style.position="relative",c.style.top="0px",c.style.left="0px"),d.delay&&isFinite(d.delay)&&(n.started=!1,setTimeout(function(){n.started=!0},d.delay));var u=p.offset();if(d.ghosting){var a=c.cloneNode(!0);e(a).css("opacity",.7).width(c.offsetWidth).height(c.offsetHeight),n.clone=a,o!=="fixed"&&(a.style.position="absolute",a.style.top=u.top-n.marginTop+"px",a.style.left=u.left-n.marginLeft+"px"),s.appendChild(a)}var f=e(n.clone||n.element);n.startLeft=parseFloat(f.css("left")),n.startTop=parseFloat(f.css("top")),n.endLeft=parseFloat(p.css("left"))-n.startLeft,n.endTop=parseFloat(p.css("top"))-n.startTop,n.clickX=n.pageX-u.left,n.clickY=n.pageY-u.top,C(d,n),v.dragData=n,"start,drag,beforeStop,stop".replace(e.rword,function(e){v[e]=[d[e]]}),v.plugin.call("start",t,n)})},m={X:"Left",Y:"Top"};v.dragData={},v.start=[],v.drag=[],v.stop=[],v.beforeStop=[],v.plugin={add:function(e,t){for(var n in t){var r=t[n];typeof r=="function"&&Array.isArray(v[n])&&(r.isPlugin=!0,r.pluginName=e+"Plugin",v[n].push(r))}},call:function(t,n,r){var i=v[t];Array.isArray(i)&&i.forEach(function(e){(typeof e.pluginName=="undefined"?!0:r[e.pluginName])&&e.call(r.element,n,r)});if(t==="stop")for(var s in v)i=v[s],Array.isArray(i)&&i.forEach(function(t){t.isPlugin||e.Array.remove(i,t)})}};var g=new Date-0,y=document.querySelector?12:30;e(document).bind(p,function(e){var t=new Date-g;if(t>y){g=t;var n=v.dragData;if(n.started===!0){e.preventDefault();var r=n.clone||n.element;w(e,r,n,"X"),w(e,r,n,"Y"),v.plugin.call("drag",e,n)}}}),e(document).bind(d,function(e){var t=v.dragData;if(t.started===!0){x();var n=t.element;v.plugin.call("beforeStop",e,t),t.dragX&&w(e,n,t,"X",!0),t.dragY&&w(e,n,t,"Y",!0),t.clone&&s.removeChild(t.clone),v.plugin.call("stop",e,t),v.dragData={}}});var E=document.documentElement,S=function(){e(E).addClass("ui-helper-global-drag")},x=function(){e(E).removeClass("ui-helper-global-drag")};if(window.VBArray&&!("msUserSelect"in E.style)){var T;function N(){var e=window.event||{};e.returnValue=!1}S=function(){T=s.onselectstart,s.onselectstart=N},x=function(){s.onselectstart=T}}return e});