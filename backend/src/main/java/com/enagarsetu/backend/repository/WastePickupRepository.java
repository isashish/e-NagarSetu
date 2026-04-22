package com.enagarsetu.backend.repository;

import com.enagarsetu.backend.model.WastePickup;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface WastePickupRepository extends MongoRepository<WastePickup, String> {
    List<WastePickup> findByUserId(String userId);
}
