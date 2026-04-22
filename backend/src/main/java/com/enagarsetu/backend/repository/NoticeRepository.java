package com.enagarsetu.backend.repository;

import com.enagarsetu.backend.model.Notice;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NoticeRepository extends MongoRepository<Notice, String> {
}
