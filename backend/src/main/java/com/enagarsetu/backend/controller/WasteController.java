package com.enagarsetu.backend.controller;

import com.enagarsetu.backend.model.WastePickup;
import com.enagarsetu.backend.service.WasteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/waste")
@CrossOrigin(origins = "*")
public class WasteController {
    @Autowired
    private WasteService service;

    @GetMapping
    public List<WastePickup> getAll() {
        return service.getAllPickups();
    }

    @GetMapping("/user/{userId}")
    public List<WastePickup> getByUser(@PathVariable String userId) {
        return service.getPickupsByUser(userId);
    }

    @PostMapping
    public WastePickup create(@RequestBody WastePickup pickup) {
        return service.schedulePickup(pickup);
    }
}
