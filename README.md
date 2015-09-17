Voilab Angular Qtip2
====================

Angular directive for qtip2 with some other utilities

##Installation

```
bower install --save angular-qtip2
```

##Usage

First, load the file, with any amd loader or simply by adding the `<script>` tag in your `<head>`.
Then, add the module as a dependency of your main app module.

```javascript
var app = angular.module('yourAppName', ['qtip2']);
```

In your code, simply add the 'qtip' attribute on the element you want to tooltip and configure your tooltip through some more attributes.

Most basic example:

```html
<div qtip data-content="I'm a tooltip">Hi there !</div>
```

More complete example:

```html
<div qtip
    data-classes="qtip-tipsy qtip-shadow"
    data-my="right center"
    data-at="left center"
    data-hide-fixed="false"
    data-hide-delay="3000"
    data-hide-event="mouseleave click"
    data-content="I'm a tooltip">Hi there !</div>
```

##What's more ?

####Dynamic disable

Do disable the qtip on an element, you can pass 'false' to the qtip attribute. It will instantly destroy the associated tooltip.

```html
<div qtip="false" data-content="I'm a tooltip">Hi there !</div>
```

or, dynamically

```html
<div ng-controller="SomeController as ctrl">
    <div qtip="{{ctrl.isTooltipActivated}}" data-content="I'm a tooltip">Hi there !</div>
</div>
```

```javascript
function SomeController() {
    var self = this;
    self.isTooltipActivated = false; // change this value dynamically according to your needs.
}
```
####Manual control

By adding a 'data-control' attribute, you disable the 'show' event and can trigger a custom 'vqtipshow' show event by yourself.
Actually, you can't target a specific tooltip with this method, so if there is many tooltips in the same scope, I can' predict what will happen :P

```html
<div ng-controller="SomeController as ctrl">
    <div qtip data-control data-content="I'm a tooltip">Hi there !</div>
</div>
```

```javascript
function SomeController($scope) {
    var self = this;
    
    self.showTooltip = function () {
        $scope.$broadcast('vqtipshow', {content: {title: "My tooltip title"}});
    };
}
```

####Check the code

If you want to know more about this directive, just have a look at the code. There is nothing very tricky.
Don't hesitate to post a ticket or a pull request to improve it.

##Licence

This code is released under the MIT License (MIT)