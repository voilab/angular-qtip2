(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'angular', 'qtip2'], factory);
    } else {
        // Browser globals
        root.amdWeb = factory(root.jQuery, root.angular);
    }
}(this, function (jQuery, angular) {
    'use strict';

    angular.module('qtip2', [])
        .directive('qtip', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var qonfig = {
                        show: attrs.show || "mouseover",
                        content: {
                            text: scope.dynamicContent || attrs.content || ''
                        },
                        position: {
                            my: attrs.my || jQuery.fn.qtip.defaults.position.my,
                            at: attrs.at || jQuery.fn.qtip.defaults.position.at,
                            target: element
                        },
                        hide: {
                            fixed : attrs.hideFixed || true,
                            delay : attrs.hideDelay || jQuery.fn.qtip.defaults.hide.delay,
                            event : attrs.hideEvent || jQuery.fn.qtip.defaults.hide.event
                        },
                        style: {
                            classes: attrs.classes || jQuery.fn.qtip.defaults.style.classes
                        },
                        events: {
                            show: function () {
                                scope.$emit('tooltipshow'); // translate jquery event to angular event
                            },
                            hide: function (event, api) {
                                // if one decide to control the tooltip display through events (vqtipshow)
                                // it's easier to destroy it each time it hides, otherwise there could be
                                // events collision between built-in and custom events... (or maybe I just suck :D)
                                if (attrs.control !== undefined) {
                                    api.destroy();
                                }
                                scope.$emit('tooltiphide'); // translate jquery event to angular event
                            }
                        }
                    };

                    // is there a title ?
                    if (attrs.dynamicTitle) {
                        qonfig.content.title = attrs.dynamicTitle;
                    } else if (attrs.title) {
                        qonfig.content.title = attrs.title;
                    }

                    // if you're in control mode, the show event must be disabled
                    if (attrs.control !== undefined) {
                        qonfig.show = '';
                    }

                    jQuery(element).qtip(qonfig);



                    /* ---------- observers ------------------------------------------------------------------------- */

                    // if the qtip attribute receive the value 'false', the tooltip
                    // is immediately destroyed
                    attrs.$observe('qtip', function (value) {
                        if (value === 'false') {
                            jQuery(element).qtip('destroy', true);
                        } else {
                            jQuery(element).qtip(qonfig);
                        }
                    });

                    // by triggering the 'vqtipshow' event, you can pass in a
                    // configuration object with native qtip2 config properties.
                    scope.$on('vqtipshow', function (event, config) {

                        // qtip attribute value take precedence over this event.
                        if (attrs.qtip === 'false') {
                            return;
                        }

                        jQuery(element).qtip(jQuery.extend(true, qonfig, config));
                        jQuery(element).qtip('api').show();
                    });

                    attrs.$observe('dynamicTitle', function () {
                        jQuery(element).qtip('options', 'content.title', attrs.dynamicTitle);
                    });
                    attrs.$observe('dynamicContent', function () {
                        jQuery(element).qtip('options', 'content.text', attrs.dynamicContent);
                    });

                    /* -------- / observers ------------------------------------------------------------------------- */
                }
            };
        });
}));