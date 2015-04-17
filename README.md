### React Native Blur
Component implementation for UIVisualEffectView's blur and vibrancy effect.<br>
Check the [roadmap here](https://github.com/Kureev/react-native-blur/issues/1)

<img src='http://oi62.tinypic.com/8x4u94.jpg' />

### Content
- [Installation](#installation)
- [Usage example](#usage-example)
  - [Blur view](#blur-view)
  - [Vibrancy view](#vibrancy-view)
- [Component properties](#component-properties)
- [Questions?](#questions)

### Installation
1. `npm install react-native-blur`
2. In the XCode's "Project navigator", right click on project's name ➜ `Add Files to <...>`
3. Go to `node_modules` ➜ `react-native-blur` ➜ add `RNBlur` and `RNVibrancy` folders
4. Compile and have fun!

### Usage example
*First of all, if you don't want to read it, you can just clone the repo and go into `examples/basic` folder to try out working example.*

#### Blur View
To use `blur` view, you need to require `BlurView` to your module and insert `<BlurView>` tag inside render function as it's done below:
```javascript
var BlurView = require('react-native-blur').BlurView;

var Menu = React.createClass({
  render: function() {
    return (
      <Image source={{uri}} style={styles.menu}>
        <BlurView blurType="light" style={styles.blur}>
          <Text>Hi, I am a tiny menu item</Text>
        </BlurView>
      </Image>
    );
  }
});
```

In this example, `Image` component will be blurred, a `BlurView` content will stay untouched.

#### Vibrancy View
> The vibrancy effect lets the content underneath a blurred view show through more vibrantly

```javascript
var VibrancyView = require('react-native-blur').VibrancyView;

var Menu = React.createClass({
  render: function() {
    return (
      <Image source={{uri}} style={styles.menu}>
        <VibrancyView blurType="light" style={styles.blur}>
          <Text>Hi, I am a tiny menu item</Text>
        </VibrancyView>
      </Image>
    );
  }
});
```

### Component properties
- `blurType` (String) - blur type effect
  - `xlight` - extra light blur type
  - `light` - light blur type
  - `dark` - dark blur type

### Questions?
Feel free to contact me in [twitter](https://twitter.com/kureevalexey) or [create an issue](https://github.com/Kureev/react-native-blur/issues/new)
