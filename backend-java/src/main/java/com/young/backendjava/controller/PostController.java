package com.young.backendjava.controller;

import com.young.backendjava.model.request.PostCreationRequestModel;
import com.young.backendjava.model.response.GenericResponse;
import com.young.backendjava.model.response.PostResponse;
import com.young.backendjava.service.PostService;
import com.young.backendjava.service.UserService;
import com.young.backendjava.shared.dto.PostCreationDto;
import com.young.backendjava.shared.dto.PostDto;
import com.young.backendjava.shared.dto.UserDto;
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
    private final UserService userService;

    @PostMapping
    public PostResponse createPost(@RequestBody PostCreationRequestModel postRequest) {
        String email = getEmailFromLoggedInUser();
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

    @GetMapping("/{id}")
    public PostResponse getPost(@PathVariable String id) {
        PostDto postDto = postService.getPost(id);
        PostResponse postResponse = modelMapper.map(postDto, PostResponse.class);
        if (postResponse.getExpiredAt().isBefore(LocalDateTime.now())) {
            postResponse.setExpired(true);
        }

        if (postResponse.getExposure().getId() == 2L || postResponse.isExpired()) {
            String email = getEmailFromLoggedInUser();
            UserDto userDto = userService.getUser(email);
            if (userDto.getId() != postDto.getUser().getId()) {
                throw new RuntimeException("접근 권한이 없거나 만료되었습니다.");
            }
        }

        return postResponse;
    }

    @DeleteMapping("/{id}")
    public GenericResponse deletePost(@PathVariable String id) {
        String email = getEmailFromLoggedInUser();
        UserDto userDto = userService.getUser(email);
        GenericResponse genericResponse = new GenericResponse();
        genericResponse.setName("DELETE");
        postService.deletePost(id, userDto.getId());
        genericResponse.setResult("SUCCESS");
        return genericResponse;
    }

    private String getEmailFromLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getPrincipal().toString();
    }

}
