"use server";

import { createGroq } from "@ai-sdk/groq"

const groq = createGroq({
    baseURL: process.env.NEXT_PUBLIC_GROQ_BASE_URL,
    apiKey: process.env.GROQ_API_KEY,
})