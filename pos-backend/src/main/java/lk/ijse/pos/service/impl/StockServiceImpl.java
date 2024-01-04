package lk.ijse.pos.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.ijse.pos.entity.ItemEntity;
import lk.ijse.pos.entity.StockEntity;
import lk.ijse.pos.repository.ItemRepository;
import lk.ijse.pos.repository.StockRepository;
import lk.ijse.pos.service.StockService;

@Service
public class StockServiceImpl implements StockService{

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public StockEntity createStock(StockEntity stockEntity) {
        return stockRepository.save(stockEntity);
    }

    @Override
    public List<StockEntity> getAllStocks() {
        return stockRepository.findAll();
    }

    @Override
    public StockEntity getStockById(Long id) {
        return stockRepository.findById(id).orElse(null);
    }

    @Override
    public List<StockEntity> getStocksByItem(Long id) {
        ItemEntity itemEntity = itemRepository.findById(id).orElse(null);
        if (itemEntity!=null) {
            return stockRepository.findStocksByItem(itemEntity);
        } else {
            return null;
        }
    }

    @Override
    public StockEntity updateStock(Long id, StockEntity stockEntity) {
        StockEntity existingStock = stockRepository.findById(id).orElse(null);
        if (existingStock!=null) {
            existingStock.setName(stockEntity.getName());
            existingStock.setQty(stockEntity.getQty());
            stockRepository.save(existingStock);
            return existingStock;
        } else {
            return null;
        }
    }

    @Override
    public StockEntity deleteStock(Long id) {
        StockEntity stock = stockRepository.findById(id).orElse(null);
        if (stock!=null) {
            stockRepository.delete(stock);
            return stock;
        } else {
            return null;
        }
    }
    
}