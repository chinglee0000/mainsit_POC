# Design Document: FAQ Knowledge Base Integration

## Overview

This design implements a comprehensive FAQ knowledge base system that enhances the Twin3 AI assistant with structured, multilingual FAQ content. The system parses CSV data, builds an in-memory searchable knowledge base, performs intelligent semantic matching, and seamlessly integrates with the existing Gemini AI service to provide accurate, cited responses.

The architecture follows a layered approach:
1. **Data Layer**: CSV parsing and FAQ entry modeling
2. **Knowledge Layer**: In-memory indexed storage with search capabilities
3. **Matching Layer**: Semantic similarity computation and ranking
4. **Integration Layer**: Enhanced Gemini service with FAQ-aware prompting
5. **Analytics Layer**: Usage tracking and metrics collection

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Chat Interface (React)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Enhanced Gemini Service                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. Receive user message + context                   │  │
│  │  2. Query FAQ Matcher for relevant entries           │  │
│  │  3. Build enhanced system prompt with FAQ content    │  │
│  │  4. Generate AI response with citations              │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬────────────────────────────┬───────────────────┘
             │                            │
             ▼                            ▼
┌────────────────────────┐    ┌──────────────────────────────┐
│    FAQ Matcher         │    │    Analytics Tracker         │
│  - Semantic matching   │    │  - Record FAQ usage          │
│  - Score computation   │    │  - Store in localStorage     │
│  - Context boosting    │    │  - Generate statistics       │
└────────────┬───────────┘    └──────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│              Knowledge Base (In-Memory)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  - FAQ entries indexed by ID                         │  │
│  │  - Category index                                    │  │
│  │  - Audience type index                               │  │
│  │  - Search methods                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│              CSV Parser                                      │
│  - Read docs/faq-data.csv                                   │
│  - Transform to FAQ_Entry objects                           │
│  - Handle bilingual content                                 │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Initialization**: CSV Parser → Knowledge Base (on app load)
2. **User Query**: Chat UI → Enhanced Gemini Service
3. **FAQ Lookup**: Gemini Service → FAQ Matcher → Knowledge Base
4. **Response Generation**: Gemini Service (with FAQ context) → AI API → Chat UI
5. **Analytics**: FAQ Matcher → Analytics Tracker → localStorage

## Components and Interfaces

### 1. FAQ Entry Model

```typescript
interface FAQEntry {
  id: string;                    // Unique identifier (e.g., "faq-01", "air-03")
  categories: string[];          // Array of categories (e.g., ["Core Philosophy"])
  audienceTypes: AudienceType[]; // Target audiences
  descriptionCN: string;         // Chinese description
  descriptionEN: string;         // English description
  valueCN: string;               // Chinese answer content
  valueEN: string;               // English answer content
  parentId?: string;             // Optional hierarchical parent
  keywords: string[];            // Extracted keywords for matching
}

type AudienceType = 'general' | 'airdrop_hunter' | 'kol_creator';

type FAQCategory = 
  | 'Core Philosophy'
  | 'Technical Specifications'
  | 'Business Model'
  | 'Team & Advisors';
```

### 2. CSV Parser Service

```typescript
interface CSVParserService {
  /**
   * Parse CSV file and return FAQ entries
   * @param filePath - Path to CSV file
   * @returns Promise resolving to array of FAQ entries
   */
  parseCSV(filePath: string): Promise<FAQEntry[]>;
  
  /**
   * Extract keywords from description and value fields
   * @param entry - Raw CSV row data
   * @returns Array of keywords
   */
  extractKeywords(entry: RawCSVRow): string[];
  
  /**
   * Map Chinese audience labels to enum values
   * @param rawAudience - Chinese audience string
   * @returns AudienceType enum value
   */
  mapAudienceType(rawAudience: string): AudienceType;
}

interface RawCSVRow {
  '唯一識別碼（文字）': string;
  '接觸點 類型（多選）': string;
  '問題類型（多選）': string;
  '用自然語言描述這個資料的內容和用途（文字）': string;
  '英文翻譯': string;
  '要讓 AI 讀取的資料（任何）': string;
  '英文翻譯': string; // Second occurrence for value
  '階層式的問題 ID（文字）': string;
}
```

### 3. Knowledge Base Service

```typescript
interface KnowledgeBaseService {
  /**
   * Initialize knowledge base with FAQ entries
   * @param entries - Array of parsed FAQ entries
   */
  initialize(entries: FAQEntry[]): void;
  
  /**
   * Search for FAQ entries matching query
   * @param query - User query string
   * @param options - Search options
   * @returns Array of matched entries with scores
   */
  search(
    query: string,
    options?: SearchOptions
  ): FAQSearchResult[];
  
  /**
   * Get FAQ entry by ID
   * @param id - FAQ entry ID
   * @returns FAQ entry or undefined
   */
  getById(id: string): FAQEntry | undefined;
  
  /**
   * Filter FAQs by category
   * @param category - FAQ category
   * @returns Array of FAQ entries
   */
  filterByCategory(category: FAQCategory): FAQEntry[];
  
  /**
   * Filter FAQs by audience type
   * @param audienceType - Target audience
   * @returns Array of FAQ entries
   */
  filterByAudience(audienceType: AudienceType): FAQEntry[];
  
  /**
   * Get all FAQ entries
   * @returns Array of all FAQ entries
   */
  getAll(): FAQEntry[];
  
  /**
   * Reload FAQ data (hot reload support)
   */
  reload(): Promise<void>;
}

interface SearchOptions {
  audienceType?: AudienceType;
  category?: FAQCategory;
  language?: 'zh' | 'en';
  maxResults?: number;
  minScore?: number;
}

interface FAQSearchResult {
  entry: FAQEntry;
  score: number;          // Similarity score (0-1)
  matchedKeywords: string[];
}
```

### 4. FAQ Matcher Service

```typescript
interface FAQMatcherService {
  /**
   * Find relevant FAQ entries for user query
   * @param query - User query string
   * @param context - User context information
   * @returns Array of matched FAQs with scores
   */
  match(
    query: string,
    context: UserContext
  ): Promise<FAQSearchResult[]>;
  
  /**
   * Compute semantic similarity between query and FAQ
   * @param query - User query
   * @param faq - FAQ entry
   * @param language - Query language
   * @returns Similarity score (0-1)
   */
  computeSimilarity(
    query: string,
    faq: FAQEntry,
    language: 'zh' | 'en'
  ): number;
  
  /**
   * Detect query language
   * @param query - User query string
   * @returns Detected language
   */
  detectLanguage(query: string): 'zh' | 'en';
  
  /**
   * Apply context-based score boosting
   * @param results - Initial search results
   * @param context - User context
   * @returns Boosted search results
   */
  applyContextBoost(
    results: FAQSearchResult[],
    context: UserContext
  ): FAQSearchResult[];
}

interface UserContext {
  audienceType?: AudienceType;
  userStatus: 'anonymous' | 'registered' | 'verified';
  conversationHistory: Message[];
}
```

### 5. Enhanced Gemini Service

```typescript
interface EnhancedGeminiService {
  /**
   * Generate AI response with FAQ knowledge integration
   * @param userMessage - User's message
   * @param conversationHistory - Previous messages
   * @param contextId - User context identifier
   * @returns AI response with citations
   */
  generateResponse(
    userMessage: string,
    conversationHistory: Message[],
    contextId?: string
  ): Promise<EnhancedGeminiResponse>;
  
  /**
   * Build system prompt with FAQ context
   * @param basePrompt - Base system prompt
   * @param faqResults - Matched FAQ entries
   * @param language - Response language
   * @returns Enhanced system prompt
   */
  buildFAQEnhancedPrompt(
    basePrompt: string,
    faqResults: FAQSearchResult[],
    language: 'zh' | 'en'
  ): string;
  
  /**
   * Extract FAQ citations from AI response
   * @param response - AI generated text
   * @returns Array of cited FAQ IDs
   */
  extractCitations(response: string): string[];
}

interface EnhancedGeminiResponse {
  text: string;
  success: boolean;
  citations: FAQCitation[];
  usedFAQs: boolean;
}

interface FAQCitation {
  faqId: string;
  position: number; // Character position in response
}
```

### 6. Analytics Tracker Service

```typescript
interface AnalyticsTrackerService {
  /**
   * Record FAQ usage
   * @param faqId - FAQ entry ID
   * @param context - Usage context
   */
  recordUsage(faqId: string, context: UsageContext): void;
  
  /**
   * Get FAQ usage statistics
   * @param options - Query options
   * @returns Usage statistics
   */
  getStatistics(options?: StatisticsOptions): FAQStatistics;
  
  /**
   * Get most accessed FAQs
   * @param limit - Number of results
   * @returns Array of FAQ IDs with access counts
   */
  getTopFAQs(limit: number): Array<{ faqId: string; count: number }>;
  
  /**
   * Clear analytics data
   */
  clear(): void;
}

interface UsageContext {
  timestamp: number;
  userQuery: string;
  matchScore: number;
  audienceType?: AudienceType;
}

interface StatisticsOptions {
  startDate?: Date;
  endDate?: Date;
  audienceType?: AudienceType;
  category?: FAQCategory;
}

interface FAQStatistics {
  totalAccesses: number;
  uniqueFAQsAccessed: number;
  averageMatchScore: number;
  topFAQs: Array<{ faqId: string; count: number }>;
  accessesByCategory: Record<FAQCategory, number>;
  accessesByAudience: Record<AudienceType, number>;
}
```

## Data Models

### FAQ Entry Storage Format

```typescript
// In-memory storage structure
class KnowledgeBase {
  private entries: Map<string, FAQEntry>;
  private categoryIndex: Map<FAQCategory, Set<string>>;
  private audienceIndex: Map<AudienceType, Set<string>>;
  private keywordIndex: Map<string, Set<string>>;
  
  // Inverted index for fast keyword lookup
  private buildKeywordIndex(): void {
    this.entries.forEach((entry, id) => {
      entry.keywords.forEach(keyword => {
        if (!this.keywordIndex.has(keyword)) {
          this.keywordIndex.set(keyword, new Set());
        }
        this.keywordIndex.get(keyword)!.add(id);
      });
    });
  }
}
```

### Analytics Storage Format (localStorage)

```typescript
interface StoredAnalytics {
  version: string; // Schema version for migration
  records: AnalyticsRecord[];
  summary: {
    totalAccesses: number;
    lastUpdated: number;
  };
}

interface AnalyticsRecord {
  faqId: string;
  timestamp: number;
  query: string;
  score: number;
  audience?: AudienceType;
}
```

## Semantic Matching Algorithm

### TF-IDF with Cosine Similarity

The FAQ matcher uses a combination of TF-IDF (Term Frequency-Inverse Document Frequency) and cosine similarity for semantic matching:

```typescript
class SemanticMatcher {
  private idfScores: Map<string, number>;
  
  /**
   * Compute TF-IDF vectors for query and FAQ
   */
  private computeTFIDF(text: string): Map<string, number> {
    const tokens = this.tokenize(text);
    const tf = this.computeTermFrequency(tokens);
    const tfidf = new Map<string, number>();
    
    tf.forEach((freq, term) => {
      const idf = this.idfScores.get(term) || 0;
      tfidf.set(term, freq * idf);
    });
    
    return tfidf;
  }
  
  /**
   * Compute cosine similarity between two TF-IDF vectors
   */
  private cosineSimilarity(
    vec1: Map<string, number>,
    vec2: Map<string, number>
  ): number {
    let dotProduct = 0;
    let mag1 = 0;
    let mag2 = 0;
    
    vec1.forEach((val, key) => {
      dotProduct += val * (vec2.get(key) || 0);
      mag1 += val * val;
    });
    
    vec2.forEach(val => {
      mag2 += val * val;
    });
    
    return dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
  }
  
  /**
   * Tokenize text (handle both Chinese and English)
   */
  private tokenize(text: string): string[] {
    // Chinese: character-based tokenization
    // English: word-based tokenization
    const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
    const englishWords = text
      .toLowerCase()
      .match(/[a-z0-9]+/g) || [];
    
    return [...chineseChars, ...englishWords];
  }
}
```

### Context Boosting Algorithm

```typescript
function applyContextBoost(
  results: FAQSearchResult[],
  context: UserContext
): FAQSearchResult[] {
  return results.map(result => {
    let boostedScore = result.score;
    
    // Boost for matching audience type
    if (context.audienceType && 
        result.entry.audienceTypes.includes(context.audienceType)) {
      boostedScore += 0.1;
    }
    
    // Boost for conversation relevance
    const conversationKeywords = extractKeywords(
      context.conversationHistory.map(m => m.content).join(' ')
    );
    const matchingKeywords = result.entry.keywords.filter(
      k => conversationKeywords.includes(k)
    );
    boostedScore += matchingKeywords.length * 0.02;
    
    // Cap at 1.0
    boostedScore = Math.min(boostedScore, 1.0);
    
    return {
      ...result,
      score: boostedScore
    };
  });
}
```

## Enhanced Gemini Integration

### FAQ-Enhanced System Prompt Template

```typescript
const FAQ_ENHANCED_PROMPT_TEMPLATE = `
${BASE_SYSTEM_PROMPT}

KNOWLEDGE BASE CONTEXT:
You have access to the following verified FAQ information that is highly relevant to the user's question:

{{FAQ_ENTRIES}}

INSTRUCTIONS FOR USING FAQ KNOWLEDGE:
1. Prioritize information from the FAQ entries above
2. Cite FAQ sources using the format: 📚 [FAQ-ID]
3. You may paraphrase FAQ content for natural conversation flow
4. If FAQ information is incomplete, supplement with your general knowledge
5. Always maintain a helpful and conversational tone

CITATION FORMAT:
- Single source: "According to our FAQ 📚 [faq-01], ..."
- Multiple sources: "Based on our documentation 📚 [faq-01, faq-03], ..."
`;

function buildFAQEnhancedPrompt(
  basePrompt: string,
  faqResults: FAQSearchResult[],
  language: 'zh' | 'en'
): string {
  if (faqResults.length === 0) {
    return basePrompt;
  }
  
  const faqEntries = faqResults
    .slice(0, 3) // Top 3 most relevant
    .map((result, index) => {
      const entry = result.entry;
      const content = language === 'zh' ? entry.valueCN : entry.valueEN;
      const description = language === 'zh' 
        ? entry.descriptionCN 
        : entry.descriptionEN;
      
      return `
[${entry.id}] (Relevance: ${(result.score * 100).toFixed(0)}%)
Topic: ${description}
Content: ${content}
      `.trim();
    })
    .join('\n\n---\n\n');
  
  return FAQ_ENHANCED_PROMPT_TEMPLATE
    .replace('${BASE_SYSTEM_PROMPT}', basePrompt)
    .replace('{{FAQ_ENTRIES}}', faqEntries);
}
```

### Response Citation Extraction

```typescript
function extractCitations(response: string): FAQCitation[] {
  // Match patterns like 📚 [faq-01] or 📚 [faq-01, air-03]
  const citationRegex = /📚\s*\[([^\]]+)\]/g;
  const citations: FAQCitation[] = [];
  
  let match;
  while ((match = citationRegex.exec(response)) !== null) {
    const faqIds = match[1].split(',').map(id => id.trim());
    faqIds.forEach(faqId => {
      citations.push({
        faqId,
        position: match.index
      });
    });
  }
  
  return citations;
}
```

## Error Handling

### Error Scenarios and Handling

1. **CSV File Not Found**
   - Log warning to console
   - Initialize empty knowledge base
   - Continue with AI-only mode
   - Display admin notification (if admin panel exists)

2. **CSV Parsing Error**
   - Log error with row number
   - Skip malformed rows
   - Continue parsing remaining rows
   - Report parsing statistics (success/failure counts)

3. **FAQ Matching Timeout**
   - Set 100ms timeout for matching operation
   - If timeout occurs, return empty results
   - Fall back to AI-only response
   - Log performance warning

4. **Gemini API Error with FAQ Context**
   - Retry without FAQ context (simpler prompt)
   - If still fails, use existing error handling
   - Log FAQ context size for debugging

5. **Analytics Storage Quota Exceeded**
   - Remove oldest 50% of records
   - Log warning about data truncation
   - Continue recording new analytics

```typescript
class ErrorHandler {
  static handleCSVError(error: Error): void {
    console.warn('[FAQ System] CSV parsing failed:', error.message);
    // Initialize empty knowledge base
    knowledgeBase.initialize([]);
  }
  
  static handleMatchingTimeout(): FAQSearchResult[] {
    console.warn('[FAQ System] Matching timeout exceeded');
    return [];
  }
  
  static async handleGeminiError(
    error: Error,
    fallbackFn: () => Promise<GeminiResponse>
  ): Promise<GeminiResponse> {
    console.error('[FAQ System] Gemini error with FAQ context:', error);
    return await fallbackFn();
  }
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified several areas of redundancy:

1. **Language selection properties (5.1, 5.2, 5.3)** can be combined into a single comprehensive property about language matching
2. **Context boosting properties (7.1, 7.2)** can be unified into one property about audience-specific score boosting
3. **Filtering properties (2.2, 2.3)** follow the same pattern and can be generalized
4. **Citation properties (6.1, 6.2)** can be combined into one property about citation completeness

The following properties represent the unique, non-redundant validation requirements:

### Property 1: CSV Parsing Field Extraction

*For any* valid CSV row from the FAQ data file, parsing should extract all required fields (id, categories, description, value, parentId) and produce a well-formed FAQ_Entry object with non-empty id and value fields.

**Validates: Requirements 1.2, 1.5**

### Property 2: Bilingual Content Preservation

*For any* FAQ entry containing both Chinese and English content, parsing should preserve both language versions without data loss or corruption, such that both valueCN and valueEN fields are populated.

**Validates: Requirements 1.3**

### Property 3: Knowledge Base Retrieval Consistency

*For any* FAQ entry stored in the knowledge base, retrieving it by its unique ID should return an equivalent entry with all fields matching the original stored values.

**Validates: Requirements 2.1, 6.3**

### Property 4: Filter Result Correctness

*For any* filter criteria (audience type or category), all returned FAQ entries should match the specified filter, and no matching entries should be excluded from results.

**Validates: Requirements 2.2, 2.3**

### Property 5: Hierarchical Relationship Integrity

*For any* FAQ entry with a non-null parentId, the knowledge base should contain an entry with that ID, and retrieving the parent should return a valid FAQ_Entry object.

**Validates: Requirements 2.4**

### Property 6: Search Result Ranking Order

*For any* search query that returns multiple results, the FAQ entries should be ordered by similarity score in descending order (highest score first).

**Validates: Requirements 2.5, 3.3**

### Property 7: Similarity Score Bounds

*For any* query and FAQ entry pair, the computed similarity score should be a number between 0.0 and 1.0 (inclusive).

**Validates: Requirements 3.2**

### Property 8: Score Threshold Filtering

*For any* search query, if all FAQ entries have similarity scores below 0.6, the matcher should return an empty result set.

**Validates: Requirements 3.5**

### Property 9: Context-Based Score Boosting

*For any* user context with a specific audience type (airdrop hunter or KOL), FAQ entries tagged with that audience type should have their similarity scores increased by exactly 0.1 compared to the unboosted score.

**Validates: Requirements 7.1, 7.2**

### Property 10: General FAQ Inclusion

*For any* user context (regardless of audience type), FAQ entries tagged as "general" (共同) should always be included in search results when they match the query above the threshold.

**Validates: Requirements 7.4**

### Property 11: Language-Appropriate Content Selection

*For any* query in a detected language (Chinese or English), when an FAQ entry contains content in both languages, the system should select and return the content matching the query language.

**Validates: Requirements 5.1, 5.2, 5.3**

### Property 12: Language Detection Determinism

*For any* query string, running language detection multiple times should always return the same language result (deterministic behavior).

**Validates: Requirements 5.4**

### Property 13: FAQ-Enhanced Prompt Inclusion

*For any* response generation where FAQ matches exist with scores ≥ 0.6, the system prompt sent to the AI should contain the FAQ content and citation instructions.

**Validates: Requirements 4.2, 4.3**

### Property 14: Base Prompt Preservation

*For any* response generation where no FAQ matches exist, the system prompt should be identical to the base system prompt without FAQ additions.

**Validates: Requirements 4.4**

### Property 15: Conversation History Preservation

*For any* response generation with existing conversation history, the history messages should be preserved in the same order when FAQ knowledge is added to the prompt.

**Validates: Requirements 4.5**

### Property 16: Citation Completeness

*For any* AI response that uses N FAQ entries (N ≥ 1), the response text should contain at least N citation markers with the correct FAQ IDs.

**Validates: Requirements 6.1, 6.2**

### Property 17: Citation Format Consistency

*For any* citation in an AI response, it should match the pattern `📚 [faq-id]` or `📚 [faq-id1, faq-id2, ...]` (regex: `📚\s*\[[^\]]+\]`).

**Validates: Requirements 6.5**

### Property 18: Analytics Recording Accuracy

*For any* FAQ entry used in a response, the analytics tracker should create exactly one record containing the FAQ ID and a valid timestamp.

**Validates: Requirements 8.1**

### Property 19: Analytics Count Accuracy

*For any* FAQ entry accessed N times, the analytics system should report an access count of exactly N for that FAQ ID.

**Validates: Requirements 8.2**

### Property 20: Analytics Persistence Round-Trip

*For any* analytics record stored to localStorage, retrieving the analytics data should return a record with the same FAQ ID, timestamp, and metadata.

**Validates: Requirements 8.3**

### Property 21: Statistics Sorting Order

*For any* request for top FAQs, the returned list should be sorted by access count in descending order (most accessed first).

**Validates: Requirements 8.4**

### Property 22: Fallback Response Generation

*For any* query where FAQ matching returns no results, the Gemini service should still generate a valid response using base AI capabilities without throwing errors.

**Validates: Requirements 9.1**

### Property 23: Error Masking in User Responses

*For any* internal FAQ system error (parsing, matching, or retrieval), the user-facing chat response should not contain error messages or stack traces.

**Validates: Requirements 9.4**

### Property 24: Hot Reload Data Consistency

*For any* knowledge base reload operation, after completion, all FAQ entries from the updated data source should be retrievable by ID.

**Validates: Requirements 10.4**

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests** focus on:
- Specific CSV parsing examples with known input/output pairs
- Edge cases: empty files, malformed CSV, missing columns
- Error handling: file not found, permission errors
- Integration points: Gemini service calling FAQ matcher
- UI interactions: citation click handlers
- Specific language detection examples (pure Chinese, pure English, mixed)

**Property-Based Tests** focus on:
- Universal properties across all valid inputs (see properties above)
- Randomized FAQ entries, queries, and contexts
- Comprehensive input coverage through generation
- Invariant validation (scores always 0-1, sorting always correct)
- Round-trip properties (store/retrieve, serialize/deserialize)

### Property-Based Testing Configuration

**Library Selection**: Use `fast-check` for TypeScript property-based testing

**Test Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with format: `Feature: faq-knowledge-base-integration, Property N: [property description]`
- Generators for: FAQ entries, user queries (Chinese/English), similarity scores, contexts

**Example Test Structure**:
```typescript
import fc from 'fast-check';

// Feature: faq-knowledge-base-integration, Property 3: Knowledge Base Retrieval Consistency
test('stored FAQ entries can be retrieved with consistent data', () => {
  fc.assert(
    fc.property(
      faqEntryArbitrary(), // Generator for random FAQ entries
      (entry) => {
        const kb = new KnowledgeBase();
        kb.initialize([entry]);
        
        const retrieved = kb.getById(entry.id);
        
        expect(retrieved).toEqual(entry);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Test Data Generators

```typescript
// Generator for FAQ entries
const faqEntryArbitrary = () => fc.record({
  id: fc.stringOf(fc.constantFrom('faq-', 'air-', 'kol-'), fc.integer(1, 99)),
  categories: fc.array(fc.constantFrom(
    'Core Philosophy',
    'Technical Specifications',
    'Business Model',
    'Team & Advisors'
  ), { minLength: 1, maxLength: 3 }),
  audienceTypes: fc.array(fc.constantFrom(
    'general',
    'airdrop_hunter',
    'kol_creator'
  ), { minLength: 1, maxLength: 3 }),
  descriptionCN: fc.lorem({ maxCount: 20 }),
  descriptionEN: fc.lorem({ maxCount: 20 }),
  valueCN: fc.lorem({ maxCount: 100 }),
  valueEN: fc.lorem({ maxCount: 100 }),
  keywords: fc.array(fc.lorem({ maxCount: 3 }), { minLength: 3, maxLength: 10 }),
  parentId: fc.option(fc.string(), { nil: undefined })
});

// Generator for user queries
const queryArbitrary = () => fc.oneof(
  fc.lorem({ maxCount: 20 }), // English
  fc.stringOf(fc.char().filter(c => c >= '\u4e00' && c <= '\u9fa5'), { minLength: 5, maxLength: 50 }) // Chinese
);

// Generator for similarity scores
const similarityScoreArbitrary = () => fc.double({ min: 0, max: 1 });
```

### Integration Testing

Integration tests should verify:
1. End-to-end flow: User query → FAQ matching → Gemini response → Citation extraction
2. CSV file loading on application startup
3. Analytics persistence across page reloads
4. Context resolver integration with FAQ matcher
5. Multi-language query handling in real scenarios

### Performance Testing

While not part of property-based testing, performance should be validated:
- CSV parsing time for 40+ entries: < 500ms
- FAQ matching time for typical queries: < 100ms
- Knowledge base initialization: < 500ms
- Analytics retrieval: < 50ms

Use performance benchmarks rather than property tests for these requirements.

