import { z } from 'zod';



const scheduleSubject = z.array(
    z.object({
        SATSS_ID: z.string().min(12, "max limit of SATSS"),
        priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
        weekDay: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THUSDAY", "FRIDAY", "SATURDAY"]),
        nth_Periode: z.number().max(7, "nth_periode are max size exseed")
    })
)

export { scheduleSubject };