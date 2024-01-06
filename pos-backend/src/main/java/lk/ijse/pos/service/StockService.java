package lk.ijse.pos.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lk.ijse.pos.entity.StockEntity;

@Service
public interface StockService {
    List<StockEntity> getAllStocks();
    StockEntity createStock(StockEntity stockEntity);
    StockEntity getStockById(Long id);
    StockEntity updateStock(Long id, StockEntity stockEntity);
    List<StockEntity> getStocksByItem(Long id);
    StockEntity deleteStock(Long id);
}