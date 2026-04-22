package com.enagarsetu.backend.controller;

import com.enagarsetu.backend.model.Payment;
import com.enagarsetu.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @PostMapping
    public Payment makePayment(@RequestBody Payment payment) {
        return paymentService.processPayment(payment);
    }
}
