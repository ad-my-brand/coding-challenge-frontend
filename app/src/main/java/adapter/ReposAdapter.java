package adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.gitapp.R;

import java.util.List;

import model.GitHubRepo;

public class ReposAdapter extends RecyclerView.Adapter<ReposAdapter.ReposViewHolder> {
    private List<GitHubRepo> repos;
    private int rowLayout;
    private Context context;

    public ReposAdapter(List<GitHubRepo> repos, int rowLayout, Context context) {
        this.repos = repos;
        this.rowLayout = rowLayout;
        this.context = context;
    }

    public List<GitHubRepo> getRepos() {
        return repos;
    }

    public int getRowLayout() {
        return rowLayout;
    }

    public Context getContext() {
        return context;
    }

    public void setRepos(List<GitHubRepo> repos) {
        this.repos = repos;
    }

    public void setRowLayout(int rowLayout) {
        this.rowLayout = rowLayout;
    }

    public void setContext(Context context) {
        this.context = context;
    }

    @NonNull
//    @org.jetbrains.annotations.NotNull
    @Override
    public ReposAdapter.ReposViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(rowLayout,parent,false);

        return new ReposViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ReposAdapter.ReposViewHolder holder, int position) {
            holder.repoName.setText(repos.get(position).getName());
            holder.repoDescription.setText(repos.get(position).getDescription());
            holder.repoLanguage.setText(repos.get(position).getLanguage());
//            holder.repoName.setText(repos.get(position).getName());
    }

    @Override
    public int getItemCount() {

        return repos.size();
    }

    public class ReposViewHolder extends RecyclerView.ViewHolder{
        LinearLayout reposLayout;
        TextView repoName, repoDescription,repoLanguage;

        public ReposViewHolder(@NonNull View itemView) {
            super(itemView);
            reposLayout = itemView.findViewById(R.id.repo_item_layout);
            repoName = itemView.findViewById(R.id.repoName);
            repoDescription = itemView.findViewById(R.id.repodescription);
            repoLanguage = itemView.findViewById(R.id.repolanguage);


        }
    }
}
