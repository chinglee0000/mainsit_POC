# Humanity Index Calculator

## 概述

Humanity Index Calculator 計算用戶的人性指數分數（0-255），基於多個維度的用戶行為和驗證狀態。

## 計算公式

```
Humanity Index = Σ(dimension_score × weight)
```

## 維度權重

| 維度 | 權重 | 最大分數 | 說明 |
|------|------|----------|------|
| Human Verification | 30% | 76.5 | 人類驗證完成度 |
| Task Completion | 25% | 63.75 | 任務完成度 |
| Social Binding | 20% | 51 | 社交綁定完成度 |
| Wallet Binding | 15% | 38.25 | 錢包綁定狀態 |
| Community Engagement | 10% | 25.5 | 社群參與度 |

**總計：** 100% = 255 分

## API

### calculateHumanityIndex

計算總體人性指數。

```typescript
interface HumanityIndexComponents {
  humanVerification: number;      // 0-1.0 (必需)
  taskCompletion?: number;        // 0-1.0 (可選)
  socialBinding?: number;         // 0-1.0 (可選)
  walletBinding?: number;         // 0 or 1 (可選)
  communityEngagement?: number;   // 0-1.0 (可選)
}

function calculateHumanityIndex(
  components: HumanityIndexComponents
): number
```

**參數：**
- `components` - 各維度的完成比例

**返回：**
- 人性指數分數（0-255）

**範例：**
```typescript
import { calculateHumanityIndex } from '@/lib/services';

const score = calculateHumanityIndex({
  humanVerification: 0.5,    // 50% 完成
  taskCompletion: 0.3,       // 30% 完成
  socialBinding: 0.8,        // 80% 完成
  walletBinding: 1,          // 已綁定
  communityEngagement: 0.4   // 40% 參與
});

console.log(score); // 135
```

### calculateHumanVerificationScore

計算人類驗證維度分數。

```typescript
function calculateHumanVerificationScore(
  completedWeight: number
): number
```

**參數：**
- `completedWeight` - 已完成驗證方法的權重總和（0-1.0）

**返回：**
- 驗證分數貢獻（0-76.5）

**範例：**
```typescript
import { calculateHumanVerificationScore } from '@/lib/services';

// 用戶完成了 reCAPTCHA (0.5 權重)
const score = calculateHumanVerificationScore(0.5);
console.log(score); // 38
```

### getDimensionPercentage

獲取維度完成百分比。

```typescript
function getDimensionPercentage(
  dimensionScore: number,
  maxDimensionScore: number
): number
```

**參數：**
- `dimensionScore` - 當前維度分數
- `maxDimensionScore` - 該維度最大分數

**返回：**
- 百分比（0-100）

**範例：**
```typescript
import { 
  getDimensionPercentage, 
  MAX_DIMENSION_SCORES 
} from '@/lib/services';

const percentage = getDimensionPercentage(
  38,
  MAX_DIMENSION_SCORES.humanVerification
);
console.log(percentage); // 50%
```

### humanityIndexToPercentage

將人性指數轉換為百分比。

```typescript
function humanityIndexToPercentage(
  humanityIndex: number
): number
```

**參數：**
- `humanityIndex` - 人性指數分數（0-255）

**返回：**
- 百分比（0-100）

**範例：**
```typescript
import { humanityIndexToPercentage } from '@/lib/services';

const percentage = humanityIndexToPercentage(135);
console.log(percentage); // 53%
```

## 常量

### DIMENSION_WEIGHTS

```typescript
const DIMENSION_WEIGHTS = {
  humanVerification: 0.30,
  taskCompletion: 0.25,
  socialBinding: 0.20,
  walletBinding: 0.15,
  communityEngagement: 0.10,
} as const;
```

### MAX_DIMENSION_SCORES

```typescript
const MAX_DIMENSION_SCORES = {
  humanVerification: 76.5,
  taskCompletion: 63.75,
  socialBinding: 51,
  walletBinding: 38.25,
  communityEngagement: 25.5,
} as const;
```

## 使用場景

### 1. 新用戶註冊

```typescript
// 僅完成 reCAPTCHA 驗證
const initialScore = calculateHumanityIndex({
  humanVerification: 0.5,  // reCAPTCHA 權重
});
// 結果：38 分
```

### 2. 完成錢包綁定

```typescript
const score = calculateHumanityIndex({
  humanVerification: 0.5,
  walletBinding: 1,  // 已綁定
});
// 結果：76 分
```

### 3. 活躍用戶

```typescript
const score = calculateHumanityIndex({
  humanVerification: 1.0,   // 完成所有驗證
  taskCompletion: 0.6,      // 完成 60% 任務
  socialBinding: 0.8,       // 綁定 80% 社交賬號
  walletBinding: 1,         // 已綁定錢包
  communityEngagement: 0.5  // 50% 社群參與
});
// 結果：213 分
```

### 4. 顯示進度

```typescript
const score = calculateHumanityIndex(components);
const percentage = humanityIndexToPercentage(score);

console.log(`Your Humanity Index: ${score}/255 (${percentage}%)`);
```

## 驗證方法權重

常見驗證方法的權重分配：

| 方法 | 權重 | 說明 |
|------|------|------|
| reCAPTCHA | 0.5 | 基礎人類驗證 |
| Biometric | 0.3 | 生物識別驗證 |
| Social OAuth | 0.2 | 社交賬號驗證 |

**總計：** 1.0

## 最佳實踐

1. **漸進式計算**
   ```typescript
   // 每次用戶完成新動作時重新計算
   const newScore = calculateHumanityIndex({
     ...previousComponents,
     taskCompletion: updatedTaskCompletion
   });
   ```

2. **顯示分解**
   ```typescript
   // 顯示各維度貢獻
   const verificationScore = components.humanVerification * 76.5;
   const taskScore = components.taskCompletion * 63.75;
   // ...
   ```

3. **設置里程碑**
   ```typescript
   const milestones = [
     { score: 38, label: "Verified Human" },
     { score: 76, label: "Wallet Connected" },
     { score: 135, label: "Active Member" },
     { score: 200, label: "Power User" },
   ];
   ```

4. **緩存計算結果**
   ```typescript
   // 只在組件變化時重新計算
   const score = useMemo(
     () => calculateHumanityIndex(components),
     [components]
   );
   ```

## 性能考慮

- 計算複雜度：O(1)
- 無外部依賴
- 純函數，易於測試
- 可安全緩存結果

## 未來改進

- [ ] 添加動態權重調整
- [ ] 支持自定義維度
- [ ] 添加時間衰減因子
- [ ] 實現分數歷史追蹤
- [ ] 添加異常檢測
