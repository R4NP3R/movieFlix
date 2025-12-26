package com.movieflix.controller.request;

import java.time.LocalDate;
import java.util.List;

public record MovieRequest(String title,
                           String description,
                           LocalDate releaseDate,
                           Float rating,
                           List<Long> categories,
                           List<Long> streamings) {
}
