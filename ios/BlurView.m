#import "BlurView.h"
#import "BlurAmount.h"


@implementation BlurView {
  UIVisualEffectView *_visualEffectView;
  UIBlurEffect * blurEffect;
}

- (void)setBlurType:(NSString *)blurType
{
  if (_visualEffectView) {
    [_visualEffectView removeFromSuperview];
  }

  self.clipsToBounds = true;
  if ([blurType isEqual: @"xlight"]) {
    blurEffect = [BlurAmount effectWithStyle:UIBlurEffectStyleExtraLight];
  } else if ([blurType isEqual: @"light"]) {
    blurEffect = [BlurAmount effectWithStyle:UIBlurEffectStyleLight];
  } else if ([blurType isEqual: @"dark"]) {
    blurEffect = [BlurAmount effectWithStyle:UIBlurEffectStyleDark];
  } else {
    blurEffect = [BlurAmount effectWithStyle:UIBlurEffectStyleDark];
  }

    dispatch_async(dispatch_get_main_queue(), ^{
        _visualEffectView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];
        _visualEffectView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        _visualEffectView.frame = self.bounds;
        [self insertSubview:_visualEffectView atIndex:0];
    });
}

- (void)setBlurAmount:(NSNumber *)blurAmount
{
    [BlurAmount updateBlurAmount:blurAmount];
}

@end
