package com.enagarsetu.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    private String id;
    
    private String vehicleNumber;
    private String driverName;
    private String contactNumber;
    private String ward;
    private String status; // ACTIVE, MAINTENANCE
    private int fuelLevel;
    private double currentLat;
    private double currentLng;
    private String nextEta;
}
