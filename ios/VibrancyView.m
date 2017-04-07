#import <UIKit/UIKit.h>
#import "VibrancyView.h"
#import "BlurView.h"
#import <React/RCTComponent.h>

@interface VibrancyView ()

@property (nonatomic, strong) UIVisualEffectView *visualEffectView;
@property (nonatomic, strong) UIVisualEffectView *vibrancyView;

@end

@implementation VibrancyView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        UIBlurEffect *blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
        self.visualEffectView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];

        UIVibrancyEffect *vibrancyEffect = [UIVibrancyEffect effectForBlurEffect:blurEffect];
        self.vibrancyView = [[UIVisualEffectView alloc] initWithEffect:vibrancyEffect];

        self.visualEffectView.frame = frame;
        self.vibrancyView.frame = frame;

        [self addSubview:self.visualEffectView];
        [self.visualEffectView.contentView addSubview:self.vibrancyView];
    }

    return self;
}

-(void)layoutSubviews
{
    [super layoutSubviews];

    self.visualEffectView.frame = self.bounds;
    self.vibrancyView.frame = self.bounds;
}

- (void)setBlurType:(NSString *)blurType {
    UIBlurEffect *blurEffect;

    self.clipsToBounds = true;
    if ([blurType isEqual: @"xlight"]) {
        blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleExtraLight];
    } else if ([blurType isEqual: @"light"]) {
        blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
    } else if ([blurType isEqual: @"dark"]) {
        blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
    } else {
        blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleDark];
    }
    self.visualEffectView.effect = blurEffect;
}

- (void)insertReactSubview:(id<RCTComponent>)subview atIndex:(NSInteger)atIndex {
    [self.vibrancyView.contentView addSubview:(UIView*)subview];
}

@end
