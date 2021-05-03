package com.young.backendjava.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsRequestModel {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
