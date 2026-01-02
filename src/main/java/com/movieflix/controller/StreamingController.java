package com.movieflix.controller;

import com.movieflix.controller.request.StreamingRequest;
import com.movieflix.controller.response.StreamingResponse;
import com.movieflix.entity.Streaming;
import com.movieflix.mapper.StreamingMapper;
import com.movieflix.service.StreamingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/movieflix/streaming")
@RequiredArgsConstructor
public class StreamingController {

  private final StreamingService streamingService;


  @PostMapping
  public ResponseEntity<StreamingResponse> createStreaming(@Valid  @RequestBody StreamingRequest request) {
    StreamingResponse newStreaming = StreamingMapper.map(streamingService.saveStreaming(request));

    return ResponseEntity.status(HttpStatus.CREATED).body(newStreaming);
  }

  @GetMapping("/{id}")
  public ResponseEntity<StreamingResponse> getStreamingById(@PathVariable Long id) {

    return streamingService.getStreamingById(id)
            .map(s -> ResponseEntity.ok(StreamingMapper.map(s)))
            .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping
  public ResponseEntity<List<StreamingResponse>> listAllStreamings() {
    List<StreamingResponse> streamings = new ArrayList<>();

    streamingService.listAllStreaming().forEach(streaming -> streamings.add(StreamingMapper.map(streaming)));

    return ResponseEntity.ok(streamings);

  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteStreamingById(@PathVariable Long id) {
    Optional<Streaming> optStreaming = streamingService.getStreamingById(id);

    if (optStreaming.isPresent()) {
      streamingService.deleteStreamingById(id);

      return ResponseEntity.noContent().build();
    }

    return ResponseEntity.notFound().build();
  }


}
