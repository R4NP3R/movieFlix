package com.movieflix.controller.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

@Builder
public record CategoryRequest (
        @NotBlank(message = "O nome não pode estar vazio")
        @NotEmpty(message = "O nome é obrigatório")
        String name) {
}
