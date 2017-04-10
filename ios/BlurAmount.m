#import "BlurAmount.h"
#import <objc/runtime.h>

@interface UIBlurEffect (Protected)

@property (nonatomic, readonly) id effectSettings;
@property (nonatomic, copy, class) NSNumber *localBlurAmount;

@end


@implementation BlurAmount

static NSNumber *_localBlurAmount = nil;

+ (instancetype)effectWithStyle:(UIBlurEffectStyle)style
{
    id result = [super effectWithStyle:style];
    object_setClass(result, self);

    return result;
}

- (id)effectSettings
{
    id settings = [super effectSettings];
    [settings setValue:BlurAmount.localBlurAmount forKey:@"blurRadius"];
    return settings;
}

- (id)copyWithZone:(NSZone*)zone
{
    id result = [super copyWithZone:zone];
    object_setClass(result, [self class]);
    return result;
}

+ (void)setLocalBlurAmount:(NSNumber *)localBlurAmount {
    if (localBlurAmount != _localBlurAmount) {
        _localBlurAmount = localBlurAmount;
    }
}

+ (NSNumber *)localBlurAmount {
    return _localBlurAmount;
}

+ (id)updateBlurAmount:(NSNumber*)blurAmount
{
    self.localBlurAmount = blurAmount;
    return blurAmount;
}

@end
