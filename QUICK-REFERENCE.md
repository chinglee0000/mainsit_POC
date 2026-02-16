# Twin3 快速參考指南

## 🎯 新架構概覽

本項目採用 **View-Logic 分離模式**，所有元件分為邏輯層（RED ZONE）和視圖層（GREEN ZONE）。

## 📁 目錄結構

```
components/
├── basics/          # 基礎元件（Logo, Modal, Tooltip 等）
└── widgets/         # 業務元件（WalletBinding, TwinMatrix 等）

layouts/             # 佈局元件（ImmersiveIntro 等）
lib/                 # 核心工具（theme, utils）
specs/               # 規格文件
.agent/              # Agent 配置和規則
```

## 🎨 使用 Theme Tokens

### 顏色
```typescript
import { theme } from '@/lib/theme';

// 文字顏色
theme.colors.text.primary      // 主要文字
theme.colors.text.secondary    // 次要文字
theme.colors.text.dim          // 暗淡文字
theme.colors.text.inverse      // 反色文字

// 表面顏色
theme.colors.surface.primary   // 主要表面（按鈕等）
theme.colors.surface.secondary // 次要表面

// 背景顏色
theme.colors.background.base   // 基礎背景
theme.colors.background.elevated // 提升背景

// 玻璃態
theme.colors.glass.background  // 玻璃背景
theme.colors.glass.border      // 玻璃邊框

// 狀態顏色
theme.colors.status.success    // 成功（綠色）
theme.colors.status.error      // 錯誤（紅色）
theme.colors.status.warning    // 警告（橙色）
theme.colors.status.info       // 信息（藍色）
```

### 間距
```typescript
theme.spacing.xs    // 4px
theme.spacing.sm    // 8px
theme.spacing.md    // 16px
theme.spacing.lg    // 24px
theme.spacing.xl    // 32px
```

### 字體
```typescript
theme.typography.fontSize.xs      // 12px
theme.typography.fontSize.sm      // 14px
theme.typography.fontSize.base    // 16px
theme.typography.fontSize.lg      // 18px
theme.typography.fontSize.xl      // 20px

theme.typography.fontFamily.sans    // Inter
theme.typography.fontFamily.display // Montserrat
```

### 圓角
```typescript
theme.borderRadius.xs    // 4px
theme.borderRadius.sm    // 8px
theme.borderRadius.md    // 12px
theme.borderRadius.lg    // 16px
theme.borderRadius.xl    // 20px
```

## 🧩 使用元件

### 基礎元件

#### Logo
```tsx
import { Logo } from '@/components/basics/Logo';

<Logo width={100} height={100} variant="dark" />
```

#### Modal
```tsx
import { Modal } from '@/components/basics/Modal';

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h2>Modal Title</h2>
  <p>Modal content...</p>
</Modal>
```

#### Tooltip
```tsx
import { Tooltip } from '@/components/basics/Tooltip';

<Tooltip content="Helpful tip">
  <button>Hover me</button>
</Tooltip>
```

#### BrandIcon
```tsx
import { BrandIcon } from '@/components/basics/BrandIcon';

<BrandIcon brand="metamask" size="md" />
<BrandIcon brand="telegram" size={32} />
```

### 業務元件

#### WalletBinding
```tsx
import { WalletBinding } from '@/components/widgets/WalletBinding';

<WalletBinding
  onBindingComplete={(address, type) => {
    console.log(`Connected: ${type} - ${address}`);
  }}
/>
```

#### TwinMatrix
```tsx
import { TwinMatrix } from '@/components/widgets/TwinMatrix';

<TwinMatrix
  data={matrixData}
  onExplore={() => console.log('Explore clicked')}
/>
```

#### HumanVerification
```tsx
import { HumanVerification } from '@/components/widgets/HumanVerification';

<HumanVerification
  initialScore={0}
  onComplete={(score) => console.log('Score:', score)}
  onClose={() => setShowVerification(false)}
/>
```

## 🏗️ 創建新元件

### 1. 創建目錄結構
```bash
components/widgets/MyWidget/
├── index.tsx              # 邏輯層
├── MyWidget.view.tsx      # 視圖層
└── types.ts               # 類型定義（可選）
```

### 2. 邏輯層（index.tsx）
```tsx
import { useState } from 'react';
import { MyWidgetView } from './MyWidget.view';

export interface MyWidgetProps {
  title: string;
  onAction?: () => void;
}

export const MyWidget = ({ title, onAction }: MyWidgetProps) => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    onAction?.();
  };

  return (
    <MyWidgetView
      title={title}
      count={count}
      onButtonClick={handleClick}
    />
  );
};
```

### 3. 視圖層（MyWidget.view.tsx）
```tsx
import { theme } from '@/lib/theme';

export interface MyWidgetViewProps {
  title: string;
  count: number;
  onButtonClick: () => void;
}

export const MyWidgetView = ({
  title,
  count,
  onButtonClick,
}: MyWidgetViewProps) => {
  return (
    <div
      style={{
        padding: theme.spacing.md,
        background: theme.colors.glass.background,
        border: `1px solid ${theme.colors.glass.border}`,
        borderRadius: theme.borderRadius.md,
      }}
    >
      <h3 style={{ color: theme.colors.text.primary }}>{title}</h3>
      <p style={{ color: theme.colors.text.secondary }}>Count: {count}</p>
      <button
        onClick={onButtonClick}
        style={{
          padding: theme.spacing.sm,
          background: theme.colors.surface.primary,
          color: theme.colors.text.inverse,
          border: 'none',
          borderRadius: theme.borderRadius.sm,
          cursor: 'pointer',
        }}
      >
        Click me
      </button>
    </div>
  );
};
```

## 🔍 已完成元件列表

### 基礎元件 (5)
- Logo, LogoWithText, Tooltip, Modal, BrandIcon

### 業務元件 (16)
- WalletBinding, Recaptcha, RewardDashboard, ShareModal
- InviteFriends, AirdropClaim, WelcomeMember
- CommunityStatsToast, CommunityPreview, FinalRewardDashboard
- BiometricVerification, AirdropTaskDashboard, ActiveTaskWidget
- GlobalDashboardWidget, HumanVerification, TwinMatrix

### 佈局元件 (1)
- ImmersiveIntro

## 🎯 最佳實踐

### DO ✅
- 使用 theme tokens 而非硬編碼顏色
- 將邏輯和視圖分離
- 為每個元件創建規格文件
- 使用 TypeScript 類型定義
- 考慮響應式設計
- 添加無障礙性支持

### DON'T ❌
- 不要在視圖層添加業務邏輯
- 不要硬編碼顏色值
- 不要忽略 TypeScript 錯誤
- 不要忘記移動端適配
- 不要跳過規格文件

## 📚 相關文檔

- `REFACTOR-PLAN.md` - 完整重構計劃
- `REFACTOR-PROGRESS.md` - 進度追蹤
- `REFACTOR-SUMMARY.md` - 總結報告
- `.agent/rules/` - 項目規則和規範
- `specs/` - 元件規格文件
