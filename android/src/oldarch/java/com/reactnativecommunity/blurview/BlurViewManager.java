package com.reactnativecommunity.blurview;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import eightbitlab.com.blurview.BlurView;

class BlurViewManager extends ViewGroupManager<BlurView> {

  ReactApplicationContext mCallerContext;

  public BlurViewManager(ReactApplicationContext reactContext) {
    mCallerContext = reactContext;
  }

  @Override
  public BlurView createViewInstance(ThemedReactContext context) {
    return BlurViewManagerImpl.createViewInstance(context);
  }

  @NonNull
  @Override
  public String getName() {
    return BlurViewManagerImpl.REACT_CLASS;
  }

  @ReactProp(name = "blurRadius", defaultInt = BlurViewManagerImpl.defaultRadius)
  public void setRadius(BlurView view, int radius) {
    BlurViewManagerImpl.setRadius(view, radius);
  }

  @ReactProp(name = "overlayColor", customType = "Color")
  public void setColor(BlurView view, int color) {
    BlurViewManagerImpl.setColor(view, color);
  }

  @ReactProp(name = "downsampleFactor", defaultInt = BlurViewManagerImpl.defaultSampling)
  public void setDownsampleFactor(BlurView view, int factor) {}

  @ReactProp(name = "autoUpdate", defaultBoolean = true)
  public void setAutoUpdate(BlurView view, boolean autoUpdate) {
    BlurViewManagerImpl.setAutoUpdate(view, autoUpdate);
  }

  @ReactProp(name = "enabled", defaultBoolean = true)
  public void setBlurEnabled(BlurView view, boolean enabled) {
    BlurViewManagerImpl.setBlurEnabled(view, enabled);
  }
}
