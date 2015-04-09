### React Native Blur
Component implementation for UIVisualEffectView's blur effect.

<img src='http://oi59.tinypic.com/2kmz2g.jpg' />

### Install
1. `npm install react-native-blur`
2. In the XCode's "Project navigator", right click on project's name ➜ `Add Files to <...>`
3. Go to `node_modules` ➜ `react-native-blur` and add `RNBlur` folder
4. Compile and have fun!

### Usage example
```javascript
var Menu = React.createClass({
  render: function() {
    return (
      <Image source={{uri}} style={styles.menu}>
        <BlurView style={styles.blur}>
          <Text>
            Hi, I am a tiny menu item
          </Text>
        </BlurView>
      </Image>
    );
  }
});
```
All parent components to blur view would be blurred. Everything inside wouldn't.