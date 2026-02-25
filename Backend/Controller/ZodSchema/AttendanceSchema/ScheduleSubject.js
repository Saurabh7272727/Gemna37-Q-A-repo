import { z } from 'zod';
// {
//         SATSS_ID: {
//             type: Schema.Types.ObjectId,
//             ref: "subjectandteachersessionschema",
//             trim: true,
//             required: true
//         },
//         priority: {
//             type: String,
//             enum: ["HIGH", "MEDIUM", "LOW"],
//             default: "MEDIUM",
//             trim: true
//         },
//         weekDay: {
//             type: String,
//             enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THUSDAY", "FRIDAY", "SATURDAY"],
//             required: true,
//             trim: true
//         },
//         nth_Periode: {
//             type: Number,
//             required: true,
//         }
//     }


const scheduleSubject = z.array(
    z.object({
        SATSS_ID: z.string().min(12, "max limit of SATSS"),
        priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
        weekDay: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THUSDAY", "FRIDAY", "SATURDAY"]),
        nth_Periode: z.number().max(7, "nth_periode are max size exseed")
    })
)

export { scheduleSubject };