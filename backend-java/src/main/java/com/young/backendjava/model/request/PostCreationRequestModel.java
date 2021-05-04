package com.young.backendjava.model.request;

import lombok.Data;

@Data
public class PostCreationRequestModel {

    private String title;
    private String content;
    private Long exposureId;
    private Integer expirationTime;
}
