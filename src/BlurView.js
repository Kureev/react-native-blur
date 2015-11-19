const React = require('react-native');
const {
  requireNativeComponent,
  Component
} = React;

class BlurView extends Component {
  render() {
    return <NativeBlurView {...this.props} />;
  }
}

BlurView.propTypes = {
  blurType: React.PropTypes.string,
  borderRadius: React.PropTypes.number,
};

const NativeBlurView = requireNativeComponent('BlurView', BlurView);

module.exports = BlurView;
