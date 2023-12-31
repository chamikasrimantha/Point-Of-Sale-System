package lk.ijse.pos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lk.ijse.pos.entity.StockEntity;

@Repository
public interface StockRepository extends JpaRepository<StockEntity, Long>{
    
}