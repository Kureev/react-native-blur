package com.reactnativecommunity.blurview;

import android.graphics.drawable.Drawable;
import android.os.Build;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.util.ReactFindViewUtil;

import eightbitlab.com.blurview.BlurView;
import eightbitlab.com.blurview.RenderEffectBlur;
import eightbitlab.com.blurview.RenderScriptBlur;

import java.util.Objects;
import javax.annotation.Nonnull;

@SuppressWarnings("unused")
class BlurViewManagerImpl {

  public static final String REACT_CLASS = "AndroidBlurView";

  public static final int defaultRadius = 10;
  public static final int defaultSampling = 10;

  public static @Nonnull BlurView createViewInstance(@Nonnull ThemedReactContext ctx) {
    BlurView blurView = new CustomBlurView(ctx);
    View decorView = Objects
      .requireNonNull(ctx.getCurrentActivity())
      .getWindow()
      .getDecorView();
    ViewGroup rootView = decorView.findViewById(android.R.id.content);
    View bannerImageView = ReactFindViewUtil.findView(rootView, "banner-image");
    View bannerImageView2 = ReactFindViewUtil.findView(decorView, "banner-image");
    Log.d("BLUR", "BANNER VIEW: " + String.valueOf(bannerImageView));
    Log.d("BLUR", "BANNER VIEW2: " + String.valueOf(bannerImageView2));
    Log.d("BLUR", "ROOT VIEW: " + String.valueOf(rootView));
    Log.d("BLUR", "DECOR VIEW: " + String.valueOf(decorView));
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
