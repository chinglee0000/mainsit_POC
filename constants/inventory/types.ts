/**
 * Interaction Inventory Types
 */

export interface Suggestion {
  label: string;
  payload: string;
}

export interface InteractionNode {
  id: string;
  triggers: string[];
  response: {
    text: string;
    delay?: number;
    card?: {
      type: string;
      features?: Array<{
        icon: string;
        title: string;
        description: string;
        link?: string;
      }>;
      [key: string]: any;
    };
    widget?: string;
  };
  suggestedActions?: Suggestion[];
}

export type InteractionInventory = InteractionNode[];
