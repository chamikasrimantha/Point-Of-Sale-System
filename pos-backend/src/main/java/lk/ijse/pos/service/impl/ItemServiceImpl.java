package lk.ijse.pos.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.ijse.pos.dto.ItemDto;
import lk.ijse.pos.entity.CategoryEntity;
import lk.ijse.pos.entity.ItemEntity;
import lk.ijse.pos.entity.StockEntity;
import lk.ijse.pos.repository.CategoryRepository;
import lk.ijse.pos.repository.ItemRepository;
import lk.ijse.pos.repository.StockRepository;
import lk.ijse.pos.service.ItemService;

@Service
public class ItemServiceImpl implements ItemService{

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private StockRepository stockRepository;

    @Override
    public ItemEntity createItem(ItemDto itemDto) {
        CategoryEntity categoryEntity = categoryRepository.findById(itemDto.getCategoryId()).orElse(null);
        StockEntity stockEntity = stockRepository.findById(itemDto.getStockId()).orElse(null);
        if (categoryEntity!=null && stockEntity!=null) {
            ItemEntity itemEntity = new ItemEntity();
            itemEntity.setName(itemDto.getName());
            itemEntity.setPrice(itemDto.getPrice());
            itemEntity.setCategoryEntity(categoryEntity);
            itemEntity.setStockEntity(stockEntity);
            return itemRepository.save(itemEntity);
        } else {
            return null;
        }
    }

    @Override
    public List<ItemEntity> getAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public ItemEntity getItemById(Long id) {
        return itemRepository.findById(id).orElse(null);
    }

    @Override
    public List<ItemEntity> getItemsByCategory(Long id) {
        CategoryEntity categoryEntity = categoryRepository.findById(id).orElse(null);
        if (categoryEntity!=null) {
            return itemRepository.findItemsByCategory(categoryEntity);
        } else {
            return null;
        }
    }

    @Override
    public ItemEntity updateItem(Long id, ItemEntity itemEntity) {
        ItemEntity existingItem = itemRepository.findById(id).orElse(null);
        if (existingItem!=null) {
            existingItem.setName(itemEntity.getName());
            existingItem.setPrice(itemEntity.getPrice());
            // existingItem.setCategoryEntity(itemEntity.getCategoryEntity());
            // existingItem.setStockEntity(itemEntity.getStockEntity());
            return itemRepository.save(existingItem);
        } else {
            return null;
        }
    }

    @Override
    public ItemEntity deleteItem(Long id) {
        ItemEntity item = itemRepository.findById(id).orElse(null);
        if (item!=null) {
            itemRepository.delete(item);
            return item;
        } else {
            return null;
        }
    }
    
}