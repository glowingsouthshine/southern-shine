'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSeasonalSpecialsInputSchema = z.object({
  pastRequests: z.string().describe('A string containing the details of past service requests, including the services requested and any specific notes.'),
  seasonalData: z.string().describe('A string containing seasonal data, including weather patterns, holidays, and any relevant events.'),
});

export type SuggestSeasonalSpecialsInput = z.infer<typeof SuggestSeasonalSpecialsInputSchema>;

const SuggestSeasonalSpecialsOutputSchema = z.object({
  specialSuggestion: z.string().describe('A suggested service special for first-time buyers, tailored to the current season and past request trends.'),
  reasoning: z.string().describe('The reasoning behind the suggested special, explaining why it is likely to be effective in attracting new customers.'),
});

export type SuggestSeasonalSpecialsOutput = z.infer<typeof SuggestSeasonalSpecialsOutputSchema>;

export async function suggestSeasonalSpecials(input: SuggestSeasonalSpecialsInput): Promise<SuggestSeasonalSpecialsOutput> {
  return suggestSeasonalSpecialsFlow(input);
}

const suggestSeasonalSpecialsPrompt = ai.definePrompt({
  name: 'suggestSeasonalSpecialsPrompt',
  input: {schema: SuggestSeasonalSpecialsInputSchema},
  output: {schema: SuggestSeasonalSpecialsOutputSchema},
  prompt: `You are an expert marketing strategist for a housekeeping and cleaning services company called A Southern Glow.

  Analyze the following data to suggest a compelling service special for first-time buyers. The special should be tailored to the current season and designed to attract new customers.

  Past Requests:
  {{pastRequests}}

  Seasonal Data:
  {{seasonalData}}

  Consider factors like weather, holidays, and recent inquiries to create an appealing and timely discount. Explain your reasoning for the suggested special.

  Ensure the special is presented in a humble, respectful, and inviting way, aligning with the company's brand.

  Format the output as follows:
  Special Suggestion: [The suggested service special]
  Reasoning: [The reasoning behind the suggested special]
  `,
});

const suggestSeasonalSpecialsFlow = ai.defineFlow(
  {
    name: 'suggestSeasonalSpecialsFlow',
    inputSchema: SuggestSeasonalSpecialsInputSchema,
    outputSchema: SuggestSeasonalSpecialsOutputSchema,
  },
  async input => {
    const {output} = await suggestSeasonalSpecialsPrompt(input);
    return output!;
  }
);