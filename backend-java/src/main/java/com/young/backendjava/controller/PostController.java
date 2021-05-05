package com.young.backendjava.controller;

import com.young.backendjava.model.request.PostCreationRequestModel;
import com.young.backendjava.model.response.PostResponse;
import com.young.backendjava.service.PostService;
import com.young.backendjava.shared.dto.PostCreationDto;
import com.young.backendjava.shared.dto.PostDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

    private final ModelMapper modelMapper;
    private final PostService postService;

    @PostMapping
    public PostResponse createPost(@RequestBody PostCreationRequestModel postRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getPrincipal().toString();
        PostCreationDto postCreationDto = modelMapper.map(postRequest, PostCreationDto.class);
        postCreationDto.setUserEmail(email);
        PostDto postToReturn = postService.createPost(postCreationDto);
        return modelMapper.map(postToReturn, PostResponse.class);
    }
}
