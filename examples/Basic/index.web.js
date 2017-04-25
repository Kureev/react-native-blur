/**
 * Basic [Web] Example for react-native-blur
 * https://github.com/react-native-community/react-native-blur
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Switch,
  InteractionManager,
} from 'react-native';

import { BlurView } from 'react-native-blur';

// Sets up offline caching for all assets (disabled by default)
// You can enable offline caching by changing
// `enableOfflinePlugin` at the top of web/webpack.config.js
if (__OFFLINE__) {
  require('offline-plugin/runtime').install();
}


const BLUR_TYPES = ['xlight', 'light', 'dark'];

class Basic extends Component {
  constructor() {
    super();
    this.state = {
      showBlur: true,
      viewRef: null,
      activeSegment: 2,
      blurType: 'dark',
    };
  }

  // No need to wait for image, it's inlined with data-uri
  componentDidMount() {
    this.setState({ viewRef: this.backgroundImage });
  }

  setBlurTypeIndex(selectedIndex) {
    this.setState({
      activeSegment: selectedIndex,
      blurType: BLUR_TYPES[selectedIndex],
    });
  }

  renderBlurView() {
    const tintColor = ['#fff', '#444'];
    if (this.state.blurType === 'xlight') tintColor.reverse();

    const buttonStyle = i => ({
      flex: 1,
      justifyContent: 'center',
      width: 120,
      height: 30,
      borderColor: tintColor[0],
      borderWidth: 1,
      borderLeftWidth: i === 0 ? 1 : 0,
      backgroundColor: i === this.state.activeSegment ? tintColor[0] : 'transparent',
    });

    const buttonTextStyle = i => ({
      textAlign: 'center',
      color: i === this.state.activeSegment ? tintColor[1] : tintColor[0],
    });

    return (
      <View style={styles.container}>
        {this.state.viewRef && <BlurView
          viewRef={this.state.viewRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
          }}

          blurRadius={10}
          blurType={this.state.blurType}

          // The following props are also available on web:
          //
          // blurAmount=10                          // Matches blurAmount on iOS
          // overlayColor={'rgba(0, 0, 255, .6)'}   // Set a blue overlay
          // transitionDuration={500}               // Animate the blur transition
        />}

        <Text style={[styles.text, { color: tintColor[0], zIndex: 100 }]}>
          Blur component (Web)
        </Text>

        <View style={styles.buttonContainer}>
          {BLUR_TYPES.map((blurType, i) =>
            <View
              key={blurType}
              style={buttonStyle(i)}
              onClick={() => { this.setBlurTypeIndex(i) }}
            >
              <Text style={buttonTextStyle(i)}>{blurType}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./bgimage.jpeg')}
          style={styles.image}
          ref={(i) => { this.backgroundImage = i; }}
        />

        { this.state.showBlur ? this.renderBlurView() : null }

        <View
          style={styles.blurToggle}>
          <Switch
            onValueChange={(value) => this.setState({showBlur: value})}
            value={this.state.showBlur} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    resizeMode: 'cover',
    width: null,
    height: null,
  },
  blurView: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  blurToggle: {
    position: 'absolute',
    top: 30,
    right: 10,
    alignItems: 'flex-end',
  },
});


AppRegistry.registerComponent('Basic', () => Basic);
AppRegistry.runApplication('Basic', {
  rootTag: window.document.getElementById('react-root'),
});
