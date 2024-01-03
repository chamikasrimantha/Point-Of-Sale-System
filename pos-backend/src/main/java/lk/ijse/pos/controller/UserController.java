package lk.ijse.pos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lk.ijse.pos.dto.UserPwdDto;
import lk.ijse.pos.entity.UserEntity;
import lk.ijse.pos.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<UserEntity> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/users")
    public UserEntity createUser(@RequestBody UserEntity userEntity){
        return userService.createUser(userEntity);
    }

    @GetMapping("/users/{id}")
    public UserEntity getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @PutMapping("/users/{id}/change-password")
    public ResponseEntity<UserEntity> changeUserPassword(@PathVariable Long id, @RequestBody UserPwdDto userPwdDto){
        return ResponseEntity.ok().body(userService.changeUserPassword(id, userPwdDto));
    }

}