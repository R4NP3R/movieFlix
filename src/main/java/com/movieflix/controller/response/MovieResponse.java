package com.movieflix.controller.response;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record MovieResponse(Long id,
                            String title,
                            String description,
                            LocalDate releaseDate,
                            Float rating) {
}
