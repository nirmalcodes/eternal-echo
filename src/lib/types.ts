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

export type SerializableInvite = Omit<Invite, 'createdAt'> & {
  createdAt: string;
};
