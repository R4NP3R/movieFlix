package com.movieflix.controller.swagger;

import com.movieflix.controller.request.MovieRequest;
import com.movieflix.controller.response.MovieResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Movies", description = "Endpoints para gerenciamento do catálogo de filmes")
public interface MovieSwagger {

  @Operation(summary = "Cadastra um novo filme", description = "Cria um registro de filme no banco de dados")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "201", description = "Filme criado com sucesso",
                  content = @Content(schema = @Schema(implementation = MovieResponse.class))),
          @ApiResponse(responseCode = "400", description = "Dados da requisição inválidos")
  })

  ResponseEntity<MovieResponse> createMovie(@Valid @RequestBody MovieRequest request);

  @Operation(summary = "Busca um filme pelo ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Filme encontrado",
                  content = @Content(schema = @Schema(implementation = MovieResponse.class))),
          @ApiResponse(responseCode = "404", description = "Filme não encontrado")
  })

  ResponseEntity<MovieResponse> getMovieById(
          @Parameter(description = "ID numérico do filme", example = "10")
          @PathVariable Long id
  );

  @Operation(summary = "Lista todos os filmes", description = "Retorna uma coleção completa de filmes cadastrados")
  @ApiResponse(responseCode = "200", description = "Lista de filmes retornada com sucesso",
          content = @Content(array = @ArraySchema(schema = @Schema(implementation = MovieResponse.class))))
  ResponseEntity<List<MovieResponse>> listAllMovies();

  @Operation(summary = "Remove um filme do sistema")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "204", description = "Filme removido com sucesso"),
          @ApiResponse(responseCode = "404", description = "Filme não encontrado para remoção")
  })

  ResponseEntity<Void> deleteMovieById(
          @Parameter(description = "ID do filme a ser deletado", example = "10")
          @PathVariable Long id
  );
}