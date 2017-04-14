/**
 * Basic [iOS] Example for react-native-blur
 * https://github.com/react-native-community/react-native-blur
 */
import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  SegmentedControlIOS,
  Slider,
  Switch
} from 'react-native'

import { BlurView, VibrancyView } from 'react-native-blur'

class Basic extends Component {

  constructor() {
    super()
    this.state = {
      showBlurs: true,
      blurBlurType: 'light',
      blurActiveSegment: 1,
      vibrancyBlurType: 'dark',
      vibrancyActiveSegment: 2,
      blurAmount: 5,
    }
  }

  _onBlurChange(event) {
    this.setState({blurActiveSegment: event.nativeEvent.selectedSegmentIndex})
  }

  _onBlurValueChange(value) {
    this.setState({blurBlurType: value})
  }

  _onBlurAmountChange(blurAmount) {
    this.setState({ blurAmount });
  }

  _onVibrancyChange(event) {
    this.setState({vibrancyActiveSegment: event.nativeEvent.selectedSegmentIndex})
  }

  _onVibrancyValueChange(value) {
    this.setState({vibrancyBlurType: value})
  }

  renderBlurs() {
    return (
      <View style={styles.container}>

        <View style={styles.blurContainer}>
          {/*
            BlurView is supported on both iOS and Android.
            If you also need to support Android, the BlurView must be
            absolutely positioned behind your unblurred views, and it
            cannot contain any child views.
          */}
          <BlurView
            blurType={this.state.blurBlurType}
            blurAmount={this.state.blurAmount}
            style={[styles.blurView]} />

          <Text style={styles.welcome}>{`Blur component`}</Text>

          <SegmentedControlIOS
            values={['xlight', 'light', 'dark']}
            selectedIndex={this.state.blurActiveSegment}
            onChange={(event) => {this._onBlurChange(event)}}
            onValueChange={(value) => {this._onBlurValueChange(value)}}
            tintColor={this.state.blurBlurType == 'xlight' ? 'black' : 'white'}/>

            <Slider
              minimumValue={0}
              maximumValue={25}
              onValueChange={(value) => this._onBlurAmountChange(value)} />
        </View>

        {/*
          VibrancyView is only supported on iOS, and must contain child views,
          otherwise the vibrancy effect doesn't work.
        */}
        <VibrancyView
          blurType={this.state.vibrancyBlurType}
          blurAmount={1}
          style={[styles.container, styles.blurContainer]}>
          <Text style={styles.welcome}>{`Vibrancy component`}</Text>
          <SegmentedControlIOS
            values={['xlight', 'light', 'dark']}
            selectedIndex={this.state.vibrancyActiveSegment}
            onChange={(event) => {this._onVibrancyChange(event)}}
            onValueChange={(value) => {this._onVibrancyValueChange(value)}}
            tintColor={this.state.vibrancyBlurType == 'xlight' ? 'black' : 'white'}/>
        </VibrancyView>
      </View>
    )
  }

  render() {
    return (
      <View
        style={styles.container}>
        <Image
          source={require('./bgimage.jpeg')}
          resizeMode='cover'
          style={styles.img}/>

        { this.state.showBlurs ? this.renderBlurs() : null }

        <View
          style={styles.blurToggle}>
          <Switch
            onValueChange={(value) => this.setState({showBlurs: value})}
            value={this.state.showBlurs} />
        </View>

      </View>
    );
  }
}

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
    height: null,
    width: null,
  },
  welcome: {
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
  }
});

AppRegistry.registerComponent('Basic', () => Basic);
