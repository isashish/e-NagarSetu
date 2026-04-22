package com.enagarsetu.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "waste_pickups")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WastePickup {
    @Id
    private String id;
    
    private String wasteType; // Dry, Wet, Mixed, E-Waste
    private String status; // PENDING, COMPLETED, DISPATCHED
    private boolean neighborMode;
    private String neighborName;
    private int pointsEarned;
    private LocalDateTime requestedAt;

    @DBRef
    private User user;
}
