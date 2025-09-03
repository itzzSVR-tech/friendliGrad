import { mockNews } from '@/lib/mock-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function NewsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-headline font-bold text-primary">News &amp; Announcements</h1>
          <p className="text-lg text-muted-foreground mt-2">Stay up-to-date with the latest from our community.</p>
        </header>
        
        <div className="space-y-8">
          {mockNews.map(article => (
            <Card key={article.id} className="flex flex-col md:flex-row overflow-hidden transition-shadow hover:shadow-lg">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  data-ai-hint="university building"
                />
              </div>
              <div className="md:w-2/3 flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{article.title}</CardTitle>
                  <CardDescription>
                    {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - By {article.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{article.snippet}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="p-0 text-primary hover:text-primary/80">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
