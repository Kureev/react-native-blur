#import "BlurView.h"
#import "BlurEffectWithAmount.h"
#import <React/RCTLog.h>

#define IS_IOS11orHIGHER ([[[UIDevice currentDevice] systemVersion] floatValue] >= 11.0)

@interface BlurView ()
@property (nonatomic, strong) id animator;
@end

@implementation BlurView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.blurEffectView = [[UIVisualEffectView alloc] init];
        self.blurEffectView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        self.blurEffectView.frame = frame;

        self.blurAmount = @10;
        self.blurType = @"dark";
        [self updateBlurEffect];

        self.clipsToBounds = true;

        [self addSubview:self.blurEffectView];
    }

    return self;
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  self.blurEffectView.frame = self.bounds;
  [self updateBlurEffect];
}

- (void)setBlurType:(NSString *)blurType
{
  if (blurType && ![self.blurType isEqual:blurType]) {
    _blurType = blurType;
    [self updateBlurEffect];
  }
}

- (void)setBlurAmount:(NSNumber *)blurAmount
{
    _blurAmount = blurAmount;
    [self updateBlurAmount];
}


- (UIBlurEffectStyle)blurEffectStyle
{
  if ([self.blurType isEqual: @"xlight"]) return UIBlurEffectStyleExtraLight;
  if ([self.blurType isEqual: @"light"]) return UIBlurEffectStyleLight;
  if ([self.blurType isEqual: @"dark"]) return UIBlurEffectStyleDark;

  #if TARGET_OS_TV
    if ([self.blurType isEqual: @"extraDark"]) return UIBlurEffectStyleExtraDark;
    if ([self.blurType isEqual: @"regular"]) return UIBlurEffectStyleRegular;
    if ([self.blurType isEqual: @"prominent"]) return UIBlurEffectStyleProminent;
  #endif

  return UIBlurEffectStyleDark;
}

- (void)updateBlurEffect
{
    UIBlurEffectStyle style = [self blurEffectStyle];
    self.blurEffectView.effect = [UIBlurEffect effectWithStyle:style];
    UICubicTimingParameters *timingParameters = [[UICubicTimingParameters alloc] initWithAnimationCurve:UIViewAnimationCurveLinear];
    [self.animator stopAnimation:FALSE];
    [self.animator finishAnimationAtPosition:UIViewAnimatingPositionCurrent];
    self.animator = [[UIViewPropertyAnimator alloc] initWithDuration:1.0
                                                    timingParameters:timingParameters];
    if (IS_IOS11orHIGHER) {
        [self.animator setPausesOnCompletion:TRUE];
    }
    __weak typeof(self) weakSelf = self;
    [self.animator addAnimations:^{
        weakSelf.blurEffectView.effect = nil;
    }];
    [self updateBlurAmount];
}

- (void)updateBlurAmount
{
    CGFloat maxValue = 25.0f;
    CGFloat clampedValue = fminf(fmaxf([self.blurAmount floatValue], 0), maxValue);
    CGFloat fractionComplete = 1.0f - (clampedValue / maxValue);
    [self.animator setFractionComplete:fractionComplete];
}

- (void)dealloc
{
    [self.animator stopAnimation:TRUE];
}

@end
