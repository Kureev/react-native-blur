#import "VibrancyView.h"
#import "BlurView.h"
#import "RCTViewNodeProtocol.h"

@implementation VibrancyView {
  UIVisualEffectView *_visualEffectView;
  UIVisualEffectView *_vibrancyView;
}

-(void)layoutSubviews
{
  [super layoutSubviews];

  _visualEffectView.frame = self.bounds;
  _vibrancyView.frame = self.bounds;
}

- (void)setBlurType:(NSString *)blurType {
  NSArray *subviews;
  if (_visualEffectView) {
    [_visualEffectView removeFromSuperview];
    subviews = [_vibrancyView.contentView.subviews copy];
  }

  UIBlurEffect *blurEffect;

  if ([blurType isEqual: @"xlight"]) {
    blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleExtraLight];
  } else if ([blurType isEqual: @"light"]) {
    blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
  } else if ([blurType isEqual: @"dark"]) {
    blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
  } else {
    blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
  }

  _visualEffectView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];

  UIVibrancyEffect *vibrancyEffect = [UIVibrancyEffect effectForBlurEffect:blurEffect];
  _vibrancyView = [[UIVisualEffectView alloc] initWithEffect:vibrancyEffect];

  [_visualEffectView.contentView addSubview:_vibrancyView];

  if (subviews) {
    for (UIView *v in subviews) {
      [_vibrancyView.contentView addSubview:v];
    }
  }
  [self addSubview:_visualEffectView];
}

- (void)insertReactSubview:(id<RCTViewNodeProtocol>)subview atIndex:(NSInteger)atIndex {
  [_vibrancyView.contentView addSubview:(UIView*)subview];
}

@end
