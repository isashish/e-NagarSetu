package com.enagarsetu.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    private String id;

    private String facilityName;
    private LocalDate date;
    private String timeSlot;
    private String purpose;
    private String status; // REQUESTED, CONFIRMED, CANCELLED
    private LocalDateTime createdAt;

    @DBRef
    private User user;
}
