var createComponent = require('createReactNativeComponentClass');
var ReactNativeViewAttributes = require('ReactNativeViewAttributes');
var merge = require('merge');

var validAttributes = merge(
  ReactNativeViewAttributes.UIView, {
  blurType: true
});

var BlurView = createComponent({
  validAttributes: validAttributes,
  uiViewClassName: 'BlurView'
});

var VibrancyView = createComponent({
  validAttributes: validAttributes,
  uiViewClassName: 'VibrancyView'
});

// What have you expected to see here? :D

module.exports = {
    BlurView: BlurView,
    VibrancyView: VibrancyView
};
