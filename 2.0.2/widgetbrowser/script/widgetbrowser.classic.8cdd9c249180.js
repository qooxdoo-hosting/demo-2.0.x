qx.$$packageData['3']={"locales":{},"resources":{},"translations":{"C":{},"en":{}}};
qx.Part.$$notifyLoad("3", function() {
(function(){var k="_applyEditable",j="_applyWrap",i="keydown",h="\-]",g="mousewheel",f="_applyValue",d="y",c="number",b="_applyMinimum",a="qx.util.format.NumberFormat",J="[0-9",I="keyup",H="spinner",G="this._checkValue(value)",F="_applyMaximum",E="changeNumberFormat",D="changeMaximum",C="changeMinimum",B="_applyNumberFormat",A="qx.ui.form.Spinner",r="PageUp",s="Boolean",p="changeValue",q="Down",n="Up",o="execute",l="PageDown",m="changeLocale",t="qx.dynlocale",u="inner",w="Number",v="downbutton",y="upbutton",x="",z="textfield";qx.Class.define(A,{extend:qx.ui.core.Widget,implement:[qx.ui.form.INumberForm,qx.ui.form.IRange,qx.ui.form.IForm],include:[qx.ui.core.MContentPadding,qx.ui.form.MForm],construct:function(K,L,M){qx.ui.core.Widget.call(this);var N=new qx.ui.layout.Grid();N.setColumnFlex(0,1);N.setRowFlex(0,1);N.setRowFlex(1,1);this._setLayout(N);this.addListener(i,this._onKeyDown,this);this.addListener(I,this._onKeyUp,this);this.addListener(g,this._onMouseWheel,this);if(qx.core.Environment.get(t)){qx.locale.Manager.getInstance().addListener(m,this._onChangeLocale,this);};this._createChildControl(z);this._createChildControl(y);this._createChildControl(v);if(K!=null){this.setMinimum(K);};if(M!=null){this.setMaximum(M);};if(L!==undefined){this.setValue(L);}else {this.initValue();};},properties:{appearance:{refine:true,init:H},focusable:{refine:true,init:true},singleStep:{check:w,init:1},pageStep:{check:w,init:10},minimum:{check:w,apply:b,init:0,event:C},value:{check:G,nullable:true,apply:f,init:0,event:p},maximum:{check:w,apply:F,init:100,event:D},wrap:{check:s,init:false,apply:j},editable:{check:s,init:true,apply:k},numberFormat:{check:a,apply:B,nullable:true},allowShrinkY:{refine:true,init:false}},members:{__vV:null,__vW:false,__vX:false,_createChildControlImpl:function(O,P){var Q;switch(O){case z:Q=new qx.ui.form.TextField();Q.setFilter(this._getFilterRegExp());Q.addState(u);Q.setWidth(40);Q.setFocusable(false);Q.addListener(p,this._onTextChange,this);this._add(Q,{column:0,row:0,rowSpan:2});break;case y:Q=new qx.ui.form.RepeatButton();Q.addState(u);Q.setFocusable(false);Q.addListener(o,this._countUp,this);this._add(Q,{column:1,row:0});break;case v:Q=new qx.ui.form.RepeatButton();Q.addState(u);Q.setFocusable(false);Q.addListener(o,this._countDown,this);this._add(Q,{column:1,row:1});break;};return Q||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,O);},_getFilterRegExp:function(){var V=qx.locale.Number.getDecimalSeparator(qx.locale.Manager.getInstance().getLocale());var U=qx.locale.Number.getGroupSeparator(qx.locale.Manager.getInstance().getLocale());var T=x;var R=x;if(this.getNumberFormat()!==null){T=this.getNumberFormat().getPrefix()||x;R=this.getNumberFormat().getPostfix()||x;};var S=new RegExp(J+qx.lang.String.escapeRegexpChars(V)+qx.lang.String.escapeRegexpChars(U)+qx.lang.String.escapeRegexpChars(T)+qx.lang.String.escapeRegexpChars(R)+h);return S;},_forwardStates:{focused:true,invalid:true},tabFocus:function(){var W=this.getChildControl(z);W.getFocusElement().focus();W.selectAllText();},_applyMinimum:function(X,Y){if(this.getMaximum()<X){this.setMaximum(X);};if(this.getValue()<X){this.setValue(X);}else {this._updateButtons();};},_applyMaximum:function(ba,bb){if(this.getMinimum()>ba){this.setMinimum(ba);};if(this.getValue()>ba){this.setValue(ba);}else {this._updateButtons();};},_applyEnabled:function(bc,bd){qx.ui.core.Widget.prototype._applyEnabled.call(this,bc,bd);this._updateButtons();},_checkValue:function(be){return typeof be===c&&be>=this.getMinimum()&&be<=this.getMaximum();},_applyValue:function(bf,bg){var bh=this.getChildControl(z);this._updateButtons();this.__vV=bf;if(bf!==null){if(this.getNumberFormat()){bh.setValue(this.getNumberFormat().format(bf));}else {bh.setValue(bf+x);};}else {bh.setValue(x);};},_applyEditable:function(bi,bj){var bk=this.getChildControl(z);if(bk){bk.setReadOnly(!bi);};},_applyWrap:function(bl,bm){this._updateButtons();},_applyNumberFormat:function(bn,bo){var bp=this.getChildControl(z);bp.setFilter(this._getFilterRegExp());this.getNumberFormat().addListener(E,this._onChangeNumberFormat,this);this._applyValue(this.__vV,undefined);},_getContentPaddingTarget:function(){return this.getChildControl(z);},_updateButtons:function(){var br=this.getChildControl(y);var bq=this.getChildControl(v);var bs=this.getValue();if(!this.getEnabled()){br.setEnabled(false);bq.setEnabled(false);}else {if(this.getWrap()){br.setEnabled(true);bq.setEnabled(true);}else {if(bs!==null&&bs<this.getMaximum()){br.setEnabled(true);}else {br.setEnabled(false);};if(bs!==null&&bs>this.getMinimum()){bq.setEnabled(true);}else {bq.setEnabled(false);};};};},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case r:this.__vW=true;case n:this.getChildControl(y).press();break;case l:this.__vX=true;case q:this.getChildControl(v).press();break;default:return;};e.stopPropagation();e.preventDefault();},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case r:this.getChildControl(y).release();this.__vW=false;break;case n:this.getChildControl(y).release();break;case l:this.getChildControl(v).release();this.__vX=false;break;case q:this.getChildControl(v).release();break;};},_onMouseWheel:function(e){var bt=e.getWheelDelta(d);if(bt>0){this._countDown();}else if(bt<0){this._countUp();};e.stop();},_onTextChange:function(e){var bu=this.getChildControl(z);var bv;if(this.getNumberFormat()){try{bv=this.getNumberFormat().parse(bu.getValue());}catch(bw){};};if(bv===undefined){bv=parseFloat(bu.getValue());};if(!isNaN(bv)){if(bv>this.getMaximum()){bu.setValue(this.getMaximum()+x);return;}else if(bv<this.getMinimum()){bu.setValue(this.getMinimum()+x);return;};this.setValue(bv);}else {this._applyValue(this.__vV,undefined);};},_onChangeLocale:function(bx){if(this.getNumberFormat()!==null){this.setNumberFormat(this.getNumberFormat());var by=this.getChildControl(z);by.setFilter(this._getFilterRegExp());by.setValue(this.getNumberFormat().format(this.getValue()));};},_onChangeNumberFormat:function(bz){var bA=this.getChildControl(z);bA.setFilter(this._getFilterRegExp());bA.setValue(this.getNumberFormat().format(this.getValue()));},_countUp:function(){if(this.__vW){var bC=this.getValue()+this.getPageStep();}else {var bC=this.getValue()+this.getSingleStep();};if(this.getWrap()){if(bC>this.getMaximum()){var bB=this.getMaximum()-bC;bC=this.getMinimum()+bB;};};this.gotoValue(bC);},_countDown:function(){if(this.__vX){var bE=this.getValue()-this.getPageStep();}else {var bE=this.getValue()-this.getSingleStep();};if(this.getWrap()){if(bE<this.getMinimum()){var bD=this.getMinimum()+bE;bE=this.getMaximum()-bD;};};this.gotoValue(bE);},gotoValue:function(bF){return this.setValue(Math.min(this.getMaximum(),Math.max(this.getMinimum(),bF)));}},destruct:function(){if(qx.core.Environment.get(t)){qx.locale.Manager.getInstance().removeListener(m,this._onChangeLocale,this);};}});})();(function(){var b="qx.ui.form.IColorForm",a="qx.event.type.Data";qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;},resetValue:function(){},getValue:function(){}}});})();(function(){var b="qx.ui.form.IDateForm",a="qx.event.type.Data";qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;},resetValue:function(){},getValue:function(){}}});})();(function(){var l="day",k="lastMonth",j="Next month",h="Escape",g="Left",f="weekday",d="changeValue",c="Space",b="Down",a="qx.ui.control.DateChooser",bj="Date",bi="Enter",bh="dblclick",bg="day#",bf="Next year",be="_applyValue",bd="Up",bc="weekday#",bb="datechooser",ba="header",s="week",t="lastYear",q="nextYear",r="changeShownYear",o="week#",p="Last month",m="Last year",n="mouseup",w="keypress",z="",H="nextMonth",F="Right",P="week#0",K="changeShownMonth",V="PageUp",T="mousedown",B="today",Y="Integer",X="PageDown",W="changeLocale",A="next-month-button-tooltip",D="last-month-button-tooltip",E="qx.dynlocale",G="last-year-button-tooltip",I="next-year-button-tooltip",L="weekend",Q="last-month-button",U="default",u="next-month-button",v="otherMonth",C="month-year-label",O="last-year-button",N="navigation-bar",M="next-year-button",S="date-pane",R="click",J="selected";qx.Class.define(a,{extend:qx.ui.core.Widget,include:[qx.ui.core.MExecutable,qx.ui.form.MForm],implement:[qx.ui.form.IExecutable,qx.ui.form.IForm,qx.ui.form.IDateForm],construct:function(bk){qx.ui.core.Widget.call(this);var bm=new qx.ui.layout.VBox();this._setLayout(bm);this._createChildControl(N);this._createChildControl(S);this.addListener(w,this._onKeyPress);var bl=(bk!=null)?bk:new Date();this.showMonth(bl.getMonth(),bl.getFullYear());if(qx.core.Environment.get(E)){qx.locale.Manager.getInstance().addListener(W,this._updateDatePane,this);};this.addListener(T,this._onMouseUpDown,this);this.addListener(n,this._onMouseUpDown,this);},statics:{MONTH_YEAR_FORMAT:qx.locale.Date.getDateTimeFormat("yyyyMMMM","MMMM yyyy"),WEEKDAY_FORMAT:"EE",WEEK_FORMAT:"ww"},properties:{appearance:{refine:true,init:bb},width:{refine:true,init:200},height:{refine:true,init:150},shownMonth:{check:Y,init:null,nullable:true,event:K},shownYear:{check:Y,init:null,nullable:true,event:r},value:{check:bj,init:null,nullable:true,event:d,apply:be}},members:{__zh:null,__zi:null,__zj:null,_forwardStates:{invalid:true},_createChildControlImpl:function(bn,bo){var bp;switch(bn){case N:bp=new qx.ui.container.Composite(new qx.ui.layout.HBox());bp.add(this.getChildControl(O));bp.add(this.getChildControl(Q));bp.add(this.getChildControl(C),{flex:1});bp.add(this.getChildControl(u));bp.add(this.getChildControl(M));this._add(bp);break;case G:bp=new qx.ui.tooltip.ToolTip(this.tr(m));break;case O:bp=new qx.ui.toolbar.Button();bp.addState(t);bp.setFocusable(false);bp.setToolTip(this.getChildControl(G));bp.addListener(R,this._onNavButtonClicked,this);break;case D:bp=new qx.ui.tooltip.ToolTip(this.tr(p));break;case Q:bp=new qx.ui.toolbar.Button();bp.addState(k);bp.setFocusable(false);bp.setToolTip(this.getChildControl(D));bp.addListener(R,this._onNavButtonClicked,this);break;case A:bp=new qx.ui.tooltip.ToolTip(this.tr(j));break;case u:bp=new qx.ui.toolbar.Button();bp.addState(H);bp.setFocusable(false);bp.setToolTip(this.getChildControl(A));bp.addListener(R,this._onNavButtonClicked,this);break;case I:bp=new qx.ui.tooltip.ToolTip(this.tr(bf));break;case M:bp=new qx.ui.toolbar.Button();bp.addState(q);bp.setFocusable(false);bp.setToolTip(this.getChildControl(I));bp.addListener(R,this._onNavButtonClicked,this);break;case C:bp=new qx.ui.basic.Label();bp.setAllowGrowX(true);bp.setAnonymous(true);break;case s:bp=new qx.ui.basic.Label();bp.setAllowGrowX(true);bp.setAllowGrowY(true);bp.setSelectable(false);bp.setAnonymous(true);bp.setCursor(U);break;case f:bp=new qx.ui.basic.Label();bp.setAllowGrowX(true);bp.setAllowGrowY(true);bp.setSelectable(false);bp.setAnonymous(true);bp.setCursor(U);break;case l:bp=new qx.ui.basic.Label();bp.setAllowGrowX(true);bp.setAllowGrowY(true);bp.setCursor(U);bp.addListener(T,this._onDayClicked,this);bp.addListener(bh,this._onDayDblClicked,this);break;case S:var bq=new qx.ui.layout.Grid();bp=new qx.ui.container.Composite(bq);for(var i=0;i<8;i++){bq.setColumnFlex(i,1);};for(var i=0;i<7;i++){bq.setRowFlex(i,1);};var br=this.getChildControl(P);br.addState(ba);bp.add(br,{column:0,row:0});this.__zh=[];for(var i=0;i<7;i++){br=this.getChildControl(bc+i);bp.add(br,{column:i+1,row:0});this.__zh.push(br);};this.__zi=[];this.__zj=[];for(var y=0;y<6;y++){var br=this.getChildControl(o+(y+1));bp.add(br,{column:0,row:y+1});this.__zj.push(br);for(var x=0;x<7;x++){var br=this.getChildControl(bg+((y*7)+x));bp.add(br,{column:x+1,row:y+1});this.__zi.push(br);};};this._add(bp);break;};return bp||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,bn);},_applyValue:function(bs,bt){if((bs!=null)&&(this.getShownMonth()!=bs.getMonth()||this.getShownYear()!=bs.getFullYear())){this.showMonth(bs.getMonth(),bs.getFullYear());}else {var bv=(bs==null)?-1:bs.getDate();for(var i=0;i<6*7;i++){var bu=this.__zi[i];if(bu.hasState(v)){if(bu.hasState(J)){bu.removeState(J);};}else {var bw=parseInt(bu.getValue(),10);if(bw==bv){bu.addState(J);}else if(bu.hasState(J)){bu.removeState(J);};};};};},_onMouseUpDown:function(e){var bx=e.getTarget();if(bx==this.getChildControl(N)||bx==this.getChildControl(S)){e.stopPropagation();return;};},_onNavButtonClicked:function(by){var bA=this.getShownYear();var bz=this.getShownMonth();switch(by.getCurrentTarget()){case this.getChildControl(O):bA--;break;case this.getChildControl(Q):bz--;if(bz<0){bz=11;bA--;};break;case this.getChildControl(u):bz++;if(bz>=12){bz=0;bA++;};break;case this.getChildControl(M):bA++;break;};this.showMonth(bz,bA);},_onDayClicked:function(bB){var bC=bB.getCurrentTarget().dateTime;this.setValue(new Date(bC));},_onDayDblClicked:function(){this.execute();},_onKeyPress:function(bD){var bH=null;var bF=null;var bG=null;if(bD.getModifiers()==0){switch(bD.getKeyIdentifier()){case g:bH=-1;break;case F:bH=1;break;case bd:bH=-7;break;case b:bH=7;break;case V:bF=-1;break;case X:bF=1;break;case h:if(this.getValue()!=null){this.setValue(null);return true;};break;case bi:case c:if(this.getValue()!=null){this.execute();};return;};}else if(bD.isShiftPressed()){switch(bD.getKeyIdentifier()){case V:bG=-1;break;case X:bG=1;break;};};if(bH!=null||bF!=null||bG!=null){var bE=this.getValue();if(bE!=null){bE=new Date(bE.getTime());};if(bE==null){bE=new Date();}else {if(bH!=null){bE.setDate(bE.getDate()+bH);};if(bF!=null){bE.setMonth(bE.getMonth()+bF);};if(bG!=null){bE.setFullYear(bE.getFullYear()+bG);};};this.setValue(bE);};},showMonth:function(bI,bJ){if((bI!=null&&bI!=this.getShownMonth())||(bJ!=null&&bJ!=this.getShownYear())){if(bI!=null){this.setShownMonth(bI);};if(bJ!=null){this.setShownYear(bJ);};this._updateDatePane();};},handleKeyPress:function(e){this._onKeyPress(e);},_updateDatePane:function(){var ca=qx.ui.control.DateChooser;var bW=new Date();var bP=bW.getFullYear();var bU=bW.getMonth();var bS=bW.getDate();var cb=this.getValue();var ce=(cb==null)?-1:cb.getFullYear();var cl=(cb==null)?-1:cb.getMonth();var bX=(cb==null)?-1:cb.getDate();var bT=this.getShownMonth();var ci=this.getShownYear();var bQ=qx.locale.Date.getWeekStart();var cc=new Date(this.getShownYear(),this.getShownMonth(),1);var bY=new qx.util.format.DateFormat(ca.MONTH_YEAR_FORMAT);this.getChildControl(C).setValue(bY.format(cc));var ck=cc.getDay();var bV=1+((7-ck)%7);var cd=new qx.util.format.DateFormat(ca.WEEKDAY_FORMAT);for(var i=0;i<7;i++){var cf=(i+bQ)%7;var ch=this.__zh[i];cc.setDate(bV+cf);ch.setValue(cd.format(cc));if(qx.locale.Date.isWeekend(cf)){ch.addState(L);}else {ch.removeState(L);};};cc=new Date(ci,bT,1,12,0,0);var bL=(7+ck-bQ)%7;cc.setDate(cc.getDate()-bL);var cg=new qx.util.format.DateFormat(ca.WEEK_FORMAT);for(var bK=0;bK<6;bK++){this.__zj[bK].setValue(cg.format(cc));for(var i=0;i<7;i++){var ch=this.__zi[bK*7+i];var bO=cc.getFullYear();var bN=cc.getMonth();var bR=cc.getDate();var bM=(ce==bO&&cl==bN&&bX==bR);if(bM){ch.addState(J);}else {ch.removeState(J);};if(bN!=bT){ch.addState(v);}else {ch.removeState(v);};var cj=(bO==bP&&bN==bU&&bR==bS);if(cj){ch.addState(B);}else {ch.removeState(B);};ch.setValue(z+bR);ch.dateTime=cc.getTime();cc.setDate(cc.getDate()+1);};};bY.dispose();cd.dispose();cg.dispose();}},destruct:function(){if(qx.core.Environment.get(E)){qx.locale.Manager.getInstance().removeListener(W,this._updateDatePane,this);};this.__zh=this.__zi=this.__zj=null;}});})();
});