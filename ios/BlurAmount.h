#import <UIKit/UIKit.h>

@interface BlurAmount : UIBlurEffect
+ (id)updateBlurAmount:(NSNumber*)blurAmount;

@property (nonatomic, copy) NSNumber *blurAmount;
@end
