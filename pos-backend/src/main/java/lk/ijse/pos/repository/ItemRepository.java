package lk.ijse.pos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import lk.ijse.pos.entity.CategoryEntity;
import lk.ijse.pos.entity.ItemEntity;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity, Long>{
    @Query("SELECT p FROM ItemEntity p WHERE p.categoryEntity = :categoryEntity")
    List<ItemEntity> findItemsByCategory(@Param("categoryEntity") CategoryEntity categoryEntity);
}