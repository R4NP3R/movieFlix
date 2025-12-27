package com.movieflix.controller.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;
import java.util.List;

public record MovieRequest(@NotBlank(message = "O Título não pode estar vazio")
                           @NotEmpty(message = "O Título é obrigatório")
                           String title,
                           String description,
                           @JsonFormat(pattern = "dd/MM/yyyy", shape = JsonFormat.Shape.STRING)
                           LocalDate releaseDate,
                           Float rating,
                           @NotBlank(message = "O link não pode estar vazio")
                           @NotEmpty(message = "O url da imagem é obrigatório")
                           String imageUrl,
                           List<Long> categories,
                           List<Long> streamings) {
}
