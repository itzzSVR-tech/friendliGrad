import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Newspaper, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="relative rounded-xl overflow-hidden mb-8 shadow-lg">
            <Image
              src="https://picsum.photos/1200/400"
              alt="Alumni gathering"
              width={1200}
              height={400}
              className="w-full h-auto object-cover"
              data-ai-hint="university campus"
            />
            <div className="absolute inset-0 bg-primary/70 flex flex-col items-center justify-center text-center p-4">
              <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary-foreground mb-2">
                Welcome to FriendliGrad
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl">
                Your central hub for staying connected with our vibrant alumni
                community. Rediscover, reconnect, and grow together.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Users className="w-10 h-10 text-primary" />
                  <div>
                    <CardTitle className="font-headline text-2xl">Alumni Directory</CardTitle>
                    <CardDescription>
                      Find and connect with peers.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Search our extensive database of alumni. Filter by graduation
                  year, major, or profession to find old friends and new
                  connections.
                </p>
                <Button asChild>
                  <Link href="/alumni">
                    Explore Directory <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Calendar className="w-10 h-10 text-primary" />
                  <div>
                    <CardTitle className="font-headline text-2xl">Upcoming Events</CardTitle>
                    <CardDescription>
                      Join our next gathering.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Stay updated on the latest alumni events, from homecoming
                  galas to professional networking mixers and insightful
                  webinars.
                </p>
                <Button asChild>
                  <Link href="/events">
                    View Events <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Newspaper className="w-10 h-10 text-primary" />
                  <div>
                    <CardTitle className="font-headline text-2xl">News &amp; Updates</CardTitle>
                    <CardDescription>
                      The latest from our community.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Read about university news, alumni achievements, and important
                  announcements to stay in the loop with our evolving community.
                </p>
                <Button asChild>
                  <Link href="/news">
                    Read News <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
