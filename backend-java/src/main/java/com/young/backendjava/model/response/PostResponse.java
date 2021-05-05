package com.young.backendjava.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {

    private String postId;
    private String title;
    private String content;
    private LocalDateTime expiredAt;
    private LocalDateTime createdAt;
    private boolean expired = false;
    private UserResponse user;
    private ExposureResponse exposure;
}
