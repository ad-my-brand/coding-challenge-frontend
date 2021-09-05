package com.executivestrokes.Adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.recyclerview.widget.RecyclerView;

import com.executivestrokes.githubreposissues.R;
import com.executivestrokes.model.RepoModel;

import java.util.List;

public class ReposAdapter extends RecyclerView.Adapter<ReposAdapter.ReposViewHolder>  {

    private List<RepoModel> repos;
    private int rowLayout;
    private Context context;
    private RecyclerViewOnClickListner listner;


    public ReposAdapter(List<RepoModel> repos, int rowLayout, Context context,RecyclerViewOnClickListner listner) {
        this.setRepos(repos);
        this.setRowLayout(rowLayout);
        this.setContext(context);
        this.listner=listner;

    }

    public List<RepoModel> getRepos() {return repos;}

    public void setRepos(List<RepoModel> repos) {this.repos = repos;}

    public int getRowLayout() {return rowLayout;}

    public void setRowLayout(int rowLayout) {this.rowLayout = rowLayout;}

    public Context getContext() {return context;}

    public void setContext(Context context) {this.context = context;}

    public static class ReposViewHolder extends RecyclerView.ViewHolder {
        LinearLayout reposLayout;
        TextView repoName;
        TextView repoDescription;
        TextView repoOpenIssues;


        public ReposViewHolder(View v) {
            super(v);
            reposLayout = (LinearLayout) v.findViewById(R.id.repos_item_layout);
            repoName = (TextView) v.findViewById(R.id.repoName);
            repoDescription = (TextView) v.findViewById(R.id.repoDescription);
            repoOpenIssues = (TextView) v.findViewById(R.id.repoLanguage);
        }

    }

    @Override
    public ReposAdapter.ReposViewHolder onCreateViewHolder(ViewGroup parent,
                                                           int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(rowLayout, parent, false);
        return new ReposViewHolder(view);
    }


    @Override
    public void onBindViewHolder(ReposViewHolder holder, final int position) {
        holder.repoName.setText(repos.get(position).getName());
        holder.repoDescription.setText(repos.get(position).getDescription());
        holder.repoOpenIssues.setText("Total Open Issues : "+repos.get(position).getOpen_issues());
        holder.itemView.setOnClickListener(view ->{
            listner.onIttemClick(repos.get(position).getName());
        });
        }



    @Override
    public int getItemCount() { return repos.size();}

    public interface RecyclerViewOnClickListner{
        void onIttemClick(String name);
    }
    }

