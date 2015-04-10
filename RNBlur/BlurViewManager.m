#import "BlurViewManager.h"
#import "BlurView.h"

@implementation BlurViewManager

RCT_EXPORT_MODULE();

- (RCTView *)view
{
    return [[BlurView alloc] init];
}

@end
