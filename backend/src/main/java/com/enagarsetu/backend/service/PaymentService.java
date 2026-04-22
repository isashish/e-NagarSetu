package com.enagarsetu.backend.service;

import com.enagarsetu.backend.model.Payment;
import com.enagarsetu.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public List<Payment> getPaymentsByUserId(String userId) {
        return paymentRepository.findByUserId(userId);
    }

    public Payment processPayment(Payment payment) {
        return paymentRepository.save(payment);
    }
}
