package com.datapp.learn;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class LearnModules extends ReactContextBaseJavaModule {
    LearnModules(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "LearnModule";
    }

    @ReactMethod
    public void startIntentLearnLinearLayout() {
        Intent i = new Intent(getCurrentActivity(), LinearLayoutLearn.class);
        getCurrentActivity().startActivity(i);
    }
}
