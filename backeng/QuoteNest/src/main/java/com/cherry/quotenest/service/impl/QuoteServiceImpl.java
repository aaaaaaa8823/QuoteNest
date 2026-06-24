package com.cherry.quotenest.service.impl;

import com.cherry.quotenest.dto.request.QuoteRequest;
import com.cherry.quotenest.mapper.QuoteMapper;
import com.cherry.quotenest.dto.response.QuoteResponse;
import com.cherry.quotenest.model.Quote;
import com.cherry.quotenest.model.User;
import com.cherry.quotenest.repository.QuoteRepository;
import com.cherry.quotenest.repository.UserRepository;
import com.cherry.quotenest.service.QuoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class QuoteServiceImpl implements QuoteService {

    private final QuoteRepository quoteRepository;
    private final QuoteMapper quoteMapper;
    private final UserRepository userRepository;

    @Override
    public QuoteResponse createQuote(QuoteRequest request) {
        Quote quote = quoteMapper.toEntity(request);
        User currentUser = getCurrentUser();
        quote.setCreatedBy(currentUser);

        Quote savedQuote = quoteRepository.save(quote);
        return quoteMapper.toResponse(savedQuote);
    }

    @Override
    public QuoteResponse getQuoteById(Long id) {
        Quote quote = quoteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quote not found with id: " + id));

        return quoteMapper.toResponse(quote);
    }

    @Override
    public List<QuoteResponse> getAllQuotes() {
        return quoteRepository.findAll().stream()
                .map(quoteMapper::toResponse)
                .toList();
    }

    @Override
    public QuoteResponse updateQuote(Long id, QuoteRequest request) {
        Quote quote = quoteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quote not found with id: " + id));

        quoteMapper.updateQuoteFromRequest(request, quote);

        Quote updatedQuote = quoteRepository.save(quote);
        return quoteMapper.toResponse(updatedQuote);
    }

    @Override
    public void deleteQuote(Long id) {
        User currentUser = getCurrentUser();
        Quote quote = quoteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quote not found with id: " + id));

        if (quote.getCreatedBy() == null || !quote.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You can only delete your own quotes");
        }

        quoteRepository.deleteById(id);
    }

    @Override
    public void saveQuote(Long id) {
        User currentUser = getCurrentUser();
        Quote quote = quoteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quote not found with id: " + id));

        // Добавляем цитату в сохраненные
        currentUser.getSavedQuotes().add(quote);
        userRepository.save(currentUser);
    }

    @Override
    public void unsaveQuote(Long id) {
        User currentUser = getCurrentUser();
        Quote quote = quoteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quote not found with id: " + id));

        currentUser.getSavedQuotes().remove(quote);
        userRepository.save(currentUser);
    }

    @Override
    public List<QuoteResponse> getSavedQuotes() {
        User currentUser = getCurrentUser();
        return currentUser.getSavedQuotes().stream()
                .map(quoteMapper::toResponse)
                .toList();
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
    @Override
    public List<QuoteResponse> getMyQuotes() {
        User currentUser = getCurrentUser();
        return quoteRepository.findByCreatedBy(currentUser).stream()
                .map(quoteMapper::toResponse)
                .toList();
    }
}
