"use client";

import { Button } from "@/components/ui/button";
import Input from "./(main)/_components/input";
import InputField from "./(main)/_components/input";

export default function Home() {

  const handleOnClick = () => {
    alert("clicked");
  }

  return (
      <div className="flex flex-col items-center justify-center h-screen">
          Text Generator
          <div className="flex flex-col">
              <div>
                  <InputField/>
              </div>
              <div>
                  <Button onClick={handleOnClick}> Add </Button>
              </div>
          </div>
      </div>
  );
}
