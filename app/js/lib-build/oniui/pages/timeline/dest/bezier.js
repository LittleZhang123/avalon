/*
 * Copyright (C) 2008 Apple Inc. All Rights Reserved.
 *
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

var Bezier=function(){"use strict";var e=400,t=function(e){return 1/(200*e)},n=function(n,r,i,s){var o=3*n,u=3*(i-n)-o,a=1-o-u,f=3*r,l=3*(s-r)-f,c=1-f-l,h=function(e){return((a*e+u)*e+o)*e},p=function(e){return((c*e+l)*e+f)*e},d=function(e){return(3*a*e+2*u)*e+o},v=function(e,t){var n,r,i,s,o,u;for(i=e,u=0;u<8;u++){s=h(i)-e;if(Math.abs(s)<t)return i;o=d(i);if(Math.abs(o)<1e-6)break;i-=s/o}n=0,r=1,i=e;if(i<n)return n;if(i>r)return r;while(n<r){s=h(i);if(Math.abs(s-e)<t)return i;e>s?n=i:r=i,i=(r-n)*.5+n}return i},m=function(e,t){return p(v(e,t))};return function(n,r){return m(n,t(+r||e))}};return{linear:n(0,0,1,1),ease:n(.25,.1,.25,1),easeIn:n(.42,0,1,1),easeOut:n(0,0,.58,1),easeInOut:n(.42,0,.58,1),unitBezier:n,cubicBezier:function(e,t,r,i,s,o){return n(e,t,r,i)(s,o)}}}();define([],function(){return Bezier});