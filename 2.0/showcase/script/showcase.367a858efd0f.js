qx.$$packageData['67']={"locales":{},"resources":{},"translations":{"C":{},"de":{"key_full_Alt":"Alt","key_full_Apps":"Kontextmenü","key_full_Backspace":"Rücktaste","key_full_CapsLock":"Feststelltaste","key_full_Control":"Steuerung","key_full_Delete":"Entfernen","key_full_Down":"Pfeil runter","key_full_End":"Ende","key_full_Enter":"Enter","key_full_Escape":"Escape","key_full_Home":"Position 1","key_full_Insert":"Einfügen","key_full_Left":"Pfeil links","key_full_Meta":"Meta","key_full_NumLock":"NumLock","key_full_PageDown":"Bild runter","key_full_PageUp":"Bild hoch","key_full_Pause":"Pause","key_full_PrintScreen":"Drucken","key_full_Right":"Pfeil rechts","key_full_Scroll":"Rollen","key_full_Shift":"Umschalttaste","key_full_Space":"Leertaste","key_full_Tab":"Tabulator","key_full_Up":"Pfeil hoch","key_full_Win":"Windowstaste","key_short_Alt":"Alt","key_short_Apps":"Kontext","key_short_Backspace":"Rück","key_short_CapsLock":"Feststell","key_short_Control":"Strg","key_short_Delete":"Entf","key_short_Down":"Runter","key_short_End":"Ende","key_short_Enter":"Enter","key_short_Escape":"Esc","key_short_Home":"Pos1","key_short_Insert":"Einfg","key_short_Left":"Links","key_short_Meta":"Meta","key_short_NumLock":"Num","key_short_PageDown":"Bild runter","key_short_PageUp":"Bild hoch","key_short_Pause":"Pause","key_short_PrintScreen":"Druck","key_short_Right":"Rechts","key_short_Scroll":"Rollen","key_short_Shift":"Umschalt","key_short_Space":"Leer","key_short_Tab":"Tab","key_short_Up":"Hoch","key_short_Win":"Win"},"en":{},"es":{"key_full_Alt":"Alt","key_full_Apps":"Aplicaciones","key_full_Backspace":"Retroceso","key_full_CapsLock":"Bloqueo Mayúsculas","key_full_Control":"Control","key_full_Delete":"Suprimir","key_full_Down":"Flecha abajo","key_full_End":"Fin","key_full_Enter":"Intro","key_full_Escape":"Escape","key_full_Home":"Inicio","key_full_Insert":"Insertar","key_full_Left":"Flecha izquierda","key_full_Meta":"Meta","key_full_NumLock":"Bloqueo Numérico","key_full_PageDown":"Avanzar Página","key_full_PageUp":"Retroceder Página","key_full_Pause":"Pausa","key_full_PrintScreen":"Imprimir Pantalla","key_full_Right":"Flecha derecha","key_full_Scroll":"Bloq. Despl.","key_full_Shift":"Mayúscula","key_full_Space":"Espacio","key_full_Tab":"Tabulador","key_full_Up":"Flecha arriba","key_full_Win":"Windows","key_short_Alt":"Alt","key_short_Apps":"Aplic","key_short_Backspace":"Retroceso","key_short_CapsLock":"BloqMayús","key_short_Control":"Ctrl","key_short_Delete":"Supr","key_short_Down":"Abajo","key_short_End":"Fin","key_short_Enter":"Intro","key_short_Escape":"Esc","key_short_Home":"Inicio","key_short_Insert":"Insert","key_short_Left":"Izquierda","key_short_Meta":"Meta","key_short_NumLock":"BloqNum","key_short_PageDown":"AvPág","key_short_PageUp":"RePág","key_short_Pause":"Pausa","key_short_PrintScreen":"ImprPant","key_short_Right":"Derecha","key_short_Scroll":"BloqDespl","key_short_Shift":"Mayús","key_short_Space":"Espacio","key_short_Tab":"Tab","key_short_Up":"Arriba","key_short_Win":"Win"},"ro":{},"sv":{"key_full_Alt":"Alt","key_full_Apps":"Apps","key_full_Backspace":"Backspace","key_full_CapsLock":"CapsLock","key_full_Control":"Control","key_full_Delete":"Delete","key_full_Down":"Ner","key_full_End":"End","key_full_Enter":"Enter","key_full_Escape":"Escape","key_full_Home":"Home","key_full_Insert":"Insert","key_full_Left":"Vänster","key_full_Meta":"Meta","key_full_NumLock":"NumLock","key_full_PageDown":"PageDown","key_full_PageUp":"PageUp","key_full_Pause":"Pause","key_full_PrintScreen":"PrintScreen","key_full_Right":"Höger","key_full_Scroll":"Scroll","key_full_Shift":"Shift","key_full_Space":"Blanksteg","key_full_Tab":"Tab","key_full_Up":"Upp","key_full_Win":"Win","key_short_Alt":"Alt","key_short_Apps":"Apps","key_short_Backspace":"BS","key_short_CapsLock":"Caps","key_short_Control":"Ctrl","key_short_Delete":"Del","key_short_Down":"Ner","key_short_End":"End","key_short_Enter":"Enter","key_short_Escape":"Esc","key_short_Home":"Home","key_short_Insert":"Ins","key_short_Left":"Vänster","key_short_Meta":"Meta","key_short_NumLock":"Num","key_short_PageDown":"PgDn","key_short_PageUp":"PgUp","key_short_Pause":"Pause","key_short_PrintScreen":"PrnScn","key_short_Right":"Höger","key_short_Scroll":"Scroll","key_short_Shift":"Shift","key_short_Space":"Space","key_short_Tab":"Tab","key_short_Up":"Upp","key_short_Win":"Win"}}};
qx.Part.$$notifyLoad("67", function() {
(function(){var b="qx.ui.form.IRadioItem",a="qx.event.type.Data";qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){},getValue:function(){},setGroup:function(d){this.assertInstance(d,qx.ui.form.RadioGroup);},getGroup:function(){}}});})();(function(){var o="qx.ui.form.RadioGroup",n="Boolean",m="menu-radiobutton",l="label",k="_applyValue",j="qx.ui.menu.RadioButton",i="value",h="changeValue",g="toolTipText",f="enabled",b="_applyGroup",d="menu",c="execute",a="checked";qx.Class.define(j,{extend:qx.ui.menu.AbstractButton,include:[qx.ui.form.MModelProperty],implement:[qx.ui.form.IRadioItem,qx.ui.form.IBooleanForm,qx.ui.form.IModel],construct:function(p,q){qx.ui.menu.AbstractButton.call(this);if(p!=null){this.setLabel(p);};if(q!=null){this.setMenu(q);};this.addListener(c,this._onExecute,this);},properties:{appearance:{refine:true,init:m},value:{check:n,nullable:true,event:h,apply:k,init:false},group:{check:o,nullable:true,apply:b}},members:{_bindableProperties:[f,l,g,i,d],_applyValue:function(r,s){r?this.addState(a):this.removeState(a);},_applyGroup:function(t,u){if(u){u.remove(this);};if(t){t.add(this);};},_onExecute:function(e){var v=this.getGroup();if(v&&v.getAllowEmptySelection()){this.toggleValue();}else {this.setValue(true);};},_onClick:function(e){if(e.isLeftPressed()){this.execute();}else {if(this.getContextMenu()){return;};};qx.ui.menu.Manager.getInstance().hideAll();},_onKeyPress:function(e){this.execute();}}});})();(function(){var r="_applyAllowEmptySelection",q="_applyInvalidMessage",p="qx.ui.form.RadioGroup",o="_applyValid",n="",m="changeRequired",k="changeValid",j="changeEnabled",h="__mP",g="changeSelection",c="_applyEnabled",f="changeInvalidMessage",d="changeValue",b="String",a="Boolean";qx.Class.define(p,{extend:qx.core.Object,implement:[qx.ui.core.ISingleSelection,qx.ui.form.IForm,qx.ui.form.IModelSelection],include:[qx.ui.core.MSingleSelectionHandling,qx.ui.form.MModelSelection],construct:function(s){qx.core.Object.call(this);this.__mP=[];this.addListener(g,this.__mQ,this);if(s!=null){this.add.apply(this,arguments);};},properties:{enabled:{check:a,apply:c,event:j,init:true},wrap:{check:a,init:true},allowEmptySelection:{check:a,init:false,apply:r},valid:{check:a,init:true,apply:o,event:k},required:{check:a,init:false,event:m},invalidMessage:{check:b,init:n,event:f,apply:q},requiredInvalidMessage:{check:b,nullable:true,event:f}},members:{__mP:null,getItems:function(){return this.__mP;},add:function(t){var u=this.__mP;var v;for(var i=0,l=arguments.length;i<l;i++){v=arguments[i];if(qx.lang.Array.contains(u,v)){continue;};v.addListener(d,this._onItemChangeChecked,this);u.push(v);v.setGroup(this);if(v.getValue()){this.setSelection([v]);};};if(!this.isAllowEmptySelection()&&u.length>0&&!this.getSelection()[0]){this.setSelection([u[0]]);};},remove:function(w){var x=this.__mP;if(qx.lang.Array.contains(x,w)){qx.lang.Array.remove(x,w);if(w.getGroup()===this){w.resetGroup();};w.removeListener(d,this._onItemChangeChecked,this);if(w.getValue()){this.resetSelection();};};},getChildren:function(){return this.__mP;},_onItemChangeChecked:function(e){var y=e.getTarget();if(y.getValue()){this.setSelection([y]);}else if(this.getSelection()[0]==y){this.resetSelection();};},_applyInvalidMessage:function(z,A){for(var i=0;i<this.__mP.length;i++){this.__mP[i].setInvalidMessage(z);};},_applyValid:function(B,C){for(var i=0;i<this.__mP.length;i++){this.__mP[i].setValid(B);};},_applyEnabled:function(D,E){var F=this.__mP;if(D==null){for(var i=0,l=F.length;i<l;i++){F[i].resetEnabled();};}else {for(var i=0,l=F.length;i<l;i++){F[i].setEnabled(D);};};},_applyAllowEmptySelection:function(G,H){if(!G&&this.isSelectionEmpty()){this.resetSelection();};},selectNext:function(){var I=this.getSelection()[0];var K=this.__mP;var J=K.indexOf(I);if(J==-1){return;};var i=0;var length=K.length;if(this.getWrap()){J=(J+1)%length;}else {J=Math.min(J+1,length-1);};while(i<length&&!K[J].getEnabled()){J=(J+1)%length;i++;};this.setSelection([K[J]]);},selectPrevious:function(){var L=this.getSelection()[0];var N=this.__mP;var M=N.indexOf(L);if(M==-1){return;};var i=0;var length=N.length;if(this.getWrap()){M=(M-1+length)%length;}else {M=Math.max(M-1,0);};while(i<length&&!N[M].getEnabled()){M=(M-1+length)%length;i++;};this.setSelection([N[M]]);},_getItems:function(){return this.getItems();},_isAllowEmptySelection:function(){return this.isAllowEmptySelection();},_isItemSelectable:function(O){return this.__mP.indexOf(O)!=-1;},__mQ:function(e){var Q=e.getData()[0];var P=e.getOldData()[0];if(P){P.setValue(false);};if(Q){Q.setValue(true);};}},destruct:function(){this._disposeArray(h);}});})();(function(){var by="Escape",bx="key_full_Meta",bw="PrintScreen",bv="NumLock",bu="key_short_Alt",bt="key_short_Control_Mac",bs="key_short_Insert",br="Del",bq="key_full_Enter",bp="key_full_Control",be="qx.locale.Key",bd="Tabulator",bc="key_full_Space",bb="key_short_Meta",ba="key_short_PageUp",Y="key_short_Pause",X="key_full_Down",W="key_short_Apps",V="key_short_Win",U="key_full_Right",bF="os.name",bG="key_short_Up",bD="key_full_PageDown",bE="key_full_Alt",bB="PgDn",bC="Esc",bz="key_full_Insert",bA="osx",bH="key_short_Space",bI="key_short_Backspace",bi="key_short_Home",bh="key_short_Down",bk="PgUp",bj="_Mac",bm="key_short_CapsLock",bl="PageUp",bo="key_full_Up",bn="key_full_Home",bg="key_full_Backspace",bf="PageDown",a="CapsLock",b="Ins",c="key_short_PrintScreen",d="Tab",e="key_full_Apps",f="key_short_Tab",g="key_short_End",h="_",i="Caps",j="key_short_NumLock",bM="Num",bL="key_full_Scroll",bK="key_short_Left",bJ="key_short_Scroll",bQ="key_",bP="key_full_Pause",bO="key_short_Right",bN="key_full_PrintScreen",bS="key_full_Win",bR="key_full_Control_Mac",E="key_short_Shift",F="key_short_PageDown",C="key_short_Enter",D="key_short_Control",I="Insert",J="key_short_Escape",G="key_full_Tab",H="Print",A="Delete",B="key_full_CapsLock",r="key_full_Escape",q="key_short_Delete",t="key_full_PageUp",s="key_full_Shift",n="key_full_NumLock",m="key_full_Delete",p="key_full_End",o="key_full_Left",l="Left",k="Meta",O="Pause",P="End",Q="Down",R="Ctrl",K="Home",L="Apps",M="Win",N="Right",S="Backspace",T="Space",z="Up",y="Shift",x="Enter",w="Scroll",v="Alt",u="Control";qx.Class.define(be,{statics:{getKeyName:function(bT,bU,bV){{};var bX=bQ+bT+h+bU;if(qx.core.Environment.get(bF)==bA&&bU==u){bX+=bj;};var bW=qx.locale.Manager.getInstance().translate(bX,[],bV);if(bW==bX){return qx.locale.Key._keyNames[bX]||bU;}else {return bW;};}},defer:function(bY){var cb={};var ca=qx.locale.Manager;cb[ca.marktr(bI)]=S;cb[ca.marktr(f)]=d;cb[ca.marktr(bH)]=T;cb[ca.marktr(C)]=x;cb[ca.marktr(E)]=y;cb[ca.marktr(D)]=R;cb[ca.marktr(bt)]=R;cb[ca.marktr(bu)]=v;cb[ca.marktr(bm)]=i;cb[ca.marktr(bb)]=k;cb[ca.marktr(J)]=bC;cb[ca.marktr(bK)]=l;cb[ca.marktr(bG)]=z;cb[ca.marktr(bO)]=N;cb[ca.marktr(bh)]=Q;cb[ca.marktr(ba)]=bk;cb[ca.marktr(F)]=bB;cb[ca.marktr(g)]=P;cb[ca.marktr(bi)]=K;cb[ca.marktr(bs)]=b;cb[ca.marktr(q)]=br;cb[ca.marktr(j)]=bM;cb[ca.marktr(c)]=H;cb[ca.marktr(bJ)]=w;cb[ca.marktr(Y)]=O;cb[ca.marktr(V)]=M;cb[ca.marktr(W)]=L;cb[ca.marktr(bg)]=S;cb[ca.marktr(G)]=bd;cb[ca.marktr(bc)]=T;cb[ca.marktr(bq)]=x;cb[ca.marktr(s)]=y;cb[ca.marktr(bp)]=u;cb[ca.marktr(bR)]=u;cb[ca.marktr(bE)]=v;cb[ca.marktr(B)]=a;cb[ca.marktr(bx)]=k;cb[ca.marktr(r)]=by;cb[ca.marktr(o)]=l;cb[ca.marktr(bo)]=z;cb[ca.marktr(U)]=N;cb[ca.marktr(X)]=Q;cb[ca.marktr(t)]=bl;cb[ca.marktr(bD)]=bf;cb[ca.marktr(p)]=P;cb[ca.marktr(bn)]=K;cb[ca.marktr(bz)]=I;cb[ca.marktr(m)]=A;cb[ca.marktr(n)]=bv;cb[ca.marktr(bN)]=bw;cb[ca.marktr(bL)]=w;cb[ca.marktr(bP)]=O;cb[ca.marktr(bS)]=M;cb[ca.marktr(e)]=L;bY._keyNames=cb;}});})();(function(){var m="-",l="PageUp",k="Escape",j="qx.event.type.Data",h="_applyShortcut",g="PrintScreen",f="NumLock",d="5",c="8",b="execute",S="Meta",R="0",Q="2",P="Shift",O="You can only specify one non modifier key!",N="3",M="/",L="Delete",K="String",J="changeEnabled",t="*",u="qx.bom.Shortcut",r="6",s="4",p="1",q="Alt",n="Not a valid key name for a shortcut: ",o="PageDown",v="Whitespaces are not allowed within shortcuts",w="_applyEnabled",B="7",A="a",D="z",C="9",F="Boolean",E="+",y="short",I="keydown",H="",G="Control",x="keypress",z="Unidentified";qx.Class.define(u,{extend:qx.core.Object,construct:function(T){qx.core.Object.call(this);this.__yf={};this.__yg=null;if(T!=null){this.setShortcut(T);};this.initEnabled();},events:{"execute":j},properties:{enabled:{init:true,check:F,event:J,apply:w},shortcut:{check:K,apply:h,nullable:true},autoRepeat:{check:F,init:false}},members:{__yf:H,__yg:H,execute:function(U){this.fireDataEvent(b,U);},__yh:function(event){if(this.getEnabled()&&this.__yi(event)){if(!this.isAutoRepeat()){this.execute(event.getTarget());};event.stop();};},__eJ:function(event){if(this.getEnabled()&&this.__yi(event)){if(this.isAutoRepeat()){this.execute(event.getTarget());};event.stop();};},_applyEnabled:function(V,W){if(V){qx.event.Registration.addListener(document.documentElement,I,this.__yh,this);qx.event.Registration.addListener(document.documentElement,x,this.__eJ,this);}else {qx.event.Registration.removeListener(document.documentElement,I,this.__yh,this);qx.event.Registration.removeListener(document.documentElement,x,this.__eJ,this);};},_applyShortcut:function(X,Y){if(X){if(X.search(/[\s]+/)!=-1){var bc=v;this.error(bc);throw new Error(bc);};this.__yf={"Control":false,"Shift":false,"Meta":false,"Alt":false};this.__yg=null;var ba;var a=[];while(X.length>0&&ba!=-1){ba=X.search(/[-+]+/);a.push((X.length==1||ba==-1)?X:X.substring(0,ba));X=X.substring(ba+1);};var bb=a.length;for(var i=0;i<bb;i++){var bd=this.__yk(a[i]);switch(bd){case G:case P:case S:case q:this.__yf[bd]=true;break;case z:var bc=n+a[i];this.error(bc);throw bc;default:if(this.__yg){var bc=O;this.error(bc);throw bc;};this.__yg=bd;};};};return true;},__yi:function(e){var be=this.__yg;if(!be){return;};if((!this.__yf.Shift&&e.isShiftPressed())||(this.__yf.Shift&&!e.isShiftPressed())||(!this.__yf.Control&&e.isCtrlPressed())||(this.__yf.Control&&!e.isCtrlPressed())||(!this.__yf.Meta&&e.isMetaPressed())||(this.__yf.Meta&&!e.isMetaPressed())||(!this.__yf.Alt&&e.isAltPressed())||(this.__yf.Alt&&!e.isAltPressed())){return false;};if(be==e.getKeyIdentifier()){return true;};return false;},__yj:{esc:k,ctrl:G,print:g,del:L,pageup:l,pagedown:o,numlock:f,numpad_0:R,numpad_1:p,numpad_2:Q,numpad_3:N,numpad_4:s,numpad_5:d,numpad_6:r,numpad_7:B,numpad_8:c,numpad_9:C,numpad_divide:M,numpad_multiply:t,numpad_minus:m,numpad_plus:E},__yk:function(bf){var bg=qx.event.util.Keyboard;var bh=z;if(bg.isValidKeyIdentifier(bf)){return bf;};if(bf.length==1&&bf>=A&&bf<=D){return bf.toUpperCase();};bf=bf.toLowerCase();var bh=this.__yj[bf]||qx.lang.String.firstUp(bf);if(bg.isValidKeyIdentifier(bh)){return bh;}else {return z;};},toString:function(){var bk=this.__yg;var bj=[];for(var bi in this.__yf){if(this.__yf[bi]){bj.push(qx.locale.Key.getKeyName(y,bi));};};if(bk){bj.push(qx.locale.Key.getKeyName(y,bk));};return bj.join(E);}},destruct:function(){this.setEnabled(false);this.__yf=this.__yg=null;}});})();(function(){var o="qx.ui.menu.Menu",n="_shortcut",m="changeEnabled",l="changeToolTipText",k="Boolean",j="qx.ui.core.Command",i="changeLabel",h="changeMenu",g="changeIcon",f="changeValue",c="_applyShortcut",e="_applyEnabled",d="qx.event.type.Data",b="execute",a="String";qx.Class.define(j,{extend:qx.core.Object,construct:function(p){qx.core.Object.call(this);this._shortcut=new qx.bom.Shortcut(p);this._shortcut.addListener(b,this.execute,this);},events:{"execute":d},properties:{enabled:{init:true,check:k,event:m,apply:e},shortcut:{check:a,apply:c,nullable:true},label:{check:a,nullable:true,event:i},icon:{check:a,nullable:true,event:g},toolTipText:{check:a,nullable:true,event:l},value:{nullable:true,event:f},menu:{check:o,nullable:true,event:h}},members:{_shortcut:null,_applyEnabled:function(q){this._shortcut.setEnabled(q);},_applyShortcut:function(r){this._shortcut.setShortcut(r);},execute:function(s){this.fireDataEvent(b,s);},toString:function(){return this._shortcut.toString();}},destruct:function(){this._disposeObjects(n);this.removeListener(b,this.execute,this);}});})();
});