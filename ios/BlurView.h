#import <UIKit/UIKit.h>
#import "BlurEffectWithAmount.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
#endif // RCT_NEW_ARCH_ENABLED

@interface BlurView :
#ifdef RCT_NEW_ARCH_ENABLED
    RCTViewComponentView
#else
    UIView
#endif // RCT_NEW_ARCH_ENABLED

@property (nonatomic, copy, nullable) NSString *blurType;
@property (nonatomic, copy, nullable) NSNumber *blurAmount;
@property (nonatomic, copy, nullable) UIColor *reducedTransparencyFallbackColor;

@property (nonatomic, strong, nullable) BlurEffectWithAmount *blurEffect;
@property (nonatomic, strong, nullable) UIVisualEffectView *blurEffectView;
@property (nonatomic, strong, nullable) UIView *reducedTransparencyFallbackView;

- (void)updateBlurEffect;
- (void)updateFallbackView;
- (BOOL)useReduceTransparencyFallback;
@end
