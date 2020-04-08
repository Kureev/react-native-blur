package com.cmcewen.blurview;

import android.support.annotation.NonNull;
import android.util.Log;
import android.graphics.drawable.Drawable;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Objects;

import javax.annotation.Nonnull;

import eightbitlab.com.blurview.BlurView;
import eightbitlab.com.blurview.RenderScriptBlur;


@SuppressWarnings("unused")
class BlurViewManager extends ViewGroupManager<BlurView> {
    private static final String REACT_CLASS = "BlurView";

    private static final int defaultRadius = 10;
    private static final int defaultSampling = 10;

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
        blurView.setupWith(rootView)
            .setFrameClearDrawable(windowBackground)
            .setBlurAlgorithm(new RenderScriptBlur(ctx))
            .setBlurRadius(defaultRadius)
            .setHasFixedTransformationMatrix(false);
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
    public void setDownsampleFactor(BlurringView view, int factor) {
        view.setDownsampleFactor(factor);
    }

    @ReactProp(name = "viewRef")
    public void setViewRef(final BlurringView view, final int viewRef) {
        if (context != null && context.getCurrentActivity() != null) {
            View viewToBlur = context.getCurrentActivity().findViewById(viewRef);
            if(viewToBlur != null) {
                view.setBlurredView(viewToBlur);
                return;
            }
            context.getCurrentActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    UIManagerModule uiManager = context.getNativeModule(UIManagerModule.class);
                    uiManager.addUIBlock(new UIBlock() {
                        @Override
                        public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                            View viewToBlur = nativeViewHierarchyManager.resolveView(viewRef);
                            if (viewToBlur != null) {
                                view.setBlurredView(viewToBlur);
                            }
                        }
                    });
                };
            });
        }
    }
}
