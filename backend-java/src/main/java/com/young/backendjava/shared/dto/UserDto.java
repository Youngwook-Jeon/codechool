package com.young.backendjava.shared.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String encodedPassword;
    private List<PostDto> posts;
}
