/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library"],function(e){"use strict";var a=sap.ui.getCore().getLibraryResourceBundle("sap.m");var t=e.DeviationIndicator,s=e.LoadState,r=e.ValueColor;var n={apiVersion:2};n.render=function(e,t){var r=t.getState();var n=t.getWithMargin();var l=n?"":"WithoutMargin";e.openStart("div",t);var i=t.getTooltip_AsString();if(typeof i!=="string"){i=""}e.attr("aria-label",i);e.attr("role","img");e.attr("aria-roledescription",a.getText("NUMERIC_CONTENT_ROLE_DESCRIPTION"));if(r===s.Failed||r===s.Loading){e.attr("aria-disabled","true")}if(t.getAnimateTextChange()){e.class("sapMNCAnimation")}if(t.getWidth()){e.style("width",t.getSize())}e.class("sapMNC");e.class(l);if(t.hasListeners("press")){e.attr("tabindex",0);e.class("sapMPointer")}e.openEnd();e.openStart("div");e.class("sapMNCInner");e.class(l);e.openEnd();this._renderValue(e,t,l);e.close("div");e.close("div")};n._prepareAndRenderIcon=function(e,a,t,r){if(t){var n,l=a.getState();for(n in s){if(s.hasOwnProperty(n)&&n!==l){t.removeStyleClass(n)}else if(s.hasOwnProperty(n)&&n===l){t.addStyleClass(n)}}t.addStyleClass("sapMNCIconImage");var i={sapMNCLargeFontSize:false,sapMNCMediumFontSize:false,sapMNCSmallFontSize:false};i[r]=true;Object.keys(i).forEach(function(e){t.toggleStyleClass(e,i[e])});e.renderControl(t)}};n._renderScaleAndIndicator=function(e,a,s,r,n,l){var i=t.None!==a.getIndicator()&&r!=="";var o=n&&r;if(i||o){var d=a.getState();var c=a.getValueColor();e.openStart("div",a.getId()+"-indicator");e.class("sapMNCIndScale");e.class(s);e.class(d);e.class(d);if(l){e.class(l)}e.openEnd();e.renderControl(a._oIndicatorIcon);if(o){e.openStart("div",a.getId()+"-scale");e.class("sapMNCScale");e.class(d);e.class(c);e.openEnd();e.text(n);e.close("div")}e.close("div")}};n._renderValue=function(e,a,t){var n=a.getValue();var l=a.getScale();if(a.getFormatterValue()){var i=a._parseFormattedValue(n);l=i.scale;n=i.value}var o=a.getNullifyValue()?"0":"";e.openStart("div",a.getId()+"-value");e.class("sapMNCValue");e.class(t);if(a.getValueColor()===r.None){e.class("Neutral")}else{e.class(a.getValueColor())}e.class(a.getState());e.openEnd();if(a.getState()===s.Loading){e.openStart("div").class("sapMNCContentShimmerPlaceholderItem");e.openEnd();e.openStart("div").class("sapMNCContentShimmerPlaceholderRows").openEnd();e.openStart("div").class("sapMNCContentShimmerPlaceholderItemHeader").class("sapMNCLoadingShimmer").openEnd().close("div");e.close("div");e.close("div");e.close("div")}else{var d=a._getMaxDigitsData();this._prepareAndRenderIcon(e,a,a._oIcon,d.fontClass);var c=a.getTruncateValueTo()||d.maxLength;e.openStart("span",a.getId()+"-value-inner");if(d.fontClass){e.class(d.fontClass)}e.openEnd();if(n.length>=c&&(n[c-1]==="."||n[c-1]===",")){e.text(n.substring(0,c-1))}else{e.text(n?n.substring(0,c):o)}e.close("span");this._renderScaleAndIndicator(e,a,t,n,l,d.fontClass);e.close("div")}};return n},true);