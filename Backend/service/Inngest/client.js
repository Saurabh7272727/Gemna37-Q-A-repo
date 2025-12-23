import { Inngest } from 'inngest';


export const inngest = new Inngest({
    id: "gemnaworld",
    eventKey: process.env.INNGEST_EVENT_KEY
})