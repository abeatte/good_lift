import { z } from 'zod';

export const MeetSchema = z.object({
  createDate: z.string(),
  date: z.string(),
  dateFormat: z.string(),
  name: z.string(),
  showOnHomePage: z.boolean().optional().default(false),
  _id: z.string(),
});

export type Meet = z.infer<typeof MeetSchema>;

export const MeetsResponseSchema = z.object({
  docs: z.array(MeetSchema),
});
