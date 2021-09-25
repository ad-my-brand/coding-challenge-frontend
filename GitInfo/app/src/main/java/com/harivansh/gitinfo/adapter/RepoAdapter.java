package com.harivansh.gitinfo.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.harivansh.gitinfo.R;
import com.harivansh.gitinfo.model.Repo;

import java.util.ArrayList;

public class RepoAdapter extends RecyclerView.Adapter<RepoAdapter.RepoViewHolder> {

    private ArrayList<Repo> repoArrayList;

    private RepoViewClickListener listener;

    public RepoAdapter(ArrayList<Repo> repoArrayList, RepoViewClickListener listener) {
        this.repoArrayList = repoArrayList;
        this.listener = listener;
    }


    public class RepoViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener{

        private final TextView repoName;
        private final TextView repoDesc;

        public RepoViewHolder(View view){
            super(view);
            repoName = view.findViewById(R.id.repoName);
            repoDesc = view.findViewById(R.id.repoDesc);
            view.setOnClickListener(this);
        }

        @Override
        public void onClick(View v) {
            listener.onClick(v,getAdapterPosition());
        }
    }

    @NonNull
    @Override
    public RepoViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.repo_row, parent, false);

        return new RepoViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RepoViewHolder holder, int position) {

        String repoName = repoArrayList.get(position).getRepoName();
        String repoDesc = repoArrayList.get(position).getRepoDescription();

        holder.repoName.setText(repoName);
        holder.repoDesc.setText(repoDesc);

    }

    @Override
    public int getItemCount() {
        return repoArrayList.size();
    }

    public interface RepoViewClickListener{
        void onClick(View view, int position);
    }
}
