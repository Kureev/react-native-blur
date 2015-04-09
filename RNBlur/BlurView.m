#import "BlurView.h"

@implementation BlurView

-(id)init
{
    self = [super init];
    if (self) {
        
        // Blur effect
        UIBlurEffect *blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
        self.visualEffectView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];
    }
    return self;
}

-(void)layoutSubviews
{
    [super layoutSubviews];
    if ([self.subviews containsObject:self.visualEffectView] == NO) {
        self.visualEffectView.frame = self.bounds;
        [self insertSubview:self.visualEffectView atIndex:0];
    }
    
}

@end
