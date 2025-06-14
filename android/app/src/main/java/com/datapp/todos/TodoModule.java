package com.datapp.todos;

import android.content.SharedPreferences;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import org.json.JSONArray;
import org.json.JSONException;

@ReactModule(name = TodoModule.NAME)
public class TodoModule extends ReactContextBaseJavaModule {
    static final String NAME = "TodoModules";
    private static final String PREFS_NAME = "TodoPrefs";
    private static final String TODOS_KEY = "todos";

    public TodoModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    // Lấy danh sách todos
    @ReactMethod
    public void getTodos(Promise promise) {
        try {
            SharedPreferences prefs = getReactApplicationContext().getSharedPreferences(PREFS_NAME, 0);
            String todosJson = prefs.getString(TODOS_KEY, "[]");
            promise.resolve(todosJson);
        } catch (Exception e) {
            promise.reject("LOAD_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void saveTodo(String todo, Promise promise) {
        try {
            SharedPreferences prefs = getReactApplicationContext().getSharedPreferences(PREFS_NAME, 0);
            SharedPreferences.Editor editor = prefs.edit();

            // Lấy danh sách hiện tại
            String currentTodos = prefs.getString(TODOS_KEY, "[]");
            JSONArray todosArray = new JSONArray(currentTodos);

            // Thêm todo mới
            todosArray.put(todo);

            // Lưu lại
            editor.putString(TODOS_KEY, todosArray.toString());
            editor.apply();

            promise.resolve(true);
        } catch (JSONException e) {
            promise.reject("SAVE_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void deleteAllTodos(Promise promise) {
        try {
            SharedPreferences prefs = getReactApplicationContext().getSharedPreferences(PREFS_NAME, 0);
            SharedPreferences.Editor editor = prefs.edit();

            editor.clear();
            editor.apply();
            promise.resolve("Success");
        } catch (Exception e) {
            promise.reject("DELETE_ALL_ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void deleteTodo(String todos, Promise promise) {
        try {
            SharedPreferences prefs = getReactApplicationContext().getSharedPreferences(PREFS_NAME, 0);
            SharedPreferences.Editor editor = prefs.edit();

            editor.putString(TODOS_KEY, todos);
            editor.apply();
            promise.resolve("Success Delete Todo");
        } catch (Exception e) {
            promise.reject("DELETE_ERROR", e.getMessage());
        }
    }
}
