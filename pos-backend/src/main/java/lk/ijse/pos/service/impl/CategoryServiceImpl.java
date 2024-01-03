package lk.ijse.pos.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.ijse.pos.entity.CategoryEntity;
import lk.ijse.pos.repository.CategoryRepository;
import lk.ijse.pos.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CategoryEntity createCategory(CategoryEntity categoryEntity) {
        return categoryRepository.save(categoryEntity);
    }

    @Override
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public CategoryEntity getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public CategoryEntity updateCategory(Long id, CategoryEntity categoryEntity) {
        CategoryEntity existCategory = categoryRepository.findById(id).orElse(null);
        if (existCategory!=null) {
            existCategory.setName(categoryEntity.getName());
            categoryRepository.save(existCategory);
            return existCategory;
        } else {
            return null;
        }
    }

    @Override
    public CategoryEntity deleteCategory(Long id) {
        CategoryEntity category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            categoryRepository.delete(category);
            return category;
        }
        return null;
    }
    
}