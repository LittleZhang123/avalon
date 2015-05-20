define(["../avalon.getModel","text!./avalon.accordion.html","css!../chameleon/oniui-common.css","css!./avalon.accordion.css"],function(e,t){var n=t,r=n.split("MS_OPTION_MODE_CARET"),i=r[1],s=r[0],o=0,u=e.ui.accordion=function(t,n,r){function b(t,n){var r=y.getHeader(n),i=e(r),s=y.getPanel(n),o=y.data[n],a=!o.toggle;if(n===y.currentIndex&&t.type==="mouseenter")return;if(u.onBeforeSwitch.call(t.target,n,r,s)===!1)return!1;y.data[n].toggle=a,a&&(y.currentIndex=n),u.onSwitch.call(t.target,n,r,s)}function w(e,t){function r(){n+=10;if(n>t)return n=t,e.style.width=n+"px",clearTimeout(g),!1;e.style.width=n+"px",g=setTimeout(r,10)}var n=0;r()}var u=n.accordionOptions,a=r.length,f=n.value.split(",")[2],l=Object.keys(t.msData),c=[],h=[],p="",d="ms-css-width='headerWidth' ms-css-height='headerAndContentHeight'",v="ms-css-bottom='-headerWidth' ms-css-width='headerAndContentHeight' ms-css-height='headerWidth'",m="ms-css-width='contentWidth' ms-css-height='headerAndContentHeight'",g=0;o+=1,a>1&&e.mix(u,r[a-1][f]),s=u.direction==="vertical"?s.replace("MS_OPTION_HORIZONTAL_HEADER_WIDTH_HEIGHT","").replace(/MS_OPTION_HORIZONTAL_CONTENT_WIDTH_HEIGHT/g,""):s.replace("MS_OPTION_HORIZONTAL_HEADER_WIDTH_HEIGHT",d).replace(/MS_OPTION_HORIZONTAL_CONTENT_WIDTH_HEIGHT/g,m),u.direction==="vertical"?p=u.mode=="caret"?i:s:(u.mode="nav",u.multiple=!1,p=s.replace("MS_OPTION_HORIZONTAL_TITLE",v)),u.template=u.getTemplate(p,u),l.forEach(function(n){if(n.indexOf("ms-each")===0)return c=t.msData[n],h=e.getModel(c,r),c=h[1][h[0]],t.removeAttribute(n),!1}),u.data=u.data.length?u.data:c.$model||c,e.each(u.data,function(e,t){var n=t.toggle;t.toggle=n!==void 0?n:!1});var y=e.define(n.accordionId,function(n){e.mix(n,u),n.$skipArray=["widgetElement","rendered","autoRun","template","accordionClass","currentTrigge","initIndex","multiple","trigger","triggerType","accordionVmodel"],n.widgetElement=t,n.$headers=[],n.$panels=[],n.$triggers=[],n.rendered=!1,n._renderView=function(n){var i=u.template,s="",a="oni-accordion oni-accordion-mode-"+u.mode+" js-accordion"+o+" "+u.accordionClass,f,l,c,h,p=u.initIndex;e(t).addClass(a),t.setAttribute("ms-css-width","width"),i=i.replace(/MS_OPTION_ACTIVECLASS/g,u.currentTriggerClass),t.innerHTML=i,h=t.children[0],s=h.children,f=s[0],l=s[1];if(!!u.trigger){var d=f.children;for(var v=0,m;m=d[v++];)if(e(m).hasClass(u.trigger)){c=m;break}}u.trigger&&c?c.setAttribute("ms-on-"+u.triggerType,u.triggerType+"Callback($event,$index)"):(f.setAttribute("ms-on-"+u.triggerType,u.triggerType+"Callback($event,$index)"),e(f).css("cursor","pointer")),p!==null&&(y.currentIndex=p,y.data[p].toggle=!0),n?n():(e.log("avalon请尽快升到1.3.7+"),e.scan(t,[y].concat(r)),typeof u.onInit=="function"&&u.onInit.call(t,y,u,r)),y.rendered=!0,setTimeout(function(){for(var t=0,n;n=s[t++];){var r=e(n);if(r.hasClass("oni-accordion-header")){y.$headers.push(n);if(!u.trigger)y.$triggers.push(n);else{var i=n.children;for(var o=0,a;a=i[o++];)if(e(a).hasClass(u.trigger)){y.$triggers.push(a);break}}}else r.hasClass("oni-accordion-content")&&y.$panels.push(n)}},400)},n.$init=function(r){if(!y.data.length){var i=[],s,o=null;while(s=t.firstChild){if(s.nodeType!==1){t.removeChild(s);continue}o=s.nextSibling;while(o.nodeType!==1)t.removeChild(o),o=s.nextSibling;e(s).hasClass("title")&&i.push({title:s.innerHTML.trim(),content:o.innerHTML.trim(),toggle:!1}),t.removeChild(s),t.removeChild(o)}y.data=i}t.$vmodel=y,u.autoRun&&n._renderView(r)},n.clickCallback=function(e,t){y._eventCallback(e,t)},n.mouseenterCallback=function(e,t){y._eventCallback(e,t)},n.$remove=function(){t.innerHTML=t.textContent=""},n.setData=function(t){e.each(t,function(e,t){t.toggle=t.toggle!==void 0?t.toggle:!1}),y.data=t,y.currentIndex=-1,y._renderView()},n.refresh=function(e){e?y.setData(e):y.rendered||n._renderView()},n.getCurrentHeader=function(){return u.multiple?null:y.$headers[this.currentIndex]},n.getCurrentPanel=function(){return u.multiple?null:y.$panels[this.currentIndex]},n.getHeader=function(e){return y.$headers[e]},n.getPanel=function(e){return y.$panels[e]},n.getLength=function(){return u.data.length},n.getStatus=function(t){return e(y.$panels[t]).css("display")==="none"?0:1},n.switchTo=function(e){var t={target:y.$triggers[e]};if(u.onBeforeSwitch.call(t.target,e,n.getHeader(e),n.getPanel(e))===!1)return!1;y.currentIndex=e,y.data[e].toggle=!0},n._eventCallback=b});return y.$watch("currentIndex",function(e,t){var n=y.getPanel(e);y.direction=="horizontal"&&n&&(clearTimeout(g),w(n,Number(y.contentWidth)||400)),!y.multiple&&t!==-1&&(y.data[t].toggle=!1)}),y};return u.version=1,u.defaults={width:"100%",headerWidth:30,contentWidth:400,headerAndContentHeight:200,autoRun:!0,template:"",accordionClass:"",currentTriggerClass:"oni-state-active",data:[],initIndex:null,mode:"caret",multiple:!1,widgetElement:"",trigger:"oni-accordion-header",triggerType:"click",currentIndex:-1,direction:"vertical",onBeforeSwitch:e.noop,onSwitch:e.noop,onInit:e.noop,getTemplate:function(e,t){return e}},e});