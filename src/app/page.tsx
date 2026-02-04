import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, MessageSquare, MousePointerClick, Bell } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');
  const personalizeImage = PlaceHolderImages.find((img) => img.id === 'feature-personalize');
  const interactiveImage = PlaceHolderImages.find((img) => img.id === 'feature-interactive');

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center bg-gradient-to-br from-primary/20 via-background to-background">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-20"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="container px-4 md:px-6 z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Eternal Echo
            </h1>
            <p className="mt-4 text-lg md:text-xl text-foreground/80">
              Craft a unique, interactive, and unforgettable Valentine's invitation. Because some questions deserve a special stage.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform transform hover:scale-105">
                <Link href="/dashboard">Create Your Invite</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl font-headline">
            How It Works
          </h2>
          <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl text-center mt-4">
            A simple process for a magical moment.
          </p>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <MessageSquare className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Personalize</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  Write a heartfelt message for your special someone. Your words, your way.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-accent/20 shadow-lg hover:shadow-accent/20 transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-accent/20 p-3 rounded-full">
                    <MousePointerClick className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Interactive Fun</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  A playful 'No' button that's hard to catch, making 'Yes' the only real option.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Bell className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Instant Joy</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  Get a real-time "They said YES!" notification and celebrate the moment together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Eternal Echo. All rights reserved.</p>
      </footer>
    </div>
  );
}
