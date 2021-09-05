package com.executivestrokes.Adapters;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.recyclerview.widget.RecyclerView;
import com.executivestrokes.githubreposissues.R;
import com.executivestrokes.model.IssueModel;
import java.util.List;
public class IssueAdapter extends RecyclerView.Adapter<IssueAdapter.IssueViewHolder>  {

    private List<IssueModel> issues;
    private int rowLayout;
    private Context context;
    private int count=0;

    public IssueAdapter(List<IssueModel> issues, int rowLayout, Context context) {
        this.setIssues(issues);
        this.setRowLayout(rowLayout);
        this.setContext(context);
    }

    public List<IssueModel> getIssues() {return issues;}

    public void setIssues(List<IssueModel> issues) {this.issues = issues;}

    public int getRowLayout() {return rowLayout;}

    public void setRowLayout(int rowLayout) {this.rowLayout = rowLayout;}

    public Context getContext() {return context;}

    public void setContext(Context context) {this.context = context;}

    public static class IssueViewHolder extends RecyclerView.ViewHolder {
        LinearLayout issueLayout;
        TextView issueName;
        TextView issueDescription;

        public IssueViewHolder(View v) {
            super(v);
            issueLayout = (LinearLayout) v.findViewById(R.id.issue_item_layout);
            issueDescription = (TextView) v.findViewById(R.id.issueDescription);
            issueName = (TextView) v.findViewById(R.id.issueName);
        }
    }

    @Override
    public IssueAdapter.IssueViewHolder onCreateViewHolder(ViewGroup parent,
                                                           int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(rowLayout, parent, false);
        return new IssueViewHolder(view);
    }


    @Override
    public void onBindViewHolder(IssueViewHolder holder, final int position) {
        count++;
        holder.issueName.setText("Issue Number : "+count);
        holder.issueDescription.setText(issues.get(position).getBody());
    }

    @Override
    public int getItemCount() { return issues.size();}
}

