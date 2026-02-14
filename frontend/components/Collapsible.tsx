import { TaskType } from "@/app/types/type"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"

// import { ChevronDownIcon } from "@/registry/icons/__lucide__"

export function CollapsibleBasic({task}: {task: TaskType}) {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent>
        <Collapsible className="data-[state=open]:bg-muted rounded-md">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="group w-full">
              {task.title}
              <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
            <div>
              {task.status}
            </div>
            <Button size="xs">Learn More</Button>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
