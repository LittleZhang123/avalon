define(["./nscroll.js"],function(e){function i(e,t){return((e.hasAttributes()?avalon.slice(e.attributes):[]).filter(function(e){return!e.name.indexOf(t)})[0]||{}).name}function s(e,t,n){var r=document.createEvent("HTMLEvents");r.initEvent(t,!0,!0),avalon.mix(r,n),e.dispatchEvent(r)}function o(e,t){n.forEach(function(n){t.on(n,function(){s(e,n.toLowerCase())})})}var t={showLines:10,lineHeight:0,getData:avalon.noop},n=["beforeScrollStart","scrollCancel","scrollStart","scroll","scrollEnd","flick","zoomStart","zoomEnd"],r=100;avalon.bindingHandlers.iscroll=function(n,u){var a=n.element,f=n.value.match(/[^, ]+/g),l=u[0],c=avalon.mix({},t,l.iscroll,a.dataset,f&&f[1]?l[f[1]]:null),h=c.id||f&&f[0]!=="$"&&f[0]||"iscroll"+setTimeout("1"),p=a.children[0],d=a.children[0]&&a.children[0].children[0],v=p&&i(p,"ms-each"),m=d&&i(d,"ms-repeat"),g;l.scrolls=l.scrolls||{},a.removeAttribute("ms-iscroll");if(v||m){var y,b,w,E=[];v?(y=p.getAttribute(v),p.setAttribute(v,y+"$")):m&&(y=d.getAttribute(m),d.setAttribute(m,y+"$")),d&&d.setAttribute("ms-attr-data-index","$index"),b=y+"$",l.$watch(y,function(){var t=l[y],n=l[b],r=[],i;if(g){n.forEach(function(e){e.$unwatch()});for(i=0;i<c.showLines;i++)t.length>i?(n[i]?n.set(i,t[i].$model):n.push(t[i].$model),n[i].$watch("$all",function(e){return function(n,r){t[e][n]=r}}(i)),t[i].$watch("$all",function(e){return function(t,r){n[e][t]=r}}(i))):r.unshift(i);r.forEach(function(e){n.removeAt(e)}),E=a.children[0].children,g.resetTotal(0,t.size()),g.scrollTo(0,0,0)}else{n.pushArray(JSON.parse(JSON.stringify(l.$model[y].slice(0,c.showLines)))),E=a.children[0].children,c.lineHeight=c.lineHeight||E[0]&&E[0].offsetHeight;if(!c.lineHeight)throw"Can not know line height!";g=l.scrolls[h]=e(a,{builderNodes:!1,row:{height:c.lineHeight,num:c.showLines,total:t.size()},scrollOpt:c,dataFilter:function(e,r,i,o){var u=o%c.showLines;e==="add"?(g.appendNode(E[o%c.showLines],i,o),n.set(u,t[o].$model),n[u].$watch("$all",function(e,n){t[o][e]=n}),t[o].$watch("$all",function(e,t){n[u][e]=t}),t.size()-1==o&&(typeof c.getData=="function"?c.getData(t.length):typeof c.getData=="string"&&typeof l[c.getData]=="function"?l[c.getData](t.length):s(a,"getdata"))):(t[o].$unwatch(),n[u].$unwatch())}}),o(a,g.scroll)}}),l[y].$watch("length",function(e){w&&clearTimeout(w),w=setTimeout(function(){g?g.resetTotal(0,l[y].size(),0,1):l.$fire(y)},r)})}else g=l.scrolls[h]=new e.iScroll(a,c),o(a,g),l.$watch("$all",function(){w&&clearTimeout(w),w=setTimeout(function(){g&&g.refresh()},r)});l.$remove=function(){g&&(g.destroy(),g=null)},l.refreshScroll=function(){g&&g.refresh()}}});