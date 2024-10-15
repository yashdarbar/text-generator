import { Input } from "@prisma/client";

export interface InputData extends Partial<Input> {
    text: string;
    preference?: string;
    output?: string;
    createdAt: Date;
    updatedAt: Date;
}