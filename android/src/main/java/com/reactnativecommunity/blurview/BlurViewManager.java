package com.reactnativecommunity.blurview;

import android.graphics.drawable.Drawable;
import android.os.Build;
import android.view.View;
import android.view.ViewGroup;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import eightbitlab.com.blurview.BlurView;
import eightbitlab.com.blurview.RenderEffectBlur;
import eightbitlab.com.blurview.RenderScriptBlur;

import java.util.Objects;
import javax.annotation.Nonnull;

@SuppressWarnings("unused")
class BlurViewManager extends ViewGroupManager<BlurView> {

  private static final String REACT_CLASS = "BlurView";

  private static final int defaultRadius = 10;
  private static final int defaultSampling = 10;

  @Override
  public @Nonnull String getName() {
    return REACT_CLASS;
  }

  @Override
  public @Nonnull BlurView createViewInstance(@Nonnull ThemedReactContext ctx) {
    BlurView blurView = new BlurView(ctx);
    View decorView = Objects
      .requireNonNull(ctx.getCurrentActivity())
      .getWindow()
      .getDecorView();
    ViewGroup rootView = decorView.findViewById(android.R.id.content);
    Drawable windowBackground = decorView.getBackground();
    if (Build.VERSION.SDK_INT >= 31) {
      blurView
        .setupWith(rootView, new RenderEffectBlur())
        .setFrameClearDrawable(windowBackground)
        .setBlurRadius(defaultRadius);
    } else {
      blurView
        .setupWith(rootView, new RenderScriptBlur(ctx))
        .setFrameClearDrawable(windowBackground)
        .setBlurRadius(defaultRadius);
    }
    return blurView;
  }

  @ReactProp(name = "blurRadius", defaultInt = defaultRadius)
  public void setRadius(BlurView view, int radius) {
    view.setBlurRadius(radius);
    view.invalidate();
  }

  @ReactProp(name = "overlayColor", customType = "Color")
  public void setColor(BlurView view, int color) {
    view.setOverlayColor(color);
    view.invalidate();
  }

  @ReactProp(name = "downsampleFactor", defaultInt = defaultSampling)
  public void setDownsampleFactor(BlurView view, int factor) {}

  @ReactProp(name = "autoUpdate", defaultBoolean = true)
  public void setAutoUpdate(BlurView view, boolean autoUpdate) {
    view.setBlurAutoUpdate(autoUpdate);
    view.invalidate();
  }

  @ReactProp(name = "enabled", defaultBoolean = true)
  public void setBlurEnabled(BlurView view, boolean enabled) {
    view.setBlurEnabled(enabled);
  }
}
