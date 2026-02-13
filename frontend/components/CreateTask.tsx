import React, { useState } from "react";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { getJwtToken } from "@/app/helper/token";

export function CreateTaskForm({ projectId }: { projectId: string }) {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // prevent page reload

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/task/${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getJwtToken()}`,
          },
          body: JSON.stringify({
            title,
            comment,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create task");
      }

      const data = await res.json();
      console.log("Task created:", data);
      // Optionally reset form
      setTitle("");
      setComment("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="max-w-sm mx-auto">
        <Field>
          <FieldLabel htmlFor="task-input">Task</FieldLabel>
          <InputGroup className="h-auto">
            <InputGroupInput
              id="task-input"
              placeholder="Enter Task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="comment-textarea">
            You can put a comment: (Optional)
          </FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="comment-textarea"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <InputGroupAddon align="block-end">
              <InputGroupText>{comment.length}/280</InputGroupText>
              <InputGroupButton
                type="submit"
                variant="default"
                size="sm"
                className="ml-auto"
              >
                Post
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
    </form>
  );
}