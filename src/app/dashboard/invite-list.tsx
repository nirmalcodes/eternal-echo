'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Invite } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Clipboard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface InviteListProps {
  userId: string;
}

export default function InviteList({ userId }: InviteListProps) {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, 'invites'),
      where('senderId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const invitesData: Invite[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        invitesData.push({ id: doc.id, ...data } as Invite);
      });
      
      // Check for newly accepted invites
      invitesData.forEach(newInvite => {
        const oldInvite = invites.find(i => i.id === newInvite.id);
        if (oldInvite && oldInvite.status === 'pending' && newInvite.status === 'accepted') {
          toast({
            title: `💖 They said YES! 💖`,
            description: `${newInvite.partnerName} accepted your invite!`,
            duration: 10000,
          });
        }
      });
      
      setInvites(invitesData);
      setLoading(false);
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const copyToClipboard = (id: string) => {
    const url = `${window.location.origin}/v/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    );
  }

  if (invites.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <p className="text-muted-foreground">You haven't created any invites yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {invites.map((invite) => (
        <Card key={invite.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="font-headline text-xl">For: {invite.partnerName}</CardTitle>
                <CardDescription>
                  Created on: {invite.createdAt?.toDate().toLocaleDateString()}
                </CardDescription>
              </div>
              {invite.status === 'accepted' ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">They said YES! 🎉</Badge>
              ) : (
                <Badge variant="secondary">Pending</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 rounded-md border p-2">
              <p className="text-sm text-muted-foreground truncate flex-1">
                {`${window.location.origin}/v/${invite.id}`}
              </p>
              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(invite.id)}>
                {copiedId === invite.id ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
                <span className="sr-only">Copy link</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
