import React, { Component, PropTypes } from 'react';
import { View, requireNativeComponent, ViewPropTypes } from 'react-native';

class BlurView extends Component {
  render() {
    return (
      <NativeBlurView
        {...this.props}
        style={[
          { backgroundColor: 'transparent' },
          this.props.style,
        ]}
      />
    );
  }
}

BlurView.propTypes = {
  ...(ViewPropTypes || View.propTypes),
  blurType: PropTypes.oneOf(['dark', 'light', 'xlight']),
  blurAmount: PropTypes.number,
};

BlurView.defaultProps = {
  blurType: 'dark',
  blurAmount: 10,
};

const NativeBlurView = requireNativeComponent('BlurView', BlurView);

module.exports = BlurView;
