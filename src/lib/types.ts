import type { Timestamp } from 'firebase/firestore';

export interface Invite {
  id: string;
  senderId: string;
  senderName: string;
  partnerName: string;
  message: string;
  status: 'pending' | 'accepted';
  createdAt: Timestamp;
}
