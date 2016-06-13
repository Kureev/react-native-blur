package com.cmcewen.blurview;

import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.fivehundredpx.android.blur.BlurringView;

public class BlurViewManager extends SimpleViewManager<BlurringView> {
    public static final String REACT_CLASS = "BlurView";

    public static final int defaultRadius = 10;
    public static final int defaultSampling = 10;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public BlurringView createViewInstance(ThemedReactContext context) {
        BlurringView blurringView = new BlurringView(context);
        blurringView.setBlurRadius(defaultRadius);
        blurringView.setDownsampleFactor(defaultSampling);
        return blurringView;
    }

    @ReactProp(name = "blurRadius", defaultInt = defaultRadius)
    public void setRadius(BlurringView view, int radius) {
        view.setBlurRadius(radius);
    }

    @ReactProp(name = "overlayColor", customType = "Color")
    public void setColor(BlurringView view, int color) {
        view.setOverlayColor(color);
    }

    @ReactProp(name = "downsampleFactor", defaultInt = defaultSampling)
    public void setDownsampleFactor(BlurringView view, int factor) {
        view.setDownsampleFactor(factor);
    }

    @ReactProp(name = "viewRef")
    public void setViewRef(BlurringView view, int viewRef) {
        ViewGroup viewGroup = (ViewGroup) view.getRootView().findViewById(viewRef);
        if (viewGroup != null) {
            View v = viewGroup.getChildAt(0);
            view.setBlurredView(v);
            view.invalidate();
        }
    }
}

