define(["avalon","./avalon.tree","text!./avalon.tree.edit.html"],function(e,t,n){function r(e){return document.getElementById(e)}function i(e){return function(t){var n=t.vm.callback[e],r=t.e?t.e.srcElement||t.e.target:void 0;n&&n.call(r,t)}}e.ui.tree.AddExtention(["edit"],{edit:{enable:!0,showAddBtn:!0,showRemoveBtn:!0,showRenameBtn:!0,editNameSelectAll:!0,removeTitle:"remove",renameTitle:"rename",addTitle:"add"},data:{keep:{leaf:!1,parent:!1}},callback:{beforeRemove:!1,beforeRename:!1,beforeNodeCreated:!1,onRemove:e.noop,onRename:e.noop,onNodeCreated:e.noop,beforeEdit:i("beforeRename"),onBlur:i("onRename")}},function(t,n){function i(e){t.data.keep.parent||(e.isParent=!!e.children.length)}var s;e.mix(t,{editDblclick:function(e){e.stopPropagation()},editName:function(n){var i=n.e,o=n.leaf;i.preventDefault&&i.preventDefault(),s=o,e(this.parentNode).hasClass("curSelectedNode")&&i.stopPropagation(),e(r(o.$id)).addClass("edit-focus"),e(r("c"+o.$id)).addClass("par-edit-focus");var u=r("input"+o.$id);t.view.editNameSelectAll&&u.select(),u.focus()},cancelEditName:function(e){s&&e!==void 0&&(s.name=e)},saveChange:function(n){var i=n.leaf;this.value!=i.name?t.cancelEditName(this.value):n.preventDefault(),s=null,e(r(i.$id)).removeClass("edit-focus"),e(r("c"+i.$id)).removeClass("par-edit-focus")},addFun:function(n){var r=n.e,i=n.leaf;return r.preventDefault(),r.stopPropagation(),t.addNodes(i,e.mix({name:"未命名节点"},n.newLeaf||{}))},removeFun:function(e){var n=e.e,r=e.leaf;n.preventDefault(),n.stopPropagation(),t.removeCacheById(r.$id);var s=r.$parentLeaf||t;s.children.remove(r),r.$parentLeaf&&i(r.$parentLeaf)},removeNode:function(e,n){t.excute("remove",{cancelCallback:!n},e,"removeFun")},removeChildNodes:function(e){var n=t.getNodes(e);n&&n.clear&&n.clear()}})},["remove","rename","add"],{edit_binding:' ms-hover="oni-state-hover" ',edit_html:n},function(e,t){e.$watch("e:beforeNodeCreated",function(t){var n=t.leaf;e.data.keep.leaf&&!n.isParent&&t.preventDefault()})})});