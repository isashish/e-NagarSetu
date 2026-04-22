package com.enagarsetu.backend.service;

import com.enagarsetu.backend.model.Property;
import com.enagarsetu.backend.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {
    @Autowired
    private PropertyRepository repository;

    public List<Property> getAllProperties() {
        return repository.findAll();
    }

    public List<Property> getPropertiesByOwner(String ownerId) {
        return repository.findByOwnerId(ownerId);
    }

    public Optional<Property> getPropertyById(String propertyId) {
        return repository.findByPropertyId(propertyId);
    }
}
