package com.enagarsetu.backend.service;

import com.enagarsetu.backend.model.Complaint;
import com.enagarsetu.backend.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public Complaint createComplaint(Complaint complaint) {
        complaint.setCreatedAt(LocalDateTime.now());
        if(complaint.getStatus() == null) {
            complaint.setStatus("PENDING");
        }
        return complaintRepository.save(complaint);
    }

    public Complaint updateComplaintStatus(String id, String status) {
        Complaint complaint = complaintRepository.findById(id).orElseThrow(() -> new RuntimeException("Complaint not found"));
        complaint.setStatus(status.toUpperCase());
        return complaintRepository.save(complaint);
    }
}
