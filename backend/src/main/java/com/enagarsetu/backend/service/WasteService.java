package com.enagarsetu.backend.service;

import com.enagarsetu.backend.model.WastePickup;
import com.enagarsetu.backend.repository.WastePickupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class WasteService {
    @Autowired
    private WastePickupRepository repository;

    public List<WastePickup> getAllPickups() {
        return repository.findAll();
    }

    public List<WastePickup> getPickupsByUser(String userId) {
        return repository.findByUserId(userId);
    }

    public WastePickup schedulePickup(WastePickup pickup) {
        return repository.save(pickup);
    }
}
