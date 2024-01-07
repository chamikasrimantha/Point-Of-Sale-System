package lk.ijse.pos.service.impl;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.ijse.pos.dto.CheckoutDto;
import lk.ijse.pos.entity.CheckoutEntity;
import lk.ijse.pos.entity.ItemEntity;
import lk.ijse.pos.entity.StockEntity;
import lk.ijse.pos.repository.CheckoutRepository;
import lk.ijse.pos.repository.ItemRepository;
import lk.ijse.pos.repository.StockRepository;
import lk.ijse.pos.service.CheckoutService;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private StockRepository stockRepository;

    // @Override
    // public CheckoutEntity createCheckout(CheckoutDto checkoutDto) {
    // List<Long> itemIds = checkoutDto.getItems();
    // Set<ItemEntity> items = new HashSet<>();
    // Double total = 0.0;
    // for (Long itemId : itemIds) {
    // ItemEntity item = itemRepository.findById(itemId).orElse(null);
    // if (item != null) {
    // items.add(item);
    // total = total + item.getPrice();
    // itemRepository.save(item);
    // }
    // }
    // LocalDateTime dateTime = LocalDateTime.now();
    // CheckoutEntity checkout = new CheckoutEntity();
    // checkout.setTotal(total);
    // checkout.setOrderTime(dateTime);
    // checkout.setItems(items);
    // return checkoutRepository.save(checkout);
    // }

    @Override
    public CheckoutEntity createCheckout(CheckoutDto checkoutDto) {
        List<Long> itemIds = checkoutDto.getItems();
        Set<ItemEntity> items = new HashSet<>();
        Double total = 0.0;

        for (Long itemId : itemIds) {
            ItemEntity item = itemRepository.findById(itemId).orElse(null);
            if (item != null) {
                items.add(item);
                total += item.getPrice();
                StockEntity stock = item.getStockEntity(); // Assuming ItemEntity has a reference to its stock
                if (stock != null) {
                    int currentQty = stock.getQty();
                    if (currentQty > 0) {
                        stock.setQty(currentQty - 1);
                        stockRepository.save(stock); // Update the stock count in the database
                    } else {
                        // Handle out-of-stock scenario
                        throw new RuntimeException("Item out of stock: " + item.getName());
                    }
                }
            }
        }

        LocalDateTime dateTime = LocalDateTime.now();
        CheckoutEntity checkout = new CheckoutEntity();
        checkout.setTotal(total);
        checkout.setOrderTime(dateTime);

        // Set items after verifying to prevent duplicates
        Set<ItemEntity> uniqueItems = checkout.getItems();
        uniqueItems.addAll(items); // Add items to the uniqueItems set
        checkout.setItems(uniqueItems);

        return checkoutRepository.save(checkout);
    }

    @Override
    public List<CheckoutEntity> getAllCheckouts() {
        return checkoutRepository.findAll();
    }

    @Override
    public CheckoutEntity getCheckoutById(Long id) {
        return checkoutRepository.findById(id).orElse(null);
    }

    @Override
    public CheckoutEntity deleteCheckout(Long id) {
        CheckoutEntity checkout = checkoutRepository.findById(id).orElse(null);
        if (checkout!=null) {
            checkoutRepository.delete(checkout);
            return checkout;
        } else {
            return null;
        }
    }

}