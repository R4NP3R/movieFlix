package com.movieflix.service;


import com.movieflix.controller.request.CategoryRequest;
import com.movieflix.entity.Category;
import com.movieflix.mapper.CategoryMapper;
import com.movieflix.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {

  private final CategoryRepository categoryRepository;

  public Category saveCategory(CategoryRequest request) {
    Category newCategory = CategoryMapper.map(request);

    return categoryRepository.save(newCategory);
  }


}
