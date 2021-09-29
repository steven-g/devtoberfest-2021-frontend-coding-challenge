/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","./Suggest","sap/ui/Device","./SearchFieldRenderer","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/cursorPos"],function(e,t,s,o,i,r,n,u,a){"use strict";var g=sap.ui.getCore().getLibraryResourceBundle("sap.m");n.oSearchFieldToolTips={SEARCH_BUTTON_TOOLTIP:g.getText("SEARCHFIELD_SEARCH_BUTTON_TOOLTIP"),RESET_BUTTON_TOOLTIP:g.getText("SEARCHFIELD_RESET_BUTTON_TOOLTIP"),REFRESH_BUTTON_TOOLTIP:g.getText("SEARCHFIELD_REFRESH_BUTTON_TOOLTIP")};var l=t.extend("sap.m.SearchField",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.f.IShellBar"],library:"sap.m",properties:{value:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},visible:{type:"boolean",group:"Appearance",defaultValue:true},maxLength:{type:"int",group:"Behavior",defaultValue:0},placeholder:{type:"string",group:"Misc",defaultValue:null},showMagnifier:{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},showRefreshButton:{type:"boolean",group:"Behavior",defaultValue:false},refreshButtonTooltip:{type:"string",group:"Misc",defaultValue:null},showSearchButton:{type:"boolean",group:"Behavior",defaultValue:true},enableSuggestions:{type:"boolean",group:"Behavior",defaultValue:false},selectOnFocus:{type:"boolean",group:"Behavior",defaultValue:true,deprecated:true}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},defaultAggregation:"suggestionItems",designtime:"sap/m/designtime/SearchField.designtime",aggregations:{suggestionItems:{type:"sap.m.SuggestionItem",multiple:true,singularName:"suggestionItem"}},events:{search:{parameters:{query:{type:"string"},suggestionItem:{type:"sap.m.SuggestionItem"},refreshButtonPressed:{type:"boolean"},clearButtonPressed:{type:"boolean"}}},liveChange:{parameters:{newValue:{type:"string"}}},suggest:{parameters:{suggestValue:{type:"string"}}}}}});s.call(l.prototype);o.insertFontFaceStyle();l.prototype.init=function(){this.setProperty("placeholder",g.getText("FACETFILTER_SEARCH"),true)};l.prototype.getFocusDomRef=function(){return this.getInputElement()};l.prototype.getFocusInfo=function(){var e=t.prototype.getFocusInfo.call(this),s=this.getDomRef("I");if(s){a.extend(e,{cursorPos:a(s).cursorPos()})}return e};l.prototype.applyFocusInfo=function(e){t.prototype.applyFocusInfo.call(this,e);if("cursorPos"in e){this.$("I").cursorPos(e.cursorPos)}return this};l.prototype.getWidth=function(){return this.getProperty("width")||"100%"};l.prototype._hasPlaceholder=function(){return"placeholder"in document.createElement("input")}();l.prototype.getInputElement=function(){return this.getDomRef("I")};l.prototype.onBeforeRendering=function(){this._unregisterEventListeners()};l.prototype.onAfterRendering=function(){var e=this.getInputElement();this._resetElement=this.getDomRef("reset");a(e).on("input",this.onInput.bind(this)).on("search",this.onSearch.bind(this)).on("focus",this.onFocus.bind(this)).on("blur",this.onBlur.bind(this));a(this.getDomRef("F")).on("click",this.onFormClick.bind(this));if(r.system.desktop||r.system.combi){this.$().on("touchstart mousedown",this.onButtonPress.bind(this));if(r.browser.firefox){this.$().find(".sapMSFB").on("mouseup mouseout",function(e){a(e.target).removeClass("sapMSFBA")})}}else if(window.PointerEvent){a(this._resetElement).on("touchstart",function(){this._active=document.activeElement}.bind(this))}var t=sap.ui.getCore();if(!t.isThemeApplied()){t.attachThemeChanged(this._handleThemeLoad,this)}};l.prototype._handleThemeLoad=function(){if(this._oSuggest){this._oSuggest.setPopoverMinWidth()}var e=sap.ui.getCore();e.detachThemeChanged(this._handleThemeLoad,this)};l.prototype.clear=function(e){var t=e&&e.value||"";if(!this.getInputElement()||this.getValue()===t){return}this.setValue(t);d(this);this.fireLiveChange({newValue:t});this.fireSearch({query:t,refreshButtonPressed:false,clearButtonPressed:!!(e&&e.clearButton)})};l.prototype.exit=function(){this._unregisterEventListeners();if(this._oSuggest){this._oSuggest.destroy(true);this._oSuggest=null}};l.prototype.onButtonPress=function(e){if(e.originalEvent.button===2){return}var t=this.getInputElement();if(document.activeElement===t&&e.target!==t){e.preventDefault()}if(r.browser.firefox){var s=a(e.target);if(s.hasClass("sapMSFB")){s.addClass("sapMSFBA")}}};l.prototype.ontouchstart=function(e){this._oTouchStartTarget=e.target};l.prototype.ontouchend=function(e){if(e.originalEvent.button===2){return}var t=e.target,s=true,o=this.getInputElement();if(this._oTouchStartTarget){s=this._oTouchStartTarget===t;this._oTouchStartTarget=null}if(t.id==this.getId()+"-reset"&&s){h(this);this._bSuggestionSuppressed=true;var i=!this.getValue();this.clear({clearButton:true});var n=document.activeElement;if((r.system.desktop||i||/(INPUT|TEXTAREA)/i.test(n.tagName)||n===this._resetElement&&this._active===o)&&n!==o){o.focus()}}else if(t.id==this.getId()+"-search"&&s){h(this);if(r.system.desktop&&!this.getShowRefreshButton()&&document.activeElement!==o){o.focus()}this.fireSearch({query:this.getValue(),refreshButtonPressed:!!(this.getShowRefreshButton()&&!this.$().hasClass("sapMFocus")),clearButtonPressed:false})}else{this.onmouseup(e)}};l.prototype.onmouseup=function(e){if(r.system.phone&&this.getEnabled()&&e.target.tagName=="INPUT"&&document.activeElement===e.target&&!c(this)){this.onFocus(e)}};l.prototype.onFormClick=function(e){if(this.getEnabled()&&e.target.tagName=="FORM"){this.getInputElement().focus()}};l.prototype.onSearch=function(e){var t=this.getInputElement().value;this.setValue(t);this.fireSearch({query:t,refreshButtonPressed:false,clearButtonPressed:false});if(!r.system.desktop){this._blur()}};l.prototype._blur=function(){var e=this;window.setTimeout(function(){var t=e.getInputElement();if(t){t.blur()}},13)};l.prototype.onChange=function(e){this.setValue(this.getInputElement().value)};l.prototype.onInput=function(e){var t=this.getInputElement().value;if(t!=this.getValue()){this.setValue(t);this.fireLiveChange({newValue:t});if(this.getEnableSuggestions()){if(this._iSuggestDelay){clearTimeout(this._iSuggestDelay)}this._iSuggestDelay=setTimeout(function(){this.fireSuggest({suggestValue:t});d(this);this._iSuggestDelay=null}.bind(this),400)}}};l.prototype.onkeydown=function(e){var t;var s;var o;switch(e.which){case u.F5:case u.ENTER:this.$("search").toggleClass("sapMSFBA",true);e.stopPropagation();e.preventDefault();if(c(this)){h(this);if((t=this._oSuggest.getSelected())>=0){s=this.getSuggestionItems()[t];this.setValue(s.getSuggestionText())}}this.fireSearch({query:this.getValue(),suggestionItem:s,refreshButtonPressed:this.getShowRefreshButton()&&e.which===u.F5,clearButtonPressed:false});break;case u.ESCAPE:if(c(this)){h(this);e.setMarked()}else{o=this.getValue();if(o===this._sOriginalValue){this._sOriginalValue=""}this.clear({value:this._sOriginalValue});if(o!==this.getValue()){e.setMarked()}}e.preventDefault();break}};l.prototype.onkeyup=function(e){if(e.which===u.F5||e.which===u.ENTER){this.$("search").toggleClass("sapMSFBA",false)}};l.prototype.onFocus=function(e){if(r.browser.internet_explorer&&!document.hasFocus()){return}this.$().toggleClass("sapMFocus",true);this._sOriginalValue=this.getValue();if(this.getEnableSuggestions()){if(!this._bSuggestionSuppressed){this.fireSuggest({suggestValue:this.getValue()})}else{this._bSuggestionSuppressed=false}}this._setToolTips(e.type)};l.prototype.onBlur=function(e){this.$().toggleClass("sapMFocus",false);if(this._bSuggestionSuppressed){this._bSuggestionSuppressed=false}this._setToolTips(e.type)};l.prototype._setToolTips=function(e){var t=this.$("search"),s=this.$("reset");if(this.getShowRefreshButton()){if(e==="focus"){t.attr("title",n.oSearchFieldToolTips.SEARCH_BUTTON_TOOLTIP)}else if(e==="blur"){var o=this.getRefreshButtonTooltip(),i=o===""?n.oSearchFieldToolTips.REFRESH_BUTTON_TOOLTIP:o;if(i){t.attr("title",i)}}}if(this.getValue()===""){s.attr("title",n.oSearchFieldToolTips.SEARCH_BUTTON_TOOLTIP)}else{s.attr("title",n.oSearchFieldToolTips.RESET_BUTTON_TOOLTIP)}};l.prototype.setValue=function(e){e=e||"";var t=this.getInputElement();if(t){if(t.value!==e){t.value=e}var s=this.$();if(s.hasClass("sapMSFVal")==!e){s.toggleClass("sapMSFVal",!!e)}}this.setProperty("value",e,true);this._setToolTips();return this};l.prototype._unregisterEventListeners=function(){var e=this.getInputElement();if(e){this.$().find(".sapMSFB").off();this.$().off();a(this.getDomRef("F")).off();a(e).off()}};l.prototype.onsapshow=function(e){if(this.getEnableSuggestions()){if(c(this)){h(this)}else{this.fireSuggest({suggestValue:this.getValue()})}}};l.prototype.onsaphide=function(e){this.suggest(false)};function p(e,t,s,o){var i;if(c(e)){i=e._oSuggest.setSelected(s,o);if(i>=0){e.setValue(e.getSuggestionItems()[i].getSuggestionText())}t.preventDefault()}}l.prototype.onsapdown=function(e){p(this,e,1,true)};l.prototype.onsapup=function(e){p(this,e,-1,true)};l.prototype.onsaphome=function(e){p(this,e,0,false)};l.prototype.onsapend=function(e){var t=this.getSuggestionItems().length-1;p(this,e,t,false)};l.prototype.onsappagedown=function(e){p(this,e,10,true)};l.prototype.onsappageup=function(e){p(this,e,-10,true)};l.prototype._applySuggestionAcc=function(){var e="",t=this.getSuggestionItems().length;if(t===1){e=g.getText("INPUT_SUGGESTIONS_ONE_HIT")}else if(t>1){e=g.getText("INPUT_SUGGESTIONS_MORE_HITS",t)}else{e=g.getText("INPUT_SUGGESTIONS_NO_HIT")}this.$("SuggDescr").text(e)};l.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("F")};function h(e){e._oSuggest&&e._oSuggest.close()}function f(e){if(e.getEnableSuggestions()){if(!e._oSuggest){e._oSuggest=new i(e)}e._oSuggest.open()}}function c(e){return e._oSuggest&&e._oSuggest.isOpen()}l.prototype.suggest=function(e){if(this.getEnableSuggestions()){e=e===undefined||!!e;if(e&&(this.getSuggestionItems().length||r.system.phone)){f(this)}else{h(this)}}return this};function d(e){e._oSuggest&&e._oSuggest.update()}var S="suggestionItems";l.prototype.insertSuggestionItem=function(e,s,o){d(this);return t.prototype.insertAggregation.call(this,S,e,s,true)};l.prototype.addSuggestionItem=function(e,s){d(this);return t.prototype.addAggregation.call(this,S,e,true)};l.prototype.removeSuggestionItem=function(e,s){d(this);return t.prototype.removeAggregation.call(this,S,e,true)};l.prototype.removeAllSuggestionItems=function(e){d(this);return t.prototype.removeAllAggregation.call(this,S,true)};return l});