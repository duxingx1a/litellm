(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,721542,e=>{"use strict";var t=e.i(630889);let r=t.forwardRef(function(e,r){return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:r},e),t.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"}))});e.s(["RefreshIcon",0,r],721542)},178611,e=>{"use strict";var t=e.i(630889);let r=t.forwardRef(function(e,r){return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:r},e),t.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"}))});e.s(["TrashIcon",0,r],178611)},17404,e=>{"use strict";var t=e.i(630889);let r=t.forwardRef(function(e,r){return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:r},e),t.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 5l7 7-7 7"}))});e.s(["ChevronRightIcon",0,r],17404)},439092,e=>{"use strict";var t=e.i(630889);let r=t.forwardRef(function(e,r){return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:r},e),t.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"}))});e.s(["PlusCircleIcon",0,r],439092)},1759,e=>{"use strict";var t=e.i(115338),r=e.i(167322);let i=(0,e.i(680327).createQueryKeys)("uiSettings");e.s(["useUISettings",0,()=>(0,r.useQuery)({queryKey:i.list({}),queryFn:async()=>await (0,t.getUiSettings)(),staleTime:36e5,gcTime:36e5})])},588142,(e,t,r)=>{t.exports=e.r(628254)},363601,516278,428242,167322,680327,e=>{"use strict";let t;var r=e.i(115338),i=e.i(448221),o=e.i(568488),a=e.i(889386),n=e.i(472620),s=e.i(252337),l=e.i(388007),u=e.i(958964),c=e.i(226458),d=class extends s.Subscribable{constructor(e,t){super(),this.options=t,this.#e=e,this.#t=null,this.#r=(0,l.pendingThenable)(),this.bindMethods(),this.setOptions(t)}#e;#i=void 0;#o=void 0;#a=void 0;#n;#s;#r;#t;#l;#u;#c;#d;#p;#h;#m=new Set;bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){1===this.listeners.size&&(this.#i.addObserver(this),p(this.#i,this.options)?this.#g():this.updateResult(),this.#f())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return h(this.#i,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return h(this.#i,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.#_(),this.#b(),this.#i.removeObserver(this)}setOptions(e){let t=this.options,r=this.#i;if(this.options=this.#e.defaultQueryOptions(e),void 0!==this.options.enabled&&"boolean"!=typeof this.options.enabled&&"function"!=typeof this.options.enabled&&"boolean"!=typeof(0,u.resolveQueryBoolean)(this.options.enabled,this.#i))throw Error("Expected enabled to be a boolean or a callback that returns a boolean");this.#y(),this.#i.setOptions(this.options),t._defaulted&&!(0,u.shallowEqualObjects)(this.options,t)&&this.#e.getQueryCache().notify({type:"observerOptionsUpdated",query:this.#i,observer:this});let i=this.hasListeners();i&&m(this.#i,r,this.options,t)&&this.#g(),this.updateResult(),i&&(this.#i!==r||(0,u.resolveQueryBoolean)(this.options.enabled,this.#i)!==(0,u.resolveQueryBoolean)(t.enabled,this.#i)||(0,u.resolveStaleTime)(this.options.staleTime,this.#i)!==(0,u.resolveStaleTime)(t.staleTime,this.#i))&&this.#v();let o=this.#w();i&&(this.#i!==r||(0,u.resolveQueryBoolean)(this.options.enabled,this.#i)!==(0,u.resolveQueryBoolean)(t.enabled,this.#i)||o!==this.#h)&&this.#C(o)}getOptimisticResult(e){var t,r;let i=this.#e.getQueryCache().build(this.#e,e),o=this.createResult(i,e);return t=this,r=o,(0,u.shallowEqualObjects)(t.getCurrentResult(),r)||(this.#a=o,this.#s=this.options,this.#n=this.#i.state),o}getCurrentResult(){return this.#a}trackResult(e,t){return new Proxy(e,{get:(e,r)=>(this.trackProp(r),t?.(r),"promise"===r&&(this.trackProp("data"),this.options.experimental_prefetchInRender||"pending"!==this.#r.status||this.#r.reject(Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(e,r))})}trackProp(e){this.#m.add(e)}getCurrentQuery(){return this.#i}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){let t=this.#e.defaultQueryOptions(e),r=this.#e.getQueryCache().build(this.#e,t);return r.fetch().then(()=>this.createResult(r,t))}fetch(e){return this.#g({...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),this.#a))}#g(e){this.#y();let t=this.#i.fetch(this.options,e);return e?.throwOnError||(t=t.catch(u.noop)),t}#v(){this.#_();let e=(0,u.resolveStaleTime)(this.options.staleTime,this.#i);if(o.environmentManager.isServer()||this.#a.isStale||!(0,u.isValidTimeout)(e))return;let t=(0,u.timeUntilStale)(this.#a.dataUpdatedAt,e);this.#d=c.timeoutManager.setTimeout(()=>{this.#a.isStale||this.updateResult()},t+1)}#w(){return("function"==typeof this.options.refetchInterval?this.options.refetchInterval(this.#i):this.options.refetchInterval)??!1}#C(e){this.#b(),this.#h=e,!o.environmentManager.isServer()&&!1!==(0,u.resolveQueryBoolean)(this.options.enabled,this.#i)&&(0,u.isValidTimeout)(this.#h)&&0!==this.#h&&(this.#p=c.timeoutManager.setInterval(()=>{(this.options.refetchIntervalInBackground||i.focusManager.isFocused())&&this.#g()},this.#h))}#f(){this.#v(),this.#C(this.#w())}#_(){void 0!==this.#d&&(c.timeoutManager.clearTimeout(this.#d),this.#d=void 0)}#b(){void 0!==this.#p&&(c.timeoutManager.clearInterval(this.#p),this.#p=void 0)}createResult(e,t){let r,i=this.#i,o=this.options,a=this.#a,s=this.#n,c=this.#s,d=e!==i?e.state:this.#o,{state:h}=e,f={...h},_=!1;if(t._optimisticResults){let r=this.hasListeners(),a=!r&&p(e,t),s=r&&m(e,i,t,o);(a||s)&&(f={...f,...(0,n.fetchState)(h.data,e.options)}),"isRestoring"===t._optimisticResults&&(f.fetchStatus="idle")}let{error:b,errorUpdatedAt:y,status:v}=f;r=f.data;let w=!1;if(void 0!==t.placeholderData&&void 0===r&&"pending"===v){let e;a?.isPlaceholderData&&t.placeholderData===c?.placeholderData?(e=a.data,w=!0):e="function"==typeof t.placeholderData?t.placeholderData(this.#c?.state.data,this.#c):t.placeholderData,void 0!==e&&(v="success",r=(0,u.replaceData)(a?.data,e,t),_=!0)}if(t.select&&void 0!==r&&!w)if(a&&r===s?.data&&t.select===this.#l)r=this.#u;else try{this.#l=t.select,r=t.select(r),r=(0,u.replaceData)(a?.data,r,t),this.#u=r,this.#t=null}catch(e){this.#t=e}this.#t&&(b=this.#t,r=this.#u,y=Date.now(),v="error");let C="fetching"===f.fetchStatus,x="pending"===v,R="error"===v,k=x&&C,I=void 0!==r,E={status:v,fetchStatus:f.fetchStatus,isPending:x,isSuccess:"success"===v,isError:R,isInitialLoading:k,isLoading:k,data:r,dataUpdatedAt:f.dataUpdatedAt,error:b,errorUpdatedAt:y,failureCount:f.fetchFailureCount,failureReason:f.fetchFailureReason,errorUpdateCount:f.errorUpdateCount,isFetched:e.isFetched(),isFetchedAfterMount:f.dataUpdateCount>d.dataUpdateCount||f.errorUpdateCount>d.errorUpdateCount,isFetching:C,isRefetching:C&&!x,isLoadingError:R&&!I,isPaused:"paused"===f.fetchStatus,isPlaceholderData:_,isRefetchError:R&&I,isStale:g(e,t),refetch:this.refetch,promise:this.#r,isEnabled:!1!==(0,u.resolveQueryBoolean)(t.enabled,e)};if(this.options.experimental_prefetchInRender){let t=void 0!==E.data,r="error"===E.status&&!t,o=e=>{r?e.reject(E.error):t&&e.resolve(E.data)},a=()=>{o(this.#r=E.promise=(0,l.pendingThenable)())},n=this.#r;switch(n.status){case"pending":e.queryHash===i.queryHash&&o(n);break;case"fulfilled":(r||E.data!==n.value)&&a();break;case"rejected":r&&E.error===n.reason||a()}}return E}updateResult(){let e=this.#a,t=this.createResult(this.#i,this.options);if(this.#n=this.#i.state,this.#s=this.options,void 0!==this.#n.data&&(this.#c=this.#i),(0,u.shallowEqualObjects)(t,e))return;this.#a=t;let r=()=>{if(!e)return!0;let{notifyOnChangeProps:t}=this.options,r="function"==typeof t?t():t;if("all"===r||!r&&!this.#m.size)return!0;let i=new Set(r??this.#m);return this.options.throwOnError&&i.add("error"),Object.keys(this.#a).some(t=>this.#a[t]!==e[t]&&i.has(t))};this.#x({listeners:r()})}#y(){let e=this.#e.getQueryCache().build(this.#e,this.options);if(e===this.#i)return;let t=this.#i;this.#i=e,this.#o=e.state,this.hasListeners()&&(t?.removeObserver(this),e.addObserver(this))}onQueryUpdate(){this.updateResult(),this.hasListeners()&&this.#f()}#x(e){a.notifyManager.batch(()=>{e.listeners&&this.listeners.forEach(e=>{e(this.#a)}),this.#e.getQueryCache().notify({query:this.#i,type:"observerResultsUpdated"})})}};function p(e,t){return!1!==(0,u.resolveQueryBoolean)(t.enabled,e)&&void 0===e.state.data&&("error"!==e.state.status||!1!==(0,u.resolveQueryBoolean)(t.retryOnMount,e))||void 0!==e.state.data&&h(e,t,t.refetchOnMount)}function h(e,t,r){if(!1!==(0,u.resolveQueryBoolean)(t.enabled,e)&&"static"!==(0,u.resolveStaleTime)(t.staleTime,e)){let i="function"==typeof r?r(e):r;return"always"===i||!1!==i&&g(e,t)}return!1}function m(e,t,r,i){return(e!==t||!1===(0,u.resolveQueryBoolean)(i.enabled,e))&&(!r.suspense||"error"!==e.state.status)&&g(e,r)}function g(e,t){return!1!==(0,u.resolveQueryBoolean)(t.enabled,e)&&e.isStaleByTime((0,u.resolveStaleTime)(t.staleTime,e))}e.s(["QueryObserver",0,d],516278),e.i(843516);var f=e.i(630889),_=e.i(758744);e.i(375614);var b=f.createContext((t=!1,{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t})),y=f.createContext(!1);y.Provider;var v=(e,t,r)=>t.fetchOptimistic(e).catch(()=>{r.clearReset()});function w(e,t,r){let i,n=f.useContext(y),s=f.useContext(b),l=(0,_.useQueryClient)(r),c=l.defaultQueryOptions(e);l.getDefaultOptions().queries?._experimental_beforeQuery?.(c);let d=l.getQueryCache().get(c.queryHash);if(c._optimisticResults=n?"isRestoring":"optimistic",c.suspense){let e=e=>"static"===e?e:Math.max(e??1e3,1e3),t=c.staleTime;c.staleTime="function"==typeof t?(...r)=>e(t(...r)):e(t),"number"==typeof c.gcTime&&(c.gcTime=Math.max(c.gcTime,1e3))}i=d?.state.error&&"function"==typeof c.throwOnError?(0,u.shouldThrowError)(c.throwOnError,[d.state.error,d]):c.throwOnError,(c.suspense||c.experimental_prefetchInRender||i)&&!s.isReset()&&(c.retryOnMount=!1),f.useEffect(()=>{s.clearReset()},[s]);let p=!l.getQueryCache().get(c.queryHash),[h]=f.useState(()=>new t(l,c)),m=h.getOptimisticResult(c),g=!n&&!1!==e.subscribed;if(f.useSyncExternalStore(f.useCallback(e=>{let t=g?h.subscribe(a.notifyManager.batchCalls(e)):u.noop;return h.updateResult(),t},[h,g]),()=>h.getCurrentResult(),()=>h.getCurrentResult()),f.useEffect(()=>{h.setOptions(c)},[c,h]),c?.suspense&&m.isPending)throw v(c,h,s);if((({result:e,errorResetBoundary:t,throwOnError:r,query:i,suspense:o})=>e.isError&&!t.isReset()&&!e.isFetching&&i&&(o&&void 0===e.data||(0,u.shouldThrowError)(r,[e.error,i])))({result:m,errorResetBoundary:s,throwOnError:c.throwOnError,query:d,suspense:c.suspense}))throw m.error;if(l.getDefaultOptions().queries?._experimental_afterQuery?.(c,m),c.experimental_prefetchInRender&&!o.environmentManager.isServer()&&m.isLoading&&m.isFetching&&!n){let e=p?v(c,h,s):d?.promise;e?.catch(u.noop).finally(()=>{h.updateResult()})}return c.notifyOnChangeProps?m:h.trackResult(m)}function C(e,t){return w(e,d,t)}function x(e){let t=[e];return{all:t,lists:()=>[...t,"list"],list:e=>[...t,"list",{params:e}],details:()=>[...t,"detail"],detail:e=>[...t,"detail",e]}}e.s(["useBaseQuery",0,w],428242),e.s(["useQuery",0,C],167322),e.s(["createQueryKeys",0,x],680327);let R=x("uiConfig");e.s(["useUIConfig",0,()=>C({queryKey:R.list({}),queryFn:async()=>await (0,r.getUiConfig)(),staleTime:864e5,gcTime:864e5})],363601)},247982,e=>{"use strict";let t="litellm_return_url",r="redirect_to";function i(){return window.location.href}function o(){if("u"<typeof document)return null;let e=document.cookie.match(RegExp(`(^| )${t}=([^;]+)`));if(e)try{return decodeURIComponent(e[2])}catch{return e[2]}return null}function a(){try{"u">typeof document&&(document.cookie=`${t}=; path=/; max-age=0`)}catch(e){console.error("Failed to clear return URL cookie:",e)}}function n(){return new URLSearchParams(window.location.search).get(r)}function s(){let e=window.location.hostname;return"localhost"===e||"127.0.0.1"===e||"::1"===e||e.startsWith("127.")||e.endsWith(".local")}function l(e){if(!e)return!1;if(e.startsWith("/")&&!e.startsWith("//"))return!0;try{let t=new URL(e),r=window.location.hostname;if(t.hostname!==r)return!1;if(s())return!0;return t.origin===window.location.origin}catch{return!1}}e.s(["buildLoginUrlWithReturn",0,function(e,t){let o=t||i();if(!o||o.includes("/login"))return e;let a=e.includes("?")?"&":"?";return`${e}${a}${r}=${encodeURIComponent(o)}`},"clearStoredReturnUrl",0,a,"consumeReturnUrl",0,function(){let e=n();if(e){if(l(e))return a(),e;s()&&console.warn("[returnUrlUtils] Invalid return URL in params rejected:",e)}let t=o();if(t){if(l(t))return a(),t;s()&&console.warn("[returnUrlUtils] Invalid return URL in cookie rejected:",t)}return null},"getReturnUrl",0,function(){let e=n();if(e)return e;let t=o();return t||null},"isValidReturnUrl",0,l,"normalizeUrlForCompare",0,function(e){try{let t=new URL(e,window.location.origin),r=t.pathname;r.length>1&&r.endsWith("/")&&(r=r.slice(0,-1));let i=new URLSearchParams(t.search),o=new URLSearchParams;Array.from(i.entries()).sort(([e],[t])=>e.localeCompare(t)).forEach(([e,t])=>{o.append(e,t)});let a=o.toString(),n=t.hash||"";return`${t.origin}${r}${a?`?${a}`:""}${n}`}catch{return e}},"storeReturnUrl",0,function(){let e=i();e&&function(e,t,r=300){if("u"<typeof document)return;let i="https:"===window.location.protocol;document.cookie=`${e}=${encodeURIComponent(t)}; path=/; max-age=${r}; SameSite=Lax${i?"; Secure":""}`}(t,e,300)}])},734888,e=>{"use strict";var t=e.i(115338),r=e.i(650422),i=e.i(314087),o=e.i(247982),a=e.i(588142),n=e.i(630889),s=e.i(411556),l=e.i(363601);e.s(["default",0,()=>{let e=(0,a.useRouter)(),{data:u,isLoading:c}=(0,l.useUIConfig)(),d="u">typeof document?(0,r.getCookie)("token"):null,p=(0,n.useMemo)(()=>(0,i.decodeToken)(d),[d]),h=(0,n.useMemo)(()=>(0,i.checkTokenValidity)(d),[d])&&!u?.admin_ui_disabled,m=(0,n.useCallback)(()=>{(0,o.storeReturnUrl)();let r=`${(0,t.getProxyBaseUrl)()}/ui/login`,i=(0,o.buildLoginUrlWithReturn)(r);e.replace(i)},[e]);return(0,n.useEffect)(()=>{!c&&(h||(d&&(0,r.clearTokenCookies)(),m()))},[c,h,d,m]),{isLoading:c,isAuthorized:h,token:h?d:null,accessToken:p?.key??null,userId:p?.user_id??null,userEmail:p?.user_email??null,userRole:(0,s.formatUserRole)(p?.user_role),premiumUser:p?.premium_user??null,disabledPersonalKeyCreation:p?.disabled_non_admin_personal_key_creation??null,showSSOBanner:p?.login_method==="username_password"}}])},222447,556521,e=>{"use strict";var t=e.i(483625);let r={canvasBackground:50,lightBackground:100,background:500,darkBackground:600,darkestBackground:800,lightBorder:200,border:500,darkBorder:700,lightRing:200,ring:300,iconRing:500,lightText:400,text:500,iconText:600,darkText:700,darkestText:900,icon:500},i=[t.BaseColors.Blue,t.BaseColors.Cyan,t.BaseColors.Sky,t.BaseColors.Indigo,t.BaseColors.Violet,t.BaseColors.Purple,t.BaseColors.Fuchsia,t.BaseColors.Slate,t.BaseColors.Gray,t.BaseColors.Zinc,t.BaseColors.Neutral,t.BaseColors.Stone,t.BaseColors.Red,t.BaseColors.Orange,t.BaseColors.Amber,t.BaseColors.Yellow,t.BaseColors.Lime,t.BaseColors.Green,t.BaseColors.Emerald,t.BaseColors.Teal,t.BaseColors.Pink,t.BaseColors.Rose];e.s(["colorPalette",0,r,"themeColorRange",0,i],556521);var o=e.i(348253),a=e.i(813811),n=e.i(630889);let s=n.default.forwardRef((e,t)=>{let{color:i,className:s,children:l}=e;return n.default.createElement("p",{ref:t,className:(0,o.tremorTwMerge)("text-tremor-default",i?(0,a.getColorClassNames)(i,r.text).textColor:(0,o.tremorTwMerge)("text-tremor-content","dark:text-dark-tremor-content"),s)},l)});s.displayName="Text",e.s(["Text",0,s],222447)},972193,e=>{"use strict";var t=e.i(630889);let r=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},i=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim();var o={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let a=(0,t.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:a=2,absoluteStrokeWidth:n,className:s="",children:l,iconNode:u,...c},d)=>(0,t.createElement)("svg",{ref:d,...o,width:r,height:r,stroke:e,strokeWidth:n?24*Number(a)/Number(r):a,className:i("lucide",s),...!l&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(c)&&{"aria-hidden":"true"},...c},[...u.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(l)?l:[l]]));e.s(["default",0,(e,o)=>{let n=(0,t.forwardRef)(({className:n,...s},l)=>(0,t.createElement)(a,{ref:l,iconNode:o,className:i(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,n),...s}));return n.displayName=r(e),n}],972193)},451689,e=>{"use strict";var t=e.i(630889);let r=t.forwardRef(function(e,r){return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:r},e),t.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"}))});e.s(["SwitchVerticalIcon",0,r],451689)},40333,e=>{"use strict";var t=e.i(492256),r=e.i(630889),i=e.i(72284),o=e.i(483625),a=e.i(348253),n=e.i(813811),s=e.i(556521);let l={xs:{paddingX:"px-1.5",paddingY:"py-1.5"},sm:{paddingX:"px-1.5",paddingY:"py-1.5"},md:{paddingX:"px-2",paddingY:"py-2"},lg:{paddingX:"px-2",paddingY:"py-2"},xl:{paddingX:"px-2.5",paddingY:"py-2.5"}},u={xs:{height:"h-3",width:"w-3"},sm:{height:"h-5",width:"w-5"},md:{height:"h-5",width:"w-5"},lg:{height:"h-7",width:"w-7"},xl:{height:"h-9",width:"w-9"}},c={simple:{rounded:"",border:"",ring:"",shadow:""},light:{rounded:"rounded-tremor-default",border:"",ring:"",shadow:""},shadow:{rounded:"rounded-tremor-default",border:"border",ring:"",shadow:"shadow-tremor-card dark:shadow-dark-tremor-card"},solid:{rounded:"rounded-tremor-default",border:"border-2",ring:"ring-1",shadow:""},outlined:{rounded:"rounded-tremor-default",border:"border",ring:"ring-2",shadow:""}},d=(0,n.makeClassName)("Icon"),p=r.default.forwardRef((e,p)=>{let{icon:h,variant:m="simple",tooltip:g,size:f=o.Sizes.SM,color:_,className:b}=e,y=(0,t.__rest)(e,["icon","variant","tooltip","size","color","className"]),v=((e,t)=>{switch(e){case"simple":return{textColor:t?(0,n.getColorClassNames)(t,s.colorPalette.text).textColor:"text-tremor-brand dark:text-dark-tremor-brand",bgColor:"",borderColor:"",ringColor:""};case"light":return{textColor:t?(0,n.getColorClassNames)(t,s.colorPalette.text).textColor:"text-tremor-brand dark:text-dark-tremor-brand",bgColor:t?(0,a.tremorTwMerge)((0,n.getColorClassNames)(t,s.colorPalette.background).bgColor,"bg-opacity-20"):"bg-tremor-brand-muted dark:bg-dark-tremor-brand-muted",borderColor:"",ringColor:""};case"shadow":return{textColor:t?(0,n.getColorClassNames)(t,s.colorPalette.text).textColor:"text-tremor-brand dark:text-dark-tremor-brand",bgColor:t?(0,a.tremorTwMerge)((0,n.getColorClassNames)(t,s.colorPalette.background).bgColor,"bg-opacity-20"):"bg-tremor-background dark:bg-dark-tremor-background",borderColor:"border-tremor-border dark:border-dark-tremor-border",ringColor:""};case"solid":return{textColor:t?(0,n.getColorClassNames)(t,s.colorPalette.text).textColor:"text-tremor-brand-inverted dark:text-dark-tremor-brand-inverted",bgColor:t?(0,a.tremorTwMerge)((0,n.getColorClassNames)(t,s.colorPalette.background).bgColor,"bg-opacity-20"):"bg-tremor-brand dark:bg-dark-tremor-brand",borderColor:"border-tremor-brand-inverted dark:border-dark-tremor-brand-inverted",ringColor:"ring-tremor-ring dark:ring-dark-tremor-ring"};case"outlined":return{textColor:t?(0,n.getColorClassNames)(t,s.colorPalette.text).textColor:"text-tremor-brand dark:text-dark-tremor-brand",bgColor:t?(0,a.tremorTwMerge)((0,n.getColorClassNames)(t,s.colorPalette.background).bgColor,"bg-opacity-20"):"bg-tremor-background dark:bg-dark-tremor-background",borderColor:t?(0,n.getColorClassNames)(t,s.colorPalette.ring).borderColor:"border-tremor-brand-subtle dark:border-dark-tremor-brand-subtle",ringColor:t?(0,a.tremorTwMerge)((0,n.getColorClassNames)(t,s.colorPalette.ring).ringColor,"ring-opacity-40"):"ring-tremor-brand-muted dark:ring-dark-tremor-brand-muted"}}})(m,_),{tooltipProps:w,getReferenceProps:C}=(0,i.useTooltip)();return r.default.createElement("span",Object.assign({ref:(0,n.mergeRefs)([p,w.refs.setReference]),className:(0,a.tremorTwMerge)(d("root"),"inline-flex shrink-0 items-center justify-center",v.bgColor,v.textColor,v.borderColor,v.ringColor,c[m].rounded,c[m].border,c[m].shadow,c[m].ring,l[f].paddingX,l[f].paddingY,b)},C,y),r.default.createElement(i.default,Object.assign({text:g},w)),r.default.createElement(h,{className:(0,a.tremorTwMerge)(d("icon"),"shrink-0",u[f].height,u[f].width)}))});p.displayName="Icon",e.s(["Icon",0,p],40333)},294272,e=>{"use strict";var t=e.i(115338);let r=async e=>{if(!e)return null;try{return await (0,t.getProxyUISettings)(e)}catch(e){return console.error("Error fetching proxy settings:",e),null}};e.s(["fetchProxySettings",0,r])},739648,e=>{"use strict";var t=e.i(294272),r=e.i(167322);let i=(0,e.i(680327).createQueryKeys)("proxySettings"),o={PROXY_BASE_URL:"",PROXY_LOGOUT_URL:"",LITELLM_UI_API_DOC_BASE_URL:null};e.s(["default",0,function(e){let{data:a}=(0,r.useQuery)({queryKey:[...i.all,e],queryFn:()=>(0,t.fetchProxySettings)(e),enabled:!!e});return a??o}])},787806,e=>{"use strict";var t=e.i(630889),r=e.i(115338),i=e.i(363601);let o="litellm_selected_worker_id";e.s(["useWorker",0,()=>{let{data:e}=(0,i.useUIConfig)(),a=e?.is_control_plane??!1,n=e?.workers??[],[s,l]=(0,t.useState)(()=>localStorage.getItem(o));(0,t.useEffect)(()=>{if(!s||0===n.length)return;let e=n.find(e=>e.worker_id===s);e&&(0,r.switchToWorkerUrl)(e.url)},[s,n]);let u=n.find(e=>e.worker_id===s)??null,c=(0,t.useCallback)(e=>{let t=n.find(t=>t.worker_id===e);t&&(l(e),localStorage.setItem(o,e),(0,r.switchToWorkerUrl)(t.url))},[n]);return{isControlPlane:a,workers:n,selectedWorkerId:s,selectedWorker:u,selectWorker:c,disconnectFromWorker:(0,t.useCallback)(()=>{l(null),localStorage.removeItem(o),(0,r.switchToWorkerUrl)(null)},[])}}])},337267,e=>{"use strict";e.i(843516);var t=e.i(553635),r=e.i(630889);let i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M704 446H320c-4.4 0-8 3.6-8 8v402c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8V454c0-4.4-3.6-8-8-8zm-328 64h272v117H376V510zm272 290H376V683h272v117z"}},{tag:"path",attrs:{d:"M424 748a32 32 0 1064 0 32 32 0 10-64 0zm0-178a32 32 0 1064 0 32 32 0 10-64 0z"}},{tag:"path",attrs:{d:"M811.4 368.9C765.6 248 648.9 162 512.2 162S258.8 247.9 213 368.8C126.9 391.5 63.5 470.2 64 563.6 64.6 668 145.6 752.9 247.6 762c4.7.4 8.7-3.3 8.7-8v-60.4c0-4-3-7.4-7-7.9-27-3.4-52.5-15.2-72.1-34.5-24-23.5-37.2-55.1-37.2-88.6 0-28 9.1-54.4 26.2-76.4 16.7-21.4 40.2-36.9 66.1-43.7l37.9-10 13.9-36.7c8.6-22.8 20.6-44.2 35.7-63.5 14.9-19.2 32.6-36 52.4-50 41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.3c19.9 14 37.5 30.8 52.4 50 15.1 19.3 27.1 40.7 35.7 63.5l13.8 36.6 37.8 10c54.2 14.4 92.1 63.7 92.1 120 0 33.6-13.2 65.1-37.2 88.6-19.5 19.2-44.9 31.1-71.9 34.5-4 .5-6.9 3.9-6.9 7.9V754c0 4.7 4.1 8.4 8.8 8 101.7-9.2 182.5-94 183.2-198.2.6-93.4-62.7-172.1-148.6-194.9z"}}]},name:"cloud-server",theme:"outlined"};var o=e.i(258466),a=r.forwardRef(function(e,a){return r.createElement(o.default,(0,t.default)({},e,{ref:a,icon:i}))});e.s(["CloudServerOutlined",0,a],337267)},26084,e=>{"use strict";var t=e.i(53129);e.s(["DownOutlined",()=>t.default])},396612,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let i=e.r(630889);function o(e,t){let r=(0,i.useRef)(null),o=(0,i.useRef)(null);return(0,i.useCallback)(i=>{if(null===i){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=a(e,i)),t&&(o.current=a(t,i))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},628356,e=>{"use strict";e.i(843516);var t=e.i(553635),r=e.i(630889);let i={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64L128 192v384c0 212.1 171.9 384 384 384s384-171.9 384-384V192L512 64zm312 512c0 172.3-139.7 312-312 312S200 748.3 200 576V246l312-110 312 110v330z"}},{tag:"path",attrs:{d:"M378.4 475.1a35.91 35.91 0 00-50.9 0 35.91 35.91 0 000 50.9l129.4 129.4 2.1 2.1a33.98 33.98 0 0048.1 0L730.6 434a33.98 33.98 0 000-48.1l-2.8-2.8a33.98 33.98 0 00-48.1 0L483 579.7 378.4 475.1z"}}]},name:"safety",theme:"outlined"};var o=e.i(258466),a=r.forwardRef(function(e,a){return r.createElement(o.default,(0,t.default)({},e,{ref:a,icon:i}))});e.s(["SafetyOutlined",0,a],628356)},109889,999662,552158,e=>{"use strict";e.i(843516);var t,r,i=e.i(553635),o=e.i(630889);let a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z"}}]},name:"link",theme:"outlined"};var n=e.i(258466),s=o.forwardRef(function(e,t){return o.createElement(n.default,(0,i.default)({},e,{ref:t,icon:a}))});e.s(["LinkOutlined",0,s],109889);var l=((t={}).AUDIO_SPEECH="audio_speech",t.AUDIO_TRANSCRIPTION="audio_transcription",t.IMAGE_GENERATION="image_generation",t.VIDEO_GENERATION="video_generation",t.CHAT="chat",t.RESPONSES="responses",t.IMAGE_EDITS="image_edits",t.ANTHROPIC_MESSAGES="anthropic_messages",t.EMBEDDING="embedding",t),u=((r={}).IMAGE="image",r.VIDEO="video",r.CHAT="chat",r.RESPONSES="responses",r.IMAGE_EDITS="image_edits",r.ANTHROPIC_MESSAGES="anthropic_messages",r.EMBEDDINGS="embeddings",r.SPEECH="speech",r.TRANSCRIPTION="transcription",r.A2A_AGENTS="a2a_agents",r.MCP="mcp",r.REALTIME="realtime",r.INTERACTIONS="interactions",r);let c={image_generation:"image",video_generation:"video",chat:"chat",responses:"responses",image_edits:"image_edits",anthropic_messages:"anthropic_messages",audio_speech:"speech",audio_transcription:"transcription",embedding:"embeddings"};e.s(["EndpointType",()=>u,"getEndpointType",0,e=>{if(console.log("getEndpointType:",e),Object.values(l).includes(e)){let t=c[e];return console.log("endpointType:",t),t}return"chat"}],999662),e.s(["generateCodeSnippet",0,e=>{let t,{apiKeySource:r,accessToken:i,apiKey:o,inputMessage:a,chatHistory:n,selectedTags:s,selectedVectorStores:l,selectedGuardrails:c,selectedPolicies:d,selectedMCPServers:p,mcpServers:h,mcpServerToolRestrictions:m,selectedVoice:g,endpointType:f,selectedModel:_,selectedSdk:b,proxySettings:y}=e,v="session"===r?i:o,w=window.location.origin,C=y?.LITELLM_UI_API_DOC_BASE_URL;C&&C.trim()?w=C:y?.PROXY_BASE_URL&&(w=y.PROXY_BASE_URL);let x=a||"Your prompt here",R=x.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n"),k=n.filter(e=>!e.isImage).map(({role:e,content:t})=>({role:e,content:t})),I={};s.length>0&&(I.tags=s),l.length>0&&(I.vector_stores=l),c.length>0&&(I.guardrails=c),d.length>0&&(I.policies=d);let E=_||"your-model-name",T="azure"===b?`import openai

client = openai.AzureOpenAI(
	api_key="${v||"YOUR_LITELLM_API_KEY"}",
	azure_endpoint="${w}",
	api_version="2024-02-01"
)`:`import openai

client = openai.OpenAI(
	api_key="${v||"YOUR_LITELLM_API_KEY"}",
	base_url="${w}"
)`;switch(f){case u.CHAT:{let e=Object.keys(I).length>0,r="";if(e){let e=JSON.stringify({metadata:I},null,2).split("\n").map(e=>" ".repeat(4)+e).join("\n").trim();r=`,
    extra_body=${e}`}let i=k.length>0?k:[{role:"user",content:x}];t=`
import base64

# Helper function to encode images to base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Example with text only
response = client.chat.completions.create(
    model="${E}",
    messages=${JSON.stringify(i,null,4)}${r}
)

print(response)

# Example with image or PDF (uncomment and provide file path to use)
# base64_file = encode_image("path/to/your/file.jpg")  # or .pdf
# response_with_file = client.chat.completions.create(
#     model="${E}",
#     messages=[
#         {
#             "role": "user",
#             "content": [
#                 {
#                     "type": "text",
#                     "text": "${R}"
#                 },
#                 {
#                     "type": "image_url",
#                     "image_url": {
#                         "url": f"data:image/jpeg;base64,{base64_file}"  # or data:application/pdf;base64,{base64_file}
#                     }
#                 }
#             ]
#         }
#     ]${r}
# )
# print(response_with_file)
`;break}case u.RESPONSES:{let e=Object.keys(I).length>0,r="";if(e){let e=JSON.stringify({metadata:I},null,2).split("\n").map(e=>" ".repeat(4)+e).join("\n").trim();r=`,
    extra_body=${e}`}let i=k.length>0?k:[{role:"user",content:x}];t=`
import base64

# Helper function to encode images to base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Example with text only
response = client.responses.create(
    model="${E}",
    input=${JSON.stringify(i,null,4)}${r}
)

print(response.output_text)

# Example with image or PDF (uncomment and provide file path to use)
# base64_file = encode_image("path/to/your/file.jpg")  # or .pdf
# response_with_file = client.responses.create(
#     model="${E}",
#     input=[
#         {
#             "role": "user",
#             "content": [
#                 {"type": "input_text", "text": "${R}"},
#                 {
#                     "type": "input_image",
#                     "image_url": f"data:image/jpeg;base64,{base64_file}",  # or data:application/pdf;base64,{base64_file}
#                 },
#             ],
#         }
#     ]${r}
# )
# print(response_with_file.output_text)
`;break}case u.IMAGE:t="azure"===b?`
# NOTE: The Azure SDK does not have a direct equivalent to the multi-modal 'responses.create' method shown for OpenAI.
# This snippet uses 'client.images.generate' and will create a new image based on your prompt.
# It does not use the uploaded image, as 'client.images.generate' does not support image inputs in this context.
import os
import requests
import json
import time
from PIL import Image

result = client.images.generate(
	model="${E}",
	prompt="${a}",
	n=1
)

json_response = json.loads(result.model_dump_json())

# Set the directory for the stored image
image_dir = os.path.join(os.curdir, 'images')

# If the directory doesn't exist, create it
if not os.path.isdir(image_dir):
	os.mkdir(image_dir)

# Initialize the image path
image_filename = f"generated_image_{int(time.time())}.png"
image_path = os.path.join(image_dir, image_filename)

try:
	# Retrieve the generated image
	if json_response.get("data") && len(json_response["data"]) > 0 && json_response["data"][0].get("url"):
			image_url = json_response["data"][0]["url"]
			generated_image = requests.get(image_url).content
			with open(image_path, "wb") as image_file:
					image_file.write(generated_image)

			print(f"Image saved to {image_path}")
			# Display the image
			image = Image.open(image_path)
			image.show()
	else:
			print("Could not find image URL in response.")
			print("Full response:", json_response)
except Exception as e:
	print(f"An error occurred: {e}")
	print("Full response:", json_response)
`:`
import base64
import os
import time
import json
from PIL import Image
import requests

# Helper function to encode images to base64
def encode_image(image_path):
	with open(image_path, "rb") as image_file:
			return base64.b64encode(image_file.read()).decode('utf-8')

# Helper function to create a file (simplified for this example)
def create_file(image_path):
	# In a real implementation, this would upload the file to OpenAI
	# For this example, we'll just return a placeholder ID
	return f"file_{os.path.basename(image_path).replace('.', '_')}"

# The prompt entered by the user
prompt = "${R}"

# Encode images to base64
base64_image1 = encode_image("body-lotion.png")
base64_image2 = encode_image("soap.png")

# Create file IDs
file_id1 = create_file("body-lotion.png")
file_id2 = create_file("incense-kit.png")

response = client.responses.create(
	model="${E}",
	input=[
			{
					"role": "user",
					"content": [
							{"type": "input_text", "text": prompt},
							{
									"type": "input_image",
									"image_url": f"data:image/jpeg;base64,{base64_image1}",
							},
							{
									"type": "input_image",
									"image_url": f"data:image/jpeg;base64,{base64_image2}",
							},
							{
									"type": "input_image",
									"file_id": file_id1,
							},
							{
									"type": "input_image",
									"file_id": file_id2,
							}
					],
			}
	],
	tools=[{"type": "image_generation"}],
)

# Process the response
image_generation_calls = [
	output
	for output in response.output
	if output.type == "image_generation_call"
]

image_data = [output.result for output in image_generation_calls]

if image_data:
	image_base64 = image_data[0]
	image_filename = f"edited_image_{int(time.time())}.png"
	with open(image_filename, "wb") as f:
			f.write(base64.b64decode(image_base64))
	print(f"Image saved to {image_filename}")
else:
	# If no image is generated, there might be a text response with an explanation
	text_response = [output.text for output in response.output if hasattr(output, 'text')]
	if text_response:
			print("No image generated. Model response:")
			print("\\n".join(text_response))
	else:
			print("No image data found in response.")
	print("Full response for debugging:")
	print(response)
`;break;case u.IMAGE_EDITS:t="azure"===b?`
import base64
import os
import time
import json
from PIL import Image
import requests

# Helper function to encode images to base64
def encode_image(image_path):
	with open(image_path, "rb") as image_file:
			return base64.b64encode(image_file.read()).decode('utf-8')

# The prompt entered by the user
prompt = "${R}"

# Encode images to base64
base64_image1 = encode_image("body-lotion.png")
base64_image2 = encode_image("soap.png")

# Create file IDs
file_id1 = create_file("body-lotion.png")
file_id2 = create_file("incense-kit.png")

response = client.responses.create(
	model="${E}",
	input=[
			{
					"role": "user",
					"content": [
							{"type": "input_text", "text": prompt},
							{
									"type": "input_image",
									"image_url": f"data:image/jpeg;base64,{base64_image1}",
							},
							{
									"type": "input_image",
									"image_url": f"data:image/jpeg;base64,{base64_image2}",
							},
							{
									"type": "input_image",
									"file_id": file_id1,
							},
							{
									"type": "input_image",
									"file_id": file_id2,
							}
					],
			}
	],
	tools=[{"type": "image_generation"}],
)

# Process the response
image_generation_calls = [
	output
	for output in response.output
	if output.type == "image_generation_call"
]

image_data = [output.result for output in image_generation_calls]

if image_data:
	image_base64 = image_data[0]
	image_filename = f"edited_image_{int(time.time())}.png"
	with open(image_filename, "wb") as f:
			f.write(base64.b64decode(image_base64))
	print(f"Image saved to {image_filename}")
else:
	# If no image is generated, there might be a text response with an explanation
	text_response = [output.text for output in response.output if hasattr(output, 'text')]
	if text_response:
			print("No image generated. Model response:")
			print("\\n".join(text_response))
	else:
			print("No image data found in response.")
	print("Full response for debugging:")
	print(response)
`:`
import base64
import os
import time

# Helper function to encode images to base64
def encode_image(image_path):
	with open(image_path, "rb") as image_file:
			return base64.b64encode(image_file.read()).decode('utf-8')

# Helper function to create a file (simplified for this example)
def create_file(image_path):
	# In a real implementation, this would upload the file to OpenAI
	# For this example, we'll just return a placeholder ID
	return f"file_{os.path.basename(image_path).replace('.', '_')}"

# The prompt entered by the user
prompt = "${R}"

# Encode images to base64
base64_image1 = encode_image("body-lotion.png")
base64_image2 = encode_image("soap.png")

# Create file IDs
file_id1 = create_file("body-lotion.png")
file_id2 = create_file("incense-kit.png")

response = client.responses.create(
	model="${E}",
	input=[
			{
					"role": "user",
					"content": [
							{"type": "input_text", "text": prompt},
							{
									"type": "input_image",
									"image_url": f"data:image/jpeg;base64,{base64_image1}",
							},
							{
									"type": "input_image",
									"image_url": f"data:image/jpeg;base64,{base64_image2}",
							},
							{
									"type": "input_image",
									"file_id": file_id1,
							},
							{
									"type": "input_image",
									"file_id": file_id2,
							}
					],
			}
	],
	tools=[{"type": "image_generation"}],
)

# Process the response
image_generation_calls = [
	output
	for output in response.output
	if output.type == "image_generation_call"
]

image_data = [output.result for output in image_generation_calls]

if image_data:
	image_base64 = image_data[0]
	image_filename = f"edited_image_{int(time.time())}.png"
	with open(image_filename, "wb") as f:
			f.write(base64.b64decode(image_base64))
	print(f"Image saved to {image_filename}")
else:
	# If no image is generated, there might be a text response with an explanation
	text_response = [output.text for output in response.output if hasattr(output, 'text')]
	if text_response:
			print("No image generated. Model response:")
			print("\\n".join(text_response))
	else:
			print("No image data found in response.")
	print("Full response for debugging:")
	print(response)
`;break;case u.EMBEDDINGS:t=`
response = client.embeddings.create(
	input="${a||"Your string here"}",
	model="${E}",
	encoding_format="base64" # or "float"
)

print(response.data[0].embedding)
`;break;case u.TRANSCRIPTION:t=`
# Open the audio file
audio_file = open("path/to/your/audio/file.mp3", "rb")

# Make the transcription request
response = client.audio.transcriptions.create(
	model="${E}",
	file=audio_file${a?`,
	prompt="${a.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`:""}
)

print(response.text)
`;break;case u.SPEECH:t=`
# Make the text-to-speech request
response = client.audio.speech.create(
	model="${E}",
	input="${a||"Your text to convert to speech here"}",
	voice="${g}"  # Options: alloy, ash, ballad, coral, echo, fable, nova, onyx, sage, shimmer
)

# Save the audio to a file
output_filename = "output_speech.mp3"
response.stream_to_file(output_filename)
print(f"Audio saved to {output_filename}")

# Optional: Customize response format and speed
# response = client.audio.speech.create(
#     model="${E}",
#     input="${a||"Your text to convert to speech here"}",
#     voice="alloy",
#     response_format="mp3",  # Options: mp3, opus, aac, flac, wav, pcm
#     speed=1.0  # Range: 0.25 to 4.0
# )
# response.stream_to_file("output_speech.mp3")
`;break;default:t="\n# Code generation for this endpoint is not implemented yet."}return`${T}
${t}`}],552158)},918989,251700,78603,e=>{"use strict";var t=e.i(375614),r=e.i(630889);let i=r.forwardRef(function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"}))});e.s(["PencilAltIcon",0,i],251700);let o=r.forwardRef(function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"}),r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 12a9 9 0 11-18 0 9 9 0 0118 0z"}))});e.s(["PlayIcon",0,o],78603);var a=e.i(721542),n=e.i(178611),s=e.i(780515),l=e.i(14086),u=e.i(453684);let c=r.forwardRef(function(e,t){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:t},e),r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"}))});var d=e.i(394784),p=e.i(811189),h=e.i(40333);function m({icon:e,onClick:r,className:i,disabled:o,dataTestId:a}){return o?(0,t.jsx)(h.Icon,{icon:e,size:"sm",className:"opacity-50 cursor-not-allowed","data-testid":a}):(0,t.jsx)(h.Icon,{icon:e,size:"sm",onClick:r,className:(0,p.cx)("cursor-pointer",i),"data-testid":a})}let g={Edit:{icon:i,className:"hover:text-blue-600"},Delete:{icon:n.TrashIcon,className:"hover:text-red-600"},Test:{icon:o,className:"hover:text-blue-600"},Regenerate:{icon:a.RefreshIcon,className:"hover:text-green-600"},Up:{icon:s.ChevronUpIcon,className:"hover:text-blue-600"},Down:{icon:l.ChevronDownIcon,className:"hover:text-blue-600"},Open:{icon:u.ExternalLinkIcon,className:"hover:text-green-600"},Copy:{icon:c,className:"hover:text-blue-600"}};e.s(["default",0,function({onClick:e,tooltipText:r,disabled:i=!1,disabledTooltipText:o,dataTestId:a,variant:n}){let{icon:s,className:l}=g[n];return(0,t.jsx)(d.Tooltip,{title:i?o:r,children:(0,t.jsx)("span",{children:(0,t.jsx)(m,{icon:s,onClick:e,className:l,disabled:i,dataTestId:a})})})}],918989)}]);