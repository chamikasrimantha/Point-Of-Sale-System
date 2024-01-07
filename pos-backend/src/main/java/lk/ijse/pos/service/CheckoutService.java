package lk.ijse.pos.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lk.ijse.pos.dto.CheckoutDto;
import lk.ijse.pos.entity.CheckoutEntity;

@Service
public interface CheckoutService {
    List<CheckoutEntity> getAllCheckouts();
    CheckoutEntity getCheckoutById(Long id);
    CheckoutEntity createCheckout(CheckoutDto checkoutDto);
    CheckoutEntity deleteCheckout(Long id);
}