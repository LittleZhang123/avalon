define(["avalon"],function(e){if("ondevicemotion"in window){var t={},n=15,r=Date.now(),i={x:"leftright",y:"forwardback",z:"updown","-x":"left","+x":"right","-y":"back","+y":"forward","-z":"down","+z":"up"};function s(e,t,r){var i=Math.abs(e),s=Math.abs(t),o=Math.abs(r),u=Math.max(i,s,o);if(u<n)return!1;if(u===i)return"x";if(u===s)return"y";if(u===o)return"z"}e.eventHooks.shake={type:"devicemotion",deel:function(e,n){return function(e){var o=e.accelerationIncludingGravity,u,a,f,l;o.z=o.z-9.8;if(t.x===null&&t.y===null&&t.z===null){t={x:o.x,y:o.y,z:o.z};return}f=s(o.x-t.x,o.y-t.y,o.z-t.z),f&&(u=Date.now(),a=u-r,a>1e3&&(t[f]?l=(t[f]<0?"-":"+")+f:l=f,e.direction=i[l],n(e))),t={x:o.x,y:o.y,z:o.z}}}}}});