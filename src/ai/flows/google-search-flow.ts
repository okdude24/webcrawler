'use server';
/**
 * @fileOverview A Google Search AI agent.
 *
 * - googleSearch - A function that handles the google search process.
 * - GoogleSearchInput - The input type for the googleSearch function.
 * - GoogleSearchOutput - The return type for the googleSearch function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GoogleSearchInputSchema = z.object({
  query: z.string().describe('The search query.'),
});
export type GoogleSearchInput = z.infer<typeof GoogleSearchInputSchema>;

const GoogleSearchOutputSchema = z.array(
  z.object({
    title: z.string().describe('The title of the search result.'),
    url: z.string().describe('The URL of the search result.'),
    snippet: z.string().describe('A snippet of text from the search result.'),
  })
);
export type GoogleSearchOutput = z.infer<typeof GoogleSearchOutputSchema>;

export async function googleSearch(query: string): Promise<GoogleSearchOutput> {
  return googleSearchFlow({query});
}

const prompt = ai.definePrompt({
  name: 'googleSearchPrompt',
  input: {
    schema: z.object({
      query: z.string().describe('The search query.'),
    }),
  },
  output: {
    schema: z.array(
      z.object({
        title: z.string().describe('The title of the search result.'),
        url: z.string().describe('The URL of the search result.'),
        snippet: z.string().describe('A snippet of text from the search result.'),
      })
    ),
  },
  prompt: `You are an expert at web search. Use the query provided to search the web and extract as many relevant results as possible.
Make sure the search results are diverse.

Query: {{{query}}}`,
});

const googleSearchFlow = ai.defineFlow<
  typeof GoogleSearchInputSchema,
  typeof GoogleSearchOutputSchema
>(
  {
    name: 'googleSearchFlow',
    inputSchema: GoogleSearchInputSchema,
    outputSchema: GoogleSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
