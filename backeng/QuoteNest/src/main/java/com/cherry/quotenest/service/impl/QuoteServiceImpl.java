package com.cherry.quotenest.service.impl;

import com.cherry.quotenest.dto.request.QuoteRequest;
import com.cherry.quotenest.mapper.QuoteMapper;
import com.cherry.quotenest.dto.response.QuoteResponse;
import com.cherry.quotenest.model.Quote;
import com.cherry.quotenest.repository.QuoteRepository;
import com.cherry.quotenest.service.QuoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuoteServiceImpl implements QuoteService {

    private final QuoteRepository quoteRepository;
    private final QuoteMapper quoteMapper;

    @Override
    public QuoteResponse createQuote(QuoteRequest request) {
        Quote quote = quoteMapper.toEntity(request);
        // createdBy привяжем позже, когда добавим Security
        //СПРОСИТЬ НАСЧЕТ ЭТОГО

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
        if (!quoteRepository.existsById(id)) {
            throw new RuntimeException("Quote not found with id: " + id);
        }
        quoteRepository.deleteById(id);
    }
}
