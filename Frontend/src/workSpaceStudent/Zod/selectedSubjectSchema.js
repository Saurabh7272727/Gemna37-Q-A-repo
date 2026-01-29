import { z } from "zod";

const TeacherSchema = z.strictObject({
    _id: z.string(),
    name: z.string(),
    shortName: z.string(),
    position: z.enum(["HOD", "TEACHER", "PROFESSOR", "ASSIANT PROFESSOR"]),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

const SubjectSchema = z.strictObject({
    _id: z.string(),
    name: z.string(),
    shortName: z.string(),
    subjectCode: z.string(),
    department: z.string(),
    semester: z.number().int(),
    type: z.enum(["LAB", "THEORY"]),
    credit: z.number().int(),
    attendanceWeight: z.number(),
    weeklyFrequency: z.number().int(),
    coverImage: z.string().url(),
});

export const SubjectTeacherRelationSchema = z.strictObject({
    _id: z.string(),
    idRelation: z.string(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    totalNumberOfLecture: z.number().int(),

    subjetId: SubjectSchema,
    teacherId: TeacherSchema,
});

export const SubjectTeacherRelationArraySchema = z.array(
    SubjectTeacherRelationSchema
);
