package com.reactnativecommunity.blurview;

import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewManager;

import java.util.Objects;

class BlurViewManager extends ReactViewManager {

    public static final String REACT_CLASS = "BlurView";
    public static final int defaultRadius = 10;
    public static final int defaultAmount = 10;

    ReactApplicationContext mCallerContext;

    public BlurViewManager(ReactApplicationContext reactContext) {
        super();
        mCallerContext = reactContext;
    }

    @Override
    @NonNull
    public ReactBlurView createViewInstance(ThemedReactContext ctx) {
        ReactBlurView blurView = new ReactBlurView(ctx);
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

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactProp(name = "blurAmount", defaultFloat = defaultAmount)
    public void setBlurAmount(ReactBlurView view, float amount) {
        view.setBlurRadius(Math.max(3, Math.min(25, (float)Math.ceil(amount * 0.8f))));
        view.invalidate();
    }

    @ReactProp(name = "blurType")
    public void setBlurType(ReactBlurView view, String type) {
        view.setBlurType(type);
        view.invalidate();
    }

    @ReactProp(name = "autoUpdate", defaultBoolean = true)
    public void setAutoUpdate(ReactBlurView view, boolean autoUpdate) {
        view.setBlurAutoUpdate(autoUpdate);
        view.invalidate();
    }

    @ReactProp(name = "enabled", defaultBoolean = true)
    public void setBlurEnabled(ReactBlurView view, boolean enabled) {
        view.setBlurEnabled(enabled);
    }
}
