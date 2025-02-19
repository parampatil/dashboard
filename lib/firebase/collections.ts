// lib/firebase/collections.ts
export interface Role {
    name: string;
    permissions: {
      routes: string[];
      actions: string[];
    };
    createdAt: string;
    createdBy: string;
  }
  