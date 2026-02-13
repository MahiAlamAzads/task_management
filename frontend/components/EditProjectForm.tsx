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
import { log } from "console";
import { Edit } from "lucide-react"
import { useState } from "react"

export function EditProjectForm({ projectId, render, setRender }: EditProjectType) {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
      console.log(title)
  console.log(comment)
    // e.preventDefault();
    try {
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
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };
  return (
    <Dialog>
      {/* <form onSubmit={handleSubmit}> */}
        <DialogTrigger asChild>
          <div className="flex items-center bg-gray-200 rounded text-black px-2 text-[14px]"><Edit className="w-4"/></div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done
            </DialogDescription>
            <FieldGroup>
            <Field>
              <Label htmlFor="title">title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} id="title" name="title" />
            </Field>
            <Field>
              <Label htmlFor="comment">comment (optional)</Label>
              <Input value={comment} onChange={(e) => setComment(e.target.value)} id="comment" name="comment" placeholder="" />
            </Field>
          </FieldGroup>
          </DialogHeader>
          
          <DialogFooter>
            <div className="flex justify-end gap-2 mt-4">
              <DialogClose asChild>
                <div className="flex items-center bg-black rounded text-white px-2 text-[14px]">Cancle</div>
              </DialogClose>
              <Button onClick={()=>handleSubmit()} type="submit" className="bg-red-500 text-white">
                Submit
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      {/* </form> */}
    </Dialog>
  )
}
