import { z } from 'zod';
import { parse, isValid } from 'date-fns';

const parseDateWithFormat = (dateStr: string, format: string): Date | null => {
  try {
    // Convert DD to dd and YYYY to yyyy for date-fns compatibility
    const normalizedFormat = format.replace(/DD/g, 'dd').replace(/YYYY/g, 'yyyy');
    const parsed = parse(dateStr, normalizedFormat, new Date());
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const MeetSchema = z.object({
  createDate: z.string(),
  dateFormat: z.string(),
  date: z.string().min(1, "Date is required"),
  name: z.string(),
  showOnHomePage: z.boolean().optional().default(false),
  _id: z.string(),
}).transform((data) => {
  const parsed = parseDateWithFormat(data.date, data.dateFormat);
  if (!parsed) {
    throw new Error(`Invalid date "${data.date}" for format "${data.dateFormat}"`);
  }
  return {
    ...data,
    date: parsed,
  };
});

export type Meet = z.infer<typeof MeetSchema>;

export const MeetsResponseSchema = z.object({
  docs: z.array(z.any()),
}).transform((data) => ({
  docs: data.docs
    .map((doc: any) => MeetSchema.safeParse(doc))
    .filter((result: any) => result.success)
    .map((result: any) => result.data as Meet),
}));

export type Meets = z.infer<typeof MeetsResponseSchema>;
