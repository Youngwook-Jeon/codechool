package com.young.backendjava.service;

import com.young.backendjava.shared.dto.PostCreationDto;
import com.young.backendjava.shared.dto.PostDto;

public interface PostService {
    PostDto createPost(PostCreationDto post);
}
