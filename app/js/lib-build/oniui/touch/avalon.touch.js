/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(["avalon"],function(e){void function(){var t=navigator.userAgent,n=t.indexOf("Android")>0,r=/iP(ad|hone|od)/.test(t),i=/\(([^)]*)\)/,s=e.bindingHandlers.on=function(t,n){var r=t.value,o="$event",u=t.param.replace(/-\d+$/,"");typeof s[u+"Hook"]=="function"&&s[u+"Hook"](t);if(r.indexOf("(")>0&&r.indexOf(")")>-1){var a=(r.match(i)||["",""])[1].trim();if(a===""||a==="$event")o=void 0,r=r.replace(i,"")}else o=void 0;t.hasArgs=o,e.parseExprProxy(r,n,t)};s.clickHook=function(t){function c(){n=!1,e(r).removeClass(i.activeClass)}function h(t){s++,s===1&&(u=Date.now()),n=!0,e.fastclick.canClick(r)&&e(r).addClass(i.activeClass),a=Date.now();var o=t.touches&&t.touches.length?t.touches:[t],c=o[0];f=c.clientX,l=c.clientY}function p(t){var h=t.changedTouches&&t.changedTouches.length?t.changedTouches:t.touches&&t.touches.length?t.touches:[t],p=h[0],d=p.clientX,v=p.clientY,m=Date.now()-a,g=Math.sqrt(Math.pow(d-f,2)+Math.pow(v-l,2)),y=!1;s===2&&(s=0,y=!0);if(n&&m<i.clickDuration&&g<i.dragDistance){o=!0,setTimeout(function(){o=!1},i.preventTime),document.activeElement&&document.activeElement!==r&&document.activeElement.blur();if(i.canClick(r)){var b;r.tagName.toLowerCase()==="label"&&(b=r.htmlFor?document.getElementById(r.htmlFor):null),b?i.focus(b):i.focus(r),e.fastclick.fireEvent(r,"click",t),b&&e.fastclick.fireEvent(b,"click",t),y&&(new Date-u<500&&e.fastclick.fireEvent(r,"dblclick",t),s=0)}}c()}var n=!1,r=t.element,i=e.fastclick,s=0,u,a,f,l;e.fastclick.canFix(r)&&(t.specialBind=function(e,t){e.addEventListener("touchstart",h),e.addEventListener("touchmove",c),e.addEventListener("touchcancel",c),e.addEventListener("touchend",p),e.addEventListener("click",t)},t.specialUnbind=function(e,t){e.removeEventListener("touchstart",h),e.removedEventListener("touchmove",c),e.removeEventListener("touchcancel",c),e.removeEventListener("touchend",p),e.removeEventListener("click",t)})};var o=!1;document.addEventListener("click",function(e){o&&(event.markFastClick||(event.stopPropagation(),event.preventDefault()));var t=e.target;if(t.href&&t.href.match(/#(\w+)/)){var n=RegExp.$1;if(n)var r=document.getElementById(n)}},!0),e.fastclick={activeClass:"ms-click-active",clickDuration:750,dragDistance:14,preventTime:2500,fireEvent:function(e,t,n){var r=document.createEvent("MouseEvents");r.initMouseEvent(t,!0,!0,window,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),r.markFastClick="司徒正美",e.dispatchEvent(r)},focus:function(e){if(this.canFocus(e)){var t=e.value;e.value=t;if(r&&e.setSelectionRange&&e.type.indexOf("date")!==0&&e.type!=="time"){var n=t.length;e.setSelectionRange(n,n)}else e.focus()}},canClick:function(e){switch(e.nodeName.toLowerCase()){case"textarea":case"select":case"input":return!e.disabled;default:return!0}},canFocus:function(e){switch(e.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!e.disabled&&!e.readOnly;default:return!1}},canFix:function(e){if(!f)return!1;var r=+(/Chrome\/([0-9]+)/.exec(t)||[0,0])[1];if(r&&n){var i=document.querySelector("meta[name=viewport]");if(i){if(i.content.indexOf("user-scalable=no")!==-1)return!1;if(r>31&&document.documentElement.scrollWidth<=window.outerWidth)return!1}}return e.style.msTouchAction==="none"?!1:!0}};var u=navigator.pointerEnabled,a=navigator.msPointerEnabled,f="ontouchstart"in window||a||u;f&&function(t){function y(e,n,r){var i=t.createEvent("Events");i.initEvent(n,!0,!0),i.fireByAvalon=!0,r&&(i.detail=r),e.dispatchEvent(i)}function b(e,t,n,r){return Math.abs(e-t)>=Math.abs(n-r)?e-t>0?"left":"right":n-r>0?"up":"down"}function w(){n.last&&(n.fire("hold"),n={})}function E(){clearTimeout(o)}function S(){clearTimeout(r),clearTimeout(i),clearTimeout(s),clearTimeout(o),n={}}function x(e,t){var n=[],r=Math.abs(e),i=Math.abs(t),s=Math.tan(m/180*Math.PI),o=r>i;if(r>0||i>0)n.push(o?e>0?"right":"left":t>0?"down":"up"),o&&i/r>s?n.push(t>0?"down":"up"):!o&&r/i>s&&n.push(e>0?"right":"left");return n}function T(e,t){return Math.sqrt(Math.pow(e,2)+Math.pow(t,2))}function N(e,t){var n=Math.atan2(t,e)/Math.PI*180;return n<0?n+360:n}function C(e,t){var n=Math.atan(t*-1/e)/Math.PI*180;return n<0?n+180:n}function L(e,t){var r=n.initialAngle-C(e,t);while(Math.abs(r-k)>90)k<0?r-=180:r+=180;return k=r,k}function A(e){return(e.pointerType==="touch"||e.pointerType===e.MSPOINTER_TYPE_TOUCH)&&e.isPrimary}function O(e,t){return e.type==="pointer"+t||e.type.toLowerCase()==="mspointer"+t}function M(e,t){var n=e.touches,t=n.length,r=n[0],i=n[1],s=r.clientX-i.clientX,o=r.clientY-i.clientY;return{distance:T(s,o),angel:C(s,o),rotation:t==2?L(s,o):0}}var n={},r,i,s,o,f,l,c,h,p=0,d=0,v=[],m=15,g=10,k=0;u?v=["pointerdown","pointermove","pointerup","pointercancel"]:a?v=["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerCancel"]:v=["touchstart","touchmove","touchend","touchcancel"],t.addEventListener(v[0],function(e){if((c=O(e,"down"))&&!A(e))return;l=c?e:e.touches[0],e.touches&&e.touches.length===1&&n.x2&&(n.x2=n.y2=void 0),f=Date.now(),h=f-(n.last||f);var t=l.target;n.el="tagName"in t?t:t.parentNode,clearTimeout(r),n.x1=l.pageX,n.y1=l.pageY,n.fire=function(e,t){y(this.el,e,t)};var i=e.touches;if(i.length>1){E(),n.status=i.length>2?"pinch":"other",e.preventDefault();var s=M(e,i.length);n.distance=s.distance,n.initialAngle=s.angel;return}h>0&&h<=250&&(n.isDoubleTap=!0),n.last=f,o=setTimeout(w,750)}),t.addEventListener(v[1],function(t){if((c=O(t,"move"))&&!A(t))return;l=c?t:t.touches[0],E(),n.x2=l.pageX,n.y2=l.pageY,p+=Math.abs(n.x1-n.x2),d+=Math.abs(n.y1-n.y2);if(t.touches.length>1&&n.status&&n.status.match(/other|pinch/g)){var r=M(t),i=n.distance-r.distance;if(n.status==="pinch"||Math.abs(i)>g)n.pinch=!0;if(n.pinch){var s=i>0?"in":"out",o=n.status!=="pinch"?["pinch","pinch"+s]:[i>0?"splay":"squeeze"];e.each(o,function(e,t){n.fire(t,{scale:r.distance/n.distance,direction:s})}),n.distance=r.distance}n.status==="other"&&Math.abs(r.rotation)>5&&(n.rotate=!0),n.rotate&&(s=r.rotation>0?"cw":"ccw",e.each(["rotate","rotate"+s],function(e,t){n.fire(t,{deflection:r.rotation,direction:s})}),n.rotation=r.rotation,n.initialAngle=r.angel)}}),t.addEventListener(v[2],function(e){if((c=O(e,"up"))&&!A(e))return;E();var t=n.status;t==="other"||t==="pinch"?n={}:n.x2&&Math.abs(n.x1-n.x2)>30||n.y2&&Math.abs(n.y1-n.y2)>30?s=setTimeout(function(){var e=b(n.x1,n.x2,n.y1,n.y2);n.fire("swipe",{direction:e}),n.fire("swipe"+e,{direction:e}),n={}},0):"last"in n?p<30&&d<30?i=setTimeout(function(){n.fire("tap"),n.isDoubleTap?(n.fire("doubletap"),n={}):r=setTimeout(function(){n.fire("singletap"),n={}},250)},0):n={}:n={},p=d=0}),v[3]&&t.addEventListener(v[3],S)}(document)}()});