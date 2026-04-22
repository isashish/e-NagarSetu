package com.enagarsetu.backend.controller;

import com.enagarsetu.backend.model.Property;
import com.enagarsetu.backend.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {
    @Autowired
    private PropertyService service;

    @GetMapping
    public List<Property> getAll() {
        return service.getAllProperties();
    }

    @GetMapping("/owner/{ownerId}")
    public List<Property> getByOwner(@PathVariable String ownerId) {
        return service.getPropertiesByOwner(ownerId);
    }

    @GetMapping("/{propertyId}")
    public Property getByPropertyId(@PathVariable String propertyId) {
        return service.getPropertyById(propertyId).orElse(null);
    }
}
