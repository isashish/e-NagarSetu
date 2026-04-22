package com.enagarsetu.backend.controller;

import com.enagarsetu.backend.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
public class StatsController {
    @Autowired
    private StatsService statsService;

    @GetMapping("/admin")
    public Map<String, Object> getAdminStats() {
        return statsService.getAdminStats();
    }
}
