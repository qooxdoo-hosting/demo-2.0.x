qx.$$packageData['4099']={"locales":{},"resources":{},"translations":{"C":{},"en":{}}};
qx.Part.$$notifyLoad("4099", function() {
(function(){var e="inherit",d="toolbar-button",c="keydown",b="qx.ui.toolbar.Button",a="keyup";qx.Class.define(b,{extend:qx.ui.form.Button,construct:function(f,g,h){qx.ui.form.Button.call(this,f,g,h);this.removeListener(c,this._onKeyDown);this.removeListener(a,this._onKeyUp);},properties:{appearance:{refine:true,init:d},show:{refine:true,init:e},focusable:{refine:true,init:false}},members:{_applyVisibility:function(i,j){qx.ui.form.Button.prototype._applyVisibility.call(this,i,j);var parent=this.getLayoutParent();if(parent&&parent instanceof qx.ui.toolbar.PartContainer){qx.ui.core.queue.Appearance.add(parent);};}}});})();
});