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
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
        PostDto postDto = postService.createPost(postCreationDto);
        PostResponse postResponse = modelMapper.map(postDto, PostResponse.class);
        if (postResponse.getExpiredAt().isBefore(LocalDateTime.now())) {
            postResponse.setExpired(true);
        }

        return postResponse;
    }

    @GetMapping("/last")
    public List<PostResponse> getLastPosts() {
        // TODO: Refactor the duplicates
        List<PostDto> postDtos = postService.getLastPosts();
        List<PostResponse> postResponses = new ArrayList<>();
        for (PostDto postDto: postDtos) {
            PostResponse postResponse = modelMapper.map(postDto, PostResponse.class);
            if (postResponse.getExpiredAt().isBefore(LocalDateTime.now())) {
                postResponse.setExpired(true);
            }
            postResponses.add(postResponse);
        }

        return postResponses;
    }

}
