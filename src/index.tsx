import BlurViewUntyped from './components/BlurView';
import VibrancyViewUntyped from './components/VibrancyView';
import type { View } from 'react-native'

import type { BlurViewProps as BlurViewPropsIOS } from './components/BlurView.ios';
import type { BlurViewProps as BlurViewPropsAndroid } from './components/BlurView.android';
import type { VibrancyViewProps as VibrancyViewPropsIOS } from './components/VibrancyView.ios';

type BlurViewProps = BlurViewPropsIOS | BlurViewPropsAndroid;
type VibrancyViewProps = VibrancyViewPropsIOS;

const BlurView = BlurViewUntyped as React.ForwardRefExoticComponent<BlurViewProps & React.RefAttributes<View>>
const VibrancyView = VibrancyViewUntyped as React.ForwardRefExoticComponent<VibrancyViewProps & React.RefAttributes<View>>

export { BlurView, VibrancyView };
export type { BlurViewProps, VibrancyViewProps };