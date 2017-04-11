import React, { Component, PropTypes } from 'react';
import { requireNativeComponent } from 'react-native';

class BlurView extends Component {
  setNativeProps(nativeProps) {
    this._nativeComponent(setNativeProps);
  }

  render() {
    return (
      <NativeBlurView
        {...this.props}
        style={[{
          backgroundColor: 'transparent',
        }, this.props.style
        ]}
        ref={(c) => this._nativeComponent = c}
      />
    );
  }
}

BlurView.propTypes = {
  blurType: PropTypes.string,
  blurAmount: PropTypes.number.isRequired,
};

BlurView.defaultProps = {
  blurAmount: 10,
};

const NativeBlurView = requireNativeComponent('BlurView', BlurView);

module.exports = BlurView;
