import { z } from 'zod';

// fetchRelatedSubjectByStudent - payload schema;

const payloadSchema = z.object({
    sessionToken: z.object({
        id: z.string().length(24, 'sessionToken invalid'),
        expiration: z.number(),
        permission: z.object({
            role: z.string().length(7, 'sessionToken invalid'),
            update: z.boolean(),
            upload: z.boolean(),
            admin: z.boolean(),
            routePermission: z.boolean()
        })
    }),
    queryToken: z.object({
        semester: z.number().max(10, 'Invalid semester').min(1, "Invalid semester"),
        department: z.enum([
            "CS_IT",
            "AI_ML",
            "ME",
            "CE",
            "D_CS",
            "D_ME",
            "D_CE",
            "EE",
            "CSE",
            "DS",
            "AI"
        ], "Inavlid department")
    })
}).strict();


export default payloadSchema;