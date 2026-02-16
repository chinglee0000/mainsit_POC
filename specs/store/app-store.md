# App Store

## 概述

App Store 是基於 Zustand 的全局狀態管理容器，負責管理應用的上下文路由、用戶狀態和 Twin Matrix 數據。

## 功能

### 1. 上下文感知路由
- URL 參數解析
- 入口來源檢測
- 上下文 ID 解析
- 流程步驟管理

### 2. 用戶狀態管理
- 用戶狀態追蹤（anonymous, verified, registered, premium）
- 錢包地址管理
- 人性指數分數

### 3. Twin Matrix 狀態
- Matrix 數據存儲
- Matrix 更新
- 持久化支持

### 4. 流程控制
- 當前步驟追蹤
- 已完成步驟記錄
- 步驟完成標記

## 狀態結構

### AppContext

```typescript
interface AppContext {
  // 入口檢測
  entrySource: EntrySource;
  urlParams: URLContext;

  // 用戶狀態
  userStatus: UserStatus;
  walletAddress?: string;
  humanityScore?: number;

  // 解析的上下文
  contextId: ContextId;

  // 流程控制
  currentStep: string;
  completedSteps: string[];

  // 元數據
  referrerKol?: string;
  campaignId?: string;
}
```

### 類型定義

#### EntrySource
```typescript
type EntrySource =
  | 'organic'       // 直接訪問
  | 'kol_referral'  // KOL 分享鏈接
  | 'task_deeplink' // 任務深度鏈接
  | 'campaign';     // 營銷活動
```

#### UserStatus
```typescript
type UserStatus =
  | 'anonymous'   // 未驗證，無錢包
  | 'verified'    // 完成人類驗證
  | 'registered'  // 已連接錢包
  | 'premium';    // 高級用戶
```

#### ContextId
```typescript
type ContextId =
  | 'new_user_organic'    // 新用戶 + 自然流量
  | 'new_user_task'       // 新用戶 + 任務深度鏈接
  | 'returning_user'      // 回訪註冊用戶
  | 'kol_referral'        // KOL 推薦鏈接
  | 'campaign_landing';   // 活動落地頁
```

## API

### Actions

#### setUrlParams

設置 URL 參數並檢測入口來源。

```typescript
function setUrlParams(params: URLContext): void
```

**參數：**
```typescript
interface URLContext {
  taskId?: string;
  ref?: string;
  campaign?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}
```

**範例：**
```typescript
const { setUrlParams } = useAppStore();

setUrlParams({
  taskId: 'task-123',
  ref: 'kol-alice',
  utm_source: 'twitter'
});
```

#### setUserStatus

設置用戶狀態。

```typescript
function setUserStatus(
  status: UserStatus,
  walletAddress?: string
): void
```

**範例：**
```typescript
const { setUserStatus } = useAppStore();

// 用戶完成驗證
setUserStatus('verified');

// 用戶連接錢包
setUserStatus('registered', '0x1234...');
```

#### setHumanityScore

設置人性指數分數。

```typescript
function setHumanityScore(score: number): void
```

**範例：**
```typescript
const { setHumanityScore } = useAppStore();

setHumanityScore(135);
```

#### updateMatrixData

更新 Twin Matrix 數據。

```typescript
function updateMatrixData(data: TwinMatrixData): void
```

**範例：**
```typescript
const { updateMatrixData } = useAppStore();

updateMatrixData({
  ...currentMatrix,
  discoveredTraits: currentMatrix.discoveredTraits + 1,
  traits: updatedTraits
});
```

#### resolveContext

根據當前狀態解析上下文 ID。

```typescript
function resolveContext(): ContextId
```

**解析優先級：**
1. 回訪用戶（registered 或 premium）
2. 任務深度鏈接（taskId 存在）
3. KOL 推薦（ref 存在）
4. 營銷活動（campaign 存在）
5. 自然流量（默認）

**範例：**
```typescript
const { resolveContext } = useAppStore();

const contextId = resolveContext();
console.log(contextId); // 'new_user_task'
```

#### completeStep

標記步驟為已完成。

```typescript
function completeStep(stepId: string): void
```

**範例：**
```typescript
const { completeStep } = useAppStore();

completeStep('wallet_binding');
completeStep('human_verification');
```

#### setCurrentStep

設置當前步驟。

```typescript
function setCurrentStep(stepId: string): void
```

**範例：**
```typescript
const { setCurrentStep } = useAppStore();

setCurrentStep('twin_matrix');
```

#### reset

重置 store 到初始狀態。

```typescript
function reset(): void
```

**範例：**
```typescript
const { reset } = useAppStore();

// 用戶登出
reset();
```

### Selector Hooks

便捷的選擇器 hooks，用於訪問特定狀態。

#### useContextId

```typescript
const contextId = useContextId();
```

#### useUserStatus

```typescript
const userStatus = useUserStatus();
```

#### useUrlParams

```typescript
const urlParams = useUrlParams();
```

#### useIsVerified

```typescript
const isVerified = useIsVerified();
```

#### useMatrixData

```typescript
const matrixData = useMatrixData();
```

#### useUpdateMatrixData

```typescript
const updateMatrixData = useUpdateMatrixData();
```

## 使用場景

### 1. 初始化應用上下文

```typescript
import { useContextResolver } from '@/app/hooks';

function App() {
  const { contextId } = useContextResolver();
  
  return (
    <div>
      <h1>Context: {contextId}</h1>
    </div>
  );
}
```

### 2. 檢查用戶狀態

```typescript
import { useUserStatus, useIsVerified } from '@/app/store';

function Dashboard() {
  const userStatus = useUserStatus();
  const isVerified = useIsVerified();
  
  if (!isVerified) {
    return <VerificationPrompt />;
  }
  
  return <DashboardContent />;
}
```

### 3. 更新 Matrix 數據

```typescript
import { useMatrixData, useUpdateMatrixData } from '@/app/store';

function MatrixView() {
  const matrixData = useMatrixData();
  const updateMatrixData = useUpdateMatrixData();
  
  const unlockTrait = (traitId: string) => {
    const updatedTraits = matrixData.traits.map(trait =>
      trait.id === traitId
        ? { ...trait, discovered: true, strength: 100 }
        : trait
    );
    
    updateMatrixData({
      ...matrixData,
      discoveredTraits: matrixData.discoveredTraits + 1,
      traits: updatedTraits
    });
  };
  
  return <MatrixGrid onUnlock={unlockTrait} />;
}
```

### 4. 流程步驟管理

```typescript
import { useAppStore } from '@/app/store';

function OnboardingFlow() {
  const { currentStep, completeStep, setCurrentStep } = useAppStore();
  
  const handleStepComplete = () => {
    completeStep(currentStep);
    setCurrentStep(getNextStep(currentStep));
  };
  
  return (
    <div>
      <StepIndicator current={currentStep} />
      <StepContent step={currentStep} onComplete={handleStepComplete} />
    </div>
  );
}
```

### 5. URL 參數處理

```typescript
import { useUrlParams } from '@/app/store';

function TaskView() {
  const urlParams = useUrlParams();
  
  if (urlParams.taskId) {
    return <TaskDetail taskId={urlParams.taskId} />;
  }
  
  return <TaskList />;
}
```

## 持久化

Store 使用 Zustand 的 persist 中間件進行持久化。

### 持久化的狀態

```typescript
{
  userStatus: state.userStatus,
  walletAddress: state.walletAddress,
  humanityScore: state.humanityScore,
  completedSteps: state.completedSteps,
  matrixData: state.matrixData,
}
```

### LocalStorage 鍵

```
twin3-context-v3
```

### 清除持久化數據

```typescript
// 方法 1：使用 reset
const { reset } = useAppStore();
reset();

// 方法 2：直接清除 localStorage
localStorage.removeItem('twin3-context-v3');
```

## DevTools

Store 集成了 Redux DevTools 支持。

### 啟用 DevTools

1. 安裝 Redux DevTools 瀏覽器擴展
2. 打開開發者工具
3. 切換到 Redux 標籤
4. 選擇 "twin3-store"

### 調試功能

- 查看狀態變化
- 時間旅行調試
- Action 追蹤
- 狀態快照

## 最佳實踐

### 1. 使用 Selector Hooks

```typescript
// ✅ 好的做法
const userStatus = useUserStatus();

// ❌ 不好的做法
const { userStatus } = useAppStore();
```

### 2. 避免過度訂閱

```typescript
// ✅ 好的做法 - 只訂閱需要的狀態
const contextId = useContextId();

// ❌ 不好的做法 - 訂閱整個 store
const store = useAppStore();
```

### 3. 批量更新

```typescript
// ✅ 好的做法
const { setUserStatus, setHumanityScore } = useAppStore();
setUserStatus('verified');
setHumanityScore(135);

// ❌ 不好的做法 - 多次調用 set
useAppStore.setState({ userStatus: 'verified' });
useAppStore.setState({ humanityScore: 135 });
```

### 4. 類型安全

```typescript
// ✅ 好的做法 - 使用類型定義
const status: UserStatus = 'verified';
setUserStatus(status);

// ❌ 不好的做法 - 使用字符串字面量
setUserStatus('verified' as any);
```

## 性能考慮

- 使用 selector hooks 減少不必要的重渲染
- 持久化僅保存必要的狀態
- DevTools 僅在開發環境啟用
- 避免在 store 中存儲大量數據

## 未來改進

- [ ] 添加中間件支持
- [ ] 實現狀態遷移
- [ ] 添加狀態驗證
- [ ] 支持多 store 組合
- [ ] 添加狀態快照功能
- [ ] 實現撤銷/重做功能
