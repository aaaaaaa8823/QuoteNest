package com.cherry.quotenest.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @CreationTimestamp
    private LocalDateTime createdAt;

    // === Связи ===

    // Цитаты, созданные этим пользователем (One-to-Many)
    @OneToMany(mappedBy = "createdBy")
    private Set<Quote> postedQuotes = new HashSet<>();

    // Цитаты, сохранённые пользователем в "Избранное" (Many-to-Many)
    @ManyToMany
    @JoinTable(
            name = "user_quotes",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "quote_id")
    )
    private Set<Quote> savedQuotes = new HashSet<>();
}