'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';
import type { Invite } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { acceptInvite } from './actions';

interface InviteViewProps {
  invite: Invite;
}

export default function InviteView({ invite }: InviteViewProps) {
  const [isAccepted, setIsAccepted] = useState(invite.status === 'accepted');
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const noButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isAccepted) {
      const duration = 5 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#F4B4C7', '#D0B4F4', '#FFFFFF'],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#F4B4C7', '#D0B4F4', '#FFFFFF'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [isAccepted]);

  const handleYesClick = async () => {
    setIsAccepted(true);
    await acceptInvite(invite.id);
  };

  const moveNoButton = () => {
    if (isAccepted || !noButtonRef.current) return;
    const button = noButtonRef.current;
    const container = button.parentElement?.parentElement?.parentElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    const maxLeft = containerRect.width - buttonRect.width;
    const maxTop = containerRect.height - buttonRect.height;
    
    const newLeft = Math.random() * maxLeft;
    const newTop = Math.random() * maxTop;

    setNoButtonStyle({
      position: 'absolute',
      left: `${newLeft}px`,
      top: `${newTop}px`,
      transition: 'top 0.3s ease, left 0.3s ease',
    });
  };

  return (
    <Card className="w-full max-w-md shadow-2xl relative overflow-hidden">
      {isAccepted ? (
        <div className="text-center p-8 md:p-12">
          <Heart className="w-16 h-16 text-primary mx-auto animate-pulse" />
          <h2 className="text-3xl font-bold font-headline mt-4">She said Yes!</h2>
          <p className="text-muted-foreground mt-2">
            Let the celebrations begin!
          </p>
        </div>
      ) : (
        <>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">A message for {invite.partnerName}</CardTitle>
            <CardDescription>From {invite.senderName}</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-lg py-8 px-6 min-h-[150px] flex items-center justify-center">
            <p className="italic">"{invite.message}"</p>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4 p-6 min-h-[80px] relative">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground z-10" onClick={handleYesClick}>
              Yes!
            </Button>
            <Button
              ref={noButtonRef}
              size="lg"
              variant="outline"
              style={noButtonStyle}
              onMouseEnter={moveNoButton}
            >
              No
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
