import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import InviteView from './invite-view';
import type { Invite, SerializableInvite } from '@/lib/types';
import { notFound } from 'next/navigation';

async function getInvite(id: string) {
  const docRef = doc(db, 'invites', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Invite;
  } else {
    return null;
  }
}

export default async function InvitePage({ params }: { params: { inviteId: string } }) {
  const inviteData = await getInvite(params.inviteId);

  if (!inviteData) {
    notFound();
  }

  const invite: SerializableInvite = {
    ...inviteData,
    createdAt: inviteData.createdAt.toDate().toISOString(),
  };

  return (
    <div className="w-full h-[calc(100vh-56px)] bg-gradient-to-br from-primary/20 via-background to-accent/10 flex items-center justify-center p-4">
      <InviteView invite={invite} />
    </div>
  );
}
