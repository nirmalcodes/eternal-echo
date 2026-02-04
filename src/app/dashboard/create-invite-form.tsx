'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createInvite } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const formSchema = z.object({
  partnerName: z.string().min(1, { message: "Partner's name can't be empty." }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(300, { message: "Message can't exceed 300 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateInviteFormProps {
  userId: string;
  userName: string;
}

export default function CreateInviteForm({ userId, userName }: CreateInviteFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { partnerName: '', message: '' },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('partnerName', values.partnerName);
    formData.append('message', values.message);
    formData.append('userId', userId);
    formData.append('userName', userName);

    const result = await createInvite(formData);

    if (result?.errors) {
      // Handle server-side validation errors if necessary
      toast({
        title: 'Error',
        description: result.errors._form?.[0] || 'Please check the form for errors.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success!',
        description: 'Your invite has been created.',
        className: 'bg-green-100 text-green-900',
      });
      form.reset();
    }
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="partnerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partner's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Alex" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Will you be my Valentine?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Invite'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
