import * as React from 'react';
import { ViewStyle } from 'react-native';

export interface BlurViewProperties {
  blurType: 'xlight' | 'light' | 'dark'
    // tvOS only
    | 'extraDark' | 'regular' | 'prominent';
  blurAmount?: number; // 0 - 100
  style?: ViewStyle;
  viewRef?: number | null;
}

export class BlurView extends React.Component<BlurViewProperties, {}> {}


export interface VibrancyViewProperties extends BlurViewProperties {}

export class VibrancyView extends React.Component<VibrancyViewProperties, {}> {}
