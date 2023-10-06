import React, { forwardRef, useEffect } from 'react';
import {
  View,
  DeviceEventEmitter,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import NativeBlurView from '../fabric/BlurViewNativeComponentAndroid';

export type BlurViewProps = ViewProps & {
  blurAmount?: number;
  blurType?: 'dark' | 'light' | 'xlight';
  enabled?: boolean;
  autoUpdate?: boolean;
};

const BlurView = forwardRef<View, BlurViewProps>(
  (
    {
      blurType = 'dark',
      blurAmount = 10,
      enabled,
      autoUpdate,
      style,
      ...rest
    },
    ref
  ) => {
    useEffect(() => {
      DeviceEventEmitter.addListener('ReactNativeBlurError', (message) => {
        throw new Error(`[ReactNativeBlur]: ${message}`);
      });

      return () => {
        DeviceEventEmitter.removeAllListeners('ReactNativeBlurError');
      };
    }, []);

    return (
<NativeBlurView
  ref={ref}
  style={StyleSheet.compose(styles.transparent, style)}
  blurType={blurType}
  blurAmount={blurAmount}
  enabled={enabled}
  autoUpdate={autoUpdate}
  {...rest}
/>
    );
  }
);

const styles = StyleSheet.create<{ transparent: ViewStyle }>({
  transparent: { backgroundColor: 'transparent' },
});

export default BlurView;
