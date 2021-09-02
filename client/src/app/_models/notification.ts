import { Photo } from "./photo";
import { User } from "./user";


export interface Notification {
    id: number;
    lineId: number;
    userId: number;
    created: Date;
    description: string;
    photos: Photo[];
}
