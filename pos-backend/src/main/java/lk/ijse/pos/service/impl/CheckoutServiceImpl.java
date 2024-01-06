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
import lk.ijse.pos.repository.CheckoutRepository;
import lk.ijse.pos.repository.ItemRepository;
import lk.ijse.pos.service.CheckoutService;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    @Autowired
    private CheckoutRepository checkoutRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public CheckoutEntity createCheckout(CheckoutDto checkoutDto) {
        List<Long> itemIds = checkoutDto.getItems();
        Set<ItemEntity> items = new HashSet<>();
        Double total = 0.0;
        for(Long itemId : itemIds){
            ItemEntity item = itemRepository.findById(itemId).orElse(null);
            if (item!=null) {
                items.add(item);
                total = total + item.getPrice();
                itemRepository.save(item);
            }
        }
        LocalDateTime dateTime = LocalDateTime.now();
        CheckoutEntity checkout = new CheckoutEntity();
        checkout.setTotal(total);
        checkout.setOrderTime(dateTime);
        checkout.setItems(items);
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
    
}