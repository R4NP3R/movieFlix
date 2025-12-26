package com.movieflix.mapper;

import com.movieflix.controller.request.CategoryRequest;
import com.movieflix.controller.response.CategoryResponse;
import com.movieflix.entity.Category;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CategoryMapper {

  public Category map(CategoryRequest request) {
    return Category.builder()
            .name(request.name())
            .build();
  }

  public CategoryResponse map(Category category) {
    return CategoryResponse.builder()
            .id(category.getId())
            .name(category.getName())
            .build();
  }

}
