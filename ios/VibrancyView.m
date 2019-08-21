#import <React/RCTComponent.h>
#import "BlurView.h"
#import "VibrancyView.h"

@interface VibrancyView ()

@property (nonatomic, strong) UIVibrancyEffect *vibrancyEffect;
@property (nonatomic, strong) UIVisualEffectView *vibrancyEffectView;

@end

@implementation VibrancyView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.vibrancyEffectView = [[UIVisualEffectView alloc] init];
        self.vibrancyEffectView.frame = frame;
        [self updateVibrancyEffect];

        [self.blurEffectView.contentView addSubview:self.vibrancyEffectView];
    }

    return self;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    self.vibrancyEffectView.frame = self.bounds;
}

- (void)insertReactSubview:(id<RCTComponent>)subview atIndex:(NSInteger)atIndex {
  if ([self useReduceTransparencyFallback]) {
    [self addSubview:(UIView*)subview];
  } else {
    [self.vibrancyEffectView.contentView addSubview:(UIView*)subview];
  }
}

- (void)updateBlurEffect
{
  [super updateBlurEffect];
  [self updateVibrancyEffect];
}

- (void)updateVibrancyEffect
{
  self.vibrancyEffect = [UIVibrancyEffect effectForBlurEffect:self.blurEffect];
  self.vibrancyEffectView.effect = self.vibrancyEffect;
}

- (void)updateFallbackView
{
  [super updateFallbackView];

  if ([self useReduceTransparencyFallback]) {
    for (UIView *subview in self.blurEffectView.contentView.subviews) {
      [subview removeFromSuperview];
      [self addSubview:subview];
    }
  } else {
    for (UIView *subview in self.subviews) {
      if (subview == self.blurEffectView) continue;
      if (subview == self.reducedTransparencyFallbackView) continue;

      [subview removeFromSuperview];
      [self.blurEffectView.contentView addSubview:subview];
    }
  }
}

@end
