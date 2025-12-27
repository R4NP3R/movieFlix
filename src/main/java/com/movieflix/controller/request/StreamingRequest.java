package com.movieflix.controller.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record StreamingRequest(@NotBlank(message = "O nome não pode estar vazio")
                               @NotEmpty(message = "O nome é obrigatório")
                               String name,
                               @NotBlank(message = "O link não pode estar vazio")
                               @NotEmpty(message = "O url da imagem é obrigatório")
                               String imageUrl) {
}
