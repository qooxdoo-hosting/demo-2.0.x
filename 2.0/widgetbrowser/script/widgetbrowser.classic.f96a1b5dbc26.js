qx.$$packageData['131']={"locales":{},"resources":{},"translations":{"C":{},"en":{}}};
qx.Part.$$notifyLoad("131", function() {
(function(){var i="resize",h="qx.ui.groupbox.GroupBox",g="groupbox",f="_applyLegendPosition",d="top",c="middle",b="frame",a="legend";qx.Class.define(h,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling,qx.ui.core.MContentPadding,qx.ui.form.MForm],implement:[qx.ui.form.IForm],construct:function(j,k){qx.ui.core.Widget.call(this);this._setLayout(new qx.ui.layout.Canvas);this._createChildControl(b);this._createChildControl(a);if(j!=null){this.setLegend(j);};if(k!=null){this.setIcon(k);};},properties:{appearance:{refine:true,init:g},legendPosition:{check:[d,c],init:c,apply:f,themeable:true}},members:{_forwardStates:{invalid:true},_createChildControlImpl:function(l,m){var n;switch(l){case b:n=new qx.ui.container.Composite();this._add(n,{left:0,top:6,right:0,bottom:0});break;case a:n=new qx.ui.basic.Atom();n.addListener(i,this._repositionFrame,this);this._add(n,{left:0,right:0});break;};return n||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,l);},_getContentPaddingTarget:function(){return this.getChildControl(b);},_applyLegendPosition:function(e){if(this.getChildControl(a).getBounds()){this._repositionFrame();};},_repositionFrame:function(){var p=this.getChildControl(a);var o=this.getChildControl(b);var q=p.getBounds().height;if(this.getLegendPosition()==c){o.setLayoutProperties({"top":Math.round(q/2)});}else if(this.getLegendPosition()==d){o.setLayoutProperties({"top":q});};},getChildrenContainer:function(){return this.getChildControl(b);},setLegend:function(r){var s=this.getChildControl(a);if(r!==null){s.setLabel(r);s.show();}else {s.exclude();};},getLegend:function(){return this.getChildControl(a).getLabel();},setIcon:function(t){this.getChildControl(a).setIcon(t);},getIcon:function(){this.getChildControl(a).getIcon();}}});})();
});