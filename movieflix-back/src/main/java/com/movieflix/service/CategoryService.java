package com.movieflix.service;


import com.movieflix.controller.request.CategoryRequest;
import com.movieflix.entity.Category;
import com.movieflix.exceptions.HandleExistsException;
import com.movieflix.mapper.CategoryMapper;
import com.movieflix.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

  private final CategoryRepository categoryRepository;

  public Category saveCategory(CategoryRequest request) {
    validateCategoryDoesNotExists(request.name());
    Category newCategory = CategoryMapper.map(request);

    return categoryRepository.save(newCategory);
  }

  public Optional<Category> getCategoryById (Long id) {
    return categoryRepository.findById(id);
  }

  public List<Category> listAllCategory () {
    return categoryRepository.findAll();
  }

  public void deleteCategoryById (Long id) {
    categoryRepository.deleteById(id);
  }

  private void validateCategoryDoesNotExists (String name) {
    categoryRepository.findByName(name).ifPresent(category -> {
      throw new HandleExistsException("Already Exists Category with this name!");
    });
  }


}
