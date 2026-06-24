package com.cherry.quotenest.service;

import com.cherry.quotenest.dto.request.QuoteRequest;
import com.cherry.quotenest.dto.response.QuoteResponse;
import java.util.List;

public interface QuoteService {
    QuoteResponse createQuote(QuoteRequest request);
    QuoteResponse getQuoteById(Long id);
    List<QuoteResponse> getAllQuotes();
    QuoteResponse updateQuote(Long id, QuoteRequest request);
    void deleteQuote(Long id);
    void saveQuote(Long id);
    void unsaveQuote(Long id);
    List<QuoteResponse> getMyQuotes();
    List<QuoteResponse> getSavedQuotes();
}
