package com.android.androidcoroutinedemokotlin;

import android.util.SparseArray;
import android.util.SparseIntArray;
import android.view.View;
import androidx.databinding.DataBinderMapper;
import androidx.databinding.DataBindingComponent;
import androidx.databinding.ViewDataBinding;
import com.android.androidcoroutinedemokotlin.databinding.FragmentIssuesBindingImpl;
import com.android.androidcoroutinedemokotlin.databinding.FragmentRecyclerListBindingImpl;
import com.android.androidcoroutinedemokotlin.databinding.FragmentRepoBindingImpl;
import com.android.androidcoroutinedemokotlin.databinding.RecyclerListRowBindingImpl;
import com.android.androidcoroutinedemokotlin.databinding.RepoRowBindingImpl;
import java.lang.IllegalArgumentException;
import java.lang.Integer;
import java.lang.Object;
import java.lang.Override;
import java.lang.RuntimeException;
import java.lang.String;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class DataBinderMapperImpl extends DataBinderMapper {
  private static final int LAYOUT_FRAGMENTISSUES = 1;

  private static final int LAYOUT_FRAGMENTRECYCLERLIST = 2;

  private static final int LAYOUT_FRAGMENTREPO = 3;

  private static final int LAYOUT_RECYCLERLISTROW = 4;

  private static final int LAYOUT_REPOROW = 5;

  private static final SparseIntArray INTERNAL_LAYOUT_ID_LOOKUP = new SparseIntArray(5);

  static {
    INTERNAL_LAYOUT_ID_LOOKUP.put(com.android.androidcoroutinedemokotlin.R.layout.fragment_issues, LAYOUT_FRAGMENTISSUES);
    INTERNAL_LAYOUT_ID_LOOKUP.put(com.android.androidcoroutinedemokotlin.R.layout.fragment_recycler_list, LAYOUT_FRAGMENTRECYCLERLIST);
    INTERNAL_LAYOUT_ID_LOOKUP.put(com.android.androidcoroutinedemokotlin.R.layout.fragment_repo, LAYOUT_FRAGMENTREPO);
    INTERNAL_LAYOUT_ID_LOOKUP.put(com.android.androidcoroutinedemokotlin.R.layout.recycler_list_row, LAYOUT_RECYCLERLISTROW);
    INTERNAL_LAYOUT_ID_LOOKUP.put(com.android.androidcoroutinedemokotlin.R.layout.repo_row, LAYOUT_REPOROW);
  }

  @Override
  public ViewDataBinding getDataBinder(DataBindingComponent component, View view, int layoutId) {
    int localizedLayoutId = INTERNAL_LAYOUT_ID_LOOKUP.get(layoutId);
    if(localizedLayoutId > 0) {
      final Object tag = view.getTag();
      if(tag == null) {
        throw new RuntimeException("view must have a tag");
      }
      switch(localizedLayoutId) {
        case  LAYOUT_FRAGMENTISSUES: {
          if ("layout/fragment_issues_0".equals(tag)) {
            return new FragmentIssuesBindingImpl(component, view);
          }
          throw new IllegalArgumentException("The tag for fragment_issues is invalid. Received: " + tag);
        }
        case  LAYOUT_FRAGMENTRECYCLERLIST: {
          if ("layout/fragment_recycler_list_0".equals(tag)) {
            return new FragmentRecyclerListBindingImpl(component, view);
          }
          throw new IllegalArgumentException("The tag for fragment_recycler_list is invalid. Received: " + tag);
        }
        case  LAYOUT_FRAGMENTREPO: {
          if ("layout/fragment_repo_0".equals(tag)) {
            return new FragmentRepoBindingImpl(component, view);
          }
          throw new IllegalArgumentException("The tag for fragment_repo is invalid. Received: " + tag);
        }
        case  LAYOUT_RECYCLERLISTROW: {
          if ("layout/recycler_list_row_0".equals(tag)) {
            return new RecyclerListRowBindingImpl(component, view);
          }
          throw new IllegalArgumentException("The tag for recycler_list_row is invalid. Received: " + tag);
        }
        case  LAYOUT_REPOROW: {
          if ("layout/repo_row_0".equals(tag)) {
            return new RepoRowBindingImpl(component, view);
          }
          throw new IllegalArgumentException("The tag for repo_row is invalid. Received: " + tag);
        }
      }
    }
    return null;
  }

  @Override
  public ViewDataBinding getDataBinder(DataBindingComponent component, View[] views, int layoutId) {
    if(views == null || views.length == 0) {
      return null;
    }
    int localizedLayoutId = INTERNAL_LAYOUT_ID_LOOKUP.get(layoutId);
    if(localizedLayoutId > 0) {
      final Object tag = views[0].getTag();
      if(tag == null) {
        throw new RuntimeException("view must have a tag");
      }
      switch(localizedLayoutId) {
      }
    }
    return null;
  }

  @Override
  public int getLayoutId(String tag) {
    if (tag == null) {
      return 0;
    }
    Integer tmpVal = InnerLayoutIdLookup.sKeys.get(tag);
    return tmpVal == null ? 0 : tmpVal;
  }

  @Override
  public String convertBrIdToString(int localId) {
    String tmpVal = InnerBrLookup.sKeys.get(localId);
    return tmpVal;
  }

  @Override
  public List<DataBinderMapper> collectDependencies() {
    ArrayList<DataBinderMapper> result = new ArrayList<DataBinderMapper>(1);
    result.add(new androidx.databinding.library.baseAdapters.DataBinderMapperImpl());
    return result;
  }

  private static class InnerBrLookup {
    static final SparseArray<String> sKeys = new SparseArray<String>(1);

    static {
      sKeys.put(0, "_all");
    }
  }

  private static class InnerLayoutIdLookup {
    static final HashMap<String, Integer> sKeys = new HashMap<String, Integer>(5);

    static {
      sKeys.put("layout/fragment_issues_0", com.android.androidcoroutinedemokotlin.R.layout.fragment_issues);
      sKeys.put("layout/fragment_recycler_list_0", com.android.androidcoroutinedemokotlin.R.layout.fragment_recycler_list);
      sKeys.put("layout/fragment_repo_0", com.android.androidcoroutinedemokotlin.R.layout.fragment_repo);
      sKeys.put("layout/recycler_list_row_0", com.android.androidcoroutinedemokotlin.R.layout.recycler_list_row);
      sKeys.put("layout/repo_row_0", com.android.androidcoroutinedemokotlin.R.layout.repo_row);
    }
  }
}
