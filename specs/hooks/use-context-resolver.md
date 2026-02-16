# useContextResolver Hook

## 概述

useContextResolver 是一個初始化 hook，負責在應用啟動時解析和設置應用上下文。

## 功能

### 1. URL 參數解析
- 解析查詢字符串參數
- 提取任務 ID、推薦碼、活動 ID 等
- 過濾無效參數

### 2. 用戶狀態檢測
- 從 localStorage 讀取用戶狀態
- 檢查錢包連接狀態
- 恢復人性指數分數

### 3. 上下文解析
- 根據 URL 和用戶狀態解析上下文 ID
- 設置初始流程步驟
- 記錄調試信息

## API

### useContextResolver

```typescript
function useContextResolver(): {
  contextId: ContextId;
}
```

**返回：**
- `contextId` - 解析後的上下文 ID

**範例：**
```typescript
import { useContextResolver } from '@/app/hooks';

function App() {
  const { contextId } = useContextResolver();
  
  return (
    <div>
      <h1>Welcome to Twin3</h1>
      <p>Context: {contextId}</p>
    </div>
  );
}
```

### useContextContent

獲取當前上下文內容。

```typescript
function useContextContent(): {
  contextId: ContextId;
  urlParams: URLContext;
}
```

**返回：**
- `contextId` - 當前上下文 ID
- `urlParams` - URL 參數對象

**範例：**
```typescript
import { useContextContent } from '@/app/hooks';

function ContextDisplay() {
  const { contextId, urlParams } = useContextContent();
  
  return (
    <div>
      <p>Context: {contextId}</p>
      {urlParams.taskId && <p>Task: {urlParams.taskId}</p>}
      {urlParams.ref && <p>Referrer: {urlParams.ref}</p>}
    </div>
  );
}
```

## 初始化流程

### 1. URL 參數解析

```typescript
// 支持的 URL 參數
?task_id=xxx        // 任務深度鏈接
?ref=xxx            // KOL 推薦碼
?campaign=xxx       // 活動 ID
?utm_source=xxx     // UTM 來源
?utm_medium=xxx     // UTM 媒介
?utm_campaign=xxx   // UTM 活動
```

**範例 URL：**
```
https://twin3.app?task_id=loreal-lipstick&ref=alice
https://twin3.app?campaign=launch&utm_source=twitter
```

### 2. 用戶狀態檢測

從 localStorage 讀取：

```typescript
twin3_wallet          // 錢包地址
twin3_verified        // 驗證狀態
twin3_humanity_score  // 人性指數
```

**狀態優先級：**
1. 有錢包地址 → `registered`
2. 已驗證 → `verified`
3. 默認 → `anonymous`

### 3. 上下文解析

根據 URL 參數和用戶狀態解析上下文：

| 條件 | 上下文 ID |
|------|-----------|
| 用戶已註冊 | `returning_user` |
| 有 task_id | `new_user_task` |
| 有 ref | `kol_referral` |
| 有 campaign | `campaign_landing` |
| 默認 | `new_user_organic` |

### 4. 設置初始步驟

根據上下文 ID 設置歡迎節點：

| 上下文 ID | 歡迎節點 |
|-----------|----------|
| `new_user_organic` | `welcome` |
| `new_user_task` | `welcome_task` |
| `returning_user` | `welcome_back` |
| `kol_referral` | `welcome_referral` |
| `campaign_landing` | `welcome_campaign` |

## 使用場景

### 1. 應用初始化

```typescript
import { useContextResolver } from '@/app/hooks';

function App() {
  // 在應用根組件中調用
  const { contextId } = useContextResolver();
  
  return (
    <Router>
      <Routes contextId={contextId} />
    </Router>
  );
}
```

### 2. 條件渲染

```typescript
import { useContextContent } from '@/app/hooks';

function WelcomeScreen() {
  const { contextId, urlParams } = useContextContent();
  
  if (contextId === 'new_user_task' && urlParams.taskId) {
    return <TaskWelcome taskId={urlParams.taskId} />;
  }
  
  if (contextId === 'kol_referral' && urlParams.ref) {
    return <ReferralWelcome referrer={urlParams.ref} />;
  }
  
  return <DefaultWelcome />;
}
```

### 3. 分析追蹤

```typescript
import { useContextContent } from '@/app/hooks';
import { useEffect } from 'react';

function Analytics() {
  const { contextId, urlParams } = useContextContent();
  
  useEffect(() => {
    // 追蹤用戶來源
    analytics.track('page_view', {
      context: contextId,
      source: urlParams.utm_source,
      campaign: urlParams.campaign,
      referrer: urlParams.ref,
    });
  }, [contextId, urlParams]);
  
  return null;
}
```

### 4. 個性化內容

```typescript
import { useContextContent } from '@/app/hooks';

function Hero() {
  const { contextId } = useContextContent();
  
  const content = {
    'new_user_organic': {
      title: 'Welcome to Twin3',
      subtitle: 'Build your digital twin'
    },
    'kol_referral': {
      title: 'Join the Community',
      subtitle: 'Invited by a trusted member'
    },
    'new_user_task': {
      title: 'Complete Tasks, Earn Rewards',
      subtitle: 'Start with this exclusive task'
    }
  };
  
  const { title, subtitle } = content[contextId] || content['new_user_organic'];
  
  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}
```

## 調試

### 日誌輸出

Hook 會在初始化時輸出調試日誌：

```typescript
[14:30:45] [DEBUG] [ContextResolver] Initialized: {
  urlParams: { taskId: 'loreal-lipstick', ref: 'alice' },
  userStatus: 'anonymous',
  contextId: 'new_user_task',
  welcomeNode: 'welcome_task'
}
```

### 啟用調試日誌

```env
VITE_ENABLE_DEBUG_LOGS=true
```

### 檢查狀態

```typescript
import { useAppStore } from '@/app/store';

function DebugPanel() {
  const store = useAppStore();
  
  return (
    <pre>
      {JSON.stringify(store, null, 2)}
    </pre>
  );
}
```

## 最佳實踐

### 1. 僅在根組件調用

```typescript
// ✅ 好的做法
function App() {
  useContextResolver(); // 在根組件調用一次
  return <Routes />;
}

// ❌ 不好的做法
function ChildComponent() {
  useContextResolver(); // 不要在子組件中調用
}
```

### 2. 使用 useContextContent 獲取狀態

```typescript
// ✅ 好的做法
const { contextId } = useContextContent();

// ❌ 不好的做法
const contextId = useAppStore((state) => state.contextId);
```

### 3. 處理 URL 參數

```typescript
// ✅ 好的做法
const { urlParams } = useContextContent();
if (urlParams.taskId) {
  // 處理任務
}

// ❌ 不好的做法
const params = new URLSearchParams(window.location.search);
const taskId = params.get('task_id');
```

## 性能考慮

- Hook 僅在組件掛載時執行一次
- URL 解析使用原生 URLSearchParams
- localStorage 讀取是同步的
- 狀態更新批量處理

## 錯誤處理

### URL 參數錯誤

```typescript
// 無效參數會被自動過濾
?task_id=&ref=  // 空值被忽略
```

### localStorage 錯誤

```typescript
// 如果 localStorage 不可用，使用默認值
try {
  const wallet = localStorage.getItem('twin3_wallet');
} catch (error) {
  // 降級到 anonymous 狀態
}
```

## 未來改進

- [ ] 支持異步初始化
- [ ] 添加初始化錯誤處理
- [ ] 支持自定義上下文解析邏輯
- [ ] 添加初始化完成回調
- [ ] 支持服務端渲染
- [ ] 添加初始化進度追蹤
