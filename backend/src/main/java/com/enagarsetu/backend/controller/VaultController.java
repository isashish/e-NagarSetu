package com.enagarsetu.backend.controller;

import com.enagarsetu.backend.model.OfficialDocument;
import com.enagarsetu.backend.service.VaultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vault")
@CrossOrigin(origins = "*")
public class VaultController {
    @Autowired
    private VaultService vaultService;

    @GetMapping("/{ownerId}")
    public List<OfficialDocument> getMyDocuments(@PathVariable String ownerId) {
        return vaultService.getDocumentsByOwner(ownerId);
    }

    @PostMapping
    public OfficialDocument addDocument(@RequestBody OfficialDocument doc) {
        return vaultService.uploadDocument(doc);
    }
}
