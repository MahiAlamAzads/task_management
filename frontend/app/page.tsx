"use client"
import { AppSidebar } from "@/components/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { fetchProjects } from "./helper/fetchProjects"
import { Project } from "./types/type"
import Link from "next/link"
import Task from "@/components/Task"

type ProjectIdForTask = string
export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [render, setRender] = useState<boolean | undefined>();
  const [projectForTask,setProjectForTask] = useState<string | undefined>();



  useEffect(() => {
    fetchProjects(setProjects);
  }, [render])



  console.log(projects);



  return (
    <SidebarProvider>
      <AppSidebar allProjects={projects} render={render} setRender={setRender} setProjectForTask={setProjectForTask} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Link href={"/login"}>Login</Link>
          </div>
        </header>
        <Task projectForTask={projectForTask}/>
      </SidebarInset>
    </SidebarProvider>
  )
}
