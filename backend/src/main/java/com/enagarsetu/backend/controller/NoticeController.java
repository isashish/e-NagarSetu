package com.enagarsetu.backend.controller;

import com.enagarsetu.backend.model.Notice;
import com.enagarsetu.backend.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin(origins = "*") // For development
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeService.getAllNotices();
    }

    @PostMapping
    public Notice createNotice(@RequestBody Notice notice) {
        return noticeService.createNotice(notice);
    }
}
