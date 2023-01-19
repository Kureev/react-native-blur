package com.reactnativecommunity.blurview;

import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.util.ReactFindViewUtil;

import java.util.Objects;

import eightbitlab.com.blurview.BlurView;
import eightbitlab.com.blurview.RenderEffectBlur;
import eightbitlab.com.blurview.RenderScriptBlur;

public class CustomBlurView extends BlurView {
  public CustomBlurView(Context context) {
    super(context);
  }

  public CustomBlurView(Context context, AttributeSet attrs) {
    super(context, attrs);
  }

  public CustomBlurView(Context context, AttributeSet attrs, int defStyleAttr) {
    super(context, attrs, defStyleAttr);
  }

  @Override
  protected void onAttachedToWindow() {
    super.onAttachedToWindow();
    Log.d("BLUR", "ATTATCH TO WINDOW");
    View decorView = Objects
      .requireNonNull(((ThemedReactContext)getContext()).getCurrentActivity())
      .getWindow()
      .getDecorView();
    ViewGroup rootView = decorView.findViewById(android.R.id.content);
    View bannerImageView = ReactFindViewUtil.findView(rootView, "banner-image");
    View bannerImageView2 = ReactFindViewUtil.findView(decorView, "banner-image");
    Log.d("BLUR", "[WINDOW] BANNER VIEW: " + String.valueOf(bannerImageView));
    Log.d("BLUR", "[WINDOW] BANNER VIEW2: " + String.valueOf(bannerImageView2));
    if (bannerImageView == null) {
      return;
    }

    if (Build.VERSION.SDK_INT >= 31) {
      this
        .setupWith((ViewGroup) bannerImageView, new RenderEffectBlur())
        .setFrameClearDrawable(bannerImageView.getBackground())
        .setOverlayColor(0)
        .setBlurRadius(10);
    } else {
      this
        .setupWith((ViewGroup) bannerImageView, new RenderScriptBlur(getContext()))
        .setFrameClearDrawable(bannerImageView.getBackground())
        .setOverlayColor(0)
        .setBlurRadius(10);
    }
  }
}
