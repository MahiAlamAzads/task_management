"use client"

import { GalleryVerticalEnd } from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar"

import {
  Item,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item"

import { AppSidebarProps } from "@/app/types/type"
import CreateTaskForm from "./CreateProject"
// import { useRouter } from "next/navigation"
import { EditProjectForm } from "./EditProjectForm"
import { DeleteProject } from "./DeleteProject"


export function AppSidebar({ allProjects, setRender, render, ...props }: AppSidebarProps) {
  // const router = useRouter();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Task Manager</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>

        {/* input for create project start */}
        <CreateTaskForm render={render} setRender={setRender} />
        {/* input for create project start */}

        <SidebarGroup>
          <SidebarMenu>
            {/* menu item starts */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <span className="font-medium">
                  All Projects
                </span>
              </SidebarMenuButton>

              <SidebarMenuSub>
                {allProjects.map((item) => (
                  // all project
                  <>
                  {/*edited here i can add justify "Items-Center" */}
                    <div key={item._id} className="flex w-full max-w-md flex-col gap-10">
                      <Item variant="outline" size="sm" asChild>
                        <div>
                          {/* <ItemMedia>
                            <BadgeCheckIcon fill="" className="size-5 text-white" /> //todo I will add percetage for how much task completed...
                          </ItemMedia> */}

                          <ItemContent>
                            <ItemTitle>{item.title}</ItemTitle>
                          </ItemContent>

                          <EditProjectForm projectId={item._id} render={render} setRender={setRender}/>

                          <DeleteProject projectId={item._id} render={render} setRender={setRender} />

                        </div>
                      </Item>
                    </div>
                  </>
                ))}
              </SidebarMenuSub>

            </SidebarMenuItem>
            {/* menu item ends*/}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
