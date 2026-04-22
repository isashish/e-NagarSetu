package com.enagarsetu.backend.repository;

import com.enagarsetu.backend.model.Property;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface PropertyRepository extends MongoRepository<Property, String> {
    List<Property> findByOwnerId(String ownerId);
    Optional<Property> findByPropertyId(String propertyId);
}
