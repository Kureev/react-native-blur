#import "BlurAmount.h"
#import <objc/runtime.h>

@implementation UIBlurEffect (RNBlur)

NSNumber *localBlurAmount;

+ (id)invokeOriginalMethod:(id)target selector:(SEL)selector {
    // Get the class method list
    uint count;
    Method *list = class_copyMethodList([target class], &count);
    
    // Find and call original method .
    for ( int i = count - 1 ; i >= 0; i--) {
        Method method = list[i];
        SEL name = method_getName(method);
        IMP imp = method_getImplementation(method);
        if (name == selector) {
            return ((id (*)(id, SEL))imp)(target, name);
            break;
        }
    }
    free(list);
    return nil;
}

- (id)effectSettings
{
    id settings = [UIBlurEffect invokeOriginalMethod:self selector:@selector(effectSettings)];
    if (settings) {
        [settings setValue:localBlurAmount ? localBlurAmount: [NSNumber numberWithInteger:4]  forKey:@"blurRadius"];
    }
    return settings;
}

- (id)updateBlurAmount:(NSNumber*)blurAmount
{
    localBlurAmount = blurAmount;
    return blurAmount;
}

- (void)setBlurAmount:(NSNumber*)blurAmount
{
    [self updateBlurAmount:blurAmount];
}

- (NSNumber *)blurAmount
{
    return localBlurAmount;
}

@end
