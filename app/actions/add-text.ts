"use server";

import { db } from "@/lib/db";
import { InputData } from "../type/input";
import { Prisma } from "@prisma/client";
import Groq from "groq-sdk";
import { main } from "./groq";

type Input = InputData;

export async function addText(values: { text: string; preferenceId: string | undefined }) {
    try {
        if (!values.text) {
            return { error: "TEXT_REQUIRED" };
        }

        // if (!values.preference) {
        //     return { error: "TEXT_REQUIRED" };
        // }
        console.log(values.preferenceId);

        const data: Prisma.InputCreateInput = {
            text: values.text,
            preference: values.preferenceId ? { connect: { id: values.preferenceId } } : undefined,
            output: "",
        };

        const text = await db.input.create({ data });

        return { success: text };
    } catch (error) {
        console.log("[ADD_TEXT]", error);
        return { error: "ADD_TEXT_ERROR" };
    }
}

export async function getPreference() {
    try {
        const preference = await db.preference.findMany({
            orderBy: {
                name: "asc",
            }
        });
        return { success: preference };

    } catch (error) {
        console.log("[GET_PREFERENCE]", error);
        return { error: "GET_PREFERENCE_ERROR" };
    }
}

export async function callingGroq() {
    try {
        // await main();
        const output = await main();
        console.log("Output:", output);
    } catch (error) {
        console.log("[callingGroq]", error);
    }
}


// ("use server");

// import { db } from "@/lib/db";
// import { InputData } from "../type/input";
// import { Prisma } from "@prisma/client";

// type Input = InputData;

// export async function addText(values: { text: string; preference: string }) {
//     try {
//         if (!values.text) {
//             return { error: "TEXT_REQUIRED" };
//         }

//         const data = {
//             text: values.text,
//             preference: values.preference,
//             output: "",
//         };

//         const text = await db.input.create({ data });

//         return { success: text };
//     } catch (error) {
//         console.log("[ADD_TEXT]", error);
//         return { error: "ADD_TEXT_ERROR" };
//     }
// }
