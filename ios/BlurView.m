#import <UIKit/UIKit.h>
#import "BlurView.h"
#import "BlurAmount.h"

@interface BlurView ()

@property (nonatomic, strong) UIVisualEffectView *visualEffectView;
@property (nonatomic, strong) UIBlurEffect *blurEffect;
@property (nonatomic, strong) id animator;

@end

@implementation BlurView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
        self.visualEffectView = [[UIVisualEffectView alloc] initWithEffect:self.blurEffect];
        self.visualEffectView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        self.visualEffectView.frame = frame;

        self.clipsToBounds = true;

        [self addSubview:self.visualEffectView];
        if ([UIViewPropertyAnimator class]) {
          UICubicTimingParameters *timingParameters = [[UICubicTimingParameters alloc] initWithAnimationCurve:UIViewAnimationCurveLinear];
          self.animator = [[UIViewPropertyAnimator alloc] initWithDuration:1.0 timingParameters:timingParameters];

          __weak typeof(self) weakSelf = self;
          [self.animator addAnimations:^{
              weakSelf.visualEffectView.effect = nil;
          }];
      }
    }

    return self;
}

- (void)setBlurType:(NSString *)blurType
{
    if ([blurType isEqual: @"xlight"]) {
        self.blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleExtraLight];
    } else if ([blurType isEqual: @"light"]) {
        self.blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
    } else if ([blurType isEqual: @"dark"]) {
        self.blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
    } else {
        self.blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
    }
    self.visualEffectView.effect = self.blurEffect;
}

- (void)setBlurAmount:(NSNumber *)blurAmount
{
    if ([UIViewPropertyAnimator class]) {
        CGFloat maxValue = 25.0f;
        CGFloat clampedValue = fminf(fmaxf([blurAmount floatValue], 0), maxValue);
        CGFloat fractionComplete = 1.0f - (clampedValue / maxValue);

        [self.animator setFractionComplete:fractionComplete];
    } else {
        [BlurAmount updateBlurAmount:blurAmount];
    }
}

@end
