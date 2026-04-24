package com.enagarsetu.backend.service;

import com.enagarsetu.backend.model.User;
import com.enagarsetu.backend.model.WastePickup;
import com.enagarsetu.backend.repository.UserRepository;
import com.enagarsetu.backend.repository.WastePickupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class WasteService {
    @Autowired
    private WastePickupRepository repository;

    @Autowired
    private UserRepository userRepository;

    public List<WastePickup> getAllPickups() {
        return repository.findAll();
    }

    public List<WastePickup> getPickupsByUser(String userId) {
        return repository.findByUserId(userId);
    }

    public WastePickup schedulePickup(WastePickup pickup) {
        pickup.setRequestedAt(LocalDateTime.now());
        pickup.setStatus("PENDING");
        
        // Update user points if not neighbor mode
        if (pickup.getUser() != null) {
            String userId = pickup.getUser().getId();
            userRepository.findById(userId).ifPresent(user -> {
                int currentScore = user.getCivicScore() != null ? user.getCivicScore() : 740;
                if (!pickup.isNeighborMode()) {
                    user.setCivicScore(currentScore + 10);
                    pickup.setPointsEarned(10);
                } else {
                    user.setCivicScore(Math.max(0, currentScore - 5));
                    pickup.setPointsEarned(-5);
                }
                userRepository.save(user);
            });
        }
        
        return repository.save(pickup);
    }
}
