import React, { Component, PropTypes } from 'react';
import {
  View,
  requireNativeComponent,
  DeviceEventEmitter,
  findNodeHandle,
} from 'react-native';

import { overlayColorForProps, blurRadiusForProps } from './lib/ios_blur_view_emulation';

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

  componentDidMount() {
    this.updateNodeHandle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.viewRef === prevProps.viewRef) return;
    this.updateNodeHandle();
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('ReactNativeBlurError');
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

  blurRadius() {
    return blurRadiusForProps(this.props, { limit: 25 });
  }

  downsampleFactor() {
    const { downsampleFactor } = this.props;
    if (downsampleFactor != null) return downsampleFactor;
    return this.blurRadius();
  }

  render() {
    if (this.props.children != null) {
      throw new Error(
        '[ReactNativeBlur]: BlurView cannot contain any child views on Android. ' +
        'You should use "position: absolute" on the BlurView, ' +
        'and place other views in front of it.');
    }

    const overlayColor = overlayColorForProps(this.props);
    const styles = [
      { backgroundColor: 'transparent' },
      this.props.style,
    ];

    return (
      <NativeBlurView
        nodeHandle={this.state.nodeHandle}
        blurRadius={this.blurRadius()}
        downsampleFactor={this.downsampleFactor()}
        overlayColor={overlayColor}
        style={styles}
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
