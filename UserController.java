package com.example.demo.controller;

import com.example.demo.repository.model.UserEntity;
import com.example.demo.repository.model.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserInfo>> getUsers() {
        List<UserEntity> users = userRepository.findAll();
        List<UserInfo> resultUsers = new ArrayList<>();
        for (UserEntity user : users) {
            resultUsers.add(new UserInfo(user.getId(),user.getFirstName(), user.getLastName(), user.getAge()));
        }

        return ResponseEntity.ok(resultUsers);
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody UserInfo userInfo) {
        int age = Integer.parseInt(userInfo.getAge());
        if (age<0 || age>100) {
            return ResponseEntity.badRequest().body("Нет");
        }
        UserEntity user=userRepository.save(new UserEntity(userInfo.getFirstName(), userInfo.getLastName(), userInfo.getAge()));
        return ResponseEntity.ok(new UserInfo(user.getId(),user.getFirstName(), user.getLastName(), user.getAge()));
    }

    @DeleteMapping("/users")
    public ResponseEntity<Void> deleteUser() {
        userRepository.deleteAll();
        return ResponseEntity.ok().build();
    }
    @PutMapping("/users/lastname")
    public ResponseEntity<Void> updateAllLastNames(@RequestParam String lastName) {
        List<UserEntity> users = userRepository.findAll();
        for (UserEntity user : users) {
            user.setLastName(lastName);
            user.setAge("100");
        }
        userRepository.saveAll(users);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deletebyid(@PathVariable("id") Long id){
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Void> updatebyid(@PathVariable("id") Long id){
        Optional<UserEntity> users=userRepository.findById(id);
        UserEntity user=users.get();
        user.setFirstName("cwcww");
        user.setLastName("uycbweuioy");
        userRepository.save(user);
        return  ResponseEntity.ok().build();

        }
}



