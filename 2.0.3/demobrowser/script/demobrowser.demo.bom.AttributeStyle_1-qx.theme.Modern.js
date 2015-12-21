(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();

if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"locale":"en","locale.variant":"US","qx.allowUrlSettings":true,"qx.allowUrlVariants":true,"qx.application":"demobrowser.demo.bom.AttributeStyle_1","qx.optimization.basecalls":true,"qx.optimization.privates":true,"qx.optimization.strings":true,"qx.optimization.variables":true,"qx.optimization.whitespace":true,"qx.theme":"qx.theme.Modern"};
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
  packages : {"0":{"uris":["__out__:demobrowser.demo.bom.AttributeStyle_1-qx.theme.Modern.0a845269dc7c.js"]}},
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

var readyStateValue = {"complete" : true};
if (document.documentMode && document.documentMode < 10 ||
    (typeof window.ActiveXObject !== "undefined" && !document.documentMode)) {
  readyStateValue["loaded"] = true;
}

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function() {
    if (!this.readyState || readyStateValue[this.readyState]) {
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

qx.$$packageData['0']={"locales":{},"resources":{"demobrowser/demo/test/combined/icons22.png":[22,176,"png","demobrowser.demo"],"qx/decoration/Modern/app-header.png":[110,20,"png","qx"],"qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/down-small-invert.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-69,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-49,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-59,0],"qx/decoration/Modern/arrows/left-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",0,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-44,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-54,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-28,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-36,0],"qx/decoration/Modern/button-lr-combined.png":[72,52,"png","qx"],"qx/decoration/Modern/button-tb-combined.png":[4,216,"png","qx"],"qx/decoration/Modern/checkradio-combined.png":[504,14,"png","qx"],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/button-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-72],"qx/decoration/Modern/form/button-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-204],"qx/decoration/Modern/form/button-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-188],"qx/decoration/Modern/form/button-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-36],"qx/decoration/Modern/form/button-checked-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-84],"qx/decoration/Modern/form/button-checked-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-184],"qx/decoration/Modern/form/button-checked-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-156],"qx/decoration/Modern/form/button-checked-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-208],"qx/decoration/Modern/form/button-checked-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-160],"qx/decoration/Modern/form/button-checked-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-40,0],"qx/decoration/Modern/form/button-checked-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-32,0],"qx/decoration/Modern/form/button-checked-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-28],"qx/decoration/Modern/form/button-checked-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-24],"qx/decoration/Modern/form/button-checked-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-48],"qx/decoration/Modern/form/button-checked-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-checked-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-16,0],"qx/decoration/Modern/form/button-checked-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-60,0],"qx/decoration/Modern/form/button-checked-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-140],"qx/decoration/Modern/form/button-checked-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-56],"qx/decoration/Modern/form/button-checked-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-112],"qx/decoration/Modern/form/button-checked.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-disabled-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-40],"qx/decoration/Modern/form/button-disabled-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-136],"qx/decoration/Modern/form/button-disabled-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-16],"qx/decoration/Modern/form/button-disabled-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-disabled-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-68,0],"qx/decoration/Modern/form/button-disabled-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-4,0],"qx/decoration/Modern/form/button-disabled-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-116],"qx/decoration/Modern/form/button-disabled-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-168],"qx/decoration/Modern/form/button-disabled-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-60],"qx/decoration/Modern/form/button-disabled.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-68],"qx/decoration/Modern/form/button-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-144],"qx/decoration/Modern/form/button-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-8],"qx/decoration/Modern/form/button-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-24,0],"qx/decoration/Modern/form/button-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-44,0],"qx/decoration/Modern/form/button-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-192],"qx/decoration/Modern/form/button-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-148],"qx/decoration/Modern/form/button-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-104],"qx/decoration/Modern/form/button-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-hovered-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-108],"qx/decoration/Modern/form/button-hovered-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-32],"qx/decoration/Modern/form/button-hovered-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-128],"qx/decoration/Modern/form/button-hovered-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-hovered-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-20,0],"qx/decoration/Modern/form/button-hovered-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-48,0],"qx/decoration/Modern/form/button-hovered-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-44],"qx/decoration/Modern/form/button-hovered-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-76],"qx/decoration/Modern/form/button-hovered-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-88],"qx/decoration/Modern/form/button-hovered.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-56,0],"qx/decoration/Modern/form/button-preselected-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-124],"qx/decoration/Modern/form/button-preselected-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-176],"qx/decoration/Modern/form/button-preselected-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-200],"qx/decoration/Modern/form/button-preselected-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-4],"qx/decoration/Modern/form/button-preselected-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-152],"qx/decoration/Modern/form/button-preselected-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-28,0],"qx/decoration/Modern/form/button-preselected-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-36,0],"qx/decoration/Modern/form/button-preselected-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-196],"qx/decoration/Modern/form/button-preselected-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-164],"qx/decoration/Modern/form/button-preselected-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-212],"qx/decoration/Modern/form/button-preselected-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-preselected-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-8,0],"qx/decoration/Modern/form/button-preselected-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-64,0],"qx/decoration/Modern/form/button-preselected-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-96],"qx/decoration/Modern/form/button-preselected-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-80],"qx/decoration/Modern/form/button-preselected-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-132],"qx/decoration/Modern/form/button-preselected.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-pressed-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-12],"qx/decoration/Modern/form/button-pressed-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-52],"qx/decoration/Modern/form/button-pressed-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-20],"qx/decoration/Modern/form/button-pressed-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-pressed-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-52,0],"qx/decoration/Modern/form/button-pressed-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-12,0],"qx/decoration/Modern/form/button-pressed-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-100],"qx/decoration/Modern/form/button-pressed-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-172],"qx/decoration/Modern/form/button-pressed-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-64],"qx/decoration/Modern/form/button-pressed.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",0,0],"qx/decoration/Modern/form/button-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-92],"qx/decoration/Modern/form/button-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-120],"qx/decoration/Modern/form/button-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-180],"qx/decoration/Modern/form/button.png":[80,60,"png","qx"],"qx/decoration/Modern/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-126,0],"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-322,0],"qx/decoration/Modern/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-294,0],"qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-364,0],"qx/decoration/Modern/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-490,0],"qx/decoration/Modern/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-224,0],"qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-378,0],"qx/decoration/Modern/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-84,0],"qx/decoration/Modern/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-182,0],"qx/decoration/Modern/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-42,0],"qx/decoration/Modern/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-392,0],"qx/decoration/Modern/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-210,0],"qx/decoration/Modern/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-14,0],"qx/decoration/Modern/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-238,0],"qx/decoration/Modern/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-462,0],"qx/decoration/Modern/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-112,0],"qx/decoration/Modern/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-448,0],"qx/decoration/Modern/form/checkbox-undetermined-disabled.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-focused-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-focused.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-hovered-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-hovered.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-140,0],"qx/decoration/Modern/form/checked-disabled.png":[6,6,"png","qx"],"qx/decoration/Modern/form/checked.png":[6,6,"png","qx"],"qx/decoration/Modern/form/input-focused.png":[40,12,"png","qx"],"qx/decoration/Modern/form/input.png":[84,12,"png","qx"],"qx/decoration/Modern/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-196,0],"qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-168,0],"qx/decoration/Modern/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-98,0],"qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-308,0],"qx/decoration/Modern/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-406,0],"qx/decoration/Modern/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-28,0],"qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-350,0],"qx/decoration/Modern/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-266,0],"qx/decoration/Modern/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-252,0],"qx/decoration/Modern/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-336,0],"qx/decoration/Modern/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-476,0],"qx/decoration/Modern/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-420,0],"qx/decoration/Modern/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-56,0],"qx/decoration/Modern/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",0,0],"qx/decoration/Modern/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-154,0],"qx/decoration/Modern/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-434,0],"qx/decoration/Modern/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-280,0],"qx/decoration/Modern/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-70,0],"qx/decoration/Modern/form/tooltip-error-arrow-right.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-b.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-30],"qx/decoration/Modern/form/tooltip-error-bl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-24],"qx/decoration/Modern/form/tooltip-error-br.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-c.png":[40,18,"png","qx"],"qx/decoration/Modern/form/tooltip-error-l.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",-6,0],"qx/decoration/Modern/form/tooltip-error-r.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-t.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-6],"qx/decoration/Modern/form/tooltip-error-tl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-18],"qx/decoration/Modern/form/tooltip-error-tr.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-12],"qx/decoration/Modern/form/tooltip-error.png":[127,30,"png","qx"],"qx/decoration/Modern/form/undetermined-disabled.png":[6,2,"png","qx"],"qx/decoration/Modern/form/undetermined.png":[6,2,"png","qx"],"qx/decoration/Modern/group-item.png":[110,20,"png","qx"],"qx/decoration/Modern/groupbox-lr-combined.png":[8,51,"png","qx"],"qx/decoration/Modern/groupbox-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-b.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox/groupbox-bl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-16],"qx/decoration/Modern/groupbox/groupbox-br.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-8],"qx/decoration/Modern/groupbox/groupbox-c.png":[40,51,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-l.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",-4,0],"qx/decoration/Modern/groupbox/groupbox-r.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-t.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-4],"qx/decoration/Modern/groupbox/groupbox-tl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-tr.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-20],"qx/decoration/Modern/groupbox/groupbox.png":[255,59,"png","qx"],"qx/decoration/Modern/menu-background-combined.png":[80,49,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/background.png":[40,49,"png","qx","qx/decoration/Modern/menu-background-combined.png",-40,0],"qx/decoration/Modern/menu/bar-background.png":[40,20,"png","qx","qx/decoration/Modern/menu-background-combined.png",0,0],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/pane-lr-combined.png":[12,238,"png","qx"],"qx/decoration/Modern/pane-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/pane/pane-b.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-30],"qx/decoration/Modern/pane/pane-bl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-18],"qx/decoration/Modern/pane/pane-br.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-12],"qx/decoration/Modern/pane/pane-c.png":[40,238,"png","qx"],"qx/decoration/Modern/pane/pane-l.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",0,0],"qx/decoration/Modern/pane/pane-r.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",-6,0],"qx/decoration/Modern/pane/pane-t.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,0],"qx/decoration/Modern/pane/pane-tl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-24],"qx/decoration/Modern/pane/pane-tr.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-6],"qx/decoration/Modern/pane/pane.png":[185,250,"png","qx"],"qx/decoration/Modern/scrollbar-combined.png":[54,12,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png":[76,15,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png":[19,10,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png":[10,19,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png":[15,76,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-34,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png":[10,12,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-6,0],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-28,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-50,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-46,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/scrollbar/slider-knob-background.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-16,0],"qx/decoration/Modern/selection.png":[110,20,"png","qx"],"qx/decoration/Modern/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Modern/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Modern/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Modern/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-30],"qx/decoration/Modern/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-45],"qx/decoration/Modern/shadow/shadow-c.png":[40,382,"png","qx"],"qx/decoration/Modern/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",-15,0],"qx/decoration/Modern/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-20],"qx/decoration/Modern/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-10],"qx/decoration/Modern/shadow/shadow-small-c.png":[40,136,"png","qx"],"qx/decoration/Modern/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",-5,0],"qx/decoration/Modern/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-5],"qx/decoration/Modern/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-25],"qx/decoration/Modern/shadow/shadow-small.png":[114,146,"png","qx"],"qx/decoration/Modern/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-60],"qx/decoration/Modern/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-75],"qx/decoration/Modern/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow.png":[381,412,"png","qx"],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-1],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/table-combined.png":[94,18,"png","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-80,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-26,0],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-18,0],"qx/decoration/Modern/table/header-cell.png":[40,18,"png","qx","qx/decoration/Modern/table-combined.png",-40,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png":[10,14,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-lr-combined.png":[10,12,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-pane-lr-combined.png":[60,2,"png","qx"],"qx/decoration/Modern/tabview-pane-tb-combined.png":[30,180,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-bottom-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-bottom-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-l.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-r.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active.png":[49,24,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-left-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-left-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-left-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-left-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-left-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-left-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-right-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-right-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-right-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-right-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-right-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-right-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-top-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-top-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-top-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-l.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-r.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-top-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-top-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-top-active.png":[48,22,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-b.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-60],"qx/decoration/Modern/tabview/tabview-pane-bl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-br.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-120],"qx/decoration/Modern/tabview/tabview-pane-c.png":[40,120,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-l.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-r.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",-30,0],"qx/decoration/Modern/tabview/tabview-pane-t.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-150],"qx/decoration/Modern/tabview/tabview-pane-tl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-30],"qx/decoration/Modern/tabview/tabview-pane-tr.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-90],"qx/decoration/Modern/tabview/tabview-pane.png":[185,250,"png","qx"],"qx/decoration/Modern/toolbar-combined.png":[80,130,"png","qx"],"qx/decoration/Modern/toolbar/toolbar-gradient-blue.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",-40,0],"qx/decoration/Modern/toolbar/toolbar-gradient.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",0,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tooltip-error-lr-combined.png":[12,18,"png","qx"],"qx/decoration/Modern/tooltip-error-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-active-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-inactive-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-active-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-inactive-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-statusbar-lr-combined.png":[8,7,"png","qx"],"qx/decoration/Modern/window-statusbar-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/window/captionbar-active-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-active-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-active-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-active-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-active-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-active-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-active-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-active.png":[69,21,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-inactive-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-inactive-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-inactive-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-inactive-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-inactive.png":[69,21,"png","qx"],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Modern/window/statusbar-b.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-16],"qx/decoration/Modern/window/statusbar-bl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-20],"qx/decoration/Modern/window/statusbar-br.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-4],"qx/decoration/Modern/window/statusbar-c.png":[40,7,"png","qx"],"qx/decoration/Modern/window/statusbar-l.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",-4,0],"qx/decoration/Modern/window/statusbar-r.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",0,0],"qx/decoration/Modern/window/statusbar-t.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,0],"qx/decoration/Modern/window/statusbar-tl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-8],"qx/decoration/Modern/window/statusbar-tr.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-12],"qx/decoration/Modern/window/statusbar.png":[369,15,"png","qx"],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx","demobrowser/demo/test/combined/icons22.png",0,-44],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx","demobrowser/demo/test/combined/icons22.png",0,-22],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"]},"translations":{"C":{},"de":{},"de_DE":{},"en":{},"en_US":{},"fr":{},"fr_FR":{}}};
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
(function(){var d="qx.core.Aspect",c="before",b="*",a="static";qx.Bootstrap.define(d,{statics:{__j:[],wrap:function(e,f,g){var m=[];var h=[];var l=this.__j;var k;for(var i=0;i<l.length;i++){k=l[i];if((k.type==null||g==k.type||k.type==b)&&(k.name==null||e.match(k.name))){k.pos==-1?m.push(k.fcn):h.push(k.fcn);}
;}
;if(m.length===0&&h.length===0){return f;}
;var j=function(){for(var i=0;i<m.length;i++){m[i].call(this,e,f,g,arguments);}
;var n=f.apply(this,arguments);for(var i=0;i<h.length;i++){h[i].call(this,e,f,g,arguments,n);}
;return n;}
;if(g!==a){j.self=f.self;j.base=f.base;}
;f.wrapper=j;j.original=f;return j;}
,addAdvice:function(o,p,q,name){this.__j.push({fcn:o,pos:p===c?-1:1,type:q,name:name});}
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
,__k:function(bb,bc,bd,be){var bi=bd.$$members;if(bi){for(var bh in bi){if(qx.Bootstrap.isFunction(bi[bh])){var bg=this.__l(bc,bh);var bf=bg||qx.Bootstrap.isFunction(bb[bh]);if(!bf){throw new Error(c+bh+I+bc.classname+K+bd.name+G);}
;var bj=be===true&&!bg&&!qx.util.OOUtil.hasInterface(bc,bd);if(bj){bb[bh]=this.__o(bd,bb[bh],bh,bi[bh]);}
;}
else {if(typeof bb[bh]===undefined){if(typeof bb[bh]!==m){throw new Error(r+bh+I+bc.classname+K+bd.name+G);}
;}
;}
;}
;}
;}
,__l:function(bk,bl){var bp=bl.match(/^(is|toggle|get|set|reset)(.*)$/);if(!bp){return false;}
;var bm=qx.Bootstrap.firstLow(bp[2]);var bn=qx.util.OOUtil.getPropertyDefinition(bk,bm);if(!bn){return false;}
;var bo=bp[0]==w||bp[0]==o;if(bo){return qx.util.OOUtil.getPropertyDefinition(bk,bm).check==k;}
;return true;}
,__m:function(bq,br){if(br.$$properties){for(var bs in br.$$properties){if(!qx.util.OOUtil.getPropertyDefinition(bq,bs)){throw new Error(f+bs+L+bq.classname+x);}
;}
;}
;}
,__n:function(bt,bu){if(bu.$$events){for(var bv in bu.$$events){if(!qx.util.OOUtil.supportsEvent(bt,bv)){throw new Error(R+bv+L+bt.classname+x);}
;}
;}
;}
,assertObject:function(bw,bx){var bz=bw.constructor;this.__k(bw,bz,bx,false);this.__m(bz,bx);this.__n(bz,bx);var by=bx.$$extends;if(by){for(var i=0,l=by.length;i<l;i++){this.assertObject(bw,by[i]);}
;}
;}
,assert:function(bA,bB,bC){this.__k(bA.prototype,bA,bB,bC);this.__m(bA,bB);this.__n(bA,bB);var bD=bB.$$extends;if(bD){for(var i=0,l=bD.length;i<l;i++){this.assert(bA,bD[i],bC);}
;}
;}
,genericToString:function(){return D+this.name+O;}
,$$registry:{},__o:qx.core.Environment.select(C,{"true":function(bE,bF,bG,bH){function bI(){bH.apply(this,arguments);return bF.apply(this,arguments);}
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
(function(){var bM='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',bL='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',bK='value !== null && value.nodeType === 9 && value.documentElement',bJ='value !== null && value.$$type === "Mixin"',bI='return init;',bH='var init=this.',bG='value !== null && value.nodeType === 1 && value.attributes',bF="var parent = this.getLayoutParent();",bE="Error in property ",bD='qx.core.Assert.assertInstance(value, Date, msg) || true',bs="Cannot add the non themable property '",br="if (!parent) return;",bq=" in method ",bp='qx.core.Assert.assertInstance(value, Error, msg) || true',bo='Undefined value is not allowed!',bn="' to the themable property group '",bm="inherit",bl='Is invalid!',bk="MSIE 6.0",bj="': ",bT=" of class ",bU='value !== null && value.nodeType !== undefined',bR='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',bS="module.events",bP='qx.core.Assert.assertPositiveInteger(value, msg) || true',bQ="Cannot create property group '",bN='if(init==qx.core.Property.$$inherit)init=null;',bO='value !== null && value.$$type === "Interface"',bV='var inherit=prop.$$inherit;',bW="var value = parent.",bw="$$useinit_",bv="(value);",by='Requires exactly one argument!',bx="$$runtime_",bA="$$user_",bz='qx.core.Assert.assertArray(value, msg) || true',bC='qx.core.Assert.assertPositiveNumber(value, msg) || true',bB="' including non-existing property '",bu="Boolean",bt='return value;',b='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',c='Does not allow any arguments!',d="()",e="var a=arguments[0] instanceof Array?arguments[0]:arguments;",f='value !== null && value.$$type === "Theme"',g="'!",h="())",j='return null;',k='qx.core.Assert.assertObject(value, msg) || true',m='qx.core.Assert.assertString(value, msg) || true',cb="if (value===undefined) value = parent.",ca='value !== null && value.$$type === "Class"',bY='qx.core.Assert.assertFunction(value, msg) || true',bX="object",cf="$$init_",ce="$$theme_",cd="Unknown reason: ",cc='qx.core.Assert.assertMap(value, msg) || true',ch="Generating property wrappers: ",cg="'",L='qx.core.Assert.assertNumber(value, msg) || true',M='Null value is not allowed!',J='qx.core.Assert.assertInteger(value, msg) || true',K="rv:1.8.1",P="shorthand",Q="Generating property group: ",N='qx.core.Assert.assertInstance(value, RegExp, msg) || true',O='value !== null && value.type !== undefined',H='value !== null && value.document',I='throw new Error("Property ',u="(!this.",t='qx.core.Assert.assertBoolean(value, msg) || true',w="toggle",v="$$inherit_",q=" with incoming value '",p="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",s="qx.core.Property",r="is",o='Could not change or apply init value after constructing phase!',n="();",V='else ',W='if(this.',X="resetRuntime",Y="return this.",R="get",S=";",T="(a[",U="qx.debug.property.level",ba=' of an instance of ',bb="refresh",E=' is not (yet) ready!");',D="]);",C="resetThemed",B='else if(this.',A="reset",z="setRuntime",y="init",x="set",G="setThemed",F='!==undefined)',bc="this.",bd="qx.debug",be="",bf='return this.',bg="string",bh="boolean",bi=';';qx.Bootstrap.define(s,{statics:{__p:function(){if(qx.core.Environment.get(bS)){qx.event.type.Data;qx.event.dispatch.Direct;}
;}
,__q:{"Boolean":t,"String":m,"Number":L,"Integer":J,"PositiveNumber":bC,"PositiveInteger":bP,"Error":bp,"RegExp":N,"Object":k,"Array":bz,"Map":cc,"Function":bY,"Date":bD,"Node":bU,"Element":bG,"Document":bK,"Window":H,"Event":O,"Class":ca,"Mixin":bJ,"Interface":bO,"Theme":f,"Color":bM,"Decorator":bR,"Font":bL},__r:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:bm,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:bg,dereference:bh,inheritable:bh,nullable:bh,themeable:bh,refine:bh,init:null,apply:bg,event:bg,check:null,transform:bg,deferredInit:bh,validate:null},$$allowedGroupKeys:{name:bg,group:bX,mode:bg,themeable:bh},$$inheritable:{},__s:function(ci){var cj=this.__t(ci);if(!cj.length){var ck=function(){}
;}
else {ck=this.__u(cj);}
;ci.prototype.$$refreshInheritables=ck;}
,__t:function(cl){var cn=[];while(cl){var cm=cl.$$properties;if(cm){for(var name in this.$$inheritable){if(cm[name]&&cm[name].inheritable){cn.push(name);}
;}
;}
;cl=cl.superclass;}
;return cn;}
,__u:function(co){var cs=this.$$store.inherit;var cr=this.$$store.init;var cq=this.$$method.refresh;var cp=[bF,br];for(var i=0,l=co.length;i<l;i++){var name=co[i];cp.push(bW,cs[name],S,cb,cr[name],S,bc,cq[name],bv);}
;return new Function(cp.join(be));}
,attachRefreshInheritables:function(ct){ct.prototype.$$refreshInheritables=function(){qx.core.Property.__s(ct);return this.$$refreshInheritables();}
;}
,attachMethods:function(cu,name,cv){cv.group?this.__v(cu,cv,name):this.__w(cu,cv,name);}
,__v:function(cw,cx,name){var cE=qx.Bootstrap.firstUp(name);var cD=cw.prototype;var cF=cx.themeable===true;if(qx.core.Environment.get(bd)){if(qx.core.Environment.get(U)>1){qx.Bootstrap.debug(Q+name);}
;}
;var cG=[];var cA=[];if(cF){var cy=[];var cC=[];}
;var cB=e;cG.push(cB);if(cF){cy.push(cB);}
;if(cx.mode==P){var cz=p;cG.push(cz);if(cF){cy.push(cz);}
;}
;for(var i=0,a=cx.group,l=a.length;i<l;i++){if(qx.core.Environment.get(bd)){if(!this.$$method.set[a[i]]||!this.$$method.reset[a[i]]){throw new Error(bQ+name+bB+a[i]+g);}
;}
;cG.push(bc,this.$$method.set[a[i]],T,i,D);cA.push(bc,this.$$method.reset[a[i]],n);if(cF){if(qx.core.Environment.get(bd)){if(!this.$$method.setThemed[a[i]]){throw new Error(bs+a[i]+bn+name+cg);}
;}
;cy.push(bc,this.$$method.setThemed[a[i]],T,i,D);cC.push(bc,this.$$method.resetThemed[a[i]],n);}
;}
;this.$$method.set[name]=x+cE;cD[this.$$method.set[name]]=new Function(cG.join(be));this.$$method.reset[name]=A+cE;cD[this.$$method.reset[name]]=new Function(cA.join(be));if(cF){this.$$method.setThemed[name]=G+cE;cD[this.$$method.setThemed[name]]=new Function(cy.join(be));this.$$method.resetThemed[name]=C+cE;cD[this.$$method.resetThemed[name]]=new Function(cC.join(be));}
;}
,__w:function(cH,cI,name){var cK=qx.Bootstrap.firstUp(name);var cM=cH.prototype;if(qx.core.Environment.get(bd)){if(qx.core.Environment.get(U)>1){qx.Bootstrap.debug(ch+name);}
;}
;if(cI.dereference===undefined&&typeof cI.check===bg){cI.dereference=this.__x(cI.check);}
;var cL=this.$$method;var cJ=this.$$store;cJ.runtime[name]=bx+name;cJ.user[name]=bA+name;cJ.theme[name]=ce+name;cJ.init[name]=cf+name;cJ.inherit[name]=v+name;cJ.useinit[name]=bw+name;cL.get[name]=R+cK;cM[cL.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,cH,name,R);}
;cL.set[name]=x+cK;cM[cL.set[name]]=function(cN){return qx.core.Property.executeOptimizedSetter(this,cH,name,x,arguments);}
;cL.reset[name]=A+cK;cM[cL.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cH,name,A);}
;if(cI.inheritable||cI.apply||cI.event||cI.deferredInit){cL.init[name]=y+cK;cM[cL.init[name]]=function(cO){return qx.core.Property.executeOptimizedSetter(this,cH,name,y,arguments);}
;}
;if(cI.inheritable){cL.refresh[name]=bb+cK;cM[cL.refresh[name]]=function(cP){return qx.core.Property.executeOptimizedSetter(this,cH,name,bb,arguments);}
;}
;cL.setRuntime[name]=z+cK;cM[cL.setRuntime[name]]=function(cQ){return qx.core.Property.executeOptimizedSetter(this,cH,name,z,arguments);}
;cL.resetRuntime[name]=X+cK;cM[cL.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cH,name,X);}
;if(cI.themeable){cL.setThemed[name]=G+cK;cM[cL.setThemed[name]]=function(cR){return qx.core.Property.executeOptimizedSetter(this,cH,name,G,arguments);}
;cL.resetThemed[name]=C+cK;cM[cL.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cH,name,C);}
;}
;if(cI.check===bu){cM[w+cK]=new Function(Y+cL.set[name]+u+cL.get[name]+h);cM[r+cK]=new Function(Y+cL.get[name]+d);}
;}
,__x:function(cS){return !!this.__r[cS];}
,__y:function(cT){return this.__r[cT]||qx.util.OOUtil.classIsDefined(cT)||(qx.Interface&&qx.Interface.isDefined(cT));}
,__z:{'0':o,'1':by,'2':bo,'3':c,'4':M,'5':bl},error:function(cU,cV,cW,cX,cY){var da=cU.constructor.classname;var db=bE+cW+bT+da+bq+this.$$method[cX][cW]+q+cY+bj;throw new Error(db+(this.__z[cV]||cd+cV));}
,__A:function(dc,dd,name,de,df,dg){var dh=this.$$method[de][name];if(qx.core.Environment.get("qx.debug")){if(qx.core.Environment.get("qx.debug.property.level")>1){qx.Bootstrap.debug("Code["+this.$$method[de][name]+"]: "+df.join(""));}
;try{dd[dh]=new Function("value",df.join(""));}
catch(di){throw new Error("Malformed generated code to unwrap method: "+this.$$method[de][name]+"\n"+df.join(""));}
;}
else {dd[dh]=new Function("value",df.join(""));}
;if(qx.core.Environment.get("qx.aspects")){dd[dh]=qx.core.Aspect.wrap(dc.classname+"."+dh,dd[dh],"property");}
;qx.Bootstrap.setDisplayName(dd[dh],dc.classname+".prototype",dh);if(dg===undefined){return dc[dh]();}
else if(qx.core.Environment.get("qx.debug")){return dc[dh].apply(dc,dg);}
else {return dc[dh](dg[0]);}
;}
,executeOptimizedGetter:function(dj,dk,name,dl){var dn=dk.$$properties[name];var dq=dk.prototype;var dm=[];var dp=this.$$store;dm.push(W,dp.runtime[name],F);dm.push(bf,dp.runtime[name],bi);if(dn.inheritable){dm.push(B,dp.inherit[name],F);dm.push(bf,dp.inherit[name],bi);dm.push(V);}
;dm.push(W,dp.user[name],F);dm.push(bf,dp.user[name],bi);if(dn.themeable){dm.push(B,dp.theme[name],F);dm.push(bf,dp.theme[name],bi);}
;if(dn.deferredInit&&dn.init===undefined){dm.push(B,dp.init[name],F);dm.push(bf,dp.init[name],bi);}
;dm.push(V);if(dn.init!==undefined){if(dn.inheritable){dm.push(bH,dp.init[name],bi);if(dn.nullable){dm.push(bN);}
else if(dn.init!==undefined){dm.push(bf,dp.init[name],bi);}
else {dm.push(b,name,ba,dk.classname,E);}
;dm.push(bI);}
else {dm.push(bf,dp.init[name],bi);}
;}
else if(dn.inheritable||dn.nullable){dm.push(j);}
else {dm.push(I,name,ba,dk.classname,E);}
;return this.__A(dj,dq,name,dl,dm);}
,executeOptimizedSetter:function(dr,ds,name,dt,du){var dz=ds.$$properties[name];var dy=ds.prototype;var dw=[];var dv=dt===x||dt===G||dt===z||(dt===y&&dz.init===undefined);var dx=dz.apply||dz.event||dz.inheritable;var dA=this.__B(dt,name);this.__C(dw,dz,name,dt,dv);if(dv){this.__D(dw,ds,dz,name);}
;if(dx){this.__E(dw,dv,dA,dt);}
;if(dz.inheritable){dw.push(bV);}
;if(qx.core.Environment.get(bd)){if(dv){this.__F(dw,dz,ds,name,dt);}
;}
;if(!dx){this.__G(dw,name,dt,dv);}
else {this.__H(dw,dz,name,dt,dv);}
;if(dz.inheritable){this.__I(dw,dz,name,dt);}
else if(dx){this.__J(dw,dz,name,dt);}
;if(dx){this.__K(dw,dz,name);if(dz.inheritable&&dy._getChildren){this.__L(dw,name);}
;}
;if(dv){dw.push(bt);}
;return this.__A(dr,dy,name,dt,dw,du);}
,__B:function(dB,name){if(dB==="setRuntime"||dB==="resetRuntime"){var dC=this.$$store.runtime[name];}
else if(dB==="setThemed"||dB==="resetThemed"){dC=this.$$store.theme[name];}
else if(dB==="init"){dC=this.$$store.init[name];}
else {dC=this.$$store.user[name];}
;;return dC;}
,__C:function(dD,dE,name,dF,dG){if(qx.core.Environment.get("qx.debug")){dD.push('var prop=qx.core.Property;');if(dF==="init"){dD.push('if(this.$$initialized)prop.error(this,0,"',name,'","',dF,'",value);');}
;if(dF==="refresh"){}
else if(dG){dD.push('if(arguments.length!==1)prop.error(this,1,"',name,'","',dF,'",value);');dD.push('if(value===undefined)prop.error(this,2,"',name,'","',dF,'",value);');}
else {dD.push('if(arguments.length!==0)prop.error(this,3,"',name,'","',dF,'",value);');}
;}
else {if(!dE.nullable||dE.check||dE.inheritable){dD.push('var prop=qx.core.Property;');}
;if(dF==="set"){dD.push('if(value===undefined)prop.error(this,2,"',name,'","',dF,'",value);');}
;}
;}
,__D:function(dH,dI,dJ,name){if(dJ.transform){dH.push('value=this.',dJ.transform,'(value);');}
;if(dJ.validate){if(typeof dJ.validate==="string"){dH.push('this.',dJ.validate,'(value);');}
else if(dJ.validate instanceof Function){dH.push(dI.classname,'.$$properties.',name);dH.push('.validate.call(this, value);');}
;}
;}
,__E:function(dK,dL,dM,dN){var dO=(dN==="reset"||dN==="resetThemed"||dN==="resetRuntime");if(dL){dK.push('if(this.',dM,'===value)return value;');}
else if(dO){dK.push('if(this.',dM,'===undefined)return;');}
;}
,__F:qx.core.Environment.select("qx.debug",{"true":function(dP,dQ,dR,name,dS){if(!dQ.nullable){dP.push('if(value===null)prop.error(this,4,"',name,'","',dS,'",value);');}
;if(dQ.check!==undefined){dP.push('var msg = "Invalid incoming value for property \''+name+'\' of class \''+dR.classname+'\'";');if(dQ.nullable){dP.push('if(value!==null)');}
;if(dQ.inheritable){dP.push('if(value!==inherit)');}
;dP.push('if(');if(this.__q[dQ.check]!==undefined){dP.push('!(',this.__q[dQ.check],')');}
else if(qx.Class.isDefined(dQ.check)){dP.push('qx.core.Assert.assertInstance(value, qx.Class.getByName("',dQ.check,'"), msg)');}
else if(qx.Interface&&qx.Interface.isDefined(dQ.check)){dP.push('qx.core.Assert.assertInterface(value, qx.Interface.getByName("',dQ.check,'"), msg)');}
else if(typeof dQ.check==="function"){dP.push('!',dR.classname,'.$$properties.',name);dP.push('.check.call(this, value)');}
else if(typeof dQ.check==="string"){dP.push('!(',dQ.check,')');}
else if(dQ.check instanceof Array){dP.push('qx.core.Assert.assertInArray(value, ',dR.classname,'.$$properties.',name,'.check, msg)');}
else {throw new Error("Could not add check to property "+name+" of class "+dR.classname);}
;;;;;dP.push(')prop.error(this,5,"',name,'","',dS,'",value);');}
;}
,"false":undefined}),__G:function(dT,name,dU,dV){if(dU==="setRuntime"){dT.push('this.',this.$$store.runtime[name],'=value;');}
else if(dU==="resetRuntime"){dT.push('if(this.',this.$$store.runtime[name],'!==undefined)');dT.push('delete this.',this.$$store.runtime[name],';');}
else if(dU==="set"){dT.push('this.',this.$$store.user[name],'=value;');}
else if(dU==="reset"){dT.push('if(this.',this.$$store.user[name],'!==undefined)');dT.push('delete this.',this.$$store.user[name],';');}
else if(dU==="setThemed"){dT.push('this.',this.$$store.theme[name],'=value;');}
else if(dU==="resetThemed"){dT.push('if(this.',this.$$store.theme[name],'!==undefined)');dT.push('delete this.',this.$$store.theme[name],';');}
else if(dU==="init"&&dV){dT.push('this.',this.$$store.init[name],'=value;');}
;;;;;;}
,__H:function(dW,dX,name,dY,ea){if(dX.inheritable){dW.push('var computed, old=this.',this.$$store.inherit[name],';');}
else {dW.push('var computed, old;');}
;dW.push('if(this.',this.$$store.runtime[name],'!==undefined){');if(dY==="setRuntime"){dW.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dY==="resetRuntime"){dW.push('delete this.',this.$$store.runtime[name],';');dW.push('if(this.',this.$$store.user[name],'!==undefined)');dW.push('computed=this.',this.$$store.user[name],';');dW.push('else if(this.',this.$$store.theme[name],'!==undefined)');dW.push('computed=this.',this.$$store.theme[name],';');dW.push('else if(this.',this.$$store.init[name],'!==undefined){');dW.push('computed=this.',this.$$store.init[name],';');dW.push('this.',this.$$store.useinit[name],'=true;');dW.push('}');}
else {dW.push('old=computed=this.',this.$$store.runtime[name],';');if(dY==="set"){dW.push('this.',this.$$store.user[name],'=value;');}
else if(dY==="reset"){dW.push('delete this.',this.$$store.user[name],';');}
else if(dY==="setThemed"){dW.push('this.',this.$$store.theme[name],'=value;');}
else if(dY==="resetThemed"){dW.push('delete this.',this.$$store.theme[name],';');}
else if(dY==="init"&&ea){dW.push('this.',this.$$store.init[name],'=value;');}
;;;;}
;dW.push('}');dW.push('else if(this.',this.$$store.user[name],'!==undefined){');if(dY==="set"){if(!dX.inheritable){dW.push('old=this.',this.$$store.user[name],';');}
;dW.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dY==="reset"){if(!dX.inheritable){dW.push('old=this.',this.$$store.user[name],';');}
;dW.push('delete this.',this.$$store.user[name],';');dW.push('if(this.',this.$$store.runtime[name],'!==undefined)');dW.push('computed=this.',this.$$store.runtime[name],';');dW.push('if(this.',this.$$store.theme[name],'!==undefined)');dW.push('computed=this.',this.$$store.theme[name],';');dW.push('else if(this.',this.$$store.init[name],'!==undefined){');dW.push('computed=this.',this.$$store.init[name],';');dW.push('this.',this.$$store.useinit[name],'=true;');dW.push('}');}
else {if(dY==="setRuntime"){dW.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dX.inheritable){dW.push('computed=this.',this.$$store.user[name],';');}
else {dW.push('old=computed=this.',this.$$store.user[name],';');}
;if(dY==="setThemed"){dW.push('this.',this.$$store.theme[name],'=value;');}
else if(dY==="resetThemed"){dW.push('delete this.',this.$$store.theme[name],';');}
else if(dY==="init"&&ea){dW.push('this.',this.$$store.init[name],'=value;');}
;;}
;dW.push('}');if(dX.themeable){dW.push('else if(this.',this.$$store.theme[name],'!==undefined){');if(!dX.inheritable){dW.push('old=this.',this.$$store.theme[name],';');}
;if(dY==="setRuntime"){dW.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dY==="set"){dW.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dY==="setThemed"){dW.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(dY==="resetThemed"){dW.push('delete this.',this.$$store.theme[name],';');dW.push('if(this.',this.$$store.init[name],'!==undefined){');dW.push('computed=this.',this.$$store.init[name],';');dW.push('this.',this.$$store.useinit[name],'=true;');dW.push('}');}
else if(dY==="init"){if(ea){dW.push('this.',this.$$store.init[name],'=value;');}
;dW.push('computed=this.',this.$$store.theme[name],';');}
else if(dY==="refresh"){dW.push('computed=this.',this.$$store.theme[name],';');}
;;;;;dW.push('}');}
;dW.push('else if(this.',this.$$store.useinit[name],'){');if(!dX.inheritable){dW.push('old=this.',this.$$store.init[name],';');}
;if(dY==="init"){if(ea){dW.push('computed=this.',this.$$store.init[name],'=value;');}
else {dW.push('computed=this.',this.$$store.init[name],';');}
;}
else if(dY==="set"||dY==="setRuntime"||dY==="setThemed"||dY==="refresh"){dW.push('delete this.',this.$$store.useinit[name],';');if(dY==="setRuntime"){dW.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dY==="set"){dW.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dY==="setThemed"){dW.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(dY==="refresh"){dW.push('computed=this.',this.$$store.init[name],';');}
;;;}
;dW.push('}');if(dY==="set"||dY==="setRuntime"||dY==="setThemed"||dY==="init"){dW.push('else{');if(dY==="setRuntime"){dW.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dY==="set"){dW.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dY==="setThemed"){dW.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(dY==="init"){if(ea){dW.push('computed=this.',this.$$store.init[name],'=value;');}
else {dW.push('computed=this.',this.$$store.init[name],';');}
;dW.push('this.',this.$$store.useinit[name],'=true;');}
;;;dW.push('}');}
;}
,__I:function(eb,ec,name,ed){eb.push('if(computed===undefined||computed===inherit){');if(ed==="refresh"){eb.push('computed=value;');}
else {eb.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');}
;eb.push('if((computed===undefined||computed===inherit)&&');eb.push('this.',this.$$store.init[name],'!==undefined&&');eb.push('this.',this.$$store.init[name],'!==inherit){');eb.push('computed=this.',this.$$store.init[name],';');eb.push('this.',this.$$store.useinit[name],'=true;');eb.push('}else{');eb.push('delete this.',this.$$store.useinit[name],';}');eb.push('}');eb.push('if(old===computed)return value;');eb.push('if(computed===inherit){');eb.push('computed=undefined;delete this.',this.$$store.inherit[name],';');eb.push('}');eb.push('else if(computed===undefined)');eb.push('delete this.',this.$$store.inherit[name],';');eb.push('else this.',this.$$store.inherit[name],'=computed;');eb.push('var backup=computed;');if(ec.init!==undefined&&ed!=="init"){eb.push('if(old===undefined)old=this.',this.$$store.init[name],";");}
else {eb.push('if(old===undefined)old=null;');}
;eb.push('if(computed===undefined||computed==inherit)computed=null;');}
,__J:function(ee,ef,name,eg){if(eg!=="set"&&eg!=="setRuntime"&&eg!=="setThemed"){ee.push('if(computed===undefined)computed=null;');}
;ee.push('if(old===computed)return value;');if(ef.init!==undefined&&eg!=="init"){ee.push('if(old===undefined)old=this.',this.$$store.init[name],";");}
else {ee.push('if(old===undefined)old=null;');}
;}
,__K:function(eh,ei,name){if(ei.apply){eh.push('this.',ei.apply,'(computed, old, "',name,'");');}
;if(ei.event){eh.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",ei.event,"')){","reg.fireEvent(this, '",ei.event,"', qx.event.type.Data, [computed, old]",")}");}
;}
,__L:function(ej,name){ej.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');ej.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');ej.push('}');}
},defer:function(ek){var em=navigator.userAgent.indexOf(bk)!=-1;var el=navigator.userAgent.indexOf(K)!=-1;if(em||el){ek.__x=ek.__y;}
;}
});}
)();
(function(){var p="Mixin",o='" contains an invalid mixin at position ',n="The mixin to include into class '",m="constructor",k="' is abstract! It is not possible to instantiate it.",j="environment",h='The configuration key "',g="extend",f='" is not allowed!',e='"! Every non-static class has to extend at least the "qx.core.Object" class.',br='"! Only mixins and arrays of mixins are allowed!',bq="string",bp="' is a singleton! It is not possible to instantiate it directly. Use the static getInstance() method instead.",bo="settings",bn='"! ',bm='" contains an invalid interface at position ',bl='" definition for class "',bk='The implement definition in class "',bj='Forbidden environment setting "',bi='". It is forbidden to define a default setting for an external namespace!',w="members",x="variants",u="events",v='Invalid type "',s='Invalid include definition in class "',t="properties",q="statics",r='Invalid config in class "',C="The class '",D='"! The value needs to be a map!',N='Invalid type of key "',K='". It is forbidden to define a ',V='Invalid implement definition in class "',Q="The mixin to patch class '",be="]",bb="Interface",G="qx.Class",bh='Forbidden variant "',bg="Please initialize '",bf="' objects using the new keyword!",F='"! The type of the key must be "',I='Assumed static class because no "extend" key was found. ',J="[Class ",M='"! Only interfaces and arrays of interfaces are allowed!',O='The include definition in class "',R='environment setting for an external namespace!',X='Error in include definition of class "',bd="The class ',",y='"! The value is undefined/null!',z='". It is forbidden to define a variant for an external namespace!',H='Forbidden setting "',U=': ',T="singleton",S="qx.aspects",ba='"!',Y="' is undefined/null!",P="abstract",W='Invalid key "',b='" found in "',bc="function",A="Array",B='" in class "',L="static",c="object",d=".",E="qx.debug";qx.Bootstrap.define(G,{statics:{__M:qx.core.Environment.get("module.property")?qx.core.Property:null,define:function(name,bs){if(!bs){var bs={};}
;if(bs.include&&!(qx.Bootstrap.getClass(bs.include)===A)){bs.include=[bs.include];}
;if(bs.implement&&!(qx.Bootstrap.getClass(bs.implement)===A)){bs.implement=[bs.implement];}
;var bt=false;if(!bs.hasOwnProperty(g)&&!bs.type){bs.type=L;bt=true;}
;if(qx.core.Environment.get(E)){try{this.__d(name,bs);}
catch(bw){if(bt){bw.message=I+bw.message;}
;throw bw;}
;}
;var bu=this.__P(name,bs.type,bs.extend,bs.statics,bs.construct,bs.destruct,bs.include);if(bs.extend){if(bs.properties){this.__R(bu,bs.properties,true);}
;if(bs.members){this.__T(bu,bs.members,true,true,false);}
;if(bs.events){this.__Q(bu,bs.events,true);}
;if(bs.include){for(var i=0,l=bs.include.length;i<l;i++){this.__X(bu,bs.include[i],false);}
;}
;}
;if(bs.environment){for(var bv in bs.environment){qx.core.Environment.add(bv,bs.environment[bv]);}
;}
;if(bs.implement){for(var i=0,l=bs.implement.length;i<l;i++){this.__V(bu,bs.implement[i]);}
;}
;if(qx.core.Environment.get(E)){this.__O(bu);}
;if(bs.defer){bs.defer.self=bu;bs.defer(bu,bu.prototype,{add:function(name,bx){var by={};by[name]=bx;qx.Class.__R(bu,by,true);}
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
;qx.Class.__X(bC,bD,false);}
,patch:function(bE,bF){if(qx.core.Environment.get(E)){if(!bF){throw new Error(Q+bE.classname+Y);}
;qx.Mixin.isCompatible(bF,bE);}
;qx.Class.__X(bE,bF,true);}
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
,$$registry:qx.Bootstrap.$$registry,__c:qx.core.Environment.select(E,{"true":{"type":bq,"extend":bc,"implement":c,"include":c,"construct":bc,"statics":c,"properties":c,"members":c,"environment":c,"events":c,"defer":bc,"destruct":bc},"default":null}),__N:qx.core.Environment.select("qx.debug",{"true":{"type":"string","statics":"object","environment":"object","defer":"function"},"default":null}),__d:qx.core.Environment.select(E,{"true":function(name,cc){if(cc.type&&!(cc.type===L||cc.type===P||cc.type===T)){throw new Error(v+cc.type+bl+name+ba);}
;if(cc.type&&cc.type!==L&&!cc.extend){throw new Error(r+name+e);}
;var cf=cc.type===L?this.__N:this.__c;for(var ce in cc){if(!cf[ce]){throw new Error(h+ce+B+name+f);}
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
}),__O:qx.core.Environment.select("qx.debug",{"true":function(ch){var cj=ch.superclass;while(cj){if(cj.$$classtype!=="abstract"){break;}
;var ci=cj.$$implements;if(ci){for(var i=0;i<ci.length;i++){qx.Interface.assert(ch,ci[i],true);}
;}
;cj=cj.superclass;}
;}
,"default":function(){}
}),__P:function(name,ck,cl,cm,cn,co,cp){var cs;if(!cl&&qx.core.Environment.get("qx.aspects")==false){cs=cm||{};qx.Bootstrap.setDisplayNames(cs,name);}
else {var cs={};if(cl){if(!cn){cn=this.__Y();}
;if(this.__bb(cl,cp)){cs=this.__bc(cn,name,ck);}
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
,__Q:function(cu,cv,cw){if(qx.core.Environment.get("qx.debug")){if(typeof cv!=="object"||qx.Bootstrap.getClass(cv)==="Array"){throw new Error(cu.classname+": the events must be defined as map!");}
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
,__R:function(cy,cz,cA){if(!qx.core.Environment.get("module.property")){throw new Error("Property module disabled.");}
;var cB;if(cA===undefined){cA=false;}
;var cC=cy.prototype;for(var name in cz){cB=cz[name];if(qx.core.Environment.get("qx.debug")){this.__S(cy,name,cB,cA);}
;cB.name=name;if(!cB.refine){if(cy.$$properties===undefined){cy.$$properties={};}
;cy.$$properties[name]=cB;}
;if(cB.init!==undefined){cy.prototype["$$init_"+name]=cB.init;}
;if(cB.event!==undefined){if(!qx.core.Environment.get("module.events")){throw new Error("Events module not enabled.");}
;var event={};event[cB.event]="qx.event.type.Data";this.__Q(cy,event,cA);}
;if(cB.inheritable){this.__M.$$inheritable[name]=true;if(!cC.$$refreshInheritables){this.__M.attachRefreshInheritables(cy);}
;}
;if(!cB.refine){this.__M.attachMethods(cy,name,cB);}
;}
;}
,__S:qx.core.Environment.select("qx.debug",{"true":function(cD,name,cE,cF){if(!qx.core.Environment.get("module.property")){throw new Error("Property module disabled.");}
;var cH=this.hasProperty(cD,name);if(cH){var cG=this.getPropertyDefinition(cD,name);if(cE.refine&&cG.init===undefined){throw new Error("Could not refine an init value if there was previously no init value defined. Property '"+name+"' of class '"+cD.classname+"'.");}
;}
;if(!cH&&cE.refine){throw new Error("Could not refine non-existent property: '"+name+"' of class: '"+cD.classname+"'!");}
;if(cH&&!cF){throw new Error("Class "+cD.classname+" already has a property: "+name+"!");}
;if(cH&&cF){if(!cE.refine){throw new Error('Could not refine property "'+name+'" without a "refine" flag in the property definition! This class: '+cD.classname+', original class: '+this.getByProperty(cD,name).classname+'.');}
;for(var cI in cE){if(cI!=="init"&&cI!=="refine"){throw new Error("Class "+cD.classname+" could not refine property: "+name+"! Key: "+cI+" could not be refined!");}
;}
;}
;var cJ=cE.group?this.__M.$$allowedGroupKeys:this.__M.$$allowedKeys;for(var cI in cE){if(cJ[cI]===undefined){throw new Error('The configuration key "'+cI+'" of property "'+name+'" in class "'+cD.classname+'" is not allowed!');}
;if(cE[cI]===undefined){throw new Error('Invalid key "'+cI+'" of property "'+name+'" in class "'+cD.classname+'"! The value is undefined: '+cE[cI]);}
;if(cJ[cI]!==null&&typeof cE[cI]!==cJ[cI]){throw new Error('Invalid type of key "'+cI+'" of property "'+name+'" in class "'+cD.classname+'"! The type of the key must be "'+cJ[cI]+'"!');}
;}
;if(cE.transform!=null){if(!(typeof cE.transform=="string")){throw new Error('Invalid transform definition of property "'+name+'" in class "'+cD.classname+'"! Needs to be a String.');}
;}
;if(cE.check!=null){if(!qx.Bootstrap.isString(cE.check)&&!qx.Bootstrap.isArray(cE.check)&&!qx.Bootstrap.isFunction(cE.check)){throw new Error('Invalid check definition of property "'+name+'" in class "'+cD.classname+'"! Needs to be a String, Array or Function.');}
;}
;}
,"default":null}),__T:function(cK,cL,cM,cN,cO){var cP=cK.prototype;var cR,cQ;qx.Bootstrap.setDisplayNames(cL,cK.classname+".prototype");for(var i=0,a=qx.Bootstrap.getKeys(cL),l=a.length;i<l;i++){cR=a[i];cQ=cL[cR];if(qx.core.Environment.get("qx.debug")){if(cP[cR]!==undefined&&cR.charAt(0)=="_"&&cR.charAt(1)=="_"){throw new Error('Overwriting private member "'+cR+'" of Class "'+cK.classname+'" is not allowed!');}
;if(cM!==true&&cP.hasOwnProperty(cR)){throw new Error('Overwriting member "'+cR+'" of Class "'+cK.classname+'" is not allowed!');}
;}
;if(cN!==false&&cQ instanceof Function&&cQ.$$type==null){if(cO==true){cQ=this.__U(cQ,cP[cR]);}
else {if(cP[cR]){cQ.base=cP[cR];}
;cQ.self=cK;}
;if(qx.core.Environment.get("qx.aspects")){cQ=qx.core.Aspect.wrap(cK.classname+"."+cR,cQ,"member");}
;}
;cP[cR]=cQ;}
;}
,__U:function(cS,cT){if(cT){return function(){var cV=cS.base;cS.base=cT;var cU=cS.apply(this,arguments);cS.base=cV;return cU;}
;}
else {return cS;}
;}
,__V:function(cW,cX){if(qx.core.Environment.get("qx.debug")){if(!cW||!cX){throw new Error("Incomplete parameters!");}
;if(this.hasOwnInterface(cW,cX)){throw new Error('Interface "'+cX.name+'" is already used by Class "'+cW.classname+'!');}
;if(cW.$$classtype!=="abstract"){qx.Interface.assert(cW,cX,true);}
;}
;var cY=qx.Interface.flatten([cX]);if(cW.$$implements){cW.$$implements.push(cX);cW.$$flatImplements.push.apply(cW.$$flatImplements,cY);}
else {cW.$$implements=[cX];cW.$$flatImplements=cY;}
;}
,__W:function(da){var name=da.classname;var db=this.__bc(da,name,da.$$classtype);for(var i=0,a=qx.Bootstrap.getKeys(da),l=a.length;i<l;i++){dc=a[i];db[dc]=da[dc];}
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
,__X:function(dg,dh,di){if(qx.core.Environment.get("qx.debug")){if(!dg||!dh){throw new Error("Incomplete parameters!");}
;}
;if(this.hasMixin(dg,dh)){return;}
;var dl=dg.$$original;if(dh.$$constructor&&!dl){dg=this.__W(dg);}
;var dk=qx.Mixin.flatten([dh]);var dj;for(var i=0,l=dk.length;i<l;i++){dj=dk[i];if(dj.$$events){this.__Q(dg,dj.$$events,di);}
;if(dj.$$properties){this.__R(dg,dj.$$properties,di);}
;if(dj.$$members){this.__T(dg,dj.$$members,di,di,di);}
;}
;if(dg.$$includes){dg.$$includes.push(dh);dg.$$flatIncludes.push.apply(dg.$$flatIncludes,dk);}
else {dg.$$includes=[dh];dg.$$flatIncludes=dk;}
;}
,__Y:function(){function dm(){dm.base.apply(this,arguments);}
;return dm;}
,__ba:function(){return function(){}
;}
,__bb:function(dn,dp){if(qx.core.Environment.get(E)){return true;}
;if(dn&&dn.$$includes){var dq=dn.$$flatIncludes;for(var i=0,l=dq.length;i<l;i++){if(dq[i].$$constructor){return true;}
;}
;}
;if(dp){var dr=qx.Mixin.flatten(dp);for(var i=0,l=dr.length;i<l;i++){if(dr[i].$$constructor){return true;}
;}
;}
;return false;}
,__bc:function(ds,name,dt){var dv=function(){var dy=dv;if(qx.core.Environment.get(E)){if(!(this instanceof dy)){throw new Error(bg+name+bf);}
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
,assertArgumentsCount:function(cv,cw,cx,cy){var cz=cv.length;(cz>=cw&&cz<=cx)||this.__cA(cy||G,B,cw,h,cx,V,cz,br);}
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
;this.__bC=d||a;this.message=e||qx.type.BaseError.DEFAULTMESSAGE;}
,statics:{DEFAULTMESSAGE:"error"},members:{__bD:null,__bC:null,message:null,getComment:function(){return this.__bC;}
,toString:function(){return this.__bC+(this.message?c+this.message:a);}
}});}
)();
(function(){var a="qx.core.AssertionError";qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);this.__bE=qx.dev.StackTrace.getStackTrace();}
,members:{__bE:null,getStackTrace:function(){return this.__bE;}
}});}
)();
(function(){var t="?",s="anonymous",r="...",q="qx.dev.StackTrace",p="",o="\n",n="/source/class/",m="FILENAME_TO_CLASSNAME must return a string!",l="stack",k="FORMAT_STACKTRACE must return an array of strings!",d="prototype",j="stacktrace",g="qx.debug",c="Error created at",b="Backtrace:",f="function",e="ecmascript.stacktrace",h=".",a=":";qx.Bootstrap.define(q,{statics:{FILENAME_TO_CLASSNAME:null,FORMAT_STACKTRACE:null,getStackTrace:function(){var y=[];try{throw new Error();}
catch(J){if(qx.core.Environment.get(e)){var D=qx.dev.StackTrace.getStackTraceFromError(J);var B=qx.dev.StackTrace.getStackTraceFromCaller(arguments);qx.lang.Array.removeAt(D,0);y=B.length>D.length?B:D;for(var i=0;i<Math.min(B.length,D.length);i++){var z=B[i];if(z.indexOf(s)>=0){continue;}
;var x=null;var H=z.split(h);var A=/(.*?)\(/.exec(H[H.length-1]);if(A&&A.length==2){x=A[1];H.pop();}
;if(H[H.length-1]==d){H.pop();}
;var F=H.join(h);var w=D[i];var I=w.split(a);var E=I[0];var u=I[1];var v;if(I[2]){v=I[2];}
;var C=null;if(qx.Class.getByName(E)){C=E;}
else {C=F;}
;var G=C;if(x){G+=h+x;}
;G+=a+u;if(v){G+=a+v;}
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
;var bh=/@(.+):(\d+)$/gm;var U;while((U=bh.exec(R.stack))!=null){var X=U[1];var bf=U[2];var bd=this.__bF(X);V.push(bd+a+bf);}
;if(V.length>0){return this.__bH(V);}
;var bh=/at (.*)/gm;var bg=/\((.*?)(:[^\/].*)\)/;var bc=/(.*?)(:[^\/].*)/;var U;while((U=bh.exec(R.stack))!=null){var bb=bg.exec(U[1]);if(!bb){bb=bc.exec(U[1]);}
;if(bb){var bd=this.__bF(bb[1]);V.push(bd+bb[2]);}
else {V.push(U[1]);}
;}
;}
else if(qx.core.Environment.get(e)===j){var T=R.stacktrace;if(!T){return V;}
;if(T.indexOf(c)>=0){T=T.split(c)[0];}
;var bh=/line\ (\d+?),\ column\ (\d+?)\ in\ (?:.*?)\ in\ (.*?):[^\/]/gm;var U;while((U=bh.exec(T))!=null){var bf=U[1];var W=U[2];var X=U[3];var bd=this.__bF(X);V.push(bd+a+bf+a+W);}
;if(V.length>0){return this.__bH(V);}
;var bh=/Line\ (\d+?)\ of\ linked\ script\ (.*?)$/gm;var U;while((U=bh.exec(T))!=null){var bf=U[1];var X=U[2];var bd=this.__bF(X);V.push(bd+a+bf);}
;}
else if(R.message&&R.message.indexOf(b)>=0){var ba=qx.lang.String.trim(R.message.split(b)[1]);var Y=ba.split(o);for(var i=0;i<Y.length;i++){var S=Y[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);if(S&&S.length>=2){var bf=S[1];var be=this.__bF(S[2]);V.push(be+a+bf);}
;}
;}
else if(R.sourceURL&&R.line){V.push(this.__bF(R.sourceURL)+a+R.line);}
;;;return this.__bH(V);}
,__bF:function(bi){if(typeof qx.dev.StackTrace.FILENAME_TO_CLASSNAME==f){var bj=qx.dev.StackTrace.FILENAME_TO_CLASSNAME(bi);if(qx.core.Environment.get(g)&&!qx.lang.Type.isString(bj)){throw new Error(m);}
;return bj;}
;return qx.dev.StackTrace.__bG(bi);}
,__bG:function(bk){var bo=n;var bl=bk.indexOf(bo);var bn=bk.indexOf(t);if(bn>=0){bk=bk.substring(0,bn);}
;var bm=(bl==-1)?bk:bk.substring(bl+bo.length).replace(/\//g,h).replace(/\.js$/,p);return bm;}
,__bH:function(bp){if(typeof qx.dev.StackTrace.FORMAT_STACKTRACE==f){bp=qx.dev.StackTrace.FORMAT_STACKTRACE(bp);if(qx.core.Environment.get(g)&&!qx.lang.Type.isArray(bp)){throw new Error(k);}
;}
;return bp;}
}});}
)();
(function(){var f="e",d="ecmascript.stacktrace",c="qx.bom.client.EcmaScript",b="stack",a="stacktrace";qx.Bootstrap.define(c,{statics:{getStackTrace:function(){var g;var e=new Error(f);g=e.stack?b:e.stacktrace?a:null;if(!g){try{throw e;}
catch(h){e=h;}
;}
;return e.stacktrace?a:e.stack?b:null;}
},defer:function(i){qx.core.Environment.add(d,i.getStackTrace);}
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
;return function(event){if(qx.core.Environment.get(d)){if(qx.core&&qx.core.Object&&s.self&&qx.Bootstrap.isObject(s.self)&&s.self.isDisposed&&qx.Bootstrap.isFunction(s.self.isDisposed)){qx.core.Assert&&qx.core.Assert.assertFalse(s.self.isDisposed(),i+s.self.toString()+g+qx.lang.Function.getName(r));}
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
(function(){var p="-",o="",n="qx.core.ObjectRegistry",m="-0",k="Could not dispose object ",j=" objects",h=": ",g="Disposed ",f="qx.debug.dispose",e="$$hash",c="qx.debug",d="Invalid object: ";qx.Class.define(n,{statics:{inShutDown:false,__j:{},__bI:0,__bJ:[],__bK:o,__bL:{},register:function(q){var t=this.__j;if(!t){return;}
;var s=q.$$hash;if(s==null){var r=this.__bJ;if(r.length>0&&!qx.core.Environment.get(f)){s=r.pop();}
else {s=(this.__bI++)+this.__bK;}
;q.$$hash=s;if(qx.core.Environment.get(f)){if(qx.dev&&qx.dev.Debug&&qx.dev.Debug.disposeProfilingActive){this.__bL[s]=qx.dev.StackTrace.getStackTrace();}
;}
;}
;if(qx.core.Environment.get(c)){if(!q.dispose){throw new Error(d+q);}
;}
;t[s]=q;}
,unregister:function(u){var v=u.$$hash;if(v==null){return;}
;var w=this.__j;if(w&&w[v]){delete w[v];this.__bJ.push(v);}
;try{delete u.$$hash;}
catch(x){if(u.removeAttribute){u.removeAttribute(e);}
;}
;}
,toHashCode:function(y){if(qx.core.Environment.get(c)){if(y==null){throw new Error(d+y);}
;}
;var A=y.$$hash;if(A!=null){return A;}
;var z=this.__bJ;if(z.length>0){A=z.pop();}
else {A=(this.__bI++)+this.__bK;}
;return y.$$hash=A;}
,clearHashCode:function(B){if(qx.core.Environment.get(c)){if(B==null){throw new Error(d+B);}
;}
;var C=B.$$hash;if(C!=null){this.__bJ.push(C);try{delete B.$$hash;}
catch(D){if(B.removeAttribute){B.removeAttribute(e);}
;}
;}
;}
,fromHashCode:function(E){return this.__j[E]||null;}
,shutdown:function(){this.inShutDown=true;var G=this.__j;var I=[];for(var H in G){I.push(H);}
;I.sort(function(a,b){return parseInt(b,10)-parseInt(a,10);}
);var F,i=0,l=I.length;while(true){try{for(;i<l;i++){H=I[i];F=G[H];if(F&&F.dispose){F.dispose();}
;}
;}
catch(J){qx.Bootstrap.error(this,k+F.toString()+h+J,J);if(i!==l){i++;continue;}
;}
;break;}
;qx.Bootstrap.debug(this,g+l+j);delete this.__j;}
,getRegistry:function(){return this.__j;}
,getNextHash:function(){return this.__bI;}
,getPostId:function(){return this.__bK;}
,getStackTraces:function(){return this.__bL;}
},defer:function(K){if(window&&window.top){var frames=window.top.frames;for(var i=0;i<frames.length;i++){if(frames[i]===window){K.__bK=p+(i+1);return;}
;}
;}
;K.__bK=m;}
});}
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
;g.$$wrapped_callback=i;return this.addListener(f,i,this,h);}
,removeListener:function(j,k,self,l){if(!this.$$disposed){if(k.$$wrapped_callback){var m=k.$$wrapped_callback;delete k.$$wrapped_callback;k=m;}
;return this.__cL.removeListener(this,j,k,self,l);}
;return false;}
,removeListenerById:function(n){if(!this.$$disposed){return this.__cL.removeListenerById(this,n);}
;return false;}
,hasListener:function(o,p){return this.__cL.hasListener(this,o,p);}
,dispatchEvent:function(q){if(!this.$$disposed){return this.__cL.dispatchEvent(this,q);}
;return true;}
,fireEvent:function(r,s,t){if(!this.$$disposed){return this.__cL.fireEvent(this,r,s,t);}
;return true;}
,fireNonBubblingEvent:function(u,v,w){if(!this.$$disposed){return this.__cL.fireNonBubblingEvent(this,u,v,w);}
;return true;}
,fireDataEvent:function(x,y,z,A){if(!this.$$disposed){if(z===undefined){z=null;}
;return this.__cL.fireNonBubblingEvent(this,x,qx.event.type.Data,[y,z,!!A]);}
;return true;}
}});}
)();
(function(){var a="qx.event.IEventDispatcher";qx.Interface.define(a,{members:{canDispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);this.assertString(c);}
,dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);this.assertString(e);}
}});}
)();
(function(){var e="qx.core.MProperty",d="get",c="reset",b="No such property: ",a="set";qx.Mixin.define(e,{members:{set:function(f,g){var i=qx.core.Property.$$method.set;if(qx.Bootstrap.isString(f)){if(!this[i[f]]){if(this[a+qx.Bootstrap.firstUp(f)]!=undefined){this[a+qx.Bootstrap.firstUp(f)](g);return this;}
;throw new Error(b+f);}
;return this[i[f]](g);}
else {for(var h in f){if(!this[i[h]]){if(this[a+qx.Bootstrap.firstUp(h)]!=undefined){this[a+qx.Bootstrap.firstUp(h)](f[h]);continue;}
;throw new Error(b+h);}
;this[i[h]](f[h]);}
;return this;}
;}
,get:function(j){var k=qx.core.Property.$$method.get;if(!this[k[j]]){if(this[d+qx.Bootstrap.firstUp(j)]!=undefined){return this[d+qx.Bootstrap.firstUp(j)]();}
;throw new Error(b+j);}
;return this[k[j]]();}
,reset:function(l){var m=qx.core.Property.$$method.reset;if(!this[m[l]]){if(this[c+qx.Bootstrap.firstUp(l)]!=undefined){this[c+qx.Bootstrap.firstUp(l)]();return;}
;throw new Error(b+l);}
;this[m[l]]();}
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
,statics:{$$type:m},members:{__M:qx.core.Environment.get("module.property")?qx.core.Property:null,toHashCode:function(){return this.$$hash;}
,toString:function(){return this.classname+g+this.$$hash+c;}
,base:function(u,v){if(qx.core.Environment.get(e)){if(!qx.Bootstrap.isFunction(u.callee.base)){throw new Error(o+u.callee.displayName);}
;}
;if(arguments.length===1){return u.callee.base.call(this);}
else {return u.callee.base.apply(this,Array.prototype.slice.call(arguments,1));}
;}
,self:function(w){return w.callee.self;}
,clone:function(){if(!qx.core.Environment.get(j)){throw new Error(s);}
;var y=this.constructor;var x=new y;var A=qx.Class.getProperties(y);var z=this.__M.$$store.user;var B=this.__M.$$method.set;var name;for(var i=0,l=A.length;i<l;i++){name=A[i];if(this.hasOwnProperty(z[name])){x[B[name]](this[z[name]]);}
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
;qx.core.ObjectRegistry.unregister(this);this.__cM=null;if(qx.core.Environment.get(j)){var X=this.constructor;var bc;var bd=this.__M.$$store;var ba=bd.user;var bb=bd.theme;var V=bd.inherit;var Y=bd.useinit;var W=bd.init;while(X){bc=X.$$properties;if(bc){for(var name in bc){if(bc[name].dereference){this[ba[name]]=this[bb[name]]=this[V[name]]=this[Y[name]]=this[W[name]]=undefined;}
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
(function(){var o="qx.core.BaseInit",n="engine.name",m="Main runtime: ",l="qx.application",k="os.name",j="engine.version",i="Missing application class: ",h="Load runtime: ",g="Could not detect engine!",f="Finalize runtime: ",b="Could not detect operating system!",d="Could not detect the version of the engine!",c="",a="ms";qx.Class.define(o,{statics:{getApplication:function(){return this.__cT||null;}
,ready:function(){if(this.__cT){return;}
;if(qx.core.Environment.get(n)==c){qx.log.Logger.warn(g);}
;if(qx.core.Environment.get(j)==c){qx.log.Logger.warn(d);}
;if(qx.core.Environment.get(k)==c){qx.log.Logger.warn(b);}
;qx.log.Logger.debug(this,h+(new Date-qx.Bootstrap.LOADSTART)+a);var q=qx.core.Environment.get(l);var r=qx.Class.getByName(q);if(r){this.__cT=new r;var p=new Date;this.__cT.main();qx.log.Logger.debug(this,m+(new Date-p)+a);var p=new Date;this.__cT.finalize();qx.log.Logger.debug(this,f+(new Date-p)+a);}
else {qx.log.Logger.warn(i+q);}
;}
,__cU:function(e){var s=this.__cT;if(s){s.close();}
;}
,__cV:function(){var t=this.__cT;if(t){t.terminate();}
;qx.core.ObjectRegistry.shutdown();}
}});}
)();
(function(){var j="rim_tabletos",i="Darwin",h="os.version",g="2003",f=")",e="iPhone",d="android",c="unix",b="ce",a="7",bg="SymbianOS",bf="os.name",be="|",bd="MacPPC",bc="iPod",bb="\.",ba="Win64",Y="linux",X="me",W="Macintosh",q="Windows",r="ios",o="vista",p="8",m="blackberry",n="(",k="win",l="Linux",u="BSD",v="Mac OS X",D="iPad",B="X11",L="xp",G="symbian",S="qx.bom.client.OperatingSystem",Q="g",x="Win32",V="osx",U="webOS",T="RIM Tablet OS",w="BlackBerry",z="nt4",A=".",C="MacIntel",E="webos",H="10.1",N="10.3",R="10.7",s="10.5",t="95",y="10.2",K="Android",J="98",I="2000",P="10.6",O="10.0",F="10.4",M="";qx.Bootstrap.define(S,{statics:{getName:function(){if(!navigator){return M;}
;var bh=navigator.platform||M;var bi=navigator.userAgent||M;if(bh.indexOf(q)!=-1||bh.indexOf(x)!=-1||bh.indexOf(ba)!=-1){return k;}
else if(bh.indexOf(W)!=-1||bh.indexOf(bd)!=-1||bh.indexOf(C)!=-1||bh.indexOf(v)!=-1){return V;}
else if(bi.indexOf(T)!=-1){return j;}
else if(bi.indexOf(U)!=-1){return E;}
else if(bh.indexOf(bc)!=-1||bh.indexOf(e)!=-1||bh.indexOf(D)!=-1){return r;}
else if(bi.indexOf(K)!=-1){return d;}
else if(bh.indexOf(l)!=-1){return Y;}
else if(bh.indexOf(B)!=-1||bh.indexOf(u)!=-1||bh.indexOf(i)!=-1){return c;}
else if(bh.indexOf(bg)!=-1){return G;}
else if(bh.indexOf(w)!=-1){return m;}
;;;;;;;;;return M;}
,__cW:{"Windows NT 6.2":p,"Windows NT 6.1":a,"Windows NT 6.0":o,"Windows NT 5.2":g,"Windows NT 5.1":L,"Windows NT 5.0":I,"Windows 2000":I,"Windows NT 4.0":z,"Win 9x 4.90":X,"Windows CE":b,"Windows 98":J,"Win98":J,"Windows 95":t,"Win95":t,"Mac OS X 10_7":R,"Mac OS X 10.7":R,"Mac OS X 10_6":P,"Mac OS X 10.6":P,"Mac OS X 10_5":s,"Mac OS X 10.5":s,"Mac OS X 10_4":F,"Mac OS X 10.4":F,"Mac OS X 10_3":N,"Mac OS X 10.3":N,"Mac OS X 10_2":y,"Mac OS X 10.2":y,"Mac OS X 10_1":H,"Mac OS X 10.1":H,"Mac OS X 10_0":O,"Mac OS X 10.0":O},getVersion:function(){var bj=qx.bom.client.OperatingSystem.__cX(navigator.userAgent);if(bj==null){bj=qx.bom.client.OperatingSystem.__cY(navigator.userAgent);}
;if(bj!=null){return bj;}
else {return M;}
;}
,__cX:function(bk){var bn=[];for(var bm in qx.bom.client.OperatingSystem.__cW){bn.push(bm);}
;var bo=new RegExp(n+bn.join(be).replace(/\./g,bb)+f,Q);var bl=bo.exec(bk);if(bl&&bl[1]){return qx.bom.client.OperatingSystem.__cW[bl[1]];}
;return null;}
,__cY:function(bp){var bt=bp.indexOf(K)!=-1;var bq=bp.match(/(iPad|iPhone|iPod)/i)?true:false;if(bt){var bs=new RegExp(/ Android (\d+(?:\.\d+)+)/i);var bu=bs.exec(bp);if(bu&&bu[1]){return bu[1];}
;}
else if(bq){var bv=new RegExp(/(CPU|iPhone|iPod) OS (\d+)_(\d+)\s+/);var br=bv.exec(bp);if(br&&br[2]&&br[3]){return br[2]+A+br[3];}
;}
;return null;}
},defer:function(bw){qx.core.Environment.add(bf,bw.getName);qx.core.Environment.add(h,bw.getVersion);}
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
(function(){var n="qx.event.handler.Application",m="complete",l="webkit",k="gecko",j="opera",i="left",h="DOMContentLoaded",g="shutdown",f="mshtml",d="load",a="unload",c="ready",b="engine.name";qx.Class.define(n,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(o){qx.core.Object.call(this);this._window=o.getWindow();this.__da=false;this.__db=false;this.__dc=false;this.__dd=false;this._initObserver();qx.event.handler.Application.$$instance=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,onScriptLoaded:function(){var p=qx.event.handler.Application.$$instance;if(p){p.__de();}
;}
},members:{canHandleEvent:function(q,r){}
,registerEvent:function(s,t,u){}
,unregisterEvent:function(v,w,x){}
,__dc:null,__da:null,__db:null,__dd:null,__de:function(){if(!this.__dc&&this.__da&&qx.$$loader.scriptLoaded){if((qx.core.Environment.get(b)==f)){if(qx.event.Registration.hasListener(this._window,c)){this.__dc=true;qx.event.Registration.fireEvent(this._window,c);}
;}
else {this.__dc=true;qx.event.Registration.fireEvent(this._window,c);}
;}
;}
,isApplicationReady:function(){return this.__dc;}
,_initObserver:function(){if(qx.$$domReady||document.readyState==m||document.readyState==c){this.__da=true;this.__de();}
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
,_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__da=true;this.__de();}
),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__dd){this.__dd=true;try{qx.event.Registration.fireEvent(this._window,g);}
catch(e){throw e;}
finally{qx.core.ObjectRegistry.shutdown();}
;}
;}
)},destruct:function(){this._stopObserver();this._window=null;}
,defer:function(A){qx.event.Registration.addHandler(A);}
});}
)();
(function(){var d="ready",c="shutdown",b="beforeunload",a="qx.core.Init";qx.Class.define(a,{statics:{getApplication:qx.core.BaseInit.getApplication,ready:qx.core.BaseInit.ready,__cU:function(e){var f=this.getApplication();if(f){e.setReturnValue(f.close());}
;}
,__cV:function(){var g=this.getApplication();if(g){g.terminate();}
;}
},defer:function(h){qx.event.Registration.addListener(window,d,h.ready,h);qx.event.Registration.addListener(window,c,h.__cV,h);qx.event.Registration.addListener(window,b,h.__cU,h);}
});}
)();
(function(){var a="qx.application.Native";qx.Class.define(a,{extend:qx.core.Object,implement:[qx.application.IApplication],members:{main:function(){}
,finalize:function(){}
,close:function(){}
,terminate:function(){}
}});}
)();
(function(){var k="text",j="valign: ",i="bg: ",h="black",g="checked: ",f="title: ",e="style: ",d="max: ",c="classname: ",b="href: ",bi="demobrowser.demo.bom.AttributeStyle_1",bh="text: ",bg="test9",bf="fontFamily",be="class",bd="maxlength",bc="html",bb="Viewport: ",ba="title",Y="href",r="valign",s="css: ",p="color: ",q="html: ",n="top",o="colspan",l="tabindex",m="td",v="Document: ",w="top: ",E="tabindex: ",C="red",M="family: ",H="left",U="left: ",R="checked",y="style",X="colspan: ",W="name",V="readonly: ",x="backgroundColor",A="x",B="opacity: ",D="name: ",F="readonly",I="color",O="value",T="type",t="type: ",u="value: ",z="test5",L="disabled",K="test7",J="disabled: ",Q="test4",P="test1",G="test8",N="test2",a="test3",S="test6";qx.Class.define(bi,{extend:qx.application.Native,members:{main:function(){qx.application.Native.prototype.main.call(this);var bj=qx.bom.element.Attribute;var bk=qx.bom.element.Style;var bl=qx.bom.element.Opacity;this.info(P);this.debug(c+bj.get(document.getElementById(P),be));this.debug(f+bj.get(document.getElementById(P),ba));this.debug(w+bk.get(document.getElementById(P),n));this.info(N);this.debug(D+bj.get(document.getElementById(N),W));this.debug(u+bj.get(document.getElementById(N),O));this.debug(t+bj.get(document.getElementById(N),T));this.debug(d+bj.get(document.getElementById(N),bd));this.debug(U+bk.get(document.getElementById(N),H));this.info(a);this.debug(D+bj.get(document.getElementById(a),W));this.debug(u+bj.get(document.getElementById(a),O));this.debug(t+bj.get(document.getElementById(a),T));this.debug(g+bj.get(document.getElementById(a),R));this.debug(J+bj.get(document.getElementById(a),L));this.debug(E+bj.get(document.getElementById(a),l));this.info(Q);this.debug(J+bj.get(document.getElementById(Q),L));this.debug(V+bj.get(document.getElementById(Q),F));this.info(z);this.debug(J+bj.get(document.getElementById(z),L));this.debug(V+bj.get(document.getElementById(z),F));this.info(S);this.debug(b+bj.get(document.getElementById(S),Y));this.debug(e+bj.get(document.getElementById(S),y));this.debug(s+bk.getCss(document.getElementById(S)));this.debug(p+bk.get(document.getElementById(S),I));this.debug(i+bk.get(document.getElementById(S),x));this.debug(M+bk.get(document.getElementById(S),bf));this.debug(bh+bj.get(document.getElementById(S),k));this.debug(q+bj.get(document.getElementById(S),bc));this.debug(B+bl.get(document.getElementById(S)));this.info(K);this.debug(j+bj.get(document.getElementById(K),r));this.debug(X+bj.get(document.getElementById(K).getElementsByTagName(m)[0],o));this.info(G);bk.set(document.getElementById(G),I,C);bk.set(document.getElementById(G),x,h);bl.set(document.getElementById(G),0.5);this.debug(B+bl.get(document.getElementById(G)));this.info(bg);this.debug(v+qx.bom.Document.getWidth()+A+qx.bom.Document.getHeight());this.debug(bb+qx.bom.Viewport.getWidth()+A+qx.bom.Viewport.getHeight());}
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
(function(){var j="readOnly",i="accessKey",h="qx.bom.element.Attribute",g="rowSpan",f="vAlign",e="className",d="textContent",c="'",b="htmlFor",a="longDesc",A="cellSpacing",z="frameBorder",y="='",x="useMap",w="innerText",v="innerHTML",u="tabIndex",t="dateTime",s="maxLength",r="html.element.textcontent",p="mshtml",q="cellPadding",n="browser.documentmode",o="colSpan",l="engine.name",m="undefined",k="";qx.Bootstrap.define(h,{statics:{__dK:{names:{"class":e,"for":b,html:v,text:qx.core.Environment.get(r)?d:w,colspan:o,rowspan:g,valign:f,datetime:t,accesskey:i,tabindex:u,maxlength:s,readonly:j,longdesc:a,cellpadding:q,cellspacing:A,frameborder:z,usemap:x},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readOnly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},qxProperties:{$$widget:1,$$html:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:k,className:k,innerHTML:k,innerText:k,textContent:k,htmlFor:k,tabIndex:0,maxLength:qx.core.Environment.select(l,{"mshtml":2147483647,"webkit":524288,"default":-1})},removeableProperties:{disabled:1,multiple:1,maxLength:1},original:{href:1,src:1,type:1}},compile:function(B){var C=[];var E=this.__dK.runtime;for(var D in B){if(!E[D]){C.push(D,y,B[D],c);}
;}
;return C.join(k);}
,get:function(F,name){var H=this.__dK;var G;name=H.names[name]||name;if(qx.core.Environment.get(l)==p&&parseInt(qx.core.Environment.get(n),10)<8&&H.original[name]){G=F.getAttribute(name,2);}
else if(H.property[name]){G=F[name];if(typeof H.propertyDefault[name]!==m&&G==H.propertyDefault[name]){if(typeof H.bools[name]===m){return null;}
else {return G;}
;}
;}
else {G=F.getAttribute(name);}
;if(H.bools[name]){return !!G;}
;return G;}
,set:function(I,name,J){if(typeof J===m){return;}
;var K=this.__dK;name=K.names[name]||name;if(K.bools[name]){J=!!J;}
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
(function(){var j="CSS1Compat",i="android",h="operamini",g="gecko",f="browser.quirksmode",e="browser.name",d="mobile chrome",c="iemobile",b="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Namoroka|Firefox",a="opera mobi",H="Mobile Safari",G="Maple",F="operamobile",E="ie",D="mobile safari",C="IEMobile|Maxthon|MSIE",B="qx.bom.client.Browser",A="(Maple )([0-9]+\.[0-9]+\.[0-9]*)",z="opera mini",y="browser.version",q="opera",r="Opera Mini|Opera Mobi|Opera",o="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|Mobile Safari|Safari",p="webkit",m="browser.documentmode",n="5.0",k="Mobile/",l="msie",s="maple",t=")(/| )([0-9]+\.[0-9])",v="(",u="ce",x="",w="mshtml";qx.Bootstrap.define(B,{statics:{getName:function(){var L=navigator.userAgent;var K=new RegExp(v+qx.bom.client.Browser.__dL+t);var J=L.match(K);if(!J){return x;}
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
,getVersion:function(){var P=navigator.userAgent;var O=new RegExp(v+qx.bom.client.Browser.__dL+t);var N=P.match(O);if(!N){return x;}
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
,__dL:{"webkit":o,"gecko":b,"mshtml":C,"opera":r}[qx.bom.client.Engine.getName()]},defer:function(Q){qx.core.Environment.add(e,Q.getName),qx.core.Environment.add(y,Q.getVersion),qx.core.Environment.add(m,Q.getDocumentMode),qx.core.Environment.add(f,Q.getQuirksMode);}
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
(function(){var k="This client does not support the boxSizing value",j="border-box",i="qx.bom.element.BoxSizing",h="boxSizing",g="content-box",f=":",e=";",d="",c="This client does not support dynamic modification of the boxSizing property.",b="qx.debug",a="css.boxsizing";qx.Bootstrap.define(i,{statics:{__jY:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__ka:function(l){var m=this.__jY;return m.tags[l.tagName.toLowerCase()]||m.types[l.type];}
,compile:function(n){if(qx.core.Environment.get(a)){var o=qx.lang.String.hyphenate(qx.core.Environment.get(a));return o+f+n+e;}
else {if(qx.core.Environment.get(b)){qx.log.Logger.warn(this,c);qx.log.Logger.trace();}
;}
;}
,get:function(p){if(qx.core.Environment.get(a)){return qx.bom.element.Style.get(p,h,null,false)||d;}
;if(qx.bom.Document.isStandardMode(qx.dom.Node.getWindow(p))){if(!this.__ka(p)){return g;}
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
(function(){var n="css.float",m="css.borderimage.standardsyntax",l="borderRadius",k="boxSizing",j="stretch",h='m11',g="content",f="css.inlineblock",e="css.gradient.filter",d="css.appearance",bs="css.opacity",br="css.gradient.radial",bq="input",bp="userSelect",bo="css.overflowxy",bn="styleFloat",bm="css.textShadow.filter",bl="css.usermodify",bk="css.boxsizing",bj='url("foo.png") 4 4 4 4 fill stretch',u="css.boxmodel",v="qx.bom.client.Css",s="appearance",t="placeholder",q="css.textShadow",r="DXImageTransform.Microsoft.Shadow",o="css.boxshadow",p="css.gradient.legacywebkit",C="css.borderradius",D="linear-gradient(0deg, #fff, #000)",O="textShadow",L="css.borderimage",W="rgba(1, 2, 3, 0.5)",R="color=#666666,direction=45",bf="radial-gradient(0px 0px, cover, red 50%, blue 100%)",bc="rgba",H="(",bi='url("foo.png") 4 4 4 4 stretch',bh="css.gradient.linear",bg="DXImageTransform.Microsoft.Gradient",G="css.userselect",J="-webkit-gradient(linear,0% 0%,100% 100%,from(white), to(red))",K="mshtml",N="css.rgba",P=");",S="4 fill",Y='WebKitCSSMatrix',be="red 1px 1px 3px",w="none",x="startColorStr=#550000FF, endColorStr=#55FFFF00",I="progid:",V="css.placeholder",U="css.userselect.none",T="css.textoverflow",bb="textOverflow",ba="userModify",Q="boxShadow",X="cssFloat",a="border",bd="color",y="borderImage",z="foo.png",M="span",b="string",c="-moz-none",F="backgroundImage",A="inline-block",B="-moz-inline-box",E="div";qx.Bootstrap.define(v,{statics:{__fp:null,getBoxModel:function(){var content=qx.bom.client.Engine.getName()!==K||!qx.bom.client.Browser.getQuirksMode();return content?g:a;}
,getTextOverflow:function(){return qx.bom.Style.getPropertyName(bb);}
,getPlaceholder:function(){var i=document.createElement(bq);return t in i;}
,getAppearance:function(){return qx.bom.Style.getPropertyName(s);}
,getBorderRadius:function(){return qx.bom.Style.getPropertyName(l);}
,getBoxShadow:function(){return qx.bom.Style.getPropertyName(Q);}
,getBorderImage:function(){return qx.bom.Style.getPropertyName(y);}
,getBorderImageSyntax:function(){var bu=qx.bom.client.Css.getBorderImage();if(!bu){return null;}
;var bt=document.createElement(E);if(bu===y){bt.style[bu]=bj;if(bt.style.borderImageSource.indexOf(z)>=0&&bt.style.borderImageSlice.indexOf(S)>=0&&bt.style.borderImageRepeat.indexOf(j)>=0){return true;}
;}
else {bt.style[bu]=bi;if(bt.style[bu].indexOf(z)>=0){return false;}
;}
;return null;}
,getUserSelect:function(){return qx.bom.Style.getPropertyName(bp);}
,getUserSelectNone:function(){var bw=qx.bom.client.Css.getUserSelect();if(bw){var bv=document.createElement(M);bv.style[bw]=c;return bv.style[bw]===c?c:w;}
;return null;}
,getUserModify:function(){return qx.bom.Style.getPropertyName(ba);}
,getFloat:function(){var bx=document.documentElement.style;return bx.cssFloat!==undefined?X:bx.styleFloat!==undefined?bn:null;}
,getTranslate3d:function(){return Y in window&&h in new WebKitCSSMatrix();}
,getLinearGradient:function(){qx.bom.client.Css.__fp=false;var bB=D;var by=document.createElement(E);var bz=qx.bom.Style.getAppliedStyle(by,F,bB);if(!bz){bB=J;var bz=qx.bom.Style.getAppliedStyle(by,F,bB,false);if(bz){qx.bom.client.Css.__fp=true;}
;}
;if(!bz){return null;}
;var bA=/(.*?)\(/.exec(bz);return bA?bA[1]:null;}
,getFilterGradient:function(){return qx.bom.client.Css.__fq(bg,x);}
,getRadialGradient:function(){var bF=bf;var bC=document.createElement(E);var bD=qx.bom.Style.getAppliedStyle(bC,F,bF);if(!bD){return null;}
;var bE=/(.*?)\(/.exec(bD);return bE?bE[1]:null;}
,getLegacyWebkitGradient:function(){if(qx.bom.client.Css.__fp===null){qx.bom.client.Css.getLinearGradient();}
;return qx.bom.client.Css.__fp;}
,getRgba:function(){var bG;try{bG=document.createElement(E);}
catch(bH){bG=document.createElement();}
;try{bG.style[bd]=W;if(bG.style[bd].indexOf(bc)!=-1){return true;}
;}
catch(bI){}
;return false;}
,getBoxSizing:function(){return qx.bom.Style.getPropertyName(k);}
,getInlineBlock:function(){var bJ=document.createElement(M);bJ.style.display=A;if(bJ.style.display==A){return A;}
;bJ.style.display=B;if(bJ.style.display!==B){return B;}
;return null;}
,getOpacity:function(){return (typeof document.documentElement.style.opacity==b);}
,getOverflowXY:function(){return (typeof document.documentElement.style.overflowX==b)&&(typeof document.documentElement.style.overflowY==b);}
,getTextShadow:function(){var bM=be;var bK=document.createElement(E);var bL=qx.bom.Style.getAppliedStyle(bK,O,bM);return !bL;}
,getFilterTextShadow:function(){return qx.bom.client.Css.__fq(r,R);}
,__fq:function(bN,bO){var bQ=false;var bR=I+bN+H+bO+P;var bP=document.createElement(E);document.body.appendChild(bP);bP.style.filter=bR;if(bP.filters&&bP.filters.length>0&&bP.filters.item(bN).enabled==true){bQ=true;}
;document.body.removeChild(bP);return bQ;}
},defer:function(bS){qx.core.Environment.add(T,bS.getTextOverflow);qx.core.Environment.add(V,bS.getPlaceholder);qx.core.Environment.add(C,bS.getBorderRadius);qx.core.Environment.add(o,bS.getBoxShadow);qx.core.Environment.add(bh,bS.getLinearGradient);qx.core.Environment.add(e,bS.getFilterGradient);qx.core.Environment.add(br,bS.getRadialGradient);qx.core.Environment.add(p,bS.getLegacyWebkitGradient);qx.core.Environment.add(u,bS.getBoxModel);qx.core.Environment.add(N,bS.getRgba);qx.core.Environment.add(L,bS.getBorderImage);qx.core.Environment.add(m,bS.getBorderImageSyntax);qx.core.Environment.add(bl,bS.getUserModify);qx.core.Environment.add(G,bS.getUserSelect);qx.core.Environment.add(U,bS.getUserSelectNone);qx.core.Environment.add(d,bS.getAppearance);qx.core.Environment.add(n,bS.getFloat);qx.core.Environment.add(bk,bS.getBoxSizing);qx.core.Environment.add(f,bS.getInlineBlock);qx.core.Environment.add(bs,bS.getOpacity);qx.core.Environment.add(bo,bS.getOverflowXY);qx.core.Environment.add(q,bS.getTextShadow);qx.core.Environment.add(bm,bS.getFilterTextShadow);}
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
,toUriParameter:function(X,Y){var bc,ba=[];for(bc in X){if(X.hasOwnProperty(bc)){var bb=X[bc];if(bb instanceof Array){for(var i=0;i<bb.length;i++){this.__dD(bc,bb[i],ba,Y);}
;}
else {this.__dD(bc,bb,ba,Y);}
;}
;}
;return ba.join(r);}
,__dD:function(bd,be,bf,bg){var bh=window.encodeURIComponent;if(bg){bf.push(bh(bd).replace(/%20/g,f)+b+bh(be).replace(/%20/g,f));}
else {bf.push(bh(bd)+b+bh(be));}
;}
}});}
)();
(function(){var k="borderLeftStyle",j="borderRightStyle",i="div",h="borderRightWidth",g="overflow-y",f="borderLeftWidth",e="-moz-scrollbars-vertical",d=":",b="100px",a="overflow:",B="qx.bom.element.Overflow",A="overflow-x",z="overflowX",y=";",x="overflowY",w="engine.version",v="none",u="scroll",r="gecko",q="overflow",o="",p="engine.name",m="-moz-scrollbars-none",n="hidden",l="css.overflowxy";qx.Bootstrap.define(B,{statics:{DEFAULT_SCROLLBAR_WIDTH:14,__gs:null,getScrollbarWidth:function(){if(this.__gs!==null){return this.__gs;}
;var C=qx.bom.element.Style;var E=function(I,J){return parseInt(C.get(I,J),10)||0;}
;var F=function(K){return (C.get(K,j)==v?0:E(K,h));}
;var D=function(L){return (C.get(L,k)==v?0:E(L,f));}
;var H=qx.core.Environment.select(p,{"mshtml":function(M){if(C.get(M,x)==n||M.clientWidth==0){return F(M);}
;return Math.max(0,M.offsetWidth-M.clientLeft-M.clientWidth);}
,"default":function(N){if(N.clientWidth==0){var O=C.get(N,q);var P=(O==u||O==e?16:0);return Math.max(0,F(N)+P);}
;return Math.max(0,(N.offsetWidth-N.clientWidth-D(N)));}
});var G=function(Q){return H(Q)-F(Q);}
;var t=document.createElement(i);var s=t.style;s.height=s.width=b;s.overflow=u;document.body.appendChild(t);var c=G(t);this.__gs=c;document.body.removeChild(t);return this.__gs;}
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
(function(){var j="css.float",i="px",h="Cascaded styles are not supported in this browser!",g="css.appearance",f="pixelRight",e="css.userselect",d="css.boxsizing",c="css.textoverflow",b="pixelHeight",a=":",E="pixelTop",D="css.borderimage",C="Invalid argument 'name'",B="pixelLeft",A="css.usermodify",z="qx.bom.element.Style",y=". Only pixel values work well across different clients.",x="pixelBottom",w="Invalid argument 'styles'",v="pixelWidth",q="Untranslated computed property value: ",r=";",o="float",p="qx.debug",m="browser.documentmode",n="mshtml",k="Invalid argument 'smart'",l="Invalid argument 'element'",s="style",t="engine.name",u="";qx.Bootstrap.define(z,{statics:{__ii:function(){var G={"appearance":qx.core.Environment.get(g),"userSelect":qx.core.Environment.get(e),"textOverflow":qx.core.Environment.get(c),"borderImage":qx.core.Environment.get(D),"float":qx.core.Environment.get(j),"userModify":qx.core.Environment.get(A),"boxSizing":qx.core.Environment.get(d)};this.__ij={};for(var F in qx.lang.Object.clone(G)){if(!G[F]){delete G[F];}
else {this.__ij[F]=F==o?o:qx.lang.String.hyphenate(G[F]);}
;}
;this.__ik=G;}
,__il:function(name){var H=qx.bom.Style.getPropertyName(name);if(H){this.__ik[name]=H;}
;return H;}
,__im:{width:v,height:b,left:B,right:f,top:E,bottom:x},__in:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}},compile:function(I){var K=[];var L=this.__in;var M=this.__ij;var name,J;for(name in I){J=I[name];if(J==null){continue;}
;name=this.__ik[name]||this.__il(name)||name;if(L[name]){K.push(L[name].compile(J));}
else {if(!M[name]){M[name]=qx.lang.String.hyphenate(name);}
;K.push(M[name],a,J,r);}
;}
;return K.join(u);}
,setCss:function(N,O){if(qx.core.Environment.get(t)===n&&parseInt(qx.core.Environment.get(m),10)<8){N.style.cssText=O;}
else {N.setAttribute(s,O);}
;}
,getCss:function(P){if(qx.core.Environment.get(t)===n&&parseInt(qx.core.Environment.get(m),10)<8){return P.style.cssText.toLowerCase();}
else {return P.getAttribute(s);}
;}
,isPropertySupported:function(Q){return (this.__in[Q]||this.__ik[Q]||Q in document.documentElement.style);}
,COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(R,name,S,T){if(qx.core.Environment.get(p)){qx.core.Assert.assertElement(R,l);qx.core.Assert.assertString(name,C);if(T!==undefined){qx.core.Assert.assertBoolean(T,k);}
;}
;name=this.__ik[name]||this.__il(name)||name;if(T!==false&&this.__in[name]){return this.__in[name].set(R,S);}
else {R.style[name]=S!==null?S:u;}
;}
,setStyles:function(U,V,W){if(qx.core.Environment.get(p)){qx.core.Assert.assertElement(U,l);qx.core.Assert.assertMap(V,w);if(W!==undefined){qx.core.Assert.assertBoolean(W,k);}
;}
;var ba=this.__ik;var bc=this.__in;var X=U.style;for(var bb in V){var Y=V[bb];var name=ba[bb]||this.__il(bb)||bb;if(Y===undefined){if(W!==false&&bc[name]){bc[name].reset(U);}
else {X[name]=u;}
;}
else {if(W!==false&&bc[name]){bc[name].set(U,Y);}
else {X[name]=Y!==null?Y:u;}
;}
;}
;}
,reset:function(bd,name,be){name=this.__ik[name]||this.__il(name)||name;if(be!==false&&this.__in[name]){return this.__in[name].reset(bd);}
else {bd.style[name]=u;}
;}
,get:qx.core.Environment.select(t,{"mshtml":function(bf,name,bg,bh){name=this.__ik[name]||this.__il(name)||name;if(bh!==false&&this.__in[name]){return this.__in[name].get(bf,bg);}
;if(!bf.currentStyle){return bf.style[name]||u;}
;switch(bg){case this.LOCAL_MODE:return bf.style[name]||u;case this.CASCADED_MODE:return bf.currentStyle[name]||u;default:var bl=bf.currentStyle[name]||u;if(/^-?[\.\d]+(px)?$/i.test(bl)){return bl;}
;var bk=this.__im[name];if(bk){var bi=bf.style[name];bf.style[name]=bl||0;var bj=bf.style[bk]+i;bf.style[name]=bi;return bj;}
;if(/^-?[\.\d]+(em|pt|%)?$/i.test(bl)){throw new Error(q+name+y);}
;return bl;};}
,"default":function(bm,name,bn,bo){name=this.__ik[name]||this.__il(name)||name;if(bo!==false&&this.__in[name]){return this.__in[name].get(bm,bn);}
;switch(bn){case this.LOCAL_MODE:return bm.style[name]||u;case this.CASCADED_MODE:if(bm.currentStyle){return bm.currentStyle[name]||u;}
;throw new Error(h);default:var bp=qx.dom.Node.getDocument(bm);var bq=bp.defaultView.getComputedStyle(bm,null);return bq?bq[name]:u;};}
})},defer:function(br){br.__ii();}
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
,__hn:function(k){var l=this.getWidth(k)>this.getHeight(k)?90:0;var m=k.orientation;if(m==null||Math.abs(m%180)==l){return {"-270":90,"-180":180,"-90":-90,"0":0,"90":90,"180":180,"270":-90};}
else {return {"-270":180,"-180":-90,"-90":0,"0":90,"90":180,"180":-90,"270":0};}
;}
,__ho:null,getOrientation:function(n){var n=n||window.top;var o=n.orientation;if(o==null){o=this.getWidth(n)>this.getHeight(n)?90:0;}
else {if(this.__ho==null){this.__ho=this.__hn(n);}
;o=this.__ho[o];}
;return o;}
,isLandscape:function(p){return this.getWidth(p)>=this.getHeight(p);}
,isPortrait:function(q){return this.getWidth(q)<this.getHeight(q);}
}});}
)();
(function(){var m='Invalid include in theme "',k='The configuration key "',j="Mixin theme is not a valid theme!",h='" is not allowed!',g="You can only define one theme category per file! Invalid theme: ",f="other",e="Found base flag in entry '",d='Invalid patch in theme "',c="[Theme ",b="' of theme '",U='" is invalid: ',T='Invalid extend in theme "',S='Invalid type of key "',R='The key "',Q='"!',P="]",O='"! The value needs to be a map!',N='"! The type of the key must be "',M='The type of the key "',L="qx.Theme",t='The content of a meta theme must reference to other themes. The value for "',u='" inside the meta block is wrong.',r='"! The value is undefined/null!',s='" is not allowed inside a meta theme block.',p="'. Base flags are not allowed for themes without a valid super theme!",q="'!",n="fonts",o="appearances",v="icons",w="string",D="decorations",B="widgets",F="borders",E="' are not compatible '",H="The mixins '",G="colors",y='Invalid key "',K="meta",J='": ',I="undefined",x='" in theme "',z="Theme",A="qx.debug",C="object";qx.Bootstrap.define(L,{statics:{define:function(name,V){if(!V){var V={};}
;V.include=this.__oK(V.include);V.patch=this.__oK(V.patch);if(qx.core.Environment.get(A)){this.__d(name,V);}
;var W={$$type:z,name:name,title:V.title,toString:this.genericToString};if(V.extend){W.supertheme=V.extend;}
;W.basename=qx.Bootstrap.createNamespace(name,W);this.__oN(W,V);this.__oL(W,V);this.$$registry[name]=W;for(var i=0,a=V.include,l=a.length;i<l;i++){this.include(W,a[i]);}
;for(var i=0,a=V.patch,l=a.length;i<l;i++){this.patch(W,a[i]);}
;}
,__oK:function(X){if(!X){return [];}
;if(qx.Bootstrap.isArray(X)){return X;}
else {return [X];}
;}
,__oL:function(Y,ba){var bb=ba.aliases||{};if(ba.extend&&ba.extend.aliases){qx.Bootstrap.objectMergeWith(bb,ba.extend.aliases,false);}
;Y.aliases=bb;}
,getAll:function(){return this.$$registry;}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,genericToString:function(){return c+this.name+P;}
,__oM:function(bc){for(var i=0,bd=this.__oO,l=bd.length;i<l;i++){if(bc[bd[i]]){return bd[i];}
;}
;}
,__oN:function(be,bf){var bi=this.__oM(bf);if(bf.extend&&!bi){bi=bf.extend.type;}
;be.type=bi||f;var bk=function(){}
;if(bf.extend){bk.prototype=new bf.extend.$$clazz;}
;var bj=bk.prototype;var bh=bf[bi];for(var bg in bh){bj[bg]=bh[bg];if(bj[bg].base){if(qx.core.Environment.get(A)){if(!bf.extend){throw new Error(e+bg+b+bf.name+p);}
;}
;bj[bg].base=bf.extend;}
;}
;be.$$clazz=bk;be[bi]=new bk;}
,$$registry:{},__oO:[G,F,D,n,v,B,o,K],__c:qx.core.Environment.select(A,{"true":{"title":w,"aliases":C,"type":w,"extend":C,"colors":C,"borders":C,"decorations":C,"fonts":C,"icons":C,"widgets":C,"appearances":C,"meta":C,"include":C,"patch":C},"default":null}),__oP:qx.core.Environment.select(A,{"true":{"color":C,"border":C,"decoration":C,"font":C,"icon":C,"appearance":C,"widget":C},"default":null}),__d:qx.core.Environment.select(A,{"true":function(name,bl){var bq=this.__c;for(var bp in bl){if(bq[bp]===undefined){throw new Error(k+bp+x+name+h);}
;if(bl[bp]==null){throw new Error(y+bp+x+name+r);}
;if(bq[bp]!==null&&typeof bl[bp]!==bq[bp]){throw new Error(S+bp+x+name+N+bq[bp]+Q);}
;}
;var bo=[G,F,D,n,v,B,o,K];for(var i=0,l=bo.length;i<l;i++){var bp=bo[i];if(bl[bp]!==undefined&&(bl[bp] instanceof Array||bl[bp] instanceof RegExp||bl[bp] instanceof Date||bl[bp].classname!==undefined)){throw new Error(y+bp+x+name+O);}
;}
;var bm=0;for(var i=0,l=bo.length;i<l;i++){var bp=bo[i];if(bl[bp]){bm++;}
;if(bm>1){throw new Error(g+name);}
;}
;if(bl.meta){var bn;for(var bp in bl.meta){bn=bl.meta[bp];if(this.__oP[bp]===undefined){throw new Error(R+bp+s);}
;if(typeof bn!==this.__oP[bp]){throw new Error(M+bp+u);}
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
}),patch:function(br,bs){this.__oQ(bs);var bu=this.__oM(bs);if(bu!==this.__oM(br)){throw new Error(H+br.name+E+bs.name+q);}
;var bt=bs[bu];var bv=br.$$clazz.prototype;for(var bw in bt){bv[bw]=bt[bw];}
;}
,include:function(bx,by){this.__oQ(by);var bA=by.type;if(bA!==bx.type){throw new Error(H+bx.name+E+by.name+q);}
;var bz=by[bA];var bB=bx.$$clazz.prototype;for(var bC in bz){if(bB[bC]!==undefined){continue;}
;bB[bC]=bz[bC];}
;}
,__oQ:function(bD){if(typeof bD===I||bD==null){var bE=new Error(j);if(qx.core.Environment.get(A)){var bF=qx.dev.StackTrace.getStackTraceFromError(bE);qx.Bootstrap.error(this,bF);}
;throw bE;}
;}
}});}
)();
(function(){var eq="button-checked",ep="decoration/window/maximize-active-hovered.png",eo="keyboard-focus",en="menu-css",em="decoration/cursors/",el="slidebar",ek="tooltip-error-arrow",ej="table-scroller-focus-indicator",ei="popup-css",eh="move-frame",cC="nodrop",cB="decoration/table/boolean-true.png",cA="-invalid-css",cz="menu",cy="app-header",cx="row-layer",cw="text-inactive",cv="move",cu="decoration/window/restore-active-hovered.png",ct="shadow-window",ex="tree-folder",ey="window-pane-css",ev="right.png",ew="checkbox-undetermined-hovered",et="window-incl-statusbar-css",eu="tabview-page-button-bottom-inactive",er="tooltip-error",es="window-css",ez="window-statusbar",eA="button-hovered",dI="decoration/scrollbar/scrollbar-",dH="background-tip",dK="menubar-css",dJ="scrollbar-slider-horizontal-disabled",dM="radiobutton-disabled",dL="window-resize-frame-css",dO="button-pressed",dN="table-pane",dF="decoration/window/close-active.png",dE="native",v="button-invalid-shadow",w="decoration/window/minimize-active-hovered.png",x="menubar",y="icon/16/actions/dialog-cancel.png",z="tabview-page-button-top-inactive",A="tabview-page-button-left-inactive",B="menu-slidebar",C="toolbar-button-checked",D="-left",E="decoration/tree/open-selected.png",eS="decoration/window/minimize-inactive.png",eR="icon/16/apps/office-calendar.png",eQ="group-item-css",eP="group",eW="tabview-page-button-right-inactive",eV="decoration/window/minimize-active.png",eU="decoration/window/restore-inactive.png",eT="checkbox-checked-focused",eY="splitpane",eX="combobox/textfield",bz="decoration/window/close-active-hovered.png",bA="qx/icon/Tango/16/actions/window-close.png",bx="checkbox-pressed",by="button-disabled",bD="selected-dragover",bE="border-separator",bB="decoration/window/maximize-inactive.png",bC="dragover",bv="scrollarea",bw="scrollbar-vertical",bb="decoration/menu/checkbox-invert.gif",ba="decoration/toolbar/toolbar-handle-knob.gif",bd="icon/22/mimetypes/office-document.png",bc="table-header-cell",W="button-checked-focused",V="up.png",Y="best-fit",X="pane-css",U="decoration/tree/closed-selected.png",T="tooltip-error-arrow-left",bK="qx.theme.modern.Appearance",bL="text-active",bM="checkbox-disabled",bN="toolbar-button-hovered",bG="window-resize-frame-incl-statusbar-css",bH="decoration/form/checked.png",bI="progressive-table-header",bJ="decoration/table/select-column-order.png",bO="decoration/menu/radiobutton.gif",bP="decoration/arrows/forward.png",bo="decoration/table/descending.png",bn="decoration/form/undetermined.png",bm="tree-file",bl="window-captionbar-active",bk="checkbox-checked-hovered",bj="scrollbar-slider-vertical",bi="toolbar",bh="alias",bs="decoration/window/restore-active.png",br="decoration/table/boolean-false.png",bQ="icon/32/mimetypes/office-document.png",bR="text-gray",bS="mshtml",bT="tabview-pane",bU="decoration/arrows/rewind.png",bV="top",bW="icon/16/actions/dialog-ok.png",bX="progressbar-background",bY="engine.name",ca="table-header-cell-hovered",cK="window-statusbar-css",cJ="window",cI="browser.documentmode",cH="decoration/menu/radiobutton-invert.gif",cO="text-placeholder",cN="slider",cM="toolbar-css",cL="keep-align",cS="down.png",cR="groupitem-text",ds="tabview-page-button-top-active",dt="icon/22/places/folder.png",dq="decoration/window/maximize-active.png",dr="checkbox-checked-pressed",dn="decoration/window/close-inactive.png",dp="tabview-page-button-left-active",dl="toolbar-part",dm="decoration/splitpane/knob-vertical.png",dA=".gif",dB="table-statusbar",dT="progressive-table-header-cell-css",dS="window-captionbar-inactive",dV="copy",dU="decoration/arrows/down-invert.png",dX="decoration/menu/checkbox.gif",dW="window-caption-active-text",ea="decoration/splitpane/knob-horizontal.png",dY="group-css",dQ="icon/32/places/folder.png",dP="toolbar-separator",eH="tabview-page-button-bottom-active",eI="decoration/arrows/up-small.png",eJ="decoration/table/ascending.png",eK="decoration/arrows/up-invert.png",eD="small",eE="tabview-page-button-right-active",eF="-disabled",eG="scrollbar-horizontal",eB="progressbar",eC="checkbox-undetermined-focused",k="progressive-table-header-cell",j="menu-separator",i="tabview-pane-css",h="pane",g="htmlarea-background",f="decoration/arrows/right-invert.png",e="left.png",d="icon/16/actions/view-refresh.png",c="radiobutton-hovered",b="group-item",J="scrollbar/button",K="right",H="combobox/button",I="virtual-list",N="icon/16/places/folder.png",O="radiobutton-checked-focused",L="text-label",M="decoration/tree/closed.png",Q="table-scroller-header",R="scrollbar-slider-horizontal",cW="checkbox-hovered",cQ="checkbox-checked",de="decoration/arrows/left.png",da="radiobutton-checked",cF="button-focused",cD="text-light",bf="menu-slidebar-button",cG="tree",bq="checkbox-undetermined",bp="table-scroller-header-css",ck="text-input",cl="slidebar/button-forward",cm="background-splitpane",cn="text-hovered",co=".png",cp="decoration/tree/open.png",cq="default",cr="decoration/arrows/down-small.png",ch="datechooser",ci="slidebar/button-backward",cE="radiobutton-checked-disabled",dd="checkbox-focused",dc="radiobutton-checked-hovered",db="treevirtual-folder",di="shadow-popup",dh="icon/16/mimetypes/office-document.png",dg="background-medium",df="icon/32/places/folder-open.png",cY="icon/22/places/folder-open.png",cX="table",P="decoration/arrows/up.png",bu="decoration/form/",bt="radiobutton-focused",cP="decoration/arrows/right.png",bF="background-application",cV="invalid",cU="right-top",cT="selectbox",be="text-title",dk="icon/16/places/folder-open.png",S="radiobutton",bg="list",cb="tree-item",cc="combobox",cd="treevirtual-contract",ce="scrollbar",cf="datechooser/nav-button",cg="center",dD="checkbox",cj="treevirtual-expand",ec="",eb="textfield",ee="-invalid",ed="tooltip",eg="qx/static/blank.gif",ef="border-invalid",cs="input",dR="input-disabled",dj="menu-button",dG="input-focused-invalid",F="toolbar-button",G="spinner",dy="input-focused",dz="decoration/arrows/down.png",dw="popup",dx="cell",du="image",dv="middle",a="selected",dC="background-light",s="bold",r="text-disabled",q="groupbox",p="text-selected",o="label",n="button",m="main",l="css.boxshadow",u="css.borderradius",t="button-frame",eL="atom",eM="-css",eN="widget",eO="css.gradient.linear";qx.Theme.define(bK,{appearances:{"widget":{},"root":{style:function(fa){return {backgroundColor:bF,textColor:L,font:cq};}
},"label":{style:function(fb){return {textColor:fb.disabled?r:undefined};}
},"move-frame":{style:function(fc){return {decorator:m};}
},"resize-frame":eh,"dragdrop-cursor":{style:function(fd){var fe=cC;if(fd.copy){fe=dV;}
else if(fd.move){fe=cv;}
else if(fd.alias){fe=bh;}
;;return {source:em+fe+dA,position:cU,offset:[2,16,2,6]};}
},"image":{style:function(ff){return {opacity:!ff.replacement&&ff.disabled?0.3:1};}
},"atom":{},"atom/label":o,"atom/icon":du,"popup":{style:function(fg){var fh=qx.core.Environment.get(l);return {decorator:fh?ei:m,backgroundColor:dC,shadow:fh?undefined:di};}
},"button-frame":{alias:eL,style:function(fi){var fm,fl;var fj=[3,9];if(fi.checked&&fi.focused&&!fi.inner){fm=W;fl=undefined;fj=[1,7];}
else if(fi.disabled){fm=by;fl=undefined;}
else if(fi.pressed){fm=dO;fl=cn;}
else if(fi.checked){fm=eq;fl=undefined;}
else if(fi.hovered){fm=eA;fl=cn;}
else if(fi.focused&&!fi.inner){fm=cF;fl=undefined;fj=[1,7];}
else {fm=n;fl=undefined;}
;;;;;var fk;if(qx.core.Environment.get(u)&&qx.core.Environment.get(eO)){if(fi.invalid&&!fi.disabled){fm+=cA;}
else {fm+=eM;}
;}
else {fk=fi.invalid&&!fi.disabled?v:undefined;fj=[2,8];}
;return {decorator:fm,textColor:fl,shadow:fk,padding:fj,margin:[1,0]};}
},"button-frame/image":{style:function(fn){return {opacity:!fn.replacement&&fn.disabled?0.5:1};}
},"button":{alias:t,include:t,style:function(fo){return {center:true};}
},"hover-button":{alias:eL,include:eL,style:function(fp){var fq=fp.hovered?a:undefined;if(fq&&qx.core.Environment.get(eO)){fq+=eM;}
;return {decorator:fq,textColor:fp.hovered?p:undefined};}
},"splitbutton":{},"splitbutton/button":n,"splitbutton/arrow":{alias:n,include:n,style:function(fr,fs){return {icon:dz,padding:[fs.padding[0],fs.padding[1]-6],marginLeft:1};}
},"form-renderer-label":{include:o,style:function(){return {paddingTop:4};}
},"checkbox":{alias:eL,style:function(ft){var fu=qx.core.Environment.get(eO)&&qx.core.Environment.get(l);var fw;if(fu){if(ft.checked){fw=bH;}
else if(ft.undetermined){fw=bn;}
else {fw=eg;}
;}
else {if(ft.checked){if(ft.disabled){fw=cQ;}
else if(ft.focused){fw=eT;}
else if(ft.pressed){fw=dr;}
else if(ft.hovered){fw=bk;}
else {fw=cQ;}
;;;}
else if(ft.undetermined){if(ft.disabled){fw=bq;}
else if(ft.focused){fw=eC;}
else if(ft.hovered){fw=ew;}
else {fw=bq;}
;;}
else if(!ft.disabled){if(ft.focused){fw=dd;}
else if(ft.pressed){fw=bx;}
else if(ft.hovered){fw=cW;}
;;}
;;fw=fw||dD;var fv=ft.invalid&&!ft.disabled?ee:ec;fw=bu+fw+fv+co;}
;return {icon:fw,minWidth:fu?14:undefined,gap:fu?8:6};}
},"checkbox/icon":{style:function(fx){var fz=qx.core.Environment.get(eO)&&qx.core.Environment.get(l);if(!fz){return {opacity:!fx.replacement&&fx.disabled?0.3:1};}
;var fA;if(fx.disabled){fA=bM;}
else if(fx.focused){fA=dd;}
else if(fx.hovered){fA=cW;}
else {fA=dD;}
;;fA+=fx.invalid&&!fx.disabled?ee:ec;var fy;if(fx.undetermined){fy=[2,0];}
;return {decorator:fA,padding:fy,width:12,height:10};}
},"radiobutton":{alias:eL,style:function(fB){var fC=qx.core.Environment.get(u)&&qx.core.Environment.get(l);var fE;if(fC){fE=eg;}
else {if(fB.checked&&fB.focused){fE=O;}
else if(fB.checked&&fB.disabled){fE=cE;}
else if(fB.checked&&fB.hovered){fE=dc;}
else if(fB.checked){fE=da;}
else if(fB.focused){fE=bt;}
else if(fB.hovered){fE=c;}
else {fE=S;}
;;;;;var fD=fB.invalid&&!fB.disabled?ee:ec;fE=bu+fE+fD+co;}
;return {icon:fE,gap:fC?8:6};}
},"radiobutton/icon":{style:function(fF){var fG=qx.core.Environment.get(u)&&qx.core.Environment.get(l);if(!fG){return {opacity:!fF.replacement&&fF.disabled?0.3:1};}
;var fH;if(fF.disabled&&!fF.checked){fH=dM;}
else if(fF.checked&&fF.focused){fH=O;}
else if(fF.checked&&fF.disabled){fH=cE;}
else if(fF.checked&&fF.hovered){fH=dc;}
else if(fF.checked){fH=da;}
else if(fF.focused){fH=bt;}
else if(fF.hovered){fH=c;}
else {fH=S;}
;;;;;;fH+=fF.invalid&&!fF.disabled?ee:ec;return {decorator:fH,width:12,height:10};}
},"textfield":{style:function(fI){var fN;var fL=!!fI.focused;var fM=!!fI.invalid;var fJ=!!fI.disabled;if(fL&&fM&&!fJ){fN=dG;}
else if(fL&&!fM&&!fJ){fN=dy;}
else if(fJ){fN=dR;}
else if(!fL&&fM&&!fJ){fN=ef;}
else {fN=cs;}
;;;if(qx.core.Environment.get(eO)){fN+=eM;}
;var fK;if(fI.disabled){fK=r;}
else if(fI.showingPlaceholder){fK=cO;}
else {fK=ck;}
;return {decorator:fN,padding:[2,4,1],textColor:fK};}
},"textarea":{include:eb,style:function(fO){return {padding:4};}
},"spinner":{style:function(fP){var fT;var fR=!!fP.focused;var fS=!!fP.invalid;var fQ=!!fP.disabled;if(fR&&fS&&!fQ){fT=dG;}
else if(fR&&!fS&&!fQ){fT=dy;}
else if(fQ){fT=dR;}
else if(!fR&&fS&&!fQ){fT=ef;}
else {fT=cs;}
;;;if(qx.core.Environment.get(eO)){fT+=eM;}
;return {decorator:fT};}
},"spinner/textfield":{style:function(fU){return {marginRight:2,padding:[2,4,1],textColor:fU.disabled?r:ck};}
},"spinner/upbutton":{alias:t,include:t,style:function(fV,fW){return {icon:eI,padding:[fW.padding[0]-1,fW.padding[1]-5],shadow:undefined,margin:0};}
},"spinner/downbutton":{alias:t,include:t,style:function(fX,fY){return {icon:cr,padding:[fY.padding[0]-1,fY.padding[1]-5],shadow:undefined,margin:0};}
},"datefield":cc,"datefield/button":{alias:H,include:H,style:function(ga){return {icon:eR,padding:[0,3],decorator:undefined};}
},"datefield/textfield":eX,"datefield/list":{alias:ch,include:ch,style:function(gb){return {decorator:undefined};}
},"groupbox":{style:function(gc){return {legendPosition:bV};}
},"groupbox/legend":{alias:eL,style:function(gd){return {padding:[1,0,1,4],textColor:gd.invalid?cV:be,font:s};}
},"groupbox/frame":{style:function(ge){var gf=qx.core.Environment.get(u);return {padding:gf?10:12,margin:gf?1:undefined,decorator:gf?dY:eP};}
},"check-groupbox":q,"check-groupbox/legend":{alias:dD,include:dD,style:function(gg){return {padding:[1,0,1,4],textColor:gg.invalid?cV:be,font:s};}
},"radio-groupbox":q,"radio-groupbox/legend":{alias:S,include:S,style:function(gh){return {padding:[1,0,1,4],textColor:gh.invalid?cV:be,font:s};}
},"scrollarea":{style:function(gi){return {minWidth:50,minHeight:50};}
},"scrollarea/corner":{style:function(gj){return {backgroundColor:bF};}
},"scrollarea/pane":eN,"scrollarea/scrollbar-x":ce,"scrollarea/scrollbar-y":ce,"scrollbar":{style:function(gk){if(gk[dE]){return {};}
;var gl=qx.core.Environment.get(eO);var gm=gk.horizontal?eG:bw;if(gl){gm+=eM;}
;return {width:gk.horizontal?undefined:16,height:gk.horizontal?16:undefined,decorator:gm,padding:1};}
},"scrollbar/slider":{alias:cN,style:function(gn){return {padding:gn.horizontal?[0,1,0,1]:[1,0,1,0]};}
},"scrollbar/slider/knob":{include:t,style:function(go){var gp=qx.core.Environment.get(eO);var gq=go.horizontal?R:bj;if(go.disabled){gq+=eF;}
;if(gp){gq+=eM;}
;return {decorator:gq,minHeight:go.horizontal?undefined:9,minWidth:go.horizontal?9:undefined,padding:undefined,margin:0};}
},"scrollbar/button":{alias:t,include:t,style:function(gr){var gu=dI;if(gr.left){gu+=e;}
else if(gr.right){gu+=ev;}
else if(gr.up){gu+=V;}
else {gu+=cS;}
;;var gt=qx.core.Environment.get(eO);if(gr.left||gr.right){var gs=gr.left?3:4;return {padding:gt?[3,0,3,gs]:[2,0,2,gs],icon:gu,width:15,height:14,margin:0};}
else {return {padding:gt?3:[3,2],icon:gu,width:14,height:15,margin:0};}
;}
},"scrollbar/button-begin":J,"scrollbar/button-end":J,"slider":{style:function(gv){var gz;var gx=!!gv.focused;var gy=!!gv.invalid;var gw=!!gv.disabled;if(gx&&gy&&!gw){gz=dG;}
else if(gx&&!gy&&!gw){gz=dy;}
else if(gw){gz=dR;}
else if(!gx&&gy&&!gw){gz=ef;}
else {gz=cs;}
;;;if(qx.core.Environment.get(eO)){gz+=eM;}
;return {decorator:gz};}
},"slider/knob":{include:t,style:function(gA){return {decorator:gA.disabled?dJ:R,shadow:undefined,height:14,width:14,padding:0};}
},"list":{alias:bv,style:function(gB){var gF;var gD=!!gB.focused;var gE=!!gB.invalid;var gC=!!gB.disabled;if(gD&&gE&&!gC){gF=dG;}
else if(gD&&!gE&&!gC){gF=dy;}
else if(gC){gF=dR;}
else if(!gD&&gE&&!gC){gF=ef;}
else {gF=cs;}
;;;if(qx.core.Environment.get(eO)){gF+=eM;}
;return {backgroundColor:dC,decorator:gF};}
},"list/pane":eN,"listitem":{alias:eL,style:function(gG){var gH;if(gG.dragover){gH=gG.selected?bD:bC;}
else {gH=gG.selected?a:undefined;if(gH&&qx.core.Environment.get(eO)){gH+=eM;}
;}
;return {padding:gG.dragover?[4,4,2,4]:4,textColor:gG.selected?p:undefined,decorator:gH};}
},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:t,include:t,style:function(gI){return {padding:5,center:true,icon:gI.vertical?dz:cP};}
},"slidebar/button-backward":{alias:t,include:t,style:function(gJ){return {padding:5,center:true,icon:gJ.vertical?P:de};}
},"tabview":{style:function(gK){return {contentPadding:16};}
},"tabview/bar":{alias:el,style:function(gL){var gM=qx.core.Environment.get(u)&&qx.core.Environment.get(l)&&qx.core.Environment.get(eO);var gN={marginBottom:gL.barTop?-1:0,marginTop:gL.barBottom?gM?-4:-7:0,marginLeft:gL.barRight?gM?-3:-5:0,marginRight:gL.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};if(gL.barTop||gL.barBottom){gN.paddingLeft=5;gN.paddingRight=7;}
else {gN.paddingTop=5;gN.paddingBottom=7;}
;return gN;}
},"tabview/bar/button-forward":{include:cl,alias:cl,style:function(gO){if(gO.barTop||gO.barBottom){return {marginTop:2,marginBottom:2};}
else {return {marginLeft:2,marginRight:2};}
;}
},"tabview/bar/button-backward":{include:ci,alias:ci,style:function(gP){if(gP.barTop||gP.barBottom){return {marginTop:2,marginBottom:2};}
else {return {marginLeft:2,marginRight:2};}
;}
},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(gQ){var gR=qx.core.Environment.get(eO)&&qx.core.Environment.get(u);return {decorator:gR?i:bT,minHeight:100,marginBottom:gQ.barBottom?-1:0,marginTop:gQ.barTop?-1:0,marginLeft:gQ.barLeft?-1:0,marginRight:gQ.barRight?-1:0};}
},"tabview-page":{alias:eN,include:eN,style:function(gS){var gT=qx.core.Environment.get(eO)&&qx.core.Environment.get(u);return {padding:gT?[4,3]:undefined};}
},"tabview-page/button":{alias:eL,style:function(gU){var hc,gX=0;var hb=0,gV=0,gY=0,ha=0;var gW=qx.core.Environment.get(u)&&qx.core.Environment.get(l)&&qx.core.Environment.get(eO);if(gU.checked){if(gU.barTop){hc=ds;gX=gW?[5,11]:[6,14];gY=gU.firstTab?0:-5;ha=gU.lastTab?0:-5;}
else if(gU.barBottom){hc=eH;gX=gW?[5,11]:[6,14];gY=gU.firstTab?0:-5;ha=gU.lastTab?0:-5;hb=3;}
else if(gU.barRight){hc=eE;gX=gW?[5,10]:[6,13];hb=gU.firstTab?0:-5;gV=gU.lastTab?0:-5;gY=2;}
else {hc=dp;gX=gW?[5,10]:[6,13];hb=gU.firstTab?0:-5;gV=gU.lastTab?0:-5;}
;;}
else {if(gU.barTop){hc=z;gX=gW?[3,9]:[4,10];hb=4;gY=gU.firstTab?5:1;ha=1;}
else if(gU.barBottom){hc=eu;gX=gW?[3,9]:[4,10];gV=4;gY=gU.firstTab?5:1;ha=1;hb=3;}
else if(gU.barRight){hc=eW;gX=gW?[3,9]:[4,10];ha=5;hb=gU.firstTab?5:1;gV=1;gY=3;}
else {hc=A;gX=gW?[3,9]:[4,10];gY=5;hb=gU.firstTab?5:1;gV=1;ha=1;}
;;}
;if(hc&&gW){hc+=eM;}
;return {zIndex:gU.checked?10:5,decorator:hc,padding:gX,marginTop:hb,marginBottom:gV,marginLeft:gY,marginRight:ha,textColor:gU.disabled?r:gU.checked?bL:cw};}
},"tabview-page/button/label":{alias:o,style:function(hd){return {padding:[0,1,0,1],margin:hd.focused?0:1,decorator:hd.focused?eo:undefined};}
},"tabview-page/button/close-button":{alias:eL,style:function(he){return {icon:bA};}
},"toolbar":{style:function(hf){var hg=qx.core.Environment.get(eO);return {decorator:hg?cM:bi,spacing:2};}
},"toolbar/part":{style:function(hh){return {decorator:dl,spacing:2};}
},"toolbar/part/container":{style:function(hi){return {paddingLeft:2,paddingRight:2};}
},"toolbar/part/handle":{style:function(hj){return {source:ba,marginLeft:3,marginRight:3};}
},"toolbar-button":{alias:eL,style:function(hk){var hm;if(hk.pressed||(hk.checked&&!hk.hovered)||(hk.checked&&hk.disabled)){hm=C;}
else if(hk.hovered&&!hk.disabled){hm=bN;}
;var hl=qx.core.Environment.get(eO)&&qx.core.Environment.get(u);if(hl&&hm){hm+=eM;}
;return {marginTop:2,marginBottom:2,padding:(hk.pressed||hk.checked||hk.hovered)&&!hk.disabled||(hk.disabled&&hk.checked)?3:5,decorator:hm};}
},"toolbar-menubutton":{alias:F,include:F,style:function(hn){return {showArrow:true};}
},"toolbar-menubutton/arrow":{alias:du,include:du,style:function(ho){return {source:cr};}
},"toolbar-splitbutton":{style:function(hp){return {marginTop:2,marginBottom:2};}
},"toolbar-splitbutton/button":{alias:F,include:F,style:function(hq){return {icon:dz,marginTop:undefined,marginBottom:undefined};}
},"toolbar-splitbutton/arrow":{alias:F,include:F,style:function(hr){if(hr.pressed||hr.checked||(hr.hovered&&!hr.disabled)){var hs=1;}
else {var hs=3;}
;return {padding:hs,icon:dz,marginTop:undefined,marginBottom:undefined};}
},"toolbar-separator":{style:function(ht){return {decorator:dP,margin:7};}
},"tree":bg,"tree-item":{style:function(hu){var hv=hu.selected?a:undefined;if(hv&&qx.core.Environment.get(eO)){hv+=eM;}
;return {padding:[2,6],textColor:hu.selected?p:undefined,decorator:hv};}
},"tree-item/icon":{include:du,style:function(hw){return {paddingRight:5};}
},"tree-item/label":o,"tree-item/open":{include:du,style:function(hx){var hy;if(hx.selected&&hx.opened){hy=E;}
else if(hx.selected&&!hx.opened){hy=U;}
else if(hx.opened){hy=cp;}
else {hy=M;}
;;return {padding:[0,5,0,2],source:hy};}
},"tree-folder":{include:cb,alias:cb,style:function(hz){var hB,hA;if(hz.small){hB=hz.opened?dk:N;hA=dk;}
else if(hz.large){hB=hz.opened?df:dQ;hA=df;}
else {hB=hz.opened?cY:dt;hA=cY;}
;return {icon:hB,iconOpened:hA};}
},"tree-file":{include:cb,alias:cb,style:function(hC){return {icon:hC.small?dh:hC.large?bQ:bd};}
},"treevirtual":cX,"treevirtual-folder":{style:function(hD){return {icon:hD.opened?dk:N};}
},"treevirtual-file":{include:db,alias:db,style:function(hE){return {icon:dh};}
},"treevirtual-line":{style:function(hF){return {icon:eg};}
},"treevirtual-contract":{style:function(hG){return {icon:cp,paddingLeft:5,paddingTop:2};}
},"treevirtual-expand":{style:function(hH){return {icon:M,paddingLeft:5,paddingTop:2};}
},"treevirtual-only-contract":cd,"treevirtual-only-expand":cj,"treevirtual-start-contract":cd,"treevirtual-start-expand":cj,"treevirtual-end-contract":cd,"treevirtual-end-expand":cj,"treevirtual-cross-contract":cd,"treevirtual-cross-expand":cj,"treevirtual-end":{style:function(hI){return {icon:eg};}
},"treevirtual-cross":{style:function(hJ){return {icon:eg};}
},"tooltip":{include:dw,style:function(hK){return {backgroundColor:dH,padding:[1,3,2,3],offset:[15,5,5,5]};}
},"tooltip/atom":eL,"tooltip-error":{include:ed,style:function(hL){var hO=qx.core.Environment.get(u)&&qx.core.Environment.get(l);var hN=er;if(hO){hN+=eM;}
;if(hL.placementLeft){hN+=D;}
;var hP=ek;if(hL.placementLeft){hP=T;if(hO){hP+=eM;}
;}
;if(hO){if(hL.placementLeft){var hM=[9,20,3,6];}
else {var hM=[6,6,7,-8];}
;}
else {if(hL.placementLeft){var hM=[6,20,3,4];}
else {var hM=[6,10,6,-10];}
;}
;if(!hO&&hL.placementLeft&&qx.core.Environment.get(bY)==bS&&qx.core.Environment.get(cI)<9){hP=undefined;hM=[5,10];}
;return {textColor:p,backgroundColor:undefined,placeMethod:eN,offset:[0,14,0,14],marginTop:-2,position:cU,showTimeout:100,hideTimeout:10000,shadow:hN,decorator:hP,font:s,padding:hM,maxWidth:333};}
},"tooltip-error/atom":eL,"window":{style:function(hQ){var hS=qx.core.Environment.get(u)&&qx.core.Environment.get(eO)&&qx.core.Environment.get(l);var hT;var hR;if(hS){if(hQ.showStatusbar){hT=et;}
else {hT=es;}
;}
else {hR=ct;}
;return {decorator:hT,shadow:hR,contentPadding:[10,10,10,10],margin:hQ.maximized?0:[0,5,5,0]};}
},"window-resize-frame":{style:function(hU){var hV=qx.core.Environment.get(u);var hW;if(hV){if(hU.showStatusbar){hW=bG;}
else {hW=dL;}
;}
else {hW=m;}
;return {decorator:hW};}
},"window/pane":{style:function(hX){var hY=qx.core.Environment.get(u)&&qx.core.Environment.get(eO)&&qx.core.Environment.get(l);return {decorator:hY?ey:cJ};}
},"window/captionbar":{style:function(ia){var ib=qx.core.Environment.get(u)&&qx.core.Environment.get(eO)&&qx.core.Environment.get(l);var ic=ia.active?bl:dS;if(ib){ic+=eM;}
;return {decorator:ic,textColor:ia.active?dW:bR,minHeight:26,paddingRight:2};}
},"window/icon":{style:function(id){return {margin:[5,0,3,6]};}
},"window/title":{style:function(ie){return {alignY:dv,font:s,marginLeft:6,marginRight:12};}
},"window/minimize-button":{alias:eL,style:function(ig){return {icon:ig.active?ig.hovered?w:eV:eS,margin:[4,8,2,0]};}
},"window/restore-button":{alias:eL,style:function(ih){return {icon:ih.active?ih.hovered?cu:bs:eU,margin:[5,8,2,0]};}
},"window/maximize-button":{alias:eL,style:function(ii){return {icon:ii.active?ii.hovered?ep:dq:bB,margin:[4,8,2,0]};}
},"window/close-button":{alias:eL,style:function(ij){return {icon:ij.active?ij.hovered?bz:dF:dn,margin:[4,8,2,0]};}
},"window/statusbar":{style:function(ik){var il=qx.core.Environment.get(u)&&qx.core.Environment.get(eO)&&qx.core.Environment.get(l);return {padding:[2,6],decorator:il?cK:ez,minHeight:18};}
},"window/statusbar-text":{style:function(im){return {font:eD};}
},"iframe":{style:function(io){return {decorator:m};}
},"resizer":{style:function(ip){var iq=qx.core.Environment.get(l)&&qx.core.Environment.get(u)&&qx.core.Environment.get(eO);return {decorator:iq?X:h};}
},"splitpane":{style:function(ir){return {decorator:eY};}
},"splitpane/splitter":{style:function(is){return {width:is.horizontal?3:undefined,height:is.vertical?3:undefined,backgroundColor:cm};}
},"splitpane/splitter/knob":{style:function(it){return {source:it.horizontal?ea:dm};}
},"splitpane/slider":{style:function(iu){return {width:iu.horizontal?3:undefined,height:iu.vertical?3:undefined,backgroundColor:cm};}
},"selectbox":t,"selectbox/atom":eL,"selectbox/popup":dw,"selectbox/list":{alias:bg},"selectbox/arrow":{include:du,style:function(iv){return {source:dz,paddingLeft:5};}
},"datechooser":{style:function(iw){var iA;var iy=!!iw.focused;var iz=!!iw.invalid;var ix=!!iw.disabled;if(iy&&iz&&!ix){iA=dG;}
else if(iy&&!iz&&!ix){iA=dy;}
else if(ix){iA=dR;}
else if(!iy&&iz&&!ix){iA=ef;}
else {iA=cs;}
;;;if(qx.core.Environment.get(eO)){iA+=eM;}
;return {padding:2,decorator:iA,backgroundColor:dC};}
},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:t,alias:t,style:function(iB){var iC={padding:[2,4],shadow:undefined};if(iB.lastYear){iC.icon=bU;iC.marginRight=1;}
else if(iB.lastMonth){iC.icon=de;}
else if(iB.nextYear){iC.icon=bP;iC.marginLeft=1;}
else if(iB.nextMonth){iC.icon=cP;}
;;;return iC;}
},"datechooser/last-year-button-tooltip":ed,"datechooser/last-month-button-tooltip":ed,"datechooser/next-year-button-tooltip":ed,"datechooser/next-month-button-tooltip":ed,"datechooser/last-year-button":cf,"datechooser/last-month-button":cf,"datechooser/next-month-button":cf,"datechooser/next-year-button":cf,"datechooser/month-year-label":{style:function(iD){return {font:s,textAlign:cg,textColor:iD.disabled?r:undefined};}
},"datechooser/date-pane":{style:function(iE){return {textColor:iE.disabled?r:undefined,marginTop:2};}
},"datechooser/weekday":{style:function(iF){return {textColor:iF.disabled?r:iF.weekend?cD:undefined,textAlign:cg,paddingTop:2,backgroundColor:dg};}
},"datechooser/week":{style:function(iG){return {textAlign:cg,padding:[2,4],backgroundColor:dg};}
},"datechooser/day":{style:function(iH){var iI=iH.disabled?undefined:iH.selected?a:undefined;if(iI&&qx.core.Environment.get(eO)){iI+=eM;}
;return {textAlign:cg,decorator:iI,textColor:iH.disabled?r:iH.selected?p:iH.otherMonth?cD:undefined,font:iH.today?s:undefined,padding:[2,4]};}
},"combobox":{style:function(iJ){var iN;var iL=!!iJ.focused;var iM=!!iJ.invalid;var iK=!!iJ.disabled;if(iL&&iM&&!iK){iN=dG;}
else if(iL&&!iM&&!iK){iN=dy;}
else if(iK){iN=dR;}
else if(!iL&&iM&&!iK){iN=ef;}
else {iN=cs;}
;;;if(qx.core.Environment.get(eO)){iN+=eM;}
;return {decorator:iN};}
},"combobox/popup":dw,"combobox/list":{alias:bg},"combobox/button":{include:t,alias:t,style:function(iO,iP){var iQ={icon:dz,padding:[iP.padding[0],iP.padding[1]-6],shadow:undefined,margin:undefined};if(iO.selected){iQ.decorator=cF;}
;return iQ;}
},"combobox/textfield":{include:eb,style:function(iR){return {decorator:undefined};}
},"menu":{style:function(iS){var iT=qx.core.Environment.get(eO)&&qx.core.Environment.get(l);var iU={decorator:iT?en:cz,shadow:iT?undefined:di,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:iS.submenu||iS.contextmenu?Y:cL};if(iS.submenu){iU.position=cU;iU.offset=[-2,-3];}
;return iU;}
},"menu/slidebar":B,"menu-slidebar":eN,"menu-slidebar-button":{style:function(iV){var iW=iV.hovered?a:undefined;if(iW&&qx.core.Environment.get(eO)){iW+=eM;}
;return {decorator:iW,padding:7,center:true};}
},"menu-slidebar/button-backward":{include:bf,style:function(iX){return {icon:iX.hovered?eK:P};}
},"menu-slidebar/button-forward":{include:bf,style:function(iY){return {icon:iY.hovered?dU:dz};}
},"menu-separator":{style:function(ja){return {height:0,decorator:j,margin:[4,2]};}
},"menu-button":{alias:eL,style:function(jb){var jc=jb.selected?a:undefined;if(jc&&qx.core.Environment.get(eO)){jc+=eM;}
;return {decorator:jc,textColor:jb.selected?p:undefined,padding:[4,6]};}
},"menu-button/icon":{include:du,style:function(jd){return {alignY:dv};}
},"menu-button/label":{include:o,style:function(je){return {alignY:dv,padding:1};}
},"menu-button/shortcut":{include:o,style:function(jf){return {alignY:dv,marginLeft:14,padding:1};}
},"menu-button/arrow":{include:du,style:function(jg){return {source:jg.selected?f:cP,alignY:dv};}
},"menu-checkbox":{alias:dj,include:dj,style:function(jh){return {icon:!jh.checked?undefined:jh.selected?bb:dX};}
},"menu-radiobutton":{alias:dj,include:dj,style:function(ji){return {icon:!ji.checked?undefined:ji.selected?cH:bO};}
},"menubar":{style:function(jj){var jk=qx.core.Environment.get(eO);return {decorator:jk?dK:x};}
},"menubar-button":{alias:eL,style:function(jl){var jm=(jl.pressed||jl.hovered)&&!jl.disabled?a:undefined;if(jm&&qx.core.Environment.get(eO)){jm+=eM;}
;return {decorator:jm,textColor:jl.pressed||jl.hovered?p:undefined,padding:[3,8]};}
},"colorselector":eN,"colorselector/control-bar":eN,"colorselector/control-pane":eN,"colorselector/visual-pane":q,"colorselector/preset-grid":eN,"colorselector/colorbucket":{style:function(jn){return {decorator:m,width:16,height:16};}
},"colorselector/preset-field-set":q,"colorselector/input-field-set":{include:q,alias:q,style:function(){return {paddingTop:20};}
},"colorselector/preview-field-set":{include:q,alias:q,style:function(){return {paddingTop:20};}
},"colorselector/hex-field-composite":eN,"colorselector/hex-field":eb,"colorselector/rgb-spinner-composite":eN,"colorselector/rgb-spinner-red":G,"colorselector/rgb-spinner-green":G,"colorselector/rgb-spinner-blue":G,"colorselector/hsb-spinner-composite":eN,"colorselector/hsb-spinner-hue":G,"colorselector/hsb-spinner-saturation":G,"colorselector/hsb-spinner-brightness":G,"colorselector/preview-content-old":{style:function(jo){return {decorator:m,width:50,height:10};}
},"colorselector/preview-content-new":{style:function(jp){return {decorator:m,backgroundColor:dC,width:50,height:10};}
},"colorselector/hue-saturation-field":{style:function(jq){return {decorator:m,margin:5};}
},"colorselector/brightness-field":{style:function(jr){return {decorator:m,margin:[5,7]};}
},"colorselector/hue-saturation-pane":eN,"colorselector/hue-saturation-handle":eN,"colorselector/brightness-pane":eN,"colorselector/brightness-handle":eN,"colorpopup":{alias:dw,include:dw,style:function(js){return {padding:5,backgroundColor:bF};}
},"colorpopup/field":{style:function(jt){return {decorator:m,margin:2,width:14,height:14,backgroundColor:dC};}
},"colorpopup/selector-button":n,"colorpopup/auto-button":n,"colorpopup/preview-pane":q,"colorpopup/current-preview":{style:function(ju){return {height:20,padding:4,marginLeft:4,decorator:m,allowGrowX:true};}
},"colorpopup/selected-preview":{style:function(jv){return {height:20,padding:4,marginRight:4,decorator:m,allowGrowX:true};}
},"colorpopup/colorselector-okbutton":{alias:n,include:n,style:function(jw){return {icon:bW};}
},"colorpopup/colorselector-cancelbutton":{alias:n,include:n,style:function(jx){return {icon:y};}
},"table":{alias:eN,style:function(jy){return {decorator:cX};}
},"table/statusbar":{style:function(jz){return {decorator:dB,padding:[0,2]};}
},"table/column-button":{alias:t,style:function(jA){var jB=qx.core.Environment.get(eO);return {decorator:jB?bp:Q,padding:3,icon:bJ};}
},"table-column-reset-button":{include:dj,alias:dj,style:function(){return {icon:d};}
},"table-scroller":eN,"table-scroller/scrollbar-x":ce,"table-scroller/scrollbar-y":ce,"table-scroller/header":{style:function(jC){var jD=qx.core.Environment.get(eO);return {decorator:jD?bp:Q,textColor:jC.disabled?r:undefined};}
},"table-scroller/pane":{style:function(jE){return {backgroundColor:dN};}
},"table-scroller/focus-indicator":{style:function(jF){return {decorator:ej};}
},"table-scroller/resize-line":{style:function(jG){return {backgroundColor:bE,width:2};}
},"table-header-cell":{alias:eL,style:function(jH){return {minWidth:13,minHeight:20,padding:jH.hovered?[3,4,2,4]:[3,4],decorator:jH.hovered?ca:bc,sortIcon:jH.sorted?(jH.sortedAscending?eJ:bo):undefined};}
},"table-header-cell/label":{style:function(jI){return {minWidth:0,alignY:dv,paddingRight:5};}
},"table-header-cell/sort-icon":{style:function(jJ){return {alignY:dv,alignX:K,opacity:jJ.disabled?0.3:1};}
},"table-header-cell/icon":{style:function(jK){return {minWidth:0,alignY:dv,paddingRight:5,opacity:jK.disabled?0.3:1};}
},"table-editor-textfield":{include:eb,style:function(jL){return {decorator:undefined,padding:[2,2],backgroundColor:dC};}
},"table-editor-selectbox":{include:cT,alias:cT,style:function(jM){return {padding:[0,2],backgroundColor:dC};}
},"table-editor-combobox":{include:cc,alias:cc,style:function(jN){return {decorator:undefined,backgroundColor:dC};}
},"progressive-table-header":{alias:eN,style:function(jO){return {decorator:bI};}
},"progressive-table-header-cell":{alias:eL,style:function(jP){var jQ=qx.core.Environment.get(eO);return {minWidth:40,minHeight:25,paddingLeft:6,decorator:jQ?dT:k};}
},"app-header":{style:function(jR){return {font:s,textColor:p,padding:[8,12],decorator:cy};}
},"app-header-label":o,"virtual-list":bg,"virtual-list/row-layer":cx,"row-layer":eN,"group-item":{include:o,alias:o,style:function(jS){return {padding:4,decorator:qx.core.Environment.get(eO)?eQ:b,textColor:cR,font:s};}
},"virtual-selectbox":cT,"virtual-selectbox/dropdown":dw,"virtual-selectbox/dropdown/list":{alias:I},"virtual-combobox":cc,"virtual-combobox/dropdown":dw,"virtual-combobox/dropdown/list":{alias:I},"virtual-tree":{include:cG,alias:cG,style:function(jT){return {itemHeight:26};}
},"virtual-tree-folder":ex,"virtual-tree-file":bm,"column-layer":eN,"cell":{style:function(jU){return {textColor:jU.selected?p:L,padding:[3,6],font:cq};}
},"cell-string":dx,"cell-number":{include:dx,style:function(jV){return {textAlign:K};}
},"cell-image":dx,"cell-boolean":{include:dx,style:function(jW){return {iconTrue:cB,iconFalse:br};}
},"cell-atom":dx,"cell-date":dx,"cell-html":dx,"htmlarea":{"include":eN,style:function(jX){return {backgroundColor:g};}
},"progressbar":{style:function(jY){return {decorator:eB,padding:[1],backgroundColor:bX,width:200,height:20};}
},"progressbar/progress":{style:function(ka){var kb=ka.disabled?b:a;if(qx.core.Environment.get(eO)){kb+=eM;}
;return {decorator:kb};}
}}});}
)();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";qx.Theme.define(a,{title:c,aliases:{"icon":b}});}
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
else if(this.isRgbString(w)){return this.__fN();}
else if(this.isHex3String(w)){return this.__fP();}
else if(this.isHex6String(w)){return this.__fQ();}
;;;;throw new Error(d+w);}
,cssStringToRgb:function(x){if(this.isNamedColor(x)){return this.NAMED[x];}
else if(this.isSystemColor(x)){throw new Error(c+x);}
else if(this.isRgbString(x)){return this.__fN();}
else if(this.isRgbaString(x)){return this.__fO();}
else if(this.isHex3String(x)){return this.__fP();}
else if(this.isHex6String(x)){return this.__fQ();}
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
,__fN:function(){var J=parseInt(RegExp.$1,10);var I=parseInt(RegExp.$2,10);var H=parseInt(RegExp.$3,10);return [J,I,H];}
,__fO:function(){var M=parseInt(RegExp.$1,10);var L=parseInt(RegExp.$2,10);var K=parseInt(RegExp.$3,10);return [M,L,K];}
,__fP:function(){var P=parseInt(RegExp.$1,16)*17;var O=parseInt(RegExp.$2,16)*17;var N=parseInt(RegExp.$3,16)*17;return [P,O,N];}
,__fQ:function(){var S=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);var R=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);var Q=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);return [S,R,Q];}
,hex3StringToRgb:function(T){if(this.isHex3String(T)){return this.__fP(T);}
;throw new Error(k+T);}
,hex3StringToHex6String:function(U){if(this.isHex3String(U)){return this.rgbToHexString(this.hex3StringToRgb(U));}
;return U;}
,hex6StringToRgb:function(V){if(this.isHex6String(V)){return this.__fQ(V);}
;throw new Error(e+V);}
,hexStringToRgb:function(W){if(this.isHex3String(W)){return this.__fP(W);}
;if(this.isHex6String(W)){return this.__fQ(W);}
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
(function(){var j="backgroundPositionX",i='</div>',h="engine.version",g="scale",f="browser.quirksmode",e='<div style="',d="qx.debug",c="repeat-y",b="hidden",a="qx.ui.decoration.MBackgroundImage",v="String",u="backgroundPositionY",t='">',s="mshtml",r="engine.name",q="This decorator is already in-use. Modification is not possible anymore!",p="no-repeat",o=" ",n="repeat-x",m="repeat",k="",l="_applyBackgroundImage";qx.Mixin.define(a,{properties:{backgroundImage:{check:v,nullable:true,apply:l},backgroundRepeat:{check:[m,n,c,p,g],init:m,apply:l},backgroundPositionX:{nullable:true,apply:l},backgroundPositionY:{nullable:true,apply:l},backgroundPosition:{group:[u,j]}},members:{_generateMarkup:function(w,content){return this._generateBackgroundMarkup(w,content);}
,_generateBackgroundMarkup:function(x,content){var B=k;var A=this.getBackgroundImage();var z=this.getBackgroundRepeat();var top=this.getBackgroundPositionY();if(top==null){top=0;}
;var C=this.getBackgroundPositionX();if(C==null){C=0;}
;x.backgroundPosition=C+o+top;if(A){var y=qx.util.AliasManager.getInstance().resolve(A);B=qx.bom.element.Decoration.create(y,z,x);}
else {if((qx.core.Environment.get(r)==s)){if(parseFloat(qx.core.Environment.get(h))<7||qx.core.Environment.get(f)){x.overflow=b;}
;}
;if(!content){content=k;}
;B=e+qx.bom.element.Style.compile(x)+t+content+i;}
;return B;}
,_applyBackgroundImage:function(){if(qx.core.Environment.get(d)){if(this._isInitialized()){throw new Error(q);}
;}
;}
}});}
)();
(function(){var j="0",i="qx/static",h="http://",g="https://",f="file://",e="qx.util.AliasManager",d="singleton",c=".",b="static",a="/";qx.Class.define(e,{type:d,extend:qx.util.ValueManager,construct:function(){qx.util.ValueManager.call(this);this.__fR={};this.add(b,i);}
,members:{__fR:null,_preprocess:function(k){var n=this._getDynamic();if(n[k]===false){return k;}
else if(n[k]===undefined){if(k.charAt(0)===a||k.charAt(0)===c||k.indexOf(h)===0||k.indexOf(g)===j||k.indexOf(f)===0){n[k]=false;return k;}
;if(this.__fR[k]){return this.__fR[k];}
;var m=k.substring(0,k.indexOf(a));var l=this.__fR[m];if(l!==undefined){n[k]=l+k.substring(m.length);}
;}
;return k;}
,add:function(o,p){this.__fR[o]=p;var r=this._getDynamic();for(var q in r){if(q.substring(0,q.indexOf(a))===o){r[q]=p+q.substring(o.length);}
;}
;}
,remove:function(s){delete this.__fR[s];}
,resolve:function(t){var u=this._getDynamic();if(t!=null){t=this._preprocess(t);}
;return u[t]||t;}
,getAliases:function(){var v={};for(var w in this.__fR){v[w]=this.__fR[w];}
;return v;}
},destruct:function(){this.__fR=null;}
});}
)();
(function(){var k="qx/icon",j=".png",i="crop",h="engine.version",g="Potential clipped image candidate: ",f="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",d='<div style="',c="repeat-y",b='<img src="',a="qx.bom.element.Decoration",N="Image modification not possible because elements could not be replaced at runtime anymore!",M="', sizingMethod='",L="'!",K='"/>',J="png",I="')",H='"></div>',G='" style="',F="none",E="ImageLoader: Not recognized format of external image '",r="webkit",s=" ",p="repeat-x",q="DXImageTransform.Microsoft.AlphaImageLoader",n="qx/static/blank.gif",o="absolute",l="repeat",m="scale",t="mshtml",u="b64",x="scale-y",w="no-repeat",z="qx.debug",y="scale-x",B="",A="engine.name",v="div",D="img",C="px";qx.Class.define(a,{statics:{DEBUG:false,__ml:{},__mm:(qx.core.Environment.get(A)==t)&&qx.core.Environment.get(h)<9,__mn:qx.core.Environment.select(A,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__mo:{"scale-x":D,"scale-y":D,"scale":D,"repeat":v,"no-repeat":v,"repeat-x":v,"repeat-y":v},update:function(O,P,Q,R){var T=this.getTagName(Q,P);if(T!=O.tagName.toLowerCase()){throw new Error(N);}
;var U=this.getAttributes(P,Q,R);if(T===D){O.src=U.src||qx.util.ResourceManager.getInstance().toUri(n);}
;if(O.style.backgroundPosition!=B&&U.style.backgroundPosition===undefined){U.style.backgroundPosition=null;}
;if(O.style.clip!=B&&U.style.clip===undefined){U.style.clip=null;}
;var S=qx.bom.element.Style;S.setStyles(O,U.style);if(this.__mm){try{O.filters[q].apply();}
catch(e){}
;}
;}
,create:function(V,W,X){var Y=this.getTagName(W,V);var bb=this.getAttributes(V,W,X);var ba=qx.bom.element.Style.compile(bb.style);if(Y===D){return b+bb.src+G+ba+K;}
else {return d+ba+H;}
;}
,getTagName:function(bc,bd){if(bd&&this.__mm&&this.__mn[bc]&&qx.lang.String.endsWith(bd,j)){return v;}
;return this.__mo[bc];}
,getAttributes:function(be,bf,bh){if(!bh){bh={};}
;if(!bh.position){bh.position=o;}
;if((qx.core.Environment.get(A)==t)){bh.fontSize=0;bh.lineHeight=0;}
else if((qx.core.Environment.get(A)==r)){bh.WebkitUserDrag=F;}
;var bj=qx.util.ResourceManager.getInstance().getImageFormat(be)||qx.io.ImageLoader.getFormat(be);if(qx.core.Environment.get(z)){if(be!=null&&bj==null){qx.log.Logger.warn(E+be+L);}
;}
;var bi;if(this.__mm&&this.__mn[bf]&&bj===J){bi=this.__mr(bh,bf,be);}
else {if(bf===m){bi=this.__ms(bh,bf,be);}
else if(bf===y||bf===x){bi=this.__mt(bh,bf,be);}
else {bi=this.__mw(bh,bf,be);}
;}
;return bi;}
,__mp:function(bk,bl,bm){if(bk.width==null&&bl!=null){bk.width=bl+C;}
;if(bk.height==null&&bm!=null){bk.height=bm+C;}
;return bk;}
,__mq:function(bn){var bo=qx.util.ResourceManager.getInstance().getImageWidth(bn)||qx.io.ImageLoader.getWidth(bn);var bp=qx.util.ResourceManager.getInstance().getImageHeight(bn)||qx.io.ImageLoader.getHeight(bn);return {width:bo,height:bp};}
,__mr:function(bq,br,bs){var bv=this.__mq(bs);bq=this.__mp(bq,bv.width,bv.height);var bu=br==w?i:m;var bt=f+qx.util.ResourceManager.getInstance().toUri(bs)+M+bu+I;bq.filter=bt;bq.backgroundImage=bq.backgroundRepeat=B;return {style:bq};}
,__ms:function(bw,bx,by){var bz=qx.util.ResourceManager.getInstance().toUri(by);var bA=this.__mq(by);bw=this.__mp(bw,bA.width,bA.height);return {src:bz,style:bw};}
,__mt:function(bB,bC,bD){var bE=qx.util.ResourceManager.getInstance();var bH=bE.getCombinedFormat(bD);var bJ=this.__mq(bD);var bF;if(bH){var bI=bE.getData(bD);var bG=bI[4];if(bH==u){bF=bE.toDataUri(bD);}
else {bF=bE.toUri(bG);}
;if(bC===y){bB=this.__mu(bB,bI,bJ.height);}
else {bB=this.__mv(bB,bI,bJ.width);}
;return {src:bF,style:bB};}
else {if(qx.core.Environment.get(z)){this.__my(bD);}
;if(bC==y){bB.height=bJ.height==null?null:bJ.height+C;}
else if(bC==x){bB.width=bJ.width==null?null:bJ.width+C;}
;bF=bE.toUri(bD);return {src:bF,style:bB};}
;}
,__mu:function(bK,bL,bM){var bN=qx.util.ResourceManager.getInstance().getImageHeight(bL[4]);bK.clip={top:-bL[6],height:bM};bK.height=bN+C;if(bK.top!=null){bK.top=(parseInt(bK.top,10)+bL[6])+C;}
else if(bK.bottom!=null){bK.bottom=(parseInt(bK.bottom,10)+bM-bN-bL[6])+C;}
;return bK;}
,__mv:function(bO,bP,bQ){var bR=qx.util.ResourceManager.getInstance().getImageWidth(bP[4]);bO.clip={left:-bP[5],width:bQ};bO.width=bR+C;if(bO.left!=null){bO.left=(parseInt(bO.left,10)+bP[5])+C;}
else if(bO.right!=null){bO.right=(parseInt(bO.right,10)+bQ-bR-bP[5])+C;}
;return bO;}
,__mw:function(bS,bT,bU){var bX=qx.util.ResourceManager.getInstance();var cd=bX.getCombinedFormat(bU);var cf=this.__mq(bU);if(cd&&bT!==l){var ce=bX.getData(bU);var cc=ce[4];if(cd==u){var cb=bX.toDataUri(bU);var ca=0;var bY=0;}
else {var cb=bX.toUri(cc);var ca=ce[5];var bY=ce[6];}
;var bV=qx.bom.element.Background.getStyles(cb,bT,ca,bY);for(var bW in bV){bS[bW]=bV[bW];}
;if(cf.width!=null&&bS.width==null&&(bT==c||bT===w)){bS.width=cf.width+C;}
;if(cf.height!=null&&bS.height==null&&(bT==p||bT===w)){bS.height=cf.height+C;}
;return {style:bS};}
else {if(qx.core.Environment.get(z)){if(bT!==l){this.__my(bU);}
;}
;bS=this.__mp(bS,cf.width,cf.height);bS=this.__mx(bS,bU,bT);return {style:bS};}
;}
,__mx:function(cg,ch,ci){var top=null;var cm=null;if(cg.backgroundPosition){var cj=cg.backgroundPosition.split(s);cm=parseInt(cj[0],10);if(isNaN(cm)){cm=cj[0];}
;top=parseInt(cj[1],10);if(isNaN(top)){top=cj[1];}
;}
;var cl=qx.bom.element.Background.getStyles(ch,ci,cm,top);for(var ck in cl){cg[ck]=cl[ck];}
;if(cg.filter){cg.filter=B;}
;return cg;}
,__my:function(cn){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(cn)&&cn.indexOf(k)==-1){if(!this.__ml[cn]){qx.log.Logger.debug(g+cn);this.__ml[cn]=true;}
;}
;}
,isAlphaImageLoaderEnabled:function(){return qx.bom.element.Decoration.__mm;}
}});}
)();
(function(){var b="singleton",a="qx.util.LibraryManager";qx.Class.define(a,{extend:qx.core.Object,type:b,statics:{__fS:qx.$$libraries||{}},members:{has:function(c){return !!this.self(arguments).__fS[c];}
,get:function(d,e){return this.self(arguments).__fS[d][e]?this.self(arguments).__fS[d][e]:null;}
,set:function(f,g,h){this.self(arguments).__fS[f][g]=h;}
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
,statics:{__j:qx.$$resources||{},__jW:{}},members:{has:function(r){return !!this.self(arguments).__j[r];}
,getData:function(s){return this.self(arguments).__j[s]||null;}
,getImageWidth:function(t){var u=this.self(arguments).__j[t];return u?u[0]:null;}
,getImageHeight:function(v){var w=this.self(arguments).__j[v];return w?w[1]:null;}
,getImageFormat:function(x){var y=this.self(arguments).__j[x];return y?y[2]:null;}
,getCombinedFormat:function(z){var C=d;var B=this.self(arguments).__j[z];var A=B&&B.length>4&&typeof (B[4])==b&&this.constructor.__j[B[4]];if(A){var E=B[4];var D=this.constructor.__j[E];C=D[2];}
;return C;}
,toUri:function(F){if(F==null){return F;}
;var G=this.self(arguments).__j[F];if(!G){return F;}
;if(typeof G===b){var I=G;}
else {var I=G[3];if(!I){return F;}
;}
;var H=d;if((qx.core.Environment.get(g)==c)&&qx.core.Environment.get(f)){H=this.self(arguments).__jW[I];}
;return H+qx.util.LibraryManager.getInstance().get(I,e)+a+F;}
,toDataUri:function(J){var L=this.constructor.__j[J];var M=this.constructor.__j[L[4]];var N;if(M){var K=M[4][J];N=l+K[m]+k+K[p]+h+K[n];}
else {N=this.toUri(J);}
;return N;}
},defer:function(O){if((qx.core.Environment.get(g)==c)){if(qx.core.Environment.get(f)){for(var S in qx.$$libraries){var Q;if(qx.util.LibraryManager.getInstance().get(S,e)){Q=qx.util.LibraryManager.getInstance().get(S,e);}
else {O.__jW[S]=d;continue;}
;if(Q.match(/^\/\//)!=null){O.__jW[S]=window.location.protocol;}
else if(Q.match(/^\//)!=null){O.__jW[S]=window.location.protocol+q+window.location.host;}
else if(Q.match(/^\.\//)!=null){var P=document.URL;O.__jW[S]=P.substring(0,P.lastIndexOf(a)+1);}
else if(Q.match(/^http/)!=null){O.__jW[S]=d;}
else {var T=window.location.href.indexOf(o);var R;if(T==-1){R=window.location.href;}
else {R=window.location.href.substring(0,T);}
;O.__jW[S]=R.substring(0,R.lastIndexOf(a)+1);}
;;;}
;}
;}
;}
});}
)();
(function(){var c="load",b="qx.io.ImageLoader",a="html.image.naturaldimensions";qx.Bootstrap.define(b,{statics:{__cR:{},__jN:{width:null,height:null},__jO:/\.(png|gif|jpg|jpeg|bmp)\b/i,__jP:/^data:image\/(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(d){var e=this.__cR[d];return !!(e&&e.loaded);}
,isFailed:function(f){var g=this.__cR[f];return !!(g&&g.failed);}
,isLoading:function(h){var j=this.__cR[h];return !!(j&&j.loading);}
,getFormat:function(k){var m=this.__cR[k];if(!m||!m.format){var o=this.__jP.exec(k);if(o!=null){var p=(m&&qx.lang.Type.isNumber(m.width)?m.width:this.__jN.width);var n=(m&&qx.lang.Type.isNumber(m.height)?m.height:this.__jN.height);m={loaded:true,format:o[1],width:p,height:n};}
;}
;return m?m.format:null;}
,getSize:function(q){var r=this.__cR[q];return r?{width:r.width,height:r.height}:this.__jN;}
,getWidth:function(s){var t=this.__cR[s];return t?t.width:null;}
,getHeight:function(u){var v=this.__cR[u];return v?v.height:null;}
,load:function(w,x,y){var z=this.__cR[w];if(!z){z=this.__cR[w]={};}
;if(x&&!y){y=window;}
;if(z.loaded||z.loading||z.failed){if(x){if(z.loading){z.callbacks.push(x,y);}
else {x.call(y,w,z);}
;}
;}
else {z.loading=true;z.callbacks=[];if(x){z.callbacks.push(x,y);}
;var B=new Image();var A=qx.lang.Function.listener(this.__jQ,this,B,w);B.onload=A;B.onerror=A;B.src=w;z.element=B;}
;}
,abort:function(C){var D=this.__cR[C];if(D&&!D.loaded){D.aborted=true;var F=D.callbacks;var E=D.element;E.onload=E.onerror=null;delete D.callbacks;delete D.element;delete D.loading;for(var i=0,l=F.length;i<l;i+=2){F[i].call(F[i+1],C,D);}
;}
;this.__cR[C]=null;}
,__jQ:qx.event.GlobalError.observeMethod(function(event,G,H){var I=this.__cR[H];if(event.type===c){I.loaded=true;I.width=this.__jR(G);I.height=this.__jS(G);var J=this.__jO.exec(H);if(J!=null){I.format=J[1];}
;}
else {I.failed=true;}
;G.onload=G.onerror=null;var K=I.callbacks;delete I.loading;delete I.callbacks;delete I.element;for(var i=0,l=K.length;i<l;i+=2){K[i].call(K[i+1],H,I);}
;}
),__jR:function(L){return qx.core.Environment.get(a)?L.naturalWidth:L.width;}
,__jS:function(M){return qx.core.Environment.get(a)?M.naturalHeight:M.height;}
}});}
)();
(function(){var u="')",t="gecko",s="background-image:url(",r=");",q="",p=")",o="background-repeat:",n="engine.version",m="data:",l=" ",e="qx.bom.element.Background",k="url(",h="background-position:",c="base64",b="url('",g="engine.name",f="0",i="px",a=";",j="'",d="number";qx.Class.define(e,{statics:{__kb:[s,null,r,h,null,a,o,null,a],__kc:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__kd:function(v,top){var w=qx.core.Environment.get(g);var x=qx.core.Environment.get(n);if(w==t&&x<1.9&&v==top&&typeof v==d){top+=0.01;}
;if(v){var z=(typeof v==d)?v+i:v;}
else {z=f;}
;if(top){var y=(typeof top==d)?top+i:top;}
else {y=f;}
;return z+l+y;}
,__ke:function(A){var String=qx.lang.String;var B=A.substr(0,50);return String.startsWith(B,m)&&String.contains(B,c);}
,compile:function(C,D,E,top){var F=this.__kd(E,top);var G=qx.util.ResourceManager.getInstance().toUri(C);if(this.__ke(G)){G=j+G+j;}
;var H=this.__kb;H[1]=G;H[4]=F;H[7]=D;return H.join(q);}
,getStyles:function(I,J,K,top){if(!I){return this.__kc;}
;var L=this.__kd(K,top);var N=qx.util.ResourceManager.getInstance().toUri(I);var O;if(this.__ke(N)){O=b+N+u;}
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
(function(){var l="abstract",k="insetRight",j="insetTop",i="qx.debug",h="insetBottom",g="qx.ui.decoration.Abstract",f="This decorator is already in-use. Modification is not possible anymore!",e="shorthand",d="insetLeft",c="Abstract method called.",a="Number",b="_applyInsets";qx.Class.define(g,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:l,properties:{insetLeft:{check:a,nullable:true,apply:b},insetRight:{check:a,nullable:true,apply:b},insetBottom:{check:a,nullable:true,apply:b},insetTop:{check:a,nullable:true,apply:b},insets:{group:[j,k,h,d],mode:e}},members:{__lh:null,_getDefaultInsets:function(){throw new Error(c);}
,_isInitialized:function(){throw new Error(c);}
,_resetInsets:function(){this.__lh=null;}
,getInsets:function(){if(this.__lh){return this.__lh;}
;var m=this._getDefaultInsets();return this.__lh={left:this.getInsetLeft()==null?m.left:this.getInsetLeft(),right:this.getInsetRight()==null?m.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?m.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?m.top:this.getInsetTop()};}
,_applyInsets:function(){if(qx.core.Environment.get(i)){if(this._isInitialized()){throw new Error(f);}
;}
;this.__lh=null;}
},destruct:function(){this.__lh=null;}
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
(function(){var c="qx.ui.decoration.Background",b="absolute",a="px";qx.Class.define(c,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage,qx.ui.decoration.MBackgroundColor],construct:function(d){qx.ui.decoration.Abstract.call(this);if(d!=null){this.setBackgroundColor(d);}
;}
,members:{__AR:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};}
,_isInitialized:function(){return !!this.__AR;}
,getMarkup:function(){if(this.__AR){return this.__AR;}
;var e={position:b,top:0,left:0};var f=this._generateBackgroundMarkup(e);return this.__AR=f;}
,resize:function(g,h,i){var j=this.getInsets();g.style.width=(h-j.left-j.right)+a;g.style.height=(i-j.top-j.bottom)+a;g.style.left=-j.left+a;g.style.top=-j.top+a;}
,tint:function(k,l){this._tintBackgroundColor(k,l,k.style);}
},destruct:function(){this.__AR=null;}
});}
)();
(function(){var j="px",i='</div>',h="qx.ui.decoration.Beveled",g="css.boxmodel",f="qx.debug",e='<div style="position:absolute;top:1px;left:1px;',d='border-bottom:',c='border-right:',b="",a="content",z="Number",y='border-left:',x='border-top:',w="This decorator is already in-use. Modification is not possible anymore!",v='<div style="position:absolute;top:1px;left:0px;',u='position:absolute;top:0px;left:1px;',t='<div style="overflow:hidden;font-size:0;line-height:0;">',s="absolute",r="1px",q='<div style="',o='border:',p="1px solid ",m="Color",n=";",k="_applyStyle",l='"></div>';qx.Class.define(h,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage,qx.ui.decoration.MBackgroundColor],construct:function(A,B,C){qx.ui.decoration.Abstract.call(this);if(A!=null){this.setOuterColor(A);}
;if(B!=null){this.setInnerColor(B);}
;if(C!=null){this.setInnerOpacity(C);}
;}
,properties:{innerColor:{check:m,nullable:true,apply:k},innerOpacity:{check:z,init:1,apply:k},outerColor:{check:m,nullable:true,apply:k}},members:{__AR:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};}
,_isInitialized:function(){return !!this.__AR;}
,_applyStyle:function(){if(qx.core.Environment.get(f)){if(this.__AR){throw new Error(w);}
;}
;}
,getMarkup:function(){if(this.__AR){return this.__AR;}
;var D=qx.theme.manager.Color.getInstance();var E=[];var H=p+D.resolve(this.getOuterColor())+n;var G=p+D.resolve(this.getInnerColor())+n;E.push(t);E.push(q);E.push(o,H);E.push(qx.bom.element.Opacity.compile(0.35));E.push(l);E.push(v);E.push(y,H);E.push(c,H);E.push(qx.bom.element.Opacity.compile(1));E.push(l);E.push(q);E.push(u);E.push(x,H);E.push(d,H);E.push(qx.bom.element.Opacity.compile(1));E.push(l);var F={position:s,top:r,left:r,opacity:1};E.push(this._generateBackgroundMarkup(F));E.push(e);E.push(o,G);E.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));E.push(l);E.push(i);return this.__AR=E.join(b);}
,resize:function(I,J,K){if(J<4){J=4;}
;if(K<4){K=4;}
;if(qx.core.Environment.get(g)==a){var outerWidth=J-2;var outerHeight=K-2;var Q=outerWidth;var P=outerHeight;var innerWidth=J-4;var innerHeight=K-4;}
else {var outerWidth=J;var outerHeight=K;var Q=J-2;var P=K-2;var innerWidth=Q;var innerHeight=P;}
;var S=j;var O=I.childNodes[0].style;O.width=outerWidth+S;O.height=outerHeight+S;var N=I.childNodes[1].style;N.width=outerWidth+S;N.height=P+S;var M=I.childNodes[2].style;M.width=Q+S;M.height=outerHeight+S;var L=I.childNodes[3].style;L.width=Q+S;L.height=P+S;var R=I.childNodes[4].style;R.width=innerWidth+S;R.height=innerHeight+S;}
,tint:function(T,U){this._tintBackgroundColor(T,U,T.childNodes[3].style);}
},destruct:function(){this.__AR=null;}
});}
)();
(function(){var j="</div>",i="),to(",h="from(",g="background-image",f="background",e="<div style='width: 100%; height: 100%; position: absolute;",d="StartColorStr='#FF",c="', ",b="'></div>",a="-webkit-gradient(linear,",U="startColorPosition",T="qx.debug",S="deg, ",R="css.gradient.legacywebkit",Q="EndColorStr='#FF",P="startColor",O="qx.theme",N="MBoxShadow",M="<div style=\"position: absolute; width: 100%; height: 100%; ",L="(GradientType=",q="qx.ui.decoration.MLinearBackgroundGradient",r="(",o="endColorPosition",p="';)\">",m="endColor",n=", ",k="overflow",l="hidden",s="This decorator is already in-use. Modification is not possible anymore!",t="linear-gradient",A="filter:progid:DXImageTransform.Microsoft.Gradient",y=" 0",E="px",C="0",H="shorthand",G="Color",v="vertical",K="css.gradient.filter",J="Number",I="%",u=")",w="",x="css.gradient.linear",z=",",B=" ",D="horizontal",F="_applyLinearBackgroundGradient";qx.Mixin.define(q,{properties:{startColor:{check:G,nullable:true,apply:F},endColor:{check:G,nullable:true,apply:F},orientation:{check:[D,v],init:v,apply:F},startColorPosition:{check:J,init:0,apply:F},endColorPosition:{check:J,init:100,apply:F},colorPositionUnit:{check:[E,I],init:I,apply:F},gradientStart:{group:[P,U],mode:H},gradientEnd:{group:[m,o],mode:H}},members:{_styleLinearBackgroundGradient:function(V){var bc=this.__rx();var bg=bc.start;var ba=bc.end;var bh=this.getColorPositionUnit();if(qx.core.Environment.get(R)){bh=bh===E?w:bh;if(this.getOrientation()==D){var bf=this.getStartColorPosition()+bh+y+bh;var bd=this.getEndColorPosition()+bh+y+bh;}
else {var bf=C+bh+B+this.getStartColorPosition()+bh;var bd=C+bh+B+this.getEndColorPosition()+bh;}
;var X=h+bg+i+ba+u;var Y=a+bf+z+bd+z+X+u;V[f]=Y;}
else if(qx.core.Environment.get(K)&&!qx.core.Environment.get(x)){V[k]=l;}
else {var bi=this.getOrientation()==D?0:270;var bb=bg+B+this.getStartColorPosition()+bh;var W=ba+B+this.getEndColorPosition()+bh;var be=qx.core.Environment.get(x);if(be===t){bi=this.getOrientation()==D?bi+90:bi-90;}
;V[g]=be+r+bi+S+bb+z+W+u;}
;}
,__rx:function(){if(qx.core.Environment.get(O)){var bj=qx.theme.manager.Color.getInstance();var bl=bj.resolve(this.getStartColor());var bk=bj.resolve(this.getEndColor());}
else {var bl=this.getStartColor();var bk=this.getEndColor();}
;return {start:bl,end:bk};}
,_getContent:function(){if(qx.core.Environment.get(K)&&!qx.core.Environment.get(x)){var bo=this.__rx();var br=this.getOrientation()==D?1:0;var bq=qx.util.ColorUtil.hex3StringToHex6String(bo.start);var bn=qx.util.ColorUtil.hex3StringToHex6String(bo.end);bq=bq.substring(1,bq.length);bn=bn.substring(1,bn.length);var bp=w;if(this.classname.indexOf(N)!=-1){var bm={};this._styleBoxShadow(bm);bp=e+qx.bom.element.Style.compile(bm)+b;}
;return M+A+L+br+n+d+bq+c+Q+bn+p+bp+j;}
;return w;}
,_resizeLinearBackgroundGradient:function(bs,bt,bu){var bv=this.getInsets();bt-=bv.left+bv.right;bu-=bv.top+bv.bottom;return {left:bv.left,top:bv.top,width:bt,height:bu};}
,_applyLinearBackgroundGradient:function(){if(qx.core.Environment.get(T)){if(this._isInitialized()){throw new Error(s);}
;}
;}
}});}
)();
(function(){var r="sliceBottom",q="qx.debug.dispose",p="insetTop",o="sliceLeft",n="_applyBaseImage",m="insetBottom",l="sliceRight",k="_applyFill",j="sliceTop",i="insetLeft",c="String",h="qx.ui.decoration.Grid",f="insetRight",b="set",a="shorthand",e="_applyInsets",d="_applySlices",g="Number";qx.Class.define(h,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],construct:function(s,t){qx.core.Object.call(this);if(qx.ui.decoration.css3.BorderImage.IS_SUPPORTED){this.__dt=new qx.ui.decoration.css3.BorderImage();if(s){this.__AS(s);}
;}
else {this.__dt=new qx.ui.decoration.GridDiv(s);}
;if(t!=null){this.__dt.setInsets(t);}
;if(qx.core.Environment.get(q)){this.__dt.$$ignoreDisposeWarning=true;}
;}
,properties:{baseImage:{check:c,nullable:true,apply:n},insetLeft:{check:g,nullable:true,apply:e},insetRight:{check:g,nullable:true,apply:e},insetBottom:{check:g,nullable:true,apply:e},insetTop:{check:g,nullable:true,apply:e},insets:{group:[p,f,m,i],mode:a},sliceLeft:{check:g,nullable:true,apply:d},sliceRight:{check:g,nullable:true,apply:d},sliceBottom:{check:g,nullable:true,apply:d},sliceTop:{check:g,nullable:true,apply:d},slices:{group:[j,l,r,o],mode:a},fill:{apply:k}},members:{__dt:null,getMarkup:function(){return this.__dt.getMarkup();}
,resize:function(u,v,w){this.__dt.resize(u,v,w);}
,tint:function(x,y){}
,getInsets:function(){return this.__dt.getInsets();}
,_applyInsets:function(z,A,name){var B=b+qx.lang.String.firstUp(name);this.__dt[B](z);}
,_applySlices:function(C,D,name){var E=b+qx.lang.String.firstUp(name);if(this.__dt[E]){this.__dt[E](C);}
;}
,_applyFill:function(F,G,name){if(this.__dt.setFill){this.__dt.setFill(F);}
;}
,_applyBaseImage:function(H,I){if(this.__dt instanceof qx.ui.decoration.GridDiv){this.__dt.setBaseImage(H);}
else {this.__AS(H);}
;}
,__AS:function(J){this.__dt.setBorderImage(J);var T=qx.util.AliasManager.getInstance().resolve(J);var U=/(.*)(\.[a-z]+)$/.exec(T);var P=U[1];var S=U[2];var M=qx.util.ResourceManager.getInstance();var V=M.getImageHeight(P+"-t"+S);var K=M.getImageWidth(P+"-r"+S);var L=M.getImageHeight(P+"-b"+S);var W=M.getImageWidth(P+"-l"+S);if(qx.core.Environment.get("qx.debug")&&!this.__dt instanceof qx.ui.decoration.css3.BorderImage){var N="The value of the property 'topSlice' is null! "+"Please verify the image '"+P+"-t"+S+"' is present.";var O="The value of the property 'rightSlice' is null! "+"Please verify the image '"+P+"-r"+S+"' is present.";var R="The value of the property 'bottomSlice' is null! "+"Please verify the image '"+P+"-b"+S+"' is present.";var Q="The value of the property 'leftSlice' is null! "+"Please verify the image '"+P+"-l"+S+"' is present.";qx.core.Assert.assertNotNull(V,N);qx.core.Assert.assertNotNull(K,O);qx.core.Assert.assertNotNull(L,R);qx.core.Assert.assertNotNull(W,Q);}
;if(V&&K&&L&&W){this.__dt.setSlice([V,K,L,W]);}
;}
},destruct:function(){this.__dt.dispose();this.__dt=null;}
});}
)();
(function(){var j="css.borderimage.standardsyntax",i="Boolean",h="px ",g="sliceBottom",f="solid",e=";'></div>",d="<div style='",c="qx.debug",b="sliceLeft",a="sliceRight",F="repeatX",E=" fill",D="String",C="qx.ui.decoration.css3.BorderImage",B="border-box",A="transparent",z='") ',y="sliceTop",x="This decorator is already in-use. Modification is not possible anymore!",w='url("',q="hidden",r="repeatY",o="absolute",p="repeat",m="",n="round",k="shorthand",l="px",s=" ",t="stretch",v="Integer",u="_applyStyle";qx.Class.define(C,{extend:qx.ui.decoration.Abstract,construct:function(G,H){qx.ui.decoration.Abstract.call(this);if(G!=null){this.setBorderImage(G);}
;if(H!=null){this.setSlice(H);}
;}
,statics:{IS_SUPPORTED:qx.bom.element.Style.isPropertySupported("borderImage")},properties:{borderImage:{check:D,nullable:true,apply:u},sliceTop:{check:v,init:0,apply:u},sliceRight:{check:v,init:0,apply:u},sliceBottom:{check:v,init:0,apply:u},sliceLeft:{check:v,init:0,apply:u},slice:{group:[y,a,g,b],mode:k},repeatX:{check:[t,p,n],init:t,apply:u},repeatY:{check:[t,p,n],init:t,apply:u},repeat:{group:[F,r],mode:k},fill:{check:i,init:true}},members:{__AR:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};}
,_isInitialized:function(){return !!this.__AR;}
,getMarkup:function(){if(this.__AR){return this.__AR;}
;var I=this._resolveImageUrl(this.getBorderImage());var J=[this.getSliceTop(),this.getSliceRight(),this.getSliceBottom(),this.getSliceLeft()];var K=[this.getRepeatX(),this.getRepeatY()].join(s);var L=this.getFill()&&qx.core.Environment.get(j)?E:m;this.__AR=[d,qx.bom.element.Style.compile({"borderImage":w+I+z+J.join(s)+L+s+K,"borderStyle":f,"borderColor":A,position:o,lineHeight:0,fontSize:0,overflow:q,boxSizing:B,borderWidth:J.join(h)+l}),e].join(m);return this.__AR;}
,resize:function(M,N,O){M.style.width=N+l;M.style.height=O+l;}
,tint:function(P,Q){}
,_applyStyle:function(R,S,name){if(qx.core.Environment.get(c)){if(this._isInitialized()){throw new Error(x);}
;}
;}
,_resolveImageUrl:function(T){return qx.util.ResourceManager.getInstance().toUri(qx.util.AliasManager.getInstance().resolve(T));}
},destruct:function(){this.__AR=null;}
});}
)();
(function(){var j="-tr",i="-l",h='</div>',g="scale",f="-br",e="-t",d="browser.quirksmode",c="-tl",b="-r",a='<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">',B="qx.debug",A="_applyBaseImage",z="-b",y="String",x="",w="-bl",v="qx.ui.decoration.GridDiv",u="-c",t="mshtml",s="engine.name",q="This decorator is already in-use. Modification is not possible anymore!",r="engine.version",o="scale-x",p="scale-y",m="no-repeat",n="0px",k="-1px",l="px";qx.Class.define(v,{extend:qx.ui.decoration.Abstract,construct:function(C,D){qx.ui.decoration.Abstract.call(this);if(C!=null){this.setBaseImage(C);}
;if(D!=null){this.setInsets(D);}
;}
,properties:{baseImage:{check:y,nullable:true,apply:A}},members:{_markup:null,_images:null,_edges:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};}
,_isInitialized:function(){return !!this._markup;}
,getMarkup:function(){if(this._markup){return this._markup;}
;var E=qx.bom.element.Decoration;var F=this._images;var G=this._edges;var H=[];H.push(a);H.push(E.create(F.tl,m,{top:0,left:0}));H.push(E.create(F.t,o,{top:0,left:G.left+l}));H.push(E.create(F.tr,m,{top:0,right:0}));H.push(E.create(F.bl,m,{bottom:0,left:0}));H.push(E.create(F.b,o,{bottom:0,left:G.left+l}));H.push(E.create(F.br,m,{bottom:0,right:0}));H.push(E.create(F.l,p,{top:G.top+l,left:0}));H.push(E.create(F.c,g,{top:G.top+l,left:G.left+l}));H.push(E.create(F.r,p,{top:G.top+l,right:0}));H.push(h);return this._markup=H.join(x);}
,resize:function(I,J,K){var L=this._edges;var innerWidth=J-L.left-L.right;var innerHeight=K-L.top-L.bottom;if(innerWidth<0){innerWidth=0;}
;if(innerHeight<0){innerHeight=0;}
;I.style.width=J+l;I.style.height=K+l;I.childNodes[1].style.width=innerWidth+l;I.childNodes[4].style.width=innerWidth+l;I.childNodes[7].style.width=innerWidth+l;I.childNodes[6].style.height=innerHeight+l;I.childNodes[7].style.height=innerHeight+l;I.childNodes[8].style.height=innerHeight+l;if((qx.core.Environment.get(s)==t)){if(parseFloat(qx.core.Environment.get(r))<7||(qx.core.Environment.get(d)&&parseFloat(qx.core.Environment.get(r))<8)){if(J%2==1){I.childNodes[2].style.marginRight=k;I.childNodes[5].style.marginRight=k;I.childNodes[8].style.marginRight=k;}
else {I.childNodes[2].style.marginRight=n;I.childNodes[5].style.marginRight=n;I.childNodes[8].style.marginRight=n;}
;if(K%2==1){I.childNodes[3].style.marginBottom=k;I.childNodes[4].style.marginBottom=k;I.childNodes[5].style.marginBottom=k;}
else {I.childNodes[3].style.marginBottom=n;I.childNodes[4].style.marginBottom=n;I.childNodes[5].style.marginBottom=n;}
;}
;}
;}
,tint:function(M,N){}
,_applyBaseImage:function(O,P){if(qx.core.Environment.get(B)){if(this._markup){throw new Error(q);}
;}
;if(O){var T=this._resolveImageUrl(O);var U=/(.*)(\.[a-z]+)$/.exec(T);var S=U[1];var R=U[2];var Q=this._images={tl:S+c+R,t:S+e+R,tr:S+j+R,bl:S+w+R,b:S+z+R,br:S+f+R,l:S+i+R,c:S+u+R,r:S+b+R};this._edges=this._computeEdgeSizes(Q);}
;}
,_resolveImageUrl:function(V){return qx.util.AliasManager.getInstance().resolve(V);}
,_computeEdgeSizes:function(W){var X=qx.util.ResourceManager.getInstance();return {top:X.getImageHeight(W.t),bottom:X.getImageHeight(W.b),left:X.getImageWidth(W.l),right:X.getImageWidth(W.r)};}
},destruct:function(){this._markup=this._images=this._edges=null;}
});}
)();
(function(){var a="qx.ui.decoration.Uniform";qx.Class.define(a,{extend:qx.ui.decoration.Single,construct:function(b,c,d){qx.ui.decoration.Single.call(this);if(b!=null){this.setWidth(b);}
;if(c!=null){this.setStyle(c);}
;if(d!=null){this.setColor(d);}
;}
});}
)();
(function(){var j="innerWidthRight",i="top",h="innerColorBottom",g="innerWidthTop",f="innerColorRight",e="innerColorTop",d="relative",c="browser.documentmode",b="innerColorLeft",a="",H="qx.ui.decoration.MDoubleBorder",G="left",F="Invalid Double decorator (zero inner border width). Use qx.ui.decoration.Single instead!",E="engine.version",D="innerWidthBottom",C="innerWidthLeft",B="position",A="Invalid Double decorator (zero outer border width). Use qx.ui.decoration.Single instead!",z="absolute",y="qx.theme",q="qx.debug",r="shorthand",o="line-height",p="engine.name",m="mshtml",n="Color",k="Number",l="border-top",s="border-left",t="border-bottom",v="border-right",u="px ",x=" ",w='';qx.Mixin.define(H,{include:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundImage],construct:function(){this._getDefaultInsetsForBorder=this.__rr;this._resizeBorder=this.__rq;this._styleBorder=this.__ro;this._generateMarkup=this.__rp;}
,properties:{innerWidthTop:{check:k,init:0},innerWidthRight:{check:k,init:0},innerWidthBottom:{check:k,init:0},innerWidthLeft:{check:k,init:0},innerWidth:{group:[g,j,D,C],mode:r},innerColorTop:{nullable:true,check:n},innerColorRight:{nullable:true,check:n},innerColorBottom:{nullable:true,check:n},innerColorLeft:{nullable:true,check:n},innerColor:{group:[e,f,h,b],mode:r}},members:{__rn:null,__ro:function(I){if(qx.core.Environment.get(y)){var K=qx.theme.manager.Color.getInstance();var L=K.resolve(this.getInnerColorTop());var O=K.resolve(this.getInnerColorRight());var M=K.resolve(this.getInnerColorBottom());var N=K.resolve(this.getInnerColorLeft());}
else {var L=this.getInnerColorTop();var O=this.getInnerColorRight();var M=this.getInnerColorBottom();var N=this.getInnerColorLeft();}
;I.position=d;var J=this.getInnerWidthTop();if(J>0){I[l]=J+u+this.getStyleTop()+x+L;}
;var J=this.getInnerWidthRight();if(J>0){I[v]=J+u+this.getStyleRight()+x+O;}
;var J=this.getInnerWidthBottom();if(J>0){I[t]=J+u+this.getStyleBottom()+x+M;}
;var J=this.getInnerWidthLeft();if(J>0){I[s]=J+u+this.getStyleLeft()+x+N;}
;if(qx.core.Environment.get(q)){if(!I[l]&&!I[v]&&!I[t]&&!I[s]){throw new Error(F);}
;}
;}
,__rp:function(P){var T=this._generateBackgroundMarkup(P,this._getContent?this._getContent():a);if(qx.core.Environment.get(y)){var R=qx.theme.manager.Color.getInstance();var W=R.resolve(this.getColorTop());var S=R.resolve(this.getColorRight());var Q=R.resolve(this.getColorBottom());var V=R.resolve(this.getColorLeft());}
else {var W=this.getColorTop();var S=this.getColorRight();var Q=this.getColorBottom();var V=this.getColorLeft();}
;P[l]=w;P[v]=w;P[t]=w;P[s]=w;P[o]=0;if((qx.core.Environment.get(p)==m&&parseFloat(qx.core.Environment.get(E))<8)||(qx.core.Environment.get(p)==m&&qx.core.Environment.get(c)<8)){P[o]=w;}
;var U=this.getWidthTop();if(U>0){P[l]=U+u+this.getStyleTop()+x+W;}
;var U=this.getWidthRight();if(U>0){P[v]=U+u+this.getStyleRight()+x+S;}
;var U=this.getWidthBottom();if(U>0){P[t]=U+u+this.getStyleBottom()+x+Q;}
;var U=this.getWidthLeft();if(U>0){P[s]=U+u+this.getStyleLeft()+x+V;}
;if(qx.core.Environment.get(q)){if(P[l]==w&&P[v]==w&&P[t]==w&&P[s]==w){throw new Error(A);}
;}
;P[B]=z;P[i]=0;P[G]=0;return this.__rn=this._generateBackgroundMarkup(P,T);}
,__rq:function(X,Y,ba){var bb=this.getInsets();Y-=bb.left+bb.right;ba-=bb.top+bb.bottom;var bc=bb.left-this.getWidthLeft()-this.getInnerWidthLeft();var top=bb.top-this.getWidthTop()-this.getInnerWidthTop();return {left:bc,top:top,width:Y,height:ba,elementToApplyDimensions:X.firstChild};}
,__rr:function(){return {top:this.getWidthTop()+this.getInnerWidthTop(),right:this.getWidthRight()+this.getInnerWidthRight(),bottom:this.getWidthBottom()+this.getInnerWidthBottom(),left:this.getWidthLeft()+this.getInnerWidthLeft()};}
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
(function(){var cM="checkbox-start",cL="decoration/tabview/tab-button-top-active.png",cK="group-background",cJ="decoration/form/button-c.png",cI="keyboard-focus",cH="button-disabled-start",cG="selected-end",cF="table-header-hovered",cE="decoration/groupbox/groupbox.png",cD="decoration/pane/pane.png",bM="decoration/menu/background.png",bL="decoration/tabview/tabview-pane.png",bK="decoration/toolbar/toolbar-part.gif",bJ="input-focused-css",bI="decoration/menu/bar-background.png",bH="window-border-caption",bG="radiobutton-hovered",bF="tooltip-error-css",bE="radiobutton-checked-focused",bD="groupitem-end",cT="button-disabled-css",cU="group-border",cR="scrollbar-slider-vertical-css",cS="window-css",cP="selected-start",cQ="window-resize-frame-css",cN="tabview-end",cO="window-statusbar-background",cV="decoration/scrollbar/scrollbar-bg-vertical.png",cW="button-pressed-css",cm="toolbar-button-hovered-css",cl="window-caption-active-end",co="dotted",cn="checkbox-disabled-end",cq="window-caption-active-start",cp="button-focused",cs="menu-start",cr="decoration/form/tooltip-error.png",ck="window-captionbar-active-css",cj="qx/decoration/Modern",k="decoration/tabview/tab-button-right-inactive.png",l="border-toolbar-separator-left",m="decoration/form/button-checked.png",n="decoration/scrollbar/scrollbar-bg-horizontal.png",o="decoration/tabview/tab-button-left-active.png",p="decoration/tabview/tab-button-bottom-active.png",q="decoration/tabview/tab-button-bottom-inactive.png",r="decoration/form/button-disabled.png",s="decoration/form/button-pressed.png",t="background-splitpane",dl="decoration/form/button-checked-focused.png",dk="px",dj="decoration/window/statusbar.png",di="input-border-disabled",dq="checkbox-inner",dp="scrollbar-horizontal-css",dn="button-disabled-end",dm="toolbar-end",ds="groupitem-start",dr="decoration/form/button-hovered.png",bd="checkbox-hovered-inner",be="input-focused-start",bb="scrollbar-start",bc="scrollbar-slider-start",bh="radiobutton-checked-disabled",bi="checkbox-focused",bf="qx.theme.modern.Decoration",bg="decoration/form/button.png",Y="decoration/app-header.png",ba="decoration/form/button-focused.png",L="radiobutton-checked-hovered",K="button-hovered-css",N="checkbox-disabled-inner",M="border-toolbar-separator-right",H="border-focused",G="decoration/shadow/shadow.png",J="scrollbar-end",I="decoration/group-item.png",F="window-caption-inactive-end",E="checkbox-end",bn="tabview-inactive-end",bo="input-end",bp="button-checked-focused-css",bq="decoration/tabview/tab-button-left-inactive.png",bj="input-focused-inner-invalid",bk="menu-separator-top",bl="window-caption-inactive-start",bm="scrollbar-slider-end",br="decoration/window/captionbar-inactive.png",bs="decoration/tabview/tab-button-top-inactive.png",V="pane-end",U="input-focused-end",T="decoration/form/tooltip-error-arrow.png",S="menubar-start",R="toolbar-start",Q="checkbox-disabled-start",P="radiobutton-focused",O="pane-start",X="table-focus-indicator",W="button-checked-css",bt="decoration/form/button-checked-c.png",bu="menu-separator-bottom",bv="decoration/shadow/shadow-small.png",bw="input-start",bx="decoration/window/captionbar-active.png",by="decoration/tabview/tab-button-right-active.png",bz="decoration/toolbar/toolbar-gradient.png",bA="checkbox-hovered-inner-invalid",bB="checkbox-disabled-border",bC="button-hovered-end",bQ="repeat-y",bP="border-dragover",bO="button-hovered-start",bN="tooltip-error",bU="progressive-table-header-border-right",bT="decoration/scrollbar/scrollbar-button-bg-vertical.png",bS="radiobutton-background",bR="decoration/form/tooltip-error-arrow-right.png",bW="checkbox-focus",bV="scrollbar-slider-horizontal-css",cf="menu-end",cg="decoration/selection.png",cd="horizontal",ce="table-header-start",cb="decoration/scrollbar/scrollbar-button-bg-horizontal.png",cc="decoration/form/input-focused.png",bY="right",ca="checkbox-hovered-invalid",ch="decoration/table/header-cell.png",ci="tabview-inactive-start",cw="table-header-end",cv="border-button",cy="border-focused-invalid",cx="button-focused-css",cA="checkbox-border",cz="tabview-start",cC="radiobutton-disabled",cB="radiobutton-hovered-invalid",cu="tabview-page-button-top-active-css",ct="button-border-disabled",de="tabview-page-button-top-inactive-css",df="decoration/form/input.png",dg="border-toolbar-border-inner",dh="input-css",da="border-toolbar-button-outer",db="top",dc="border-disabled",dd="background-pane",cX="no-repeat",cY="border-input",j="border-inner-input",i="border-inner-scrollbar",h="radiobutton-checked",g="window-border",f="tabview-inactive",e="checkbox",d="radiobutton",c="button-css",b="border-separator",a="checkbox-hovered",w="button-start",x="button-end",u="background-light",v="tabview-background",A="repeat-x",B="shadow",y="border-invalid",z="border-main",C="scale",D="solid",bX="invalid";qx.Theme.define(bf,{aliases:{decoration:cj},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:z}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:cg,backgroundRepeat:C}},"selected-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient],style:{startColorPosition:0,endColorPosition:100,startColor:cP,endColor:cG}},"selected-dragover":{decorator:qx.ui.decoration.Single,style:{backgroundImage:cg,backgroundRepeat:C,bottom:[2,D,bP]}},"dragover":{decorator:qx.ui.decoration.Single,style:{bottom:[2,D,bP]}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:cD,insets:[0,2,3,0]}},"pane-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MLinearBackgroundGradient],style:{width:1,color:v,radius:3,shadowColor:B,shadowBlurRadius:2,shadowLength:0,gradientStart:[O,0],gradientEnd:[V,100]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:cE}},"group-css":{decorator:[qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MSingleBorder],style:{backgroundColor:cK,radius:4,color:cU,width:1}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bX,innerColor:j,innerOpacity:0.5,backgroundImage:df,backgroundRepeat:A,backgroundColor:u}},"keyboard-focus":{decorator:qx.ui.decoration.Single,style:{width:1,color:cI,style:co}},"radiobutton":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow],style:{backgroundColor:bS,radius:5,width:1,innerWidth:2,color:cA,innerColor:bS,shadowLength:0,shadowBlurRadius:0,shadowColor:bW,insetLeft:5}},"radiobutton-checked":{include:d,style:{backgroundColor:h}},"radiobutton-checked-focused":{include:h,style:{shadowBlurRadius:4}},"radiobutton-checked-hovered":{include:h,style:{innerColor:a}},"radiobutton-focused":{include:d,style:{shadowBlurRadius:4}},"radiobutton-hovered":{include:d,style:{backgroundColor:a,innerColor:a}},"radiobutton-disabled":{include:d,style:{innerColor:cC,backgroundColor:cC,color:bB}},"radiobutton-checked-disabled":{include:cC,style:{backgroundColor:bh}},"radiobutton-invalid":{include:d,style:{color:bX}},"radiobutton-checked-invalid":{include:h,style:{color:bX}},"radiobutton-checked-focused-invalid":{include:bE,style:{color:bX,shadowColor:bX}},"radiobutton-checked-hovered-invalid":{include:L,style:{color:bX,innerColor:cB}},"radiobutton-focused-invalid":{include:P,style:{color:bX,shadowColor:bX}},"radiobutton-hovered-invalid":{include:bG,style:{color:bX,innerColor:cB,backgroundColor:cB}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:b}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:b}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:cr,insets:[2,0,2,2]}},"tooltip-error-css":{decorator:[qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow],style:{backgroundColor:bN,radius:4,shadowColor:B,shadowBlurRadius:2,shadowLength:1,insets:[2,0,0,2]}},"tooltip-error-left":{include:bN,style:{insets:[2,5,5,2]}},"tooltip-error-css-left":{include:bF,style:{insets:[-1,0,0,-2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:T,backgroundPositionY:db,backgroundRepeat:cX,insets:[-4,0,0,13]}},"tooltip-error-arrow-left":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bR,backgroundPositionY:db,backgroundPositionX:bY,backgroundRepeat:cX,insets:[-4,-13,0,0]}},"tooltip-error-arrow-left-css":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bR,backgroundPositionY:db,backgroundPositionX:bY,backgroundRepeat:cX,insets:[-6,-13,0,0]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:G,insets:[0,8,8,0]}},"shadow-window-css":{decorator:[qx.ui.decoration.MBoxShadow,qx.ui.decoration.MBackgroundColor],style:{shadowColor:B,shadowBlurRadius:2,shadowLength:1}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:bv,insets:[0,3,3,0]}},"popup-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MBackgroundColor],style:{width:1,color:z,shadowColor:B,shadowBlurRadius:3,shadowLength:1}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:n,backgroundRepeat:A}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:cV,backgroundRepeat:bQ}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:cb,backgroundRepeat:C,outerColor:z,innerColor:i,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:cb,backgroundRepeat:C,outerColor:dc,innerColor:i,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bT,backgroundRepeat:C,outerColor:z,innerColor:i,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bT,backgroundRepeat:C,outerColor:dc,innerColor:i,innerOpacity:0.3}},"scrollbar-horizontal-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[bb,0],gradientEnd:[J,100]}},"scrollbar-vertical-css":{include:dp,style:{orientation:cd}},"scrollbar-slider-horizontal-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[bc,0],gradientEnd:[bm,100],color:z,width:1}},"scrollbar-slider-vertical-css":{include:bV,style:{orientation:cd}},"scrollbar-slider-horizontal-disabled-css":{include:bV,style:{color:ct}},"scrollbar-slider-vertical-disabled-css":{include:cR,style:{color:ct}},"button-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBorderRadius],style:{radius:3,color:cv,width:1,startColor:w,endColor:x,startColorPosition:35,endColorPosition:100}},"button-disabled-css":{include:c,style:{color:ct,startColor:cH,endColor:dn}},"button-hovered-css":{include:c,style:{startColor:bO,endColor:bC}},"button-checked-css":{include:c,style:{endColor:w,startColor:x}},"button-pressed-css":{include:c,style:{endColor:bO,startColor:bC}},"button-focused-css":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBorderRadius],style:{radius:3,color:cv,width:1,innerColor:cp,innerWidth:2,startColor:w,endColor:x,startColorPosition:30,endColorPosition:100}},"button-checked-focused-css":{include:cx,style:{endColor:w,startColor:x}},"button-invalid-css":{include:c,style:{color:y}},"button-disabled-invalid-css":{include:cT,style:{color:y}},"button-hovered-invalid-css":{include:K,style:{color:y}},"button-checked-invalid-css":{include:W,style:{color:y}},"button-pressed-invalid-css":{include:cW,style:{color:y}},"button-focused-invalid-css":{include:cx,style:{color:y}},"button-checked-focused-invalid-css":{include:bp,style:{color:y}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:bg,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:r,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:ba,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:dr,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:s,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:m,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:dl,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Single,style:{color:bX,width:1,insets:0}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bX,innerColor:cy,insets:[0]}},"checkbox":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBoxShadow],style:{width:1,color:cA,innerWidth:1,innerColor:dq,gradientStart:[cM,0],gradientEnd:[E,100],shadowLength:0,shadowBlurRadius:0,shadowColor:bW,insetLeft:4}},"checkbox-hovered":{include:e,style:{innerColor:bd,gradientStart:[a,0],gradientEnd:[a,100]}},"checkbox-focused":{include:e,style:{shadowBlurRadius:4}},"checkbox-disabled":{include:e,style:{color:bB,innerColor:N,gradientStart:[Q,0],gradientEnd:[cn,100]}},"checkbox-invalid":{include:e,style:{color:bX}},"checkbox-hovered-invalid":{include:a,style:{color:bX,innerColor:bA,gradientStart:[ca,0],gradientEnd:[ca,100]}},"checkbox-focused-invalid":{include:bi,style:{color:bX,shadowColor:bX}},"input-css":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBackgroundColor],style:{color:cY,innerColor:j,innerWidth:1,width:1,backgroundColor:u,startColor:bw,endColor:bo,startColorPosition:0,endColorPosition:12,colorPositionUnit:dk}},"border-invalid-css":{include:dh,style:{color:y}},"input-focused-css":{include:dh,style:{startColor:be,innerColor:U,endColorPosition:4}},"input-focused-invalid-css":{include:bJ,style:{innerColor:bj,color:y}},"input-disabled-css":{include:dh,style:{color:di}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:cY,innerColor:j,innerOpacity:0.5,backgroundImage:df,backgroundRepeat:A,backgroundColor:u}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:cY,innerColor:H,backgroundImage:cc,backgroundRepeat:A,backgroundColor:u}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bX,innerColor:cy,backgroundImage:cc,backgroundRepeat:A,backgroundColor:u,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:dc,innerColor:j,innerOpacity:0.5,backgroundImage:df,backgroundRepeat:A,backgroundColor:u}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bz,backgroundRepeat:C}},"toolbar-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient],style:{startColorPosition:40,endColorPosition:60,startColor:R,endColor:dm}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:da,innerColor:dg,backgroundImage:cJ,backgroundRepeat:C}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:da,innerColor:dg,backgroundImage:bt,backgroundRepeat:C}},"toolbar-button-hovered-css":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBorderRadius],style:{color:da,width:1,innerWidth:1,innerColor:dg,radius:2,gradientStart:[w,30],gradientEnd:[x,100]}},"toolbar-button-checked-css":{include:cm,style:{gradientStart:[x,30],gradientEnd:[w,100]}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:l,colorRight:M,styleLeft:D,styleRight:D}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bK,backgroundRepeat:bQ}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:bL,insets:[4,6,7,4]}},"tabview-pane-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MSingleBorder],style:{width:1,color:g,radius:3,gradientStart:[cz,90],gradientEnd:[cN,100]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:cL}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bs}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:p}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:q}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:o}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bq}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:by}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:k}},"tabview-page-button-top-active-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBoxShadow],style:{radius:[3,3,0,0],width:[1,1,0,1],color:v,backgroundColor:cz,shadowLength:1,shadowColor:B,shadowBlurRadius:2}},"tabview-page-button-top-inactive-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{radius:[3,3,0,0],color:f,colorBottom:v,width:1,gradientStart:[ci,0],gradientEnd:[bn,100]}},"tabview-page-button-bottom-active-css":{include:cu,style:{radius:[0,0,3,3],width:[0,1,1,1],backgroundColor:ci}},"tabview-page-button-bottom-inactive-css":{include:de,style:{radius:[0,0,3,3],width:[0,1,1,1],colorBottom:f,colorTop:v}},"tabview-page-button-left-active-css":{include:cu,style:{radius:[3,0,0,3],width:[1,0,1,1],shadowLength:0,shadowBlurRadius:0}},"tabview-page-button-left-inactive-css":{include:de,style:{radius:[3,0,0,3],width:[1,0,1,1],colorBottom:f,colorRight:v}},"tabview-page-button-right-active-css":{include:cu,style:{radius:[0,3,3,0],width:[1,1,1,0],shadowLength:0,shadowBlurRadius:0}},"tabview-page-button-right-inactive-css":{include:de,style:{radius:[0,3,3,0],width:[1,1,1,0],colorBottom:f,colorLeft:v}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:dd,width:3,color:t,style:D}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:dd,width:1,color:z,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bx}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:br}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:dj}},"window-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MSingleBorder],style:{radius:[5,5,0,0],shadowBlurRadius:4,shadowLength:2,shadowColor:B}},"window-incl-statusbar-css":{include:cS,style:{radius:[5,5,5,5]}},"window-resize-frame-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MSingleBorder],style:{radius:[5,5,0,0],width:1,color:z}},"window-resize-frame-incl-statusbar-css":{include:cQ,style:{radius:[5,5,5,5]}},"window-captionbar-active-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MLinearBackgroundGradient],style:{width:1,color:g,colorBottom:bH,radius:[5,5,0,0],gradientStart:[cq,30],gradientEnd:[cl,70]}},"window-captionbar-inactive-css":{include:ck,style:{gradientStart:[bl,30],gradientEnd:[F,70]}},"window-statusbar-css":{decorator:[qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBorderRadius],style:{backgroundColor:cO,width:[0,1,1,1],color:g,radius:[0,0,5,5]}},"window-pane-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundColor],style:{backgroundColor:dd,width:1,color:g,widthTop:0}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:z,style:D}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:z,style:D}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:ch,backgroundRepeat:C,widthBottom:1,colorBottom:z,style:D}},"table-scroller-header-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[ce,10],gradientEnd:[cw,90],widthBottom:1,colorBottom:z}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:b,styleRight:D}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:b,styleRight:D,widthBottom:1,colorBottom:cF,styleBottom:D}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:X,style:D}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:z,style:D}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:ch,backgroundRepeat:C,widthRight:1,colorRight:bU,style:D}},"progressive-table-header-cell-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[ce,10],gradientEnd:[cw,90],widthRight:1,colorRight:bU}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bM,backgroundRepeat:C,width:1,color:z,style:D}},"menu-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MSingleBorder],style:{gradientStart:[cs,0],gradientEnd:[cf,100],shadowColor:B,shadowBlurRadius:2,shadowLength:1,width:1,color:z}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:bk,widthBottom:1,colorBottom:bu}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bI,backgroundRepeat:C,width:1,color:b,style:D}},"menubar-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[S,0],gradientEnd:[cf,100],width:1,color:b}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:Y,backgroundRepeat:C}},"progressbar":{decorator:qx.ui.decoration.Single,style:{width:1,color:cY}},"group-item":{decorator:qx.ui.decoration.Background,style:{backgroundImage:I,backgroundRepeat:C}},"group-item-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient],style:{startColorPosition:0,endColorPosition:100,startColor:ds,endColor:bD}}}});}
)();
(function(){var bB="black",bA="#ffffdd",bz="#b6b6b6",by="#004DAD",bx="#BABABA",bw="#005BC3",bv="#334866",bu="#CECECE",bt="#D9D9D9",bs="#D8D8D8",bh="#99C3FE",bg="#001533",bf="#B3B3B3",be="#D5D5D5",bd="#C3C3C3",bc="#DDDDDD",bb="#FF9999",ba="css.rgba",Y="#E8E8E9",X="#084FAA",bI="#C5C5C5",bJ="rgba(0, 0, 0, 0.4)",bG="#DBDBDB",bH="#4a4a4a",bE="#83BAEA",bF="#D7E7F4",bC="#07125A",bD="#FAF2F2",bK="#87AFE7",bL="#F7EAEA",bl="#777D8D",bk="#FBFBFB",bn="#CACACA",bm="#909090",bp="#9B9B9B",bo="#F0F9FE",br="#314a6e",bq="#B4B4B4",bj="#787878",bi="qx.theme.modern.Color",a="#000000",b="#26364D",c="#A7A7A7",d="#D1E4FF",e="#5CB0FD",f="#EAEAEA",g="#003B91",h="#80B4EF",i="#FF6B78",j="#949494",bP="#808080",bO="#930000",bN="#7B7B7B",bM="#C82C2C",bT="#DFDFDF",bS="#B6B6B6",bR="#0880EF",bQ="#4d4d4d",bV="#f4f4f4",bU="#7B7A7E",H="#D0D0D0",I="#f8f8f8",F="#404955",G="#959595",L="#AAAAAA",M="#F7E9E9",J="#314A6E",K="#C72B2B",D="#FAFAFA",E="#FBFCFB",r="#B2D2FF",q="#666666",t="#CBC8CD",s="#999999",n="#8EB8D6",m="#b8b8b8",p="#727272",o="#33508D",l="#F1F1F1",k="#990000",R="#00368A",S="#1a1a1a",T="#00204D",U="gray",N="#F4F4F4",O="#fffefe",P="#AFAFAF",Q="#084FAB",V="#FCFCFC",W="#CCC",B="#F2F2F2",A="#F0F0F0",z="#E8E8E8",y="#CCCCCC",x="#EFEFEF",w="#EEEEEE",v="#E4E4E4",u="#F3F3F3",C="white";qx.Theme.define(bi,{colors:{"background-application":bT,"background-pane":u,"background-light":V,"background-medium":w,"background-splitpane":P,"background-tip":bA,"background-tip-error":K,"background-odd":v,"htmlarea-background":C,"progressbar-background":C,"text-light":bm,"text-gray":bH,"text-label":S,"text-title":br,"text-input":a,"text-hovered":bg,"text-disabled":bU,"text-selected":O,"text-active":b,"text-inactive":F,"text-placeholder":t,"border-inner-scrollbar":C,"border-main":bQ,"menu-separator-top":bI,"menu-separator-bottom":D,"border-separator":bP,"border-toolbar-button-outer":bz,"border-toolbar-border-inner":I,"border-toolbar-separator-right":bV,"border-toolbar-separator-left":m,"border-input":bv,"border-inner-input":C,"border-disabled":bS,"border-pane":T,"border-button":q,"border-column":y,"border-focused":bh,"invalid":k,"border-focused-invalid":bb,"border-dragover":o,"keyboard-focus":bB,"table-pane":u,"table-focus-indicator":bR,"table-row-background-focused-selected":Q,"table-row-background-focused":h,"table-row-background-selected":Q,"table-row-background-even":u,"table-row-background-odd":v,"table-row-selected":O,"table-row":S,"table-row-line":W,"table-column-line":W,"table-header-hovered":C,"progressive-table-header":L,"progressive-table-header-border-right":B,"progressive-table-row-background-even":N,"progressive-table-row-background-odd":v,"progressive-progressbar-background":U,"progressive-progressbar-indicator-done":y,"progressive-progressbar-indicator-undone":C,"progressive-progressbar-percent-background":U,"progressive-progressbar-percent-text":C,"selected-start":by,"selected-end":R,"tabview-background":bC,"shadow":qx.core.Environment.get(ba)?bJ:s,"pane-start":bk,"pane-end":A,"group-background":z,"group-border":bq,"radiobutton-background":x,"checkbox-border":J,"checkbox-focus":bK,"checkbox-hovered":r,"checkbox-hovered-inner":d,"checkbox-inner":w,"checkbox-start":v,"checkbox-end":u,"checkbox-disabled-border":bj,"checkbox-disabled-inner":bn,"checkbox-disabled-start":H,"checkbox-disabled-end":bs,"checkbox-hovered-inner-invalid":bD,"checkbox-hovered-invalid":M,"radiobutton-checked":bw,"radiobutton-disabled":be,"radiobutton-checked-disabled":bN,"radiobutton-hovered-invalid":bL,"tooltip-error":bM,"scrollbar-start":y,"scrollbar-end":l,"scrollbar-slider-start":w,"scrollbar-slider-end":bd,"button-border-disabled":G,"button-start":A,"button-end":P,"button-disabled-start":N,"button-disabled-end":bx,"button-hovered-start":bo,"button-hovered-end":n,"button-focused":bE,"border-invalid":bO,"input-start":A,"input-end":E,"input-focused-start":bF,"input-focused-end":e,"input-focused-inner-invalid":i,"input-border-disabled":bp,"input-border-inner":C,"toolbar-start":x,"toolbar-end":bc,"window-border":T,"window-border-caption":p,"window-caption-active-text":C,"window-caption-active-start":X,"window-caption-active-end":g,"window-caption-inactive-start":B,"window-caption-inactive-end":bG,"window-statusbar-background":x,"tabview-start":V,"tabview-end":w,"tabview-inactive":bl,"tabview-inactive-start":f,"tabview-inactive-end":bu,"table-header-start":z,"table-header-end":bf,"menu-start":Y,"menu-end":bt,"menubar-start":z,"groupitem-start":c,"groupitem-end":j,"groupitem-text":C,"virtual-row-layer-background-even":C,"virtual-row-layer-background-odd":C}});}
)();
(function(){var t="monospace",s="Courier New",r="Lucida Console",q="Monaco",p="qx.theme.modern.Font",o="DejaVu Sans Mono",n="Consolas",m="Liberation Sans",l="Tahoma",k="sans-serif",d="Arial",j="Lucida Grande",g="Candara",c="Segoe UI",b="osx",f="win",e="7",h="vista",a="os.name",i="os.version";qx.Theme.define(p,{fonts:{"default":{size:(qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h))?12:11,lineHeight:1.4,family:qx.core.Environment.get(a)==b?[j]:((qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h)))?[c,g]:[l,m,d,k]},"bold":{size:(qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h))?12:11,lineHeight:1.4,family:qx.core.Environment.get(a)==b?[j]:((qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h)))?[c,g]:[l,m,d,k],bold:true},"small":{size:(qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h))?11:10,lineHeight:1.4,family:qx.core.Environment.get(a)==b?[j]:((qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h)))?[c,g]:[l,m,d,k]},"monospace":{size:11,lineHeight:1.4,family:qx.core.Environment.get(a)==b?[r,q]:((qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h)))?[n]:[n,o,s,t]}}});}
)();
(function(){var b="qx.theme.Modern",a="Modern";qx.Theme.define(b,{title:a,meta:{color:qx.theme.modern.Color,decoration:qx.theme.modern.Decoration,font:qx.theme.modern.Font,appearance:qx.theme.modern.Appearance,icon:qx.theme.icon.Tango}});}
)();
(function(){var l="Use qx.dev.StackTrace.FORMAT_STACKTRACE instead",k="function",h="<span class='object'>",g="]:",f="&gt;",e="<span class='object' title='Object instance with hash code: ",d="FORMAT_STACK",c="string",b="level-",a="0",M="&lt;",L="<span class='offset'>",K=":",J="qx.log.appender.Util",I="&amp;",H="&#39;",G="DIV",F="<span>",E="&quot;",D="<span class='type-key'>",s="</span>:<span class='type-",t="</span>: ",q=" ",r="]</span>: ",o="?",p="</span> ",m="}",n="",u="]",v="\n",y="{",x="map",A="<span class='type-",z="[",C=", ",B="</span>",w="'>";qx.Class.define(J,{statics:{toHtml:function(N){var X=[];var U,W,P,R;X.push(L,this.formatOffset(N.offset,6),p);if(N.object){var O=N.win.qx.core.ObjectRegistry.fromHashCode(N.object);if(O){X.push(e+O.$$hash+w,O.classname,z,O.$$hash,r);}
;}
else if(N.clazz){X.push(h+N.clazz.classname,t);}
;var Q=N.items;for(var i=0,V=Q.length;i<V;i++){U=Q[i];W=U.text;if(W instanceof Array){var R=[];for(var j=0,T=W.length;j<T;j++){P=W[j];if(typeof P===c){R.push(F+this.escapeHTML(P)+B);}
else if(P.key){R.push(D+P.key+s+P.type+w+this.escapeHTML(P.text)+B);}
else {R.push(A+P.type+w+this.escapeHTML(P.text)+B);}
;}
;X.push(A+U.type+w);if(U.type===x){X.push(y,R.join(C),m);}
else {X.push(z,R.join(C),u);}
;X.push(B);}
else {X.push(A+U.type+w+this.escapeHTML(W)+p);}
;}
;var S=document.createElement(G);S.innerHTML=X.join(n);S.className=b+N.level;return S;}
,formatOffset:function(Y,length){var bc=Y.toString();var ba=(length||6)-bc.length;var bb=n;for(var i=0;i<ba;i++){bb+=a;}
;return bb+bc;}
,escapeHTML:function(bd){return String(bd).replace(/[<>&"']/g,this.__yI);}
,__yI:function(be){var bf={"<":M,">":f,"&":I,"'":H,'"':E};return bf[be]||o;}
,toText:function(bg){return this.toTextArray(bg).join(q);}
,toTextArray:function(bh){var bp=[];bp.push(this.formatOffset(bh.offset,6));if(bh.object){var bi=bh.win.qx.core.ObjectRegistry.fromHashCode(bh.object);if(bi){bp.push(bi.classname+z+bi.$$hash+g);}
;}
else if(bh.clazz){bp.push(bh.clazz.classname+K);}
;var bj=bh.items;var bm,bo;for(var i=0,bn=bj.length;i<bn;i++){bm=bj[i];bo=bm.text;if(bm.trace&&bm.trace.length>0){if(typeof (this.FORMAT_STACK)==k){qx.log.Logger.deprecatedConstantWarning(qx.log.appender.Util,d,l);bo+=v+this.FORMAT_STACK(bm.trace);}
else {bo+=v+bm.trace;}
;}
;if(bo instanceof Array){var bk=[];for(var j=0,bl=bo.length;j<bl;j++){bk.push(bo[j].text);}
;if(bm.type===x){bp.push(y,bk.join(C),m);}
else {bp.push(z,bk.join(C),u);}
;}
else {bp.push(bo);}
;}
;return bp;}
}});}
)();
(function(){var c="html.console",b="qx.log.appender.Native",a="log";qx.Class.define(b,{statics:{process:function(d){if(qx.core.Environment.get(c)){var f=console[d.level]?d.level:a;if(console[f]){var e=qx.log.appender.Util.toText(d);console[f](e);}
;}
;}
},defer:function(g){qx.log.Logger.register(g);}
});}
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
(function(){var a="qx.event.handler.UserAction";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);this.__ef=b;this.__ce=b.getWindow();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__ef:null,__ce:null,canHandleEvent:function(c,d){}
,registerEvent:function(e,f,g){}
,unregisterEvent:function(h,i,j){}
},destruct:function(){this.__ef=this.__ce=null;}
,defer:function(k){qx.event.Registration.addHandler(k);}
});}
)();
(function(){var j="text",i="os.name",h="F11",g="PrintScreen",f="PageUp",e="gecko",d="F1",c="Left",b="F5",a="Down",V="Up",U="F3",T="Use qx.event.util.Keyboard.isValidKeyIdentifier instead.",S="Use qx.event.util.Keyboard.keyCodeToIdentifier instead.",R="F6",Q="Insert",P="F8",O="input",N="End",M="Delete",q="qx.event.handler.Keyboard",r="win",o="Use qx.event.util.Keyboard.isNonPrintableKeyCode instead.",p="Home",m="F2",n="Use qx.event.util.Keyboard.charCodeToIdentifier instead.",k="Use qx.event.util.Keyboard.isPrintableKeyIdentifier instead.",l="Right",s="F12",t="F4",A="PageDown",y="F7",E="Use qx.event.util.Keyboard.isIdentifiableKeyCode instead.",C="F9",I="F10",G="off",v="autoComplete",L="Enter",K="NumLock",J="useraction",u="keyinput",w="mshtml",x="webkit",z="engine.version",B="keyup",D="keypress",F="engine.name",H="keydown";qx.Class.define(q,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(W){qx.core.Object.call(this);this.__ef=W;this.__ce=W.getWindow();if((qx.core.Environment.get(F)==e)){this.__fT=this.__ce;}
else {this.__fT=this.__ce.document.documentElement;}
;this.__lt={};this._initKeyObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(X){qx.log.Logger.deprecatedMethodWarning(arguments.callee,T);return qx.event.util.Keyboard.isValidKeyIdentifier(X);}
,isPrintableKeyIdentifier:function(Y){qx.log.Logger.deprecatedMethodWarning(arguments.callee,k);return qx.event.util.Keyboard.isPrintableKeyIdentifier(Y);}
},members:{__lu:null,__ef:null,__ce:null,__fT:null,__lt:null,__lv:null,__lw:null,__lx:null,canHandleEvent:function(ba,bb){}
,registerEvent:function(bc,bd,be){}
,unregisterEvent:function(bf,bg,bh){}
,_fireInputEvent:function(bi,bj){var bk=this.__ly();if(bk&&bk.offsetWidth!=0){var event=qx.event.Registration.createEvent(u,qx.event.type.KeyInput,[bi,bk,bj]);this.__ef.dispatchEvent(bk,event);}
;if(this.__ce){qx.event.Registration.fireEvent(this.__ce,J,qx.event.type.Data,[u]);}
;}
,_fireSequenceEvent:function(bl,bm,bn){var bo=this.__ly();var bp=bl.keyCode;var event=qx.event.Registration.createEvent(bm,qx.event.type.KeySequence,[bl,bo,bn]);this.__ef.dispatchEvent(bo,event);if(qx.core.Environment.get(F)==w||qx.core.Environment.get(F)==x){if(bm==H&&event.getDefaultPrevented()){if(!qx.event.util.Keyboard.isNonPrintableKeyCode(bp)&&!this._emulateKeyPress[bp]){this._fireSequenceEvent(bl,D,bn);}
;}
;}
;if(this.__ce){qx.event.Registration.fireEvent(this.__ce,J,qx.event.type.Data,[bm]);}
;}
,__ly:function(){var bq=this.__ef.getHandler(qx.event.handler.Focus);var br=bq.getActive();if(!br||br.offsetWidth==0){br=bq.getFocus();}
;if(!br||br.offsetWidth==0){br=this.__ef.getWindow().document.body;}
;return br;}
,_initKeyObserver:function(){this.__lu=qx.lang.Function.listener(this.__lz,this);this.__lx=qx.lang.Function.listener(this.__gy,this);var Event=qx.bom.Event;Event.addNativeListener(this.__fT,B,this.__lu);Event.addNativeListener(this.__fT,H,this.__lu);Event.addNativeListener(this.__fT,D,this.__lx);}
,_stopKeyObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__fT,B,this.__lu);Event.removeNativeListener(this.__fT,H,this.__lu);Event.removeNativeListener(this.__fT,D,this.__lx);for(var bt in (this.__lw||{})){var bs=this.__lw[bt];Event.removeNativeListener(bs.target,D,bs.callback);}
;delete (this.__lw);}
,__lz:qx.event.GlobalError.observeMethod(qx.core.Environment.select(F,{"mshtml":function(bu){bu=window.event||bu;var bx=bu.keyCode;var bv=0;var bw=bu.type;if(!(this.__lt[bx]==H&&bw==H)){this._idealKeyHandler(bx,bv,bw,bu);}
;if(bw==H){if(qx.event.util.Keyboard.isNonPrintableKeyCode(bx)||this._emulateKeyPress[bx]){this._idealKeyHandler(bx,bv,D,bu);}
;}
;this.__lt[bx]=bw;}
,"gecko":function(by){var bA=0;var bC=by.keyCode;var bB=by.type;var bz=qx.event.util.Keyboard;if(qx.core.Environment.get(i)==r){var bD=bC?bz.keyCodeToIdentifier(bC):bz.charCodeToIdentifier(bA);if(!(this.__lt[bD]==H&&bB==H)){this._idealKeyHandler(bC,bA,bB,by);}
;this.__lt[bD]=bB;}
else {this._idealKeyHandler(bC,bA,bB,by);}
;this.__lA(by.target,bB,bC);}
,"webkit":function(bE){var bH=0;var bF=0;var bG=bE.type;if(parseFloat(qx.core.Environment.get(z))<525.13){if(bG==B||bG==H){bH=this._charCode2KeyCode[bE.charCode]||bE.keyCode;}
else {if(this._charCode2KeyCode[bE.charCode]){bH=this._charCode2KeyCode[bE.charCode];}
else {bF=bE.charCode;}
;}
;this._idealKeyHandler(bH,bF,bG,bE);}
else {bH=bE.keyCode;this._idealKeyHandler(bH,bF,bG,bE);if(bG==H){if(qx.event.util.Keyboard.isNonPrintableKeyCode(bH)||this._emulateKeyPress[bH]){this._idealKeyHandler(bH,bF,D,bE);}
;}
;this.__lt[bH]=bG;}
;}
,"opera":function(bI){this.__lv=bI.keyCode;this._idealKeyHandler(bI.keyCode,0,bI.type,bI);}
})),__lA:qx.core.Environment.select(F,{"gecko":function(bJ,bK,bL){if(bK===H&&(bL==33||bL==34||bL==38||bL==40)&&bJ.type==j&&bJ.tagName.toLowerCase()===O&&bJ.getAttribute(v)!==G){if(!this.__lw){this.__lw={};}
;var bN=qx.core.ObjectRegistry.toHashCode(bJ);if(this.__lw[bN]){return;}
;var self=this;this.__lw[bN]={target:bJ,callback:function(bO){qx.bom.Event.stopPropagation(bO);self.__gy(bO);}
};var bM=qx.event.GlobalError.observeMethod(this.__lw[bN].callback);qx.bom.Event.addNativeListener(bJ,D,bM);}
;}
,"default":null}),__gy:qx.event.GlobalError.observeMethod(qx.core.Environment.select(F,{"mshtml":function(bP){bP=window.event||bP;if(this._charCode2KeyCode[bP.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bP.keyCode],0,bP.type,bP);}
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
,"opera":function(bX){var ca=bX.keyCode;var bY=bX.type;if(ca!=this.__lv){this._idealKeyHandler(0,this.__lv,bY,bX);}
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
},destruct:function(){this._stopKeyObserver();this.__lv=this.__ef=this.__ce=this.__fT=this.__lt=null;}
,defer:function(cl,cm){qx.event.Registration.addHandler(cl);if((qx.core.Environment.get(F)==w)){cm._charCode2KeyCode={'13':13,'27':27};}
else if((qx.core.Environment.get(F)==x)){if(parseFloat(qx.core.Environment.get(z))<525.13){cm._charCode2KeyCode={'63289':cm._identifierToKeyCode(K),'63276':cm._identifierToKeyCode(f),'63277':cm._identifierToKeyCode(A),'63275':cm._identifierToKeyCode(N),'63273':cm._identifierToKeyCode(p),'63234':cm._identifierToKeyCode(c),'63232':cm._identifierToKeyCode(V),'63235':cm._identifierToKeyCode(l),'63233':cm._identifierToKeyCode(a),'63272':cm._identifierToKeyCode(M),'63302':cm._identifierToKeyCode(Q),'63236':cm._identifierToKeyCode(d),'63237':cm._identifierToKeyCode(m),'63238':cm._identifierToKeyCode(U),'63239':cm._identifierToKeyCode(t),'63240':cm._identifierToKeyCode(b),'63241':cm._identifierToKeyCode(R),'63242':cm._identifierToKeyCode(y),'63243':cm._identifierToKeyCode(P),'63244':cm._identifierToKeyCode(C),'63245':cm._identifierToKeyCode(I),'63246':cm._identifierToKeyCode(h),'63247':cm._identifierToKeyCode(s),'63248':cm._identifierToKeyCode(g),'3':cm._identifierToKeyCode(L),'12':cm._identifierToKeyCode(K),'13':cm._identifierToKeyCode(L)};}
else {cm._charCode2KeyCode={'13':13,'27':27};}
;}
;}
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
,properties:{active:{apply:f,nullable:true},focus:{apply:i,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Environment.select("engine.name",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__hD:null,__hE:null,__hF:null,__hG:null,__hH:null,__hI:null,__hJ:null,__hK:null,__hL:null,__hM:null,canHandleEvent:function(B,C){}
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
,tryActivate:function(S){var T=this.__ib(S);if(T){this.setActive(T);}
;}
,__hh:function(U,V,W,X){var ba=qx.event.Registration;var Y=ba.createEvent(W,qx.event.type.Focus,[U,V,X]);ba.dispatchEvent(U,Y);}
,_windowFocused:true,__hN:function(){if(this._windowFocused){this._windowFocused=false;this.__hh(this._window,null,p,false);}
;}
,__hO:function(){if(!this._windowFocused){this._windowFocused=true;this.__hh(this._window,null,m,false);}
;}
,_initObserver:qx.core.Environment.select(l,{"gecko":function(){this.__hD=qx.lang.Function.listener(this.__hU,this);this.__hE=qx.lang.Function.listener(this.__hV,this);this.__hF=qx.lang.Function.listener(this.__hT,this);this.__hG=qx.lang.Function.listener(this.__hS,this);this.__hH=qx.lang.Function.listener(this.__hP,this);qx.bom.Event.addNativeListener(this._document,n,this.__hD,true);qx.bom.Event.addNativeListener(this._document,k,this.__hE,true);qx.bom.Event.addNativeListener(this._window,m,this.__hF,true);qx.bom.Event.addNativeListener(this._window,p,this.__hG,true);qx.bom.Event.addNativeListener(this._window,u,this.__hH,true);}
,"mshtml":function(){this.__hD=qx.lang.Function.listener(this.__hU,this);this.__hE=qx.lang.Function.listener(this.__hV,this);this.__hJ=qx.lang.Function.listener(this.__hQ,this);this.__hK=qx.lang.Function.listener(this.__hR,this);this.__hI=qx.lang.Function.listener(this.__hX,this);qx.bom.Event.addNativeListener(this._document,n,this.__hD);qx.bom.Event.addNativeListener(this._document,k,this.__hE);qx.bom.Event.addNativeListener(this._document,t,this.__hJ);qx.bom.Event.addNativeListener(this._document,s,this.__hK);qx.bom.Event.addNativeListener(this._document,r,this.__hI);}
,"webkit":function(){this.__hD=qx.lang.Function.listener(this.__hU,this);this.__hE=qx.lang.Function.listener(this.__hV,this);this.__hK=qx.lang.Function.listener(this.__hR,this);this.__hF=qx.lang.Function.listener(this.__hT,this);this.__hG=qx.lang.Function.listener(this.__hS,this);this.__hI=qx.lang.Function.listener(this.__hX,this);qx.bom.Event.addNativeListener(this._document,n,this.__hD,true);qx.bom.Event.addNativeListener(this._document,k,this.__hE,true);qx.bom.Event.addNativeListener(this._document,r,this.__hI,false);qx.bom.Event.addNativeListener(this._window,q,this.__hK,true);qx.bom.Event.addNativeListener(this._window,m,this.__hF,true);qx.bom.Event.addNativeListener(this._window,p,this.__hG,true);}
,"opera":function(){this.__hD=qx.lang.Function.listener(this.__hU,this);this.__hE=qx.lang.Function.listener(this.__hV,this);this.__hJ=qx.lang.Function.listener(this.__hQ,this);this.__hK=qx.lang.Function.listener(this.__hR,this);qx.bom.Event.addNativeListener(this._document,n,this.__hD,true);qx.bom.Event.addNativeListener(this._document,k,this.__hE,true);qx.bom.Event.addNativeListener(this._window,v,this.__hJ,true);qx.bom.Event.addNativeListener(this._window,q,this.__hK,true);}
}),_stopObserver:qx.core.Environment.select(l,{"gecko":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__hD,true);qx.bom.Event.removeNativeListener(this._document,k,this.__hE,true);qx.bom.Event.removeNativeListener(this._window,m,this.__hF,true);qx.bom.Event.removeNativeListener(this._window,p,this.__hG,true);qx.bom.Event.removeNativeListener(this._window,u,this.__hH,true);}
,"mshtml":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__hD);qx.bom.Event.removeNativeListener(this._document,k,this.__hE);qx.bom.Event.removeNativeListener(this._document,t,this.__hJ);qx.bom.Event.removeNativeListener(this._document,s,this.__hK);qx.bom.Event.removeNativeListener(this._document,r,this.__hI);}
,"webkit":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__hD,true);qx.bom.Event.removeNativeListener(this._document,k,this.__hE,true);qx.bom.Event.removeNativeListener(this._document,r,this.__hI,false);qx.bom.Event.removeNativeListener(this._window,q,this.__hK,true);qx.bom.Event.removeNativeListener(this._window,m,this.__hF,true);qx.bom.Event.removeNativeListener(this._window,p,this.__hG,true);}
,"opera":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__hD,true);qx.bom.Event.removeNativeListener(this._document,k,this.__hE,true);qx.bom.Event.removeNativeListener(this._window,v,this.__hJ,true);qx.bom.Event.removeNativeListener(this._window,q,this.__hK,true);}
}),__hP:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"gecko":function(bb){var bc=qx.bom.Event.getTarget(bb);if(!this.__ic(bc)){qx.bom.Event.preventDefault(bb);}
;}
,"default":null})),__hQ:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bd){this.__hO();var bf=qx.bom.Event.getTarget(bd);var be=this.__ia(bf);if(be){this.setFocus(be);}
;this.tryActivate(bf);}
,"opera":function(bg){var bh=qx.bom.Event.getTarget(bg);if(bh==this._document||bh==this._window){this.__hO();if(this.__hL){this.setFocus(this.__hL);delete this.__hL;}
;if(this.__hM){this.setActive(this.__hM);delete this.__hM;}
;}
else {this.setFocus(bh);this.tryActivate(bh);if(!this.__ic(bh)){bh.selectionStart=0;bh.selectionEnd=0;}
;}
;}
,"default":null})),__hR:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bi){var bj=qx.bom.Event.getRelatedTarget(bi);if(bj==null){this.__hN();this.resetFocus();this.resetActive();}
;}
,"webkit":function(bk){var bl=qx.bom.Event.getTarget(bk);if(bl===this.getFocus()){this.resetFocus();}
;if(bl===this.getActive()){this.resetActive();}
;}
,"opera":function(bm){var bn=qx.bom.Event.getTarget(bm);if(bn==this._document){this.__hN();this.__hL=this.getFocus();this.__hM=this.getActive();this.resetFocus();this.resetActive();}
else {if(bn===this.getFocus()){this.resetFocus();}
;if(bn===this.getActive()){this.resetActive();}
;}
;}
,"default":null})),__hS:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"gecko":function(bo){var bp=qx.bom.Event.getTarget(bo);if(bp===this._window||bp===this._document){this.__hN();this.resetActive();this.resetFocus();}
;}
,"webkit":function(bq){var br=qx.bom.Event.getTarget(bq);if(br===this._window||br===this._document){this.__hN();this.__hL=this.getFocus();this.__hM=this.getActive();this.resetActive();this.resetFocus();}
;}
,"default":null})),__hT:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"gecko":function(bs){var bt=qx.bom.Event.getTarget(bs);if(bt===this._window||bt===this._document){this.__hO();bt=this._body;}
;this.setFocus(bt);this.tryActivate(bt);}
,"webkit":function(bu){var bv=qx.bom.Event.getTarget(bu);if(bv===this._window||bv===this._document){this.__hO();if(this.__hL){this.setFocus(this.__hL);delete this.__hL;}
;if(this.__hM){this.setActive(this.__hM);delete this.__hM;}
;}
else {this.setFocus(bv);this.tryActivate(bv);}
;}
,"default":null})),__hU:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bw){var by=qx.bom.Event.getTarget(bw);var bx=this.__ia(by);if(bx){if(!this.__ic(by)){by.unselectable=o;try{document.selection.empty();}
catch(bz){}
;try{bx.focus();}
catch(bA){}
;}
;}
else {qx.bom.Event.preventDefault(bw);if(!this.__ic(by)){by.unselectable=o;}
;}
;}
,"webkit|gecko":function(bB){var bD=qx.bom.Event.getTarget(bB);var bC=this.__ia(bD);if(bC){this.setFocus(bC);}
else {qx.bom.Event.preventDefault(bB);}
;}
,"opera":function(bE){var bH=qx.bom.Event.getTarget(bE);var bF=this.__ia(bH);if(!this.__ic(bH)){qx.bom.Event.preventDefault(bE);if(bF){var bG=this.getFocus();if(bG&&bG.selectionEnd){bG.selectionStart=0;bG.selectionEnd=0;bG.blur();}
;if(bF){this.setFocus(bF);}
;}
;}
else if(bF){this.setFocus(bF);}
;}
,"default":null})),__hV:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bI){var bJ=qx.bom.Event.getTarget(bI);if(bJ.unselectable){bJ.unselectable=a;}
;this.tryActivate(this.__hW(bJ));}
,"gecko":function(bK){var bL=qx.bom.Event.getTarget(bK);while(bL&&bL.offsetWidth===undefined){bL=bL.parentNode;}
;if(bL){this.tryActivate(bL);}
;}
,"webkit|opera":function(bM){var bN=qx.bom.Event.getTarget(bM);this.tryActivate(this.__hW(bN));}
,"default":null})),__hW:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml|webkit":function(bO){var bP=this.getFocus();if(bP&&bO!=bP&&(bP.nodeName.toLowerCase()===d||bP.nodeName.toLowerCase()===g)){bO=bP;}
;return bO;}
,"default":function(bQ){return bQ;}
})),__hX:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml|webkit":function(bR){var bS=qx.bom.Event.getTarget(bR);if(!this.__ic(bS)){qx.bom.Event.preventDefault(bR);}
;}
,"default":null})),__hY:function(bT){var bU=qx.bom.element.Attribute.get(bT,b);if(bU>=1){return true;}
;var bV=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;if(bU>=0&&bV[bT.tagName]){return true;}
;return false;}
,__ia:function(bW){while(bW&&bW.nodeType===1){if(bW.getAttribute(x)==o){return null;}
;if(this.__hY(bW)){return bW;}
;bW=bW.parentNode;}
;return this._body;}
,__ib:function(bX){var bY=bX;while(bX&&bX.nodeType===1){if(bX.getAttribute(w)==o){return null;}
;bX=bX.parentNode;}
;return bY;}
,__ic:function(ca){while(ca&&ca.nodeType===1){var cb=ca.getAttribute(c);if(cb!=null){return cb===o;}
;ca=ca.parentNode;}
;return true;}
,_applyActive:function(cc,cd){if(cd){this.__hh(cd,cc,h,true);}
;if(cc){this.__hh(cc,cd,z,true);}
;}
,_applyFocus:function(ce,cf){if(cf){this.__hh(cf,ce,s,true);}
;if(ce){this.__hh(ce,cf,t,true);}
;if(cf){this.__hh(cf,ce,p,false);}
;if(ce){this.__hh(ce,cf,m,false);}
;}
},destruct:function(){this._stopObserver();this._manager=this._window=this._document=this._root=this._body=this.__id=null;}
,defer:function(cg){qx.event.Registration.addHandler(cg);var ch=cg.FOCUSABLE_ELEMENTS;for(var ci in ch){ch[ci.toUpperCase()]=1;}
;}
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
(function(){var k="qx.bom.Selection",j="button",i="#text",h="body",g='character',f="input",e="StartToStart",d="textarea",c="EndToEnd",b="character",a="engine.name";qx.Class.define(k,{statics:{getSelectionObject:qx.core.Environment.select(a,{"mshtml":function(l){return l.selection;}
,"default":function(m){return qx.dom.Node.getWindow(m).getSelection();}
}),get:qx.core.Environment.select(a,{"mshtml":function(n){var o=qx.bom.Range.get(qx.dom.Node.getDocument(n));return o.text;}
,"default":function(p){if(this.__if(p)){return p.value.substring(p.selectionStart,p.selectionEnd);}
else {return this.getSelectionObject(qx.dom.Node.getDocument(p)).toString();}
;}
}),getLength:qx.core.Environment.select(a,{"mshtml":function(q){var s=this.get(q);var r=qx.util.StringSplit.split(s,/\r\n/);return s.length-(r.length-1);}
,"opera":function(t){var y,w,u;if(this.__if(t)){var x=t.selectionStart;var v=t.selectionEnd;y=t.value.substring(x,v);w=v-x;}
else {y=qx.bom.Selection.get(t);w=y.length;}
;u=qx.util.StringSplit.split(y,/\r\n/);return w-(u.length-1);}
,"default":function(z){if(this.__if(z)){return z.selectionEnd-z.selectionStart;}
else {return this.get(z).length;}
;}
}),getStart:qx.core.Environment.select(a,{"mshtml":function(A){if(this.__if(A)){var F=qx.bom.Range.get();if(!A.contains(F.parentElement())){return -1;}
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
,"gecko|webkit":function(K){if(this.__if(K)){return K.selectionStart;}
else {var M=qx.dom.Node.getDocument(K);var L=this.getSelectionObject(M);if(L.anchorOffset<L.focusOffset){return L.anchorOffset;}
else {return L.focusOffset;}
;}
;}
,"default":function(N){if(this.__if(N)){return N.selectionStart;}
else {return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(N)).anchorOffset;}
;}
}),getEnd:qx.core.Environment.select(a,{"mshtml":function(O){if(this.__if(O)){var T=qx.bom.Range.get();if(!O.contains(T.parentElement())){return -1;}
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
,"gecko|webkit":function(Y){if(this.__if(Y)){return Y.selectionEnd;}
else {var bb=qx.dom.Node.getDocument(Y);var ba=this.getSelectionObject(bb);if(ba.focusOffset>ba.anchorOffset){return ba.focusOffset;}
else {return ba.anchorOffset;}
;}
;}
,"default":function(bc){if(this.__if(bc)){return bc.selectionEnd;}
else {return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bc)).focusOffset;}
;}
}),__if:function(bd){return qx.dom.Node.isElement(bd)&&(bd.nodeName.toLowerCase()==f||bd.nodeName.toLowerCase()==d);}
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
(function(){var c="qx.event.handler.Appear",b="disappear",a="appear";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);this.__ef=d;this.__ig={};qx.event.handler.Appear.__ih[this.$$hash]=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__ih:{},refresh:function(){var e=this.__ih;for(var f in e){e[f].refresh();}
;}
},members:{__ef:null,__ig:null,canHandleEvent:function(g,h){}
,registerEvent:function(i,j,k){var l=qx.core.ObjectRegistry.toHashCode(i)+j;var m=this.__ig;if(m&&!m[l]){m[l]=i;i.$$displayed=i.offsetWidth>0;}
;}
,unregisterEvent:function(n,o,p){var q=qx.core.ObjectRegistry.toHashCode(n)+o;var r=this.__ig;if(!r){return;}
;if(r[q]){delete r[q];}
;}
,refresh:function(){var v=this.__ig;var w;for(var u in v){w=v[u];var s=w.offsetWidth>0;if((!!w.$$displayed)!==s){w.$$displayed=s;var t=qx.event.Registration.createEvent(s?a:b);this.__ef.dispatchEvent(w,t);}
;}
;}
},destruct:function(){this.__ef=this.__ig=null;delete qx.event.handler.Appear.__ih[this.$$hash];}
,defer:function(x){qx.event.Registration.addHandler(x);}
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
(function(){var t="engine.version",s="useraction",r="webkit",q="gecko",p="DOMMouseScroll",o="qx.event.handler.Mouse",n="os.name",m="mouseover",l="mouseout",k="ios",d="mousemove",j="on",g="dblclick",c="mousedown",b="contextmenu",f="mousewheel",e="mouseup",h="engine.name",a="click";qx.Class.define(o,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(u){qx.core.Object.call(this);this.__ef=u;this.__ce=u.getWindow();this.__fT=this.__ce.document;this._initButtonObserver();this._initMoveObserver();this._initWheelObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT+qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__hc:null,__hd:null,__he:null,__hf:null,__hg:null,__ef:null,__ce:null,__fT:null,canHandleEvent:function(v,w){}
,registerEvent:qx.core.Environment.get(n)===k?function(x,y,z){x[j+y]=qx.lang.Function.returnNull;}
:qx.lang.Function.returnNull,unregisterEvent:qx.core.Environment.get(n)===k?function(A,B,C){A[j+B]=undefined;}
:qx.lang.Function.returnNull,__hh:function(D,E,F){if(!F){F=qx.bom.Event.getTarget(D);}
;if(F&&F.nodeType){qx.event.Registration.fireEvent(F,E||D.type,E==f?qx.event.type.MouseWheel:qx.event.type.Mouse,[D,F,null,true,true]);}
;qx.event.Registration.fireEvent(this.__ce,s,qx.event.type.Data,[E||D.type]);}
,__hi:function(){var H=[this.__ce,this.__fT,this.__fT.body];var I=this.__ce;var G=p;for(var i=0;i<H.length;i++){if(qx.bom.Event.supportsEvent(H[i],f)){G=f;I=H[i];break;}
;}
;return {type:G,target:I};}
,_initButtonObserver:function(){this.__hc=qx.lang.Function.listener(this._onButtonEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__fT,c,this.__hc);Event.addNativeListener(this.__fT,e,this.__hc);Event.addNativeListener(this.__fT,a,this.__hc);Event.addNativeListener(this.__fT,g,this.__hc);Event.addNativeListener(this.__fT,b,this.__hc);}
,_initMoveObserver:function(){this.__hd=qx.lang.Function.listener(this._onMoveEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__fT,d,this.__hd);Event.addNativeListener(this.__fT,m,this.__hd);Event.addNativeListener(this.__fT,l,this.__hd);}
,_initWheelObserver:function(){this.__he=qx.lang.Function.listener(this._onWheelEvent,this);var J=this.__hi();qx.bom.Event.addNativeListener(J.target,J.type,this.__he);}
,_stopButtonObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__fT,c,this.__hc);Event.removeNativeListener(this.__fT,e,this.__hc);Event.removeNativeListener(this.__fT,a,this.__hc);Event.removeNativeListener(this.__fT,g,this.__hc);Event.removeNativeListener(this.__fT,b,this.__hc);}
,_stopMoveObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__fT,d,this.__hd);Event.removeNativeListener(this.__fT,m,this.__hd);Event.removeNativeListener(this.__fT,l,this.__hd);}
,_stopWheelObserver:function(){var K=this.__hi();qx.bom.Event.removeNativeListener(K.target,K.type,this.__he);}
,_onMoveEvent:qx.event.GlobalError.observeMethod(function(L){this.__hh(L);}
),_onButtonEvent:qx.event.GlobalError.observeMethod(function(M){var O=M.type;var P=qx.bom.Event.getTarget(M);if(qx.core.Environment.get(h)==q||qx.core.Environment.get(h)==r){if(P&&P.nodeType==3){P=P.parentNode;}
;}
;var N=qx.event.handler.DragDrop&&this.__ef.getHandler(qx.event.handler.DragDrop).isSessionActive();if(N&&O==a){return;}
;if(this.__hj){this.__hj(M,O,P);}
;if(this.__hl){this.__hl(M,O,P);}
;this.__hh(M,O,P);if(this.__hk){this.__hk(M,O,P);}
;if(this.__hm&&!N){this.__hm(M,O,P);}
;this.__hf=O;}
),_onWheelEvent:qx.event.GlobalError.observeMethod(function(Q){this.__hh(Q,f);}
),__hj:qx.core.Environment.select(h,{"webkit":function(R,S,T){if(parseFloat(qx.core.Environment.get(t))<530){if(S==b){this.__hh(R,e,T);}
;}
;}
,"default":null}),__hk:qx.core.Environment.select(h,{"opera":function(U,V,W){if(V==e&&U.button==2){this.__hh(U,b,W);}
;}
,"default":null}),__hl:qx.core.Environment.select(h,{"mshtml":function(X,Y,ba){if(X.target!==undefined){return;}
;if(Y==e&&this.__hf==a){this.__hh(X,c,ba);}
else if(Y==g){this.__hh(X,a,ba);}
;}
,"default":null}),__hm:qx.core.Environment.select(h,{"mshtml":null,"default":function(bb,bc,bd){switch(bc){case c:this.__hg=bd;break;case e:if(bd!==this.__hg){var be=qx.dom.Hierarchy.getCommonParent(bd,this.__hg);if(be){this.__hh(bb,a,be);}
;}
;};}
})},destruct:function(){this._stopButtonObserver();this._stopMoveObserver();this._stopWheelObserver();this.__ef=this.__ce=this.__fT=this.__hg=null;}
,defer:function(bf){qx.event.Registration.addHandler(bf);}
});}
)();
(function(){var j="click",i="contextmenu",h="qx.event.type.Mouse",g="browser.documentmode",f="browser.name",e="ie",d="none",c="middle",b="left",a="right";qx.Class.define(h,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(k,l){var l=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,k,l);l.button=k.button;l.clientX=k.clientX;l.clientY=k.clientY;l.pageX=k.pageX;l.pageY=k.pageY;l.screenX=k.screenX;l.screenY=k.screenY;l.wheelDelta=k.wheelDelta;l.wheelDeltaX=k.wheelDeltaX;l.wheelDeltaY=k.wheelDeltaY;l.detail=k.detail;l.axis=k.axis;l.wheelX=k.wheelX;l.wheelY=k.wheelY;l.HORIZONTAL_AXIS=k.HORIZONTAL_AXIS;l.srcElement=k.srcElement;l.target=k.target;return l;}
,__jU:{'0':b,'2':a,'1':c},__jV:{'1':b,'2':a,'4':c},stop:function(){this.stopPropagation();}
,getButton:function(){switch(this._type){case i:return a;case j:if(qx.core.Environment.get(f)===e&&qx.core.Environment.get(g)<9){return b;}
;default:if(this._native.target!==undefined){return this.__jU[this._native.button]||d;}
else {return this.__jV[this._native.button]||d;}
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
,__fs:function(m){var n=Math.abs(m);if(qx.event.type.MouseWheel.MINSCROLL==null||qx.event.type.MouseWheel.MINSCROLL>n){qx.event.type.MouseWheel.MINSCROLL=n;this.__ft();}
;if(qx.event.type.MouseWheel.MAXSCROLL==null||qx.event.type.MouseWheel.MAXSCROLL<n){qx.event.type.MouseWheel.MAXSCROLL=n;this.__ft();}
;if(qx.event.type.MouseWheel.MAXSCROLL===n&&qx.event.type.MouseWheel.MINSCROLL===n){return 2*(m/n);}
;var o=qx.event.type.MouseWheel.MAXSCROLL-qx.event.type.MouseWheel.MINSCROLL;var p=(m/o)*Math.log(o)*qx.event.type.MouseWheel.FACTOR;return p<0?Math.min(p,-1):Math.max(p,1);}
,__ft:function(){var q=qx.event.type.MouseWheel.MAXSCROLL||0;var t=qx.event.type.MouseWheel.MINSCROLL||q;if(q<=t){return;}
;var r=q-t;var s=(q/r)*Math.log(r);if(s==0){s=1;}
;qx.event.type.MouseWheel.FACTOR=6/s;}
,getWheelDelta:function(u){var e=this._native;if(u===undefined){if(v===undefined){var v=-e.wheelDelta;if(e.wheelDelta===undefined){v=e.detail;}
;}
;return this.__fu(v);}
;if(u===k){var x=0;if(e.wheelDelta!==undefined){if(e.wheelDeltaX!==undefined){x=e.wheelDeltaX?this.__fu(-e.wheelDeltaX):0;}
;}
else {if(e.axis&&e.axis==e.HORIZONTAL_AXIS){x=this.__fu(e.detail);}
;}
;return x;}
;if(u===c){var y=0;if(e.wheelDelta!==undefined){if(e.wheelDeltaY!==undefined){y=e.wheelDeltaY?this.__fu(-e.wheelDeltaY):0;}
else {y=this.__fu(-e.wheelDelta);}
;}
else {if(!(e.axis&&e.axis==e.HORIZONTAL_AXIS)){y=this.__fu(e.detail);}
;}
;return y;}
;return 0;}
,__fu:function(w){if(qx.core.Environment.get(h)){return this.__fs(w);}
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
(function(){var k="engine.name",j="swipe",i="webkit",h="tap",g="x",f="y",e="qx.event.handler.TouchCore",d="touchcancel",c="touchmove",b="touchend",a="touchstart";qx.Bootstrap.define(e,{extend:Object,statics:{TAP_MAX_DISTANCE:qx.core.Environment.get("os.name")!="android"?10:40,SWIPE_DIRECTION:{x:["left","right"],y:["up","down"]},SWIPE_MIN_DISTANCE:qx.core.Environment.get("os.name")!="android"?11:41,SWIPE_MIN_VELOCITY:0},construct:function(l,m){this.__iM=l;this.__iN=m;this._initTouchObserver();}
,members:{__iM:null,__iN:null,__iO:null,__iP:null,__iQ:null,__iR:null,__iS:null,__iT:null,_initTouchObserver:function(){this.__iO=qx.lang.Function.listener(this._onTouchEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__iM,a,this.__iO);Event.addNativeListener(this.__iM,c,this.__iO);Event.addNativeListener(this.__iM,b,this.__iO);Event.addNativeListener(this.__iM,d,this.__iO);}
,_stopTouchObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__iM,a,this.__iO);Event.removeNativeListener(this.__iM,c,this.__iO);Event.removeNativeListener(this.__iM,b,this.__iO);Event.removeNativeListener(this.__iM,d,this.__iO);}
,_onTouchEvent:function(n){this._commonTouchEventHandler(n);}
,_commonTouchEventHandler:function(o,p){var p=p||o.type;if(p==a){this.__iP=this._getTarget(o);}
;this._fireEvent(o,p);this.__iU(o,p);}
,_getTarget:function(q){var r=qx.bom.Event.getTarget(q);if((qx.core.Environment.get(k)==i)){if(r&&r.nodeType==3){r=r.parentNode;}
;}
;return r;}
,_fireEvent:function(s,t,u){if(!u){u=this._getTarget(s);}
;var t=t||s.type;if(u&&u.nodeType&&this.__iN){this.__iN.emit(t,s);}
;}
,__iU:function(v,w,x){if(!x){x=this._getTarget(v);}
;var w=w||v.type;if(w==a){this.__iV(v,x);}
else if(w==c){this.__iW(v,x);}
else if(w==b){this.__iX(v,x);}
;;}
,__iV:function(y,z){var A=y.changedTouches[0];this.__iQ=A.screenX;this.__iR=A.screenY;this.__iS=new Date().getTime();this.__iT=y.changedTouches.length===1;}
,__iW:function(B,C){if(this.__iT&&B.changedTouches.length>1){this.__iT=false;}
;}
,__iX:function(D,E){if(this.__iT){var F=D.changedTouches[0];var I={x:F.screenX-this.__iQ,y:F.screenY-this.__iR};var J=qx.event.handler.TouchCore;var G;if(this.__iP==E&&Math.abs(I.x)<=J.TAP_MAX_DISTANCE&&Math.abs(I.y)<=J.TAP_MAX_DISTANCE){if(qx.event&&qx.event.type&&qx.event.type.Tap){G=qx.event.type.Tap;}
;this._fireEvent(D,h,E,G);}
else {var H=this.__iY(D,E,I);if(H){if(qx.event&&qx.event.type&&qx.event.type.Swipe){G=qx.event.type.Swipe;}
;D.swipe=H;this._fireEvent(D,j,E,G);}
;}
;}
;}
,__iY:function(K,L,M){var Q=qx.event.handler.TouchCore;var R=new Date().getTime()-this.__iS;var T=(Math.abs(M.x)>=Math.abs(M.y))?g:f;var N=M[T];var O=Q.SWIPE_DIRECTION[T][N<0?0:1];var S=(R!==0)?N/R:0;var P=null;if(Math.abs(S)>=Q.SWIPE_MIN_VELOCITY&&Math.abs(N)>=Q.SWIPE_MIN_DISTANCE){P={startTime:this.__iS,duration:R,axis:T,direction:O,distance:N,velocity:S};}
;return P;}
,dispose:function(){this._stopTouchObserver();this.__iP=this.__iM=this.__iN=null;}
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
,isMultiTouch:function(){return this.__ir().length>1;}
,getScale:function(){return this._native.scale;}
,getRotation:function(){return this._native.rotation;}
,getDocumentLeft:function(f){return this.__iq(f).pageX;}
,getDocumentTop:function(g){return this.__iq(g).pageY;}
,getScreenLeft:function(h){return this.__iq(h).screenX;}
,getScreenTop:function(j){return this.__iq(j).screenY;}
,getViewportLeft:function(k){return this.__iq(k).clientX;}
,getViewportTop:function(l){return this.__iq(l).clientY;}
,getIdentifier:function(m){return this.__iq(m).identifier;}
,__iq:function(n){n=n==null?0:n;return this.__ir()[n];}
,__ir:function(){var o=(this._isTouchEnd()?this.getChangedTargetTouches():this.getTargetTouches());return o;}
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
(function(){var e="resize",d="landscape",c="portrait",b="qx.event.handler.Orientation",a="orientationchange";qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(f){qx.core.Object.call(this);this.__ef=f;this.__ce=f.getWindow();this._initObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{orientationchange:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__ef:null,__ce:null,__lB:null,_currentOrientation:null,__jT:null,canHandleEvent:function(g,h){}
,registerEvent:function(i,j,k){}
,unregisterEvent:function(l,m,n){}
,_initObserver:function(){this.__jT=qx.lang.Function.listener(this._onNative,this);this.__lB=qx.bom.Event.supportsEvent(this.__ce,a)?a:e;var Event=qx.bom.Event;Event.addNativeListener(this.__ce,this.__lB,this.__jT);}
,_stopObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__ce,this.__lB,this.__jT);}
,_onNative:qx.event.GlobalError.observeMethod(function(o){var q=qx.bom.Viewport;var p=q.getOrientation(o.target);if(this._currentOrientation!=p){this._currentOrientation=p;var r=q.isLandscape(o.target)?d:c;qx.event.Registration.fireEvent(this.__ce,a,qx.event.type.Orientation,[p,r]);}
;}
)},destruct:function(){this._stopObserver();this.__ef=this.__ce=null;}
,defer:function(s){qx.event.Registration.addHandler(s);}
});}
)();
(function(){var c="landscape",b="qx.event.type.Orientation",a="portrait";qx.Class.define(b,{extend:qx.event.type.Event,members:{__gW:null,__gX:null,init:function(d,e){qx.event.type.Event.prototype.init.call(this,false,false);this.__gW=d;this.__gX=e;return this;}
,clone:function(f){var g=qx.event.type.Event.prototype.clone.call(this,f);g.__gW=this.__gW;g.__gX=this.__gX;return g;}
,getOrientation:function(){return this.__gW;}
,isLandscape:function(){return this.__gX==c;}
,isPortrait:function(){return this.__gX==a;}
}});}
)();
(function(){var o="mshtml",n="engine.name",m="qx.event.handler.Touch",l="useraction",k="touchmove",j="qx.mobile.nativescroll",i="dispose",h="touchstart",g="mouseup",f="touchend",b="mousedown",d="mousemove",c="event.touch",a="qx.mobile.emulatetouch";qx.Class.define(m,{extend:qx.event.handler.TouchCore,implement:qx.event.IEventHandler,construct:function(p){this.__ef=p;this.__ce=p.getWindow();this.__fT=this.__ce.document;qx.event.handler.TouchCore.apply(this,[this.__fT]);this._initMouseObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{touchstart:1,touchmove:1,touchend:1,touchcancel:1,tap:1,swipe:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT,IGNORE_CAN_HANDLE:true,MOUSE_TO_TOUCH_MAPPING:{"mousedown":"touchstart","mousemove":"touchmove","mouseup":"touchend"}},members:{__fU:null,__ef:null,__ce:null,__fT:null,__fV:false,canHandleEvent:function(q,r){}
,registerEvent:function(s,t,u){}
,unregisterEvent:function(v,w,x){}
,_fireEvent:function(y,z,A,B){if(!A){A=this._getTarget(y);}
;var z=z||y.type;if(A&&A.nodeType){qx.event.Registration.fireEvent(A,z,B||qx.event.type.Touch,[y,A,null,true,true]);}
;qx.event.Registration.fireEvent(this.__ce,l,qx.event.type.Data,[z]);}
,__fW:qx.core.Environment.select(a,{"true":function(C){var D=C.type;var F=qx.event.handler.Touch.MOUSE_TO_TOUCH_MAPPING;if(F[D]){D=F[D];if(D==h&&this.__fX(C)){this.__fV=true;}
else if(D==f){this.__fV=false;}
;var G=this.__fY(C);var E=(D==f?[]:[G]);C.touches=E;C.targetTouches=E;C.changedTouches=[G];}
;return D;}
,"default":qx.lang.Function.empty}),__fX:qx.core.Environment.select(a,{"true":function(H){if((qx.core.Environment.get(n)==o)){var I=1;}
else {var I=0;}
;return H.button==I;}
,"default":qx.lang.Function.empty}),__fY:qx.core.Environment.select(a,{"true":function(J){var K=this._getTarget(J);return {clientX:J.clientX,clientY:J.clientY,screenX:J.screenX,screenY:J.screenY,pageX:J.pageX,pageY:J.pageY,identifier:1,target:K};}
,"default":qx.lang.Function.empty}),_initMouseObserver:qx.core.Environment.select(a,{"true":function(){if(!qx.core.Environment.get(c)){this.__fU=qx.lang.Function.listener(this._onMouseEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__fT,b,this.__fU);Event.addNativeListener(this.__fT,d,this.__fU);Event.addNativeListener(this.__fT,g,this.__fU);}
;}
,"default":qx.lang.Function.empty}),_stopMouseObserver:qx.core.Environment.select(a,{"true":function(){if(!qx.core.Environment.get(c)){var Event=qx.bom.Event;Event.removeNativeListener(this.__fT,b,this.__fU);Event.removeNativeListener(this.__fT,d,this.__fU);Event.removeNativeListener(this.__fT,g,this.__fU);}
;}
,"default":qx.lang.Function.empty}),_onTouchEvent:qx.event.GlobalError.observeMethod(function(L){this._commonTouchEventHandler(L);}
),_onMouseEvent:qx.core.Environment.select(a,{"true":qx.event.GlobalError.observeMethod(function(M){if(!qx.core.Environment.get(c)){if(M.type==d&&!this.__fV){return;}
;var N=this.__fW(M);this._commonTouchEventHandler(M,N);}
;}
),"default":qx.lang.Function.empty}),dispose:function(){this.__ga(i);this._stopMouseObserver();this.__ef=this.__ce=this.__fT=null;}
,__ga:function(O,P){qx.event.handler.TouchCore.prototype[O].apply(this,P||[]);}
},defer:function(Q){qx.event.Registration.addHandler(Q);if(qx.core.Environment.get(c)){if(qx.core.Environment.get(j)==false){document.addEventListener(k,function(e){e.preventDefault();}
);}
;qx.event.Registration.getManager(document).getHandler(Q);}
;}
});}
)();
(function(){var m="select-multiple",k="value",j="select",h="qx.event.handler.Input",g="checked",f="blur",d="keydown",c="propertychange",b="browser.version",a="browser.documentmode",A="opera",z="keyup",y="mshtml",x="keypress",w="engine.version",v="radio",u="checkbox",t="text",s="textarea",r="password",p="change",q="engine.name",n="input";qx.Class.define(h,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);this._onChangeCheckedWrapper=qx.lang.Function.listener(this._onChangeChecked,this);this._onChangeValueWrapper=qx.lang.Function.listener(this._onChangeValue,this);this._onInputWrapper=qx.lang.Function.listener(this._onInput,this);this._onPropertyWrapper=qx.lang.Function.listener(this._onProperty,this);if((qx.core.Environment.get(q)==A)){this._onKeyDownWrapper=qx.lang.Function.listener(this._onKeyDown,this);this._onKeyUpWrapper=qx.lang.Function.listener(this._onKeyUp,this);this._onBlurWrapper=qx.lang.Function.listener(this._onBlur,this);}
;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{input:1,change:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{__gb:false,__gc:null,__et:null,__eu:null,canHandleEvent:function(B,C){var D=B.tagName.toLowerCase();if(C===n&&(D===n||D===s)){return true;}
;if(C===p&&(D===n||D===s||D===j)){return true;}
;return false;}
,registerEvent:function(E,F,G){if(qx.core.Environment.get(q)==y&&(qx.core.Environment.get(w)<9||(qx.core.Environment.get(w)>=9&&qx.core.Environment.get(a)<9))){if(!E.__gd){var H=E.tagName.toLowerCase();var I=E.type;if(I===t||I===r||H===s||I===u||I===v){qx.bom.Event.addNativeListener(E,c,this._onPropertyWrapper);}
;if(I!==u&&I!==v){qx.bom.Event.addNativeListener(E,p,this._onChangeValueWrapper);}
;if(I===t||I===r){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,E);qx.bom.Event.addNativeListener(E,x,this._onKeyPressWrapped);}
;E.__gd=true;}
;}
else {if(F===n){this.__ge(E);}
else if(F===p){if(E.type===v||E.type===u){qx.bom.Event.addNativeListener(E,p,this._onChangeCheckedWrapper);}
else {qx.bom.Event.addNativeListener(E,p,this._onChangeValueWrapper);}
;if((qx.core.Environment.get(q)==A)||(qx.core.Environment.get(q)==y)){if(E.type===t||E.type===r){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,E);qx.bom.Event.addNativeListener(E,x,this._onKeyPressWrapped);}
;}
;}
;}
;}
,__ge:qx.core.Environment.select(q,{"mshtml":function(J){if(qx.core.Environment.get(w)>=9&&qx.core.Environment.get(a)>=9){qx.bom.Event.addNativeListener(J,n,this._onInputWrapper);if(J.type===t||J.type===r||J.type===s){this._inputFixWrapper=qx.lang.Function.listener(this._inputFix,this,J);qx.bom.Event.addNativeListener(J,z,this._inputFixWrapper);}
;}
;}
,"webkit":function(K){var L=K.tagName.toLowerCase();if(parseFloat(qx.core.Environment.get(w))<532&&L==s){qx.bom.Event.addNativeListener(K,x,this._onInputWrapper);}
;qx.bom.Event.addNativeListener(K,n,this._onInputWrapper);}
,"opera":function(M){qx.bom.Event.addNativeListener(M,z,this._onKeyUpWrapper);qx.bom.Event.addNativeListener(M,d,this._onKeyDownWrapper);qx.bom.Event.addNativeListener(M,f,this._onBlurWrapper);qx.bom.Event.addNativeListener(M,n,this._onInputWrapper);}
,"default":function(N){qx.bom.Event.addNativeListener(N,n,this._onInputWrapper);}
}),unregisterEvent:function(O,P){if(qx.core.Environment.get(q)==y&&qx.core.Environment.get(w)<9&&qx.core.Environment.get(a)<9){if(O.__gd){var Q=O.tagName.toLowerCase();var R=O.type;if(R===t||R===r||Q===s||R===u||R===v){qx.bom.Event.removeNativeListener(O,c,this._onPropertyWrapper);}
;if(R!==u&&R!==v){qx.bom.Event.removeNativeListener(O,p,this._onChangeValueWrapper);}
;if(R===t||R===r){qx.bom.Event.removeNativeListener(O,x,this._onKeyPressWrapped);}
;try{delete O.__gd;}
catch(S){O.__gd=null;}
;}
;}
else {if(P===n){this.__gf(O);}
else if(P===p){if(O.type===v||O.type===u){qx.bom.Event.removeNativeListener(O,p,this._onChangeCheckedWrapper);}
else {qx.bom.Event.removeNativeListener(O,p,this._onChangeValueWrapper);}
;}
;if((qx.core.Environment.get(q)==A)||(qx.core.Environment.get(q)==y)){if(O.type===t||O.type===r){qx.bom.Event.removeNativeListener(O,x,this._onKeyPressWrapped);}
;}
;}
;}
,__gf:qx.core.Environment.select(q,{"mshtml":function(T){if(qx.core.Environment.get(w)>=9&&qx.core.Environment.get(a)>=9){qx.bom.Event.removeNativeListener(T,n,this._onInputWrapper);if(T.type===t||T.type===r||T.type===s){qx.bom.Event.removeNativeListener(T,z,this._inputFixWrapper);}
;}
;}
,"webkit":function(U){var V=U.tagName.toLowerCase();if(parseFloat(qx.core.Environment.get(w))<532&&V==s){qx.bom.Event.removeNativeListener(U,x,this._onInputWrapper);}
;qx.bom.Event.removeNativeListener(U,n,this._onInputWrapper);}
,"opera":function(W){qx.bom.Event.removeNativeListener(W,z,this._onKeyUpWrapper);qx.bom.Event.removeNativeListener(W,d,this._onKeyDownWrapper);qx.bom.Event.removeNativeListener(W,f,this._onBlurWrapper);qx.bom.Event.removeNativeListener(W,n,this._onInputWrapper);}
,"default":function(X){qx.bom.Event.removeNativeListener(X,n,this._onInputWrapper);}
}),_onKeyPress:qx.core.Environment.select(q,{"mshtml|opera":function(e,Y){if(e.keyCode===13){if(Y.value!==this.__et){this.__et=Y.value;qx.event.Registration.fireEvent(Y,p,qx.event.type.Data,[Y.value]);}
;}
;}
,"default":null}),_inputFix:qx.core.Environment.select(q,{"mshtml":function(e,ba){if(e.keyCode===46||e.keyCode===8){if(ba.value!==this.__eu){this.__eu=ba.value;qx.event.Registration.fireEvent(ba,n,qx.event.type.Data,[ba.value]);}
;}
;}
,"default":null}),_onKeyDown:qx.core.Environment.select(q,{"opera":function(e){if(e.keyCode===13){this.__gb=true;}
;}
,"default":null}),_onKeyUp:qx.core.Environment.select(q,{"opera":function(e){if(e.keyCode===13){this.__gb=false;}
;}
,"default":null}),_onBlur:qx.core.Environment.select(q,{"opera":function(e){if(this.__gc&&qx.core.Environment.get(b)<10.6){window.clearTimeout(this.__gc);}
;}
,"default":null}),_onInput:qx.event.GlobalError.observeMethod(function(e){var bc=qx.bom.Event.getTarget(e);var bb=bc.tagName.toLowerCase();if(!this.__gb||bb!==n){if((qx.core.Environment.get(q)==A)&&qx.core.Environment.get(b)<10.6){this.__gc=window.setTimeout(function(){qx.event.Registration.fireEvent(bc,n,qx.event.type.Data,[bc.value]);}
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
(function(){var k="mousedown",j="qxDraggable",i="Escape",h="drag",g="Unsupported data type: ",f="drop",d="qxDroppable",c="qx.event.handler.DragDrop",b="This method must not be used outside the drop event listener!",a="!",H="droprequest",G="dragstart",F="dragchange",E="dragleave",D="dragover",C="left",B="Please use a droprequest listener to the drag source to fill the manager with data!",A="blur",z="mouseout",y="keydown",r="Control",s="Shift",p="mousemove",q="move",n="mouseover",o="Alt",l="keyup",m="mouseup",t="keypress",u="dragend",w="on",v="copy",x="alias";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(I){qx.core.Object.call(this);this.__ef=I;this.__fT=I.getWindow().document.documentElement;this.__ef.addListener(this.__fT,k,this._onMouseDown,this);this.__jF();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__ef:null,__fT:null,__jw:null,__jx:null,__eo:null,__jy:null,__jz:null,__e:null,__jA:null,__jB:null,__jC:false,__jD:0,__jE:0,canHandleEvent:function(J,K){}
,registerEvent:function(L,M,N){}
,unregisterEvent:function(O,P,Q){}
,addType:function(R){this.__eo[R]=true;}
,addAction:function(S){this.__jy[S]=true;}
,supportsType:function(T){return !!this.__eo[T];}
,supportsAction:function(U){return !!this.__jy[U];}
,getData:function(V){if(!this.__jL||!this.__jw){throw new Error(b);}
;if(!this.__eo[V]){throw new Error(g+V+a);}
;if(!this.__e[V]){this.__jA=V;this.__hh(H,this.__jx,this.__jw,false);}
;if(!this.__e[V]){throw new Error(B);}
;return this.__e[V]||null;}
,getCurrentAction:function(){return this.__jB;}
,addData:function(W,X){this.__e[W]=X;}
,getCurrentType:function(){return this.__jA;}
,isSessionActive:function(){return this.__jC;}
,__jF:function(){this.__eo={};this.__jy={};this.__jz={};this.__e={};}
,__jG:function(){if(this.__jx==null){return;}
;var bb=this.__jy;var Y=this.__jz;var ba=null;if(this.__jL){if(Y.Shift&&Y.Control&&bb.alias){ba=x;}
else if(Y.Shift&&Y.Alt&&bb.copy){ba=v;}
else if(Y.Shift&&bb.move){ba=q;}
else if(Y.Alt&&bb.alias){ba=x;}
else if(Y.Control&&bb.copy){ba=v;}
else if(bb.move){ba=q;}
else if(bb.copy){ba=v;}
else if(bb.alias){ba=x;}
;;;;;;;}
;if(ba!=this.__jB){this.__jB=ba;this.__hh(F,this.__jx,this.__jw,false);}
;}
,__hh:function(bc,bd,be,bf,bg){var bi=qx.event.Registration;var bh=bi.createEvent(bc,qx.event.type.Drag,[bf,bg]);if(bd!==be){bh.setRelatedTarget(be);}
;return bi.dispatchEvent(bd,bh);}
,__jH:function(bj){while(bj&&bj.nodeType==1){if(bj.getAttribute(j)==w){return bj;}
;bj=bj.parentNode;}
;return null;}
,__jI:function(bk){while(bk&&bk.nodeType==1){if(bk.getAttribute(d)==w){return bk;}
;bk=bk.parentNode;}
;return null;}
,__jJ:function(){this.__jx=null;this.__ef.removeListener(this.__fT,p,this._onMouseMove,this,true);this.__ef.removeListener(this.__fT,m,this._onMouseUp,this,true);qx.event.Registration.removeListener(window,A,this._onWindowBlur,this);this.__jF();}
,__jK:function(){if(this.__jC){this.__ef.removeListener(this.__fT,n,this._onMouseOver,this,true);this.__ef.removeListener(this.__fT,z,this._onMouseOut,this,true);this.__ef.removeListener(this.__fT,y,this._onKeyDown,this,true);this.__ef.removeListener(this.__fT,l,this._onKeyUp,this,true);this.__ef.removeListener(this.__fT,t,this._onKeyPress,this,true);this.__hh(u,this.__jx,this.__jw,false);this.__jC=false;}
;this.__jL=false;this.__jw=null;this.__jJ();}
,__jL:false,_onWindowBlur:function(e){this.__jK();}
,_onKeyDown:function(e){var bl=e.getKeyIdentifier();switch(bl){case o:case r:case s:if(!this.__jz[bl]){this.__jz[bl]=true;this.__jG();}
;};}
,_onKeyUp:function(e){var bm=e.getKeyIdentifier();switch(bm){case o:case r:case s:if(this.__jz[bm]){this.__jz[bm]=false;this.__jG();}
;};}
,_onKeyPress:function(e){var bn=e.getKeyIdentifier();switch(bn){case i:this.__jK();};}
,_onMouseDown:function(e){if(this.__jC||e.getButton()!==C){return;}
;var bo=this.__jH(e.getTarget());if(bo){this.__jD=e.getDocumentLeft();this.__jE=e.getDocumentTop();this.__jx=bo;this.__ef.addListener(this.__fT,p,this._onMouseMove,this,true);this.__ef.addListener(this.__fT,m,this._onMouseUp,this,true);qx.event.Registration.addListener(window,A,this._onWindowBlur,this);}
;}
,_onMouseUp:function(e){if(this.__jL){this.__hh(f,this.__jw,this.__jx,false,e);}
;if(this.__jC){e.stopPropagation();}
;this.__jK();}
,_onMouseMove:function(e){if(this.__jC){if(!this.__hh(h,this.__jx,this.__jw,true,e)){this.__jK();}
;}
else {if(Math.abs(e.getDocumentLeft()-this.__jD)>3||Math.abs(e.getDocumentTop()-this.__jE)>3){if(this.__hh(G,this.__jx,this.__jw,true,e)){this.__jC=true;this.__ef.addListener(this.__fT,n,this._onMouseOver,this,true);this.__ef.addListener(this.__fT,z,this._onMouseOut,this,true);this.__ef.addListener(this.__fT,y,this._onKeyDown,this,true);this.__ef.addListener(this.__fT,l,this._onKeyUp,this,true);this.__ef.addListener(this.__fT,t,this._onKeyPress,this,true);var bp=this.__jz;bp.Control=e.isCtrlPressed();bp.Shift=e.isShiftPressed();bp.Alt=e.isAltPressed();this.__jG();}
else {this.__hh(u,this.__jx,this.__jw,false);this.__jJ();}
;}
;}
;}
,_onMouseOver:function(e){var bq=e.getTarget();var br=this.__jI(bq);if(br&&br!=this.__jw){this.__jL=this.__hh(D,br,this.__jx,true,e);this.__jw=br;this.__jG();}
;}
,_onMouseOut:function(e){var bt=this.__jI(e.getTarget());var bs=this.__jI(e.getRelatedTarget());if(bt&&bt!==bs&&bt==this.__jw){this.__hh(E,this.__jw,bs,false,e);this.__jw=null;this.__jL=false;qx.event.Timer.once(this.__jG,this,0);}
;}
},destruct:function(){this.__jx=this.__jw=this.__ef=this.__fT=this.__eo=this.__jy=this.__jz=this.__e=null;}
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
(function(){var k="qx.event.Timer",j="_applyInterval",i="func is not a function",h="Boolean",g="qx.debug",f="No timeout given",d="Integer",c="qx.event.type.Event",b="_applyEnabled",a="interval";qx.Class.define(k,{extend:qx.core.Object,construct:function(l){qx.core.Object.call(this);this.setEnabled(false);if(l!=null){this.setInterval(l);}
;var self=this;this.__gY=function(){self._oninterval.call(self);}
;}
,events:{"interval":c},statics:{once:function(m,n,o){if(qx.core.Environment.get(g)){qx.core.Assert.assertFunction(m,i);qx.core.Assert.assertNotUndefined(o,f);}
;var p=new qx.event.Timer(o);p.__ha=m;p.addListener(a,function(e){p.stop();m.call(n,e);p.dispose();n=null;}
,n);p.start();return p;}
},properties:{enabled:{init:true,check:h,apply:b},interval:{check:d,init:1000,apply:j}},members:{__hb:null,__gY:null,_applyInterval:function(q,r){if(this.getEnabled()){this.restart();}
;}
,_applyEnabled:function(s,t){if(t){window.clearInterval(this.__hb);this.__hb=null;}
else if(s){this.__hb=window.setInterval(this.__gY,this.getInterval());}
;}
,start:function(){this.setEnabled(true);}
,startWith:function(u){this.setInterval(u);this.start();}
,stop:function(){this.setEnabled(false);}
,restart:function(){this.stop();this.start();}
,restartWith:function(v){this.stop();this.startWith(v);}
,_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;}
;if(this.getEnabled()){this.fireEvent(a);}
;}
)},destruct:function(){if(this.__hb){window.clearInterval(this.__hb);}
;this.__hb=this.__gY=null;}
});}
)();
(function(){var c="qx.event.handler.Offline",b="offline",a="online";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);this.__ef=d;this.__ce=d.getWindow();this._initObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{online:true,offline:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__ef:null,__ce:null,__jT:null,canHandleEvent:function(e,f){}
,registerEvent:function(g,h,i){}
,unregisterEvent:function(j,k,l){}
,_initObserver:function(){this.__jT=qx.lang.Function.listener(this._onNative,this);qx.bom.Event.addNativeListener(this.__ce,b,this.__jT);qx.bom.Event.addNativeListener(this.__ce,a,this.__jT);}
,_stopObserver:function(){qx.bom.Event.removeNativeListener(this.__ce,b,this.__jT);qx.bom.Event.removeNativeListener(this.__ce,a,this.__jT);}
,_onNative:qx.event.GlobalError.observeMethod(function(m){qx.event.Registration.fireEvent(this.__ce,m.type,qx.event.type.Event,[]);}
),isOnline:function(){return !!this.__ce.navigator.onLine;}
},destruct:function(){this.__ef=null;this._stopObserver();delete qx.event.handler.Appear.__instances[this.$$hash];}
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
(function(){var q="engine.name",p="='",o="none",n="<INPUT TYPE='RADIO' NAME='RADIOTEST' VALUE='Second Choice'>",m="qx.dom.Element",k="webkit",j="The tag name is missing!",h="div",g="' ",f="></",b="<",d=" ",c=">",a="";qx.Bootstrap.define(m,{statics:{__dH:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},hasChild:function(parent,r){return r.parentNode===parent;}
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
,__dI:{},__dJ:{},_allowCreationWithMarkup:function(Q){if(!Q){Q=window;}
;var R=Q.location.href;if(qx.dom.Element.__dJ[R]==undefined){try{Q.document.createElement(n);qx.dom.Element.__dJ[R]=true;}
catch(e){qx.dom.Element.__dJ[R]=false;}
;}
;return qx.dom.Element.__dJ[R];}
,getHelperElement:function(S){if(!S){S=window;}
;var U=S.location.href;if(!qx.dom.Element.__dI[U]){var T=qx.dom.Element.__dI[U]=S.document.createElement(h);if(qx.core.Environment.get(q)==k){T.style.display=o;S.document.body.appendChild(T);}
;}
;return qx.dom.Element.__dI[U];}
,create:function(name,V,W){if(!W){W=window;}
;if(!name){throw new Error(j);}
;var Y=this.__dH;var X=a;for(var bb in V){if(Y[bb]){X+=bb+p+V[bb]+g;}
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
(function(){var i="mshtml",h="blur",g="focus",f="click",e="qx.event.dispatch.MouseCapture",d="capture",c="scroll",b="engine.name",a="losecapture";qx.Class.define(e,{extend:qx.event.dispatch.AbstractBubbling,construct:function(j,k){qx.event.dispatch.AbstractBubbling.call(this,j);this.__ce=j.getWindow();this.__cg=k;j.addListener(this.__ce,h,this.releaseCapture,this);j.addListener(this.__ce,g,this.releaseCapture,this);j.addListener(this.__ce,c,this.releaseCapture,this);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__cg:null,__gg:null,__gh:true,__ce:null,_getParent:function(l){return l.parentNode;}
,canDispatchEvent:function(m,event,n){return !!(this.__gg&&this.__gi[n]);}
,dispatchEvent:function(o,event,p){if(p==f){event.stopPropagation();this.releaseCapture();return;}
;if(this.__gh||!qx.dom.Hierarchy.contains(this.__gg,o)){o=this.__gg;}
;qx.event.dispatch.AbstractBubbling.prototype.dispatchEvent.call(this,o,event,p);}
,__gi:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(q,r){var r=r!==false;if(this.__gg===q&&this.__gh==r){return;}
;if(this.__gg){this.releaseCapture();}
;this.nativeSetCapture(q,r);if(this.hasNativeCapture){var self=this;qx.bom.Event.addNativeListener(q,a,function(){qx.bom.Event.removeNativeListener(q,a,arguments.callee);self.releaseCapture();}
);}
;this.__gh=r;this.__gg=q;this.__cg.fireEvent(q,d,qx.event.type.Event,[true,false]);}
,getCaptureElement:function(){return this.__gg;}
,releaseCapture:function(){var s=this.__gg;if(!s){return;}
;this.__gg=null;this.__cg.fireEvent(s,a,qx.event.type.Event,[true,false]);this.nativeReleaseCapture(s);}
,hasNativeCapture:qx.core.Environment.get(b)==i,nativeSetCapture:qx.core.Environment.select(b,{"mshtml":function(t,u){t.setCapture(u!==false);}
,"default":qx.lang.Function.empty}),nativeReleaseCapture:qx.core.Environment.select(b,{"mshtml":function(v){v.releaseCapture();}
,"default":qx.lang.Function.empty})},destruct:function(){this.__gg=this.__ce=this.__cg=null;}
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
,__lF:{quicktime:{plugin:[d],control:g},wmv:{plugin:[G],control:s},divx:{plugin:[C],control:o},silverlight:{plugin:[l],control:B},pdf:{plugin:[H,f],control:t}},getQuicktimeVersion:function(){var I=qx.bom.client.Plugin.__lF[u];return qx.bom.client.Plugin.__lG(I.control,I.plugin);}
,getWindowsMediaVersion:function(){var J=qx.bom.client.Plugin.__lF[m];return qx.bom.client.Plugin.__lG(J.control,J.plugin);}
,getDivXVersion:function(){var K=qx.bom.client.Plugin.__lF[n];return qx.bom.client.Plugin.__lG(K.control,K.plugin);}
,getSilverlightVersion:function(){var L=qx.bom.client.Plugin.__lF[x];return qx.bom.client.Plugin.__lG(L.control,L.plugin);}
,getPdfVersion:function(){var M=qx.bom.client.Plugin.__lF[p];return qx.bom.client.Plugin.__lG(M.control,M.plugin);}
,getQuicktime:function(){var N=qx.bom.client.Plugin.__lF[u];return qx.bom.client.Plugin.__lH(N.control,N.plugin);}
,getWindowsMedia:function(){var O=qx.bom.client.Plugin.__lF[m];return qx.bom.client.Plugin.__lH(O.control,O.plugin);}
,getDivX:function(){var P=qx.bom.client.Plugin.__lF[n];return qx.bom.client.Plugin.__lH(P.control,P.plugin);}
,getSilverlight:function(){var Q=qx.bom.client.Plugin.__lF[x];return qx.bom.client.Plugin.__lH(Q.control,Q.plugin);}
,getPdf:function(){var R=qx.bom.client.Plugin.__lF[p];return qx.bom.client.Plugin.__lH(R.control,R.plugin);}
,__lG:function(S,T){var U=qx.bom.client.Plugin.__lH(S,T);if(!U){return w;}
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
,__lH:function(bc,bd){if(qx.bom.client.Engine.getName()==v){var be=window.ActiveXObject;if(!be){return false;}
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
(function(){var k='.qxconsole .messages{background:white;height:100%;width:100%;overflow:auto;}',j="Enter",i="px",h='.qxconsole .messages .user-result{background:white}',g='.qxconsole .messages .level-error{background:#FFE2D5}',f="div",d="user-command",c='<div class="command">',b='.qxconsole .command input:focus{outline:none;}',a='.qxconsole .messages .type-key{color:#565656;font-style:italic}',V='.qxconsole .messages .type-instance{color:#565656;font-weight:bold}',U='.qxconsole .messages div{padding:0px 4px;}',T='.qxconsole .messages .level-debug{background:white}',S='.qxconsole .messages .type-class{color:#5F3E8A;font-weight:bold}',R="DIV",Q='.qxconsole .messages .level-user{background:#E3EFE9}',P='<div class="qxconsole">',O="D",N='.qxconsole .messages .type-map{color:#CC3E8A;font-weight:bold;}',M='.qxconsole .messages .type-string{color:black;font-weight:normal;}',r='.qxconsole .control a{text-decoration:none;color:black;}',s='<div class="messages">',p='.qxconsole .messages .type-boolean{color:#15BC91;font-weight:normal;}',q='<input type="text"/>',n="clear",o='.qxconsole .command input{width:100%;border:0 none;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',l='.qxconsole .messages .type-array{color:#CC3E8A;font-weight:bold;}',m='.qxconsole{z-index:10000;width:600px;height:300px;top:0px;right:0px;position:absolute;border-left:1px solid black;color:black;border-bottom:1px solid black;color:black;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',t='.qxconsole .command{background:white;padding:2px 4px;border-top:1px solid black;}',u='.qxconsole .messages .user-command{color:blue}',B="F7",z="qx.log.appender.Console",F='.qxconsole .messages .level-info{background:#DEEDFA}',D="block",I='.qxconsole .messages .level-warn{background:#FFF7D5}',H='.qxconsole .messages .type-stringify{color:#565656;font-weight:bold}',w='.qxconsole .messages .user-error{background:#FFE2D5}',L='.qxconsole .control{background:#cdcdcd;border-bottom:1px solid black;padding:4px 8px;}',K='<div class="control"><a href="javascript:qx.log.appender.Console.clear()">Clear</a> | <a href="javascript:qx.log.appender.Console.toggle()">Hide</a></div>',J=">>> ",v="Down",x='.qxconsole .messages .type-number{color:#155791;font-weight:normal;}',y="Up",A="none",C="keypress",E='</div>',G="";qx.Class.define(z,{statics:{init:function(){var W=[m,L,r,k,U,u,h,w,T,F,I,g,Q,M,x,p,l,N,a,S,V,H,t,o,b];qx.bom.Stylesheet.createElement(W.join(G));var Y=[P,K,s,E,c,q,E,E];var ba=document.createElement(R);ba.innerHTML=Y.join(G);var X=ba.firstChild;document.body.appendChild(ba.firstChild);this.__Dj=X;this.__bY=X.childNodes[1];this.__Dk=X.childNodes[2].firstChild;this.__qB();qx.log.Logger.register(this);qx.core.ObjectRegistry.register(this);}
,dispose:function(){qx.event.Registration.removeListener(document.documentElement,C,this.__gy,this);qx.log.Logger.unregister(this);}
,clear:function(){this.__bY.innerHTML=G;}
,process:function(bb){this.__bY.appendChild(qx.log.appender.Util.toHtml(bb));this.__Dl();}
,__Dl:function(){this.__bY.scrollTop=this.__bY.scrollHeight;}
,__kq:true,toggle:function(){if(!this.__Dj){this.init();}
else if(this.__Dj.style.display==A){this.show();}
else {this.__Dj.style.display=A;}
;}
,show:function(){if(!this.__Dj){this.init();}
else {this.__Dj.style.display=D;this.__bY.scrollTop=this.__bY.scrollHeight;}
;}
,__wz:[],execute:function(){var be=this.__Dk.value;if(be==G){return;}
;if(be==n){return this.clear();}
;var bc=document.createElement(f);bc.innerHTML=qx.log.appender.Util.escapeHTML(J+be);bc.className=d;this.__wz.push(be);this.__Dm=this.__wz.length;this.__bY.appendChild(bc);this.__Dl();try{var bd=window.eval(be);}
catch(bf){qx.log.Logger.error(bf);}
;if(bd!==undefined){qx.log.Logger.debug(bd);}
;}
,__qB:function(e){this.__bY.style.height=(this.__Dj.clientHeight-this.__Dj.firstChild.offsetHeight-this.__Dj.lastChild.offsetHeight)+i;}
,__gy:function(e){var bh=e.getKeyIdentifier();if((bh==B)||(bh==O&&e.isCtrlPressed())){this.toggle();e.preventDefault();}
;if(!this.__Dj){return;}
;if(!qx.dom.Hierarchy.contains(this.__Dj,e.getTarget())){return;}
;if(bh==j&&this.__Dk.value!=G){this.execute();this.__Dk.value=G;}
;if(bh==y||bh==v){this.__Dm+=bh==y?-1:1;this.__Dm=Math.min(Math.max(0,this.__Dm),this.__wz.length);var bg=this.__wz[this.__Dm];this.__Dk.value=bg||G;this.__Dk.select();}
;}
},defer:function(bi){qx.event.Registration.addListener(document.documentElement,C,bi.__gy,bi);}
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
,removeSheet:function(E){var F=E.ownerNode?E.ownerNode:E.owningElement;qx.dom.Element.removeChild(F,F.parentNode);}
,removeAllRules:function(G){if(qx.core.Environment.get(a)){var H=G.cssRules;var I=H.length;for(var i=I-1;i>=0;i--){G.deleteRule(i);}
;}
else {var H=G.rules;var I=H.length;for(var i=I-1;i>=0;i--){G.removeRule(i);}
;}
;}
,addImport:function(J,K){if(qx.core.Environment.get(o)){J.addImport(K);}
else {J.insertRule(k+K+h,J.cssRules.length);}
;}
,removeImport:function(L,M){if(qx.core.Environment.get(b)){var N=L.imports;var P=N.length;for(var i=P-1;i>=0;i--){if(N[i].href==M||N[i].href==qx.util.Uri.getAbsolute(M)){L.removeImport(i);}
;}
;}
else {var O=L.cssRules;var P=O.length;for(var i=P-1;i>=0;i--){if(O[i].href==M){L.deleteRule(i);}
;}
;}
;}
,removeAllImports:function(Q){if(qx.core.Environment.get(b)){var R=Q.imports;var T=R.length;for(var i=T-1;i>=0;i--){Q.removeImport(i);}
;}
else {var S=Q.cssRules;var T=S.length;for(var i=T-1;i>=0;i--){if(S[i].type==S[i].IMPORT_RULE){Q.deleteRule(i);}
;}
;}
;}
}});}
)();
(function(){var h="qx.bom.client.Stylesheet",g="html.stylesheet.deleterule",f="html.stylesheet.insertrule",e="html.stylesheet.createstylesheet",d="html.stylesheet.addimport",c="html.stylesheet.removeimport",b="function",a="object";qx.Bootstrap.define(h,{statics:{__ie:function(){if(!qx.bom.client.Stylesheet.__ep){qx.bom.client.Stylesheet.__ep=qx.bom.Stylesheet.createElement();}
;return qx.bom.client.Stylesheet.__ep;}
,getCreateStyleSheet:function(){return typeof document.createStyleSheet===a;}
,getInsertRule:function(){return typeof qx.bom.client.Stylesheet.__ie().insertRule===b;}
,getDeleteRule:function(){return typeof qx.bom.client.Stylesheet.__ie().deleteRule===b;}
,getAddImport:function(){return (typeof qx.bom.client.Stylesheet.__ie().addImport===a);}
,getRemoveImport:function(){return (typeof qx.bom.client.Stylesheet.__ie().removeImport===a);}
},defer:function(i){qx.core.Environment.add(e,i.getCreateStyleSheet);qx.core.Environment.add(f,i.getInsertRule);qx.core.Environment.add(g,i.getDeleteRule);qx.core.Environment.add(d,i.getAddImport);qx.core.Environment.add(c,i.getRemoveImport);}
});}
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

