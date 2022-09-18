package com.reactnativecommunity.blurview;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.AndroidBlurViewManagerDelegate;
import com.facebook.react.viewmanagers.AndroidBlurViewManagerInterface;

import eightbitlab.com.blurview.BlurView;

@ReactModule(name = BlurViewManagerImpl.REACT_CLASS)
class BlurViewManager extends ViewGroupManager<BlurView>
    implements AndroidBlurViewManagerInterface<BlurView> {

  private final ViewManagerDelegate<BlurView> mDelegate;

  public BlurViewManager(ReactApplicationContext context) {
    mDelegate = new AndroidBlurViewManagerDelegate<>(this);
  }

  @Nullable
  @Override
  protected ViewManagerDelegate<BlurView> getDelegate() {
    return mDelegate;
  }

  @NonNull
  @Override
  public String getName() {
    return BlurViewManagerImpl.REACT_CLASS;
  }

  @NonNull
  @Override
  protected BlurView createViewInstance(@NonNull ThemedReactContext context) {
    return BlurViewManagerImpl.createViewInstance(context);
  }

  @Override
  @ReactProp(name = "blurRadius", defaultInt = BlurViewManagerImpl.defaultRadius)
  public void setBlurRadius(BlurView view, int radius) {
    BlurViewManagerImpl.setRadius(view, radius);
  }

  @Override
  @ReactProp(name = "overlayColor", customType = "Color")
  public void setOverlayColor(BlurView view, Integer color) {
    BlurViewManagerImpl.setColor(view, color);
  }

  @Override
  @ReactProp(name = "downsampleFactor", defaultInt = BlurViewManagerImpl.defaultSampling)
  public void setDownsampleFactor(BlurView view, int factor) {}

  @Override
  @ReactProp(name = "autoUpdate", defaultBoolean = true)
  public void setAutoUpdate(BlurView view, boolean autoUpdate) {
    BlurViewManagerImpl.setAutoUpdate(view, autoUpdate);
  }

  @Override
  @ReactProp(name = "enabled", defaultBoolean = true)
  public void setEnabled(BlurView view, boolean enabled) {
    BlurViewManagerImpl.setBlurEnabled(view, enabled);
  }

  @Override
  public void setBlurAmount(BlurView view, int value) {}

  @Override
  public void setBlurType(BlurView view, @Nullable String value) {}
}
