const React = require('react');
const {
  Component,
  PropTypes
} = React;

const { requireNativeComponent } = require('react-native');

class VibrancyView extends Component {
  render() {
    return (
      <NativeVibrancyView
        {...this.props}
        style={[{
          backgroundColor: 'transparent',
        }, this.props.style
        ]}
      />
    );
  }
}

VibrancyView.propTypes = {
  blurType: PropTypes.string,
};

const NativeVibrancyView = requireNativeComponent('VibrancyView', VibrancyView);

module.exports = VibrancyView;
