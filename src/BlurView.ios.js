import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, requireNativeComponent, ViewPropTypes, StyleSheet} from 'react-native';

class BlurView extends Component {
  setNativeProps = nativeProps => {
    if (this._root) {
      this._root.setNativeProps(nativeProps);
    }
  };

  render() {
    return (
      <NativeBlurView
        ref={e => (this._root = e)}
        {...this.props}
        style={StyleSheet.compose(styles.transparent, this.props.style)}
      />
    );
  }
}

const styles = StyleSheet.create({
  transparent: { backgroundColor: 'transparent' },
});

BlurView.propTypes = {
  ...(ViewPropTypes || View.propTypes),
  blurType: PropTypes.oneOf([
    'dark',
    'light',
    'xlight',
    'prominent',
    'regular',
    'extraDark',
    'chromeMaterial',
    'material',
    'thickMaterial',
    'thinMaterial',
    'ultraThinMaterial',
    'chromeMaterialDark',
    'materialDark',
    'thickMaterialDark',
    'thinMaterialDark',
    'ultraThinMaterialDark',
    'chromeMaterialLight',
    'materialLight',
    'thickMaterialLight',
    'thinMaterialLight',
    'ultraThinMaterialLight',
  ]),
  blurAmount: PropTypes.number,
};

BlurView.defaultProps = {
  blurType: 'dark',
  blurAmount: 10,
};

const NativeBlurView = requireNativeComponent('BlurView', BlurView);

module.exports = BlurView;
