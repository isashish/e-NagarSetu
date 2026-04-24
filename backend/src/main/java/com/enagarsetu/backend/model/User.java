package com.enagarsetu.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;

    @Indexed(unique = true)
    private String username;

    private String password;
    @Indexed(unique = true)
    private String email;
    private String fullName;
    private String phone;
    private String address;
    private String role; // CITIZEN, ADMIN, STAFF
    private String ward;
    private Integer civicScore;
    private String assignedVehicleId; // For STAFF/DRIVER
    private java.time.LocalDateTime lastLogin;
}
