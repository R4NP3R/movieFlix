package com.movieflix.controller;

import com.movieflix.controller.request.CategoryRequest;
import com.movieflix.controller.response.CategoryResponse;
import com.movieflix.controller.swagger.CategorySwagger;
import com.movieflix.entity.Category;
import com.movieflix.mapper.CategoryMapper;
import com.movieflix.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/movieflix/category")
@RequiredArgsConstructor
public class CategoryController implements CategorySwagger {

  private final CategoryService categoryService;

  @PostMapping
  public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody CategoryRequest request) {
    CategoryResponse newCategory = CategoryMapper.map(categoryService.saveCategory(request));

    return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
  }

  @GetMapping("/{id}")
  public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Long id) {
    return categoryService.getCategoryById(id)
            .map(c -> ResponseEntity.ok(CategoryMapper.map(c)))
            .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping
  public ResponseEntity<List<CategoryResponse>> listAllCategories() {
    List<CategoryResponse> categories = new ArrayList<>();
    categoryService.listAllCategory().forEach(category -> categories.add(CategoryMapper.map(category)));

    return ResponseEntity.ok(categories);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCategoryById(@PathVariable Long id) {
    Optional<Category> optCategory = categoryService.getCategoryById(id);

    if(optCategory.isPresent()) {
      categoryService.deleteCategoryById(id);

      return ResponseEntity.noContent().build();
    }

    return ResponseEntity.notFound().build();
  }


}
