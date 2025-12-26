package com.movieflix.mapper;

import com.movieflix.controller.request.MovieRequest;
import com.movieflix.controller.response.CategoryResponse;
import com.movieflix.controller.response.MovieResponse;
import com.movieflix.controller.response.StreamingResponse;
import com.movieflix.entity.Category;
import com.movieflix.entity.Movie;
import com.movieflix.entity.Streaming;
import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class MovieMapper {

  public Movie map (MovieRequest request) {
    List<Category> categories = request.categories().stream()
            .map(cId -> Category.builder().id(cId).build()
            ).toList();

    List<Streaming> streamings = request.streamings().stream().map(sId -> Streaming.builder().id(sId).build()).toList();

    return Movie.builder()
            .title(request.title())
            .description(request.description())
            .releaseDate(request.releaseDate())
            .rating(request.rating())
            .imageUrl(request.imageUrl())
            .categories(categories)
            .streamings(streamings)
            .build();
  }

  public MovieResponse map(Movie movie) {
    List<CategoryResponse> categories = movie.getCategories().stream().map(CategoryMapper::map).toList();
    List<StreamingResponse> streamings = movie.getStreamings().stream().map(StreamingMapper::map).toList();


    return MovieResponse.builder()
            .id(movie.getId())
            .title(movie.getTitle())
            .description(movie.getDescription())
            .releaseDate(movie.getReleaseDate())
            .rating(movie.getRating())
            .imageUrl(movie.getImageUrl())
            .categories(categories)
            .streamings(streamings)
            .build();
  }


}


