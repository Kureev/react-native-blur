import React, { Component, PropTypes } from 'react';
import { View, requireNativeComponent } from 'react-native';

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
  ...View.propTypes,
  blurRadius: PropTypes.number,
  overlayColor: PropTypes.string,
  downsampleFactor: PropTypes.number,
  viewRef: PropTypes.number
};

const NativeBlurView = requireNativeComponent('BlurView', BlurView);

module.exports = BlurView;
