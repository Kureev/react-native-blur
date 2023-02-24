# `@react-native-community/blur`

[![npm version](https://badge.fury.io/js/%40react-native-community%2Fblur.svg)](https://badge.fury.io/js/%40react-native-community%2Fblur)

A component for UIVisualEffectView's blur and vibrancy effect on iOS, and [BlurView](https://github.com/Dimezis/BlurView) on Android.<br>

<img src='https://cloud.githubusercontent.com/assets/139536/25066337/3c9d44c0-224d-11e7-8ca6-028478bf4a7d.gif' />

### Current Maintainers:
- [Thibault Malbranche](https://github.com/Titozzz) ([Twitter @titozzz](https://twitter.com/titozzz)) from [Brigad](https://www.brigad.co/en-gb/about-us)

### Content

- [Installation](#installation)
- [Usage](#usage)
- [VibrancyView](#vibrancyview)
- [Example React Native app](#example-react-native-app)
- [Questions?](#questions)

### Installation

```
yarn add @react-native-community/blur
```

Install native dependencies (iOS only):

```
cd ios && pod install
```

### Usage

#### BlurView

| Property | Possible Values | Default | Platform
| ----------- | ----------- | ----------- | -----------
| `blurType` | See blurType below | - | All
| `blurAmount` | 0 - 100 (The maximum blurAmount on Android is 32, so higher values will be clamped to 32) | 10 | All
| `reducedTransparencyFallbackColor` | Any color | - | iOS only
| `blurRadius` | 0 - 25 | Matches iOS blurAmount | Android only
| `downsampleFactor` | 0 - 25 | Matches iOS blurAmount | Android only
| `overlayColor` | Any color | Default color based on iOS blurType | Android only

#### blurType

| Name | Description
| ----------- | -----------
| `xlight` | extra light blur type
| `light` | light blur type
| `dark` | dark blur type
| `extraDark` | extra dark blur type (tvOS only)
| `regular` | regular blur type (iOS 10+ and tvOS only)
| `prominent` |  prominent blur type (iOS 10+ and tvOS only)

#### blurType (iOS 13 only)

| Name | Description
| ----------- | -----------
| `chromeMaterial` | An adaptable blur effect that creates the appearance of the system chrome.
| `material` | An adaptable blur effect that creates the appearance of a material with normal thickness.
| `thickMaterial` | An adaptable blur effect that creates the appearance of a material that is thicker than normal.
| `chromeMaterial` | An adaptable blur effect that creates the appearance of the system chrome.
| `thinMaterial` | An adaptable blur effect that creates the appearance of an ultra-thin material.
| `ultraThinMaterial` | An adaptable blur effect that creates the appearance of an ultra-thin material.
| `chromeMaterialDark` | A blur effect that creates the appearance of an ultra-thin material and is always dark.
| `materialDark` | A blur effect that creates the appearance of a thin material and is always dark.
| `thickMaterialDark` | A blur effect that creates the appearance of a material with normal thickness and is always dark.
| `thinMaterialDark` | A blur effect that creates the appearance of a material that is thicker than normal and is always dark.
| `ultraThinMaterialDark` | A blur effect that creates the appearance of the system chrome and is always dark.
| `chromeMaterialLight` | An adaptable blur effect that creates the appearance of the system chrome.
| `materialLight` | An adaptable blur effect that creates the appearance of a material with normal thickness.
| `thickMaterialLight` | An adaptable blur effect that creates the appearance of a material that is thicker than normal.
| `thinMaterialLight` | An adaptable blur effect that creates the appearance of a thin material.
| `ultraThinMaterialLight` | An adaptable blur effect that creates the appearance of an ultra-thin material.

Complete usage example that works on iOS and Android:

```javascript
import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";

export default function Menu() {
  return (
    <View style={styles.container}>
      <Image
        key={'blurryImage'}
        source={{ uri }}
        style={styles.absolute}
      />
      <Text style={styles.absolute}>Hi, I am some blurred text</Text>
      {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
```

In this example, the `Image` component will be blurred, because the `BlurView` in positioned on top. But the `Text` will stay unblurred.

If the accessibility setting [`Reduce Transparency`](https://support.apple.com/guide/iphone/display-settings-iph3e2e1fb0/ios) is enabled the `BlurView` will use `reducedTransparencyFallbackColor` as it's background color rather than blurring. If no `reducedTransparencyFallbackColor` is provided, the`BlurView`will use the default fallback color (white, black, or grey depending on `blurType`)

### VibrancyView

Uses the same properties as `BlurView` (`blurType`, `blurAmount`, and `reducedTransparencyFallbackColor`).

The vibrancy effect lets the content underneath a blurred view show through more vibrantly

`VibrancyView is only supported on iOS. Also note that the VibrancyView must contain nested views`

```javascript
import { VibrancyView } from "@react-native-community/blur";

export default function Menu() {
  return (
    <Image source={{ uri }} style={styles.absolute}>
      <VibrancyView blurType="light" style={styles.flex}>
      <Text>Hi, I am some vibrant text.</Text>
      </VibrancyView>
    </Image>
  )
}
```

### Example React Native App

This project includes an example React Native app, which was used to make the GIF in this README.
You can run the apps by following these steps:

Clone the repository

```
git clone https://github.com/react-native-community/react-native-blur.git
```

Install dependencies

```
yarn
```

#### Run the app

```
yarn example android/ios
```

### Questions?

Feel free to [create an issue](https://github.com/Kureev/react-native-blur/issues/new)
