import { serve } from "inngest/express";
import { inngest } from './client.js';
import { sendRequestCronOnRender } from './functions/sendRequestCronONrender.js';


export default serve({
    client: inngest,
    functions: [sendRequestCronOnRender],
});
