import React, { forwardRef } from 'react';
import { StyleSheet, ViewProps, ViewStyle, View } from 'react-native';
import NativeBlurView from '../fabric/BlurViewNativeComponent';

type BlurType =
  | 'dark'
  | 'light'
  | 'xlight'
  | 'prominent'
  | 'regular'
  | 'extraDark'
  | 'chromeMaterial'
  | 'material'
  | 'thickMaterial'
  | 'thinMaterial'
  | 'ultraThinMaterial'
  | 'chromeMaterialDark'
  | 'materialDark'
  | 'thickMaterialDark'
  | 'thinMaterialDark'
  | 'ultraThinMaterialDark'
  | 'chromeMaterialLight'
  | 'materialLight'
  | 'thickMaterialLight'
  | 'thinMaterialLight'
  | 'ultraThinMaterialLight';

export type BlurViewProps = ViewProps & {
  blurType?: BlurType;
  blurAmount?: number;
  reducedTransparencyFallbackColor?: string;
};

const BlurView = forwardRef<View, BlurViewProps>(
  ({ blurType = 'dark', blurAmount = 10, style, ...rest }, ref) => (
    <NativeBlurView
      ref={ref}
      style={StyleSheet.compose(styles.transparent, style)}
      blurType={blurType}
      blurAmount={blurAmount}
      {...rest}
    />
  )
);

const styles = StyleSheet.create<{ transparent: ViewStyle }>({
  transparent: { backgroundColor: 'transparent' },
});

export default BlurView;
