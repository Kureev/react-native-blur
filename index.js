var createComponent = require('createReactIOSNativeComponentClass');
var ReactIOSViewAttributes = require('ReactIOSViewAttributes');
var merge = require('merge');

var validAttributes = merge(
  ReactIOSViewAttributes.UIView, {
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