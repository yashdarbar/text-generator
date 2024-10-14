"use client"

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import * as z from "zod";

// type InputProps = {
//     onChange: (...event: any[]) => void;
//     value: string;
//     // disabled?: boolean;
//     // name: string;
//     // ref: React.RefCallback<HTMLInputElement>;
// };

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters long",
    }),
});

const InputField = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data);
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default InputField;
