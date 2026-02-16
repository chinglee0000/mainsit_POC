# Widget Types

## 概述

Widget Types 定義了動態小工具渲染的類型結構，用於 Twin3 的對話界面中嵌入互動組件。

## 類型定義

### WidgetType

小工具類型常量。

```typescript
const WidgetType = {
  NONE: 'none',
  TASK_CARD: 'task_card',
  TASK_DETAIL: 'task_detail',
  WALLET_CONNECT: 'wallet_connect',
  WALLET_BINDING: 'wallet_binding',
  TWIN_MATRIX: 'twin_matrix',
  VERIFICATION: 'verification',
  FEATURE_GRID: 'feature_grid',
  INSTAGRAM_CONNECT: 'instagram_connect',
  ACTIVE_TASK: 'active_task',
  GLOBAL_DASHBOARD: 'global_dashboard',
  HUMAN_VERIFICATION: 'human_verification',
  AIRDROP_CLAIM: 'airdrop_claim',
  REWARD_DASHBOARD: 'reward_dashboard',
  INVITE_FRIENDS: 'invite_friends',
  COMMUNITY_PREVIEW: 'community_preview',
  RECAPTCHA: 'recaptcha',
  AIRDROP_TASK_DASHBOARD: 'airdrop_task_dashboard',
  FINAL_REWARD_DASHBOARD: 'final_reward_dashboard',
} as const;

type WidgetType = typeof WidgetType[keyof typeof WidgetType];
```

### 小工具列表

| 小工具 | 值 | 說明 |
|--------|-----|------|
| None | `none` | 無小工具 |
| Task Card | `task_card` | 任務卡片 |
| Task Detail | `task_detail` | 任務詳情 |
| Wallet Connect | `wallet_connect` | 錢包連接 |
| Wallet Binding | `wallet_binding` | 錢包綁定 |
| Twin Matrix | `twin_matrix` | Twin Matrix 矩陣 |
| Verification | `verification` | 驗證 |
| Feature Grid | `feature_grid` | 功能網格 |
| Instagram Connect | `instagram_connect` | Instagram 連接 |
| Active Task | `active_task` | 活躍任務 |
| Global Dashboard | `global_dashboard` | 全局儀表板 |
| Human Verification | `human_verification` | 人類驗證 |
| Airdrop Claim | `airdrop_claim` | 空投領取 |
| Reward Dashboard | `reward_dashboard` | 獎勵儀表板 |
| Invite Friends | `invite_friends` | 邀請好友 |
| Community Preview | `community_preview` | 社群預覽 |
| reCAPTCHA | `recaptcha` | Google reCAPTCHA |
| Airdrop Task Dashboard | `airdrop_task_dashboard` | 空投任務儀表板 |
| Final Reward Dashboard | `final_reward_dashboard` | 最終獎勵儀表板 |

### A2UIComponent

A2UI 組件接口。

```typescript
interface A2UIComponent {
  id: string;
  component: Record<string, any>;
}
```

**屬性：**
- `id` - 組件唯一 ID
- `component` - 組件配置對象

## 使用場景

### 1. 小工具渲染

```typescript
import { WidgetType } from '@/types';

function WidgetRenderer({ widget }: { widget: string }) {
  switch (widget) {
    case WidgetType.TWIN_MATRIX:
      return <TwinMatrixWidget />;
    
    case WidgetType.WALLET_BINDING:
      return <WalletBindingWidget />;
    
    case WidgetType.HUMAN_VERIFICATION:
      return <HumanVerificationWidget />;
    
    case WidgetType.AIRDROP_CLAIM:
      return <AirdropClaimWidget />;
    
    default:
      return null;
  }
}
```

### 2. 小工具類型檢查

```typescript
import { WidgetType } from '@/types';

function isValidWidget(widget: string): widget is WidgetType {
  return Object.values(WidgetType).includes(widget as WidgetType);
}

// 使用
if (isValidWidget(widget)) {
  // widget 是有效的 WidgetType
}
```

### 3. 條件渲染

```typescript
import { WidgetType } from '@/types';

function ChatMessage({ message }: { message: Message }) {
  if (message.widget === WidgetType.NONE) {
    return <TextMessage content={message.content} />;
  }
  
  return (
    <div>
      <TextMessage content={message.content} />
      <WidgetRenderer widget={message.widget} />
    </div>
  );
}
```

### 4. 小工具分組

```typescript
import { WidgetType } from '@/types';

const VERIFICATION_WIDGETS = [
  WidgetType.WALLET_BINDING,
  WidgetType.HUMAN_VERIFICATION,
  WidgetType.RECAPTCHA,
  WidgetType.VERIFICATION,
];

const TASK_WIDGETS = [
  WidgetType.TASK_CARD,
  WidgetType.TASK_DETAIL,
  WidgetType.ACTIVE_TASK,
  WidgetType.GLOBAL_DASHBOARD,
];

const REWARD_WIDGETS = [
  WidgetType.AIRDROP_CLAIM,
  WidgetType.REWARD_DASHBOARD,
  WidgetType.AIRDROP_TASK_DASHBOARD,
  WidgetType.FINAL_REWARD_DASHBOARD,
];

function isVerificationWidget(widget: string): boolean {
  return VERIFICATION_WIDGETS.includes(widget as WidgetType);
}
```

### 5. 動態小工具加載

```typescript
import { WidgetType } from '@/types';

const widgetComponents = {
  [WidgetType.TWIN_MATRIX]: () => import('@/components/widgets/TwinMatrix'),
  [WidgetType.WALLET_BINDING]: () => import('@/components/widgets/WalletBinding'),
  [WidgetType.HUMAN_VERIFICATION]: () => import('@/components/widgets/HumanVerification'),
  // ...
};

async function loadWidget(widget: WidgetType) {
  const loader = widgetComponents[widget];
  if (loader) {
    return await loader();
  }
  return null;
}
```

## 小工具映射

### 驗證流程小工具

```typescript
const verificationFlow = [
  WidgetType.WALLET_BINDING,      // 步驟 1: 綁定錢包
  WidgetType.RECAPTCHA,            // 步驟 2: reCAPTCHA 驗證
  WidgetType.HUMAN_VERIFICATION,   // 步驟 3: 人類驗證
  WidgetType.TWIN_MATRIX,          // 步驟 4: 查看 Matrix
];
```

### 任務流程小工具

```typescript
const taskFlow = [
  WidgetType.TASK_CARD,            // 步驟 1: 瀏覽任務
  WidgetType.TASK_DETAIL,          // 步驟 2: 查看詳情
  WidgetType.ACTIVE_TASK,          // 步驟 3: 執行任務
  WidgetType.GLOBAL_DASHBOARD,     // 步驟 4: 查看儀表板
];
```

### 獎勵流程小工具

```typescript
const rewardFlow = [
  WidgetType.AIRDROP_TASK_DASHBOARD,  // 步驟 1: 完成任務
  WidgetType.REWARD_DASHBOARD,        // 步驟 2: 查看獎勵
  WidgetType.AIRDROP_CLAIM,           // 步驟 3: 領取空投
  WidgetType.FINAL_REWARD_DASHBOARD,  // 步驟 4: 最終獎勵
];
```

## 最佳實踐

### 1. 使用常量而非字符串

```typescript
// ✅ 好的做法
import { WidgetType } from '@/types';
const widget = WidgetType.TWIN_MATRIX;

// ❌ 不好的做法
const widget = 'twin_matrix';
```

### 2. 類型安全的小工具渲染

```typescript
// ✅ 好的做法
function renderWidget(widget: WidgetType) {
  // TypeScript 會檢查類型
}

// ❌ 不好的做法
function renderWidget(widget: string) {
  // 沒有類型檢查
}
```

### 3. 小工具存在性檢查

```typescript
// ✅ 好的做法
if (message.widget && isValidWidget(message.widget)) {
  return <WidgetRenderer widget={message.widget} />;
}

// ❌ 不好的做法
if (message.widget) {
  return <WidgetRenderer widget={message.widget} />;
}
```

### 4. 錯誤處理

```typescript
function WidgetRenderer({ widget }: { widget: WidgetType }) {
  try {
    switch (widget) {
      case WidgetType.TWIN_MATRIX:
        return <TwinMatrixWidget />;
      // ...
      default:
        console.warn('Unknown widget type:', widget);
        return <FallbackWidget />;
    }
  } catch (error) {
    console.error('Widget render error:', error);
    return <ErrorWidget error={error} />;
  }
}
```

## A2UI 協議

### 組件結構

```typescript
const component: A2UIComponent = {
  id: 'widget-001',
  component: {
    type: 'twin_matrix',
    props: {
      matrixData: { /* ... */ },
      onUnlock: (traitId) => { /* ... */ }
    }
  }
};
```

### 動態組件創建

```typescript
function createA2UIComponent(
  type: WidgetType,
  props: Record<string, any>
): A2UIComponent {
  return {
    id: `widget-${Date.now()}`,
    component: {
      type,
      props
    }
  };
}
```

## 性能考慮

### 1. 懶加載小工具

```typescript
const TwinMatrixWidget = lazy(() => import('@/components/widgets/TwinMatrix'));
const WalletBindingWidget = lazy(() => import('@/components/widgets/WalletBinding'));

function WidgetRenderer({ widget }: { widget: WidgetType }) {
  return (
    <Suspense fallback={<WidgetSkeleton />}>
      {widget === WidgetType.TWIN_MATRIX && <TwinMatrixWidget />}
      {widget === WidgetType.WALLET_BINDING && <WalletBindingWidget />}
    </Suspense>
  );
}
```

### 2. 小工具緩存

```typescript
const widgetCache = new Map<WidgetType, React.ComponentType>();

function getCachedWidget(widget: WidgetType) {
  if (!widgetCache.has(widget)) {
    const Component = loadWidget(widget);
    widgetCache.set(widget, Component);
  }
  return widgetCache.get(widget);
}
```

## 未來改進

- [ ] 添加小工具版本控制
- [ ] 支持小工具熱更新
- [ ] 實現小工具預加載
- [ ] 添加小工具分析追蹤
- [ ] 支持自定義小工具註冊
- [ ] 實現小工具權限控制
