package lk.ijse.pos.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lk.ijse.pos.dto.ItemDto;
import lk.ijse.pos.entity.ItemEntity;

@Service
public interface ItemService {
    List<ItemEntity> getAllItems();
    ItemEntity createItem(ItemDto itemDto);
    ItemEntity getItemById(Long id);
    ItemEntity updateItem(Long id, ItemEntity itemEntity);
    List<ItemEntity> getItemsByCategory(Long id);
    ItemEntity deleteItem(Long id);
}