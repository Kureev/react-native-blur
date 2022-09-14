import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps, HostComponent } from 'react-native';
import type {
  WithDefault,
  Int32,
} from 'react-native/Libraries/Types/CodegenTypes';
// @ts-ignore
import type { ColorValue } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

// RN Codegen 0.70 breaks when using an imported union type
interface NativeProps extends ViewProps {
  blurType?: WithDefault<
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
    | 'ultraThinMaterialLight',
    'dark'
  >;
  blurAmount?: WithDefault<Int32, 10>;
  reducedTransparencyFallbackColor?: ColorValue;
}

export default codegenNativeComponent<NativeProps>(
  'VibrancyView'
) as HostComponent<NativeProps>;
