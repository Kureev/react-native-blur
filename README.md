### React Native Blur
Component implementation for UIVisualEffectView's blur effect.
Check the [roadmap here](https://github.com/Kureev/react-native-blur/issues/1)

<img src='http://oi59.tinypic.com/2kmz2g.jpg' />

### Content
- [Installation](#installation)
- [Usage example](#usage-example)
- [Questions?](#questions)

### Installation
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

### Questions?
Feel free to contact me in [twitter](https://twitter.com/kureevalexey) or [create an issue](https://github.com/Kureev/react-native-blur/issues/new)