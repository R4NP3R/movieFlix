package com.movieflix.service;

import com.movieflix.controller.request.MovieRequest;
import com.movieflix.entity.Movie;
import com.movieflix.mapper.MovieMapper;
import com.movieflix.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MovieService {

  private final MovieRepository movieRepository;

  public Movie saveMovie(MovieRequest request) {
    Movie newMovie = MovieMapper.map(request);

    return movieRepository.save(newMovie);
  }

}
