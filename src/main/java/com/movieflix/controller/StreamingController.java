package com.movieflix.controller;

import com.movieflix.controller.request.StreamingRequest;
import com.movieflix.controller.response.StreamingResponse;
import com.movieflix.mapper.StreamingMapper;
import com.movieflix.service.StreamingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movieflix/streaming")
@RequiredArgsConstructor
public class StreamingController {

  private final StreamingService streamingService;


  @PostMapping
  public ResponseEntity<StreamingResponse> createStreaming(@RequestBody StreamingRequest request) {
    StreamingResponse newStreaming = StreamingMapper.map(streamingService.saveStreaming(request));

    return ResponseEntity.status(HttpStatus.CREATED).body(newStreaming);

  }
}
