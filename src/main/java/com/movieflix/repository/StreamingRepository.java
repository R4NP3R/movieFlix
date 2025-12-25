package com.movieflix.repository;

import entity.Streaming;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface StreamingRepository extends JpaRepository<Streaming, Long>{
}
