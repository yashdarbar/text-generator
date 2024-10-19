"use client";

import { addText } from "@/app/actions/add-text";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import * as z from "zod";

interface PreferenceProps {
    options?: { label: string; value: string }[];
}

const formSchema = z.object({
    preference: z.string().min(2, {
        message: "Preference must be at least 2 characters long",
    }),
    text: z.string().min(2, {
        message: "Username must be at least 2 characters long",
    }),
});

const PreferenceForm = ({ options }: PreferenceProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            preference: "",
            text: "",
        },
    });


    console.log(options);

    // const onSubmit = async (data: z.infer<typeof formSchema>) => {
    //     console.log(data);
    //     try {
    //         //
    //         console.log(data.preference);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data);
        try {
            const response = await addText({
                text: data.text,
                preferenceId: data.preference,
            });
            if (response?.success) {
                console.log(response.success);
            } else {
                console.log(response.error);
            }
        } catch (error) {
            console.log(error);
        }
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
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter your prompt</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your prompt here..."
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="preference"
                        render={({ field }) => (
                            <FormItem className="flex flex-col mt-8">
                                <FormLabel className="">
                                    Select tone/style preference
                                </FormLabel>
                                <FormControl>
                                    <Combobox
                                        options={options}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default PreferenceForm;
