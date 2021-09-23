package com.alert.github_api;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;

import java.util.ArrayList;

public class CustomAdapter extends ArrayAdapter<DataModel> {
    public CustomAdapter(Context context,@NonNull ArrayList<DataModel> arrayList){
        super(context,0,arrayList);
    }
    @NonNull
    @Override
    public View getView(int position, @NonNull View convertView,@NonNull ViewGroup parent){
        View currentItemView = convertView;
        if(currentItemView == null){
            currentItemView = LayoutInflater.from(getContext()).inflate(R.layout.repo_information,parent,false);
        }
        DataModel currentNumberPosition = getItem(position);

        TextView repo_name = currentItemView.findViewById(R.id.repo_title);
        repo_name.setText(currentNumberPosition.getRepo_name());

        TextView repo_description = currentItemView.findViewById(R.id.rep_desc);
        repo_description.setText(currentNumberPosition.getRepo_description());
        return currentItemView;
    }
}
