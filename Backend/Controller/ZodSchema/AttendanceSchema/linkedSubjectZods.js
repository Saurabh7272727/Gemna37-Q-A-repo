import { z } from 'zod';


const payloadSchemaLinked = z.object({
    studentAttendanceId: z.string().max(30, 'wrong expression of payload').min(17, 'wrong expression of payload'),
    ArrayOfIDRelation: z.array(z.string('string are required in ArrayOfIDRelation').max(55))
        .max(21, 'wrong expression of payload')
        .min(1, "wrong expression of payload")
});



const checkSchema1 = z.array(z.object({
    subjetId: z.string().max(55).min(20),
    teacherId: z.string().max(55).min(20),
    idRelation: z.string().max(55).min(40),
    _id: z.string().max(40).min(10)
}));


export { payloadSchemaLinked, checkSchema1 }