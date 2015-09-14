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
                scope: {
                    qtip: '&qtip',
                    hideFixed: '&hideFixed',
                    hideDelay: '&hideDelay',
                    hideEvent: '@hideEvent',
                    dynamicTitle: '=',
                    dynamicContent: '=',
                    dynamicDisable: '='
                },
                link: function (scope, element, attrs) {
                    var qonfig;

                    // if false is passed to the qtip directive, nothing will happen
                    // and the qtip won't display. Useful if you want to prevent the
                    // qtip from displaying in some cases without to remove all config attributes from the element.
                    if (scope.qtip() === false) {
                        return;
                    }

                    qonfig = {
                        show: attrs.show || "mouseover",
                        content: {
                            text: scope.dynamicContent || attrs.content || ''
                        },
                        position: {
                            my: attrs.my || 'bottom center',
                            at: attrs.at || 'top center',
                            target: element
                        },
                        hide: {
                            fixed : scope.hideFixed() || true,
                            delay : scope.hideDelay() || 0,
                            event : scope.hideEvent || 'mouseleave'
                        },
                        style: {
                            classes: attrs.classes || 'qtip'
                        }
                    };

                    if (scope.dynamicTitle) {
                        qonfig.content.title = scope.dynamicTitle;
                    } else if (attrs.title) {
                        qonfig.content.title = attrs.title;
                    }

                    scope.$watch('dynamicDisable', function (value) {
                        if (value) {
                            jQuery(element).qtip('destroy', true);
                        } else {
                            jQuery(element).qtip(qonfig);
                        }
                    });

                    jQuery(element).qtip(qonfig);

                    scope.$watch('dynamicTitle', function () {
                        jQuery(element).qtip('options', 'content.title', scope.dynamicTitle);
                    });
                    scope.$watch('dynamicContent', function () {
                        jQuery(element).qtip('options', 'content.text', scope.dynamicContent);
                    });
                }
            };
        });
}));