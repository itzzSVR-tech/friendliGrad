"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  suggestProfileEnhancements,
  SuggestProfileEnhancementsOutput,
} from "@/ai/flows/suggest-profile-enhancements";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Loader2, Wand2, ClipboardCopy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  graduationYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
  major: z.string().min(2, { message: "Major is required." }),
  profession: z.string().min(2, { message: "Profession is required." }),
  bio: z.string().max(500, { message: "Bio cannot exceed 500 characters." }).optional(),
});

export function ProfileForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestProfileEnhancementsOutput | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      graduationYear: 2015,
      major: "Computer Science",
      profession: "Software Engineer",
      bio: "Passionate software engineer with a focus on frontend development and user experience. Currently working at a leading tech company, building innovative web applications.",
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsLoading(true);
    console.log(values);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully saved.",
      });
    }, 1000);
  }

  async function handleAiEnhance() {
    setIsAiLoading(true);
    const profileContent = form.getValues("bio") || "";

    if (profileContent.length < 20) {
      toast({
        variant: "destructive",
        title: "Bio too short",
        description: "Please provide a more detailed bio for better AI suggestions.",
      });
      setIsAiLoading(false);
      return;
    }

    try {
      const result = await suggestProfileEnhancements({ profileContent });
      setSuggestions(result);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("AI enhancement failed:", error);
      toast({
        variant: "destructive",
        title: "AI Enhancement Failed",
        description: "Could not generate suggestions. Please try again later.",
      });
    } finally {
      setIsAiLoading(false);
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ description: "Copied to clipboard!" });
  };


  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="graduationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Graduation Year</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2015" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Major</FormLabel>
                      <FormControl>
                        <Input placeholder="Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Profession</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio &amp; Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself, your work experience, and your accomplishments."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This section will be analyzed by our AI to suggest profile enhancements.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={handleAiEnhance} disabled={isAiLoading}>
                  {isAiLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                  ) : (
                    <><Sparkles className="mr-2 h-4 w-4 text-accent" /> Enhance Profile with AI</>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl flex items-center gap-2">
              <Wand2 className="h-6 w-6 text-primary" />
              AI-Powered Suggestions
            </DialogTitle>
            <DialogDescription>
              Here are some skills and experiences our AI suggests adding to your profile based on your bio.
            </DialogDescription>
          </DialogHeader>
          {suggestions && (
            <div className="grid gap-6 py-4">
              <div>
                <h3 className="font-semibold mb-3">Suggested Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestions.suggestedSkills.map((skill, index) => (
                     <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.1 }}
                   >
                     <Badge variant="secondary" className="text-sm cursor-pointer hover:bg-primary/20" onClick={() => copyToClipboard(skill)}>
                       {skill} <ClipboardCopy className="ml-2 h-3 w-3" />
                     </Badge>
                   </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Suggested Experiences</h3>
                <ul className="space-y-3">
                  {suggestions.suggestedExperiences.map((exp, index) => (
                    <motion.li
                      key={index}
                      className="text-sm p-3 bg-secondary rounded-md flex justify-between items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <span>{exp}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(exp)}>
                        <ClipboardCopy className="h-4 w-4" />
                      </Button>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
