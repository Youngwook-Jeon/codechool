package com.young.backendjava.shared.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
public class UserDto {

    private Long id;
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String encodedPassword;
}
