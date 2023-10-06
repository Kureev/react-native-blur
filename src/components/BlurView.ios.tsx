import React, { forwardRef, useEffect, useState } from "react";
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
  ({ blurType = 'dark', blurAmount = 10, style, children, ...rest }, ref) => {

    const [borderStyle, setBorderStyle] = useState<ViewStyle>({});

    useEffect(() => {
      const baseStyles = StyleSheet.flatten(style) as ViewStyle;
      const borderWidth = baseStyles.borderWidth || 0;
      const brdrStyle = {
        position: 'absolute',
        top: -borderWidth,
        left: -borderWidth,
        right: -borderWidth,
        bottom: -borderWidth
      } as ViewStyle;

      if (baseStyles) {
        Object.keys(baseStyles).forEach((key) => {
          if (key.startsWith('border')) {
            // @ts-ignore
            brdrStyle[key] = baseStyles[key];
            return;
          }
        });
      }
      setBorderStyle(brdrStyle);
    }, [style]);

    return (
      <View style={StyleSheet.compose(styles.transparent, style)}>
        <NativeBlurView
          style={StyleSheet.absoluteFill}
          ref={ref}
          blurType={blurType}
          blurAmount={blurAmount}
          {...rest}
        >
        </NativeBlurView>
        <View style={borderStyle}></View>
        {children}
      </View>
    );
  }
);

const styles = StyleSheet.create<{ transparent: ViewStyle }>({
  transparent: { backgroundColor: 'transparent', overflow: 'hidden' },
});

export default BlurView;
