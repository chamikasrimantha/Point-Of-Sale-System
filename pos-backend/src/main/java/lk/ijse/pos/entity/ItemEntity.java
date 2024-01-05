package lk.ijse.pos.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Data
@Table(name = "item")
public class ItemEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "itemId")
    private Long id;

    @Column(nullable = false)
    private String name;

    private Double price;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    private CategoryEntity categoryEntity;

    @ManyToOne
    @JoinColumn(name = "stockId")
    private StockEntity stockEntity;

    @JsonIgnore
    @ManyToMany(mappedBy = "items")
    private Set<CheckoutEntity> checkouts = new HashSet<>();
}