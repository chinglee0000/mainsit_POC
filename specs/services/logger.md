# Logger Service

## 概述

統一的日誌工具，為 Twin3 平台提供結構化的日誌記錄功能。

## 功能

- 多級別日誌（debug, info, warn, error）
- 時間戳記錄
- 模組前綴
- 開發/生產環境自動切換
- 子 logger 創建

## API

### 基礎用法

```typescript
import { logger } from '@/lib/logger';

logger.debug('Debug message', { data });
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message', error);
```

### 日誌級別

#### debug()

調試級別日誌，僅在開發環境且啟用 debug 時顯示。

```typescript
logger.debug('User clicked button', { buttonId: 'submit' });
```

**輸出：**
```
[14:30:45] [DEBUG] User clicked button { buttonId: 'submit' }
```

#### info()

信息級別日誌，僅在開發環境顯示。

```typescript
logger.info('User logged in', { userId: '123' });
```

**輸出：**
```
[14:30:45] [INFO] User logged in { userId: '123' }
```

#### warn()

警告級別日誌，在所有環境顯示。

```typescript
logger.warn('API rate limit approaching', { remaining: 10 });
```

**輸出：**
```
[14:30:45] [WARN] API rate limit approaching { remaining: 10 }
```

#### error()

錯誤級別日誌，在所有環境顯示。

```typescript
logger.error('Failed to fetch data', error);
```

**輸出：**
```
[14:30:45] [ERROR] Failed to fetch data Error: Network error
```

### 子 Logger

創建帶有特定前綴的子 logger。

```typescript
const myLogger = logger.child('MyModule');

myLogger.info('Module initialized');
// [14:30:45] [INFO] [MyModule] Module initialized

myLogger.error('Module error', error);
// [14:30:45] [ERROR] [MyModule] Module error
```

### 預定義 Logger

平台提供了幾個預定義的專用 logger：

```typescript
import { 
  matrixLogger,
  chatLogger,
  authLogger,
  apiLogger 
} from '@/lib/logger';

// Matrix 相關日誌
matrixLogger.info('Trait unlocked', { traitId: '00' });
// [14:30:45] [INFO] [Matrix] Trait unlocked

// Chat 相關日誌
chatLogger.debug('Message sent', { messageId: 'msg-123' });
// [14:30:45] [DEBUG] [Chat] Message sent

// Auth 相關日誌
authLogger.warn('Invalid token');
// [14:30:45] [WARN] [Auth] Invalid token

// API 相關日誌
apiLogger.error('API call failed', error);
// [14:30:45] [ERROR] [API] API call failed
```

## 配置

### 環境變數

```env
# 啟用 debug 日誌（開發環境）
VITE_ENABLE_DEBUG_LOGS=true
```

### 日誌級別控制

| 級別 | 開發環境 | 生產環境 | 需要 DEBUG 標誌 |
|------|----------|----------|----------------|
| debug | ✅ | ❌ | ✅ |
| info | ✅ | ❌ | ❌ |
| warn | ✅ | ✅ | ❌ |
| error | ✅ | ✅ | ❌ |

## 使用場景

### 1. 組件生命週期

```typescript
import { logger } from '@/lib/logger';

function MyComponent() {
  useEffect(() => {
    logger.debug('Component mounted');
    
    return () => {
      logger.debug('Component unmounted');
    };
  }, []);
}
```

### 2. API 調用

```typescript
import { apiLogger } from '@/lib/logger';

async function fetchData() {
  apiLogger.info('Fetching user data');
  
  try {
    const response = await fetch('/api/user');
    apiLogger.info('Data fetched successfully');
    return response.json();
  } catch (error) {
    apiLogger.error('Failed to fetch data', error);
    throw error;
  }
}
```

### 3. 狀態變化

```typescript
import { logger } from '@/lib/logger';

function updateState(newState: State) {
  logger.debug('State updating', { 
    from: currentState, 
    to: newState 
  });
  
  setState(newState);
  
  logger.debug('State updated');
}
```

### 4. 錯誤邊界

```typescript
import { logger } from '@/lib/logger';

class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('React error boundary caught error', {
      error,
      errorInfo
    });
  }
}
```

### 5. 性能監控

```typescript
import { logger } from '@/lib/logger';

function expensiveOperation() {
  const start = performance.now();
  logger.debug('Starting expensive operation');
  
  // ... 執行操作
  
  const duration = performance.now() - start;
  logger.debug('Operation completed', { duration: `${duration}ms` });
}
```

## 最佳實踐

### 1. 使用適當的日誌級別

```typescript
// ✅ 好的做法
logger.debug('Detailed state', { state });  // 調試信息
logger.info('User action completed');       // 一般信息
logger.warn('Deprecated API used');         // 警告
logger.error('Operation failed', error);    // 錯誤

// ❌ 不好的做法
logger.error('User clicked button');        // 不是錯誤
logger.debug('Critical security issue');    // 應該用 error
```

### 2. 提供上下文

```typescript
// ✅ 好的做法
logger.error('Failed to save user', { 
  userId, 
  error,
  timestamp: Date.now() 
});

// ❌ 不好的做法
logger.error('Failed');  // 缺少上下文
```

### 3. 使用專用 Logger

```typescript
// ✅ 好的做法
const myLogger = logger.child('MyFeature');
myLogger.info('Feature initialized');

// ❌ 不好的做法
logger.info('[MyFeature] Feature initialized');  // 手動添加前綴
```

### 4. 避免敏感信息

```typescript
// ✅ 好的做法
logger.info('User logged in', { userId: user.id });

// ❌ 不好的做法
logger.info('User logged in', { 
  password: user.password,  // 不要記錄密碼
  token: user.token         // 不要記錄 token
});
```

### 5. 結構化數據

```typescript
// ✅ 好的做法
logger.debug('API response', { 
  status: response.status,
  data: response.data 
});

// ❌ 不好的做法
logger.debug(`API response: ${JSON.stringify(response)}`);
```

## 性能考慮

- debug 和 info 在生產環境自動禁用
- 避免在循環中大量記錄
- 使用條件日誌減少開銷

```typescript
// ✅ 好的做法
if (isDev) {
  logger.debug('Expensive debug info', computeExpensiveData());
}

// ❌ 不好的做法
logger.debug('Expensive debug info', computeExpensiveData());
// computeExpensiveData() 總是執行
```

## 未來改進

- [ ] 添加日誌持久化
- [ ] 實現遠程日誌收集
- [ ] 添加日誌過濾器
- [ ] 支持自定義格式化
- [ ] 添加日誌分析工具
- [ ] 實現日誌級別動態調整
