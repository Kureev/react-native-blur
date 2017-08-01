import * as React from 'react';
import { ViewProperties } from 'react-native';

export interface BlurViewProperties {
  blurType: 'xlight' | 'light' | 'dark'
    // tvOS only
    | 'extraDark' | 'regular' | 'prominent';
  blurAmount?: number; // 0 - 100
  style?: ViewProperties;
}

export class BlurView extends React.Component<BlurViewProperties, {}> {}


export interface VibrancyViewProperties extends BlurView {}

export class VibrancyView extends React.Component<BlurViewProperties, {}> {}