package com.sarveshhon.gitapi.repository;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.sarveshhon.gitapi.R;
import com.sarveshhon.gitapi.issue.IssueActivity;

import java.util.List;

public class RepositoryAdapter extends RecyclerView.Adapter<RepositoryAdapter.ViewHolder> {

    Context context;
    List<RepositoryModel> list;

    public RepositoryAdapter(Context context, List<RepositoryModel> list) {
        this.context = context;
        this.list = list;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new ViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.repository_item, parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {

        holder.tvRepository.setText(list.get(position).getName());
        holder.tvDescription.setText(list.get(position).getDescription());
        holder.tvIssues.setText(String.valueOf(list.get(position).getOpen_issues_count()));
        holder.tvStars.setText(String.valueOf(list.get(position).getWatchers_count()));
        holder.tvForks.setText(String.valueOf(list.get(position).getForks_count()));
        Glide.with(context).load(list.get(position).getAvatar()).into(holder.ivAvatar);


        holder.itemView.setOnClickListener(v -> {

            // Opens Issue in ChromeCustomTab by Checking Condition
            if (list.get(position).getOpen_issues_count() != 0) {
                if (!list.get(position).getName().isEmpty()) {
                    Intent i = new Intent(context, IssueActivity.class);
                    i.putExtra("repo", "/" + list.get(position).getName());
                    context.startActivity(i);
                } else {
                    Toast.makeText(context, "Not Found", Toast.LENGTH_SHORT).show();
                }
            } else {
                Toast.makeText(context, "No Issues", Toast.LENGTH_SHORT).show();
            }

        });


    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        TextView tvRepository, tvDescription, tvIssues, tvStars, tvForks;
        ImageView ivAvatar;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);


            tvRepository = itemView.findViewById(R.id.tvRepository);
            tvDescription = itemView.findViewById(R.id.tvDescription);
            tvIssues = itemView.findViewById(R.id.tvIssues);
            tvStars = itemView.findViewById(R.id.tvStars);
            tvForks = itemView.findViewById(R.id.tvForks);
            ivAvatar = itemView.findViewById(R.id.ivAvatar);

        }
    }
}
