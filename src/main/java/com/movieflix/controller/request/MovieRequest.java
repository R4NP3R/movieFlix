package com.movieflix.controller.request;

import java.time.LocalDate;

public record MovieRequest(String title,
                           String description,
                           LocalDate releaseDate,
                           Float rating) {
}
