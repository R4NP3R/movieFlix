package com.movieflix.service;

import com.movieflix.controller.request.StreamingRequest;
import com.movieflix.entity.Streaming;
import com.movieflix.mapper.StreamingMapper;
import com.movieflix.repository.StreamingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StreamingService {

  private final StreamingRepository streamingRepository;


  public Streaming saveStreaming(StreamingRequest request) {
    Streaming newStreaming = StreamingMapper.map(request);

    return streamingRepository.save(newStreaming);
  }

}
