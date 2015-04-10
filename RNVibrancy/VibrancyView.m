#import "VibrancyView.h"
#import "BlurView.h"

@interface VibrancyView ()



@end

@implementation VibrancyView {
  UIVisualEffectView *visualEffectView;
  UIVisualEffectView *visualEffectViewVibrancy;
}

-(id)init
{
    self = [super init];
    if (self) {
      
      // Blur effect
      UIBlurEffect *blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
      visualEffectView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];

      // Vibrancy effect
      UIVibrancyEffect *vibrancyEffect = [UIVibrancyEffect effectForBlurEffect:blurEffect];
      visualEffectViewVibrancy = [[UIVisualEffectView alloc] initWithEffect:vibrancyEffect];
      
      [visualEffectView.contentView addSubview:visualEffectViewVibrancy];
    }
    return self;
}

-(void)layoutSubviews
{
  [super layoutSubviews];
  if ([self.subviews containsObject:visualEffectView] == NO) {
    visualEffectView.frame = self.bounds;
    visualEffectViewVibrancy.frame = self.bounds;
    
    for (RCTView *v in self.subviews) {
      [v removeFromSuperview];
      [visualEffectViewVibrancy.contentView addSubview:v];
    }
    
    [self addSubview:visualEffectView];
    
    

  }
  
}

@end
