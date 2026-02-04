'use server';

import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { revalidatePath } from 'next/cache';

const inviteSchema = z.object({
  partnerName: z.string().min(1, "Partner's name is required."),
  message: z.string().min(1, 'A message is required.'),
  userId: z.string(),
  userName: z.string(),
});

export async function createInvite(formData: FormData) {
  const rawData = {
    partnerName: formData.get('partnerName'),
    message: formData.get('message'),
    userId: formData.get('userId'),
    userName: formData.get('userName'),
  };

  const validatedFields = inviteSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { partnerName, message, userId, userName } = validatedFields.data;

  try {
    await addDoc(collection(db, 'invites'), {
      senderId: userId,
      senderName: userName,
      partnerName,
      message,
      status: 'pending',
      createdAt: serverTimestamp(),
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error creating invite:', error);
    return {
      errors: { _form: ['Failed to create invite. Please try again.'] },
    };
  }
}
