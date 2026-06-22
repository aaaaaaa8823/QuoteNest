package com.cherry.quotenest.service;

import com.cherry.quotenest.dto.request.LoginRequest;
import com.cherry.quotenest.dto.request.RegisterRequest;
import com.cherry.quotenest.dto.response.AuthResponse;

public interface UserService {
    AuthResponse register(RegisterRequest request);
    String login(LoginRequest request);
}