# Gemini AI Service

## 概述

Gemini AI Service 提供基於 Google Gemini API 的 AI 對話功能，為 Twin3 平台提供智能助手服務。

## 功能

### 1. AI 對話生成
- 使用 Gemini 2.0 Flash 模型
- 支持對話歷史上下文
- 可自定義系統提示詞
- 支持上下文感知回應

### 2. 動態建議生成
- 基於對話上下文生成建議
- 返回 3-4 個行動導向的建議
- 自動回退到預設建議

### 3. AI 狀態檢查
- 檢查 API 密鑰是否配置
- 提供降級體驗

## API

### generateAgentResponse

生成 AI 回應。

```typescript
interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiResponse {
  text: string;
  success: boolean;
}

function generateAgentResponse(
  userMessage: string,
  conversationHistory?: ConversationMessage[],
  contextPrompt?: string
): Promise<GeminiResponse>
```

**參數：**
- `userMessage` - 用戶消息
- `conversationHistory` - 對話歷史（可選）
- `contextPrompt` - 上下文提示（可選）

**返回：**
- `text` - AI 生成的回應文本
- `success` - 是否成功生成

**範例：**
```typescript
import { generateAgentResponse } from '@/lib/services';

const response = await generateAgentResponse(
  "What is Twin Matrix?",
  [],
  "User is viewing the dashboard"
);

console.log(response.text);
```

### generateSuggestions

生成動態建議。

```typescript
function generateSuggestions(
  lastMessage: string,
  context: string
): Promise<string[]>
```

**參數：**
- `lastMessage` - 最後一條消息
- `context` - 當前上下文

**返回：**
- 建議文本數組（3-4 個）

**範例：**
```typescript
import { generateSuggestions } from '@/lib/services';

const suggestions = await generateSuggestions(
  "I want to verify my identity",
  "User is on welcome screen"
);

// ["Start Verification", "Learn More", "View Matrix"]
```

### isAIEnabled

檢查 AI 是否啟用。

```typescript
function isAIEnabled(): boolean
```

**返回：**
- `true` - AI 已配置並可用
- `false` - AI 未配置

**範例：**
```typescript
import { isAIEnabled } from '@/lib/services';

if (isAIEnabled()) {
  // 使用 AI 功能
} else {
  // 使用預設回應
}
```

## 配置

### 環境變數

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### 系統提示詞

服務內建了 Twin3 專用的系統提示詞，包含：
- 角色定義：Twin3 AI Assistant
- 平台概念：Twin Matrix, SBT, $twin3
- 回應規則：簡潔、專業、友好

## 錯誤處理

### API 密鑰未配置
```typescript
{
  text: "I'm currently in demo mode...",
  success: false
}
```

### API 調用失敗
```typescript
{
  text: "I encountered an issue...",
  success: false
}
```

## 最佳實踐

1. **始終檢查 AI 狀態**
   ```typescript
   if (isAIEnabled()) {
     // 使用 AI
   } else {
     // 使用預設邏輯
   }
   ```

2. **提供上下文**
   ```typescript
   const response = await generateAgentResponse(
     message,
     history,
     "User is viewing Twin Matrix" // 提供上下文
   );
   ```

3. **處理錯誤**
   ```typescript
   const response = await generateAgentResponse(message);
   if (!response.success) {
     // 顯示預設建議或錯誤消息
   }
   ```

4. **限制對話歷史**
   ```typescript
   const recentHistory = conversationHistory.slice(-10); // 只保留最近 10 條
   ```

## 性能考慮

- **Token 限制**：最大輸出 256 tokens
- **溫度設置**：0.7（平衡創造性和一致性）
- **超時處理**：建議設置 10 秒超時
- **緩存策略**：考慮緩存常見問題的回應

## 安全性

- API 密鑰僅在客戶端使用
- 不記錄敏感用戶信息
- 系統提示詞限制回應範圍
- 輸入驗證和清理

## 未來改進

- [ ] 添加回應緩存
- [ ] 支持多語言
- [ ] 添加情感分析
- [ ] 實現對話摘要
- [ ] 添加用戶反饋機制
