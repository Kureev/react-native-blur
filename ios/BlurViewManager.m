#import "BlurViewManager.h"
#import "BlurView.h"

@implementation BlurViewManager

RCT_EXPORT_MODULE();

- (RCTView *)view
{
    return [[BlurView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(blurType, NSString);

@end
