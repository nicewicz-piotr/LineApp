import { Notification } from "./notification";

export interface Line {
    id: number;
    symbol: string;
    length: number;
    description: string;
    notifications: Notification[];
  }
  

