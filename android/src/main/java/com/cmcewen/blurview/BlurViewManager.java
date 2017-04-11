package com.cmcewen.blurview;

import android.view.View;

import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.fivehundredpx.android.blur.BlurringView;


class RNBlurringView extends BlurringView {
    public RNBlurringView(ThemedReactContext context) {
        super(context);
    }

    @Override
    public void setBlurredView(View blurredView) {
        super.setBlurredView(blurredView);
        mBlurredViewCopy = blurredView;
        checkForCircularReference();
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        checkForCircularReference();
    }

    private void checkForCircularReference() {
        // Need to wait until blurredView is set and the view is attached to window.
        if (mBlurredViewCopy == null || getParent() == null) return;

        Boolean circularReference = (mBlurredViewCopy.findViewById(getId()) != null);
        if (circularReference) {
            ThemedReactContext reactContext = (ThemedReactContext) getContext();
            reactContext.getJSModule(RCTDeviceEventEmitter.class)
                    .emit("ReactNativeBlurError",
                          "BlurView must not be a child of the view that is being blurred.");

            setBlurredView(null);
            invalidate();
            return;
        }
    }

    // TODO: Change this to protected in 500px-android-blur,
    // so we don't need our own copy.
    private View mBlurredViewCopy;
}



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
    public RNBlurringView createViewInstance(ThemedReactContext ctx) {
        context = ctx;

        RNBlurringView blurringView = new RNBlurringView(ctx);
        blurringView.setBlurRadius(defaultRadius);
        blurringView.setDownsampleFactor(defaultSampling);
        return blurringView;
    }

    @ReactProp(name = "blurRadius", defaultInt = defaultRadius)
    public void setRadius(RNBlurringView view, int radius) {
        view.setBlurRadius(radius);
    }

    @ReactProp(name = "overlayColor", customType = "Color")
    public void setColor(RNBlurringView view, int color) {
        view.setOverlayColor(color);
    }

    @ReactProp(name = "downsampleFactor", defaultInt = defaultSampling)
    public void setDownsampleFactor(RNBlurringView view, int factor) {
        view.setDownsampleFactor(factor);
    }

    @ReactProp(name = "viewRef")
    public void setViewRef(RNBlurringView view, int viewRef) {
        View viewToBlur = context.getCurrentActivity().findViewById(viewRef);

        if (viewToBlur != null) {
            view.setBlurredView(viewToBlur);
            view.invalidate();
        }
    }
}
