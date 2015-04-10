#import "VibrancyViewManager.h"
#import "VibrancyView.h"

@implementation VibrancyViewManager

RCT_EXPORT_MODULE();

- (RCTView *)view
{
    return [[VibrancyView alloc] init];
}

@end
