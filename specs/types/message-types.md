# Message Types

## 概述

Message Types 定義了聊天消息和卡片的類型結構，用於 Twin3 的對話界面。

## 類型定義

### Role

消息角色類型。

```typescript
type Role = 'user' | 'assistant';
```

**值：**
- `user` - 用戶消息
- `assistant` - AI 助手消息

### MessageType

消息類型。

```typescript
type MessageType = 'text' | 'card' | 'widget';
```

**值：**
- `text` - 純文本消息
- `card` - 卡片消息（包含結構化內容）
- `widget` - 小工具消息（渲染互動組件）

### Action

操作按鈕定義。

```typescript
interface Action {
  label: string;
  actionId: string;
  variant?: 'primary' | 'secondary' | 'outline';
}
```

**屬性：**
- `label` - 按鈕文本
- `actionId` - 操作 ID（用於觸發相應動作）
- `variant` - 按鈕樣式（可選）

**範例：**
```typescript
const action: Action = {
  label: 'Accept Task',
  actionId: 'accept_task',
  variant: 'primary'
};
```

### TaskOpportunityPayload

任務機會數據結構。

```typescript
interface TaskOpportunityPayload {
  brand: {
    name: string;
    logoUrl: string;
  };
  title: string;
  description: string;
  imageUrl?: string;
  reward: {
    tokens: string;
    gift?: string;
  };
  status: 'open' | 'closed';
  spotsLeft?: number;
  deadline?: string;
  acceptedCount?: number;
  totalSpots?: number;
}
```

**範例：**
```typescript
const task: TaskOpportunityPayload = {
  brand: {
    name: "L'Oreal Paris",
    logoUrl: 'https://example.com/logo.png'
  },
  title: 'Lipstick Filter Challenge',
  description: 'Create 15-60s Reels...',
  imageUrl: 'https://example.com/campaign.jpg',
  reward: {
    tokens: '500 $twin3',
    gift: 'Full PR Package (Worth $3000)'
  },
  status: 'open',
  spotsLeft: 3,
  deadline: '2025/01/15'
};
```

### CardData

卡片數據聯合類型。

```typescript
type CardData =
  | { type: 'intro'; title: string; description: string; actions?: CardAction[] }
  | { type: 'generic'; title: string; description: string; actions?: CardAction[] }
  | { type: 'task_opportunity'; taskPayload: TaskOpportunityPayload; actions?: CardAction[] }
  | { type: 'task_detail'; title: string; description: string; imageUrl?: string; actions?: CardAction[] }
  | { type: 'confirmation'; title: string; description: string; actions?: CardAction[] }
  | { type: 'feature_grid'; features: Array<{ icon?: string; title: string; description: string; link?: string }> };
```

**卡片類型：**

#### 1. intro - 介紹卡片
```typescript
{
  type: 'intro',
  title: 'Welcome to Twin3',
  description: 'Build your digital twin...',
  actions: [
    { label: 'Get Started', actionId: 'start', variant: 'primary' }
  ]
}
```

#### 2. generic - 通用卡片
```typescript
{
  type: 'generic',
  title: 'Information',
  description: 'Here is some information...',
  actions: [
    { label: 'Learn More', actionId: 'learn_more' }
  ]
}
```

#### 3. task_opportunity - 任務機會卡片
```typescript
{
  type: 'task_opportunity',
  taskPayload: { /* TaskOpportunityPayload */ },
  actions: [
    { label: 'View Details', actionId: 'view_task', variant: 'primary' },
    { label: 'Decline', actionId: 'decline_task', variant: 'secondary' }
  ]
}
```

#### 4. task_detail - 任務詳情卡片
```typescript
{
  type: 'task_detail',
  title: "L'Oreal Paris — Lipstick Filter Challenge",
  description: '**Requirements**\n• Create 15-60s Reels...',
  imageUrl: 'https://example.com/detail.jpg',
  actions: [
    { label: 'Accept Task', actionId: 'accept_task', variant: 'primary' }
  ]
}
```

#### 5. confirmation - 確認卡片
```typescript
{
  type: 'confirmation',
  title: 'Task Accepted',
  description: 'You have successfully accepted this task!',
  actions: [
    { label: 'View Dashboard', actionId: 'dashboard' }
  ]
}
```

#### 6. feature_grid - 功能網格卡片
```typescript
{
  type: 'feature_grid',
  features: [
    {
      icon: '🎯',
      title: 'Complete Tasks',
      description: 'Earn rewards by completing brand tasks',
      link: '/tasks'
    },
    {
      icon: '🔐',
      title: 'Verify Identity',
      description: 'Prove you are a real human',
      link: '/verify'
    }
  ]
}
```

### Message

完整的消息對象。

```typescript
interface Message {
  id: string;
  role: Role;
  type: MessageType;
  content: string;
  cardData?: CardData;
  widget?: string;
  timestamp: number;
}
```

**屬性：**
- `id` - 消息唯一 ID
- `role` - 消息角色（user/assistant）
- `type` - 消息類型（text/card/widget）
- `content` - 消息文本內容
- `cardData` - 卡片數據（可選）
- `widget` - 小工具類型（可選）
- `timestamp` - 時間戳

**範例：**

#### 文本消息
```typescript
const textMessage: Message = {
  id: 'msg-001',
  role: 'assistant',
  type: 'text',
  content: 'Hello! How can I help you today?',
  timestamp: Date.now()
};
```

#### 卡片消息
```typescript
const cardMessage: Message = {
  id: 'msg-002',
  role: 'assistant',
  type: 'card',
  content: 'Here is a task opportunity for you:',
  cardData: {
    type: 'task_opportunity',
    taskPayload: { /* ... */ },
    actions: [
      { label: 'View Details', actionId: 'view_task', variant: 'primary' }
    ]
  },
  timestamp: Date.now()
};
```

#### 小工具消息
```typescript
const widgetMessage: Message = {
  id: 'msg-003',
  role: 'assistant',
  type: 'widget',
  content: 'Here is your Twin Matrix:',
  widget: 'twin_matrix',
  timestamp: Date.now()
};
```

## 使用場景

### 1. 創建文本消息

```typescript
import type { Message } from '@/types';

function createTextMessage(content: string, role: Role = 'user'): Message {
  return {
    id: `msg-${Date.now()}`,
    role,
    type: 'text',
    content,
    timestamp: Date.now()
  };
}
```

### 2. 創建卡片消息

```typescript
import type { Message, CardData } from '@/types';

function createCardMessage(content: string, cardData: CardData): Message {
  return {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    type: 'card',
    content,
    cardData,
    timestamp: Date.now()
  };
}
```

### 3. 創建小工具消息

```typescript
import type { Message } from '@/types';

function createWidgetMessage(content: string, widget: string): Message {
  return {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    type: 'widget',
    content,
    widget,
    timestamp: Date.now()
  };
}
```

### 4. 渲染消息

```typescript
import type { Message } from '@/types';

function MessageBubble({ message }: { message: Message }) {
  if (message.type === 'text') {
    return <TextMessage content={message.content} />;
  }
  
  if (message.type === 'card' && message.cardData) {
    return <CardMessage cardData={message.cardData} />;
  }
  
  if (message.type === 'widget' && message.widget) {
    return <WidgetMessage widget={message.widget} />;
  }
  
  return null;
}
```

### 5. 處理操作

```typescript
import type { Action } from '@/types';

function handleAction(action: Action) {
  switch (action.actionId) {
    case 'accept_task':
      // 處理接受任務
      break;
    case 'decline_task':
      // 處理拒絕任務
      break;
    case 'view_task':
      // 處理查看任務
      break;
    default:
      console.warn('Unknown action:', action.actionId);
  }
}
```

## 最佳實踐

### 1. 使用類型守衛

```typescript
function isCardMessage(message: Message): message is Message & { cardData: CardData } {
  return message.type === 'card' && !!message.cardData;
}

function isWidgetMessage(message: Message): message is Message & { widget: string } {
  return message.type === 'widget' && !!message.widget;
}
```

### 2. 卡片類型判斷

```typescript
function isTaskOpportunityCard(cardData: CardData): cardData is Extract<CardData, { type: 'task_opportunity' }> {
  return cardData.type === 'task_opportunity';
}
```

### 3. 消息 ID 生成

```typescript
// ✅ 好的做法 - 使用唯一 ID
const id = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// ❌ 不好的做法 - 可能重複
const id = `msg-${Date.now()}`;
```

### 4. 時間戳處理

```typescript
// ✅ 好的做法 - 使用 Date.now()
const timestamp = Date.now();

// ❌ 不好的做法 - 使用 Date 對象
const timestamp = new Date(); // 類型不匹配
```

## 驗證

### 消息驗證

```typescript
function validateMessage(message: Message): boolean {
  if (!message.id || !message.role || !message.type || !message.content) {
    return false;
  }
  
  if (message.type === 'card' && !message.cardData) {
    return false;
  }
  
  if (message.type === 'widget' && !message.widget) {
    return false;
  }
  
  return true;
}
```

### 卡片數據驗證

```typescript
function validateCardData(cardData: CardData): boolean {
  if (!cardData.type) {
    return false;
  }
  
  if (cardData.type === 'task_opportunity' && !cardData.taskPayload) {
    return false;
  }
  
  return true;
}
```

## 未來改進

- [ ] 添加消息編輯支持
- [ ] 支持消息回覆
- [ ] 添加消息狀態（發送中、已發送、已讀）
- [ ] 支持富文本格式
- [ ] 添加附件支持
- [ ] 實現消息搜索
