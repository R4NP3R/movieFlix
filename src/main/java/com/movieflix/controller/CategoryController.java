package com.movieflix.controller;

import com.movieflix.controller.request.CategoryRequest;
import com.movieflix.controller.response.CategoryResponse;
import com.movieflix.mapper.CategoryMapper;
import com.movieflix.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movieflix/category")
@RequiredArgsConstructor
public class CategoryController {

  private final CategoryService categoryService;

  @PostMapping
  public ResponseEntity<CategoryResponse> createCategory(@RequestBody CategoryRequest request) {
    CategoryResponse newCategory = CategoryMapper.map(categoryService.saveCategory(request));

    return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);

  }



}
