import{typeOf as e,isElement as t,isValidElementType as n}from"react-is";import r,{useState as o,useContext as s,useMemo as i,useEffect as a,useRef as c,createElement as u,useDebugValue as l,useLayoutEffect as d}from"react";import h from"shallowequal";import{prefixer as p,stringify as f,serialize as m,compile as v,middleware as y,RULESET as g}from"stylis";import S from"@emotion/unitless";import w from"@emotion/is-prop-valid";import E from"hoist-non-react-statics";function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var _=function(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n},N=function(t){return null!==t&&"object"==typeof t&&"[object Object]"===(t.toString?t.toString():Object.prototype.toString.call(t))&&!e(t)},A=Object.freeze([]),C=Object.freeze({});function I(e){return"function"==typeof e}function P(e){return"production"!==process.env.NODE_ENV&&"string"==typeof e&&e||e.displayName||e.name||"Component"}function O(e){return e&&"string"==typeof e.styledComponentId}var R="undefined"!=typeof process&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",D="5.3.0",j="undefined"!=typeof window&&"HTMLElement"in window,T=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY?"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY:"production"!==process.env.NODE_ENV),x={},k="production"!==process.env.NODE_ENV?{1:"Cannot create styled-component for component: %s.\n\n",2:"Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",3:"Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",4:"The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",5:"The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",6:"Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",7:'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',8:'ThemeProvider: Please make your "theme" prop an object.\n\n',9:"Missing document `<head>`\n\n",10:"Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",11:"_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",12:"It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n",13:"%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n",14:'ThemeProvider: "theme" prop is required.\n\n',15:"A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",16:"Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",17:"CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n"}:{};function V(){for(var e=arguments.length<=0?void 0:arguments[0],t=[],n=1,r=arguments.length;n<r;n+=1)t.push(n<0||arguments.length<=n?void 0:arguments[n]);return t.forEach((function(t){e=e.replace(/%[a-z]/,t)})),e}function B(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw"production"===process.env.NODE_ENV?new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(n.length>0?" Args: "+n.join(", "):"")):new Error(V.apply(void 0,[k[e]].concat(n)).trim())}var M=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}var t=e.prototype;return t.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},t.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,o=r;e>=o;)(o<<=1)<0&&B(16,""+e);this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var s=r;s<o;s++)this.groupSizes[s]=0}var i=this.indexOfGroup(e+1);if(Array.isArray(t))for(var a=0,c=t.length;a<c;a++)this.tag.insertRule(i,t[a])&&(this.groupSizes[e]++,i++);else this.tag.insertRule(i,t)&&this.groupSizes[e]++},t.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var o=n;o<r;o++)this.tag.deleteRule(n)}},t.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n,s=r;s<o;s++)t+=this.tag.getRule(s)+"/*!sc*/\n";return t},e}(),z=new Map,L=new Map,G=1,F=function(e){if(z.has(e))return z.get(e);for(;L.has(G);)G++;var t=G++;return"production"!==process.env.NODE_ENV&&((0|t)<0||t>1<<30)&&B(16,""+t),z.set(e,t),L.set(t,e),t},Y=function(e){return L.get(e)},q=function(e,t){z.set(e,t),L.set(t,e)},H="style["+R+'][data-styled-version="5.3.0"]',$=new RegExp("^"+R+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),W=function(e,t,n){for(var r,o=n.split(","),s=0,i=o.length;s<i;s++)(r=o[s])&&e.registerName(t,r)},U=function(e,t){for(var n=t.innerHTML.split("/*!sc*/\n"),r=[],o=0,s=n.length;o<s;o++){var i=n[o].trim();if(i){var a=i.match($);if(a){var c=0|parseInt(a[1],10),u=a[2];0!==c&&(q(u,c),W(e,u,a[3]),e.getTag().insertRules(c,r)),r.length=0}else r.push(i)}}},J=function(){return"undefined"!=typeof __webpack_nonce__?__webpack_nonce__:null},X=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(e){for(var t=e.childNodes,n=t.length;n>=0;n--){var r=t[n];if(r&&1===r.nodeType&&r.hasAttribute(R))return r}}(n),s=void 0!==o?o.nextSibling:null;r.setAttribute(R,"active"),r.setAttribute("data-styled-version","5.3.0");var i=J();return i&&r.setAttribute("nonce",i),n.insertBefore(r,s),r},Z=function(){function e(e){var t=this.element=X(e);t.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var o=t[n];if(o.ownerNode===e)return o}B(17)}(t),this.length=0}var t=e.prototype;return t.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},t.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},t.getRule=function(e){var t=this.sheet.cssRules[e];return void 0!==t&&"string"==typeof t.cssText?t.cssText:""},e}(),K=function(){function e(e){var t=this.element=X(e);this.nodes=t.childNodes,this.length=0}var t=e.prototype;return t.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t),r=this.nodes[e];return this.element.insertBefore(n,r||null),this.length++,!0}return!1},t.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},t.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Q=function(){function e(e){this.rules=[],this.length=0}var t=e.prototype;return t.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},t.deleteRule=function(e){this.rules.splice(e,1),this.length--},t.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),ee=j,te={isServer:!j,useCSSOMInjection:!T},ne=function(){function e(e,t,n){void 0===e&&(e=C),void 0===t&&(t={}),this.options=b({},te,e),this.gs=t,this.names=new Map(n),!this.options.isServer&&j&&ee&&(ee=!1,function(e){for(var t=document.querySelectorAll(H),n=0,r=t.length;n<r;n++){var o=t[n];o&&"active"!==o.getAttribute(R)&&(U(e,o),o.parentNode&&o.parentNode.removeChild(o))}}(this))}e.registerId=function(e){return F(e)};var t=e.prototype;return t.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(b({},this.options,t),this.gs,n&&this.names||void 0)},t.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},t.getTag=function(){return this.tag||(this.tag=(n=(t=this.options).isServer,r=t.useCSSOMInjection,o=t.target,e=n?new Q(o):r?new Z(o):new K(o),new M(e)));var e,t,n,r,o},t.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},t.registerName=function(e,t){if(F(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},t.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(F(e),n)},t.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},t.clearRules=function(e){this.getTag().clearGroup(F(e)),this.clearNames(e)},t.clearTag=function(){this.tag=void 0},t.toString=function(){return function(e){for(var t=e.getTag(),n=t.length,r="",o=0;o<n;o++){var s=Y(o);if(void 0!==s){var i=e.names.get(s),a=t.getGroup(o);if(void 0!==i&&0!==a.length){var c=R+".g"+o+'[id="'+s+'"]',u="";void 0!==i&&i.forEach((function(e){e.length>0&&(u+=e+",")})),r+=""+a+c+'{content:"'+u+'"}/*!sc*/\n'}}}return r}(this)},e}(),re=/(a)(d)/gi,oe=function(e){return String.fromCharCode(e+(e>25?39:97))};function se(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=oe(t%52)+n;return(oe(t%52)+n).replace(re,"$1-$2")}var ie=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},ae=function(e){return ie(5381,e)};function ce(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(I(n)&&!O(n))return!1}return!0}var ue=ae("5.3.0"),le=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic="production"===process.env.NODE_ENV&&(void 0===n||n.isStatic)&&ce(e),this.componentId=t,this.baseHash=ie(ue,t),this.baseStyle=n,ne.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.componentId,o=[];if(this.baseStyle&&o.push(this.baseStyle.generateAndInjectStyles(e,t,n)),this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(r,this.staticRulesId))o.push(this.staticRulesId);else{var s=Oe(this.rules,e,t,n).join(""),i=se(ie(this.baseHash,s.length)>>>0);if(!t.hasNameForId(r,i)){var a=n(s,"."+i,void 0,r);t.insertRules(r,i,a)}o.push(i),this.staticRulesId=i}else{for(var c=this.rules.length,u=ie(this.baseHash,n.hash),l="",d=0;d<c;d++){var h=this.rules[d];if("string"==typeof h)l+=h,"production"!==process.env.NODE_ENV&&(u=ie(u,h+d));else if(h){var p=Oe(h,e,t,n),f=Array.isArray(p)?p.join(""):p;u=ie(u,f+d),l+=f}}if(l){var m=se(u>>>0);if(!t.hasNameForId(r,m)){var v=n(l,"."+m,void 0,r);t.insertRules(r,m,v)}o.push(m)}}return o.join(" ")},e}(),de=/^\s*\/\/.*$/gm,he=[":","[",".","#"];function pe(e){var t,n,r,o,s=void 0===e?C:e,i=s.options,a=void 0===i?C:i,c=s.plugins,u=void 0===c?A:c,l=function(e,r,s){return 0===r&&he.includes(s[n.length])||s.match(o)?e:"."+t},d=function(e){e.type===g&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(r,l))};function h(e,s,i,c){void 0===s&&(s=""),void 0===i&&(i=""),void 0===c&&(c="&");var l=e.replace(de,"");t=c,n=s,r=new RegExp("\\"+n+"\\b","g"),o=new RegExp("(\\"+n+"\\b){2,}");var h=u.slice();return(a.prefix||void 0===a.prefix)&&h.push(p),h.push(d,f),m(v(i||s?i+" "+s+" { "+l+" }":l),y(h))}return h.hash=u.length?u.reduce((function(e,t){return t.name||B(15),ie(e,t.name)}),5381).toString():"",h}var fe=r.createContext(),me=fe.Consumer,ve=r.createContext(),ye=(ve.Consumer,new ne),ge=pe();function Se(){return s(fe)||ye}function we(){return s(ve)||ge}function Ee(e){var t=o(e.stylisPlugins),n=t[0],s=t[1],c=Se(),u=i((function(){var t=c;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t}),[e.disableCSSOMInjection,e.sheet,e.target]),l=i((function(){return pe({options:{prefix:!e.disableVendorPrefixes},plugins:n})}),[e.disableVendorPrefixes,n]);return a((function(){h(n,e.stylisPlugins)||s(e.stylisPlugins)}),[e.stylisPlugins]),r.createElement(fe.Provider,{value:u},r.createElement(ve.Provider,{value:l},"production"!==process.env.NODE_ENV?r.Children.only(e.children):e.children))}var be=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=ge);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.toString=function(){return B(12,String(n.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t}return e.prototype.getName=function(e){return void 0===e&&(e=ge),this.name+e.hash},e}(),_e=/([A-Z])/,Ne=/([A-Z])/g,Ae=/^ms-/,Ce=function(e){return"-"+e.toLowerCase()};function Ie(e){return _e.test(e)?e.replace(Ne,Ce).replace(Ae,"-ms-"):e}var Pe=function(e){return null==e||!1===e||""===e};function Oe(e,n,r,o){if(Array.isArray(e)){for(var s,i=[],a=0,c=e.length;a<c;a+=1)""!==(s=Oe(e[a],n,r,o))&&(Array.isArray(s)?i.push.apply(i,s):i.push(s));return i}if(Pe(e))return"";if(O(e))return"."+e.styledComponentId;if(I(e)){if("function"!=typeof(l=e)||l.prototype&&l.prototype.isReactComponent||!n)return e;var u=e(n);return"production"!==process.env.NODE_ENV&&t(u)&&console.error(P(e)+" is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details."),Oe(u,n,r,o)}var l;return e instanceof be?r?(e.inject(r,o),e.getName(o)):e:N(e)?function e(t,n){var r,o,s=[];for(var i in t)t.hasOwnProperty(i)&&!Pe(t[i])&&(N(t[i])?s.push.apply(s,e(t[i],i)):I(t[i])?s.push(Ie(i)+":",t[i],";"):s.push(Ie(i)+": "+(r=i,(null==(o=t[i])||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||r in S?String(o).trim():o+"px")+";")));return n?[n+" {"].concat(s,["}"]):s}(e):e.toString()}function Re(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return I(e)||N(e)?Oe(_(A,[e].concat(n))):0===n.length&&1===e.length&&"string"==typeof e[0]?e:Oe(_(e,n))}var De=/invalid hook call/i,je=new Set,Te=function(e,t){if("production"!==process.env.NODE_ENV){var n="The component "+e+(t?' with the id of "'+t+'"':"")+" has been created dynamically.\nYou may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.";try{c(),je.has(n)||(console.warn(n),je.add(n))}catch(e){De.test(e.message)&&je.delete(n)}}},xe=function(e,t,n){return void 0===n&&(n=C),e.theme!==n.theme&&e.theme||t||n.theme},ke=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"],Ve=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Be=/(^-|-$)/g;function Me(e){return e.replace(Ve,"-").replace(Be,"")}var ze=function(e){return se(ae(e)>>>0)};function Le(e){return"string"==typeof e&&("production"===process.env.NODE_ENV||e.charAt(0)===e.charAt(0).toLowerCase())}var Ge=function(e){return"function"==typeof e||"object"==typeof e&&null!==e&&!Array.isArray(e)},Fe=function(e){return"__proto__"!==e&&"constructor"!==e&&"prototype"!==e};function Ye(e,t,n){var r=e[n];Ge(t)&&Ge(r)?qe(r,t):e[n]=t}function qe(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var o=0,s=n;o<s.length;o++){var i=s[o];if(Ge(i))for(var a in i)Fe(a)&&Ye(e,i[a],a)}return e}var He=r.createContext(),$e=He.Consumer;function We(e){var t=s(He),n=i((function(){return function(e,t){if(!e)return B(14);if(I(e)){var n=e(t);return"production"===process.env.NODE_ENV||null!==n&&!Array.isArray(n)&&"object"==typeof n?n:B(7)}return Array.isArray(e)||"object"!=typeof e?B(8):t?b({},t,e):e}(e.theme,t)}),[e.theme,t]);return e.children?r.createElement(He.Provider,{value:n},e.children):null}var Ue={};function Je(e,t,n){var o=O(e),i=!Le(e),a=t.attrs,c=void 0===a?A:a,d=t.componentId,h=void 0===d?function(e,t){var n="string"!=typeof e?"sc":Me(e);Ue[n]=(Ue[n]||0)+1;var r=n+"-"+ze("5.3.0"+n+Ue[n]);return t?t+"-"+r:r}(t.displayName,t.parentComponentId):d,p=t.displayName,f=void 0===p?function(e){return Le(e)?"styled."+e:"Styled("+P(e)+")"}(e):p,m=t.displayName&&t.componentId?Me(t.displayName)+"-"+t.componentId:t.componentId||h,v=o&&e.attrs?e.attrs.concat(c).filter(Boolean):c,y=t.shouldForwardProp;o&&e.shouldForwardProp&&(y=t.shouldForwardProp?function(n,r){return e.shouldForwardProp(n,r)&&t.shouldForwardProp(n,r)}:e.shouldForwardProp);var g,S=new le(n,m,o?e.componentStyle:void 0),_=S.isStatic&&0===c.length,N=function(e,t){return function(e,t,n,r){var o=e.attrs,i=e.componentStyle,a=e.defaultProps,c=e.foldedComponentIds,d=e.shouldForwardProp,h=e.styledComponentId,p=e.target;"production"!==process.env.NODE_ENV&&l(h);var f=function(e,t,n){void 0===e&&(e=C);var r=b({},t,{theme:e}),o={};return n.forEach((function(e){var t,n,s,i=e;for(t in I(i)&&(i=i(r)),i)r[t]=o[t]="className"===t?(n=o[t],s=i[t],n&&s?n+" "+s:n||s):i[t]})),[r,o]}(xe(t,s(He),a)||C,t,o),m=f[0],v=f[1],y=function(e,t,n,r){var o=Se(),s=we(),i=t?e.generateAndInjectStyles(C,o,s):e.generateAndInjectStyles(n,o,s);return"production"!==process.env.NODE_ENV&&l(i),"production"!==process.env.NODE_ENV&&!t&&r&&r(i),i}(i,r,m,"production"!==process.env.NODE_ENV?e.warnTooManyClasses:void 0),g=n,S=v.$as||t.$as||v.as||t.as||p,E=Le(S),_=v!==t?b({},t,v):t,N={};for(var A in _)"$"!==A[0]&&"as"!==A&&("forwardedAs"===A?N.as=_[A]:(d?d(A,w):!E||w(A))&&(N[A]=_[A]));return t.style&&v.style!==t.style&&(N.style=b({},t.style,v.style)),N[E&&-1===ke.indexOf(S)?"class":"className"]=c.concat(h,y!==h?y:null,t.className,v.className).filter(Boolean).join(" "),N.ref=g,u(S,N)}(g,e,t,_)};return N.displayName=f,(g=r.forwardRef(N)).attrs=v,g.componentStyle=S,g.displayName=f,g.shouldForwardProp=y,g.foldedComponentIds=o?e.foldedComponentIds.concat(e.styledComponentId):A,g.styledComponentId=m,g.target=o?e.target:e,g.withComponent=function(e){var r=t.componentId,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(t,["componentId"]),s=r&&r+"-"+(Le(e)?e:Me(P(e)));return Je(e,b({},o,{attrs:v,componentId:s}),n)},Object.defineProperty(g,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(t){this._foldedDefaultProps=o?qe({},e.defaultProps,t):t}}),"production"!==process.env.NODE_ENV&&(Te(f,m),g.warnTooManyClasses=function(e,t){var n={},r=!1;return function(o){if(!r&&(n[o]=!0,Object.keys(n).length>=200)){var s=t?' with the id of "'+t+'"':"";console.warn("Over 200 classes were generated for component "+e+s+".\nConsider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"),r=!0,n={}}}}(f,m)),g.toString=function(){return"."+g.styledComponentId},i&&E(g,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),g}var Xe=function(e){return function e(t,r,o){if(void 0===o&&(o=C),!n(r))return B(1,String(r));var s=function(){return t(r,o,Re.apply(void 0,arguments))};return s.withConfig=function(n){return e(t,r,b({},o,n))},s.attrs=function(n){return e(t,r,b({},o,{attrs:Array.prototype.concat(o.attrs,n).filter(Boolean)}))},s}(Je,e)};ke.forEach((function(e){Xe[e]=Xe(e)}));var Ze=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=ce(e),ne.registerId(this.componentId+1)}var t=e.prototype;return t.createStyles=function(e,t,n,r){var o=r(Oe(this.rules,t,n,r).join(""),""),s=this.componentId+e;n.insertRules(s,s,o)},t.removeStyles=function(e,t){t.clearRules(this.componentId+e)},t.renderStyles=function(e,t,n,r){e>2&&ne.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},e}();function Ke(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];var i=Re.apply(void 0,[e].concat(n)),a="sc-global-"+ze(JSON.stringify(i)),u=new Ze(i,a);function l(e){var t=Se(),n=we(),o=s(He),l=c(t.allocateGSInstance(a)).current;return"production"!==process.env.NODE_ENV&&r.Children.count(e.children)&&console.warn("The global style component "+a+" was given child JSX. createGlobalStyle does not render children."),"production"!==process.env.NODE_ENV&&i.some((function(e){return"string"==typeof e&&-1!==e.indexOf("@import")}))&&console.warn("Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app."),d((function(){return h(l,e,t,o,n),function(){return u.removeStyles(l,t)}}),[l,e,t,o,n]),null}function h(e,t,n,r,o){if(u.isStatic)u.renderStyles(e,x,n,o);else{var s=b({},t,{theme:xe(t,r,l.defaultProps)});u.renderStyles(e,s,n,o)}}return"production"!==process.env.NODE_ENV&&Te(a),r.memo(l)}function Qe(e){"production"!==process.env.NODE_ENV&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.");for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=Re.apply(void 0,[e].concat(n)).join(""),s=ze(o);return new be(s,o)}var et=function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString(),n=J();return"<style "+[n&&'nonce="'+n+'"',R+'="true"','data-styled-version="5.3.0"'].filter(Boolean).join(" ")+">"+t+"</style>"},this.getStyleTags=function(){return e.sealed?B(2):e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)return B(2);var n=((t={})[R]="",t["data-styled-version"]="5.3.0",t.dangerouslySetInnerHTML={__html:e.instance.toString()},t),o=J();return o&&(n.nonce=o),[r.createElement("style",b({},n,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new ne({isServer:!0}),this.sealed=!1}var t=e.prototype;return t.collectStyles=function(e){return this.sealed?B(2):r.createElement(Ee,{sheet:this.instance},e)},t.interleaveWithNodeStream=function(e){return B(3)},e}(),tt=function(e){var t=r.forwardRef((function(t,n){var o=s(He),i=e.defaultProps,a=xe(t,o,i);return"production"!==process.env.NODE_ENV&&void 0===a&&console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class "'+P(e)+'"'),r.createElement(e,b({},t,{theme:a,ref:n}))}));return E(t,e),t.displayName="WithTheme("+P(e)+")",t},nt=function(){return s(He)},rt={StyleSheet:ne,masterSheet:ye};"production"!==process.env.NODE_ENV&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native"),"production"!==process.env.NODE_ENV&&"test"!==process.env.NODE_ENV&&(window["__styled-components-init__"]=window["__styled-components-init__"]||0,1===window["__styled-components-init__"]&&console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."),window["__styled-components-init__"]+=1);export default Xe;export{et as ServerStyleSheet,me as StyleSheetConsumer,fe as StyleSheetContext,Ee as StyleSheetManager,$e as ThemeConsumer,He as ThemeContext,We as ThemeProvider,rt as __PRIVATE__,Ke as createGlobalStyle,Re as css,O as isStyledComponent,Qe as keyframes,nt as useTheme,D as version,tt as withTheme};
//# sourceMappingURL=styled-components.browser.esm.js.map
