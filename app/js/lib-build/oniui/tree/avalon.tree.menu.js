define(["./avalon.tree","css!tree/tree-menu.css"],function(){avalon.treeMenu={view:{showLine:!1,dblClickExpand:!1,singlePath:!0,showIcon:function(e){if(e.level<1)return!0},showSwitch:function(e){if(e.level>0)return!0}},callback:{beforeClick:function(e){var t=e.leaf,n=e.vm;e.e&&e.e.preventDefault();if(!t.isParent)return;n.expand(t,!1)}},getTemplate:function(e,t,n){return n==="nodes"?e.replace("<li",'<li ms-class="oni-leaf-selected:hasClassSelect(leaf)" '):n?e:e+'<a href="#" class="oni-menu-tree-swicth" ms-click="toggleMenuTree($event, widgetElement, $guid)" ms-class="oni-menu-tree-swicth-off:!toggle"></a>'},toggleMenuTree:function(e,t,n){e&&e.preventDefault&&e.preventDefault();var r=avalon(t);r.hasClass("oni-menu-tree-hidden")?(r.removeClass("oni-menu-tree-hidden"),r.removeClass("oni-state-hover")):r.addClass("oni-menu-tree-hidden")},onInit:function(e){var t=avalon(this);t.bind("mouseenter",function(e){t.hasClass("oni-menu-tree-hidden")&&t.addClass("oni-state-hover")}),t.bind("mouseleave",function(e){t.removeClass("oni-state-hover")})}}});