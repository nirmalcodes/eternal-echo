'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import CreateInviteForm from './create-invite-form';
import InviteList from './invite-list';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="container py-12">
        <div className="space-y-8">
          <Skeleton className="h-10 w-1/3" />
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome, {user.displayName || 'Creator'}!</h1>
          <p className="text-muted-foreground">Create a new invite or see the status of your existing ones.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">Create New Invite</h2>
            <CreateInviteForm userId={user.uid} userName={user.displayName || 'Someone special'} />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">Your Invites</h2>
            <InviteList userId={user.uid} />
          </div>
        </div>
      </div>
    </div>
  );
}
