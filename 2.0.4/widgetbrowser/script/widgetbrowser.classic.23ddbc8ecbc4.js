qx.$$packageData['256']={"locales":{},"resources":{"qx/icon/Oxygen/16/apps/utilities-calculator.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/apps/utilities-notes.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/apps/utilities-terminal.png":[16,16,"png","qx"]},"translations":{}};
qx.Part.$$notifyLoad("256", function() {
(function(){var o="icon/16/apps/utilities-calculator.png",n="Layout-Settings…",m="Notes",l="icon/16/apps/utilities-notes.png",k="Layout",j="bottom",h="icon/16/apps/utilities-terminal.png",g="Notes…",f="top",e="left",b="Calculator",d="right",c="widgetbrowser.pages.Tab",a="Calculator…";qx.Class.define(c,{extend:widgetbrowser.pages.AbstractPage,construct:function(){widgetbrowser.pages.AbstractPage.call(this);this.__mi=new qx.ui.container.Composite(new qx.ui.layout.Grid(10,20));this.add(this.__mi);this.initWidgets();},members:{__mi:null,initWidgets:function(){var p=this._widgets;var r=this.__NF();r.setBarPosition(f);this.__mi.add(r,{row:0,column:0});p.push(r);var q=this.__NF();q.setBarPosition(j);this.__mi.add(q,{row:0,column:1});p.push(q);var s=this.__NF();s.setBarPosition(e);this.__mi.add(s,{row:1,column:0});p.push(s);var t=this.__NF();t.setBarPosition(d);this.__mi.add(t,{row:1,column:1});p.push(t);},toggleOverflow:function(u,v){if(!v){var w=u.getChildren();for(var i=w.length-1;i>=0;i--){u.remove(w[i]);};}else {this.addTabPages(u);};this.addTabPages(u);},__NF:function(){var x=new qx.ui.tabview.TabView();x.toggleOverflow=qx.lang.Function.bind(this.toggleOverflow,this);x.setWidth(400);x.setHeight(200);this.addTabPages(x);return x;},addTabPages:function(y){var B=new qx.ui.tabview.Page(k,h);B.setLayout(new qx.ui.layout.VBox());B.add(new qx.ui.basic.Label(n));y.add(B);var z=new qx.ui.tabview.Page(m,l);z.setLayout(new qx.ui.layout.VBox());z.add(new qx.ui.basic.Label(g));y.add(z);var A=new qx.ui.tabview.Page(b,o);A.setLayout(new qx.ui.layout.VBox());A.add(new qx.ui.basic.Label(a));y.add(A);}}});})();
});