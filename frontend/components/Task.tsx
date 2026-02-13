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
import { ShieldAlertIcon } from "lucide-react"
import { getJwtToken } from '@/app/helper/token'
import { CreateTaskForm } from './CreateTask'


const Task = ({ projectForTask }: { projectForTask: string | undefined }) => {
    const [tasks, setTasks] = useState();
    //   console.log("project for task outside:", tasks)
    //   console.log("project for task in <Task />", projectForTask)
    useEffect(() => {
        async function fetchData() {
            try {
                if(!projectForTask) return []
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
        }
        fetchData()
    }, [projectForTask])
    return (
        <>
            {tasks ? <AllTasks tasks={tasks} /> : <DemoBeforeLoad />}
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
                <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" ></div>
            </div>
        </>
    )
}

interface Task {
    _id: string;
    title: string;
    status: "pending" | "completed" | "in-progress"; // adjust to your backend values
    project: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
}

function AllTasks({ tasks = [] }: { tasks?: Task[] }) {
    console.log("hfhdhdf", tasks)
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-muted/50 aspect-video rounded-xl" >
                        <CreateTaskForm />
                    </div>
                    <div className="bg-muted/50 aspect-video rounded-xl" ></div>
                    <div className="bg-muted/50 aspect-video rounded-xl" ></div>
                </div>
                <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" >
                    {tasks.map((task) => (
                        <p key={task._id}>{task.title}</p>
                    ))}
                </div>
            </div>
        </>
    )
}