#import "BlurView.h"

@implementation BlurView {
  UIVisualEffectView *_visualEffectView;
}

- (void)setBlurType:(NSString *)blurType
{
  if (_visualEffectView) {
    [_visualEffectView removeFromSuperview];
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
}

-(void)layoutSubviews
{
  [super layoutSubviews];

  _visualEffectView.frame = self.bounds;
  [self insertSubview:_visualEffectView atIndex:0];
}

@end
