# 專案重構計劃 - 按照 twin3-mainsite 範本

## 參考倉庫結構分析

### 核心組織原則
1. **Spec-Driven Development**: 規格文件作為單一真相來源
2. **View-Logic 分離**: 
   - `*.view.tsx` - 純 UI 層（綠區，安全編輯）
   - `index.tsx` - 邏輯層（紅區，嚴格控制）
3. **分層架構**:
   - `app/` - Next.js App Router（頁面層）
   - `components/basics/` - 基礎 UI 元件
   - `components/widgets/` - 業務功能元件
   - `layouts/` - 佈局元件
   - `constants/` - 常量和資料
   - `lib/` - 工具函數和配置
   - `specs/` - 規格文件

### 元件結構模式
```
components/basics/Button/
├── index.tsx           # 邏輯層（紅區）
├── Button.view.tsx     # 視圖層（綠區）
└── Button.stories.tsx  # Storybook（綠區）
```

## 當前專案結構
```
src/
├── components/         # 共用元件
├── features/          # 功能模組
│   ├── chat/
│   ├── twin-matrix/
│   ├── widgets/
│   └── human-verification/
├── data/              # 資料層
├── services/          # 服務層
├── store/             # 狀態管理
├── hooks/             # 自定義 Hooks
├── types/             # 類型定義
└── styles/            # 樣式

```

## 重構目標結構
```
app/                    # Next.js App Router
├── page.tsx           # 首頁邏輯（紅區）
├── page.view.tsx      # 首頁視圖（綠區）
├── layout.tsx         # 根佈局
├── providers.tsx      # Provider 配置
└── globals.css        # 全域樣式

components/
├── basics/            # 基礎 UI 元件
│   ├── Logo/
│   │   ├── index.tsx
│   │   ├── Logo.view.tsx
│   │   └── Logo.stories.tsx
│   ├── Button/
│   ├── Modal/
│   └── Tooltip/
└── widgets/           # 業務功能元件
    ├── TwinMatrix/
    │   ├── index.tsx
    │   ├── TwinMatrix.view.tsx
    │   └── TwinMatrix.stories.tsx
    ├── HumanVerification/
    ├── WalletBinding/
    └── RewardDashboard/

layouts/               # 佈局元件
├── ChatLayout/
│   ├── index.tsx
│   ├── ChatLayout.view.tsx
│   └── ChatLayout.stories.tsx
└── HeroSection/

constants/             # 常量和資料
├── interactionInventory.ts
├── verificationMethods.ts
└── matrixData.ts

lib/                   # 工具和配置
├── theme.ts          # 主題配置
├── utils.ts          # 工具函數
└── validations/      # Zod 驗證

specs/                 # 規格文件
├── basics/
│   ├── logo.md
│   ├── button.md
│   └── modal.md
└── widgets/
    ├── twin-matrix.md
    ├── human-verification.md
    └── wallet-binding.md

public/                # 靜態資源
├── brands/
└── videos/

.agent/                # Agent 配置
├── rules/
│   ├── project-rules.md
│   ├── design-system.md
│   └── code-convention.md
├── workflows/
└── skills/
```

## 重構步驟

### Phase 1: 建立新結構框架
- [ ] 1.1 創建 `app/` 目錄結構
- [ ] 1.2 創建 `components/basics/` 和 `components/widgets/`
- [ ] 1.3 創建 `layouts/` 目錄
- [ ] 1.4 創建 `constants/` 目錄
- [ ] 1.5 創建 `specs/` 目錄
- [ ] 1.6 創建 `.agent/` 配置目錄

### Phase 2: 遷移基礎元件 (Basics)
- [ ] 2.1 Logo 元件
  - [ ] 創建 `components/basics/Logo/`
  - [ ] 分離 `index.tsx` 和 `Logo.view.tsx`
  - [ ] 創建規格文件 `specs/basics/logo.md`
- [ ] 2.2 LogoWithText 元件
- [ ] 2.3 Tooltip 元件
- [ ] 2.4 Modal 元件（ResponsiveModal）

### Phase 3: 遷移業務元件 (Widgets)
- [ ] 3.1 TwinMatrix
  - [ ] 重構為 `components/widgets/TwinMatrix/`
  - [ ] 分離視圖和邏輯
  - [ ] 創建規格文件 `specs/widgets/twin-matrix.md`
- [ ] 3.2 HumanVerification
- [ ] 3.3 WalletBinding
- [ ] 3.4 RewardDashboard
- [ ] 3.5 AirdropClaim
- [ ] 3.6 其他 widgets

### Phase 4: 遷移佈局元件 (Layouts)
- [ ] 4.1 ChatLayout
  - [ ] 重構為 `layouts/ChatLayout/`
  - [ ] 分離視圖和邏輯
- [ ] 4.2 ImmersiveIntro（可能作為 HeroSection）

### Phase 5: 整合資料層
- [ ] 5.1 遷移 `data/inventory/` 到 `constants/interactionInventory.ts`
- [ ] 5.2 遷移 `data/matrix/` 到 `constants/matrixData.ts`
- [ ] 5.3 遷移 `data/profiles/` 到 `constants/profiles.ts`
- [ ] 5.4 整合驗證方法資料

### Phase 6: 服務和工具層
- [ ] 6.1 遷移 `services/` 到 `lib/`
- [ ] 6.2 遷移 `hooks/` 到對應元件內部或 `lib/hooks/`
- [ ] 6.3 整合 `utils/logger.ts` 到 `lib/utils.ts`

### Phase 7: 狀態管理
- [ ] 7.1 評估是否需要 Zustand（參考倉庫使用 React Query）
- [ ] 7.2 如需保留，遷移到 `lib/store/`

### Phase 8: 類型定義
- [ ] 8.1 整合 `types/` 到各自元件內部
- [ ] 8.2 共用類型移到 `lib/types/`

### Phase 9: 樣式系統
- [ ] 9.1 創建 `lib/theme.ts`（參考 MUI theme）
- [ ] 9.2 遷移 CSS 變量到主題配置
- [ ] 9.3 整合 `styles/` 到 `app/globals.css`

### Phase 10: 規格文件
- [ ] 10.1 為每個基礎元件創建規格文件
- [ ] 10.2 為每個業務元件創建規格文件
- [ ] 10.3 創建佈局規格文件

### Phase 11: Agent 配置
- [ ] 11.1 創建 `.agent/rules/project-rules.md`
- [ ] 11.2 創建 `.agent/rules/design-system.md`
- [ ] 11.3 創建 `.agent/workflows/`

### Phase 12: 清理和測試
- [ ] 12.1 刪除舊的 `src/` 目錄
- [ ] 12.2 更新所有 import 路徑
- [ ] 12.3 測試所有功能
- [ ] 12.4 更新文檔

## 關鍵原則

### View-Logic 分離
```typescript
// ❌ 錯誤：邏輯和視圖混在一起
export const Button = ({ onClick, children }) => {
  const [loading, setLoading] = useState(false);
  
  const handleClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };
  
  return <button onClick={handleClick}>{children}</button>;
};

// ✅ 正確：分離邏輯和視圖
// index.tsx (邏輯層)
export const Button = (props) => {
  const [loading, setLoading] = useState(false);
  
  const handleClick = async () => {
    setLoading(true);
    await props.onClick();
    setLoading(false);
  };
  
  return <ButtonView {...props} loading={loading} onClick={handleClick} />;
};

// Button.view.tsx (視圖層)
export const ButtonView = ({ loading, onClick, children }) => {
  return (
    <button onClick={onClick} disabled={loading}>
      {loading ? 'Loading...' : children}
    </button>
  );
};
```

### 主題優先
```typescript
// ❌ 錯誤：硬編碼顏色
<div style={{ backgroundColor: '#1976d2', color: '#fff' }}>

// ✅ 正確：使用主題
<div style={{ 
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.default 
}}>
```

### Spec-Driven
每個元件都應該有對應的規格文件，包含：
1. Overview - 元件概述
2. Props API - 屬性接口
3. Visual Specifications - 視覺規格
4. Usage Examples - 使用範例

## 遷移優先級

### 高優先級（立即執行）
1. 建立新目錄結構
2. 遷移基礎元件（Logo, Tooltip, Modal）
3. 創建主題配置
4. 遷移 ChatLayout

### 中優先級（第二階段）
1. 遷移所有 Widgets
2. 整合資料層
3. 創建規格文件

### 低優先級（優化階段）
1. Storybook 整合
2. Agent 配置完善
3. 測試覆蓋

## 注意事項

1. **漸進式遷移**: 不要一次性重構所有內容，按模組逐步遷移
2. **保持功能正常**: 每個階段完成後確保應用仍可運行
3. **更新 import**: 使用 IDE 的重構功能批量更新 import 路徑
4. **測試驗證**: 每個模組遷移後進行功能測試
5. **文檔同步**: 及時更新 README 和相關文檔

## 預期收益

1. **更清晰的結構**: 按功能和職責明確分類
2. **更好的協作**: View-Logic 分離讓設計師和開發者可以並行工作
3. **更易維護**: Spec-Driven 確保文檔和代碼同步
4. **更高質量**: 規範的結構和模式減少錯誤
5. **更快開發**: 清晰的邊界和模式加速新功能開發
