/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

var BlurView = require('react-native-blur').BlurView;
var VibrancyView = require('react-native-blur').VibrancyView;

var background = 'http://iphonewallpapers-hd.com/thumbs/firework_iphone_wallpaper_5-t2.jpg';

var basic = React.createClass({
  render: function() {
    return (
      <Image source={{uri: background}} style={styles.container}>
        <BlurView blurType="light" style={styles.container}>
         <Text style={styles.welcome}>Blur component</Text>
        </BlurView>

        <VibrancyView blurType="dark" style={styles.container}>
          <Text style={styles.welcome}>Vibrancy component</Text>
        </VibrancyView>
      </Image>
    );
  }
});

var styles = StyleSheet.create({
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
  }
});

AppRegistry.registerComponent('basic', () => basic);
