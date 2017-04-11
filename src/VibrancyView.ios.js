import React, { Component, PropTypes } from 'react';
import { requireNativeComponent } from 'react-native';

class VibrancyView extends Component {
  setNativeProps(nativeProps) {
    this._nativeComponent(setNativeProps);
  }

  render() {
    return (
      <NativeVibrancyView
        {...this.props}
        style={[{
          backgroundColor: 'transparent',
        }, this.props.style
        ]}
        ref={(c) => this._nativeComponent = c}
      />
    );
  }
}

VibrancyView.propTypes = {
  blurType: PropTypes.string,
};

const NativeVibrancyView = requireNativeComponent('VibrancyView', VibrancyView);

module.exports = VibrancyView;
