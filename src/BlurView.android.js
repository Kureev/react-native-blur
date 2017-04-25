import React, { Component, PropTypes } from 'react';
import {
  View,
  requireNativeComponent,
  DeviceEventEmitter,
  findNodeHandle,
} from 'react-native';

const OVERLAY_COLORS = {
  light: 'rgba(255, 255, 255, 0.2)',
  xlight: 'rgba(255, 255, 255, 0.75)',
  dark: 'rgba(16, 12, 12, 0.64)',
};


class BlurView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeHandle: null,
    };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('ReactNativeBlurError', (message) => {
      throw new Error(`[ReactNativeBlur]: ${message}`);
    });
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('ReactNativeBlurError');
  }

  componentDidMount() {
    this.updateNodeHandle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.viewRef === prevProps.viewRef) return;
    this.updateNodeHandle();
  }

  getNodeHandle() {
    if (this.props.nodeHandle != null) return this.props.nodeHandle;
    return findNodeHandle(this.props.viewRef);
  }

  // We need to do this in componentDidMount and componentDidUpdate,
  // because React Native complains if you use findNodeHandle
  // during the render cycle.
  updateNodeHandle() {
    if (this.props.viewRef == null) return;

    // Backwards compatibility with code that passes node handles as the viewRef.
    if (this.props.viewRef.setNativeProps === undefined) {
      console.warn('[ReactNativeBlur]: Using findNodeHandle for the viewRef is deprecated. ' +
        'Please pass the ref directly.');
      this.setState({ nodeHandle: this.props.viewRef });
      return;
    }

    const nodeHandle = this.getNodeHandle();
    if (nodeHandle !== this.state.nodeHandle) {
      this.setState({ nodeHandle });
    }
  }

  overlayColor() {
    if (this.props.overlayColor != null) return this.props.overlayColor;
    return OVERLAY_COLORS[this.props.blurType] || OVERLAY_COLORS.dark;
  }

  blurRadius() {
    const { blurRadius, blurAmount } = this.props;

    if (blurRadius != null) {
      if (blurRadius > 25) {
        throw new Error(`[ReactNativeBlur]: blurRadius cannot be greater than 25! (was: ${blurRadius})`);
      }
      return blurRadius;
    }

    // iOS seems to use a slightly different blurring algorithm (or scale?).
    // Android blurRadius + downsampleFactor is approximately 80% of blurAmount.
    const equivalentBlurRadius = Math.round(blurAmount * 0.8);

    if (equivalentBlurRadius > 25) return 25;
    return equivalentBlurRadius;
  }

  downsampleFactor() {
    const { downsampleFactor, blurRadius } = this.props;
    if (downsampleFactor != null) return downsampleFactor;
    return blurRadius;
  }

  render() {
    if (this.props.children != null) {
      throw new Error(
        '[ReactNativeBlur]: BlurView cannot contain any child views on Android. ' +
        'You should use "position: absolute" on the BlurView, ' +
        'and place other views in front of it.');
    }

    const { viewRef, style } = this.props;

    return (
      <NativeBlurView
        nodeHandle={this.state.nodeHandle}
        blurRadius={this.blurRadius()}
        downsampleFactor={this.downsampleFactor()}
        overlayColor={this.overlayColor()}
        style={[
          { backgroundColor: 'transparent' },
          style,
        ]}
      />
    );
  }
}

BlurView.propTypes = {
  ...View.propTypes,
  blurAmount: PropTypes.number,
  blurType: PropTypes.oneOf(['dark', 'light', 'xlight']),

  blurRadius: PropTypes.number,
  downsampleFactor: PropTypes.number,
  overlayColor: PropTypes.string,
  viewRef: PropTypes.shape({
    setNativeProps: PropTypes.func.isRequired,
  }),

  // RN complains if this is not present. It can also be used to override the node handle
  nodeHandle: PropTypes.number,
};

BlurView.defaultProps = {
  blurType: 'dark',
  blurAmount: 10,
};

const NativeBlurView = requireNativeComponent('BlurView', BlurView);

module.exports = BlurView;
