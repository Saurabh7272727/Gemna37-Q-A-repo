import { Redis } from '@upstash/redis'

const kv = new Redis({
    url: process.env.VERCEL_URL_KV,
    token: process.env.VERCEL_URL_KV_TOKEN,
})

export default kv