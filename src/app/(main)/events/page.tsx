import { mockEvents } from '@/lib/mock-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';

export default function EventsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-headline font-bold text-primary">Upcoming Events</h1>
          <p className="text-lg text-muted-foreground mt-2">Join us at our upcoming events to reconnect and network.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockEvents.map(event => (
            <Card key={event.id} className="flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint="community event"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground pt-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm">{event.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Register Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
