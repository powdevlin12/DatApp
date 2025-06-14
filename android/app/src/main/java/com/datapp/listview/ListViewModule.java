package com.datapp.listview;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ListViewModule extends ReactContextBaseJavaModule {

    public ListViewModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }


    @NonNull
    @Override
    public String getName() {
        return "ListViewModule";
    }

    // Get Intent Listview
    @ReactMethod
    public void handleGetIntentListView() {
        Intent i = new Intent(getCurrentActivity(), ListViewActivity.class);
        getCurrentActivity().startActivity(i);
    }
}

