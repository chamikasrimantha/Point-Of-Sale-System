package lk.ijse.pos.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lk.ijse.pos.entity.CategoryEntity;

@Service
public interface CategoryService {
    CategoryEntity createCategory(CategoryEntity categoryEntity);
    CategoryEntity getCategoryById(Long id);
    List<CategoryEntity> getAllCategories();
    CategoryEntity updateCategory(Long id, CategoryEntity categoryEntity);
    CategoryEntity deleteCategory(Long id);
}