define(["avalon","text!./avalon.smartgrid.html","../loading/avalon.loading","../pager/avalon.pager","../dropdown/avalon.dropdown","css!../chameleon/oniui-common.css","css!./avalon.smartgrid.css"],function(e,t){function h(){return"smartgridTr"+c++}function v(e,t){var n=e.container;if(n){typeof n=="string"&&(n=document.getElementById(n));if(!n.nodeType||n.nodeType!=1||!document.body.contains(n))n=null}n=n||t,e.container=n}function m(t){if(!t.selectable)return;var n=t.selectable.type,r=t._container;(n==="Checkbox"||n==="Radio")&&e.bind(r,"click",function(n){var r=n.target,i=e(r),s=e(r.parentNode.parentNode),o=t.data,u=t.onSelectAll,a=t._enabledData,f=t._disabledData,l=i.attr("data-index"),c=t._filterCheckboxData;if(!i.attr("data-role")||l===null)return;if(i.attr("data-role")==="selected"){var h=o[l],p=r.checked;p?(t.selectable.type==="Checkbox"?s.addClass("oni-smartgrid-selected"):0,t.selectable.type==="Radio"&&a.splice(0,a.length),h.selected=!0,e.Array.ensure(a,h)):(s.removeClass("oni-smartgrid-selected"),h.selected=!1,e.Array.remove(a,h)),e.type(t.onRowSelect)==="function"&&t.onRowSelect.call(s[0],h,p)}a.length==o.length-f.length-c.length?t._allSelected=!0:t._allSelected=!1})}function g(e){var t=e.data,n=e._enabledData=[],r=e._disabledData=[],i=e._filterCheckboxData=[];for(var s=0,o=t.length,u;s<o;s++){u=t[s];if(u.disable){r.push(u);continue}if(u.checkboxShow==0){i.push(u);continue}n.push(u)}e._allEnabledData=n}function y(e){var t=e.data,n=e._enabledData=[];for(var r=0,i=t.length;r<i;r++){var s=t[r],o=s.selected;o&&!s.disable&&n.push(s)}}function b(e,t){for(var n=0,r=e.length;n<r;n++){var i=e[n],s=i.type;s=s===void 0?"String":s;if(i.toggle&&s==="String")return i}return t.selectable&&t.selectable.type?e[1]:e[0]}function w(e){var t=0;for(var n=0,r=e.length;n<r;n++){var i=e[n];i.toggle&&(t+=parseInt(i.configWidth)||0)}return t}function E(e){var t=!0,n=e.length,r=0;if(!n){t=!1;return}for(var i=0;i<n;i++){var s=e[i];s.selected===void 0&&(s.selected=!1),s.checkboxShow!==!1&&!s.selected&&!s.disable&&(t=!1),s.checkboxShow===!1&&r++}return r===n&&(t=!1),t}function S(t,n){var r=t.columns,i={},s=e(n.parentNode).width(),o=0,u=0,a={};for(var f=0,l=r.length;f<l;f++){var c=r[f],h=c.format,p="",d=c.width,v=~~d;c.align=c.align||"center";if(c.toggle===void 0||c.isLock)c.toggle=!0;c.configWidth=v,v||(d.indexOf("%")?(v=s*parseInt(d)/100,c.configWidth=v):v="auto"),c.width=c._fixWidth=v,o+=~~v,~~v>u?(u=v)&&(a=c):0,c.customClass=c.customClass||"",c.sortable&&(c.sortTrend="ndb"),h&&!t.htmlHelper[h]&&(t.htmlHelper[h]=function(t,n,r,i,s){return e.log("方法"+h+"未定义"),i}),p=t.htmlHelper[h],p||(p=function(e,t,n,r,i){return r}),c.format=p}if(t.selectable){var m=t.selectable.type,g,y=!0;if(m==="Checkbox"||m==="Radio")g=function(e,t,n,r,i,s,o){if(o&&m==="Radio")return;return i.checkboxShow===!1?"":"<input type='"+m.toLowerCase()+"'"+" ms-attr-disabled='_getAllCheckboxDisabledStatus("+(o?!0:!1)+", _dataRender)' "+(r?"checked='checked'":"")+" name='selected' "+(o?" ms-click='_selectAll' ms-duplex-checked='_allSelected'":" data-index='"+n+"'")+" data-role='selected'/>"},y=E(t.data)||!1,t._allSelected=y;i={key:"selected",name:g(t.$id,"selected",-1,y,[],null,!0),width:25,configWidth:25,sortable:!1,type:t.selectable.type,format:g,toggle:!0,align:"center",customClass:""},o+=25,i.width=i._fixWidth=25,r.unshift(i)}if(o>s)if(~~a.width)a.width="auto";else for(f=0;f<l;f++){c=r[f];if(~~c.width){c.width="auto";break}}t.columns=r}var n=new Date-0,r=t.split("MS_OPTION_EJS"),i=r[0],s=(window.navigator.userAgent||"").toLowerCase(),o=s.indexOf("msie 6")!==-1||s.indexOf("msie 7")!==-1,u=/^function\s+\w*\s*\([^)]*\)\s*{\s*}$/m,a=!1,f={};t=r[1];var l=e.ejs=function(t,n,r){var i,s;if(!l.cache[t]){r=r||{};var o=r.doc||document;n=n||{},$.fn?i=$(t,o)[0]:o.querySelectorAll?i=o.querySelectorAll(t)[0]:i=o.getElementById(t.slice(1));if(!i)throw"can not find the target element";s=i.innerHTML,/script|textarea/i.test(i.tagName)||(s=e.filters.unescape(s));var u=l.compile(s,r);ejs.cache[t]=u}return ejs.cache[t](n)};l.compile=function(t,n){n=n||{};var r=n.tid;if(typeof r=="string"&&typeof l.cache[r]=="function")return l.cache[r];var i=n.open||"<&",s=n.close||"&>",o=[],u=[];for(var a in n)n.hasOwnProperty(a)&&typeof n[a]=="function"&&(o.push(a),u.push(n[a]));var f=!0,c=[],h=new Date*1,p=" ;r += txt"+h+"[",d="];",v="return function(data){'use strict'; try{var r = '',line"+h+" = 0;",m=/(^|[^\w\u00c0-\uFFFF_])(@)(?=\w)/g,g=/(['"])(?:\\[\s\S]|[^\ \\r\n])*?\1/g,y=/(^-|-$)/g,b=/mass/,w=[],E=0,S,x,T;for(var N=0,C=t.length;N<C;){S=t.indexOf(f?i:s,N);if(S<E){if(!f)throw Error("发生错误了");v+=p+c.length+d,x=t.slice(E+s.length),T&&(x=x.trim(),T=!1),c.push(x);break}x=t.slice(N,S),E=S;if(f)v+=p+c.length+d,T&&(x=x.trim(),T=!1),c.push(x),N=S+i.length;else{w.push(x),v+=";line"+h+"="+w.length+";";switch(x.charAt(0)){case"=":x=x.replace(y,function(){return T=!0,""}),x=x.replace(m,"$1data.");if(x.indexOf("|")>1){var k=[],L=x.replace(g,function(e){return k.push(e),"mass"}).replace(/\|\|/g,"@");if(L.indexOf("|")>1){var A=L.split("|"),O=A.shift().replace(/\@/g,"||").replace(b,function(){return k.shift()});for(var M;M=k.shift();)A=M.split(":"),a=A[0],P="",A[1]&&(P=", "+A[1].replace(b,function(){return k.shift()})),O="avalon.filters."+a+"("+O+P+")";x="="+O}}v+=" ;r +"+x+";";break;case"#":break;case"-":default:x=x.replace(y,function(){return T=!0,""}),v+=x.replace(m,"$1data.")}N=S+s.length}f=!f}v+=" return r; }catch(e){ avalon.log(e);\navalon.log(js"+h+"[line"+h+"-1]) }}";var _=["txt"+h,"js"+h,"filters"],D=Function.apply(Function,_.concat(o,v)),P=[c,w,e.filters],H=D.apply(this,P.concat(u));return typeof r=="string"?l.cache[r]=H:H},l.cache={},e.filters.unescape=function(e){return e.replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")};var c=0,p=0,d=e.ui.smartgrid=function(r,s,c){var p=s.smartgridOptions,d=e(r),x=p.pager,T=s.smartgridId,N=!0;S(p,r),v(p,r),p._position=o?"absolute":"fixed",p.loading.onInit=function(e,t,n){k.loadingVModel=e},p.$pagerConfig={canChangePageSize:!0,options:[10,20,50,100],onInit:function(e,t,n){k&&(k.pager=e)}},p.pageable=p.pageable!==void 0?p.pageable:!0;if(e.type(x)==="object"){x.prevText=x.prevText||"上一页",x.nextText=x.nextText||"下一页",p.pageable&&(x.getTemplate=typeof x.getTemplate=="function"?x.getTemplate:function(e,t){var n="";return Array.isArray(x.options)&&t.canChangePageSize?n='<div class="oni-smartgrid-pager-options"><div class="oni-smartgrid-showinfo">每页显示</div><select ms-widget="dropdown" data-dropdown-list-width="50" data-dropdown-width="50" ms-duplex="perPages"><option ms-repeat="options" ms-value="el.value" ms-attr-label="el.value">{{el.text}}</option></select><div class="oni-smartgrid-showinfo">条, {{totalItems}}条结果</div></div>':n='<div class="oni-smartgrid-pager-options">{{totalItems}}条结果</div>',e+n});if(x.onInit&&typeof x.onInit=="function"){var C=x.onInit;x.onInit=function(e,t,n){k&&(k.pager=e),C(e,t,n)}}e.mix(p.$pagerConfig,p.pager)}else p.pager={};p.pager=null,p.template=p.getTemplate(t,p),p.$skipArray=["_allEnabledData","template","widgetElement","container","_container","_position","htmlHelper","selectable","loadingVModel","loading","pageable","noResult","sortable","pager","data","containerMinWidth","_disabledData","_enabledData","_filterCheckboxData"].concat(p.$skipArray);var k=e.define(T,function(t){e.mix(t,p),t.widgetElement=r,t._headerTop=0+p.affixHeight,t._container=null,t._fixHeaderToggle=!1,t._gridWidth=0,t._pagerShow=!1,t._allEnabledData=[],t._disabledData=[],t._enabledData=[],t._filterCheckboxData=[],t.loadingVModel=null,t._dataRender=!1,t._hiddenAffixHeader=function(e,t){var n=k.selectable;return n&&n.type&&e.key=="selected"&&!t},t.getRawData=function(){return k.data},t.getSelected=function(){var e=k._disabledData,t=[];return e.forEach(function(e,n){e.selected&&t.push(e)}),t.concat(k._enabledData)},t.selectAll=function(e){e=e!==void 0?e:!0,k._selectAll(null,e)},t.isSelectAll=function(){return k._allSelected},t.sortColumn=function(t,n,r){var i=r.target,s=e(i),o="",f=t.key,l=0,c=k.onColumnSort;if(!k.data.length)return;s.hasClass("oni-helper-sort-top")?o="asc":o="desc",a=!0,o=="asc"?l=1:l=-1,t.sortTrend=o,k.sortable.remoteSort&&typeof k.remoteSort=="function"&&!u.test(k.remoteSort)?k.remoteSort(f,o,k):typeof t.localSort=="function"&&!u.test(t.localSort)?(k.data.sort(function(e,n){return l*t.localSort(e,n,f,k.$model)||0}),k.render(),e.type(c)==="function"&&c.call(k,o,f)):(t.type==="Number"?k.data.sort(function(e,t){return l*(e[f]-t[f])||0}):k.data.sort(function(e,t){return l*e[f].localeCompare(t[f])}),k.render(),e.type(c)==="function"&&c.call(k,o,f))},t.setColumns=function(e,t){var n=k.columns;e=[].concat(e),t=t!==void 0?t:!0;for(var r=0,i=n.length;r<i;r++){var s=n[r],o=s.$model.key,u=e.indexOf(o);u!=-1&&!s.isLock&&(s.toggle=t)}},t.showNoResult=function(e){k.noResult=e||k.noResult,k.data=[],k.render()},t.showLoading=function(){k.loadingVModel.toggle=!0},t.hideLoading=function(){k.loadingVModel.toggle=!1},t._selectAll=function(t,n){var r=k.data,i=k._container.getElementsByTagName("tr"),s=k.onSelectAll;setTimeout(function(){var o=t?t.target.checked:n,u=r.concat();k._allSelected=o;for(var a=0,f=i.length;a<f;a++){var l=i[a],c=e(l),h,p=l.cells[0].getElementsByTagName("input")[0],d=p&&e(p).attr("data-index");if(d===null||d===void 0)continue;h=r[d],h.disable||(h.selected=o,p.checked=o,c[o?"addClass":"removeClass"]("oni-smartgrid-selected"))}o?k._enabledData=k._allEnabledData:k._enabledData=[],e.type(s)==="function"&&s.call(k,r,o)},100)},t._toggleColumn=function(e,t){if(!k._container)return e;var n=k._container.getElementsByTagName("tr"),r=null;for(var i=0,s,o=n.length;i<o;i++)s=n[i],r=s.cells[t],r&&(e?s.cells[t].style.display="table-cell":s.cells[t].style.display="none");return setTimeout(function(){k._setColumnWidth()},100),e},t._setColumnWidth=function(t){var n=k._container.getElementsByTagName("tr")[0].cells,r=k.columns,i=r.$model,s=e(k.container),o=s.width(),u=w(i),a=b(r,k);u>o&&!t?(s.css("width",u),a.width=a.configWidth):(s.css("width","auto"),a.width="auto");for(var f=0,l=n.length;f<l;f++){var c=e(n[f]),h=c.width(),p=r[f];p._fixWidth=h}k._gridWidth=o},t._getTemplate=function(t,r){var i,s,o="smartgrid_tmp_"+n,u=t||k.data,f=k.columns,c=f.$model,h=k.selectable&&k.selectable.type||"",d=[];e.each(u,function(e,t){t.$id&&t.$id!="remove"&&d.push(t)});var v=d.length;checkRow=h==="Checkbox",l[o]?i=l[o]:(i=l.compile(p.template,k.htmlHelper),l[o]=i);for(var m=0,g=c.length;m<g;m++){var y=c[m],b=y.key;a||f[m].sortTrend&&(f[m].sortTrend="ndb");for(var w=0;w<v;w++){var E=d[w];E[b]=E[b]!==void 0?E[b]:y.defaultValue}}return s=i({data:d,columns:f,len:2,noResult:k.noResult,vmId:T,startIndex:r||0,checkRow:checkRow}),s},t._getAllCheckboxDisabledStatus=function(e){var t=k._filterCheckboxData.length,n=k._disabledData.length,r=t+n;return e?r===k.data.length?!0:!1:!1},t.addRows=function(t,n){if((!t||!t.length)&&!n)return;var r="",i,s=k.container,o=s.getElementsByTagName("tbody")[0]||s.getElementsByTagName("table")[0],u=k.selectable,f=k.getLen(k.data),l=k.data.length;if(!o)return;(f===0||n)&&e.clearHTML(o),k._pagerShow=f?!0:!1;if(t){var p=[];e.each(t,function(t,n){p.push(e.mix({},n)),p[t].$id=h()}),k.data.push.apply(k.data,p)}e.each(k.data,function(e,t){t.$id=t.$id||h()}),r=k.addRow(k._getTemplate(t?k.data.slice(l):t,t?l:0),k.columns.$model,c),i=e.parseHTML(r),o.appendChild(i);if(u&&(u.type==="Checkbox"||u.type==="Radio")){var d=E(k.data);k._allSelected=d,y(k)}k.showLoading(k.data),e.nextTick(function(){e.scan(k.container,[k].concat(c)),k._setColumnWidth(),k.hideLoading()}),a&&(a=!1)},t.getLen=function(e){var t=0;for(var n=0,r=e.length;n<r;n++)e[n]&&e[n].$id!="remove"&&t++;return t},t.removeRow=function(e,t){var n=k.data[e];if(!n)return;var r=n.$id,i=document.getElementById(r);i&&i.parentNode.removeChild(i),t===!1?n.$id="remove":k.data.splice(e,1),k.getLen(k.data)||k.render(void 0,!0)},t.render=function(t,n){e.type(t)==="array"?k.data=t:n=t,n=n===void 0||n?!0:!1,N?N=!1:(g(k),k._dataRender=!k._dataRender),k.addRows(void 0,n),a?a=!1:n||k.container.scrollIntoView()},t.$init=function(){var t=k.container,n="";n=i.replace("MS_OPTION_ID",k.$id),t.innerHTML=n,g(k),e.scan(t,k),e.nextTick(function(){k._container=t.getElementsByTagName("tbody")[0],k.render(!0),m(k)}),k.isAffix&&(f.scrollCallback=e(window).bind("scroll",function(){var t=Math.max(document.body.scrollTop,document.documentElement.scrollTop),n=d.offset().top,i=e(r.getElementsByTagName("thead")[0]).css("height"),s=t-n+k.affixHeight,o=e(window).height(),u=d.outerHeight(),a=k._position;u>o&&t>n+i&&n+u>t?(a==="absolute"&&(k._headerTop=Math.floor(s)),k.$model._fixHeaderToggle||(k._fixHeaderToggle=!0)):(a==="absolute"&&(k._headerTop=0),k.$model._fixHeaderToggle&&(k._fixHeaderToggle=!1))})),r.resizeTimeoutId=0,f.resizeCallback=e(window).bind("resize",function(){clearTimeout(r.resizeTimeoutId);var t=e(window).width();t<=k.containerMinWidth&&(r.style.width=k.containerMinWidth+"px"),r.resizeTimeoutId=setTimeout(function(){k._setColumnWidth(!0)},150)}),typeof p.onInit=="function"&&p.onInit.call(r,k,p,c)},t.$remove=function(){var t=k.container;t.innerHTML=t.textContent="",e(window).unbind("resize",f.resizeCallback).unbind("scroll",f.scrollCallback)}});return k};return d.defaults={container:"",data:[],columns:[],allChecked:!0,htmlHelper:{},noResult:"暂时没有数据",remoteSort:e.noop,isAffix:!1,affixHeight:0,containerMinWidth:600,selectable:!1,loading:{toggle:!1,modal:!0,modalBackground:"#000"},sortable:{remoteSort:!0},addRow:function(e,t,n){return e},getTemplate:function(e,t){return e}},e});