package com.cherry.quotenest.mapper;

import com.cherry.quotenest.dto.request.QuoteRequest;
import com.cherry.quotenest.dto.response.QuoteResponse;
import com.cherry.quotenest.model.Quote;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface QuoteMapper {

    Quote toEntity(QuoteRequest request);

    @Mapping(target = "createdById", source = "createdBy.id")
    @Mapping(target = "createdByUsername", source = "createdBy.username")
    QuoteResponse toResponse(Quote quote);


    void updateQuoteFromRequest(QuoteRequest request, @MappingTarget Quote quote);
}
