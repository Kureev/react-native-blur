/**
 * Basic [iOS] Example for react-native-blur
 * https://github.com/react-native-community/react-native-blur
 */
import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  SegmentedControlIOS,
  Switch
} from 'react-native'

import {BlurView, VibrancyView} from 'react-native-blur'

class Basic extends Component {

  constructor() {
    super()
    this.state = {
      showBlurs: true,
      blurBlurType: 'light',
      blurActiveSegment: 1,
      vibrancyBlurType: 'dark',
      vibrancyActiveSegment: 2,
    }
  }

  _onBlurChange(event) {
    this.setState({blurActiveSegment: event.nativeEvent.selectedSegmentIndex})
  }

  _onBlurValueChange(value) {
    this.setState({blurBlurType: value})
  }

  _onVibrancyChange(event) {
    this.setState({vibrancyActiveSegment: event.nativeEvent.selectedSegmentIndex})
  }

  _onVibrancyValueChange(value) {
    this.setState({vibrancyBlurType: value})
  }

  render() {
    return (
      <View
        style={styles.container}>

        <Image
          source={require('./bgimage.jpeg')}
          resizeMode='cover'
          style={styles.img}/>

        {(this.state.showBlurs

          ? <View style={styles.container}>
        
              <BlurView
                blurType={this.state.blurBlurType}
                blurAmount={10}
                style={[styles.container, styles.blurContainer]}>
                <Text style={styles.welcome}>{`Blur component`}</Text>
                <SegmentedControlIOS
                  values={['xlight', 'light', 'dark']}
                  selectedIndex={this.state.blurActiveSegment}
                  onChange={(event) => {this._onBlurChange(event)}}
                  onValueChange={(value) => {this._onBlurValueChange(value)}}
                  tintColor={this.state.blurBlurType == 'xlight' ? 'black' : 'white'}/>
              </BlurView>

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

          : null
        )}

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
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
  },
  blurContainer: {
    paddingHorizontal: 20,
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