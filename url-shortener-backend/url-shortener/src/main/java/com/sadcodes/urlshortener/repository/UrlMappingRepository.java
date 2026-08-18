package com.sadcodes.urlshortener.repository;

import com.sadcodes.urlshortener.model.UrlMapping;
import com.sadcodes.urlshortener.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UrlMappingRepository extends JpaRepository<UrlMapping,Long> {
    UrlMapping findByShortUrl(String shortUrl);

    List<UrlMapping> findByUser(User user);
}
