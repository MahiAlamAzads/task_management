import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { ChevronDown, ShieldAlertIcon } from "lucide-react"
import { getJwtToken } from '@/app/helper/token'
import { CreateTaskForm } from './CreateTask'
import { TaskType } from '@/app/types/type'
import { taskCounter } from '@/app/helper/taskCounter'
// import { Collapsible } from 'radix-ui'
import { CollapsibleBasic } from './Collapsible'
import { Card, CardContent } from "@/components/ui/card"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"
import { Textarea } from './ui/textarea'
import { getStatusClass } from '@/app/helper/statusColorCheck'
import AllTasks from './AllTasks'


const Task = ({ projectForTask }: { projectForTask: string | undefined }) => {
    const [tasks, setTasks] = useState();

    // Refetch function
    const fetchData = async () => {
        try {
            console.log("check: ", projectForTask)
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${projectForTask}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${getJwtToken()}`,
                    "Cache-Control": "no-cache", // force fresh fetch
                },
            })
            const data = await res.json()
            setTasks(data.result)
            console.log("project for task inside:", Array.isArray(tasks))
        } catch (error) {
            console.error(error, "from your code")
        }
    };

    useEffect(() => {
        fetchData();
    }, [projectForTask]);

    return (
        <>
            {tasks ? <AllTasks projectId={projectForTask} tasks={tasks} refetchTasks={fetchData} /> : <DemoBeforeLoad />}
        </>
    )
}


export default Task


function DemoBeforeLoad() {
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-muted/50 aspect-video rounded-xl" ></div>
                    <div className="bg-muted/50 aspect-video rounded-xl" ></div>
                    <div className="bg-muted/50 aspect-video rounded-xl" ></div>
                </div>
                <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" ></div>
            </div>
        </>
    )
}





{/* <Item variant="outline">
    <ItemContent>
        <ItemTitle>Security Alert</ItemTitle>
        <ItemDescription>
            New login detected from unknown device.
        </ItemDescription>
    </ItemContent>
    <ItemActions>
        <Button size="sm" variant="outline">
            {task.status}
        </Button>
    </ItemActions>
</Item> */}