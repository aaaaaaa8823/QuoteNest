package com.cherry.quotenest.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CurrentUserResponse {
    private Long id;
    private String username;
    private String email;
}
