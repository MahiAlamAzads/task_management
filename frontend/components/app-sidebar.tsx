"use client"
import * as React from "react"
import { GalleryVerticalEnd, PlusIcon } from "lucide-react"

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
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { AppSidebarProps } from "@/app/types/type"
import CreateTaskForm from "./CreateProject"


export function AppSidebar({ allProjects, ...props }: AppSidebarProps) {

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
        <CreateTaskForm />
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
                    <div className="flex w-full max-w-md flex-col gap-6">
                      <Item variant="outline" size="sm" asChild>
                        <a href="#">
                          {/* <ItemMedia>
                            <BadgeCheckIcon fill="" className="size-5 text-white" /> //todo I will add percetage for how much task completed...
                          </ItemMedia> */}
                          <ItemContent>
                            <ItemTitle>{item.title}</ItemTitle>
                          </ItemContent>
                          <ItemActions>
                            <ChevronRightIcon className="size-4" />
                          </ItemActions>
                        </a>
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
