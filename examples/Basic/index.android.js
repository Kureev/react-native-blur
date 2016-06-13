/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var ReactNative = require('react-native');
var React = require('react');
var {
  AppRegistry,
  Image,
  findNodeHandle,
  StyleSheet,
  Text,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  welcome: {
    fontSize: 20,
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

var BlurView = require('react-native-blur').BlurView;

var background = 'http://iphonewallpapers-hd.com/thumbs/firework_iphone_wallpaper_5-t2.jpg';

class Basic extends React.Component {
  state = {
    viewRef: 0
  }

  imageLoaded() {
    this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})
  }

  render() {
    return (
      <Image
        source={{uri: background}}
        style={styles.container}
        ref={'backgroundImage'}
        onLoadEnd={this.imageLoaded.bind(this)}
      >
        <BlurView
          blurRadius={10}
          downsampleFactor={5}
          overlayColor={'rgba(255, 255, 255, 0.1)'}
          style={styles.blurView}
          viewRef={this.state.viewRef}
        />
        <Text style={styles.welcome}>Blur component</Text>
      </Image>
    );
  }
}

AppRegistry.registerComponent('Basic', () => Basic);
