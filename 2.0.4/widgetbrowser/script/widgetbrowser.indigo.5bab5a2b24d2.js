qx.$$packageData['128']={"locales":{},"resources":{"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/internet-feed-reader.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/internet-telephony.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/22/apps/utilities-calculator.png":[22,22,"png","qx"],"qx/icon/Tango/32/apps/office-address-book.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/dialog-error.png":[32,32,"png","qx"]},"translations":{"C":{},"en":{}}};
qx.Part.$$notifyLoad("128", function() {
(function(){var q="resize",p="Welcome to your first own Window.<br/>Have fun!",o="#ddd",n="Page 1",m="Moved to: ",l="icon/16/apps/office-calendar.png",k="widgetbrowser.pages.Window",j="Page 2",h="Page 3",g="move",c="icon/32/apps/office-address-book.png",f="First Window",d="Resized to: ",b="Demo loaded",a="x";qx.Class.define(k,{extend:widgetbrowser.pages.AbstractPage,construct:function(){widgetbrowser.pages.AbstractPage.call(this);this.__pD=new qx.ui.window.Desktop().set({decorator:new qx.ui.decoration.Single(10,null,o)});this.add(this.__pD,{edge:0,top:0});this.initWidgets();},members:{__pD:null,initWidgets:function(){var u,t,s;var r=this._widgets;u=this.__Nz();r.push(u);u.open();this.__pD.add(u,{left:0,top:0});t=this.__NA();r.push(t);t.open();this.__pD.add(t,{left:300,top:100});s=this.__NB();r.push(s);s.open();this.__pD.add(s,{left:80,top:230});},__Nz:function(){var x=new qx.ui.window.Window(f,l);x.setLayout(new qx.ui.layout.VBox(10));x.setShowStatusbar(true);x.setStatus(b);x.addListener(g,function(e){this.debug(m+e.getData().left+a+e.getData().top);},this);x.addListener(q,function(e){this.debug(d+e.getData().width+a+e.getData().height);},this);var w=new qx.ui.basic.Atom(p,c);w.setRich(true);x.add(w);var v=new qx.ui.tabview.TabView;x.add(v,{flex:1});var A=new qx.ui.tabview.Page(n);v.add(A);var y=new qx.ui.tabview.Page(j);v.add(y);var z=new qx.ui.tabview.Page(h);v.add(z);return x;},__NA:function(){var H=new qx.ui.window.Window("Second Window","icon/16/apps/internet-feed-reader.png");H.setLayout(new qx.ui.layout.VBox(10));H.setStatus("Application is ready");var Q=new qx.ui.basic.Atom("The second window","icon/22/apps/utilities-calculator.png");H.add(Q);var B=new qx.ui.container.Composite;B.setLayout(new qx.ui.layout.HBox(10));H.add(B,{flex:1});var J=new qx.ui.groupbox.GroupBox("Basics");J.setLayout(new qx.ui.layout.VBox(4));B.add(J,{flex:1});var E=new qx.ui.form.CheckBox("Show Close");E.setValue(true);E.addListener("changeValue",function(e){H.setShowClose(e.getData());});J.add(E);var P=new qx.ui.form.CheckBox("Show Maximize");P.setValue(true);P.addListener("changeValue",function(e){H.setShowMaximize(e.getData());});J.add(P);var I=new qx.ui.form.CheckBox("Show Minimize");I.setValue(true);I.addListener("changeValue",function(e){H.setShowMinimize(e.getData());});J.add(I);var L=new qx.ui.form.CheckBox("Allow Close");L.setValue(true);L.addListener("changeValue",function(e){H.setAllowClose(e.getData());});J.add(L);var R=new qx.ui.form.CheckBox("Allow Maximize");R.setValue(true);R.addListener("changeValue",function(e){H.setAllowMaximize(e.getData());});J.add(R);var G=new qx.ui.form.CheckBox("Allow Minimize");G.setValue(true);G.addListener("changeValue",function(e){H.setAllowMinimize(e.getData());});J.add(G);var C=new qx.ui.form.CheckBox("Show Statusbar");C.setValue(false);C.addListener("changeValue",function(e){H.setShowStatusbar(e.getData());});J.add(C);var T=new qx.ui.groupbox.GroupBox("Resizable");T.setLayout(new qx.ui.layout.VBox(4));B.add(T,{flex:1});var N=new qx.ui.form.CheckBox("Use resize frame");N.setValue(true);N.addListener("changeValue",function(e){H.setUseResizeFrame(e.getData());});T.add(N);var O=["top","right","bottom","left"];for(var i=0;i<O.length;i++){var M=O[i];var F=new qx.ui.form.CheckBox("Resizable "+M).set({value:true});F.bind("value",H,"resizable"+qx.lang.String.firstUp(M));T.add(F);};var D=new qx.ui.groupbox.GroupBox("Moveable");D.setLayout(new qx.ui.layout.VBox(4));B.add(D,{flex:1});var K=new qx.ui.form.CheckBox("Movable");K.setValue(true);K.addListener("changeValue",function(e){H.setMovable(e.getData());});D.add(K);var S=new qx.ui.form.CheckBox("Use move frame");S.addListener("changeValue",function(e){H.setUseMoveFrame(e.getData());});D.add(S);return H;},__NB:function(){var U=new qx.ui.window.Window("Third Window","icon/16/apps/internet-telephony.png");U.setLayout(new qx.ui.layout.VBox);U.setMinWidth(200);U.setMaxWidth(450);U.setMaxHeight(400);U.setAllowMaximize(false);var V=this.__NC();this._widgets.push(V);var W=new qx.ui.form.Button("Open Modal Dialog 1","icon/16/apps/office-calendar.png");W.addListener("execute",V.open,V);U.add(W);return U;},__NC:function(){var Y=new qx.ui.window.Window("First Modal Dialog");Y.setLayout(new qx.ui.layout.VBox(10));Y.setModal(true);Y.moveTo(150,150);this.__pD.add(Y);var X=this.__ND();this._widgets.push(X);var bb=new qx.ui.form.Button("Open Modal Dialog 2","icon/16/apps/office-calendar.png");bb.addListener("execute",X.open,X);Y.add(bb);var ba=new qx.ui.form.CheckBox("Modal");ba.setValue(true);Y.add(ba);ba.addListener("changeValue",function(e){Y.setModal(e.getData());});return Y;},__ND:function(){var bd=new qx.ui.window.Window("Second Modal Dialog");bd.setLayout(new qx.ui.layout.VBox(10));bd.setModal(true);bd.setShowClose(false);bd.moveTo(300,300);this.__pD.add(bd);var bc=new qx.ui.basic.Atom("Do you want to fly to Berlin?","icon/32/status/dialog-error.png");bd.add(bc);var bf=new qx.ui.container.Composite;bf.setLayout(new qx.ui.layout.HBox(10,"right"));bd.add(bf);var bg=new qx.ui.form.Button("Yes","icon/16/actions/dialog-ok.png");bg.addListener("execute",function(e){bd.close();});bf.add(bg);var be=new qx.ui.form.Button("No","icon/16/actions/dialog-cancel.png");be.addListener("execute",function(e){alert("Sorry, please click 'Yes'!");});bf.add(be);return bd;}}});})();(function(){var a="qx.ui.window.Desktop";qx.Class.define(a,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.window.MDesktop,qx.ui.core.MBlocker],implement:qx.ui.window.IDesktop,construct:function(b){qx.ui.core.Widget.call(this);b=b||new qx.ui.window.Window.DEFAULT_MANAGER_CLASS();this.getContentElement().disableScrolling();this._setLayout(new qx.ui.layout.Canvas());this.setWindowManager(b);}});})();
});