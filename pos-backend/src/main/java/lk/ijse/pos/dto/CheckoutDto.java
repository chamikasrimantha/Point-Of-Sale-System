package lk.ijse.pos.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckoutDto {
    List<Long> items;
}