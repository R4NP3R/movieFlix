package com.movieflix.mapper;

import com.movieflix.controller.request.MovieRequest;
import com.movieflix.controller.response.MovieResponse;
import com.movieflix.entity.Movie;
import lombok.experimental.UtilityClass;

@UtilityClass
public class MovieMapper {

  public Movie map (MovieRequest request) {
    return Movie.builder()
            .title(request.title())
            .description(request.description())
            .releaseDate(request.releaseDate())
            .rating(request.rating())
            .build();
  }

  public MovieResponse map(Movie movie) {
    return MovieResponse.builder()
            .id(movie.getId())
            .title(movie.getTitle())
            .description(movie.getDescription())
            .releaseDate(movie.getReleaseDate())
            .rating(movie.getRating())
            .build();
  }


}


