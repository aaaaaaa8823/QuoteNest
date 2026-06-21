package com.cherry.quotenest.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuoteResponse {
    private Long id;
    private String text;
    private String author;
    private String source;
    private Long createdById;
    private LocalDateTime createdAt;
}
