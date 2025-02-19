// types/index.ts
export interface User {
    uid: string;
    name: string;
    email: string;
    roleId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Role {
    id: string;
    name: string;
    description?: string;
    allowedRoutes: string[];
    createdAt: string;
    updatedAt: string;
  }
  