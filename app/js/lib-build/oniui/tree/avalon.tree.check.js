define(["avalon","./avalon.tree","text!./avalon.tree.check.html"],function(e,t,n){function r(e){return document.getElementById(e)}var i=void 0;e.ui.tree.leafIgnoreField.push("chkFocus","chkTotal","checkedOld"),e.ui.tree.AddExtention(["check"],{check:{enable:!1,radioType:"level",chkStyle:"checkbox",nocheckInherit:!1,chkDisabledInherit:!1,autoCheckTrigger:!1,chkboxType:{Y:"ps",N:"ps"}},data:{key:{checked:"checked",nocheck:"nocheck",chkDisabled:"chkDisabled",halfCheck:"halfCheck",chkFocus:"chkFocus",chkTotal:"",checkedOld:"checked"}},callback:{beforeCheck:e.noop,onCheck:e.noop,beforeCheckRelated:function(t){return t&&t.vm&&t.vm.check&&!t.vm.check.enable||t.e&&t.e.expr===!1?(e.log("check is not enable"),!1):(e.log("check is enable"),!0)},beforeCheckChange:e.noop,onCheckChange:e.noop}},function(t,n){e.mix(t,{chkFocus:function(e){e.leaf&&(e.leaf.chkFocus=!0)},chkBlur:function(e){e.leaf&&(e.leaf.chkFocus=!1)},checkEnable:function(){return!!t.check.enable},computeCHKClass:function(e){var n=t.getCheckType();return n+"_"+!!e.checked+"_"+(e.halfCheck?"part":e.chkDisabled?"disable":"full")+(e.chkFocus?"_focus":"")},getCheckType:function(){return t.check.chkStyle==="radio"?"radio":"checkbox"},checkNode:function(e,n,r,s){if(!t.checkEnable()||e.nocheck||e.chkDisabled)return;t.excute("checkChange",{cancelCallback:!s,checkTypeFlag:r},e,function(r){var o=n===i?!e.checked:!!n,u=t.callback.beforeCheck,a=t.callback.onCheck;if(s&&o&&u&&u(r)===!1||r.cancel)return;return e.checked=o,s&&o&&a&&a(r),o})},checkAllNodes:function(e,n){if(!t.checkEnable()&&t.check.chkStyle!=="checkbox")return;t.visitor(n,function(t){!t.nocheck&&!t.chkDisabled&&(t.checked=!!e)})},getCheckedNodes:function(e,n){var e=e===i?!0:!!e;return t.visitor(n,function(t){if(t.chkDisabled||t.nocheck)return;if(t.checked==e)return t},e&&t.check.chkStyle==="radio"&&t.check.radioType==="all"?function(e){return e&&e.length>0}:i,[])},getChangeCheckedNodes:function(e,n){return t.visitor(e,function(e){if(!!e.checkedOld!=!!e.checked)return n&&(e.checkedOld=!!e.checked),e},i,[])},setChkDisabled:function(e,n,r,i){t.checkEnable()&&(n=!!n,e.chkDisabled=n,i&&t.visitor(e,function(e){if(e.nocheck)return;e.chkDisabled=n},function(e,t){return t.nocheck},[]),r&&e&&e.$parentLeaf&&t.cVisitor(e,function(e){var n=e.$parentLeaf;if(!n)return;var r=0,i=0;t.brotherVisitor(e,function(e){if(e.nocheck)return;i++,e.chkDisabled&&r++}),n.chkDisabled=r>=i}))}})},[],{check_html:n},function(e,t){e.$watch("e:nodeCreated",function(e){var t=e.res,n=e.vm,r=t.$parentLeaf;if(!r)return;!!n.optionToBoolen(n.check.enable,t)&&!t.nocheck&&(t.nocheck=n.check.nocheckInherit&&r.nocheck),!!n.optionToBoolen(n.check.enable,t)&&!t.chkDisabled&&(t.chkDisabled=n.check.chkDisabledInherit&&r.chkDisabled)});var n=e.getCheckedNodes()[0];e.$watch("e:checkChange",function(r){var s=r.leaf,o=r.vm,u=o.check;if(!u.enable)return;var a=u.chkStyle,f=u.radioType,l=u.chkboxType,c=u.autoCheckTrigger,h=e.callback,p=h.beforeCheck,d=h.onCheck,v=r.e&&r.e.cancelCallback;if(a==="radio")s.checked&&(f==="all"?(n&&(n.checked=!1),n=s):o.brotherVisitor(s,function(e){if(e===s)return;e.checked=!1},function(e){return e.length>0},[]));else{s.halfCheck=!1;var m=!!s.checked;l=m?l.Y:l.N,a==="checkbox"&&r.e&&r.e.checkTypeFlag&&(l.indexOf("p")>-1&&e.cVisitor(s,function(n){var i=n.$parentLeaf;if(!i)return;var o=0,u=0;e.brotherVisitor(n,function(e){if(e.nocheck||e.chkDisabled)return;e.checked&&o++,u++},function(e,t,n){return n&&(n.nocheck||n.chkDisabled)});var a={e:r.e,srcLeaf:s,leaf:n,vm:e,vmodels:t,preventDefault:function(){this.cancel=!0}};if(!v&&m&&c&&p&&p(a)===!1)return;i.checked=o>0,i.halfCheck=o<=0||o>=u?!1:!0,!v&&m&&c&&d&&d(a)}),l.indexOf("s")>-1&&e.visitor(s,function(n){if(n.nocheck||n.chkDisabled)return;var i={e:r.e,srcLeaf:s,leaf:n,vm:e,vmodels:t,preventDefault:function(){this.cancel=!0}};if(!v&&m&&c&&p&&p(i)===!1)return;n.checked=m,m&&(n.halfCheck=!1),!v&&m&&c&&d&&d(i)},i,[]))}})})});