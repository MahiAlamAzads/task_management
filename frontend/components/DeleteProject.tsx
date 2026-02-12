import { getJwtToken } from "@/app/helper/token"
import { DeleteProjectType, Project } from "@/app/types/type"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

export function DeleteProject({ projectId, render, setRender }: DeleteProjectType) {
  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getJwtToken()}`
      }
    })

    const result = await data.json();

    if (result.success) {
      toast(result.message, {
        description: new Date().toLocaleString(),
      });
    } else {
      toast("failed to delete", {
        description: new Date().toLocaleString(),
      });
    }

    console.log(result)
    setRender(!render)
  }

  return (
    <Dialog>
      <form onSubmit={handleDelete}>
        <DialogTrigger asChild>
          <Button variant="outline"><Trash2/></Button>
        </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="text-red-500 font-bold">
            This action cannot be undone. This will permanently delete your project
            and remove your all data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          {/* Custom cancel button */}
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          {/* Delete button */}
          <DialogClose>
            <Button type="submit" className="bg-red-500">Delete</Button>
          </DialogClose>
        </div>

      </DialogContent>
      </form>
    </Dialog>
  )
}
