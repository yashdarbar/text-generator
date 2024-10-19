"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    preference: z.string().min(2, {
        message: "Preference must be at least 2 characters long",
    }),
});

const PreferenceForm = ({onChange, value, options}: any) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            preference: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data);
        try {
            //
            console.log(data.preference);
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
                        name="preference"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter your text</FormLabel>
                                <FormControl>
                                    <Combobox
                                        options={options}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
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
            PreferenceForm
            {/* <Combobox options={preferences?.success?.map((preference)=>({
                label: preference.name,
                value: preference.id,
            }) || [])}/> */}
        </div>
    );
};

export default PreferenceForm;
