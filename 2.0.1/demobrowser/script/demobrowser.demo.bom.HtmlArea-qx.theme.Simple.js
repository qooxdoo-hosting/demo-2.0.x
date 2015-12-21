(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"locale":"en","locale.variant":"US","qx.allowUrlSettings":true,"qx.allowUrlVariants":true,"qx.application":"demobrowser.demo.bom.HtmlArea","qx.optimization.basecalls":true,"qx.optimization.privates":true,"qx.optimization.strings":true,"qx.optimization.variables":true,"qx.optimization.whitespace":true,"qx.theme":"qx.theme.Simple"};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"../../script"},"demobrowser.demo":{"resourceUri":"../../resource","sourceUri":"../../script"},"qx":{"resourceUri":"../../resource","sourceUri":"../../script","sourceViewUri":"https://github.com/qooxdoo/qooxdoo/blob/%{qxGitBranch}/framework/source/class/%{classFilePath}#L%{lineNumber}"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {"C":null,"de":null,"de_DE":null,"en":null,"en_US":null,"fr":null,"fr_FR":null};
qx.$$locales = {"C":null,"de":null,"de_DE":null,"en":null,"en_US":null,"fr":null,"fr_FR":null};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"boot":[0]},
  packages : {"0":{"uris":["__out__:demobrowser.demo.bom.HtmlArea-qx.theme.Simple.12ffd02b8f42.js"]}},
  urisBefore : [],
  cssBefore : [],
  boot : "boot",
  closureParts : {},
  bootIsInline : true,
  addNoCacheParam : true,
  
  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length==2 && uri[0] in libs) {
        var prefix = libs[uri[0]].sourceUri;
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      if (qx.$$loader.addNoCacheParam) {
        euri += "?nocache=" + Math.random();
      }
      
      uris.push(euri);
    }
    return uris;      
  }
};  

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function() {
    if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
      elem.onreadystatechange = elem.onload = null;
      if (typeof callback === "function") {
        callback();
      }
    }
  };

  if (isLoadParallel) {
    elem.async = null;
  }

  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

function loadCss(uri) {
  var elem = document.createElement("link");
  elem.rel = "stylesheet";
  elem.type= "text/css";
  elem.href= uri;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);
var isLoadParallel = 'async' in document.createElement('script');

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }

  var item;

  if (isLoadParallel) {
    while (list.length) {
      item = list.shift();
      if (list.length) {
        loadScript(item);
      } else {
        loadScript(item, callback);
      }
    }
  } else {
    item = list.shift();
    loadScript(item,  function() {
      if (isWebkit) {
        // force async, else Safari fails with a "maximum recursion depth exceeded"
        window.setTimeout(function() {
          loadScriptList(list, callback);
        }, 0);
      } else {
        loadScriptList(list, callback);
      }
    });
  }
}

var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

qx.$$loader.importPackageData = function (dataMap, callback) {
  if (dataMap["resources"]){
    var resMap = dataMap["resources"];
    for (var k in resMap) qx.$$resources[k] = resMap[k];
  }
  if (dataMap["locales"]){
    var locMap = dataMap["locales"];
    var qxlocs = qx.$$locales;
    for (var lang in locMap){
      if (!qxlocs[lang]) qxlocs[lang] = locMap[lang];
      else 
        for (var k in locMap[lang]) qxlocs[lang][k] = locMap[lang][k];
    }
  }
  if (dataMap["translations"]){
    var trMap   = dataMap["translations"];
    var qxtrans = qx.$$translations;
    for (var lang in trMap){
      if (!qxtrans[lang]) qxtrans[lang] = trMap[lang];
      else 
        for (var k in trMap[lang]) qxtrans[lang][k] = trMap[lang][k];
    }
  }
  if (callback){
    callback(dataMap);
  }
}

qx.$$loader.signalStartup = function () 
{
  qx.$$loader.scriptLoaded = true;
  if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) {
    qx.event.handler.Application.onScriptLoaded();
    qx.$$loader.applicationHandlerReady = true; 
  } else {
    qx.$$loader.applicationHandlerReady = false;
  }
}

// Load all stuff
qx.$$loader.init = function(){
  var l=qx.$$loader;
  if (l.cssBefore.length>0) {
    for (var i=0, m=l.cssBefore.length; i<m; i++) {
      loadCss(l.cssBefore[i]);
    }
  }
  if (l.urisBefore.length>0){
    loadScriptList(l.urisBefore, function(){
      l.initUris();
    });
  } else {
    l.initUris();
  }
}

// Load qooxdoo boot stuff
qx.$$loader.initUris = function(){
  var l=qx.$$loader;
  var bootPackageHash=l.parts[l.boot][0];
  if (l.bootIsInline){
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    l.signalStartup();
  } else {
    loadScriptList(l.decodeUris(l.packages[l.parts[l.boot][0]].uris), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash] || {});
        l.signalStartup();
      }, 0);
    });
  }
}
})();

qx.$$packageData['0']={"locales":{},"resources":{"demobrowser/demo/icons/htmlarea/format-fill-color.png":[16,16,"png","demobrowser.demo"],"demobrowser/demo/icons/htmlarea/format-list-ordered.png":[16,16,"png","demobrowser.demo"],"demobrowser/demo/icons/htmlarea/format-list-unordered.png":[16,16,"png","demobrowser.demo"],"demobrowser/demo/icons/htmlarea/format-text-color.png":[16,16,"png","demobrowser.demo"],"demobrowser/demo/icons/htmlarea/insert-horizontal-rule.png":[16,16,"png","demobrowser.demo"],"demobrowser/demo/icons/htmlarea/insert-table.png":[16,16,"png","demobrowser.demo"],"demobrowser/demo/icons/htmlarea/insert-text.png":[16,16,"png","demobrowser.demo"],"demobrowser/demo/icons/htmlarea/qooxdoo_logo.png":[136,41,"png","demobrowser.demo"],"qx/decoration/Simple/arrows/down-invert.gif":[7,4,"gif","qx"],"qx/decoration/Simple/arrows/down-small.gif":[5,3,"gif","qx"],"qx/decoration/Simple/arrows/down.gif":[7,4,"gif","qx"],"qx/decoration/Simple/arrows/forward.gif":[8,7,"gif","qx"],"qx/decoration/Simple/arrows/left-invert.gif":[4,7,"gif","qx"],"qx/decoration/Simple/arrows/left.gif":[4,7,"gif","qx"],"qx/decoration/Simple/arrows/rewind.gif":[8,7,"gif","qx"],"qx/decoration/Simple/arrows/right-invert.gif":[4,7,"gif","qx"],"qx/decoration/Simple/arrows/right.gif":[4,7,"gif","qx"],"qx/decoration/Simple/arrows/up-invert.gif":[7,4,"gif","qx"],"qx/decoration/Simple/arrows/up-small.gif":[5,3,"gif","qx"],"qx/decoration/Simple/arrows/up.gif":[7,4,"gif","qx"],"qx/decoration/Simple/checkbox/checked-disabled.png":[6,6,"png","qx"],"qx/decoration/Simple/checkbox/checked.png":[6,6,"png","qx"],"qx/decoration/Simple/checkbox/undetermined-disabled.png":[6,2,"png","qx"],"qx/decoration/Simple/checkbox/undetermined.png":[6,2,"png","qx"],"qx/decoration/Simple/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Simple/colorselector/brightness-handle.gif":[35,11,"gif","qx"],"qx/decoration/Simple/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Simple/colorselector/huesaturation-handle.gif":[11,11,"gif","qx"],"qx/decoration/Simple/cursors/alias.gif":[19,15,"gif","qx"],"qx/decoration/Simple/cursors/copy.gif":[19,15,"gif","qx"],"qx/decoration/Simple/cursors/move.gif":[13,9,"gif","qx"],"qx/decoration/Simple/cursors/nodrop.gif":[20,20,"gif","qx"],"qx/decoration/Simple/menu/checkbox-invert.gif":[16,7,"gif","qx"],"qx/decoration/Simple/menu/checkbox.gif":[16,7,"gif","qx"],"qx/decoration/Simple/menu/radiobutton-invert.gif":[16,5,"gif","qx"],"qx/decoration/Simple/menu/radiobutton.gif":[16,5,"gif","qx"],"qx/decoration/Simple/splitpane/knob-horizontal.png":[1,8,"png","qx"],"qx/decoration/Simple/splitpane/knob-vertical.png":[8,1,"png","qx"],"qx/decoration/Simple/table/ascending-invert.png":[10,10,"png","qx"],"qx/decoration/Simple/table/ascending.png":[10,10,"png","qx"],"qx/decoration/Simple/table/boolean-false.png":[11,11,"png","qx"],"qx/decoration/Simple/table/boolean-true.png":[11,11,"png","qx"],"qx/decoration/Simple/table/descending-invert.png":[10,10,"png","qx"],"qx/decoration/Simple/table/descending.png":[10,10,"png","qx"],"qx/decoration/Simple/table/select-column-order.png":[10,9,"png","qx"],"qx/decoration/Simple/tabview/close.gif":[10,9,"gif","qx"],"qx/decoration/Simple/tree/minus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/tree/plus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/cross.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/cross_minus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/cross_plus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/end.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/end_minus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/end_plus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/line.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/only_minus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/only_plus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/start.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/start_minus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/start_plus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/window/close-white.gif":[10,9,"gif","qx"],"qx/decoration/Simple/window/close.gif":[10,9,"gif","qx"],"qx/decoration/Simple/window/maximize-white.gif":[9,9,"gif","qx"],"qx/decoration/Simple/window/maximize.gif":[9,9,"gif","qx"],"qx/decoration/Simple/window/minimize-white.gif":[9,9,"gif","qx"],"qx/decoration/Simple/window/minimize.gif":[9,9,"gif","qx"],"qx/decoration/Simple/window/restore-white.gif":[8,9,"gif","qx"],"qx/decoration/Simple/window/restore.gif":[8,9,"gif","qx"],"qx/icon/Oxygen/16/actions/edit-clear.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/edit-copy.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/edit-cut.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/edit-delete.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/edit-find.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/edit-paste.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/edit-redo.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/edit-select-all.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/edit-undo.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/format-indent-less.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/format-indent-more.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/format-justify-center.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/format-justify-fill.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/format-justify-left.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/format-justify-right.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/format-text-bold.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/format-text-direction-ltr.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/format-text-direction-rtl.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/format-text-italic.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/format-text-strikethrough.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/format-text-underline.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/insert-image.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/insert-link.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/insert-text.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/text-plain.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/static/blank.html":"qx"},"translations":{"C":{},"de":{},"de_DE":{},"en":{},"en_US":{},"fr":{},"fr_FR":{}}};
(function(){var m=".prototype",k="function",j="Boolean",h="Error",g="constructor",f="warn",e="default",d="hasOwnProperty",c="string",b="toLocaleString",K="RegExp",J='\", "',I="info",H="BROKEN_IE",G="isPrototypeOf",F="Date",E="qx.Bootstrap",D="]",C="Class",B="error",t="[Class ",u="valueOf",r="Number",s="debug",p="ES5",q="Object",n='"',o="",v="Array",w="()",y="String",x="Function",A="toString",z=".";if(!window.qx){window.qx={};}
;qx.Bootstrap={genericToString:function(){return t+this.classname+D;}
,createNamespace:function(name,L){var N=name.split(z);var parent=window;var M=N[0];for(var i=0,O=N.length-1;i<O;i++,M=N[i]){if(!parent[M]){parent=parent[M]={};}
else {parent=parent[M];}
;}
;parent[M]=L;return M;}
,setDisplayName:function(P,Q,name){P.displayName=Q+z+name+w;}
,setDisplayNames:function(R,S){for(var name in R){var T=R[name];if(T instanceof Function){T.displayName=S+z+name+w;}
;}
;}
,define:function(name,U){if(!U){var U={statics:{}};}
;var ba;var X=null;qx.Bootstrap.setDisplayNames(U.statics,name);if(U.members||U.extend){qx.Bootstrap.setDisplayNames(U.members,name+m);ba=U.construct||new Function;if(U.extend){this.extendClass(ba,ba,U.extend,name,Y);}
;var V=U.statics||{};for(var i=0,bb=qx.Bootstrap.getKeys(V),l=bb.length;i<l;i++){var bc=bb[i];ba[bc]=V[bc];}
;X=ba.prototype;var W=U.members||{};for(var i=0,bb=qx.Bootstrap.getKeys(W),l=bb.length;i<l;i++){var bc=bb[i];X[bc]=W[bc];}
;}
else {ba=U.statics||{};}
;var Y=name?this.createNamespace(name,ba):o;ba.name=ba.classname=name;ba.basename=Y;ba.$$type=C;if(!ba.hasOwnProperty(A)){ba.toString=this.genericToString;}
;if(U.defer){U.defer(ba,X);}
;qx.Bootstrap.$$registry[name]=ba;return ba;}
};qx.Bootstrap.define(E,{statics:{LOADSTART:qx.$$start||new Date(),DEBUG:(function(){var bd=true;if(qx.$$environment&&qx.$$environment["qx.debug"]===false){bd=false;}
;return bd;}
)(),getEnvironmentSetting:function(be){if(qx.$$environment){return qx.$$environment[be];}
;}
,setEnvironmentSetting:function(bf,bg){if(!qx.$$environment){qx.$$environment={};}
;if(qx.$$environment[bf]===undefined){qx.$$environment[bf]=bg;}
;}
,createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(bh,bi,bj,name,bk){var bn=bj.prototype;var bm=new Function;bm.prototype=bn;var bl=new bm;bh.prototype=bl;bl.name=bl.classname=name;bl.basename=bk;bi.base=bh.superclass=bj;bi.self=bh.constructor=bl.constructor=bh;}
,getByName:function(name){return qx.Bootstrap.$$registry[name];}
,$$registry:{},objectGetLength:function(bo){var length=0;for(var bp in bo){length++;}
;return length;}
,objectMergeWith:function(bq,br,bs){if(bs===undefined){bs=true;}
;for(var bt in br){if(bs||bq[bt]===undefined){bq[bt]=br[bt];}
;}
;return bq;}
,__a:[G,d,b,A,u,g],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(bu){var bv=[];var bx=Object.prototype.hasOwnProperty;for(var by in bu){if(bx.call(bu,by)){bv.push(by);}
;}
;var bw=qx.Bootstrap.__a;for(var i=0,a=bw,l=a.length;i<l;i++){if(bx.call(bu,a[i])){bv.push(a[i]);}
;}
;return bv;}
,"default":function(bz){var bA=[];var bB=Object.prototype.hasOwnProperty;for(var bC in bz){if(bB.call(bz,bC)){bA.push(bC);}
;}
;return bA;}
})[typeof (Object.keys)==k?p:(function(){for(var bD in {toString:1}){return bD;}
;}
)()!==A?H:e],getKeysAsString:function(bE){var bF=qx.Bootstrap.getKeys(bE);if(bF.length==0){return o;}
;return n+bF.join(J)+n;}
,__b:{"[object String]":y,"[object Array]":v,"[object Object]":q,"[object RegExp]":K,"[object Number]":r,"[object Boolean]":j,"[object Date]":F,"[object Function]":x,"[object Error]":h},bind:function(bG,self,bH){var bI=Array.prototype.slice.call(arguments,2,arguments.length);return function(){var bJ=Array.prototype.slice.call(arguments,0,arguments.length);return bG.apply(self,bI.concat(bJ));}
;}
,firstUp:function(bK){return bK.charAt(0).toUpperCase()+bK.substr(1);}
,firstLow:function(bL){return bL.charAt(0).toLowerCase()+bL.substr(1);}
,getClass:function(bM){var bN=Object.prototype.toString.call(bM);return (qx.Bootstrap.__b[bN]||bN.slice(8,-1));}
,isString:function(bO){return (bO!==null&&(typeof bO===c||qx.Bootstrap.getClass(bO)==y||bO instanceof String||(!!bO&&!!bO.$$isString)));}
,isArray:function(bP){return (bP!==null&&(bP instanceof Array||(bP&&qx.data&&qx.data.IListData&&qx.util.OOUtil.hasInterface(bP.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bP)==v||(!!bP&&!!bP.$$isArray)));}
,isObject:function(bQ){return (bQ!==undefined&&bQ!==null&&qx.Bootstrap.getClass(bQ)==q);}
,isFunction:function(bR){return qx.Bootstrap.getClass(bR)==x;}
,$$logs:[],debug:function(bS,bT){qx.Bootstrap.$$logs.push([s,arguments]);}
,info:function(bU,bV){qx.Bootstrap.$$logs.push([I,arguments]);}
,warn:function(bW,bX){qx.Bootstrap.$$logs.push([f,arguments]);}
,error:function(bY,ca){qx.Bootstrap.$$logs.push([B,arguments]);}
,trace:function(cb){}
}});}
)();
(function(){var a="qx.util.OOUtil";qx.Bootstrap.define(a,{statics:{classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;}
,getPropertyDefinition:function(b,name){while(b){if(b.$$properties&&b.$$properties[name]){return b.$$properties[name];}
;b=b.superclass;}
;return null;}
,hasProperty:function(c,name){return !!qx.util.OOUtil.getPropertyDefinition(c,name);}
,getEventType:function(d,name){var d=d.constructor;while(d.superclass){if(d.$$events&&d.$$events[name]!==undefined){return d.$$events[name];}
;d=d.superclass;}
;return null;}
,supportsEvent:function(e,name){return !!qx.util.OOUtil.getEventType(e,name);}
,getByInterface:function(f,g){var h,i,l;while(f){if(f.$$implements){h=f.$$flatImplements;for(i=0,l=h.length;i<l;i++){if(h[i]===g){return f;}
;}
;}
;f=f.superclass;}
;return null;}
,hasInterface:function(j,k){return !!qx.util.OOUtil.getByInterface(j,k);}
,getMixins:function(m){var n=[];while(m){if(m.$$includes){n.push.apply(n,m.$$flatIncludes);}
;m=m.superclass;}
;return n;}
}});}
)();
(function(){var cs="qx.blankpage",cr="qx.bom.client.Stylesheet.getInsertRule",cq="qx.bom.client.Html.getDataset",cp="qx.bom.client.PhoneGap.getPhoneGap",co='] found, and no default ("default") given',cn="qx.bom.client.Html.getAudioAif",cm="qx.bom.client.CssTransform.get3D",cl=' type)',ck="qx.bom.client.Xml.getAttributeNS",cj="qx.bom.client.Stylesheet.getRemoveImport",bt="qx.bom.client.Css.getUserModify",bs="qx.bom.client.Css.getFilterGradient",br="qx.bom.client.Event.getHashChange",bq="qx.bom.client.Plugin.getWindowsMedia",bp="qx.bom.client.Html.getVideo",bo="qx.bom.client.Device.getName",bn="qx.bom.client.Event.getTouch",bm="qx.optimization.strings",bl="qx.debug.property.level",bk="qx.optimization.variables",cz="qx.bom.client.EcmaScript.getStackTrace",cA="qx.bom.client.Xml.getSelectSingleNode",cx="qx.bom.client.Xml.getImplementation",cy="qx.bom.client.Html.getConsole",cv="qx.bom.client.Engine.getVersion",cw="qx.bom.client.Plugin.getQuicktime",ct="qx.bom.client.Html.getNaturalDimensions",cu="qx.bom.client.Xml.getSelectNodes",cB="qx.bom.client.Xml.getElementsByTagNameNS",cC="qx.bom.client.Html.getDataUrl",bR="qx.bom.client.Flash.isAvailable",bQ="qx.bom.client.Html.getCanvas",bT="qx.bom.client.Css.getBoxModel",bS="qx.bom.client.Plugin.getSilverlight",bV="qx/static/blank.html",bU="qx.bom.client.Css.getUserSelect",bX="qx.bom.client.Css.getRadialGradient",bW="module.property",bP="qx.bom.client.Plugin.getWindowsMediaVersion",bO="qx.bom.client.Stylesheet.getCreateStyleSheet",a='No match for variant "',b="qx.bom.client.Locale.getLocale",c="module.events",d="module.databinding",e="qx.bom.client.Html.getFileReader",f="qx.bom.client.Css.getBorderImage",g="qx.bom.client.Stylesheet.getDeleteRule",h="qx.bom.client.Plugin.getDivXVersion",j="qx.bom.client.Scroll.scrollBarOverlayed",k="qx.bom.client.Plugin.getPdfVersion",cQ=":",cP="qx.bom.client.Css.getLinearGradient",cO="qx.bom.client.Transport.getXmlHttpRequest",cN="qx.bom.client.Css.getBorderImageSyntax",cU="qx.bom.client.Html.getClassList",cT="qx.bom.client.Event.getHelp",cS="qx.optimization.comments",cR="qx.bom.client.Locale.getVariant",cW="qx.bom.client.Css.getBoxSizing",cV="qx.bom.client.OperatingSystem.getName",J="module.logger",K="qx.bom.client.Css.getOverflowXY",H="qx.mobile.emulatetouch",I="qx.bom.client.Html.getAudioWav",N="qx.bom.client.Browser.getName",O="qx.bom.client.Css.getInlineBlock",L="qx.bom.client.Plugin.getPdf",M="qx.dynlocale",F='" (',G="qx.bom.client.Html.getAudio",s="qx.core.Environment",r="qx.bom.client.CssTransform.getSupport",u="qx.bom.client.Html.getTextContent",t="qx.bom.client.Css.getPlaceholder",o="qx.bom.client.Css.getFloat",n=' in variants [',q="false",p="qx.bom.client.Css.getBoxShadow",m="qx.bom.client.Html.getXul",l="qx.bom.client.Xml.getCreateNode",T="qxenv",U="qx.bom.client.Html.getSessionStorage",V="qx.bom.client.Html.getAudioAu",W="qx.bom.client.Css.getOpacity",P="qx.bom.client.Css.getFilterTextShadow",Q="qx.bom.client.Html.getVml",R="qx.bom.client.Css.getRgba",S="qx.bom.client.Transport.getMaxConcurrentRequestCount",X="qx.bom.client.Css.getBorderRadius",Y="qx.bom.client.Event.getPointer",C="qx.bom.client.Transport.getSsl",B="qx.bom.client.Html.getWebWorker",A="qx.bom.client.Json.getJson",z="qx.bom.client.Browser.getQuirksMode",y="qx.debug.dispose",x="qx.bom.client.Css.getTextOverflow",w="qx.bom.client.Xml.getQualifiedItem",v="qx.bom.client.Html.getVideoOgg",E="&",D="qx.bom.client.Device.getType",ba="qx.bom.client.Browser.getDocumentMode",bb="qx.allowUrlVariants",bc="qx.bom.client.Html.getContains",bd="qx.bom.client.Plugin.getActiveX",be=".",bf="qx.bom.client.Xml.getDomProperties",bg="qx.bom.client.CssAnimation.getSupport",bh="qx.debug.databinding",bi="qx.optimization.basecalls",bj="qx.bom.client.Browser.getVersion",bx="qx.bom.client.Css.getUserSelectNone",bw="qx.bom.client.Html.getSvg",bv="qx.optimization.privates",bu="qx.bom.client.Plugin.getDivX",bB="qx.bom.client.Runtime.getName",bA="qx.bom.client.Html.getLocalStorage",bz="qx.bom.client.Flash.getStrictSecurityModel",by="qx.aspects",bD="qx.debug",bC="qx.dynamicmousewheel",bK="qx.bom.client.Html.getAudioMp3",bL="qx.bom.client.Engine.getName",bI="qx.bom.client.Html.getUserDataStorage",bJ="qx.bom.client.Plugin.getGears",bG="qx.bom.client.Plugin.getQuicktimeVersion",bH="qx.bom.client.Html.getAudioOgg",bE="qx.bom.client.Css.getTextShadow",bF="qx.bom.client.Plugin.getSilverlightVersion",bM="qx.bom.client.Html.getCompareDocumentPosition",bN="qx.bom.client.Flash.getExpressInstall",cc="qx.bom.client.OperatingSystem.getVersion",cb="qx.bom.client.Html.getXPath",ce="qx.bom.client.Html.getGeoLocation",cd="qx.bom.client.Css.getAppearance",cg="qx.mobile.nativescroll",cf="qx.bom.client.Xml.getDomParser",ci="qx.bom.client.Stylesheet.getAddImport",ch="qx.optimization.variants",ca="qx.bom.client.Html.getVideoWebm",bY="qx.bom.client.Flash.getVersion",cJ="qx.bom.client.Css.getLegacyWebkitGradient",cK="qx.bom.client.PhoneGap.getNotification",cL="qx.bom.client.Html.getVideoH264",cM="qx.bom.client.Xml.getCreateElementNS",cF="qx.core.Environment for a list of predefined keys.",cG=" is not a valid key. Please see the API-doc of ",cH="default",cI="|",cD="true",cE="qx.allowUrlSettings";qx.Bootstrap.define(s,{statics:{_checks:{},_asyncChecks:{},__e:{},_checksMap:{"engine.version":cv,"engine.name":bL,"browser.name":N,"browser.version":bj,"browser.documentmode":ba,"browser.quirksmode":z,"runtime.name":bB,"device.name":bo,"device.type":D,"locale":b,"locale.variant":cR,"os.name":cV,"os.version":cc,"os.scrollBarOverlayed":j,"plugin.gears":bJ,"plugin.activex":bd,"plugin.quicktime":cw,"plugin.quicktime.version":bG,"plugin.windowsmedia":bq,"plugin.windowsmedia.version":bP,"plugin.divx":bu,"plugin.divx.version":h,"plugin.silverlight":bS,"plugin.silverlight.version":bF,"plugin.flash":bR,"plugin.flash.version":bY,"plugin.flash.express":bN,"plugin.flash.strictsecurity":bz,"plugin.pdf":L,"plugin.pdf.version":k,"io.maxrequests":S,"io.ssl":C,"io.xhr":cO,"event.touch":bn,"event.pointer":Y,"event.help":cT,"event.hashchange":br,"ecmascript.stacktrace":cz,"html.webworker":B,"html.filereader":e,"html.geolocation":ce,"html.audio":G,"html.audio.ogg":bH,"html.audio.mp3":bK,"html.audio.wav":I,"html.audio.au":V,"html.audio.aif":cn,"html.video":bp,"html.video.ogg":v,"html.video.h264":cL,"html.video.webm":ca,"html.storage.local":bA,"html.storage.session":U,"html.storage.userdata":bI,"html.classlist":cU,"html.xpath":cb,"html.xul":m,"html.canvas":bQ,"html.svg":bw,"html.vml":Q,"html.dataset":cq,"html.dataurl":cC,"html.console":cy,"html.stylesheet.createstylesheet":bO,"html.stylesheet.insertrule":cr,"html.stylesheet.deleterule":g,"html.stylesheet.addimport":ci,"html.stylesheet.removeimport":cj,"html.element.contains":bc,"html.element.compareDocumentPosition":bM,"html.element.textcontent":u,"html.image.naturaldimensions":ct,"json":A,"css.textoverflow":x,"css.placeholder":t,"css.borderradius":X,"css.borderimage":f,"css.borderimage.standardsyntax":cN,"css.boxshadow":p,"css.gradient.linear":cP,"css.gradient.filter":bs,"css.gradient.radial":bX,"css.gradient.legacywebkit":cJ,"css.boxmodel":bT,"css.rgba":R,"css.userselect":bU,"css.userselect.none":bx,"css.usermodify":bt,"css.appearance":cd,"css.float":o,"css.boxsizing":cW,"css.animation":bg,"css.transform":r,"css.transform.3d":cm,"css.inlineblock":O,"css.opacity":W,"css.overflowxy":K,"css.textShadow":bE,"css.textShadow.filter":P,"phonegap":cp,"phonegap.notification":cK,"xml.implementation":cx,"xml.domparser":cf,"xml.selectsinglenode":cA,"xml.selectnodes":cu,"xml.getelementsbytagnamens":cB,"xml.domproperties":bf,"xml.attributens":ck,"xml.createnode":l,"xml.getqualifieditem":w,"xml.createelementns":cM},get:function(cX){if(this.__e[cX]!=undefined){return this.__e[cX];}
;var db=this._checks[cX];if(db){var dc=db();this.__e[cX]=dc;return dc;}
;var da=this._getClassNameFromEnvKey(cX);if(da[0]!=undefined){var dd=da[0];var cY=da[1];var dc=dd[cY]();this.__e[cX]=dc;return dc;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(cX+cG+cF);qx.Bootstrap.trace(this);}
;}
,_getClassNameFromEnvKey:function(de){var dk=this._checksMap;if(dk[de]!=undefined){var dg=dk[de];var dj=dg.lastIndexOf(be);if(dj>-1){var di=dg.slice(0,dj);var df=dg.slice(dj+1);var dh=qx.Bootstrap.getByName(di);if(dh!=undefined){return [dh,df];}
;}
;}
;return [undefined,undefined];}
,getAsync:function(dl,dm,self){var dr=this;if(this.__e[dl]!=undefined){window.setTimeout(function(){dm.call(self,dr.__e[dl]);}
,0);return;}
;var dq=this._asyncChecks[dl];if(dq){dq(function(dt){dr.__e[dl]=dt;dm.call(self,dt);}
);return;}
;var dp=this._getClassNameFromEnvKey(dl);if(dp[0]!=undefined){var ds=dp[0];var dn=dp[1];ds[dn](function(du){dr.__e[dl]=du;dm.call(self,du);}
);return;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(dl+cG+cF);qx.Bootstrap.trace(this);}
;}
,select:function(dv,dw){return this.__f(this.get(dv),dw);}
,selectAsync:function(dx,dy,self){this.getAsync(dx,function(dz){var dA=this.__f(dx,dy);dA.call(self,dz);}
,this);}
,__f:function(dB,dC){var dE=dC[dB];if(dC.hasOwnProperty(dB)){return dE;}
;for(var dD in dC){if(dD.indexOf(cI)!=-1){var dF=dD.split(cI);for(var i=0;i<dF.length;i++){if(dF[i]==dB){return dC[dD];}
;}
;}
;}
;if(dC[cH]!==undefined){return dC[cH];}
;if(qx.Bootstrap.DEBUG){throw new Error(a+dB+F+(typeof dB)+cl+n+qx.Bootstrap.getKeysAsString(dC)+co);}
;}
,filter:function(dG){var dI=[];for(var dH in dG){if(this.get(dH)){dI.push(dG[dH]);}
;}
;return dI;}
,invalidateCacheKey:function(dJ){delete this.__e[dJ];}
,add:function(dK,dL){if(this._checks[dK]==undefined){if(dL instanceof Function){this._checks[dK]=dL;}
else {this._checks[dK]=this.__i(dL);}
;}
;}
,addAsync:function(dM,dN){if(this._checks[dM]==undefined){this._asyncChecks[dM]=dN;}
;}
,getChecks:function(){return this._checks;}
,getAsyncChecks:function(){return this._asyncChecks;}
,_initDefaultQxValues:function(){this.add(cD,function(){return true;}
);this.add(cE,function(){return false;}
);this.add(bb,function(){return false;}
);this.add(bl,function(){return 0;}
);this.add(bD,function(){return true;}
);this.add(by,function(){return false;}
);this.add(M,function(){return true;}
);this.add(H,function(){return false;}
);this.add(cg,function(){return false;}
);this.add(cs,function(){return bV;}
);this.add(bC,function(){return true;}
);this.add(bh,function(){return false;}
);this.add(y,function(){return false;}
);this.add(bi,function(){return false;}
);this.add(cS,function(){return false;}
);this.add(bv,function(){return false;}
);this.add(bm,function(){return false;}
);this.add(bk,function(){return false;}
);this.add(ch,function(){return false;}
);this.add(d,function(){return true;}
);this.add(J,function(){return true;}
);this.add(bW,function(){return true;}
);this.add(c,function(){return true;}
);}
,__g:function(){if(qx&&qx.$$environment){for(var dP in qx.$$environment){var dO=qx.$$environment[dP];this._checks[dP]=this.__i(dO);}
;}
;}
,__h:function(){if(window.document&&window.document.location){var dQ=window.document.location.search.slice(1).split(E);for(var i=0;i<dQ.length;i++){var dS=dQ[i].split(cQ);if(dS.length!=3||dS[0]!=T){continue;}
;var dT=dS[1];var dR=decodeURIComponent(dS[2]);if(dR==cD){dR=true;}
else if(dR==q){dR=false;}
else if(/^(\d|\.)+$/.test(dR)){dR=parseFloat(dR);}
;;this._checks[dT]=this.__i(dR);}
;}
;}
,__i:function(dU){return qx.Bootstrap.bind(function(dV){return dV;}
,null,dU);}
},defer:function(dW){dW._initDefaultQxValues();dW.__g();if(dW.get(cE)===true){dW.__h();}
;}
});}
)();
(function(){var m=".prototype",k="'is undefined/null!",j="constructor",h='The configuration key "',g='" is not allowed!',f='"! The type of the key must be "',e="RegExp",d="members",c='" in property "',b="properties",K="statics",J="qx.Mixin",I="events",H="'is not a mixin!",G='Invalid type of key "',F="]",E='"! The value needs to be a map!',D="[Mixin ",C="destruct",B="Date",t='"! The value is undefined/null!',u="function",r="' in mixin '",s='" in member "',p="Array",q="Mixin",n="Includes of mixins must be mixins. The include number '",o='Invalid key "',v='Conflict between mixin "',w='" and "',y="qx.debug",x='"!',A='" in mixin "',z="object";qx.Bootstrap.define(J,{statics:{define:function(name,L){if(L){if(L.include&&!(qx.Bootstrap.getClass(L.include)===p)){L.include=[L.include];}
;if(qx.core.Environment.get(y)){this.__d(name,L);}
;var N=L.statics?L.statics:{};qx.Bootstrap.setDisplayNames(N,name);for(var M in N){if(N[M] instanceof Function){N[M].$$mixin=N;}
;}
;if(L.construct){N.$$constructor=L.construct;qx.Bootstrap.setDisplayName(L.construct,name,j);}
;if(L.include){N.$$includes=L.include;}
;if(L.properties){N.$$properties=L.properties;}
;if(L.members){N.$$members=L.members;qx.Bootstrap.setDisplayNames(L.members,name+m);}
;for(var M in N.$$members){if(N.$$members[M] instanceof Function){N.$$members[M].$$mixin=N;}
;}
;if(L.events){N.$$events=L.events;}
;if(L.destruct){N.$$destructor=L.destruct;qx.Bootstrap.setDisplayName(L.destruct,name,C);}
;}
else {var N={};}
;N.$$type=q;N.name=name;N.toString=this.genericToString;N.basename=qx.Bootstrap.createNamespace(name,N);this.$$registry[name]=N;return N;}
,checkCompatibility:function(O){var R=this.flatten(O);var S=R.length;if(S<2){return true;}
;var V={};var U={};var T={};var Q;for(var i=0;i<S;i++){Q=R[i];for(var P in Q.events){if(T[P]){throw new Error(v+Q.name+w+T[P]+s+P+x);}
;T[P]=Q.name;}
;for(var P in Q.properties){if(V[P]){throw new Error(v+Q.name+w+V[P]+c+P+x);}
;V[P]=Q.name;}
;for(var P in Q.members){if(U[P]){throw new Error(v+Q.name+w+U[P]+s+P+x);}
;U[P]=Q.name;}
;}
;return true;}
,isCompatible:function(W,X){var Y=qx.util.OOUtil.getMixins(X);Y.push(W);return qx.Mixin.checkCompatibility(Y);}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,flatten:function(ba){if(!ba){return [];}
;var bb=ba.concat();for(var i=0,l=ba.length;i<l;i++){if(ba[i].$$includes){bb.push.apply(bb,this.flatten(ba[i].$$includes));}
;}
;return bb;}
,genericToString:function(){return D+this.name+F;}
,$$registry:{},__c:qx.core.Environment.select(y,{"true":{"include":z,"statics":z,"members":z,"properties":z,"events":z,"destruct":u,"construct":u},"default":null}),__d:qx.core.Environment.select(y,{"true":function(name,bc){var bf=this.__c;for(var be in bc){if(!bf[be]){throw new Error(h+be+A+name+g);}
;if(bc[be]==null){throw new Error(o+be+A+name+t);}
;if(bf[be]!==null&&typeof bc[be]!==bf[be]){throw new Error(G+be+A+name+f+bf[be]+x);}
;}
;var bd=[K,d,b,I];for(var i=0,l=bd.length;i<l;i++){var be=bd[i];if(bc[be]!==undefined&&([p,e,B].indexOf(qx.Bootstrap.getClass(bc[be]))!=-1||bc[be].classname!==undefined)){throw new Error(o+be+A+name+E);}
;}
;if(bc.include){for(var i=0,a=bc.include,l=a.length;i<l;i++){if(a[i]==null){throw new Error(n+(i+1)+r+name+k);}
;if(a[i].$$type!==q){throw new Error(n+(i+1)+r+name+H);}
;}
;this.checkCompatibility(bc.include);}
;}
,"default":function(){}
})}});}
)();
(function(){var d="qx.core.Aspect",c="before",b="*",a="static";qx.Bootstrap.define(d,{statics:{__bc:[],wrap:function(e,f,g){var m=[];var h=[];var l=this.__bc;var k;for(var i=0;i<l.length;i++){k=l[i];if((k.type==null||g==k.type||k.type==b)&&(k.name==null||e.match(k.name))){k.pos==-1?m.push(k.fcn):h.push(k.fcn);}
;}
;if(m.length===0&&h.length===0){return f;}
;var j=function(){for(var i=0;i<m.length;i++){m[i].call(this,e,f,g,arguments);}
;var n=f.apply(this,arguments);for(var i=0;i<h.length;i++){h[i].call(this,e,f,g,arguments,n);}
;return n;}
;if(g!==a){j.self=f.self;j.base=f.base;}
;f.wrapper=j;j.original=f;return j;}
,addAdvice:function(o,p,q,name){this.__bc.push({fcn:o,pos:p===c?-1:1,type:q,name:name});}
}});}
)();
(function(){var m="function",k="Boolean",j="'! The value is undefined/null!",h="RegExp",g='The configuration key "',f='The property "',e='" is not allowed!',d="string",c='Implementation of method "',b="members",V="number",U="properties",T="statics",S="Invalid key '",R='The event "',Q="events",P='Invalid type of key "',O="]",N='" in class "',M='"! The value needs to be a map!',t="' is undefined/null!",u='"! The type of the key must be "',r='Implementation of member "',s="' is not an interface!",p="qx.Interface",q="Date",n='"! Static constants must be all uppercase.',o="toggle",v="boolean",w="is",D="[Interface ",B='"! Static constants must be all of a primitive type.',G='"',F="Array",I='" is missing in class "',H="Interface",y="Extends of interfaces must be interfaces. The extend number '",L='" is not supported by Class "',K='" required by interface "',J="' in interface '",x='"!',z='Invalid key "',A='" in interface "',C="qx.debug",E="object";qx.Bootstrap.define(p,{statics:{define:function(name,W){if(W){if(W.extend&&!(qx.Bootstrap.getClass(W.extend)===F)){W.extend=[W.extend];}
;if(qx.core.Environment.get(C)){this.__d(name,W);}
;var X=W.statics?W.statics:{};if(W.extend){X.$$extends=W.extend;}
;if(W.properties){X.$$properties=W.properties;}
;if(W.members){X.$$members=W.members;}
;if(W.events){X.$$events=W.events;}
;}
else {var X={};}
;X.$$type=H;X.name=name;X.toString=this.genericToString;X.basename=qx.Bootstrap.createNamespace(name,X);qx.Interface.$$registry[name]=X;return X;}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,flatten:function(Y){if(!Y){return [];}
;var ba=Y.concat();for(var i=0,l=Y.length;i<l;i++){if(Y[i].$$extends){ba.push.apply(ba,this.flatten(Y[i].$$extends));}
;}
;return ba;}
,__j:function(bb,bc,bd,be){var bi=bd.$$members;if(bi){for(var bh in bi){if(qx.Bootstrap.isFunction(bi[bh])){var bg=this.__k(bc,bh);var bf=bg||qx.Bootstrap.isFunction(bb[bh]);if(!bf){throw new Error(c+bh+I+bc.classname+K+bd.name+G);}
;var bj=be===true&&!bg&&!qx.util.OOUtil.hasInterface(bc,bd);if(bj){bb[bh]=this.__n(bd,bb[bh],bh,bi[bh]);}
;}
else {if(typeof bb[bh]===undefined){if(typeof bb[bh]!==m){throw new Error(r+bh+I+bc.classname+K+bd.name+G);}
;}
;}
;}
;}
;}
,__k:function(bk,bl){var bp=bl.match(/^(is|toggle|get|set|reset)(.*)$/);if(!bp){return false;}
;var bm=qx.Bootstrap.firstLow(bp[2]);var bn=qx.util.OOUtil.getPropertyDefinition(bk,bm);if(!bn){return false;}
;var bo=bp[0]==w||bp[0]==o;if(bo){return qx.util.OOUtil.getPropertyDefinition(bk,bm).check==k;}
;return true;}
,__l:function(bq,br){if(br.$$properties){for(var bs in br.$$properties){if(!qx.util.OOUtil.getPropertyDefinition(bq,bs)){throw new Error(f+bs+L+bq.classname+x);}
;}
;}
;}
,__m:function(bt,bu){if(bu.$$events){for(var bv in bu.$$events){if(!qx.util.OOUtil.supportsEvent(bt,bv)){throw new Error(R+bv+L+bt.classname+x);}
;}
;}
;}
,assertObject:function(bw,bx){var bz=bw.constructor;this.__j(bw,bz,bx,false);this.__l(bz,bx);this.__m(bz,bx);var by=bx.$$extends;if(by){for(var i=0,l=by.length;i<l;i++){this.assertObject(bw,by[i]);}
;}
;}
,assert:function(bA,bB,bC){this.__j(bA.prototype,bA,bB,bC);this.__l(bA,bB);this.__m(bA,bB);var bD=bB.$$extends;if(bD){for(var i=0,l=bD.length;i<l;i++){this.assert(bA,bD[i],bC);}
;}
;}
,genericToString:function(){return D+this.name+O;}
,$$registry:{},__n:qx.core.Environment.select(C,{"true":function(bE,bF,bG,bH){function bI(){bH.apply(this,arguments);return bF.apply(this,arguments);}
;bF.wrapper=bI;return bI;}
,"default":function(){}
}),__c:qx.core.Environment.select(C,{"true":{"extend":E,"statics":E,"members":E,"properties":E,"events":E},"default":null}),__d:qx.core.Environment.select(C,{"true":function(name,bJ){if(qx.core.Environment.get(C)){var bM=this.__c;for(var bL in bJ){if(bM[bL]===undefined){throw new Error(g+bL+N+name+e);}
;if(bJ[bL]==null){throw new Error(S+bL+J+name+j);}
;if(bM[bL]!==null&&typeof bJ[bL]!==bM[bL]){throw new Error(P+bL+A+name+u+bM[bL]+x);}
;}
;var bK=[T,b,U,Q];for(var i=0,l=bK.length;i<l;i++){var bL=bK[i];if(bJ[bL]!==undefined&&([F,h,q].indexOf(qx.Bootstrap.getClass(bJ[bL]))!=-1||bJ[bL].classname!==undefined)){throw new Error(z+bL+A+name+M);}
;}
;if(bJ.extend){for(var i=0,a=bJ.extend,l=a.length;i<l;i++){if(a[i]==null){throw new Error(y+i+1+J+name+t);}
;if(a[i].$$type!==H){throw new Error(y+i+1+J+name+s);}
;}
;}
;if(bJ.statics){for(var bL in bJ.statics){if(bL.toUpperCase()!==bL){throw new Error(z+bL+A+name+n);}
;switch(typeof bJ.statics[bL]){case v:case d:case V:break;default:throw new Error(z+bL+A+name+B);};}
;}
;}
;}
,"default":function(){}
})}});}
)();
(function(){var g="qx.lang.Core",f="\\\\",e="\\\"",d='"',c="[object Error]",b="emulated",a="native";qx.Bootstrap.define(g,{statics:{errorToString:{"native":Error.prototype.toString,"emulated":function(){return this.message;}
}[(!Error.prototype.toString||Error.prototype.toString()==c)?b:a],arrayIndexOf:{"native":Array.prototype.indexOf,"emulated":function(h,j){if(j==null){j=0;}
else if(j<0){j=Math.max(0,this.length+j);}
;for(var i=j;i<this.length;i++){if(this[i]===h){return i;}
;}
;return -1;}
}[Array.prototype.indexOf?a:b],arrayLastIndexOf:{"native":Array.prototype.lastIndexOf,"emulated":function(k,m){if(m==null){m=this.length-1;}
else if(m<0){m=Math.max(0,this.length+m);}
;for(var i=m;i>=0;i--){if(this[i]===k){return i;}
;}
;return -1;}
}[Array.prototype.lastIndexOf?a:b],arrayForEach:{"native":Array.prototype.forEach,"emulated":function(n,o){var l=this.length;for(var i=0;i<l;i++){var p=this[i];if(p!==undefined){n.call(o||window,p,i,this);}
;}
;}
}[Array.prototype.forEach?a:b],arrayFilter:{"native":Array.prototype.filter,"emulated":function(q,r){var s=[];var l=this.length;for(var i=0;i<l;i++){var t=this[i];if(t!==undefined){if(q.call(r||window,t,i,this)){s.push(this[i]);}
;}
;}
;return s;}
}[Array.prototype.filter?a:b],arrayMap:{"native":Array.prototype.map,"emulated":function(u,v){var w=[];var l=this.length;for(var i=0;i<l;i++){var x=this[i];if(x!==undefined){w[i]=u.call(v||window,x,i,this);}
;}
;return w;}
}[Array.prototype.map?a:b],arraySome:{"native":Array.prototype.some,"emulated":function(y,z){var l=this.length;for(var i=0;i<l;i++){var A=this[i];if(A!==undefined){if(y.call(z||window,A,i,this)){return true;}
;}
;}
;return false;}
}[Array.prototype.some?a:b],arrayEvery:{"native":Array.prototype.every,"emulated":function(B,C){var l=this.length;for(var i=0;i<l;i++){var D=this[i];if(D!==undefined){if(!B.call(C||window,D,i,this)){return false;}
;}
;}
;return true;}
}[Array.prototype.every?a:b],stringQuote:{"native":String.prototype.quote,"emulated":function(){return d+this.replace(/\\/g,f).replace(/\"/g,e)+d;}
}[String.prototype.quote?a:b]}});if(!Error.prototype.toString||Error.prototype.toString()==c){Error.prototype.toString=qx.lang.Core.errorToString;}
;if(!Array.prototype.indexOf){Array.prototype.indexOf=qx.lang.Core.arrayIndexOf;}
;if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;}
;if(!Array.prototype.forEach){Array.prototype.forEach=qx.lang.Core.arrayForEach;}
;if(!Array.prototype.filter){Array.prototype.filter=qx.lang.Core.arrayFilter;}
;if(!Array.prototype.map){Array.prototype.map=qx.lang.Core.arrayMap;}
;if(!Array.prototype.some){Array.prototype.some=qx.lang.Core.arraySome;}
;if(!Array.prototype.every){Array.prototype.every=qx.lang.Core.arrayEvery;}
;if(!String.prototype.quote){String.prototype.quote=qx.lang.Core.stringQuote;}
;}
)();
(function(){var bV='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',bU='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',bT='value !== null && value.nodeType === 9 && value.documentElement',bS='value !== null && value.$$type === "Mixin"',bR='return init;',bQ='var init=this.',bP='value !== null && value.nodeType === 1 && value.attributes',bO="var parent = this.getLayoutParent();",bN="Error in property ",bM="property",bv='qx.core.Assert.assertInstance(value, Date, msg) || true',bu="Cannot add the non themable property '",bt="if (!parent) return;",bs=" in method ",br='qx.core.Assert.assertInstance(value, Error, msg) || true',bq='Undefined value is not allowed!',bp="' to the themable property group '",bo="]: ",bn="inherit",bm='Is invalid!',cd="MSIE 6.0",ce="Malformed generated code to unwrap method: ",cb="': ",cc=" of class ",bY='value !== null && value.nodeType !== undefined',ca='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',bW="module.events",bX='qx.core.Assert.assertPositiveInteger(value, msg) || true',cf="Code[",cg="Cannot create property group '",bF='if(init==qx.core.Property.$$inherit)init=null;',bE='value !== null && value.$$type === "Interface"',bH='var inherit=prop.$$inherit;',bG="var value = parent.",bJ="$$useinit_",bI="(value);",bL='Requires exactly one argument!',bK="$$runtime_",bD="$$user_",bC='qx.core.Assert.assertArray(value, msg) || true',b='qx.core.Assert.assertPositiveNumber(value, msg) || true',c=".prototype",d="' including non-existing property '",e="Boolean",f='return value;',g='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',h='Does not allow any arguments!',j="()",k="var a=arguments[0] instanceof Array?arguments[0]:arguments;",m='value !== null && value.$$type === "Theme"',ck="'!",cj="())",ci='return null;',ch='qx.core.Assert.assertObject(value, msg) || true',co='qx.core.Assert.assertString(value, msg) || true',cn="\n",cm="if (value===undefined) value = parent.",cl='value !== null && value.$$type === "Class"',cq='qx.core.Assert.assertFunction(value, msg) || true',cp=".",L="object",M="$$init_",J="$$theme_",K="Unknown reason: ",P='qx.core.Assert.assertMap(value, msg) || true',Q="Generating property wrappers: ",N="'",O='qx.core.Assert.assertNumber(value, msg) || true',H='Null value is not allowed!',I='qx.core.Assert.assertInteger(value, msg) || true',u="rv:1.8.1",t="shorthand",w="Generating property group: ",v='qx.core.Assert.assertInstance(value, RegExp, msg) || true',q='value !== null && value.type !== undefined',p='value !== null && value.document',s='throw new Error("Property ',r="(!this.",o='qx.core.Assert.assertBoolean(value, msg) || true',n="qx.aspects",V="toggle",W="$$inherit_",X=" with incoming value '",Y="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",R="qx.core.Property",S="is",T='Could not change or apply init value after constructing phase!',U="();",ba='else ',bb='if(this.',E="resetRuntime",D="return this.",C="get",B=";",A="(a[",z="value",y=' of an instance of ',x="refresh",G=' is not (yet) ready!");',F="]);",bc="resetThemed",bd='else if(this.',be="reset",bf="setRuntime",bg="qx.debug.property.level",bh="init",bi="set",bj="setThemed",bk='!==undefined)',bl="this.",bz='return this.',by="string",bx="qx.debug",bw="boolean",bB=';',bA="";qx.Bootstrap.define(R,{statics:{__o:function(){if(qx.core.Environment.get(bW)){qx.event.type.Data;qx.event.dispatch.Direct;}
;}
,__p:{"Boolean":o,"String":co,"Number":O,"Integer":I,"PositiveNumber":b,"PositiveInteger":bX,"Error":br,"RegExp":v,"Object":ch,"Array":bC,"Map":P,"Function":cq,"Date":bv,"Node":bY,"Element":bP,"Document":bT,"Window":p,"Event":q,"Class":cl,"Mixin":bS,"Interface":bE,"Theme":m,"Color":bV,"Decorator":ca,"Font":bU},__q:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:bn,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:by,dereference:bw,inheritable:bw,nullable:bw,themeable:bw,refine:bw,init:null,apply:by,event:by,check:null,transform:by,deferredInit:bw,validate:null},$$allowedGroupKeys:{name:by,group:L,mode:by,themeable:bw},$$inheritable:{},__r:function(cr){var cs=this.__s(cr);if(!cs.length){var ct=function(){}
;}
else {ct=this.__t(cs);}
;cr.prototype.$$refreshInheritables=ct;}
,__s:function(cu){var cw=[];while(cu){var cv=cu.$$properties;if(cv){for(var name in this.$$inheritable){if(cv[name]&&cv[name].inheritable){cw.push(name);}
;}
;}
;cu=cu.superclass;}
;return cw;}
,__t:function(cx){var cB=this.$$store.inherit;var cA=this.$$store.init;var cz=this.$$method.refresh;var cy=[bO,bt];for(var i=0,l=cx.length;i<l;i++){var name=cx[i];cy.push(bG,cB[name],B,cm,cA[name],B,bl,cz[name],bI);}
;return new Function(cy.join(bA));}
,attachRefreshInheritables:function(cC){cC.prototype.$$refreshInheritables=function(){qx.core.Property.__r(cC);return this.$$refreshInheritables();}
;}
,attachMethods:function(cD,name,cE){cE.group?this.__u(cD,cE,name):this.__v(cD,cE,name);}
,__u:function(cF,cG,name){var cN=qx.Bootstrap.firstUp(name);var cM=cF.prototype;var cO=cG.themeable===true;if(qx.core.Environment.get(bx)){if(qx.core.Environment.get(bg)>1){qx.Bootstrap.debug(w+name);}
;}
;var cP=[];var cJ=[];if(cO){var cH=[];var cL=[];}
;var cK=k;cP.push(cK);if(cO){cH.push(cK);}
;if(cG.mode==t){var cI=Y;cP.push(cI);if(cO){cH.push(cI);}
;}
;for(var i=0,a=cG.group,l=a.length;i<l;i++){if(qx.core.Environment.get(bx)){if(!this.$$method.set[a[i]]||!this.$$method.reset[a[i]]){throw new Error(cg+name+d+a[i]+ck);}
;}
;cP.push(bl,this.$$method.set[a[i]],A,i,F);cJ.push(bl,this.$$method.reset[a[i]],U);if(cO){if(qx.core.Environment.get(bx)){if(!this.$$method.setThemed[a[i]]){throw new Error(bu+a[i]+bp+name+N);}
;}
;cH.push(bl,this.$$method.setThemed[a[i]],A,i,F);cL.push(bl,this.$$method.resetThemed[a[i]],U);}
;}
;this.$$method.set[name]=bi+cN;cM[this.$$method.set[name]]=new Function(cP.join(bA));this.$$method.reset[name]=be+cN;cM[this.$$method.reset[name]]=new Function(cJ.join(bA));if(cO){this.$$method.setThemed[name]=bj+cN;cM[this.$$method.setThemed[name]]=new Function(cH.join(bA));this.$$method.resetThemed[name]=bc+cN;cM[this.$$method.resetThemed[name]]=new Function(cL.join(bA));}
;}
,__v:function(cQ,cR,name){var cT=qx.Bootstrap.firstUp(name);var cV=cQ.prototype;if(qx.core.Environment.get(bx)){if(qx.core.Environment.get(bg)>1){qx.Bootstrap.debug(Q+name);}
;}
;if(cR.dereference===undefined&&typeof cR.check===by){cR.dereference=this.__w(cR.check);}
;var cU=this.$$method;var cS=this.$$store;cS.runtime[name]=bK+name;cS.user[name]=bD+name;cS.theme[name]=J+name;cS.init[name]=M+name;cS.inherit[name]=W+name;cS.useinit[name]=bJ+name;cU.get[name]=C+cT;cV[cU.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,cQ,name,C);}
;cU.set[name]=bi+cT;cV[cU.set[name]]=function(cW){return qx.core.Property.executeOptimizedSetter(this,cQ,name,bi,arguments);}
;cU.reset[name]=be+cT;cV[cU.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cQ,name,be);}
;if(cR.inheritable||cR.apply||cR.event||cR.deferredInit){cU.init[name]=bh+cT;cV[cU.init[name]]=function(cX){return qx.core.Property.executeOptimizedSetter(this,cQ,name,bh,arguments);}
;}
;if(cR.inheritable){cU.refresh[name]=x+cT;cV[cU.refresh[name]]=function(cY){return qx.core.Property.executeOptimizedSetter(this,cQ,name,x,arguments);}
;}
;cU.setRuntime[name]=bf+cT;cV[cU.setRuntime[name]]=function(da){return qx.core.Property.executeOptimizedSetter(this,cQ,name,bf,arguments);}
;cU.resetRuntime[name]=E+cT;cV[cU.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cQ,name,E);}
;if(cR.themeable){cU.setThemed[name]=bj+cT;cV[cU.setThemed[name]]=function(db){return qx.core.Property.executeOptimizedSetter(this,cQ,name,bj,arguments);}
;cU.resetThemed[name]=bc+cT;cV[cU.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cQ,name,bc);}
;}
;if(cR.check===e){cV[V+cT]=new Function(D+cU.set[name]+r+cU.get[name]+cj);cV[S+cT]=new Function(D+cU.get[name]+j);}
;}
,__w:function(dc){return !!this.__q[dc];}
,__x:function(dd){return this.__q[dd]||qx.util.OOUtil.classIsDefined(dd)||(qx.Interface&&qx.Interface.isDefined(dd));}
,__y:{'0':T,'1':bL,'2':bq,'3':h,'4':H,'5':bm},error:function(de,df,dg,dh,di){var dj=de.constructor.classname;var dk=bN+dg+cc+dj+bs+this.$$method[dh][dg]+X+di+cb;throw new Error(dk+(this.__y[df]||K+df));}
,__z:function(dl,dm,name,dn,dp,dq){var dr=this.$$method[dn][name];if(qx.core.Environment.get(bx)){if(qx.core.Environment.get(bg)>1){qx.Bootstrap.debug(cf+this.$$method[dn][name]+bo+dp.join(bA));}
;try{dm[dr]=new Function(z,dp.join(bA));}
catch(ds){throw new Error(ce+this.$$method[dn][name]+cn+dp.join(bA));}
;}
else {dm[dr]=new Function(z,dp.join(bA));}
;if(qx.core.Environment.get(n)){dm[dr]=qx.core.Aspect.wrap(dl.classname+cp+dr,dm[dr],bM);}
;qx.Bootstrap.setDisplayName(dm[dr],dl.classname+c,dr);if(dq===undefined){return dl[dr]();}
else if(qx.core.Environment.get(bx)){return dl[dr].apply(dl,dq);}
else {return dl[dr](dq[0]);}
;}
,executeOptimizedGetter:function(dt,du,name,dv){var dx=du.$$properties[name];var dz=du.prototype;var dw=[];var dy=this.$$store;dw.push(bb,dy.runtime[name],bk);dw.push(bz,dy.runtime[name],bB);if(dx.inheritable){dw.push(bd,dy.inherit[name],bk);dw.push(bz,dy.inherit[name],bB);dw.push(ba);}
;dw.push(bb,dy.user[name],bk);dw.push(bz,dy.user[name],bB);if(dx.themeable){dw.push(bd,dy.theme[name],bk);dw.push(bz,dy.theme[name],bB);}
;if(dx.deferredInit&&dx.init===undefined){dw.push(bd,dy.init[name],bk);dw.push(bz,dy.init[name],bB);}
;dw.push(ba);if(dx.init!==undefined){if(dx.inheritable){dw.push(bQ,dy.init[name],bB);if(dx.nullable){dw.push(bF);}
else if(dx.init!==undefined){dw.push(bz,dy.init[name],bB);}
else {dw.push(g,name,y,du.classname,G);}
;dw.push(bR);}
else {dw.push(bz,dy.init[name],bB);}
;}
else if(dx.inheritable||dx.nullable){dw.push(ci);}
else {dw.push(s,name,y,du.classname,G);}
;return this.__z(dt,dz,name,dv,dw);}
,executeOptimizedSetter:function(dA,dB,name,dC,dD){var dI=dB.$$properties[name];var dH=dB.prototype;var dF=[];var dE=dC===bi||dC===bj||dC===bf||(dC===bh&&dI.init===undefined);var dG=dI.apply||dI.event||dI.inheritable;var dJ=this.__A(dC,name);this.__B(dF,dI,name,dC,dE);if(dE){this.__C(dF,dB,dI,name);}
;if(dG){this.__D(dF,dE,dJ,dC);}
;if(dI.inheritable){dF.push(bH);}
;if(qx.core.Environment.get(bx)){if(dE){this.__E(dF,dI,dB,name,dC);}
;}
;if(!dG){this.__F(dF,name,dC,dE);}
else {this.__G(dF,dI,name,dC,dE);}
;if(dI.inheritable){this.__H(dF,dI,name,dC);}
else if(dG){this.__I(dF,dI,name,dC);}
;if(dG){this.__J(dF,dI,name);if(dI.inheritable&&dH._getChildren){this.__K(dF,name);}
;}
;if(dE){dF.push(f);}
;return this.__z(dA,dH,name,dC,dF,dD);}
,__A:function(dK,name){if(dK==="setRuntime"||dK==="resetRuntime"){var dL=this.$$store.runtime[name];}
else if(dK==="setThemed"||dK==="resetThemed"){dL=this.$$store.theme[name];}
else if(dK==="init"){dL=this.$$store.init[name];}
else {dL=this.$$store.user[name];}
;;return dL;}
,__B:function(dM,dN,name,dO,dP){if(qx.core.Environment.get("qx.debug")){dM.push('var prop=qx.core.Property;');if(dO==="init"){dM.push('if(this.$$initialized)prop.error(this,0,"',name,'","',dO,'",value);');}
;if(dO==="refresh"){}
else if(dP){dM.push('if(arguments.length!==1)prop.error(this,1,"',name,'","',dO,'",value);');dM.push('if(value===undefined)prop.error(this,2,"',name,'","',dO,'",value);');}
else {dM.push('if(arguments.length!==0)prop.error(this,3,"',name,'","',dO,'",value);');}
;}
else {if(!dN.nullable||dN.check||dN.inheritable){dM.push('var prop=qx.core.Property;');}
;if(dO==="set"){dM.push('if(value===undefined)prop.error(this,2,"',name,'","',dO,'",value);');}
;}
;}
,__C:function(dQ,dR,dS,name){if(dS.transform){dQ.push('value=this.',dS.transform,'(value);');}
;if(dS.validate){if(typeof dS.validate==="string"){dQ.push('this.',dS.validate,'(value);');}
else if(dS.validate instanceof Function){dQ.push(dR.classname,'.$$properties.',name);dQ.push('.validate.call(this, value);');}
;}
;}
,__D:function(dT,dU,dV,dW){var dX=(dW==="reset"||dW==="resetThemed"||dW==="resetRuntime");if(dU){dT.push('if(this.',dV,'===value)return value;');}
else if(dX){dT.push('if(this.',dV,'===undefined)return;');}
;}
,__E:qx.core.Environment.select("qx.debug",{"true":function(dY,ea,eb,name,ec){if(!ea.nullable){dY.push('if(value===null)prop.error(this,4,"',name,'","',ec,'",value);');}
;if(ea.check!==undefined){dY.push('var msg = "Invalid incoming value for property \''+name+'\' of class \''+eb.classname+'\'";');if(ea.nullable){dY.push('if(value!==null)');}
;if(ea.inheritable){dY.push('if(value!==inherit)');}
;dY.push('if(');if(this.__p[ea.check]!==undefined){dY.push('!(',this.__p[ea.check],')');}
else if(qx.Class.isDefined(ea.check)){dY.push('qx.core.Assert.assertInstance(value, qx.Class.getByName("',ea.check,'"), msg)');}
else if(qx.Interface&&qx.Interface.isDefined(ea.check)){dY.push('qx.core.Assert.assertInterface(value, qx.Interface.getByName("',ea.check,'"), msg)');}
else if(typeof ea.check==="function"){dY.push('!',eb.classname,'.$$properties.',name);dY.push('.check.call(this, value)');}
else if(typeof ea.check==="string"){dY.push('!(',ea.check,')');}
else if(ea.check instanceof Array){dY.push('qx.core.Assert.assertInArray(value, ',eb.classname,'.$$properties.',name,'.check, msg)');}
else {throw new Error("Could not add check to property "+name+" of class "+eb.classname);}
;;;;;dY.push(')prop.error(this,5,"',name,'","',ec,'",value);');}
;}
,"false":undefined}),__F:function(ed,name,ee,ef){if(ee==="setRuntime"){ed.push('this.',this.$$store.runtime[name],'=value;');}
else if(ee==="resetRuntime"){ed.push('if(this.',this.$$store.runtime[name],'!==undefined)');ed.push('delete this.',this.$$store.runtime[name],';');}
else if(ee==="set"){ed.push('this.',this.$$store.user[name],'=value;');}
else if(ee==="reset"){ed.push('if(this.',this.$$store.user[name],'!==undefined)');ed.push('delete this.',this.$$store.user[name],';');}
else if(ee==="setThemed"){ed.push('this.',this.$$store.theme[name],'=value;');}
else if(ee==="resetThemed"){ed.push('if(this.',this.$$store.theme[name],'!==undefined)');ed.push('delete this.',this.$$store.theme[name],';');}
else if(ee==="init"&&ef){ed.push('this.',this.$$store.init[name],'=value;');}
;;;;;;}
,__G:function(eg,eh,name,ei,ej){if(eh.inheritable){eg.push('var computed, old=this.',this.$$store.inherit[name],';');}
else {eg.push('var computed, old;');}
;eg.push('if(this.',this.$$store.runtime[name],'!==undefined){');if(ei==="setRuntime"){eg.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(ei==="resetRuntime"){eg.push('delete this.',this.$$store.runtime[name],';');eg.push('if(this.',this.$$store.user[name],'!==undefined)');eg.push('computed=this.',this.$$store.user[name],';');eg.push('else if(this.',this.$$store.theme[name],'!==undefined)');eg.push('computed=this.',this.$$store.theme[name],';');eg.push('else if(this.',this.$$store.init[name],'!==undefined){');eg.push('computed=this.',this.$$store.init[name],';');eg.push('this.',this.$$store.useinit[name],'=true;');eg.push('}');}
else {eg.push('old=computed=this.',this.$$store.runtime[name],';');if(ei==="set"){eg.push('this.',this.$$store.user[name],'=value;');}
else if(ei==="reset"){eg.push('delete this.',this.$$store.user[name],';');}
else if(ei==="setThemed"){eg.push('this.',this.$$store.theme[name],'=value;');}
else if(ei==="resetThemed"){eg.push('delete this.',this.$$store.theme[name],';');}
else if(ei==="init"&&ej){eg.push('this.',this.$$store.init[name],'=value;');}
;;;;}
;eg.push('}');eg.push('else if(this.',this.$$store.user[name],'!==undefined){');if(ei==="set"){if(!eh.inheritable){eg.push('old=this.',this.$$store.user[name],';');}
;eg.push('computed=this.',this.$$store.user[name],'=value;');}
else if(ei==="reset"){if(!eh.inheritable){eg.push('old=this.',this.$$store.user[name],';');}
;eg.push('delete this.',this.$$store.user[name],';');eg.push('if(this.',this.$$store.runtime[name],'!==undefined)');eg.push('computed=this.',this.$$store.runtime[name],';');eg.push('if(this.',this.$$store.theme[name],'!==undefined)');eg.push('computed=this.',this.$$store.theme[name],';');eg.push('else if(this.',this.$$store.init[name],'!==undefined){');eg.push('computed=this.',this.$$store.init[name],';');eg.push('this.',this.$$store.useinit[name],'=true;');eg.push('}');}
else {if(ei==="setRuntime"){eg.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(eh.inheritable){eg.push('computed=this.',this.$$store.user[name],';');}
else {eg.push('old=computed=this.',this.$$store.user[name],';');}
;if(ei==="setThemed"){eg.push('this.',this.$$store.theme[name],'=value;');}
else if(ei==="resetThemed"){eg.push('delete this.',this.$$store.theme[name],';');}
else if(ei==="init"&&ej){eg.push('this.',this.$$store.init[name],'=value;');}
;;}
;eg.push('}');if(eh.themeable){eg.push('else if(this.',this.$$store.theme[name],'!==undefined){');if(!eh.inheritable){eg.push('old=this.',this.$$store.theme[name],';');}
;if(ei==="setRuntime"){eg.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(ei==="set"){eg.push('computed=this.',this.$$store.user[name],'=value;');}
else if(ei==="setThemed"){eg.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(ei==="resetThemed"){eg.push('delete this.',this.$$store.theme[name],';');eg.push('if(this.',this.$$store.init[name],'!==undefined){');eg.push('computed=this.',this.$$store.init[name],';');eg.push('this.',this.$$store.useinit[name],'=true;');eg.push('}');}
else if(ei==="init"){if(ej){eg.push('this.',this.$$store.init[name],'=value;');}
;eg.push('computed=this.',this.$$store.theme[name],';');}
else if(ei==="refresh"){eg.push('computed=this.',this.$$store.theme[name],';');}
;;;;;eg.push('}');}
;eg.push('else if(this.',this.$$store.useinit[name],'){');if(!eh.inheritable){eg.push('old=this.',this.$$store.init[name],';');}
;if(ei==="init"){if(ej){eg.push('computed=this.',this.$$store.init[name],'=value;');}
else {eg.push('computed=this.',this.$$store.init[name],';');}
;}
else if(ei==="set"||ei==="setRuntime"||ei==="setThemed"||ei==="refresh"){eg.push('delete this.',this.$$store.useinit[name],';');if(ei==="setRuntime"){eg.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(ei==="set"){eg.push('computed=this.',this.$$store.user[name],'=value;');}
else if(ei==="setThemed"){eg.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(ei==="refresh"){eg.push('computed=this.',this.$$store.init[name],';');}
;;;}
;eg.push('}');if(ei==="set"||ei==="setRuntime"||ei==="setThemed"||ei==="init"){eg.push('else{');if(ei==="setRuntime"){eg.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(ei==="set"){eg.push('computed=this.',this.$$store.user[name],'=value;');}
else if(ei==="setThemed"){eg.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(ei==="init"){if(ej){eg.push('computed=this.',this.$$store.init[name],'=value;');}
else {eg.push('computed=this.',this.$$store.init[name],';');}
;eg.push('this.',this.$$store.useinit[name],'=true;');}
;;;eg.push('}');}
;}
,__H:function(ek,el,name,em){ek.push('if(computed===undefined||computed===inherit){');if(em==="refresh"){ek.push('computed=value;');}
else {ek.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');}
;ek.push('if((computed===undefined||computed===inherit)&&');ek.push('this.',this.$$store.init[name],'!==undefined&&');ek.push('this.',this.$$store.init[name],'!==inherit){');ek.push('computed=this.',this.$$store.init[name],';');ek.push('this.',this.$$store.useinit[name],'=true;');ek.push('}else{');ek.push('delete this.',this.$$store.useinit[name],';}');ek.push('}');ek.push('if(old===computed)return value;');ek.push('if(computed===inherit){');ek.push('computed=undefined;delete this.',this.$$store.inherit[name],';');ek.push('}');ek.push('else if(computed===undefined)');ek.push('delete this.',this.$$store.inherit[name],';');ek.push('else this.',this.$$store.inherit[name],'=computed;');ek.push('var backup=computed;');if(el.init!==undefined&&em!=="init"){ek.push('if(old===undefined)old=this.',this.$$store.init[name],";");}
else {ek.push('if(old===undefined)old=null;');}
;ek.push('if(computed===undefined||computed==inherit)computed=null;');}
,__I:function(en,eo,name,ep){if(ep!=="set"&&ep!=="setRuntime"&&ep!=="setThemed"){en.push('if(computed===undefined)computed=null;');}
;en.push('if(old===computed)return value;');if(eo.init!==undefined&&ep!=="init"){en.push('if(old===undefined)old=this.',this.$$store.init[name],";");}
else {en.push('if(old===undefined)old=null;');}
;}
,__J:function(eq,er,name){if(er.apply){eq.push('this.',er.apply,'(computed, old, "',name,'");');}
;if(er.event){eq.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",er.event,"')){","reg.fireEvent(this, '",er.event,"', qx.event.type.Data, [computed, old]",")}");}
;}
,__K:function(es,name){es.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');es.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');es.push('}');}
},defer:function(et){var ev=navigator.userAgent.indexOf(cd)!=-1;var eu=navigator.userAgent.indexOf(u)!=-1;if(ev||eu){et.__w=et.__x;}
;}
});}
)();
(function(){var p="Mixin",o='" contains an invalid mixin at position ',n="The mixin to include into class '",m="constructor",k="' is abstract! It is not possible to instantiate it.",j="environment",h='The configuration key "',g="extend",f='" is not allowed!',e='"! Every non-static class has to extend at least the "qx.core.Object" class.',br='"! Only mixins and arrays of mixins are allowed!',bq="string",bp="' is a singleton! It is not possible to instantiate it directly. Use the static getInstance() method instead.",bo="settings",bn='"! ',bm='" contains an invalid interface at position ',bl='" definition for class "',bk='The implement definition in class "',bj='Forbidden environment setting "',bi='". It is forbidden to define a default setting for an external namespace!',w="members",x="variants",u="events",v='Invalid type "',s='Invalid include definition in class "',t="properties",q="statics",r='Invalid config in class "',C="The class '",D='"! The value needs to be a map!',N='Invalid type of key "',K='". It is forbidden to define a ',V='Invalid implement definition in class "',Q="The mixin to patch class '",be="]",bb="Interface",G="qx.Class",bh='Forbidden variant "',bg="Please initialize '",bf="' objects using the new keyword!",F='"! The type of the key must be "',I='Assumed static class because no "extend" key was found. ',J="[Class ",M='"! Only interfaces and arrays of interfaces are allowed!',O='The include definition in class "',R='environment setting for an external namespace!',X='Error in include definition of class "',bd="The class ',",y='"! The value is undefined/null!',z='". It is forbidden to define a variant for an external namespace!',H='Forbidden setting "',U=': ',T="singleton",S="qx.aspects",ba='"!',Y="' is undefined/null!",P="abstract",W='Invalid key "',b='" found in "',bc="function",A="Array",B='" in class "',L="static",c="object",d=".",E="qx.debug";qx.Bootstrap.define(G,{statics:{__L:qx.core.Environment.get("module.property")?qx.core.Property:null,define:function(name,bs){if(!bs){var bs={};}
;if(bs.include&&!(qx.Bootstrap.getClass(bs.include)===A)){bs.include=[bs.include];}
;if(bs.implement&&!(qx.Bootstrap.getClass(bs.implement)===A)){bs.implement=[bs.implement];}
;var bt=false;if(!bs.hasOwnProperty(g)&&!bs.type){bs.type=L;bt=true;}
;if(qx.core.Environment.get(E)){try{this.__d(name,bs);}
catch(bw){if(bt){bw.message=I+bw.message;}
;throw bw;}
;}
;var bu=this.__O(name,bs.type,bs.extend,bs.statics,bs.construct,bs.destruct,bs.include);if(bs.extend){if(bs.properties){this.__Q(bu,bs.properties,true);}
;if(bs.members){this.__S(bu,bs.members,true,true,false);}
;if(bs.events){this.__P(bu,bs.events,true);}
;if(bs.include){for(var i=0,l=bs.include.length;i<l;i++){this.__W(bu,bs.include[i],false);}
;}
;}
;if(bs.environment){for(var bv in bs.environment){qx.core.Environment.add(bv,bs.environment[bv]);}
;}
;if(bs.implement){for(var i=0,l=bs.implement.length;i<l;i++){this.__U(bu,bs.implement[i]);}
;}
;if(qx.core.Environment.get(E)){this.__N(bu);}
;if(bs.defer){bs.defer.self=bu;bs.defer(bu,bu.prototype,{add:function(name,bx){var by={};by[name]=bx;qx.Class.__Q(bu,by,true);}
});}
;return bu;}
,undefine:function(name){delete this.$$registry[name];var bz=name.split(d);var bB=[window];for(var i=0;i<bz.length;i++){bB.push(bB[i][bz[i]]);}
;for(var i=bB.length-1;i>=1;i--){var bA=bB[i];var parent=bB[i-1];if(qx.Bootstrap.isFunction(bA)||qx.Bootstrap.objectGetLength(bA)===0){delete parent[bz[i-1]];}
else {break;}
;}
;}
,isDefined:qx.util.OOUtil.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,getByName:qx.Bootstrap.getByName,include:function(bC,bD){if(qx.core.Environment.get(E)){if(!bD){throw new Error(n+bC.classname+Y);}
;qx.Mixin.isCompatible(bD,bC);}
;qx.Class.__W(bC,bD,false);}
,patch:function(bE,bF){if(qx.core.Environment.get(E)){if(!bF){throw new Error(Q+bE.classname+Y);}
;qx.Mixin.isCompatible(bF,bE);}
;qx.Class.__W(bE,bF,true);}
,isSubClassOf:function(bG,bH){if(!bG){return false;}
;if(bG==bH){return true;}
;if(bG.prototype instanceof bH){return true;}
;return false;}
,getPropertyDefinition:qx.util.OOUtil.getPropertyDefinition,getProperties:function(bI){var bJ=[];while(bI){if(bI.$$properties){bJ.push.apply(bJ,qx.Bootstrap.getKeys(bI.$$properties));}
;bI=bI.superclass;}
;return bJ;}
,getByProperty:function(bK,name){while(bK){if(bK.$$properties&&bK.$$properties[name]){return bK;}
;bK=bK.superclass;}
;return null;}
,hasProperty:qx.util.OOUtil.hasProperty,getEventType:qx.util.OOUtil.getEventType,supportsEvent:qx.util.OOUtil.supportsEvent,hasOwnMixin:function(bL,bM){return bL.$$includes&&bL.$$includes.indexOf(bM)!==-1;}
,getByMixin:function(bN,bO){var bP,i,l;while(bN){if(bN.$$includes){bP=bN.$$flatIncludes;for(i=0,l=bP.length;i<l;i++){if(bP[i]===bO){return bN;}
;}
;}
;bN=bN.superclass;}
;return null;}
,getMixins:qx.util.OOUtil.getMixins,hasMixin:function(bQ,bR){return !!this.getByMixin(bQ,bR);}
,hasOwnInterface:function(bS,bT){return bS.$$implements&&bS.$$implements.indexOf(bT)!==-1;}
,getByInterface:qx.util.OOUtil.getByInterface,getInterfaces:function(bU){var bV=[];while(bU){if(bU.$$implements){bV.push.apply(bV,bU.$$flatImplements);}
;bU=bU.superclass;}
;return bV;}
,hasInterface:qx.util.OOUtil.hasInterface,implementsInterface:function(bW,bX){var bY=bW.constructor;if(this.hasInterface(bY,bX)){return true;}
;try{qx.Interface.assertObject(bW,bX);return true;}
catch(ca){}
;try{qx.Interface.assert(bY,bX,false);return true;}
catch(cb){}
;return false;}
,getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;this.$$instance=new this;delete this.$$allowconstruct;}
;return this.$$instance;}
,genericToString:function(){return J+this.classname+be;}
,$$registry:qx.Bootstrap.$$registry,__c:qx.core.Environment.select(E,{"true":{"type":bq,"extend":bc,"implement":c,"include":c,"construct":bc,"statics":c,"properties":c,"members":c,"environment":c,"events":c,"defer":bc,"destruct":bc},"default":null}),__M:qx.core.Environment.select("qx.debug",{"true":{"type":"string","statics":"object","environment":"object","defer":"function"},"default":null}),__d:qx.core.Environment.select(E,{"true":function(name,cc){if(cc.type&&!(cc.type===L||cc.type===P||cc.type===T)){throw new Error(v+cc.type+bl+name+ba);}
;if(cc.type&&cc.type!==L&&!cc.extend){throw new Error(r+name+e);}
;var cf=cc.type===L?this.__M:this.__c;for(var ce in cc){if(!cf[ce]){throw new Error(h+ce+B+name+f);}
;if(cc[ce]==null){throw new Error(W+ce+B+name+y);}
;if(typeof cc[ce]!==cf[ce]){throw new Error(N+ce+B+name+F+cf[ce]+ba);}
;}
;var cd=[q,t,w,j,bo,x,u];for(var i=0,l=cd.length;i<l;i++){var ce=cd[i];if(cc[ce]!==undefined&&(cc[ce].$$hash!==undefined||!qx.Bootstrap.isObject(cc[ce]))){throw new Error(W+ce+B+name+D);}
;}
;if(cc.include){if(qx.Bootstrap.getClass(cc.include)===A){for(var i=0,a=cc.include,l=a.length;i<l;i++){if(a[i]==null||a[i].$$type!==p){throw new Error(O+name+o+i+U+a[i]);}
;}
;}
else {throw new Error(s+name+br);}
;}
;if(cc.implement){if(qx.Bootstrap.getClass(cc.implement)===A){for(var i=0,a=cc.implement,l=a.length;i<l;i++){if(a[i]==null||a[i].$$type!==bb){throw new Error(bk+name+bm+i+U+a[i]);}
;}
;}
else {throw new Error(V+name+M);}
;}
;if(cc.include){try{qx.Mixin.checkCompatibility(cc.include);}
catch(cg){throw new Error(X+name+bn+cg.message);}
;}
;if(cc.environment){for(var ce in cc.environment){if(ce.substr(0,ce.indexOf(d))!=name.substr(0,name.indexOf(d))){throw new Error(bj+ce+b+name+K+R);}
;}
;}
;if(cc.settings){for(var ce in cc.settings){if(ce.substr(0,ce.indexOf(d))!=name.substr(0,name.indexOf(d))){throw new Error(H+ce+b+name+bi);}
;}
;}
;if(cc.variants){for(var ce in cc.variants){if(ce.substr(0,ce.indexOf(d))!=name.substr(0,name.indexOf(d))){throw new Error(bh+ce+b+name+z);}
;}
;}
;}
,"default":function(){}
}),__N:qx.core.Environment.select("qx.debug",{"true":function(ch){var cj=ch.superclass;while(cj){if(cj.$$classtype!=="abstract"){break;}
;var ci=cj.$$implements;if(ci){for(var i=0;i<ci.length;i++){qx.Interface.assert(ch,ci[i],true);}
;}
;cj=cj.superclass;}
;}
,"default":function(){}
}),__O:function(name,ck,cl,cm,cn,co,cp){var cs;if(!cl&&qx.core.Environment.get("qx.aspects")==false){cs=cm||{};qx.Bootstrap.setDisplayNames(cs,name);}
else {var cs={};if(cl){if(!cn){cn=this.__X();}
;if(this.__ba(cl,cp)){cs=this.__bb(cn,name,ck);}
else {cs=cn;}
;if(ck==="singleton"){cs.getInstance=this.getInstance;}
;qx.Bootstrap.setDisplayName(cn,name,"constructor");}
;if(cm){qx.Bootstrap.setDisplayNames(cm,name);var ct;for(var i=0,a=qx.Bootstrap.getKeys(cm),l=a.length;i<l;i++){ct=a[i];var cq=cm[ct];if(qx.core.Environment.get("qx.aspects")){if(cq instanceof Function){cq=qx.core.Aspect.wrap(name+"."+ct,cq,"static");}
;cs[ct]=cq;}
else {cs[ct]=cq;}
;}
;}
;}
;var cr=name?qx.Bootstrap.createNamespace(name,cs):"";cs.name=cs.classname=name;cs.basename=cr;cs.$$type="Class";if(ck){cs.$$classtype=ck;}
;if(!cs.hasOwnProperty("toString")){cs.toString=this.genericToString;}
;if(cl){qx.Bootstrap.extendClass(cs,cn,cl,name,cr);if(co){if(qx.core.Environment.get("qx.aspects")){co=qx.core.Aspect.wrap(name,co,"destructor");}
;cs.$$destructor=co;qx.Bootstrap.setDisplayName(co,name,"destruct");}
;}
;this.$$registry[name]=cs;return cs;}
,__P:function(cu,cv,cw){if(qx.core.Environment.get("qx.debug")){if(typeof cv!=="object"||qx.Bootstrap.getClass(cv)==="Array"){throw new Error(cu.classname+": the events must be defined as map!");}
;for(var cx in cv){if(typeof cv[cx]!=="string"){throw new Error(cu.classname+"/"+cx+": the event value needs to be a string with the class name of the event object which will be fired.");}
;}
;if(cu.$$events&&cw!==true){for(var cx in cv){if(cu.$$events[cx]!==undefined&&cu.$$events[cx]!==cv[cx]){throw new Error(cu.classname+"/"+cx+": the event value/type cannot be changed from "+cu.$$events[cx]+" to "+cv[cx]);}
;}
;}
;}
;if(cu.$$events){for(var cx in cv){cu.$$events[cx]=cv[cx];}
;}
else {cu.$$events=cv;}
;}
,__Q:function(cy,cz,cA){if(!qx.core.Environment.get("module.property")){throw new Error("Property module disabled.");}
;var cB;if(cA===undefined){cA=false;}
;var cC=cy.prototype;for(var name in cz){cB=cz[name];if(qx.core.Environment.get("qx.debug")){this.__R(cy,name,cB,cA);}
;cB.name=name;if(!cB.refine){if(cy.$$properties===undefined){cy.$$properties={};}
;cy.$$properties[name]=cB;}
;if(cB.init!==undefined){cy.prototype["$$init_"+name]=cB.init;}
;if(cB.event!==undefined){if(!qx.core.Environment.get("module.events")){throw new Error("Events module not enabled.");}
;var event={};event[cB.event]="qx.event.type.Data";this.__P(cy,event,cA);}
;if(cB.inheritable){this.__L.$$inheritable[name]=true;if(!cC.$$refreshInheritables){this.__L.attachRefreshInheritables(cy);}
;}
;if(!cB.refine){this.__L.attachMethods(cy,name,cB);}
;}
;}
,__R:qx.core.Environment.select("qx.debug",{"true":function(cD,name,cE,cF){if(!qx.core.Environment.get("module.property")){throw new Error("Property module disabled.");}
;var cH=this.hasProperty(cD,name);if(cH){var cG=this.getPropertyDefinition(cD,name);if(cE.refine&&cG.init===undefined){throw new Error("Could not refine an init value if there was previously no init value defined. Property '"+name+"' of class '"+cD.classname+"'.");}
;}
;if(!cH&&cE.refine){throw new Error("Could not refine non-existent property: '"+name+"' of class: '"+cD.classname+"'!");}
;if(cH&&!cF){throw new Error("Class "+cD.classname+" already has a property: "+name+"!");}
;if(cH&&cF){if(!cE.refine){throw new Error('Could not refine property "'+name+'" without a "refine" flag in the property definition! This class: '+cD.classname+', original class: '+this.getByProperty(cD,name).classname+'.');}
;for(var cI in cE){if(cI!=="init"&&cI!=="refine"){throw new Error("Class "+cD.classname+" could not refine property: "+name+"! Key: "+cI+" could not be refined!");}
;}
;}
;var cJ=cE.group?this.__L.$$allowedGroupKeys:this.__L.$$allowedKeys;for(var cI in cE){if(cJ[cI]===undefined){throw new Error('The configuration key "'+cI+'" of property "'+name+'" in class "'+cD.classname+'" is not allowed!');}
;if(cE[cI]===undefined){throw new Error('Invalid key "'+cI+'" of property "'+name+'" in class "'+cD.classname+'"! The value is undefined: '+cE[cI]);}
;if(cJ[cI]!==null&&typeof cE[cI]!==cJ[cI]){throw new Error('Invalid type of key "'+cI+'" of property "'+name+'" in class "'+cD.classname+'"! The type of the key must be "'+cJ[cI]+'"!');}
;}
;if(cE.transform!=null){if(!(typeof cE.transform=="string")){throw new Error('Invalid transform definition of property "'+name+'" in class "'+cD.classname+'"! Needs to be a String.');}
;}
;if(cE.check!=null){if(!qx.Bootstrap.isString(cE.check)&&!qx.Bootstrap.isArray(cE.check)&&!qx.Bootstrap.isFunction(cE.check)){throw new Error('Invalid check definition of property "'+name+'" in class "'+cD.classname+'"! Needs to be a String, Array or Function.');}
;}
;}
,"default":null}),__S:function(cK,cL,cM,cN,cO){var cP=cK.prototype;var cR,cQ;qx.Bootstrap.setDisplayNames(cL,cK.classname+".prototype");for(var i=0,a=qx.Bootstrap.getKeys(cL),l=a.length;i<l;i++){cR=a[i];cQ=cL[cR];if(qx.core.Environment.get("qx.debug")){if(cP[cR]!==undefined&&cR.charAt(0)=="_"&&cR.charAt(1)=="_"){throw new Error('Overwriting private member "'+cR+'" of Class "'+cK.classname+'" is not allowed!');}
;if(cM!==true&&cP.hasOwnProperty(cR)){throw new Error('Overwriting member "'+cR+'" of Class "'+cK.classname+'" is not allowed!');}
;}
;if(cN!==false&&cQ instanceof Function&&cQ.$$type==null){if(cO==true){cQ=this.__T(cQ,cP[cR]);}
else {if(cP[cR]){cQ.base=cP[cR];}
;cQ.self=cK;}
;if(qx.core.Environment.get("qx.aspects")){cQ=qx.core.Aspect.wrap(cK.classname+"."+cR,cQ,"member");}
;}
;cP[cR]=cQ;}
;}
,__T:function(cS,cT){if(cT){return function(){var cV=cS.base;cS.base=cT;var cU=cS.apply(this,arguments);cS.base=cV;return cU;}
;}
else {return cS;}
;}
,__U:function(cW,cX){if(qx.core.Environment.get("qx.debug")){if(!cW||!cX){throw new Error("Incomplete parameters!");}
;if(this.hasOwnInterface(cW,cX)){throw new Error('Interface "'+cX.name+'" is already used by Class "'+cW.classname+'!');}
;if(cW.$$classtype!=="abstract"){qx.Interface.assert(cW,cX,true);}
;}
;var cY=qx.Interface.flatten([cX]);if(cW.$$implements){cW.$$implements.push(cX);cW.$$flatImplements.push.apply(cW.$$flatImplements,cY);}
else {cW.$$implements=[cX];cW.$$flatImplements=cY;}
;}
,__V:function(da){var name=da.classname;var db=this.__bb(da,name,da.$$classtype);for(var i=0,a=qx.Bootstrap.getKeys(da),l=a.length;i<l;i++){dc=a[i];db[dc]=da[dc];}
;db.prototype=da.prototype;var de=da.prototype;for(var i=0,a=qx.Bootstrap.getKeys(de),l=a.length;i<l;i++){dc=a[i];var df=de[dc];if(df&&df.self==da){df.self=db;}
;}
;for(var dc in this.$$registry){var dd=this.$$registry[dc];if(!dd){continue;}
;if(dd.base==da){dd.base=db;}
;if(dd.superclass==da){dd.superclass=db;}
;if(dd.$$original){if(dd.$$original.base==da){dd.$$original.base=db;}
;if(dd.$$original.superclass==da){dd.$$original.superclass=db;}
;}
;}
;qx.Bootstrap.createNamespace(name,db);this.$$registry[name]=db;return db;}
,__W:function(dg,dh,di){if(qx.core.Environment.get("qx.debug")){if(!dg||!dh){throw new Error("Incomplete parameters!");}
;}
;if(this.hasMixin(dg,dh)){return;}
;var dl=dg.$$original;if(dh.$$constructor&&!dl){dg=this.__V(dg);}
;var dk=qx.Mixin.flatten([dh]);var dj;for(var i=0,l=dk.length;i<l;i++){dj=dk[i];if(dj.$$events){this.__P(dg,dj.$$events,di);}
;if(dj.$$properties){this.__Q(dg,dj.$$properties,di);}
;if(dj.$$members){this.__S(dg,dj.$$members,di,di,di);}
;}
;if(dg.$$includes){dg.$$includes.push(dh);dg.$$flatIncludes.push.apply(dg.$$flatIncludes,dk);}
else {dg.$$includes=[dh];dg.$$flatIncludes=dk;}
;}
,__X:function(){function dm(){dm.base.apply(this,arguments);}
;return dm;}
,__Y:function(){return function(){}
;}
,__ba:function(dn,dp){if(qx.core.Environment.get(E)){return true;}
;if(dn&&dn.$$includes){var dq=dn.$$flatIncludes;for(var i=0,l=dq.length;i<l;i++){if(dq[i].$$constructor){return true;}
;}
;}
;if(dp){var dr=qx.Mixin.flatten(dp);for(var i=0,l=dr.length;i<l;i++){if(dr[i].$$constructor){return true;}
;}
;}
;return false;}
,__bb:function(ds,name,dt){var dv=function(){var dy=dv;if(qx.core.Environment.get(E)){if(!(this instanceof dy)){throw new Error(bg+name+bf);}
;if(dt===P){if(this.classname===name){throw new Error(bd+name+k);}
;}
else if(dt===T){if(!dy.$$allowconstruct){throw new Error(C+name+bp);}
;}
;}
;var dx=dy.$$original.apply(this,arguments);if(dy.$$includes){var dw=dy.$$flatIncludes;for(var i=0,l=dw.length;i<l;i++){if(dw[i].$$constructor){dw[i].$$constructor.apply(this,arguments);}
;}
;}
;if(qx.core.Environment.get(E)){if(this.classname===name){this.$$initialized=true;}
;}
;return dx;}
;if(qx.core.Environment.get(S)){var du=qx.core.Aspect.wrap(name,dv,m);dv.$$original=ds;dv.constructor=du;dv=du;}
;dv.$$original=ds;ds.wrapper=dv;return dv;}
},defer:function(){if(qx.core.Environment.get(S)){for(var dz in qx.Bootstrap.$$registry){var dA=qx.Bootstrap.$$registry[dz];for(var dB in dA){if(dA[dB] instanceof Function){dA[dB]=qx.core.Aspect.wrap(dz+d+dB,dA[dB],L);}
;}
;}
;}
;}
});}
)();
(function(){var k="join",j="toLocaleUpperCase",h="shift",g="substr",f="filter",e="unshift",d="match",c="quote",b="qx.lang.Generics",a="localeCompare",I="sort",H="some",G="charAt",F="split",E="substring",D="pop",C="toUpperCase",B="replace",A="push",z="charCodeAt",t="every",u="reverse",q="search",r="forEach",o="map",p="toLowerCase",m="splice",n="toLocaleLowerCase",v="indexOf",w="lastIndexOf",y="slice",x="concat";qx.Class.define(b,{statics:{__bd:{"Array":[k,u,I,A,D,h,e,m,x,y,v,w,r,o,f,H,t],"String":[c,E,p,C,G,z,v,w,n,j,a,d,q,B,F,g,x,y]},__be:function(J,K){return function(s){return J.prototype[K].apply(s,Array.prototype.slice.call(arguments,1));}
;}
,__bf:function(){var L=qx.lang.Generics.__bd;for(var P in L){var N=window[P];var M=L[P];for(var i=0,l=M.length;i<l;i++){var O=M[i];if(!N[O]){N[O]=qx.lang.Generics.__be(N,O);}
;}
;}
;}
},defer:function(Q){Q.__bf();}
});}
)();
(function(){var a="qx.data.MBinding";qx.Mixin.define(a,{members:{bind:function(b,c,d,e){return qx.data.SingleValueBinding.bind(this,b,c,d,e);}
,removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);}
,removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);}
,getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);}
}});}
)();
(function(){var m="Boolean",l="Data after conversion: ",k=")",h=") to the object '",g="Can not remove the bindings for null object!",f="Please use only one array at a time: ",d="Binding executed from ",c="Integer",b=" of object ",a="qx.event.type.Data",Y="qx.data.SingleValueBinding",X="No number or 'last' value hast been given",W="Binding property ",V="Binding could not be found!",U=" to ",T="Binding from '",S=" (",R="PositiveNumber",Q="Data before conversion: ",P="PositiveInteger",u="Binding does not exist!",v=" in an array binding: ",s=" is not an data (qx.event.type.Data) event on ",t=").",q=" by ",r="Date",n=" not possible: No event available. ",p="qx.debug.databinding",w=". Error message: ",x="set",E="deepBinding",C="item",I="reset",G="Failed so set value ",L="qx.debug",K=" does not work.",z="' (",O=" on ",N="String",M="Number",y="change",A="]",B=".",D="last",F="[",H="",J="get";qx.Class.define(Y,{statics:{__bg:{},bind:function(ba,bb,bc,bd,be){var bp=this.__bi(ba,bb,bc,bd,be);var bk=bb.split(B);var bg=this.__bo(bk);var bo=[];var bl=[];var bm=[];var bi=[];var bj=ba;try{for(var i=0;i<bk.length;i++){if(bg[i]!==H){bi.push(y);}
else {bi.push(this.__bj(bj,bk[i]));}
;bo[i]=bj;if(i==bk.length-1){if(bg[i]!==H){var bt=bg[i]===D?bj.length-1:bg[i];var bf=bj.getItem(bt);this.__bn(bf,bc,bd,be,ba);bm[i]=this.__bp(bj,bi[i],bc,bd,be,bg[i]);}
else {if(bk[i]!=null&&bj[J+qx.lang.String.firstUp(bk[i])]!=null){var bf=bj[J+qx.lang.String.firstUp(bk[i])]();this.__bn(bf,bc,bd,be,ba);}
;bm[i]=this.__bp(bj,bi[i],bc,bd,be);}
;}
else {var bq={index:i,propertyNames:bk,sources:bo,listenerIds:bm,arrayIndexValues:bg,targetObject:bc,targetPropertyChain:bd,options:be,listeners:bl};var bn=qx.lang.Function.bind(this.__bh,this,bq);bl.push(bn);bm[i]=bj.addListener(bi[i],bn);}
;if(bj[J+qx.lang.String.firstUp(bk[i])]==null){bj=null;}
else if(bg[i]!==H){bj=bj[J+qx.lang.String.firstUp(bk[i])](bg[i]);}
else {bj=bj[J+qx.lang.String.firstUp(bk[i])]();}
;if(!bj){break;}
;}
;}
catch(bu){for(var i=0;i<bo.length;i++){if(bo[i]&&bm[i]){bo[i].removeListenerById(bm[i]);}
;}
;var bs=bp.targets;var bh=bp.listenerIds[i];for(var i=0;i<bs.length;i++){if(bs[i]&&bh[i]){bs[i].removeListenerById(bh[i]);}
;}
;throw bu;}
;var br={type:E,listenerIds:bm,sources:bo,targetListenerIds:bp.listenerIds,targets:bp.targets};this.__bq(br,ba,bb,bc,bd);return br;}
,__bh:function(bv){if(bv.options&&bv.options.onUpdate){bv.options.onUpdate(bv.sources[bv.index],bv.targetObject);}
;for(var j=bv.index+1;j<bv.propertyNames.length;j++){var bz=bv.sources[j];bv.sources[j]=null;if(!bz){continue;}
;bz.removeListenerById(bv.listenerIds[j]);}
;var bz=bv.sources[bv.index];for(var j=bv.index+1;j<bv.propertyNames.length;j++){if(bv.arrayIndexValues[j-1]!==H){bz=bz[J+qx.lang.String.firstUp(bv.propertyNames[j-1])](bv.arrayIndexValues[j-1]);}
else {bz=bz[J+qx.lang.String.firstUp(bv.propertyNames[j-1])]();}
;bv.sources[j]=bz;if(!bz){this.__bk(bv.targetObject,bv.targetPropertyChain);break;}
;if(j==bv.propertyNames.length-1){if(qx.Class.implementsInterface(bz,qx.data.IListData)){var bA=bv.arrayIndexValues[j]===D?bz.length-1:bv.arrayIndexValues[j];var bx=bz.getItem(bA);this.__bn(bx,bv.targetObject,bv.targetPropertyChain,bv.options,bv.sources[bv.index]);bv.listenerIds[j]=this.__bp(bz,y,bv.targetObject,bv.targetPropertyChain,bv.options,bv.arrayIndexValues[j]);}
else {if(bv.propertyNames[j]!=null&&bz[J+qx.lang.String.firstUp(bv.propertyNames[j])]!=null){var bx=bz[J+qx.lang.String.firstUp(bv.propertyNames[j])]();this.__bn(bx,bv.targetObject,bv.targetPropertyChain,bv.options,bv.sources[bv.index]);}
;var by=this.__bj(bz,bv.propertyNames[j]);bv.listenerIds[j]=this.__bp(bz,by,bv.targetObject,bv.targetPropertyChain,bv.options);}
;}
else {if(bv.listeners[j]==null){var bw=qx.lang.Function.bind(this.__bh,this,bv);bv.listeners.push(bw);}
;if(qx.Class.implementsInterface(bz,qx.data.IListData)){var by=y;}
else {var by=this.__bj(bz,bv.propertyNames[j]);}
;bv.listenerIds[j]=bz.addListener(by,bv.listeners[j]);}
;}
;}
,__bi:function(bB,bC,bD,bE,bF){var bJ=bE.split(B);var bH=this.__bo(bJ);var bO=[];var bN=[];var bL=[];var bK=[];var bI=bD;for(var i=0;i<bJ.length-1;i++){if(bH[i]!==H){bK.push(y);}
else {try{bK.push(this.__bj(bI,bJ[i]));}
catch(e){break;}
;}
;bO[i]=bI;var bM=function(){for(var j=i+1;j<bJ.length-1;j++){var bR=bO[j];bO[j]=null;if(!bR){continue;}
;bR.removeListenerById(bL[j]);}
;var bR=bO[i];for(var j=i+1;j<bJ.length-1;j++){var bP=qx.lang.String.firstUp(bJ[j-1]);if(bH[j-1]!==H){var bS=bH[j-1]===D?bR.getLength()-1:bH[j-1];bR=bR[J+bP](bS);}
else {bR=bR[J+bP]();}
;bO[j]=bR;if(bN[j]==null){bN.push(bM);}
;if(qx.Class.implementsInterface(bR,qx.data.IListData)){var bQ=y;}
else {try{var bQ=qx.data.SingleValueBinding.__bj(bR,bJ[j]);}
catch(e){break;}
;}
;bL[j]=bR.addListener(bQ,bN[j]);}
;qx.data.SingleValueBinding.updateTarget(bB,bC,bD,bE,bF);}
;bN.push(bM);bL[i]=bI.addListener(bK[i],bM);var bG=qx.lang.String.firstUp(bJ[i]);if(bI[J+bG]==null){bI=null;}
else if(bH[i]!==H){bI=bI[J+bG](bH[i]);}
else {bI=bI[J+bG]();}
;if(!bI){break;}
;}
;return {listenerIds:bL,targets:bO};}
,updateTarget:function(bT,bU,bV,bW,bX){var bY=this.getValueFromObject(bT,bU);bY=qx.data.SingleValueBinding.__br(bY,bV,bW,bX,bT);this.__bl(bV,bW,bY);}
,getValueFromObject:function(o,ca){var ce=this.__bm(o,ca);var cc;if(ce!=null){var cg=ca.substring(ca.lastIndexOf(B)+1,ca.length);if(cg.charAt(cg.length-1)==A){var cb=cg.substring(cg.lastIndexOf(F)+1,cg.length-1);var cd=cg.substring(0,cg.lastIndexOf(F));var cf=ce[J+qx.lang.String.firstUp(cd)]();if(cb==D){cb=cf.length-1;}
;if(cf!=null){cc=cf.getItem(cb);}
;}
else {cc=ce[J+qx.lang.String.firstUp(cg)]();}
;}
;return cc;}
,__bj:function(ch,ci){var cj=this.__bs(ch,ci);if(cj==null){if(qx.Class.supportsEvent(ch.constructor,ci)){cj=ci;}
else if(qx.Class.supportsEvent(ch.constructor,y+qx.lang.String.firstUp(ci))){cj=y+qx.lang.String.firstUp(ci);}
else {throw new qx.core.AssertionError(W+ci+b+ch+n);}
;}
;return cj;}
,__bk:function(ck,cl){var cm=this.__bm(ck,cl);if(cm!=null){var cn=cl.substring(cl.lastIndexOf(B)+1,cl.length);if(cn.charAt(cn.length-1)==A){this.__bl(ck,cl,null);return;}
;if(cm[I+qx.lang.String.firstUp(cn)]!=undefined){cm[I+qx.lang.String.firstUp(cn)]();}
else {cm[x+qx.lang.String.firstUp(cn)](null);}
;}
;}
,__bl:function(co,cp,cq){var cu=this.__bm(co,cp);if(cu!=null){var cv=cp.substring(cp.lastIndexOf(B)+1,cp.length);if(cv.charAt(cv.length-1)==A){var cr=cv.substring(cv.lastIndexOf(F)+1,cv.length-1);var ct=cv.substring(0,cv.lastIndexOf(F));var cs=co;if(!qx.Class.implementsInterface(cs,qx.data.IListData)){cs=cu[J+qx.lang.String.firstUp(ct)]();}
;if(cr==D){cr=cs.length-1;}
;if(cs!=null){cs.setItem(cr,cq);}
;}
else {cu[x+qx.lang.String.firstUp(cv)](cq);}
;}
;}
,__bm:function(cw,cx){var cA=cx.split(B);var cB=cw;for(var i=0;i<cA.length-1;i++){try{var cz=cA[i];if(cz.indexOf(A)==cz.length-1){var cy=cz.substring(cz.indexOf(F)+1,cz.length-1);cz=cz.substring(0,cz.indexOf(F));}
;if(cz!=H){cB=cB[J+qx.lang.String.firstUp(cz)]();}
;if(cy!=null){if(cy==D){cy=cB.length-1;}
;cB=cB.getItem(cy);cy=null;}
;}
catch(cC){return null;}
;}
;return cB;}
,__bn:function(cD,cE,cF,cG,cH){cD=this.__br(cD,cE,cF,cG,cH);if(cD===undefined){this.__bk(cE,cF);}
;if(cD!==undefined){try{this.__bl(cE,cF,cD);if(cG&&cG.onUpdate){cG.onUpdate(cH,cE,cD);}
;}
catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;}
;if(cG&&cG.onSetFail){cG.onSetFail(e);}
else {qx.log.Logger.warn(G+cD+O+cE+w+e);}
;}
;}
;}
,__bo:function(cI){var cJ=[];for(var i=0;i<cI.length;i++){var name=cI[i];if(qx.lang.String.endsWith(name,A)){var cK=name.substring(name.indexOf(F)+1,name.indexOf(A));if(name.indexOf(A)!=name.length-1){throw new Error(f+name+K);}
;if(cK!==D){if(cK==H||isNaN(parseInt(cK,10))){throw new Error(X+v+name+K);}
;}
;if(name.indexOf(F)!=0){cI[i]=name.substring(0,name.indexOf(F));cJ[i]=H;cJ[i+1]=cK;cI.splice(i+1,0,C);i++;}
else {cJ[i]=cK;cI.splice(i,1,C);}
;}
else {cJ[i]=H;}
;}
;return cJ;}
,__bp:function(cL,cM,cN,cO,cP,cQ){if(qx.core.Environment.get(L)){var cR=qx.Class.getEventType(cL.constructor,cM);qx.core.Assert.assertEquals(a,cR,cM+s+cL+B);}
;var cT=function(cU,e){if(cU!==H){if(cU===D){cU=cL.length-1;}
;var cX=cL.getItem(cU);if(cX===undefined){qx.data.SingleValueBinding.__bk(cN,cO);}
;var cV=e.getData().start;var cW=e.getData().end;if(cU<cV||cU>cW){return;}
;}
else {var cX=e.getData();}
;if(qx.core.Environment.get(p)){qx.log.Logger.debug(d+cL+q+cM+U+cN+S+cO+k);qx.log.Logger.debug(Q+cX);}
;cX=qx.data.SingleValueBinding.__br(cX,cN,cO,cP,cL);if(qx.core.Environment.get(p)){qx.log.Logger.debug(l+cX);}
;try{if(cX!==undefined){qx.data.SingleValueBinding.__bl(cN,cO,cX);}
else {qx.data.SingleValueBinding.__bk(cN,cO);}
;if(cP&&cP.onUpdate){cP.onUpdate(cL,cN,cX);}
;}
catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;}
;if(cP&&cP.onSetFail){cP.onSetFail(e);}
else {qx.log.Logger.warn(G+cX+O+cN+w+e);}
;}
;}
;if(!cQ){cQ=H;}
;cT=qx.lang.Function.bind(cT,cL,cQ);var cS=cL.addListener(cM,cT);return cS;}
,__bq:function(cY,da,db,dc,dd){if(this.__bg[da.toHashCode()]===undefined){this.__bg[da.toHashCode()]=[];}
;this.__bg[da.toHashCode()].push([cY,da,db,dc,dd]);}
,__br:function(de,df,dg,dh,di){if(dh&&dh.converter){var dk;if(df.getModel){dk=df.getModel();}
;return dh.converter(de,dk,di,df);}
else {var dm=this.__bm(df,dg);var dn=dg.substring(dg.lastIndexOf(B)+1,dg.length);if(dm==null){return de;}
;var dl=qx.Class.getPropertyDefinition(dm.constructor,dn);var dj=dl==null?H:dl.check;return this.__bt(de,dj);}
;}
,__bs:function(dp,dq){var dr=qx.Class.getPropertyDefinition(dp.constructor,dq);if(dr==null){return null;}
;return dr.event;}
,__bt:function(ds,dt){var du=qx.lang.Type.getClass(ds);if((du==M||du==N)&&(dt==c||dt==P)){ds=parseInt(ds,10);}
;if((du==m||du==M||du==r)&&dt==N){ds=ds+H;}
;if((du==M||du==N)&&(dt==M||dt==R)){ds=parseFloat(ds);}
;return ds;}
,removeBindingFromObject:function(dv,dw){if(dw.type==E){for(var i=0;i<dw.sources.length;i++){if(dw.sources[i]){dw.sources[i].removeListenerById(dw.listenerIds[i]);}
;}
;for(var i=0;i<dw.targets.length;i++){if(dw.targets[i]){dw.targets[i].removeListenerById(dw.targetListenerIds[i]);}
;}
;}
else {dv.removeListenerById(dw);}
;var dx=this.__bg[dv.toHashCode()];if(dx!=undefined){for(var i=0;i<dx.length;i++){if(dx[i][0]==dw){qx.lang.Array.remove(dx,dx[i]);return;}
;}
;}
;throw new Error(V);}
,removeAllBindingsForObject:function(dy){if(qx.core.Environment.get(L)){qx.core.Assert.assertNotNull(dy,g);}
;var dz=this.__bg[dy.toHashCode()];if(dz!=undefined){for(var i=dz.length-1;i>=0;i--){this.removeBindingFromObject(dy,dz[i][0]);}
;}
;}
,getAllBindingsForObject:function(dA){if(this.__bg[dA.toHashCode()]===undefined){this.__bg[dA.toHashCode()]=[];}
;return this.__bg[dA.toHashCode()];}
,removeAllBindings:function(){for(var dC in this.__bg){var dB=qx.core.ObjectRegistry.fromHashCode(dC);if(dB==null){delete this.__bg[dC];continue;}
;this.removeAllBindingsForObject(dB);}
;this.__bg={};}
,getAllBindings:function(){return this.__bg;}
,showBindingInLog:function(dD,dE){var dG;for(var i=0;i<this.__bg[dD.toHashCode()].length;i++){if(this.__bg[dD.toHashCode()][i][0]==dE){dG=this.__bg[dD.toHashCode()][i];break;}
;}
;if(dG===undefined){var dF=u;}
else {var dF=T+dG[1]+z+dG[2]+h+dG[3]+z+dG[4]+t;}
;qx.log.Logger.debug(dF);}
,showAllBindingsInLog:function(){for(var dI in this.__bg){var dH=qx.core.ObjectRegistry.fromHashCode(dI);for(var i=0;i<this.__bg[dI].length;i++){this.showBindingInLog(dH,this.__bg[dI][i][0]);}
;}
;}
}});}
)();
(function(){var p="]",o='\\u',n="undefined",m='\\$1',l="0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",k='-',j="qx.lang.String",h="(^|[^",g="0",f="%",c=' ',e='\n',d="])[",b="g",a="";qx.Bootstrap.define(j,{statics:{__bu:l,__bv:null,__bw:{},camelCase:function(q){var r=this.__bw[q];if(!r){r=q.replace(/\-([a-z])/g,function(s,t){return t.toUpperCase();}
);this.__bw[q]=r;}
;return r;}
,hyphenate:function(u){var v=this.__bw[u];if(!v){v=u.replace(/[A-Z]/g,function(w){return (k+w.charAt(0).toLowerCase());}
);this.__bw[u]=v;}
;return v;}
,capitalize:function(x){if(this.__bv===null){var y=o;this.__bv=new RegExp(h+this.__bu.replace(/[0-9A-F]{4}/g,function(z){return y+z;}
)+d+this.__bu.replace(/[0-9A-F]{4}/g,function(A){return y+A;}
)+p,b);}
;return x.replace(this.__bv,function(B){return B.toUpperCase();}
);}
,clean:function(C){return this.trim(C.replace(/\s+/g,c));}
,trimLeft:function(D){return D.replace(/^\s+/,a);}
,trimRight:function(E){return E.replace(/\s+$/,a);}
,trim:function(F){return F.replace(/^\s+|\s+$/g,a);}
,startsWith:function(G,H){return G.indexOf(H)===0;}
,endsWith:function(I,J){return I.substring(I.length-J.length,I.length)===J;}
,repeat:function(K,L){return K.length>0?new Array(L+1).join(K):a;}
,pad:function(M,length,N){var O=length-M.length;if(O>0){if(typeof N===n){N=g;}
;return this.repeat(N,O)+M;}
else {return M;}
;}
,firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(P,Q){return P.indexOf(Q)!=-1;}
,format:function(R,S){var T=R;var i=S.length;while(i--){T=T.replace(new RegExp(f+(i+1),b),S[i]+a);}
;return T;}
,escapeRegexpChars:function(U){return U.replace(/([.*+?^${}()|[\]\/\\])/g,m);}
,toArray:function(V){return V.split(/\B|\b/g);}
,stripTags:function(W){return W.replace(/<\/?[^>]+>/gi,a);}
,stripScripts:function(X,Y){var bb=a;var ba=X.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){bb+=arguments[1]+e;return a;}
);if(Y===true){qx.lang.Function.globalEval(bb);}
;return ba;}
}});}
)();
(function(){var p="[object Array]",o="qx.lang.Array",n="]",m="qx",k="number",j="][",h="string",g="Cannot clean-up map entry doneObjects[",f="The second parameter must be an array.",e="mshtml",b="engine.name",d="The first parameter must be an array.",c="Parameter must be an array.",a="qx.debug";qx.Bootstrap.define(o,{statics:{toArray:function(q,r){return this.cast(q,Array,r);}
,cast:function(s,t,u){if(s.constructor===t){return s;}
;if(qx.data&&qx.data.IListData){if(qx.Class&&qx.Class.hasInterface(s,qx.data.IListData)){var s=s.toArray();}
;}
;var v=new t;if((qx.core.Environment.get(b)==e)){if(s.item){for(var i=u||0,l=s.length;i<l;i++){v.push(s[i]);}
;return v;}
;}
;if(Object.prototype.toString.call(s)===p&&u==null){v.push.apply(v,s);}
else {v.push.apply(v,Array.prototype.slice.call(s,u||0));}
;return v;}
,fromArguments:function(w,x){return Array.prototype.slice.call(w,x||0);}
,fromCollection:function(y){if((qx.core.Environment.get(b)==e)){if(y.item){var z=[];for(var i=0,l=y.length;i<l;i++){z[i]=y[i];}
;return z;}
;}
;return Array.prototype.slice.call(y,0);}
,fromShortHand:function(A){var C=A.length;var B=qx.lang.Array.clone(A);switch(C){case 1:B[1]=B[2]=B[3]=B[0];break;case 2:B[2]=B[0];case 3:B[3]=B[1];};return B;}
,clone:function(D){return D.concat();}
,insertAt:function(E,F,i){E.splice(i,0,F);return E;}
,insertBefore:function(G,H,I){var i=G.indexOf(I);if(i==-1){G.push(H);}
else {G.splice(i,0,H);}
;return G;}
,insertAfter:function(J,K,L){var i=J.indexOf(L);if(i==-1||i==(J.length-1)){J.push(K);}
else {J.splice(i+1,0,K);}
;return J;}
,removeAt:function(M,i){return M.splice(i,1)[0];}
,removeAll:function(N){N.length=0;return this;}
,append:function(O,P){if(qx.core.Environment.get(a)){qx.core.Assert&&qx.core.Assert.assertArray(O,d);qx.core.Assert&&qx.core.Assert.assertArray(P,f);}
;Array.prototype.push.apply(O,P);return O;}
,exclude:function(Q,R){if(qx.core.Environment.get(a)){qx.core.Assert&&qx.core.Assert.assertArray(Q,d);qx.core.Assert&&qx.core.Assert.assertArray(R,f);}
;for(var i=0,T=R.length,S;i<T;i++){S=Q.indexOf(R[i]);if(S!=-1){Q.splice(S,1);}
;}
;return Q;}
,remove:function(U,V){var i=U.indexOf(V);if(i!=-1){U.splice(i,1);return V;}
;}
,contains:function(W,X){return W.indexOf(X)!==-1;}
,equals:function(Y,ba){var length=Y.length;if(length!==ba.length){return false;}
;for(var i=0;i<length;i++){if(Y[i]!==ba[i]){return false;}
;}
;return true;}
,sum:function(bb){var bc=0;for(var i=0,l=bb.length;i<l;i++){bc+=bb[i];}
;return bc;}
,max:function(bd){if(qx.core.Environment.get(a)){qx.core.Assert&&qx.core.Assert.assertArray(bd,c);}
;var i,bf=bd.length,be=bd[0];for(i=1;i<bf;i++){if(bd[i]>be){be=bd[i];}
;}
;return be===undefined?null:be;}
,min:function(bg){if(qx.core.Environment.get(a)){qx.core.Assert&&qx.core.Assert.assertArray(bg,c);}
;var i,bi=bg.length,bh=bg[0];for(i=1;i<bi;i++){if(bg[i]<bh){bh=bg[i];}
;}
;return bh===undefined?null:bh;}
,unique:function(bj){var bt=[],bl={},bo={},bq={};var bp,bk=0;var bu=m+qx.lang.Date.now();var bm=false,bs=false,bv=false;for(var i=0,br=bj.length;i<br;i++){bp=bj[i];if(bp===null){if(!bm){bm=true;bt.push(bp);}
;}
else if(bp===undefined){}
else if(bp===false){if(!bs){bs=true;bt.push(bp);}
;}
else if(bp===true){if(!bv){bv=true;bt.push(bp);}
;}
else if(typeof bp===h){if(!bl[bp]){bl[bp]=1;bt.push(bp);}
;}
else if(typeof bp===k){if(!bo[bp]){bo[bp]=1;bt.push(bp);}
;}
else {var bn=bp[bu];if(bn==null){bn=bp[bu]=bk++;}
;if(!bq[bn]){bq[bn]=bp;bt.push(bp);}
;}
;;;;;}
;for(var bn in bq){try{delete bq[bn][bu];}
catch(bw){try{bq[bn][bu]=null;}
catch(bx){throw new Error(g+bn+j+bu+n);}
;}
;}
;return bt;}
}});}
)();
(function(){var j="[object Opera]",i="[^\\.0-9]",h="4.0",g="1.9.0.0",f="Version/",e="9.0",d="8.0",c="Gecko",b="AppleWebKit/",a="opera",w="engine.version",v="mshtml",u="engine.name",t="webkit",s="5.0",r="qx.bom.client.Engine",q="function",p="gecko",o="Maple",n="Unsupported client: ",l="",m="! Assumed gecko version 1.9.0.0 (Firefox 3.0).",k=".";qx.Bootstrap.define(r,{statics:{getVersion:function(){var A=window.navigator.userAgent;var y=l;if(qx.bom.client.Engine.__bx()){if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(A)){if(A.indexOf(f)!=-1){var z=A.match(/Version\/(\d+)\.(\d+)/);y=z[1]+k+z[2].charAt(0)+k+z[2].substring(1,z[2].length);}
else {y=RegExp.$1+k+RegExp.$2;if(RegExp.$3!=l){y+=k+RegExp.$3;}
;}
;}
;}
else if(qx.bom.client.Engine.__by()){if(/AppleWebKit\/([^ ]+)/.test(A)){y=RegExp.$1;var B=RegExp(i).exec(y);if(B){y=y.slice(0,B.index);}
;}
;}
else if(qx.bom.client.Engine.__bA()||qx.bom.client.Engine.__bz()){if(/rv\:([^\);]+)(\)|;)/.test(A)){y=RegExp.$1;}
;}
else if(qx.bom.client.Engine.__bB()){if(/MSIE\s+([^\);]+)(\)|;)/.test(A)){y=RegExp.$1;if(y<8&&/Trident\/([^\);]+)(\)|;)/.test(A)){if(RegExp.$1==h){y=d;}
else if(RegExp.$1==s){y=e;}
;}
;}
;}
else {var x=window.qxFail;if(x&&typeof x===q){y=x().FULLVERSION;}
else {y=g;qx.Bootstrap.warn(n+A+m);}
;}
;;;return y;}
,getName:function(){var name;if(qx.bom.client.Engine.__bx()){name=a;}
else if(qx.bom.client.Engine.__by()){name=t;}
else if(qx.bom.client.Engine.__bA()||qx.bom.client.Engine.__bz()){name=p;}
else if(qx.bom.client.Engine.__bB()){name=v;}
else {var C=window.qxFail;if(C&&typeof C===q){name=C().NAME;}
else {name=p;qx.Bootstrap.warn(n+window.navigator.userAgent+m);}
;}
;;;return name;}
,__bx:function(){return window.opera&&Object.prototype.toString.call(window.opera)==j;}
,__by:function(){return window.navigator.userAgent.indexOf(b)!=-1;}
,__bz:function(){return window.navigator.userAgent.indexOf(o)!=-1;}
,__bA:function(){return window.controllers&&window.navigator.product===c&&window.navigator.userAgent.indexOf(o)==-1;}
,__bB:function(){return window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(window.navigator.userAgent);}
},defer:function(D){qx.core.Environment.add(w,D.getVersion);qx.core.Environment.add(u,D.getName);}
});}
)();
(function(){var f="qx.lang.Type",e="Error",d="RegExp",c="Date",b="Number",a="Boolean";qx.Bootstrap.define(f,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(g){return this.getClass(g)==d;}
,isNumber:function(h){return (h!==null&&(this.getClass(h)==b||h instanceof Number));}
,isBoolean:function(i){return (i!==null&&(this.getClass(i)==a||i instanceof Boolean));}
,isDate:function(j){return (j!==null&&(this.getClass(j)==c||j instanceof Date));}
,isError:function(k){return (k!==null&&(this.getClass(k)==e||k instanceof Error));}
}});}
)();
(function(){var p=" != ",o="qx.core.Object",n="Expected value to be an array but found ",m=") was fired.",k="Expected value to be an integer >= 0 but found ",j="' to be not equal with '",h="' to '",g="Expected object '",f="Called assertTrue with '",d="Expected value to be a map but found ",bC="The function did not raise an exception!",bB="Expected value to be undefined but found ",bA="Expected value to be a DOM element but found  '",bz="Expected value to be a regular expression but found ",by="' to implement the interface '",bx="Expected value to be null but found ",bw="Invalid argument 'type'",bv="Called assert with 'false'",bu="Assertion error! ",bt="null",w="' but found '",x="'undefined'",u="' must must be a key of the map '",v="The String '",s="Expected value to be a string but found ",t="Expected value not to be undefined but found undefined!",q="qx.util.ColorUtil",r=": ",E="The raised exception does not have the expected type! ",F=") not fired.",U="qx.core.Assert",Q="Expected value to be typeof object but found ",bd="' (identical) but found '",X="' must have any of the values defined in the array '",bp="Expected value to be a number but found ",bj="Called assertFalse with '",L="qx.ui.core.Widget",bs="Expected value to be a qooxdoo object but found ",br="' arguments.",bq="Expected value '%1' to be in the range '%2'..'%3'!",J="Array[",N="' does not match the regular expression '",P="' to be not identical with '",S="Expected [",V="' arguments but found '",Y="', which cannot be converted to a CSS color!",bf="qx.core.AssertionError",bl="Expected value to be a boolean but found ",y="Expected value not to be null but found null!",z="))!",M="Expected value to be a qooxdoo widget but found ",bc="Expected value to be typeof '",bb="\n Stack trace: \n",ba="Expected value to be typeof function but found ",bh="Expected value to be an integer but found ",bg="Called fail().",W="The parameter 're' must be a string or a regular expression.",be="qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'",a="Expected value to be a number >= 0 but found ",bk="Expected value to be instanceof '",A="], but found [",B="Wrong number of arguments given. Expected '",R="object",b="Event (",c="Expected value to be the CSS color '",I="' but found ",C="]",D=", ",H="The value '",T=")), but found value '",bn="' (rgb(",bm=",",O="'",bo="Expected '",K="'!",bi="!",G="";qx.Class.define(U,{statics:{__cz:true,__cA:function(bD,bE){var bI=G;for(var i=1,l=arguments.length;i<l;i++){bI=bI+this.__cB(arguments[i]===undefined?x:arguments[i]);}
;var bH=G;if(bI){bH=bD+r+bI;}
else {bH=bD;}
;var bG=bu+bH;if(qx.Class.isDefined(bf)){var bF=new qx.core.AssertionError(bD,bI);if(this.__cz){qx.Bootstrap.error(bG+bb+bF.getStackTrace());}
;throw bF;}
else {if(this.__cz){qx.Bootstrap.error(bG);}
;throw new Error(bG);}
;}
,__cB:function(bJ){var bK;if(bJ===null){bK=bt;}
else if(qx.lang.Type.isArray(bJ)&&bJ.length>10){bK=J+bJ.length+C;}
else if((bJ instanceof Object)&&(bJ.toString==null)){bK=qx.lang.Json.stringify(bJ,null,2);}
else {try{bK=bJ.toString();}
catch(e){bK=G;}
;}
;;return bK;}
,assert:function(bL,bM){bL==true||this.__cA(bM||G,bv);}
,fail:function(bN,bO){var bP=bO?G:bg;this.__cA(bN||G,bP);}
,assertTrue:function(bQ,bR){(bQ===true)||this.__cA(bR||G,f,bQ,O);}
,assertFalse:function(bS,bT){(bS===false)||this.__cA(bT||G,bj,bS,O);}
,assertEquals:function(bU,bV,bW){bU==bV||this.__cA(bW||G,bo,bU,w,bV,K);}
,assertNotEquals:function(bX,bY,ca){bX!=bY||this.__cA(ca||G,bo,bX,j,bY,K);}
,assertIdentical:function(cb,cc,cd){cb===cc||this.__cA(cd||G,bo,cb,bd,cc,K);}
,assertNotIdentical:function(ce,cf,cg){ce!==cf||this.__cA(cg||G,bo,ce,P,cf,K);}
,assertNotUndefined:function(ch,ci){ch!==undefined||this.__cA(ci||G,t);}
,assertUndefined:function(cj,ck){cj===undefined||this.__cA(ck||G,bB,cj,bi);}
,assertNotNull:function(cl,cm){cl!==null||this.__cA(cm||G,y);}
,assertNull:function(cn,co){cn===null||this.__cA(co||G,bx,cn,bi);}
,assertJsonEquals:function(cp,cq,cr){this.assertEquals(qx.lang.Json.stringify(cp),qx.lang.Json.stringify(cq),cr);}
,assertMatch:function(cs,ct,cu){this.assertString(cs);this.assert(qx.lang.Type.isRegExp(ct)||qx.lang.Type.isString(ct),W);cs.search(ct)>=0||this.__cA(cu||G,v,cs,N,ct.toString(),K);}
,assertArgumentsCount:function(cv,cw,cx,cy){var cz=cv.length;(cz>=cw&&cz<=cx)||this.__cA(cy||G,B,cw,h,cx,V,arguments.length,br);}
,assertEventFired:function(cA,event,cB,cC,cD){var cF=false;var cE=function(e){if(cC){cC.call(cA,e);}
;cF=true;}
;var cG;try{cG=cA.addListener(event,cE,cA);cB.call(cA);}
catch(cH){throw cH;}
finally{try{cA.removeListenerById(cG);}
catch(cI){}
;}
;cF===true||this.__cA(cD||G,b,event,F);}
,assertEventNotFired:function(cJ,event,cK,cL){var cN=false;var cM=function(e){cN=true;}
;var cO=cJ.addListener(event,cM,cJ);cK.call();cN===false||this.__cA(cL||G,b,event,m);cJ.removeListenerById(cO);}
,assertException:function(cP,cQ,cR,cS){var cQ=cQ||Error;var cT;try{this.__cz=false;cP();}
catch(cU){cT=cU;}
finally{this.__cz=true;}
;if(cT==null){this.__cA(cS||G,bC);}
;cT instanceof cQ||this.__cA(cS||G,E,cQ,p,cT);if(cR){this.assertMatch(cT.toString(),cR,cS);}
;}
,assertInArray:function(cV,cW,cX){cW.indexOf(cV)!==-1||this.__cA(cX||G,H,cV,X,cW,O);}
,assertArrayEquals:function(cY,da,db){this.assertArray(cY,db);this.assertArray(da,db);db=db||S+cY.join(D)+A+da.join(D)+C;if(cY.length!==da.length){this.fail(db,true);}
;for(var i=0;i<cY.length;i++){if(cY[i]!==da[i]){this.fail(db,true);}
;}
;}
,assertKeyInMap:function(dc,dd,de){dd[dc]!==undefined||this.__cA(de||G,H,dc,u,dd,O);}
,assertFunction:function(df,dg){qx.lang.Type.isFunction(df)||this.__cA(dg||G,ba,df,bi);}
,assertString:function(dh,di){qx.lang.Type.isString(dh)||this.__cA(di||G,s,dh,bi);}
,assertBoolean:function(dj,dk){qx.lang.Type.isBoolean(dj)||this.__cA(dk||G,bl,dj,bi);}
,assertNumber:function(dl,dm){(qx.lang.Type.isNumber(dl)&&isFinite(dl))||this.__cA(dm||G,bp,dl,bi);}
,assertPositiveNumber:function(dn,dp){(qx.lang.Type.isNumber(dn)&&isFinite(dn)&&dn>=0)||this.__cA(dp||G,a,dn,bi);}
,assertInteger:function(dq,dr){(qx.lang.Type.isNumber(dq)&&isFinite(dq)&&dq%1===0)||this.__cA(dr||G,bh,dq,bi);}
,assertPositiveInteger:function(ds,dt){var du=(qx.lang.Type.isNumber(ds)&&isFinite(ds)&&ds%1===0&&ds>=0);du||this.__cA(dt||G,k,ds,bi);}
,assertInRange:function(dv,dw,dx,dy){(dv>=dw&&dv<=dx)||this.__cA(dy||G,qx.lang.String.format(bq,[dv,dw,dx]));}
,assertObject:function(dz,dA){var dB=dz!==null&&(qx.lang.Type.isObject(dz)||typeof dz===R);dB||this.__cA(dA||G,Q,(dz),bi);}
,assertArray:function(dC,dD){qx.lang.Type.isArray(dC)||this.__cA(dD||G,n,dC,bi);}
,assertMap:function(dE,dF){qx.lang.Type.isObject(dE)||this.__cA(dF||G,d,dE,bi);}
,assertRegExp:function(dG,dH){qx.lang.Type.isRegExp(dG)||this.__cA(dH||G,bz,dG,bi);}
,assertType:function(dI,dJ,dK){this.assertString(dJ,bw);typeof (dI)===dJ||this.__cA(dK||G,bc,dJ,I,dI,bi);}
,assertInstance:function(dL,dM,dN){var dO=dM.classname||dM+G;dL instanceof dM||this.__cA(dN||G,bk,dO,I,dL,bi);}
,assertInterface:function(dP,dQ,dR){qx.Class.implementsInterface(dP,dQ)||this.__cA(dR||G,g,dP,by,dQ,K);}
,assertCssColor:function(dS,dT,dU){var dV=qx.Class.getByName(q);if(!dV){throw new Error(be);}
;var dX=dV.stringToRgb(dS);try{var dW=dV.stringToRgb(dT);}
catch(ea){this.__cA(dU||G,c,dS,bn,dX.join(bm),T,dT,Y);}
;var dY=dX[0]==dW[0]&&dX[1]==dW[1]&&dX[2]==dW[2];dY||this.__cA(dU||G,c,dX,bn,dX.join(bm),T,dT,bn,dW.join(bm),z);}
,assertElement:function(eb,ec){!!(eb&&eb.nodeType===1)||this.__cA(ec||G,bA,eb,K);}
,assertQxObject:function(ed,ee){this.__cC(ed,o)||this.__cA(ee||G,bs,ed,bi);}
,assertQxWidget:function(ef,eg){this.__cC(ef,L)||this.__cA(eg||G,M,ef,bi);}
,__cC:function(eh,ei){if(!eh){return false;}
;var ej=eh.constructor;while(ej){if(ej.classname===ei){return true;}
;ej=ej.superclass;}
;return false;}
}});}
)();
(function(){var c=": ",b="qx.type.BaseError",a="";qx.Class.define(b,{extend:Error,construct:function(d,e){var f=Error.call(this,e);if(f.stack){this.stack=f.stack;}
;if(f.stacktrace){this.stacktrace=f.stacktrace;}
;if(!(f.stack||f.stacktrace)){this.__bC=qx.dev.StackTrace.getStackTraceFromCaller(arguments);}
;this.__bD=d||a;this.message=e||qx.type.BaseError.DEFAULTMESSAGE;}
,statics:{DEFAULTMESSAGE:"error"},members:{__bC:null,__bD:null,message:null,getComment:function(){return this.__bD;}
,getStackTrace:function(){if(this.stack||this.stacktrace){return qx.dev.StackTrace.getStackTraceFromError(this);}
else if(this.__bC){return this.__bC;}
;return [];}
,toString:function(){return this.__bD+(this.message?c+this.message:a);}
}});}
)();
(function(){var t="?",s="anonymous",r="...",q="qx.dev.StackTrace",p="",o="\n",n="/source/class/",m="FILENAME_TO_CLASSNAME must return a string!",l="stack",k="FORMAT_STACKTRACE must return an array of strings!",d="prototype",j="stacktrace",g="qx.debug",c="Error created at",b="Backtrace:",f="function",e="ecmascript.stacktrace",h=".",a=":";qx.Bootstrap.define(q,{statics:{FILENAME_TO_CLASSNAME:null,FORMAT_STACKTRACE:null,getStackTrace:function(){var y=[];try{throw new Error();}
catch(J){if(qx.core.Environment.get(e)){var D=qx.dev.StackTrace.getStackTraceFromError(J);var B=qx.dev.StackTrace.getStackTraceFromCaller(arguments);qx.lang.Array.removeAt(D,0);var y=B.length>D.length?B:D;for(var i=0;i<Math.min(B.length,D.length);i++){var z=B[i];if(z.indexOf(s)>=0){continue;}
;var x;var H=z.split(h);var A=/(.*?)\(/.exec(H[H.length-1]);if(A&&A.length==2){x=A[1];H.pop();}
;if(H[H.length-1]==d){H.pop();}
;var F=H.join(h);var w=D[i];var I=w.split(a);var E=I[0];var u=I[1];var v;if(I[2]){v=I[2];}
;if(qx.Class.getByName(E)){var C=E;}
else {C=F;}
;var G=C+h;if(x){G+=x+a;}
;G+=u;if(v){G+=a+v;}
;y[i]=G;}
;}
else {y=this.getStackTraceFromCaller(arguments);}
;}
;return y;}
,getStackTraceFromCaller:function(K){var P=[];var O=qx.lang.Function.getCaller(K);var L={};while(O){var M=qx.lang.Function.getName(O);P.push(M);try{O=O.caller;}
catch(Q){break;}
;if(!O){break;}
;var N=qx.core.ObjectRegistry.toHashCode(O);if(L[N]){P.push(r);break;}
;L[N]=O;}
;return P;}
,getStackTraceFromError:function(R){var V=[];if(qx.core.Environment.get(e)===l){if(!R.stack){return V;}
;var bh=/@(.+):(\d+)$/gm;var U;while((U=bh.exec(R.stack))!=null){var X=U[1];var bf=U[2];var bd=this.__bE(X);V.push(bd+a+bf);}
;if(V.length>0){return this.__bG(V);}
;var bh=/at (.*)/gm;var bg=/\((.*?)(:[^\/].*)\)/;var bc=/(.*?)(:[^\/].*)/;var U;while((U=bh.exec(R.stack))!=null){var bb=bg.exec(U[1]);if(!bb){bb=bc.exec(U[1]);}
;if(bb){var bd=this.__bE(bb[1]);V.push(bd+bb[2]);}
else {V.push(U[1]);}
;}
;}
else if(qx.core.Environment.get(e)===j){var T=R.stacktrace;if(!T){return V;}
;if(T.indexOf(c)>=0){T=T.split(c)[0];}
;var bh=/line\ (\d+?),\ column\ (\d+?)\ in\ (?:.*?)\ in\ (.*?):[^\/]/gm;var U;while((U=bh.exec(T))!=null){var bf=U[1];var W=U[2];var X=U[3];var bd=this.__bE(X);V.push(bd+a+bf+a+W);}
;if(V.length>0){return this.__bG(V);}
;var bh=/Line\ (\d+?)\ of\ linked\ script\ (.*?)$/gm;var U;while((U=bh.exec(T))!=null){var bf=U[1];var X=U[2];var bd=this.__bE(X);V.push(bd+a+bf);}
;}
else if(R.message&&R.message.indexOf(b)>=0){var ba=qx.lang.String.trim(R.message.split(b)[1]);var Y=ba.split(o);for(var i=0;i<Y.length;i++){var S=Y[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);if(S&&S.length>=2){var bf=S[1];var be=this.__bE(S[2]);V.push(be+a+bf);}
;}
;}
else if(R.sourceURL&&R.line){V.push(this.__bE(R.sourceURL)+a+R.line);}
;;;return this.__bG(V);}
,__bE:function(bi){if(typeof qx.dev.StackTrace.FILENAME_TO_CLASSNAME==f){var bj=qx.dev.StackTrace.FILENAME_TO_CLASSNAME(bi);if(qx.core.Environment.get(g)&&!qx.lang.Type.isString(bj)){throw new Error(m);}
;return bj;}
;return qx.dev.StackTrace.__bF(bi);}
,__bF:function(bk){var bo=n;var bl=bk.indexOf(bo);var bn=bk.indexOf(t);if(bn>=0){bk=bk.substring(0,bn);}
;var bm=(bl==-1)?bk:bk.substring(bl+bo.length).replace(/\//g,h).replace(/\.js$/,p);return bm;}
,__bG:function(bp){if(typeof qx.dev.StackTrace.FORMAT_STACKTRACE==f){bp=qx.dev.StackTrace.FORMAT_STACKTRACE(bp);if(qx.core.Environment.get(g)&&!qx.lang.Type.isArray(bp)){throw new Error(k);}
;}
;return bp;}
}});}
)();
(function(){var d="stack",c="ecmascript.stacktrace",b="stacktrace",a="qx.bom.client.EcmaScript";qx.Bootstrap.define(a,{statics:{getStackTrace:function(){try{throw new Error();}
catch(e){return e.stacktrace?b:e.stack?d:null;}
;}
},defer:function(f){qx.core.Environment.add(c,f.getStackTrace);}
});}
)();
(function(){var k="Invalid parameter 'func'.",j='anonymous()',i="Trying to call a bound function with a disposed object as context: ",h="qx.globalErrorHandling",g=" :: ",f="qx.lang.Function",e=".constructor()",d="qx.debug",c=".",b=".prototype.",a="()";qx.Bootstrap.define(f,{statics:{getCaller:function(l){return l.caller?l.caller.callee:l.callee.caller;}
,getName:function(m){if(m.displayName){return m.displayName;}
;if(m.$$original||m.wrapper||m.classname){return m.classname+e;}
;if(m.$$mixin){for(var o in m.$$mixin.$$members){if(m.$$mixin.$$members[o]==m){return m.$$mixin.name+b+o+a;}
;}
;for(var o in m.$$mixin){if(m.$$mixin[o]==m){return m.$$mixin.name+c+o+a;}
;}
;}
;if(m.self){var p=m.self.constructor;if(p){for(var o in p.prototype){if(p.prototype[o]==m){return p.classname+b+o+a;}
;}
;for(var o in p){if(p[o]==m){return p.classname+c+o+a;}
;}
;}
;}
;var n=m.toString().match(/function\s*(\w*)\s*\(.*/);if(n&&n.length>=1&&n[1]){return n[1]+a;}
;return j;}
,globalEval:function(q){if(window.execScript){return window.execScript(q);}
else {return eval.call(window,q);}
;}
,empty:function(){}
,returnTrue:function(){return true;}
,returnFalse:function(){return false;}
,returnNull:function(){return null;}
,returnThis:function(){return this;}
,returnZero:function(){return 0;}
,create:function(r,s){if(qx.core.Environment.get(d)){qx.core.Assert&&qx.core.Assert.assertFunction(r,k);}
;if(!s){return r;}
;if(!(s.self||s.args||s.delay!=null||s.periodical!=null||s.attempt)){return r;}
;return function(event){if(qx.core.Environment.get(d)){if(qx.core&&qx.core.Object&&s.self&&s.self instanceof qx.core.Object){qx.core.Assert&&qx.core.Assert.assertFalse(s.self.isDisposed(),i+s.self.toString()+g+qx.lang.Function.getName(r));}
;}
;var u=qx.lang.Array.fromArguments(arguments);if(s.args){u=s.args.concat(u);}
;if(s.delay||s.periodical){var t=function(){return r.apply(s.self||this,u);}
;if(qx.core.Environment.get(h)){t=qx.event.GlobalError.observeMethod(t);}
;if(s.delay){return window.setTimeout(t,s.delay);}
;if(s.periodical){return window.setInterval(t,s.periodical);}
;}
else if(s.attempt){var v=false;try{v=r.apply(s.self||this,u);}
catch(w){}
;return v;}
else {return r.apply(s.self||this,u);}
;}
;}
,bind:function(x,self,y){return this.create(x,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});}
,curry:function(z,A){return this.create(z,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});}
,listener:function(B,self,C){if(arguments.length<3){return function(event){return B.call(self||this,event||window.event);}
;}
else {var D=qx.lang.Array.fromArguments(arguments,2);return function(event){var E=[event||window.event];E.push.apply(E,D);B.apply(self||this,E);}
;}
;}
,attempt:function(F,self,G){return this.create(F,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();}
,delay:function(H,I,self,J){return this.create(H,{delay:I,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();}
,periodical:function(K,L,self,M){return this.create(K,{periodical:L,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();}
}});}
)();
(function(){var p="-",o="",n="qx.core.ObjectRegistry",m="-0",k="Could not dispose object ",j=" objects",h=": ",g="Disposed ",f="qx.debug.dispose",e="$$hash",c="qx.debug",d="Invalid object: ";qx.Class.define(n,{statics:{inShutDown:false,__bc:{},__bH:0,__bI:[],__bJ:o,__bK:{},register:function(q){var t=this.__bc;if(!t){return;}
;var s=q.$$hash;if(s==null){var r=this.__bI;if(r.length>0&&!qx.core.Environment.get(f)){s=r.pop();}
else {s=(this.__bH++)+this.__bJ;}
;q.$$hash=s;if(qx.core.Environment.get(f)){if(qx.dev&&qx.dev.Debug&&qx.dev.Debug.disposeProfilingActive){this.__bK[s]=qx.dev.StackTrace.getStackTrace();}
;}
;}
;if(qx.core.Environment.get(c)){if(!q.dispose){throw new Error(d+q);}
;}
;t[s]=q;}
,unregister:function(u){var v=u.$$hash;if(v==null){return;}
;var w=this.__bc;if(w&&w[v]){delete w[v];this.__bI.push(v);}
;try{delete u.$$hash;}
catch(x){if(u.removeAttribute){u.removeAttribute(e);}
;}
;}
,toHashCode:function(y){if(qx.core.Environment.get(c)){if(y==null){throw new Error(d+y);}
;}
;var A=y.$$hash;if(A!=null){return A;}
;var z=this.__bI;if(z.length>0){A=z.pop();}
else {A=(this.__bH++)+this.__bJ;}
;return y.$$hash=A;}
,clearHashCode:function(B){if(qx.core.Environment.get(c)){if(B==null){throw new Error(d+B);}
;}
;var C=B.$$hash;if(C!=null){this.__bI.push(C);try{delete B.$$hash;}
catch(D){if(B.removeAttribute){B.removeAttribute(e);}
;}
;}
;}
,fromHashCode:function(E){return this.__bc[E]||null;}
,shutdown:function(){this.inShutDown=true;var G=this.__bc;var I=[];for(var H in G){I.push(H);}
;I.sort(function(a,b){return parseInt(b,10)-parseInt(a,10);}
);var F,i=0,l=I.length;while(true){try{for(;i<l;i++){H=I[i];F=G[H];if(F&&F.dispose){F.dispose();}
;}
;}
catch(J){qx.Bootstrap.error(this,k+F.toString()+h+J,J);if(i!==l){i++;continue;}
;}
;break;}
;qx.Bootstrap.debug(this,g+l+j);delete this.__bc;}
,getRegistry:function(){return this.__bc;}
,getNextHash:function(){return this.__bH;}
,getPostId:function(){return this.__bJ;}
,getStackTraces:function(){return this.__bK;}
},defer:function(K){if(window&&window.top){var frames=window.top.frames;for(var i=0;i<frames.length;i++){if(frames[i]===window){K.__bJ=p+(i+1);return;}
;}
;}
;K.__bJ=m;}
});}
)();
(function(){var a="qx.core.AssertionError";qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);this.__bL=qx.dev.StackTrace.getStackTrace();}
,members:{__bL:null,getStackTrace:function(){return this.__bL;}
}});}
)();
(function(){var g="prop",f="qx.bom.client.Json",e="JSON",d='{"x":1}',c="json",b="val",a="repl";qx.Bootstrap.define(f,{statics:{getJson:function(){return (qx.Bootstrap.getClass(window.JSON)==e&&JSON.parse(d).x===1&&JSON.stringify({"prop":b},function(k,v){return k===g?a:v;}
).indexOf(a)>0);}
},defer:function(h){qx.core.Environment.add(c,h.getJson);}
});}
)();
(function(){var p='String',o='Boolean',m='\\\\',l='\\f',h='\\t',g='{\n',f='[]',e="qx.lang.JsonImpl",d='Z',b='\\n',ba='Object',Y='{}',X='@',W='.',V='(',U='Array',T='T',S='\\r',R='{',Q='JSON.parse',x=' ',y='[',u='Number',w=')',s='[\n',t='\\"',q='\\b',r=': ',z='object',A='function',H=',',F='\n',K='\\u',J=',\n',M='0000',L='string',C="Cannot stringify a recursive object.",P='0',O='-',N='}',B=']',D='null',E='"',G=':',I='';qx.Bootstrap.define(e,{extend:Object,construct:function(){this.stringify=qx.lang.Function.bind(this.stringify,this);this.parse=qx.lang.Function.bind(this.parse,this);}
,members:{__cD:null,__cE:null,__cF:null,__cG:null,stringify:function(bb,bc,bd){this.__cD=I;this.__cE=I;this.__cG=[];if(qx.lang.Type.isNumber(bd)){var bd=Math.min(10,Math.floor(bd));for(var i=0;i<bd;i+=1){this.__cE+=x;}
;}
else if(qx.lang.Type.isString(bd)){if(bd.length>10){bd=bd.slice(0,10);}
;this.__cE=bd;}
;if(bc&&(qx.lang.Type.isFunction(bc)||qx.lang.Type.isArray(bc))){this.__cF=bc;}
else {this.__cF=null;}
;return this.__cH(I,{'':bb});}
,__cH:function(be,bf){var bi=this.__cD,bg,bj=bf[be];if(bj&&qx.lang.Type.isFunction(bj.toJSON)){bj=bj.toJSON(be);}
else if(qx.lang.Type.isDate(bj)){bj=this.dateToJSON(bj);}
;if(typeof this.__cF===A){bj=this.__cF.call(bf,be,bj);}
;if(bj===null){return D;}
;if(bj===undefined){return undefined;}
;switch(qx.lang.Type.getClass(bj)){case p:return this.__cI(bj);case u:return isFinite(bj)?String(bj):D;case o:return String(bj);case U:this.__cD+=this.__cE;bg=[];if(this.__cG.indexOf(bj)!==-1){throw new TypeError(C);}
;this.__cG.push(bj);var length=bj.length;for(var i=0;i<length;i+=1){bg[i]=this.__cH(i,bj)||D;}
;this.__cG.pop();if(bg.length===0){var bh=f;}
else if(this.__cD){bh=s+this.__cD+bg.join(J+this.__cD)+F+bi+B;}
else {bh=y+bg.join(H)+B;}
;this.__cD=bi;return bh;case ba:this.__cD+=this.__cE;bg=[];if(this.__cG.indexOf(bj)!==-1){throw new TypeError(C);}
;this.__cG.push(bj);if(this.__cF&&typeof this.__cF===z){var length=this.__cF.length;for(var i=0;i<length;i+=1){var k=this.__cF[i];if(typeof k===L){var v=this.__cH(k,bj);if(v){bg.push(this.__cI(k)+(this.__cD?r:G)+v);}
;}
;}
;}
else {for(var k in bj){if(Object.hasOwnProperty.call(bj,k)){var v=this.__cH(k,bj);if(v){bg.push(this.__cI(k)+(this.__cD?r:G)+v);}
;}
;}
;}
;this.__cG.pop();if(bg.length===0){var bh=Y;}
else if(this.__cD){bh=g+this.__cD+bg.join(J+this.__cD)+F+bi+N;}
else {bh=R+bg.join(H)+N;}
;this.__cD=bi;return bh;};}
,dateToJSON:function(bk){var bl=function(n){return n<10?P+n:n;}
;var bm=function(n){var bn=bl(n);return n<100?P+bn:bn;}
;return isFinite(bk.valueOf())?bk.getUTCFullYear()+O+bl(bk.getUTCMonth()+1)+O+bl(bk.getUTCDate())+T+bl(bk.getUTCHours())+G+bl(bk.getUTCMinutes())+G+bl(bk.getUTCSeconds())+W+bm(bk.getUTCMilliseconds())+d:null;}
,__cI:function(bo){var bp={'\b':q,'\t':h,'\n':b,'\f':l,'\r':S,'"':t,'\\':m};var bq=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;bq.lastIndex=0;if(bq.test(bo)){return E+bo.replace(bq,function(a){var c=bp[a];return typeof c===L?c:K+(M+a.charCodeAt(0).toString(16)).slice(-4);}
)+E;}
else {return E+bo+E;}
;}
,parse:function(br,bs){var bt=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;bt.lastIndex=0;if(bt.test(br)){br=br.replace(bt,function(a){return K+(M+a.charCodeAt(0).toString(16)).slice(-4);}
);}
;if(/^[\],:{}\s]*$/.test(br.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,X).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,B).replace(/(?:^|:|,)(?:\s*\[)+/g,I))){var j=eval(V+br+w);return typeof bs===A?this.__cJ({'':j},I,bs):j;}
;throw new SyntaxError(Q);}
,__cJ:function(bu,bv,bw){var bx=bu[bv];if(bx&&typeof bx===z){for(var k in bx){if(Object.hasOwnProperty.call(bx,k)){var v=this.__cJ(bx,k,bw);if(v!==undefined){bx[k]=v;}
else {delete bx[k];}
;}
;}
;}
;return bw.call(bu,bv,bx);}
}});}
)();
(function(){var a="qx.lang.Json";qx.Bootstrap.define(a,{statics:{JSON:qx.core.Environment.get("json")?window.JSON:new qx.lang.JsonImpl(),stringify:null,parse:null},defer:function(b){b.stringify=b.JSON.stringify;b.parse=b.JSON.parse;}
});}
)();
(function(){var a="qx.lang.Date";qx.Bootstrap.define(a,{statics:{now:function(){return +new Date;}
}});}
)();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.data.IListData";qx.Interface.define(a,{events:{"change":c,"changeLength":b},members:{getItem:function(d){}
,setItem:function(e,f){}
,splice:function(g,h,i){}
,contains:function(j){}
,getLength:function(){}
,toArray:function(){}
}});}
)();
(function(){var a="qx.core.ValidationError";qx.Class.define(a,{extend:qx.type.BaseError});}
)();
(function(){var a="qx.lang.RingBuffer";qx.Class.define(a,{extend:Object,construct:function(b){this.setMaxEntries(b||50);}
,members:{__bM:0,__bN:0,__bO:false,__bP:0,__bQ:null,__bR:null,setMaxEntries:function(c){this.__bR=c;this.clear();}
,getMaxEntries:function(){return this.__bR;}
,addEntry:function(d){this.__bQ[this.__bM]=d;this.__bM=this.__bS(this.__bM,1);var e=this.getMaxEntries();if(this.__bN<e){this.__bN++;}
;if(this.__bO&&(this.__bP<e)){this.__bP++;}
;}
,mark:function(){this.__bO=true;this.__bP=0;}
,clearMark:function(){this.__bO=false;}
,getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);}
,getEntries:function(f,g){if(f>this.__bN){f=this.__bN;}
;if(g&&this.__bO&&(f>this.__bP)){f=this.__bP;}
;if(f>0){var i=this.__bS(this.__bM,-1);var h=this.__bS(i,-f+1);var j;if(h<=i){j=this.__bQ.slice(h,i+1);}
else {j=this.__bQ.slice(h,this.__bN).concat(this.__bQ.slice(0,i+1));}
;}
else {j=[];}
;return j;}
,clear:function(){this.__bQ=new Array(this.getMaxEntries());this.__bN=0;this.__bP=0;this.__bM=0;}
,__bS:function(k,l){var m=this.getMaxEntries();var n=(k+l)%m;if(n<0){n+=m;}
;return n;}
}});}
)();
(function(){var a="qx.log.appender.RingBuffer";qx.Class.define(a,{extend:qx.lang.RingBuffer,construct:function(b){this.setMaxMessages(b||50);}
,members:{setMaxMessages:function(c){this.setMaxEntries(c);}
,getMaxMessages:function(){return this.getMaxEntries();}
,process:function(d){this.addEntry(d);}
,getAllLogEvents:function(){return this.getAllEntries();}
,retrieveLogEvents:function(e,f){return this.getEntries(e,f);}
,clearHistory:function(){this.clear();}
}});}
)();
(function(){var k="qx.log.Logger",j="[",h="The mixin '",g="warn",f="The event '",e="Please consult the API documentation of this method for alternatives.",d="#",c="document",b="{...(",a="' from class '",T="The class '",S="' overrides a deprecated method: ",R="text[",Q="[...(",P="\n",O=")}",N=")]",M="The constant '",L="object",K="...(+",s="array",t="The method '",q=")",r="instance",o="info",p="string",m="null",n="class",u="Please consult the API documentation for alternatives.",v="number",C="stringify",A="date",E="function",D="]",G="boolean",F="debug",x="map",J="node",I="error",H="Please consult the API documentation of this class for alternatives.",w="undefined",y="' is deprecated: ",z="qx.debug",B="unknown";qx.Class.define(k,{statics:{__bT:F,setLevel:function(U){this.__bT=U;}
,getLevel:function(){return this.__bT;}
,setTreshold:function(V){this.__bW.setMaxMessages(V);}
,getTreshold:function(){return this.__bW.getMaxMessages();}
,__bU:{},__bV:0,register:function(W){if(W.$$id){return;}
;var Y=this.__bV++;this.__bU[Y]=W;W.$$id=Y;var X=this.__bX;var ba=this.__bW.getAllLogEvents();for(var i=0,l=ba.length;i<l;i++){if(X[ba[i].level]>=X[this.__bT]){W.process(ba[i]);}
;}
;}
,unregister:function(bb){var bc=bb.$$id;if(bc==null){return;}
;delete this.__bU[bc];delete bb.$$id;}
,debug:function(bd,be){qx.log.Logger.__bY(F,arguments);}
,info:function(bf,bg){qx.log.Logger.__bY(o,arguments);}
,warn:function(bh,bi){qx.log.Logger.__bY(g,arguments);}
,error:function(bj,bk){qx.log.Logger.__bY(I,arguments);}
,trace:function(bl){var bm=qx.dev.StackTrace.getStackTrace();qx.log.Logger.__bY(o,[(typeof bl!==w?[bl].concat(bm):bm).join(P)]);}
,deprecatedMethodWarning:function(bn,bo){if(qx.core.Environment.get(z)){var bp=qx.lang.Function.getName(bn);this.warn(t+bp+y+(bo||e));this.trace();}
;}
,deprecatedClassWarning:function(bq,br){if(qx.core.Environment.get(z)){var bs=bq.classname||B;this.warn(T+bs+y+(br||H));this.trace();}
;}
,deprecatedEventWarning:function(bt,event,bu){if(qx.core.Environment.get(z)){var bv=bt.self?bt.self.classname:B;this.warn(f+(event||B)+a+bv+y+(bu||H));this.trace();}
;}
,deprecatedMixinWarning:function(bw,bx){if(qx.core.Environment.get(z)){var by=bw?bw.name:B;this.warn(h+by+y+(bx||H));this.trace();}
;}
,deprecatedConstantWarning:function(bz,bA,bB){if(qx.core.Environment.get(z)){if(bz.__defineGetter__){var self=this;var bC=bz[bA];bz.__defineGetter__(bA,function(){self.warn(M+bA+y+(bB||u));self.trace();return bC;}
);}
;}
;}
,deprecateMethodOverriding:function(bD,bE,bF,bG){if(qx.core.Environment.get(z)){var bH=bD.constructor;while(bH.classname!==bE.classname){if(bH.prototype.hasOwnProperty(bF)){this.warn(t+qx.lang.Function.getName(bD[bF])+S+(bG||u));this.trace();break;}
;bH=bH.superclass;}
;}
;}
,clear:function(){this.__bW.clearHistory();}
,__bW:new qx.log.appender.RingBuffer(50),__bX:{debug:0,info:1,warn:2,error:3},__bY:function(bI,bJ){var bO=this.__bX;if(bO[bI]<bO[this.__bT]){return;}
;var bL=bJ.length<2?null:bJ[0];var bN=bL?1:0;var bK=[];for(var i=bN,l=bJ.length;i<l;i++){bK.push(this.__cb(bJ[i],true));}
;var bP=new Date;var bQ={time:bP,offset:bP-qx.Bootstrap.LOADSTART,level:bI,items:bK,win:window};if(bL){if(bL.$$hash!==undefined){bQ.object=bL.$$hash;}
else if(bL.$$type){bQ.clazz=bL;}
;}
;this.__bW.process(bQ);var bR=this.__bU;for(var bM in bR){bR[bM].process(bQ);}
;}
,__ca:function(bS){if(bS===undefined){return w;}
else if(bS===null){return m;}
;if(bS.$$type){return n;}
;var bT=typeof bS;if(bT===E||bT==p||bT===v||bT===G){return bT;}
else if(bT===L){if(bS.nodeType){return J;}
else if(bS.classname){return r;}
else if(bS instanceof Array){return s;}
else if(bS instanceof Error){return I;}
else if(bS instanceof Date){return A;}
else {return x;}
;;;;}
;if(bS.toString){return C;}
;return B;}
,__cb:function(bU,bV){var cd=this.__ca(bU);var bY=B;var bX=[];switch(cd){case m:case w:bY=cd;break;case p:case v:case G:case A:bY=bU;break;case J:if(bU.nodeType===9){bY=c;}
else if(bU.nodeType===3){bY=R+bU.nodeValue+D;}
else if(bU.nodeType===1){bY=bU.nodeName.toLowerCase();if(bU.id){bY+=d+bU.id;}
;}
else {bY=J;}
;;break;case E:bY=qx.lang.Function.getName(bU)||cd;break;case r:bY=bU.basename+j+bU.$$hash+D;break;case n:case C:bY=bU.toString();break;case I:bX=qx.dev.StackTrace.getStackTraceFromError(bU);bY=bU.toString();break;case s:if(bV){bY=[];for(var i=0,l=bU.length;i<l;i++){if(bY.length>20){bY.push(K+(l-i)+q);break;}
;bY.push(this.__cb(bU[i],false));}
;}
else {bY=Q+bU.length+N;}
;break;case x:if(bV){var bW;var cc=[];for(var cb in bU){cc.push(cb);}
;cc.sort();bY=[];for(var i=0,l=cc.length;i<l;i++){if(bY.length>20){bY.push(K+(l-i)+q);break;}
;cb=cc[i];bW=this.__cb(bU[cb],false);bW.key=cb;bY.push(bW);}
;}
else {var ca=0;for(var cb in bU){ca++;}
;bY=b+ca+O;}
;break;};return {type:cd,text:bY,trace:bX};}
},defer:function(ce){var cf=qx.Bootstrap.$$logs;for(var i=0;i<cf.length;i++){ce.__bY(cf[i][0],cf[i][1]);}
;qx.Bootstrap.debug=ce.debug;qx.Bootstrap.info=ce.info;qx.Bootstrap.warn=ce.warn;qx.Bootstrap.error=ce.error;qx.Bootstrap.trace=ce.trace;}
});}
)();
(function(){var e="info",d="debug",c="warn",b="qx.core.MLogging",a="error";qx.Mixin.define(b,{members:{__cc:qx.log.Logger,debug:function(f){this.__cd(d,arguments);}
,info:function(g){this.__cd(e,arguments);}
,warn:function(h){this.__cd(c,arguments);}
,error:function(i){this.__cd(a,arguments);}
,trace:function(){this.__cc.trace(this);}
,__cd:function(j,k){var l=qx.lang.Array.fromArguments(k);l.unshift(this);this.__cc[j].apply(this.__cc,l);}
}});}
)();
(function(){var c="qx.dom.Node",b="";qx.Bootstrap.define(c,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(d){return d.nodeType===this.DOCUMENT?d:d.ownerDocument||d.document;}
,getWindow:function(e){if(e.nodeType==null){return e;}
;if(e.nodeType!==this.DOCUMENT){e=e.ownerDocument;}
;return e.defaultView||e.parentWindow;}
,getDocumentElement:function(f){return this.getDocument(f).documentElement;}
,getBodyElement:function(g){return this.getDocument(g).body;}
,isNode:function(h){return !!(h&&h.nodeType!=null);}
,isElement:function(j){return !!(j&&j.nodeType===this.ELEMENT);}
,isDocument:function(k){return !!(k&&k.nodeType===this.DOCUMENT);}
,isText:function(l){return !!(l&&l.nodeType===this.TEXT);}
,isWindow:function(m){return !!(m&&m.history&&m.location&&m.document);}
,isNodeName:function(n,o){if(!o||!n||!n.nodeName){return false;}
;return o.toLowerCase()==qx.dom.Node.getName(n);}
,getName:function(p){if(!p||!p.nodeName){return null;}
;return p.nodeName.toLowerCase();}
,getText:function(q){if(!q||!q.nodeType){return null;}
;switch(q.nodeType){case 1:var i,a=[],r=q.childNodes,length=r.length;for(i=0;i<length;i++){a[i]=this.getText(r[i]);}
;return a.join(b);case 2:case 3:case 4:return q.nodeValue;};return null;}
,isBlockNode:function(s){if(!qx.dom.Node.isElement(s)){return false;}
;s=qx.dom.Node.getName(s);return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(s);}
}});}
)();
(function(){var m="gecko",l="engine.name",k="qx.bom.Event",j="mouseover",i="No method available to remove native listener from ",h="No method available to add native listener to ",g="HTMLEvents",f="return;",d="qx.debug",c="function",a="undefined",b="on";qx.Bootstrap.define(k,{statics:{addNativeListener:function(n,o,p,q){if(n.addEventListener){n.addEventListener(o,p,!!q);}
else if(n.attachEvent){n.attachEvent(b+o,p);}
else if(typeof n[b+o]!=a){n[b+o]=p;}
else {if(qx.core.Environment.get(d)){qx.log.Logger.warn(h+n);}
;}
;;}
,removeNativeListener:function(r,s,t,u){if(r.removeEventListener){r.removeEventListener(s,t,!!u);}
else if(r.detachEvent){try{r.detachEvent(b+s,t);}
catch(e){if(e.number!==-2146828218){throw e;}
;}
;}
else if(typeof r[b+s]!=a){r[b+s]=null;}
else {if(qx.core.Environment.get(d)){qx.log.Logger.warn(i+r);}
;}
;;}
,getTarget:function(e){return e.target||e.srcElement;}
,getRelatedTarget:function(e){if(e.relatedTarget!==undefined){if((qx.core.Environment.get(l)==m)){try{e.relatedTarget&&e.relatedTarget.nodeType;}
catch(e){return null;}
;}
;return e.relatedTarget;}
else if(e.fromElement!==undefined&&e.type===j){return e.fromElement;}
else if(e.toElement!==undefined){return e.toElement;}
else {return null;}
;;}
,preventDefault:function(e){if(e.preventDefault){e.preventDefault();}
else {try{e.keyCode=0;}
catch(v){}
;e.returnValue=false;}
;}
,stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();}
else {e.cancelBubble=true;}
;}
,fire:function(w,x){if(document.createEvent){var y=document.createEvent(g);y.initEvent(x,true,true);return !w.dispatchEvent(y);}
else {var y=document.createEventObject();return w.fireEvent(b+x,y);}
;}
,supportsEvent:function(z,A){var B=b+A;var C=(B in z);if(!C){C=typeof z[B]==c;if(!C&&z.setAttribute){z.setAttribute(B,f);C=typeof z[B]==c;z.removeAttribute(B);}
;}
;return C;}
}});}
)();
(function(){var k="Failed to remove event listener for id '",j="Invalid context for callback.",h="Failed to add event listener for type '",g="__ci",f="UNKNOWN_",e="capture",d="qx.event.Manager",c="Could not dispatch event '",b="DOM_",a="No dispatcher can handle event of type ",O="QX_",N=" to the target '",M="__cj",L="Failed to remove event listener for type '",K=" on ",J="Invalid id type.",I="c",H="DOCUMENT_",G="WIN_",F="Invalid event object.",s="Invalid capture flag.",t="Invalid event type.",q="There is no event handler for the event '",r=" from the target '",o="Invalid callback function",p="'!",m="Invalid event target.",n="unload",u="Invalid object: ",v="'",y="' on target '",x="",A="_",z="Invalid Target.",C="': ",B="|",w="|bubble",E="|capture",D="qx.debug";qx.Class.define(d,{extend:Object,construct:function(P,Q){this.__ce=P;this.__cf=qx.core.ObjectRegistry.toHashCode(P);this.__cg=Q;if(P.qx!==qx){var self=this;qx.bom.Event.addNativeListener(P,n,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(P,n,arguments.callee);self.dispose();}
));}
;this.__ch={};this.__ci={};this.__cj={};this.__ck={};}
,statics:{__cl:0,getNextUniqueId:function(){return (this.__cl++)+x;}
},members:{__cg:null,__ch:null,__cj:null,__cm:null,__ci:null,__ck:null,__ce:null,__cf:null,getWindow:function(){return this.__ce;}
,getWindowId:function(){return this.__cf;}
,getHandler:function(R){var S=this.__ci[R.classname];if(S){return S;}
;return this.__ci[R.classname]=new R(this);}
,getDispatcher:function(T){var U=this.__cj[T.classname];if(U){return U;}
;return this.__cj[T.classname]=new T(this,this.__cg);}
,getListeners:function(V,W,X){var Y=V.$$hash||qx.core.ObjectRegistry.toHashCode(V);var bb=this.__ch[Y];if(!bb){return null;}
;var bc=W+(X?E:w);var ba=bb[bc];return ba?ba.concat():null;}
,getAllListeners:function(){return this.__ch;}
,serializeListeners:function(bd){var bk=bd.$$hash||qx.core.ObjectRegistry.toHashCode(bd);var bm=this.__ch[bk];var bi=[];if(bm){var bg,bl,be,bh,bj;for(var bf in bm){bg=bf.indexOf(B);bl=bf.substring(0,bg);be=bf.charAt(bg+1)==I;bh=bm[bf];for(var i=0,l=bh.length;i<l;i++){bj=bh[i];bi.push({self:bj.context,handler:bj.handler,type:bl,capture:be});}
;}
;}
;return bi;}
,toggleAttachedEvents:function(bn,bo){var bt=bn.$$hash||qx.core.ObjectRegistry.toHashCode(bn);var bv=this.__ch[bt];if(bv){var bq,bu,bp,br;for(var bs in bv){bq=bs.indexOf(B);bu=bs.substring(0,bq);bp=bs.charCodeAt(bq+1)===99;br=bv[bs];if(bo){this.__cn(bn,bu,bp);}
else {this.__co(bn,bu,bp);}
;}
;}
;}
,hasListener:function(bw,bx,by){if(qx.core.Environment.get(D)){if(bw==null){qx.log.Logger.trace(this);throw new Error(u+bw);}
;}
;var bz=bw.$$hash||qx.core.ObjectRegistry.toHashCode(bw);var bB=this.__ch[bz];if(!bB){return false;}
;var bC=bx+(by?E:w);var bA=bB[bC];return !!(bA&&bA.length>0);}
,importListeners:function(bD,bE){if(qx.core.Environment.get(D)){if(bD==null){qx.log.Logger.trace(this);throw new Error(u+bD);}
;}
;var bK=bD.$$hash||qx.core.ObjectRegistry.toHashCode(bD);var bL=this.__ch[bK]={};var bH=qx.event.Manager;for(var bF in bE){var bI=bE[bF];var bJ=bI.type+(bI.capture?E:w);var bG=bL[bJ];if(!bG){bG=bL[bJ]=[];this.__cn(bD,bI.type,bI.capture);}
;bG.push({handler:bI.listener,context:bI.self,unique:bI.unique||(bH.__cl++)+x});}
;}
,addListener:function(bM,bN,bO,self,bP){if(qx.core.Environment.get(D)){var bT=h+bN+v+N+bM.classname+C;qx.core.Assert.assertObject(bM,bT+z);qx.core.Assert.assertString(bN,bT+t);qx.core.Assert.assertFunction(bO,bT+o);if(bP!==undefined){qx.core.Assert.assertBoolean(bP,s);}
;}
;var bU=bM.$$hash||qx.core.ObjectRegistry.toHashCode(bM);var bW=this.__ch[bU];if(!bW){bW=this.__ch[bU]={};}
;var bS=bN+(bP?E:w);var bR=bW[bS];if(!bR){bR=bW[bS]=[];}
;if(bR.length===0){this.__cn(bM,bN,bP);}
;var bV=(qx.event.Manager.__cl++)+x;var bQ={handler:bO,context:self,unique:bV};bR.push(bQ);return bS+B+bV;}
,findHandler:function(bX,bY){var cl=false,cd=false,cm=false,ca=false;var cj;if(bX.nodeType===1){cl=true;cj=b+bX.tagName.toLowerCase()+A+bY;}
else if(bX.nodeType===9){ca=true;cj=H+bY;}
else if(bX==this.__ce){cd=true;cj=G+bY;}
else if(bX.classname){cm=true;cj=O+bX.classname+A+bY;}
else {cj=f+bX+A+bY;}
;;;var cf=this.__ck;if(cf[cj]){return cf[cj];}
;var ci=this.__cg.getHandlers();var ce=qx.event.IEventHandler;var cg,ch,cc,cb;for(var i=0,l=ci.length;i<l;i++){cg=ci[i];cc=cg.SUPPORTED_TYPES;if(cc&&!cc[bY]){continue;}
;cb=cg.TARGET_CHECK;if(cb){var ck=false;if(cl&&((cb&ce.TARGET_DOMNODE)!=0)){ck=true;}
else if(cd&&((cb&ce.TARGET_WINDOW)!=0)){ck=true;}
else if(cm&&((cb&ce.TARGET_OBJECT)!=0)){ck=true;}
else if(ca&&((cb&ce.TARGET_DOCUMENT)!=0)){ck=true;}
;;;if(!ck){continue;}
;}
;ch=this.getHandler(ci[i]);if(cg.IGNORE_CAN_HANDLE||ch.canHandleEvent(bX,bY)){cf[cj]=ch;return ch;}
;}
;return null;}
,__cn:function(cn,co,cp){var cq=this.findHandler(cn,co);if(cq){cq.registerEvent(cn,co,cp);return;}
;if(qx.core.Environment.get(D)){qx.log.Logger.warn(this,q+co+y+cn+p);}
;}
,removeListener:function(cr,cs,ct,self,cu){if(qx.core.Environment.get(D)){var cy=L+cs+v+r+cr.classname+C;qx.core.Assert.assertObject(cr,cy+z);qx.core.Assert.assertString(cs,cy+t);qx.core.Assert.assertFunction(ct,cy+o);if(self!==undefined){qx.core.Assert.assertObject(self,j);}
;if(cu!==undefined){qx.core.Assert.assertBoolean(cu,s);}
;}
;var cz=cr.$$hash||qx.core.ObjectRegistry.toHashCode(cr);var cA=this.__ch[cz];if(!cA){return false;}
;var cv=cs+(cu?E:w);var cw=cA[cv];if(!cw){return false;}
;var cx;for(var i=0,l=cw.length;i<l;i++){cx=cw[i];if(cx.handler===ct&&cx.context===self){qx.lang.Array.removeAt(cw,i);if(cw.length==0){this.__co(cr,cs,cu);}
;return true;}
;}
;return false;}
,removeListenerById:function(cB,cC){if(qx.core.Environment.get(D)){var cI=k+cC+v+r+cB.classname+C;qx.core.Assert.assertObject(cB,cI+z);qx.core.Assert.assertString(cC,cI+J);}
;var cG=cC.split(B);var cL=cG[0];var cD=cG[1].charCodeAt(0)==99;var cK=cG[2];var cJ=cB.$$hash||qx.core.ObjectRegistry.toHashCode(cB);var cM=this.__ch[cJ];if(!cM){return false;}
;var cH=cL+(cD?E:w);var cF=cM[cH];if(!cF){return false;}
;var cE;for(var i=0,l=cF.length;i<l;i++){cE=cF[i];if(cE.unique===cK){qx.lang.Array.removeAt(cF,i);if(cF.length==0){this.__co(cB,cL,cD);}
;return true;}
;}
;return false;}
,removeAllListeners:function(cN){var cR=cN.$$hash||qx.core.ObjectRegistry.toHashCode(cN);var cT=this.__ch[cR];if(!cT){return false;}
;var cP,cS,cO;for(var cQ in cT){if(cT[cQ].length>0){cP=cQ.split(B);cS=cP[0];cO=cP[1]===e;this.__co(cN,cS,cO);}
;}
;delete this.__ch[cR];return true;}
,deleteAllListeners:function(cU){delete this.__ch[cU];}
,__co:function(cV,cW,cX){var cY=this.findHandler(cV,cW);if(cY){cY.unregisterEvent(cV,cW,cX);return;}
;if(qx.core.Environment.get(D)){qx.log.Logger.warn(this,q+cW+y+cV+p);}
;}
,dispatchEvent:function(da,event){if(qx.core.Environment.get(D)){var df=c+event+y+da.classname+C;qx.core.Assert.assertNotUndefined(da,df+m);qx.core.Assert.assertNotNull(da,df+m);qx.core.Assert.assertInstance(event,qx.event.type.Event,df+F);}
;var dg=event.getType();if(!event.getBubbles()&&!this.hasListener(da,dg)){qx.event.Pool.getInstance().poolObject(event);return true;}
;if(!event.getTarget()){event.setTarget(da);}
;var de=this.__cg.getDispatchers();var dd;var dc=false;for(var i=0,l=de.length;i<l;i++){dd=this.getDispatcher(de[i]);if(dd.canDispatchEvent(da,event,dg)){dd.dispatchEvent(da,event,dg);dc=true;break;}
;}
;if(!dc){if(qx.core.Environment.get(D)){qx.log.Logger.error(this,a+dg+K+da);}
;return true;}
;var db=event.getDefaultPrevented();qx.event.Pool.getInstance().poolObject(event);return !db;}
,dispose:function(){this.__cg.removeManager(this);qx.util.DisposeUtil.disposeMap(this,g);qx.util.DisposeUtil.disposeMap(this,M);this.__ch=this.__ce=this.__cm=null;this.__cg=this.__ck=null;}
}});}
)();
(function(){var b="qx.event.GlobalError",a="qx.globalErrorHandling";qx.Bootstrap.define(b,{statics:{__cp:function(){if(qx.core&&qx.core.Environment){return qx.core.Environment.get(a);}
else {return !!qx.Bootstrap.getEnvironmentSetting(a);}
;}
,setErrorHandler:function(c,d){this.__cq=c||null;this.__cr=d||window;if(this.__cp()){if(c&&window.onerror){var e=qx.Bootstrap.bind(this.__ct,this);if(this.__cs==null){this.__cs=window.onerror;}
;var self=this;window.onerror=function(f,g,h){self.__cs(f,g,h);e(f,g,h);}
;}
;if(c&&!window.onerror){window.onerror=qx.Bootstrap.bind(this.__ct,this);}
;if(this.__cq==null){if(this.__cs!=null){window.onerror=this.__cs;this.__cs=null;}
else {window.onerror=null;}
;}
;}
;}
,__ct:function(i,j,k){if(this.__cq){this.handleError(new qx.core.WindowError(i,j,k));return true;}
;}
,observeMethod:function(l){if(this.__cp()){var self=this;return function(){if(!self.__cq){return l.apply(this,arguments);}
;try{return l.apply(this,arguments);}
catch(m){self.handleError(new qx.core.GlobalError(m,arguments));}
;}
;}
else {return l;}
;}
,handleError:function(n){if(this.__cq){this.__cq.call(this.__cr,n);}
;}
},defer:function(o){if(qx.core&&qx.core.Environment){qx.core.Environment.add(a,true);}
else {qx.Bootstrap.setEnvironmentSetting(a,true);}
;o.setErrorHandler(null,null);}
});}
)();
(function(){var b="",a="qx.core.WindowError";qx.Bootstrap.define(a,{extend:Error,construct:function(c,d,e){var f=Error.call(this,c);if(f.stack){this.stack=f.stack;}
;if(f.stacktrace){this.stacktrace=f.stacktrace;}
;this.__cu=c;this.__cv=d||b;this.__cw=e===undefined?-1:e;}
,members:{__cu:null,__cv:null,__cw:null,toString:function(){return this.__cu;}
,getUri:function(){return this.__cv;}
,getLineNumber:function(){return this.__cw;}
}});}
)();
(function(){var b="GlobalError: ",a="qx.core.GlobalError";qx.Bootstrap.define(a,{extend:Error,construct:function(c,d){if(qx.Bootstrap.DEBUG){qx.core.Assert.assertNotUndefined(c);}
;this.__cu=b+(c&&c.message?c.message:c);var e=Error.call(this,this.__cu);if(e.stack){this.stack=e.stack;}
;if(e.stacktrace){this.stacktrace=e.stacktrace;}
;this.__cx=d;this.__cy=c;}
,members:{__cy:null,__cx:null,__cu:null,toString:function(){return this.__cu;}
,getArguments:function(){return this.__cx;}
,getSourceException:function(){return this.__cy;}
},destruct:function(){this.__cy=null;this.__cx=null;this.__cu=null;}
});}
)();
(function(){var a="qx.event.IEventHandler";qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:4,TARGET_DOCUMENT:8},members:{canHandleEvent:function(b,c){}
,registerEvent:function(d,e,f){}
,unregisterEvent:function(g,h,i){}
}});}
)();
(function(){var n="Invalid event dispatcher!",m="': ",l="Invalid event handler.",k="' on target '",j="Could not fire event '",i="qx.event.Registration.getManager(null) was called!",h="undefined",g="qx.event.Registration",f="Invalid event target.",e="Create event of type ",c=" with undefined class. Please use null to explicit fallback to default event type!",d="qx.debug";qx.Class.define(g,{statics:{__cK:{},getManager:function(o){if(o==null){if(qx.core.Environment.get(d)){qx.log.Logger.error(i);qx.log.Logger.trace(this);}
;o=window;}
else if(o.nodeType){o=qx.dom.Node.getWindow(o);}
else if(!qx.dom.Node.isWindow(o)){o=window;}
;;var q=o.$$hash||qx.core.ObjectRegistry.toHashCode(o);var p=this.__cK[q];if(!p){p=new qx.event.Manager(o,this);this.__cK[q]=p;}
;return p;}
,removeManager:function(r){var s=r.getWindowId();delete this.__cK[s];}
,addListener:function(t,u,v,self,w){return this.getManager(t).addListener(t,u,v,self,w);}
,removeListener:function(x,y,z,self,A){return this.getManager(x).removeListener(x,y,z,self,A);}
,removeListenerById:function(B,C){return this.getManager(B).removeListenerById(B,C);}
,removeAllListeners:function(D){return this.getManager(D).removeAllListeners(D);}
,deleteAllListeners:function(E){var F=E.$$hash;if(F){this.getManager(E).deleteAllListeners(F);}
;}
,hasListener:function(G,H,I){return this.getManager(G).hasListener(G,H,I);}
,serializeListeners:function(J){return this.getManager(J).serializeListeners(J);}
,createEvent:function(K,L,M){if(qx.core.Environment.get(d)){if(arguments.length>1&&L===undefined){throw new Error(e+K+c);}
;}
;if(L==null){L=qx.event.type.Event;}
;var N=qx.event.Pool.getInstance().getObject(L);M?N.init.apply(N,M):N.init();if(K){N.setType(K);}
;return N;}
,dispatchEvent:function(O,event){return this.getManager(O).dispatchEvent(O,event);}
,fireEvent:function(P,Q,R,S){if(qx.core.Environment.get(d)){if(arguments.length>2&&R===undefined&&S!==undefined){throw new Error(e+Q+c);}
;var T=j+Q+k+(P?P.classname:h)+m;qx.core.Assert.assertNotUndefined(P,T+f);qx.core.Assert.assertNotNull(P,T+f);}
;var U=this.createEvent(Q,R||null,S);return this.getManager(P).dispatchEvent(P,U);}
,fireNonBubblingEvent:function(V,W,X,Y){if(qx.core.Environment.get(d)){if(arguments.length>2&&X===undefined&&Y!==undefined){throw new Error(e+W+c);}
;}
;var ba=this.getManager(V);if(!ba.hasListener(V,W,false)){return true;}
;var bb=this.createEvent(W,X||null,Y);return ba.dispatchEvent(V,bb);}
,PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__ci:[],addHandler:function(bc){if(qx.core.Environment.get(d)){qx.core.Assert.assertInterface(bc,qx.event.IEventHandler,l);}
;this.__ci.push(bc);this.__ci.sort(function(a,b){return a.PRIORITY-b.PRIORITY;}
);}
,getHandlers:function(){return this.__ci;}
,__cj:[],addDispatcher:function(bd,be){if(qx.core.Environment.get(d)){qx.core.Assert.assertInterface(bd,qx.event.IEventDispatcher,n);}
;this.__cj.push(bd);this.__cj.sort(function(a,b){return a.PRIORITY-b.PRIORITY;}
);}
,getDispatchers:function(){return this.__cj;}
}});}
)();
(function(){var a="qx.core.MEvents";qx.Mixin.define(a,{members:{__cL:qx.event.Registration,addListener:function(b,c,self,d){if(!this.$$disposed){return this.__cL.addListener(this,b,c,self,d);}
;return null;}
,addListenerOnce:function(f,g,self,h){var i=function(e){this.removeListener(f,i,this,h);g.call(self||this,e);}
;return this.addListener(f,i,this,h);}
,removeListener:function(j,k,self,l){if(!this.$$disposed){return this.__cL.removeListener(this,j,k,self,l);}
;return false;}
,removeListenerById:function(m){if(!this.$$disposed){return this.__cL.removeListenerById(this,m);}
;return false;}
,hasListener:function(n,o){return this.__cL.hasListener(this,n,o);}
,dispatchEvent:function(p){if(!this.$$disposed){return this.__cL.dispatchEvent(this,p);}
;return true;}
,fireEvent:function(q,r,s){if(!this.$$disposed){return this.__cL.fireEvent(this,q,r,s);}
;return true;}
,fireNonBubblingEvent:function(t,u,v){if(!this.$$disposed){return this.__cL.fireNonBubblingEvent(this,t,u,v);}
;return true;}
,fireDataEvent:function(w,x,y,z){if(!this.$$disposed){if(y===undefined){y=null;}
;return this.__cL.fireNonBubblingEvent(this,w,qx.event.type.Data,[x,y,!!z]);}
;return true;}
}});}
)();
(function(){var a="qx.event.IEventDispatcher";qx.Interface.define(a,{members:{canDispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);this.assertString(c);}
,dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);this.assertString(e);}
}});}
)();
(function(){var f="qx.core.MProperty",e="get",d="reset",c="No such property: ",b="set",a="qx.debug";qx.Mixin.define(f,{members:{set:function(g,h){var j=qx.core.Property.$$method.set;if(qx.Bootstrap.isString(g)){if(!this[j[g]]){if(this[b+qx.Bootstrap.firstUp(g)]!=undefined){this[b+qx.Bootstrap.firstUp(g)](h);return this;}
;if(qx.core.Environment.get(a)){qx.Bootstrap.error(new Error(c+g));return this;}
;}
;return this[j[g]](h);}
else {for(var i in g){if(!this[j[i]]){if(this[b+qx.Bootstrap.firstUp(i)]!=undefined){this[b+qx.Bootstrap.firstUp(i)](g[i]);continue;}
;if(qx.core.Environment.get(a)){qx.Bootstrap.error(new Error(c+i));return this;}
;}
;this[j[i]](g[i]);}
;return this;}
;}
,get:function(k){var l=qx.core.Property.$$method.get;if(!this[l[k]]){if(this[e+qx.Bootstrap.firstUp(k)]!=undefined){return this[e+qx.Bootstrap.firstUp(k)]();}
;if(qx.core.Environment.get(a)){qx.Bootstrap.error(new Error(c+k));return this;}
;}
;return this[l[k]]();}
,reset:function(m){var n=qx.core.Property.$$method.reset;if(!this[n[m]]){if(this[d+qx.Bootstrap.firstUp(m)]!=undefined){this[d+qx.Bootstrap.firstUp(m)]();return;}
;if(qx.core.Environment.get(a)){qx.Bootstrap.error(new Error(c+m));return;}
;}
;this[n[m]]();}
}});}
)();
(function(){var a="qx.core.MAssert";qx.Mixin.define(a,{members:{assert:function(b,c){qx.core.Assert.assert(b,c);}
,fail:function(d,e){qx.core.Assert.fail(d,e);}
,assertTrue:function(f,g){qx.core.Assert.assertTrue(f,g);}
,assertFalse:function(h,i){qx.core.Assert.assertFalse(h,i);}
,assertEquals:function(j,k,l){qx.core.Assert.assertEquals(j,k,l);}
,assertNotEquals:function(m,n,o){qx.core.Assert.assertNotEquals(m,n,o);}
,assertIdentical:function(p,q,r){qx.core.Assert.assertIdentical(p,q,r);}
,assertNotIdentical:function(s,t,u){qx.core.Assert.assertNotIdentical(s,t,u);}
,assertNotUndefined:function(v,w){qx.core.Assert.assertNotUndefined(v,w);}
,assertUndefined:function(x,y){qx.core.Assert.assertUndefined(x,y);}
,assertNotNull:function(z,A){qx.core.Assert.assertNotNull(z,A);}
,assertNull:function(B,C){qx.core.Assert.assertNull(B,C);}
,assertJsonEquals:function(D,E,F){qx.core.Assert.assertJsonEquals(D,E,F);}
,assertMatch:function(G,H,I){qx.core.Assert.assertMatch(G,H,I);}
,assertArgumentsCount:function(J,K,L,M){qx.core.Assert.assertArgumentsCount(J,K,L,M);}
,assertEventFired:function(N,event,O,P,Q){qx.core.Assert.assertEventFired(N,event,O,P,Q);}
,assertEventNotFired:function(R,event,S,T){qx.core.Assert.assertEventNotFired(R,event,S,T);}
,assertException:function(U,V,W,X){qx.core.Assert.assertException(U,V,W,X);}
,assertInArray:function(Y,ba,bb){qx.core.Assert.assertInArray(Y,ba,bb);}
,assertArrayEquals:function(bc,bd,be){qx.core.Assert.assertArrayEquals(bc,bd,be);}
,assertKeyInMap:function(bf,bg,bh){qx.core.Assert.assertKeyInMap(bf,bg,bh);}
,assertFunction:function(bi,bj){qx.core.Assert.assertFunction(bi,bj);}
,assertString:function(bk,bl){qx.core.Assert.assertString(bk,bl);}
,assertBoolean:function(bm,bn){qx.core.Assert.assertBoolean(bm,bn);}
,assertNumber:function(bo,bp){qx.core.Assert.assertNumber(bo,bp);}
,assertPositiveNumber:function(bq,br){qx.core.Assert.assertPositiveNumber(bq,br);}
,assertInteger:function(bs,bt){qx.core.Assert.assertInteger(bs,bt);}
,assertPositiveInteger:function(bu,bv){qx.core.Assert.assertPositiveInteger(bu,bv);}
,assertInRange:function(bw,bx,by,bz){qx.core.Assert.assertInRange(bw,bx,by,bz);}
,assertObject:function(bA,bB){qx.core.Assert.assertObject(bA,bB);}
,assertArray:function(bC,bD){qx.core.Assert.assertArray(bC,bD);}
,assertMap:function(bE,bF){qx.core.Assert.assertMap(bE,bF);}
,assertRegExp:function(bG,bH){qx.core.Assert.assertRegExp(bG,bH);}
,assertType:function(bI,bJ,bK){qx.core.Assert.assertType(bI,bJ,bK);}
,assertInstance:function(bL,bM,bN){qx.core.Assert.assertInstance(bL,bM,bN);}
,assertInterface:function(bO,bP,bQ){qx.core.Assert.assertInterface(bO,bP,bQ);}
,assertCssColor:function(bR,bS,bT){qx.core.Assert.assertCssColor(bR,bS,bT);}
,assertElement:function(bU,bV){qx.core.Assert.assertElement(bU,bV);}
,assertQxObject:function(bW,bX){qx.core.Assert.assertQxObject(bW,bX);}
,assertQxWidget:function(bY,ca){qx.core.Assert.assertQxWidget(bY,ca);}
}});}
)();
(function(){var t="module.events",s="Cloning only possible with properties.",r="qx.core.Object",q="$$user_",p="Disposing ",o="Cannot call super class. Method is not derived: ",n="object",m="Object",k="]: ",j="module.property",c="]",h="rv:1.8.1",f="' in ",b="Missing destruct definition for '",a="MSIE 6.0",e="qx.debug",d="qx.debug.dispose.level",g="[";qx.Class.define(r,{extend:Object,include:qx.core.Environment.filter({"module.databinding":qx.data.MBinding,"module.logger":qx.core.MLogging,"module.events":qx.core.MEvents,"module.property":qx.core.MProperty,"qx.debug":qx.core.MAssert}),construct:function(){qx.core.ObjectRegistry.register(this);}
,statics:{$$type:m},members:{__L:qx.core.Environment.get("module.property")?qx.core.Property:null,toHashCode:function(){return this.$$hash;}
,toString:function(){return this.classname+g+this.$$hash+c;}
,base:function(u,v){if(qx.core.Environment.get(e)){if(!qx.Bootstrap.isFunction(u.callee.base)){throw new Error(o+u.callee.displayName);}
;}
;if(arguments.length===1){return u.callee.base.call(this);}
else {return u.callee.base.apply(this,Array.prototype.slice.call(arguments,1));}
;}
,self:function(w){return w.callee.self;}
,clone:function(){if(!qx.core.Environment.get(j)){throw new Error(s);}
;var y=this.constructor;var x=new y;var A=qx.Class.getProperties(y);var z=this.__L.$$store.user;var B=this.__L.$$method.set;var name;for(var i=0,l=A.length;i<l;i++){name=A[i];if(this.hasOwnProperty(z[name])){x[B[name]](this[z[name]]);}
;}
;return x;}
,__cM:null,setUserData:function(C,D){if(!this.__cM){this.__cM={};}
;this.__cM[C]=D;}
,getUserData:function(E){if(!this.__cM){return null;}
;var F=this.__cM[E];return F===undefined?null:F;}
,isDisposed:function(){return this.$$disposed||false;}
,dispose:function(){if(this.$$disposed){return;}
;this.$$disposed=true;this.$$instance=null;this.$$allowconstruct=null;if(qx.core.Environment.get(e)){if(qx.core.Environment.get(d)>2){qx.Bootstrap.debug(this,p+this.classname+g+this.toHashCode()+c);}
;}
;var I=this.constructor;var G;while(I.superclass){if(I.$$destructor){I.$$destructor.call(this);}
;if(I.$$includes){G=I.$$flatIncludes;for(var i=0,l=G.length;i<l;i++){if(G[i].$$destructor){G[i].$$destructor.call(this);}
;}
;}
;I=I.superclass;}
;if(this.__cN){this.__cN();}
;if(qx.core.Environment.get(e)){if(qx.core.Environment.get(d)>0){var J,H;for(J in this){H=this[J];if(H!==null&&typeof H===n&&!(qx.Bootstrap.isString(H))){if(this.constructor.prototype[J]!=null){continue;}
;var L=navigator.userAgent.indexOf(h)!=-1;var K=navigator.userAgent.indexOf(a)!=-1;if(L||K){if(H instanceof qx.core.Object||qx.core.Environment.get(d)>1){qx.Bootstrap.warn(this,b+J+f+this.classname+g+this.toHashCode()+k+H);delete this[J];}
;}
else {if(qx.core.Environment.get(d)>1){qx.Bootstrap.warn(this,b+J+f+this.classname+g+this.toHashCode()+k+H);delete this[J];}
;}
;}
;}
;}
;}
;}
,__cN:null,__cO:function(){var M=qx.Class.getProperties(this.constructor);for(var i=0,l=M.length;i<l;i++){delete this[q+M[i]];}
;}
,_disposeObjects:function(N){qx.util.DisposeUtil.disposeObjects(this,arguments);}
,_disposeSingletonObjects:function(O){qx.util.DisposeUtil.disposeObjects(this,arguments,true);}
,_disposeArray:function(P){qx.util.DisposeUtil.disposeArray(this,P);}
,_disposeMap:function(Q){qx.util.DisposeUtil.disposeMap(this,Q);}
},environment:{"qx.debug.dispose.level":0},defer:function(R,S){var U=navigator.userAgent.indexOf(a)!=-1;var T=navigator.userAgent.indexOf(h)!=-1;if(U||T){S.__cN=S.__cO;}
;}
,destruct:function(){if(qx.core.Environment.get(t)){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);}
else {qx.event.Registration.deleteAllListeners(this);}
;}
;qx.core.ObjectRegistry.unregister(this);this.__cM=null;if(qx.core.Environment.get(j)){var X=this.constructor;var bc;var bd=this.__L.$$store;var ba=bd.user;var bb=bd.theme;var V=bd.inherit;var Y=bd.useinit;var W=bd.init;while(X){bc=X.$$properties;if(bc){for(var name in bc){if(bc[name].dereference){this[ba[name]]=this[bb[name]]=this[V[name]]=this[Y[name]]=this[W[name]]=undefined;}
;}
;}
;X=X.superclass;}
;}
;}
});}
)();
(function(){var q="Container must be a instance of qx.ui.container.Composite or ",p=" is a singleton! Please use disposeSingleton instead.",o="undefined",n="qx.debug",m="qx.ui.container.SlideBar or qx.ui.container.Stack!",k="qx.util.DisposeUtil",j="!",h="The map field: ",g="First argument must be a container widget!",f="qx.ui.container.Scroll or qx.ui.container.Resizer or ",c="The array field: ",e="The object stored in key ",d="Has no disposable object under key: ",b=" of object: ",a=" has non disposable entries: ";qx.Class.define(k,{statics:{disposeObjects:function(r,s,t){var name;for(var i=0,l=s.length;i<l;i++){name=s[i];if(r[name]==null||!r.hasOwnProperty(name)){continue;}
;if(!qx.core.ObjectRegistry.inShutDown){if(r[name].dispose){if(!t&&r[name].constructor.$$instance){throw new Error(e+name+p);}
else {r[name].dispose();}
;}
else {throw new Error(d+name+j);}
;}
;r[name]=null;}
;}
,disposeArray:function(u,v){var x=u[v];if(!x){return;}
;if(qx.core.ObjectRegistry.inShutDown){u[v]=null;return;}
;try{var w;for(var i=x.length-1;i>=0;i--){w=x[i];if(w){w.dispose();}
;}
;}
catch(y){throw new Error(c+v+b+u+a+y);}
;x.length=0;u[v]=null;}
,disposeMap:function(z,A){var C=z[A];if(!C){return;}
;if(qx.core.ObjectRegistry.inShutDown){z[A]=null;return;}
;try{var B;for(var D in C){B=C[D];if(C.hasOwnProperty(D)&&B){B.dispose();}
;}
;}
catch(E){throw new Error(h+A+b+z+a+E);}
;z[A]=null;}
,disposeTriggeredBy:function(F,G){var H=G.dispose;G.dispose=function(){H.call(G);F.dispose();}
;}
,destroyContainer:function(I){if(qx.core.Environment.get(n)){qx.core.Assert.assertQxWidget(I,g);qx.core.Assert.assertTrue(this.__cP(I),q+f+m);}
;var J=[];this._collectContainerChildren(I,J);var K=J.length;for(var i=K-1;i>=0;i--){J[i].destroy();}
;I.destroy();}
,_collectContainerChildren:function(L,M){var O=L.getChildren();for(var i=0;i<O.length;i++){var N=O[i];M.push(N);if(this.__cP(N)){this._collectContainerChildren(N,M);}
;}
;}
,__cP:function(P){var Q=[qx.ui.container.Composite,qx.ui.container.Scroll,qx.ui.container.SlideBar,qx.ui.container.Stack];for(var i=0,l=Q.length;i<l;i++){if(typeof Q[i]!==o&&qx.Class.isSubClassOf(P.constructor,Q[i])){return true;}
;}
;return false;}
}});}
)();
(function(){var f="Cannot stop propagation on a non bubbling event: ",e="Invalid argument value 'cancelable'.",d="Cannot prevent default action on a non cancelable event: ",c="Invalid argument value 'canBubble'.",b="qx.event.type.Event",a="qx.debug";qx.Class.define(b,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(g,h){if(qx.core.Environment.get(a)){if(g!==undefined){qx.core.Assert.assertBoolean(g,c);}
;if(h!==undefined){qx.core.Assert.assertBoolean(h,e);}
;}
;this._type=null;this._target=null;this._currentTarget=null;this._relatedTarget=null;this._originalTarget=null;this._stopPropagation=false;this._preventDefault=false;this._bubbles=!!g;this._cancelable=!!h;this._timeStamp=(new Date()).getTime();this._eventPhase=null;return this;}
,clone:function(i){if(i){var j=i;}
else {var j=qx.event.Pool.getInstance().getObject(this.constructor);}
;j._type=this._type;j._target=this._target;j._currentTarget=this._currentTarget;j._relatedTarget=this._relatedTarget;j._originalTarget=this._originalTarget;j._stopPropagation=this._stopPropagation;j._bubbles=this._bubbles;j._preventDefault=this._preventDefault;j._cancelable=this._cancelable;return j;}
,stop:function(){if(this._bubbles){this.stopPropagation();}
;if(this._cancelable){this.preventDefault();}
;}
,stopPropagation:function(){if(qx.core.Environment.get(a)){this.assertTrue(this._bubbles,f+this.getType());}
;this._stopPropagation=true;}
,getPropagationStopped:function(){return !!this._stopPropagation;}
,preventDefault:function(){if(qx.core.Environment.get(a)){this.assertTrue(this._cancelable,d+this.getType());}
;this._preventDefault=true;}
,getDefaultPrevented:function(){return !!this._preventDefault;}
,getType:function(){return this._type;}
,setType:function(k){this._type=k;}
,getEventPhase:function(){return this._eventPhase;}
,setEventPhase:function(l){this._eventPhase=l;}
,getTimeStamp:function(){return this._timeStamp;}
,getTarget:function(){return this._target;}
,setTarget:function(m){this._target=m;}
,getCurrentTarget:function(){return this._currentTarget||this._target;}
,setCurrentTarget:function(n){this._currentTarget=n;}
,getRelatedTarget:function(){return this._relatedTarget;}
,setRelatedTarget:function(o){this._relatedTarget=o;}
,getOriginalTarget:function(){return this._originalTarget;}
,setOriginalTarget:function(p){this._originalTarget=p;}
,getBubbles:function(){return this._bubbles;}
,setBubbles:function(q){this._bubbles=q;}
,isCancelable:function(){return this._cancelable;}
,setCancelable:function(r){this._cancelable=r;}
},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;}
});}
)();
(function(){var d="qx.util.ObjectPool",c="Class needs to be defined!",b="Object is already pooled: ",a="Integer";qx.Class.define(d,{extend:qx.core.Object,construct:function(e){qx.core.Object.call(this);this.__cQ={};if(e!=null){this.setSize(e);}
;}
,properties:{size:{check:a,init:Infinity}},members:{__cQ:null,getObject:function(f){if(this.$$disposed){return new f;}
;if(!f){throw new Error(c);}
;var g=null;var h=this.__cQ[f.classname];if(h){g=h.pop();}
;if(g){g.$$pooled=false;}
else {g=new f;}
;return g;}
,poolObject:function(j){if(!this.__cQ){return;}
;var k=j.classname;var m=this.__cQ[k];if(j.$$pooled){throw new Error(b+j);}
;if(!m){this.__cQ[k]=m=[];}
;if(m.length>this.getSize()){if(j.destroy){j.destroy();}
else {j.dispose();}
;return;}
;j.$$pooled=true;m.push(j);}
},destruct:function(){var p=this.__cQ;var n,o,i,l;for(n in p){o=p[n];for(i=0,l=o.length;i<l;i++){o[i].dispose();}
;}
;delete this.__cQ;}
});}
)();
(function(){var b="singleton",a="qx.event.Pool";qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){qx.util.ObjectPool.call(this,30);}
});}
)();
(function(){var n="' declared in the class '",m="'",k="' but found '",j="The context object '",h=" is not an available class': ",g="Expected event type to be instanceof '",f="' for the event '",e="' of '",d="The event type '",c="'is already disposed.",a="qx.event.dispatch.Direct",b="qx.debug";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(o){this._manager=o;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(p,event,q){return !event.getBubbles();}
,dispatchEvent:function(r,event,s){if(qx.core.Environment.get(b)){if(r instanceof qx.core.Object){var v=qx.Class.getEventType(r.constructor,s);var t=qx.Class.getByName(v);if(!t){this.error(d+s+n+r.constructor+h+v);}
else if(!(event instanceof t)){this.error(g+v+k+event.classname+m);}
;}
;}
;event.setEventPhase(qx.event.type.Event.AT_TARGET);var w=this._manager.getListeners(r,s,false);if(w){for(var i=0,l=w.length;i<l;i++){var u=w[i].context||r;if(qx.core.Environment.get(b)){if(u&&u.isDisposed&&u.isDisposed()){this.warn(j+u+f+s+e+r+c);}
;}
;w[i].handler.call(u,event);}
;}
;}
},defer:function(x){qx.event.Registration.addDispatcher(x);}
});}
)();
(function(){var a="qx.event.handler.Object";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(b,c){return qx.Class.supportsEvent(b.constructor,c);}
,registerEvent:function(d,e,f){}
,unregisterEvent:function(g,h,i){}
},defer:function(j){qx.event.Registration.addHandler(j);}
});}
)();
(function(){var a="qx.event.type.Data";qx.Class.define(a,{extend:qx.event.type.Event,members:{__cR:null,__cS:null,init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,false,d);this.__cR=b;this.__cS=c;return this;}
,clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);f.__cR=this.__cR;f.__cS=this.__cS;return f;}
,getData:function(){return this.__cR;}
,getOldData:function(){return this.__cS;}
},destruct:function(){this.__cR=this.__cS=null;}
});}
)();
(function(){var a="qx.application.IApplication";qx.Interface.define(a,{members:{main:function(){}
,finalize:function(){}
,close:function(){}
,terminate:function(){}
}});}
)();
(function(){var o="qx.core.BaseInit",n="engine.name",m="Main runtime: ",l="qx.application",k="os.name",j="engine.version",i="Missing application class: ",h="Load runtime: ",g="Could not detect engine!",f="Finalize runtime: ",b="Could not detect operating system!",d="Could not detect the version of the engine!",c="",a="ms";qx.Class.define(o,{statics:{getApplication:function(){return this.__gY||null;}
,ready:function(){if(this.__gY){return;}
;if(qx.core.Environment.get(n)==c){qx.log.Logger.warn(g);}
;if(qx.core.Environment.get(j)==c){qx.log.Logger.warn(d);}
;if(qx.core.Environment.get(k)==c){qx.log.Logger.warn(b);}
;qx.log.Logger.debug(this,h+(new Date-qx.Bootstrap.LOADSTART)+a);var q=qx.core.Environment.get(l);var r=qx.Class.getByName(q);if(r){this.__gY=new r;var p=new Date;this.__gY.main();qx.log.Logger.debug(this,m+(new Date-p)+a);var p=new Date;this.__gY.finalize();qx.log.Logger.debug(this,f+(new Date-p)+a);}
else {qx.log.Logger.warn(i+q);}
;}
,__ha:function(e){var s=this.__gY;if(s){s.close();}
;}
,__hb:function(){var t=this.__gY;if(t){t.terminate();}
;qx.core.ObjectRegistry.shutdown();}
}});}
)();
(function(){var j="rim_tabletos",i="Darwin",h="os.version",g="2003",f=")",e="iPhone",d="android",c="unix",b="ce",a="7",bf="SymbianOS",be="os.name",bd="|",bc="MacPPC",bb="iPod",ba="\.",Y="Win64",X="linux",W="me",V="Macintosh",q="Android",r="Windows",o="ios",p="vista",m="8",n="blackberry",k="(",l="win",u="Linux",v="BSD",D="Mac OS X",B="iPad",L="X11",G="xp",R="symbian",P="qx.bom.client.OperatingSystem",x="g",U="Win32",T="osx",S="webOS",w="RIM Tablet OS",z="BlackBerry",A="nt4",C="MacIntel",E="webos",H="10.1",M="10.3",Q="10.7",s="10.5",t="95",y="10.2",K="98",J="2000",I="10.6",O="10.0",N="10.4",F="";qx.Bootstrap.define(P,{statics:{getName:function(){if(!navigator){return F;}
;var bg=navigator.platform||F;var bh=navigator.userAgent||F;if(bg.indexOf(r)!=-1||bg.indexOf(U)!=-1||bg.indexOf(Y)!=-1){return l;}
else if(bg.indexOf(V)!=-1||bg.indexOf(bc)!=-1||bg.indexOf(C)!=-1||bg.indexOf(D)!=-1){return T;}
else if(bh.indexOf(w)!=-1){return j;}
else if(bh.indexOf(S)!=-1){return E;}
else if(bg.indexOf(bb)!=-1||bg.indexOf(e)!=-1||bg.indexOf(B)!=-1){return o;}
else if(bh.indexOf(q)!=-1){return d;}
else if(bg.indexOf(u)!=-1){return X;}
else if(bg.indexOf(L)!=-1||bg.indexOf(v)!=-1||bg.indexOf(i)!=-1){return c;}
else if(bg.indexOf(bf)!=-1){return R;}
else if(bg.indexOf(z)!=-1){return n;}
;;;;;;;;;return F;}
,__dg:{"Windows NT 6.2":m,"Windows NT 6.1":a,"Windows NT 6.0":p,"Windows NT 5.2":g,"Windows NT 5.1":G,"Windows NT 5.0":J,"Windows 2000":J,"Windows NT 4.0":A,"Win 9x 4.90":W,"Windows CE":b,"Windows 98":K,"Win98":K,"Windows 95":t,"Win95":t,"Mac OS X 10_7":Q,"Mac OS X 10.7":Q,"Mac OS X 10_6":I,"Mac OS X 10.6":I,"Mac OS X 10_5":s,"Mac OS X 10.5":s,"Mac OS X 10_4":N,"Mac OS X 10.4":N,"Mac OS X 10_3":M,"Mac OS X 10.3":M,"Mac OS X 10_2":y,"Mac OS X 10.2":y,"Mac OS X 10_1":H,"Mac OS X 10.1":H,"Mac OS X 10_0":O,"Mac OS X 10.0":O},getVersion:function(){var bk=[];for(var bj in qx.bom.client.OperatingSystem.__dg){bk.push(bj);}
;var bl=new RegExp(k+bk.join(bd).replace(/\./g,ba)+f,x);var bi=bl.exec(navigator.userAgent);if(bi&&bi[1]){return qx.bom.client.OperatingSystem.__dg[bi[1]];}
;return F;}
},defer:function(bm){qx.core.Environment.add(be,bm.getName);qx.core.Environment.add(h,bm.getVersion);}
});}
)();
(function(){var a="qx.event.type.Native";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d,e,f){qx.event.type.Event.prototype.init.call(this,e,f);this._target=c||qx.bom.Event.getTarget(b);this._relatedTarget=d||qx.bom.Event.getRelatedTarget(b);if(b.timeStamp){this._timeStamp=b.timeStamp;}
;this._native=b;this._returnValue=null;return this;}
,clone:function(g){var h=qx.event.type.Event.prototype.clone.call(this,g);var i={};h._native=this._cloneNativeEvent(this._native,i);h._returnValue=this._returnValue;return h;}
,_cloneNativeEvent:function(j,k){k.preventDefault=qx.lang.Function.empty;return k;}
,preventDefault:function(){qx.event.type.Event.prototype.preventDefault.call(this);qx.bom.Event.preventDefault(this._native);}
,getNativeEvent:function(){return this._native;}
,setReturnValue:function(l){this._returnValue=l;}
,getReturnValue:function(){return this._returnValue;}
},destruct:function(){this._native=this._returnValue=null;}
});}
)();
(function(){var a="qx.event.handler.Window";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);this._manager=b;this._window=b.getWindow();this._initWindowObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(c,d){}
,registerEvent:function(f,g,h){}
,unregisterEvent:function(i,j,k){}
,_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);var m=qx.event.handler.Window.SUPPORTED_TYPES;for(var l in m){qx.bom.Event.addNativeListener(this._window,l,this._onNativeWrapper);}
;}
,_stopWindowObserver:function(){var o=qx.event.handler.Window.SUPPORTED_TYPES;for(var n in o){qx.bom.Event.removeNativeListener(this._window,n,this._onNativeWrapper);}
;}
,_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;}
;var q=this._window;try{var t=q.document;}
catch(e){return;}
;var r=t.documentElement;var p=qx.bom.Event.getTarget(e);if(p==null||p===q||p===t||p===r){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,q]);qx.event.Registration.dispatchEvent(q,event);var s=event.getReturnValue();if(s!=null){e.returnValue=s;return s;}
;}
;}
)},destruct:function(){this._stopWindowObserver();this._manager=this._window=null;}
,defer:function(u){qx.event.Registration.addHandler(u);}
});}
)();
(function(){var n="qx.event.handler.Application",m="complete",l="webkit",k="gecko",j="opera",i="left",h="DOMContentLoaded",g="shutdown",f="mshtml",d="load",a="unload",c="ready",b="engine.name";qx.Class.define(n,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(o){qx.core.Object.call(this);this._window=o.getWindow();this.__hc=false;this.__hd=false;this.__he=false;this.__hf=false;this._initObserver();qx.event.handler.Application.$$instance=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,onScriptLoaded:function(){var p=qx.event.handler.Application.$$instance;if(p){p.__hg();}
;}
},members:{canHandleEvent:function(q,r){}
,registerEvent:function(s,t,u){}
,unregisterEvent:function(v,w,x){}
,__he:null,__hc:null,__hd:null,__hf:null,__hg:function(){if(!this.__he&&this.__hc&&qx.$$loader.scriptLoaded){if((qx.core.Environment.get(b)==f)){if(qx.event.Registration.hasListener(this._window,c)){this.__he=true;qx.event.Registration.fireEvent(this._window,c);}
;}
else {this.__he=true;qx.event.Registration.fireEvent(this._window,c);}
;}
;}
,isApplicationReady:function(){return this.__he;}
,_initObserver:function(){if(qx.$$domReady||document.readyState==m||document.readyState==c){this.__hc=true;this.__hg();}
else {this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);if(qx.core.Environment.get(b)==k||qx.core.Environment.get(b)==j||qx.core.Environment.get(b)==l){qx.bom.Event.addNativeListener(this._window,h,this._onNativeLoadWrapped);}
else if((qx.core.Environment.get(b)==f)){var self=this;var y=function(){try{document.documentElement.doScroll(i);if(document.body){self._onNativeLoadWrapped();}
;}
catch(z){window.setTimeout(y,100);}
;}
;y();}
;qx.bom.Event.addNativeListener(this._window,d,this._onNativeLoadWrapped);}
;this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);qx.bom.Event.addNativeListener(this._window,a,this._onNativeUnloadWrapped);}
,_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,d,this._onNativeLoadWrapped);}
;qx.bom.Event.removeNativeListener(this._window,a,this._onNativeUnloadWrapped);this._onNativeLoadWrapped=null;this._onNativeUnloadWrapped=null;}
,_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__hc=true;this.__hg();}
),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__hf){this.__hf=true;try{qx.event.Registration.fireEvent(this._window,g);}
catch(e){throw e;}
finally{qx.core.ObjectRegistry.shutdown();}
;}
;}
)},destruct:function(){this._stopObserver();this._window=null;}
,defer:function(A){qx.event.Registration.addHandler(A);}
});}
)();
(function(){var d="ready",c="shutdown",b="beforeunload",a="qx.core.Init";qx.Class.define(a,{statics:{getApplication:qx.core.BaseInit.getApplication,ready:qx.core.BaseInit.ready,__ha:function(e){var f=this.getApplication();if(f){e.setReturnValue(f.close());}
;}
,__hb:function(){var g=this.getApplication();if(g){g.terminate();}
;}
},defer:function(h){qx.event.Registration.addListener(window,d,h.ready,h);qx.event.Registration.addListener(window,c,h.__hb,h);qx.event.Registration.addListener(window,b,h.__ha,h);}
});}
)();
(function(){var a="qx.application.Native";qx.Class.define(a,{extend:qx.core.Object,implement:[qx.application.IApplication],members:{main:function(){}
,finalize:function(){}
,close:function(){}
,terminate:function(){}
}});}
)();
(function(){var cb="clear:both",ca="Insert Table",bY="Color (Hex): ",bX="Georgia",bW="<p>This low-level widget can be used separately at ",bV="http://",bU="BgColor (Hex): ",bT="Indent More",bS="Change font family",bR="demobrowser/demo/icons/htmlarea/format-fill-color.png",bv="Align Right",bu="Format Italic",bt="qx/icon/Oxygen/16/actions/format-text-underline.png",bs="350px",br='<h1>About</h1><p>qooxdoo (pronounced [ku:ksdu:]) is a comprehensive and innovative Ajax application framework. Leveraging object-oriented JavaScript allows developers to build impressive cross-browser applications. No <acronym title="HyperText Markup Language">HTML</acronym>, <acronym title="Cascading Style Sheets">CSS</acronym> nor <acronym title="Document Object Model">DOM</acronym> knowledge is needed. qooxdoo includes a platform-independent development tool chain, a state-of-the-art <acronym title="Graphical User Interface">GUI</acronym> toolkit and an advanced client-server communication layer. It is Open Source under an <acronym title="GNU Lesser General Public License">LGPL</acronym>/<acronym title="Eclipse Public License">EPL</acronym> dual <a href="http://qooxdoo.org/license" class="wikilink1" title="license">license</a>.</p>',bq="white",bp="buttons at the toolbar.</p>",bo="demobrowser/demo/icons/htmlarea/format-list-ordered.png",bn="qx/icon/Oxygen/16/actions/format-indent-more.png",bm="Comic Sans MS",ci="Tahoma",cj="20px 20px",cg="float",ch="<h1>HtmlArea low-level widget</h1>",ce="<td>First Row, First cell</td>",cf="demobrowser/demo/icons/htmlarea/qooxdoo_logo.png",cc="Align Left",cd="qx/icon/Oxygen/16/actions/format-justify-center.png",ck="input",cl="Align Justify",bK="demobrowser/demo/icons/htmlarea/insert-text.png",bJ="Insert Horizontal Ruler",bM="demobrowser/demo/icons/htmlarea/insert-horizontal-rule.png",bL="demobrowser/demo/icons/htmlarea/format-list-unordered.png",bO="HTML Code:",bN="Set Text Background Color",bQ="Insert Link",bP="on",bI="You can play around with this widget by hitting the ",bH="<td>Second Row, First cell</td>",a="</tbody>",b="Set Text Color",c="demobrowser/demo/icons/htmlarea/format-text-color.png",d="traditional web pages / single-page applications.<br/> ",f="demobrowser/demo/icons/htmlarea/insert-table.png",g="qx/icon/Oxygen/16/actions/edit-undo.png",h="qx/icon/Oxygen/16/actions/edit-clear.png",k="Arial Black",l="Impact",m="Change font size",cp="Link: ",co="Redo Last Undo Step",cn="Format Bold",cm="off",ct="qx/icon/Oxygen/16/actions/format-text-strikethrough.png",cs="br",cr="marginRight",cq="image",cv="<option qxKeepFocus='on' qxSelectable='off'",cu="click",L="<option qxKeepFocus='on' qxSelectable='off' ",M="Remove Format",J="blank.html",K="qx/icon/Oxygen/16/actions/insert-image.png",P="<p style='margin-bottom:10px'><b>No UI-level code</b> is included in this demo.",Q="</table>",N="<td>First Row, Second cell</td>",O="Insert HTML Code",H="qx/icon/Oxygen/16/actions/insert-link.png",I="Insert Ordered List",u="demobrowser.demo.bom.HtmlArea",t="qx/icon/Oxygen/16/actions/format-justify-left.png",w="Courier",v="Courier New",q="4px",p="qx/icon/Oxygen/16/actions/format-justify-right.png",s="qx/icon/Oxygen/16/actions/format-text-bold.png",r="<td>Second Row, Second cell</td>",o="Insert Image",n="qx/icon/Oxygen/16/actions/format-indent-less.png",V="<tbody>",W="Times New Roman",X="Align Center",Y="qx/icon/Oxygen/16/actions/edit-redo.png",R="Lucida Console",S="innerHTML",T="Undo Last Change",U="qx/icon/Oxygen/16/actions/format-text-italic.png",ba="Arial",bb="qx/icon/Oxygen/16/actions/format-justify-fill.png",E="Verdana",D="Indent Less",C="Format Strikethrough",B="Format Underline",A="<table border='1'>",z="Inserted Unordered List",y="FontSize: ",x="It is the foundation for the UI widget component.</p>",G="<tr>",F="<option value=''></option>",bc="1px solid #AAA",bd="'>",be="value='",bf="#",bg="</option>",bh="qooxdoo logo",bi="change",bj="select",bk="</tr>",bl="",bz="840px",by="left",bx="16px",bw="outline",bD="mshtml",bC="hideFocus",bB="none",bA="engine.name",bF="true",bE="div",bG="0px";qx.Class.define(u,{extend:qx.application.Native,members:{__EU:null,__Pb:null,__Pc:null,__yJ:null,__kq:null,main:function(){qx.application.Native.prototype.main.call(this);this.__EU=qx.dom.Element.create(bE);qx.bom.element.Style.setStyles(this.__EU,{margin:cj});var cy=qx.dom.Element.create(bE);qx.bom.element.Style.setStyles(cy,{width:bz,padding:bG,margin:bG});var cx=ch+bW+d+x+P+bI+bp;qx.bom.element.Attribute.set(cy,S,cx);this.__Pb=qx.dom.Element.create(bE);qx.bom.element.Style.setStyles(this.__Pb,{width:bz,padding:bG,margin:bG,lineHeight:bG,border:bc});this.__Pc=qx.dom.Element.create(bE);qx.bom.element.Style.setStyles(this.__Pc,{width:bz,height:bs,border:bc,borderTop:bG,backgroundColor:bq});qx.dom.Element.insertEnd(this.__Pc,this.__EU);var cw=br;this.__yJ=new qx.bom.htmlarea.HtmlArea(this.__Pc,cw,null,J);this.__yT();qx.dom.Element.insertBegin(this.__Pb,this.__EU);qx.dom.Element.insertBegin(cy,this.__EU);qx.dom.Element.insertBegin(this.__EU,document.body);}
,__Pd:function(e){var cz=window.prompt(y,bl);this.setFontSize(parseInt(cz));}
,__yK:function(e){var cA=window.prompt(bY,bf);this.setTextColor(cA);}
,__yL:function(e){var cB=window.prompt(bU,bf);this.setTextBackgroundColor(cB);}
,__yM:function(e){var cC={src:qx.util.ResourceManager.getInstance().toUri(cf),border:0,title:bh,alt:bh};this.insertImage(cC);}
,__yN:function(e){var cD=A+V+G+ce+N+bk+G+bH+r+bk+a+Q;this.insertHtml(cD);}
,__yO:function(e){var cE=window.prompt(cp,bV);this.insertHyperLink(cE);}
,__yP:function(e){var cF=window.prompt(bO,bl);this.insertHtml(cF);}
,__yQ:function(){var cH=qx.dom.Element.create(bE);qx.bom.element.Style.setStyles(cH,{"float":by});var cJ;var cI=qx.dom.Element.create(bj,{title:bS});if(qx.core.Environment.get(bA)==bD){qx.bom.element.Attribute.set(cI,bC,bF);}
else {qx.bom.element.Style.set(cI,bw,bB);}
;cJ=qx.bom.Collection.html(F);qx.dom.Element.insertEnd(cJ[0],cI);var cK=[ci,E,W,ba,k,v,w,bX,l,bm,R];var cG;var cL;for(var i=0,j=cK.length;i<j;i++){cG=cv+be+cK[i]+bd+cK[i]+bg;cL=qx.bom.Collection.html(cG);if(qx.core.Environment.get(bA)==bD){qx.bom.element.Attribute.set(cL[0],bC,bF);}
else {qx.bom.element.Style.set(cL[0],bw,bB);}
;qx.dom.Element.insertEnd(cL[0],cI);}
;qx.event.Registration.addListener(cI,bi,function(e){var cM=e.getTarget();var cN=cM.selectedIndex;if(cN!=0){this.setFontFamily(cM.options[cN].value);cM.options[0].selected=true;}
;}
,this.__yJ);qx.dom.Element.insertBegin(cI,cH);return cH;}
,__yR:function(){var cP=qx.dom.Element.create(bE);qx.bom.element.Style.setStyles(cP,{"marginRight":bx,"float":by});var cR;var cQ=qx.dom.Element.create(bj,{title:m});if(qx.core.Environment.get(bA)==bD){qx.bom.element.Attribute.set(cQ,bC,bF);}
else {qx.bom.element.Style.set(cQ,bw,bB);}
;cR=qx.bom.Collection.html(F);qx.dom.Element.insertEnd(cR[0],cQ);var cS;var cO;for(var i=1;i<=7;i++){cO=L+be+i+bd+i+bg;cS=qx.bom.Collection.html(cO);if(qx.core.Environment.get(bA)==bD){qx.bom.element.Attribute.set(cS[0],bC,bF);}
else {qx.bom.element.Style.set(cS[0],bw,bB);}
;qx.dom.Element.insertEnd(cS[0],cQ);}
;qx.event.Registration.addListener(cQ,bi,function(e){var cT=e.getTarget();var cU=cT.selectedIndex;if(cU!=0){this.setFontSize(cT.options[cU].value);cT.options[0].selected=true;}
;}
,this.__yJ);qx.dom.Element.insertBegin(cQ,cP);return cP;}
,__yT:function(){var cW=[{bold:{text:cn,image:s,action:this.__yJ.setBold},italic:{text:bu,image:U,action:this.__yJ.setItalic},underline:{text:B,image:bt,action:this.__yJ.setUnderline},strikethrough:{text:C,image:ct,action:this.__yJ.setStrikeThrough},removeFormat:{text:M,image:h,action:this.__yJ.removeFormat}},{alignLeft:{text:cc,image:t,action:this.__yJ.setJustifyLeft},alignCenter:{text:X,image:cd,action:this.__yJ.setJustifyCenter},alignRight:{text:bv,image:p,action:this.__yJ.setJustifyRight},alignJustify:{text:cl,image:bb,action:this.__yJ.setJustifyFull}},{fontFamily:{custom:this.__yQ},fontSize:{custom:this.__yR},fontColor:{text:b,image:c,action:this.__yK},textBackgroundColor:{text:bN,image:bR,action:this.__yL}},{indent:{text:bT,image:bn,action:this.__yJ.insertIndent},outdent:{text:D,image:n,action:this.__yJ.insertOutdent}},{insertImage:{text:o,image:K,action:this.__yM},insertTable:{text:ca,image:f,action:this.__yN},insertLink:{text:bQ,image:H,action:this.__yO},insertHTML:{text:O,image:bK,action:this.__yP},insertHR:{text:bJ,image:bM,action:this.__yJ.insertHorizontalRuler}},{ol:{text:I,image:bo,action:this.__yJ.insertOrderedList},ul:{text:z,image:bL,action:this.__yJ.insertUnorderedList}},{undo:{text:T,image:g,action:this.__yJ.undo},redo:{text:co,image:Y,action:this.__yJ.redo}}];var cY,dd,cV,db;for(var i=0,j=cW.length;i<j;i++){dd={};dd[cr]=i==j-1?bG:bx;dd[cg]=by;cY=qx.dom.Element.create(bE);qx.bom.element.Style.setStyles(cY,dd);for(var da in cW[i]){var dc=cW[i][da];if(dc.custom){cV=dc.custom.call(this);}
else {var cX=qx.util.AliasManager.getInstance().resolve(dc.image);db={type:cq,src:qx.util.ResourceManager.getInstance().toUri(cX),title:dc.text,qxKeepFocus:bP,qxSelectable:cm};cV=qx.dom.Element.create(ck,db);qx.bom.element.Style.setStyles(cV,{width:bx,height:bx,padding:q});if(qx.core.Environment.get(bA)==bD){qx.bom.element.Attribute.set(cV,bC,bF);}
else {qx.bom.element.Style.set(cV,bw,bB);}
;qx.event.Registration.addListener(cV,cu,dc.action,this.__yJ);}
;qx.dom.Element.insertEnd(cV,cY);}
;qx.dom.Element.insertEnd(cY,this.__Pb);}
;qx.dom.Element.insertEnd(qx.dom.Element.create(cs,{style:cb}),this.__Pb);}
}});}
)();
(function(){var q="engine.name",p="='",o="none",n="<INPUT TYPE='RADIO' NAME='RADIOTEST' VALUE='Second Choice'>",m="qx.dom.Element",k="webkit",j="The tag name is missing!",h="div",g="' ",f="></",b="<",d=" ",c=">",a="";qx.Bootstrap.define(m,{statics:{__gn:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},hasChild:function(parent,r){return r.parentNode===parent;}
,hasChildren:function(s){return !!s.firstChild;}
,hasChildElements:function(t){t=t.firstChild;while(t){if(t.nodeType===1){return true;}
;t=t.nextSibling;}
;return false;}
,getParentElement:function(u){return u.parentNode;}
,isInDom:function(v,w){if(!w){w=window;}
;var x=w.document.getElementsByTagName(v.nodeName);for(var i=0,l=x.length;i<l;i++){if(x[i]===v){return true;}
;}
;return false;}
,insertAt:function(y,parent,z){var A=parent.childNodes[z];if(A){parent.insertBefore(y,A);}
else {parent.appendChild(y);}
;return true;}
,insertBegin:function(B,parent){if(parent.firstChild){this.insertBefore(B,parent.firstChild);}
else {parent.appendChild(B);}
;}
,insertEnd:function(C,parent){parent.appendChild(C);}
,insertBefore:function(D,E){E.parentNode.insertBefore(D,E);return true;}
,insertAfter:function(F,G){var parent=G.parentNode;if(G==parent.lastChild){parent.appendChild(F);}
else {return this.insertBefore(F,G.nextSibling);}
;return true;}
,remove:function(H){if(!H.parentNode){return false;}
;H.parentNode.removeChild(H);return true;}
,removeChild:function(I,parent){if(I.parentNode!==parent){return false;}
;parent.removeChild(I);return true;}
,removeChildAt:function(J,parent){var K=parent.childNodes[J];if(!K){return false;}
;parent.removeChild(K);return true;}
,replaceChild:function(L,M){if(!M.parentNode){return false;}
;M.parentNode.replaceChild(L,M);return true;}
,replaceAt:function(N,O,parent){var P=parent.childNodes[O];if(!P){return false;}
;parent.replaceChild(N,P);return true;}
,__go:{},__gp:{},_allowCreationWithMarkup:function(Q){if(!Q){Q=window;}
;var R=Q.location.href;if(qx.dom.Element.__gp[R]==undefined){try{Q.document.createElement(n);qx.dom.Element.__gp[R]=true;}
catch(e){qx.dom.Element.__gp[R]=false;}
;}
;return qx.dom.Element.__gp[R];}
,getHelperElement:function(S){if(!S){S=window;}
;var U=S.location.href;if(!qx.dom.Element.__go[U]){var T=qx.dom.Element.__go[U]=S.document.createElement(h);if(qx.core.Environment.get(q)==k){T.style.display=o;S.document.body.appendChild(T);}
;}
;return qx.dom.Element.__go[U];}
,create:function(name,V,W){if(!W){W=window;}
;if(!name){throw new Error(j);}
;var Y=this.__gn;var X=a;for(var bb in V){if(Y[bb]){X+=bb+p+V[bb]+g;}
;}
;var bc;if(X!=a){if(qx.dom.Element._allowCreationWithMarkup(W)){bc=W.document.createElement(b+name+d+X+c);}
else {var ba=qx.dom.Element.getHelperElement(W);ba.innerHTML=b+name+d+X+f+name+c;bc=ba.firstChild;}
;}
else {bc=W.document.createElement(name);}
;for(var bb in V){if(!Y[bb]){qx.bom.element.Attribute.set(bc,bb,V[bb]);}
;}
;return bc;}
,empty:function(bd){return bd.innerHTML=a;}
}});}
)();
(function(){var o="function",n="html.video.h264",m="html.element.contains",l='video/ogg; codecs="theora, vorbis"',k="html.console",j="html.xul",i="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",h="html.video.ogg",g="http://www.w3.org/TR/SVG11/feature#BasicStructure",f="html.storage.local",bq="qx.bom.client.Html",bp='audio',bo='video/mp4; codecs="avc1.42E01E, mp4a.40.2"',bn="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",bm="html.audio",bl="url(#default#VML)",bk="audio/mpeg",bj="org.w3c.dom.svg",bi="html.classlist",bh="html.svg",w="html.video",x="html.geolocation",t="DOMTokenList",u="html.storage.session",r="1.1",s="object",p="html.image.naturaldimensions",q="html.audio.aif",C="audio/x-wav",D='<v:shape id="vml_flag1" adj="1" />',M="html.canvas",J="audio/ogg",U="html.storage.userdata",P="html.element.compareDocumentPosition",bd="audio/x-aiff",ba="html.audio.au",F="img",bg="html.xpath",bf="qxtest",be='video',E="span",H="html.element.textcontent",I="html.audio.mp3",L="html.vml",N="html.audio.ogg",Q="none",W="label",bc='video/webm; codecs="vp8, vorbis"',y="html.dataurl",z="html.webworker",G="html.dataset",T="1.0",S="html.audio.wav",R="html.filereader",Y="audio/basic",X="#default#userdata",O="html.video.webm",V="display",b="div",bb="head",A="number",B="video",K="undefined",c="audio",d="";qx.Bootstrap.define(bq,{statics:{getWebWorker:function(){return window.Worker!=null;}
,getFileReader:function(){return window.FileReader!=null;}
,getGeoLocation:function(){return navigator.geolocation!=null;}
,getAudio:function(){return !!document.createElement(bp).canPlayType;}
,getAudioOgg:function(){if(!qx.bom.client.Html.getAudio()){return d;}
;var a=document.createElement(c);return a.canPlayType(J);}
,getAudioMp3:function(){if(!qx.bom.client.Html.getAudio()){return d;}
;var a=document.createElement(c);return a.canPlayType(bk);}
,getAudioWav:function(){if(!qx.bom.client.Html.getAudio()){return d;}
;var a=document.createElement(c);return a.canPlayType(C);}
,getAudioAu:function(){if(!qx.bom.client.Html.getAudio()){return d;}
;var a=document.createElement(c);return a.canPlayType(Y);}
,getAudioAif:function(){if(!qx.bom.client.Html.getAudio()){return d;}
;var a=document.createElement(c);return a.canPlayType(bd);}
,getVideo:function(){return !!document.createElement(be).canPlayType;}
,getVideoOgg:function(){if(!qx.bom.client.Html.getVideo()){return d;}
;var v=document.createElement(B);return v.canPlayType(l);}
,getVideoH264:function(){if(!qx.bom.client.Html.getVideo()){return d;}
;var v=document.createElement(B);return v.canPlayType(bo);}
,getVideoWebm:function(){if(!qx.bom.client.Html.getVideo()){return d;}
;var v=document.createElement(B);return v.canPlayType(bc);}
,getLocalStorage:function(){try{return window.localStorage!=null;}
catch(br){return false;}
;}
,getSessionStorage:function(){try{return window.sessionStorage!=null;}
catch(bs){return false;}
;}
,getUserDataStorage:function(){var bt=document.createElement(b);bt.style[V]=Q;document.getElementsByTagName(bb)[0].appendChild(bt);var bu=false;try{bt.addBehavior(X);bt.load(bf);bu=true;}
catch(e){}
;document.getElementsByTagName(bb)[0].removeChild(bt);return bu;}
,getClassList:function(){return !!(document.documentElement.classList&&qx.Bootstrap.getClass(document.documentElement.classList)===t);}
,getXPath:function(){return !!document.evaluate;}
,getXul:function(){try{document.createElementNS(i,W);return true;}
catch(e){return false;}
;}
,getSvg:function(){return document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature(bj,T)||document.implementation.hasFeature(g,r));}
,getVml:function(){var bv=document.createElement(b);document.body.appendChild(bv);bv.innerHTML=D;bv.firstChild.style.behavior=bl;var bw=typeof bv.firstChild.adj==s;document.body.removeChild(bv);return bw;}
,getCanvas:function(){return !!window.CanvasRenderingContext2D;}
,getDataUrl:function(bx){var by=new Image();by.onload=by.onerror=function(){window.setTimeout(function(){bx.call(null,(by.width==1&&by.height==1));}
,0);}
;by.src=bn;}
,getDataset:function(){return !!document.documentElement.dataset;}
,getContains:function(){return (typeof document.documentElement.contains!==K);}
,getCompareDocumentPosition:function(){return (typeof document.documentElement.compareDocumentPosition===o);}
,getTextContent:function(){var bz=document.createElement(E);return (typeof bz.textContent!==K);}
,getConsole:function(){return typeof window.console!==K;}
,getNaturalDimensions:function(){var bA=document.createElement(F);return typeof bA.naturalHeight===A&&typeof bA.naturalWidth===A;}
},defer:function(bB){qx.core.Environment.add(z,bB.getWebWorker);qx.core.Environment.add(R,bB.getFileReader);qx.core.Environment.add(x,bB.getGeoLocation);qx.core.Environment.add(bm,bB.getAudio);qx.core.Environment.add(N,bB.getAudioOgg);qx.core.Environment.add(I,bB.getAudioMp3);qx.core.Environment.add(S,bB.getAudioWav);qx.core.Environment.add(ba,bB.getAudioAu);qx.core.Environment.add(q,bB.getAudioAif);qx.core.Environment.add(w,bB.getVideo);qx.core.Environment.add(h,bB.getVideoOgg);qx.core.Environment.add(n,bB.getVideoH264);qx.core.Environment.add(O,bB.getVideoWebm);qx.core.Environment.add(f,bB.getLocalStorage);qx.core.Environment.add(u,bB.getSessionStorage);qx.core.Environment.add(U,bB.getUserDataStorage);qx.core.Environment.add(bi,bB.getClassList);qx.core.Environment.add(bg,bB.getXPath);qx.core.Environment.add(j,bB.getXul);qx.core.Environment.add(M,bB.getCanvas);qx.core.Environment.add(bh,bB.getSvg);qx.core.Environment.add(L,bB.getVml);qx.core.Environment.add(G,bB.getDataset);qx.core.Environment.addAsync(y,bB.getDataUrl);qx.core.Environment.add(m,bB.getContains);qx.core.Environment.add(P,bB.getCompareDocumentPosition);qx.core.Environment.add(H,bB.getTextContent);qx.core.Environment.add(k,bB.getConsole);qx.core.Environment.add(p,bB.getNaturalDimensions);}
});}
)();
(function(){var j="readOnly",i="accessKey",h="qx.bom.element.Attribute",g="rowSpan",f="vAlign",e="className",d="textContent",c="'",b="htmlFor",a="longDesc",A="cellSpacing",z="frameBorder",y="='",x="useMap",w="innerText",v="innerHTML",u="tabIndex",t="dateTime",s="maxLength",r="html.element.textcontent",p="mshtml",q="cellPadding",n="browser.documentmode",o="colSpan",l="engine.name",m="undefined",k="";qx.Bootstrap.define(h,{statics:{__gq:{names:{"class":e,"for":b,html:v,text:qx.core.Environment.get(r)?d:w,colspan:o,rowspan:g,valign:f,datetime:t,accesskey:i,tabindex:u,maxlength:s,readonly:j,longdesc:a,cellpadding:q,cellspacing:A,frameborder:z,usemap:x},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readOnly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},qxProperties:{$$widget:1,$$html:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:k,className:k,innerHTML:k,innerText:k,textContent:k,htmlFor:k,tabIndex:0,maxLength:qx.core.Environment.select(l,{"mshtml":2147483647,"webkit":524288,"default":-1})},removeableProperties:{disabled:1,multiple:1,maxLength:1},original:{href:1,src:1,type:1}},compile:function(B){var C=[];var E=this.__gq.runtime;for(var D in B){if(!E[D]){C.push(D,y,B[D],c);}
;}
;return C.join(k);}
,get:function(F,name){var H=this.__gq;var G;name=H.names[name]||name;if(qx.core.Environment.get(l)==p&&parseInt(qx.core.Environment.get(n),10)<8&&H.original[name]){G=F.getAttribute(name,2);}
else if(H.property[name]){G=F[name];if(typeof H.propertyDefault[name]!==m&&G==H.propertyDefault[name]){if(typeof H.bools[name]===m){return null;}
else {return G;}
;}
;}
else {G=F.getAttribute(name);}
;if(H.bools[name]){return !!G;}
;return G;}
,set:function(I,name,J){if(typeof J===m){return;}
;var K=this.__gq;name=K.names[name]||name;if(K.bools[name]){J=!!J;}
;if(K.property[name]&&(!(I[name]===undefined)||K.qxProperties[name])){if(J==null){if(K.removeableProperties[name]){I.removeAttribute(name);return;}
else if(typeof K.propertyDefault[name]!==m){J=K.propertyDefault[name];}
;}
;I[name]=J;}
else {if(J===true){I.setAttribute(name,name);}
else if(J===false||J===null){I.removeAttribute(name);}
else {I.setAttribute(name,J);}
;}
;}
,reset:function(L,name){this.set(L,name,null);}
}});}
)();
(function(){var j="CSS1Compat",i="android",h="operamini",g="gecko",f="browser.quirksmode",e="browser.name",d="mobile chrome",c="iemobile",b="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Namoroka|Firefox",a="opera mobi",H="Mobile Safari",G="Maple",F="operamobile",E="ie",D="mobile safari",C="IEMobile|Maxthon|MSIE",B="qx.bom.client.Browser",A="(Maple )([0-9]+\.[0-9]+\.[0-9]*)",z="opera mini",y="browser.version",q="opera",r="Opera Mini|Opera Mobi|Opera",o="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|Mobile Safari|Safari",p="webkit",m="browser.documentmode",n="5.0",k="Mobile/",l="msie",s="maple",t=")(/| )([0-9]+\.[0-9])",v="(",u="ce",x="",w="mshtml";qx.Bootstrap.define(B,{statics:{getName:function(){var L=navigator.userAgent;var K=new RegExp(v+qx.bom.client.Browser.__dh+t);var J=L.match(K);if(!J){return x;}
;var name=J[1].toLowerCase();var I=qx.bom.client.Engine.getName();if(I===p){if(name===i){name=d;}
else if(L.indexOf(H)!==-1||L.indexOf(k)!==-1){name=D;}
;}
else if(I===w){if(name===l){name=E;if(qx.bom.client.OperatingSystem.getVersion()===u){name=c;}
;}
;}
else if(I===q){if(name===a){name=F;}
else if(name===z){name=h;}
;}
else if(I===g){if(L.indexOf(G)!==-1){name=s;}
;}
;;;return name;}
,getVersion:function(){var P=navigator.userAgent;var O=new RegExp(v+qx.bom.client.Browser.__dh+t);var N=P.match(O);if(!N){return x;}
;var name=N[1].toLowerCase();var M=N[3];if(P.match(/Version(\/| )([0-9]+\.[0-9])/)){M=RegExp.$2;}
;if(qx.bom.client.Engine.getName()==w){M=qx.bom.client.Engine.getVersion();if(name===l&&qx.bom.client.OperatingSystem.getVersion()==u){M=n;}
;}
;if(qx.bom.client.Browser.getName()==s){O=new RegExp(A);N=P.match(O);if(!N){return x;}
;M=N[2];}
;return M;}
,getDocumentMode:function(){if(document.documentMode){return document.documentMode;}
;return 0;}
,getQuirksMode:function(){if(qx.bom.client.Engine.getName()==w&&parseFloat(qx.bom.client.Engine.getVersion())>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;}
else {return document.compatMode!==j;}
;}
,__dh:{"webkit":o,"gecko":b,"mshtml":C,"opera":r}[qx.bom.client.Engine.getName()]},defer:function(Q){qx.core.Environment.add(e,Q.getName),qx.core.Environment.add(y,Q.getVersion),qx.core.Environment.add(m,Q.getDocumentMode),qx.core.Environment.add(f,Q.getQuirksMode);}
});}
)();
(function(){var p="clip:auto;",o="rect(",n=")",m=");",l="",k="Could not parse clip string: ",j="qx.bom.element.Clip",i="string",h="clip:rect(",g=" ",c="clip",f="rect(auto,auto,auto,auto)",e="rect(auto, auto, auto, auto)",b=",",a="px",d="auto";qx.Bootstrap.define(j,{statics:{compile:function(q){if(!q){return p;}
;var v=q.left;var top=q.top;var u=q.width;var t=q.height;var r,s;if(v==null){r=(u==null?d:u+a);v=d;}
else {r=(u==null?d:v+u+a);v=v+a;}
;if(top==null){s=(t==null?d:t+a);top=d;}
else {s=(t==null?d:top+t+a);top=top+a;}
;return h+top+b+r+b+s+b+v+m;}
,get:function(w,x){var z=qx.bom.element.Style.get(w,c,x,false);var F,top,D,C;var y,A;if(typeof z===i&&z!==d&&z!==l){z=qx.lang.String.trim(z);if(/\((.*)\)/.test(z)){var E=RegExp.$1;if(/,/.test(E)){var B=E.split(b);}
else {var B=E.split(g);}
;top=qx.lang.String.trim(B[0]);y=qx.lang.String.trim(B[1]);A=qx.lang.String.trim(B[2]);F=qx.lang.String.trim(B[3]);if(F===d){F=null;}
;if(top===d){top=null;}
;if(y===d){y=null;}
;if(A===d){A=null;}
;if(top!=null){top=parseInt(top,10);}
;if(y!=null){y=parseInt(y,10);}
;if(A!=null){A=parseInt(A,10);}
;if(F!=null){F=parseInt(F,10);}
;if(y!=null&&F!=null){D=y-F;}
else if(y!=null){D=y;}
;if(A!=null&&top!=null){C=A-top;}
else if(A!=null){C=A;}
;}
else {throw new Error(k+z);}
;}
;return {left:F||null,top:top||null,width:D||null,height:C||null};}
,set:function(G,H){if(!H){G.style.clip=f;return;}
;var M=H.left;var top=H.top;var L=H.width;var K=H.height;var I,J;if(M==null){I=(L==null?d:L+a);M=d;}
else {I=(L==null?d:M+L+a);M=M+a;}
;if(top==null){J=(K==null?d:K+a);top=d;}
else {J=(K==null?d:top+K+a);top=top+a;}
;G.style.clip=o+top+b+I+b+J+b+M+n;}
,reset:function(N){N.style.clip=e;}
}});}
)();
(function(){var d="qx.bom.Style",c="string",b="",a="-";qx.Bootstrap.define(d,{statics:{VENDOR_PREFIXES:["Webkit","Moz","O","ms","Khtml"],getPropertyName:function(e){var f=document.documentElement.style;if(f[e]!==undefined){return e;}
;for(var i=0,l=this.VENDOR_PREFIXES.length;i<l;i++){var g=this.VENDOR_PREFIXES[i]+qx.lang.String.firstUp(e);if(f[g]!==undefined){return g;}
;}
;return null;}
,getAppliedStyle:function(h,j,k,m){var n=(m!==false)?[null].concat(this.VENDOR_PREFIXES):[null];for(var i=0,l=n.length;i<l;i++){var o=n[i]?a+n[i].toLowerCase()+a+k:k;try{h.style[j]=o;if(typeof h.style[j]==c&&h.style[j]!==b){return o;}
;}
catch(p){}
;}
;return null;}
}});}
)();
(function(){var k="This client does not support the boxSizing value",j="border-box",i="qx.bom.element.BoxSizing",h="boxSizing",g="content-box",f=":",e=";",d="",c="This client does not support dynamic modification of the boxSizing property.",b="qx.debug",a="css.boxsizing";qx.Bootstrap.define(i,{statics:{__dc:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__dd:function(l){var m=this.__dc;return m.tags[l.tagName.toLowerCase()]||m.types[l.type];}
,compile:function(n){if(qx.core.Environment.get(a)){var o=qx.lang.String.hyphenate(qx.core.Environment.get(a));return o+f+n+e;}
else {if(qx.core.Environment.get(b)){qx.log.Logger.warn(this,c);qx.log.Logger.trace();}
;}
;}
,get:function(p){if(qx.core.Environment.get(a)){return qx.bom.element.Style.get(p,h,null,false)||d;}
;if(qx.bom.Document.isStandardMode(qx.dom.Node.getWindow(p))){if(!this.__dd(p)){return g;}
;}
;return j;}
,set:function(q,r){if(qx.core.Environment.get(a)){try{q.style[qx.core.Environment.get(a)]=r;}
catch(s){if(qx.core.Environment.get(b)){qx.log.Logger.warn(this,k,r);}
;}
;}
else {if(qx.core.Environment.get(b)){qx.log.Logger.warn(this,c);}
;}
;}
,reset:function(t){this.set(t,d);}
}});}
)();
(function(){var o="css.float",n="css.borderimage.standardsyntax",m="borderRadius",k="boxSizing",j='m11',h="content",g="css.inlineblock",f="css.gradient.filter",e="css.appearance",d="css.opacity",br="css.gradient.radial",bq="input",bp="borderImage",bo="userSelect",bn="css.overflowxy",bm="styleFloat",bl="css.textShadow.filter",bk="css.usermodify",bj="css.boxsizing",bi='url("foo.png") 4 4 4 4 fill stretch',v="css.boxmodel",w="qx.bom.client.Css",t="appearance",u="placeholder",r="css.textShadow",s="DXImageTransform.Microsoft.Shadow",p="css.boxshadow",q="css.gradient.legacywebkit",C="css.borderradius",D="linear-gradient(0deg, #fff, #000)",N="textShadow",K="css.borderimage",V="rgba(1, 2, 3, 0.5)",Q="color=#666666,direction=45",be="radial-gradient(0px 0px, cover, red 50%, blue 100%)",bb="rgba",G="(",bh='url("foo.png") 4 4 4 4 stretch',bg="css.gradient.linear",bf="DXImageTransform.Microsoft.Gradient",F="css.userselect",I="-webkit-gradient(linear,0% 0%,100% 100%,from(white), to(red))",J="mshtml",M="css.rgba",O=");",R="4 fill",X='WebKitCSSMatrix',bd="red 1px 1px 3px",x="none",y="startColorStr=#550000FF, endColorStr=#55FFFF00",H="progid:",U="css.placeholder",T="css.userselect.none",S="css.textoverflow",ba="textOverflow",Y="userModify",P="boxShadow",W="cssFloat",a="border",bc="color",z="span",A="string",L="-moz-none",b="backgroundImage",c="inline-block",E="-moz-inline-box",B="div";qx.Bootstrap.define(w,{statics:{__de:null,getBoxModel:function(){var content=qx.bom.client.Engine.getName()!==J||!qx.bom.client.Browser.getQuirksMode();return content?h:a;}
,getTextOverflow:function(){return qx.bom.Style.getPropertyName(ba);}
,getPlaceholder:function(){var i=document.createElement(bq);return u in i;}
,getAppearance:function(){return qx.bom.Style.getPropertyName(t);}
,getBorderRadius:function(){return qx.bom.Style.getPropertyName(m);}
,getBoxShadow:function(){return qx.bom.Style.getPropertyName(P);}
,getBorderImage:function(){return qx.bom.Style.getPropertyName(bp);}
,getBorderImageSyntax:function(){var bu=qx.bom.client.Css.getBorderImage();if(!bu){return null;}
;var bt=[{standard:true,syntax:bi,regEx:/foo\.png.*?4.*?fill.*?stretch/},{standard:false,syntax:bh,regEx:/foo\.png.*?4 4 4 4 stretch/}];for(var i=0,l=bt.length;i<l;i++){var bs=document.createElement(B);bs.style[bu]=bt[i].syntax;if(bt[i].regEx.exec(bs.style[bu])||bs.style.borderImageSlice&&bs.style.borderImageSlice==R){return bt[i].standard;}
;}
;return null;}
,getUserSelect:function(){return qx.bom.Style.getPropertyName(bo);}
,getUserSelectNone:function(){var bw=qx.bom.client.Css.getUserSelect();if(bw){var bv=document.createElement(z);bv.style[bw]=L;return bv.style[bw]===L?L:x;}
;return null;}
,getUserModify:function(){return qx.bom.Style.getPropertyName(Y);}
,getFloat:function(){var bx=document.documentElement.style;return bx.cssFloat!==undefined?W:bx.styleFloat!==undefined?bm:null;}
,getTranslate3d:function(){return X in window&&j in new WebKitCSSMatrix();}
,getLinearGradient:function(){qx.bom.client.Css.__de=false;var bB=D;var by=document.createElement(B);var bz=qx.bom.Style.getAppliedStyle(by,b,bB);if(!bz){bB=I;var bz=qx.bom.Style.getAppliedStyle(by,b,bB,false);if(bz){qx.bom.client.Css.__de=true;}
;}
;if(!bz){return null;}
;var bA=/(.*?)\(/.exec(bz);return bA?bA[1]:null;}
,getFilterGradient:function(){return qx.bom.client.Css.__df(bf,y);}
,getRadialGradient:function(){var bF=be;var bC=document.createElement(B);var bD=qx.bom.Style.getAppliedStyle(bC,b,bF);if(!bD){return null;}
;var bE=/(.*?)\(/.exec(bD);return bE?bE[1]:null;}
,getLegacyWebkitGradient:function(){if(qx.bom.client.Css.__de===null){qx.bom.client.Css.getLinearGradient();}
;return qx.bom.client.Css.__de;}
,getRgba:function(){var bG;try{bG=document.createElement(B);}
catch(bH){bG=document.createElement();}
;try{bG.style[bc]=V;if(bG.style[bc].indexOf(bb)!=-1){return true;}
;}
catch(bI){}
;return false;}
,getBoxSizing:function(){return qx.bom.Style.getPropertyName(k);}
,getInlineBlock:function(){var bJ=document.createElement(z);bJ.style.display=c;if(bJ.style.display==c){return c;}
;bJ.style.display=E;if(bJ.style.display!==E){return E;}
;return null;}
,getOpacity:function(){return (typeof document.documentElement.style.opacity==A);}
,getOverflowXY:function(){return (typeof document.documentElement.style.overflowX==A)&&(typeof document.documentElement.style.overflowY==A);}
,getTextShadow:function(){var bM=bd;var bK=document.createElement(B);var bL=qx.bom.Style.getAppliedStyle(bK,N,bM);return !bL;}
,getFilterTextShadow:function(){return qx.bom.client.Css.__df(s,Q);}
,__df:function(bN,bO){var bQ=false;var bR=H+bN+G+bO+O;var bP=document.createElement(B);document.body.appendChild(bP);bP.style.filter=bR;if(bP.filters&&bP.filters.length>0&&bP.filters.item(bN).enabled==true){bQ=true;}
;document.body.removeChild(bP);return bQ;}
},defer:function(bS){qx.core.Environment.add(S,bS.getTextOverflow);qx.core.Environment.add(U,bS.getPlaceholder);qx.core.Environment.add(C,bS.getBorderRadius);qx.core.Environment.add(p,bS.getBoxShadow);qx.core.Environment.add(bg,bS.getLinearGradient);qx.core.Environment.add(f,bS.getFilterGradient);qx.core.Environment.add(br,bS.getRadialGradient);qx.core.Environment.add(q,bS.getLegacyWebkitGradient);qx.core.Environment.add(v,bS.getBoxModel);qx.core.Environment.add(M,bS.getRgba);qx.core.Environment.add(K,bS.getBorderImage);qx.core.Environment.add(n,bS.getBorderImageSyntax);qx.core.Environment.add(bk,bS.getUserModify);qx.core.Environment.add(F,bS.getUserSelect);qx.core.Environment.add(T,bS.getUserSelectNone);qx.core.Environment.add(e,bS.getAppearance);qx.core.Environment.add(o,bS.getFloat);qx.core.Environment.add(bj,bS.getBoxSizing);qx.core.Environment.add(g,bS.getInlineBlock);qx.core.Environment.add(d,bS.getOpacity);qx.core.Environment.add(bn,bS.getOverflowXY);qx.core.Environment.add(r,bS.getTextShadow);qx.core.Environment.add(bl,bS.getFilterTextShadow);}
});}
)();
(function(){var k="engine.name",j="",i="cursor:",h=";",g="qx.bom.element.Cursor",f="cursor",e="hand",d="nw-resize",c="ne-resize",b="n-resize",a="e-resize";qx.Bootstrap.define(g,{statics:{__bd:qx.core.Environment.select(k,{"mshtml":{"cursor":e,"ew-resize":a,"ns-resize":b,"nesw-resize":c,"nwse-resize":d},"opera":{"col-resize":a,"row-resize":b,"ew-resize":a,"ns-resize":b,"nesw-resize":c,"nwse-resize":d},"default":{}}),compile:function(l){return i+(this.__bd[l]||l)+h;}
,get:function(m,n){return qx.bom.element.Style.get(m,f,n,false);}
,set:function(o,p){o.style.cursor=this.__bd[p]||p;}
,reset:function(q){q.style.cursor=j;}
}});}
)();
(function(){var r="&",q="function",p="Invalid argument 'array'",o="Invalid argument 'minLength'",n="Invalid argument 'source'",m=" at array index ",k="Could not convert complex objects like ",j="qx.lang.Object",h="undefined",g=" to map syntax",c="object",f="+",e="Invalid argument 'target'",b="=",a="Invalid argument 'map'",d="qx.debug";qx.Bootstrap.define(j,{statics:{empty:function(s){if(qx.core.Environment.get(d)){qx.core.Assert&&qx.core.Assert.assertMap(s,a);}
;for(var t in s){if(s.hasOwnProperty(t)){delete s[t];}
;}
;}
,isEmpty:function(u){if(qx.core.Environment.get(d)){qx.core.Assert&&qx.core.Assert.assertMap(u,a);}
;for(var v in u){return false;}
;return true;}
,hasMinLength:function(w,x){if(qx.core.Environment.get(d)){qx.core.Assert&&qx.core.Assert.assertMap(w,a);qx.core.Assert&&qx.core.Assert.assertInteger(x,o);}
;if(x<=0){return true;}
;var length=0;for(var y in w){if((++length)>=x){return true;}
;}
;return false;}
,getLength:qx.Bootstrap.objectGetLength,getKeys:qx.Bootstrap.getKeys,getKeysAsString:qx.Bootstrap.getKeysAsString,getValues:function(z){if(qx.core.Environment.get(d)){qx.core.Assert&&qx.core.Assert.assertMap(z,a);}
;var B=[];var A=this.getKeys(z);for(var i=0,l=A.length;i<l;i++){B.push(z[A[i]]);}
;return B;}
,mergeWith:qx.Bootstrap.objectMergeWith,carefullyMergeWith:function(C,D){if(qx.core.Environment.get(d)){qx.core.Assert&&qx.core.Assert.assertMap(C,e);qx.core.Assert&&qx.core.Assert.assertMap(D,n);}
;return qx.lang.Object.mergeWith(C,D,false);}
,merge:function(E,F){if(qx.core.Environment.get(d)){qx.core.Assert&&qx.core.Assert.assertMap(E,e);}
;var G=arguments.length;for(var i=1;i<G;i++){qx.lang.Object.mergeWith(E,arguments[i]);}
;return E;}
,clone:function(H,I){if(qx.lang.Type.isObject(H)){var J={};for(var K in H){if(I){J[K]=qx.lang.Object.clone(H[K],I);}
else {J[K]=H[K];}
;}
;return J;}
else if(qx.lang.Type.isArray(H)){var J=[];for(var i=0;i<H.length;i++){if(I){J[i]=qx.lang.Object.clone(H[i]);}
else {J[i]=H[i];}
;}
;return J;}
;return H;}
,invert:function(L){if(qx.core.Environment.get(d)){qx.core.Assert&&qx.core.Assert.assertMap(L,a);}
;var M={};for(var N in L){M[L[N].toString()]=N;}
;return M;}
,getKeyFromValue:function(O,P){if(qx.core.Environment.get(d)){qx.core.Assert&&qx.core.Assert.assertMap(O,a);}
;for(var Q in O){if(O.hasOwnProperty(Q)&&O[Q]===P){return Q;}
;}
;return null;}
,contains:function(R,S){if(qx.core.Environment.get(d)){qx.core.Assert&&qx.core.Assert.assertMap(R,a);}
;return this.getKeyFromValue(R,S)!==null;}
,select:function(T,U){if(qx.core.Environment.get(d)){qx.core.Assert&&qx.core.Assert.assertMap(U,a);}
;return U[T];}
,fromArray:function(V){if(qx.core.Environment.get(d)){qx.core.Assert&&qx.core.Assert.assertArray(V,p);}
;var W={};for(var i=0,l=V.length;i<l;i++){if(qx.core.Environment.get(d)){switch(typeof V[i]){case c:case q:case h:throw new Error(k+V[i]+m+i+g);};}
;W[V[i].toString()]=true;}
;return W;}
,toUriParameter:function(X,Y){var bc,ba=[];for(bc in X){if(X.hasOwnProperty(bc)){var bb=X[bc];if(bb instanceof Array){for(var i=0;i<bb.length;i++){this.__di(bc,bb[i],ba,Y);}
;}
else {this.__di(bc,bb,ba,Y);}
;}
;}
;return ba.join(r);}
,__di:function(bd,be,bf,bg){var bh=window.encodeURIComponent;if(bg){bf.push(bh(bd).replace(/%20/g,f)+b+bh(be).replace(/%20/g,f));}
else {bf.push(bh(bd)+b+bh(be));}
;}
}});}
)();
(function(){var k="borderLeftStyle",j="borderRightStyle",i="div",h="borderRightWidth",g="overflow-y",f="borderLeftWidth",e="-moz-scrollbars-vertical",d=":",b="100px",a="overflow:",B="qx.bom.element.Overflow",A="overflow-x",z="overflowX",y=";",x="overflowY",w="engine.version",v="none",u="scroll",r="gecko",q="overflow",o="",p="engine.name",m="-moz-scrollbars-none",n="hidden",l="css.overflowxy";qx.Bootstrap.define(B,{statics:{DEFAULT_SCROLLBAR_WIDTH:14,__dj:null,getScrollbarWidth:function(){if(this.__dj!==null){return this.__dj;}
;var C=qx.bom.element.Style;var E=function(I,J){return parseInt(C.get(I,J),10)||0;}
;var F=function(K){return (C.get(K,j)==v?0:E(K,h));}
;var D=function(L){return (C.get(L,k)==v?0:E(L,f));}
;var H=qx.core.Environment.select(p,{"mshtml":function(M){if(C.get(M,x)==n||M.clientWidth==0){return F(M);}
;return Math.max(0,M.offsetWidth-M.clientLeft-M.clientWidth);}
,"default":function(N){if(N.clientWidth==0){var O=C.get(N,q);var P=(O==u||O==e?16:0);return Math.max(0,F(N)+P);}
;return Math.max(0,(N.offsetWidth-N.clientWidth-D(N)));}
});var G=function(Q){return H(Q)-F(Q);}
;var t=document.createElement(i);var s=t.style;s.height=s.width=b;s.overflow=u;document.body.appendChild(t);var c=G(t);this.__dj=c;document.body.removeChild(t);return this.__dj;}
,_compile:function(R,S){if(!qx.core.Environment.get(l)){R=a;if(qx.core.Environment.get(p)===r&&S==n){S=m;}
;}
;return R+d+S+y;}
,compileX:function(T){return this._compile(A,T);}
,compileY:function(U){return this._compile(g,U);}
,getX:function(V,W){if(qx.core.Environment.get(l)){return qx.bom.element.Style.get(V,z,W,false);}
;var X=qx.bom.element.Style.get(V,q,W,false);if(X===m){X=n;}
;return X;}
,setX:function(Y,ba){if(qx.core.Environment.get(l)){Y.style.overflowX=ba;}
else {if(ba===n&&qx.core.Environment.get(p)===r&&parseFloat(qx.core.Environment.get(w))<1.8){ba=m;}
;Y.style.overflow=ba;}
;}
,resetX:function(bb){if(qx.core.Environment.get(l)){bb.style.overflowX=o;}
else {bb.style.overflow=o;}
;}
,getY:function(bc,bd){if(qx.core.Environment.get(l)){return qx.bom.element.Style.get(bc,x,bd,false);}
;var be=qx.bom.element.Style.get(bc,q,bd,false);if(be===m){be=n;}
;return be;}
,setY:function(bf,bg){if(qx.core.Environment.get(l)){bf.style.overflowY=bg;}
else {if(bg===n&&qx.core.Environment.get(p)===r&&parseFloat(qx.core.Environment.get(w))<1.8){bg=m;}
;bf.style.overflow=bg;}
;}
,resetY:function(bh){if(qx.core.Environment.get(l)){bh.style.overflowY=o;}
else {bh.style.overflow=o;}
;}
}});}
)();
(function(){var m="MozOpacity",l=");",k=")",j="zoom:1;filter:alpha(opacity=",i="qx.bom.element.Opacity",h="css.opacity",g="alpha(opacity=",f=";",e="opacity:",d="opacity",a="filter",c="engine.name",b="";qx.Bootstrap.define(i,{statics:{SUPPORT_CSS3_OPACITY:false,compile:qx.core.Environment.select(c,{"mshtml":function(n){if(n>=1){n=1;}
;if(n<0.00001){n=0;}
;if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){return e+n+f;}
else {return j+(n*100)+l;}
;}
,"gecko":function(o){if(o>=1){o=0.999999;}
;return e+o+f;}
,"default":function(p){if(p>=1){return b;}
;return e+p+f;}
}),set:qx.core.Environment.select(c,{"mshtml":function(q,r){if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){if(r>=1){r=b;}
;q.style.opacity=r;}
else {var s=qx.bom.element.Style.get(q,a,qx.bom.element.Style.COMPUTED_MODE,false);if(r>=1){r=1;}
;if(r<0.00001){r=0;}
;if(!q.currentStyle||!q.currentStyle.hasLayout){q.style.zoom=1;}
;q.style.filter=s.replace(/alpha\([^\)]*\)/gi,b)+g+r*100+k;}
;}
,"gecko":function(t,u){if(u>=1){u=0.999999;}
;if(!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){t.style.MozOpacity=u;}
else {t.style.opacity=u;}
;}
,"default":function(v,w){if(w>=1){w=b;}
;v.style.opacity=w;}
}),reset:qx.core.Environment.select(c,{"mshtml":function(x){if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){x.style.opacity=b;}
else {var y=qx.bom.element.Style.get(x,a,qx.bom.element.Style.COMPUTED_MODE,false);x.style.filter=y.replace(/alpha\([^\)]*\)/gi,b);}
;}
,"gecko":function(z){if(!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){z.style.MozOpacity=b;}
else {z.style.opacity=b;}
;}
,"default":function(A){A.style.opacity=b;}
}),get:qx.core.Environment.select(c,{"mshtml":function(B,C){if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){var D=qx.bom.element.Style.get(B,d,C,false);if(D!=null){return parseFloat(D);}
;return 1.0;}
else {var E=qx.bom.element.Style.get(B,a,C,false);if(E){var D=E.match(/alpha\(opacity=(.*)\)/);if(D&&D[1]){return parseFloat(D[1])/100;}
;}
;return 1.0;}
;}
,"gecko":function(F,G){var H=qx.bom.element.Style.get(F,!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY?m:d,G,false);if(H==0.999999){H=1.0;}
;if(H!=null){return parseFloat(H);}
;return 1.0;}
,"default":function(I,J){var K=qx.bom.element.Style.get(I,d,J,false);if(K!=null){return parseFloat(K);}
;return 1.0;}
})},defer:function(L){L.SUPPORT_CSS3_OPACITY=qx.core.Environment.get(h);}
});}
)();
(function(){var j="css.float",i="px",h="Cascaded styles are not supported in this browser!",g="css.appearance",f="pixelRight",e="css.userselect",d="css.boxsizing",c="css.textoverflow",b="pixelHeight",a=":",E="pixelTop",D="css.borderimage",C="Invalid argument 'name'",B="pixelLeft",A="css.usermodify",z="qx.bom.element.Style",y=". Only pixel values work well across different clients.",x="pixelBottom",w="Invalid argument 'styles'",v="pixelWidth",q="Untranslated computed property value: ",r=";",o="float",p="qx.debug",m="browser.documentmode",n="mshtml",k="Invalid argument 'smart'",l="Invalid argument 'element'",s="style",t="engine.name",u="";qx.Bootstrap.define(z,{statics:{__dk:function(){var G={"appearance":qx.core.Environment.get(g),"userSelect":qx.core.Environment.get(e),"textOverflow":qx.core.Environment.get(c),"borderImage":qx.core.Environment.get(D),"float":qx.core.Environment.get(j),"userModify":qx.core.Environment.get(A),"boxSizing":qx.core.Environment.get(d)};this.__dl={};for(var F in qx.lang.Object.clone(G)){if(!G[F]){delete G[F];}
else {this.__dl[F]=F==o?o:qx.lang.String.hyphenate(G[F]);}
;}
;this.__dm=G;}
,__dn:function(name){var H=qx.bom.Style.getPropertyName(name);if(H){this.__dm[name]=H;}
;return H;}
,__do:{width:v,height:b,left:B,right:f,top:E,bottom:x},__dp:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}},compile:function(I){var K=[];var M=this.__dp;var L=this.__dl;var name,J;for(name in I){J=I[name];if(J==null){continue;}
;name=L[name]||name;if(M[name]){K.push(M[name].compile(J));}
else {K.push(qx.lang.String.hyphenate(name),a,J,r);}
;}
;return K.join(u);}
,setCss:function(N,O){if(qx.core.Environment.get(t)===n&&parseInt(qx.core.Environment.get(m),10)<8){N.style.cssText=O;}
else {N.setAttribute(s,O);}
;}
,getCss:function(P){if(qx.core.Environment.get(t)===n&&parseInt(qx.core.Environment.get(m),10)<8){return P.style.cssText.toLowerCase();}
else {return P.getAttribute(s);}
;}
,isPropertySupported:function(Q){return (this.__dp[Q]||this.__dm[Q]||Q in document.documentElement.style);}
,COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(R,name,S,T){if(qx.core.Environment.get(p)){qx.core.Assert.assertElement(R,l);qx.core.Assert.assertString(name,C);if(T!==undefined){qx.core.Assert.assertBoolean(T,k);}
;}
;name=this.__dm[name]||this.__dn(name)||name;if(T!==false&&this.__dp[name]){return this.__dp[name].set(R,S);}
else {R.style[name]=S!==null?S:u;}
;}
,setStyles:function(U,V,W){if(qx.core.Environment.get(p)){qx.core.Assert.assertElement(U,l);qx.core.Assert.assertMap(V,w);if(W!==undefined){qx.core.Assert.assertBoolean(W,k);}
;}
;var ba=this.__dm;var bc=this.__dp;var X=U.style;for(var bb in V){var Y=V[bb];var name=ba[bb]||this.__dn(bb)||bb;if(Y===undefined){if(W!==false&&bc[name]){bc[name].reset(U);}
else {X[name]=u;}
;}
else {if(W!==false&&bc[name]){bc[name].set(U,Y);}
else {X[name]=Y!==null?Y:u;}
;}
;}
;}
,reset:function(bd,name,be){name=this.__dm[name]||this.__dn(name)||name;if(be!==false&&this.__dp[name]){return this.__dp[name].reset(bd);}
else {bd.style[name]=u;}
;}
,get:qx.core.Environment.select(t,{"mshtml":function(bf,name,bg,bh){name=this.__dm[name]||this.__dn(name)||name;if(bh!==false&&this.__dp[name]){return this.__dp[name].get(bf,bg);}
;if(!bf.currentStyle){return bf.style[name]||u;}
;switch(bg){case this.LOCAL_MODE:return bf.style[name]||u;case this.CASCADED_MODE:return bf.currentStyle[name]||u;default:var bl=bf.currentStyle[name]||u;if(/^-?[\.\d]+(px)?$/i.test(bl)){return bl;}
;var bk=this.__do[name];if(bk){var bi=bf.style[name];bf.style[name]=bl||0;var bj=bf.style[bk]+i;bf.style[name]=bi;return bj;}
;if(/^-?[\.\d]+(em|pt|%)?$/i.test(bl)){throw new Error(q+name+y);}
;return bl;};}
,"default":function(bm,name,bn,bo){name=this.__dm[name]||this.__dn(name)||name;if(bo!==false&&this.__dp[name]){return this.__dp[name].get(bm,bn);}
;switch(bn){case this.LOCAL_MODE:return bm.style[name]||u;case this.CASCADED_MODE:if(bm.currentStyle){return bm.currentStyle[name]||u;}
;throw new Error(h);default:var bp=qx.dom.Node.getDocument(bm);var bq=bp.defaultView.getComputedStyle(bm,null);return bq?bq[name]:u;};}
})},defer:function(br){br.__dk();}
});}
)();
(function(){var g="engine.name",f="position:absolute;width:0;height:0;width:1",e="engine.version",d="qx.bom.Document",c="1px",b="div",a="CSS1Compat";qx.Bootstrap.define(d,{statics:{isQuirksMode:qx.core.Environment.select(g,{"mshtml":function(h){if(qx.core.Environment.get(e)>=8){return (h||window).document.documentMode===5;}
else {return (h||window).document.compatMode!==a;}
;}
,"webkit":function(i){if(document.compatMode===undefined){var j=(i||window).document.createElement(b);j.style.cssText=f;return j.style.width===c?true:false;}
else {return (i||window).document.compatMode!==a;}
;}
,"default":function(k){return (k||window).document.compatMode!==a;}
}),isStandardMode:function(l){return !this.isQuirksMode(l);}
,getWidth:function(m){var n=(m||window).document;var o=qx.bom.Viewport.getWidth(m);var scroll=this.isStandardMode(m)?n.documentElement.scrollWidth:n.body.scrollWidth;return Math.max(scroll,o);}
,getHeight:function(p){var q=(p||window).document;var r=qx.bom.Viewport.getHeight(p);var scroll=this.isStandardMode(p)?q.documentElement.scrollHeight:q.body.scrollHeight;return Math.max(scroll,r);}
}});}
)();
(function(){var b="qx.bom.Viewport",a="undefined";qx.Bootstrap.define(b,{statics:{getWidth:function(c){var c=c||window;var d=c.document;return qx.bom.Document.isStandardMode(c)?d.documentElement.clientWidth:d.body.clientWidth;}
,getHeight:function(e){var e=e||window;var f=e.document;return qx.bom.Document.isStandardMode(e)?f.documentElement.clientHeight:f.body.clientHeight;}
,getScrollLeft:function(g){var g=g?g:window;if(typeof g.pageXOffset!==a){return g.pageXOffset;}
;var h=g.document;return h.documentElement.scrollLeft||h.body.scrollLeft;}
,getScrollTop:function(i){var i=i?i:window;if(typeof i.pageYOffeset!==a){return i.pageYOffset;}
;var j=i.document;return j.documentElement.scrollTop||j.body.scrollTop;}
,__dq:function(k){var l=this.getWidth(k)>this.getHeight(k)?90:0;var m=k.orientation;if(m==null||Math.abs(m%180)==l){return {"-270":90,"-180":180,"-90":-90,"0":0,"90":90,"180":180,"270":-90};}
else {return {"-270":180,"-180":-90,"-90":0,"0":90,"90":180,"180":-90,"270":0};}
;}
,__dr:null,getOrientation:function(n){var n=n||window.top;var o=n.orientation;if(o==null){o=this.getWidth(n)>this.getHeight(n)?90:0;}
else {if(this.__dr==null){this.__dr=this.__dq(n);}
;o=this.__dr[o];}
;return o;}
,isLandscape:function(p){return this.getWidth(p)>=this.getHeight(p);}
,isPortrait:function(q){return this.getWidth(q)<this.getHeight(q);}
}});}
)();
(function(){var dV="qx.blankpage",dU='</span>',dT="backgroundColor",dS="li",dR='undo',dQ="<br class='webkit-block-placeholder' />",dP="Function",dO="fontSize",dN="textcolor",dM="cant open document on source '",cu="home",ct="<",cs="focused",cr="fontFamily",cq="load",cp='document not available, try again...',co='<font ',cn='id="__elementToFocus__"',cl="setUnderline",ck="backgroundPosition",ed="<!--",ee=' size="',eb='/www.w3.org/1999/xhtml" xml:lang="en" lang="en">',ec="'>",dY='underline',ea='bold',dW="&copy;",dX="ul",ef="cursorContext",eg="readyAfterInvalid",dr="styleWithCSS",dq="span",dt=" />",ds="setBold",dv="<P>&nbsp;</P>",du="</",dx="textbackgroundcolor",dw="&gt;",dp='="',dn="can't extract style from elem. ",o="paddingLeft",p='size',q="inserthorizontalrule",r='<p>',t='</font>',u="backgroundRepeat",v="insertimage",w="a",x="&amp;",y="removeformat",ev="marginLeft",eu="ready",et="<p>&nbsp;</p>",es='DOCTYPE html PUBLIC "-/',eA="browser.version",ez=" html, body {overflow-x: visible; } ",ey='<body>',ew="insertorderedlist",eC='body { font-size:100.01%; font-family:Verdana, Geneva, Arial, Helvetica, sans-serif; background-color:transparent; overflow:visible; background-image:none; margin:0px; padding:5px; } ',eB="hideFocus",br="none",bs='/DTD XHTML 1.0 Transitional/',bp='<html xmlns="http:/',bq="outline",bv="setItalic",bw="font-style",bt="marginBottom",bu="xhtml",bn="focusOut",bo="justifyleft",S="handleMouse ",R='</p>',U="paddingTop",T="Please use the method 'qx.dom.Node.isBlockNode' instead.",O='<title></title><meta http-equiv="Content-type" content="text/html; charset=UTF-8" />',N="Control",Q="__wl",P='<span style="font-family:',M='/W3C/',L="placeholder",bC='cant load HtmlArea. Document is not available. ',bD="backgroundImage",bE="marginTop",bF="> ",by=" { ",bz="font-weight",bA="LI",bB='italic',bG='<!',bH="\ufeff",bg="&quot;",bf="marginRight",be="STYLE",bd="justifyfull",bc="inserthyperlink",bb="<br />",ba='html { margin:0px; padding:0px; } ',Y="<br>",bk='/EN" "http:/',bj="justifycenter",bI="<br /><div id='placeholder'></div>",bJ="useCSS",bK="object",bL="strikethrough",bM="text/html",bN="true",bO="1.9",bP='',bQ=' style="',bR="indent",cC="messengerContent",cB="Integer",cA="insertunorderedlist",cz="Text",cG="&lt;",cF='<br _moz_editor_bogus_node="TRUE" _moz_dirty=""/>',cE='<br/><div class="placeholder"></div>',cD="selectall",cK="transparent",cJ=" SCRIPT STYLE DIV SPAN TR TD TBODY TABLE EM STRONG FONT A P B I U STRIKE H1 H2 H3 H4 H5 H6 ",di="justifyright",dj='/www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',dg="ol",dh="//text()[string-length(normalize-space(.))>0]",de="outdent",df="about:blank",dc="<body style='",dd="qx.bom.htmlarea.HtmlArea",dk="paddingBottom",dl="Verdana",dB="$",dA="-->",dD=" }",dC="paddingRight",dF='html { width:100%; height:100%; margin:0px; padding:0px; overflow-y:auto; overflow-x:auto; } ',dE="Off",dH='p { margin:0px; padding:0px; }',dG='body { font-size: 100.01%; font-family:Verdana, Geneva, Arial, Helvetica, sans-serif; width:100%; height:100%; background-color:transparent; overflow:auto; background-image:none; margin:0px; padding:5px; } ',dz="pageup",dy="backgroundcolor",eo="Failed to enable rich edit functionality",ep="end",eq="div",er='On',ej="redo",ek="i",em="backspace",en="bold",eh="mouseup",ei="y",n="style",m="backgroundimage",l="100%",k='</head>',h='<head>',g="k",f=":",d='redo',c='Off',b='">',B="down",C="font-family",z="g",A="keypress",F="fontsize",G="undo",D="text-decoration",E="pagedown",I="justify",J="center",cO="p",cI='</style>',cV="u",cR=" | ",cx="focus",cv="control",W="click",cy='<style type="text/css">',bi="up",bh="blur",cc="font-size",cd="None",ce="delete",cf="_moz_dirty",cg=">",ch='</body></html>',ci="line-through",cj="String",bY="z",ca=";",cw="fontfamily",cU="keydown",cT="keyup",cS="focusout",da="engine.version",cY="inserthtml",cX="italic",cW="body",cQ="underline",cP="br",H="old_id",bm="'",bl="b",cH="loadingError",bx="contextmenu",cN="right",cM="enter",cL='"',V="left",db="text-align",K="qx.bom.htmlarea.HtmlArea.debug",X="qx.event.type.Data",bS="opera",bT="id",bU="qx.event.type.Event",bV=" ",bW="Boolean",bX="__elementToFocus__",dm="qx.debug",cb="webkit",dJ="gecko",dI="mshtml",dL="",dK="engine.name";qx.Class.define(dd,{extend:qx.core.Object,construct:function(eD,eE,eF,eG){qx.core.Object.call(this);var eH=eG||qx.util.ResourceManager.getInstance().toUri(qx.core.Environment.get(dV));this.__xr(eD);this.__xs();this._createAndAddIframe(eH);this._addIframeLoadListener();this.__wY=qx.bom.htmlarea.HtmlArea.__xb(eF);if(qx.lang.Type.isString(eE)){this.__xa=eE;}
;this.__wl=this.__xF();}
,events:{"load":bU,"loadingError":X,"messengerContent":X,"cursorContext":X,"ready":bU,"readyAfterInvalid":bU,"focused":bU,"focusOut":bU,"contextmenu":X,"undoRedoState":X},statics:{simpleLinebreak:Y,EMPTY_DIV:"<div></div>",GetWordsRegExp:/([^\u0000-\u0040\u005b-\u005f\u007b-\u007f]|['])+/g,CleanupWordsRegExp:/[\u0000-\u0040]/gi,hotkeyInfo:{bold:{method:ds},italic:{method:bv},underline:{method:cl},undo:{method:G},redo:{method:ej}},__xb:function(eI){if(eI==null||eI==dL){return dL;}
else if(typeof eI==bK){var eJ=dL;for(var i in eI){eJ+=i+by+eI[i]+dD;}
;return eJ;}
else {return eI;}
;}
,__xc:function(eK){var eL={};var a=eK.split(ca);var i;for(i=0;i<a.length;i++){var eM=a[i],eN=eM.indexOf(f);if(eN===-1){continue;}
;var name=qx.lang.String.trim(eM.substring(0,eN));var eO=qx.lang.String.trim(eM.substring(eN+1,eM.length));if(name&&eO){eL[name]=eO;}
;}
;return eL;}
,__xd:function(eP,eQ,eR,eS){var eX=[];switch(eP.nodeType){case 1:case 11:var i;var eV=eP.tagName.toLowerCase();var fa={};var eT={};var closed=(!(eP.hasChildNodes()||qx.bom.htmlarea.HtmlArea.__xe(eP)));if(eQ){if((qx.core.Environment.get(dK)==dI)){if(eV==eq&&eP.className&&eP.className==L){for(i=eP.firstChild;i;i=i.nextSibling){eX.push(qx.bom.htmlarea.HtmlArea.__xd(i,true,eR,eS));}
;return eX.join(dL);}
;}
;var eY=eP.attributes;var eW=eY.length;var a;if((qx.core.Environment.get(dK)==dJ)){if(eV==dq&&eW==1&&eY[0].name==cf&&eP.childNodes.length==0){return dL;}
;}
;for(i=0;i<eW;i++){a=eY[i];if(!a.specified){continue;}
;var name=qx.dom.Node.getName(a);var fb=a.nodeValue;if(/(_moz|contenteditable)/.test(name)){continue;}
;if(name!=n){if(qx.core.Environment.get(dK)==dI){if(name==bT&&eP.getAttribute(H)){fb=eP.getAttribute(H);}
else if(!isNaN(fb)){fb=eP.getAttribute(name);}
else {fb=a.nodeValue;}
;}
else {fb=a.nodeValue;}
;}
else {fb=eP.style.cssText;}
;if(/(_moz|^$)/.test(fb)){continue;}
;if(name==H){continue;}
;if(!fb){continue;}
;if(name==bT&&fb==bX){continue;}
;if(name.charAt(0)===dB){continue;}
;fa[name]=fb;}
;if(fa.style!==undefined){eT=qx.bom.htmlarea.HtmlArea.__xc(fa.style);delete fa.style;}
;if(eS){var eU={domElement:eP,tag:eV,attributes:fa,styles:eT};eS(eU);eU.domElement=null;eV=eU.tag;}
;if(eV){eX.push(ct,eV);for(var name in fa){var fb=fa[name];eX.push(bV,name,dp,fb.toString().replace(new RegExp(cL,z),bm),cL);}
;if(!qx.lang.Object.isEmpty(eT)){eX.push(bQ);for(var name in eT){var fb=eT[name];eX.push(name,f,fb.toString().replace(new RegExp(cL,z),bm),ca);}
;eX.push(cL);}
;eX.push(closed?dt:cg);}
;}
;for(i=eP.firstChild;i;i=i.nextSibling){eX.push(qx.bom.htmlarea.HtmlArea.__xd(i,true,eR,eS));}
;if(eQ&&!closed&&eV){eX.push(du,eV,cg);}
;break;case 3:eX.push(eR?eP.data:qx.bom.htmlarea.HtmlArea.__xf(eP.data));break;case 8:eX.push(ed,eP.data,dA);break;};return eX.join(dL);}
,closingTags:cJ,__xe:function(fc){return (qx.bom.htmlarea.HtmlArea.closingTags.indexOf(bV+fc.tagName+bV)!=-1);}
,__xf:function(s){s=s.replace(/&/ig,x);s=s.replace(/</ig,cG);s=s.replace(/>/ig,dw);s=s.replace(/\x22/ig,bg);s=s.replace(/\xA9/ig,dW);return s;}
,isBlockNode:function(fd){var fe=qx.bom.htmlarea.HtmlArea.isBlockNode;var ff=T;qx.log.Logger.deprecatedMethodWarning(fe,ff);return qx.dom.Node.isBlockNode(fd);}
,isParagraphParent:function(fg){if(!qx.dom.Node.isElement(fg)){return false;}
;fg=qx.dom.Node.getName(fg);return /^(body|td|th|caption|fieldset|div)$/.test(fg);}
,isHeadlineNode:function(fh){if(!qx.dom.Node.isElement(fh)){return false;}
;var fi=qx.dom.Node.getName(fh);return /^h[1-6]$/.test(fi);}
},properties:{contentType:{check:cj,init:bu},messengerMode:{check:bW,init:false},insertParagraphOnLinebreak:{check:bW,init:true},insertLinebreakOnCtrlEnter:{check:bW,init:true},postProcess:{check:dP,nullable:true,init:null},useUndoRedo:{check:bW,init:true},nativeContextMenu:{check:bW,init:false},defaultFontFamily:{check:cj,init:dl},defaultFontSize:{check:cB,init:4}},members:{__kq:null,__he:false,__xg:false,__xh:false,__xi:false,__xj:false,__wl:null,__xk:null,__xl:null,__xm:null,__rM:null,__wY:null,__xn:null,__xo:null,__xp:false,__xq:false,__xr:function(fj){if(qx.dom.Node.isElement(fj)&&qx.dom.Node.isNodeName(fj,eq)){this.__kq=fj;}
;}
,_createAndAddIframe:function(fk){this.__rM=qx.bom.Iframe.create();qx.bom.Iframe.setSource(this.__rM,fk);if((qx.core.Environment.get(dK)==dI)){qx.bom.element.Attribute.set(this.__rM,eB,bN);}
else {qx.bom.element.Style.set(this.__rM,bq,br);}
;qx.bom.element.Style.setStyles(this.__rM,{width:l,height:l});qx.dom.Element.insertBegin(this.__rM,this.__kq);}
,_getIframeDocument:function(){return qx.bom.Iframe.getDocument(this.__rM);}
,_getIframeWindow:function(){return qx.bom.Iframe.getWindow(this.__rM);}
,_addIframeLoadListener:function(){qx.event.Registration.addListener(this.__rM,cq,this._loaded,this);}
,__xs:function(){this.__xn={"xhtml":{doctype:bG+es+M+bs+bk+dj,html:bp+eb,meta:O,style:qx.core.Environment.select(dK,{"mshtml":ba+dG,"default":dF+eC}),contentStyle:dH,body:ey,footer:ch}};}
,__xa:dL,getIframeObject:function(){return this.__rM;}
,getCommandManager:function(){return this.__wl;}
,setValue:function(fl){if(qx.lang.Type.isString(fl)){this.__xa=fl;var fm=this._getIframeDocument();if(fm&&fm.body){fm.body.innerHTML=this.__xt(fl);}
;}
;}
,__xt:function(fn){var fq=dL;if((qx.core.Environment.get(dK)==dJ)){if(qx.core.Environment.get(eA)<=2){fq+=cF;}
;}
;var fr=fn.length==0?bH:dL;var fp=qx.core.Environment.get(dK)==dJ||qx.core.Environment.get(dK)==cb?cn:bP;var fo=r+P+this.getDefaultFontFamily()+b+co+fp+ee+this.getDefaultFontSize()+b+fq+fn+fr+t+dU+R;return fo;}
,getValue:function(){return this.__xa;}
,getComputedValue:function(fs){return this.getHtml(fs);}
,getCompleteHtml:function(){var fu=this.__xn[this.getContentType()];var ft=fu.html+h+fu.meta+cy+fu.contentStyle+cI+k;ft+=dc+this.__xu()+ec;ft+=this.getHtml()+ch;return ft;}
,__xu:function(){var fx=[dT,bD,u,ck,cr,dO,bE,bt,ev,bf,U,dk,o,dC];var fw=qx.bom.element.Style;var fv=this.getContentBody();var fA={};var fz,fB;var fy=qx.core.Environment.get(dK)==dI?2:1;for(var i=0,j=fx.length;i<j;i++){fz=fx[i];fB=fw.get(fv,fz,fy);if(fB!==undefined&&fB!=dL){fA[fz]=fB;}
;}
;return qx.bom.element.Style.compile(fA);}
,getContentDocument:function(){if(this.__he){return this._getIframeDocument();}
;}
,getContentBody:function(){if(this.__he){return this._getIframeDocument().body;}
;}
,getContentWindow:function(){if(this.__he){return this._getIframeWindow();}
;}
,getWords:function(fC){if(!fC){fC=this.getContentBody();}
;if(!fC){return [];}
;var fE=fC.cloneNode(true);var fG=fE.innerHTML;fG=fG.replace(/>/gi,bF);fG=fG.replace(/\n/gi,bV);fG=fG.replace(/<!--.*-->/gi,dL);fE.innerHTML=fG;var fD=qx.core.Environment.get(dK)==dI||qx.core.Environment.get(dK)==bS?fE.innerText:fE.textContent;var fF=fD.match(qx.bom.htmlarea.HtmlArea.GetWordsRegExp);return !fF?[]:fF;}
,getWordsWithElement:function(){var fI=this.getTextNodes();var fM={};var i,j,fN,fJ,fH;for(var i=0,fL=fI.length;i<fL;++i){fJ=fI[i];fN=fJ.nodeValue.split(bV);for(var j=0,fK=fN.length;j<fK;++j){fH=this._cleanupWord(fN[j]);if(fH!=null&&fH.length>1){if(!fM[fH]){fM[fH]=[];}
;fM[fH].push(fJ);}
;}
;}
;return fM;}
,_cleanupWord:function(fO){if(!fO){return null;}
;return fO.replace(qx.bom.htmlarea.HtmlArea.CleanupWordsRegExp,dL);}
,getTextNodes:function(){return this._fetchTextNodes(this.getContentBody());}
,_fetchTextNodes:function(fP){var fR=[];var fQ;if(fP.hasChildNodes){for(var i=0;i<fP.childNodes.length;i++){fQ=this._fetchTextNodes(fP.childNodes[i]);qx.lang.Array.append(fR,fQ);}
;}
;if(fP.nodeType==3){if(fP.nodeValue.length>1){fR.push(fP);}
;}
;return fR;}
,__xv:0,__xw:function(){var fS=this._getIframeDocument();if(!fS){this.__xv++;if(this.__xv>5){this.error(bC+fS);this.fireDataEvent(cH);}
else {if(qx.core.Environment.get(dm)){this.error(cp);}
;qx.event.Timer.once(function(){this.__xw();}
,this,0);}
;}
else {this.__xv=0;this._onDocumentIsReady();}
;}
,_loaded:function(e){if(this.__xh){return;}
;if(this.__xg){this.__xx();return;}
;if((qx.core.Environment.get(dK)==dI)){this.__xw();}
else {this._onDocumentIsReady();}
;}
,isReady:function(){return this.__he;}
,_onDocumentIsReady:function(){var fT=new qx.bom.htmlarea.manager.Command(this);if(this.getUseUndoRedo()){fT=new qx.bom.htmlarea.manager.UndoRedo(fT,this);}
;this.__xh=true;if((qx.core.Environment.get(dK)==dI)){this.setEditable(true);}
;this.__xA();if(!(qx.core.Environment.get(dK)==bS)){this.__xB();}
;if(!(qx.core.Environment.get(dK)==dI)){this.setEditable(true);}
;this.__he=true;this.__wl=fT;fT.setContentDocument(this._getIframeDocument());this.__xG();if((qx.core.Environment.get(dK)==bS)){this.__xB();}
;this.fireEvent(eu);}
,forceEditable:qx.core.Environment.select(dK,{"gecko":function(){var fU=this._getIframeDocument();if(fU){if(parseFloat(qx.core.Environment.get(da))>=bO){fU.designMode=dE;fU.body.contentEditable=false;fU.body.contentEditable=true;}
else {fU.body.contentEditable=true;this.__xH(true);}
;}
;}
,"default":qx.lang.Function.empty}),invalidateEditor:qx.core.Environment.select(dK,{"gecko":function(){this.__xh=false;this.__he=false;this.__xg=true;}
,"default":function(){}
}),__xx:qx.core.Environment.select(dK,{"gecko":function(){this.__xA();this.__xB();this.__wl.setContentDocument(this._getIframeDocument());this.setEditable(true);this.forceEditable();this.__xh=true;this.__he=true;this.__xg=false;this.fireEvent(eg);}
,"default":function(){}
}),__xy:function(fV){var fX=dL;if(!fV){return fX;}
;try{var fW=fV.getAttribute(n);if(!fW){return fX;}
;if((qx.core.Environment.get(dK)==dI)){fX=fW.cssText;}
else {fX=fW;}
;}
catch(fY){this.error(dn);}
;return fX;}
,__xz:function(ga){var gb=qx.core.Environment.get(dK)==dJ?ez:dL;var gc=this.__xn[this.getContentType()];var gd=h+gc.meta+cy+gb+gc.style+gc.contentStyle+this.__wY+cI+k;var content=gc.body+ga;return gc.html+gd+content+gc.footer;}
,__xA:function(){var gf=this.__xt(this.getValue());if(qx.lang.Type.isString(gf)){var ge=this._getIframeDocument();try{ge.open(bM,true);ge.write(this.__xz(gf));ge.close();}
catch(e){this.error(dM+qx.bom.Iframe.queryCurrentUrl(this.__rM)+bm,e);this.fireDataEvent(cH,e);}
;}
;}
,__xB:function(){this.__xC();this.__xE();this.__xD();}
,__xC:function(){var gh=qx.event.Registration;var gg=this._getIframeDocument();gh.addListener(gg.body,A,this._handleKeyPress,this);gh.addListener(gg.body,cT,this._handleKeyUp,this);gh.addListener(gg.body,cU,this._handleKeyDown,this);}
,__xD:function(){var gk=qx.event.Registration;var gi=this._getIframeDocument();var gj=qx.core.Environment.get(dK)==cb?this._getIframeWindow():gi.body;gk.addListener(gj,cx,this._handleFocusEvent,this);gk.addListener(gj,bh,this._handleBlurEvent,this);gk.addListener(gi,cS,this._handleFocusOutEvent,this);}
,__xE:function(){var gn=qx.event.Registration;var gm=this._getIframeDocument();var gl=qx.core.Environment.get(dK)==dI?W:eh;gn.addListener(gm.body,gl,this._handleMouseUpOnBody,this);gn.addListener(gm.documentElement,gl,this._handleMouseUpOnDocument,this);gn.addListener(gm.documentElement,bx,this._handleContextMenuEvent,this);}
,__xF:function(){if(this.__xk==null){this.__xk={execute:function(go,gp){this.stackedCommands=true;this.commandStack.push({command:go,value:gp});}
,commandStack:[],stackedCommands:false};}
;this.__xk.stackedCommands=false;return this.__xk;}
,__xG:function(){var gq=this.__xk;if(gq!=null&&gq.stackedCommands){var gr=gq.commandStack;if(gr!=null){for(var i=0,j=gr.length;i<j;i++){this.__wl.execute(gr[i].command,gr[i].value);}
;}
;}
;}
,__xH:function(gs){var gt=this._getIframeDocument();if(this.__xh&&gt){try{if((qx.core.Environment.get(dK)==dJ)){gt.designMode=(gs!==false)?c:er;}
;gt.designMode=(gs!==false)?er:c;}
catch(e){}
;}
;}
,setEditable:function(gu){if(this.__xh){this.__xH(true);if((qx.core.Environment.get(dK)==dJ)){try{var gv=this._getIframeDocument();gv.execCommand(dr,false,true);}
catch(gw){try{var gv=this._getIframeDocument();gv.execCommand(bJ,false,false);}
catch(gx){if(!this.__he){this.error(eo);this.fireDataEvent(cH,gx);}
else {throw new Error(eo);}
;}
;}
;}
;this.__xi=gu;}
;}
,getEditable:function(){return this.__xi;}
,isEditable:function(){return this.__xi;}
,__xI:false,_handleKeyUp:function(e){var gy=e.getKeyIdentifier().toLowerCase();this.__xl=e;if((qx.core.Environment.get(dm))&&qx.core.Environment.get(K)){this.debug(e.getType()+cR+gy);}
;if(qx.core.Environment.get(dK)==dI||qx.core.Environment.get(dK)==cb){if(this.__xI){switch(gy){case cM:if(this.getInsertLinebreakOnCtrlEnter()){if((qx.core.Environment.get(dK)==cb)){this.__xJ();e.preventDefault();e.stopPropagation();}
else {var gz=this.__xT(this.getSelection());if(gz){gz.collapse(true);gz.pasteHTML(cE);}
;}
;this.__xO();}
;break;case cv:this.__xI=false;return;break;};}
;}
else if((qx.core.Environment.get(dK)==dJ)){switch(gy){case V:case cN:case bi:case B:case dz:case E:case ce:case ep:case em:this.__xj=(this.getFocusNode()==this.getContentBody().firstChild);break;};}
;}
,__xJ:function(){var gA=this.getSelection();var gB=dL;if(gA&&(gA.focusNode.textContent==dL||gA.focusNode.parentElement.tagName==bA)){gB=dQ;}
;this.__wl.execute(cY,gB+qx.bom.htmlarea.HtmlArea.simpleLinebreak);}
,_handleKeyDown:qx.core.Environment.select(dK,{"mshtml|webkit":function(e){var gC=e.getKeyIdentifier().toLowerCase();if((qx.core.Environment.get(dm))&&qx.core.Environment.get(K)){}
;if(this.__xI&&(gC==bY||gC==ei||gC==bl||gC==cV||gC==ek||gC==g)){e.preventDefault();e.stopPropagation();}
;if(gC==cv){this.__xI=true;}
;}
,"default":function(e){}
}),_handleKeyPress:function(e){var gH=this.getContentDocument();var gD=e.getKeyIdentifier().toLowerCase();var gF=e.isCtrlPressed();var gG=e.isShiftPressed();this.__xl=e;if((qx.core.Environment.get(dm))&&qx.core.Environment.get(K)){this.debug(e.getType()+cR+gD);}
;if(this.__xp){var gN=!((qx.core.Environment.get(dK)==dI)&&gD==cM)||!((qx.core.Environment.get(dK)==dJ)&&gD==cM);if(gN){this.__xO();this.__xp=false;}
;}
;switch(gD){case cM:if(!gG&&!gF&&this.getMessengerMode()){e.preventDefault();e.stopPropagation();this.fireDataEvent(cC,this.getComputedValue());this.resetHtml();}
;if(gF){if(!this.getInsertLinebreakOnCtrlEnter()){return;}
;e.preventDefault();e.stopPropagation();if((qx.core.Environment.get(dK)==dJ)){if(this.__xR()){this.insertHtml(bb);this.__xO();return;}
;this.insertHtml(bI);}
else if((qx.core.Environment.get(dK)==bS)){var gM=this.getSelection();var gI=this.__xT(gM);if(gM&&gI){var gJ=gH.createElement(cP);gI.collapse(true);gI.insertNode(gJ);gI.collapse(true);gI.selectNode(gJ);gM.addRange(gI);gI.collapse(true);}
;}
;this.__xO();}
;if((qx.core.Environment.get(dK)==dI)){if(!this.getInsertParagraphOnLinebreak()){if(this.__wl.execute(cY,qx.bom.htmlarea.HtmlArea.simpleLinebreak)){this.__xO();e.preventDefault();e.stopPropagation();}
;}
;}
else if((qx.core.Environment.get(dK)==dJ)){if(this.getInsertParagraphOnLinebreak()&&!gG&&!gF){var gM=this.getSelection();if(gM){var gE=gM.focusNode;if(this.__xR()){this.__xO();return;}
;if(this.__xS()){this.__xO();return;}
;while(!qx.dom.Node.isNodeName(gE,cW)){if(qx.dom.Node.isNodeName(gE,dS)){this.__xO();return;}
;gE=gE.parentNode;}
;}
;this.__wl.insertParagraphOnLinebreak();e.preventDefault();e.stopPropagation();this.__xO();this.__xp=true;}
;}
else if((qx.core.Environment.get(dK)==cb)){if(this.getInsertParagraphOnLinebreak()&&gG){this.__xJ();e.preventDefault();e.stopPropagation();this.__xO();}
;}
;;break;case bi:if(qx.core.Environment.get(dK)==dJ&&qx.core.Environment.get(da)<1.9&&gG){var gM=this.getSelection();if(gM&&gM.focusNode==gH.body.firstChild){if(this.__xj){if(gM.focusOffset!=0){gM.extend(gM.focusNode,0);}
;}
;}
;}
;this.__xO();break;case cu:if(qx.core.Environment.get(dK)==dJ&&qx.core.Environment.get(da)<1.9){if(gF){var gM=this.getSelection();if(gG){if(gM&&(gM.focusOffset!=0)||(gM.focusNode!=gH.body.firstChild)){gM.extend(gH.body.firstChild,0);}
;}
else {var gK=null;var gL;if(gH){gK=gH.evaluate(dh,gH.body,null,XPathResult.ANY_TYPE,null);}
;if(gK&&gM){while(gL=gK.iterateNext()){if(gL&&gL.parentNode&&gL.parentNode.tagName!=be){try{gM.extend(gL,0);if(!this.isSelectionCollapsed()){gM.collapseToStart();}
;}
catch(e){}
;break;}
;}
;}
;}
;}
;}
;this.__xO();break;case V:case cN:case B:case dz:case E:case ce:case ep:case em:this.__xO();break;case bl:if(gF){this.__xK(ea,true);}
;break;case ek:case g:if(gF){this.__xK(bB,true);}
;break;case cV:if(gF){this.__xK(dY,true);}
;break;case bY:if(gF&&!gG){this.__xK(dR,true);}
else if(gF&&gG){this.__xK(d,true);}
;break;case ei:if(gF){this.__xK(d,true);}
;break;case w:if(gF){this.selectAll();}
;break;};this.__xl=null;}
,__xK:function(gO,gP){var gR=null;var gQ=qx.bom.htmlarea.HtmlArea.hotkeyInfo;if(gQ[gO]){gR=gQ[gO].method;}
;if(gR!=null&&this[gR]){this[gR]();if(gP){this.__xl.preventDefault();this.__xl.stopPropagation();}
;if(this.isSelectionCollapsed()){this.__xp=true;}
;this.__xO();}
;}
,_handleFocusEvent:function(e){this.__xm=null;if(qx.core.Environment.get(dK)==dJ||qx.core.Environment.get(dK)==cb){var gS=this.getContentDocument().getElementById(bX);if(gS){qx.bom.element.Attribute.reset(gS,bT);}
;}
;this.fireEvent(cs);}
,_handleBlurEvent:function(e){this.__xa=this.getComputedValue();}
,_handleFocusOutEvent:function(e){this.__xI=false;if(this.__xm==null){this.__xm=this.getSelectedHtml();}
;this.fireEvent(bn);}
,_handleMouseUpOnBody:function(e){if((qx.core.Environment.get(dm))&&qx.core.Environment.get(K)){this.debug(S+e.getType());}
;this.__xq=true;this.__xO();}
,_handleMouseUpOnDocument:qx.core.Environment.select(dK,{"mshtml":qx.lang.Function.empty,"default":function(e){if(!this.__xq){qx.bom.Element.activate(this.getContentBody());}
;this.__xq=false;}
}),_handleContextMenuEvent:function(e){if(!this.getNativeContextMenu()){var gV=e.getViewportLeft();var gU=e.getViewportTop();var gW=qx.bom.element.Location.getLeft(this.__kq)+gV;var gX=qx.bom.element.Location.getTop(this.__kq)+gU;var gT={x:gW,y:gX,relX:gV,relY:gU,target:e.getTarget()};e.preventDefault();e.stopPropagation();qx.event.Timer.once(function(){this.fireDataEvent(bx,gT);}
,this,0);}
;}
,isLoaded:function(){return this.__xh;}
,insertHtml:function(gY){return this.__wl.execute(cY,gY);}
,removeFormat:function(){var ha=this.__wl.execute(y);this.__wl.execute(F,this.getDefaultFontSize());this.__wl.execute(cw,this.getDefaultFontFamily());return ha;}
,setBold:function(){return this.__wl.execute(en);}
,setItalic:function(){return this.__wl.execute(cX);}
,setUnderline:function(){return this.__wl.execute(cQ);}
,setStrikeThrough:function(){return this.__wl.execute(bL);}
,setFontSize:function(hb){return this.__wl.execute(F,hb);}
,setFontFamily:function(hc){return this.__wl.execute(cw,hc);}
,setTextColor:function(hd){return this.__wl.execute(dN,hd);}
,setTextBackgroundColor:function(he){return this.__wl.execute(dx,he);}
,setJustifyLeft:function(){return this.__wl.execute(bo);}
,setJustifyCenter:function(){return this.__wl.execute(bj);}
,setJustifyRight:function(){return this.__wl.execute(di);}
,setJustifyFull:function(){return this.__wl.execute(bd);}
,insertIndent:function(){return this.__wl.execute(bR);}
,insertOutdent:function(){return this.__wl.execute(de);}
,insertOrderedList:function(){return this.__wl.execute(ew);}
,insertUnorderedList:function(){return this.__wl.execute(cA);}
,insertHorizontalRuler:function(){return this.__wl.execute(q);}
,insertImage:function(hf){return this.__wl.execute(v,hf);}
,insertHyperLink:function(hg){return this.__wl.execute(bc,hg);}
,removeBackgroundColor:function(){this.__wl.execute(dy,cK);}
,setBackgroundColor:function(hh){this.__wl.execute(dy,hh);}
,removeBackgroundImage:function(){this.__wl.execute(m);}
,setBackgroundImage:function(hi,hj,hk){return this.__wl.execute(m,[hi,hj,hk]);}
,selectAll:function(){return this.__wl.execute(cD);}
,undo:function(){if(this.getUseUndoRedo()){return this.__wl.execute(G);}
else {return true;}
;}
,redo:function(){if(this.getUseUndoRedo()){return this.__wl.execute(ej);}
else {return true;}
;}
,resetHtml:function(){var hl=this._getIframeDocument();while(hl.body.firstChild){hl.body.removeChild(hl.body.firstChild);}
;if(qx.core.Environment.get(dK)==dJ){hl.body.innerHTML=et;}
else if(qx.core.Environment.get(dK)==cb){var hm=this.getSelection();var hn=hl.createRange();if(hn&&hm){hm.addRange(hn);}
;}
;}
,getHtml:function(ho){var hp=this._getIframeDocument();if(hp==null){return null;}
;return qx.bom.htmlarea.HtmlArea.__xd(hp.body,false,ho,this.getPostProcess());}
,containsOnlyPlaceholder:qx.core.Environment.select(dK,{"mshtml":function(){var hq=this._getIframeDocument();return (hq.body.innerHTML==dv);}
,"default":qx.lang.Function.returnFalse}),_selectElement:function(hr){var ht=this.getContentWindow().getSelection();var hs=this.getContentDocument().createRange();hs.setStart(hr,0);ht.removeAllRanges();ht.addRange(hs);}
,focusContent:qx.core.Environment.select(dK,{"gecko":function(){var hv=this.getContentDocument();var hu=hv.getElementById(bX);this.getContentWindow().focus();qx.bom.Element.focus(this.getContentBody());if(hu){this._selectElement(hu);}
else {this.__xL();}
;}
,"webkit":function(){qx.bom.Element.focus(this.getContentWindow());qx.bom.Element.focus(this.getContentBody());var hw=this.getContentDocument().getElementById(bX);if(hw){qx.bom.element.Attribute.reset(hw,bT);}
;this.__xL();}
,"opera":function(){qx.bom.Element.focus(this.getContentWindow());qx.bom.Element.focus(this.getContentBody());this.__xL();}
,"default":function(){qx.bom.Element.focus(this.getContentBody());this.__xL();}
}),__xL:function(){if(!this.__xM()){this.__xN();}
;}
,__xM:qx.core.Environment.select(dK,{"gecko":function(){var hx=this.getContentBody().childNodes;if(hx.length==0){return false;}
else if(hx.length==1){return !(hx[0]&&qx.dom.Node.isNodeName(hx[0],cP)&&qx.bom.element.Attribute.get(hx[0],cf)!=null);}
else {return true;}
;}
,"webkit":function(){var hy=this.getContentBody().childNodes;if(hy.length==0){return false;}
else if(hy.length==1){return !(hy[0]&&qx.dom.Node.isNodeName(hy[0],cP));}
else {return true;}
;}
,"default":function(){var hz=this.getContentBody().childNodes;if(hz.length==0){return false;}
else if(hz.length==1){return !(hz[0]&&qx.dom.Node.isNodeName(hz[0],cO)&&hz[0].firstChild==null);}
else {return true;}
;}
}),__xN:qx.core.Environment.select(dK,{"gecko|webkit":function(){this.getContentDocument().body.innerHTML=this.__xt(dL);var hA=this.getContentDocument().getElementById(bX);qx.bom.element.Attribute.reset(hA,bT);this._selectElement(hA);}
,"default":function(){var hB=qx.dom.Hierarchy.getFirstDescendant(this.getContentBody());if(qx.dom.Node.isNodeName(hB,cO)){qx.bom.element.Style.set(hB,C,this.getDefaultFontFamily());qx.bom.element.Style.set(hB,cc,this.getDefaultFontSize());}
;}
}),getContextInformation:function(){return this.__xP();}
,__xO:function(){qx.event.Timer.once(function(e){var hC=this.__xP();this.fireDataEvent(ef,hC);}
,this,200);}
,__xP:function(){if(this._processingExamineCursorContext||this.getEditable()==false){return;}
;this._processingExamineCursorContext=true;if(!this.__xM()){this.__xN();}
;var hG=this.getFocusNode();if(hG==null){return;}
;if(qx.dom.Node.isText(hG)){hG=hG.parentNode;}
;var hK=this._getIframeDocument();var hT=(qx.core.Environment.get(dK)==dI)?hG.currentStyle:hK.defaultView.getComputedStyle(hG,null);var hN=false;var hD=false;var hI=false;var hH=false;var hO=false;var hS=false;var hJ=false;var hU=false;var hF=false;var hQ=false;var hR=null;var hV=null;var hM=null;if(hT!=null){if((qx.core.Environment.get(dK)==dI)){hD=hT.fontStyle==cX;hI=hT.textDecoration.indexOf(cQ)!==-1;hH=hT.textDecoration.indexOf(ci)!==-1;hR=hT.fontSize;hM=hT.fontFamily;hJ=hT.textAlign==V;hU=hT.textAlign==J;hF=hT.textAlign==cN;hQ=hT.textAlign==I;}
else {hD=hT.getPropertyValue(bw)==cX;hI=hT.getPropertyValue(D).indexOf(cQ)!==-1;hH=hT.getPropertyValue(D).indexOf(ci)!==-1;hR=hT.getPropertyValue(cc);hM=hT.getPropertyValue(C);hJ=hT.getPropertyValue(db)==V;hU=hT.getPropertyValue(db)==J;hF=hT.getPropertyValue(db)==cN;hQ=hT.getPropertyValue(db)==I;}
;if(qx.core.Environment.get(dK)==dI||qx.core.Environment.get(dK)==bS){hN=hT.fontWeight==700;}
else {hN=hT.getPropertyValue(bz)==en||qx.dom.Node.isNodeName(hG,bl);}
;}
;var hE=hG;if(hE!=null&&hE.parentNode!=null&&!qx.dom.Node.isDocument(hE.parentNode)){while(hE!=null&&!qx.dom.Node.isNodeName(hE,cW)){var hL=qx.dom.Node.getName(hE);if(hL==dg){hS=true;break;}
else if(hL==dX){hO=true;break;}
;if(hV==null||hV==dL){hV=qx.bom.element.Attribute.get(hE,p);}
;hE=hE.parentNode;}
;}
;var hP={bold:hN?1:0,italic:hD?1:0,underline:hI?1:0,strikethrough:hH?1:0,fontSize:(hV==null)?hR:hV,fontFamily:hM,insertUnorderedList:hO?1:0,insertOrderedList:hS?1:0,justifyLeft:hJ?1:0,justifyCenter:hU?1:0,justifyRight:hF?1:0,justifyFull:hQ?1:0};this._processingExamineCursorContext=false;return hP;}
,getSelection:qx.core.Environment.select(dK,{"mshtml":function(){return this._getIframeDocument()?this._getIframeDocument().selection:null;}
,"default":function(){return this._getIframeWindow()?this._getIframeWindow().getSelection():null;}
}),isSelectionCollapsed:qx.core.Environment.select(dK,{"mshtml":function(){return this.getSelection()&&this.getSelection().type==cd;}
,"default":function(){return this.getSelection()&&this.getSelection().isCollapsed;}
}),getSelectedText:qx.core.Environment.select(dK,{"mshtml":function(){return this.getRange()?this.getRange().text:dL;}
,"default":function(){return this.getRange()?this.getRange().toString():dL;}
}),getSelectedHtml:function(){if(this.__xm!=null){return this.__xm;}
;var hW=this.getRange();if(!hW){return dL;}
else {return this.__xQ(hW);}
;}
,__xQ:qx.core.Environment.select(dK,{"mshtml":function(hX){if(!hX){return dL;}
;return hX.item?hX.item(0).outerHTML:hX.htmlText;}
,"default":function(hY){var ia=this._getIframeDocument();if(ia&&hY){try{var ib=ia.createElement(cW);ib.appendChild(hY.cloneContents());return ib.innerHTML;}
catch(ic){}
;return hY+dL;}
;return dL;}
}),clearSelection:qx.core.Environment.select(dK,{"mshtml":function(){var id=this.getSelection();if(id){id.empty();}
;}
,"default":function(){var ie=this.getSelection();if(ie){ie.collapseToStart();}
;}
}),__xR:qx.core.Environment.select(dK,{"gecko":function(){var ig=this.getSelection();var ih=this.getFocusNode();return ig&&this.isSelectionCollapsed()&&ih!=null&&qx.dom.Node.isText(ih)&&ig.anchorOffset<ih.length;}
,"default":function(){return false;}
}),__xS:qx.core.Environment.select(dK,{"gecko":function(){return qx.dom.Node.isElement(this.getFocusNode());}
,"default":function(){return false;}
}),getRange:function(){return this.__xT(this.getSelection());}
,__xT:qx.core.Environment.select(dK,{"mshtml":function(ii){var ij=this._getIframeDocument();if(ii){try{return ii.createRange();}
catch(ik){return ij?ij.body.createTextRange():null;}
;}
else {return ij?ij.body.createTextRange():null;}
;}
,"default":function(il){var im=this._getIframeDocument();if(il){try{return il.getRangeAt(0);}
catch(io){return im?im.createRange():null;}
;}
else {return im?im.createRange():null;}
;}
}),saveRange:qx.core.Environment.select(dK,{"mshtml":function(){this.__xo=this.getRange();}
,"default":function(){}
}),getSavedRange:qx.core.Environment.select(dK,{"mshtml":function(){return this.__xo;}
,"default":function(){}
}),resetSavedRange:qx.core.Environment.select(dK,{"mshtml":function(){this.__xo=null;}
,"default":function(){}
}),getFocusNode:qx.core.Environment.select(dK,{"mshtml":function(){var ip=this.getSelection();var iq;switch(ip.type){case cz:case cd:iq=this.__xT(ip);if(iq){iq.collapse(false);return iq.parentElement();}
else {return null;}
;break;case N:iq=this.__xT(ip);if(iq){try{iq.collapse(false);}
catch(ir){}
;return iq.item(0);}
else {return null;}
;break;default:return this._getIframeDocument().body;};}
,"default":function(){var is=this.getSelection();if(is&&is.focusNode){return is.focusNode;}
;return this._getIframeDocument().body;}
})},environment:{"qx.bom.htmlarea.HtmlArea.debug":false},destruct:function(){try{var iu=this._getIframeDocument();var iw=qx.event.Registration;iw.removeListener(iu.body,A,this._handleKeyPress,this);iw.removeListener(iu.body,cT,this._handleKeyUp,this);iw.removeListener(iu.body,cU,this._handleKeyDown,this);var iv=qx.core.Environment.get(dK)==cb?this._getIframeWindow():iu.body;iw.removeListener(iv,cx,this._handleFocusEvent);iw.removeListener(iv,bh,this._handleBlurEvent);iw.removeListener(iu,cS,this._handleFocusOutEvent);var it=qx.core.Environment.get(dK)==dI?W:eh;iw.removeListener(iu.body,it,this._handleMouseUpOnBody,this);iw.removeListener(iu.documentElement,it,this._handleMouseUpOnDocument,this);iw.removeListener(iu.documentElement,bx,this._handleContextMenuEvent,this);if((qx.core.Environment.get(dK)==dI)){qx.bom.Iframe.setSource(this.__rM,df);}
;}
catch(ix){}
;if(this.__wl instanceof qx.core.Object){this._disposeObjects(Q);}
else {this.__wl=null;}
;this.__xn=this.__rM=this.__kq=this.__xk=null;}
});}
)();
(function(){var b="singleton",a="qx.util.LibraryManager";qx.Class.define(a,{extend:qx.core.Object,type:b,statics:{__hE:qx.$$libraries||{}},members:{has:function(c){return !!this.self(arguments).__hE[c];}
,get:function(d,e){return this.self(arguments).__hE[d][e]?this.self(arguments).__hE[d][e]:null;}
,set:function(f,g,h){this.self(arguments).__hE[f][g]=h;}
}});}
)();
(function(){var n="Microsoft.XMLHTTP",m="io.ssl",l="io.xhr",k="",j="file:",i="https:",h="webkit",g="gecko",f="activex",e="opera",b=".",d="io.maxrequests",c="qx.bom.client.Transport",a="xhr";qx.Bootstrap.define(c,{statics:{getMaxConcurrentRequestCount:function(){var o;var r=qx.bom.client.Engine.getVersion().split(b);var p=0;var s=0;var q=0;if(r[0]){p=r[0];}
;if(r[1]){s=r[1];}
;if(r[2]){q=r[2];}
;if(window.maxConnectionsPerServer){o=window.maxConnectionsPerServer;}
else if(qx.bom.client.Engine.getName()==e){o=8;}
else if(qx.bom.client.Engine.getName()==h){o=4;}
else if(qx.bom.client.Engine.getName()==g&&((p>1)||((p==1)&&(s>9))||((p==1)&&(s==9)&&(q>=1)))){o=6;}
else {o=2;}
;;;return o;}
,getSsl:function(){return window.location.protocol===i;}
,getXmlHttpRequest:function(){var t=window.ActiveXObject?(function(){if(window.location.protocol!==j){try{new window.XMLHttpRequest();return a;}
catch(u){}
;}
;try{new window.ActiveXObject(n);return f;}
catch(v){}
;}
)():(function(){try{new window.XMLHttpRequest();return a;}
catch(w){}
;}
)();return t||k;}
},defer:function(x){qx.core.Environment.add(d,x.getMaxConcurrentRequestCount);qx.core.Environment.add(m,x.getSsl);qx.core.Environment.add(l,x.getXmlHttpRequest);}
});}
)();
(function(){var q="//",p="encoding",o="?",n="data",m="type",l="data:image/",k=";",j="qx.util.ResourceManager",i="singleton",h=",",c="mshtml",g="engine.name",f="io.ssl",b="string",a="/",e="resourceUri",d="";qx.Class.define(j,{extend:qx.core.Object,type:i,construct:function(){qx.core.Object.call(this);}
,statics:{__bc:qx.$$resources||{},__hF:{}},members:{has:function(r){return !!this.self(arguments).__bc[r];}
,getData:function(s){return this.self(arguments).__bc[s]||null;}
,getImageWidth:function(t){var u=this.self(arguments).__bc[t];return u?u[0]:null;}
,getImageHeight:function(v){var w=this.self(arguments).__bc[v];return w?w[1]:null;}
,getImageFormat:function(x){var y=this.self(arguments).__bc[x];return y?y[2]:null;}
,getCombinedFormat:function(z){var C=d;var B=this.self(arguments).__bc[z];var A=B&&B.length>4&&typeof (B[4])==b&&this.constructor.__bc[B[4]];if(A){var E=B[4];var D=this.constructor.__bc[E];C=D[2];}
;return C;}
,toUri:function(F){if(F==null){return F;}
;var G=this.self(arguments).__bc[F];if(!G){return F;}
;if(typeof G===b){var I=G;}
else {var I=G[3];if(!I){return F;}
;}
;var H=d;if((qx.core.Environment.get(g)==c)&&qx.core.Environment.get(f)){H=this.self(arguments).__hF[I];}
;return H+qx.util.LibraryManager.getInstance().get(I,e)+a+F;}
,toDataUri:function(J){var L=this.constructor.__bc[J];var M=this.constructor.__bc[L[4]];var N;if(M){var K=M[4][J];N=l+K[m]+k+K[p]+h+K[n];}
else {N=this.toUri(J);}
;return N;}
},defer:function(O){if((qx.core.Environment.get(g)==c)){if(qx.core.Environment.get(f)){for(var S in qx.$$libraries){var Q;if(qx.util.LibraryManager.getInstance().get(S,e)){Q=qx.util.LibraryManager.getInstance().get(S,e);}
else {O.__hF[S]=d;continue;}
;if(Q.match(/^\/\//)!=null){O.__hF[S]=window.location.protocol;}
else if(Q.match(/^\//)!=null){O.__hF[S]=window.location.protocol+q+window.location.host;}
else if(Q.match(/^\.\//)!=null){var P=document.URL;O.__hF[S]=P.substring(0,P.lastIndexOf(a)+1);}
else if(Q.match(/^http/)!=null){O.__hF[S]=d;}
else {var T=window.location.href.indexOf(o);var R;if(T==-1){R=window.location.href;}
else {R=window.location.href.substring(0,T);}
;O.__hF[S]=R.substring(0,R.lastIndexOf(a)+1);}
;;;}
;}
;}
;}
});}
)();
(function(){var d="qx.event.handler.Iframe",c="load",b="iframe",a="navigate";qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{load:1,navigate:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false,onevent:qx.event.GlobalError.observeMethod(function(e){var f=qx.bom.Iframe.queryCurrentUrl(e);if(f!==e.$$url){qx.event.Registration.fireEvent(e,a,qx.event.type.Data,[f]);e.$$url=f;}
;qx.event.Registration.fireEvent(e,c);}
)},members:{canHandleEvent:function(g,h){return g.tagName.toLowerCase()===b;}
,registerEvent:function(i,j,k){}
,unregisterEvent:function(l,m,n){}
},defer:function(o){qx.event.Registration.addHandler(o);}
});}
)();
(function(){var k="Iframe source could not be set!",j="contentDocument",i="engine.name",h="",g="qx.bom.Iframe",f="osx",e="os.name",d="webkit",c="iframe",b="body",a="load";qx.Class.define(g,{statics:{DEFAULT_ATTRIBUTES:{onload:"qx.event.handler.Iframe.onevent(this)",frameBorder:0,frameSpacing:0,marginWidth:0,marginHeight:0,hspace:0,vspace:0,border:0,allowTransparency:true},create:function(l,m){var l=l?qx.lang.Object.clone(l):{};var n=qx.bom.Iframe.DEFAULT_ATTRIBUTES;for(var o in n){if(l[o]==null){l[o]=n[o];}
;}
;return qx.dom.Element.create(c,l,m);}
,getWindow:function(p){try{return p.contentWindow;}
catch(q){return null;}
;}
,getDocument:function(r){if(j in r){try{return r.contentDocument;}
catch(t){return null;}
;}
;try{var s=this.getWindow(r);return s?s.document:null;}
catch(u){return null;}
;}
,getBody:function(v){try{var w=this.getDocument(v);return w?w.getElementsByTagName(b)[0]:null;}
catch(x){return null;}
;}
,setSource:function(y,z){try{if(this.getWindow(y)&&qx.dom.Hierarchy.isRendered(y)){try{if((qx.core.Environment.get(i)==d)&&qx.core.Environment.get(e)==f){var A=this.getWindow(y);if(A){A.stop();}
;}
;this.getWindow(y).location.replace(z);}
catch(B){y.src=z;}
;}
else {y.src=z;}
;this.__qH(y);}
catch(C){qx.log.Logger.warn(k);}
;}
,queryCurrentUrl:function(D){var E=this.getDocument(D);try{if(E&&E.location){return E.location.href;}
;}
catch(F){}
;return h;}
,__qH:function(G){var H=function(){qx.bom.Event.removeNativeListener(G,a,H);G.$$url=qx.bom.Iframe.queryCurrentUrl(G);}
;qx.bom.Event.addNativeListener(G,a,H);}
}});}
)();
(function(){var g="qx.dom.Hierarchy",f="previousSibling",e="nextSibling",d="parentNode",c="*",b="html.element.compareDocumentPosition",a="html.element.contains";qx.Bootstrap.define(g,{statics:{getNodeIndex:function(h){var i=0;while(h&&(h=h.previousSibling)){i++;}
;return i;}
,getElementIndex:function(j){var k=0;var l=qx.dom.Node.ELEMENT;while(j&&(j=j.previousSibling)){if(j.nodeType==l){k++;}
;}
;return k;}
,getNextElementSibling:function(m){while(m&&(m=m.nextSibling)&&!qx.dom.Node.isElement(m)){continue;}
;return m||null;}
,getPreviousElementSibling:function(n){while(n&&(n=n.previousSibling)&&!qx.dom.Node.isElement(n)){continue;}
;return n||null;}
,contains:function(o,p){if(qx.core.Environment.get(a)){if(qx.dom.Node.isDocument(o)){var q=qx.dom.Node.getDocument(p);return o&&q==o;}
else if(qx.dom.Node.isDocument(p)){return false;}
else {return o.contains(p);}
;}
else if(qx.core.Environment.get(b)){return !!(o.compareDocumentPosition(p)&16);}
else {while(p){if(o==p){return true;}
;p=p.parentNode;}
;return false;}
;}
,isRendered:function(r){var s=r.ownerDocument||r.document;if(qx.core.Environment.get(a)){if(!r.parentNode||!r.offsetParent){return false;}
;return s.body.contains(r);}
else if(qx.core.Environment.get(b)){return !!(s.compareDocumentPosition(r)&16);}
else {while(r){if(r==s.body){return true;}
;r=r.parentNode;}
;return false;}
;}
,isDescendantOf:function(t,u){return this.contains(u,t);}
,getCommonParent:function(v,w){if(v===w){return v;}
;if(qx.core.Environment.get(a)){while(v&&qx.dom.Node.isElement(v)){if(v.contains(w)){return v;}
;v=v.parentNode;}
;return null;}
else {var x=[];while(v||w){if(v){if(qx.lang.Array.contains(x,v)){return v;}
;x.push(v);v=v.parentNode;}
;if(w){if(qx.lang.Array.contains(x,w)){return w;}
;x.push(w);w=w.parentNode;}
;}
;return null;}
;}
,getAncestors:function(y){return this._recursivelyCollect(y,d);}
,getChildElements:function(z){z=z.firstChild;if(!z){return [];}
;var A=this.getNextSiblings(z);if(z.nodeType===1){A.unshift(z);}
;return A;}
,getDescendants:function(B){return qx.lang.Array.fromCollection(B.getElementsByTagName(c));}
,getFirstDescendant:function(C){C=C.firstChild;while(C&&C.nodeType!=1){C=C.nextSibling;}
;return C;}
,getLastDescendant:function(D){D=D.lastChild;while(D&&D.nodeType!=1){D=D.previousSibling;}
;return D;}
,getPreviousSiblings:function(E){return this._recursivelyCollect(E,f);}
,getNextSiblings:function(F){return this._recursivelyCollect(F,e);}
,_recursivelyCollect:function(G,H){var I=[];while(G=G[H]){if(G.nodeType==1){I.push(G);}
;}
;return I;}
,getSiblings:function(J){return this.getPreviousSiblings(J).reverse().concat(this.getNextSiblings(J));}
,isEmpty:function(K){K=K.firstChild;while(K){if(K.nodeType===qx.dom.Node.ELEMENT||K.nodeType===qx.dom.Node.TEXT){return false;}
;K=K.nextSibling;}
;return true;}
,cleanWhitespace:function(L){var M=L.firstChild;while(M){var N=M.nextSibling;if(M.nodeType==3&&!/\S/.test(M.nodeValue)){L.removeChild(M);}
;M=N;}
;}
}});}
)();
(function(){var k="qx.event.Timer",j="_applyInterval",i="func is not a function",h="Boolean",g="qx.debug",f="No timeout given",d="Integer",c="qx.event.type.Event",b="_applyEnabled",a="interval";qx.Class.define(k,{extend:qx.core.Object,construct:function(l){qx.core.Object.call(this);this.setEnabled(false);if(l!=null){this.setInterval(l);}
;var self=this;this.__gk=function(){self._oninterval.call(self);}
;}
,events:{"interval":c},statics:{once:function(m,n,o){if(qx.core.Environment.get(g)){qx.core.Assert.assertFunction(m,i);qx.core.Assert.assertNotUndefined(o,f);}
;var p=new qx.event.Timer(o);p.__gl=m;p.addListener(a,function(e){p.stop();m.call(n,e);p.dispose();n=null;}
,n);p.start();return p;}
},properties:{enabled:{init:true,check:h,apply:b},interval:{check:d,init:1000,apply:j}},members:{__gm:null,__gk:null,_applyInterval:function(q,r){if(this.getEnabled()){this.restart();}
;}
,_applyEnabled:function(s,t){if(t){window.clearInterval(this.__gm);this.__gm=null;}
else if(s){this.__gm=window.setInterval(this.__gk,this.getInterval());}
;}
,start:function(){this.setEnabled(true);}
,startWith:function(u){this.setInterval(u);this.start();}
,stop:function(){this.setEnabled(false);}
,restart:function(){this.stop();this.start();}
,restartWith:function(v){this.stop();this.startWith(v);}
,_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;}
;if(this.getEnabled()){this.fireEvent(a);}
;}
)},destruct:function(){if(this.__gm){window.clearInterval(this.__gm);}
;this.__gm=this.__gk=null;}
});}
)();
(function(){var cL="backgroundColor",cK="_moz",cJ="top",cI="formatBlock",cH="insertParagraph",cG=" succeded",cF="li",cE='<span style="',cD="underline",cC="__yC",bM="no-repeat",bL=' <a href="',bK="FONT",bJ="inserthyperlink failed!",bI="|top|bottom|center|left|right|right top|left top|left bottom|right bottom|",bH="__placeholder__",bG="JustifyCenter",bF="Cut",bE="outdent",bD='</a> ',cS="InsertImage",cT="__yI",cQ="__resetHtml",cR="FontName",cO="bold",cP="__yy",cM="blockquote",cN="If an array is provided for parameter 'position' it has to define two elements!",cU="style",cV="The method '",cl="qx.bom.htmlarea.manager.Command",ck="__yH",cn="'><br class='webkit-block-placeholder' />",cm="a",cp="__yx",co="__yo",cr="href",cq="__yA",cj="type",ci="CreateLink",p="__yp",q="':'",r="italic",s="' you calling to execute the command '",t="__yG",u="qx_link",v="none",w="' is not allowed for parameter 'position'. Possible values are '",x='"></span>',y="Italic",dk="fontStyle",dj=" failed",di="InsertUnorderedList",dh="__yf",dp="OL",dn='text-align:',dm="Bold",dl="ForeColor",dr="url(",dq='" ',bd="repeat repeat-x repeat-y no-repeat",be='</p>',bb="<hr />",bc="UL",bh="__yF",bi="__ym",bf="editor not ready! '",bg='<font style="',Y="Command ",ba="IMG",L='<p id="',K="StrikeThrough",N="LI",M="__getHtml",H='>',G='font-family:',J='" size="',I="Indent",F="HiliteColor",E="br",bn="fontWeight",bo="Copy",bp="</span>",bq="Paste",bj="RemoveFormat",bk="JustifyRight",bl="' is not allowed for parameter 'repeat'. Possible values are '",bm='',br="__yB",bs='style="',V="' is not available!",U="_moz_dirty",T="color",S="JustifyLeft",R=" is currently not supported!",Q="Underline",P="SelectAll",O="<p style='",X="line-through",W=")",bt='"',bu='<span id="',bv="<span></span>",bw="__yz",bx="JustifyFull",by="__yD",bz="Outdent",bA="indent",bB="selectall",bC="InsertOrderedList",bQ="/>",bP="<img ",bO="backgroundRepeat",bN="</font>",bU="backgroundPosition",bT='|',bS="font-size",bR="string",bW="background-color",bV="font",ce=":",cf="='",cc=" with value ",cd=" ",ca=";",cb="body",bX="px",bY="backgroundImage",cg="Control",ch="__paragraph__",cv=':',cu="The value '",cx="qx.bom.htmlarea.HtmlArea.debug",cw="size",cz="' ",cy="webkit",cB="execCommand ",cA="__yk",ct="textDecoration",cs="BODY",dd="undefined",de="transparent",df="id",dg="InsertHtml",cY='">',da="font-family",db="child",dc="gecko",cW="text-align",cX='text-decoration',o="BackColor",n="FontSize",m="'",h=';',g="p",f="span",d="__yj",c='color',b="text-decoration",a="inserthtml",B="qx.debug",C="mshtml",z="legacy-font-size",A="",D="engine.name";qx.Class.define(cl,{extend:qx.core.Object,construct:function(ds){qx.core.Object.call(this);this.__wm=ds;this.__kp=null;this._commands=null;this.__wO();this.__xU={"Bold":true,"Italic":true,"Underline":true,"StrikeThrough":true};this.__xV=[10,12,16,18,24,32,48];this.__xW=0;}
,statics:{__xX:bI,__xY:bd},members:{__kp:null,__wm:null,__ya:false,__xU:null,__xV:null,__xW:null,setContentDocument:function(dt){this.__kp=dt;}
,getCommandObject:function(du){if(this._commands[du]){return this._commands[du];}
else {return null;}
;}
,__wO:function(){this._commands={bold:{useBuiltin:false,identifier:dm,method:bh},italic:{useBuiltin:false,identifier:y,method:t},underline:{useBuiltin:false,identifier:Q,method:ck},strikethrough:{useBuiltin:false,identifier:K,method:cT},fontfamily:{useBuiltin:true,identifier:cR,method:null},fontsize:{useBuiltin:false,identifier:n,method:cp},textcolor:{useBuiltin:true,identifier:dl,method:null},textbackgroundcolor:{useBuiltin:false,identifier:null,method:cP},backgroundcolor:{useBuiltin:false,identifier:null,method:bw},backgroundimage:{useBuiltin:false,identifier:null,method:cq},justifyleft:{useBuiltin:false,identifier:S,method:d},justifyright:{useBuiltin:false,identifier:bk,method:d},justifycenter:{useBuiltin:false,identifier:bG,method:d},justifyfull:{useBuiltin:false,identifier:bx,method:d},indent:{useBuiltin:true,identifier:I,method:null},outdent:{useBuiltin:true,identifier:bz,method:null},copy:{useBuiltin:true,identifier:bo,method:null},cut:{useBuiltin:true,identifier:bF,method:null},paste:{useBuiltin:true,identifier:bq,method:null},insertorderedlist:{useBuiltin:false,identifier:bC,method:cA},insertunorderedlist:{useBuiltin:false,identifier:di,method:cA},inserthorizontalrule:{useBuiltin:false,identifier:dg,method:p},insertimage:{useBuiltin:false,identifier:cS,method:bi},inserthyperlink:{useBuiltin:false,identifier:ci,method:co},selectall:{useBuiltin:false,identifier:P,method:br},selectedtext:{useBuiltin:false,identifier:null,method:cC},selectedhtml:{useBuiltin:false,identifier:null,method:by},inserthtml:{useBuiltin:false,identifier:dg,method:dh},resethtml:{useBuiltin:false,identifier:null,method:cQ},gethtml:{useBuiltin:false,identifier:null,method:M},removeformat:{useBuiltin:true,identifier:bj,method:null}};}
,execute:function(dv,dw){if(!this.__wm.isReady()){this.error(bf+dv+q+dw+m);return false;}
;dv=dv.toLowerCase();dw=dw!=null?dw:null;if(this._commands[dv]){var dx;var dy=this._commands[dv];if(!((qx.core.Environment.get(D)==cy)&&(dv==bA||dv==bE))){if(this.__yb()){this.__yc();}
;}
;if(dy.useBuiltin){dx=this.__yd(dy.identifier,false,dw);}
else {if(dy.method!=null&&this[dy.method]){dx=this[dy.method].call(this,dw,dy);}
else {this.error(cV+dy.method+s+dv+V);}
;}
;this.__wm.resetSavedRange();return dx;}
else {this.error(Y+dv+R);}
;}
,__yb:function(){var Node=qx.dom.Node;var dz=this.__wm.getFocusNode();var dC=false;var dA=false;if(dz){if(Node.isText(dz)){var dB=qx.dom.Hierarchy.getAncestors(dz);for(var i=0,j=dB.length;i<j;i++){if(Node.isNodeName(dB[i],g)||qx.bom.htmlarea.HtmlArea.isHeadlineNode(dB[i])){dC=true;break;}
;}
;}
else if(Node.isNodeName(dz,cb)){dA=true;}
;}
;return dA||!dC;}
,__yc:function(){this.__yd(cI,false,g);}
,__yd:function(dD,dE,dF){try{var dI=this.__kp;var dG=false;var dH=this.__wm.getRange();this.__kp.body.focus();if((qx.core.Environment.get(D)==C)){if(dD!=bB){dH.select();if(((dH.text)&&(dH.text.length>0))||((dH.length==1)&&(dH.item(0))&&(dH.item(0).tagName==ba))){dI=dH;}
else {dI=this.__kp;}
;}
;if(((qx.core.Environment.get(D)==C))&&(this.__xU[dD])){if(dH.text==A){dG=true;}
;}
;}
;var dJ=dI.execCommand(dD,dE,dF);if(dG&&dH.text!=A){dH.collapse();}
;if((qx.core.Environment.get(B))&&qx.core.Environment.get(cx)){this.debug(cB+dD+cc+dF+cG);}
;this.__ya=false;}
catch(dK){if((qx.core.Environment.get(B))&&qx.core.Environment.get(cx)){this.debug(cB+dD+cc+dF+dj);}
;return false;}
;return dJ;}
,__ye:qx.core.Environment.select(D,{"mshtml":function(){var dM=this.__wm;var dL=dM.getSavedRange()!=null?dM.getSavedRange():dM.getRange();return dL;}
,"default":function(){return this.__wm.getRange();}
}),__yf:qx.core.Environment.select(D,{"mshtml":function(dN,dO){var dR;if(dN==qx.bom.htmlarea.HtmlArea.simpleLinebreak){return this.__yi();}
else {this.__kp.body.focus();var dQ=this.__wm.getSelection();var dP=this.__ye();if(dP&&dQ&&dQ.type!=cg){try{dP.pasteHTML(dN);dP.collapse(false);dP.select();dR=true;}
catch(e){}
;}
else {dR=false;}
;this.__wm.resetSavedRange();return dR;}
;}
,"default":function(dS,dT){this.__kp.body.focus();return this.__kp.execCommand(dT.identifier,false,dS);}
}),insertParagraphOnLinebreak:qx.core.Environment.select(D,{"gecko":function(){var ec=this.__ys();var eg=this.__yg(ec);var dX=this.__yq(ec);var ed=bH+Date.parse(new Date());var ee=ch+Date.parse(new Date());var dV=bm;var ea=bu+ed+x;dV+=ea;dV+=L+ee+dq+eg+H;dV+=dX+be;this.__wm.getCommandManager().addUndoStep(a,cH,this.getCommandObject(a));this.execute(a,dV);this.__yh();qx.bom.element.Attribute.reset(this.__kp.getElementById(ed),df);var eb=this.__kp.getElementById(ee);if(eb.previousSibling.innerHTML==ea){var dU=this.__yr();var dY=this.__kp.createElement(E);var dW=this.__kp.createAttribute(U);dW.nodeValue=A;dY.setAttributeNode(dW);var ef=this.__kp.createAttribute(cj);ef.nodeValue=cK;dY.setAttributeNode(ef);eb.previousSibling.appendChild(dU);eb.previousSibling.appendChild(dY);}
;qx.bom.element.Attribute.reset(eb,df);return true;}
,"webkit":function(){var eh=this.getCurrentStyles();var ei=A;var ek={"background-color":true,"text-align":true};for(var ej in eh){if(ek[ej]){ei+=ej+ce+eh[ej]+ca;}
;}
;this.__wm.insertHtml(O+ei+cn);}
,"default":qx.lang.Function.empty}),__yg:qx.core.Environment.select(D,{"gecko":function(el){var eq=bs;var ep=el.child;if(ep[cW]){eq+=dn+ep[cW]+h;delete el.child[cW];}
;if(ep[da]){eq+=G+ep[da]+h;delete el.child[da];}
;var eo={"padding-top":true,"padding-bottom":true,"padding-left":true,"padding-right":true};var em={"margin-top":true,"margin-bottom":true,"margin-left":true,"margin-right":true};for(var en in ep){if(eo[en]||em[en]){eq+=en+cv+ep[en]+h;delete el.child[en];}
;}
;eq+=bt;return eq;}
,"default":function(){return A;}
}),__yh:qx.core.Environment.select(D,{"gecko":function(){var ez=this.__wm.getSelection();if(!ez||!ez.focusNode){return;}
;var er=ez.focusNode;var ew=ez.focusNode;while(!qx.dom.Node.isNodeName(ew,g)){ew=ew.parentNode;}
;var ev=ew.previousSibling.id;var eA=ew.nextSibling?ew.nextSibling.id:null;if(qx.lang.String.startsWith(ev,ch)&&ev==eA){var ey=ew.nextSibling;var et=this.__wm.getRange();et.selectNode(ey);ez.addRange(et);var es=qx.bom.htmlarea.HtmlArea.EMPTY_DIV;this.__wm.getCommandManager().addUndoStep(a,es,this.getCommandObject(a));this.execute(a,es);var eu=this.__wm.getRange();if(er){while(er&&er.firstChild&&qx.dom.Node.isElement(er.firstChild)){er=er.firstChild;}
;}
;eu.selectNode(er);ez.addRange(eu);eu.collapse(true);}
;}
,"default":qx.lang.Function.empty}),__yi:qx.core.Environment.select(D,{"mshtml":function(){var eB=this.__wm.getRange();if(eB&&!qx.dom.Node.isNodeName(eB.parentElement(),cF)){eB.pasteHTML(qx.bom.htmlarea.HtmlArea.simpleLinebreak);eB.collapse(false);eB.select();return true;}
;return false;}
,"default":function(){return false;}
}),__yj:function(eC,eD){var eE=(qx.core.Environment.get(D)==C)?this.__wm.getRange():this.__kp;return eE.execCommand(eD.identifier,false,eC);}
,__yk:function(eF,eG){if((qx.core.Environment.get(D)==C)){var eH=this.__wm.getFocusNode();this.__yl(eH);}
;this.__kp.body.focus();var eI=this.__kp.execCommand(eG.identifier,false,eF);if((qx.core.Environment.get(D)==cy)){var eH=this.__wm.getFocusNode();this.__yl(eH.parentNode);}
;return eI;}
,__yl:function(eJ){var eK=[];var parent=eJ.parentNode;while(qx.dom.Node.isNodeName(parent,cM)){eK.push(parent);parent=parent.parentNode;}
;if(eK.length>0){parent.appendChild(eJ);parent.removeChild(eK[eK.length-1]);}
;}
,__ym:qx.core.Environment.select(D,{"gecko":function(eL,eM){if(eL.src){this.__kp.execCommand(eM.identifier,false,eL.src);delete eL.src;var fa=this.__wm.getSelection();if(fa){var eY=fa.anchorNode;var eT=fa.anchorOffset;var eQ=eY.childNodes[eT-1];var eW;for(var eS in eL){eW=this.__kp.createAttribute(eS);eW.nodeValue=eL[eS];eQ.setAttributeNode(eW);}
;var eR={"font":true,"span":true};var eO=null;var eV=true;if(qx.dom.Node.isElement(eQ.previousSibling)&&eR[qx.dom.Node.getName(eQ.previousSibling)]){eO=eQ.previousSibling;}
else if(eR[qx.dom.Node.getName(eQ.parentNode)]){eO=eQ.parentNode;eV=false;}
;var eP=this.__kp.createDocumentFragment();var fb;if(eV&&eO!=null){var eR=this.__yn(eO);eP.appendChild(eR.root);fb=eR.inline;}
else {fb=this.__kp.createElement(f);eP.appendChild(fb);}
;var eX=this.__kp.createTextNode(A);fb.appendChild(eX);var eU=eQ.parentNode;if(eQ==eU.lastChild){eU.appendChild(eP);}
else {eU.insertBefore(eP,eQ.nextSibling);}
;var eN=this.__wm.getRange();eN.selectNodeContents(fb);}
;return true;}
else {return false;}
;}
,"mshtml":function(fc,fd){var fh=false;var fi=bP;for(var fe in fc){fi+=fe+cf+fc[fe]+cz;}
;fi+=bQ;var ff=this.__wm.getSelection();var fg=this.__ye();if(ff&&ff.type!=cg){try{fg.select();fg.pasteHTML(fi);fh=true;}
catch(e){}
;}
;this.__wm.resetSavedRange();return fh;}
,"default":function(fj,fk){if(fj.src){var fm=bP;for(var fl in fj){fm+=fl+cf+fj[fl]+cz;}
;fm+=bQ;return this.__kp.execCommand(dg,false,fm);}
else {return false;}
;}
}),__yn:function(fn){while(fn.firstChild&&fn.firstChild.nodeType==1){fn=fn.firstChild;}
;var fr=this.__ys(fn);var fv,fp,ft;var fo=A;var parent=null;var fu=null;var fs=fr.child;while(fs){fu=this.__kp.createElement(fs[z]?bV:f);fp=this.__kp.createAttribute(cU);fu.setAttributeNode(fp);for(var fq in fs){if(fq!=db&&fq!=z){fo+=fq+ce+fs[fq]+ca;}
else if(fq==z){ft=this.__kp.createAttribute(cw);ft.nodeValue=fs[fq];fu.setAttributeNode(ft);}
;}
;fp.nodeValue=fo;if(parent!=null){parent.appendChild(fu);}
else {fv=fu;}
;parent=fu;fs=fs.child;fo=A;}
;return {root:fv,inline:fu};}
,__yo:qx.core.Environment.select(D,{"gecko|opera":function(fw,fx){var fD=this.__wm.getSelection();var fA=this.__wm.getRange();if(fD.isCollapsed){var fz=u+(++this.__xW);var fE=this.__kp.createElement(cm);var fB=this.__kp.createAttribute(cr);var fy=this.__kp.createAttribute(df);var fC=this.__kp.createTextNode(fw);fy.nodeValue=fz;fE.setAttributeNode(fy);fB.nodeValue=fw;fE.setAttributeNode(fB);fE.appendChild(fC);fA.insertNode(fE);fA.selectNode(fE);fD.collapseToEnd();return true;}
else {return this.__kp.execCommand(fx.identifier,false,fw);}
;}
,"mshtml":function(fF,fG){try{var fI;var fH=this.__ye();var fJ=this.__wm;var fH=fJ.getSavedRange()!=null?fJ.getSavedRange():fJ.getRange();if(fH!=null&&fH.text!=A){fI=fH.execCommand(fG.identifier,false,fF);}
else {fI=this.__yf(bL+fF+cY+fF+bD,fG);}
;this.__wm.resetSavedRange();return fI;}
catch(e){if(qx.core.Environment.get(B)){this.error(bJ);}
;return false;}
;}
,"default":function(fK,fL){return this.__kp.execCommand(fL.identifier,false,fK);}
}),__yp:function(fM,fN){var fO=bb;if((qx.core.Environment.get(D)==dc)){fO+=this.__yq();}
;return this.__yf(fO,fN);}
,__yq:function(fP){var fT=A;var fS=cE;var fR=[];var fW=typeof fP!==dd?fP:this.__ys();var fU=fW.child;var fV=false;if(qx.lang.Object.isEmpty(fU)){return A;}
;while(fU){fV=fU[z]!=null;fT+=fV?bg:fS;for(var fQ in fU){fT+=(fQ!=db&&fQ!=z)?fQ+cv+fU[fQ]+h:A;}
;fT+=fV?J+fU[z]+cY:cY;fR.unshift(fV?bN:bp);fU=fU.child;}
;if(fR.length==1&&fR[0]==bN){fT+=bv;}
;for(var i=0,j=fR.length;i<j;i++){fT+=fR[i];}
;return fT;}
,__yr:function(){var fY=this.__kp.createDocumentFragment();var ge=this.__ys();var parent=fY;var gc=ge.child;var ga;var gd=false;while(gc){gd=gc[z]!=null;ga=this.__kp.createElement(gd?bV:f);parent.appendChild(ga);for(var fX in gc){if(fX!=db&&fX!=z){qx.bom.element.Style.set(ga,fX,gc[fX]);}
;}
;if(gd){var gb=this.__kp.createAttribute(cw);gb.nodeValue=gc[z];ga.setAttributeNode(gb);}
;parent=ga;gc=gc.child;}
;return fY;}
,__ys:function(gf){var gh={};var gi=null;var gj=this.getCurrentStyles(gf);gi=gh.child={};for(var gg in gj){if(gg!=b){gi[gg]=gj[gg];}
;}
;if(gj[b]){var gk=gj[b];for(var i=0,j=gk.length;i<j;i++){if(gi==null){gi=gh.child={};}
else {gi=gi.child={};}
;gi[c]=gk[i][c];gi[cX]=gk[i][cX];}
;}
;if(gj[c]&&gj[cX]){gi=gi.child={};gi[c]=gj[c];}
;return gh;}
,getCurrentStyles:function(gl){if(gl==null){var gn=this.__wm.getSelection();if(!gn||gn.focusNode==null){return {};}
;gl=(gn.focusNode.nodeType==3)?gn.focusNode.parentNode:gn.focusNode;}
;var go=qx.dom.Hierarchy.getAncestors(gl);var gq=qx.lang.Array.insertBefore(go,gl,go[0]);var gm=this.__yt(gq);var gp=this.__yu(gm,gq);return gp;}
,__yt:function(gr){var gu={};var gs,gt;for(var i=0,j=gr.length;i<j;i++){gt=gr[i];for(var k=0,l=gt.style.length;k<l;k++){gs=gt.style[k];if(gs.length>0&&typeof gu[gs]===dd){gu[gs]=gt.style.getPropertyValue(gs);}
;}
;if(gt.tagName.toUpperCase()==bK&&gt.size&&gu[z]===undefined){gu[z]=gt.size;}
;}
;if(gu[z]&&gu[bS]){delete gu[bS];}
;return gu;}
,__yu:function(gv,gw){var gB=gw[0];var gz=this.__wm.getContentWindow().getComputedStyle(gB,null);var gx;var gA={};for(var gy in gv){if(gy!=z){gx=gz.getPropertyValue(gy);}
else {gx=gv[gy];}
;if(gy==bW&&gx==de){gA[gy]=this.__yw(gw);}
else if(gy==b){gA[gy]=this.__yv(gw);}
else {gA[gy]=gx;}
;}
;return gA;}
,__yv:function(gC){var gF,gH,gD;var gG=[];var gE=this.__wm.getContentWindow();for(var i=0,j=gC.length;i<j;i++){gD=gE.getComputedStyle(gC[i],null);gF=gD.getPropertyValue(b);gH=gD.getPropertyValue(T);if(gF!=v){gG.push({'text-decoration':gF,'color':gH});}
;}
;return gG;}
,__yw:function(gI){var gK,gJ,gL;for(var i=0;i<gI.length;i++){gK=gI[i];gJ=this.__wm.getContentWindow().getComputedStyle(gK,null);gL=gJ.getPropertyValue(bW);if(gL!=de){return gL;}
;}
;}
,__yx:function(gM,gN){var ha=this.__wm.getSelection();var gU=((qx.core.Environment.get(D)==C))?this.__wm.getRange():gU=ha.getRangeAt(0);var gV=[];var gY;var gT=[dp,bc];var gO,i,j,gW;gW=((qx.core.Environment.get(D)==C))?gU.parentElement():gU.commonAncestorContainer;if(gW.tagName==cs){for(var i=0;i<gT.length;i++){gO=gW.getElementsByTagName(gT[i]);for(var j=0;j<gO.length;j++){if(gO[j]){gV.push(gO[j]);}
;}
;}
;}
else if(qx.lang.Array.contains(gT,gW.tagName)){gV.push(gW);}
;if(gV.length>0){for(var i=0;i<gV.length;i++){var gQ=gV[i];gY=((qx.core.Environment.get(D)==C))?((gQ==gW)||(gW.tagName==cs)):ha.containsNode(gQ,false);for(j=0;j<gQ.childNodes.length;j++){var gS=gQ.childNodes[j];if(gY||(ha.focusNode.nodeValue&&qx.dom.Hierarchy.contains(gS,ha.focusNode)&&(ha.focusOffset==ha.focusNode.nodeValue.length))||(qx.dom.Hierarchy.contains(gS,ha.anchorNode)&&(ha.anchorOffset==0))||(ha.containsNode(gS,false))){gS.style.fontSize=(this.__xV[gM]||gM)+bX;}
;}
;}
;}
else {var gR=((qx.core.Environment.get(D)==C))?gW:ha.focusNode;var gX=qx.dom.Hierarchy.getAncestors(gR);for(i=0;i<gX.length;i++){if(gX[i].tagName==N){if((((qx.core.Environment.get(D)==dc))&&((ha.anchorOffset==0)&&(ha.focusNode.nodeValue&&(ha.focusOffset==ha.focusNode.nodeValue.length))&&qx.dom.Hierarchy.contains(gX[i].firstChild,ha.anchorNode)&&qx.dom.Hierarchy.contains(gX[i].lastChild,ha.focusNode)))||(((qx.core.Environment.get(D)==C))&&(gU.htmlText==gX[i].innerHTML))){gX[i].style.fontSize=(this.__xV[gM]||gM)+bX;}
;break;}
;}
;}
;if((qx.core.Environment.get(D)==C)){this.__kp.body.focus();this.__wm.getRange().select();return this.__kp.execCommand(n,false,gM);}
else if((qx.core.Environment.get(D)==dc)){var parent=gU.commonAncestorContainer;if(parent.nodeType===1){var gP=parent.getElementsByTagName(f);for(i=0;i<gP.length;i++){if(gP[i].style.fontSize){gP[i].style.fontSize=null;}
;}
;}
;}
;return this.__kp.execCommand(n,false,gM);}
,__yy:qx.core.Environment.select(D,{"mshtml":function(hb,hc){this.__kp.body.focus();return this.__kp.execCommand(o,false,hb);}
,"gecko|opera":function(hd,he){this.__kp.body.focus();return this.__kp.execCommand(F,false,hd);}
,"webkit":function(hf,hg){var hh=this.__wm.getSelection();var hi=this.__wm.getRange();if(!hh||!hh.isCollapsed){this.__kp.body.focus();this.__kp.execCommand(o,false,hf);if(hh){hh.collapseToEnd();}
;return true;}
else {var hk=hh.anchorOffset;var hl=hh.anchorOffset;var hi=hh.getRangeAt(0);var hj=hh.anchorNode;while(hl>0){if(hj.nodeValue.charCodeAt(hl)==160||hj.nodeValue.charCodeAt(hl)==32){break;}
else {hl--;}
;}
;while(hk<hj.nodeValue.length){if(hj.nodeValue.charCodeAt(hk)==160||hj.nodeValue.charCodeAt(hk)==32){break;}
else {hk++;}
;}
;hi.setStart(hh.anchorNode,hh.anchorNode.nodeValue.charAt(hl)==cd?hl+1:hl);hi.setEnd(hh.anchorNode,hk);hh.addRange(hi);this.__kp.body.focus();this.__kp.execCommand(o,false,hf);hh.collapseToEnd();return true;}
;}
}),__yz:function(hm,hn){hm=hm!=null&&typeof hm==bR?hm:de;qx.bom.element.Style.set(this.__kp.body,cL,hm);return true;}
,__yA:function(ho,hp){var hq,hs,hr;var ht=qx.bom.htmlarea.manager.Command;if(ho==null){hq=null;}
else {hq=ho[0];hs=ho[1];hr=ho[2];}
;if(hq==null||typeof hq!=bR){qx.bom.element.Style.set(this.__kp.body,bY,A);qx.bom.element.Style.set(this.__kp.body,bO,A);qx.bom.element.Style.set(this.__kp.body,bU,A);return true;}
else {if(hq.search(/^url.*\(/)==-1){hq=dr+hq+W;}
;}
;if(hs!=null&&!qx.lang.String.contains(ht.__xY,hs)){if(qx.core.Environment.get(B)){this.error(cu+hs+bl+ht.__xY+m);}
;return false;}
else {hs=bM;}
;if(hr!=null){if(qx.lang.Type.isString(hr)&&!qx.lang.String.contains(ht.__xX,bT+hr+bT)){if(qx.core.Environment.get(B)){this.error(cu+hr+w+ht.__xX+m);}
;return false;}
else {if(qx.lang.Type.isArray(hr)&&hr.length==2){hr=hr[0]+cd+hr[1];}
else {if(qx.core.Environment.get(B)){this.error(cN);}
;return false;}
;}
;}
else {hr=cJ;}
;qx.bom.element.Style.set(this.__kp.body,bY,hq);qx.bom.element.Style.set(this.__kp.body,bO,hs);qx.bom.element.Style.set(this.__kp.body,bU,hr);return true;}
,__yB:qx.core.Environment.select(D,{"mshtml":function(hu,hv){var hw=this.__kp.body.createTextRange();hw.select();return true;}
,"default":function(hx,hy){return this.__yd(hy.identifier,false,hx);}
}),__yC:function(){return this.__wm.getSelectedText();}
,__yD:function(){return this.__wm.getSelectedHtml();}
,__yE:function(hz,hA){var hE=this.__wm.getFocusNode();if(hE.textContent==A){var hC=qx.dom.Hierarchy.getAncestors(hE);hC.unshift(hE);var Node=qx.dom.Node;var hB=qx.bom.element.Style;var hD=hC.shift();while(hC.length>0){if(Node.getName(hD)==g||Node.getName(hD)==cb){break;}
;if(hB.get(hD,hz,hB.LOCAL_MODE)==hA){hB.reset(hD,hz);return true;}
;hD=hC.shift();}
;}
;return false;}
,__yF:qx.core.Environment.select(D,{"gecko":function(hF,hG){if(this.__yE(bn,cO)){return true;}
else {return this.__yd(hG.identifier,false,hF);}
;}
,"default":function(hH,hI){return this.__yd(hI.identifier,false,hH);}
}),__yG:qx.core.Environment.select(D,{"gecko":function(hJ,hK){if(this.__yE(dk,r)){return true;}
else {return this.__yd(hK.identifier,false,hJ);}
;}
,"default":function(hL,hM){return this.__yd(hM.identifier,false,hL);}
}),__yH:qx.core.Environment.select(D,{"gecko":function(hN,hO){if(this.__yE(ct,cD)){return true;}
else {return this.__yd(hO.identifier,false,hN);}
;}
,"default":function(hP,hQ){return this.__yd(hQ.identifier,false,hP);}
}),__yI:qx.core.Environment.select(D,{"gecko":function(hR,hS){if(this.__yE(ct,X)){return true;}
else {return this.__yd(hS.identifier,false,hR);}
;}
,"default":function(hT,hU){return this.__yd(hU.identifier,false,hT);}
})},destruct:function(){this.__kp=this.__wm=this._commands=null;this.__xU=this.__xV=null;}
});}
)();
(function(){var n="undo",m="pageup",l="ADD TO UNDO STACK",k="control",h="shift",g="end",f="right",d="qx_link",c="b",b="insertunorderedlist",bo="Undo",bn="__wl",bm="pagedown",bl="k",bk="home",bj="Redo",bi="a",bh="insertorderedlist",bg="y",bf="justifyright",u="redo",v="insertParagraph",s="qx.bom.htmlarea.manager.UndoRedo",t="left",q="i",r="u",o="enter",p="execCommand failed! Details: ",A="ADD TO REDO STACK",B="insertimage",K="z",H="undoRedoState",S="down",N="up",bb="body",X="backgroundColor",D="actionType ",be="mousedown",bd=" is not managed! Please provide a handler method!",bc="table",C="backgroundImage",F="backgroundRepeat",G="p",J="backgroundPosition",L="td",O="img",U="inserthyperlink",ba="mouseup",w="keypress",x="qx.bom.htmlarea.HtmlArea.debug",E="backgroundimage",R="qx.debug",Q="backgroundcolor",P="webkit",W=" ",V="Content",M="Internal",T="inserthtml",a="gecko",Y="Custom",y="Command",z="mshtml",I="engine.name";qx.Class.define(s,{extend:qx.core.Object,construct:function(bp,bq){qx.core.Object.call(this);this.__wl=bp;this.__wm=bq;this.__wn=[];this.__wo=[];this._commands=null;this.__kp=null;this.__wp={};this.__wq={command:true,content:true,custom:true};this.__wO();this.__wr=qx.lang.Function.bind(this._handleKeyPress,this);this.__ws=qx.lang.Function.bind(this._handleMouseUp,this);if((qx.core.Environment.get(I)==z)){this.__wt=qx.lang.Function.bind(this._handleMouseDown,this);}
;}
,members:{__wu:false,__wv:false,__ww:false,__wq:null,__wp:null,__wl:null,__kp:null,__wn:null,__wo:null,__wm:null,__wr:null,__ws:null,__wt:null,__wx:null,setContentDocument:function(br){this.__kp=br;this.__wl.setContentDocument(br);qx.event.Registration.addListener(br.body,w,this.__wr,this);qx.event.Registration.addListener(br.body,ba,this.__ws,this);if((qx.core.Environment.get(I)==z)){qx.event.Registration.addListener(br.body,be,this.__wt,this,true);}
;}
,insertParagraphOnLinebreak:function(){return this.__wl.insertParagraphOnLinebreak();}
,execute:function(bs,bt){var bu;bs=bs.toLowerCase();if(this._commands[bs]){if(this._commands[bs].passthrough){bu=this.__wl.execute(bs,bt);}
else {bu=this[bs].call(this);}
;}
else {if((qx.core.Environment.get(I)==z)||(qx.core.Environment.get(I)==P)){this.__wP(bs,bt,this.__wl.getCommandObject(bs));bu=this.__wl.execute(bs,bt);if(!bu){this.__wn.pop();}
;}
else {bu=this.__wl.execute(bs,bt);if(bu){this.__wP(bs,bt,this.__wl.getCommandObject(bs));}
;}
;if(bs==n&&this.__wn.length==0){this.__wv=false;this.__wX();}
else if(bs==u&&this.__wo.length==0){this.__wu=false;this.__wX();}
;}
;this.__ww=false;return bu;}
,addUndoStep:function(bv,bw,bx){this.__wP(bv,bw,bx);}
,registerHandler:function(by,bz,bA,bB){this.__wp[by]={undo:bz,redo:bA,context:bB};}
,isUndoPossible:function(){return this.__wv;}
,undo:function(){var bE;if(this.__ww){this.__wR();}
;if(this.__wn.length>0){var bD=this.__wn.pop();if(this.__wq[bD.actionType.toLowerCase()]){switch(bD.actionType){case y:bE=this.__wz(bD);break;case V:bE=this.__wD(bD);break;case M:bE=this.__wC(bD);break;case Y:bE=this.__wy(bD);break;};}
else if(this.__wp[bD.actionType]){var bC=this.__wp[bD.actionType];bE=bC.undo.call(bC.context?bC.context:this,bD);this.__wT(bD);}
else {this.error(D+bD.actionType+bd);}
;this.__wu=true;this.__wX();return bE;}
;}
,__wy:qx.core.Environment.select(I,{"mshtml|webkit":function(bF){var bG=this.__kp.body.innerHTML;var bI=bF.content;this.__kp.body.innerHTML=bI;var bH=bF;bH.content=bG;this.__wT(bH);return true;}
,"default":function(bJ){var bN=bJ;var bM=qx.bom.element.Style;switch(bJ.command){case Q:bN.parameter=[bM.get(this.__kp.body,X)];break;case E:bN.parameter=[bM.get(this.__kp.body,C),bM.get(this.__kp.body,F),bM.get(this.__kp.body,J)];break;};this.__wT(bN);if(bJ.command==U){if((qx.core.Environment.get(I)==a)){var bL=d+this.__wl.__hyperLinkId;var bK=this.__kp.getElementById(bL);if(bK){bK.parentNode.removeChild(bK);return true;}
else {return false;}
;}
;}
else {return this.__wl.execute(bJ.command,bJ.value);}
;}
}),__wz:qx.core.Environment.select(I,{"mshtml|webkit":function(bO){}
,"default":function(bP){this.__wT(bP);if((qx.core.Environment.get(I)==a)){if(bP.command==T&&bP.value==qx.bom.htmlarea.HtmlArea.EMPTY_DIV&&this.__wA(T,v)){this.__wB();}
;}
;return this.__wE();}
}),__wA:function(bQ,bR){if(this.__wn.length>0){var bS=this.__wn[this.__wn.length-1];return (bS.command==bQ&&bS.value==bR);}
;return false;}
,__wB:function(){this.__wE();if(this.__wn.length>0){var bT=this.__wn.pop();this.__wT(bT);}
;}
,__wC:function(bU){this.__wT(bU);return this.__wE();}
,__wD:qx.core.Environment.select(I,{"gecko":function(bV){this.__wT(bV);try{return this.__wE();}
catch(bW){if(qx.core.Environment.get(R)){this.error(p+bW);}
;}
;}
,"mshtml|webkit":function(bX){}
,"default":function(bY){this.__wT(bY);return this.__wE();}
}),__wE:function(){try{return this.__kp.execCommand(bo,false,null);}
catch(e){return false;}
;}
,isRedoPossible:function(){return this.__wu;}
,redo:function(){if(this.__wu){var cb;if(this.__wo.length>0){var cc=this.__wo.pop();if(this.__wq[cc.actionType.toLowerCase()]){switch(cc.actionType){case y:cb=this.__wG(cc);break;case V:cb=this.__wM(cc);break;case M:cb=this.__wL(cc);break;case Y:cb=this.__wF(cc);break;};}
else if(this.__wp[cc.actionType]){var ca=this.__wp[cc.actionType];cb=ca.redo.call(ca.context?ca.context:this,cc);this.__wS(cc);}
else {this.error(D+cc.actionType+bd);}
;this.__wv=true;this.__wX();}
;return cb;}
;}
,__wF:qx.core.Environment.select(I,{"mshtml|webkit":function(cd){var ce=this.__kp.body.innerHTML;var cg=cd.content;this.__kp.body.innerHTML=cg;var cf=cd;cf.content=ce;this.__wS(cf);return true;}
,"default":function(ch){this.__wS(ch);return this.__wN();}
}),__wG:qx.core.Environment.select(I,{"mshtml|webkit":function(ci){}
,"default":function(cj){this.__wS(cj);var ck=this.__wN();if((qx.core.Environment.get(I)==a)){if(this.__wH(T,qx.bom.htmlarea.HtmlArea.EMPTY_DIV)){var cl=this.__wI();this.__wJ();if(cl!=null){this.__wK(cl);}
;}
;}
;return ck;}
}),__wH:function(cm,cn){if(this.__wo.length>0){var co=this.__wo[this.__wo.length-1];return (co.command==cm&&co.value==cn);}
;return false;}
,__wI:function(){if(this.__wm==null){return null;}
;var cp=this.__wm.getSelection();var cq=cp?cp.focusNode:null;if(cq==null){return null;}
;try{while(cq.nodeName.toLowerCase()!=G){cq=cq.parentNode;if(!cq||qx.dom.Node.isNodeName(cq,bb)){return null;}
;}
;}
catch(cr){return null;}
;if(cq!=null&&qx.dom.Node.isNodeName(cq,G)){return cq;}
else {return null;}
;}
,__wJ:function(){var cs=this.__wo.pop();this.__wS(cs);this.__wN();}
,__wK:qx.core.Environment.select(I,{"gecko":function(ct){if(ct==this.__wm.getContentBody().lastChild){return;}
;var cw=ct.firstChild;while(cw.firstChild){cw=cw.firstChild;}
;var cu=this.__wm.getSelection();var cv=this.__wm.getRange();if(cu&&cv){cv.selectNode(cw);cu.addRange(cv);cv.collapse(true);}
;}
,"default":qx.lang.Function.empty}),__wL:function(cx){this.__wS(cx);return this.__wN();}
,__wM:qx.core.Environment.select(I,{"mshtml|webkit":function(cy){}
,"default":function(cz){this.__wS(cz);return this.__wN();}
}),__wN:function(){try{return this.__kp.execCommand(bj,false,null);}
catch(e){return false;}
;}
,__wO:function(){this._commands={undo:{passthrough:false},redo:{passthrough:false}};this.__wl.getCommandObject(Q).customUndo=true;this.__wl.getCommandObject(E).customUndo=true;if((qx.core.Environment.get(I)==a)){}
;}
,__wP:qx.core.Environment.select(I,{"mshtml|webkit":function(cA,cB,cC){var cD=this.getUndoRedoObject();cD.commandObject=cC;cD.command=cA;cD.value=cB;cD.actionType=Y;cD.content=this.__kp.body.innerHTML;this.__wQ(cD);}
,"default":function(cE,cF,cG){if(this.__wm==null){return;}
;var cI=this.getUndoRedoObject();cI.commandObject=cG;cI.command=cE;cI.value=cF;cI.actionType=Y;var cH=this.__wm.getSelection();if(cG.customUndo){var cJ=[];switch(cE){case Q:cJ.push(qx.bom.element.Style.get(this.__kp.body,X));break;case E:cJ.push(qx.bom.element.Style.get(this.__kp.body,C),qx.bom.element.Style.get(this.__kp.body,F),qx.bom.element.Style.get(this.__kp.body,J));break;case U:if(cH&&!cH.isCollapsed){cI.actionType=y;}
;break;};cI.parameter=cJ;}
else {if((qx.core.Environment.get(I)==a)){if(cH&&cH.isCollapsed){switch(cE){case bh:case b:case bf:case T:case B:cI.actionType=y;break;default:return;};}
else {cI.actionType=y;}
;}
else {cI.actionType=y;}
;}
;this.__wQ(cI);}
}),__wQ:function(cK){if(this.__ww){this.__wR();}
;this.__wS(cK);this.__wu=false;this.__wo=[];this.__wX();}
,__wR:function(){var cL=this.__wn[this.__wn.length-1];if(cL==null||cL.actionType!=V){var cM=this.getUndoRedoObject();cM.actionType=V;if((qx.core.Environment.get(I)==z)||(qx.core.Environment.get(I)==P)){cM.content=this.__wx;cM.actionType=Y;this.__wx=null;}
;this.__wS(cM);this.__ww=false;}
;}
,getUndoRedoObject:function(){return {actionType:null,commandObject:null,command:null,value:null,parameter:null,range:null,marker:null,content:null};}
,__wS:function(cN){if((qx.core.Environment.get(R))&&qx.core.Environment.get(x)){this.debug(l);this.debug(cN.actionType+W+cN.command+W+cN.value);}
;this.__wn.push(cN);}
,__wT:function(cO){if((qx.core.Environment.get(R))&&qx.core.Environment.get(x)){this.debug(A);this.debug(cO.actionType+W+cO.command+W+cO.value);}
;this.__wo.push(cO);}
,_handleKeyPress:function(e){var cP=e.getKeyIdentifier().toLowerCase();var cQ=e.isCtrlPressed();switch(cP){case k:case h:case t:case f:case N:case S:case m:case bm:case bk:case g:case o:break;case bi:case c:case q:case r:case bl:case bg:case K:if(!cQ){this.__wU();}
;break;default:this.__wu=false;this.__wo=[];this.__wU();};}
,__wU:function(){if(!this.__ww){this.__ww=true;this.__wv=true;if((qx.core.Environment.get(I)==z)||(qx.core.Environment.get(I)==P)){this.__wx=this.__kp.body.innerHTML;}
;this.__wX();}
;}
,__wV:null,_handleMouseDown:qx.core.Environment.select(I,{"mshtml":function(e){var cR=e.getOriginalTarget();if(qx.dom.Node.isElement(cR)&&(qx.dom.Node.isNodeName(cR,O)||qx.dom.Node.isNodeName(cR,bc))){this.__wV={node:cR,content:cR.outerHTML};}
else {this.__wV=null;}
;}
,"default":function(e){return true;}
}),_handleMouseUp:qx.core.Environment.select(I,{"gecko":function(e){if(this.__wm==null){return;}
;var cT=this.__wm.getSelection();if(!cT){this.__wV=null;return;}
;var cS=cT.anchorNode;var cU=cS.childNodes[cT.anchorOffset];if(qx.dom.Node.isNodeName(cU,O)){if(this.__wV==null){this.__wV=cU.cloneNode(true);}
else {if(this.__wV.style.width!=cU.style.width||this.__wV.style.height!=cU.style.height){this.__wW();this.__wV=cU.cloneNode(true);}
;}
;}
else if(qx.dom.Node.isNodeName(cS,L)||qx.dom.Node.isNodeName(cS.parentNode,L)){var cV=cS.parentNode;while(qx.dom.Node.isNodeName(cV,bc)){cV=cV.parentNode;}
;if(this.__wV==null){this.__wV=cV.cloneNode(true);}
else {qx.event.Timer.once(function(){if(cV.style.width!=this.__wV.style.width||cV.style.height!=this.__wV.style.height||cV.innerHTML!=this.__wV.innerHTML){this.__wW();this.__wV=cV.cloneNode(true);}
;}
,this,0);}
;}
else {this.__wV=null;}
;}
,"default":function(e){var cW=qx.bom.Event.getTarget(e);if(this.__wV!=null){if(cW.nodeType==1){if(cW==this.__wV.node){if(cW.outerHTML!=this.__wV.content){this.__wV.content=cW.outerHTML;this.__wW();}
;}
else {for(var i=0,j=cW.childNodes.length;i<j;i++){if(cW.childNodes[i]==this.__wV.node){if(cW.childNodes[i].outerHTML!=this.__wV.content){this.__wV.content=cW.childNodes[i].outerHTML;this.__wW();}
;}
;}
;}
;}
else {this.__wV=null;}
;}
;}
}),__wW:qx.core.Environment.select(I,{"mshtml|webkit":function(){this.__wP(M,null,null);}
,"default":function(){var cX=this.getUndoRedoObject();cX.actionType=M;this.__wS(cX);}
}),__wX:function(){qx.event.Timer.once(function(e){if(this.__wm!=null){var cY={undo:this.isUndoPossible()?0:-1,redo:this.isRedoPossible()?0:-1};this.__wm.fireDataEvent(H,cY);}
;}
,this,200);}
},destruct:function(){try{qx.event.Registration.removeListener(this.__kp.body,w,this.__wr);qx.event.Registration.removeListener(this.__kp,ba,this.__ws);if((qx.core.Environment.get(I)==z)){qx.event.Registration.removeListener(this.__kp,be,this.__wt);}
;}
catch(e){}
;this._disposeObjects(bn);this.__wm=this.__wn=this.__wo=this._commands=this.__kp=null;this.__wq=this.__wp=null;}
});}
)();
(function(){var c="qx.event.handler.Appear",b="disappear",a="appear";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);this.__dz=d;this.__ej={};qx.event.handler.Appear.__ek[this.$$hash]=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__ek:{},refresh:function(){var e=this.__ek;for(var f in e){e[f].refresh();}
;}
},members:{__dz:null,__ej:null,canHandleEvent:function(g,h){}
,registerEvent:function(i,j,k){var l=qx.core.ObjectRegistry.toHashCode(i)+j;var m=this.__ej;if(m&&!m[l]){m[l]=i;i.$$displayed=i.offsetWidth>0;}
;}
,unregisterEvent:function(n,o,p){var q=qx.core.ObjectRegistry.toHashCode(n)+o;var r=this.__ej;if(!r){return;}
;if(r[q]){delete r[q];}
;}
,refresh:function(){var v=this.__ej;var w;for(var u in v){w=v[u];var s=w.offsetWidth>0;if((!!w.$$displayed)!==s){w.$$displayed=s;var t=qx.event.Registration.createEvent(s?a:b);this.__dz.dispatchEvent(w,t);}
;}
;}
},destruct:function(){this.__dz=this.__ej=null;delete qx.event.handler.Appear.__ek[this.$$hash];}
,defer:function(x){qx.event.Registration.addHandler(x);}
});}
)();
(function(){var h="abstract",g="qx.event.dispatch.AbstractBubbling",f="Missing implementation",e="The context object '",d="qx.debug",c="' for the event '",b="' of '",a="'is already disposed.";qx.Class.define(g,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:h,construct:function(k){this._manager=k;}
,members:{_getParent:function(l){throw new Error(f);}
,canDispatchEvent:function(m,event,n){return event.getBubbles();}
,dispatchEvent:function(o,event,p){var parent=o;var y=this._manager;var v,C;var t;var x,A;var z;var B=[];v=y.getListeners(o,p,true);C=y.getListeners(o,p,false);if(v){B.push(v);}
;if(C){B.push(C);}
;var parent=this._getParent(o);var r=[];var q=[];var s=[];var w=[];while(parent!=null){v=y.getListeners(parent,p,true);if(v){s.push(v);w.push(parent);}
;C=y.getListeners(parent,p,false);if(C){r.push(C);q.push(parent);}
;parent=this._getParent(parent);}
;event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);for(var i=s.length-1;i>=0;i--){z=w[i];event.setCurrentTarget(z);t=s[i];for(var j=0,u=t.length;j<u;j++){x=t[j];A=x.context||z;if(qx.core.Environment.get(d)){if(A&&A.isDisposed&&A.isDisposed()){this.warn(e+A+c+p+b+z+a);}
;}
;x.handler.call(A,event);}
;if(event.getPropagationStopped()){return;}
;}
;event.setEventPhase(qx.event.type.Event.AT_TARGET);event.setCurrentTarget(o);for(var i=0,D=B.length;i<D;i++){t=B[i];for(var j=0,u=t.length;j<u;j++){x=t[j];A=x.context||o;if(qx.core.Environment.get(d)){if(A&&A.isDisposed&&A.isDisposed()){this.warn(e+A+c+p+b+o+a);}
;}
;x.handler.call(A,event);}
;if(event.getPropagationStopped()){return;}
;}
;event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);for(var i=0,D=r.length;i<D;i++){z=q[i];event.setCurrentTarget(z);t=r[i];for(var j=0,u=t.length;j<u;j++){x=t[j];A=x.context||z;if(qx.core.Environment.get(d)){if(A&&A.isDisposed&&A.isDisposed()){this.warn(e+A+c+p+b+z+a);}
;}
;x.handler.call(A,event);}
;if(event.getPropagationStopped()){return;}
;}
;}
}});}
)();
(function(){var a="qx.event.dispatch.DomBubbling";qx.Class.define(a,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(b){return b.parentNode;}
,canDispatchEvent:function(c,event,d){return c.nodeType!==undefined&&event.getBubbles();}
},defer:function(e){qx.event.Registration.addDispatcher(e);}
});}
)();
(function(){var d="qx.event.handler.Element",c="load",b="iframe",a="-";qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(e){qx.core.Object.call(this);this._manager=e;this._registeredEvents={};}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,load:true,scroll:true,select:true,reset:true,submit:true},CANCELABLE:{selectstart:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(f,g){if(g===c){return f.tagName.toLowerCase()!==b;}
else {return true;}
;}
,registerEvent:function(h,i,j){var m=qx.core.ObjectRegistry.toHashCode(h);var k=m+a+i;var l=qx.lang.Function.listener(this._onNative,this,k);qx.bom.Event.addNativeListener(h,i,l);this._registeredEvents[k]={element:h,type:i,listener:l};}
,unregisterEvent:function(n,o,p){var s=this._registeredEvents;if(!s){return;}
;var t=qx.core.ObjectRegistry.toHashCode(n);var q=t+a+o;var r=this._registeredEvents[q];if(r){qx.bom.Event.removeNativeListener(n,o,r.listener);}
;delete this._registeredEvents[q];}
,_onNative:qx.event.GlobalError.observeMethod(function(u,v){var x=this._registeredEvents;if(!x){return;}
;var w=x[v];var y=this.constructor.CANCELABLE[w.type];qx.event.Registration.fireNonBubblingEvent(w.element,w.type,qx.event.type.Native,[u,undefined,undefined,undefined,y]);}
)},destruct:function(){var z;var A=this._registeredEvents;for(var B in A){z=A[B];qx.bom.Event.removeNativeListener(z.element,z.type,z.listener);}
;this._manager=this._registeredEvents=null;}
,defer:function(C){qx.event.Registration.addHandler(C);}
});}
)();
(function(){var a="qx.event.handler.UserAction";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);this.__dz=b;this.__ce=b.getWindow();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__dz:null,__ce:null,canHandleEvent:function(c,d){}
,registerEvent:function(e,f,g){}
,unregisterEvent:function(h,i,j){}
},destruct:function(){this.__dz=this.__ce=null;}
,defer:function(k){qx.event.Registration.addHandler(k);}
});}
)();
(function(){var t="engine.version",s="useraction",r="webkit",q="gecko",p="DOMMouseScroll",o="qx.event.handler.Mouse",n="os.name",m="mouseover",l="mouseout",k="ios",d="mousemove",j="on",g="dblclick",c="mousedown",b="contextmenu",f="mousewheel",e="click",h="mouseup",a="engine.name";qx.Class.define(o,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(u){qx.core.Object.call(this);this.__dz=u;this.__ce=u.getWindow();this.__dK=this.__ce.document;this._initButtonObserver();this._initMoveObserver();this._initWheelObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT+qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__el:null,__em:null,__en:null,__eo:null,__ep:null,__dz:null,__ce:null,__dK:null,canHandleEvent:function(v,w){}
,registerEvent:qx.core.Environment.get(n)===k?function(x,y,z){x[j+y]=qx.lang.Function.returnNull;}
:qx.lang.Function.returnNull,unregisterEvent:qx.core.Environment.get(n)===k?function(A,B,C){A[j+B]=undefined;}
:qx.lang.Function.returnNull,__eq:function(D,E,F){if(!F){F=qx.bom.Event.getTarget(D);}
;if(F&&F.nodeType){qx.event.Registration.fireEvent(F,E||D.type,E==f?qx.event.type.MouseWheel:qx.event.type.Mouse,[D,F,null,true,true]);}
;qx.event.Registration.fireEvent(this.__ce,s,qx.event.type.Data,[E||D.type]);}
,__er:function(){var H=[this.__ce,this.__dK,this.__dK.body];var I=this.__ce;var G=p;for(var i=0;i<H.length;i++){if(qx.bom.Event.supportsEvent(H[i],f)){G=f;I=H[i];break;}
;}
;return {type:G,target:I};}
,_initButtonObserver:function(){this.__el=qx.lang.Function.listener(this._onButtonEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__dK,c,this.__el);Event.addNativeListener(this.__dK,h,this.__el);Event.addNativeListener(this.__dK,e,this.__el);Event.addNativeListener(this.__dK,g,this.__el);Event.addNativeListener(this.__dK,b,this.__el);}
,_initMoveObserver:function(){this.__em=qx.lang.Function.listener(this._onMoveEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__dK,d,this.__em);Event.addNativeListener(this.__dK,m,this.__em);Event.addNativeListener(this.__dK,l,this.__em);}
,_initWheelObserver:function(){this.__en=qx.lang.Function.listener(this._onWheelEvent,this);var J=this.__er();qx.bom.Event.addNativeListener(J.target,J.type,this.__en);}
,_stopButtonObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__dK,c,this.__el);Event.removeNativeListener(this.__dK,h,this.__el);Event.removeNativeListener(this.__dK,e,this.__el);Event.removeNativeListener(this.__dK,g,this.__el);Event.removeNativeListener(this.__dK,b,this.__el);}
,_stopMoveObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__dK,d,this.__em);Event.removeNativeListener(this.__dK,m,this.__em);Event.removeNativeListener(this.__dK,l,this.__em);}
,_stopWheelObserver:function(){var K=this.__er();qx.bom.Event.removeNativeListener(K.target,K.type,this.__en);}
,_onMoveEvent:qx.event.GlobalError.observeMethod(function(L){this.__eq(L);}
),_onButtonEvent:qx.event.GlobalError.observeMethod(function(M){var N=M.type;var O=qx.bom.Event.getTarget(M);if(qx.core.Environment.get(a)==q||qx.core.Environment.get(a)==r){if(O&&O.nodeType==3){O=O.parentNode;}
;}
;if(this.__es){this.__es(M,N,O);}
;if(this.__eu){this.__eu(M,N,O);}
;this.__eq(M,N,O);if(this.__et){this.__et(M,N,O);}
;if(this.__ev){this.__ev(M,N,O);}
;this.__eo=N;}
),_onWheelEvent:qx.event.GlobalError.observeMethod(function(P){this.__eq(P,f);}
),__es:qx.core.Environment.select(a,{"webkit":function(Q,R,S){if(parseFloat(qx.core.Environment.get(t))<530){if(R==b){this.__eq(Q,h,S);}
;}
;}
,"default":null}),__et:qx.core.Environment.select(a,{"opera":function(T,U,V){if(U==h&&T.button==2){this.__eq(T,b,V);}
;}
,"default":null}),__eu:qx.core.Environment.select(a,{"mshtml":function(W,X,Y){if(W.target!==undefined){return;}
;if(X==h&&this.__eo==e){this.__eq(W,c,Y);}
else if(X==g){this.__eq(W,e,Y);}
;}
,"default":null}),__ev:qx.core.Environment.select(a,{"mshtml":null,"default":function(ba,bb,bc){switch(bb){case c:this.__ep=bc;break;case h:if(bc!==this.__ep){var bd=qx.dom.Hierarchy.getCommonParent(bc,this.__ep);this.__eq(ba,e,bd);}
;};}
})},destruct:function(){this._stopButtonObserver();this._stopMoveObserver();this._stopWheelObserver();this.__dz=this.__ce=this.__dK=this.__ep=null;}
,defer:function(be){qx.event.Registration.addHandler(be);}
});}
)();
(function(){var e="os.name",d="opera",c="engine.name",b="qx.event.type.Dom",a="osx";qx.Class.define(b,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(f,g){var g=qx.event.type.Native.prototype._cloneNativeEvent.call(this,f,g);g.shiftKey=f.shiftKey;g.ctrlKey=f.ctrlKey;g.altKey=f.altKey;g.metaKey=f.metaKey;return g;}
,getModifiers:function(){var i=0;var h=this._native;if(h.shiftKey){i|=qx.event.type.Dom.SHIFT_MASK;}
;if(h.ctrlKey){i|=qx.event.type.Dom.CTRL_MASK;}
;if(h.altKey){i|=qx.event.type.Dom.ALT_MASK;}
;if(h.metaKey){i|=qx.event.type.Dom.META_MASK;}
;return i;}
,isCtrlPressed:function(){return this._native.ctrlKey;}
,isShiftPressed:function(){return this._native.shiftKey;}
,isAltPressed:function(){return this._native.altKey;}
,isMetaPressed:function(){return this._native.metaKey;}
,isCtrlOrCommandPressed:function(){if(qx.core.Environment.get(e)==a&&qx.core.Environment.get(c)!=d){return this._native.metaKey;}
else {return this._native.ctrlKey;}
;}
}});}
)();
(function(){var j="click",i="contextmenu",h="qx.event.type.Mouse",g="browser.documentmode",f="browser.name",e="ie",d="none",c="middle",b="left",a="right";qx.Class.define(h,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(k,l){var l=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,k,l);l.button=k.button;l.clientX=k.clientX;l.clientY=k.clientY;l.pageX=k.pageX;l.pageY=k.pageY;l.screenX=k.screenX;l.screenY=k.screenY;l.wheelDelta=k.wheelDelta;l.wheelDeltaX=k.wheelDeltaX;l.wheelDeltaY=k.wheelDeltaY;l.detail=k.detail;l.axis=k.axis;l.wheelX=k.wheelX;l.wheelY=k.wheelY;l.HORIZONTAL_AXIS=k.HORIZONTAL_AXIS;l.srcElement=k.srcElement;l.target=k.target;return l;}
,__ew:{'0':b,'2':a,'1':c},__ex:{'1':b,'2':a,'4':c},stop:function(){this.stopPropagation();}
,getButton:function(){switch(this._type){case i:return a;case j:if(qx.core.Environment.get(f)===e&&qx.core.Environment.get(g)<9){return b;}
;default:if(this._native.target!==undefined){return this.__ew[this._native.button]||d;}
else {return this.__ex[this._native.button]||d;}
;};}
,isLeftPressed:function(){return this.getButton()===b;}
,isMiddlePressed:function(){return this.getButton()===c;}
,isRightPressed:function(){return this.getButton()===a;}
,getRelatedTarget:function(){return this._relatedTarget;}
,getViewportLeft:function(){return this._native.clientX;}
,getViewportTop:function(){return this._native.clientY;}
,getDocumentLeft:function(){if(this._native.pageX!==undefined){return this._native.pageX;}
else {var m=qx.dom.Node.getWindow(this._native.srcElement);return this._native.clientX+qx.bom.Viewport.getScrollLeft(m);}
;}
,getDocumentTop:function(){if(this._native.pageY!==undefined){return this._native.pageY;}
else {var n=qx.dom.Node.getWindow(this._native.srcElement);return this._native.clientY+qx.bom.Viewport.getScrollTop(n);}
;}
,getScreenLeft:function(){return this._native.screenX;}
,getScreenTop:function(){return this._native.screenY;}
}});}
)();
(function(){var l="engine.name",k="x",j="osx",i="win",h="qx.dynamicmousewheel",g="chrome",f="qx.event.type.MouseWheel",d="browser.name",c="y",b="os.name",a="engine.version";qx.Class.define(f,{extend:qx.event.type.Mouse,statics:{MAXSCROLL:null,MINSCROLL:null,FACTOR:1},members:{stop:function(){this.stopPropagation();this.preventDefault();}
,__ey:function(m){var n=Math.abs(m);if(qx.event.type.MouseWheel.MINSCROLL==null||qx.event.type.MouseWheel.MINSCROLL>n){qx.event.type.MouseWheel.MINSCROLL=n;this.__ez();}
;if(qx.event.type.MouseWheel.MAXSCROLL==null||qx.event.type.MouseWheel.MAXSCROLL<n){qx.event.type.MouseWheel.MAXSCROLL=n;this.__ez();}
;if(qx.event.type.MouseWheel.MAXSCROLL===n&&qx.event.type.MouseWheel.MINSCROLL===n){return 2*(m/n);}
;var o=qx.event.type.MouseWheel.MAXSCROLL-qx.event.type.MouseWheel.MINSCROLL;var p=(m/o)*Math.log(o)*qx.event.type.MouseWheel.FACTOR;return p<0?Math.min(p,-1):Math.max(p,1);}
,__ez:function(){var q=qx.event.type.MouseWheel.MAXSCROLL||0;var t=qx.event.type.MouseWheel.MINSCROLL||q;if(q<=t){return;}
;var r=q-t;var s=(q/r)*Math.log(r);if(s==0){s=1;}
;qx.event.type.MouseWheel.FACTOR=6/s;}
,getWheelDelta:function(u){var e=this._native;if(u===undefined){if(v===undefined){var v=-e.wheelDelta;if(e.wheelDelta===undefined){v=e.detail;}
;}
;return this.__eA(v);}
;if(u===k){var x=0;if(e.wheelDelta!==undefined){if(e.wheelDeltaX!==undefined){x=e.wheelDeltaX?this.__eA(-e.wheelDeltaX):0;}
;}
else {if(e.axis&&e.axis==e.HORIZONTAL_AXIS){x=this.__eA(e.detail);}
;}
;return x;}
;if(u===c){var y=0;if(e.wheelDelta!==undefined){if(e.wheelDeltaY!==undefined){y=e.wheelDeltaY?this.__eA(-e.wheelDeltaY):0;}
else {y=this.__eA(-e.wheelDelta);}
;}
else {if(!(e.axis&&e.axis==e.HORIZONTAL_AXIS)){y=this.__eA(e.detail);}
;}
;return y;}
;return 0;}
,__eA:function(w){if(qx.core.Environment.get(h)){return this.__ey(w);}
else {var z=qx.core.Environment.select(l,{"default":function(){return w/40;}
,"gecko":function(){return w;}
,"webkit":function(){if(qx.core.Environment.get(d)==g){if(qx.core.Environment.get(b)==j){return w/60;}
else {return w/120;}
;}
else {if(qx.core.Environment.get(b)==i){var A=120;if(parseFloat(qx.core.Environment.get(a))==533.16){A=1200;}
;}
else {A=40;if(parseFloat(qx.core.Environment.get(a))==533.16||parseFloat(qx.core.Environment.get(a))==533.17||parseFloat(qx.core.Environment.get(a))==533.18){A=1200;}
;}
;return w/A;}
;}
});return z.call(this);}
;}
}});}
)();
(function(){var k="PageUp",j="Escape",i="Enter",h="PrintScreen",g="7",f="Left",e="5",d="F5",c="Down",b="Up",bi="3",bh="Meta",bg="F11",bf="F6",be="PageDown",bd="CapsLock",bc="Insert",bb="F8",ba="Scroll",Y="Control",r="Tab",s="Shift",p="End",q="Pause",n="Unidentified",o="8",l="F1",m="F4",v="Home",w="qx.event.util.Keyboard",E="F2",C="6",M="F7",H="Apps",U="4",R="F12",y="Alt",X="2",W="NumLock",V="Delete",x="1",A="Backspace",B="F9",D="F10",F="Right",I="F3",O=",",T="-",t="+",u="os.name",z="A",L="Space",K="osx",J="/",Q="Z",P="*",G="cmd",N="Win",a="0",S="9";qx.Bootstrap.define(w,{statics:{specialCharCodeMap:{'8':A,'9':r,'13':i,'27':j,'32':L},numpadToCharCode:{'96':a.charCodeAt(0),'97':x.charCodeAt(0),'98':X.charCodeAt(0),'99':bi.charCodeAt(0),'100':U.charCodeAt(0),'101':e.charCodeAt(0),'102':C.charCodeAt(0),'103':g.charCodeAt(0),'104':o.charCodeAt(0),'105':S.charCodeAt(0),'106':P.charCodeAt(0),'107':t.charCodeAt(0),'109':T.charCodeAt(0),'110':O.charCodeAt(0),'111':J.charCodeAt(0)},keyCodeToIdentifierMap:{'16':s,'17':Y,'18':y,'20':bd,'224':bh,'37':f,'38':b,'39':F,'40':c,'33':k,'34':be,'35':p,'36':v,'45':bc,'46':V,'112':l,'113':E,'114':I,'115':m,'116':d,'117':bf,'118':M,'119':bb,'120':B,'121':D,'122':bg,'123':R,'144':W,'44':h,'145':ba,'19':q,'91':qx.core.Environment.get(u)==K?G:N,'92':N,'93':qx.core.Environment.get(u)==K?G:H},charCodeA:z.charCodeAt(0),charCodeZ:Q.charCodeAt(0),charCode0:a.charCodeAt(0),charCode9:S.charCodeAt(0),keyCodeToIdentifier:function(bj){if(this.isIdentifiableKeyCode(bj)){var bk=this.numpadToCharCode[bj];if(bk){return String.fromCharCode(bk);}
;return (this.keyCodeToIdentifierMap[bj]||this.specialCharCodeMap[bj]||String.fromCharCode(bj));}
else {return n;}
;}
,charCodeToIdentifier:function(bl){return this.specialCharCodeMap[bl]||String.fromCharCode(bl).toUpperCase();}
,isIdentifiableKeyCode:function(bm){if(bm>=this.charCodeA&&bm<=this.charCodeZ){return true;}
;if(bm>=this.charCode0&&bm<=this.charCode9){return true;}
;if(this.specialCharCodeMap[bm]){return true;}
;if(this.numpadToCharCode[bm]){return true;}
;if(this.isNonPrintableKeyCode(bm)){return true;}
;return false;}
,isNonPrintableKeyCode:function(bn){return this.keyCodeToIdentifierMap[bn]?true:false;}
,isValidKeyIdentifier:function(bo){if(this.identifierToKeyCodeMap[bo]){return true;}
;if(bo.length!=1){return false;}
;if(bo>=a&&bo<=S){return true;}
;if(bo>=z&&bo<=Q){return true;}
;switch(bo){case t:case T:case P:case J:return true;default:return false;};}
,isPrintableKeyIdentifier:function(bp){if(bp===L){return true;}
else {return this.identifierToKeyCodeMap[bp]?false:true;}
;}
},defer:function(bq,br){if(!bq.identifierToKeyCodeMap){bq.identifierToKeyCodeMap={};for(var bs in bq.keyCodeToIdentifierMap){bq.identifierToKeyCodeMap[bq.keyCodeToIdentifierMap[bs]]=parseInt(bs,10);}
;for(var bs in bq.specialCharCodeMap){bq.identifierToKeyCodeMap[bq.specialCharCodeMap[bs]]=parseInt(bs,10);}
;}
;}
});}
)();
(function(){var j="text",i="os.name",h="F11",g="PrintScreen",f="PageUp",e="gecko",d="F1",c="Left",b="F5",a="Down",V="Up",U="F3",T="Use qx.event.util.Keyboard.isValidKeyIdentifier instead.",S="Use qx.event.util.Keyboard.keyCodeToIdentifier instead.",R="F6",Q="Insert",P="F8",O="input",N="End",M="Delete",q="qx.event.handler.Keyboard",r="win",o="Use qx.event.util.Keyboard.isNonPrintableKeyCode instead.",p="Home",m="F2",n="Use qx.event.util.Keyboard.charCodeToIdentifier instead.",k="Use qx.event.util.Keyboard.isPrintableKeyIdentifier instead.",l="Right",s="F12",t="F4",A="PageDown",y="F7",E="Use qx.event.util.Keyboard.isIdentifiableKeyCode instead.",C="F9",I="F10",G="off",v="autoComplete",L="Enter",K="NumLock",J="useraction",u="keyinput",w="mshtml",x="webkit",z="engine.version",B="keyup",D="keypress",F="engine.name",H="keydown";qx.Class.define(q,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(W){qx.core.Object.call(this);this.__dz=W;this.__ce=W.getWindow();if((qx.core.Environment.get(F)==e)){this.__dK=this.__ce;}
else {this.__dK=this.__ce.document.documentElement;}
;this.__eB={};this._initKeyObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(X){qx.log.Logger.deprecatedMethodWarning(arguments.callee,T);return qx.event.util.Keyboard.isValidKeyIdentifier(X);}
,isPrintableKeyIdentifier:function(Y){qx.log.Logger.deprecatedMethodWarning(arguments.callee,k);return qx.event.util.Keyboard.isPrintableKeyIdentifier(Y);}
},members:{__eC:null,__dz:null,__ce:null,__dK:null,__eB:null,__eD:null,__eE:null,__eF:null,canHandleEvent:function(ba,bb){}
,registerEvent:function(bc,bd,be){}
,unregisterEvent:function(bf,bg,bh){}
,_fireInputEvent:function(bi,bj){var bk=this.__eG();if(bk&&bk.offsetWidth!=0){var event=qx.event.Registration.createEvent(u,qx.event.type.KeyInput,[bi,bk,bj]);this.__dz.dispatchEvent(bk,event);}
;if(this.__ce){qx.event.Registration.fireEvent(this.__ce,J,qx.event.type.Data,[u]);}
;}
,_fireSequenceEvent:function(bl,bm,bn){var bo=this.__eG();var bp=bl.keyCode;var event=qx.event.Registration.createEvent(bm,qx.event.type.KeySequence,[bl,bo,bn]);this.__dz.dispatchEvent(bo,event);if(qx.core.Environment.get(F)==w||qx.core.Environment.get(F)==x){if(bm==H&&event.getDefaultPrevented()){if(!qx.event.util.Keyboard.isNonPrintableKeyCode(bp)&&!this._emulateKeyPress[bp]){this._fireSequenceEvent(bl,D,bn);}
;}
;}
;if(this.__ce){qx.event.Registration.fireEvent(this.__ce,J,qx.event.type.Data,[bm]);}
;}
,__eG:function(){var bq=this.__dz.getHandler(qx.event.handler.Focus);var br=bq.getActive();if(!br||br.offsetWidth==0){br=bq.getFocus();}
;if(!br||br.offsetWidth==0){br=this.__dz.getWindow().document.body;}
;return br;}
,_initKeyObserver:function(){this.__eC=qx.lang.Function.listener(this.__eH,this);this.__eF=qx.lang.Function.listener(this.__eJ,this);var Event=qx.bom.Event;Event.addNativeListener(this.__dK,B,this.__eC);Event.addNativeListener(this.__dK,H,this.__eC);Event.addNativeListener(this.__dK,D,this.__eF);}
,_stopKeyObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__dK,B,this.__eC);Event.removeNativeListener(this.__dK,H,this.__eC);Event.removeNativeListener(this.__dK,D,this.__eF);for(var bt in (this.__eE||{})){var bs=this.__eE[bt];Event.removeNativeListener(bs.target,D,bs.callback);}
;delete (this.__eE);}
,__eH:qx.event.GlobalError.observeMethod(qx.core.Environment.select(F,{"mshtml":function(bu){bu=window.event||bu;var bx=bu.keyCode;var bv=0;var bw=bu.type;if(!(this.__eB[bx]==H&&bw==H)){this._idealKeyHandler(bx,bv,bw,bu);}
;if(bw==H){if(qx.event.util.Keyboard.isNonPrintableKeyCode(bx)||this._emulateKeyPress[bx]){this._idealKeyHandler(bx,bv,D,bu);}
;}
;this.__eB[bx]=bw;}
,"gecko":function(by){var bA=0;var bC=by.keyCode;var bB=by.type;var bz=qx.event.util.Keyboard;if(qx.core.Environment.get(i)==r){var bD=bC?bz.keyCodeToIdentifier(bC):bz.charCodeToIdentifier(bA);if(!(this.__eB[bD]==H&&bB==H)){this._idealKeyHandler(bC,bA,bB,by);}
;this.__eB[bD]=bB;}
else {this._idealKeyHandler(bC,bA,bB,by);}
;this.__eI(by.target,bB,bC);}
,"webkit":function(bE){var bH=0;var bF=0;var bG=bE.type;if(parseFloat(qx.core.Environment.get(z))<525.13){if(bG==B||bG==H){bH=this._charCode2KeyCode[bE.charCode]||bE.keyCode;}
else {if(this._charCode2KeyCode[bE.charCode]){bH=this._charCode2KeyCode[bE.charCode];}
else {bF=bE.charCode;}
;}
;this._idealKeyHandler(bH,bF,bG,bE);}
else {bH=bE.keyCode;this._idealKeyHandler(bH,bF,bG,bE);if(bG==H){if(qx.event.util.Keyboard.isNonPrintableKeyCode(bH)||this._emulateKeyPress[bH]){this._idealKeyHandler(bH,bF,D,bE);}
;}
;this.__eB[bH]=bG;}
;}
,"opera":function(bI){this.__eD=bI.keyCode;this._idealKeyHandler(bI.keyCode,0,bI.type,bI);}
})),__eI:qx.core.Environment.select(F,{"gecko":function(bJ,bK,bL){if(bK===H&&(bL==33||bL==34||bL==38||bL==40)&&bJ.type==j&&bJ.tagName.toLowerCase()===O&&bJ.getAttribute(v)!==G){if(!this.__eE){this.__eE={};}
;var bN=qx.core.ObjectRegistry.toHashCode(bJ);if(this.__eE[bN]){return;}
;var self=this;this.__eE[bN]={target:bJ,callback:function(bO){qx.bom.Event.stopPropagation(bO);self.__eJ(bO);}
};var bM=qx.event.GlobalError.observeMethod(this.__eE[bN].callback);qx.bom.Event.addNativeListener(bJ,D,bM);}
;}
,"default":null}),__eJ:qx.event.GlobalError.observeMethod(qx.core.Environment.select(F,{"mshtml":function(bP){bP=window.event||bP;if(this._charCode2KeyCode[bP.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bP.keyCode],0,bP.type,bP);}
else {this._idealKeyHandler(0,bP.keyCode,bP.type,bP);}
;}
,"gecko":function(bQ){var bR=bQ.charCode;var bS=bQ.type;this._idealKeyHandler(bQ.keyCode,bR,bS,bQ);}
,"webkit":function(bT){if(parseFloat(qx.core.Environment.get(z))<525.13){var bW=0;var bU=0;var bV=bT.type;if(bV==B||bV==H){bW=this._charCode2KeyCode[bT.charCode]||bT.keyCode;}
else {if(this._charCode2KeyCode[bT.charCode]){bW=this._charCode2KeyCode[bT.charCode];}
else {bU=bT.charCode;}
;}
;this._idealKeyHandler(bW,bU,bV,bT);}
else {if(this._charCode2KeyCode[bT.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bT.keyCode],0,bT.type,bT);}
else {this._idealKeyHandler(0,bT.keyCode,bT.type,bT);}
;}
;}
,"opera":function(bX){var ca=bX.keyCode;var bY=bX.type;if(ca!=this.__eD){this._idealKeyHandler(0,this.__eD,bY,bX);}
else {if(qx.event.util.Keyboard.keyCodeToIdentifierMap[bX.keyCode]){this._idealKeyHandler(bX.keyCode,0,bX.type,bX);}
else {this._idealKeyHandler(0,bX.keyCode,bX.type,bX);}
;}
;}
})),_idealKeyHandler:function(cb,cc,cd,ce){var cf;if(cb||(!cb&&!cc)){cf=qx.event.util.Keyboard.keyCodeToIdentifier(cb);this._fireSequenceEvent(ce,cd,cf);}
else {cf=qx.event.util.Keyboard.charCodeToIdentifier(cc);this._fireSequenceEvent(ce,D,cf);this._fireInputEvent(ce,cc);}
;}
,_emulateKeyPress:qx.core.Environment.select(F,{"mshtml":{'8':true,'9':true},"webkit":{'8':true,'9':true,'27':true},"default":{}}),_isNonPrintableKeyCode:function(cg){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);return qx.event.util.Keyboard.isNonPrintableKeyCode(cg);}
,_isIdentifiableKeyCode:function(ch){qx.log.Logger.deprecatedMethodWarning(arguments.callee,E);return qx.event.util.Keyboard.isIdentifiableKeyCode(ch);}
,_keyCodeToIdentifier:function(ci){qx.log.Logger.deprecatedMethodWarning(arguments.callee,S);return qx.event.util.Keyboard.keyCodeToIdentifier(ci);}
,_charCodeToIdentifier:function(cj){qx.log.Logger.deprecatedMethodWarning(arguments.callee,n);return qx.event.util.Keyboard.charCodeToIdentifier(cj);}
,_identifierToKeyCode:function(ck){return qx.event.util.Keyboard.identifierToKeyCodeMap[ck]||ck.charCodeAt(0);}
},destruct:function(){this._stopKeyObserver();this.__eD=this.__dz=this.__ce=this.__dK=this.__eB=null;}
,defer:function(cl,cm){qx.event.Registration.addHandler(cl);if((qx.core.Environment.get(F)==w)){cm._charCode2KeyCode={'13':13,'27':27};}
else if((qx.core.Environment.get(F)==x)){if(parseFloat(qx.core.Environment.get(z))<525.13){cm._charCode2KeyCode={'63289':cm._identifierToKeyCode(K),'63276':cm._identifierToKeyCode(f),'63277':cm._identifierToKeyCode(A),'63275':cm._identifierToKeyCode(N),'63273':cm._identifierToKeyCode(p),'63234':cm._identifierToKeyCode(c),'63232':cm._identifierToKeyCode(V),'63235':cm._identifierToKeyCode(l),'63233':cm._identifierToKeyCode(a),'63272':cm._identifierToKeyCode(M),'63302':cm._identifierToKeyCode(Q),'63236':cm._identifierToKeyCode(d),'63237':cm._identifierToKeyCode(m),'63238':cm._identifierToKeyCode(U),'63239':cm._identifierToKeyCode(t),'63240':cm._identifierToKeyCode(b),'63241':cm._identifierToKeyCode(R),'63242':cm._identifierToKeyCode(y),'63243':cm._identifierToKeyCode(P),'63244':cm._identifierToKeyCode(C),'63245':cm._identifierToKeyCode(I),'63246':cm._identifierToKeyCode(h),'63247':cm._identifierToKeyCode(s),'63248':cm._identifierToKeyCode(g),'3':cm._identifierToKeyCode(L),'12':cm._identifierToKeyCode(K),'13':cm._identifierToKeyCode(L)};}
else {cm._charCode2KeyCode={'13':13,'27':27};}
;}
;}
});}
)();
(function(){var a="qx.event.type.KeyInput";qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){qx.event.type.Dom.prototype.init.call(this,b,c,null,true,true);this._charCode=d;return this;}
,clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);f._charCode=this._charCode;return f;}
,getCharCode:function(){return this._charCode;}
,getChar:function(){return String.fromCharCode(this._charCode);}
}});}
)();
(function(){var a="qx.event.type.KeySequence";qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){qx.event.type.Dom.prototype.init.call(this,b,c,null,true,true);this._keyCode=b.keyCode;this._identifier=d;return this;}
,clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);f._keyCode=this._keyCode;f._identifier=this._identifier;return f;}
,getKeyIdentifier:function(){return this._identifier;}
,getKeyCode:function(){return this._keyCode;}
,isPrintable:function(){return qx.event.util.Keyboard.isPrintableKeyIdentifier(this._identifier);}
}});}
)();
(function(){var j="qx.event.handler.Focus",i="_applyFocus",h="deactivate",g="textarea",f="_applyActive",e='character',d="input",c="qxSelectable",b="tabIndex",a="off",z="activate",y="mshtml",x="qxKeepFocus",w="qxKeepActive",v="DOMFocusIn",u="draggesture",t="focusin",s="focusout",r="selectstart",q="DOMFocusOut",o="on",p="blur",m="focus",n="mousedown",k="mouseup",l="engine.name";qx.Class.define(j,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(A){qx.core.Object.call(this);this._manager=A;this._window=A.getWindow();this._document=this._window.document;this._root=this._document.documentElement;this._body=this._document.body;this._initObserver();}
,properties:{active:{apply:f,nullable:true},focus:{apply:i,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Environment.select("engine.name",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__eK:null,__eL:null,__eM:null,__eN:null,__eO:null,__eP:null,__eQ:null,__eR:null,__eS:null,__eT:null,canHandleEvent:function(B,C){}
,registerEvent:function(D,E,F){}
,unregisterEvent:function(G,H,I){}
,focus:function(J){if((qx.core.Environment.get(l)==y)){window.setTimeout(function(){try{J.focus();var K=qx.bom.Selection.get(J);if(K.length==0){var L=J.createTextRange();L.moveStart(e,J.value.length);L.collapse();L.select();}
;}
catch(M){}
;}
,0);}
else {try{J.focus();}
catch(N){}
;}
;this.setFocus(J);this.setActive(J);}
,activate:function(O){this.setActive(O);}
,blur:function(P){try{P.blur();}
catch(Q){}
;if(this.getActive()===P){this.resetActive();}
;if(this.getFocus()===P){this.resetFocus();}
;}
,deactivate:function(R){if(this.getActive()===R){this.resetActive();}
;}
,tryActivate:function(S){var T=this.__fi(S);if(T){this.setActive(T);}
;}
,__eq:function(U,V,W,X){var ba=qx.event.Registration;var Y=ba.createEvent(W,qx.event.type.Focus,[U,V,X]);ba.dispatchEvent(U,Y);}
,_windowFocused:true,__eU:function(){if(this._windowFocused){this._windowFocused=false;this.__eq(this._window,null,p,false);}
;}
,__eV:function(){if(!this._windowFocused){this._windowFocused=true;this.__eq(this._window,null,m,false);}
;}
,_initObserver:qx.core.Environment.select(l,{"gecko":function(){this.__eK=qx.lang.Function.listener(this.__fc,this);this.__eL=qx.lang.Function.listener(this.__fd,this);this.__eM=qx.lang.Function.listener(this.__fb,this);this.__eN=qx.lang.Function.listener(this.__fa,this);this.__eO=qx.lang.Function.listener(this.__eW,this);qx.bom.Event.addNativeListener(this._document,n,this.__eK,true);qx.bom.Event.addNativeListener(this._document,k,this.__eL,true);qx.bom.Event.addNativeListener(this._window,m,this.__eM,true);qx.bom.Event.addNativeListener(this._window,p,this.__eN,true);qx.bom.Event.addNativeListener(this._window,u,this.__eO,true);}
,"mshtml":function(){this.__eK=qx.lang.Function.listener(this.__fc,this);this.__eL=qx.lang.Function.listener(this.__fd,this);this.__eQ=qx.lang.Function.listener(this.__eX,this);this.__eR=qx.lang.Function.listener(this.__eY,this);this.__eP=qx.lang.Function.listener(this.__ff,this);qx.bom.Event.addNativeListener(this._document,n,this.__eK);qx.bom.Event.addNativeListener(this._document,k,this.__eL);qx.bom.Event.addNativeListener(this._document,t,this.__eQ);qx.bom.Event.addNativeListener(this._document,s,this.__eR);qx.bom.Event.addNativeListener(this._document,r,this.__eP);}
,"webkit":function(){this.__eK=qx.lang.Function.listener(this.__fc,this);this.__eL=qx.lang.Function.listener(this.__fd,this);this.__eR=qx.lang.Function.listener(this.__eY,this);this.__eM=qx.lang.Function.listener(this.__fb,this);this.__eN=qx.lang.Function.listener(this.__fa,this);this.__eP=qx.lang.Function.listener(this.__ff,this);qx.bom.Event.addNativeListener(this._document,n,this.__eK,true);qx.bom.Event.addNativeListener(this._document,k,this.__eL,true);qx.bom.Event.addNativeListener(this._document,r,this.__eP,false);qx.bom.Event.addNativeListener(this._window,q,this.__eR,true);qx.bom.Event.addNativeListener(this._window,m,this.__eM,true);qx.bom.Event.addNativeListener(this._window,p,this.__eN,true);}
,"opera":function(){this.__eK=qx.lang.Function.listener(this.__fc,this);this.__eL=qx.lang.Function.listener(this.__fd,this);this.__eQ=qx.lang.Function.listener(this.__eX,this);this.__eR=qx.lang.Function.listener(this.__eY,this);qx.bom.Event.addNativeListener(this._document,n,this.__eK,true);qx.bom.Event.addNativeListener(this._document,k,this.__eL,true);qx.bom.Event.addNativeListener(this._window,v,this.__eQ,true);qx.bom.Event.addNativeListener(this._window,q,this.__eR,true);}
}),_stopObserver:qx.core.Environment.select(l,{"gecko":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__eK,true);qx.bom.Event.removeNativeListener(this._document,k,this.__eL,true);qx.bom.Event.removeNativeListener(this._window,m,this.__eM,true);qx.bom.Event.removeNativeListener(this._window,p,this.__eN,true);qx.bom.Event.removeNativeListener(this._window,u,this.__eO,true);}
,"mshtml":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__eK);qx.bom.Event.removeNativeListener(this._document,k,this.__eL);qx.bom.Event.removeNativeListener(this._document,t,this.__eQ);qx.bom.Event.removeNativeListener(this._document,s,this.__eR);qx.bom.Event.removeNativeListener(this._document,r,this.__eP);}
,"webkit":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__eK,true);qx.bom.Event.removeNativeListener(this._document,k,this.__eL,true);qx.bom.Event.removeNativeListener(this._document,r,this.__eP,false);qx.bom.Event.removeNativeListener(this._window,q,this.__eR,true);qx.bom.Event.removeNativeListener(this._window,m,this.__eM,true);qx.bom.Event.removeNativeListener(this._window,p,this.__eN,true);}
,"opera":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__eK,true);qx.bom.Event.removeNativeListener(this._document,k,this.__eL,true);qx.bom.Event.removeNativeListener(this._window,v,this.__eQ,true);qx.bom.Event.removeNativeListener(this._window,q,this.__eR,true);}
}),__eW:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"gecko":function(bb){var bc=qx.bom.Event.getTarget(bb);if(!this.__fj(bc)){qx.bom.Event.preventDefault(bb);}
;}
,"default":null})),__eX:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bd){this.__eV();var bf=qx.bom.Event.getTarget(bd);var be=this.__fh(bf);if(be){this.setFocus(be);}
;this.tryActivate(bf);}
,"opera":function(bg){var bh=qx.bom.Event.getTarget(bg);if(bh==this._document||bh==this._window){this.__eV();if(this.__eS){this.setFocus(this.__eS);delete this.__eS;}
;if(this.__eT){this.setActive(this.__eT);delete this.__eT;}
;}
else {this.setFocus(bh);this.tryActivate(bh);if(!this.__fj(bh)){bh.selectionStart=0;bh.selectionEnd=0;}
;}
;}
,"default":null})),__eY:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bi){var bj=qx.bom.Event.getRelatedTarget(bi);if(bj==null){this.__eU();this.resetFocus();this.resetActive();}
;}
,"webkit":function(bk){var bl=qx.bom.Event.getTarget(bk);if(bl===this.getFocus()){this.resetFocus();}
;if(bl===this.getActive()){this.resetActive();}
;}
,"opera":function(bm){var bn=qx.bom.Event.getTarget(bm);if(bn==this._document){this.__eU();this.__eS=this.getFocus();this.__eT=this.getActive();this.resetFocus();this.resetActive();}
else {if(bn===this.getFocus()){this.resetFocus();}
;if(bn===this.getActive()){this.resetActive();}
;}
;}
,"default":null})),__fa:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"gecko":function(bo){var bp=qx.bom.Event.getTarget(bo);if(bp===this._window||bp===this._document){this.__eU();this.resetActive();this.resetFocus();}
;}
,"webkit":function(bq){var br=qx.bom.Event.getTarget(bq);if(br===this._window||br===this._document){this.__eU();this.__eS=this.getFocus();this.__eT=this.getActive();this.resetActive();this.resetFocus();}
;}
,"default":null})),__fb:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"gecko":function(bs){var bt=qx.bom.Event.getTarget(bs);if(bt===this._window||bt===this._document){this.__eV();bt=this._body;}
;this.setFocus(bt);this.tryActivate(bt);}
,"webkit":function(bu){var bv=qx.bom.Event.getTarget(bu);if(bv===this._window||bv===this._document){this.__eV();if(this.__eS){this.setFocus(this.__eS);delete this.__eS;}
;if(this.__eT){this.setActive(this.__eT);delete this.__eT;}
;}
else {this.setFocus(bv);this.tryActivate(bv);}
;}
,"default":null})),__fc:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bw){var by=qx.bom.Event.getTarget(bw);var bx=this.__fh(by);if(bx){if(!this.__fj(by)){by.unselectable=o;try{document.selection.empty();}
catch(bz){}
;try{bx.focus();}
catch(bA){}
;}
;}
else {qx.bom.Event.preventDefault(bw);if(!this.__fj(by)){by.unselectable=o;}
;}
;}
,"webkit|gecko":function(bB){var bD=qx.bom.Event.getTarget(bB);var bC=this.__fh(bD);if(bC){this.setFocus(bC);}
else {qx.bom.Event.preventDefault(bB);}
;}
,"opera":function(bE){var bH=qx.bom.Event.getTarget(bE);var bF=this.__fh(bH);if(!this.__fj(bH)){qx.bom.Event.preventDefault(bE);if(bF){var bG=this.getFocus();if(bG&&bG.selectionEnd){bG.selectionStart=0;bG.selectionEnd=0;bG.blur();}
;if(bF){this.setFocus(bF);}
;}
;}
else if(bF){this.setFocus(bF);}
;}
,"default":null})),__fd:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bI){var bJ=qx.bom.Event.getTarget(bI);if(bJ.unselectable){bJ.unselectable=a;}
;this.tryActivate(this.__fe(bJ));}
,"gecko":function(bK){var bL=qx.bom.Event.getTarget(bK);while(bL&&bL.offsetWidth===undefined){bL=bL.parentNode;}
;if(bL){this.tryActivate(bL);}
;}
,"webkit|opera":function(bM){var bN=qx.bom.Event.getTarget(bM);this.tryActivate(this.__fe(bN));}
,"default":null})),__fe:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml|webkit":function(bO){var bP=this.getFocus();if(bP&&bO!=bP&&(bP.nodeName.toLowerCase()===d||bP.nodeName.toLowerCase()===g)){bO=bP;}
;return bO;}
,"default":function(bQ){return bQ;}
})),__ff:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml|webkit":function(bR){var bS=qx.bom.Event.getTarget(bR);if(!this.__fj(bS)){qx.bom.Event.preventDefault(bR);}
;}
,"default":null})),__fg:function(bT){var bU=qx.bom.element.Attribute.get(bT,b);if(bU>=1){return true;}
;var bV=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;if(bU>=0&&bV[bT.tagName]){return true;}
;return false;}
,__fh:function(bW){while(bW&&bW.nodeType===1){if(bW.getAttribute(x)==o){return null;}
;if(this.__fg(bW)){return bW;}
;bW=bW.parentNode;}
;return this._body;}
,__fi:function(bX){var bY=bX;while(bX&&bX.nodeType===1){if(bX.getAttribute(w)==o){return null;}
;bX=bX.parentNode;}
;return bY;}
,__fj:function(ca){while(ca&&ca.nodeType===1){var cb=ca.getAttribute(c);if(cb!=null){return cb===o;}
;ca=ca.parentNode;}
;return true;}
,_applyActive:function(cc,cd){if(cd){this.__eq(cd,cc,h,true);}
;if(cc){this.__eq(cc,cd,z,true);}
;}
,_applyFocus:function(ce,cf){if(cf){this.__eq(cf,ce,s,true);}
;if(ce){this.__eq(ce,cf,t,true);}
;if(cf){this.__eq(cf,ce,p,false);}
;if(ce){this.__eq(ce,cf,m,false);}
;}
},destruct:function(){this._stopObserver();this._manager=this._window=this._document=this._root=this._body=this.__fk=null;}
,defer:function(cg){qx.event.Registration.addHandler(cg);var ch=cg.FOCUSABLE_ELEMENTS;for(var ci in ch){ch[ci.toUpperCase()]=1;}
;}
});}
)();
(function(){var k="qx.bom.Selection",j="button",i="#text",h="body",g='character',f="input",e="StartToStart",d="textarea",c="EndToEnd",b="character",a="engine.name";qx.Class.define(k,{statics:{getSelectionObject:qx.core.Environment.select(a,{"mshtml":function(l){return l.selection;}
,"default":function(m){return qx.dom.Node.getWindow(m).getSelection();}
}),get:qx.core.Environment.select(a,{"mshtml":function(n){var o=qx.bom.Range.get(qx.dom.Node.getDocument(n));return o.text;}
,"default":function(p){if(this.__fl(p)){return p.value.substring(p.selectionStart,p.selectionEnd);}
else {return this.getSelectionObject(qx.dom.Node.getDocument(p)).toString();}
;}
}),getLength:qx.core.Environment.select(a,{"mshtml":function(q){var s=this.get(q);var r=qx.util.StringSplit.split(s,/\r\n/);return s.length-(r.length-1);}
,"opera":function(t){var y,w,u;if(this.__fl(t)){var x=t.selectionStart;var v=t.selectionEnd;y=t.value.substring(x,v);w=v-x;}
else {y=qx.bom.Selection.get(t);w=y.length;}
;u=qx.util.StringSplit.split(y,/\r\n/);return w-(u.length-1);}
,"default":function(z){if(this.__fl(z)){return z.selectionEnd-z.selectionStart;}
else {return this.get(z).length;}
;}
}),getStart:qx.core.Environment.select(a,{"mshtml":function(A){if(this.__fl(A)){var F=qx.bom.Range.get();if(!A.contains(F.parentElement())){return -1;}
;var G=qx.bom.Range.get(A);var E=A.value.length;G.moveToBookmark(F.getBookmark());G.moveEnd(g,E);return E-G.text.length;}
else {var G=qx.bom.Range.get(A);var C=G.parentElement();var H=qx.bom.Range.get();try{H.moveToElementText(C);}
catch(J){return 0;}
;var B=qx.bom.Range.get(qx.dom.Node.getBodyElement(A));B.setEndPoint(e,G);B.setEndPoint(c,H);if(H.compareEndPoints(e,B)==0){return 0;}
;var D;var I=0;while(true){D=B.moveStart(b,-1);if(H.compareEndPoints(e,B)==0){break;}
;if(D==0){break;}
else {I++;}
;}
;return ++I;}
;}
,"gecko|webkit":function(K){if(this.__fl(K)){return K.selectionStart;}
else {var M=qx.dom.Node.getDocument(K);var L=this.getSelectionObject(M);if(L.anchorOffset<L.focusOffset){return L.anchorOffset;}
else {return L.focusOffset;}
;}
;}
,"default":function(N){if(this.__fl(N)){return N.selectionStart;}
else {return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(N)).anchorOffset;}
;}
}),getEnd:qx.core.Environment.select(a,{"mshtml":function(O){if(this.__fl(O)){var T=qx.bom.Range.get();if(!O.contains(T.parentElement())){return -1;}
;var U=qx.bom.Range.get(O);var S=O.value.length;U.moveToBookmark(T.getBookmark());U.moveStart(g,-S);return U.text.length;}
else {var U=qx.bom.Range.get(O);var Q=U.parentElement();var V=qx.bom.Range.get();try{V.moveToElementText(Q);}
catch(X){return 0;}
;var S=V.text.length;var P=qx.bom.Range.get(qx.dom.Node.getBodyElement(O));P.setEndPoint(c,U);P.setEndPoint(e,V);if(V.compareEndPoints(c,P)==0){return S-1;}
;var R;var W=0;while(true){R=P.moveEnd(b,1);if(V.compareEndPoints(c,P)==0){break;}
;if(R==0){break;}
else {W++;}
;}
;return S-(++W);}
;}
,"gecko|webkit":function(Y){if(this.__fl(Y)){return Y.selectionEnd;}
else {var bb=qx.dom.Node.getDocument(Y);var ba=this.getSelectionObject(bb);if(ba.focusOffset>ba.anchorOffset){return ba.focusOffset;}
else {return ba.anchorOffset;}
;}
;}
,"default":function(bc){if(this.__fl(bc)){return bc.selectionEnd;}
else {return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bc)).focusOffset;}
;}
}),__fl:function(bd){return qx.dom.Node.isElement(bd)&&(bd.nodeName.toLowerCase()==f||bd.nodeName.toLowerCase()==d);}
,set:qx.core.Environment.select(a,{"mshtml":function(be,bf,bg){var bh;if(qx.dom.Node.isDocument(be)){be=be.body;}
;if(qx.dom.Node.isElement(be)||qx.dom.Node.isText(be)){switch(be.nodeName.toLowerCase()){case f:case d:case j:if(bg===undefined){bg=be.value.length;}
;if(bf>=0&&bf<=be.value.length&&bg>=0&&bg<=be.value.length){bh=qx.bom.Range.get(be);bh.collapse(true);bh.moveStart(b,bf);bh.moveEnd(b,bg-bf);bh.select();return true;}
;break;case i:if(bg===undefined){bg=be.nodeValue.length;}
;if(bf>=0&&bf<=be.nodeValue.length&&bg>=0&&bg<=be.nodeValue.length){bh=qx.bom.Range.get(qx.dom.Node.getBodyElement(be));bh.moveToElementText(be.parentNode);bh.collapse(true);bh.moveStart(b,bf);bh.moveEnd(b,bg-bf);bh.select();return true;}
;break;default:if(bg===undefined){bg=be.childNodes.length-1;}
;if(be.childNodes[bf]&&be.childNodes[bg]){bh=qx.bom.Range.get(qx.dom.Node.getBodyElement(be));bh.moveToElementText(be.childNodes[bf]);bh.collapse(true);var bi=qx.bom.Range.get(qx.dom.Node.getBodyElement(be));bi.moveToElementText(be.childNodes[bg]);bh.setEndPoint(c,bi);bh.select();return true;}
;};}
;return false;}
,"default":function(bj,bk,bl){var bp=bj.nodeName.toLowerCase();if(qx.dom.Node.isElement(bj)&&(bp==f||bp==d)){if(bl===undefined){bl=bj.value.length;}
;if(bk>=0&&bk<=bj.value.length&&bl>=0&&bl<=bj.value.length){bj.focus();bj.select();bj.setSelectionRange(bk,bl);return true;}
;}
else {var bn=false;var bo=qx.dom.Node.getWindow(bj).getSelection();var bm=qx.bom.Range.get(bj);if(qx.dom.Node.isText(bj)){if(bl===undefined){bl=bj.length;}
;if(bk>=0&&bk<bj.length&&bl>=0&&bl<=bj.length){bn=true;}
;}
else if(qx.dom.Node.isElement(bj)){if(bl===undefined){bl=bj.childNodes.length-1;}
;if(bk>=0&&bj.childNodes[bk]&&bl>=0&&bj.childNodes[bl]){bn=true;}
;}
else if(qx.dom.Node.isDocument(bj)){bj=bj.body;if(bl===undefined){bl=bj.childNodes.length-1;}
;if(bk>=0&&bj.childNodes[bk]&&bl>=0&&bj.childNodes[bl]){bn=true;}
;}
;;if(bn){if(!bo.isCollapsed){bo.collapseToStart();}
;bm.setStart(bj,bk);if(qx.dom.Node.isText(bj)){bm.setEnd(bj,bl);}
else {bm.setEndAfter(bj.childNodes[bl]);}
;if(bo.rangeCount>0){bo.removeAllRanges();}
;bo.addRange(bm);return true;}
;}
;return false;}
}),setAll:function(bq){return qx.bom.Selection.set(bq,0);}
,clear:qx.core.Environment.select(a,{"mshtml":function(br){var bs=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(br));var bt=qx.bom.Range.get(br);var parent=bt.parentElement();var bu=qx.bom.Range.get(qx.dom.Node.getDocument(br));if(parent==bu.parentElement()&&parent==br){bs.empty();}
;}
,"default":function(bv){var bx=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bv));var bz=bv.nodeName.toLowerCase();if(qx.dom.Node.isElement(bv)&&(bz==f||bz==d)){bv.setSelectionRange(0,0);qx.bom.Element.blur(bv);}
else if(qx.dom.Node.isDocument(bv)||bz==h){bx.collapse(bv.body?bv.body:bv,0);}
else {var by=qx.bom.Range.get(bv);if(!by.collapsed){var bA;var bw=by.commonAncestorContainer;if(qx.dom.Node.isElement(bv)&&qx.dom.Node.isText(bw)){bA=bw.parentNode;}
else {bA=bw;}
;if(bA==bv){bx.collapse(bv,0);}
;}
;}
;}
})}});}
)();
(function(){var l="qx.bom.Range",k="text",j="engine.name",i="password",h="file",g="submit",f="reset",e="textarea",d="input",c="hidden",a="body",b="button";qx.Class.define(l,{statics:{get:qx.core.Environment.select(j,{"mshtml":function(m){if(qx.dom.Node.isElement(m)){switch(m.nodeName.toLowerCase()){case d:switch(m.type){case k:case i:case c:case b:case f:case h:case g:return m.createTextRange();break;default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();};break;case e:case a:case b:return m.createTextRange();break;default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();};}
else {if(m==null){m=window;}
;return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();}
;}
,"default":function(n){var o=qx.dom.Node.getDocument(n);var p=qx.bom.Selection.getSelectionObject(o);if(p.rangeCount>0){return p.getRangeAt(0);}
else {return o.createRange();}
;}
})}});}
)();
(function(){var j="m",h="g",g="^",f="qx.util.StringSplit",e="i",d="$(?!\\s)",c="[object RegExp]",b="y",a="";qx.Class.define(f,{statics:{split:function(k,l,m){if(Object.prototype.toString.call(l)!==c){return String.prototype.split.call(k,l,m);}
;var t=[],n=0,r=(l.ignoreCase?e:a)+(l.multiline?j:a)+(l.sticky?b:a),l=RegExp(l.source,r+h),q,u,o,p,s=/()??/.exec(a)[1]===undefined;k=k+a;if(!s){q=RegExp(g+l.source+d,r);}
;if(m===undefined||+m<0){m=Infinity;}
else {m=Math.floor(+m);if(!m){return [];}
;}
;while(u=l.exec(k)){o=u.index+u[0].length;if(o>n){t.push(k.slice(n,u.index));if(!s&&u.length>1){u[0].replace(q,function(){for(var i=1;i<arguments.length-2;i++){if(arguments[i]===undefined){u[i]=undefined;}
;}
;}
);}
;if(u.length>1&&u.index<k.length){Array.prototype.push.apply(t,u.slice(1));}
;p=u[0].length;n=o;if(t.length>=m){break;}
;}
;if(l.lastIndex===u.index){l.lastIndex++;}
;}
;if(n===k.length){if(p||!l.test(a)){t.push(a);}
;}
else {t.push(k.slice(n));}
;return t.length>m?t.slice(0,m):t;}
}});}
)();
(function(){var k="engine.name",j="swipe",i="webkit",h="tap",g="x",f="y",e="qx.event.handler.TouchCore",d="touchcancel",c="touchmove",b="touchend",a="touchstart";qx.Bootstrap.define(e,{extend:Object,statics:{TAP_MAX_DISTANCE:qx.core.Environment.get("os.name")!="android"?10:40,SWIPE_DIRECTION:{x:["left","right"],y:["up","down"]},SWIPE_MIN_DISTANCE:qx.core.Environment.get("os.name")!="android"?11:41,SWIPE_MIN_VELOCITY:0},construct:function(l,m){this.__fm=l;this.__fn=m;this._initTouchObserver();}
,members:{__fm:null,__fn:null,__fo:null,__fp:null,__fq:null,__fr:null,__fs:null,__ft:null,_initTouchObserver:function(){this.__fo=qx.lang.Function.listener(this._onTouchEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__fm,a,this.__fo);Event.addNativeListener(this.__fm,c,this.__fo);Event.addNativeListener(this.__fm,b,this.__fo);Event.addNativeListener(this.__fm,d,this.__fo);}
,_stopTouchObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__fm,a,this.__fo);Event.removeNativeListener(this.__fm,c,this.__fo);Event.removeNativeListener(this.__fm,b,this.__fo);Event.removeNativeListener(this.__fm,d,this.__fo);}
,_onTouchEvent:function(n){this._commonTouchEventHandler(n);}
,_commonTouchEventHandler:function(o,p){var p=p||o.type;if(p==a){this.__fp=this._getTarget(o);}
;this._fireEvent(o,p);this.__fu(o,p);}
,_getTarget:function(q){var r=qx.bom.Event.getTarget(q);if((qx.core.Environment.get(k)==i)){if(r&&r.nodeType==3){r=r.parentNode;}
;}
;return r;}
,_fireEvent:function(s,t,u){if(!u){u=this._getTarget(s);}
;var t=t||s.type;if(u&&u.nodeType&&this.__fn){this.__fn.emit(t,s);}
;}
,__fu:function(v,w,x){if(!x){x=this._getTarget(v);}
;var w=w||v.type;if(w==a){this.__fv(v,x);}
else if(w==c){this.__fw(v,x);}
else if(w==b){this.__fx(v,x);}
;;}
,__fv:function(y,z){var A=y.changedTouches[0];this.__fq=A.screenX;this.__fr=A.screenY;this.__fs=new Date().getTime();this.__ft=y.changedTouches.length===1;}
,__fw:function(B,C){if(this.__ft&&B.changedTouches.length>1){this.__ft=false;}
;}
,__fx:function(D,E){if(this.__ft){var F=D.changedTouches[0];var I={x:F.screenX-this.__fq,y:F.screenY-this.__fr};var J=qx.event.handler.TouchCore;var G;if(this.__fp==E&&Math.abs(I.x)<=J.TAP_MAX_DISTANCE&&Math.abs(I.y)<=J.TAP_MAX_DISTANCE){if(qx.event&&qx.event.type&&qx.event.type.Tap){G=qx.event.type.Tap;}
;this._fireEvent(D,h,E,G);}
else {var H=this.__fy(D,E,I);if(H){if(qx.event&&qx.event.type&&qx.event.type.Swipe){G=qx.event.type.Swipe;}
;D.swipe=H;this._fireEvent(D,j,E,G);}
;}
;}
;}
,__fy:function(K,L,M){var Q=qx.event.handler.TouchCore;var R=new Date().getTime()-this.__fs;var T=(Math.abs(M.x)>=Math.abs(M.y))?g:f;var N=M[T];var O=Q.SWIPE_DIRECTION[T][N<0?0:1];var S=(R!==0)?N/R:0;var P=null;if(Math.abs(S)>=Q.SWIPE_MIN_VELOCITY&&Math.abs(N)>=Q.SWIPE_MIN_DISTANCE){P={startTime:this.__fs,duration:R,axis:T,direction:O,distance:N,velocity:S};}
;return P;}
,dispose:function(){this._stopTouchObserver();this.__fp=this.__fm=this.__fn=null;}
}});}
)();
(function(){var c="touchcancel",b="qx.event.type.Touch",a="touchend";qx.Class.define(b,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(d,e){var e=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,d,e);e.pageX=d.pageX;e.pageY=d.pageY;e.offsetX=d.offsetX;e.offsetY=d.offsetY;e.layerX=(d.offsetX||d.layerX);e.layerY=(d.offsetY||d.layerY);e.scale=d.scale;e.rotation=d.rotation;e.srcElement=d.srcElement;e.targetTouches=[];for(var i=0;i<d.targetTouches.length;i++){e.targetTouches[i]=d.targetTouches[i];}
;e.changedTouches=[];for(i=0;i<d.changedTouches.length;i++){e.changedTouches[i]=d.changedTouches[i];}
;e.touches=[];for(i=0;i<d.touches.length;i++){e.touches[i]=d.touches[i];}
;return e;}
,stop:function(){this.stopPropagation();}
,getAllTouches:function(){return this._native.touches;}
,getTargetTouches:function(){return this._native.targetTouches;}
,getChangedTargetTouches:function(){return this._native.changedTouches;}
,isMultiTouch:function(){return this.__fA().length>1;}
,getScale:function(){return this._native.scale;}
,getRotation:function(){return this._native.rotation;}
,getDocumentLeft:function(f){return this.__fz(f).pageX;}
,getDocumentTop:function(g){return this.__fz(g).pageY;}
,getScreenLeft:function(h){return this.__fz(h).screenX;}
,getScreenTop:function(j){return this.__fz(j).screenY;}
,getViewportLeft:function(k){return this.__fz(k).clientX;}
,getViewportTop:function(l){return this.__fz(l).clientY;}
,getIdentifier:function(m){return this.__fz(m).identifier;}
,__fz:function(n){n=n==null?0:n;return this.__fA()[n];}
,__fA:function(){var o=(this._isTouchEnd()?this.getChangedTargetTouches():this.getTargetTouches());return o;}
,_isTouchEnd:function(){return (this.getType()==a||this.getType()==c);}
}});}
)();
(function(){var a="qx.event.type.Tap";qx.Class.define(a,{extend:qx.event.type.Touch,members:{_isTouchEnd:function(){return true;}
}});}
)();
(function(){var a="qx.event.type.Swipe";qx.Class.define(a,{extend:qx.event.type.Touch,members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Touch.prototype._cloneNativeEvent.call(this,b,c);c.swipe=b.swipe;return c;}
,_isTouchEnd:function(){return true;}
,getStartTime:function(){return this._native.swipe.startTime;}
,getDuration:function(){return this._native.swipe.duration;}
,getAxis:function(){return this._native.swipe.axis;}
,getDirection:function(){return this._native.swipe.direction;}
,getVelocity:function(){return this._native.swipe.velocity;}
,getDistance:function(){return this._native.swipe.distance;}
}});}
)();
(function(){var l="event.pointer",k="onhashchange",j="event.help",i="event.touch",h="opera",g="event.hashchange",f="onhelp",e="pointerEvents",d="documentMode",c="qx.bom.client.Event",a="ontouchstart",b="mshtml";qx.Bootstrap.define(c,{statics:{getTouch:function(){return (a in window);}
,getPointer:function(){if(e in document.documentElement.style){var m=qx.bom.client.Engine.getName();return m!=h&&m!=b;}
;return false;}
,getHelp:function(){return (f in document);}
,getHashChange:function(){var n=qx.bom.client.Engine.getName();var o=k in window;return (n!==b&&o)||(n===b&&d in document&&document.documentMode>=8&&o);}
},defer:function(p){qx.core.Environment.add(i,p.getTouch);qx.core.Environment.add(l,p.getPointer);qx.core.Environment.add(j,p.getHelp);qx.core.Environment.add(g,p.getHashChange);}
});}
)();
(function(){var e="resize",d="landscape",c="portrait",b="qx.event.handler.Orientation",a="orientationchange";qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(f){qx.core.Object.call(this);this.__dz=f;this.__ce=f.getWindow();this._initObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{orientationchange:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__dz:null,__ce:null,__fB:null,_currentOrientation:null,__fC:null,canHandleEvent:function(g,h){}
,registerEvent:function(i,j,k){}
,unregisterEvent:function(l,m,n){}
,_initObserver:function(){this.__fC=qx.lang.Function.listener(this._onNative,this);this.__fB=qx.bom.Event.supportsEvent(this.__ce,a)?a:e;var Event=qx.bom.Event;Event.addNativeListener(this.__ce,this.__fB,this.__fC);}
,_stopObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__ce,this.__fB,this.__fC);}
,_onNative:qx.event.GlobalError.observeMethod(function(o){var q=qx.bom.Viewport;var p=q.getOrientation(o.target);if(this._currentOrientation!=p){this._currentOrientation=p;var r=q.isLandscape(o.target)?d:c;qx.event.Registration.fireEvent(this.__ce,a,qx.event.type.Orientation,[p,r]);}
;}
)},destruct:function(){this._stopObserver();this.__dz=this.__ce=null;}
,defer:function(s){qx.event.Registration.addHandler(s);}
});}
)();
(function(){var c="landscape",b="qx.event.type.Orientation",a="portrait";qx.Class.define(b,{extend:qx.event.type.Event,members:{__fD:null,__fE:null,init:function(d,e){qx.event.type.Event.prototype.init.call(this,false,false);this.__fD=d;this.__fE=e;return this;}
,clone:function(f){var g=qx.event.type.Event.prototype.clone.call(this,f);g.__fD=this.__fD;g.__fE=this.__fE;return g;}
,getOrientation:function(){return this.__fD;}
,isLandscape:function(){return this.__fE==c;}
,isPortrait:function(){return this.__fE==a;}
}});}
)();
(function(){var o="mshtml",n="engine.name",m="qx.event.handler.Touch",l="useraction",k="touchmove",j="qx.mobile.nativescroll",i="dispose",h="touchstart",g="mouseup",f="touchend",b="mousedown",d="mousemove",c="event.touch",a="qx.mobile.emulatetouch";qx.Class.define(m,{extend:qx.event.handler.TouchCore,implement:qx.event.IEventHandler,construct:function(p){this.__dz=p;this.__ce=p.getWindow();this.__dK=this.__ce.document;qx.event.handler.TouchCore.apply(this,[this.__dK]);this._initMouseObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{touchstart:1,touchmove:1,touchend:1,touchcancel:1,tap:1,swipe:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT,IGNORE_CAN_HANDLE:true,MOUSE_TO_TOUCH_MAPPING:{"mousedown":"touchstart","mousemove":"touchmove","mouseup":"touchend"}},members:{__fF:null,__dz:null,__ce:null,__dK:null,__fG:false,canHandleEvent:function(q,r){}
,registerEvent:function(s,t,u){}
,unregisterEvent:function(v,w,x){}
,_fireEvent:function(y,z,A,B){if(!A){A=this._getTarget(y);}
;var z=z||y.type;if(A&&A.nodeType){qx.event.Registration.fireEvent(A,z,B||qx.event.type.Touch,[y,A,null,true,true]);}
;qx.event.Registration.fireEvent(this.__ce,l,qx.event.type.Data,[z]);}
,__fH:qx.core.Environment.select(a,{"true":function(C){var D=C.type;var F=qx.event.handler.Touch.MOUSE_TO_TOUCH_MAPPING;if(F[D]){D=F[D];if(D==h&&this.__fI(C)){this.__fG=true;}
else if(D==f){this.__fG=false;}
;var G=this.__fJ(C);var E=(D==f?[]:[G]);C.touches=E;C.targetTouches=E;C.changedTouches=[G];}
;return D;}
,"default":qx.lang.Function.empty}),__fI:qx.core.Environment.select(a,{"true":function(H){if((qx.core.Environment.get(n)==o)){var I=1;}
else {var I=0;}
;return H.button==I;}
,"default":qx.lang.Function.empty}),__fJ:qx.core.Environment.select(a,{"true":function(J){var K=this._getTarget(J);return {clientX:J.clientX,clientY:J.clientY,screenX:J.screenX,screenY:J.screenY,pageX:J.pageX,pageY:J.pageY,identifier:1,target:K};}
,"default":qx.lang.Function.empty}),_initMouseObserver:qx.core.Environment.select(a,{"true":function(){if(!qx.core.Environment.get(c)){this.__fF=qx.lang.Function.listener(this._onMouseEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__dK,b,this.__fF);Event.addNativeListener(this.__dK,d,this.__fF);Event.addNativeListener(this.__dK,g,this.__fF);}
;}
,"default":qx.lang.Function.empty}),_stopMouseObserver:qx.core.Environment.select(a,{"true":function(){if(!qx.core.Environment.get(c)){var Event=qx.bom.Event;Event.removeNativeListener(this.__dK,b,this.__fF);Event.removeNativeListener(this.__dK,d,this.__fF);Event.removeNativeListener(this.__dK,g,this.__fF);}
;}
,"default":qx.lang.Function.empty}),_onTouchEvent:qx.event.GlobalError.observeMethod(function(L){this._commonTouchEventHandler(L);}
),_onMouseEvent:qx.core.Environment.select(a,{"true":qx.event.GlobalError.observeMethod(function(M){if(!qx.core.Environment.get(c)){if(M.type==d&&!this.__fG){return;}
;var N=this.__fH(M);this._commonTouchEventHandler(M,N);}
;}
),"default":qx.lang.Function.empty}),dispose:function(){this.__fK(i);this._stopMouseObserver();this.__dz=this.__ce=this.__dK=null;}
,__fK:function(O,P){qx.event.handler.TouchCore.prototype[O].apply(this,P||[]);}
},defer:function(Q){qx.event.Registration.addHandler(Q);if(qx.core.Environment.get(c)){if(qx.core.Environment.get(j)==false){document.addEventListener(k,function(e){e.preventDefault();}
);}
;qx.event.Registration.getManager(document).getHandler(Q);}
;}
});}
)();
(function(){var m="select-multiple",k="value",j="select",h="qx.event.handler.Input",g="checked",f="blur",d="keydown",c="propertychange",b="browser.version",a="browser.documentmode",A="opera",z="keyup",y="mshtml",x="keypress",w="engine.version",v="radio",u="checkbox",t="text",s="textarea",r="password",p="change",q="engine.name",n="input";qx.Class.define(h,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);this._onChangeCheckedWrapper=qx.lang.Function.listener(this._onChangeChecked,this);this._onChangeValueWrapper=qx.lang.Function.listener(this._onChangeValue,this);this._onInputWrapper=qx.lang.Function.listener(this._onInput,this);this._onPropertyWrapper=qx.lang.Function.listener(this._onProperty,this);if((qx.core.Environment.get(q)==A)){this._onKeyDownWrapper=qx.lang.Function.listener(this._onKeyDown,this);this._onKeyUpWrapper=qx.lang.Function.listener(this._onKeyUp,this);this._onBlurWrapper=qx.lang.Function.listener(this._onBlur,this);}
;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{input:1,change:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{__fL:false,__fM:null,__fN:null,__fO:null,canHandleEvent:function(B,C){var D=B.tagName.toLowerCase();if(C===n&&(D===n||D===s)){return true;}
;if(C===p&&(D===n||D===s||D===j)){return true;}
;return false;}
,registerEvent:function(E,F,G){if(qx.core.Environment.get(q)==y&&(qx.core.Environment.get(w)<9||(qx.core.Environment.get(w)>=9&&qx.core.Environment.get(a)<9))){if(!E.__fP){var H=E.tagName.toLowerCase();var I=E.type;if(I===t||I===r||H===s||I===u||I===v){qx.bom.Event.addNativeListener(E,c,this._onPropertyWrapper);}
;if(I!==u&&I!==v){qx.bom.Event.addNativeListener(E,p,this._onChangeValueWrapper);}
;if(I===t||I===r){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,E);qx.bom.Event.addNativeListener(E,x,this._onKeyPressWrapped);}
;E.__fP=true;}
;}
else {if(F===n){this.__fQ(E);}
else if(F===p){if(E.type===v||E.type===u){qx.bom.Event.addNativeListener(E,p,this._onChangeCheckedWrapper);}
else {qx.bom.Event.addNativeListener(E,p,this._onChangeValueWrapper);}
;if((qx.core.Environment.get(q)==A)||(qx.core.Environment.get(q)==y)){if(E.type===t||E.type===r){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,E);qx.bom.Event.addNativeListener(E,x,this._onKeyPressWrapped);}
;}
;}
;}
;}
,__fQ:qx.core.Environment.select(q,{"mshtml":function(J){if(qx.core.Environment.get(w)>=9&&qx.core.Environment.get(a)>=9){qx.bom.Event.addNativeListener(J,n,this._onInputWrapper);if(J.type===t||J.type===r||J.type===s){this._inputFixWrapper=qx.lang.Function.listener(this._inputFix,this,J);qx.bom.Event.addNativeListener(J,z,this._inputFixWrapper);}
;}
;}
,"webkit":function(K){var L=K.tagName.toLowerCase();if(parseFloat(qx.core.Environment.get(w))<532&&L==s){qx.bom.Event.addNativeListener(K,x,this._onInputWrapper);}
;qx.bom.Event.addNativeListener(K,n,this._onInputWrapper);}
,"opera":function(M){qx.bom.Event.addNativeListener(M,z,this._onKeyUpWrapper);qx.bom.Event.addNativeListener(M,d,this._onKeyDownWrapper);qx.bom.Event.addNativeListener(M,f,this._onBlurWrapper);qx.bom.Event.addNativeListener(M,n,this._onInputWrapper);}
,"default":function(N){qx.bom.Event.addNativeListener(N,n,this._onInputWrapper);}
}),unregisterEvent:function(O,P){if(qx.core.Environment.get(q)==y&&qx.core.Environment.get(w)<9&&qx.core.Environment.get(a)<9){if(O.__fP){var Q=O.tagName.toLowerCase();var R=O.type;if(R===t||R===r||Q===s||R===u||R===v){qx.bom.Event.removeNativeListener(O,c,this._onPropertyWrapper);}
;if(R!==u&&R!==v){qx.bom.Event.removeNativeListener(O,p,this._onChangeValueWrapper);}
;if(R===t||R===r){qx.bom.Event.removeNativeListener(O,x,this._onKeyPressWrapped);}
;try{delete O.__fP;}
catch(S){O.__fP=null;}
;}
;}
else {if(P===n){this.__fR(O);}
else if(P===p){if(O.type===v||O.type===u){qx.bom.Event.removeNativeListener(O,p,this._onChangeCheckedWrapper);}
else {qx.bom.Event.removeNativeListener(O,p,this._onChangeValueWrapper);}
;}
;if((qx.core.Environment.get(q)==A)||(qx.core.Environment.get(q)==y)){if(O.type===t||O.type===r){qx.bom.Event.removeNativeListener(O,x,this._onKeyPressWrapped);}
;}
;}
;}
,__fR:qx.core.Environment.select(q,{"mshtml":function(T){if(qx.core.Environment.get(w)>=9&&qx.core.Environment.get(a)>=9){qx.bom.Event.removeNativeListener(T,n,this._onInputWrapper);if(T.type===t||T.type===r||T.type===s){qx.bom.Event.removeNativeListener(T,z,this._inputFixWrapper);}
;}
;}
,"webkit":function(U){var V=U.tagName.toLowerCase();if(parseFloat(qx.core.Environment.get(w))<532&&V==s){qx.bom.Event.removeNativeListener(U,x,this._onInputWrapper);}
;qx.bom.Event.removeNativeListener(U,n,this._onInputWrapper);}
,"opera":function(W){qx.bom.Event.removeNativeListener(W,z,this._onKeyUpWrapper);qx.bom.Event.removeNativeListener(W,d,this._onKeyDownWrapper);qx.bom.Event.removeNativeListener(W,f,this._onBlurWrapper);qx.bom.Event.removeNativeListener(W,n,this._onInputWrapper);}
,"default":function(X){qx.bom.Event.removeNativeListener(X,n,this._onInputWrapper);}
}),_onKeyPress:qx.core.Environment.select(q,{"mshtml|opera":function(e,Y){if(e.keyCode===13){if(Y.value!==this.__fN){this.__fN=Y.value;qx.event.Registration.fireEvent(Y,p,qx.event.type.Data,[Y.value]);}
;}
;}
,"default":null}),_inputFix:qx.core.Environment.select(q,{"mshtml":function(e,ba){if(e.keyCode===46||e.keyCode===8){if(ba.value!==this.__fO){this.__fO=ba.value;qx.event.Registration.fireEvent(ba,n,qx.event.type.Data,[ba.value]);}
;}
;}
,"default":null}),_onKeyDown:qx.core.Environment.select(q,{"opera":function(e){if(e.keyCode===13){this.__fL=true;}
;}
,"default":null}),_onKeyUp:qx.core.Environment.select(q,{"opera":function(e){if(e.keyCode===13){this.__fL=false;}
;}
,"default":null}),_onBlur:qx.core.Environment.select(q,{"opera":function(e){if(this.__fM&&qx.core.Environment.get(b)<10.6){window.clearTimeout(this.__fM);}
;}
,"default":null}),_onInput:qx.event.GlobalError.observeMethod(function(e){var bc=qx.bom.Event.getTarget(e);var bb=bc.tagName.toLowerCase();if(!this.__fL||bb!==n){if((qx.core.Environment.get(q)==A)&&qx.core.Environment.get(b)<10.6){this.__fM=window.setTimeout(function(){qx.event.Registration.fireEvent(bc,n,qx.event.type.Data,[bc.value]);}
,0);}
else {qx.event.Registration.fireEvent(bc,n,qx.event.type.Data,[bc.value]);}
;}
;}
),_onChangeValue:qx.event.GlobalError.observeMethod(function(e){var be=qx.bom.Event.getTarget(e);var bd=be.value;if(be.type===m){var bd=[];for(var i=0,o=be.options,l=o.length;i<l;i++){if(o[i].selected){bd.push(o[i].value);}
;}
;}
;qx.event.Registration.fireEvent(be,p,qx.event.type.Data,[bd]);}
),_onChangeChecked:qx.event.GlobalError.observeMethod(function(e){var bf=qx.bom.Event.getTarget(e);if(bf.type===v){if(bf.checked){qx.event.Registration.fireEvent(bf,p,qx.event.type.Data,[bf.value]);}
;}
else {qx.event.Registration.fireEvent(bf,p,qx.event.type.Data,[bf.checked]);}
;}
),_onProperty:qx.core.Environment.select(q,{"mshtml":qx.event.GlobalError.observeMethod(function(e){var bg=qx.bom.Event.getTarget(e);var bh=e.propertyName;if(bh===k&&(bg.type===t||bg.type===r||bg.tagName.toLowerCase()===s)){if(!bg.$$inValueSet){qx.event.Registration.fireEvent(bg,n,qx.event.type.Data,[bg.value]);}
;}
else if(bh===g){if(bg.type===u){qx.event.Registration.fireEvent(bg,p,qx.event.type.Data,[bg.checked]);}
else if(bg.checked){qx.event.Registration.fireEvent(bg,p,qx.event.type.Data,[bg.value]);}
;}
;}
),"default":function(){}
})},defer:function(bi){qx.event.Registration.addHandler(bi);}
});}
)();
(function(){var a="qx.event.handler.Capture";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(b,c){}
,registerEvent:function(d,e,f){}
,unregisterEvent:function(g,h,i){}
},defer:function(j){qx.event.Registration.addHandler(j);}
});}
)();
(function(){var k="mousedown",j="qxDraggable",i="Escape",h="drag",g="Unsupported data type: ",f="drop",d="qxDroppable",c="qx.event.handler.DragDrop",b="This method must not be used outside the drop event listener!",a="!",H="droprequest",G="dragstart",F="dragchange",E="dragleave",D="dragover",C="left",B="Please use a droprequest listener to the drag source to fill the manager with data!",A="blur",z="mouseout",y="keydown",r="Control",s="Shift",p="mousemove",q="move",n="mouseover",o="Alt",l="keyup",m="mouseup",t="keypress",u="dragend",w="on",v="copy",x="alias";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(I){qx.core.Object.call(this);this.__dz=I;this.__dK=I.getWindow().document.documentElement;this.__dz.addListener(this.__dK,k,this._onMouseDown,this);this.__gd();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__dz:null,__dK:null,__fS:null,__fT:null,__fU:null,__fV:null,__fW:null,__e:null,__fX:null,__fY:null,__ga:false,__gb:0,__gc:0,canHandleEvent:function(J,K){}
,registerEvent:function(L,M,N){}
,unregisterEvent:function(O,P,Q){}
,addType:function(R){this.__fU[R]=true;}
,addAction:function(S){this.__fV[S]=true;}
,supportsType:function(T){return !!this.__fU[T];}
,supportsAction:function(U){return !!this.__fV[U];}
,getData:function(V){if(!this.__gj||!this.__fS){throw new Error(b);}
;if(!this.__fU[V]){throw new Error(g+V+a);}
;if(!this.__e[V]){this.__fX=V;this.__eq(H,this.__fT,this.__fS,false);}
;if(!this.__e[V]){throw new Error(B);}
;return this.__e[V]||null;}
,getCurrentAction:function(){return this.__fY;}
,addData:function(W,X){this.__e[W]=X;}
,getCurrentType:function(){return this.__fX;}
,isSessionActive:function(){return this.__ga;}
,__gd:function(){this.__fU={};this.__fV={};this.__fW={};this.__e={};}
,__ge:function(){if(this.__fT==null){return;}
;var bb=this.__fV;var Y=this.__fW;var ba=null;if(this.__gj){if(Y.Shift&&Y.Control&&bb.alias){ba=x;}
else if(Y.Shift&&Y.Alt&&bb.copy){ba=v;}
else if(Y.Shift&&bb.move){ba=q;}
else if(Y.Alt&&bb.alias){ba=x;}
else if(Y.Control&&bb.copy){ba=v;}
else if(bb.move){ba=q;}
else if(bb.copy){ba=v;}
else if(bb.alias){ba=x;}
;;;;;;;}
;if(ba!=this.__fY){this.__fY=ba;this.__eq(F,this.__fT,this.__fS,false);}
;}
,__eq:function(bc,bd,be,bf,bg){var bi=qx.event.Registration;var bh=bi.createEvent(bc,qx.event.type.Drag,[bf,bg]);if(bd!==be){bh.setRelatedTarget(be);}
;return bi.dispatchEvent(bd,bh);}
,__gf:function(bj){while(bj&&bj.nodeType==1){if(bj.getAttribute(j)==w){return bj;}
;bj=bj.parentNode;}
;return null;}
,__gg:function(bk){while(bk&&bk.nodeType==1){if(bk.getAttribute(d)==w){return bk;}
;bk=bk.parentNode;}
;return null;}
,__gh:function(){this.__fT=null;this.__dz.removeListener(this.__dK,p,this._onMouseMove,this,true);this.__dz.removeListener(this.__dK,m,this._onMouseUp,this,true);qx.event.Registration.removeListener(window,A,this._onWindowBlur,this);this.__gd();}
,__gi:function(){if(this.__ga){this.__dz.removeListener(this.__dK,n,this._onMouseOver,this,true);this.__dz.removeListener(this.__dK,z,this._onMouseOut,this,true);this.__dz.removeListener(this.__dK,y,this._onKeyDown,this,true);this.__dz.removeListener(this.__dK,l,this._onKeyUp,this,true);this.__dz.removeListener(this.__dK,t,this._onKeyPress,this,true);this.__eq(u,this.__fT,this.__fS,false);this.__ga=false;}
;this.__gj=false;this.__fS=null;this.__gh();}
,__gj:false,_onWindowBlur:function(e){this.__gi();}
,_onKeyDown:function(e){var bl=e.getKeyIdentifier();switch(bl){case o:case r:case s:if(!this.__fW[bl]){this.__fW[bl]=true;this.__ge();}
;};}
,_onKeyUp:function(e){var bm=e.getKeyIdentifier();switch(bm){case o:case r:case s:if(this.__fW[bm]){this.__fW[bm]=false;this.__ge();}
;};}
,_onKeyPress:function(e){var bn=e.getKeyIdentifier();switch(bn){case i:this.__gi();};}
,_onMouseDown:function(e){if(this.__ga||e.getButton()!==C){return;}
;var bo=this.__gf(e.getTarget());if(bo){this.__gb=e.getDocumentLeft();this.__gc=e.getDocumentTop();this.__fT=bo;this.__dz.addListener(this.__dK,p,this._onMouseMove,this,true);this.__dz.addListener(this.__dK,m,this._onMouseUp,this,true);qx.event.Registration.addListener(window,A,this._onWindowBlur,this);}
;}
,_onMouseUp:function(e){if(this.__gj){this.__eq(f,this.__fS,this.__fT,false,e);}
;if(this.__ga){e.stopPropagation();}
;this.__gi();}
,_onMouseMove:function(e){if(this.__ga){if(!this.__eq(h,this.__fT,this.__fS,true,e)){this.__gi();}
;}
else {if(Math.abs(e.getDocumentLeft()-this.__gb)>3||Math.abs(e.getDocumentTop()-this.__gc)>3){if(this.__eq(G,this.__fT,this.__fS,true,e)){this.__ga=true;this.__dz.addListener(this.__dK,n,this._onMouseOver,this,true);this.__dz.addListener(this.__dK,z,this._onMouseOut,this,true);this.__dz.addListener(this.__dK,y,this._onKeyDown,this,true);this.__dz.addListener(this.__dK,l,this._onKeyUp,this,true);this.__dz.addListener(this.__dK,t,this._onKeyPress,this,true);var bp=this.__fW;bp.Control=e.isCtrlPressed();bp.Shift=e.isShiftPressed();bp.Alt=e.isAltPressed();this.__ge();}
else {this.__eq(u,this.__fT,this.__fS,false);this.__gh();}
;}
;}
;}
,_onMouseOver:function(e){var bq=e.getTarget();var br=this.__gg(bq);if(br&&br!=this.__fS){this.__gj=this.__eq(D,br,this.__fT,true,e);this.__fS=br;this.__ge();}
;}
,_onMouseOut:function(e){var bt=this.__gg(e.getTarget());var bs=this.__gg(e.getRelatedTarget());if(bt&&bt!==bs&&bt==this.__fS){this.__eq(E,this.__fS,bs,false,e);this.__fS=null;this.__gj=false;qx.event.Timer.once(this.__ge,this,0);}
;}
},destruct:function(){this.__fT=this.__fS=this.__dz=this.__dK=this.__fU=this.__fV=this.__fW=this.__e=null;}
,defer:function(bu){qx.event.Registration.addHandler(bu);}
});}
)();
(function(){var a="qx.event.type.Drag";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c){qx.event.type.Event.prototype.init.call(this,true,b);if(c){this._native=c.getNativeEvent()||null;this._originalTarget=c.getTarget()||null;}
else {this._native=null;this._originalTarget=null;}
;return this;}
,clone:function(d){var e=qx.event.type.Event.prototype.clone.call(this,d);e._native=this._native;return e;}
,getDocumentLeft:function(){if(this._native==null){return 0;}
;if(this._native.pageX!==undefined){return this._native.pageX;}
else {var f=qx.dom.Node.getWindow(this._native.srcElement);return this._native.clientX+qx.bom.Viewport.getScrollLeft(f);}
;}
,getDocumentTop:function(){if(this._native==null){return 0;}
;if(this._native.pageY!==undefined){return this._native.pageY;}
else {var g=qx.dom.Node.getWindow(this._native.srcElement);return this._native.clientY+qx.bom.Viewport.getScrollTop(g);}
;}
,getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);}
,addType:function(h){this.getManager().addType(h);}
,addAction:function(i){this.getManager().addAction(i);}
,supportsType:function(j){return this.getManager().supportsType(j);}
,supportsAction:function(k){return this.getManager().supportsAction(k);}
,addData:function(l,m){this.getManager().addData(l,m);}
,getData:function(n){return this.getManager().getData(n);}
,getCurrentType:function(){return this.getManager().getCurrentType();}
,getCurrentAction:function(){return this.getManager().getCurrentAction();}
}});}
)();
(function(){var c="qx.event.handler.Offline",b="offline",a="online";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);this.__dz=d;this.__ce=d.getWindow();this._initObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{online:true,offline:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__dz:null,__ce:null,__fC:null,canHandleEvent:function(e,f){}
,registerEvent:function(g,h,i){}
,unregisterEvent:function(j,k,l){}
,_initObserver:function(){this.__fC=qx.lang.Function.listener(this._onNative,this);qx.bom.Event.addNativeListener(this.__ce,b,this.__fC);qx.bom.Event.addNativeListener(this.__ce,a,this.__fC);}
,_stopObserver:function(){qx.bom.Event.removeNativeListener(this.__ce,b,this.__fC);qx.bom.Event.removeNativeListener(this.__ce,a,this.__fC);}
,_onNative:qx.event.GlobalError.observeMethod(function(m){qx.event.Registration.fireEvent(this.__ce,m.type,qx.event.type.Event,[]);}
),isOnline:function(){return !!this.__ce.navigator.onLine;}
},destruct:function(){this.__dz=null;this._stopObserver();delete qx.event.handler.Appear.__instances[this.$$hash];}
,defer:function(n){qx.event.Registration.addHandler(n);}
});}
)();
(function(){var f="Use qx.dom.Element.create instead",e="Use qx.dom.Element.getHelperElement instead",d="qx.bom.Element",c="Use qx.dom.Element.empty instead",b="mshtml",a="engine.name";qx.Class.define(d,{statics:{allowCreationWithMarkup:function(g){qx.log.Logger.deprecatedMethodWarning(arguments.callee);return qx.dom.Element._allowCreationWithMarkup(g);}
,getHelperElement:function(h){qx.log.Logger.deprecatedMethodWarning(arguments.callee,e);return qx.dom.Element.getHelperElement(h);}
,create:function(name,k,m){qx.log.Logger.deprecatedMethodWarning(arguments.callee,f);return qx.dom.Element.create(name,k,m);}
,empty:function(n){qx.log.Logger.deprecatedMethodWarning(arguments.callee,c);return qx.dom.Element.empty(n);}
,addListener:function(o,p,q,self,r){return qx.event.Registration.addListener(o,p,q,self,r);}
,removeListener:function(s,t,u,self,v){return qx.event.Registration.removeListener(s,t,u,self,v);}
,removeListenerById:function(w,x){return qx.event.Registration.removeListenerById(w,x);}
,hasListener:function(y,z,A){return qx.event.Registration.hasListener(y,z,A);}
,focus:function(B){qx.event.Registration.getManager(B).getHandler(qx.event.handler.Focus).focus(B);}
,blur:function(C){qx.event.Registration.getManager(C).getHandler(qx.event.handler.Focus).blur(C);}
,activate:function(D){qx.event.Registration.getManager(D).getHandler(qx.event.handler.Focus).activate(D);}
,deactivate:function(E){qx.event.Registration.getManager(E).getHandler(qx.event.handler.Focus).deactivate(E);}
,capture:function(F,G){qx.event.Registration.getManager(F).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(F,G);}
,releaseCapture:function(H){qx.event.Registration.getManager(H).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(H);}
,matchesSelector:function(I,J){if(J){return qx.bom.Selector.query(J,I.parentNode).length>0;}
else {return false;}
;}
,clone:function(K,L){var O;if(L||((qx.core.Environment.get(a)==b)&&!qx.xml.Document.isXmlDocument(K))){var S=qx.event.Registration.getManager(K);var M=qx.dom.Hierarchy.getDescendants(K);M.push(K);}
;if((qx.core.Environment.get(a)==b)){for(var i=0,l=M.length;i<l;i++){S.toggleAttachedEvents(M[i],false);}
;}
;var O=K.cloneNode(true);if((qx.core.Environment.get(a)==b)){for(var i=0,l=M.length;i<l;i++){S.toggleAttachedEvents(M[i],true);}
;}
;if(L===true){var V=qx.dom.Hierarchy.getDescendants(O);V.push(O);var N,Q,U,P;for(var i=0,T=M.length;i<T;i++){U=M[i];N=S.serializeListeners(U);if(N.length>0){Q=V[i];for(var j=0,R=N.length;j<R;j++){P=N[j];S.addListener(Q,P.type,P.handler,P.self,P.capture);}
;}
;}
;}
;return O;}
}});}
)();
(function(){var i="mshtml",h="blur",g="focus",f="click",e="qx.event.dispatch.MouseCapture",d="capture",c="scroll",b="engine.name",a="losecapture";qx.Class.define(e,{extend:qx.event.dispatch.AbstractBubbling,construct:function(j,k){qx.event.dispatch.AbstractBubbling.call(this,j);this.__ce=j.getWindow();this.__cg=k;j.addListener(this.__ce,h,this.releaseCapture,this);j.addListener(this.__ce,g,this.releaseCapture,this);j.addListener(this.__ce,c,this.releaseCapture,this);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__cg:null,__gr:null,__gs:true,__ce:null,_getParent:function(l){return l.parentNode;}
,canDispatchEvent:function(m,event,n){return !!(this.__gr&&this.__gt[n]);}
,dispatchEvent:function(o,event,p){if(p==f){event.stopPropagation();this.releaseCapture();return;}
;if(this.__gs||!qx.dom.Hierarchy.contains(this.__gr,o)){o=this.__gr;}
;qx.event.dispatch.AbstractBubbling.prototype.dispatchEvent.call(this,o,event,p);}
,__gt:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(q,r){var r=r!==false;if(this.__gr===q&&this.__gs==r){return;}
;if(this.__gr){this.releaseCapture();}
;this.nativeSetCapture(q,r);if(this.hasNativeCapture){var self=this;qx.bom.Event.addNativeListener(q,a,function(){qx.bom.Event.removeNativeListener(q,a,arguments.callee);self.releaseCapture();}
);}
;this.__gs=r;this.__gr=q;this.__cg.fireEvent(q,d,qx.event.type.Event,[true,false]);}
,getCaptureElement:function(){return this.__gr;}
,releaseCapture:function(){var s=this.__gr;if(!s){return;}
;this.__gr=null;this.__cg.fireEvent(s,a,qx.event.type.Event,[true,false]);this.nativeReleaseCapture(s);}
,hasNativeCapture:qx.core.Environment.get(b)==i,nativeSetCapture:qx.core.Environment.select(b,{"mshtml":function(t,u){t.setCapture(u!==false);}
,"default":qx.lang.Function.empty}),nativeReleaseCapture:qx.core.Environment.select(b,{"mshtml":function(v){v.releaseCapture();}
,"default":qx.lang.Function.empty})},destruct:function(){this.__gr=this.__ce=this.__cg=null;}
,defer:function(w){qx.event.Registration.addDispatcher(w);}
});}
)();
(function(){var q="text",p="file",o="+",n="'/>",k="CLASS",h="HTML",g="radio",f="script",d="className",c="TAG",bh="[test!='']:sizzle",bg="password",bf="htmlFor",be="submit",bd="<a href='#'></a>",bc="<a name='",bb="#",ba="qx.bom.Selector",Y="type",X="'] ",x="\\$&",y="parentNode",v="previousSibling",w="NAME",t="number",u="='$1']",r="reset",s='type',B="image",C=".TEST",K="<div class='test e'></div><div class='test'></div>",I="Syntax error, unrecognized expression: ",P="~",M="checkbox",T="[id='",R="hidden",E="__sizzle__",W="<p class='TEST'></p>",V="ID",U="body",D="object",G="button",H="[object Array]",J="href",L="e",N="\\",Q="div",S="*",z="id",A="string",F="undefined",O="";qx.Bootstrap.define(ba,{statics:{query:null,matches:null}});(function(){var bq=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,bx=0,bz=Object.prototype.toString,br=false,bB=true,bv=/\\/g,bk=/\W/;[0,0].sort(function(){bB=false;return 0;}
);var bu=function(bD,bE,bF,bG){bF=bF||[];bE=bE||document;var bP=bE;if(bE.nodeType!==1&&bE.nodeType!==9){return [];}
;if(!bD||typeof bD!==A){return bF;}
;var m,bJ,bH,bL,bN,bK,bQ,i,bR=true,bI=bu.isXML(bE),bM=[],bO=bD;do {bq.exec(O);m=bq.exec(bO);if(m){bO=m[3];bM.push(m[1]);if(m[2]){bL=m[3];break;}
;}
;}
while(m);if(bM.length>1&&bs.exec(bD)){if(bM.length===2&&bn.relative[bM[0]]){bJ=bm(bM[0]+bM[1],bE);}
else {bJ=bn.relative[bM[0]]?[bE]:bu(bM.shift(),bE);while(bM.length){bD=bM.shift();if(bn.relative[bD]){bD+=bM.shift();}
;bJ=bm(bD,bJ);}
;}
;}
else {if(!bG&&bM.length>1&&bE.nodeType===9&&!bI&&bn.match.ID.test(bM[0])&&!bn.match.ID.test(bM[bM.length-1])){bN=bu.find(bM.shift(),bE,bI);bE=bN.expr?bu.filter(bN.expr,bN.set)[0]:bN.set[0];}
;if(bE){bN=bG?{expr:bM.pop(),set:bj(bG)}:bu.find(bM.pop(),bM.length===1&&(bM[0]===P||bM[0]===o)&&bE.parentNode?bE.parentNode:bE,bI);bJ=bN.expr?bu.filter(bN.expr,bN.set):bN.set;if(bM.length>0){bH=bj(bJ);}
else {bR=false;}
;while(bM.length){bK=bM.pop();bQ=bK;if(!bn.relative[bK]){bK=O;}
else {bQ=bM.pop();}
;if(bQ==null){bQ=bE;}
;bn.relative[bK](bH,bQ,bI);}
;}
else {bH=bM=[];}
;}
;if(!bH){bH=bJ;}
;if(!bH){bu.error(bK||bD);}
;if(bz.call(bH)===H){if(!bR){bF.push.apply(bF,bH);}
else if(bE&&bE.nodeType===1){for(i=0;bH[i]!=null;i++){if(bH[i]&&(bH[i]===true||bH[i].nodeType===1&&bu.contains(bE,bH[i]))){bF.push(bJ[i]);}
;}
;}
else {for(i=0;bH[i]!=null;i++){if(bH[i]&&bH[i].nodeType===1){bF.push(bJ[i]);}
;}
;}
;}
else {bj(bH,bF);}
;if(bL){bu(bL,bP,bF,bG);bu.uniqueSort(bF);}
;return bF;}
;bu.uniqueSort=function(bS){if(bw){br=bB;bS.sort(bw);if(br){for(var i=1;i<bS.length;i++){if(bS[i]===bS[i-1]){bS.splice(i--,1);}
;}
;}
;}
;return bS;}
;bu.matches=function(bT,bU){return bu(bT,null,null,bU);}
;bu.matchesSelector=function(bV,bW){return bu(bW,null,null,[bV]).length>0;}
;bu.find=function(bX,bY,ca){var cb;if(!bX){return [];}
;for(var i=0,l=bn.order.length;i<l;i++){var cd,cc=bn.order[i];if((cd=bn.leftMatch[cc].exec(bX))){var ce=cd[1];cd.splice(1,1);if(ce.substr(ce.length-1)!==N){cd[1]=(cd[1]||O).replace(bv,O);cb=bn.find[cc](cd,bY,ca);if(cb!=null){bX=bX.replace(bn.match[cc],O);break;}
;}
;}
;}
;if(!cb){cb=typeof bY.getElementsByTagName!==F?bY.getElementsByTagName(S):[];}
;return {set:cb,expr:bX};}
;bu.filter=function(cf,cg,ch,ci){var ct,cs,cj=cf,co=[],ck=cg,cl=cg&&cg[0]&&bu.isXML(cg[0]);while(cf&&cg.length){for(var cr in bn.filter){if((ct=bn.leftMatch[cr].exec(cf))!=null&&ct[2]){var cq,cn,cm=bn.filter[cr],cu=ct[1];cs=false;ct.splice(1,1);if(cu.substr(cu.length-1)===N){continue;}
;if(ck===co){co=[];}
;if(bn.preFilter[cr]){ct=bn.preFilter[cr](ct,ck,ch,co,ci,cl);if(!ct){cs=cq=true;}
else if(ct===true){continue;}
;}
;if(ct){for(var i=0;(cn=ck[i])!=null;i++){if(cn){cq=cm(cn,ct,i,ck);var cp=ci^!!cq;if(ch&&cq!=null){if(cp){cs=true;}
else {ck[i]=false;}
;}
else if(cp){co.push(cn);cs=true;}
;}
;}
;}
;if(cq!==undefined){if(!ch){ck=co;}
;cf=cf.replace(bn.match[cr],O);if(!cs){return [];}
;break;}
;}
;}
;if(cf===cj){if(cs==null){bu.error(cf);}
else {break;}
;}
;cj=cf;}
;return ck;}
;bu.error=function(cv){throw I+cv;}
;var bn=bu.selectors={order:[V,w,c],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":d,"for":bf},attrHandle:{href:function(cw){return cw.getAttribute(J);}
,type:function(cx){return cx.getAttribute(Y);}
},relative:{"+":function(cy,cz){var cA=typeof cz===A,cC=cA&&!bk.test(cz),cD=cA&&!cC;if(cC){cz=cz.toLowerCase();}
;for(var i=0,l=cy.length,cB;i<l;i++){if((cB=cy[i])){while((cB=cB.previousSibling)&&cB.nodeType!==1){}
;cy[i]=cD||cB&&cB.nodeName.toLowerCase()===cz?cB||false:cB===cz;}
;}
;if(cD){bu.filter(cz,cy,true);}
;}
,">":function(cE,cF){var cH,cG=typeof cF===A,i=0,l=cE.length;if(cG&&!bk.test(cF)){cF=cF.toLowerCase();for(;i<l;i++){cH=cE[i];if(cH){var parent=cH.parentNode;cE[i]=parent.nodeName.toLowerCase()===cF?parent:false;}
;}
;}
else {for(;i<l;i++){cH=cE[i];if(cH){cE[i]=cG?cH.parentNode:cH.parentNode===cF;}
;}
;if(cG){bu.filter(cF,cE,true);}
;}
;}
,"":function(cI,cJ,cK){var cN,cL=bx++,cM=bA;if(typeof cJ===A&&!bk.test(cJ)){cJ=cJ.toLowerCase();cN=cJ;cM=bC;}
;cM(y,cJ,cL,cI,cN,cK);}
,"~":function(cO,cP,cQ){var cT,cR=bx++,cS=bA;if(typeof cP===A&&!bk.test(cP)){cP=cP.toLowerCase();cT=cP;cS=bC;}
;cS(v,cP,cR,cO,cT,cQ);}
},find:{ID:function(cU,cV,cW){if(typeof cV.getElementById!=="undefined"&&!cW){var m=cV.getElementById(cU[1]);return m&&m.parentNode?[m]:[];}
;}
,NAME:function(cX,cY){if(typeof cY.getElementsByName!=="undefined"){var db=[],da=cY.getElementsByName(cX[1]);for(var i=0,l=da.length;i<l;i++){if(da[i].getAttribute("name")===cX[1]){db.push(da[i]);}
;}
;return db.length===0?null:db;}
;}
,TAG:function(dc,dd){if(typeof dd.getElementsByTagName!=="undefined"){return dd.getElementsByTagName(dc[1]);}
;}
},preFilter:{CLASS:function(de,df,dg,dh,di,dj){de=" "+de[1].replace(bv,"")+" ";if(dj){return de;}
;for(var i=0,dk;(dk=df[i])!=null;i++){if(dk){if(di^(dk.className&&(" "+dk.className+" ").replace(/[\t\n\r]/g," ").indexOf(de)>=0)){if(!dg){dh.push(dk);}
;}
else if(dg){df[i]=false;}
;}
;}
;return false;}
,ID:function(dl){return dl[1].replace(bv,"");}
,TAG:function(dm,dn){return dm[1].replace(bv,"").toLowerCase();}
,CHILD:function(dp){if(dp[1]==="nth"){if(!dp[2]){bu.error(dp[0]);}
;dp[2]=dp[2].replace(/^\+|\s*/g,'');var dq=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(dp[2]==="even"&&"2n"||dp[2]==="odd"&&"2n+1"||!/\D/.test(dp[2])&&"0n+"+dp[2]||dp[2]);dp[2]=(dq[1]+(dq[2]||1))-0;dp[3]=dq[3]-0;}
else if(dp[2]){bu.error(dp[0]);}
;dp[0]=bx++;return dp;}
,ATTR:function(dr,ds,dt,du,dv,dw){var name=dr[1]=dr[1].replace(bv,"");if(!dw&&bn.attrMap[name]){dr[1]=bn.attrMap[name];}
;dr[4]=(dr[4]||dr[5]||"").replace(bv,"");if(dr[2]==="~="){dr[4]=" "+dr[4]+" ";}
;return dr;}
,PSEUDO:function(dx,dy,dz,dA,dB){if(dx[1]==="not"){if((bq.exec(dx[3])||"").length>1||/^\w/.test(dx[3])){dx[3]=bu(dx[3],null,null,dy);}
else {var dC=bu.filter(dx[3],dy,dz,true^dB);if(!dz){dA.push.apply(dA,dC);}
;return false;}
;}
else if(bn.match.POS.test(dx[0])||bn.match.CHILD.test(dx[0])){return true;}
;return dx;}
,POS:function(dD){dD.unshift(true);return dD;}
},filters:{enabled:function(dE){return dE.disabled===false&&dE.type!==R;}
,disabled:function(dF){return dF.disabled===true;}
,checked:function(dG){return dG.checked===true;}
,selected:function(dH){if(dH.parentNode){dH.parentNode.selectedIndex;}
;return dH.selected===true;}
,parent:function(dI){return !!dI.firstChild;}
,empty:function(dJ){return !dJ.firstChild;}
,has:function(dK,i,dL){return !!bu(dL[3],dK).length;}
,header:function(dM){return (/h\d/i).test(dM.nodeName);}
,text:function(dN){return q===dN.getAttribute(s);}
,radio:function(dO){return g===dO.type;}
,checkbox:function(dP){return M===dP.type;}
,file:function(dQ){return p===dQ.type;}
,password:function(dR){return bg===dR.type;}
,submit:function(dS){return be===dS.type;}
,image:function(dT){return B===dT.type;}
,reset:function(dU){return r===dU.type;}
,button:function(dV){return G===dV.type||dV.nodeName.toLowerCase()===G;}
,input:function(dW){return (/input|select|textarea|button/i).test(dW.nodeName);}
},setFilters:{first:function(dX,i){return i===0;}
,last:function(dY,i,ea,eb){return i===eb.length-1;}
,even:function(ec,i){return i%2===0;}
,odd:function(ed,i){return i%2===1;}
,lt:function(ee,i,ef){return i<ef[3]-0;}
,gt:function(eg,i,eh){return i>eh[3]-0;}
,nth:function(ei,i,ej){return ej[3]-0===i;}
,eq:function(ek,i,el){return el[3]-0===i;}
},filter:{PSEUDO:function(em,en,i,eo){var name=en[1],ep=bn.filters[name];if(ep){return ep(em,i,en,eo);}
else if(name==="contains"){return (em.textContent||em.innerText||bu.getText([em])||"").indexOf(en[3])>=0;}
else if(name==="not"){var eq=en[3];for(var j=0,l=eq.length;j<l;j++){if(eq[j]===em){return false;}
;}
;return true;}
else {bu.error(name);}
;;}
,CHILD:function(er,es){var ey=es[1],et=er;switch(ey){case "only":case "first":while((et=et.previousSibling)){if(et.nodeType===1){return false;}
;}
;if(ey==="first"){return true;}
;et=er;case "last":while((et=et.nextSibling)){if(et.nodeType===1){return false;}
;}
;return true;case "nth":var ez=es[2],ev=es[3];if(ez===1&&ev===0){return true;}
;var ex=es[0],parent=er.parentNode;if(parent&&(parent.sizcache!==ex||!er.nodeIndex)){var eu=0;for(et=parent.firstChild;et;et=et.nextSibling){if(et.nodeType===1){et.nodeIndex=++eu;}
;}
;parent.sizcache=ex;}
;var ew=er.nodeIndex-ev;if(ez===0){return ew===0;}
else {return (ew%ez===0&&ew/ez>=0);}
;};}
,ID:function(eA,eB){return eA.nodeType===1&&eA.getAttribute("id")===eB;}
,TAG:function(eC,eD){return (eD==="*"&&eC.nodeType===1)||eC.nodeName.toLowerCase()===eD;}
,CLASS:function(eE,eF){return (" "+(eE.className||eE.getAttribute("class"))+" ").indexOf(eF)>-1;}
,ATTR:function(eG,eH){var name=eH[1],eL=bn.attrHandle[name]?bn.attrHandle[name](eG):eG[name]!=null?eG[name]:eG.getAttribute(name),eK=eL+"",eJ=eH[2],eI=eH[4];return eL==null?eJ==="!=":eJ==="="?eK===eI:eJ==="*="?eK.indexOf(eI)>=0:eJ==="~="?(" "+eK+" ").indexOf(eI)>=0:!eI?eK&&eL!==false:eJ==="!="?eK!==eI:eJ==="^="?eK.indexOf(eI)===0:eJ==="$="?eK.substr(eK.length-eI.length)===eI:eJ==="|="?eK===eI||eK.substr(0,eI.length+1)===eI+"-":false;}
,POS:function(eM,eN,i,eO){var name=eN[2],eP=bn.setFilters[name];if(eP){return eP(eM,i,eN,eO);}
;}
}};var bs=bn.match.POS,bi=function(eQ,eR){return N+(eR-0+1);}
;for(var by in bn.match){bn.match[by]=new RegExp(bn.match[by].source+(/(?![^\[]*\])(?![^\(]*\))/.source));bn.leftMatch[by]=new RegExp(/(^(?:.|\r|\n)*?)/.source+bn.match[by].source.replace(/\\(\d+)/g,bi));}
;var bj=function(eS,eT){eS=Array.prototype.slice.call(eS,0);if(eT){eT.push.apply(eT,eS);return eT;}
;return eS;}
;try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType;}
catch(e){bj=function(eU,eV){var i=0,eW=eV||[];if(bz.call(eU)===H){Array.prototype.push.apply(eW,eU);}
else {if(typeof eU.length===t){for(var l=eU.length;i<l;i++){eW.push(eU[i]);}
;}
else {for(;eU[i];i++){eW.push(eU[i]);}
;}
;}
;return eW;}
;}
;var bw,bo;if(document.documentElement.compareDocumentPosition){bw=function(a,b){if(a===b){br=true;return 0;}
;if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1;}
;return a.compareDocumentPosition(b)&4?-1:1;}
;}
else {bw=function(a,b){var fc,fa,fd=[],fe=[],eY=a.parentNode,fb=b.parentNode,eX=eY;if(a===b){br=true;return 0;}
else if(eY===fb){return bo(a,b);}
else if(!eY){return -1;}
else if(!fb){return 1;}
;;;while(eX){fd.unshift(eX);eX=eX.parentNode;}
;eX=fb;while(eX){fe.unshift(eX);eX=eX.parentNode;}
;fc=fd.length;fa=fe.length;for(var i=0;i<fc&&i<fa;i++){if(fd[i]!==fe[i]){return bo(fd[i],fe[i]);}
;}
;return i===fc?bo(a,fe[i],-1):bo(fd[i],b,1);}
;bo=function(a,b,ff){if(a===b){return ff;}
;var fg=a.nextSibling;while(fg){if(fg===b){return -1;}
;fg=fg.nextSibling;}
;return 1;}
;}
;bu.getText=function(fh){var fj=O,fi;for(var i=0;fh[i];i++){fi=fh[i];if(fi.nodeType===3||fi.nodeType===4){fj+=fi.nodeValue;}
else if(fi.nodeType!==8){fj+=bu.getText(fi.childNodes);}
;}
;return fj;}
;(function(){var fm=document.createElement(Q),fl=f+(new Date()).getTime(),fk=document.documentElement;fm.innerHTML=bc+fl+n;fk.insertBefore(fm,fk.firstChild);if(document.getElementById(fl)){bn.find.ID=function(fn,fo,fp){if(typeof fo.getElementById!==F&&!fp){var m=fo.getElementById(fn[1]);return m?m.id===fn[1]||typeof m.getAttributeNode!==F&&m.getAttributeNode(z).nodeValue===fn[1]?[m]:undefined:[];}
;}
;bn.filter.ID=function(fq,fr){var fs=typeof fq.getAttributeNode!==F&&fq.getAttributeNode(z);return fq.nodeType===1&&fs&&fs.nodeValue===fr;}
;}
;fk.removeChild(fm);fk=fm=null;}
)();(function(){var ft=document.createElement(Q);ft.appendChild(document.createComment(O));if(ft.getElementsByTagName(S).length>0){bn.find.TAG=function(fu,fv){var fx=fv.getElementsByTagName(fu[1]);if(fu[1]===S){var fw=[];for(var i=0;fx[i];i++){if(fx[i].nodeType===1){fw.push(fx[i]);}
;}
;fx=fw;}
;return fx;}
;}
;ft.innerHTML=bd;if(ft.firstChild&&typeof ft.firstChild.getAttribute!==F&&ft.firstChild.getAttribute(J)!==bb){bn.attrHandle.href=function(fy){return fy.getAttribute(J,2);}
;}
;ft=null;}
)();if(document.querySelectorAll){(function(){var fA=bu,fz=document.createElement(Q),fB=E;fz.innerHTML=W;if(fz.querySelectorAll&&fz.querySelectorAll(C).length===0){return;}
;bu=function(fD,fE,fF,fG){fE=fE||document;if(!fG&&!bu.isXML(fE)){var fL=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(fD);if(fL&&(fE.nodeType===1||fE.nodeType===9)){if(fL[1]){return bj(fE.getElementsByTagName(fD),fF);}
else if(fL[2]&&bn.find.CLASS&&fE.getElementsByClassName){return bj(fE.getElementsByClassName(fL[2]),fF);}
;}
;if(fE.nodeType===9){if(fD===U&&fE.body){return bj([fE.body],fF);}
else if(fL&&fL[3]){var fJ=fE.getElementById(fL[3]);if(fJ&&fJ.parentNode){if(fJ.id===fL[3]){return bj([fJ],fF);}
;}
else {return bj([],fF);}
;}
;try{return bj(fE.querySelectorAll(fD),fF);}
catch(fO){}
;}
else if(fE.nodeType===1&&fE.nodeName.toLowerCase()!==D){var fN=fE,fI=fE.getAttribute(z),fK=fI||fB,fH=fE.parentNode,fM=/^\s*[+~]/.test(fD);if(!fI){fE.setAttribute(z,fK);}
else {fK=fK.replace(/'/g,x);}
;if(fM&&fH){fE=fE.parentNode;}
;try{if(!fM||fH){return bj(fE.querySelectorAll(T+fK+X+fD),fF);}
;}
catch(fP){}
finally{if(!fI){fN.removeAttribute(z);}
;}
;}
;}
;return fA(fD,fE,fF,fG);}
;for(var fC in fA){bu[fC]=fA[fC];}
;fz=null;}
)();}
;(function(){var fS=document.documentElement,fQ=fS.matchesSelector||fS.mozMatchesSelector||fS.webkitMatchesSelector||fS.msMatchesSelector,fR=false;try{fQ.call(document.documentElement,bh);}
catch(fT){fR=true;}
;if(fQ){bu.matchesSelector=function(fU,fV){fV=fV.replace(/\=\s*([^'"\]]*)\s*\]/g,u);if(!bu.isXML(fU)){try{if(fR||!bn.match.PSEUDO.test(fV)&&!/!=/.test(fV)){return fQ.call(fU,fV);}
;}
catch(e){}
;}
;return bu(fV,null,null,[fU]).length>0;}
;}
;}
)();(function(){var fW=document.createElement(Q);fW.innerHTML=K;if(!fW.getElementsByClassName||fW.getElementsByClassName(L).length===0){return;}
;fW.lastChild.className=L;if(fW.getElementsByClassName(L).length===1){return;}
;bn.order.splice(1,0,k);bn.find.CLASS=function(fX,fY,ga){if(typeof fY.getElementsByClassName!==F&&!ga){return fY.getElementsByClassName(fX[1]);}
;}
;fW=null;}
)();function bC(gb,gc,gd,ge,gf,gg){for(var i=0,l=ge.length;i<l;i++){var gi=ge[i];if(gi){var gh=false;gi=gi[gb];while(gi){if(gi.sizcache===gd){gh=ge[gi.sizset];break;}
;if(gi.nodeType===1&&!gg){gi.sizcache=gd;gi.sizset=i;}
;if(gi.nodeName.toLowerCase()===gc){gh=gi;break;}
;gi=gi[gb];}
;ge[i]=gh;}
;}
;}
;function bA(gj,gk,gl,gm,gn,go){for(var i=0,l=gm.length;i<l;i++){var gq=gm[i];if(gq){var gp=false;gq=gq[gj];while(gq){if(gq.sizcache===gl){gp=gm[gq.sizset];break;}
;if(gq.nodeType===1){if(!go){gq.sizcache=gl;gq.sizset=i;}
;if(typeof gk!==A){if(gq===gk){gp=true;break;}
;}
else if(bu.filter(gk,[gq]).length>0){gp=gq;break;}
;}
;gq=gq[gj];}
;gm[i]=gp;}
;}
;}
;if(document.documentElement.contains){bu.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):true);}
;}
else if(document.documentElement.compareDocumentPosition){bu.contains=function(a,b){return !!(a.compareDocumentPosition(b)&16);}
;}
else {bu.contains=function(){return false;}
;}
;bu.isXML=function(gr){var gs=(gr?gr.ownerDocument||gr:0).documentElement;return gs?gs.nodeName!==h:false;}
;var bm=function(gt,gu){var gy,gw=[],gv=O,gx=gu.nodeType?[gu]:gu;while((gy=bn.match.PSEUDO.exec(gt))){gv+=gy[0];gt=gt.replace(bn.match.PSEUDO,O);}
;gt=bn.relative[gt]?gt+S:gt;for(var i=0,l=gx.length;i<l;i++){bu(gt,gx[i],gw);}
;return bu.filter(gv,gw);}
;var bt=qx.bom.Selector;bt.query=function(gz,gA){return bu(gz,gA);}
;bt.matches=function(gB,gC){return bu(gB,null,null,gC);}
;}
)();}
)();
(function(){var l="Silverlight",k="plugin.silverlight.version",h="function",g="QuickTimeCheckObject.QuickTimeCheck.1",f="Adobe Acrobat",e="plugin.windowsmedia",d="QuickTime",c="plugin.silverlight",b="qx.bom.client.Plugin",a="plugin.divx",H="Chrome PDF Viewer",G="Windows Media",F="plugin.gears",E="plugin.quicktime",D="plugin.windowsmedia.version",C="DivX Web Player",B="AgControl.AgControl",A="plugin.pdf",z="plugin.pdf.version",y="plugin.divx.version",s="WMPlayer.OCX.7",t="AcroPDF.PDF",q="plugin.activex",r="plugin.quicktime.version",o="npdivx.DivXBrowserPlugin.1",p="pdf",m="wmv",n="divx",u="quicktime",v="mshtml",x="silverlight",w="";qx.Bootstrap.define(b,{statics:{getGears:function(){return !!(window.google&&window.google.gears);}
,getActiveX:function(){return (typeof window.ActiveXObject===h);}
,__gu:{quicktime:{plugin:[d],control:g},wmv:{plugin:[G],control:s},divx:{plugin:[C],control:o},silverlight:{plugin:[l],control:B},pdf:{plugin:[H,f],control:t}},getQuicktimeVersion:function(){var I=qx.bom.client.Plugin.__gu[u];return qx.bom.client.Plugin.__gv(I.control,I.plugin);}
,getWindowsMediaVersion:function(){var J=qx.bom.client.Plugin.__gu[m];return qx.bom.client.Plugin.__gv(J.control,J.plugin);}
,getDivXVersion:function(){var K=qx.bom.client.Plugin.__gu[n];return qx.bom.client.Plugin.__gv(K.control,K.plugin);}
,getSilverlightVersion:function(){var L=qx.bom.client.Plugin.__gu[x];return qx.bom.client.Plugin.__gv(L.control,L.plugin);}
,getPdfVersion:function(){var M=qx.bom.client.Plugin.__gu[p];return qx.bom.client.Plugin.__gv(M.control,M.plugin);}
,getQuicktime:function(){var N=qx.bom.client.Plugin.__gu[u];return qx.bom.client.Plugin.__gw(N.control,N.plugin);}
,getWindowsMedia:function(){var O=qx.bom.client.Plugin.__gu[m];return qx.bom.client.Plugin.__gw(O.control,O.plugin);}
,getDivX:function(){var P=qx.bom.client.Plugin.__gu[n];return qx.bom.client.Plugin.__gw(P.control,P.plugin);}
,getSilverlight:function(){var Q=qx.bom.client.Plugin.__gu[x];return qx.bom.client.Plugin.__gw(Q.control,Q.plugin);}
,getPdf:function(){var R=qx.bom.client.Plugin.__gu[p];return qx.bom.client.Plugin.__gw(R.control,R.plugin);}
,__gv:function(S,T){var U=qx.bom.client.Plugin.__gw(S,T);if(!U){return w;}
;if(qx.bom.client.Engine.getName()==v){var V=new ActiveXObject(S);try{var Y=V.versionInfo;if(Y!=undefined){return Y;}
;Y=V.version;if(Y!=undefined){return Y;}
;Y=V.settings.version;if(Y!=undefined){return Y;}
;}
catch(bb){return w;}
;return w;}
else {var ba=navigator.plugins;var X=/([0-9]\.[0-9])/g;for(var i=0;i<ba.length;i++){var W=ba[i];for(var j=0;j<T.length;j++){if(W.name.indexOf(T[j])!==-1){if(X.test(W.name)||X.test(W.description)){return RegExp.$1;}
;}
;}
;}
;return w;}
;}
,__gw:function(bc,bd){if(qx.bom.client.Engine.getName()==v){var be=window.ActiveXObject;if(!be){return false;}
;try{new ActiveXObject(bc);}
catch(bg){return false;}
;return true;}
else {var bf=navigator.plugins;if(!bf){return false;}
;var name;for(var i=0;i<bf.length;i++){name=bf[i].name;for(var j=0;j<bd.length;j++){if(name.indexOf(bd[j])!==-1){return true;}
;}
;}
;return false;}
;}
},defer:function(bh){qx.core.Environment.add(F,bh.getGears);qx.core.Environment.add(E,bh.getQuicktime);qx.core.Environment.add(r,bh.getQuicktimeVersion);qx.core.Environment.add(e,bh.getWindowsMedia);qx.core.Environment.add(D,bh.getWindowsMediaVersion);qx.core.Environment.add(a,bh.getDivX);qx.core.Environment.add(y,bh.getDivXVersion);qx.core.Environment.add(c,bh.getSilverlight);qx.core.Environment.add(k,bh.getSilverlightVersion);qx.core.Environment.add(A,bh.getPdf);qx.core.Environment.add(z,bh.getPdfVersion);qx.core.Environment.add(q,bh.getActiveX);}
});}
)();
(function(){var t='<\?xml version="1.0" encoding="utf-8"?>\n<',s="qx.xml.Document",r=" />",q="xml.domparser",p="SelectionLanguage",o="'",n="MSXML2.XMLHTTP.3.0",m="MSXML2.XMLHTTP.6.0",k="xml.implementation",j=" xmlns='",c="text/xml",h="XPath",f="MSXML2.DOMDocument.6.0",b="HTML",a="MSXML2.DOMDocument.3.0",e="",d="No XML implementation available!",g="plugin.activex";qx.Class.define(s,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(u){if(u.nodeType===9){return u.documentElement.nodeName!==b;}
else if(u.ownerDocument){return this.isXmlDocument(u.ownerDocument);}
else {return false;}
;}
,create:function(v,w){if(qx.core.Environment.get(g)){var x=new ActiveXObject(this.DOMDOC);if(this.DOMDOC==a){x.setProperty(p,h);}
;if(w){var y=t;y+=w;if(v){y+=j+v+o;}
;y+=r;x.loadXML(y);}
;return x;}
;if(qx.core.Environment.get(k)){return document.implementation.createDocument(v||e,w||e,null);}
;throw new Error(d);}
,fromString:function(z){if(qx.core.Environment.get(g)){var B=qx.xml.Document.create();B.loadXML(z);return B;}
;if(qx.core.Environment.get(q)){var A=new DOMParser();return A.parseFromString(z,c);}
;throw new Error(d);}
},defer:function(C){if(qx.core.Environment.get(g)){var D=[f,a];var E=[m,n];for(var i=0,l=D.length;i<l;i++){try{new ActiveXObject(D[i]);new ActiveXObject(E[i]);}
catch(F){continue;}
;C.DOMDOC=D[i];C.XMLHTTP=E[i];break;}
;}
;}
});}
)();
(function(){var s="xml.implementation",r="xml.attributens",q="xml.selectnodes",p="xml.getqualifieditem",o="SelectionLanguage",n="xml.getelementsbytagnamens",m="qx.bom.client.Xml",l="xml.domproperties",k="xml.selectsinglenode",j="1.0",d="xml.createnode",i="xml.domparser",g="getProperty",c="XML",b="string",f="xml.createelementns",e="<a></a>",h="function",a="undefined";qx.Bootstrap.define(m,{statics:{getImplementation:function(){return document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature(c,j);}
,getDomParser:function(){return typeof window.DOMParser!==a;}
,getSelectSingleNode:function(){return typeof qx.xml.Document.create().selectSingleNode!==a;}
,getSelectNodes:function(){return typeof qx.xml.Document.create().selectNodes!==a;}
,getElementsByTagNameNS:function(){return typeof qx.xml.Document.create().getElementsByTagNameNS!==a;}
,getDomProperties:function(){var t=qx.xml.Document.create();return (g in t&&typeof t.getProperty(o)===b);}
,getAttributeNS:function(){var u=qx.xml.Document.fromString(e).documentElement;return typeof u.getAttributeNS===h&&typeof u.setAttributeNS===h;}
,getCreateElementNS:function(){return typeof qx.xml.Document.create().createElementNS===h;}
,getCreateNode:function(){return typeof qx.xml.Document.create().createNode!==a;}
,getQualifiedItem:function(){var v=qx.xml.Document.fromString(e).documentElement;return typeof v.attributes.getQualifiedItem!==a;}
},defer:function(w){qx.core.Environment.add(s,w.getImplementation);qx.core.Environment.add(i,w.getDomParser);qx.core.Environment.add(k,w.getSelectSingleNode);qx.core.Environment.add(q,w.getSelectNodes);qx.core.Environment.add(n,w.getElementsByTagNameNS);qx.core.Environment.add(l,w.getDomProperties);qx.core.Environment.add(r,w.getAttributeNS);qx.core.Environment.add(f,w.getCreateElementNS);qx.core.Environment.add(d,w.getCreateNode);qx.core.Environment.add(p,w.getQualifiedItem);}
});}
)();
(function(){var a="qx.event.type.Focus";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,d,false);this._target=b;this._relatedTarget=c;return this;}
}});}
)();
(function(){var j="qx.bom.element.Location",i="paddingLeft",h="static",g="marginBottom",f="visible",e="BODY",d="paddingBottom",c="paddingTop",b="gecko",a="marginRight",D="mshtml",C="position",B="margin",A="overflow",z="paddingRight",y="browser.documentmode",x="border",w="borderBottomWidth",v="borderRightWidth",u="auto",q="padding",r="browser.quirksmode",o="engine.version",p="marginTop",m="marginLeft",n="border-box",k="engine.name",l="scroll",s="borderTopWidth",t="borderLeftWidth";qx.Bootstrap.define(j,{statics:{__gx:function(E,F){return qx.bom.element.Style.get(E,F,qx.bom.element.Style.COMPUTED_MODE,false);}
,__gy:function(G,H){return parseInt(qx.bom.element.Style.get(G,H,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;}
,__gz:function(I){var K=0,top=0;var J=qx.dom.Node.getWindow(I);K-=qx.bom.Viewport.getScrollLeft(J);top-=qx.bom.Viewport.getScrollTop(J);return {left:K,top:top};}
,__gA:qx.core.Environment.select(k,{"mshtml":function(L){var N=qx.dom.Node.getDocument(L);var M=N.body;var O=0;var top=0;O-=M.clientLeft+N.documentElement.clientLeft;top-=M.clientTop+N.documentElement.clientTop;if(!qx.core.Environment.get(r)){O+=this.__gy(M,t);top+=this.__gy(M,s);}
;return {left:O,top:top};}
,"webkit":function(P){var R=qx.dom.Node.getDocument(P);var Q=R.body;var S=Q.offsetLeft;var top=Q.offsetTop;if(parseFloat(qx.core.Environment.get(o))<530.17){S+=this.__gy(Q,t);top+=this.__gy(Q,s);}
;return {left:S,top:top};}
,"gecko":function(T){var U=qx.dom.Node.getDocument(T).body;var V=U.offsetLeft;var top=U.offsetTop;if(parseFloat(qx.core.Environment.get(o))<1.9){V+=this.__gy(U,m);top+=this.__gy(U,p);}
;if(qx.bom.element.BoxSizing.get(U)!==n){V+=this.__gy(U,t);top+=this.__gy(U,s);}
;return {left:V,top:top};}
,"default":function(W){var X=qx.dom.Node.getDocument(W).body;var Y=X.offsetLeft;var top=X.offsetTop;return {left:Y,top:top};}
}),__gB:qx.core.Environment.select(k,{"gecko":function(ba){if(ba.getBoundingClientRect){var bd=ba.getBoundingClientRect();var be=Math.round(bd.left);var top=Math.round(bd.top);}
else {var be=0;var top=0;var bb=qx.dom.Node.getDocument(ba).body;var bc=qx.bom.element.BoxSizing;if(bc.get(ba)!==n){be-=this.__gy(ba,t);top-=this.__gy(ba,s);}
;while(ba&&ba!==bb){be+=ba.offsetLeft;top+=ba.offsetTop;if(bc.get(ba)!==n){be+=this.__gy(ba,t);top+=this.__gy(ba,s);}
;if(ba.parentNode&&this.__gx(ba.parentNode,A)!=f){be+=this.__gy(ba.parentNode,t);top+=this.__gy(ba.parentNode,s);}
;ba=ba.offsetParent;}
;}
;return {left:be,top:top};}
,"default":function(bf){var bh=qx.dom.Node.getDocument(bf);if(bf.getBoundingClientRect){var bi=bf.getBoundingClientRect();var bj=bi.left;var top=bi.top;}
else {var bj=bf.offsetLeft;var top=bf.offsetTop;bf=bf.offsetParent;var bg=bh.body;while(bf&&bf!=bg){bj+=bf.offsetLeft;top+=bf.offsetTop;bj+=this.__gy(bf,t);top+=this.__gy(bf,s);bf=bf.offsetParent;}
;}
;return {left:bj,top:top};}
}),get:function(bk,bl){if(bk.tagName==e){var location=this.__gC(bk);var bs=location.left;var top=location.top;}
else {var bm=this.__gA(bk);var br=this.__gB(bk);var scroll=this.__gz(bk);var bs=br.left+bm.left-scroll.left;var top=br.top+bm.top-scroll.top;}
;var bn=bs+bk.offsetWidth;var bo=top+bk.offsetHeight;if(bl){if(bl==q||bl==l){var bp=qx.bom.element.Overflow.getX(bk);if(bp==l||bp==u){bn+=bk.scrollWidth-bk.offsetWidth+this.__gy(bk,t)+this.__gy(bk,v);}
;var bq=qx.bom.element.Overflow.getY(bk);if(bq==l||bq==u){bo+=bk.scrollHeight-bk.offsetHeight+this.__gy(bk,s)+this.__gy(bk,w);}
;}
;switch(bl){case q:bs+=this.__gy(bk,i);top+=this.__gy(bk,c);bn-=this.__gy(bk,z);bo-=this.__gy(bk,d);case l:bs-=bk.scrollLeft;top-=bk.scrollTop;bn-=bk.scrollLeft;bo-=bk.scrollTop;case x:bs+=this.__gy(bk,t);top+=this.__gy(bk,s);bn-=this.__gy(bk,v);bo-=this.__gy(bk,w);break;case B:bs-=this.__gy(bk,m);top-=this.__gy(bk,p);bn+=this.__gy(bk,a);bo+=this.__gy(bk,g);break;};}
;return {left:bs,top:top,right:bn,bottom:bo};}
,__gC:function(bt){var top=bt.offsetTop;var bu=bt.offsetLeft;if(qx.core.Environment.get(k)!==D||!((parseFloat(qx.core.Environment.get(o))<8||qx.core.Environment.get(y)<8)&&!qx.core.Environment.get(r))){top+=this.__gy(bt,p);bu+=this.__gy(bt,m);}
;if(qx.core.Environment.get(k)===b){top+=this.__gy(bt,t);bu+=this.__gy(bt,s);}
;return {left:bu,top:top};}
,getLeft:function(bv,bw){return this.get(bv,bw).left;}
,getTop:function(bx,by){return this.get(bx,by).top;}
,getRight:function(bz,bA){return this.get(bz,bA).right;}
,getBottom:function(bB,bC){return this.get(bB,bC).bottom;}
,getRelative:function(bD,bE,bF,bG){var bI=this.get(bD,bF);var bH=this.get(bE,bG);return {left:bI.left-bH.left,top:bI.top-bH.top,right:bI.right-bH.right,bottom:bI.bottom-bH.bottom};}
,getPosition:function(bJ){return this.getRelative(bJ,this.getOffsetParent(bJ));}
,getOffsetParent:function(bK){var bM=bK.offsetParent||document.body;var bL=qx.bom.element.Style;while(bM&&(!/^body|html$/i.test(bM.tagName)&&bL.get(bM,C)===h)){bM=bM.offsetParent;}
;return bM;}
}});}
)();
(function(){var k="text",j="Unsupported input type.",h="nowrap",g="radio",f="qx.debug",e="input",d="option",c="value",b="number",a="qx.bom.Input",x="normal",w="mshtml",v="wrap",u="checkbox",t="select-one",s="textarea",r="auto",q="soft",p="off",o="engine.name",m="select",n="";qx.Bootstrap.define(a,{statics:{__fU:{text:1,textarea:1,select:1,checkbox:1,radio:1,password:1,hidden:1,submit:1,image:1,file:1,search:1,reset:1,button:1},create:function(y,z,A){if(qx.core.Environment.get(f)){qx.core.Assert.assertKeyInMap(y,this.__fU,j);}
;var z=z?qx.lang.Object.clone(z):{};var B;if(y===s||y===m){B=y;}
else {B=e;z.type=y;}
;return qx.dom.Element.create(B,z,A);}
,setValue:function(C,D){var I=C.nodeName.toLowerCase();var F=C.type;var Array=qx.lang.Array;var J=qx.lang.Type;if(typeof D===b){D+=n;}
;if((F===u||F===g)){if(J.isArray(D)){C.checked=Array.contains(D,C.value);}
else {C.checked=C.value==D;}
;}
else if(I===m){var E=J.isArray(D);var K=C.options;var G,H;for(var i=0,l=K.length;i<l;i++){G=K[i];H=G.getAttribute(c);if(H==null){H=G.text;}
;G.selected=E?Array.contains(D,H):D==H;}
;if(E&&D.length==0){C.selectedIndex=-1;}
;}
else if((F===k||F===s)&&(qx.core.Environment.get(o)==w)){C.$$inValueSet=true;C.value=D;C.$$inValueSet=null;}
else {C.value=D;}
;;}
,getValue:function(L){var R=L.nodeName.toLowerCase();if(R===d){return (L.attributes.value||{}).specified?L.value:L.text;}
;if(R===m){var M=L.selectedIndex;if(M<0){return null;}
;var S=[];var U=L.options;var T=L.type==t;var Q=qx.bom.Input;var P;for(var i=T?M:0,O=T?M+1:U.length;i<O;i++){var N=U[i];if(N.selected){P=Q.getValue(N);if(T){return P;}
;S.push(P);}
;}
;return S;}
else {return (L.value||n).replace(/\r/g,n);}
;}
,setWrap:qx.core.Environment.select(o,{"mshtml":function(V,W){var Y=W?q:p;var X=W?r:n;V.wrap=Y;V.style.overflowY=X;}
,"gecko|webkit":function(ba,bb){var bd=bb?q:p;var bc=bb?n:r;ba.setAttribute(v,bd);ba.style.overflow=bc;}
,"default":function(be,bf){be.style.whiteSpace=bf?x:h;}
})}});}
)();
(function(){var f="mshtml",e="engine.name",d="pop.push.reverse.shift.sort.splice.unshift.join.slice",c="number",b="qx.type.BaseArray",a=".";qx.Bootstrap.define(b,{extend:Array,construct:function(g){}
,members:{toArray:null,valueOf:null,pop:null,push:null,reverse:null,shift:null,sort:null,splice:null,unshift:null,concat:null,join:null,slice:null,toString:null,indexOf:null,lastIndexOf:null,forEach:null,filter:null,map:null,some:null,every:null}});(function(){function k(l){if((qx.core.Environment.get(e)==f)){j.prototype={length:0,$$isArray:true};var o=d.split(a);for(var length=o.length;length;){j.prototype[o[--length]]=Array.prototype[o[length]];}
;}
;var p=Array.prototype.slice;j.prototype.concat=function(){var r=this.slice(0);for(var i=0,length=arguments.length;i<length;i++){var q;if(arguments[i] instanceof j){q=p.call(arguments[i],0);}
else if(arguments[i] instanceof Array){q=arguments[i];}
else {q=[arguments[i]];}
;r.push.apply(r,q);}
;return r;}
;j.prototype.toString=function(){return p.call(this,0).toString();}
;j.prototype.toLocaleString=function(){return p.call(this,0).toLocaleString();}
;j.prototype.constructor=j;j.prototype.indexOf=qx.lang.Core.arrayIndexOf;j.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;j.prototype.forEach=qx.lang.Core.arrayForEach;j.prototype.some=qx.lang.Core.arraySome;j.prototype.every=qx.lang.Core.arrayEvery;var m=qx.lang.Core.arrayFilter;var n=qx.lang.Core.arrayMap;j.prototype.filter=function(){var s=new this.constructor;s.push.apply(s,m.apply(this,arguments));return s;}
;j.prototype.map=function(){var t=new this.constructor;t.push.apply(t,n.apply(this,arguments));return t;}
;j.prototype.slice=function(){var u=new this.constructor;u.push.apply(u,Array.prototype.slice.apply(this,arguments));return u;}
;j.prototype.splice=function(){var v=new this.constructor;v.push.apply(v,Array.prototype.splice.apply(this,arguments));return v;}
;j.prototype.toArray=function(){return Array.prototype.slice.call(this,0);}
;j.prototype.valueOf=function(){return this.length;}
;return j;}
;function j(length){if(arguments.length===1&&typeof length===c){this.length=-1<length&&length===length>>.5?length:this.push(length);}
else if(arguments.length){this.push.apply(this,arguments);}
;}
;function h(){}
;h.prototype=[];j.prototype=new h;j.prototype.length=0;qx.type.BaseArray=k(j);}
)();}
)();
(function(){var w=" is undefined",v='function',u="\\b|\\b",t="qx.bom.element.Class",s=" cannot be determined",r='SVGAnimatedString',q='object',p="g",o="$2",n='undefined',e='',m="(^|\\s)",h="(\\s|$)",c="qx.debug",b="className for element ",g="\\b",f="",j=" ",a="html.classlist",k="default",d="native";qx.Bootstrap.define(t,{statics:{__kB:/\s+/g,__kC:/^\s+|\s+$/g,add:qx.lang.Object.select(qx.core.Environment.get(a)?d:k,{"native":function(x,name){x.classList.add(name);return name;}
,"default":function(y,name){if(!this.has(y,name)){y.className+=(y.className?j:f)+name;}
;return name;}
}),addClasses:qx.lang.Object.select(qx.core.Environment.get(a)?d:k,{"native":function(z,A){for(var i=0;i<A.length;i++){z.classList.add(A[i]);}
;return z.className;}
,"default":function(B,C){var D={};var F;var E=B.className;if(E){F=E.split(this.__kB);for(var i=0,l=F.length;i<l;i++){D[F[i]]=true;}
;for(var i=0,l=C.length;i<l;i++){if(!D[C[i]]){F.push(C[i]);}
;}
;}
else {F=C;}
;return B.className=F.join(j);}
}),get:function(G){var H=G.className;if(typeof H.split!==v){if(typeof H===q){if(qx.Bootstrap.getClass(H)==r){H=H.baseVal;}
else {if(qx.core.Environment.get(c)){qx.log.Logger.warn(this,b+G+s);}
;H=e;}
;}
;if(typeof H===n){if(qx.core.Environment.get(c)){qx.log.Logger.warn(this,b+G+w);}
;H=e;}
;}
;return H;}
,has:qx.lang.Object.select(qx.core.Environment.get(a)?d:k,{"native":function(I,name){return I.classList.contains(name);}
,"default":function(J,name){var K=new RegExp(m+name+h);return K.test(J.className);}
}),remove:qx.lang.Object.select(qx.core.Environment.get(a)?d:k,{"native":function(L,name){L.classList.remove(name);return name;}
,"default":function(M,name){var N=new RegExp(m+name+h);M.className=M.className.replace(N,o);return name;}
}),removeClasses:qx.lang.Object.select(qx.core.Environment.get(a)?d:k,{"native":function(O,P){for(var i=0;i<P.length;i++){O.classList.remove(P[i]);}
;return O.className;}
,"default":function(Q,R){var S=new RegExp(g+R.join(u)+g,p);return Q.className=Q.className.replace(S,f).replace(this.__kC,f).replace(this.__kB,j);}
}),replace:function(T,U,V){this.remove(T,U);return this.add(T,V);}
,toggle:qx.lang.Object.select(qx.core.Environment.get(a)?d:k,{"native":function(W,name,X){if(X===undefined){W.classList.toggle(name);}
else {X?this.add(W,name):this.remove(W,name);}
;return name;}
,"default":function(Y,name,ba){if(ba==null){ba=!this.has(Y,name);}
;ba?this.add(Y,name):this.remove(Y,name);return name;}
})}});}
)();
(function(){var m=":not(",k="getValue",h="append",g=")",f="getPreviousSiblings",e="#",d="qx.bom.Collection",c="setValue",b="prepend",a="getAncestors",N="qx.debug",M="Invalid argument for selector query: ",L="getOffsetParent",K="remove",J=">*",I="add",H="*",G="",F="addListener",E="has",t="toggle",u="getSiblings",r="replace",s="after",p="replaceWith",q="setCss",n="setStyles",o="before",v="getNextSiblings",w="getPosition",z="getCss",y="removeListener",B="GET",A="set",D="reset",C="string",x="get";(function(){var P=function(Q,R){return function(S,T,U,V,W,X){var length=this.length;if(length>0){var Y=Q[R];for(var i=0;i<length;i++){if(this[i].nodeType===1){Y.call(Q,this[i],S,T,U,V,W,X);}
;}
;}
;return this;}
;}
;var O=function(ba,bb){return function(bc,bd,be,bf,bg,bh){if(this.length>0){var bi=this[0].nodeType===1?ba[bb](this[0],bc,bd,be,bf,bg,bh):null;if(bi&&bi.nodeType){return this.__vz([bi]);}
else {return bi;}
;}
;return null;}
;}
;qx.Class.define(d,{extend:qx.type.BaseArray,construct:function(bj){qx.type.BaseArray.apply(this,arguments);}
,statics:{query:function(bk,bl){var bm=qx.bom.Selector.query(bk,bl);return qx.lang.Array.cast(bm,qx.bom.Collection);}
,id:function(bn){var bo=document.getElementById(bn);if(bo&&bo.id!=bn){return qx.bom.Collection.query(e+bn);}
;if(bo){return new qx.bom.Collection(bo);}
else {return new qx.bom.Collection();}
;}
,html:function(bp,bq){var br=qx.bom.Html.clean([bp],bq);return qx.lang.Array.cast(br,qx.bom.Collection);}
,__vw:/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,create:function(bs,bt){var bv=qx.bom.Collection;if(bs.nodeType){return new bv(bs);}
else if(typeof bs===C){var bu=bv.__vw.exec(bs);if(bu){return bu[1]?bv.html(bu[1],bt):bv.id(bu[3]);}
else {return bv.query(bs,bt);}
;}
else {return qx.lang.Array.cast(bs,qx.bom.Collection);}
;}
},members:{__vx:null,setAttribute:P(qx.bom.element.Attribute,A),resetAttribute:P(qx.bom.element.Attribute,D),getAttribute:O(qx.bom.element.Attribute,x),addClass:P(qx.bom.element.Class,I),getClass:O(qx.bom.element.Class,x),hasClass:O(qx.bom.element.Class,E),removeClass:P(qx.bom.element.Class,K),replaceClass:P(qx.bom.element.Class,r),toggleClass:P(qx.bom.element.Class,t),setValue:P(qx.bom.Input,c),getValue:O(qx.bom.Input,k),setStyle:P(qx.bom.element.Style,A),setStyles:P(qx.bom.element.Style,n),resetStyle:P(qx.bom.element.Style,D),getStyle:O(qx.bom.element.Style,x),setCss:P(qx.bom.element.Style,q),getCss:O(qx.bom.element.Style,z),getOffset:O(qx.bom.element.Location,x),getPosition:O(qx.bom.element.Location,w),getOffsetParent:O(qx.bom.element.Location,L),setScrollLeft:function(bw){var Node=qx.dom.Node;for(var i=0,l=this.length,bx;i<l;i++){bx=this[i];if(Node.isElement(bx)){bx.scrollLeft=bw;}
else if(Node.isWindow(bx)){bx.scrollTo(bw,this.getScrollTop(bx));}
else if(Node.isDocument(bx)){Node.getWindow(bx).scrollTo(bw,this.getScrollTop(bx));}
;;}
;return this;}
,setScrollTop:function(by){var Node=qx.dom.Node;for(var i=0,l=this.length,bz;i<l;i++){bz=this[i];if(Node.isElement(bz)){bz.scrollTop=by;}
else if(Node.isWindow(bz)){bz.scrollTo(this.getScrollLeft(bz),by);}
else if(Node.isDocument(bz)){Node.getWindow(bz).scrollTo(this.getScrollLeft(bz),by);}
;;}
;return this;}
,getScrollLeft:function(){var bA=this[0];if(!bA){return null;}
;var Node=qx.dom.Node;if(Node.isWindow(bA)||Node.isDocument(bA)){return qx.bom.Viewport.getScrollLeft();}
;return bA.scrollLeft;}
,getScrollTop:function(){var bB=this[0];if(!bB){return null;}
;var Node=qx.dom.Node;if(Node.isWindow(bB)||Node.isDocument(bB)){return qx.bom.Viewport.getScrollTop();}
;return bB.scrollTop;}
,getWidth:function(){var bC=this[0];var Node=qx.dom.Node;if(bC){if(Node.isElement(bC)){return qx.bom.element.Dimension.getWidth(bC);}
else if(Node.isDocument(bC)){return qx.bom.Document.getWidth(Node.getWindow(bC));}
else if(Node.isWindow(bC)){return qx.bom.Viewport.getWidth(bC);}
;;}
;return null;}
,getContentWidth:function(){var bD=this[0];if(qx.dom.Node.isElement(bD)){return qx.bom.element.Dimension.getContentWidth(bD);}
;return null;}
,getHeight:function(){var bE=this[0];var Node=qx.dom.Node;if(bE){if(Node.isElement(bE)){return qx.bom.element.Dimension.getHeight(bE);}
else if(Node.isDocument(bE)){return qx.bom.Document.getHeight(Node.getWindow(bE));}
else if(Node.isWindow(bE)){return qx.bom.Viewport.getHeight(bE);}
;;}
;return null;}
,getContentHeight:function(){var bF=this[0];if(qx.dom.Node.isElement(bF)){return qx.bom.element.Dimension.getContentHeight(bF);}
;return null;}
,addListener:P(qx.bom.Element,F),removeListener:P(qx.bom.Element,y),eq:function(bG){return this.slice(bG,+bG+1);}
,filter:function(bH,bI){var bJ;if(qx.lang.Type.isFunction(bH)){bJ=qx.type.BaseArray.prototype.filter.call(this,bH,bI);}
else {bJ=qx.bom.Selector.matches(bH,this);}
;return this.__vz(bJ);}
,is:function(bK){return !!bK&&qx.bom.Selector.matches(bK,this).length>0;}
,__vy:/^.[^:#\[\.,]*$/,not:function(bL){if(this.__vy.test(bL)){var bM=qx.bom.Selector.matches(m+bL+g,this);return this.__vz(bM);}
;var bM=qx.bom.Selector.matches(bL,this);return this.filter(function(bN){return bM.indexOf(bN)===-1;}
);}
,add:function(bO,bP){var bQ=qx.bom.Selector.query(bO,bP);var bR=qx.lang.Array.unique(this.concat(bQ));return this.__vz(bR);}
,children:function(bS){var bT=[];for(var i=0,l=this.length;i<l;i++){bT.push.apply(bT,qx.dom.Hierarchy.getChildElements(this[i]));}
;if(bS){bT=qx.bom.Selector.matches(bS,bT);}
;return this.__vz(bT);}
,closest:function(bU){var bV=new qx.bom.Collection(1);var bX=qx.bom.Selector;var bW=this.map(function(bY){while(bY&&bY.ownerDocument){bV[0]=bY;if(bX.matches(bU,bV).length>0){return bY;}
;bY=bY.parentNode;}
;}
);return this.__vz(qx.lang.Array.unique(bW));}
,contents:function(){var cb=[];var ca=qx.lang.Array;for(var i=0,l=this.length;i<l;i++){cb.push.apply(cb,ca.fromCollection(this[i].childNodes));}
;return this.__vz(cb);}
,find:function(cc){var ce=qx.bom.Selector;if(this.length===1){return this.__vz(ce.query(cc,this[0]));}
else {var cd=[];for(var i=0,l=this.length;i<l;i++){cd.push.apply(cd,ce.query(cc,this[i]));}
;return this.__vz(qx.lang.Array.unique(cd));}
;}
,next:function(cf){var cg=qx.dom.Hierarchy;var ch=this.map(cg.getNextElementSibling,cg);if(cf){ch=qx.bom.Selector.matches(cf,ch);}
;return this.__vz(ch);}
,nextAll:function(ci){return this.__sQ(v,ci);}
,prev:function(cj){var ck=qx.dom.Hierarchy;var cl=this.map(ck.getPreviousElementSibling,ck);if(cj){cl=qx.bom.Selector.matches(cj,cl);}
;return this.__vz(cl);}
,prevAll:function(cm){return this.__sQ(f,cm);}
,parent:function(cn){var Element=qx.dom.Element;var co=qx.lang.Array.unique(this.map(Element.getParentElement,Element));if(cn){co=qx.bom.Selector.matches(cn,co);}
;return this.__vz(co);}
,parents:function(cp){return this.__sQ(a,cp);}
,siblings:function(cq){return this.__sQ(u,cq);}
,__sQ:function(cr,cs){var cu=[];var ct=qx.dom.Hierarchy;for(var i=0,l=this.length;i<l;i++){cu.push.apply(cu,ct[cr](this[i]));}
;var cv=qx.lang.Array.unique(cu);if(cs){cv=qx.bom.Selector.matches(cs,cv);}
;return this.__vz(cv);}
,__vz:function(cw){var cx=new qx.bom.Collection;cx.__vx=this;cw=Array.prototype.slice.call(cw,0);cx.push.apply(cx,cw);return cx;}
,andSelf:function(){return this.add(this.__vx);}
,end:function(){return this.__vx||new qx.bom.Collection();}
,__vA:function(cy,cz){var cE=this[0];var cD=cE.ownerDocument||cE;var cC=cD.createDocumentFragment();var cG=qx.bom.Html.clean(cy,cD,cC);var cI=cC.firstChild;if(cI){var cA=this.length-1;for(var i=0,l=cA;i<l;i++){cz.call(this,this[i],cC.cloneNode(true));}
;cz.call(this,this[cA],cC);}
;if(cG){var cB;var cF=qx.lang.Function;for(var i=0,l=cG.length;i<l;i++){cB=cG[i];if(cB.src){var cH=new qx.bom.request.Script();cH.open(B,cB.src);cH.send();}
else {cF.globalEval(cB.text||cB.textContent||cB.innerHTML||G);}
;if(cB.parentNode){cB.parentNode.removeChild(cB);}
;}
;}
;return this;}
,__vB:function(cJ,cK){var cM=qx.bom.Selector;var cL=qx.lang.Array;var cO=[];for(var i=0,l=cJ.length;i<l;i++){if(qx.core.Environment.get(N)){if(typeof cJ[i]!==C){throw new Error(M+cJ[i]);}
;}
;cO.push.apply(cO,cM.query(cJ[i]));}
;cO=cL.cast(cL.unique(cO),qx.bom.Collection);for(var i=0,cN=this.length;i<cN;i++){cO[cK](this[i]);}
;return this;}
,append:function(cP){return this.__vA(arguments,this.__vC);}
,prepend:function(cQ){return this.__vA(arguments,this.__vD);}
,__vC:function(cR,cS){cR.appendChild(cS);}
,__vD:function(cT,cU){cT.insertBefore(cU,cT.firstChild);}
,appendTo:function(cV){return this.__vB(arguments,h);}
,prependTo:function(cW){return this.__vB(arguments,b);}
,before:function(cX){return this.__vA(arguments,this.__vE);}
,after:function(cY){return this.__vA(arguments,this.__vF);}
,__vE:function(da,db){da.parentNode.insertBefore(db,da);}
,__vF:function(dc,dd){dc.parentNode.insertBefore(dd,dc.nextSibling);}
,insertBefore:function(de){return this.__vB(arguments,o);}
,insertAfter:function(df){return this.__vB(arguments,s);}
,wrapAll:function(content){var dh=this[0];if(dh){var dg=qx.bom.Collection.create(content,dh.ownerDocument).clone();if(dh.parentNode){dh.parentNode.insertBefore(dg[0],dh);}
;dg.map(this.__vG).append(this);}
;return this;}
,__vG:function(di){while(di.firstChild){di=di.firstChild;}
;return di;}
,wrapInner:function(content){var dj=new qx.bom.Collection(1);for(var i=0,l=this.length;i<l;i++){dj[0]=this[i];dj.contents().wrapAll(content);}
;return this;}
,wrap:function(content){var dk=new qx.bom.Collection(1);for(var i=0,l=this.length;i<l;i++){dk[0]=this[i];dk.wrapAll(content);}
;return this;}
,replaceWith:function(content){return this.after(content).remove();}
,replaceAll:function(dl){return this.__vB(arguments,p);}
,remove:function(dm){var dp=this;if(dm){dp=this.filter(dm);if(dp.length==0){return this;}
;}
;for(var i=0,dq=dp.length,dn;i<dq;i++){dn=dp[i];if(dn.parentNode){dn.parentNode.removeChild(dn);}
;}
;return dp;}
,destroy:function(dr){if(this.length==0){return this;}
;var dt=qx.bom.Selector;var dw=this;if(dr){dw=this.filter(dr);if(dw.length==0){return this;}
;}
;var dv=qx.event.Registration.getManager(this[0]);for(var i=0,l=dw.length,du,dx;i<l;i++){du=dw[i];dv.removeAllListeners(du);dx=dt.query(H,du);for(var j=0,ds=dx.length;j<ds;j++){dv.removeAllListeners(dx[j]);}
;if(du.parentNode){du.parentNode.removeChild(du);}
;}
;if(dr){dw.end();qx.lang.Array.exclude(this,dw);}
else {this.length=0;}
;return this;}
,empty:function(){var dy=qx.bom.Collection;for(var i=0,l=this.length;i<l;i++){dy.query(J,this[i]).destroy();while(this.firstChild){this.removeChild(this.firstChild);}
;}
;return this;}
,clone:function(dz){var Element=qx.bom.Element;return dz?this.map(function(dA){return Element.clone(dA,true);}
):this.map(Element.clone,Element);}
},defer:function(dB){if(window.$==null){window.$=dB.create;}
;}
});}
)();}
)();
(function(){var m="<fieldset>",k="<select multiple='multiple'>",h="</div>",g="</select>",f="</tr></tbody></table>",e="<col",d="div",c="<table><tbody><tr>",b=">",a="<table><tbody></tbody><colgroup>",J="<th",I="</tbody></table>",H="<td",G="</colgroup></table>",F="<opt",E="text/javascript",D="",C="</fieldset>",B="<table><tbody>",A="div<div>",t="<table",u="mshtml",r="qx.bom.Html",s="<leg",p="tbody",q="<tr",n="</table>",o="undefined",v="></",w="string",y="script",x="<table>",z="engine.name";qx.Bootstrap.define(r,{statics:{__tM:function(K,L,M){return M.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?K:L+v+M+b;}
,__tN:{opt:[1,k,g],leg:[1,m,C],table:[1,x,n],tr:[2,B,I],td:[3,c,f],col:[2,a,G],def:qx.core.Environment.select(z,{"mshtml":[1,A,h],"default":null})},__tO:function(N,O){var U=O.createElement(d);N=N.replace(/(<(\w+)[^>]*?)\/>/g,this.__tM);var Q=N.replace(/^\s+/,D).substring(0,5).toLowerCase();var T,P=this.__tN;if(!Q.indexOf(F)){T=P.opt;}
else if(!Q.indexOf(s)){T=P.leg;}
else if(Q.match(/^<(thead|tbody|tfoot|colg|cap)/)){T=P.table;}
else if(!Q.indexOf(q)){T=P.tr;}
else if(!Q.indexOf(H)||!Q.indexOf(J)){T=P.td;}
else if(!Q.indexOf(e)){T=P.col;}
else {T=P.def;}
;;;;;if(T){U.innerHTML=T[1]+N+T[2];var S=T[0];while(S--){U=U.lastChild;}
;}
else {U.innerHTML=N;}
;if((qx.core.Environment.get(z)==u)){var V=/<tbody/i.test(N);var R=!Q.indexOf(t)&&!V?U.firstChild&&U.firstChild.childNodes:T[1]==x&&!V?U.childNodes:[];for(var j=R.length-1;j>=0;--j){if(R[j].tagName.toLowerCase()===p&&!R[j].childNodes.length){R[j].parentNode.removeChild(R[j]);}
;}
;if(/^\s/.test(N)){U.insertBefore(O.createTextNode(N.match(/^\s*/)[0]),U.firstChild);}
;}
;return qx.lang.Array.fromCollection(U.childNodes);}
,clean:function(W,X,Y){X=X||document;if(typeof X.createElement===o){X=X.ownerDocument||X[0]&&X[0].ownerDocument||document;}
;if(!Y&&W.length===1&&typeof W[0]===w){var bg=/^<(\w+)\s*\/?>$/.exec(W[0]);if(bg){return [X.createElement(bg[1])];}
;}
;var ba,bc=[];for(var i=0,l=W.length;i<l;i++){ba=W[i];if(typeof ba===w){ba=this.__tO(ba,X);}
;if(ba.nodeType){bc.push(ba);}
else if(ba instanceof qx.type.BaseArray){bc.push.apply(bc,Array.prototype.slice.call(ba,0));}
else if(ba.toElement){bc.push(ba.toElement());}
else {bc.push.apply(bc,ba);}
;;}
;if(Y){var bf=[],be=qx.lang.Array,bd,bb;for(var i=0;bc[i];i++){bd=bc[i];if(bd.nodeType==1&&bd.tagName.toLowerCase()===y&&(!bd.type||bd.type.toLowerCase()===E)){if(bd.parentNode){bd.parentNode.removeChild(bc[i]);}
;bf.push(bd);}
else {if(bd.nodeType===1){bb=be.fromCollection(bd.getElementsByTagName(y));bc.splice.apply(bc,[i+1,0].concat(bb));}
;Y.appendChild(bd);}
;}
;return bf;}
;return bc;}
}});}
)();
(function(){var j="qx.bom.element.Dimension",i="paddingRight",h="paddingLeft",g="opera",f="paddingBottom",e="paddingTop",d="mshtml",c="engine.version",b="0px",a="engine.name";qx.Bootstrap.define(j,{statics:{getWidth:qx.core.Environment.select(a,{"gecko":function(k){if(k.getBoundingClientRect){var l=k.getBoundingClientRect();return Math.round(l.right)-Math.round(l.left);}
else {return k.offsetWidth;}
;}
,"default":function(m){return m.offsetWidth;}
}),getHeight:qx.core.Environment.select(a,{"gecko":function(n){if(n.getBoundingClientRect){var o=n.getBoundingClientRect();return Math.round(o.bottom)-Math.round(o.top);}
else {return n.offsetHeight;}
;}
,"default":function(p){return p.offsetHeight;}
}),getSize:function(q){return {width:this.getWidth(q),height:this.getHeight(q)};}
,__jF:{visible:true,hidden:true},getContentWidth:function(r){var s=qx.bom.element.Style;var t=qx.bom.element.Overflow.getX(r);var u=parseInt(s.get(r,h)||b,10);var x=parseInt(s.get(r,i)||b,10);if(this.__jF[t]){var w=r.clientWidth;if((qx.core.Environment.get(a)==g)||qx.dom.Node.isBlockNode(r)){w=w-u-x;}
;return w;}
else {if(r.clientWidth>=r.scrollWidth){return Math.max(r.clientWidth,r.scrollWidth)-u-x;}
else {var v=r.scrollWidth-u;if(qx.core.Environment.get(a)==d&&qx.core.Environment.get(c)>=6){v-=x;}
;return v;}
;}
;}
,getContentHeight:function(y){var z=qx.bom.element.Style;var C=qx.bom.element.Overflow.getY(y);var B=parseInt(z.get(y,e)||b,10);var A=parseInt(z.get(y,f)||b,10);if(this.__jF[C]){return y.clientHeight-B-A;}
else {if(y.clientHeight>=y.scrollHeight){return Math.max(y.clientHeight,y.scrollHeight)-B-A;}
else {var D=y.scrollHeight-B;if(qx.core.Environment.get(a)==d&&qx.core.Environment.get(c)==6){D-=A;}
;return D;}
;}
;}
,getContentSize:function(E){return {width:this.getContentWidth(E),height:this.getContentHeight(E)};}
}});}
)();
(function(){var j="url: ",i="Invalid state",h="head",g="script",f="load",e="Unknown response headers",d="abort",c="Received native readyState: loaded",b="readystatechange",a="Response header cannot be determined for ",D="opera",C="unknown",B="Open native request with ",A="Response headers cannot be determined for",z="Detected error",y="Send native request",x="on",w="timeout",v="Unknown environment key at this phase",u="Received native load",q="error",r="qx.debug",o="requests made with script transport.",p="loadend",m="",n="mshtml",k="browser.documentmode",l="engine.name",s="qx.debug.io",t="qx.bom.request.Script";qx.Bootstrap.define(t,{construct:function(){this.__tx();this.__ts=qx.Bootstrap.bind(this._onNativeLoad,this);this.__tt=qx.Bootstrap.bind(this._onNativeError,this);this.__sU=qx.Bootstrap.bind(this._onTimeout,this);this.__tu=document.head||document.getElementsByTagName(h)[0]||document.documentElement;this._emitter=new qx.event.Emitter();this.timeout=this.__tz()?0:15000;}
,events:{"readystatechange":t,"error":t,"loadend":t,"timeout":t,"abort":t,"load":t},members:{readyState:null,status:null,statusText:null,timeout:null,__tv:null,on:function(name,E,F){this._emitter.on(name,E,F);return this;}
,open:function(G,H){if(this.__tf){return;}
;this.__tx();this.__sW=null;this.__ta=H;if(this.__tC(s)){qx.Bootstrap.debug(qx.bom.request.Script,B+j+H);}
;this._readyStateChange(1);}
,setRequestHeader:function(I,J){if(this.__tf){return;}
;var K={};if(this.readyState!==1){throw new Error(i);}
;K[I]=J;this.__ta=qx.util.Uri.appendParamsToUrl(this.__ta,K);return this;}
,send:function(){if(this.__tf){return;}
;var N=this.__tA(),L=this.__tu,M=this;if(this.timeout>0){this.__dw=window.setTimeout(this.__sU,this.timeout);}
;if(this.__tC(s)){qx.Bootstrap.debug(qx.bom.request.Script,y);}
;L.insertBefore(N,L.firstChild);window.setTimeout(function(){M._readyStateChange(2);M._readyStateChange(3);}
);return this;}
,abort:function(){if(this.__tf){return;}
;this.__sW=true;this.__tB();this._emit(d);return this;}
,_emit:function(event){this[x+event]();this._emitter.emit(event,this);}
,onreadystatechange:function(){}
,onload:function(){}
,onloadend:function(){}
,onerror:function(){}
,onabort:function(){}
,ontimeout:function(){}
,getResponseHeader:function(O){if(this.__tf){return;}
;if(this.__tC(r)){qx.Bootstrap.debug(a+o);}
;return C;}
,getAllResponseHeaders:function(){if(this.__tf){return;}
;if(this.__tC(r)){qx.Bootstrap.debug(A+o);}
;return e;}
,setDetermineSuccess:function(P){this.__tv=P;}
,dispose:function(){var Q=this.__tw;if(!this.__tf){if(Q){Q.onload=Q.onreadystatechange=null;this.__tB();}
;if(this.__dw){window.clearTimeout(this.__dw);}
;this.__tf=true;}
;}
,_getUrl:function(){return this.__ta;}
,_getScriptElement:function(){return this.__tw;}
,_onTimeout:function(){this.__ty();if(!this.__tz()){this._emit(q);}
;this._emit(w);if(!this.__tz()){this._emit(p);}
;}
,_onNativeLoad:function(){var T=this.__tw,R=this.__tv,S=this;if(this.__sW){return;}
;if(this.__tC(l)===n&&this.__tC(k)<9){if(!(/loaded|complete/).test(T.readyState)){return;}
else {if(this.__tC(s)){qx.Bootstrap.debug(qx.bom.request.Script,c);}
;}
;}
;if(this.__tC(s)){qx.Bootstrap.debug(qx.bom.request.Script,u);}
;if(R){if(!this.status){this.status=R()?200:500;}
;}
;if(this.status===500){if(this.__tC(s)){qx.Bootstrap.debug(qx.bom.request.Script,z);}
;}
;if(this.__dw){window.clearTimeout(this.__dw);}
;window.setTimeout(function(){S._success();S._readyStateChange(4);S._emit(f);S._emit(p);}
);}
,_onNativeError:function(){this.__ty();this._emit(q);this._emit(p);}
,__tw:null,__tu:null,__ta:m,__ts:null,__tt:null,__sU:null,__dw:null,__sW:null,__tf:null,__tx:function(){this.readyState=0;this.status=0;this.statusText=m;}
,_readyStateChange:function(U){this.readyState=U;this._emit(b);}
,_success:function(){this.__tB();this.readyState=4;if(!this.status){this.status=200;}
;this.statusText=m+this.status;}
,__ty:function(){this.__tB();this.readyState=4;this.status=0;this.statusText=null;}
,__tz:function(){var W=this.__tC(l)===n&&this.__tC(k)<9;var V=this.__tC(l)===D;return !(W||V);}
,__tA:function(){var X=this.__tw=document.createElement(g);X.src=this.__ta;X.onerror=this.__tt;X.onload=this.__ts;if(this.__tC(l)===n&&this.__tC(k)<9){X.onreadystatechange=this.__ts;}
;return X;}
,__tB:function(){var Y=this.__tw;if(Y&&Y.parentNode){this.__tu.removeChild(Y);}
;}
,__tC:function(ba){if(qx&&qx.core&&qx.core.Environment){return qx.core.Environment.get(ba);}
else {if(ba===l){return qx.bom.client.Engine.getName();}
;if(ba===k){return qx.bom.client.Browser.getDocumentMode();}
;if(ba==s){return false;}
;throw new Error(v);}
;}
},defer:function(){if(qx&&qx.core&&qx.core.Environment){qx.core.Environment.add(s,false);}
;}
});}
)();
(function(){var b="qx.event.Emitter",a="*";qx.Bootstrap.define(b,{extend:Object,statics:{__sn:[]},members:{__sl:null,__so:null,on:function(name,c,d){this.__sp(name).push({listener:c,ctx:d});qx.event.Emitter.__sn.push({name:name,listener:c,ctx:d});return qx.event.Emitter.__sn.length-1;}
,once:function(name,e,f){this.__sp(name).push({listener:e,ctx:f,once:true});qx.event.Emitter.__sn.push({name:name,listener:e,ctx:f});return qx.event.Emitter.__sn.length-1;}
,off:function(name,g,h){var k=this.__sp(name);for(var i=k.length-1;i>=0;i--){var j=k[i];if(j.listener==g&&j.ctx==h){k.splice(i,1);return i;}
;}
;return null;}
,offById:function(l){var m=qx.event.Emitter.__sn[l];this.off(m.name,m.listener,m.ctx);}
,addListener:function(name,n,o){return this.on(name,n,o);}
,addListenerOnce:function(name,p,q){return this.once(name,p,q);}
,removeListener:function(name,r,s){this.off(name,r,s);}
,removeListenerById:function(t){this.offById(t);}
,emit:function(name,u){var w=this.__sp(name);for(var i=w.length-1;i>=0;i--){var v=w[i];v.listener.call(v.ctx,u);if(v.once){w.splice(i,1);}
;}
;w=this.__sp(a);for(var i=w.length-1;i>=0;i--){var v=w[i];v.listener.call(v.ctx,u);}
;}
,getListeners:function(){return this.__sl;}
,__sp:function(name){if(this.__sl==null){this.__sl={};}
;if(this.__sl[name]==null){this.__sl[name]=[];}
;return this.__sl[name];}
}});}
)();
(function(){var k="file",j="strict",h="anchor",g="div",f="query",e="source",d="password",c="host",b="protocol",a="qx.debug",C="user",B="directory",A="loose",z="relative",y="queryKey",x="qx.util.Uri",w="",v="path",u="authority",t='">0</a>',r="&",s="port",p="params must be either string or object",q='<a href="',l="userInfo",n="?";qx.Bootstrap.define(x,{statics:{parseUri:function(D,E){var F={key:[e,b,u,l,C,d,c,s,z,v,B,k,f,h],q:{name:y,parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var o=F,m=F.parser[E?j:A].exec(D),G={},i=14;while(i--){G[o.key[i]]=m[i]||w;}
;G[o.q.name]={};G[o.key[12]].replace(o.q.parser,function(H,I,J){if(I){G[o.q.name][I]=J;}
;}
);return G;}
,appendParamsToUrl:function(K,L){if(L===undefined){return K;}
;if(qx.core.Environment.get(a)){if(!(qx.lang.Type.isString(L)||qx.lang.Type.isObject(L))){throw new Error(p);}
;}
;if(qx.lang.Type.isObject(L)){L=qx.lang.Object.toUriParameter(L);}
;if(!L){return K;}
;return K+=(/\?/).test(K)?r+L:n+L;}
,getAbsolute:function(M){var N=document.createElement(g);N.innerHTML=q+M+t;return N.firstChild.href;}
}});}
)();
(function(){var b="qx.util.ValueManager",a="abstract";qx.Class.define(b,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this._dynamic={};}
,members:{_dynamic:null,resolveDynamic:function(c){return this._dynamic[c];}
,isDynamic:function(d){return !!this._dynamic[d];}
,resolve:function(e){if(e&&this._dynamic[e]){return this._dynamic[e];}
;return e;}
,_setDynamic:function(f){this._dynamic=f;}
,_getDynamic:function(){return this._dynamic;}
},destruct:function(){this._dynamic=null;}
});}
)();
(function(){var j="0",i="qx/static",h="http://",g="https://",f="file://",e="qx.util.AliasManager",d="singleton",c=".",b="static",a="/";qx.Class.define(e,{type:d,extend:qx.util.ValueManager,construct:function(){qx.util.ValueManager.call(this);this.__ds={};this.add(b,i);}
,members:{__ds:null,_preprocess:function(k){var n=this._getDynamic();if(n[k]===false){return k;}
else if(n[k]===undefined){if(k.charAt(0)===a||k.charAt(0)===c||k.indexOf(h)===0||k.indexOf(g)===j||k.indexOf(f)===0){n[k]=false;return k;}
;if(this.__ds[k]){return this.__ds[k];}
;var m=k.substring(0,k.indexOf(a));var l=this.__ds[m];if(l!==undefined){n[k]=l+k.substring(m.length);}
;}
;return k;}
,add:function(o,p){this.__ds[o]=p;var r=this._getDynamic();for(var q in r){if(q.substring(0,q.indexOf(a))===o){r[q]=p+q.substring(o.length);}
;}
;}
,remove:function(s){delete this.__ds[s];}
,resolve:function(t){var u=this._getDynamic();if(t!=null){t=this._preprocess(t);}
;return u[t]||t;}
,getAliases:function(){var v={};for(var w in this.__ds){v[w]=this.__ds[w];}
;return v;}
},destruct:function(){this.__ds=null;}
});}
)();
(function(){var m='Invalid include in theme "',k='The configuration key "',j="Mixin theme is not a valid theme!",h='" is not allowed!',g="You can only define one theme category per file! Invalid theme: ",f="other",e="Found base flag in entry '",d='Invalid patch in theme "',c="[Theme ",b="' of theme '",U='" is invalid: ',T='Invalid extend in theme "',S='Invalid type of key "',R='The key "',Q='"!',P="]",O='"! The value needs to be a map!',N='"! The type of the key must be "',M='The type of the key "',L="qx.Theme",t='The content of a meta theme must reference to other themes. The value for "',u='" inside the meta block is wrong.',r='"! The value is undefined/null!',s='" is not allowed inside a meta theme block.',p="'. Base flags are not allowed for themes without a valid super theme!",q="'!",n="fonts",o="appearances",v="icons",w="string",D="decorations",B="widgets",F="borders",E="' are not compatible '",H="The mixins '",G="colors",y='Invalid key "',K="meta",J='": ',I="undefined",x='" in theme "',z="Theme",A="qx.debug",C="object";qx.Bootstrap.define(L,{statics:{define:function(name,V){if(!V){var V={};}
;V.include=this.__rc(V.include);V.patch=this.__rc(V.patch);if(qx.core.Environment.get(A)){this.__d(name,V);}
;var W={$$type:z,name:name,title:V.title,toString:this.genericToString};if(V.extend){W.supertheme=V.extend;}
;W.basename=qx.Bootstrap.createNamespace(name,W);this.__rf(W,V);this.__rd(W,V);this.$$registry[name]=W;for(var i=0,a=V.include,l=a.length;i<l;i++){this.include(W,a[i]);}
;for(var i=0,a=V.patch,l=a.length;i<l;i++){this.patch(W,a[i]);}
;}
,__rc:function(X){if(!X){return [];}
;if(qx.Bootstrap.isArray(X)){return X;}
else {return [X];}
;}
,__rd:function(Y,ba){var bb=ba.aliases||{};if(ba.extend&&ba.extend.aliases){qx.Bootstrap.objectMergeWith(bb,ba.extend.aliases,false);}
;Y.aliases=bb;}
,getAll:function(){return this.$$registry;}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,genericToString:function(){return c+this.name+P;}
,__re:function(bc){for(var i=0,bd=this.__rg,l=bd.length;i<l;i++){if(bc[bd[i]]){return bd[i];}
;}
;}
,__rf:function(be,bf){var bi=this.__re(bf);if(bf.extend&&!bi){bi=bf.extend.type;}
;be.type=bi||f;var bk=function(){}
;if(bf.extend){bk.prototype=new bf.extend.$$clazz;}
;var bj=bk.prototype;var bh=bf[bi];for(var bg in bh){bj[bg]=bh[bg];if(bj[bg].base){if(qx.core.Environment.get(A)){if(!bf.extend){throw new Error(e+bg+b+bf.name+p);}
;}
;bj[bg].base=bf.extend;}
;}
;be.$$clazz=bk;be[bi]=new bk;}
,$$registry:{},__rg:[G,F,D,n,v,B,o,K],__c:qx.core.Environment.select(A,{"true":{"title":w,"aliases":C,"type":w,"extend":C,"colors":C,"borders":C,"decorations":C,"fonts":C,"icons":C,"widgets":C,"appearances":C,"meta":C,"include":C,"patch":C},"default":null}),__rh:qx.core.Environment.select(A,{"true":{"color":C,"border":C,"decoration":C,"font":C,"icon":C,"appearance":C,"widget":C},"default":null}),__d:qx.core.Environment.select(A,{"true":function(name,bl){var bq=this.__c;for(var bp in bl){if(bq[bp]===undefined){throw new Error(k+bp+x+name+h);}
;if(bl[bp]==null){throw new Error(y+bp+x+name+r);}
;if(bq[bp]!==null&&typeof bl[bp]!==bq[bp]){throw new Error(S+bp+x+name+N+bq[bp]+Q);}
;}
;var bo=[G,F,D,n,v,B,o,K];for(var i=0,l=bo.length;i<l;i++){var bp=bo[i];if(bl[bp]!==undefined&&(bl[bp] instanceof Array||bl[bp] instanceof RegExp||bl[bp] instanceof Date||bl[bp].classname!==undefined)){throw new Error(y+bp+x+name+O);}
;}
;var bm=0;for(var i=0,l=bo.length;i<l;i++){var bp=bo[i];if(bl[bp]){bm++;}
;if(bm>1){throw new Error(g+name);}
;}
;if(bl.meta){var bn;for(var bp in bl.meta){bn=bl.meta[bp];if(this.__rh[bp]===undefined){throw new Error(R+bp+s);}
;if(typeof bn!==this.__rh[bp]){throw new Error(M+bp+u);}
;if(!(typeof bn===C&&bn!==null&&bn.$$type===z)){throw new Error(t+bp+x+name+U+bn);}
;}
;}
;if(bl.extend&&bl.extend.$$type!==z){throw new Error(T+name+J+bl.extend);}
;if(bl.include){for(var i=0,l=bl.include.length;i<l;i++){if(typeof (bl.include[i])==I||bl.include[i].$$type!==z){throw new Error(m+name+J+bl.include[i]);}
;}
;}
;if(bl.patch){for(var i=0,l=bl.patch.length;i<l;i++){if(typeof (bl.patch[i])==I||bl.patch[i].$$type!==z){throw new Error(d+name+J+bl.patch[i]);}
;}
;}
;}
,"default":function(){}
}),patch:function(br,bs){this.__ri(bs);var bu=this.__re(bs);if(bu!==this.__re(br)){throw new Error(H+br.name+E+bs.name+q);}
;var bt=bs[bu];var bv=br.$$clazz.prototype;for(var bw in bt){bv[bw]=bt[bw];}
;}
,include:function(bx,by){this.__ri(by);var bA=by.type;if(bA!==bx.type){throw new Error(H+bx.name+E+by.name+q);}
;var bz=by[bA];var bB=bx.$$clazz.prototype;for(var bC in bz){if(bB[bC]!==undefined){continue;}
;bB[bC]=bz[bC];}
;}
,__ri:function(bD){if(typeof bD===I||bD==null){var bE=new Error(j);if(qx.core.Environment.get(A)){var bF=qx.dev.StackTrace.getStackTraceFromError(bE);qx.Bootstrap.error(this,bF);}
;throw bE;}
;}
}});}
)();
(function(){var g="",f="This decorator is already in-use. Modification is not possible anymore!",e="qx.debug",d="qx.theme",c="qx.ui.decoration.MBackgroundColor",b="Color",a="_applyBackgroundColor";qx.Mixin.define(c,{properties:{backgroundColor:{check:b,nullable:true,apply:a}},members:{_tintBackgroundColor:function(h,i,j){if(i==null){i=this.getBackgroundColor();}
;if(qx.core.Environment.get(d)){i=qx.theme.manager.Color.getInstance().resolve(i);}
;j.backgroundColor=i||g;}
,_resizeBackgroundColor:function(k,l,m){var n=this.getInsets();l-=n.left+n.right;m-=n.top+n.bottom;return {left:n.left,top:n.top,width:l,height:m};}
,_applyBackgroundColor:function(){if(qx.core.Environment.get(e)){if(this._isInitialized()){throw new Error(f);}
;}
;}
}});}
)();
(function(){var g="_applyTheme",f="qx.theme.manager.Color",e="Theme",d="changeTheme",c="string",b="singleton",a="Could not parse color: ";qx.Class.define(f,{type:b,extend:qx.util.ValueManager,properties:{theme:{check:e,nullable:true,apply:g,event:d}},members:{_applyTheme:function(h){var i={};if(h){var j=h.colors;var k=qx.util.ColorUtil;var l;for(var m in j){l=j[m];if(typeof l===c){if(!k.isCssString(l)){throw new Error(a+l);}
;}
else if(l instanceof Array){l=k.rgbToRgbString(l);}
else {throw new Error(a+l);}
;i[m]=l;}
;}
;this._setDynamic(i);}
,resolve:function(n){var q=this._dynamic;var o=q[n];if(o){return o;}
;var p=this.getTheme();if(p!==null&&p.colors[n]){return q[n]=p.colors[n];}
;return n;}
,isDynamic:function(r){var t=this._dynamic;if(r&&(t[r]!==undefined)){return true;}
;var s=this.getTheme();if(s!==null&&r&&(s.colors[r]!==undefined)){t[r]=s.colors[r];return true;}
;return false;}
}});}
)();
(function(){var o="Invalid hex value: ",n="qx.util.ColorUtil",m=")",l="#",k="Invalid hex3 value: ",j="qx.theme.manager.Color",h="rgb(",e="Invalid hex6 value: ",d="Could not parse color: ",c="Could not convert system colors to RGB: ",a=",";qx.Bootstrap.define(n,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(s){return this.NAMED[s]!==undefined;}
,isSystemColor:function(u){return this.SYSTEM[u]!==undefined;}
,supportsThemes:function(){if(qx.Class){return qx.Class.isDefined(j);}
;return false;}
,isThemedColor:function(v){if(!this.supportsThemes()){return false;}
;if(qx.theme&&qx.theme.manager&&qx.theme.manager.Color){return qx.theme.manager.Color.getInstance().isDynamic(v);}
;return false;}
,stringToRgb:function(w){if(this.supportsThemes()&&this.isThemedColor(w)){var w=qx.theme.manager.Color.getInstance().resolveDynamic(w);}
;if(this.isNamedColor(w)){return this.NAMED[w];}
else if(this.isSystemColor(w)){throw new Error(c+w);}
else if(this.isRgbString(w)){return this.__ir();}
else if(this.isHex3String(w)){return this.__it();}
else if(this.isHex6String(w)){return this.__iu();}
;;;;throw new Error(d+w);}
,cssStringToRgb:function(x){if(this.isNamedColor(x)){return this.NAMED[x];}
else if(this.isSystemColor(x)){throw new Error(c+x);}
else if(this.isRgbString(x)){return this.__ir();}
else if(this.isRgbaString(x)){return this.__is();}
else if(this.isHex3String(x)){return this.__it();}
else if(this.isHex6String(x)){return this.__iu();}
;;;;;throw new Error(d+x);}
,stringToRgbString:function(y){return this.rgbToRgbString(this.stringToRgb(y));}
,rgbToRgbString:function(z){return h+z[0]+a+z[1]+a+z[2]+m;}
,rgbToHexString:function(A){return (l+qx.lang.String.pad(A[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(A[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(A[2].toString(16).toUpperCase(),2));}
,isValidPropertyValue:function(B){return (this.isThemedColor(B)||this.isNamedColor(B)||this.isHex3String(B)||this.isHex6String(B)||this.isRgbString(B)||this.isRgbaString(B));}
,isCssString:function(C){return (this.isSystemColor(C)||this.isNamedColor(C)||this.isHex3String(C)||this.isHex6String(C)||this.isRgbString(C)||this.isRgbaString(C));}
,isHex3String:function(D){return this.REGEXP.hex3.test(D);}
,isHex6String:function(E){return this.REGEXP.hex6.test(E);}
,isRgbString:function(F){return this.REGEXP.rgb.test(F);}
,isRgbaString:function(G){return this.REGEXP.rgba.test(G);}
,__ir:function(){var J=parseInt(RegExp.$1,10);var I=parseInt(RegExp.$2,10);var H=parseInt(RegExp.$3,10);return [J,I,H];}
,__is:function(){var M=parseInt(RegExp.$1,10);var L=parseInt(RegExp.$2,10);var K=parseInt(RegExp.$3,10);return [M,L,K];}
,__it:function(){var P=parseInt(RegExp.$1,16)*17;var O=parseInt(RegExp.$2,16)*17;var N=parseInt(RegExp.$3,16)*17;return [P,O,N];}
,__iu:function(){var S=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);var R=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);var Q=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);return [S,R,Q];}
,hex3StringToRgb:function(T){if(this.isHex3String(T)){return this.__it(T);}
;throw new Error(k+T);}
,hex3StringToHex6String:function(U){if(this.isHex3String(U)){return this.rgbToHexString(this.hex3StringToRgb(U));}
;return U;}
,hex6StringToRgb:function(V){if(this.isHex6String(V)){return this.__iu(V);}
;throw new Error(e+V);}
,hexStringToRgb:function(W){if(this.isHex3String(W)){return this.__it(W);}
;if(this.isHex6String(W)){return this.__iu(W);}
;throw new Error(o+W);}
,rgbToHsb:function(X){var ba,bb,bd;var bj=X[0];var bg=X[1];var Y=X[2];var bi=(bj>bg)?bj:bg;if(Y>bi){bi=Y;}
;var bc=(bj<bg)?bj:bg;if(Y<bc){bc=Y;}
;bd=bi/255.0;if(bi!=0){bb=(bi-bc)/bi;}
else {bb=0;}
;if(bb==0){ba=0;}
else {var bf=(bi-bj)/(bi-bc);var bh=(bi-bg)/(bi-bc);var be=(bi-Y)/(bi-bc);if(bj==bi){ba=be-bh;}
else if(bg==bi){ba=2.0+bf-be;}
else {ba=4.0+bh-bf;}
;ba=ba/6.0;if(ba<0){ba=ba+1.0;}
;}
;return [Math.round(ba*360),Math.round(bb*100),Math.round(bd*100)];}
,hsbToRgb:function(bk){var i,f,p,q,t;var bl=bk[0]/360;var bm=bk[1]/100;var bn=bk[2]/100;if(bl>=1.0){bl%=1.0;}
;if(bm>1.0){bm=1.0;}
;if(bn>1.0){bn=1.0;}
;var bo=Math.floor(255*bn);var bp={};if(bm==0.0){bp.red=bp.green=bp.blue=bo;}
else {bl*=6.0;i=Math.floor(bl);f=bl-i;p=Math.floor(bo*(1.0-bm));q=Math.floor(bo*(1.0-(bm*f)));t=Math.floor(bo*(1.0-(bm*(1.0-f))));switch(i){case 0:bp.red=bo;bp.green=t;bp.blue=p;break;case 1:bp.red=q;bp.green=bo;bp.blue=p;break;case 2:bp.red=p;bp.green=bo;bp.blue=t;break;case 3:bp.red=p;bp.green=q;bp.blue=bo;break;case 4:bp.red=t;bp.green=p;bp.blue=bo;break;case 5:bp.red=bo;bp.green=p;bp.blue=q;break;};}
;return [bp.red,bp.green,bp.blue];}
,randomColor:function(){var r=Math.round(Math.random()*255);var g=Math.round(Math.random()*255);var b=Math.round(Math.random()*255);return this.rgbToRgbString([r,g,b]);}
}});}
)();
(function(){var j="backgroundPositionX",i='</div>',h="engine.version",g="scale",f="browser.quirksmode",e='<div style="',d="qx.debug",c="repeat-y",b="hidden",a="qx.ui.decoration.MBackgroundImage",v="String",u="backgroundPositionY",t='">',s="mshtml",r="engine.name",q="This decorator is already in-use. Modification is not possible anymore!",p="no-repeat",o=" ",n="repeat-x",m="repeat",k="",l="_applyBackgroundImage";qx.Mixin.define(a,{properties:{backgroundImage:{check:v,nullable:true,apply:l},backgroundRepeat:{check:[m,n,c,p,g],init:m,apply:l},backgroundPositionX:{nullable:true,apply:l},backgroundPositionY:{nullable:true,apply:l},backgroundPosition:{group:[u,j]}},members:{_generateMarkup:this._generateBackgroundMarkup,_generateBackgroundMarkup:function(w,content){var A=k;var z=this.getBackgroundImage();var y=this.getBackgroundRepeat();var top=this.getBackgroundPositionY();if(top==null){top=0;}
;var B=this.getBackgroundPositionX();if(B==null){B=0;}
;w.backgroundPosition=B+o+top;if(z){var x=qx.util.AliasManager.getInstance().resolve(z);A=qx.bom.element.Decoration.create(x,y,w);}
else {if((qx.core.Environment.get(r)==s)){if(parseFloat(qx.core.Environment.get(h))<7||qx.core.Environment.get(f)){w.overflow=b;}
;}
;if(!content){content=k;}
;A=e+qx.bom.element.Style.compile(w)+t+content+i;}
;return A;}
,_applyBackgroundImage:function(){if(qx.core.Environment.get(d)){if(this._isInitialized()){throw new Error(q);}
;}
;}
}});}
)();
(function(){var k="qx/icon",j=".png",i="crop",h="engine.version",g="Potential clipped image candidate: ",f="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",d='<div style="',c="repeat-y",b='<img src="',a="qx.bom.element.Decoration",N="Image modification not possible because elements could not be replaced at runtime anymore!",M="', sizingMethod='",L="'!",K='"/>',J="png",I="')",H='"></div>',G='" style="',F="none",E="ImageLoader: Not recognized format of external image '",r="webkit",s=" ",p="repeat-x",q="DXImageTransform.Microsoft.AlphaImageLoader",n="qx/static/blank.gif",o="absolute",l="repeat",m="scale",t="mshtml",u="b64",x="scale-y",w="no-repeat",z="qx.debug",y="scale-x",B="",A="engine.name",v="div",D="img",C="px";qx.Class.define(a,{statics:{DEBUG:false,__hS:{},__hT:(qx.core.Environment.get(A)==t)&&qx.core.Environment.get(h)<9,__hU:qx.core.Environment.select(A,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__hV:{"scale-x":D,"scale-y":D,"scale":D,"repeat":v,"no-repeat":v,"repeat-x":v,"repeat-y":v},update:function(O,P,Q,R){var T=this.getTagName(Q,P);if(T!=O.tagName.toLowerCase()){throw new Error(N);}
;var U=this.getAttributes(P,Q,R);if(T===D){O.src=U.src||qx.util.ResourceManager.getInstance().toUri(n);}
;if(O.style.backgroundPosition!=B&&U.style.backgroundPosition===undefined){U.style.backgroundPosition=null;}
;if(O.style.clip!=B&&U.style.clip===undefined){U.style.clip=null;}
;var S=qx.bom.element.Style;S.setStyles(O,U.style);if(this.__hT){try{O.filters[q].apply();}
catch(e){}
;}
;}
,create:function(V,W,X){var Y=this.getTagName(W,V);var bb=this.getAttributes(V,W,X);var ba=qx.bom.element.Style.compile(bb.style);if(Y===D){return b+bb.src+G+ba+K;}
else {return d+ba+H;}
;}
,getTagName:function(bc,bd){if(bd&&this.__hT&&this.__hU[bc]&&qx.lang.String.endsWith(bd,j)){return v;}
;return this.__hV[bc];}
,getAttributes:function(be,bf,bh){if(!bh){bh={};}
;if(!bh.position){bh.position=o;}
;if((qx.core.Environment.get(A)==t)){bh.fontSize=0;bh.lineHeight=0;}
else if((qx.core.Environment.get(A)==r)){bh.WebkitUserDrag=F;}
;var bj=qx.util.ResourceManager.getInstance().getImageFormat(be)||qx.io.ImageLoader.getFormat(be);if(qx.core.Environment.get(z)){if(be!=null&&bj==null){qx.log.Logger.warn(E+be+L);}
;}
;var bi;if(this.__hT&&this.__hU[bf]&&bj===J){bi=this.__hY(bh,bf,be);}
else {if(bf===m){bi=this.__ia(bh,bf,be);}
else if(bf===y||bf===x){bi=this.__ib(bh,bf,be);}
else {bi=this.__ie(bh,bf,be);}
;}
;return bi;}
,__hW:function(bk,bl,bm){if(bk.width==null&&bl!=null){bk.width=bl+C;}
;if(bk.height==null&&bm!=null){bk.height=bm+C;}
;return bk;}
,__hX:function(bn){var bo=qx.util.ResourceManager.getInstance().getImageWidth(bn)||qx.io.ImageLoader.getWidth(bn);var bp=qx.util.ResourceManager.getInstance().getImageHeight(bn)||qx.io.ImageLoader.getHeight(bn);return {width:bo,height:bp};}
,__hY:function(bq,br,bs){var bv=this.__hX(bs);bq=this.__hW(bq,bv.width,bv.height);var bu=br==w?i:m;var bt=f+qx.util.ResourceManager.getInstance().toUri(bs)+M+bu+I;bq.filter=bt;bq.backgroundImage=bq.backgroundRepeat=B;return {style:bq};}
,__ia:function(bw,bx,by){var bz=qx.util.ResourceManager.getInstance().toUri(by);var bA=this.__hX(by);bw=this.__hW(bw,bA.width,bA.height);return {src:bz,style:bw};}
,__ib:function(bB,bC,bD){var bE=qx.util.ResourceManager.getInstance();var bH=bE.getCombinedFormat(bD);var bJ=this.__hX(bD);var bF;if(bH){var bI=bE.getData(bD);var bG=bI[4];if(bH==u){bF=bE.toDataUri(bD);}
else {bF=bE.toUri(bG);}
;if(bC===y){bB=this.__ic(bB,bI,bJ.height);}
else {bB=this.__id(bB,bI,bJ.width);}
;return {src:bF,style:bB};}
else {if(qx.core.Environment.get(z)){this.__ig(bD);}
;if(bC==y){bB.height=bJ.height==null?null:bJ.height+C;}
else if(bC==x){bB.width=bJ.width==null?null:bJ.width+C;}
;bF=bE.toUri(bD);return {src:bF,style:bB};}
;}
,__ic:function(bK,bL,bM){var bN=qx.util.ResourceManager.getInstance().getImageHeight(bL[4]);bK.clip={top:-bL[6],height:bM};bK.height=bN+C;if(bK.top!=null){bK.top=(parseInt(bK.top,10)+bL[6])+C;}
else if(bK.bottom!=null){bK.bottom=(parseInt(bK.bottom,10)+bM-bN-bL[6])+C;}
;return bK;}
,__id:function(bO,bP,bQ){var bR=qx.util.ResourceManager.getInstance().getImageWidth(bP[4]);bO.clip={left:-bP[5],width:bQ};bO.width=bR+C;if(bO.left!=null){bO.left=(parseInt(bO.left,10)+bP[5])+C;}
else if(bO.right!=null){bO.right=(parseInt(bO.right,10)+bQ-bR-bP[5])+C;}
;return bO;}
,__ie:function(bS,bT,bU){var bX=qx.util.ResourceManager.getInstance();var cd=bX.getCombinedFormat(bU);var cf=this.__hX(bU);if(cd&&bT!==l){var ce=bX.getData(bU);var cc=ce[4];if(cd==u){var cb=bX.toDataUri(bU);var ca=0;var bY=0;}
else {var cb=bX.toUri(cc);var ca=ce[5];var bY=ce[6];}
;var bV=qx.bom.element.Background.getStyles(cb,bT,ca,bY);for(var bW in bV){bS[bW]=bV[bW];}
;if(cf.width!=null&&bS.width==null&&(bT==c||bT===w)){bS.width=cf.width+C;}
;if(cf.height!=null&&bS.height==null&&(bT==p||bT===w)){bS.height=cf.height+C;}
;return {style:bS};}
else {if(qx.core.Environment.get(z)){if(bT!==l){this.__ig(bU);}
;}
;bS=this.__hW(bS,cf.width,cf.height);bS=this.__if(bS,bU,bT);return {style:bS};}
;}
,__if:function(cg,ch,ci){var top=null;var cm=null;if(cg.backgroundPosition){var cj=cg.backgroundPosition.split(s);cm=parseInt(cj[0],10);if(isNaN(cm)){cm=cj[0];}
;top=parseInt(cj[1],10);if(isNaN(top)){top=cj[1];}
;}
;var cl=qx.bom.element.Background.getStyles(ch,ci,cm,top);for(var ck in cl){cg[ck]=cl[ck];}
;if(cg.filter){cg.filter=B;}
;return cg;}
,__ig:function(cn){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(cn)&&cn.indexOf(k)==-1){if(!this.__hS[cn]){qx.log.Logger.debug(g+cn);this.__hS[cn]=true;}
;}
;}
,isAlphaImageLoaderEnabled:function(){return qx.bom.element.Decoration.__hT;}
}});}
)();
(function(){var c="load",b="qx.io.ImageLoader",a="html.image.naturaldimensions";qx.Bootstrap.define(b,{statics:{__cR:{},__ih:{width:null,height:null},__ii:/\.(png|gif|jpg|jpeg|bmp)\b/i,__ij:/^data:image\/(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(d){var e=this.__cR[d];return !!(e&&e.loaded);}
,isFailed:function(f){var g=this.__cR[f];return !!(g&&g.failed);}
,isLoading:function(h){var j=this.__cR[h];return !!(j&&j.loading);}
,getFormat:function(k){var m=this.__cR[k];if(!m||!m.format){var o=this.__ij.exec(k);if(o!=null){var p=(m&&qx.lang.Type.isNumber(m.width)?m.width:this.__ih.width);var n=(m&&qx.lang.Type.isNumber(m.height)?m.height:this.__ih.height);m={loaded:true,format:o[1],width:p,height:n};}
;}
;return m?m.format:null;}
,getSize:function(q){var r=this.__cR[q];return r?{width:r.width,height:r.height}:this.__ih;}
,getWidth:function(s){var t=this.__cR[s];return t?t.width:null;}
,getHeight:function(u){var v=this.__cR[u];return v?v.height:null;}
,load:function(w,x,y){var z=this.__cR[w];if(!z){z=this.__cR[w]={};}
;if(x&&!y){y=window;}
;if(z.loaded||z.loading||z.failed){if(x){if(z.loading){z.callbacks.push(x,y);}
else {x.call(y,w,z);}
;}
;}
else {z.loading=true;z.callbacks=[];if(x){z.callbacks.push(x,y);}
;var B=new Image();var A=qx.lang.Function.listener(this.__ik,this,B,w);B.onload=A;B.onerror=A;B.src=w;z.element=B;}
;}
,abort:function(C){var D=this.__cR[C];if(D&&!D.loaded){D.aborted=true;var F=D.callbacks;var E=D.element;E.onload=E.onerror=null;delete D.callbacks;delete D.element;delete D.loading;for(var i=0,l=F.length;i<l;i+=2){F[i].call(F[i+1],C,D);}
;}
;this.__cR[C]=null;}
,__ik:qx.event.GlobalError.observeMethod(function(event,G,H){var I=this.__cR[H];if(event.type===c){I.loaded=true;I.width=this.__il(G);I.height=this.__im(G);var J=this.__ii.exec(H);if(J!=null){I.format=J[1];}
;}
else {I.failed=true;}
;G.onload=G.onerror=null;var K=I.callbacks;delete I.loading;delete I.callbacks;delete I.element;for(var i=0,l=K.length;i<l;i+=2){K[i].call(K[i+1],H,I);}
;}
),__il:function(L){return qx.core.Environment.get(a)?L.naturalWidth:L.width;}
,__im:function(M){return qx.core.Environment.get(a)?M.naturalHeight:M.height;}
}});}
)();
(function(){var u="')",t="gecko",s="background-image:url(",r=");",q="",p=")",o="background-repeat:",n="engine.version",m="data:",l=" ",e="qx.bom.element.Background",k="url(",h="background-position:",c="base64",b="url('",g="engine.name",f="0",i="px",a=";",j="'",d="number";qx.Class.define(e,{statics:{__in:[s,null,r,h,null,a,o,null,a],__io:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__ip:function(v,top){var w=qx.core.Environment.get(g);var x=qx.core.Environment.get(n);if(w==t&&x<1.9&&v==top&&typeof v==d){top+=0.01;}
;if(v){var z=(typeof v==d)?v+i:v;}
else {z=f;}
;if(top){var y=(typeof top==d)?top+i:top;}
else {y=f;}
;return z+l+y;}
,__iq:function(A){var String=qx.lang.String;var B=A.substr(0,50);return String.startsWith(B,m)&&String.contains(B,c);}
,compile:function(C,D,E,top){var F=this.__ip(E,top);var G=qx.util.ResourceManager.getInstance().toUri(C);if(this.__iq(G)){G=j+G+j;}
;var H=this.__in;H[1]=G;H[4]=F;H[7]=D;return H.join(q);}
,getStyles:function(I,J,K,top){if(!I){return this.__io;}
;var L=this.__ip(K,top);var N=qx.util.ResourceManager.getInstance().toUri(I);var O;if(this.__iq(N)){O=b+N+u;}
else {O=k+N+p;}
;var M={backgroundPosition:L,backgroundImage:O};if(J!=null){M.backgroundRepeat=J;}
;return M;}
,set:function(P,Q,R,S,top){var T=this.getStyles(Q,R,S,top);for(var U in T){P.style[U]=T[U];}
;}
}});}
)();
(function(){var j="qx.theme",i="border-top",h="border-left",g="border-right",f="qx.ui.decoration.MSingleBorder",e="border-bottom",d="This decorator is already in-use. Modification is not possible anymore!",c="Invalid Single decorator (zero border width). Use qx.ui.decorator.Background instead!",b="absolute",a="widthTop",H="styleRight",G="styleBottom",F="qx.debug",E="widthBottom",D="widthLeft",C="styleTop",B="colorBottom",A="styleLeft",z="widthRight",y="colorLeft",q="colorRight",r="colorTop",o="shorthand",p="double",m="px ",n="dotted",k="_applyWidth",l="Color",s="",t="dashed",v="Number",u=" ",x="solid",w="_applyStyle";qx.Mixin.define(f,{properties:{widthTop:{check:v,init:0,apply:k},widthRight:{check:v,init:0,apply:k},widthBottom:{check:v,init:0,apply:k},widthLeft:{check:v,init:0,apply:k},styleTop:{nullable:true,check:[x,n,t,p],init:x,apply:w},styleRight:{nullable:true,check:[x,n,t,p],init:x,apply:w},styleBottom:{nullable:true,check:[x,n,t,p],init:x,apply:w},styleLeft:{nullable:true,check:[x,n,t,p],init:x,apply:w},colorTop:{nullable:true,check:l,apply:w},colorRight:{nullable:true,check:l,apply:w},colorBottom:{nullable:true,check:l,apply:w},colorLeft:{nullable:true,check:l,apply:w},left:{group:[D,A,y]},right:{group:[z,H,q]},top:{group:[a,C,r]},bottom:{group:[E,G,B]},width:{group:[a,z,E,D],mode:o},style:{group:[C,H,G,A],mode:o},color:{group:[r,q,B,y],mode:o}},members:{_styleBorder:function(I){if(qx.core.Environment.get(j)){var K=qx.theme.manager.Color.getInstance();var O=K.resolve(this.getColorTop());var L=K.resolve(this.getColorRight());var J=K.resolve(this.getColorBottom());var N=K.resolve(this.getColorLeft());}
else {var O=this.getColorTop();var L=this.getColorRight();var J=this.getColorBottom();var N=this.getColorLeft();}
;var M=this.getWidthTop();if(M>0){I[i]=M+m+this.getStyleTop()+u+(O||s);}
;var M=this.getWidthRight();if(M>0){I[g]=M+m+this.getStyleRight()+u+(L||s);}
;var M=this.getWidthBottom();if(M>0){I[e]=M+m+this.getStyleBottom()+u+(J||s);}
;var M=this.getWidthLeft();if(M>0){I[h]=M+m+this.getStyleLeft()+u+(N||s);}
;if(qx.core.Environment.get(F)){if(I.length===0){throw new Error(c);}
;}
;I.position=b;I.top=0;I.left=0;}
,_resizeBorder:function(P,Q,R){var S=this.getInsets();Q-=S.left+S.right;R-=S.top+S.bottom;if(Q<0){Q=0;}
;if(R<0){R=0;}
;return {left:S.left-this.getWidthLeft(),top:S.top-this.getWidthTop(),width:Q,height:R};}
,_getDefaultInsetsForBorder:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};}
,_applyWidth:function(){this._applyStyle();this._resetInsets();}
,_applyStyle:function(){if(qx.core.Environment.get(F)){if(this._markup){throw new Error(d);}
;}
;}
}});}
)();
(function(){var a="qx.ui.decoration.IDecorator";qx.Interface.define(a,{members:{getMarkup:function(){}
,resize:function(b,c,d){}
,tint:function(e,f){}
,getInsets:function(){}
}});}
)();
(function(){var l="abstract",k="insetRight",j="insetTop",i="qx.debug",h="insetBottom",g="qx.ui.decoration.Abstract",f="This decorator is already in-use. Modification is not possible anymore!",e="shorthand",d="insetLeft",c="Abstract method called.",a="Number",b="_applyInsets";qx.Class.define(g,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:l,properties:{insetLeft:{check:a,nullable:true,apply:b},insetRight:{check:a,nullable:true,apply:b},insetBottom:{check:a,nullable:true,apply:b},insetTop:{check:a,nullable:true,apply:b},insets:{group:[j,k,h,d],mode:e}},members:{__db:null,_getDefaultInsets:function(){throw new Error(c);}
,_isInitialized:function(){throw new Error(c);}
,_resetInsets:function(){this.__db=null;}
,getInsets:function(){if(this.__db){return this.__db;}
;var m=this._getDefaultInsets();return this.__db={left:this.getInsetLeft()==null?m.left:this.getInsetLeft(),right:this.getInsetRight()==null?m.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?m.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?m.top:this.getInsetTop()};}
,_applyInsets:function(){if(qx.core.Environment.get(i)){if(this._isInitialized()){throw new Error(f);}
;}
;this.__db=null;}
},destruct:function(){this.__db=null;}
});}
)();
(function(){var b="qx.ui.decoration.Single",a="px";qx.Class.define(b,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage,qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MSingleBorder],construct:function(c,d,e){qx.ui.decoration.Abstract.call(this);if(c!=null){this.setWidth(c);}
;if(d!=null){this.setStyle(d);}
;if(e!=null){this.setColor(e);}
;}
,members:{_markup:null,getMarkup:function(){if(this._markup){return this._markup;}
;var f={};this._styleBorder(f);var g=this._generateBackgroundMarkup(f);return this._markup=g;}
,resize:function(h,i,j){var k=this._resizeBorder(h,i,j);h.style.width=k.width+a;h.style.height=k.height+a;h.style.left=k.left+a;h.style.top=k.top+a;}
,tint:function(l,m){this._tintBackgroundColor(l,m,l.style);}
,_isInitialized:function(){return !!this._markup;}
,_getDefaultInsets:function(){return this._getDefaultInsetsForBorder();}
},destruct:function(){this._markup=null;}
});}
)();
(function(){var j="radiusTopRight",i="radiusTopLeft",h="-webkit-border-bottom-left-radius",g="-webkit-background-clip",f="radiusBottomRight",e="-webkit-border-bottom-right-radius",d="border-top-left-radius",c="qx.debug",b="border-top-right-radius",a="border-bottom-left-radius",y="radiusBottomLeft",x="-webkit-border-top-left-radius",w="shorthand",v="-moz-border-radius-bottomright",u="padding-box",t="border-bottom-right-radius",s="qx.ui.decoration.MBorderRadius",r="-moz-border-radius-topright",q="This decorator is already in-use. Modification is not possible anymore!",p="-webkit-border-top-right-radius",n="-moz-border-radius-topleft",o="-moz-border-radius-bottomleft",l="Integer",m="_applyBorderRadius",k="px";qx.Mixin.define(s,{properties:{radiusTopLeft:{nullable:true,check:l,apply:m},radiusTopRight:{nullable:true,check:l,apply:m},radiusBottomLeft:{nullable:true,check:l,apply:m},radiusBottomRight:{nullable:true,check:l,apply:m},radius:{group:[i,j,f,y],mode:w}},members:{_styleBorderRadius:function(z){z[g]=u;var A=this.getRadiusTopLeft();if(A>0){z[n]=A+k;z[x]=A+k;z[d]=A+k;}
;A=this.getRadiusTopRight();if(A>0){z[r]=A+k;z[p]=A+k;z[b]=A+k;}
;A=this.getRadiusBottomLeft();if(A>0){z[o]=A+k;z[h]=A+k;z[a]=A+k;}
;A=this.getRadiusBottomRight();if(A>0){z[v]=A+k;z[e]=A+k;z[t]=A+k;}
;}
,_applyBorderRadius:function(){if(qx.core.Environment.get(c)){if(this._isInitialized()){throw new Error(q);}
;}
;}
}});}
)();
(function(){var q="box-shadow",p="This decorator is already in-use. Modification is not possible anymore!",o="shadowHorizontalLength",n="Boolean",m="",l="-webkit-box-shadow",k="qx.debug",j="-moz-box-shadow",i="qx.theme",h="shadowVerticalLength",c="inset ",g="shorthand",f="qx.ui.decoration.MBoxShadow",b="Color",a="px ",e="Integer",d="_applyBoxShadow";qx.Mixin.define(f,{properties:{shadowHorizontalLength:{nullable:true,check:e,apply:d},shadowVerticalLength:{nullable:true,check:e,apply:d},shadowBlurRadius:{nullable:true,check:e,apply:d},shadowSpreadRadius:{nullable:true,check:e,apply:d},shadowColor:{nullable:true,check:b,apply:d},inset:{init:false,check:n,apply:d},shadowLength:{group:[o,h],mode:g}},members:{_styleBoxShadow:function(r){if(qx.core.Environment.get(i)){var s=qx.theme.manager.Color.getInstance();var v=s.resolve(this.getShadowColor());}
else {var v=this.getShadowColor();}
;if(v!=null){var y=this.getShadowVerticalLength()||0;var t=this.getShadowHorizontalLength()||0;var blur=this.getShadowBlurRadius()||0;var x=this.getShadowSpreadRadius()||0;var w=this.getInset()?c:m;var u=w+t+a+y+a+blur+a+x+a+v;r[j]=u;r[l]=u;r[q]=u;}
;}
,_applyBoxShadow:function(){if(qx.core.Environment.get(k)){if(this._isInitialized()){throw new Error(p);}
;}
;}
}});}
)();
(function(){var a="qx.ui.decoration.Uniform";qx.Class.define(a,{extend:qx.ui.decoration.Single,construct:function(b,c,d){qx.ui.decoration.Single.call(this);if(b!=null){this.setWidth(b);}
;if(c!=null){this.setStyle(c);}
;if(d!=null){this.setColor(d);}
;}
});}
)();
(function(){var j="),to(",i="from(",h="background-image",g="background",f="<div style=\"position: absolute; width: 100%; height: 100%; filter:progid:DXImageTransform.Microsoft.Gradient",e="StartColorStr='#FF",d="browser.name",c="', ",b="-webkit-gradient(linear,",a="startColorPosition",Q="qx.debug",P="deg, ",O="css.gradient.legacywebkit",N="EndColorStr='#FF",M="startColor",L="qx.theme",K="ie",J="(GradientType=",I="qx.ui.decoration.MLinearBackgroundGradient",H="(",q="endColorPosition",r="';)\"></div>",o="endColor",p=", ",m="overflow",n="hidden",k="This decorator is already in-use. Modification is not possible anymore!",l=" 0",s="px",t="0",z="shorthand",y="Color",B="vertical",A="",D="css.gradient.filter",C="Number",v="%",G=")",F="css.gradient.linear",E=",",u="horizontal",w=" ",x="_applyLinearBackgroundGradient";qx.Mixin.define(I,{properties:{startColor:{check:y,nullable:true,apply:x},endColor:{check:y,nullable:true,apply:x},orientation:{check:[u,B],init:B,apply:x},startColorPosition:{check:C,init:0,apply:x},endColorPosition:{check:C,init:100,apply:x},colorPositionUnit:{check:[s,v],init:v,apply:x},gradientStart:{group:[M,a],mode:z},gradientEnd:{group:[o,q],mode:z}},members:{_styleLinearBackgroundGradient:function(R){var X=this.__sc();var bc=X.start;var V=X.end;var bd=this.getColorPositionUnit();if(qx.core.Environment.get(O)){bd=bd===s?A:bd;if(this.getOrientation()==u){var bb=this.getStartColorPosition()+bd+l+bd;var Y=this.getEndColorPosition()+bd+l+bd;}
else {var bb=t+bd+w+this.getStartColorPosition()+bd;var Y=t+bd+w+this.getEndColorPosition()+bd;}
;var T=i+bc+j+V+G;var U=b+bb+E+Y+E+T+G;R[g]=U;}
else if(qx.core.Environment.get(D)&&!qx.core.Environment.get(F)){R[m]=n;}
else {var be=this.getOrientation()==u?0:270;if(qx.core.Environment.get(d)==K){be=be-90;}
;var W=bc+w+this.getStartColorPosition()+bd;var S=V+w+this.getEndColorPosition()+bd;var ba=qx.core.Environment.get(F);R[h]=ba+H+be+P+W+E+S+G;}
;}
,__sc:function(){if(qx.core.Environment.get(L)){var bf=qx.theme.manager.Color.getInstance();var bh=bf.resolve(this.getStartColor());var bg=bf.resolve(this.getEndColor());}
else {var bh=this.getStartColor();var bg=this.getEndColor();}
;return {start:bh,end:bg};}
,_getContent:function(){if(qx.core.Environment.get(D)&&!qx.core.Environment.get(F)){var bj=this.__sc();var bl=this.getOrientation()==u?1:0;var bk=qx.util.ColorUtil.hex3StringToHex6String(bj.start);var bi=qx.util.ColorUtil.hex3StringToHex6String(bj.end);bk=bk.substring(1,bk.length);bi=bi.substring(1,bi.length);return f+J+bl+p+e+bk+c+N+bi+r;}
;return A;}
,_resizeLinearBackgroundGradient:function(bm,bn,bo){var bp=this.getInsets();bn-=bp.left+bp.right;bo-=bp.top+bp.bottom;return {left:bp.left,top:bp.top,width:bn,height:bo};}
,_applyLinearBackgroundGradient:function(){if(qx.core.Environment.get(Q)){if(this._isInitialized()){throw new Error(k);}
;}
;}
}});}
)();
(function(){var j="innerWidthRight",i="top",h="innerColorBottom",g="innerWidthTop",f="innerColorRight",e="innerColorTop",d="relative",c="browser.documentmode",b="innerColorLeft",a="",H="qx.ui.decoration.MDoubleBorder",G="left",F="Invalid Double decorator (zero inner border width). Use qx.ui.decoration.Single instead!",E="engine.version",D="innerWidthBottom",C="innerWidthLeft",B="position",A="Invalid Double decorator (zero outer border width). Use qx.ui.decoration.Single instead!",z="absolute",y="qx.theme",q="qx.debug",r="shorthand",o="line-height",p="engine.name",m="mshtml",n="Color",k="Number",l="border-top",s="border-left",t="border-bottom",v="border-right",u="px ",x=" ",w='';qx.Mixin.define(H,{include:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundImage],construct:function(){this._getDefaultInsetsForBorder=this.__sh;this._resizeBorder=this.__sg;this._styleBorder=this.__se;this._generateMarkup=this.__sf;}
,properties:{innerWidthTop:{check:k,init:0},innerWidthRight:{check:k,init:0},innerWidthBottom:{check:k,init:0},innerWidthLeft:{check:k,init:0},innerWidth:{group:[g,j,D,C],mode:r},innerColorTop:{nullable:true,check:n},innerColorRight:{nullable:true,check:n},innerColorBottom:{nullable:true,check:n},innerColorLeft:{nullable:true,check:n},innerColor:{group:[e,f,h,b],mode:r}},members:{__sd:null,__se:function(I){if(qx.core.Environment.get(y)){var K=qx.theme.manager.Color.getInstance();var L=K.resolve(this.getInnerColorTop());var O=K.resolve(this.getInnerColorRight());var M=K.resolve(this.getInnerColorBottom());var N=K.resolve(this.getInnerColorLeft());}
else {var L=this.getInnerColorTop();var O=this.getInnerColorRight();var M=this.getInnerColorBottom();var N=this.getInnerColorLeft();}
;I.position=d;var J=this.getInnerWidthTop();if(J>0){I[l]=J+u+this.getStyleTop()+x+L;}
;var J=this.getInnerWidthRight();if(J>0){I[v]=J+u+this.getStyleRight()+x+O;}
;var J=this.getInnerWidthBottom();if(J>0){I[t]=J+u+this.getStyleBottom()+x+M;}
;var J=this.getInnerWidthLeft();if(J>0){I[s]=J+u+this.getStyleLeft()+x+N;}
;if(qx.core.Environment.get(q)){if(!I[l]&&!I[v]&&!I[t]&&!I[s]){throw new Error(F);}
;}
;}
,__sf:function(P){var T=this._generateBackgroundMarkup(P,this._getContent?this._getContent():a);if(qx.core.Environment.get(y)){var R=qx.theme.manager.Color.getInstance();var W=R.resolve(this.getColorTop());var S=R.resolve(this.getColorRight());var Q=R.resolve(this.getColorBottom());var V=R.resolve(this.getColorLeft());}
else {var W=this.getColorTop();var S=this.getColorRight();var Q=this.getColorBottom();var V=this.getColorLeft();}
;P[l]=w;P[v]=w;P[t]=w;P[s]=w;P[o]=0;if((qx.core.Environment.get(p)==m&&parseFloat(qx.core.Environment.get(E))<8)||(qx.core.Environment.get(p)==m&&qx.core.Environment.get(c)<8)){P[o]=w;}
;var U=this.getWidthTop();if(U>0){P[l]=U+u+this.getStyleTop()+x+W;}
;var U=this.getWidthRight();if(U>0){P[v]=U+u+this.getStyleRight()+x+S;}
;var U=this.getWidthBottom();if(U>0){P[t]=U+u+this.getStyleBottom()+x+Q;}
;var U=this.getWidthLeft();if(U>0){P[s]=U+u+this.getStyleLeft()+x+V;}
;if(qx.core.Environment.get(q)){if(P[l]==w&&P[v]==w&&P[t]==w&&P[s]==w){throw new Error(A);}
;}
;P[B]=z;P[i]=0;P[G]=0;return this.__sd=this._generateBackgroundMarkup(P,T);}
,__sg:function(X,Y,ba){var bb=this.getInsets();Y-=bb.left+bb.right;ba-=bb.top+bb.bottom;var bc=bb.left-this.getWidthLeft()-this.getInnerWidthLeft();var top=bb.top-this.getWidthTop()-this.getInnerWidthTop();return {left:bc,top:top,width:Y,height:ba,elementToApplyDimensions:X.firstChild};}
,__sh:function(){return {top:this.getWidthTop()+this.getInnerWidthTop(),right:this.getWidthRight()+this.getInnerWidthRight(),bottom:this.getWidthBottom()+this.getInnerWidthBottom(),left:this.getWidthLeft()+this.getInnerWidthLeft()};}
}});}
)();
(function(){var j="button-box-dark-pressed",i="table-header",h="button-box-invalid",g="menubar-button-hovered",f="button-box-dark",e="#999999",d="qx/decoration/Simple",c="dotted",b="tooltip-text",a="table-focus-indicator",W="button-box-pressed-invalid",V="dark-blue",U="scrollbar-dark",T="qx.theme.simple.Decoration",S="table-header-cell",R="button",Q="border-lead",P="#FFF",O="button-box-pressed-focused",N="scrollbar-bright",q="border-light-shadow",r="white-box-border",o="window",p="scroll-knob-pressed",m="checkbox",n="window-border",k="radiobutton",l="scroll-knob",t="button-box-bright",u="window-border-inner",B="white",z="button-box-bright-pressed",F="tabview-page-button-top",D="border-separator",J="shadow",H="button-box-focused",w="border-main",M="background",L="border-light",K="button-border-hovered",v="gray",x="invalid",y="solid",A="button-border",C="button-box-hovered",E="button-box-pressed-hovered",G="background-selected",I="button-box-pressed",s="button-box";qx.Theme.define(T,{aliases:{decoration:d},decorations:{"border-blue":{decorator:qx.ui.decoration.Uniform,style:{width:4,color:G}},"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:w}},"main-dark":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:A}},"popup":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MBackgroundColor],style:{width:1,color:n,shadowLength:2,shadowBlurRadius:5,shadowColor:J}},"dragover":{decorator:qx.ui.decoration.Single,style:{bottom:[2,y,V]}},"button-box":{decorator:[qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundColor],style:{radius:3,width:1,color:A,gradientStart:[t,40],gradientEnd:[f,70],backgroundColor:t}},"button-box-pressed":{include:s,style:{gradientStart:[z,40],gradientEnd:[j,70],backgroundColor:z}},"button-box-pressed-hovered":{include:I,style:{color:K}},"button-box-hovered":{include:s,style:{color:K}},"button-box-invalid":{include:s,style:{color:x}},"button-box-pressed-invalid":{include:I,style:{color:x}},"button-box-hovered-invalid":{include:h},"button-box-pressed-hovered-invalid":{include:W},"button-box-focused":{include:s,style:{color:G}},"button-box-pressed-focused":{include:I,style:{color:G}},"button-box-hovered-focused":{include:H},"button-box-pressed-hovered-focused":{include:O},"button-box-right":{include:s,style:{radius:[0,3,3,0]}},"button-box-pressed-right":{include:I,style:{radius:[0,3,3,0]}},"button-box-pressed-hovered-right":{include:E,style:{radius:[0,3,3,0]}},"button-box-hovered-right":{include:C,style:{radius:[0,3,3,0]}},"button-box-focused-right":{include:H,style:{radius:[0,3,3,0]}},"button-box-right-borderless":{include:s,style:{radius:[0,3,3,0],width:[1,1,1,0]}},"button-box-pressed-right-borderless":{include:I,style:{radius:[0,3,3,0],width:[1,1,1,0]}},"button-box-pressed-hovered-right-borderless":{include:E,style:{radius:[0,3,3,0],width:[1,1,1,0]}},"button-box-hovered-right-borderless":{include:C,style:{radius:[0,3,3,0],width:[1,1,1,0]}},"button-box-top-right":{include:s,style:{radius:[0,3,0,0],width:[1,1,1,0]}},"button-box-pressed-top-right":{include:I,style:{radius:[0,3,0,0],width:[1,1,1,0]}},"button-box-pressed-hovered-top-right":{include:E,style:{radius:[0,3,0,0],width:[1,1,1,0]}},"button-box-hovered-top-right":{include:C,style:{radius:[0,3,0,0],width:[1,1,1,0]}},"button-box-bottom-right":{include:s,style:{radius:[0,0,3,0],width:[0,1,1,0]}},"button-box-pressed-bottom-right":{include:I,style:{radius:[0,0,3,0],width:[0,1,1,0]}},"button-box-pressed-hovered-bottom-right":{include:E,style:{radius:[0,0,3,0],width:[0,1,1,0]}},"button-box-hovered-bottom-right":{include:C,style:{radius:[0,0,3,0],width:[0,1,1,0]}},"button-box-bottom-left":{include:s,style:{radius:[0,0,0,3],width:[0,0,1,1]}},"button-box-pressed-bottom-left":{include:I,style:{radius:[0,0,0,3],width:[0,0,1,1]}},"button-box-pressed-hovered-bottom-left":{include:E,style:{radius:[0,0,0,3],width:[0,0,1,1]}},"button-box-hovered-bottom-left":{include:C,style:{radius:[0,0,0,3],width:[0,0,1,1]}},"button-box-top-left":{include:s,style:{radius:[3,0,0,0],width:[1,0,0,1]}},"button-box-pressed-top-left":{include:I,style:{radius:[3,0,0,0],width:[1,0,0,1]}},"button-box-pressed-hovered-top-left":{include:E,style:{radius:[3,0,0,0],width:[1,0,0,1]}},"button-box-hovered-top-left":{include:C,style:{radius:[3,0,0,0],width:[1,0,0,1]}},"button-box-middle":{include:s,style:{radius:0,width:[1,0,1,1]}},"button-box-pressed-middle":{include:I,style:{radius:0,width:[1,0,1,1]}},"button-box-pressed-hovered-middle":{include:E,style:{radius:0,width:[1,0,1,1]}},"button-box-hovered-middle":{include:C,style:{radius:0,width:[1,0,1,1]}},"button-box-left":{include:s,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"button-box-pressed-left":{include:I,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"button-box-pressed-hovered-left":{include:E,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"button-box-hovered-left":{include:C,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"button-box-focused-left":{include:H,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:D}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:D}},"scroll-knob":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundColor],style:{radius:3,width:1,color:A,backgroundColor:N}},"scroll-knob-pressed":{include:l,style:{backgroundColor:U}},"scroll-knob-hovered":{include:l,style:{color:K}},"scroll-knob-pressed-hovered":{include:p,style:{color:K}},"button-hover":{decorator:[qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBorderRadius],style:{backgroundColor:R,radius:3}},"window":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MBackgroundColor],style:{width:1,color:n,innerWidth:4,innerColor:u,shadowLength:1,shadowBlurRadius:3,shadowColor:J,backgroundColor:M}},"window-active":{include:o,style:{shadowLength:2,shadowBlurRadius:5}},"window-caption":{decorator:qx.ui.decoration.Single,style:{width:[0,0,2,0],color:u}},"white-box":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundColor],style:{width:1,color:r,shadowBlurRadius:2,shadowColor:e,radius:7,backgroundColor:B}},"inset":{decorator:qx.ui.decoration.Single,style:{width:1,color:[q,L,L,L]}},"focused-inset":{decorator:qx.ui.decoration.Uniform,style:{width:2,color:G}},"border-invalid":{decorator:qx.ui.decoration.Uniform,style:{width:2,color:x}},"lead-item":{decorator:qx.ui.decoration.Uniform,style:{width:1,style:c,color:Q}},"tooltip":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBoxShadow],style:{width:1,color:b,shadowLength:1,shadowBlurRadius:2,shadowColor:J}},"tooltip-error":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBackgroundColor],style:{radius:5,backgroundColor:x}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:A}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:G}},"menubar-button-hovered":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBackgroundColor],style:{width:1,color:w,radius:3,backgroundColor:B}},"menubar-button-pressed":{include:g,style:{radius:[3,3,0,0],width:[1,1,0,1]}},"datechooser-date-pane":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:v,style:y}},"datechooser-weekday":{decorator:qx.ui.decoration.Single,style:{widthBottom:1,colorBottom:v,style:y}},"datechooser-week":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:v,style:y}},"datechooser-week-header":{decorator:qx.ui.decoration.Single,style:{widthBottom:1,colorBottom:v,widthRight:1,colorRight:v,style:y}},"tabview-page-button-top":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBackgroundColor],style:{width:[1,1,0,1],backgroundColor:M,color:w,radius:[3,3,0,0]}},"tabview-page-button-bottom":{include:F,style:{radius:[0,0,3,3],width:[0,1,1,1]}},"tabview-page-button-left":{include:F,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"tabview-page-button-right":{include:F,style:{radius:[0,3,3,0],width:[1,1,1,0]}},"statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:G,styleTop:y}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:a,style:y}},"table-header":{include:s,style:{radius:0,width:[1,0,1,0]}},"table-header-column-button":{include:i,style:{width:1,color:A}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,color:A}},"table-header-cell-first":{include:S,style:{widthLeft:1}},"progressbar":{decorator:qx.ui.decoration.Single,style:{backgroundColor:P,width:1,color:D}},"radiobutton":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MBackgroundColor],style:{radius:10,width:1,color:A,innerColor:M,innerWidth:2}},"radiobutton-focused":{include:k,style:{color:G}},"radiobutton-invalid":{include:k,style:{color:x}},"checkbox":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundColor],style:{width:1,color:A}},"checkbox-focused":{include:m,style:{color:G}},"checkbox-invalid":{include:m,style:{color:x}}}});}
)();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";qx.Theme.define(a,{title:c,aliases:{"icon":b}});}
)();
(function(){var dh="table-row-background-even",dg="button-box-pressed-top-right",df="arrow-left",de="datechooser-weekday",dd="arrow-up",dc="icon/16/actions/dialog-ok.png",db="button-box-top-right",da="slidebar",cY="#BABABA",cX="button-box-hovered-bottom-right",cb="move-frame",ca="nodrop",bY="window-caption",bX="table-header-cell",bW="button-box-hovered-top-right",bV="row-layer",bU="treevirtual-plus-only",bT="move",bS="treevirtual-plus-end",bR="vertical",dp="arrow-down-small",dq="tooltip-error",dm="window-restore",dn="resize-frame",dk="scroll-knob",dl="tabview-close",di="atom/label",dj="button-box-pressed-bottom-right",dr="button-box-pressed-hovered-bottom-right",ds="icon/16/actions/dialog-cancel.png",cG="qx.theme.simple.Appearance",cF="menu-slidebar",cI="treevirtual-minus-cross",cH="background-pane",cK="table-",cJ="scroll-knob-pressed",cM="icon",cL="arrow-rewind",cE="icon/16/apps/office-calendar.png",cD="headline",l="treevirtual-plus-start",m="treevirtual-minus-end",n="checkbox-undetermined",o="button-box-bottom-right",p="datechooser-week",q="descending",r="toolbar-separator",s="arrow-up-small",t="horizontal",u="border-light-shadow",dG="text-placeholder",dF="dragover",dE="treevirtual-plus-cross",dD="scrollarea",dK="treevirtual-line",dJ="menu-checkbox",dI="best-fit",dH="button-border",dM="treevirtual-cross",dL="tabview-page-button-right",bh="button-hover",bi="tabview-page-button-top",bf="tabview-page-button-bottom",bg="tabview-page-button-left",bl="menubar-button-pressed",bm="progressbar",bj="tree-file",bk="tooltip-text",bd="keep-align",be="alias",M="ascending",L="button-box-hovered-right-borderless",O="button-box-right-borderless",N="lead-item",I="checkbox-focused",H="window-minimize",K="button-box-pressed-hovered-top-right",J="knob-",G="treevirtual-minus-only",F="treevirtual-minus-start",br="checkbox-checked",bs="window",bt="window-active",bu="table-header-cell-first",bn="button-box-pressed-right-borderless",bo="scroll-knob-hovered",bp="select-column-order",bq="button-box-pressed-hovered-right-borderless",bv="scroll-knob-pressed-hovered",bw="white-box",X="datechooser-week-header",W="menubar-button-hovered",V="table-header-column-button",U="window-close",T="datechooser-date-pane",S="cursor-",R="-focused",Q="menu-radiobutton",bc="window-maximize",bb="treevirtual-end",bx="table",by="arrow-forward",bz="copy",bA="table-row-background-selected",bB="radiobutton-focused",bC="scrollbar/slider/knob",bD="atom/icon",bE="-disabled",bF="table-header",bG="menu-separator",ci="icon/16/actions/view-refresh.png",ch="menu-slidebar-button",cg="scrollbar/button",cf="border-invalid",cm="tree-minus",cl="statusbar",ck="down",cj="text",cp="background-disabled-checked",co="tree",cz="slidebar/button-forward",cA="icon/16/places/folder.png",cx="icon/16/mimetypes/text-plain.png",cy="tree-plus",cv="default",cw="datechooser",ct="button-box-focused",cu="blank",cB="treevirtual-folder",cC="virtual-list",cQ="arrow-right",cP="left",cS="up",cR="right-top",cU="focused-inset",cT="slidebar/button-backward",cW="link",cV="background-disabled",cO="-right",cN="radiobutton",dz="arrow-",dA="checkbox",dB="-left",dC="combobox",dv="tree-folder",dw="selectbox",dx="-invalid",dy="icon/16/places/folder-open.png",dt="background-selected-dark",du="invalid",k="scrollbar",j="inset",h="center",g="datechooser/button",f="right",e="light-background",d="button-frame",c="-middle",b="main",a="-invert",x="combobox/button",y="list",v="middle",w="menu-button",B="toolbar-button",C="button-box-hovered",z="button-box-pressed-hovered",A="spinner",D="button-box-pressed",E="arrow-down",cq="white",cn="background-selected",cs="text-selected",cr="cell",cd="tooltip",cc="popup",P="",ce="label",ba="text-disabled",Y="groupbox",bJ="image",bK="bold",bL="textfield",bM="background",bN="main-dark",bO="button-box",bP="atom",bQ="pointer",bH="button",bI="widget";qx.Theme.define(cG,{appearances:{"widget":{},"label":{style:function(dN){return {textColor:dN.disabled?ba:undefined};}
},"image":{style:function(dO){return {opacity:!dO.replacement&&dO.disabled?0.3:undefined};}
},"atom":{},"atom/label":ce,"atom/icon":bJ,"root":{style:function(dP){return {backgroundColor:bM,textColor:cj,font:cv};}
},"popup":{style:function(dQ){return {decorator:cc,backgroundColor:cH};}
},"tooltip":{include:cc,style:function(dR){return {backgroundColor:cd,textColor:bk,decorator:cd,padding:[1,3,2,3],offset:[15,5,5,5]};}
},"tooltip/atom":bP,"tooltip-error":{include:cd,style:function(dS){return {textColor:cs,showTimeout:100,hideTimeout:10000,decorator:dq,font:bK,backgroundColor:undefined};}
},"tooltip-error/atom":bP,"iframe":{style:function(dT){return {backgroundColor:cq,decorator:bN};}
},"move-frame":{style:function(dU){return {decorator:bN};}
},"resize-frame":cb,"dragdrop-cursor":{style:function(dV){var dW=ca;if(dV.copy){dW=bz;}
else if(dV.move){dW=bT;}
else if(dV.alias){dW=be;}
;;return {source:qx.theme.simple.Image.URLS[S+dW],position:cR,offset:[2,16,2,6]};}
},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:bH,include:bH,style:function(dX){return {icon:qx.theme.simple.Image.URLS[dz+(dX.vertical?ck:f)]};}
},"slidebar/button-backward":{alias:bH,include:bH,style:function(dY){return {icon:qx.theme.simple.Image.URLS[dz+(dY.vertical?cS:cP)]};}
},"table":bI,"table/statusbar":{style:function(ea){return {decorator:cl,padding:[2,5]};}
},"table/column-button":{alias:bH,style:function(eb){return {decorator:V,padding:3,icon:qx.theme.simple.Image.URLS[bp]};}
},"table-column-reset-button":{include:w,alias:w,style:function(){return {icon:ci};}
},"table-scroller/scrollbar-x":k,"table-scroller/scrollbar-y":k,"table-scroller":bI,"table-scroller/header":{style:function(){return {decorator:bF};}
},"table-scroller/pane":{},"table-scroller/focus-indicator":{style:function(ec){return {decorator:b};}
},"table-scroller/resize-line":{style:function(ed){return {backgroundColor:dH,width:3};}
},"table-header-cell":{alias:bP,style:function(ee){return {decorator:ee.first?bu:bX,minWidth:13,font:bK,paddingTop:3,paddingLeft:5,cursor:ee.disabled?undefined:bQ,sortIcon:ee.sorted?(qx.theme.simple.Image.URLS[cK+(ee.sortedAscending?M:q)]):undefined};}
},"table-header-cell/icon":{include:bD,style:function(ef){return {paddingRight:5};}
},"table-header-cell/sort-icon":{style:function(eg){return {alignY:v,alignX:f,paddingRight:5};}
},"table-editor-textfield":{include:bL,style:function(eh){return {decorator:undefined,padding:[2,2]};}
},"table-editor-selectbox":{include:dw,alias:dw,style:function(ei){return {padding:[0,2]};}
},"table-editor-combobox":{include:dC,alias:dC,style:function(ej){return {decorator:undefined};}
},"treevirtual":{include:bL,alias:bx,style:function(ek,el){return {padding:[el.padding[0]+2,el.padding[1]+1]};}
},"treevirtual-folder":{style:function(em){return {icon:(em.opened?dy:cA)};}
},"treevirtual-file":{include:cB,alias:cB,style:function(en){return {icon:cx};}
},"treevirtual-line":{style:function(eo){return {icon:qx.theme.simple.Image.URLS[dK]};}
},"treevirtual-contract":{style:function(ep){return {icon:qx.theme.simple.Image.URLS[cm]};}
},"treevirtual-expand":{style:function(eq){return {icon:qx.theme.simple.Image.URLS[cy]};}
},"treevirtual-only-contract":{style:function(er){return {icon:qx.theme.simple.Image.URLS[G]};}
},"treevirtual-only-expand":{style:function(es){return {icon:qx.theme.simple.Image.URLS[bU]};}
},"treevirtual-start-contract":{style:function(et){return {icon:qx.theme.simple.Image.URLS[F]};}
},"treevirtual-start-expand":{style:function(eu){return {icon:qx.theme.simple.Image.URLS[l]};}
},"treevirtual-end-contract":{style:function(ev){return {icon:qx.theme.simple.Image.URLS[m]};}
},"treevirtual-end-expand":{style:function(ew){return {icon:qx.theme.simple.Image.URLS[bS]};}
},"treevirtual-cross-contract":{style:function(ex){return {icon:qx.theme.simple.Image.URLS[cI]};}
},"treevirtual-cross-expand":{style:function(ey){return {icon:qx.theme.simple.Image.URLS[dE]};}
},"treevirtual-end":{style:function(ez){return {icon:qx.theme.simple.Image.URLS[bb]};}
},"treevirtual-cross":{style:function(eA){return {icon:qx.theme.simple.Image.URLS[dM]};}
},"resizer":{style:function(eB){return {decorator:bN};}
},"splitpane":{},"splitpane/splitter":{style:function(eC){return {backgroundColor:e};}
},"splitpane/splitter/knob":{style:function(eD){return {source:qx.theme.simple.Image.URLS[J+(eD.horizontal?t:bR)],padding:2};}
},"splitpane/slider":{style:function(eE){return {backgroundColor:u,opacity:0.3};}
},"menu":{style:function(eF){var eG={backgroundColor:bM,decorator:b,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,padding:1,placementModeY:eF.submenu||eF.contextmenu?dI:bd};if(eF.submenu){eG.position=cR;eG.offset=[-2,-3];}
;if(eF.contextmenu){eG.offset=4;}
;return eG;}
},"menu/slidebar":cF,"menu-slidebar":bI,"menu-slidebar-button":{style:function(eH){return {backgroundColor:eH.hovered?cn:undefined,padding:6,center:true};}
},"menu-slidebar/button-backward":{include:ch,style:function(eI){return {icon:qx.theme.simple.Image.URLS[dd+(eI.hovered?a:P)]};}
},"menu-slidebar/button-forward":{include:ch,style:function(eJ){return {icon:qx.theme.simple.Image.URLS[E+(eJ.hovered?a:P)]};}
},"menu-separator":{style:function(eK){return {height:0,decorator:bG,marginTop:4,marginBottom:4,marginLeft:2,marginRight:2};}
},"menu-button":{alias:bP,style:function(eL){return {backgroundColor:eL.selected?cn:undefined,textColor:eL.selected?cs:undefined,padding:[2,6]};}
},"menu-button/icon":{include:bJ,style:function(eM){return {alignY:v};}
},"menu-button/label":{include:ce,style:function(eN){return {alignY:v,padding:1};}
},"menu-button/shortcut":{include:ce,style:function(eO){return {alignY:v,marginLeft:14,padding:1};}
},"menu-button/arrow":{include:bJ,style:function(eP){return {source:qx.theme.simple.Image.URLS[cQ+(eP.selected?a:P)],alignY:v};}
},"menu-checkbox":{alias:w,include:w,style:function(eQ){return {icon:!eQ.checked?undefined:qx.theme.simple.Image.URLS[dJ+(eQ.selected?a:P)]};}
},"menu-radiobutton":{alias:w,include:w,style:function(eR){return {icon:!eR.checked?undefined:qx.theme.simple.Image.URLS[Q+(eR.selected?a:P)]};}
},"menubar":{style:function(eS){return {backgroundColor:e,padding:[4,2]};}
},"menubar-button":{style:function(eT){var eV;var eU=[2,6];if(!eT.disabled){if(eT.pressed){eV=bl;eU=[1,5,2,5];}
else if(eT.hovered){eV=W;eU=[1,5];}
;}
;return {padding:eU,cursor:eT.disabled?undefined:bQ,textColor:cW,decorator:eV};}
},"virtual-list":y,"virtual-list/row-layer":bV,"row-layer":bI,"column-layer":bI,"group-item":{include:ce,alias:ce,style:function(eW){return {padding:4,backgroundColor:cY,textColor:cq,font:bK};}
},"virtual-selectbox":dw,"virtual-selectbox/dropdown":cc,"virtual-selectbox/dropdown/list":{alias:cC},"virtual-combobox":dC,"virtual-combobox/dropdown":cc,"virtual-combobox/dropdown/list":{alias:cC},"virtual-tree":{include:co,alias:co,style:function(eX){return {itemHeight:21};}
},"virtual-tree-folder":dv,"virtual-tree-file":bj,"cell":{style:function(eY){return {backgroundColor:eY.selected?bA:dh,textColor:eY.selected?cs:cj,padding:[3,6]};}
},"cell-string":cr,"cell-number":{include:cr,style:function(fa){return {textAlign:f};}
},"cell-image":cr,"cell-boolean":cr,"cell-atom":cr,"cell-date":cr,"cell-html":cr,"htmlarea":{"include":bI,style:function(fb){return {backgroundColor:cq};}
},"scrollbar":{},"scrollbar/slider":{},"scrollbar/slider/knob":{style:function(fc){var fd=dk;if(!fc.disabled){if(fc.hovered&&!fc.pressed&&!fc.checked){fd=bo;}
else if(fc.hovered&&(fc.pressed||fc.checked)){fd=bv;}
else if(fc.pressed||fc.checked){fd=cJ;}
;;}
;return {height:14,width:14,cursor:fc.disabled?undefined:bQ,decorator:fd,minHeight:fc.horizontal?undefined:20,minWidth:fc.horizontal?20:undefined};}
},"scrollbar/button":{style:function(fe){var ff={};ff.padding=4;var fg=P;if(fe.left){fg=cP;ff.marginRight=2;}
else if(fe.right){fg+=f;ff.marginLeft=2;}
else if(fe.up){fg+=cS;ff.marginBottom=2;}
else {fg+=ck;ff.marginTop=2;}
;;ff.icon=qx.theme.simple.Image.URLS[dz+fg];ff.cursor=bQ;ff.decorator=bO;return ff;}
},"scrollbar/button-begin":cg,"scrollbar/button-end":cg,"scrollarea/corner":{style:function(fh){return {backgroundColor:bM};}
},"scrollarea":bI,"scrollarea/pane":bI,"scrollarea/scrollbar-x":k,"scrollarea/scrollbar-y":k,"textfield":{style:function(fi){var fk;if(fi.disabled){fk=ba;}
else if(fi.showingPlaceholder){fk=dG;}
else {fk=undefined;}
;var fl;var fj;if(fi.disabled){fl=j;fj=[2,3];}
else if(fi.invalid){fl=cf;fj=[1,2];}
else if(fi.focused){fl=cU;fj=[1,2];}
else {fj=[2,3];fl=j;}
;;return {decorator:fl,padding:fj,textColor:fk,backgroundColor:fi.disabled?cV:cq};}
},"textarea":bL,"radiobutton/icon":{style:function(fm){var fo=cN;if(fm.focused&&!fm.invalid){fo=bB;}
;fo+=fm.invalid&&!fm.disabled?dx:P;var fn;if(fm.disabled&&fm.checked){fn=cp;}
else if(fm.disabled){fn=cV;}
else if(fm.checked){fn=cn;}
;;return {decorator:fo,width:12,height:12,backgroundColor:fn};}
},"radiobutton":{style:function(fp){return {icon:qx.theme.simple.Image.URLS[cu]};}
},"form-renderer-label":{include:ce,style:function(){return {paddingTop:3};}
},"checkbox":{alias:bP,style:function(fq){var fr;if(fq.checked){fr=qx.theme.simple.Image.URLS[br];}
else if(fq.undetermined){fr=qx.theme.simple.Image.URLS[n];}
else {fr=qx.theme.simple.Image.URLS[cu];}
;return {icon:fr,gap:6};}
},"checkbox/icon":{style:function(fs){var fu=dA;if(fs.focused&&!fs.invalid){fu=I;}
;fu+=fs.invalid&&!fs.disabled?dx:P;var ft;if(fs.checked){ft=2;}
else if(fs.undetermined){ft=[4,2];}
;return {decorator:fu,width:12,height:12,padding:ft,backgroundColor:cq};}
},"spinner":{style:function(fv){return {textColor:fv.disabled?ba:undefined};}
},"spinner/textfield":bL,"spinner/upbutton":{alias:x,include:x,style:function(fw){var fx=db;if(fw.hovered&&!fw.pressed&&!fw.checked){fx=bW;}
else if(fw.hovered&&(fw.pressed||fw.checked)){fx=K;}
else if(fw.pressed||fw.checked){fx=dg;}
;;return {icon:qx.theme.simple.Image.URLS[s],decorator:fx,width:17};}
},"spinner/downbutton":{alias:x,include:x,style:function(fy){var fz=o;if(fy.hovered&&!fy.pressed&&!fy.checked){fz=cX;}
else if(fy.hovered&&(fy.pressed||fy.checked)){fz=dr;}
else if(fy.pressed||fy.checked){fz=dj;}
;;return {icon:qx.theme.simple.Image.URLS[dp],decorator:fz,width:17};}
},"selectbox":d,"selectbox/atom":bP,"selectbox/popup":cc,"selectbox/list":{alias:y,include:y,style:function(){return {decorator:undefined};}
},"selectbox/arrow":{include:bJ,style:function(fA){return {source:qx.theme.simple.Image.URLS[E],paddingRight:4,paddingLeft:5};}
},"combobox":{},"combobox/button":{alias:d,include:d,style:function(fB){var fC=O;if(fB.hovered&&!fB.pressed&&!fB.checked){fC=L;}
else if(fB.hovered&&(fB.pressed||fB.checked)){fC=bq;}
else if(fB.pressed||fB.checked){fC=bn;}
;;return {icon:qx.theme.simple.Image.URLS[E],decorator:fC,padding:[0,5],width:19};}
},"combobox/popup":cc,"combobox/list":{alias:y},"combobox/textfield":bL,"datefield":bL,"datefield/button":{alias:x,include:x,style:function(fD){return {icon:cE,padding:[0,0,0,3],backgroundColor:undefined,decorator:undefined,width:19};}
},"datefield/textfield":{alias:bL,include:bL,style:function(fE){return {decorator:undefined,padding:0};}
},"datefield/list":{alias:cw,include:cw,style:function(fF){return {decorator:undefined};}
},"list":{alias:dD,include:bL},"listitem":{alias:bP,style:function(fG){var fH=[3,5,3,5];if(fG.lead){fH=[2,4,2,4];}
;if(fG.dragover){fH[2]-=2;}
;var fI;if(fG.selected){fI=cn;if(fG.disabled){fI+=bE;}
;}
;return {gap:4,padding:fH,backgroundColor:fI,textColor:fG.selected?cs:undefined,decorator:fG.lead?N:fG.dragover?dF:undefined};}
},"slider":{style:function(fJ){var fL;var fK;if(fJ.disabled){fL=j;fK=[2,3];}
else if(fJ.invalid){fL=cf;fK=[1,2];}
else if(fJ.focused){fL=cU;fK=[1,2];}
else {fK=[2,3];fL=j;}
;;return {decorator:fL,padding:fK};}
},"slider/knob":bC,"button-frame":{alias:bP,style:function(fM){var fN=bO;if(!fM.disabled){if(fM.hovered&&!fM.pressed&&!fM.checked){fN=C;}
else if(fM.hovered&&(fM.pressed||fM.checked)){fN=z;}
else if(fM.pressed||fM.checked){fN=D;}
;;}
;if(fM.invalid&&!fM.disabled){fN+=dx;}
else if(fM.focused){fN+=R;}
;return {decorator:fN,padding:[3,8],cursor:fM.disabled?undefined:bQ,minWidth:5,minHeight:5};}
},"button-frame/label":{alias:di,style:function(fO){return {textColor:fO.disabled?ba:undefined};}
},"button":{alias:d,include:d,style:function(fP){return {center:true};}
},"hover-button":{alias:bH,include:bH,style:function(fQ){return {decorator:fQ.hovered?bh:undefined};}
},"splitbutton":{},"splitbutton/button":{alias:bP,style:function(fR){var fS=bO;if(fR.disabled){fS=bO;}
else if(fR.focused){fS=ct;}
else if(fR.hovered&&!fR.pressed&&!fR.checked){fS=C;}
else if(fR.hovered&&(fR.pressed||fR.checked)){fS=z;}
else if(fR.pressed||fR.checked){fS=D;}
;;;;fS+=dB;return {decorator:fS,padding:[3,8],cursor:fR.disabled?undefined:bQ};}
},"splitbutton/arrow":{style:function(fT){var fU=bO;if(fT.disabled){fU=bO;}
else if(fT.focused){fU=ct;}
else if(fT.hovered&&!fT.pressed&&!fT.checked){fU=C;}
else if(fT.hovered&&(fT.pressed||fT.checked)){fU=z;}
else if(fT.pressed||fT.checked){fU=D;}
;;;;fU+=cO;return {icon:qx.theme.simple.Image.URLS[E],decorator:fU,cursor:fT.disabled?undefined:bQ,padding:[3,4]};}
},"groupbox":{},"groupbox/legend":{alias:bP,style:function(fV){return {textColor:fV.invalid?du:undefined,padding:5,margin:4,font:bK};}
},"groupbox/frame":{style:function(fW){return {backgroundColor:bM,padding:[6,9],margin:[18,2,2,2],decorator:bw};}
},"check-groupbox":Y,"check-groupbox/legend":{alias:dA,include:dA,style:function(fX){return {textColor:fX.invalid?du:undefined,padding:5,margin:4,font:bK};}
},"radio-groupbox":Y,"radio-groupbox/legend":{alias:cN,include:cN,style:function(fY){return {textColor:fY.invalid?du:undefined,padding:5,margin:4,font:bK};}
},"tree-folder/open":{include:bJ,style:function(ga){return {source:ga.opened?qx.theme.simple.Image.URLS[cm]:qx.theme.simple.Image.URLS[cy]};}
},"tree-folder":{style:function(gb){return {padding:[2,8,2,5],icon:gb.opened?dy:cA,backgroundColor:gb.selected?cn:undefined,iconOpened:dy};}
},"tree-folder/icon":{include:bJ,style:function(gc){return {padding:[0,4,0,0]};}
},"tree-folder/label":{style:function(gd){return {padding:[1,2],textColor:gd.selected?cs:undefined};}
},"tree-file":{include:dv,alias:dv,style:function(ge){return {icon:cx};}
},"tree":{include:y,alias:y,style:function(gf){return {contentPadding:gf.invalid&&!gf.disabled?[3,0]:[4,1],padding:gf.focused?0:1};}
},"window":{style:function(gg){return {contentPadding:[10,10,10,10],backgroundColor:bM,decorator:gg.maximized?undefined:gg.active?bt:bs};}
},"window-resize-frame":dn,"window/pane":{},"window/captionbar":{style:function(gh){return {backgroundColor:gh.active?e:cV,padding:8,font:bK,decorator:bY};}
},"window/icon":{style:function(gi){return {marginRight:4};}
},"window/title":{style:function(gj){return {cursor:cv,font:bK,marginRight:20,alignY:v};}
},"window/minimize-button":{alias:bH,style:function(gk){return {icon:qx.theme.simple.Image.URLS[H],padding:[1,2],cursor:gk.disabled?undefined:bQ};}
},"window/restore-button":{alias:bH,style:function(gl){return {icon:qx.theme.simple.Image.URLS[dm],padding:[1,2],cursor:gl.disabled?undefined:bQ};}
},"window/maximize-button":{alias:bH,style:function(gm){return {icon:qx.theme.simple.Image.URLS[bc],padding:[1,2],cursor:gm.disabled?undefined:bQ};}
},"window/close-button":{alias:bH,style:function(gn){return {marginLeft:2,icon:qx.theme.simple.Image.URLS[U],padding:[1,2],cursor:gn.disabled?undefined:bQ};}
},"window/statusbar":{style:function(go){return {decorator:cl,padding:[2,6]};}
},"window/statusbar-text":ce,"datechooser":{style:function(gp){return {decorator:b,minWidth:220};}
},"datechooser/navigation-bar":{style:function(gq){return {backgroundColor:bM,textColor:gq.disabled?ba:gq.invalid?du:undefined,padding:[2,10]};}
},"datechooser/last-year-button-tooltip":cd,"datechooser/last-month-button-tooltip":cd,"datechooser/next-year-button-tooltip":cd,"datechooser/next-month-button-tooltip":cd,"datechooser/last-year-button":g,"datechooser/last-month-button":g,"datechooser/next-year-button":g,"datechooser/next-month-button":g,"datechooser/button/icon":{},"datechooser/button":{style:function(gr){var gs={width:17,show:cM,cursor:gr.disabled?undefined:bQ};if(gr.lastYear){gs.icon=qx.theme.simple.Image.URLS[cL];}
else if(gr.lastMonth){gs.icon=qx.theme.simple.Image.URLS[df];}
else if(gr.nextYear){gs.icon=qx.theme.simple.Image.URLS[by];}
else if(gr.nextMonth){gs.icon=qx.theme.simple.Image.URLS[cQ];}
;;;return gs;}
},"datechooser/month-year-label":{style:function(gt){return {font:bK,textAlign:h};}
},"datechooser/date-pane":{style:function(gu){return {decorator:T,backgroundColor:bM};}
},"datechooser/weekday":{style:function(gv){return {decorator:de,font:bK,textAlign:h,textColor:gv.disabled?ba:gv.weekend?dt:bM,backgroundColor:gv.weekend?bM:dt,paddingTop:2};}
},"datechooser/day":{style:function(gw){return {textAlign:h,decorator:gw.today?b:undefined,textColor:gw.disabled?ba:gw.selected?cs:gw.otherMonth?ba:undefined,backgroundColor:gw.disabled?undefined:gw.selected?cn:undefined,padding:[2,4]};}
},"datechooser/week":{style:function(gx){return {textAlign:h,textColor:dt,padding:[2,4],decorator:gx.header?X:p};}
},"progressbar":{style:function(gy){return {decorator:bm,padding:1,backgroundColor:cq,width:200,height:20};}
},"progressbar/progress":{style:function(gz){return {backgroundColor:gz.disabled?cp:cn};}
},"toolbar":{style:function(gA){return {backgroundColor:e,padding:0};}
},"toolbar/part":{style:function(gB){return {margin:[0,15]};}
},"toolbar/part/container":{},"toolbar/part/handle":{},"toolbar-separator":{style:function(gC){return {decorator:r,margin:[7,0],width:4};}
},"toolbar-button":{alias:bP,style:function(gD){var gF=bO;if(gD.disabled){gF=bO;}
else if(gD.hovered&&!gD.pressed&&!gD.checked){gF=C;}
else if(gD.hovered&&(gD.pressed||gD.checked)){gF=z;}
else if(gD.pressed||gD.checked){gF=D;}
;;;if(gD.left){gF+=dB;}
else if(gD.right){gF+=cO;}
else if(gD.middle){gF+=c;}
;;var gE=[7,10];if(gD.left||gD.middle||gD.right){gE=[7,0];}
;return {cursor:gD.disabled?undefined:bQ,decorator:gF,margin:gE,padding:[3,5]};}
},"toolbar-menubutton":{alias:B,include:B,style:function(gG){return {showArrow:true};}
},"toolbar-menubutton/arrow":{alias:bJ,include:bJ,style:function(gH){return {source:qx.theme.simple.Image.URLS[E],cursor:gH.disabled?undefined:bQ,padding:[0,5],marginLeft:2};}
},"toolbar-splitbutton":{},"toolbar-splitbutton/button":{alias:B,include:B,style:function(gI){var gJ=bO;if(gI.disabled){gJ=bO;}
else if(gI.hovered&&!gI.pressed&&!gI.checked){gJ=C;}
else if(gI.hovered&&(gI.pressed||gI.checked)){gJ=z;}
else if(gI.pressed||gI.checked){gJ=D;}
;;;if(gI.left){gJ+=dB;}
else if(gI.right){gJ+=c;}
else if(gI.middle){gJ+=c;}
;;return {icon:qx.theme.simple.Image.URLS[E],decorator:gJ};}
},"toolbar-splitbutton/arrow":{alias:B,include:B,style:function(gK){var gL=bO;if(gK.disabled){gL=bO;}
else if(gK.hovered&&!gK.pressed&&!gK.checked){gL=C;}
else if(gK.hovered&&(gK.pressed||gK.checked)){gL=z;}
else if(gK.pressed||gK.checked){gL=D;}
;;;if(gK.left){gL+=c;}
else if(gK.right){gL+=cO;}
else if(gK.middle){gL+=c;}
;;return {icon:qx.theme.simple.Image.URLS[E],decorator:gL};}
},"tabview":{},"tabview/bar":{alias:da,style:function(gM){var gN=0,gQ=0,gO=0,gP=0;if(gM.barTop){gO-=1;}
else if(gM.barBottom){gN-=1;}
else if(gM.barRight){gP-=1;}
else {gQ-=1;}
;;return {marginBottom:gO,marginTop:gN,marginLeft:gP,marginRight:gQ};}
},"tabview/bar/button-forward":{include:cz,alias:cz,style:function(gR){if(gR.barTop){return {marginTop:4,marginBottom:2,decorator:null};}
else if(gR.barBottom){return {marginTop:2,marginBottom:4,decorator:null};}
else if(gR.barLeft){return {marginLeft:4,marginRight:2,decorator:null};}
else {return {marginLeft:2,marginRight:4,decorator:null};}
;;}
},"tabview/bar/button-backward":{include:cT,alias:cT,style:function(gS){if(gS.barTop){return {marginTop:4,marginBottom:2,decorator:null};}
else if(gS.barBottom){return {marginTop:2,marginBottom:4,decorator:null};}
else if(gS.barLeft){return {marginLeft:4,marginRight:2,decorator:null};}
else {return {marginLeft:2,marginRight:4,decorator:null};}
;;}
},"tabview/pane":{style:function(gT){return {backgroundColor:bM,decorator:b,padding:10};}
},"tabview-page":bI,"tabview-page/button":{style:function(gU){var gW;if(gU.barTop||gU.barBottom){var gV=[8,16,8,13];}
else {var gV=[8,4,8,4];}
;if(gU.checked){if(gU.barTop){gW=bi;}
else if(gU.barBottom){gW=bf;}
else if(gU.barRight){gW=dL;}
else if(gU.barLeft){gW=bg;}
;;;}
else {for(var i=0;i<gV.length;i++){gV[i]+=1;}
;if(gU.barTop){gV[2]-=1;}
else if(gU.barBottom){gV[0]-=1;}
else if(gU.barRight){gV[3]-=1;}
else if(gU.barLeft){gV[1]-=1;}
;;;}
;return {zIndex:gU.checked?10:5,decorator:gW,textColor:gU.disabled?ba:gU.checked?null:cW,padding:gV,cursor:bQ};}
},"tabview-page/button/label":{alias:ce,style:function(gX){return {padding:[0,1,0,1]};}
},"tabview-page/button/icon":bJ,"tabview-page/button/close-button":{alias:bP,style:function(gY){return {cursor:gY.disabled?undefined:bQ,icon:qx.theme.simple.Image.URLS[dl]};}
},"colorpopup":{alias:cc,include:cc,style:function(ha){return {padding:5};}
},"colorpopup/field":{style:function(hb){return {margin:2,width:14,height:14,backgroundColor:bM,decorator:bN};}
},"colorpopup/selector-button":bH,"colorpopup/auto-button":bH,"colorpopup/preview-pane":Y,"colorpopup/current-preview":{style:function(hc){return {height:20,padding:4,marginLeft:4,decorator:bN,allowGrowX:true};}
},"colorpopup/selected-preview":{style:function(hd){return {height:20,padding:4,marginRight:4,decorator:bN,allowGrowX:true};}
},"colorpopup/colorselector-okbutton":{alias:bH,include:bH,style:function(he){return {icon:dc};}
},"colorpopup/colorselector-cancelbutton":{alias:bH,include:bH,style:function(hf){return {icon:ds};}
},"colorselector":bI,"colorselector/control-bar":bI,"colorselector/visual-pane":Y,"colorselector/control-pane":bI,"colorselector/preset-grid":bI,"colorselector/colorbucket":{style:function(hg){return {decorator:bN,width:16,height:16};}
},"colorselector/preset-field-set":Y,"colorselector/input-field-set":{include:Y,alias:Y,style:function(){return {paddingTop:12};}
},"colorselector/preview-field-set":{include:Y,alias:Y,style:function(){return {paddingTop:12};}
},"colorselector/hex-field-composite":bI,"colorselector/hex-field":bL,"colorselector/rgb-spinner-composite":bI,"colorselector/rgb-spinner-red":A,"colorselector/rgb-spinner-green":A,"colorselector/rgb-spinner-blue":A,"colorselector/hsb-spinner-composite":bI,"colorselector/hsb-spinner-hue":A,"colorselector/hsb-spinner-saturation":A,"colorselector/hsb-spinner-brightness":A,"colorselector/preview-content-old":{style:function(hh){return {decorator:bN,width:50,height:25};}
},"colorselector/preview-content-new":{style:function(hi){return {decorator:bN,backgroundColor:cq,width:50,height:25};}
},"colorselector/hue-saturation-field":{style:function(hj){return {decorator:bN,margin:5};}
},"colorselector/brightness-field":{style:function(hk){return {decorator:bN,margin:[5,7]};}
},"colorselector/hue-saturation-pane":bI,"colorselector/hue-saturation-handle":bI,"colorselector/brightness-pane":bI,"colorselector/brightness-handle":bI,"app-header":{style:function(hl){return {font:cD,textColor:cs,backgroundColor:dt,padding:[8,12]};}
},"app-header-label":{style:function(hm){return {paddingTop:5};}
}}});}
)();
(function(){var a="qx.theme.simple.Image";qx.Class.define(a,{extend:qx.core.Object,statics:{URLS:{"blank":"qx/static/blank.gif","checkbox-checked":"decoration/checkbox/checked.png","checkbox-undetermined":"decoration/checkbox/undetermined.png","window-minimize":"decoration/window/minimize.gif","window-maximize":"decoration/window/maximize.gif","window-restore":"decoration/window/restore.gif","window-close":"decoration/window/close.gif","cursor-copy":"decoration/cursors/copy.gif","cursor-move":"decoration/cursors/move.gif","cursor-alias":"decoration/cursors/alias.gif","cursor-nodrop":"decoration/cursors/nodrop.gif","arrow-right":"decoration/arrows/right.gif","arrow-left":"decoration/arrows/left.gif","arrow-up":"decoration/arrows/up.gif","arrow-down":"decoration/arrows/down.gif","arrow-forward":"decoration/arrows/forward.gif","arrow-rewind":"decoration/arrows/rewind.gif","arrow-down-small":"decoration/arrows/down-small.gif","arrow-up-small":"decoration/arrows/up-small.gif","arrow-up-invert":"decoration/arrows/up-invert.gif","arrow-down-invert":"decoration/arrows/down-invert.gif","arrow-right-invert":"decoration/arrows/right-invert.gif","knob-horizontal":"decoration/splitpane/knob-horizontal.png","knob-vertical":"decoration/splitpane/knob-vertical.png","tree-minus":"decoration/tree/minus.gif","tree-plus":"decoration/tree/plus.gif","select-column-order":"decoration/table/select-column-order.png","table-ascending":"decoration/table/ascending.png","table-descending":"decoration/table/descending.png","treevirtual-line":"decoration/treevirtual/line.gif","treevirtual-minus-only":"decoration/treevirtual/only_minus.gif","treevirtual-plus-only":"decoration/treevirtual/only_plus.gif","treevirtual-minus-start":"decoration/treevirtual/start_minus.gif","treevirtual-plus-start":"decoration/treevirtual/start_plus.gif","treevirtual-minus-end":"decoration/treevirtual/end_minus.gif","treevirtual-plus-end":"decoration/treevirtual/end_plus.gif","treevirtual-minus-cross":"decoration/treevirtual/cross_minus.gif","treevirtual-plus-cross":"decoration/treevirtual/cross_plus.gif","treevirtual-end":"decoration/treevirtual/end.gif","treevirtual-cross":"decoration/treevirtual/cross.gif","menu-checkbox":"decoration/menu/checkbox.gif","menu-checkbox-invert":"decoration/menu/checkbox-invert.gif","menu-radiobutton-invert":"decoration/menu/radiobutton-invert.gif","menu-radiobutton":"decoration/menu/radiobutton.gif","tabview-close":"decoration/tabview/close.gif"}}});}
)();
(function(){var f="monospace",e="Courier New",d="qx.theme.simple.Font",c="DejaVu Sans Mono",b="sans-serif",a="arial";qx.Theme.define(d,{fonts:{"default":{size:13,family:[a,b]},"bold":{size:13,family:[a,b],bold:true},"headline":{size:24,family:[b,a]},"small":{size:11,family:[a,b]},"monospace":{size:11,family:[c,e,f]}}});}
)();
(function(){var j="#D9D9D9",i="#1866B5",h="#24B",g="#FF0000",f="#CCCCCC",e="rgba(0, 0, 0, 0.4)",d="#FFFFE1",c="#B7B7B7",b="#BBBBBB",a="#9DCBFE",O="#A7A6AA",N="#EBEBEB",M="#666666",L="#CBC8CD",K="#F9F9F9",J="#CDCDCD",I="#808080",H="#F7F7F7",G="#686868",F="#888888",q="#E0ECFF",r="#2E3A46",o="css.rgba",p="#F5F5F5",m="#E3E3E3",n="#DDDDDD",k="#BBB",l="qx.theme.simple.Color",s="#F1F1F1",t="#939393",x="#BCBCBC",w="#134983",z="#E8F0E3",y="#FAFBFE",B="#AAAAAA",A="#5685D6",v="black",E="#6694E3",D="#EEE",C="gray",u="white";qx.Theme.define(l,{colors:{"background":u,"dark-blue":A,"light-background":q,"background-selected":E,"background-selected-disabled":J,"background-selected-dark":A,"background-disabled":H,"background-disabled-checked":b,"background-pane":y,"tabview-unselected":i,"tabview-button-border":w,"tabview-label-active-disabled":j,"link":h,"scrollbar-bright":s,"scrollbar-dark":N,"button":z,"button-border":k,"button-border-hovered":t,"invalid":g,"button-box-bright":K,"button-box-dark":m,"button-box-bright-pressed":n,"button-box-dark-pressed":p,"border-lead":F,"window-border":r,"window-border-inner":a,"white-box-border":x,"shadow":qx.core.Environment.get(o)?e:M,"border-main":E,"border-light":c,"border-light-shadow":G,"border-separator":I,"text":v,"text-disabled":O,"text-selected":u,"text-placeholder":L,"tooltip":d,"tooltip-text":v,"table-header":[242,242,242],"table-focus-indicator":[179,217,255],"table-header-cell":[235,234,219],"table-row-background-focused-selected":[90,138,211],"table-row-background-focused":[221,238,255],"table-row-background-selected":[51,94,168],"table-row-background-even":u,"table-row-background-odd":u,"table-row-selected":[255,255,255],"table-row":[0,0,0],"table-row-line":D,"table-column-line":D,"progressive-table-header":B,"progressive-table-row-background-even":[250,248,243],"progressive-table-row-background-odd":[255,255,255],"progressive-progressbar-background":C,"progressive-progressbar-indicator-done":f,"progressive-progressbar-indicator-undone":u,"progressive-progressbar-percent-background":C,"progressive-progressbar-percent-text":u}});}
)();
(function(){var b="Simple",a="qx.theme.Simple";qx.Theme.define(a,{title:b,meta:{color:qx.theme.simple.Color,decoration:qx.theme.simple.Decoration,font:qx.theme.simple.Font,appearance:qx.theme.simple.Appearance,icon:qx.theme.icon.Tango}});}
)();
(function(){var l="Use qx.dev.StackTrace.FORMAT_STACKTRACE instead",k="function",h="<span class='object'>",g="]:",f="<span class='object' title='Object instance with hash code: ",e="FORMAT_STACK",d="string",c="level-",b="0",a="<span class='offset'>",G=":",F="qx.log.appender.Util",E="DIV",D="<span>",C="<span class='type-key'>",B="</span>:<span class='type-",A="</span>: ",z=" ",y="]</span>: ",x="</span> ",s="}",t="",q="]",r="\n",o="{",p="map",m="<span class='type-",n="[",u=", ",v="</span>",w="'>";qx.Class.define(F,{statics:{toHtml:function(H){var R=[];var O,Q,J,L;R.push(a,this.formatOffset(H.offset,6),x);if(H.object){var I=H.win.qx.core.ObjectRegistry.fromHashCode(H.object);if(I){R.push(f+I.$$hash+w,I.classname,n,I.$$hash,y);}
;}
else if(H.clazz){R.push(h+H.clazz.classname,A);}
;var K=H.items;for(var i=0,P=K.length;i<P;i++){O=K[i];Q=O.text;if(Q instanceof Array){var L=[];for(var j=0,N=Q.length;j<N;j++){J=Q[j];if(typeof J===d){L.push(D+this.escapeHTML(J)+v);}
else if(J.key){L.push(C+J.key+B+J.type+w+this.escapeHTML(J.text)+v);}
else {L.push(m+J.type+w+this.escapeHTML(J.text)+v);}
;}
;R.push(m+O.type+w);if(O.type===p){R.push(o,L.join(u),s);}
else {R.push(n,L.join(u),q);}
;R.push(v);}
else {R.push(m+O.type+w+this.escapeHTML(Q)+x);}
;}
;var M=document.createElement(E);M.innerHTML=R.join(t);M.className=c+H.level;return M;}
,formatOffset:function(S,length){var V=S.toString();var T=(length||6)-V.length;var U=t;for(var i=0;i<T;i++){U+=b;}
;return U+V;}
,escapeHTML:function(W){return String(W).replace(/[<>&"']/g,this.__HI);}
,__HI:function(X){var Y={"<":"&lt;",">":"&gt;","&":"&amp;","'":"&#39;",'"':"&quot;"};return Y[X]||"?";}
,toText:function(ba){return this.toTextArray(ba).join(z);}
,toTextArray:function(bb){var bj=[];bj.push(this.formatOffset(bb.offset,6));if(bb.object){var bc=bb.win.qx.core.ObjectRegistry.fromHashCode(bb.object);if(bc){bj.push(bc.classname+n+bc.$$hash+g);}
;}
else if(bb.clazz){bj.push(bb.clazz.classname+G);}
;var bd=bb.items;var bg,bi;for(var i=0,bh=bd.length;i<bh;i++){bg=bd[i];bi=bg.text;if(bg.trace&&bg.trace.length>0){if(typeof (this.FORMAT_STACK)==k){qx.log.Logger.deprecatedConstantWarning(qx.log.appender.Util,e,l);bi+=r+this.FORMAT_STACK(bg.trace);}
else {bi+=r+bg.trace;}
;}
;if(bi instanceof Array){var be=[];for(var j=0,bf=bi.length;j<bf;j++){be.push(bi[j].text);}
;if(bg.type===p){bj.push(o,be.join(u),s);}
else {bj.push(n,be.join(u),q);}
;}
else {bj.push(bi);}
;}
;return bj;}
}});}
)();
(function(){var c="html.console",b="qx.log.appender.Native",a="log";qx.Class.define(b,{statics:{process:function(d){if(qx.core.Environment.get(c)){var f=console[d.level]?d.level:a;if(console[f]){var e=qx.log.appender.Util.toText(d);console[f](e);}
;}
;}
},defer:function(g){qx.log.Logger.register(g);}
});}
)();
(function(){var k='.qxconsole .messages{background:white;height:100%;width:100%;overflow:auto;}',j="Enter",i="px",h='.qxconsole .messages .user-result{background:white}',g='.qxconsole .messages .level-error{background:#FFE2D5}',f="div",d="user-command",c='<div class="command">',b='.qxconsole .command input:focus{outline:none;}',a='.qxconsole .messages .type-key{color:#565656;font-style:italic}',V='.qxconsole .messages .type-instance{color:#565656;font-weight:bold}',U='.qxconsole .messages div{padding:0px 4px;}',T='.qxconsole .messages .level-debug{background:white}',S='.qxconsole .messages .type-class{color:#5F3E8A;font-weight:bold}',R="DIV",Q='.qxconsole .messages .level-user{background:#E3EFE9}',P='<div class="qxconsole">',O="D",N='.qxconsole .messages .type-map{color:#CC3E8A;font-weight:bold;}',M='.qxconsole .messages .type-string{color:black;font-weight:normal;}',r='.qxconsole .control a{text-decoration:none;color:black;}',s='<div class="messages">',p='.qxconsole .messages .type-boolean{color:#15BC91;font-weight:normal;}',q='<input type="text"/>',n="clear",o='.qxconsole .command input{width:100%;border:0 none;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',l='.qxconsole .messages .type-array{color:#CC3E8A;font-weight:bold;}',m='.qxconsole{z-index:10000;width:600px;height:300px;top:0px;right:0px;position:absolute;border-left:1px solid black;color:black;border-bottom:1px solid black;color:black;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',t='.qxconsole .command{background:white;padding:2px 4px;border-top:1px solid black;}',u='.qxconsole .messages .user-command{color:blue}',B="F7",z="qx.log.appender.Console",F='.qxconsole .messages .level-info{background:#DEEDFA}',D="block",I='.qxconsole .messages .level-warn{background:#FFF7D5}',H='.qxconsole .messages .type-stringify{color:#565656;font-weight:bold}',w='.qxconsole .messages .user-error{background:#FFE2D5}',L='.qxconsole .control{background:#cdcdcd;border-bottom:1px solid black;padding:4px 8px;}',K='<div class="control"><a href="javascript:qx.log.appender.Console.clear()">Clear</a> | <a href="javascript:qx.log.appender.Console.toggle()">Hide</a></div>',J=">>> ",v="Down",x='.qxconsole .messages .type-number{color:#155791;font-weight:normal;}',y="Up",A="none",C="keypress",E='</div>',G="";qx.Class.define(z,{statics:{init:function(){var W=[m,L,r,k,U,u,h,w,T,F,I,g,Q,M,x,p,l,N,a,S,V,H,t,o,b];qx.bom.Stylesheet.createElement(W.join(G));var Y=[P,K,s,E,c,q,E,E];var ba=document.createElement(R);ba.innerHTML=Y.join(G);var X=ba.firstChild;document.body.appendChild(ba.firstChild);this.__Jb=X;this.__bY=X.childNodes[1];this.__Jc=X.childNodes[2].firstChild;this.__jP();qx.log.Logger.register(this);qx.core.ObjectRegistry.register(this);}
,dispose:function(){qx.event.Registration.removeListener(document.documentElement,C,this.__eJ,this);qx.log.Logger.unregister(this);}
,clear:function(){this.__bY.innerHTML=G;}
,process:function(bb){this.__bY.appendChild(qx.log.appender.Util.toHtml(bb));this.__Jd();}
,__Jd:function(){this.__bY.scrollTop=this.__bY.scrollHeight;}
,__dM:true,toggle:function(){if(!this.__Jb){this.init();}
else if(this.__Jb.style.display==A){this.show();}
else {this.__Jb.style.display=A;}
;}
,show:function(){if(!this.__Jb){this.init();}
else {this.__Jb.style.display=D;this.__bY.scrollTop=this.__bY.scrollHeight;}
;}
,__GK:[],execute:function(){var be=this.__Jc.value;if(be==G){return;}
;if(be==n){return this.clear();}
;var bc=document.createElement(f);bc.innerHTML=qx.log.appender.Util.escapeHTML(J+be);bc.className=d;this.__GK.push(be);this.__Je=this.__GK.length;this.__bY.appendChild(bc);this.__Jd();try{var bd=window.eval(be);}
catch(bf){qx.log.Logger.error(bf);}
;if(bd!==undefined){qx.log.Logger.debug(bd);}
;}
,__jP:function(e){this.__bY.style.height=(this.__Jb.clientHeight-this.__Jb.firstChild.offsetHeight-this.__Jb.lastChild.offsetHeight)+i;}
,__eJ:function(e){var bh=e.getKeyIdentifier();if((bh==B)||(bh==O&&e.isCtrlPressed())){this.toggle();e.preventDefault();}
;if(!this.__Jb){return;}
;if(!qx.dom.Hierarchy.contains(this.__Jb,e.getTarget())){return;}
;if(bh==j&&this.__Jc.value!=G){this.execute();this.__Jc.value=G;}
;if(bh==y||bh==v){this.__Je+=bh==y?-1:1;this.__Je=Math.min(Math.max(0,this.__Je),this.__GK.length);var bg=this.__GK[this.__Je];this.__Jc.value=bg||G;this.__Jc.select();}
;}
},defer:function(bi){qx.event.Registration.addListener(document.documentElement,C,bi.__eJ,bi);}
});}
)();
(function(){var p="stylesheet",o="html.stylesheet.addimport",n="html.stylesheet.insertrule",m="}",l="html.stylesheet.createstylesheet",k='@import "',j="{",h='";',g="qx.bom.Stylesheet",f="link",c="style",e="head",d="text/css",b="html.stylesheet.removeimport",a="html.stylesheet.deleterule";qx.Bootstrap.define(g,{statics:{includeFile:function(q,r){if(!r){r=document;}
;var s=r.createElement(f);s.type=d;s.rel=p;s.href=q;var t=r.getElementsByTagName(e)[0];t.appendChild(s);}
,createElement:function(u){if(qx.core.Environment.get(l)){var v=document.createStyleSheet();if(u){v.cssText=u;}
;return v;}
else {var w=document.createElement(c);w.type=d;if(u){w.appendChild(document.createTextNode(u));}
;document.getElementsByTagName(e)[0].appendChild(w);return w.sheet;}
;}
,addRule:function(x,y,z){if(qx.core.Environment.get(n)){x.insertRule(y+j+z+m,x.cssRules.length);}
else {x.addRule(y,z);}
;}
,removeRule:function(A,B){if(qx.core.Environment.get(a)){var C=A.cssRules;var D=C.length;for(var i=D-1;i>=0;--i){if(C[i].selectorText==B){A.deleteRule(i);}
;}
;}
else {var C=A.rules;var D=C.length;for(var i=D-1;i>=0;--i){if(C[i].selectorText==B){A.removeRule(i);}
;}
;}
;}
,removeAllRules:function(E){if(qx.core.Environment.get(a)){var F=E.cssRules;var G=F.length;for(var i=G-1;i>=0;i--){E.deleteRule(i);}
;}
else {var F=E.rules;var G=F.length;for(var i=G-1;i>=0;i--){E.removeRule(i);}
;}
;}
,addImport:function(H,I){if(qx.core.Environment.get(o)){H.addImport(I);}
else {H.insertRule(k+I+h,H.cssRules.length);}
;}
,removeImport:function(J,K){if(qx.core.Environment.get(b)){var L=J.imports;var N=L.length;for(var i=N-1;i>=0;i--){if(L[i].href==K||L[i].href==qx.util.Uri.getAbsolute(K)){J.removeImport(i);}
;}
;}
else {var M=J.cssRules;var N=M.length;for(var i=N-1;i>=0;i--){if(M[i].href==K){J.deleteRule(i);}
;}
;}
;}
,removeAllImports:function(O){if(qx.core.Environment.get(b)){var P=O.imports;var R=P.length;for(var i=R-1;i>=0;i--){O.removeImport(i);}
;}
else {var Q=O.cssRules;var R=Q.length;for(var i=R-1;i>=0;i--){if(Q[i].type==Q[i].IMPORT_RULE){O.deleteRule(i);}
;}
;}
;}
}});}
)();
(function(){var h="qx.bom.client.Stylesheet",g="html.stylesheet.deleterule",f="html.stylesheet.insertrule",e="html.stylesheet.createstylesheet",d="html.stylesheet.addimport",c="html.stylesheet.removeimport",b="function",a="object";qx.Bootstrap.define(h,{statics:{__jx:function(){if(!qx.bom.client.Stylesheet.__jy){qx.bom.client.Stylesheet.__jy=qx.bom.Stylesheet.createElement();}
;return qx.bom.client.Stylesheet.__jy;}
,getCreateStyleSheet:function(){return typeof document.createStyleSheet===a;}
,getInsertRule:function(){return typeof qx.bom.client.Stylesheet.__jx().insertRule===b;}
,getDeleteRule:function(){return typeof qx.bom.client.Stylesheet.__jx().deleteRule===b;}
,getAddImport:function(){return (typeof qx.bom.client.Stylesheet.__jx().addImport===a);}
,getRemoveImport:function(){return (typeof qx.bom.client.Stylesheet.__jx().removeImport===a);}
},defer:function(i){qx.core.Environment.add(e,i.getCreateStyleSheet);qx.core.Environment.add(f,i.getInsertRule);qx.core.Environment.add(g,i.getDeleteRule);qx.core.Environment.add(d,i.getAddImport);qx.core.Environment.add(c,i.getRemoveImport);}
});}
)();
(function(){var l="qx.dev.ObjectSummary",k="\n",j=" Objects)\n\n",h=")\r\n",g=" (",f=" Objects)\r\n\r\n",e=", ",d=": ",c="Summary: (";qx.Class.define(l,{statics:{getInfo:function(){var m={};var t=0;var n;var p=qx.core.ObjectRegistry.getRegistry();for(var q in p){n=p[q];if(n&&n.isDisposed()===false){if(m[n.classname]==null){m[n.classname]=1;}
else {m[n.classname]++;}
;t++;}
;}
;var s=[];for(var o in m){s.push({classname:o,number:m[o]});}
;s.sort(function(a,b){return b.number-a.number;}
);var r=c+t+j;for(var i=0;i<s.length;i++){r+=s[i].number+d+s[i].classname+k;}
;return r;}
,getNewObjects:function(){var v={};var F=0;var w;var A=qx.core.ObjectRegistry.getRegistry();var y={};var E;for(var B in A){w=A[B];if(w&&w.__disposed===false){var z=w.classname;if(v[z]==null){v[z]=1;}
else {v[z]++;}
;E=y[z];if(E==null){E=y[z]=new Array();}
;E[E.length]=w.toHashCode();F++;}
;}
;if(!this._m_dObjectList){this._m_dObjectList={};}
;var u={};for(var z in v){if(!(z in this._m_dObjectList)){this._m_dObjectList[z]=0;}
;if(this._m_dObjectList[z]>=0&&this._m_dObjectList[z]<v[z]){u[z]=v[z]-this._m_dObjectList[z];}
;}
;this._m_dObjectList=v;var D=[];for(var x in u){D.push({classname:x,number:u[x],aHashCode:y[x]});}
;D.sort(function(a,b){return b.number-a.number;}
);var C=c+F+f;for(var i=0;i<D.length;i++){C+=D[i].number+d+D[i].classname+g+D[i].aHashCode.join(e)+h;}
;return C;}
}});}
)();


qx.$$loader.init();

