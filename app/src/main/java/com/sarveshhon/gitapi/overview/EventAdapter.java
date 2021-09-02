package com.sarveshhon.gitapi.overview;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sarveshhon.gitapi.R;

import java.util.List;

public class EventAdapter extends RecyclerView.Adapter<EventAdapter.ViewHolder> {

    Context context;
    List<EventModel> list;

    public EventAdapter(Context context, List<EventModel> list) {
        this.context = context;
        this.list = list;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new ViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.event_item, parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {

        holder.tvType.setText(list.get(position).getType());
        holder.tvRepository.setText(list.get(position).getRepository());
        holder.tvCreatedAt.setText(list.get(position).getCreated_at());

    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        TextView tvType, tvRepository, tvCreatedAt;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            tvType = itemView.findViewById(R.id.tvType);
            tvRepository = itemView.findViewById(R.id.tvRepository);
            tvCreatedAt = itemView.findViewById(R.id.tvCreatedAt);

        }
    }
}
