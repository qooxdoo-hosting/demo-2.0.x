qx.$$packageData['128']={"locales":{},"resources":{"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/internet-feed-reader.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/internet-telephony.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/22/apps/utilities-calculator.png":[22,22,"png","qx"],"qx/icon/Tango/32/apps/office-address-book.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/dialog-error.png":[32,32,"png","qx"]},"translations":{"C":{},"en":{}}};
qx.Part.$$notifyLoad("128", function() {
(function(){var l="Yes",k="Second Window",j="Page 1",h="bottom",g="Use move frame",f="Show Statusbar",d="icon/16/actions/dialog-cancel.png",c="icon/32/status/dialog-error.png",b="Show Close",a="Third Window",bg="icon/22/apps/utilities-calculator.png",bf="Show Maximize",be="Demo loaded",bd="Allow Close",bc="Use resize frame",bb="No",ba="resizable",Y="Allow Maximize",X="value",W="The second window",s="Page 3",t="move",q="Resizable ",r="First Window",o="Resized to: ",p="resize",m="Moveable",n="#ddd",w="Allow Minimize",x="Moved to: ",F="Open Modal Dialog 2",D="Do you want to fly to Berlin?",M="Open Modal Dialog 1",H="Resizable",S="top",Q="Movable",z="icon/32/apps/office-address-book.png",V="Sorry, please click 'Yes'!",U="Basics",T="Modal",y="icon/16/apps/internet-telephony.png",B="Welcome to your first own Window.<br/>Have fun!",C="Application is ready",E="icon/16/apps/internet-feed-reader.png",G="Second Modal Dialog",I="icon/16/actions/dialog-ok.png",N="widgetbrowser.pages.Window",R="Page 2",u="left",v="Show Minimize",A="First Modal Dialog",L="right",K="x",J="icon/16/apps/office-calendar.png",P="execute",O="changeValue";qx.Class.define(N,{extend:widgetbrowser.pages.AbstractPage,construct:function(){widgetbrowser.pages.AbstractPage.call(this);this.__pA=new qx.ui.window.Desktop().set({decorator:new qx.ui.decoration.Single(10,null,n)});this.add(this.__pA,{edge:0,top:0});this.initWidgets();},members:{__pA:null,initWidgets:function(){var bk,bj,bi;var bh=this._widgets;bk=this.__Ns();bh.push(bk);bk.open();this.__pA.add(bk,{left:0,top:0});bj=this.__Nt();bh.push(bj);bj.open();this.__pA.add(bj,{left:300,top:100});bi=this.__Nu();bh.push(bi);bi.open();this.__pA.add(bi,{left:80,top:230});},__Ns:function(){var bn=new qx.ui.window.Window(r,J);bn.setLayout(new qx.ui.layout.VBox(10));bn.setShowStatusbar(true);bn.setStatus(be);bn.addListener(t,function(e){this.debug(x+e.getData().left+K+e.getData().top);},this);bn.addListener(p,function(e){this.debug(o+e.getData().width+K+e.getData().height);},this);var bm=new qx.ui.basic.Atom(B,z);bm.setRich(true);bn.add(bm);var bl=new qx.ui.tabview.TabView;bn.add(bl,{flex:1});var bq=new qx.ui.tabview.Page(j);bl.add(bq);var bo=new qx.ui.tabview.Page(R);bl.add(bo);var bp=new qx.ui.tabview.Page(s);bl.add(bp);return bn;},__Nt:function(){var bx=new qx.ui.window.Window(k,E);bx.setLayout(new qx.ui.layout.VBox(10));bx.setStatus(C);var bG=new qx.ui.basic.Atom(W,bg);bx.add(bG);var br=new qx.ui.container.Composite;br.setLayout(new qx.ui.layout.HBox(10));bx.add(br,{flex:1});var bz=new qx.ui.groupbox.GroupBox(U);bz.setLayout(new qx.ui.layout.VBox(4));br.add(bz,{flex:1});var bu=new qx.ui.form.CheckBox(b);bu.setValue(true);bu.addListener(O,function(e){bx.setShowClose(e.getData());});bz.add(bu);var bF=new qx.ui.form.CheckBox(bf);bF.setValue(true);bF.addListener(O,function(e){bx.setShowMaximize(e.getData());});bz.add(bF);var by=new qx.ui.form.CheckBox(v);by.setValue(true);by.addListener(O,function(e){bx.setShowMinimize(e.getData());});bz.add(by);var bB=new qx.ui.form.CheckBox(bd);bB.setValue(true);bB.addListener(O,function(e){bx.setAllowClose(e.getData());});bz.add(bB);var bH=new qx.ui.form.CheckBox(Y);bH.setValue(true);bH.addListener(O,function(e){bx.setAllowMaximize(e.getData());});bz.add(bH);var bw=new qx.ui.form.CheckBox(w);bw.setValue(true);bw.addListener(O,function(e){bx.setAllowMinimize(e.getData());});bz.add(bw);var bs=new qx.ui.form.CheckBox(f);bs.setValue(false);bs.addListener(O,function(e){bx.setShowStatusbar(e.getData());});bz.add(bs);var bJ=new qx.ui.groupbox.GroupBox(H);bJ.setLayout(new qx.ui.layout.VBox(4));br.add(bJ,{flex:1});var bD=new qx.ui.form.CheckBox(bc);bD.setValue(true);bD.addListener(O,function(e){bx.setUseResizeFrame(e.getData());});bJ.add(bD);var bE=[S,L,h,u];for(var i=0;i<bE.length;i++){var bC=bE[i];var bv=new qx.ui.form.CheckBox(q+bC).set({value:true});bv.bind(X,bx,ba+qx.lang.String.firstUp(bC));bJ.add(bv);};var bt=new qx.ui.groupbox.GroupBox(m);bt.setLayout(new qx.ui.layout.VBox(4));br.add(bt,{flex:1});var bA=new qx.ui.form.CheckBox(Q);bA.setValue(true);bA.addListener(O,function(e){bx.setMovable(e.getData());});bt.add(bA);var bI=new qx.ui.form.CheckBox(g);bI.addListener(O,function(e){bx.setUseMoveFrame(e.getData());});bt.add(bI);return bx;},__Nu:function(){var bK=new qx.ui.window.Window(a,y);bK.setLayout(new qx.ui.layout.VBox);bK.setMinWidth(200);bK.setMaxWidth(450);bK.setMaxHeight(400);bK.setAllowMaximize(false);var bL=this.__Nv();this._widgets.push(bL);var bM=new qx.ui.form.Button(M,J);bM.addListener(P,bL.open,bL);bK.add(bM);return bK;},__Nv:function(){var bO=new qx.ui.window.Window(A);bO.setLayout(new qx.ui.layout.VBox(10));bO.setModal(true);bO.moveTo(150,150);this.__pA.add(bO);var bN=this.__Nw();this._widgets.push(bN);var bQ=new qx.ui.form.Button(F,J);bQ.addListener(P,bN.open,bN);bO.add(bQ);var bP=new qx.ui.form.CheckBox(T);bP.setValue(true);bO.add(bP);bP.addListener(O,function(e){bO.setModal(e.getData());});return bO;},__Nw:function(){var bS=new qx.ui.window.Window(G);bS.setLayout(new qx.ui.layout.VBox(10));bS.setModal(true);bS.setShowClose(false);bS.moveTo(300,300);this.__pA.add(bS);var bR=new qx.ui.basic.Atom(D,c);bS.add(bR);var bU=new qx.ui.container.Composite;bU.setLayout(new qx.ui.layout.HBox(10,L));bS.add(bU);var bV=new qx.ui.form.Button(l,I);bV.addListener(P,function(e){bS.close();});bU.add(bV);var bT=new qx.ui.form.Button(bb,d);bT.addListener(P,function(e){alert(V);});bU.add(bT);return bS;}}});})();(function(){var a="qx.ui.window.Desktop";qx.Class.define(a,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.window.MDesktop,qx.ui.core.MBlocker],implement:qx.ui.window.IDesktop,construct:function(b){qx.ui.core.Widget.call(this);b=b||new qx.ui.window.Window.DEFAULT_MANAGER_CLASS();this.getContentElement().disableScrolling();this._setLayout(new qx.ui.layout.Canvas());this.setWindowManager(b);}});})();
});