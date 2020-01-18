#import "BlurView.h"
#import "BlurEffectWithAmount.h"

@interface BlurView ()

@end

@implementation BlurView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.blurEffectView = [[UIVisualEffectView alloc] init];
        self.blurEffectView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        self.blurEffectView.frame = frame;

        self.blurAmount = @10;
        self.blurType = @"dark";
        [self updateBlurEffect];

        self.clipsToBounds = true;

        [self addSubview:self.blurEffectView];
    }

    return self;
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  self.blurEffectView.frame = self.bounds;
}

- (void)setBlurType:(NSString *)blurType
{
  if (blurType && ![self.blurType isEqual:blurType]) {
    _blurType = blurType;
    [self updateBlurEffect];
  }
}

- (void)setBlurAmount:(NSNumber *)blurAmount
{
  if (blurAmount && ![self.blurAmount isEqualToNumber:blurAmount]) {
    _blurAmount = blurAmount;
    [self updateBlurEffect];
  }
}


- (UIBlurEffectStyle)blurEffectStyle
{
  if ([self.blurType isEqual: @"xlight"]) return UIBlurEffectStyleExtraLight;
  if ([self.blurType isEqual: @"light"]) return UIBlurEffectStyleLight;
  if ([self.blurType isEqual: @"dark"]) return UIBlurEffectStyleDark;

  #if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 100000 /* __IPHONE_10_0 */
    if ([self.blurType isEqual: @"regular"]) return UIBlurEffectStyleRegular;
    if ([self.blurType isEqual: @"prominent"]) return UIBlurEffectStyleProminent;
  #endif
    
  #if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 130000 /* __IPHONE_13_0 */
    // Adaptable blur styles
    if ([self.blurType isEqual: @"chromeMaterial"]) return UIBlurEffectStyleSystemChromeMaterial;
    if ([self.blurType isEqual: @"material"]) return UIBlurEffectStyleSystemMaterial;
    if ([self.blurType isEqual: @"thickMaterial"]) return UIBlurEffectStyleSystemThickMaterial;
    if ([self.blurType isEqual: @"thinMaterial"]) return UIBlurEffectStyleSystemThinMaterial;
    if ([self.blurType isEqual: @"ultraThinMaterial"]) return UIBlurEffectStyleSystemUltraThinMaterial;
    // dark blur styles
    if ([self.blurType isEqual: @"chromeMaterialDark"]) return UIBlurEffectStyleSystemChromeMaterialDark;
    if ([self.blurType isEqual: @"materialDark"]) return UIBlurEffectStyleSystemMaterialDark;
    if ([self.blurType isEqual: @"thickMaterialDark"]) return UIBlurEffectStyleSystemThickMaterialDark;
    if ([self.blurType isEqual: @"thinMaterialDark"]) return UIBlurEffectStyleSystemThinMaterialDark;
    if ([self.blurType isEqual: @"ultraThinMaterialDark"]) return UIBlurEffectStyleSystemUltraThinMaterialDark;
    // light blur styles
    if ([self.blurType isEqual: @"chromeMaterialLight"]) return UIBlurEffectStyleSystemChromeMaterialLight;
    if ([self.blurType isEqual: @"materialLight"]) return UIBlurEffectStyleSystemMaterialLight;
    if ([self.blurType isEqual: @"thickMaterialLight"]) return UIBlurEffectStyleSystemThickMaterialLight;
    if ([self.blurType isEqual: @"thinMaterialLight"]) return UIBlurEffectStyleSystemThinMaterialLight;
    if ([self.blurType isEqual: @"ultraThinMaterialLight"]) return UIBlurEffectStyleSystemUltraThinMaterialLight;
  #endif
    
  #if TARGET_OS_TV
    if ([self.blurType isEqual: @"regular"]) return UIBlurEffectStyleRegular;
    if ([self.blurType isEqual: @"prominent"]) return UIBlurEffectStyleProminent;
    if ([self.blurType isEqual: @"extraDark"]) return UIBlurEffectStyleExtraDark;
  #endif

  return UIBlurEffectStyleDark;
}

- (void)updateBlurEffect
{
  UIBlurEffectStyle style = [self blurEffectStyle];
  self.blurEffect = [BlurEffectWithAmount effectWithStyle:style andBlurAmount:self.blurAmount];
  self.blurEffectView.effect = self.blurEffect;
}

@end
