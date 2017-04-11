#import <UIKit/UIKit.h>
#import "BlurView.h"
#import "BlurAmount.h"

@interface BlurView ()

@property (nonatomic, strong) UIVisualEffectView *visualEffectView;
@property (nonatomic, strong) UIBlurEffect *blurEffect;

@end

@implementation BlurView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
        self.visualEffectView = [[UIVisualEffectView alloc] initWithEffect:self.blurEffect];
        self.visualEffectView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        self.visualEffectView.frame = frame;

        self.clipsToBounds = true;

        [self addSubview:self.visualEffectView];
    }

    return self;
}

- (void)setBlurType:(NSString *)blurType
{
    if ([blurType isEqual: @"xlight"]) {
        self.blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleExtraLight];
    } else if ([blurType isEqual: @"light"]) {
        self.blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
    } else if ([blurType isEqual: @"dark"]) {
        self.blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
    } else {
        self.blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
    }
    self.visualEffectView.effect = self.blurEffect;
}

- (void)setBlurAmount:(NSNumber *)blurAmount
{
    [BlurAmount updateBlurAmount:blurAmount];
}

@end
