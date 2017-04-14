#import <UIKit/UIKit.h>

@interface UIBlurEffect (RNBlur)

@property (nonatomic, copy) NSNumber *blurAmount;

- (id)updateBlurAmount:(NSNumber*)blurAmount;

@end
