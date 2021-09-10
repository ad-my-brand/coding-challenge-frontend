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

public class IssueAdapter extends RecyclerView.Adapter<IssueAdapter.ViewHolder> {
    ArrayList<IssueData> arrayListIssue;
    Context context;

    public IssueAdapter(ArrayList<IssueData> arrayListIssue, Context context) {
        this.arrayListIssue = arrayListIssue;
        this.context = context;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.issuesrow,parent,false);
        return new ViewHolder (view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        IssueData temp =  arrayListIssue.get(position);

        holder.Issue.setText(temp.getIssue());

        holder.Issue.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                //Toast.makeText(context.getApplicationContext(), temp.getDetail(), Toast.LENGTH_SHORT).show();
                Intent intentBeds = new Intent(context,IssueDisplay.class);
                intentBeds.putExtra("IssueDetail",temp.getDetail());
                intentBeds.putExtra("HTMLURL",temp.getHtmlUrl());

                intentBeds.setFlags(intentBeds.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(intentBeds);

            }
        });
    }

    @Override
    public int getItemCount() {
        return arrayListIssue.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView Issue;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            Issue = itemView.findViewById(R.id.IssueName);

        }
    }
}
