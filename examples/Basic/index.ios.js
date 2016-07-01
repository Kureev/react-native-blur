import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {BlurView, VibrancyView} from 'react-native-blur';

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
});

const background = 'http://iphonewallpapers-hd.com/thumbs/firework_iphone_wallpaper_5-t2.jpg';

class Basic extends Component {
  render() {
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
}

AppRegistry.registerComponent('Basic', () => Basic);
