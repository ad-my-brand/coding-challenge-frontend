package com.sarveshhon.gitapi;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.lifecycle.Lifecycle;
import androidx.viewpager2.adapter.FragmentStateAdapter;

import com.sarveshhon.gitapi.overview.OverviewFragment;
import com.sarveshhon.gitapi.repository.RepositoryFragment;

public class ViewPagerFragmentAdapter extends FragmentStateAdapter {
    public ViewPagerFragmentAdapter(@NonNull FragmentManager fragmentManager, @NonNull Lifecycle lifecycle) {
        super(fragmentManager, lifecycle);
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {

        if (position == 1) {
            return new RepositoryFragment();
        }
        return new OverviewFragment();
    }

    @Override
    public int getItemCount() {
        return 2;
    }
}
