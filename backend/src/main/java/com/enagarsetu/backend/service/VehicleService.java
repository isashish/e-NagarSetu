package com.enagarsetu.backend.service;

import com.enagarsetu.backend.model.Vehicle;
import com.enagarsetu.backend.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VehicleService {
    @Autowired
    private VehicleRepository repository;

    public List<Vehicle> getAllVehicles() {
        return repository.findAll();
    }

    public List<Vehicle> getVehiclesByWard(String ward) {
        return repository.findByWard(ward);
    }

    public Vehicle updateLocation(String id, double lat, double lng) {
        Vehicle vehicle = repository.findById(id).orElseThrow(() -> new RuntimeException("Vehicle not found"));
        vehicle.setCurrentLat(lat);
        vehicle.setCurrentLng(lng);
        return repository.save(vehicle);
    }
}
