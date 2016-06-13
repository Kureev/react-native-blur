const React = require('react');
const {View} = require('react-native');
const {
  Component,
  PropTypes
} = React;

const { requireNativeComponent } = require('react-native');

class BlurView extends Component {
  render() {
    return (
      <NativeBlurView
        {...this.props}
        style={[{
          backgroundColor: 'transparent',
        }, this.props.style
        ]}
      />
    );
  }
}

BlurView.propTypes = {
  ...View.propTypes,
  blurRadius: PropTypes.number,
  overlayColor: PropTypes.string,
  downsampleFactor: PropTypes.number,
  viewRef: PropTypes.number
};

const NativeBlurView = requireNativeComponent('BlurView', BlurView);

module.exports = BlurView;
