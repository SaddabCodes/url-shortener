package com.sadcodes.urlshortener.controller;

import com.sadcodes.urlshortener.dto.ClickEventDto;
import com.sadcodes.urlshortener.dto.UrlMappingDTO;
import com.sadcodes.urlshortener.model.User;
import com.sadcodes.urlshortener.services.UrlMappingService;
import com.sadcodes.urlshortener.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@RequiredArgsConstructor
public class UrlMappingController {

    private final UrlMappingService urlMappingService;
    private final UserService userService;

    // {"originalUrl":"https://example.com}
    @PostMapping("/shorted")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMappingDTO> createShortUrl(@RequestBody Map<String, String> request, Principal principal) {
        String originalUrl = request.get("originalUrl");
        User user = userService.findByUsername(principal.getName());
        UrlMappingDTO urlMappingDTO = urlMappingService.createShortUrl(originalUrl, user);
        return ResponseEntity.ok(urlMappingDTO);

    }

    @GetMapping("/myurls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDTO>> getUserUrls(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        List<UrlMappingDTO> urls = urlMappingService.getUrlsByUser(user);
        return ResponseEntity.ok(urls);
    }

    @GetMapping("/analyttics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventDto>> getUrlAnalytics(@PathVariable String shortUrl, @RequestParam("startData") String startDate,
                                                               @RequestParam("endDate") String endDate) {

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);
       List<ClickEventDto> clickEventDtos= urlMappingService.getClickEventsByDate(shortUrl,start,end);
        return ResponseEntity.ok(clickEventDtos);
    }

}
