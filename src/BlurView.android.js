import React, { Component, PropTypes } from 'react';
import { View, requireNativeComponent, DeviceEventEmitter, } from 'react-native';

class BlurView extends Component {
  componentWillMount() {
    DeviceEventEmitter.addListener('ReactNativeBlurError', (message) => {
      throw new Error(`[ReactNativeBlur]: ${message}`);
    });
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('ReactNativeBlurError');
  }

  render() {
    if (this.props.children != null) {
      throw new Error(
        '[ReactNativeBlur]: BlurView cannot contain any child views on Android. ' +
        'You should use "position: absolute" on the BlurView, ' +
        'and place other views in front of it.');
    }

    return (
      <NativeBlurView
        {...this.props}
        style={[{
          backgroundColor: 'transparent',
        }, this.props.style,
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
