const React = require('react-native');
const {
  requireNativeComponent,
  Component
} = React;

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
  blurType: React.PropTypes.string,
};

const NativeVibrancyView = requireNativeComponent('VibrancyView', VibrancyView);

module.exports = VibrancyView;
