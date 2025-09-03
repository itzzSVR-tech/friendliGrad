'use server';
/**
 * @fileOverview AI-powered profile enhancement suggestions.
 *
 * - suggestProfileEnhancements - A function that suggests relevant skills and experiences to enhance an alumni profile.
 * - SuggestProfileEnhancementsInput - The input type for the suggestProfileEnhancements function.
 * - SuggestProfileEnhancementsOutput - The return type for the suggestProfileEnhancements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProfileEnhancementsInputSchema = z.object({
  profileContent: z
    .string()
    .describe('The existing content of the alumni profile.'),
});
export type SuggestProfileEnhancementsInput = z.infer<
  typeof SuggestProfileEnhancementsInputSchema
>;

const SuggestProfileEnhancementsOutputSchema = z.object({
  suggestedSkills: z
    .array(z.string())
    .describe('An array of suggested skills to add to the profile.'),
  suggestedExperiences: z
    .array(z.string())
    .describe('An array of suggested experiences to add to the profile.'),
});
export type SuggestProfileEnhancementsOutput = z.infer<
  typeof SuggestProfileEnhancementsOutputSchema
>;

export async function suggestProfileEnhancements(
  input: SuggestProfileEnhancementsInput
): Promise<SuggestProfileEnhancementsOutput> {
  return suggestProfileEnhancementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProfileEnhancementsPrompt',
  input: {schema: SuggestProfileEnhancementsInputSchema},
  output: {schema: SuggestProfileEnhancementsOutputSchema},
  prompt: `You are an AI assistant that helps alumni enhance their profiles by suggesting relevant skills and experiences.

  Analyze the following profile content and suggest skills and experiences that would be a good fit for the alumni to add to their profile.

  Profile Content: {{{profileContent}}}

  Skills should be concise (1-3 words each) and relevant to the profile content. Experiences should be described in a short sentence each.

  Return the suggestions in the following JSON format:
  {
    "suggestedSkills": ["skill1", "skill2", "skill3"],
    "suggestedExperiences": ["experience1", "experience2", "experience3"]
  }`,
});

const suggestProfileEnhancementsFlow = ai.defineFlow(
  {
    name: 'suggestProfileEnhancementsFlow',
    inputSchema: SuggestProfileEnhancementsInputSchema,
    outputSchema: SuggestProfileEnhancementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
