package com.enagarsetu.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import java.time.LocalDateTime;

@Document(collection = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    private String id;

    private String type; // PROPERTY_TAX, WATER_BILL, TRADE_LICENSE
    private Double amount;
    private String status; // PENDING, COMPLETED, FAILED
    private String transactionId;
    private LocalDateTime paidAt;

    @DBRef
    private User user;
}
