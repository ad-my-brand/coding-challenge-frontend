package com.alert.github_api;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;

import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);



    }
    public void fetch_repo_info(View view){
        //disable the initial container
        LinearLayout linearLayout = (LinearLayout)findViewById(R.id.no_data);
        linearLayout.setVisibility(View.GONE);
        //-----------
        ArrayList<DataModel> list_of_repository = new ArrayList<>();
        list_of_repository.add(new DataModel("InstalaoderRm","This is project is basically made to fetch all the records from the instaloader API","",false));
        list_of_repository.add(new DataModel("Torque","TOrque is a project that will help indentify the availability of stuff around you.","",false));
        list_of_repository.add(new DataModel("PathFinder","Pathfinder is a project made to find the shortest path between two points on a graph.","",true));

        CustomAdapter customAdapter = new CustomAdapter(this,list_of_repository);
        ListView listView = (ListView)findViewById(R.id.list_of_repos);
        listView.setVisibility(View.VISIBLE);
        listView.setAdapter(customAdapter);
    }
}