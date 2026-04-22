package com.enagarsetu.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import java.time.LocalDateTime;

@Document(collection = "documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfficialDocument {
    @Id
    private String id;

    private String name;
    private String type; // BIRTH_CERTIFICATE, TRADE_LICENSE, PROPERTY_TAX_RECEIPT
    private String fileUrl;
    private LocalDateTime issuedAt;

    @DBRef
    private User owner;
}
