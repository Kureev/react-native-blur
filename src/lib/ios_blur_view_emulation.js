import { Component, PropTypes } from 'react';
import { View, Platform, requireNativeComponent } from 'react-native';

// This are helper functions that are used to simulate the blur effect on iOS
// on other platforms (Android and web)

const OVERLAY_COLORS = {
  light: 'rgba(255, 255, 255, 0.2)',
  xlight: 'rgba(255, 255, 255, 0.75)',
  dark: 'rgba(16, 12, 12, 0.64)',
};

export const overlayColorForProps = (props) => {
  const { overlayColor, blurType } = props || this.props;

  if (overlayColor != null) return overlayColor;
  return OVERLAY_COLORS[blurType] || OVERLAY_COLORS.dark;
};

export const blurRadiusForProps = (props, { limit } = {}) => {
  const { blurRadius, blurAmount } = props;

  if (blurRadius != null) {
    if (limit != null && blurRadius > limit) {
      throw new Error(
        '[ReactNativeBlur]: blurRadius cannot be greater than ' +
        `${limit} on ${Platform.OS}! (was: ${blurRadius})`);
    }
    return blurRadius;
  }
  if (blurAmount == null) return 0;

  // iOS seems to use a slightly different blurring algorithm (or scale?).
  // Android/web blurRadius is approximately 80% of blurAmount.
  return Math.round(blurAmount * 0.8);
};

