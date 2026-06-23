package com.cherry.quotenest.controller;

import com.cherry.quotenest.dto.request.QuoteRequest;
import com.cherry.quotenest.dto.response.QuoteResponse;
import com.cherry.quotenest.service.QuoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotes")
@RequiredArgsConstructor
public class QuoteController {
    private final QuoteService quoteService;

    @PostMapping
    public ResponseEntity<QuoteResponse> create(@RequestBody QuoteRequest request) {
        return ResponseEntity.ok(quoteService.createQuote((request)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuoteResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(quoteService.getQuoteById(id));
    }

    @GetMapping
    public ResponseEntity<List<QuoteResponse>> getAll() {
        return ResponseEntity.ok(quoteService.getAllQuotes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuoteResponse> update(@PathVariable Long id, @RequestBody QuoteRequest request) {
        return ResponseEntity.ok(quoteService.updateQuote(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        quoteService.deleteQuote(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/save")
    public ResponseEntity<Void> saveQuote(@PathVariable Long id) {
        quoteService.saveQuote(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/unsave")
    public ResponseEntity<Void> unsaveQuote(@PathVariable Long id) {
        quoteService.unsaveQuote(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/saved")
    public ResponseEntity<List<QuoteResponse>> getSavedQuotes() {
        return ResponseEntity.ok(quoteService.getSavedQuotes());
    }
}
