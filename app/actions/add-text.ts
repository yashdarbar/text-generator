"use server";

import { db } from "@/lib/db";
import { InputData } from "../type/input";
import { Prisma } from "@prisma/client";

type Input = InputData;

export async function addText(values: { text: string; preference: string }) {
    try {
        if (!values.text) {
            return { error: "TEXT_REQUIRED" };
        }

        const data: Prisma.InputCreateInput = {
            text: values.text,
            output: "",
        };

        const text = await db.input.create({ data });

        return { success: text };
    } catch (error) {
        console.log("[ADD_TEXT]", error);
        return { error: "ADD_TEXT_ERROR" };
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
// // "use server";

// import { db } from "@/lib/db";
// import { InputData } from "../type/input";

// type Input = InputData;

// export async function addText(values: Partial<InputData>) {
//     try {
//         if (!values.text) {
//             return { error: "TEXT_REQUIRED" };
//         }

//         const text = await db.input.create({
//             data: {
//                 text: values.text,
//             }
//         })
//     } catch (error) {
//         console.log("[ADD_TEXT]", error);
//         return { error: "ADD_TEXT_ERROR" };
//     }
// }
