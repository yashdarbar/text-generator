"use client";

import { Button } from "@/components/ui/button";
import Input from "./(main)/_components/input";
import InputField from "./(main)/_components/input";

export default function Home() {
    const handleOnClick = () => {
        alert("clicked");
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold text-center">AI text Generator</h1>
            <div className="flex flex-col">
                <div>
                    <InputField />
                </div>
            </div>
        </div>
    );
}
