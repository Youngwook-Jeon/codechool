package com.young.backendjava.shared.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDto implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String postId;
    private String title;
    private String content;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;
    private UserDto user;
    private ExposureDto exposure;
}
