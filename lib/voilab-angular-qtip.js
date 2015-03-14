// Uses AMD or browser globals to create a module.

// If you want something that will also work in Node, see returnExports.js
// If you want to support other stricter CommonJS environments,
// or if you need to create a circular dependency, see commonJsStrict.js

// Defines a module "amdWeb" that depends another module called "b".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If the 'b' module also uses this type of boilerplate, then
// in the browser, it will create a global .b that is used below.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'angular', 'qtip2'], factory);
    } else {
        // Browser globals
        root.amdWeb = factory(root.b);
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
                    hideEvent: '@hideEvent'
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
                        content: {
                            text: attrs.content
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

                    if (attrs.title) {
                        qonfig.content.title = attrs.title;
                    }

                    jQuery(element).qtip(qonfig);
                }
            };
        });
}));