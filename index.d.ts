import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface BlurViewProperties {
  blurType?:
    | "xlight"
    | "light"
    | "dark"
    // iOS 13+ only
    | "chromeMaterial"
    | "material"
    | "thickMaterial"
    | "thinMaterial"
    | "ultraThinMaterial"
    | "chromeMaterialDark"
    | "materialDark"
    | "thickMaterialDark"
    | "thinMaterialDark"
    | "ultraThinMaterialDark"
    | "chromeMaterialLight"
    | "materialLight"
    | "thickMaterialLight"
    | "thinMaterialLight"
    | "ultraThinMaterialLight"
    // tvOS and iOS 10+ only
    | "regular"
    | "prominent"
    // tvOS only
    | "extraDark"
  blurAmount?: number // 0 - 100
  reducedTransparencyFallbackColor?: string
  style?: StyleProp<ViewStyle>
  blurRadius?: number
  downsampleFactor?: number
  overlayColor?: string
}

export class BlurView extends React.Component<BlurViewProperties, {}> {}

export interface VibrancyViewProperties extends BlurViewProperties {}

export class VibrancyView extends React.Component<VibrancyViewProperties, {}> {}
