package com.young.backendjava.shared.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExposureDto implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String type;
    private List<PostDto> posts;
}
