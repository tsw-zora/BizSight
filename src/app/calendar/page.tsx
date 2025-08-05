'use client';

import * as React from 'react';
import { addDays, format, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const today = new Date();
const mockAppointments = [
  {
    date: today,
    title: 'Team Standup',
    time: '09:00 AM',
    type: 'meeting',
  },
  {
    date: today,
    title: 'Client Demo',
    time: '11:00 AM',
    type: 'client',
  },
  {
    date: addDays(today, 2),
    title: 'Product Brainstorm',
    time: '02:00 PM',
    type: 'meeting',
  },
  {
    date: addDays(today, 5),
    title: 'Quarterly Review',
    time: '04:00 PM',
    type: 'meeting',
  },
  {
    date: addDays(today, 5),
    title: 'Follow-up with ACME Inc.',
    time: '10:00 AM',
    type: 'client',
  },
];

type Appointment = (typeof mockAppointments)[0];

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(today);

  const selectedAppointments = React.useMemo(() => {
    return date ? mockAppointments.filter((a) => isSameDay(a.date, date)) : [];
  }, [date]);

  const modifiers = {
    hasAppointment: mockAppointments.map((a) => a.date),
  };

  const modifiersStyles = {
    hasAppointment: {
      border: '2px solid hsl(var(--primary))',
      borderRadius: 'var(--radius)',
    },
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      <div className="lg:col-span-4">
        <Card>
          <CardContent className="p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full"
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
            />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                Appointments for {date ? format(date, 'PPP') : '...'}
              </span>
              <Button>Add Appointment</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedAppointments.length > 0 ? (
                selectedAppointments.map((app, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-lg border p-3"
                  >
                    <CalendarIcon className="mr-4 h-6 w-6 text-muted-foreground" />
                    <div className="flex-grow">
                      <p className="font-semibold">{app.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {app.time}
                      </p>
                    </div>
                    <Badge
                      variant={
                        app.type === 'meeting' ? 'secondary' : 'default'
                      }
                      className="capitalize"
                      style={{
                        backgroundColor:
                          app.type === 'client'
                            ? 'hsl(var(--accent))'
                            : undefined,
                        color:
                          app.type === 'client'
                            ? 'hsl(var(--accent-foreground))'
                            : undefined,
                      }}
                    >
                      {app.type}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>No appointments for this day.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
