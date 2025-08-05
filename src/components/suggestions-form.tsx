'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { FormState } from '@/app/suggestions/actions';
import { Lightbulb, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SuggestionsFormProps {
  getSuggestions: (
    state: FormState,
    formData: FormData
  ) => Promise<FormState>;
}

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
        </>
      ) : (
        <>
          <Lightbulb className="mr-2 h-4 w-4" /> Get Suggestions
        </>
      )}
    </Button>
  );
}

export function SuggestionsForm({ getSuggestions }: SuggestionsFormProps) {
  const [state, formAction] = useFormState(getSuggestions, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.data) {
       toast({
        title: state.message,
        variant: state.errors ? 'destructive' : 'default',
      });
    }
  }, [state, toast]);

  return (
    <div>
      <form action={formAction}>
        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="businessDescription">Business Description</Label>
              <Textarea
                id="businessDescription"
                name="businessDescription"
                placeholder="e.g., A small bakery specializing in artisanal bread and pastries, located in a busy downtown area."
                rows={4}
                required
              />
              {state.errors?.businessDescription && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.businessDescription[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="financialData">Financial Data</Label>
              <Textarea
                id="financialData"
                name="financialData"
                placeholder="e.g., Monthly Revenue: $15,000, Monthly Expenses: $10,000 (Ingredients: $4k, Rent: $3k, Salaries: $3k)."
                rows={4}
                required
              />
              {state.errors?.financialData && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.financialData[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="marketTrends">Market Trends (Optional)</Label>
              <Input
                id="marketTrends"
                name="marketTrends"
                placeholder="e.g., Growing demand for gluten-free products, rise of online ordering."
              />
               {state.errors?.marketTrends && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.marketTrends[0]}
                </p>
              )}
            </div>
            <SubmitButton />
          </CardContent>
        </Card>
      </form>

      {state.data && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Generated Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Actionable Suggestions</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc space-y-2 pl-6">
                    {state.data.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Reasoning</AccordionTrigger>
                <AccordionContent>
                  <p className="whitespace-pre-wrap">{state.data.reasoning}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
