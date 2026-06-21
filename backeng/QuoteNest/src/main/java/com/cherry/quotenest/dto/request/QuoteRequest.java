package com.cherry.quotenest.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuoteRequest {
    @NotBlank(message = "Текст цитаты не может быть пустым")
    private String text;

    @NotBlank(message = "Автор обязателен")
    private String author;

    private String title;
    private String source;
}
