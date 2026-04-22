package com.enagarsetu.backend.repository;

import com.enagarsetu.backend.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PaymentRepository extends MongoRepository<Payment, String> {
    List<Payment> findByUserId(String userId);
}
