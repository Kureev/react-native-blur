import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps, HostComponent } from 'react-native';
import type { WithDefault, Int32 } from 'react-native/Libraries/Types/CodegenTypes';

export interface NativeProps extends ViewProps {
  blurAmount?: WithDefault<Int32, 10>;
  blurType?: WithDefault<'dark' | 'light' | 'xlight', 'dark'>;
  blurRadius?: Int32;
  downsampleFactor?: Int32;
  overlayColor?: string;
  enabled?: boolean;
  autoUpdate?: boolean;
}

export default codegenNativeComponent<NativeProps>(
  'BlurView'
) as HostComponent<NativeProps>;
