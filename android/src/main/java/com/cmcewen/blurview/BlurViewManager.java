package com.cmcewen.blurview;

import android.view.View;

import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;


public class BlurViewManager extends SimpleViewManager<BlurringView> {
    public static final String REACT_CLASS = "BlurView";

    public static final int defaultRadius = 10;
    public static final int defaultSampling = 10;

    private static ThemedReactContext context;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public BlurringView createViewInstance(ThemedReactContext ctx) {
        context = ctx;

        BlurringView blurringView = new BlurringView(ctx);
        blurringView.setBlurRadius(defaultRadius);
        blurringView.setDownsampleFactor(defaultSampling);
        return blurringView;
    }

    @ReactProp(name = "blurRadius", defaultInt = defaultRadius)
    public void setRadius(BlurringView view, int radius) {
        view.setBlurRadius(radius);
        view.invalidate();
    }

    @ReactProp(name = "overlayColor", customType = "Color")
    public void setColor(BlurringView view, int color) {
        view.setOverlayColor(color);
        view.invalidate();
    }

    @ReactProp(name = "downsampleFactor", defaultInt = defaultSampling)
    public void setDownsampleFactor(BlurringView view, int factor) {
        view.setDownsampleFactor(factor);
    }

    @ReactProp(name = "viewRef")
    public void setViewRef(BlurringView view, int viewRef) {
        if (context != null && context.getCurrentActivity() != null) {
          View viewToBlur = context.getCurrentActivity().findViewById(viewRef);

          if (viewToBlur != null) {
              view.setBlurredView(viewToBlur);
          }
        }
    }
}
