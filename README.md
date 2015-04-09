### React Native Blur
Documentation is under construction. Try to check it out in a few hours.

### Getting started
1. `npm install react-native-blur`
2. In XCode, in the project navigator, right click on project's name ➜ `Add Files to [your project's name]`
3. Go to `node_modules` ➜ `react-native-blur` and add `RNBlur` folder
4. Compile and have fun!

### Usage example
```javascript
var Menu = React.createClass({
  render: function() {
    return (
      <Image source={{uri: uri}} style={styles.menu}>
        <BlurView style={styles.blur}>
          <Text onPress={this.props.menuActions.close}>
            Hi, I am a tiny menu item
          </Text>
        </BlurView>
      </Image>
    );
  }
});
```
All parent components to blur view would be blurred. Everything inside wouldn't.