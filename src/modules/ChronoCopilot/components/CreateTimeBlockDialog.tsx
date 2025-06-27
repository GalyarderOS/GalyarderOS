import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/global/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/global/ui/dialog'
import { Input } from '@/components/global/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/global/ui/form'
import { TimeBlock } from '../types/timeblock'

const timeBlockSchema = z.object({
    label: z.string().min(1, { message: 'Label tidak boleh kosong.' }),
    start: z.string().refine((val) => val, { message: 'Waktu mulai harus diisi.' }),
    end: z.string().refine((val) => val, { message: 'Waktu selesai harus diisi.' }),
    category: z.string().optional(),
}).refine((data) => new Date(data.start) < new Date(data.end), {
  message: 'Waktu selesai harus setelah waktu mulai.',
  path: ['end'],
});


interface CreateTimeBlockDialogProps {
  onAddBlock: (newBlock: Omit<TimeBlock, 'id' | 'completed'>) => void;
}

export const CreateTimeBlockDialog: React.FC<CreateTimeBlockDialogProps> = ({ onAddBlock }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof timeBlockSchema>>({
    resolver: zodResolver(timeBlockSchema),
    defaultValues: {
      label: '',
      start: '',
      end: '',
      category: 'General',
    },
  });

  const onSubmit = (values: z.infer<typeof timeBlockSchema>) => {
    onAddBlock({
      label: values.label,
      start: new Date(values.start).toISOString(),
      end: new Date(values.end).toISOString(),
      category: values.category || 'General',
      isCompleted: false,
    });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Block</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Time Block</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new time block to your schedule.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Deep Work on Project..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Block</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 