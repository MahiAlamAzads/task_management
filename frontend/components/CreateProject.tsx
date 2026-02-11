"use client";
import { PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getJwtToken } from "@/app/helper/token";
import { CreateProjectFormProps } from "@/app/types/type";

export default function CreateProjectForm({setRender, render}: CreateProjectFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${getJwtToken()}`
      },
      body: JSON.stringify({ title }), // send the new task title
    });

    const data = await res.json();
    console.log("Created task:", data);
    setTitle(""); // clear input after submit
    setRender(!render)
  };

  return (
      <form onSubmit={handleSubmit} className="flex px-2 gap-1">
        <Input
          type="text"
          placeholder="create project"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <Button type="submit" variant={"default"}>
          <PlusIcon/>
        </Button>
      </form>
  );
}