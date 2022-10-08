#import "BlurViewManager.h"
#import "BlurView.h"

@implementation BlurViewManager

RCT_EXPORT_MODULE();

- (UIView *)view
{
    return [[BlurView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(blurType, NSString);
RCT_EXPORT_VIEW_PROPERTY(blurAmount, NSNumber);
RCT_EXPORT_VIEW_PROPERTY(reducedTransparencyFallbackColor, UIColor);

@end
