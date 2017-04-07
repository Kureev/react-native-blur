/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  SegmentedControlIOS,
  Slider,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';
import { BlurView, VibrancyView } from 'react-native-blur';

export default class Animated extends Component {
  constructor() {
    super()
    this.state = {
      showBlurs: true,
      blurBlurType: 'light',
      blurActiveSegment: 1,
      vibrancyBlurType: 'dark',
      vibrancyActiveSegment: 2,
      blurAmount: 50,
    }
  }

  _onBlurChange(event) {
    const { selectedSegmentIndex } = event.nativeEvent;
    this.setState({ blurActiveSegment: selectedSegmentIndex })
  }

  _onBlurValueChange(blurBlurType) {
    this.setState({ blurBlurType })
  }

  _onBlurAmountChange(blurAmount) {
    this.setState({ blurAmount });
  }

  _onVibrancyChange(event) {
    const { selectedSegmentIndex } = event.nativeEvent;
    this.setState({ vibrancyActiveSegment: selectedSegmentIndex })
  }

  _onVibrancyValueChange(vibrancyBlurType) {
    this.setState({ vibrancyBlurType })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./bgimage.jpeg')}
          resizeMode='cover'
          style={styles.img}
        />
        {this.state.showBlurs && (
          <View style={styles.container}>
            <BlurView
              blurType={this.state.blurBlurType}
              blurAmount={this.state.blurAmount}
              style={[styles.container, styles.blurContainer]}
            >
              <Text style={styles.welcome}>
                Blur component
              </Text>
              <SegmentedControlIOS
                values={['xlight', 'light', 'dark']}
                selectedIndex={this.state.blurActiveSegment}
                onChange={(event) => {this._onBlurChange(event)}}
                onValueChange={(value) => {this._onBlurValueChange(value)}}
                tintColor={this.state.blurBlurType == 'xlight' ? 'black' : 'white'}
              />
              <Slider
                onValueChange={(value) => this._onBlurAmountChange(value)}
              />
            </BlurView>
            <VibrancyView
              blurType={this.state.vibrancyBlurType}
              blurAmount={1}
              style={[styles.container, styles.blurContainer]}
            >
              <Text style={styles.welcome}>
                Vibrancy component
              </Text>
              <SegmentedControlIOS
                values={['xlight', 'light', 'dark']}
                selectedIndex={this.state.vibrancyActiveSegment}
                onChange={(event) => {this._onVibrancyChange(event)}}
                onValueChange={(value) => {this._onVibrancyValueChange(value)}}
                tintColor={this.state.vibrancyBlurType == 'xlight' ? 'black' : 'white'}
              />
            </VibrancyView>
          </View>
        )}
        <View
          style={styles.blurToggle}
        >
          <Switch
            onValueChange={(value) => this.setState({ showBlurs: value })}
            value={this.state.showBlurs}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
  },
  blurContainer: {
    paddingHorizontal: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  img: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: null,
    width: null,
  },
  blurToggle: {
    position: 'absolute',
    top: 30,
    right: 10,
    alignItems: 'flex-end',
  }
});

AppRegistry.registerComponent('Animated', () => Animated);
