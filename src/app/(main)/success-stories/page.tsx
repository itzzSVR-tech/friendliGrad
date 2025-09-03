import { mockSuccessStories } from '@/lib/mock-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function SuccessStoriesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-headline font-bold text-primary">Alumni Success Stories</h1>
          <p className="text-lg text-muted-foreground mt-2">Be inspired by the achievements of our fellow alumni.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockSuccessStories.map(story => (
            <Card key={story.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-56 w-full">
                <Image
                  src={story.imageUrl}
                  alt={story.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint="professional person"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl">{story.title}</CardTitle>
                <CardDescription>
                  {story.alumniName} - Class of {story.graduationYear}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{story.story}</p>
              </CardContent>
              <CardFooter>
                 <Button variant="link" className="p-0 text-primary hover:text-primary/80">
                    Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
