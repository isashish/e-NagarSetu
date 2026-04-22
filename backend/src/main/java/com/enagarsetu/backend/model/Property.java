package com.enagarsetu.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "properties")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {
    @Id
    private String id;
    
    private String propertyId;
    private String address;
    private String propertyType; // Residential, Commercial
    private double area;
    private String taxStatus; // PAID, UNPAID, OVERDUE
    private double pendingTaxAmount;

    @DBRef
    private User owner;
}
