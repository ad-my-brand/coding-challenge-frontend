// Generated by data binding compiler. Do not edit!
package com.android.androidcoroutinedemokotlin.databinding;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.databinding.DataBindingUtil;
import androidx.databinding.ViewDataBinding;
import com.android.androidcoroutinedemokotlin.R;
import java.lang.Deprecated;
import java.lang.Object;

public abstract class RecyclerListRowBinding extends ViewDataBinding {
  @NonNull
  public final ImageView imageThumb;

  @NonNull
  public final LinearLayout itemRoot;

  @NonNull
  public final TextView tvDesc;

  @NonNull
  public final TextView tvTitle;

  protected RecyclerListRowBinding(Object _bindingComponent, View _root, int _localFieldCount,
      ImageView imageThumb, LinearLayout itemRoot, TextView tvDesc, TextView tvTitle) {
    super(_bindingComponent, _root, _localFieldCount);
    this.imageThumb = imageThumb;
    this.itemRoot = itemRoot;
    this.tvDesc = tvDesc;
    this.tvTitle = tvTitle;
  }

  @NonNull
  public static RecyclerListRowBinding inflate(@NonNull LayoutInflater inflater,
      @Nullable ViewGroup root, boolean attachToRoot) {
    return inflate(inflater, root, attachToRoot, DataBindingUtil.getDefaultComponent());
  }

  /**
   * This method receives DataBindingComponent instance as type Object instead of
   * type DataBindingComponent to avoid causing too many compilation errors if
   * compilation fails for another reason.
   * https://issuetracker.google.com/issues/116541301
   * @Deprecated Use DataBindingUtil.inflate(inflater, R.layout.recycler_list_row, root, attachToRoot, component)
   */
  @NonNull
  @Deprecated
  public static RecyclerListRowBinding inflate(@NonNull LayoutInflater inflater,
      @Nullable ViewGroup root, boolean attachToRoot, @Nullable Object component) {
    return ViewDataBinding.<RecyclerListRowBinding>inflateInternal(inflater, R.layout.recycler_list_row, root, attachToRoot, component);
  }

  @NonNull
  public static RecyclerListRowBinding inflate(@NonNull LayoutInflater inflater) {
    return inflate(inflater, DataBindingUtil.getDefaultComponent());
  }

  /**
   * This method receives DataBindingComponent instance as type Object instead of
   * type DataBindingComponent to avoid causing too many compilation errors if
   * compilation fails for another reason.
   * https://issuetracker.google.com/issues/116541301
   * @Deprecated Use DataBindingUtil.inflate(inflater, R.layout.recycler_list_row, null, false, component)
   */
  @NonNull
  @Deprecated
  public static RecyclerListRowBinding inflate(@NonNull LayoutInflater inflater,
      @Nullable Object component) {
    return ViewDataBinding.<RecyclerListRowBinding>inflateInternal(inflater, R.layout.recycler_list_row, null, false, component);
  }

  public static RecyclerListRowBinding bind(@NonNull View view) {
    return bind(view, DataBindingUtil.getDefaultComponent());
  }

  /**
   * This method receives DataBindingComponent instance as type Object instead of
   * type DataBindingComponent to avoid causing too many compilation errors if
   * compilation fails for another reason.
   * https://issuetracker.google.com/issues/116541301
   * @Deprecated Use DataBindingUtil.bind(view, component)
   */
  @Deprecated
  public static RecyclerListRowBinding bind(@NonNull View view, @Nullable Object component) {
    return (RecyclerListRowBinding)bind(component, view, R.layout.recycler_list_row);
  }
}
