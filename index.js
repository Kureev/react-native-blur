var createComponent = require('createReactIOSNativeComponentClass');

var BlurView = createComponent({
  validAttributes: {},
  uiViewClassName: 'BlurView',
});

var VibrancyView = createComponent({
  validAttributes: {},
  uiViewClassName: 'VibrancyView',
});

// What have you expected to see here? :D

module.exports = {
    BlurView: BlurView,
    VibrancyView: VibrancyView
};