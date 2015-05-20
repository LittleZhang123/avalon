define(["avalon","text!./avalon.menu.html","css!./avalon.menu.css","css!../chameleon/oniui-common.css"],function(avalon,template){function getCnt(){return counter++}function buildData(e,t,n){var r=[],i,s=0,n=n||0;while(i=e[0]){var o=i.getElementsByTagName&&(i.getElementsByTagName("ul")[0]||i.getElementsByTagName("ol")[0]),u={};o?(u.data=buildData(o.children,t,n+1),i.removeChild(o)):u.data="";var a=i.innerHTML,f=avalon(i).data();if(a&&a.trim()||o)u.title=a||"",u.disabled=f&&f.disabled,u.active=f&&f.active||s===t.active,u.active&&(t.active=s),r.push(u),s++;i.parentNode.removeChild(i)}return r}function formateData(e){avalon.each(e,function(e,t){if(!t||t.$id)return;var n=avalon.mix({disabled:!1,title:"",data:"",active:!1},t);avalon.mix(t,n),Array.isArray(t.data)&&formateData(t.data)})}function bindClick(e){for(var t in widgetInit)widgetInit[t]&&widgetInit[t](e)}function hasSubMenu(e){return e.getElementsByTagName("ol")[0]||e.getElementsByTagName("ul")[0]}var counter=0,widgetInit,widget=avalon.ui.menu=function(element,data,vmodels){var options=data.menuOptions;options.event=options.event==="mouseover"?"mouseenter":options.event,options.template=options.getTemplate(template,options).replace(/\{\{MS_OPTION_EVENT\}\}/,options.event).replace(/\{\{\MS_OPTION_CNT}\}/g,counter),options.data==void 0?options.data=buildData(element.children,options):formateData(options.data);var uid=+(new Date),vmodel=avalon.define(data.menuId,function(vm){avalon.mix(vm,options),vm.widgetElement=element,vm._oldActive=options.active,vm._subMenus={},vm.$skipArray=["widgetElement","template","_subMenus","_oldActive"];var inited,outVmodel=vmodels&&vmodels[1],clickKey="fromMenu"+uid;vm.$init=function(e){if(inited)return;inited=!0,outVmodel&&outVmodel._depth!=void 0&&(vmodel._depth=outVmodel._depth+1),element.innerHTML=vmodel.template,vmodel._depth===1&&(element.setAttribute("ms-hover-100","oni-helper-max-index"),avalon(element).addClass("oni-menu oni-helper-clearfix oni-helper-reset"+(vmodel.dir==="v"?" oni-menu-vertical":""))),e?e():(avalon.log("avalon请尽快升到1.3.7+"),avalon.scan(element,[vmodel].concat(vmodels)),typeof options.onInit=="function"&&options.onInit.call(element,vmodel,options,vmodels)),vmodel.event==="mouseenter"&&avalon(element).bind("mouseleave",function(e){vmodel._restMenu(vmodel)}),vmodel.event==="click"&&(widgetInit||(widgetInit={},avalon(document).bind("click",bindClick)),widgetInit[clickKey]=function(e){vmodel._restMenu(vmodel)}),vmodel._depth===1&&avalon(element).bind("click",function(e){e&&e.stopPropagation()})},vm.$remove=function(){delete widgetInit[clickKey],element.innerHTML=element.textContent=""},vm._canActive=function(e,t){return vmodel.active===t&&!e.disabled},vm.activate=function(e,index){var _index=index===void 0?e:index;if(!vmodel.data[_index]||vmodel.data[_index].disabled===!0||vmodel.disabled)return;vmodel._oldActive=vmodel.active,_index!==vmodel._oldActive&&vmodel.resetSubMenus(),vmodel.active=_index;if(e&&index!==void 0&&vmodel.event==="click"){var activeData=vmodel.getActiveList(),last=activeData[activeData.length-1],node=hasSubMenu(this);if(node&&last&&last[1]===eval(this.getAttribute("data-index"))&&vmodel._oldActive!==vmodel.active){e&&e.preventDefault(),e&&e.stopPropagation();return}vmodel._onSelect.call(this,e,activeData)}},vm._onSelect=function(e,t){if(vmodel._depth===1){var n=e.srcElement||e.target;while(n&&n.tagName.toLowerCase()!=="li")n=n.parentNode;var r=avalon(n),i=r.data(),s=!!hasSubMenu(n);realSelect=t.slice(0,i.depth),options.onSelect.call(n,vmodel,realSelect,s),vmodel._restMenu(vmodel)}},vm._ifEventIsMouseEnter=function(e,t){if(vmodel.event==="click"||vmodel._depth!==1)return;vmodel._onSelect(e,vmodel.getActiveList())},vm._clickActive=function(e,t){if(vmodel.active!==t)return;var n=avalon(this),r=n.data();vmodel._onClickActive.call(this,e,vmodel.active,vmodel.data,r&&r.sub)},vm._getNodeByData=function(e){if(e.length>0){var t=vmodel._subMenus[e[0]];if(t)return t._getNodeByData(e.slice(1));var n=vmodel.widgetElement.children,r=0,i=0;while(n[++r]){var s=n[r-1];if(s.tagName.toLowerCase()==="li"){if(i==vmodel.active)return s;i++}}}return!1},vm.getActiveList=function(e){var t=e||[];if(vmodel.active!==!1&&vmodel.data[vmodel.active]){t.push([vmodel.data[vmodel.active].$model,vmodel.active]);var n=vmodel._subMenus[vmodel.active];n&&n.getActiveList(t)}return t},vm.setActiveList=function(arr){if(!arr)return;if(!Array.isArray(arr))var arr=[arr].join("").split(",");if(!arr.length)return;vmodel.activate(eval(arr[0]));if(vmodel.active===!1){vmodel.resetSubMenus();return}if(!arr.length)return;var sub=vmodel._subMenus[vmodel.active];sub&&sub.setActiveList(arr.slice(1))},vm._hasSubMenu=function(e){return!!(e&&e.data&&Array.isArray(e.data)&&e.data.length)},vm._rescan=function(){vmodel._subMenus={};var e=vmodel.widgetElement.children,t=0;for(var n=0,r=e.length;n<r;n++){var i=e[n];if(i.nodeType===1&&i.tagName.toLowerCase()==="li"){var s=i.getElementsByTagName("ul")[0]||i.getElementsByTagName("ol")[0];if(s){var o=avalon(s),u=o.data();if(u.widget==="menu"){var a=avalon.mix({},options),f=data.menuId+"r"+getCnt();s.setAttribute("ms-widget","menu, $"+uid+n);var l=vmodel.data[u.widgetIndex],c={};l&&(c=avalon.mix(a,{data:l.$model.data})),c.index=u.widgetIndex;var h=avalon.define(f,function(e){e.menu=c,e.$skipArray=["menu"]});avalon.scan(s,[h,vmodel].concat(vmodels)),vmodel._subMenus[t]=avalon.vmodels["$"+uid+n]}}t++}}},vm.resetSubMenus=function(){avalon.each(vmodel._subMenus,function(e,t){vmodel._restMenu(t),t.resetSubMenus()})},vm._restMenu=function(e){e.menuResetter(e),e._oldActive=e.active},vm._cutCounter=avalon.noop,vm._canRemove=avalon.noop});return vmodel};widget.defaults={active:!1,event:"mouseenter",disabled:!1,_depth:1,index:0,dir:"h",onInit:avalon.noop,menuResetter:function(e){e.active=!1},getTemplate:function(e,t,n){return e},_menuTitle:function(e,t,n,r){return e},onSelect:avalon.noop,cutEnd:"",$author:"skipper@123"}});