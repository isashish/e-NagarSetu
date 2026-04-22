package com.enagarsetu.backend.repository;

import com.enagarsetu.backend.model.Complaint;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ComplaintRepository extends MongoRepository<Complaint, String> {
    List<Complaint> findByCitizenId(String citizenId);
}
