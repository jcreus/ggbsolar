/*global $, jQuery, GGBT_wsf_view, console, alert, GGBApplet, renderGGBElement, GGBT_wsf_general*/

window.GGBT_wsf_view = (function($, general) {
    "use strict";

    var APPLET_CONTROLS_HTML = '<div class="wsf-applet-controls">' +
            '<button class="fixapplet">FixAppletIcon</button>' +
        '</div>';

    if (!general) {
        console.log("general not loaded");
    }

    function initWsfTeacherInfoButton() {
        var button = $(".wsf-teacher-info-button");
        button.off("click").on("click", function(e) {
            e.preventDefault();
            general.initTeacherInfoPage($(this));
        });
    }

    function initWsfElementInfoButton() {
        var buttons = $(".wsf-element-info-button");
        buttons.off("click").on("click", function(e) {
            e.preventDefault();
            var parent = $(this).parents(".worksheet_element");
            general.setWsfActiveContent(parent);
            general.initElementInfoPage($(this));
        });
    }

    function initWsfButtonInformation() {
        var button = general.getButtonInfoClose();
        button.off("click").on("click", function(e) {
            general.closeInfoFromView();
            e.preventDefault();
        });
    }

    function initButtons() {
        initWsfTeacherInfoButton();
        initWsfElementInfoButton();
        initWsfButtonInformation();
    }

    function setAppletFixed(button) {
        var applet = button.parents(".worksheet_element"),
            position;
        if (!applet.data("isFixed")) {
            position = applet.find(".ws-element-applet").offset();
            console.log(position);
            applet.find(".ws-element-applet").addClass("fixed").css({
                top: position.top,
                left: position.left
            });
            applet.css({
                height: applet.find("article").attr("data-param-height")
            });
            button.text("UnFixAppletIcon");
            applet.data("isFixed", true);
        } else {
            applet.find(".ws-element-applet").removeClass("fixed").css("top", "auto");
            applet.css({
                height: "auto"
            });
            button.text("FixAppletIcon");
            applet.removeData("isFixed");
        }
        console.log($(".wsf-ws-scroller").scrollTop());
    }

    function initAppletControlEvents(html) {
        var fragment = $(html);
        fragment.find(".fixapplet").on("click", function(e) {
            setAppletFixed($(this));
        });
        return fragment;
    }

    function initAppletControls(c) {
        if (c.find("article[data-param-fixapplet=true]").length && !c.find(".wsf-applet-controls").length) {
            c.prepend(initAppletControlEvents(APPLET_CONTROLS_HTML));
        }
    }

    function onLoadTextElements(processMathquill, allWorksheets) {
        var texts;
        if (allWorksheets) {
            texts = $('.worksheet_tbl .ws-element-text');
        } else {
            texts = $('.worksheet_tbl .ws-element-text', general.getWorkSheet());
        }
        texts.each(function() {
            var bbcode = this.textContent || this.innerText;
            if (bbcode === undefined) {
                bbcode = "";
            }
            var html = general.getHTMLFromBBCode(bbcode);
            $(this).html(html);
            if (processMathquill) {
                $('.mathquill-embedded-latex', this).mathquill();
            }
        });
    }

    function initNewWorksheet(worksheet) {
        var oldWorksheet = general.getWorkSheet();
        general.setWorksheet(worksheet);
        initButtons();
        onLoadTextElements(true);
        if (oldWorksheet && oldWorksheet.length>0) {
            general.setWorksheet(oldWorksheet);
        }
    }

    function init() {
        general.getWorkSheet();
        general.getWsfInfoContent();
        general.getWsfInfo();
        initButtons();
        onLoadTextElements(false, true);
    }

    function setData(d) {
        general.setData(d);
    }

    function postProcessApplet(container) {
        if (container) {
           initAppletControls(container);
           general.adjustContentToResize(container.parents(".ws-element-applet"));
        }
    }

    return {
        init: init,
        setData : setData,
        initNewWorksheet: initNewWorksheet,
        postProcessApplet: postProcessApplet
    };

})(jQuery, GGBT_wsf_general);

jQuery(document).ready(function() {
    "use strict";
    GGBT_wsf_view.init();
});

