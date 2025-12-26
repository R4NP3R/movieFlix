package com.movieflix.service;

import com.movieflix.controller.request.MovieRequest;
import com.movieflix.entity.Category;
import com.movieflix.entity.Movie;
import com.movieflix.mapper.MovieMapper;
import com.movieflix.repository.CategoryRepository;
import com.movieflix.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MovieService {

  private final MovieRepository movieRepository;
  private final CategoryService categoryService;

  public Movie saveMovie(MovieRequest request) {
    List<Category> categories = new ArrayList<>();

    request.categories().forEach(c -> categoryService.getCategoryById(c).ifPresent(categories::add));

    Movie newMovie = MovieMapper.map(request);
    newMovie.setCategories(categories);


    return movieRepository.save(newMovie);
  }

  public Optional<Movie> getMovieById(Long id) {
    return movieRepository.findById(id);
  }

}
