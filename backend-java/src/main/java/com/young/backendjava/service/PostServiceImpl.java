package com.young.backendjava.service;

import com.young.backendjava.domain.ExposureEntity;
import com.young.backendjava.domain.PostEntity;
import com.young.backendjava.domain.UserEntity;
import com.young.backendjava.repository.ExposureRepository;
import com.young.backendjava.repository.PostRepository;
import com.young.backendjava.repository.UserRepository;
import com.young.backendjava.shared.dto.PostCreationDto;
import com.young.backendjava.shared.dto.PostDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ExposureRepository exposureRepository;
    private final ModelMapper modelMapper;

    @Override
    public PostDto createPost(PostCreationDto post) {
        UserEntity userInDb = userRepository.findByEmail(post.getUserEmail());
        ExposureEntity exposureInDb = exposureRepository.findById(post.getExposureId());
        PostEntity postEntity = PostEntity.builder()
                .user(userInDb)
                .exposure(exposureInDb)
                .title(post.getTitle())
                .content(post.getContent())
                .postId(UUID.randomUUID().toString())
                .expiredAt(getExpirationTime(post))
                .build();
        PostEntity newPost = postRepository.save(postEntity);
        return modelMapper.map(newPost, PostDto.class);
    }

    @Override
    public List<PostDto> getLastPosts() {
        long publicExposureId = 1L;
        List<PostEntity> postEntities = postRepository
                .getLastPublicPosts(publicExposureId, LocalDateTime.now());
        List<PostDto> postDtos = new ArrayList<>();
        for (PostEntity postEntity : postEntities) {
            PostDto postDto = modelMapper.map(postEntity, PostDto.class);
            postDtos.add(postDto);
        }

        return postDtos;
    }

    @Override
    public PostDto getPost(String postId) {
        PostEntity postEntity = postRepository.findByPostId(postId);
        return modelMapper.map(postEntity, PostDto.class);
    }

    @Override
    public void deletePost(String postId, long userId) {
        PostEntity postEntity = postRepository.findByPostId(postId);

        if (postEntity.getUser().getId() != userId) {
            throw new RuntimeException("접근 권한이 없습니다.");
        }

        postEntity.getUser().removePost(postEntity);
        postEntity.getExposure().removePost(postEntity);
        postRepository.deleteById(postEntity.getId());
    }

    private LocalDateTime getExpirationTime(PostCreationDto post) {
        return LocalDateTime.now().plusMinutes(post.getExpirationTime());
    }
}
