# 樣式使用指南

## 概述

本指南說明如何在 Twin3 項目中使用樣式系統。

## 文件結構

```
styles/
├── index.css          # 主入口文件
├── variables.css      # CSS 變量和設計 tokens
├── base.css           # 基礎樣式和重置
├── animations.css     # 動畫定義
├── components.css     # 組件樣式
└── utilities.css      # 工具類和響應式
```

## 導入樣式

### 在主應用中導入

```typescript
// src/main.tsx
import '@/styles/index.css';
```

### 在組件中使用

```typescript
// 組件中直接使用 CSS 類
function MyComponent() {
  return (
    <div className="card card-hover animate-fade-in">
      <h3 className="text-gradient">Title</h3>
      <button className="btn btn-primary">Action</button>
    </div>
  );
}
```

## 常用模式

### 1. 玻璃卡片

```tsx
<div className="card">
  <div className="widget-header">
    <h3>Card Title</h3>
  </div>
  <div className="widget-content">
    <p>Content goes here...</p>
  </div>
  <div className="widget-footer">
    <button className="btn btn-primary">Action</button>
  </div>
</div>
```

### 2. 按鈕組

```tsx
<div style={{ display: 'flex', gap: '12px' }}>
  <button className="btn btn-primary">
    Primary Action
  </button>
  <button className="btn btn-ghost">
    Secondary Action
  </button>
</div>
```

### 3. 列表項

```tsx
<div>
  <div className="list-item">
    <span>Item 1</span>
  </div>
  <div className="list-item">
    <span>Item 2</span>
  </div>
  <div className="list-item">
    <span>Item 3</span>
  </div>
</div>
```

### 4. 徽章

```tsx
<div style={{ display: 'flex', gap: '8px' }}>
  <span className="badge badge-success">Active</span>
  <span className="badge badge-warning">Pending</span>
  <span className="badge badge-info">Info</span>
  <span className="badge badge-error">Error</span>
</div>
```

### 5. 輸入框

```tsx
<div>
  <input
    type="text"
    placeholder="Enter text..."
    style={{
      width: '100%',
      padding: 'var(--space-md)',
      borderRadius: 'var(--radius-md)'
    }}
  />
</div>
```

## 動畫使用

### 淡入動畫

```tsx
<div className="animate-fade-in">
  Content fades in
</div>
```

### 彈簧生長動畫

```tsx
<div className="animate-spring-grow-glow">
  Content springs in with glow
</div>
```

### 特徵解鎖動畫

```tsx
<div className="animate-trait-unlock">
  Trait unlocked!
</div>
```

### 條件動畫

```tsx
function Component({ isNew }: { isNew: boolean }) {
  return (
    <div className={isNew ? 'animate-fade-in' : ''}>
      Content
    </div>
  );
}
```

## 響應式設計

### 移動端隱藏

```tsx
<div className="mobile-hidden">
  Only visible on desktop
</div>
```

### 桌面端隱藏

```tsx
<div className="desktop-hidden">
  Only visible on mobile
</div>
```

### 響應式卡片

```tsx
<div className="widget-container">
  <div className="card">
    {/* 自動適應移動端和桌面端 */}
  </div>
</div>
```

## 使用 CSS 變量

### 在內聯樣式中

```tsx
<div
  style={{
    color: 'var(--color-text-primary)',
    padding: 'var(--space-md)',
    borderRadius: 'var(--radius-md)',
    background: 'var(--glass-bg)',
  }}
>
  Content
</div>
```

### 在 CSS 模塊中

```css
.myComponent {
  color: var(--color-text-primary);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  background: var(--glass-bg);
}
```

## 主題顏色

### 文本顏色

```tsx
<p style={{ color: 'var(--color-text-primary)' }}>Primary text</p>
<p style={{ color: 'var(--color-text-secondary)' }}>Secondary text</p>
<p style={{ color: 'var(--color-text-dim)' }}>Dim text</p>
```

### 狀態顏色

```tsx
<span style={{ color: 'var(--color-success)' }}>Success</span>
<span style={{ color: 'var(--color-warning)' }}>Warning</span>
<span style={{ color: 'var(--color-info)' }}>Info</span>
```

## Twin Matrix 顏色

### 維度顏色

```tsx
// 物理維度
<div style={{ 
  background: `hsl(var(--matrix-physical))` 
}}>
  Physical
</div>

// 社交維度
<div style={{ 
  background: `hsl(var(--matrix-social))` 
}}>
  Social
</div>

// 數字維度
<div style={{ 
  background: `hsl(var(--matrix-digital))` 
}}>
  Digital
</div>

// 精神維度
<div style={{ 
  background: `hsl(var(--matrix-spiritual))` 
}}>
  Spiritual
</div>
```

## 常見問題

### Q: 如何創建自定義按鈕樣式？

A: 擴展現有的按鈕類：

```css
.btn-custom {
  @extend .btn;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
```

或使用內聯樣式：

```tsx
<button 
  className="btn"
  style={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  }}
>
  Custom Button
</button>
```

### Q: 如何調整卡片間距？

A: 使用 CSS 變量：

```tsx
<div 
  className="card"
  style={{ padding: 'var(--space-xl)' }}
>
  Content with extra padding
</div>
```

### Q: 如何禁用動畫？

A: 不添加動畫類即可：

```tsx
// 有動畫
<div className="card animate-fade-in">Content</div>

// 無動畫
<div className="card">Content</div>
```

### Q: 如何創建玻璃效果？

A: 使用 `.glass` 類：

```tsx
<div className="glass" style={{
  padding: 'var(--space-lg)',
  borderRadius: 'var(--radius-xl)'
}}>
  Glass effect content
</div>
```

## 性能優化

### 1. 避免過度使用動畫

```tsx
// ✅ 好的做法 - 僅在必要時使用動畫
<div className={isNew ? 'animate-fade-in' : ''}>
  Content
</div>

// ❌ 不好的做法 - 所有元素都有動畫
<div className="animate-fade-in">
  <p className="animate-fade-in">Text</p>
  <button className="animate-fade-in">Button</button>
</div>
```

### 2. 使用 CSS 變量而非計算

```tsx
// ✅ 好的做法
<div style={{ padding: 'var(--space-md)' }}>Content</div>

// ❌ 不好的做法
<div style={{ padding: `${16}px` }}>Content</div>
```

### 3. 批量樣式更新

```tsx
// ✅ 好的做法
const cardStyle = {
  padding: 'var(--space-lg)',
  borderRadius: 'var(--radius-xl)',
  background: 'var(--glass-bg)'
};

<div style={cardStyle}>Content</div>

// ❌ 不好的做法
<div style={{
  padding: 'var(--space-lg)',
  borderRadius: 'var(--radius-xl)',
  background: 'var(--glass-bg)'
}}>
  Content
</div>
```

## 調試技巧

### 1. 檢查 CSS 變量

```javascript
// 在瀏覽器控制台中
const root = document.documentElement;
const primaryColor = getComputedStyle(root)
  .getPropertyValue('--color-primary');
console.log(primaryColor); // #ffffff
```

### 2. 臨時修改變量

```javascript
document.documentElement.style
  .setProperty('--color-primary', '#ff0000');
```

### 3. 檢查應用的類

```javascript
const element = document.querySelector('.card');
console.log(element.classList);
```

## 遷移指南

### 從舊樣式遷移

```tsx
// 舊的做法
<div style={{
  background: 'rgba(28, 28, 30, 0.72)',
  backdropFilter: 'blur(40px)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '24px',
  padding: '24px'
}}>
  Content
</div>

// 新的做法
<div className="card">
  Content
</div>
```

## 參考資源

- [Design System Spec](./design-system.md)
- [CSS Variables Reference](../variables.css)
- [Animation Guidelines](../animations.css)
- [Component Styles](../components.css)
