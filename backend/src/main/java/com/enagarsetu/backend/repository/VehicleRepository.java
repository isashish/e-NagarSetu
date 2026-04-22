package com.enagarsetu.backend.repository;

import com.enagarsetu.backend.model.Vehicle;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface VehicleRepository extends MongoRepository<Vehicle, String> {
    List<Vehicle> findByWard(String ward);
}
