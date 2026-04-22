package com.enagarsetu.backend.repository;

import com.enagarsetu.backend.model.OfficialDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DocumentRepository extends MongoRepository<OfficialDocument, String> {
    List<OfficialDocument> findByOwnerId(String ownerId);
}
