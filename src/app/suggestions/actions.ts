'use server';

import { z } from 'zod';
import {
  getOptimizationSuggestions,
  type OptimizationSuggestionOutput,
} from '@/ai/flows/suggest-optimizations';

const FormSchema = z.object({
  businessDescription: z
    .string()
    .min(10, 'Please provide a more detailed description.'),
  financialData: z
    .string()
    .min(10, 'Please provide more detailed financial data.'),
  marketTrends: z.string().optional(),
});

export type FormState = {
  message: string;
  data?: OptimizationSuggestionOutput;
  errors?: {
    businessDescription?: string[];
    financialData?: string[];
    marketTrends?: string[];
  };
};

export async function getSuggestions(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    businessDescription: formData.get('businessDescription'),
    financialData: formData.get('financialData'),
    marketTrends: formData.get('marketTrends'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please fix the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await getOptimizationSuggestions(validatedFields.data);
    return {
      message: 'Suggestions generated successfully.',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
