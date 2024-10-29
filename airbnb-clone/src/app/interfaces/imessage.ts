import { iApartment } from './iapartment';

export interface iMessage {
  id: number;
  senderId: string;
  receiverId: string;
  message: string;
  apartment?: iApartment;
  isRead: boolean;
}
