package com.sarveshhon.gitapi.issue;

import static com.sarveshhon.gitapi.Helper.openCustomTab;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.recyclerview.widget.RecyclerView;

import com.sarveshhon.gitapi.R;

import java.util.List;

public class IssueAdapter extends RecyclerView.Adapter<IssueAdapter.ViewHolder> {

    Activity context;
    List<IssueModel> list;

    public IssueAdapter(Activity context, List<IssueModel> list) {
        this.context = context;
        this.list = list;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new ViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.issue_item, parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {

        holder.tvTitle.setText(list.get(position).getTitle());
        holder.tvState.setText("State: " + list.get(position).getState());
        holder.tvIdNumber.setText("Number: " + list.get(position).getNumber());
        holder.tvCreatedBy.setText("Created By: " + list.get(position).getCreated_by());
        holder.tvCreatedAt.setText("Created At: " + list.get(position).getCreated_at());

        holder.itemView.setOnClickListener(v -> {
            if (!list.get(position).getHtml_url().isEmpty()) {
                CustomTabsIntent.Builder customIntent = new CustomTabsIntent.Builder();
                openCustomTab(context, customIntent.build(), Uri.parse(list.get(position).getHtml_url()));
            } else {
                Toast.makeText(context, "Wait for sometime", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        TextView tvTitle, tvState, tvIdNumber, tvCreatedBy, tvCreatedAt;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);


            tvTitle = itemView.findViewById(R.id.tvTitle);
            tvState = itemView.findViewById(R.id.tvState);
            tvIdNumber = itemView.findViewById(R.id.tvIdNumber);
            tvCreatedBy = itemView.findViewById(R.id.tvCreatedBy);
            tvCreatedAt = itemView.findViewById(R.id.tvCreatedAt);

        }
    }


}
