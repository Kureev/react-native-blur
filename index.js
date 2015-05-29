var React = require('react-native');
var { requireNativeComponent } = React;

var BlurView = React.createClass({
  propTypes: {
    blurType: React.PropTypes.string,
  },

  render() {
    return <NativeBlurView {...this.props} />;
  }
});
var NativeBlurView = requireNativeComponent('BlurView', BlurView);

var VibrancyView = React.createClass({
  propTypes: {
    blurType: React.PropTypes.string,
  },

  render() {
    return <NativeVibrancyView {...this.props} />;
  }
});
var NativeVibrancyView = requireNativeComponent('VibrancyView', VibrancyView);

// What have you expected to see here? :D

module.exports = {
    BlurView: BlurView,
    VibrancyView: VibrancyView
};