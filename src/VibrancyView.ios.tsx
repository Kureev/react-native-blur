import React, { forwardRef } from 'react';
import {
  requireNativeComponent,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';

export type VibrancyViewProps = ViewProps & {
  blurType?: string;
  blurAmount: number;
};

const VibrancyView = forwardRef<any, VibrancyViewProps>(
  ({ style, ...rest }, ref) => (
    <NativeVibrancyView
      {...rest}
      ref={ref}
      style={StyleSheet.compose(styles.transparent, style)}
    />
  ),
);

const styles = StyleSheet.create<{ transparent: ViewStyle }>({
  transparent: { backgroundColor: 'transparent' },
});

const NativeVibrancyView = requireNativeComponent<VibrancyViewProps>(
  'VibrancyView',
);

export default VibrancyView;
