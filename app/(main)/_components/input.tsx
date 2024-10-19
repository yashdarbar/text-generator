"use client"

import { addText, getPreference } from "@/app/actions/add-text";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
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

import { set, useForm } from "react-hook-form";
import * as z from "zod";
import PreferenceForm from "./preference-form";
import { useEffect, useState } from "react";

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

    const [preferences, setPreferences] = useState<any[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        }
    })

    useEffect(()=> {
        const fetchPreference = async () => {
            try {
                const response = await getPreference();
                console.log("hh", response);
                //setPreferences(response?.success);
            } catch (error) {
                console.log(error);
            }
        }

        fetchPreference();
    }, [] )

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data);
        try {
            const response = await addText({text: data.username, preference: ""});
            if (response?.success) {
                console.log(response.success);
            } else {
                console.log(response.error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // const preferences = getPreference();
    // if (!preferences || preferences.error) {
    //     return <div>Error</div>;
    // }


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
                                <FormLabel>Enter your text</FormLabel>
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
            {/* <PreferenceForm onChange={""} value={""} options={[]} /> */}

        </div>
    );
};

export default InputField;
