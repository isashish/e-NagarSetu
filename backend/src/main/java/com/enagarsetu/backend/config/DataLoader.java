package com.enagarsetu.backend.config;

import com.enagarsetu.backend.model.*;
import com.enagarsetu.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Configuration
public class DataLoader {

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initDatabase(
            ComplaintRepository complaintRepo, 
            NoticeRepository noticeRepo,
            UserRepository userRepo,
            BookingRepository bookingRepo,
            PaymentRepository paymentRepo,
            DocumentRepository docRepo,
            WastePickupRepository wasteRepo,
            VehicleRepository vehicleRepo,
            PropertyRepository propertyRepo) {
        return args -> {
            // Seed Users - Only if database is empty
            if (userRepo.count() == 0) {
                User citizen = new User(null, "johndoe", passwordEncoder.encode("password"), "john@example.com", "John Doe", "9876543210", "Main Street, Ward 5", "CITIZEN", "5", 740, null);
                userRepo.save(citizen);
            }
                
            // Ensure Admin Exists
            if (!userRepo.findByEmail("admin@enagarsetu.gov").isPresent() && !userRepo.findByUsername("admin").isPresent()) {
                User admin = new User(null, "admin", passwordEncoder.encode("admin123"), "admin@enagarsetu.gov", "Municipal Admin", "011-223344", "Town Hall", "ADMIN", "1", 999, null);
                userRepo.save(admin);
            }

            User john = userRepo.findByEmail("john@example.com").orElse(userRepo.findByUsername("johndoe").orElse(null));
            if (john != null) {
                boolean changed = false;
                if (john.getWard() == null) { john.setWard("5"); changed = true; }
                if (john.getCivicScore() == null) { john.setCivicScore(740); changed = true; }
                if (john.getEmail() == null) { john.setEmail("john@example.com"); changed = true; }
                if (changed) userRepo.save(john);
            }

            User admin = userRepo.findByEmail("admin@enagarsetu.gov").orElse(userRepo.findByUsername("admin").orElse(null));
            if (admin != null) {
                boolean changed = false;
                if (admin.getWard() == null) { admin.setWard("1"); changed = true; }
                if (admin.getCivicScore() == null) { admin.setCivicScore(999); changed = true; }
                if (admin.getEmail() == null) { admin.setEmail("admin@enagarsetu.gov"); changed = true; }
                if (!"ADMIN".equals(admin.getRole())) { admin.setRole("ADMIN"); changed = true; }
                if (changed) userRepo.save(admin);
            }

            // Seed Complaints
            if (complaintRepo.count() == 0 && john != null) {
                complaintRepo.save(new Complaint(null, "Drain blockage on Main Street", "Blocked drainage near market.", "Drainage", "PENDING", "HIGH", "Main Street", LocalDateTime.now(), john));
                complaintRepo.save(new Complaint(null, "Street light out", "Light Pole #42 is dark.", "Street Lights", "IN_PROGRESS", "MEDIUM", "Block B", LocalDateTime.now(), john));
            }

            // Seed Notices
            if (noticeRepo.count() == 0) {
                noticeRepo.save(new Notice(null, "Monsoon Alert", "Stay prepared for heavy rainfall.", "Health", LocalDateTime.now()));
                noticeRepo.save(new Notice(null, "Tax Holiday", "Extension for property tax rebates.", "Finance", LocalDateTime.now()));
            }

            // Seed Bookings
            if (bookingRepo.count() == 0 && john != null) {
                bookingRepo.save(new Booking(null, "Community Hall A", LocalDate.now().plusDays(5), "10:00 AM - 02:00 PM", "Social Gathering", "CONFIRMED", LocalDateTime.now(), john));
            }

            // Seed Payments
            if (paymentRepo.count() == 0 && john != null) {
                paymentRepo.save(new Payment(null, "PROPERTY_TAX", 1250.0, "COMPLETED", "TXN123456", LocalDateTime.now(), john));
                paymentRepo.save(new Payment(null, "WATER_BILL", 450.0, "PENDING", null, LocalDateTime.now(), john));
            }

            // Seed Documents
            if (docRepo.count() == 0 && john != null) {
                docRepo.save(new OfficialDocument(null, "Birth Certificate", "BIRTH_CERTIFICATE", "https://example.com/docs/birth.pdf", LocalDateTime.now(), john));
            }

            // Seed Waste Pickups
            if (wasteRepo.count() == 0 && john != null) {
                wasteRepo.save(new WastePickup(null, "Dry Waste", "COMPLETED", false, null, 10, LocalDateTime.now().minusDays(2), john));
                wasteRepo.save(new WastePickup(null, "Wet Waste", "COMPLETED", false, null, 10, LocalDateTime.now().minusDays(1), john));
                wasteRepo.save(new WastePickup(null, "Mixed Waste", "PENDING", false, null, 0, LocalDateTime.now(), john));
            }

            // Seed Vehicles
            if (vehicleRepo.count() == 0) {
                vehicleRepo.save(new Vehicle(null, "MP04-AB-1234", "Ramesh Yadav", "9876543210", "Ward 3 & 4", "ACTIVE", 72, 30.0, 45.0, "10:32 AM"));
                vehicleRepo.save(new Vehicle(null, "MP04-CD-5678", "Suresh Patel", "9765432109", "Ward 5 & 6", "ACTIVE", 45, 55.0, 60.0, "11:05 AM"));
                vehicleRepo.save(new Vehicle(null, "MP04-EF-9012", "Mahesh Verma", "9654321098", "Ward 1 & 2", "MAINTENANCE", 0, 75.0, 30.0, "--"));
            }

            // Seed Properties
            if (propertyRepo.count() == 0 && john != null) {
                propertyRepo.save(new Property(null, "PROP-7721", "Main Street, Ward 5", "Residential", 1200.0, "PAID", 0.0, john));
                propertyRepo.save(new Property(null, "PROP-8890", "Commercial Block B", "Commercial", 2500.0, "OVERDUE", 4500.0, john));
            }
        };
    }
}
