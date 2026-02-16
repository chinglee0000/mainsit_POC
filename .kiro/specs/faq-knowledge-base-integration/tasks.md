# Implementation Plan: FAQ Knowledge Base Integration

## Overview

This implementation plan breaks down the FAQ knowledge base integration into incremental, testable steps. Each task builds on previous work, starting with data models and parsing, then building the knowledge base and matching system, integrating with the Gemini service, and finally adding analytics. The approach ensures that core functionality is validated early through code and tests.

## Tasks

- [ ] 1. Create FAQ data models and type definitions
  - Create `src/types/faq.ts` with FAQEntry, AudienceType, FAQCategory interfaces
  - Define SearchOptions, FAQSearchResult, and FAQCitation types
  - Add RawCSVRow interface matching the CSV structure
  - _Requirements: 1.2, 2.1_

- [ ] 2. Implement CSV parser service
  - [ ] 2.1 Create `src/services/csvParser.ts` with parseCSV function
    - Implement CSV file reading using fetch API
    - Parse CSV rows into RawCSVRow objects
    - Transform raw rows into FAQEntry objects
    - Handle bilingual content extraction (Chinese and English columns)
    - Implement keyword extraction from description and value fields
    - Map Chinese audience labels to AudienceType enum values
    - _Requirements: 1.1, 1.2, 1.3, 1.5_
  
  - [ ]* 2.2 Write property test for CSV parsing field extraction
    - **Property 1: CSV Parsing Field Extraction**
    - **Validates: Requirements 1.2, 1.5**
  
  - [ ]* 2.3 Write property test for bilingual content preservation
    - **Property 2: Bilingual Content Preservation**
    - **Validates: Requirements 1.3**
  
  - [ ]* 2.4 Write unit tests for CSV parser edge cases
    - Test empty CSV file handling
    - Test malformed CSV rows (missing columns)
    - Test file not found error handling
    - _Requirements: 1.4_

- [ ] 3. Implement knowledge base service
  - [ ] 3.1 Create `src/services/knowledgeBase.ts` with KnowledgeBase class
    - Implement Map-based storage for FAQ entries indexed by ID
    - Build category index (Map<FAQCategory, Set<string>>)
    - Build audience index (Map<AudienceType, Set<string>>)
    - Build keyword inverted index (Map<string, Set<string>>)
    - Implement initialize() method to populate indices
    - Implement getById() method for ID-based retrieval
    - Implement filterByCategory() method
    - Implement filterByAudience() method
    - Implement getAll() method
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  
  - [ ]* 3.2 Write property test for knowledge base retrieval consistency
    - **Property 3: Knowledge Base Retrieval Consistency**
    - **Validates: Requirements 2.1, 6.3**
  
  - [ ]* 3.3 Write property test for filter result correctness
    - **Property 4: Filter Result Correctness**
    - **Validates: Requirements 2.2, 2.3**
  
  - [ ]* 3.4 Write property test for hierarchical relationship integrity
    - **Property 5: Hierarchical Relationship Integrity**
    - **Validates: Requirements 2.4**

- [ ] 4. Implement semantic matching service
  - [ ] 4.1 Create `src/services/semanticMatcher.ts` with SemanticMatcher class
    - Implement tokenize() method for Chinese and English text
    - Implement computeTermFrequency() for TF calculation
    - Build IDF scores from FAQ corpus during initialization
    - Implement computeTFIDF() to generate TF-IDF vectors
    - Implement cosineSimilarity() for vector comparison
    - Implement computeSimilarity() as main public API
    - _Requirements: 3.2_
  
  - [ ]* 4.2 Write property test for similarity score bounds
    - **Property 7: Similarity Score Bounds**
    - **Validates: Requirements 3.2**
  
  - [ ]* 4.3 Write unit tests for tokenization
    - Test pure Chinese text tokenization
    - Test pure English text tokenization
    - Test mixed Chinese-English text tokenization
    - _Requirements: 3.4_

- [ ] 5. Implement FAQ matcher service
  - [ ] 5.1 Create `src/services/faqMatcher.ts` with FAQMatcher class
    - Implement detectLanguage() using character set analysis
    - Implement match() method as main entry point
    - Integrate SemanticMatcher for similarity computation
    - Implement score threshold filtering (0.6 minimum)
    - Implement result ranking by score (descending)
    - Implement applyContextBoost() for audience-specific boosting
    - Add conversation history keyword extraction for additional boosting
    - _Requirements: 3.1, 3.3, 3.4, 3.5, 3.6, 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [ ]* 5.2 Write property test for search result ranking order
    - **Property 6: Search Result Ranking Order**
    - **Validates: Requirements 2.5, 3.3**
  
  - [ ]* 5.3 Write property test for score threshold filtering
    - **Property 8: Score Threshold Filtering**
    - **Validates: Requirements 3.5**
  
  - [ ]* 5.4 Write property test for context-based score boosting
    - **Property 9: Context-Based Score Boosting**
    - **Validates: Requirements 7.1, 7.2**
  
  - [ ]* 5.5 Write property test for general FAQ inclusion
    - **Property 10: General FAQ Inclusion**
    - **Validates: Requirements 7.4**
  
  - [ ]* 5.6 Write property test for language detection determinism
    - **Property 12: Language Detection Determinism**
    - **Validates: Requirements 5.4**

- [ ] 6. Checkpoint - Ensure core FAQ system works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Enhance Gemini service with FAQ integration
  - [ ] 7.1 Update `src/services/geminiService.ts` to integrate FAQ system
    - Import FAQMatcher and KnowledgeBase services
    - Initialize knowledge base on service creation
    - Modify generateAgentResponse() to query FAQ matcher first
    - Implement buildFAQEnhancedPrompt() to construct enhanced system prompts
    - Add FAQ content and citation instructions to prompts when matches exist
    - Implement extractCitations() to parse citation markers from responses
    - Return EnhancedGeminiResponse with citations array
    - Add error handling for FAQ system failures (graceful fallback)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 6.1, 6.2, 9.1, 9.2, 9.4_
  
  - [ ]* 7.2 Write property test for FAQ-enhanced prompt inclusion
    - **Property 13: FAQ-Enhanced Prompt Inclusion**
    - **Validates: Requirements 4.2, 4.3**
  
  - [ ]* 7.3 Write property test for base prompt preservation
    - **Property 14: Base Prompt Preservation**
    - **Validates: Requirements 4.4**
  
  - [ ]* 7.4 Write property test for conversation history preservation
    - **Property 15: Conversation History Preservation**
    - **Validates: Requirements 4.5**
  
  - [ ]* 7.5 Write property test for citation completeness
    - **Property 16: Citation Completeness**
    - **Validates: Requirements 6.1, 6.2**
  
  - [ ]* 7.6 Write property test for citation format consistency
    - **Property 17: Citation Format Consistency**
    - **Validates: Requirements 6.5**

- [ ] 8. Implement language selection logic
  - [ ] 8.1 Add language-aware content selection to FAQ matcher
    - Modify match() to detect query language
    - Select appropriate language version (CN or EN) from FAQ entries
    - Return language-specific content in search results
    - Implement fallback to English when language is ambiguous
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [ ]* 8.2 Write property test for language-appropriate content selection
    - **Property 11: Language-Appropriate Content Selection**
    - **Validates: Requirements 5.1, 5.2, 5.3**
  
  - [ ]* 8.3 Write unit tests for language edge cases
    - Test empty query language detection
    - Test mixed language queries
    - Test default to English behavior
    - _Requirements: 5.5_

- [ ] 9. Implement analytics tracking service
  - [ ] 9.1 Create `src/services/analyticsTracker.ts` with AnalyticsTracker class
    - Implement recordUsage() to log FAQ access events
    - Store analytics records in localStorage with key 'twin3_faq_analytics'
    - Implement getStatistics() to compute usage metrics
    - Implement getTopFAQs() to return most accessed FAQs
    - Implement data pruning when exceeding 1000 records
    - Add clear() method for testing and maintenance
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [ ]* 9.2 Write property test for analytics recording accuracy
    - **Property 18: Analytics Recording Accuracy**
    - **Validates: Requirements 8.1**
  
  - [ ]* 9.3 Write property test for analytics count accuracy
    - **Property 19: Analytics Count Accuracy**
    - **Validates: Requirements 8.2**
  
  - [ ]* 9.4 Write property test for analytics persistence round-trip
    - **Property 20: Analytics Persistence Round-Trip**
    - **Validates: Requirements 8.3**
  
  - [ ]* 9.5 Write property test for statistics sorting order
    - **Property 21: Statistics Sorting Order**
    - **Validates: Requirements 8.4**
  
  - [ ]* 9.6 Write unit test for analytics data pruning
    - Test that exceeding 1000 records triggers pruning
    - Test that most recent 1000 records are retained
    - _Requirements: 8.5_

- [ ] 10. Integrate analytics with FAQ matcher
  - [ ] 10.1 Update FAQ matcher to record analytics
    - Call analyticsTracker.recordUsage() when FAQs are matched
    - Pass FAQ ID, timestamp, query, score, and audience type
    - Ensure analytics recording doesn't block response generation
    - _Requirements: 8.1_

- [ ] 11. Update chat UI to display FAQ citations
  - [ ] 11.1 Modify chat message component to render citations
    - Parse citation markers (📚 [faq-id]) in message text
    - Render citations as clickable elements
    - Add onClick handler to display full FAQ details
    - Style citations to be visually distinct (e.g., badge or chip)
    - _Requirements: 6.4, 6.5_
  
  - [ ]* 11.2 Write unit test for citation click handler
    - Test that clicking citation retrieves correct FAQ entry
    - Test that FAQ details are displayed to user
    - _Requirements: 6.4_

- [ ] 12. Implement FAQ detail modal/panel
  - [ ] 12.1 Create FAQ detail display component
    - Create modal or side panel component for FAQ details
    - Display FAQ ID, category, description, and full answer
    - Show both Chinese and English versions if available
    - Add close button and keyboard shortcuts (ESC)
    - _Requirements: 6.3, 6.4_

- [ ] 13. Add error handling and fallback mechanisms
  - [ ] 13.1 Implement comprehensive error handling
    - Add try-catch blocks around CSV parsing
    - Add try-catch blocks around FAQ matching
    - Implement graceful degradation when knowledge base is empty
    - Ensure user-facing responses never show internal errors
    - Log all errors to console for debugging
    - _Requirements: 1.4, 9.2, 9.3, 9.4_
  
  - [ ]* 13.2 Write property test for fallback response generation
    - **Property 22: Fallback Response Generation**
    - **Validates: Requirements 9.1**
  
  - [ ]* 13.3 Write property test for error masking in user responses
    - **Property 23: Error Masking in User Responses**
    - **Validates: Requirements 9.4**
  
  - [ ]* 13.4 Write unit tests for error scenarios
    - Test CSV file not found
    - Test malformed CSV data
    - Test FAQ matcher timeout
    - Test empty knowledge base operation
    - _Requirements: 1.4, 9.2, 9.3_

- [ ] 14. Implement hot reload support
  - [ ] 14.1 Add reload functionality to knowledge base
    - Implement reload() method in KnowledgeBase
    - Re-parse CSV file and rebuild indices
    - Expose reload trigger (e.g., admin panel button or dev tool)
    - _Requirements: 10.4_
  
  - [ ]* 14.2 Write property test for hot reload data consistency
    - **Property 24: Hot Reload Data Consistency**
    - **Validates: Requirements 10.4**

- [ ] 15. Create property-based test generators
  - [ ] 15.1 Create test data generators in `src/test/generators/faqGenerators.ts`
    - Implement faqEntryArbitrary() for random FAQ entries
    - Implement queryArbitrary() for Chinese and English queries
    - Implement similarityScoreArbitrary() for scores 0-1
    - Implement userContextArbitrary() for user contexts
    - Export all generators for use in property tests
    - _Testing infrastructure for all property tests_

- [ ] 16. Integration testing and end-to-end validation
  - [ ]* 16.1 Write integration tests for complete flow
    - Test: User query → FAQ matching → Gemini response → Citation extraction
    - Test: CSV loading on app initialization
    - Test: Analytics persistence across simulated page reloads
    - Test: Context resolver integration with FAQ matcher
    - Test: Multi-language query handling in realistic scenarios
    - _Requirements: All requirements (integration validation)_

- [ ] 17. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples, edge cases, and error conditions
- Integration tests ensure components work together correctly
- The implementation follows a bottom-up approach: data models → parsing → storage → matching → integration
- FAQ system is designed to fail gracefully without breaking existing chat functionality

