# Twin3 Design System

## 概述

Twin3 設計系統基於 iOS 風格的 Glassmorphism 美學，採用極簡主義的黑白灰配色方案。

## 設計原則

### 1. 極簡主義
- 黑白灰為主色調
- 減少視覺噪音
- 突出內容本身

### 2. Glassmorphism
- 毛玻璃效果
- 半透明背景
- 柔和的陰影和光暈

### 3. 響應式設計
- 移動優先
- 流暢的過渡動畫
- 觸控友好的交互

## 顏色系統

### 基礎顏色

```css
--color-bg-base: #000000;        /* 基礎背景 */
--color-bg-elevated: #0a0a0a;    /* 提升背景 */
--color-bg-card: rgba(28, 28, 30, 0.6);  /* 卡片背景 */
```

### 灰階系統（Tailwind Gray）

```css
--gray-50: #f9fafb;   /* 最亮 */
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;  /* 最暗 */
```

### 強調色

```css
--color-primary: #ffffff;        /* 主色 */
--color-secondary: #8e8e93;      /* 次要色 */
--color-accent: #86868b;         /* 強調色 */
--color-success: #30d158;        /* 成功 */
--color-warning: #ff9f0a;        /* 警告 */
--color-info: #8B5CF6;           /* 信息 */
```

### 文本顏色

```css
--color-text-primary: var(--gray-50);    /* 主要文本 */
--color-text-secondary: var(--gray-400); /* 次要文本 */
--color-text-dim: var(--gray-600);       /* 暗淡文本 */
```

### Glassmorphism

```css
--glass-bg: rgba(28, 28, 30, 0.72);      /* 玻璃背景 */
--glass-border: rgba(255, 255, 255, 0.12); /* 玻璃邊框 */
--glass-blur: 40px;                       /* 模糊程度 */
```

### Twin Matrix 維度顏色

```css
--matrix-physical: 8 100% 41%;           /* 物理維度 */
--matrix-social: 44 100% 51%;            /* 社交維度 */
--matrix-digital: 207 52% 51%;           /* 數字維度 */
--matrix-spiritual: 173 74% 36%;         /* 精神維度 */
--matrix-undiscovered: 220 9% 88%;       /* 未發現 */
```

## 字體系統

### 字體家族

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
--font-heading: 'Montserrat', 'Inclusive Sans', 'Sora', sans-serif;
```

### 字重（最大 500）

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
```

## 間距系統

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
```

## 圓角系統

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;
```

## 陰影和光暈

### 陰影

```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.32);
--shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.56);
```

### 光暈

```css
--glow-primary: 0 0 0 1px rgba(255, 255, 255, 0.08);
--glow-accent: 0 0 24px rgba(255, 255, 255, 0.06);
```

## 組件樣式

### 按鈕

#### Primary Button
```css
.btn-primary {
  background: #ffffff;
  color: #000000;
  border: 1px solid transparent;
  border-radius: 12px;
}

.btn-primary:hover {
  background: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}
```

### 卡片

```css
.card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-lg);
  box-shadow: var(--shadow-md);
}

.card-hover:hover {
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

### 輸入框

```css
input, textarea {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  padding: var(--space-md);
}

input:focus, textarea:focus {
  background: rgba(255, 255, 255, 0.04);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
```

### 徽章

```css
.badge {
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.badge-success {
  background: rgba(48, 209, 88, 0.15);
  border: 1px solid rgba(48, 209, 88, 0.3);
  color: var(--color-success);
}
```

## 動畫系統

### 淡入動畫

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
```

### 彈簧生長動畫

```css
@keyframes spring-grow-glow {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  40% {
    opacity: 1;
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  60% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
}
```

### 動畫使用指南

**應該使用動畫的元素：**
- 卡片
- 小工具
- 模態框
- 互動元素

**不應該使用動畫的元素：**
- 聊天消息文本
- 段落文本
- 表單文本

## 響應式設計

### 斷點

```css
/* 移動設備 */
@media (max-width: 600px) {
  .card {
    padding: var(--space-md);
    border-radius: var(--radius-lg);
  }
}

/* 平板設備 */
@media (max-width: 768px) {
  .mobile-hidden {
    display: none !important;
  }
}

/* 桌面設備 */
@media (min-width: 1024px) {
  .desktop-hidden {
    display: none !important;
  }
}
```

## 使用範例

### 創建玻璃卡片

```html
<div class="card card-hover animate-fade-in">
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
  <button class="btn btn-primary">Action</button>
</div>
```

### 創建按鈕組

```html
<div style="display: flex; gap: 12px;">
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-ghost">Secondary</button>
</div>
```

### 創建徽章

```html
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-error">Error</span>
```

## 最佳實踐

### 1. 使用 CSS 變量

```css
/* ✅ 好的做法 */
.my-component {
  color: var(--color-text-primary);
  padding: var(--space-md);
  border-radius: var(--radius-md);
}

/* ❌ 不好的做法 */
.my-component {
  color: #f9fafb;
  padding: 16px;
  border-radius: 12px;
}
```

### 2. 使用預定義的類

```html
<!-- ✅ 好的做法 -->
<button class="btn btn-primary">Click me</button>

<!-- ❌ 不好的做法 -->
<button style="background: white; color: black;">Click me</button>
```

### 3. 響應式設計

```css
/* ✅ 好的做法 - 移動優先 */
.component {
  padding: var(--space-md);
}

@media (min-width: 768px) {
  .component {
    padding: var(--space-lg);
  }
}

/* ❌ 不好的做法 - 桌面優先 */
.component {
  padding: var(--space-lg);
}

@media (max-width: 768px) {
  .component {
    padding: var(--space-md);
  }
}
```

### 4. 動畫性能

```css
/* ✅ 好的做法 - 使用 transform 和 opacity */
.animate {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* ❌ 不好的做法 - 使用 width 和 height */
.animate {
  transition: width 0.3s ease, height 0.3s ease;
}
```

## 無障礙性

### 顏色對比度

確保文本和背景之間有足夠的對比度：
- 主要文本：至少 4.5:1
- 大文本：至少 3:1

### 焦點狀態

```css
button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### 觸控目標

最小觸控目標尺寸：44x44px

```css
.icon-btn {
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
}
```

## 未來改進

- [ ] 添加暗色/亮色主題切換
- [ ] 支持自定義主題顏色
- [ ] 添加更多動畫效果
- [ ] 優化移動端性能
- [ ] 添加 RTL 支持
- [ ] 實現主題預設
