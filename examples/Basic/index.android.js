/**
 * Basic [Android] Example for react-native-blur
 * https://github.com/react-native-community/react-native-blur
 */
'use strict';
import React, {Component} from 'react';
import {
  AppRegistry,
  Image,
  findNodeHandle,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {BlurView} from 'react-native-blur';

class Basic extends Component {

  constructor() {
    super()
    this.state = {
      viewRef: 0,
    }
  }

  imageLoaded() {
    this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})
  }

  render() {
    return (
      <Image
        source={require('./bgimage.jpeg')}
        style={styles.container}
        ref={'backgroundImage'}
        onLoadEnd={this.imageLoaded.bind(this)}>
        <BlurView
          blurRadius={10}
          downsampleFactor={5}
          overlayColor={'rgba(255, 255, 255, .25)'}
          style={styles.blurView}
          viewRef={this.state.viewRef}/>
        <Text style={styles.welcome}>{`Blur component`}</Text>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    width: null,
    height: null,
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
  },
  blurView: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  },
});

AppRegistry.registerComponent('Basic', () => Basic);
