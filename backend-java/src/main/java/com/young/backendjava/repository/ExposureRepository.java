package com.young.backendjava.repository;

import com.young.backendjava.domain.ExposureEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExposureRepository extends JpaRepository<ExposureEntity, Long> {
    ExposureEntity findById(long id);
}
