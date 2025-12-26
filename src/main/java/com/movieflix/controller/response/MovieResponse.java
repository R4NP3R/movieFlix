package com.movieflix.controller.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public record MovieResponse(Long id,
                            String title,
                            String description,
                            @JsonFormat(pattern = "dd/MM/yyyy", shape = JsonFormat.Shape.STRING)
                            LocalDate releaseDate,
                            Float rating,
                            String imageUrl,
                            List<CategoryResponse> categories,
                            List<StreamingResponse> streamings
                            ) {
}
