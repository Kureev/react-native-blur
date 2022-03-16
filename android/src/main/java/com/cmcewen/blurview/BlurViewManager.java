package com.cmcewen.blurview;

import android.graphics.drawable.Drawable;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Objects;

import javax.annotation.Nonnull;

import eightbitlab.com.blurview.BlurView;
import eightbitlab.com.blurview.RenderScriptBlur;
import eightbitlab.com.blurview.BlurViewFacade;


@SuppressWarnings("unused")
class BlurViewManager extends ViewGroupManager<BlurView> {
    private static final String REACT_CLASS = "BlurView";

    private static final int defaultRadius = 10;
    private static final int defaultSampling = 10;
    private static final boolean defaultIsStatic = false;

    private BlurViewFacade blurViewFacade;

    @Override
    public @Nonnull String getName() {
        return REACT_CLASS;
    }

    @Override
    public @Nonnull BlurView createViewInstance(@Nonnull ThemedReactContext ctx) {
        BlurView blurView = new BlurView(ctx);
        View decorView = Objects.requireNonNull(ctx.getCurrentActivity()).getWindow().getDecorView();
        ViewGroup rootView = decorView.findViewById(android.R.id.content);
        Drawable windowBackground = decorView.getBackground();
        blurViewFacade = blurView.setupWith(rootView)
            .setFrameClearDrawable(windowBackground)
            .setBlurAlgorithm(new RenderScriptBlur(ctx))
            .setBlurRadius(defaultRadius)
            .setHasFixedTransformationMatrix(defaultIsStatic);

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
    public void setDownsampleFactor(BlurView view, int factor) {

    }

    @ReactProp(name = "static", defaultBoolean = defaultIsStatic)
    public void setStatic(BlurView view, boolean isStatic) {
        blurViewFacade.setHasFixedTransformationMatrix(isStatic);
    }

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
