package com.movieflix.service;

import com.movieflix.controller.request.StreamingRequest;
import com.movieflix.entity.Streaming;
import com.movieflix.exceptions.HandleExistsException;
import com.movieflix.mapper.StreamingMapper;
import com.movieflix.repository.StreamingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StreamingService {

  private final StreamingRepository streamingRepository;


  public Streaming saveStreaming(StreamingRequest request) {
    validateStreamingDoesNotExist(request.name());
    Streaming newStreaming = StreamingMapper.map(request);

    return streamingRepository.save(newStreaming);
  }

  public Optional<Streaming> getStreamingById(Long id) {
    return streamingRepository.findById(id);
  }

  public List<Streaming> listAllStreaming() {
    return streamingRepository.findAll();
  }

  public void deleteStreamingById(Long id) {
    streamingRepository.deleteById(id);
  }

  public void validateStreamingDoesNotExist(String name) {
  streamingRepository.findByName(name).ifPresent(streaming -> {
    throw new HandleExistsException("Already exists streaming with this name");
  });
  }

}
