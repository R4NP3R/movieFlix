package com.movieflix.repository;

import com.movieflix.entity.Streaming;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StreamingRepository extends JpaRepository<Streaming, Long>{

    Optional<Streaming> findByName(String name);
}
