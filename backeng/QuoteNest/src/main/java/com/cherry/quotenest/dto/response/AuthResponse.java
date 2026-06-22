package com.cherry.quotenest.dto.response;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private String message;
    // Можно добавить user info позже
}
