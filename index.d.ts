import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface BlurViewProperties {
  blurType:
    | "xlight"
    | "light"
    | "dark"
    // tvOS and iOS 10+ only
    | "regular"
    | "prominent"
    // tvOS only
    | "extraDark";
  blurAmount?: number; // 0 - 100
  style?: StyleProp<ViewStyle>;
  viewRef?: number | null;
}

export class BlurView extends React.Component<BlurViewProperties, {}> {}

export interface VibrancyViewProperties extends BlurViewProperties {}

export class VibrancyView extends React.Component<VibrancyViewProperties, {}> {}
