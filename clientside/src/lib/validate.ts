import { z } from 'zod';

export const registerSchema = z.object({
    firstName: z.string().min(3).max(255),
    lastName: z.string().min(3).max(255),
    username: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
})
.superRefine(
({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
    ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
        path: ["confirmPassword"],
    });
    }
}
);

export const loginSchema = z.object({
    value: z.string().min(3).max(255),
    password: z.string().min(6).max(100)
});

export const boardSchema = z.object({
    boardName: z.string().min(3).max(255),
    description: z.string().min(0).max(255).optional(),
});

export const listSchema = z.object({
    listName: z.string().min(3).max(255)
});

export const cardSchema = z.object({
    cardName: z.string().min(3).max(255)
});

export const userWorkspaceSchema = z.object({
    firstName: z.string().min(3).max(55),
    lastName: z.string().min(3).max(55),
    domain: z.string().min(0).max(55).optional(),
    description: z.string().min(0).max(255).optional(),
});