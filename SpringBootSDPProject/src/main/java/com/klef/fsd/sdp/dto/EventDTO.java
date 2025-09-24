package com.klef.fsd.sdp.dto;



public class EventDTO {
    private int managerId;
    private String category;
    private String title;
    private String description;
    private int capacity;
    private double cost;

    // Getters and Setters
    public int getManagerId() { return managerId; }
    public void setManagerId(int managerId) { this.managerId = managerId; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

    public double getCost() { return cost; }
    public void setCost(double cost) { this.cost = cost; }
}