package com.movieflix.controller.request;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.util.List;

public record MovieRequest(String title,
                           String description,
                           @JsonFormat(pattern = "dd/MM/yyyy", shape = JsonFormat.Shape.STRING)
                           LocalDate releaseDate,
                           Float rating,
                           String imageUrl,
                           List<Long> categories,
                           List<Long> streamings) {
}
