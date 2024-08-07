// src/types.ts
export interface Condition {
  type: 'dayOfWeek' | 'aprComparison' | /* other condition types */;
  check: () => Promise<boolean>;
}

export interface Action {
  type: 'contractInteraction' | /* other action types */;
  execute: () => Promise<void>;
}

export interface Strategy {
  id: string;
  name: string;
  conditions: Condition[];
  actions: Action[];
}


