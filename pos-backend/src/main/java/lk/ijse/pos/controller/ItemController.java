package lk.ijse.pos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lk.ijse.pos.dto.ItemDto;
import lk.ijse.pos.entity.ItemEntity;
import lk.ijse.pos.service.ItemService;

@RestController
@CrossOrigin(origins ="*")
public class ItemController {
    
    @Autowired
    private ItemService itemService;

    @GetMapping("/items")
    public ResponseEntity<List<ItemEntity>> getAllItems(){
        List<ItemEntity> itemEntities = itemService.getAllItems();
        if (itemEntities!=null) {
            return ResponseEntity.status(200).body(itemEntities);
        } else {
            return ResponseEntity.status(400).body(null);
        }
    }

    @PostMapping("/items")
    public ResponseEntity<ItemEntity> createItem(@RequestBody ItemDto itemDto){
        try {
            return ResponseEntity.status(200).body(itemService.createItem(itemDto));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<ItemEntity> getItemById(@PathVariable Long id){
        ItemEntity itemEntity = itemService.getItemById(id);
        if (itemEntity!=null) {
            return ResponseEntity.status(HttpStatus.OK).body(itemEntity);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/items/{id}")
    public ItemEntity updateItem(@PathVariable Long id, @RequestBody ItemEntity itemEntity){
        return itemService.updateItem(id, itemEntity);
    }

    @GetMapping("/categories/{id}/items")
    public ResponseEntity<List<ItemEntity>> getItemsByCategory(@PathVariable Long id){
        return ResponseEntity.ok().body(itemService.getItemsByCategory(id));
    }

    @DeleteMapping("/items/{id}")
    public ItemEntity deleteCategory(@PathVariable Long id){
        return itemService.deleteItem(id);
    }

}