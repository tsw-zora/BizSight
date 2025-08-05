import { getSuggestions } from './actions';
import { SuggestionsForm } from '@/components/suggestions-form';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SuggestionsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>AI-Powered Suggestions</CardTitle>
          <CardDescription>
            Get smart recommendations to optimize your business operations. Fill
            out the details below, and our AI will provide tailored suggestions
            to help you improve revenue, reduce costs, and boost profitability.
          </CardDescription>
        </CardHeader>
      </Card>
      <SuggestionsForm getSuggestions={getSuggestions} />
    </div>
  );
}
