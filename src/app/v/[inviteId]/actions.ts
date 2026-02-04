'use server';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { revalidatePath } from 'next/cache';

export async function acceptInvite(inviteId: string) {
  if (!inviteId) {
    throw new Error('Invite ID is required');
  }

  try {
    const inviteRef = doc(db, 'invites', inviteId);
    await updateDoc(inviteRef, {
      status: 'accepted',
    });
    
    revalidatePath(`/v/${inviteId}`);
    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Error accepting invite:', error);
    // Depending on requirements, you might want to throw an error
    // to be caught by the client for user feedback.
  }
}
