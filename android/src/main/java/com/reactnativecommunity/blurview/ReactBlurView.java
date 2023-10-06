package com.reactnativecommunity.blurview;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.os.Build;
import android.util.Log;
import android.view.ViewGroup;
import android.view.ViewOutlineProvider;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.views.view.ReactViewGroup;

import eightbitlab.com.blurview.BlurAlgorithm;
import eightbitlab.com.blurview.BlurController;
import eightbitlab.com.blurview.BlurViewFacade;
import eightbitlab.com.blurview.NoOpController;
import eightbitlab.com.blurview.PreDrawBlurController;
import eightbitlab.com.blurview.RenderEffectBlur;
import eightbitlab.com.blurview.RenderScriptBlur;

/**
 * ReactViewGroup that blurs its underlying content.
 * Can have children and draw them over blurred background.
 */
public class ReactBlurView extends ReactViewGroup {

    private static final String TAG = ReactBlurView.class.getSimpleName();
    private String blurType;

    private final Paint overlayPaint;

    BlurController blurController = new NoOpController();

    public ReactBlurView(Context context) {
        super(context);
        setOutlineProvider(ViewOutlineProvider.BACKGROUND);
        setClipToOutline(true);
        overlayPaint = new Paint();
        setBlurType("dark");
    }

    @Override
    public void draw(Canvas canvas) {
        boolean shouldDraw = blurController.draw(canvas);
        if (shouldDraw) {
            if (overlayPaint.getColor() != Color.TRANSPARENT) {
                canvas.drawPaint(overlayPaint);
            }
            super.draw(canvas);
        }
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        blurController.updateBlurViewSize();
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        blurController.setBlurAutoUpdate(false);
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        if (!isHardwareAccelerated()) {
            Log.e(TAG, "BlurView can't be used in not hardware-accelerated window!");
        } else {
            blurController.setBlurAutoUpdate(true);
        }
    }

    public BlurViewFacade setupWith(@NonNull ViewGroup rootView, BlurAlgorithm algorithm) {
        this.blurController.destroy();
        BlurController blurController = new PreDrawBlurController(this, rootView, getOverlayColor(), algorithm);
        this.blurController = blurController;
        return blurController;
    }

    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR1)
    public BlurViewFacade setupWith(@NonNull ViewGroup rootView) {
        return setupWith(rootView, getBlurAlgorithm());
    }

    public BlurViewFacade setBlurRadius(float radius) {
        return blurController.setBlurRadius(radius);
    }

    public BlurViewFacade setBlurType(String type) {
        blurType = type;
        overlayPaint.setXfermode(getXfermode());
        overlayPaint.setColor(getOverlayColor());
        return blurController;
    }

    public BlurViewFacade setBlurAutoUpdate(boolean enabled) {
        return blurController.setBlurAutoUpdate(enabled);
    }

    public BlurViewFacade setBlurEnabled(boolean enabled) {
        return blurController.setBlurEnabled(enabled);
    }

    @Override
    public void setBackgroundColor(int color) {
        blurController.setOverlayColor(color);
    }

    @NonNull
    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR1)
    private BlurAlgorithm getBlurAlgorithm() {
        BlurAlgorithm algorithm;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            algorithm = new RenderEffectBlur();
        } else {
            algorithm = new RenderScriptBlur(getContext());
        }
        return algorithm;
    }

    private int getOverlayColor() {
        switch (blurType) {
            case "xlight":
                return 0xFFBEBEBE;
            case "light":
                return 0xFFD2D2D2;
            default:
                return 0xFFAAAAAA;
        }
    }

    private PorterDuffXfermode getXfermode() {
        switch (blurType) {
            case "xlight":
                return new PorterDuffXfermode(PorterDuff.Mode.SCREEN);
            case "light":
                return new PorterDuffXfermode(PorterDuff.Mode.OVERLAY);
            default:
                return new PorterDuffXfermode(PorterDuff.Mode.MULTIPLY);
        }
    }
}
