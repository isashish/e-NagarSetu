package com.enagarsetu.backend.service;

import com.enagarsetu.backend.model.Booking;
import com.enagarsetu.backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByUserId(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }
}
