"use strict";
if(!(window.Promise && window.Promise.prototype && window.Promise.prototype.finally)){
  window.Promise = undefined;
};
/*********
 * Promise
 * https://github.com/stefanpenner/es6-promise
 *********/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function e(t){return"function"==typeof t}function n(t){W=t}function r(t){z=t}function o(){return function(){return process.nextTick(a)}}function i(){return"undefined"!=typeof U?function(){U(a)}:c()}function s(){var t=0,e=new H(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<N;t+=2){var e=Q[t],n=Q[t+1];e(n),Q[t]=void 0,Q[t+1]=void 0}N=0}function f(){try{var t=Function("return this")().require("vertx");return U=t.runOnLoop||t.runOnContext,i()}catch(e){return c()}}function l(t,e){var n=this,r=new this.constructor(p);void 0===r[V]&&x(r);var o=n._state;if(o){var i=arguments[o-1];z(function(){return T(o,r,i,n._result)})}else j(n,r,t,e);return r}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return w(n,t),n}function p(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function _(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function y(t,e,n){z(function(t){var r=!1,o=_(n,e,function(n){r||(r=!0,e!==n?w(t,n):A(t,n))},function(e){r||(r=!0,S(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,S(t,o))},t)}function m(t,e){e._state===Z?A(t,e._result):e._state===$?S(t,e._result):j(e,void 0,function(e){return w(t,e)},function(e){return S(t,e)})}function b(t,n,r){n.constructor===t.constructor&&r===l&&n.constructor.resolve===h?m(t,n):void 0===r?A(t,n):e(r)?y(t,n,r):A(t,n)}function w(e,n){if(e===n)S(e,v());else if(t(n)){var r=void 0;try{r=n.then}catch(o){return void S(e,o)}b(e,n,r)}else A(e,n)}function g(t){t._onerror&&t._onerror(t._result),E(t)}function A(t,e){t._state===X&&(t._result=e,t._state=Z,0!==t._subscribers.length&&z(E,t))}function S(t,e){t._state===X&&(t._state=$,t._result=e,z(g,t))}function j(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+Z]=n,o[i+$]=r,0===i&&t._state&&z(E,t)}function E(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?T(n,r,o,i):o(i);t._subscribers.length=0}}function T(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=!0;if(i){try{s=r(o)}catch(a){c=!1,u=a}if(n===s)return void S(n,d())}else s=o;n._state!==X||(i&&c?w(n,s):c===!1?S(n,u):t===Z?A(n,s):t===$&&S(n,s))}function M(t,e){try{e(function(e){w(t,e)},function(e){S(t,e)})}catch(n){S(t,n)}}function P(){return tt++}function x(t){t[V]=tt++,t._state=void 0,t._result=void 0,t._subscribers=[]}function C(){return new Error("Array Methods must be provided an Array")}function O(t){return new et(this,t).promise}function k(t){var e=this;return new e(L(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function F(t){var e=this,n=new e(p);return S(n,t),n}function Y(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function q(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function D(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(e){}if("[object Promise]"===r&&!n.cast)return}t.Promise=nt}var K=void 0;K=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var L=K,N=0,U=void 0,W=void 0,z=function(t,e){Q[N]=t,Q[N+1]=e,N+=2,2===N&&(W?W(a):R())},B="undefined"!=typeof window?window:void 0,G=B||{},H=G.MutationObserver||G.WebKitMutationObserver,I="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),J="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,Q=new Array(1e3),R=void 0;R=I?o():H?s():J?u():void 0===B&&"function"==typeof require?f():c();var V=Math.random().toString(36).substring(2),X=void 0,Z=1,$=2,tt=0,et=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[V]||x(this.promise),L(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?A(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&A(this.promise,this._result))):S(this.promise,C())}return t.prototype._enumerate=function(t){for(var e=0;this._state===X&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===h){var o=void 0,i=void 0,s=!1;try{o=t.then}catch(u){s=!0,i=u}if(o===l&&t._state!==X)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===nt){var c=new n(p);s?S(c,i):b(c,t,o),this._willSettleAt(c,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},t.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===X&&(this._remaining--,t===$?S(r,n):this._result[e]=n),0===this._remaining&&A(r,this._result)},t.prototype._willSettleAt=function(t,e){var n=this;j(t,void 0,function(t){return n._settledAt(Z,e,t)},function(t){return n._settledAt($,e,t)})},t}(),nt=function(){function t(e){this[V]=P(),this._result=this._state=void 0,this._subscribers=[],p!==e&&("function"!=typeof e&&Y(),this instanceof t?M(this,e):q())}return t.prototype["catch"]=function(t){return this.then(null,t)},t.prototype["finally"]=function(t){var n=this,r=n.constructor;return e(t)?n.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})}):n.then(t,t)},t}();return nt.prototype.then=l,nt.all=O,nt.race=k,nt.resolve=h,nt.reject=F,nt._setScheduler=n,nt._setAsap=r,nt._asap=z,nt.polyfill=D,nt.Promise=nt,nt.polyfill(),nt});
/*********
 * fetch
 * https://github.com/github/fetch
 *********/
function isDataView(a){return a&&DataView.prototype.isPrototypeOf(a)}function normalizeName(a){if("string"!=typeof a&&(a=String(a)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(a)||""===a)throw new TypeError("Invalid character in header field name");return a.toLowerCase()}function normalizeValue(a){return"string"!=typeof a&&(a=String(a)),a}function iteratorFor(a){var b={next:function(){var b=a.shift();return{done:void 0===b,value:b}}};return support.iterable&&(b[Symbol.iterator]=function(){return b}),b}function Headers(a){this.map={},a instanceof Headers?a.forEach(function(a,b){this.append(b,a)},this):Array.isArray(a)?a.forEach(function(a){this.append(a[0],a[1])},this):a&&Object.getOwnPropertyNames(a).forEach(function(b){this.append(b,a[b])},this)}function consumed(a){return a.bodyUsed?Promise.reject(new TypeError("Already read")):(a.bodyUsed=!0,void 0)}function fileReaderReady(a){return new Promise(function(b,c){a.onload=function(){b(a.result)},a.onerror=function(){c(a.error)}})}function readBlobAsArrayBuffer(a){var b=new FileReader,c=fileReaderReady(b);return b.readAsArrayBuffer(a),c}function readBlobAsText(a){var b=new FileReader,c=fileReaderReady(b);return b.readAsText(a),c}function readArrayBufferAsText(a){var d,b=new Uint8Array(a),c=new Array(b.length);for(d=0;d<b.length;d++)c[d]=String.fromCharCode(b[d]);return c.join("")}function bufferClone(a){if(a.slice)return a.slice(0);var b=new Uint8Array(a.byteLength);return b.set(new Uint8Array(a)),b.buffer}function Body(){return this.bodyUsed=!1,this._initBody=function(a){this.bodyUsed=this.bodyUsed,this._bodyInit=a,a?"string"==typeof a?this._bodyText=a:support.blob&&Blob.prototype.isPrototypeOf(a)?this._bodyBlob=a:support.formData&&FormData.prototype.isPrototypeOf(a)?this._bodyFormData=a:support.searchParams&&URLSearchParams.prototype.isPrototypeOf(a)?this._bodyText=a.toString():support.arrayBuffer&&support.blob&&isDataView(a)?(this._bodyArrayBuffer=bufferClone(a.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):support.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(a)||isArrayBufferView(a))?this._bodyArrayBuffer=bufferClone(a):this._bodyText=a=Object.prototype.toString.call(a):this._bodyText="",this.headers.get("content-type")||("string"==typeof a?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):support.searchParams&&URLSearchParams.prototype.isPrototypeOf(a)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},support.blob&&(this.blob=function(){var a=consumed(this);if(a)return a;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){if(this._bodyArrayBuffer){var a=consumed(this);return a?a:ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer)}return this.blob().then(readBlobAsArrayBuffer)}),this.text=function(){var a=consumed(this);if(a)return a;if(this._bodyBlob)return readBlobAsText(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},support.formData&&(this.formData=function(){return this.text().then(decode)}),this.json=function(){return this.text().then(JSON.parse)},this}function normalizeMethod(a){var b=a.toUpperCase();return methods.indexOf(b)>-1?b:a}function Request(a,b){var c,d,e;if(!(this instanceof Request))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');if(b=b||{},c=b.body,a instanceof Request){if(a.bodyUsed)throw new TypeError("Already read");this.url=a.url,this.credentials=a.credentials,b.headers||(this.headers=new Headers(a.headers)),this.method=a.method,this.mode=a.mode,this.signal=a.signal,c||null==a._bodyInit||(c=a._bodyInit,a.bodyUsed=!0)}else this.url=String(a);if(this.credentials=b.credentials||this.credentials||"same-origin",(b.headers||!this.headers)&&(this.headers=new Headers(b.headers)),this.method=normalizeMethod(b.method||this.method||"GET"),this.mode=b.mode||this.mode||null,this.signal=b.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&c)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(c),("GET"===this.method||"HEAD"===this.method)&&("no-store"===b.cache||"no-cache"===b.cache)&&(d=/([?&])_=[^&]*/,d.test(this.url)?this.url=this.url.replace(d,"$1_="+(new Date).getTime()):(e=/\?/,this.url+=(e.test(this.url)?"&":"?")+"_="+(new Date).getTime()))}function decode(a){var b=new FormData;return a.trim().split("&").forEach(function(a){var c,d,e;a&&(c=a.split("="),d=c.shift().replace(/\+/g," "),e=c.join("=").replace(/\+/g," "),b.append(decodeURIComponent(d),decodeURIComponent(e)))}),b}function parseHeaders(a){var b=new Headers,c=a.replace(/\r?\n[\t ]+/g," ");return c.split("\r").map(function(a){return 0===a.indexOf("\n")?a.substr(1,a.length):a}).forEach(function(a){var e,c=a.split(":"),d=c.shift().trim();d&&(e=c.join(":").trim(),b.append(d,e))}),b}function Response(a,b){if(!(this instanceof Response))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');b||(b={}),this.type="default",this.status=void 0===b.status?200:b.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in b?b.statusText:"",this.headers=new Headers(b.headers),this.url=b.url||"",this._initBody(a)}function fetch(a,b){return new Promise(function(c,d){function g(){f.abort()}function h(a){try{return""===a&&global.location.href?global.location.href:a}catch(b){return a}}var f,e=new Request(a,b);return e.signal&&e.signal.aborted?d(new DOMException("Aborted","AbortError")):(f=new XMLHttpRequest,f.onload=function(){var b,a={status:f.status,statusText:f.statusText,headers:parseHeaders(f.getAllResponseHeaders()||"")};a.url="responseURL"in f?f.responseURL:a.headers.get("X-Request-URL"),b="response"in f?f.response:f.responseText,setTimeout(function(){c(new Response(b,a))},0)},f.onerror=function(){setTimeout(function(){d(new TypeError("Network request failed"))},0)},f.ontimeout=function(){setTimeout(function(){d(new TypeError("Network request failed"))},0)},f.onabort=function(){setTimeout(function(){d(new DOMException("Aborted","AbortError"))},0)},f.open(e.method,h(e.url),!0),"include"===e.credentials?f.withCredentials=!0:"omit"===e.credentials&&(f.withCredentials=!1),"responseType"in f&&(support.blob?f.responseType="blob":support.arrayBuffer&&e.headers.get("Content-Type")&&-1!==e.headers.get("Content-Type").indexOf("application/octet-stream")&&(f.responseType="arraybuffer")),!b||"object"!=typeof b.headers||b.headers instanceof Headers?e.headers.forEach(function(a,b){f.setRequestHeader(b,a)}):Object.getOwnPropertyNames(b.headers).forEach(function(a){f.setRequestHeader(a,normalizeValue(b.headers[a]))}),e.signal&&(e.signal.addEventListener("abort",g),f.onreadystatechange=function(){4===f.readyState&&e.signal.removeEventListener("abort",g)}),f.send("undefined"==typeof e._bodyInit?null:e._bodyInit),void 0)})}var viewClasses,isArrayBufferView,methods,redirectStatuses,DOMException,global="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||"undefined"!=typeof global&&global,support={searchParams:"URLSearchParams"in global,iterable:"Symbol"in global&&"iterator"in Symbol,blob:"FileReader"in global&&"Blob"in global&&function(){try{return new Blob,!0}catch(a){return!1}}(),formData:"FormData"in global,arrayBuffer:"ArrayBuffer"in global};support.arrayBuffer&&(viewClasses=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],isArrayBufferView=ArrayBuffer.isView||function(a){return a&&viewClasses.indexOf(Object.prototype.toString.call(a))>-1}),Headers.prototype.append=function(a,b){a=normalizeName(a),b=normalizeValue(b);var c=this.map[a];this.map[a]=c?c+", "+b:b},Headers.prototype["delete"]=function(a){delete this.map[normalizeName(a)]},Headers.prototype.get=function(a){return a=normalizeName(a),this.has(a)?this.map[a]:null},Headers.prototype.has=function(a){return this.map.hasOwnProperty(normalizeName(a))},Headers.prototype.set=function(a,b){this.map[normalizeName(a)]=normalizeValue(b)},Headers.prototype.forEach=function(a,b){for(var c in this.map)this.map.hasOwnProperty(c)&&a.call(b,this.map[c],c,this)},Headers.prototype.keys=function(){var a=[];return this.forEach(function(b,c){a.push(c)}),iteratorFor(a)},Headers.prototype.values=function(){var a=[];return this.forEach(function(b){a.push(b)}),iteratorFor(a)},Headers.prototype.entries=function(){var a=[];return this.forEach(function(b,c){a.push([c,b])}),iteratorFor(a)},support.iterable&&(Headers.prototype[Symbol.iterator]=Headers.prototype.entries),methods=["DELETE","GET","HEAD","OPTIONS","POST","PUT"],Request.prototype.clone=function(){return new Request(this,{body:this._bodyInit})},Body.call(Request.prototype),Body.call(Response.prototype),Response.prototype.clone=function(){return new Response(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new Headers(this.headers),url:this.url})},Response.error=function(){var a=new Response(null,{status:0,statusText:""});return a.type="error",a},redirectStatuses=[301,302,303,307,308],Response.redirect=function(a,b){if(-1===redirectStatuses.indexOf(b))throw new RangeError("Invalid status code");return new Response(null,{status:b,headers:{location:a}})},DOMException=global.DOMException;try{new DOMException}catch(err){DOMException=function(a,b){this.message=a,this.name=b;var c=Error(a);this.stack=c.stack},DOMException.prototype=Object.create(Error.prototype),DOMException.prototype.constructor=DOMException}fetch.polyfill=!0,global.fetch||(global.fetch=fetch,global.Headers=Headers,global.Request=Request,global.Response=Response);
/*********
 * fetch封装,带失败重复请求
 * function fetchRequest
 *  *********/
function fetchRequest(a,b){return new FetchRequest(a,b).res_promise}var FetchRequest=function(){function a(a,b){var c=this;this.try_times=2,this.interval_time=600,this.try_timeout=void 0,this.res_promise=void 0,this.res_promise_resolve=void 0,this.res_promise_reject=void 0,this.url=a,this.catch_data=b,this.res_promise=new Promise(function(a,b){c.res_promise_resolve=a,c.res_promise_reject=b,c.try_request()})}return a.prototype.try_request=function(){this.try_times>0?(--this.try_times,this.request()):this.request_fail()},a.prototype.request=function(){var a=this;fetch(this.url,this.catch_data).then(function(b){if(!b.ok)throw new Error("服务器连通,但未正常响应请求");a.request_success(b)})["catch"](function(b){console.warn("请求",a.url,"发生错误,继续尝试:",b),clearTimeout(a.try_timeout),a.try_timeout=setTimeout(function(){a.try_request()},a.interval_time)})},a.prototype.request_success=function(a){this.res_promise_resolve(a),this.clear_memory()},a.prototype.request_fail=function(){console.error("请求失败,重试次数耗尽",this.url),this.res_promise_reject(),this.clear_memory()},a.prototype.clear_memory=function(){clearTimeout(this.try_timeout),this.res_promise_resolve=void 0,this.res_promise_reject=void 0},a}();
/*********
 * 用于请求js文件,加载错误会重试
 * 放于全局作用域下加载
 * function fetchScript
 * @param url 请求地址,注意,这个字符串也会作为缓存该js文件的标识,http://test.js与//test.js不相同
 * @param charset js文件编码,默认utf-8
 * *********/
;(function(){ var promise_cache = {}; var FetchScript = function(url,charset) { /**重复发起几次请求,直到次数耗尽或请求成功,默认2次 *********/ this.tryTimes = 2; this.intervalTime = 600; this.url = url; this.charset = charset || 'utf-8'; /**借位的promise对象,代替原生fetch返回的promise响应 *********/ this.promise = new Promise(function (resolve, reject) { var tryFunction = function () { --this.tryTimes; var jsonpScript = document.createElement('script'); jsonpScript.setAttribute('src', `${this.url}`); jsonpScript.setAttribute('charset', `${this.charset}`); jsonpScript.onerror = function (error) { document.body.removeChild(jsonpScript); if (this.tryTimes > 0) { console.warn(`请求${this.url}失败,继续尝试:`, error); setTimeout(function () { tryFunction(); }.bind(this), this.intervalTime); } else { reject(`请求${this.url}次数耗尽,请检查服务情况`); console.error(`请求${this.url}次数耗尽,请检查服务情况:`, error); } }.bind(this); jsonpScript.onload = function () { resolve(); }.bind(this); document.body.appendChild(jsonpScript); }.bind(this); tryFunction(); }.bind(this)); }; window.fetchScript = function(url,charset) { if(promise_cache[url]){ return promise_cache[url].promise; }else{ return (promise_cache[url] = new FetchScript(url,charset)).promise.catch(function(e){ promise_cache[url] = null; return Promise.reject(e); }); } }; })();