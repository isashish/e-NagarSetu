package com.enagarsetu.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import java.time.LocalDateTime;

@Document(collection = "complaints")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {
    @Id
    private String id;

    private String title;
    private String description;
    private String category;
    private String status; // PENDING, IN_PROGRESS, RESOLVED
    private String priority; // LOW, MEDIUM, HIGH
    private String location;
    private LocalDateTime createdAt;

    @DBRef
    private User citizen;
}
