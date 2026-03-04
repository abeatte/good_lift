import { z } from 'zod';

const ChangeSchema = z.object({
  rev: z.string(),
  attribute: z.string(),
  value: z.union([z.number(), z.string()]),
  timeStamp: z.string(),
});

const AttemptDocSchema = z.object({
  _id: z.string(),
  _rev: z.string(),
  liftName: z.string(),
  attemptNumber: z.string(),
  lifterId: z.string(),
  changes: z.array(ChangeSchema),
  createDate: z.string(),
  weight: z.number(),
  result: z.string().optional(),
  validate_doc_update: z.string().optional(),
});

const RowSchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.object({
    rev: z.string(),
  }),
  doc: AttemptDocSchema,
});

export const MeetDataSchema = z.object({
  total_rows: z.number(),
  offset: z.number(),
  update_seq: z.string(),
  rows: z.array(RowSchema),
}).transform((data) => ({
  ...data,
  rows: data.rows
    .filter((row) => !row.id.startsWith('_design'))
    .map((row) => row.doc),
}));

export type MeetData = z.infer<typeof MeetDataSchema>;
export type Attempt = z.infer<typeof AttemptDocSchema>;