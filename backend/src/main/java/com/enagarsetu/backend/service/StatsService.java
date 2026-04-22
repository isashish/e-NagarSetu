package com.enagarsetu.backend.service;

import com.enagarsetu.backend.model.*;
import com.enagarsetu.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class StatsService {
    @Autowired private UserRepository userRepo;
    @Autowired private ComplaintRepository complaintRepo;
    @Autowired private PaymentRepository paymentRepo;
    @Autowired private VehicleRepository vehicleRepo;
    @Autowired private WastePickupRepository wasteRepo;

    public Map<String, Object> getAdminStats() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalUsers", userRepo.count());
        stats.put("onlineVehicles", vehicleRepo.findAll().stream().filter(v -> "ACTIVE".equals(v.getStatus())).count());
        stats.put("totalVehicles", vehicleRepo.count());
        stats.put("openComplaints", complaintRepo.findAll().stream().filter(c -> !"RESOLVED".equals(c.getStatus())).count());
        
        double totalRevenue = paymentRepo.findAll().stream()
                .filter(p -> "COMPLETED".equals(p.getStatus()))
                .mapToDouble(Payment::getAmount)
                .sum();
        stats.put("totalRevenue", totalRevenue);

        // Complaint Distribution
        Map<String, Long> complaintsByCategory = new HashMap<>();
        complaintRepo.findAll().forEach(c -> {
            complaintsByCategory.put(c.getCategory(), complaintsByCategory.getOrDefault(c.getCategory(), 0L) + 1);
        });
        stats.put("complaintDistribution", complaintsByCategory);

        return stats;
    }
}
