package com.reactnativecommunity.blurview;

import android.view.View;
import com.facebook.react.uimanager.ThemedReactContext;

import eightbitlab.com.blurview.BlurView;

import java.util.Objects;
import javax.annotation.Nonnull;

@SuppressWarnings("unused")
class BlurViewManagerImpl {

  public static final String REACT_CLASS = "AndroidBlurView";

  public static final int defaultRadius = 10;
  public static final int defaultSampling = 10;

  public static @Nonnull BlurView createViewInstance(@Nonnull ThemedReactContext ctx) {
    BlurView blurView = new BlurView(ctx);
    View decorView = Objects
      .requireNonNull(ctx.getCurrentActivity())
      .getWindow()
      .getDecorView();
    blurView
      .setupWith(decorView.findViewById(android.R.id.content))
      .setFrameClearDrawable(decorView.getBackground())
      .setBlurRadius(defaultRadius);
    return blurView;
  }

  public static void setRadius(BlurView view, int radius) {
    view.setBlurRadius(radius);
    view.invalidate();
  }

  public static void setColor(BlurView view, int color) {
    view.setOverlayColor(color);
    view.invalidate();
  }

  public static void setDownsampleFactor(BlurView view, int factor) {}

  public static void setAutoUpdate(BlurView view, boolean autoUpdate) {
    view.setBlurAutoUpdate(autoUpdate);
    view.invalidate();
  }

  public static void setBlurEnabled(BlurView view, boolean enabled) {
    view.setBlurEnabled(enabled);
  }
}
