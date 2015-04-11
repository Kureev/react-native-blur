#import "VibrancyView.h"
#import "BlurView.h"

@implementation VibrancyView {
  UIBlurEffect *blurEffect;
  UIVisualEffectView *visualEffectView;
  UIVisualEffectView *visualEffectViewVibrancy;
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
  
  UIVibrancyEffect *vibrancyEffect = [UIVibrancyEffect effectForBlurEffect:blurEffect];
  visualEffectViewVibrancy = [[UIVisualEffectView alloc] initWithEffect:vibrancyEffect];
  visualEffectViewVibrancy.frame = self.bounds;
    
  [visualEffectView.contentView addSubview:visualEffectViewVibrancy];
    
  for (UIView *v in self.subviews) {
    [v removeFromSuperview];
    [visualEffectViewVibrancy.contentView addSubview:v];
  }
    
  [self addSubview:visualEffectView];
  
}

@end
