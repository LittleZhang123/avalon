define(["../draggable/avalon.draggable","text!./avalon.slider.html","css!../chameleon/oniui-common.css","css!./avalon.slider.css","../avalon.getModel"],function(e,t){var n=[],r=0,i,s=t,o=e.ui.slider=function(t,i,o){function w(e){return e<l&&(e=l),e>c&&(e=c),parseFloat(((e-l)/(c-l)*100).toFixed(5))}function E(e){var t=(c-l)*e+l;return t=S(t),parseFloat(t.toFixed(3))}function S(e){var t=a.step>0?a.step:1,n=(e-l)%t,r=(e-l)/t;return e=l+(n*2>=t?t*Math.ceil(r):t*Math.floor(r)),e}function T(e,t,n){if(isFinite(n))var i=n;else{var s=f?"left":"top",o=t[s]+parseFloat(t.$element.css("border-top-width")),u=o/x.$pixelTotal;f||(u=Math.abs(1-u)),u>.999&&(u=1),u<.001&&(u=0),i=E(u)}if(d){if(r===0){var a=x.values[1];i>a&&(i=a)}else a=x.values[0],i<a&&(i=a);x.values[r]=i,x["percent"+r]=w(i),x.value=x.values.join(),x.percent=w(x.values[1]-x.values[0]+l)}else x.value=i,x.percent=w(i)}var u=e(t),a=i.sliderOptions,f=a.orientation==="horizontal",l=a.min,c=a.max,h=a.range,p=a.values,d=h===!0,v=Number(a.value);if(isNaN(v)){var m=e.getModel(a.value,o);m&&(v=m[1][m[0]])}a.template=a.getTemplate(s,a),h==="min"&&p?v=p[0]:h==="max"&&p&&(v=p[1]),!v&&h==="min"&&!p?v=l||v:!v&&h==="max"&&!p&&(v=c||v),a.step!==1&&!/\D/.test(a.step)&&(v=S(v)),d&&(Array.isArray(p)?p=p.length===1?[p[0],p[0]]:p.concat():p=[l,c]);var g=a.template.replace(/MS_OPTION_WIDTHORHEIGHT/g,f?"width":"height").replace(/MS_OPTION_LEFTORBOTTOM/g,f?"left":"bottom"),y=e.parseHTML(g).firstChild,b=[];t.parentNode.insertBefore(y,t.nextSibling),u.addClass("oni-helper-hidden-accessible");var x=e.define(i.sliderId,function(i){e.mix(i,a),i.$skipArray=["template","widgetElement","step","_dragEnd"],i.widgetElement=t,i.step=a.step>0?a.step:1,i.disabled=t.disabled,i.percent=d?w(p[1]-p[0]+l):w(v),i.percent0=d?w(p[0]):0,i.percent1=d?w(p[1]):0,i.value=d?p.join():v,i.values=p,i.$axis=f?"x":"y",i.$valueMin=l,i.$valueMax=c,i.$twohandlebars=d,i.$percent2Value=E,i.$pixelTotal=0,i._dragEnd=!1,i.dragstart=function(e,t){x.$pixelTotal=f?y.offsetWidth:y.offsetHeight,n=b,t.started=!x.disabled,t.dragX=t.dragY=!1,r=b.indexOf(t.element),t.$element.addClass("oni-state-active"),a.onDragStart.call(null,e,t)},i.dragend=function(e,t,n){t.$element.removeClass("oni-state-active"),a.onDragEnd.call(null,e,t),x._dragEnd=!1},i.drag=function(e,t,n){T(e,t,n),a.onDrag.call(null,x,t),x._dragEnd=!0},i.$init=function(){var n=y.getElementsByTagName("b");for(var r=0,i;i=n[r++];){i.sliderModel=x;if(!d&&e(i).hasClass("hander___flag")){b.push(i),e(i).removeClass("hander___flag");break}d&&!e(i).hasClass("hander___flag")&&b.push(i)}e(t).css({display:"none",height:0,width:0,padding:0}),e(y).css("width",x.width),e.scan(y,[x].concat(o)),typeof a.onInit=="function"&&a.onInit.call(t,x,a,o)},i.$remove=function(){y.innerHTML=y.textContent="",y.parentNode.removeChild(y)}});return x.$watch("value",function(e){e=S(Number(e)||0),!e||e<Number(x.min)?e=0:e>Number(x.max)&&(e=x.max),x.value=e,x.percent=w(e),x._dragEnd||a.onDragEnd.call(null,i)}),x};return o.defaults={max:100,min:0,width:-1,orientation:"horizontal",range:!1,step:1,value:0,values:null,disabled:!1,onDragStart:e.noop,onDrag:e.noop,onDragEnd:e.noop,getTemplate:function(e,t){return e}},e(document).bind("click",function(t){t.stopPropagation();var r=t.target,s=n.indexOf(r);s!==-1?(i&&i.removeClass("oni-state-focus"),i=e(r).addClass("oni-state-focus")):i&&(i.removeClass("oni-state-focus"),i=null)}),e(document).bind("keydown",function(e){if(i){var t=i[0].sliderModel,s=n.length==1?t.percent:t["percent"+r],o=t.$percent2Value(s/100),u;switch(e.which){case 34:case 39:case 38:u=Math.min(o+1,t.$valueMax);break;case 33:case 37:case 40:u=Math.max(o-1,t.$valueMin);break;case 36:u=t.$valueMin;break;case 35:u=t.$valueMax}isFinite(u)&&t.drag(e,{},u)}}),e});