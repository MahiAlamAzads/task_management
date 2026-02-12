"use client";
import { getJwtToken } from "@/app/helper/token";
import { EditProjectType } from "@/app/types/type"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit } from "lucide-react"
import { useState } from "react"

export function EditProjectForm({ projectId, render, setRender }: EditProjectType) {
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${getJwtToken()}`
        },
        body: JSON.stringify({ title, comment }), // send the new task title
      });
  
      const data = await res.json();
      console.log("Created task:", data);
      setTitle(""); // clear input after submit
      setRender(!render)
    };
  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline"><Edit/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">title</Label>
              <Input onChange={(e) => setTitle(e.target.value)} id="title" name="title" />
            </Field>
            <Field>
              <Label htmlFor="comment">comment (optional)</Label>
              <Input onChange={(e) => setComment(e.target.value)} id="comment" name="comment" placeholder="" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
