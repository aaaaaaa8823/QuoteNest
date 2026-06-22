package com.cherry.quotenest.service.impl;

import com.cherry.quotenest.model.User;
import com.cherry.quotenest.repository.UserRepository;
import com.cherry.quotenest.security.JwtService;
import com.cherry.quotenest.dto.request.LoginRequest;
import com.cherry.quotenest.dto.request.RegisterRequest;
import com.cherry.quotenest.dto.response.AuthResponse;
import com.cherry.quotenest.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private  final UserRepository userRepository;
    private  final PasswordEncoder passwordEncoder;
    private final  JwtService jwtService;

    @Override
    public AuthResponse register(RegisterRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException(("Пользователь с таким email уже существует"));
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Пользователь с таким username уже существует");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return new AuthResponse("Пользователь успешно зарегистрирован");
    }

    @Override
    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Неверные данные"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Неверные данные");
        }

        return jwtService.generateToken(user.getEmail());
    }
}
