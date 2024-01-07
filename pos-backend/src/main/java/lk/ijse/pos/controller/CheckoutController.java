package lk.ijse.pos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lk.ijse.pos.dto.CheckoutDto;
import lk.ijse.pos.entity.CheckoutEntity;
import lk.ijse.pos.service.CheckoutService;

@RestController
@CrossOrigin(origins = "*")
public class CheckoutController {
    
    @Autowired
    private CheckoutService checkoutService;

    @GetMapping("/checkouts")
    public ResponseEntity<List<CheckoutEntity>> getAllCheckouts(){
        return ResponseEntity.status(200).body(checkoutService.getAllCheckouts());
    }

    @GetMapping("/checkouts/{id}")
    public ResponseEntity<CheckoutEntity> getCheckoutById(@PathVariable Long id){
        CheckoutEntity checkoutEntity = checkoutService.getCheckoutById(id);
        if (checkoutEntity!=null) {
            return ResponseEntity.status(200).body(checkoutEntity);
        } else {
            return ResponseEntity.status(400).body(null);
        }
    }

    @PostMapping("/checkouts")
    public ResponseEntity<CheckoutEntity> createCheckout(@RequestBody CheckoutDto checkoutDto){
        CheckoutEntity checkoutEntity = checkoutService.createCheckout(checkoutDto);
        return ResponseEntity.status(200).body(checkoutEntity);
    }

    @DeleteMapping("/checkouts/{id}")
    public CheckoutEntity deleteCheckout(@PathVariable Long id){
        return checkoutService.deleteCheckout(id);
    }
}