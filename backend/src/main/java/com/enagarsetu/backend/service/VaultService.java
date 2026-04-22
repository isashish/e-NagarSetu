package com.enagarsetu.backend.service;

import com.enagarsetu.backend.model.OfficialDocument;
import com.enagarsetu.backend.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VaultService {
    @Autowired
    private DocumentRepository documentRepository;

    public List<OfficialDocument> getDocumentsByOwner(String ownerId) {
        return documentRepository.findByOwnerId(ownerId);
    }

    public OfficialDocument uploadDocument(OfficialDocument doc) {
        return documentRepository.save(doc);
    }
}
