"use client";

import { useState, useMemo } from 'react';
import { mockAlumni } from '@/lib/mock-data';
import type { AlumniProfile } from '@/lib/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Briefcase } from 'lucide-react';

export default function AlumniDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [majorFilter, setMajorFilter] = useState('all');
  const [professionFilter, setProfessionFilter] = useState('all');

  const uniqueYears = useMemo(() => ['all', ...Array.from(new Set(mockAlumni.map(a => a.graduationYear.toString()))).sort((a,b) => Number(b) - Number(a))], []);
  const uniqueMajors = useMemo(() => ['all', ...Array.from(new Set(mockAlumni.map(a => a.major)))], []);
  const uniqueProfessions = useMemo(() => ['all', ...Array.from(new Set(mockAlumni.map(a => a.profession)))], []);

  const filteredAlumni = useMemo(() => {
    return mockAlumni.filter(alumnus => {
      const matchesSearch = alumnus.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = yearFilter === 'all' || alumnus.graduationYear.toString() === yearFilter;
      const matchesMajor = majorFilter === 'all' || alumnus.major === majorFilter;
      const matchesProfession = professionFilter === 'all' || alumnus.profession === professionFilter;
      return matchesSearch && matchesYear && matchesMajor && matchesProfession;
    });
  }, [searchTerm, yearFilter, majorFilter, professionFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-headline font-bold text-primary">Alumni Directory</h1>
          <p className="text-lg text-muted-foreground mt-2">Search, filter, and connect with fellow alumni.</p>
        </header>

        <Card className="mb-8 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                {uniqueYears.map(year => <SelectItem key={year} value={year}>{year === 'all' ? 'All Years' : year}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={majorFilter} onValueChange={setMajorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Major" />
              </SelectTrigger>
              <SelectContent>
                {uniqueMajors.map(major => <SelectItem key={major} value={major}>{major === 'all' ? 'All Majors' : major}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={professionFilter} onValueChange={setProfessionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Profession" />
              </SelectTrigger>
              <SelectContent>
                {uniqueProfessions.map(profession => <SelectItem key={profession} value={profession}>{profession === 'all' ? 'All Professions' : profession}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAlumni.map(alumnus => (
            <Card key={alumnus.id} className="flex flex-col hover:border-primary transition-colors">
              <CardHeader className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
                  <AvatarImage src={alumnus.avatarUrl} alt={alumnus.name} data-ai-hint="person photo" />
                  <AvatarFallback>{alumnus.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-xl">{alumnus.name}</CardTitle>
                <CardDescription>Class of {alumnus.graduationYear}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>{alumnus.profession}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{alumnus.location}</span>
                    </div>
                </div>
                <div className="mt-4">
                  <Badge variant="secondary">{alumnus.major}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredAlumni.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No alumni found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
