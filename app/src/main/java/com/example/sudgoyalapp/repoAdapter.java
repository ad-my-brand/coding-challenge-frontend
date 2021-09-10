package com.example.sudgoyalapp;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class repoAdapter extends RecyclerView.Adapter<repoAdapter.ViewHolder> {
    ArrayList<repoData> arrayListRepo;
    Context context;

    public repoAdapter(ArrayList<repoData> arrayListRepo, Context context) {
        this.arrayListRepo = arrayListRepo;
        this.context = context;
    }

    @NonNull
    @Override
    public repoAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.reporow,parent,false);
        return new ViewHolder (view);
    }

    @Override
    public void onBindViewHolder(@NonNull repoAdapter.ViewHolder holder, int position) {
        repoData temp =  arrayListRepo.get(position);

        holder.repo.setText(temp.getRepoName());

        holder.repo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                //Toast.makeText(context.getApplicationContext(), temp.getGitUrl(), Toast.LENGTH_SHORT).show();
                Intent intentBeds = new Intent(context,IssueActivity.class);
                intentBeds.putExtra("repourl",temp.getGitUrl());
                intentBeds.setFlags(intentBeds.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(intentBeds);

            }
        });
    }

    @Override
    public int getItemCount() {
        return arrayListRepo.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView repo;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            repo = itemView.findViewById(R.id.repoName);

        }
    }
}
