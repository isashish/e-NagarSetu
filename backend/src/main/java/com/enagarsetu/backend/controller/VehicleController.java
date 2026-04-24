package com.enagarsetu.backend.controller;

import com.enagarsetu.backend.model.Vehicle;
import com.enagarsetu.backend.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*")
public class VehicleController {
    @Autowired
    private VehicleService service;

    @GetMapping
    public List<Vehicle> getAll() {
        return service.getAllVehicles();
    }

    @GetMapping("/ward/{ward}")
    public List<Vehicle> getByWard(@PathVariable String ward) {
        return service.getVehiclesByWard(ward);
    }

    @PutMapping("/{id}/location")
    public Vehicle updateLocation(@PathVariable String id, @RequestParam double lat, @RequestParam double lng) {
        return service.updateLocation(id, lat, lng);
    }
}
