import 'express';

declare global {
  namespace Express {
    interface User {
        username?: string;
        password?: string;
        id: string;
        displayName?: string;
        email?: string;
        provider?: string;
        type: string;
      
    }
  }
}