"use server";

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Define the schema interface
interface OutputSchema {
    detailOverview: string;
}

const outputSchema: Record<string, unknown> = {
    properties: {
        detailOverview: { type: ["string"] },
    },
    required: ["detailOverview"],
    // title: "ReactJs",
    type: "object",
};

export const findSuitableFolder = async (
    // folders: any[],
    // newTags: string,
    // url: string
): Promise<string> => {
    const prompt = `Provide a concise, one-paragraph overview of ReactJS, briefly explaining what it is, its main use cases, and its core benefits.`;

    const jsonSchema = JSON.stringify(outputSchema, null, 4);

    const chat_completion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `You are an intelligent assistant determining the appropriate folder for new bookmarks based on text and folder names. The JSON object must use the schema: ${jsonSchema}`,
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        model: "llama3-70b-8192",
        temperature: 0,
        stream: false,
        response_format: { type: "json_object" },
    });

    const content = chat_completion.choices[0].message.content;
    if (!content) {
        throw new Error(
            "Received null or undefined content from chat completion"
        );
    }

    const result: any = JSON.parse(content);
    console.log("Result:", result.detailOverview);
    return result.detailOverview;
};


export const main = async () => {
    return await findSuitableFolder();
}

