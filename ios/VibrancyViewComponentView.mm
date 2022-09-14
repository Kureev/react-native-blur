#ifdef RCT_NEW_ARCH_ENABLED

#import "VibrancyViewComponentView.h"

#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>

#import <react/renderer/components/rnblurview/ComponentDescriptors.h>
#import <react/renderer/components/rnblurview/EventEmitters.h>
#import <react/renderer/components/rnblurview/Props.h>
#import <react/renderer/components/rnblurview/RCTComponentViewHelpers.h>

#import "VibrancyView.h"

using namespace facebook::react;

@interface VibrancyViewComponentView () <RCTVibrancyViewViewProtocol>
@end

@implementation VibrancyViewComponentView
{
  VibrancyView *_vibrancyView;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<VibrancyViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const VibrancyViewProps>();
    _props = defaultProps;
    _vibrancyView = [[VibrancyView alloc] initWithFrame:self.bounds];
    self.contentView = _vibrancyView;
  }

  return self;
}

- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
  [_vibrancyView attachToVisualEffectView:childComponentView];
}

- (void)unmountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
  // Override unmountChildComponentView to avoid an assertion on childComponentView.superview == self
  // childComponentView is not a direct subview of self, as it's inserted deeper in a UIVisualEffectView
  [childComponentView removeFromSuperview];
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<const VibrancyViewProps>(_props);
  const auto &newViewProps = *std::static_pointer_cast<const VibrancyViewProps>(props);
  
  if (oldViewProps.blurAmount != newViewProps.blurAmount) {
    NSNumber *blurAmount = [NSNumber numberWithInt:newViewProps.blurAmount];
    [_vibrancyView setBlurAmount:blurAmount];
  }

  if (oldViewProps.blurType != newViewProps.blurType) {
    NSString *blurType = [NSString stringWithUTF8String:toString(newViewProps.blurType).c_str()];
    [_vibrancyView setBlurType:blurType];
  }
  
  if (oldViewProps.reducedTransparencyFallbackColor != newViewProps.reducedTransparencyFallbackColor) {
    UIColor *color = RCTUIColorFromSharedColor(newViewProps.reducedTransparencyFallbackColor);
    [_vibrancyView setReducedTransparencyFallbackColor:color];
  }
  
  [super updateProps:props oldProps:oldProps];
}

@end

Class<RCTComponentViewProtocol> VibrancyViewCls(void)
{
  return VibrancyViewComponentView.class;
}

#endif // RCT_NEW_ARCH_ENABLED
