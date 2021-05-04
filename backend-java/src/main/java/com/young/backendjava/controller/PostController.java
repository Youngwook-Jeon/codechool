package com.young.backendjava.controller;

import com.young.backendjava.model.request.PostCreationRequestModel;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
public class PostController {

    @PostMapping
    public String createPost(@RequestBody PostCreationRequestModel postRequest) {
        return postRequest.getTitle();
    }
}
