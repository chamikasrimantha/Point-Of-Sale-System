package lk.ijse.pos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lk.ijse.pos.entity.CategoryEntity;
import lk.ijse.pos.service.CategoryService;

@RestController
@CrossOrigin(origins = "*")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public List<CategoryEntity> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @PostMapping("/categories")
    public CategoryEntity createCategory(@RequestBody CategoryEntity categoryEntity){
        return categoryService.createCategory(categoryEntity);
    }

    @GetMapping("/categories/{id}")
    public CategoryEntity getCategoryById(@PathVariable Long id){
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/categories/{id}")
    public CategoryEntity updateCategory(@PathVariable Long id, @RequestBody CategoryEntity categoryEntity){
        return categoryService.updateCategory(id, categoryEntity);
    }

    @DeleteMapping("/categories/{id}")
    public CategoryEntity deleteCategory(@PathVariable Long id){
        return categoryService.deleteCategory(id);
    }

}