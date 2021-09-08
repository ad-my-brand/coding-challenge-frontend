package com.codechakra.usergitrepository;

import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.recyclerview.widget.RecyclerView;

import com.codechakra.usergitrepository.models.Issue;
import com.codechakra.usergitrepository.models.Repos;

import java.util.List;


import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static com.codechakra.usergitrepository.UsefulVariables.username;

public class RecycleAdapter extends RecyclerView.Adapter<RecycleAdapter.RecycleAdapterView> {
    List<Repos> repos;

    public RecycleAdapter(List<Repos> repos) {
        this.repos = repos;
    }

    @NonNull
    @Override
    public RecycleAdapterView onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.repository_row, parent, false);

        return new RecycleAdapterView(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RecycleAdapterView holder, int position) {
        String reposname = "Repository name : " + repos.get(position).getName();
        StringBuilder content = new StringBuilder();
        holder.Repo_name_textview.setText(reposname);
        content.append("Description : ").append(repos.get(position).getDescription()).append("\n");
        content.append("Repo Url : ").append(repos.get(position).getHtml_url()).append("\n");
        content.append("Open issues : ").append(repos.get(position).getOpen_issues()).append("\n");


        holder.textinfo.setText(content);

        if (repos.get(position).getOpen_issues() != 0) {
            String issueNumber_info = "";
            issueNumber_info = "Enter issue number from 1-" + repos.get(position).getOpen_issues();
            holder.issue_no.setVisibility(View.VISIBLE);
            holder.Goto_issue.setVisibility(View.VISIBLE);
            holder.issueNumberTextInfo.setText(issueNumber_info);

        } else {
            String issueNumber_info = "";
            issueNumber_info = "There are no issues with this repos";
            holder.issue_no.setVisibility(View.INVISIBLE);
            holder.Goto_issue.setVisibility(View.INVISIBLE);
            holder.issueNumberTextInfo.setText(issueNumber_info);
        }


        holder.Goto_issue.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                //holder.issue_no.getText().toString()
                String issue_no = holder.issue_no.getText().toString();
                Log.d("Ms", "onClick: " + username);
                if (!issue_no.isEmpty()) {
                    fetchIssue(v, issue_no, username, repos.get(position).getName());

                }

            }
        });
    }

    public void openDialog(View v, String reponame, String content, String issueurl) {
        AlertDialog.Builder alertDialog = new AlertDialog.Builder(v.getContext());
        alertDialog.setTitle("Repository name : " + reponame);
        alertDialog.setMessage(content);
        // String buildurl="https://github.com/"+username+"/"+reponame+"/Issues/"+num;
        alertDialog.setPositiveButton("Open issue in browser", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(issueurl));
                v.getContext().startActivity(browserIntent);
            }
        });
        alertDialog.setNegativeButton("Close", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });

        AlertDialog builder = alertDialog.create();
        builder.show();
    }

    public void fetchIssue(View v, String issue_no, String login, String reponame) {

        Retrofit retrofit = new Retrofit.Builder().baseUrl("https://api.github.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        GithubApiService githubApiService = retrofit.create(GithubApiService.class);
        Call<Issue> getIssue = githubApiService.getRepoIssue(login, reponame, issue_no);
        getIssue.enqueue(new Callback<Issue>() {
            @Override
            public void onResponse(Call<Issue> call, Response<Issue> response) {
                if (!response.isSuccessful()) {
                    Log.d("FETCH", "onResponse: " + response.code());
                    return;
                }
                Issue mIssue = response.body();
                if (mIssue != null) {
                    String content = "";
                    content += "Issue no: " + issue_no + "\n";
                    content += "Author association : " + mIssue.getAuthor_association() + "\n";
                    content += "Close at: " + mIssue.getClosed_at() + "\n";
                    content += "Update at : " + mIssue.getUpdated_at() + "\n";
                    content += "Html url : " + mIssue.getHtml_url() + "\n";
                    openDialog(v, reponame, content, mIssue.getHtml_url());
                }

                Log.d("FETCH", "onResponse: " + mIssue.getHtml_url());
                if (mIssue != null) {
                    Log.d("FETCH", "onResponse: " + "success");
                }
            }

            @Override
            public void onFailure(Call<Issue> call, Throwable t) {
                Log.d("FETCH", "onFailure: " + t.getMessage());
            }
        });

    }

    @Override
    public int getItemCount() {
        return repos.size();
    }

    public static class RecycleAdapterView extends RecyclerView.ViewHolder {
        TextView textinfo;
        TextView issueNumberTextInfo;
        Button Goto_issue;
        EditText issue_no;
        LinearLayout issue_detail_container;
        TextView isssue_textview;
        TextView Repo_name_textview;
        Button open_issue_in_browser;

        public RecycleAdapterView(@NonNull View itemView) {
            super(itemView);
            textinfo = itemView.findViewById(R.id.repos_info_text);
            issueNumberTextInfo = itemView.findViewById(R.id.issue_details);
            Goto_issue = itemView.findViewById(R.id.go_to_issue_button);
            issue_no = itemView.findViewById(R.id.editText_issue_no);
            Repo_name_textview = itemView.findViewById(R.id.Repo_name_textview);
//            issue_detail_container = itemView.findViewById(R.id.issue_detail_container);
//            isssue_textview = itemView.findViewById(R.id.isssue_textview);
//            open_issue_in_browser = itemView.findViewById(R.id.open_issue_in_browser);
        }
    }

}
