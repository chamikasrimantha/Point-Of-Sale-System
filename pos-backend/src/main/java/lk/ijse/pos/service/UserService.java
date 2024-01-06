package lk.ijse.pos.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lk.ijse.pos.dto.UserPwdDto;
import lk.ijse.pos.entity.UserEntity;

@Service
public interface UserService {
    UserEntity createUser(UserEntity userEntity);
    UserEntity getUserById(Long id);
    List<UserEntity> getAllUsers();
    UserEntity changeUserPassword(Long id, UserPwdDto userPwdDto);
}