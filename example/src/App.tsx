/**
 * Basic [iOS] Example for react-native-blur
 * https://github.com/react-native-community/react-native-blur
 */
import React, { useState, useCallback } from 'react';
import {
  Image,
  StyleSheet,
  Platform,
  Switch,
  Text,
  View,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control'; // Note: SegmentedControl does not yet support Fabric

import {
  BlurView,
  VibrancyView,
  BlurViewProps,
} from '@react-native-community/blur';

const blurTypeValues =
  Platform.OS === 'ios'
    ? ['xlight', 'light', 'dark', 'regular', 'prominent', 'transparent']
    : ['xlight', 'light', 'dark'];

const Blurs = () => {
  const [blurBlurType, setBlurBlurType] =
    useState<BlurViewProps['blurType']>('light');
  const [blurActiveSegment, setBlurActiveSegment] = useState(1);
  const [vibrancyBlurType, setVibrancyBlurType] =
    useState<BlurViewProps['blurType']>('dark');
  const [vibrancyActiveSegment, setVibrancyActiveSegment] = useState(2);

  const onBlurChange = useCallback(
    (e) => setBlurActiveSegment(e.nativeEvent.selectedSegmentIndex),
    []
  );
  const onBlurValueChange = useCallback((value) => setBlurBlurType(value), []);
  const onVibrancyChange = useCallback(
    (e) => setVibrancyActiveSegment(e.nativeEvent.selectedSegmentIndex),
    []
  );
  const onVibrancyValueChange = useCallback(
    (value) => setVibrancyBlurType(value),
    []
  );

  const tintColor = blurBlurType === 'xlight' ? 'black' : 'white';
  const platform = Platform.OS === 'ios' ? 'iOS' : 'Android';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.blurContainer}>
        {/*
             BlurView is supported on both iOS and Android.
             If you also need to support Android, the BlurView must be
             absolutely positioned behind your unblurred views, and it
             cannot contain any child views.
           */}
        <BlurView
          blurType={blurBlurType}
          blurAmount={100}
          reducedTransparencyFallbackColor={'pink'}
          style={[styles.blurView]}
        />
        <Text style={[styles.text, { color: tintColor }]}>
          Blur component ({platform})
        </Text>
        <SegmentedControl
          values={blurTypeValues}
          selectedIndex={blurActiveSegment}
          onChange={(event) => {
            onBlurChange(event);
          }}
          onValueChange={(value) => {
            onBlurValueChange(value);
          }}
          tintColor={tintColor}
        />
      </View>

      {
        /*
          VibrancyView is only supported on iOS, and must contain child views,
          otherwise the vibrancy effect doesn't work.
        */
        Platform.OS === 'ios' ? (
          <VibrancyView
            blurType={vibrancyBlurType}
            blurAmount={10}
            reducedTransparencyFallbackColor={'pink'}
            style={[styles.container, styles.blurContainer]}
          >
            <Text style={styles.text}>Vibrancy component (iOS-only)</Text>

            <SegmentedControl
              values={blurTypeValues}
              selectedIndex={vibrancyActiveSegment}
              onChange={(event) => {
                onVibrancyChange(event);
              }}
              onValueChange={(value) => {
                onVibrancyValueChange(value);
              }}
              tintColor="white"
            />
          </VibrancyView>
        ) : null
      }
    </SafeAreaView>
  );
};

const Example = () => {
  const [showBlurs, setShowBlurs] = React.useState(true);

  return (
    <View style={styles.container}>
      <Image
        source={require('./bgimage.jpeg')}
        resizeMode="cover"
        style={styles.img}
      />

      {showBlurs ? <Blurs /> : null}

      <SafeAreaView style={styles.blurToggle}>
        <Switch
          onValueChange={(value) => setShowBlurs(value)}
          value={showBlurs}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  blurContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 20,
  },
  blurView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  img: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  blurToggle: {
    position: 'absolute',
    top: 30,
    right: 10,
    alignItems: 'flex-end',
  },
});

export default Example;
