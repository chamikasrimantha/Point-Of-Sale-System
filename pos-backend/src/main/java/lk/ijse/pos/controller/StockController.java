package lk.ijse.pos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lk.ijse.pos.entity.StockEntity;
import lk.ijse.pos.service.StockService;

@RestController
@CrossOrigin(origins = "*")
public class StockController {
    
    @Autowired
    private StockService stockService;

    @GetMapping("/stocks")
    public List<StockEntity> getAllStocks(){
        return stockService.getAllStocks();
    }

    @PostMapping("/stocks")
    public StockEntity createStock(@RequestBody StockEntity stockEntity){
        return stockService.createStock(stockEntity);
    }

    @GetMapping("/stocks/{id}")
    public StockEntity getStockById(@PathVariable Long id){
        return stockService.getStockById(id);
    }

    @PutMapping("/stocks/{id}")
    public StockEntity updateStock(@PathVariable Long id,@RequestBody StockEntity stockEntity){
        return stockService.updateStock(id, stockEntity);
    }

    @GetMapping("/items/{id}/stocks")
    public ResponseEntity<List<StockEntity>> getStocksByItem(@PathVariable Long id){
        return ResponseEntity.ok().body(stockService.getStocksByItem(id));
    }

    @DeleteMapping("/stocks/{id}")
    public StockEntity deleteStock(@PathVariable Long id){
        return stockService.deleteStock(id);
    }
}