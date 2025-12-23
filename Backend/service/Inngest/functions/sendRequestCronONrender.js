import { inngest } from '../client.js';

const URL = "https://gemna37-q-a-repo.onrender.com";

export const sendRequestCronOnRender = inngest.createFunction(
    { id: "nightly-job" },
    { cron: "*/15 * * * *" },
    async ({ step }) => {
        await step.run('request/render', async () => {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const result = await response.json();
            console.log(result);
        })
    }
);
