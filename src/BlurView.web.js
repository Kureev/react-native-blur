import React, { Component, PropTypes } from 'react';
import { View, ViewPropTypes } from 'react-native';
import { overlayColorForProps, blurRadiusForProps } from './lib/ios_blur_view_emulation';

// Note: Web works in a similar way to Android,
// where you must pass a view to be blurred.
// Unlike Android, the original view is blurred.
// We accomplish this by updating the viewRef's style
// when the BlurView is mounted, and removing the style
// when it is unmounted.

class BlurView extends Component {
  componentWillMount() {
    this.updateViewRefStyleProperties();
  }

  componentWillReceiveProps(nextProps) {
    if (blurRadiusForProps(this.props) !== blurRadiusForProps(nextProps) ||
      this.props.transitionDuration !== nextProps.transitionDuration
    ) {
      this.updateViewRefStyleProperties();
    }
  }

  componentWillUnmount() {
    this.removeViewRefStyleProperties();
  }

  updateViewRefStyleProperties() {
    const { viewRef, transitionDuration } = this.props;
    if (viewRef == null) return;

    if (this.props.viewRef.setNativeProps === undefined) {
      throw new Error('[ReactNativeBlur]: It looks like you are using findNodeHandle on your viewRef. ' +
        'Please remove the call to findNodeHandle and pass the ref directly.');
    }

    if (transitionDuration > 0) {
      viewRef.setNativeProps({ style: {
        transition: `filter ${transitionDuration}ms linear`,
      }});
    }
    const blurRadius = blurRadiusForProps(this.props);
    viewRef.setNativeProps({ style: { filter: `blur(${blurRadius}px)` }});
  }

  removeViewRefStyleProperties() {
    const { viewRef } = this.props;
    viewRef.setNativeProps({ style: { filter: false, transition: false }});
  }

  render() {
    const style = {
      backgroundColor: overlayColorForProps(this.props),
    };

    return (
      <View style={[style, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

BlurView.propTypes = {
  ...ViewPropTypes,

  blurAmount: PropTypes.number,
  blurType: PropTypes.oneOf(['dark', 'light', 'xlight']),

  viewRef: PropTypes.shape({
    setNativeProps: PropTypes.func.isRequired,
  }),
  blurRadius: PropTypes.number,
  overlayColor: PropTypes.string,
  transitionDuration: PropTypes.number,
};

BlurView.defaultProps = {
  blurType: 'dark',
  blurAmount: 10,
  transitionDuration: 0,
  viewRef: null,
};

module.exports = BlurView;
