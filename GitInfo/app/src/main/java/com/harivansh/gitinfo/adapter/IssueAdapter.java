package com.harivansh.gitinfo.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.harivansh.gitinfo.R;
import com.harivansh.gitinfo.model.Issue;

import java.util.ArrayList;

public class IssueAdapter extends RecyclerView.Adapter<IssueAdapter.IssueViewHolder> {

    private ArrayList<Issue> issueArrayList;

    public IssueAdapter(ArrayList<Issue> issueArrayList) {
        this.issueArrayList = issueArrayList;
    }



    public class IssueViewHolder extends RecyclerView.ViewHolder {

        private TextView issueName;

        public IssueViewHolder(View view) {
            super(view);
            issueName = view.findViewById(R.id.issues_name);
        }
    }

    @NonNull
    @Override
    public IssueViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.issue_row, parent, false);

        return new IssueViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull IssueViewHolder holder, int position) {
        String issueName = issueArrayList.get(position).getIssueName();

        holder.issueName.setText(issueName);
    }

    @Override
    public int getItemCount() {
        return issueArrayList.size();
    }
}
