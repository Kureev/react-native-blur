#import <UIKit/UIKit.h>

@interface BlurAmount : UIBlurEffect

@property (nonatomic, copy) NSNumber *blurAmount;

+ (id)updateBlurAmount:(NSNumber*)blurAmount;

@end
