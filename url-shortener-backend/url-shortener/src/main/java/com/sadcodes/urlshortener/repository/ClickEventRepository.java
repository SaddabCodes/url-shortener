package com.sadcodes.urlshortener.repository;

import com.sadcodes.urlshortener.model.ClickEvent;
import com.sadcodes.urlshortener.model.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ClickEventRepository extends JpaRepository<ClickEvent,Long> {

    List<ClickEvent> findByUrlMappingAndClickDateBetween(UrlMapping mapping, LocalDateTime startData, LocalDateTime endDate);
    List<ClickEvent> findByUrlMappingInAndClickDateBetween(List<UrlMapping> urlMappings, LocalDateTime startData, LocalDateTime endDate);

}
