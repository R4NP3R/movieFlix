package com.movieflix.controller.swagger;

import com.movieflix.controller.request.StreamingRequest;
import com.movieflix.controller.response.StreamingResponse;
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

@Tag(name = "Streamings", description = "Endpoints para gerenciamento de plataformas de streaming")
public interface StreamingSwagger {

  @Operation(summary = "Cadastra uma nova plataforma de streaming")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "201", description = "Plataforma cadastrada com sucesso",
                  content = @Content(schema = @Schema(implementation = StreamingResponse.class))),
          @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos")
  })
  ResponseEntity<StreamingResponse> createStreaming(@Valid @RequestBody StreamingRequest request);

  @Operation(summary = "Busca uma plataforma pelo ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Plataforma encontrada",
                  content = @Content(schema = @Schema(implementation = StreamingResponse.class))),
          @ApiResponse(responseCode = "404", description = "Plataforma não encontrada")
  })
  ResponseEntity<StreamingResponse> getStreamingById(
          @Parameter(description = "ID da plataforma de streaming", example = "1")
          @PathVariable Long id
  );

  @Operation(summary = "Lista todas as plataformas de streaming")
  @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso",
          content = @Content(array = @ArraySchema(schema = @Schema(implementation = StreamingResponse.class))))
  ResponseEntity<List<StreamingResponse>> listAllStreamings();

  @Operation(summary = "Remove uma plataforma de streaming")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "204", description = "Plataforma removida com sucesso"),
          @ApiResponse(responseCode = "404", description = "Plataforma não encontrada")
  })
  ResponseEntity<Void> deleteStreamingById(
          @Parameter(description = "ID da plataforma a ser removida", example = "2")
          @PathVariable Long id
  );
}
