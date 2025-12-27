package com.movieflix.service;

import com.movieflix.controller.request.MovieRequest;
import com.movieflix.controller.request.StreamingRequest;
import com.movieflix.entity.Category;
import com.movieflix.entity.Movie;
import com.movieflix.entity.Streaming;
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
  private final StreamingService streamingService;

  public Movie saveMovie(MovieRequest request) {
    List<Category> categories = getCategoryList(request.categories());
    List<Streaming> streamings = getStreamingList(request.streamings());

    Movie newMovie = MovieMapper.map(request);
    newMovie.setCategories(categories);
    newMovie.setStreamings(streamings);

    return movieRepository.save(newMovie);
  }

  public List<Movie> listAllMovies() {
    return movieRepository.findAll();
  }

  public Optional<Movie> getMovieById(Long id) {
    return movieRepository.findById(id);
  }

  public void deleteMovie(Long id) {
    movieRepository.deleteById(id);
  }

  public List<Category> getCategoryList(List<Long> categoriesId) {
    List<Category> categories = new ArrayList<>();
    categoriesId.forEach(cId -> categoryService.getCategoryById(cId).ifPresent(categories::add));
    return categories;
  }

  public List<Streaming> getStreamingList(List<Long> StreamingsId) {
    List<Streaming> streamings = new ArrayList<>();
    StreamingsId.forEach(sId -> streamingService.getStreamingById(sId).ifPresent(streamings::add));
    return streamings;
  }


}
