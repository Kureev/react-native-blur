#import "BlurViewManager.h"
#import "BlurView.h"

@implementation BlurViewManager

- (RCTView *)view
{
    return [[BlurView alloc] init];
}

@end
