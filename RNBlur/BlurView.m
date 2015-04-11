#import "BlurView.h"

@implementation BlurView {
  UIBlurEffect *blurEffect;
  UIVisualEffectView *visualEffectView;
}

-(void)layoutSubviews
{
  [super layoutSubviews];
  
  if ([_blurType isEqual: @"xlight"]) {
    blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleExtraLight];
  } else if ([_blurType isEqual: @"light"]) {
    blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
  } else if ([_blurType isEqual: @"dark"]) {
    blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
  }
  
  visualEffectView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];
  visualEffectView.frame = self.bounds;
  [self insertSubview:visualEffectView atIndex:0];
}

@end
