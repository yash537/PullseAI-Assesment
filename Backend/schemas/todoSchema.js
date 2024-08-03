import { z } from "zod";

// Helper function to parse date strings into Date objects
const parseDate = (value) => {
  const parsedDate = new Date(value);
  return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
};

export const createTodoSchema = z.object({
  title: z.string().min(1, { message: "Title field is required" }),
  description: z.string().min(1, { message: "Description field is required" }),
  status: z.string().min(1, { message: "Status field is required" }),
  due_date: z.string().transform(parseDate, {
    errorMap: () => ({ message: "Invalid date format for due_date" }),
  }),
  created_at: z
    .string()
    .optional()
    .transform(parseDate, {
      errorMap: () => ({ message: "Invalid date format for created_at" }),
    }),
});

export const updateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  due_date: z
    .date()
    .optional()
    .transform(parseDate, {
      errorMap: () => ({ message: "Invalid date format for due_date" }),
    }),
  created_at: z
    .date()
    .optional()
    .transform(parseDate, {
      errorMap: () => ({ message: "Invalid date format for created_at" }),
    }),
});
