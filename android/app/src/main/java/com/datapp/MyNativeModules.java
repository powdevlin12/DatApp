package com.datapp;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MyNativeModules extends ReactContextBaseJavaModule {
    public MyNativeModules(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "LoginModule";
    }

    @ReactMethod
    public void showLoginScreen() {
        Intent i = new Intent(getCurrentActivity(), LoginActivity.class);
        getCurrentActivity().startActivity(i);
    }
}
