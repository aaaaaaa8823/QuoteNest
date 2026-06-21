package com.cherry.quotenest.repository;

import com.cherry.quotenest.model.Quote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface QuoteRepository extends JpaRepository<Quote, Long>{

    //потом добавить свои методы тоже
}
