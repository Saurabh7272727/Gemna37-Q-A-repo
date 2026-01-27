import { z } from "zod";

export const registrationSchema = z.object({
    gemidlog: z
        .string()
        .length(24, "MongoDB ObjectId must be 24 characters")
        .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId"),

    name: z
        .string()
        .min(2, "Name must be at least 2 characters"),

    semester: z
        .enum(["1", '2', '3', '4', '5', '6', '7', '8', '9', '10'], "Invalid semester")
    ,

    mobileNumber: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Mobile number must be 10 digits"),

    category: z.enum([
        "REGULAR",
        "X_STUDENT",
        "LATERAL_STUDENT",
        "RE_ADMISSION"
    ]),

    honestyScore: z
        .number()
        .min(0)
        .max(1)
        .optional()
}).strict();
