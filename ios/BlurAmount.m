#import <UIKit/UIKit.h>
#import <objc/runtime.h>

@interface UIBlurEffect (Protected)
@property (nonatomic, readonly) id effectSettings;
@end

@interface BlurAmount : UIBlurEffect
@property (nonatomic, copy) NSNumber *blurAmount;
@end

@implementation BlurAmount

  NSNumber *localBlurAmount;

+ (instancetype)effectWithStyle:(UIBlurEffectStyle)style
{
    id result = [super effectWithStyle:style];
    object_setClass(result, self);

    return result;
}

- (id)effectSettings
{
    id settings = [super effectSettings];
    [settings setValue:localBlurAmount forKey:@"blurRadius"];
    return settings;
}

- (id)copyWithZone:(NSZone*)zone
{
    id result = [super copyWithZone:zone];
    object_setClass(result, [self class]);
    return result;
}

+ (id)updateBlurAmount:(NSNumber*)blurAmount
{
    localBlurAmount = blurAmount;
    return blurAmount;
}

@end
