package com.young.backendjava.controller;

import com.young.backendjava.model.request.UserDetailsRequestModel;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping
    public String getUser() {
        return "get user details";
    }

    @PostMapping
    public String createUser(@RequestBody UserDetailsRequestModel userDetails) {
        return "create new user";
    }
}
