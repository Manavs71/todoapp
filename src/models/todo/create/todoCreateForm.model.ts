import { z } from 'zod'

import { calendarDateSchema } from '@/models/date/calendarDate.model'

export const todoCreateFormSchema = z.object({
  title: z.string().min(1),
  deadline: calendarDateSchema,
  description: z.string().min(1),
})

export type TodoCreateForm = z.infer<typeof todoCreateFormSchema>
