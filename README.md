[![npm version](https://badge.fury.io/js/react-native-blur.svg)](https://badge.fury.io/js/react-native-blur)

### React Native Blur
Component implementation for UIVisualEffectView's blur and vibrancy effect.<br>
Check the [roadmap here](https://github.com/Kureev/react-native-blur/issues/1)

<img src='https://cloud.githubusercontent.com/assets/5795227/20123354/d877dba4-a61e-11e6-8e5a-c85f76419e20.gif' />

### Content
- [Installation](#installation)
- [Usage example](#usage-example)
  - [Blur view](#blur-view)
  - [Vibrancy view](#vibrancy-view)
- [Component properties](#component-properties)
- [Questions?](#questions)

### Installation
1. Install package via npm:

  ```
  npm install react-native-blur
  ```

2. Link your library by one of those ways: either by using `rnpm link` (see more about rnpm [here](https://github.com/rnpm/rnpm)) or like it's [described here](http://facebook.github.io/react-native/docs/linking-libraries-ios.html).
3. Inside your code include JS part by adding

  ```javascript
  const { BlurView, VibrancyView } = require('react-native-blur');
  ```

5. Compile and have fun!

### Usage example
You can run built-in example via few simple steps:
1. Clone repository
2. Go to `examples/Basic`
3. Run `npm install && open Basic.xcodeproj`
4. Hit "Run"(`cmd+R`) button on XCode panel

#### Blur View
To use `blur` view, you need to require `BlurView` to your module and insert `<BlurView>` tag inside render function as it's done below:

```javascript
const { BlurView } = require('react-native-blur');

const Menu = React.createClass({
  render() {
    return (
      <Image source={{uri}} style={styles.menu}>
        <BlurView blurType="light" blurAmount={10} style={styles.blur}>
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
const { VibrancyView } = require('react-native-blur');

const Menu = React.createClass({
  render() {
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
- `blurAmount` (Default: 10, Number) - blur amount effect
  - `0-100` - Adjusts blur intensity

*Note: `blurAmount` does not refresh with Hot Reloading. You must a refresh the app to view the results of the changes*

### Android

Android support uses an [external library](https://github.com/500px/500px-android-blur) which has slightly different properties and setup requirements. You must add the following to the `android/app/build.gradle` file:
```
android {
  ...
  defaultConfig {
    ...
    renderscriptTargetApi 20
    renderscriptSupportModeEnabled true
  }
}

repositories {
    maven { url 'https://github.com/500px/500px-android-blur/raw/master/releases/' }
}

dependencies {
  ...
  compile project(':react-native-blur')
}

buildscript {
    repositories {
        maven { url 'https://github.com/500px/500px-android-blur/raw/master/releases/' }
    }
    dependencies {
        classpath 'com.fivehundredpx:blurringview:1.0.0'
    }
}
```

The android BlurView works by blurring an existing referenced view, so you must wait till the view you want to blur is rendered and then provide the reference to the BlurView as the `viewRef` prop. Take a look at the example to see how it works.

It has the following props:
- `viewRef` (Number) - a reference to the existing view you want to blur
- `blurRadius` (Number)
- `downsampleFactor` (Number)
- `overlayColor` (Color)

#### Troubleshooting
On older instances of react-native, BlurView package does not get added into the MainActivity/MainApplication classes where you would see `Warning: Native component for 'BlurView' does not exist` in RN YellowBox or console.

To rectify this, you can add the BlurViewPackage manually in MainActivity/MainApplication classes
```java
...
import com.cmcewen.blurview.BlurViewPackage;
...

public class MainApplication extends Application implements ReactApplication {
...
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new BlurViewPackage()
      );
    }
...
}
```

### Questions?
Feel free to contact me in [twitter](https://twitter.com/kureevalexey) or [create an issue](https://github.com/Kureev/react-native-blur/issues/new)
