import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent, StyleSheet} from 'react-native';

class VibrancyView extends Component {
  setNativeProps = nativeProps => {
    if (this._root) {
      this._root.setNativeProps(nativeProps);
    }
  };

  render() {
    return (
      <NativeVibrancyView
        {...this.props}
        style={StyleSheet.compose(styles.transparent, this.props.style)}
      />
    );
  }
}

const styles = StyleSheet.create({
  transparent: { backgroundColor: 'transparent' },
});

VibrancyView.propTypes = {
  blurType: PropTypes.string,
  blurAmount: PropTypes.number.isRequired,
};

VibrancyView.defaultProps = {
  blurAmount: 10,
};

const NativeVibrancyView = requireNativeComponent('VibrancyView', VibrancyView);

module.exports = VibrancyView;
