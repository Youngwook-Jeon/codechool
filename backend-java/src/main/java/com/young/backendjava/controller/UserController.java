package com.young.backendjava.controller;

import com.young.backendjava.model.request.UserDetailsRequestModel;
import com.young.backendjava.model.response.UserResponseModel;
import com.young.backendjava.service.UserService;
import com.young.backendjava.shared.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final ModelMapper modelMapper;
    private final UserService userService;

    @GetMapping
    public String getUser() {
        return "get user details";
    }

    @PostMapping
    public UserResponseModel createUser(@RequestBody UserDetailsRequestModel userDetails) {
        UserDto userDto = modelMapper.map(userDetails, UserDto.class);
        UserDto newUser = userService.createUser(userDto);
        return modelMapper.map(newUser, UserResponseModel.class);
    }
}
