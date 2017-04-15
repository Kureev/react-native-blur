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

2. Link your native dependencies:
  ```
  react-native link react-native-blur
  ```
3. (Android only) Add the following to your `android/app/build.gradle`

`android/build.gradle`
```
  buildscript {
    dependencies {
        // Update "Android Plugin for Gradle" version
        classpath 'com.android.tools.build:gradle:2.2.3'
    }
  }

  // ...

  allprojects {
    repositories {
        // Add the following in a new line, underneath "maven { url '$rootDir/../node_modules/react-native/android' }"
        maven { url 'https://github.com/500px/500px-android-blur/raw/master/releases/' }
    }
}
```

`android/app/build.gradle`
```
dependencies {
    compile 'com.fivehundredpx:blurringview:1.0.0'
}


android {
    defaultConfig {
        // Add these to the existing config
        renderscriptTargetApi 23
        renderscriptSupportModeEnabled true
    }
}
```

`android/gradle/wrapper/gradle-wrapper.properties`
```
// Update Gradle version
distributionUrl=https\://services.gradle.org/distributions/gradle-3.3-all.zip
```

4. Inside your code include JS part by adding

  ```javascript
  const { BlurView, VibrancyView } = require('react-native-blur');
  ```

5. Compile and have fun!

### Usage example

You can run the built-in examples by running these steps:


1. Clone the repository

```
cd ~
git clone https://github.com/react-native-community/react-native-blur.git
```

2. cd to `examples/Basic`

```
cd react-native-blur/examples/Basic
```

3. Install dependencies

```
npm install
```

4. Run the apps:

#### Run the iOS app

```
react-native run-ios
```

#### Run the Android app

```
react-native run-android
```

#### Blur View

To use `blur` view, you need to require `BlurView` to your module and insert `<BlurView>` tag inside render function as it's done below:

```javascript
const { BlurView } = require('react-native-blur');

const Menu = React.createClass({
  render() {
    return (
      <View>
        <Image source={{uri}} style={styles.menu} />
        <BlurView blurType="light" blurAmount={10} style={styles.blur} />
        <Text style={styles.text}>Hi, I am a tiny menu item</Text>
      </View>
    );
  }
});
```

In this example, `Image` component will be blurred, a `BlurView` content will stay untouched.

Note that if you need to support Android, the `BlurView` cannot be a child of the view that is being
blurred, and it cannot contain any child components. See the [Android section](#android) for more information.

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

> Note: `VibrancyView` is only supported on iOS. It must contain child views, otherwise the effect does not work.

### Component properties
- `blurType` (String) - blur type effect
  - `xlight` - extra light blur type
  - `light` - light blur type
  - `dark` - dark blur type
- `blurAmount` (Default: 10, Number) - blur amount effect
  - `0-100` - Adjusts blur intensity

### Android

Android support uses an [external library](https://github.com/500px/500px-android-blur) which has slightly different properties and setup requirements. This is why extra code must be added manually to the `android/app/build.gradle` file as documented above.

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
