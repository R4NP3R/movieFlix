package com.movieflix.controller;

import com.movieflix.controller.request.MovieRequest;
import com.movieflix.controller.response.MovieResponse;
import com.movieflix.mapper.MovieMapper;
import com.movieflix.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/movieflix/movie")
@RequiredArgsConstructor
public class MovieController {

  private final MovieService movieService;

  @PostMapping
  public ResponseEntity<MovieResponse> createMovie(@RequestBody MovieRequest request) {
    MovieResponse newMovie = MovieMapper.map(movieService.saveMovie(request));

    return ResponseEntity.status(HttpStatus.CREATED).body(newMovie);
  }

  @GetMapping("/{id}")
  public ResponseEntity<MovieResponse> getMovieById(@PathVariable Long id) {
    return movieService.getMovieById(id)
            .map(movie -> ResponseEntity.ok(MovieMapper.map(movie)))
            .orElse(ResponseEntity.notFound().build());
  }

}
