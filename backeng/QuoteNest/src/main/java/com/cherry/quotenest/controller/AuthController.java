package com.cherry.quotenest.controller;

import com.cherry.quotenest.dto.request.LoginRequest;
import com.cherry.quotenest.dto.request.RegisterRequest;
import com.cherry.quotenest.dto.response.AuthResponse;
import com.cherry.quotenest.dto.response.CurrentUserResponse;
import com.cherry.quotenest.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request){
        AuthResponse response = userService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        String token = userService.login(request);

        ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofHours(24))
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new AuthResponse("Успешный вход"));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        ResponseCookie jwtCookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .build();
    }

    @GetMapping("/me")
    public ResponseEntity<CurrentUserResponse> getCurrentUser() {
        CurrentUserResponse user = userService.getCurrentUser();
        return ResponseEntity.ok(user);
    }

}
