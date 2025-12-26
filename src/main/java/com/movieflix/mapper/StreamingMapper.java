package com.movieflix.mapper;

import com.movieflix.controller.request.StreamingRequest;
import com.movieflix.controller.response.StreamingResponse;
import com.movieflix.entity.Streaming;
import lombok.experimental.UtilityClass;

@UtilityClass
public class StreamingMapper {

  public Streaming map(StreamingRequest request) {
    return Streaming.builder()
            .name(request.name())
            .imageUrl(request.imageUrl())
            .build();
  }

  public StreamingResponse map(Streaming streaming) {
    return StreamingResponse.builder()
            .id(streaming.getId())
            .name(streaming.getName())
            .imageUrl(streaming.getImageUrl())
            .build();
  }


}
