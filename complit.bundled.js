var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var i,e,s,n={exports:{}};e=t,s=function(){var t="undefined"==typeof window,i=new Map,e=new Map,s=[];s.total=0;var n=[],r=[];function o(){i.clear(),e.clear(),n=[],r=[]}function l(t){for(var i=-9007199254740991,e=t.length-1;e>=0;--e){var s=t[e];if(null!==s){var n=s.score;n>i&&(i=n)}}return-9007199254740991===i?null:i}function h(t,i){var e=t[i];if(void 0!==e)return e;var s=i;Array.isArray(i)||(s=i.split("."));for(var n=s.length,r=-1;t&&++r<n;)t=t[s[r]];return t}function a(t){return"object"==typeof t}var u=function(){var t=[],i=0,e={};function s(){for(var e=0,s=t[e],n=1;n<i;){var r=n+1;e=n,r<i&&t[r].score<t[n].score&&(e=r),t[e-1>>1]=t[e],n=1+(e<<1)}for(var o=e-1>>1;e>0&&s.score<t[o].score;o=(e=o)-1>>1)t[e]=t[o];t[e]=s}return e.add=function(e){var s=i;t[i++]=e;for(var n=s-1>>1;s>0&&e.score<t[n].score;n=(s=n)-1>>1)t[s]=t[n];t[s]=e},e.poll=function(){if(0!==i){var e=t[0];return t[0]=t[--i],s(),e}},e.peek=function(e){if(0!==i)return t[0]},e.replaceTop=function(i){t[0]=i,s()},e},d=u();return function c(v){var f={single:function(t,i,e){return t?(a(t)||(t=f.getPreparedSearch(t)),i?(a(i)||(i=f.getPrepared(i)),((e&&void 0!==e.allowTypo?e.allowTypo:!v||void 0===v.allowTypo||v.allowTypo)?f.algorithm:f.algorithmNoTypo)(t,i,t[0])):null):null},go:function(t,i,e){if(!t)return s;var n=(t=f.prepareSearch(t))[0],r=e&&e.threshold||v&&v.threshold||-9007199254740991,o=e&&e.limit||v&&v.limit||9007199254740991,u=(e&&void 0!==e.allowTypo?e.allowTypo:!v||void 0===v.allowTypo||v.allowTypo)?f.algorithm:f.algorithmNoTypo,c=0,p=0,g=i.length;if(e&&e.keys)for(var w=e.scoreFn||l,b=e.keys,y=b.length,m=g-1;m>=0;--m){for(var S=i[m],$=new Array(y),_=y-1;_>=0;--_)(x=h(S,A=b[_]))?(a(x)||(x=f.getPrepared(x)),$[_]=u(t,x,n)):$[_]=null;$.obj=S;var C=w($);null!==C&&(C<r||($.score=C,c<o?(d.add($),++c):(++p,C>d.peek().score&&d.replaceTop($))))}else if(e&&e.key){var A=e.key;for(m=g-1;m>=0;--m)(x=h(S=i[m],A))&&(a(x)||(x=f.getPrepared(x)),null!==(k=u(t,x,n))&&(k.score<r||(k={target:k.target,_targetLowerCodes:null,_nextBeginningIndexes:null,score:k.score,indexes:k.indexes,obj:S},c<o?(d.add(k),++c):(++p,k.score>d.peek().score&&d.replaceTop(k)))))}else for(m=g-1;m>=0;--m){var x,k;(x=i[m])&&(a(x)||(x=f.getPrepared(x)),null!==(k=u(t,x,n))&&(k.score<r||(c<o?(d.add(k),++c):(++p,k.score>d.peek().score&&d.replaceTop(k)))))}if(0===c)return s;var E=new Array(c);for(m=c-1;m>=0;--m)E[m]=d.poll();return E.total=c+p,E},goAsync:function(i,e,n){var r=!1,o=new Promise((function(o,d){if(!i)return o(s);var c=(i=f.prepareSearch(i))[0],p=u(),g=e.length-1,w=n&&n.threshold||v&&v.threshold||-9007199254740991,b=n&&n.limit||v&&v.limit||9007199254740991,y=(n&&void 0!==n.allowTypo?n.allowTypo:!v||void 0===v.allowTypo||v.allowTypo)?f.algorithm:f.algorithmNoTypo,m=0,S=0;function $(){if(r)return d("canceled");var u=Date.now();if(n&&n.keys)for(var v=n.scoreFn||l,_=n.keys,C=_.length;g>=0;--g){for(var A=e[g],x=new Array(C),k=C-1;k>=0;--k)(U=h(A,T=_[k]))?(a(U)||(U=f.getPrepared(U)),x[k]=y(i,U,c)):x[k]=null;x.obj=A;var E=v(x);if(null!==E&&!(E<w)&&(x.score=E,m<b?(p.add(x),++m):(++S,E>p.peek().score&&p.replaceTop(x)),g%1e3==0&&Date.now()-u>=10))return void(t?setImmediate($):setTimeout($))}else if(n&&n.key){for(var T=n.key;g>=0;--g)if((U=h(A=e[g],T))&&(a(U)||(U=f.getPrepared(U)),null!==(M=y(i,U,c))&&!(M.score<w)&&(M={target:M.target,_targetLowerCodes:null,_nextBeginningIndexes:null,score:M.score,indexes:M.indexes,obj:A},m<b?(p.add(M),++m):(++S,M.score>p.peek().score&&p.replaceTop(M)),g%1e3==0&&Date.now()-u>=10)))return void(t?setImmediate($):setTimeout($))}else for(;g>=0;--g){var U,M;if((U=e[g])&&(a(U)||(U=f.getPrepared(U)),null!==(M=y(i,U,c))&&!(M.score<w)&&(m<b?(p.add(M),++m):(++S,M.score>p.peek().score&&p.replaceTop(M)),g%1e3==0&&Date.now()-u>=10)))return void(t?setImmediate($):setTimeout($))}if(0===m)return o(s);for(var I=new Array(m),j=m-1;j>=0;--j)I[j]=p.poll();I.total=m+S,o(I)}t?setImmediate($):$()}));return o.cancel=function(){r=!0},o},highlight:function(t,i,e){if(null===t)return null;void 0===i&&(i="<b>"),void 0===e&&(e="</b>");for(var s="",n=0,r=!1,o=t.target,l=o.length,h=t.indexes,a=0;a<l;++a){var u=o[a];if(h[n]===a){if(r||(r=!0,s+=i),++n===h.length){s+=u+e+o.substr(a+1);break}}else r&&(r=!1,s+=e);s+=u}return s},prepare:function(t){if(t)return{target:t,_targetLowerCodes:f.prepareLowerCodes(t),_nextBeginningIndexes:null,score:null,indexes:null,obj:null}},prepareSlow:function(t){if(t)return{target:t,_targetLowerCodes:f.prepareLowerCodes(t),_nextBeginningIndexes:f.prepareNextBeginningIndexes(t),score:null,indexes:null,obj:null}},prepareSearch:function(t){if(t)return f.prepareLowerCodes(t)},getPrepared:function(t){if(t.length>999)return f.prepare(t);var e=i.get(t);return void 0!==e||(e=f.prepare(t),i.set(t,e)),e},getPreparedSearch:function(t){if(t.length>999)return f.prepareSearch(t);var i=e.get(t);return void 0!==i||(i=f.prepareSearch(t),e.set(t,i)),i},algorithm:function(t,i,e){for(var s=i._targetLowerCodes,o=t.length,l=s.length,h=0,a=0,u=0,d=0;;){if(e===s[a]){if(n[d++]=a,++h===o)break;e=t[0===u?h:u===h?h+1:u===h-1?h-1:h]}if(++a>=l)for(;;){if(h<=1)return null;if(0===u){if(e===t[--h])continue;u=h}else{if(1===u)return null;if((e=t[1+(h=--u)])===t[h])continue}a=n[(d=h)-1]+1;break}}h=0;var c=0,v=!1,p=0,g=i._nextBeginningIndexes;null===g&&(g=i._nextBeginningIndexes=f.prepareNextBeginningIndexes(i.target));var w=a=0===n[0]?0:g[n[0]-1];if(a!==l)for(;;)if(a>=l){if(h<=0){if(++c>o-2)break;if(t[c]===t[c+1])continue;a=w;continue}--h,a=g[r[--p]]}else if(t[0===c?h:c===h?h+1:c===h-1?h-1:h]===s[a]){if(r[p++]=a,++h===o){v=!0;break}++a}else a=g[a];if(v)var b=r,y=p;else b=n,y=d;for(var m=0,S=-1,$=0;$<o;++$)S!==(a=b[$])-1&&(m-=a),S=a;for(v?0!==c&&(m+=-20):(m*=1e3,0!==u&&(m+=-20)),m-=l-o,i.score=m,i.indexes=new Array(y),$=y-1;$>=0;--$)i.indexes[$]=b[$];return i},algorithmNoTypo:function(t,i,e){for(var s=i._targetLowerCodes,o=t.length,l=s.length,h=0,a=0,u=0;;){if(e===s[a]){if(n[u++]=a,++h===o)break;e=t[h]}if(++a>=l)return null}h=0;var d=!1,c=0,v=i._nextBeginningIndexes;if(null===v&&(v=i._nextBeginningIndexes=f.prepareNextBeginningIndexes(i.target)),(a=0===n[0]?0:v[n[0]-1])!==l)for(;;)if(a>=l){if(h<=0)break;--h,a=v[r[--c]]}else if(t[h]===s[a]){if(r[c++]=a,++h===o){d=!0;break}++a}else a=v[a];if(d)var p=r,g=c;else p=n,g=u;for(var w=0,b=-1,y=0;y<o;++y)b!==(a=p[y])-1&&(w-=a),b=a;for(d||(w*=1e3),w-=l-o,i.score=w,i.indexes=new Array(g),y=g-1;y>=0;--y)i.indexes[y]=p[y];return i},prepareLowerCodes:function(t){for(var i=t.length,e=[],s=t.toLowerCase(),n=0;n<i;++n)e[n]=s.charCodeAt(n);return e},prepareBeginningIndexes:function(t){for(var i=t.length,e=[],s=0,n=!1,r=!1,o=0;o<i;++o){var l=t.charCodeAt(o),h=l>=65&&l<=90,a=h||l>=97&&l<=122||l>=48&&l<=57,u=h&&!n||!r||!a;n=h,r=a,u&&(e[s++]=o)}return e},prepareNextBeginningIndexes:function(t){for(var i=t.length,e=f.prepareBeginningIndexes(t),s=[],n=e[0],r=0,o=0;o<i;++o)n>o?s[o]=n:(n=e[++r],s[o]=void 0===n?i:n);return s},cleanup:o,new:c};return f}()},(i=n).exports?i.exports=s():e.fuzzysort=s();var r=n.exports;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,l=Symbol(),h=new Map;class a{constructor(t,i){if(this._$cssResult$=!0,i!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=h.get(this.cssText);return o&&void 0===t&&(h.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const u=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return(t=>new a("string"==typeof t?t:t+"",l))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var d;const c=window.trustedTypes,v=c?c.emptyScript:"",f=window.reactiveElementPolyfillSupport,p={toAttribute(t,i){switch(i){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},g=(t,i)=>i!==t&&(i==i||t==t),w={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:g};class b extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,e)=>{const s=this._$Eh(e,i);void 0!==s&&(this._$Eu.set(s,e),t.push(s))})),t}static createProperty(t,i=w){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const e="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,e,i);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,i,e){return{get(){return this[i]},set(s){const n=this[t];this[i]=s,this.requestUpdate(t,n,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||w}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const e of i)this.createProperty(e,t[e])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(u(t))}else void 0!==t&&i.push(u(t));return i}static _$Eh(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,e;(null!==(i=this._$Eg)&&void 0!==i?i:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(e=t.hostConnected)||void 0===e||e.call(t))}removeController(t){var i;null===(i=this._$Eg)||void 0===i||i.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{o?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((i=>{const e=document.createElement("style"),s=window.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=i.cssText,t.appendChild(e)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,e){this._$AK(t,e)}_$ES(t,i,e=w){var s,n;const r=this.constructor._$Eh(t,e);if(void 0!==r&&!0===e.reflect){const o=(null!==(n=null===(s=e.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==n?n:p.toAttribute)(i,e.type);this._$Ei=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Ei=null}}_$AK(t,i){var e,s,n;const r=this.constructor,o=r._$Eu.get(t);if(void 0!==o&&this._$Ei!==o){const t=r.getPropertyOptions(o),l=t.converter,h=null!==(n=null!==(s=null===(e=l)||void 0===e?void 0:e.fromAttribute)&&void 0!==s?s:"function"==typeof l?l:null)&&void 0!==n?n:p.fromAttribute;this._$Ei=o,this[o]=h(i,t.type),this._$Ei=null}}requestUpdate(t,i,e){let s=!0;void 0!==t&&(((e=e||this.constructor.getPropertyOptions(t)).hasChanged||g)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===e.reflect&&this._$Ei!==t&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(t,e))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(e)):this._$EU()}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(e)}willUpdate(t){}_$AE(t){var i;null===(i=this._$Eg)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$E_&&(this._$E_.forEach(((t,i)=>this._$ES(i,this[i],t))),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var y;b.finalized=!0,b.elementProperties=new Map,b.elementStyles=[],b.shadowRootOptions={mode:"open"},null==f||f({ReactiveElement:b}),(null!==(d=globalThis.reactiveElementVersions)&&void 0!==d?d:globalThis.reactiveElementVersions=[]).push("1.0.2");const m=globalThis.trustedTypes,S=m?m.createPolicy("lit-html",{createHTML:t=>t}):void 0,$=`lit$${(Math.random()+"").slice(9)}$`,_="?"+$,C=`<${_}>`,A=document,x=(t="")=>A.createComment(t),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,M=/>/g,I=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,j=/'/g,O=/"/g,N=/^(?:script|style|textarea)$/i,R=(t=>(i,...e)=>({_$litType$:t,strings:i,values:e}))(1),z=Symbol.for("lit-noChange"),P=Symbol.for("lit-nothing"),D=new WeakMap,L=A.createTreeWalker(A,129,null,!1),B=(t,i)=>{const e=t.length-1,s=[];let n,r=2===i?"<svg>":"",o=T;for(let i=0;i<e;i++){const e=t[i];let l,h,a=-1,u=0;for(;u<e.length&&(o.lastIndex=u,h=o.exec(e),null!==h);)u=o.lastIndex,o===T?"!--"===h[1]?o=U:void 0!==h[1]?o=M:void 0!==h[2]?(N.test(h[2])&&(n=RegExp("</"+h[2],"g")),o=I):void 0!==h[3]&&(o=I):o===I?">"===h[0]?(o=null!=n?n:T,a=-1):void 0===h[1]?a=-2:(a=o.lastIndex-h[2].length,l=h[1],o=void 0===h[3]?I:'"'===h[3]?O:j):o===O||o===j?o=I:o===U||o===M?o=T:(o=I,n=void 0);const d=o===I&&t[i+1].startsWith("/>")?" ":"";r+=o===T?e+C:a>=0?(s.push(l),e.slice(0,a)+"$lit$"+e.slice(a)+$+d):e+$+(-2===a?(s.push(void 0),i):d)}const l=r+(t[e]||"<?>")+(2===i?"</svg>":"");return[void 0!==S?S.createHTML(l):l,s]};class H{constructor({strings:t,_$litType$:i},e){let s;this.parts=[];let n=0,r=0;const o=t.length-1,l=this.parts,[h,a]=B(t,i);if(this.el=H.createElement(h,e),L.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(s=L.nextNode())&&l.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const i of s.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith($)){const e=a[r++];if(t.push(i),void 0!==e){const t=s.getAttribute(e.toLowerCase()+"$lit$").split($),i=/([.?@])?(.*)/.exec(e);l.push({type:1,index:n,name:i[2],strings:t,ctor:"."===i[1]?V:"?"===i[1]?F:"@"===i[1]?G:Z})}else l.push({type:6,index:n})}for(const i of t)s.removeAttribute(i)}if(N.test(s.tagName)){const t=s.textContent.split($),i=t.length-1;if(i>0){s.textContent=m?m.emptyScript:"";for(let e=0;e<i;e++)s.append(t[e],x()),L.nextNode(),l.push({type:2,index:++n});s.append(t[i],x())}}}else if(8===s.nodeType)if(s.data===_)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf($,t+1));)l.push({type:7,index:n}),t+=$.length-1}n++}}static createElement(t,i){const e=A.createElement("template");return e.innerHTML=t,e}}function J(t,i,e=t,s){var n,r,o,l;if(i===z)return i;let h=void 0!==s?null===(n=e._$Cl)||void 0===n?void 0:n[s]:e._$Cu;const a=k(i)?void 0:i._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(r=null==h?void 0:h._$AO)||void 0===r||r.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,e,s)),void 0!==s?(null!==(o=(l=e)._$Cl)&&void 0!==o?o:l._$Cl=[])[s]=h:e._$Cu=h),void 0!==h&&(i=J(t,h._$AS(t,i.values),h,s)),i}class K{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:e},parts:s}=this._$AD,n=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:A).importNode(e,!0);L.currentNode=n;let r=L.nextNode(),o=0,l=0,h=s[0];for(;void 0!==h;){if(o===h.index){let i;2===h.type?i=new q(r,r.nextSibling,this,t):1===h.type?i=new h.ctor(r,h.name,h.strings,this,t):6===h.type&&(i=new Q(r,this,t)),this.v.push(i),h=s[++l]}o!==(null==h?void 0:h.index)&&(r=L.nextNode(),o++)}return n}m(t){let i=0;for(const e of this.v)void 0!==e&&(void 0!==e.strings?(e._$AI(t,e,i),i+=e.strings.length-2):e._$AI(t[i])),i++}}class q{constructor(t,i,e,s){var n;this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=e,this.options=s,this._$Cg=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=J(this,t,i),k(t)?t===P||null==t||""===t?(this._$AH!==P&&this._$AR(),this._$AH=P):t!==this._$AH&&t!==z&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var i;return E(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==P&&k(this._$AH)?this._$AA.nextSibling.data=t:this.S(A.createTextNode(t)),this._$AH=t}T(t){var i;const{values:e,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=H.createElement(s.h,this.options)),s);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===n)this._$AH.m(e);else{const t=new K(n,this),i=t.p(this.options);t.m(e),this.S(i),this._$AH=t}}_$AC(t){let i=D.get(t.strings);return void 0===i&&D.set(t.strings,i=new H(t)),i}M(t){E(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let e,s=0;for(const n of t)s===i.length?i.push(e=new q(this.A(x()),this.A(x()),this,this.options)):e=i[s],e._$AI(n),s++;s<i.length&&(this._$AR(e&&e._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){var e;for(null===(e=this._$AP)||void 0===e||e.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class Z{constructor(t,i,e,s,n){this.type=1,this._$AH=P,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=n,e.length>2||""!==e[0]||""!==e[1]?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=P}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,e,s){const n=this.strings;let r=!1;if(void 0===n)t=J(this,t,i,0),r=!k(t)||t!==this._$AH&&t!==z,r&&(this._$AH=t);else{const s=t;let o,l;for(t=n[0],o=0;o<n.length-1;o++)l=J(this,s[e+o],i,o),l===z&&(l=this._$AH[o]),r||(r=!k(l)||l!==this._$AH[o]),l===P?t=P:t!==P&&(t+=(null!=l?l:"")+n[o+1]),this._$AH[o]=l}r&&!s&&this.k(t)}k(t){t===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class V extends Z{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===P?void 0:t}}const W=m?m.emptyScript:"";class F extends Z{constructor(){super(...arguments),this.type=4}k(t){t&&t!==P?this.element.setAttribute(this.name,W):this.element.removeAttribute(this.name)}}class G extends Z{constructor(t,i,e,s,n){super(t,i,e,s,n),this.type=5}_$AI(t,i=this){var e;if((t=null!==(e=J(this,t,i,0))&&void 0!==e?e:P)===z)return;const s=this._$AH,n=t===P&&s!==P||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==P&&(s===P||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,e;"function"==typeof this._$AH?this._$AH.call(null!==(e=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==e?e:this.element,t):this._$AH.handleEvent(t)}}class Q{constructor(t,i,e){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const X=window.litHtmlPolyfillSupport;null==X||X(H,q),(null!==(y=globalThis.litHtmlVersions)&&void 0!==y?y:globalThis.litHtmlVersions=[]).push("2.0.2");
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,tt=Symbol(),it=new Map;class et{constructor(t,i){if(this._$cssResult$=!0,i!==tt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=it.get(this.cssText);return Y&&void 0===t&&(it.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const st=Y?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return(t=>new et("string"==typeof t?t:t+"",tt))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var nt;const rt=window.trustedTypes,ot=rt?rt.emptyScript:"",lt=window.reactiveElementPolyfillSupport,ht={toAttribute(t,i){switch(i){case Boolean:t=t?ot:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},at=(t,i)=>i!==t&&(i==i||t==t),ut={attribute:!0,type:String,converter:ht,reflect:!1,hasChanged:at};class dt extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,e)=>{const s=this._$Eh(e,i);void 0!==s&&(this._$Eu.set(s,e),t.push(s))})),t}static createProperty(t,i=ut){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const e="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,e,i);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,i,e){return{get(){return this[i]},set(s){const n=this[t];this[i]=s,this.requestUpdate(t,n,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||ut}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const e of i)this.createProperty(e,t[e])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(st(t))}else void 0!==t&&i.push(st(t));return i}static _$Eh(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,e;(null!==(i=this._$Eg)&&void 0!==i?i:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(e=t.hostConnected)||void 0===e||e.call(t))}removeController(t){var i;null===(i=this._$Eg)||void 0===i||i.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{Y?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((i=>{const e=document.createElement("style"),s=window.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=i.cssText,t.appendChild(e)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,e){this._$AK(t,e)}_$ES(t,i,e=ut){var s,n;const r=this.constructor._$Eh(t,e);if(void 0!==r&&!0===e.reflect){const o=(null!==(n=null===(s=e.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==n?n:ht.toAttribute)(i,e.type);this._$Ei=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Ei=null}}_$AK(t,i){var e,s,n;const r=this.constructor,o=r._$Eu.get(t);if(void 0!==o&&this._$Ei!==o){const t=r.getPropertyOptions(o),l=t.converter,h=null!==(n=null!==(s=null===(e=l)||void 0===e?void 0:e.fromAttribute)&&void 0!==s?s:"function"==typeof l?l:null)&&void 0!==n?n:ht.fromAttribute;this._$Ei=o,this[o]=h(i,t.type),this._$Ei=null}}requestUpdate(t,i,e){let s=!0;void 0!==t&&(((e=e||this.constructor.getPropertyOptions(t)).hasChanged||at)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===e.reflect&&this._$Ei!==t&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(t,e))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(e)):this._$EU()}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(e)}willUpdate(t){}_$AE(t){var i;null===(i=this._$Eg)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$E_&&(this._$E_.forEach(((t,i)=>this._$ES(i,this[i],t))),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ct,vt;dt.finalized=!0,dt.elementProperties=new Map,dt.elementStyles=[],dt.shadowRootOptions={mode:"open"},null==lt||lt({ReactiveElement:dt}),(null!==(nt=globalThis.reactiveElementVersions)&&void 0!==nt?nt:globalThis.reactiveElementVersions=[]).push("1.0.2");class ft extends dt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,i;const e=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=e.firstChild),e}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,i,e)=>{var s,n;const r=null!==(s=null==e?void 0:e.renderBefore)&&void 0!==s?s:i;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==e?void 0:e.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new q(i.insertBefore(x(),t),t,void 0,null!=e?e:{})}return o._$AI(t),o})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return z}}ft.finalized=!0,ft._$litElement$=!0,null===(ct=globalThis.litElementHydrateSupport)||void 0===ct||ct.call(globalThis,{LitElement:ft});const pt=globalThis.litElementPolyfillSupport;null==pt||pt({LitElement:ft}),(null!==(vt=globalThis.litElementVersions)&&void 0!==vt?vt:globalThis.litElementVersions=[]).push("3.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class wt extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,e){this._$Ct=t,this._$AM=i,this._$Ci=e}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}{constructor(t){if(super(t),this.it=P,t.type!==gt)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===P||null==t)return this.vt=void 0,this.it=t;if(t===z)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.vt;this.it=t;const i=[t];return i.raw=i,this.vt={_$litType$:this.constructor.resultType,strings:i,values:[]}}}wt.directiveName="unsafeHTML",wt.resultType=1;const bt=(t=>(...i)=>({_$litDirective$:t,values:i}))(wt),yt=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(e){e.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(e){e.createProperty(i.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function mt(t){return(i,e)=>void 0!==e?((t,i,e)=>{i.constructor.createProperty(e,t)})(t,i,e):yt(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function St(t){return mt({...t,state:!0})}var $t=function(t,i,e,s){for(var n,r=arguments.length,o=r<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,e):s,l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(i,e,o):n(i,e))||o);return r>3&&o&&Object.defineProperty(i,e,o),o};let _t=class extends ft{constructor(){super(...arguments),this._data=[],this._taggedResults=[],this._highlightedItemIndex=-1,this.term="",this.dataResource="",this.results=[]}connectedCallback(){this._fetchData(),super.connectedCallback(),document.addEventListener("keydown",this._onKeyboardEvent.bind(this))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this._onKeyboardEvent.bind(this)),this._data=[]}render(){return R`
      <input type="search" part="term" value="${this.term}"
        @input=${this._onInput}
      />
      <ol part="list">
        ${this._taggedResults.map(((t,i)=>{const e=this._highlightedItemIndex===i?"highlight":"";return R`
            <li
              part="item ${e}"
              class="${e}"
              @click=${this._onItemClick}
            >${bt(t)}</li>
            `}))}
      </ol>
    `}_onInput({currentTarget:t}){var i;this._search(null===(i=t)||void 0===i?void 0:i.value)}_onItemClick({currentTarget:t}){var i;const e=null===(i=t)||void 0===i?void 0:i.textContent;this._handleItemSelection(e)}_onKeyboardEvent(t){this._handleArrowNavigation(t),this._handleItemEnter(t)}_handleItemSelection(t=""){console.log("selected item:",t)}_handleItemEnter({key:t}){switch(t){case"Enter":-1!==this._highlightedItemIndex&&this._handleItemSelection(this.results[this._highlightedItemIndex])}}_handleArrowNavigation({key:t}){let i;switch(t){case"ArrowDown":i=(this._highlightedItemIndex+1)%this.results.length;break;case"ArrowUp":i=(this._highlightedItemIndex-1)%this.results.length}void 0!==i&&(this._highlightedItemIndex=i<0?this.results.length+i:i)}_fetchData(){this.dataResource&&fetch(this.dataResource).then((t=>t.json())).then((t=>{this._data=t})).then((()=>this._search(this.term))).catch((t=>console.error(t,"data fetch failed")))}async _search(t){if(!t)return;const i=this._parseSearchResults(r.go(t,this._data),(t=>r.highlight(t,'<b part="match">',"</b>")));this.results=i.bare,this._taggedResults=i.tagged,this.dispatchEvent(new CustomEvent("results-changed"))}_parseSearchResults(t,i){return{bare:t.map((({target:t})=>t)),tagged:t.map(i).filter((t=>null!=t&&t))}}};_t.styles=((t,...i)=>{const e=1===t.length?t[0]:i.reduce(((i,e,s)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[s+1]),t[0]);return new et(e,tt)})`
    :host {
      display: flex;
      flex-direction: column;
      width: max-content;
      max-width: 800px;
      padding: 1em;
      border: solid 2px #aaa;
      border-radius: 0 2em;
      font-size: 1em;
    }

    input {
      padding: 0 1em;
      line-height: 2;
      font-size: 1em;
      border-radius: 0 1em;
    }

    ol {
      overflow: auto;
      max-height: 200px;
      margin-block-end: 0;
      list-style-type: none;
    }

    ol li {
      position: relative;
      cursor: pointer;
    }

    ol li.highlight:before {
      content: '\\0000bb';
      position: absolute;
      left: -1em;
    }

    ol li:hover {
      text-decoration: underline;
    }

    ol li b {
      color: red;
    }
  `,$t([St()],_t.prototype,"_data",void 0),$t([St()],_t.prototype,"_taggedResults",void 0),$t([St()],_t.prototype,"_highlightedItemIndex",void 0),$t([mt({type:String})],_t.prototype,"term",void 0),$t([mt()],_t.prototype,"dataResource",void 0),$t([mt()],_t.prototype,"results",void 0),_t=$t([(t=>i=>"function"==typeof i?((t,i)=>(window.customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:e,elements:s}=i;return{kind:e,elements:s,finisher(i){window.customElements.define(t,i)}}})(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */)("comp-lit")],_t);export{_t as Complit};
