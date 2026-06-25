import { z } from "zod";

export const videoMetadataSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters."),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters.")
        .max(300, "Description must be maximum 300 characters."),
});

export type VideoMetadataForm = z.infer<typeof videoMetadataSchema>;