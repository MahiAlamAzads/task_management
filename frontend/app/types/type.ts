import { Sidebar } from "@/components/ui/sidebar";
import { Dispatch, SetStateAction } from "react";

export interface Project {
  _id: string;
  title: string;
  user: string;
  tasks: any[]; // you can replace `any[]` with a Task[] interface if you define tasks
  createdAt: string;
  updatedAt: string;
  __v: number;
  comment?: string; // optional because not all objects have it
}


export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  allProjects: Project[]; // or whatever type you defined
  setRender: Dispatch<SetStateAction<boolean | undefined>>; //todo: need to edit its just placeholder
  render: boolean | undefined;
}

export type CreateProjectFormProps = {
  setRender: Dispatch<SetStateAction<boolean | undefined>>;
  render: boolean | undefined;
};


export type DeleteTaskType = {
  projectId: string;
  setRender: Dispatch<SetStateAction<boolean | undefined>>;
  render: boolean | undefined;
}