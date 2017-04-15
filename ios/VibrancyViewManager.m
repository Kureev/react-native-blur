#import "VibrancyViewManager.h"
#import "VibrancyView.h"

@implementation VibrancyViewManager

RCT_EXPORT_MODULE();

- (UIView *)view
{
  return [[VibrancyView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(blurType, NSString);
RCT_EXPORT_VIEW_PROPERTY(blurAmount, NSNumber);

@end
