import { Sidebar } from "@/components/ui/sidebar";
import { Dispatch, SetStateAction } from "react";

export interface Project {
  _id: string;
  title: string;
  user: string;
  taskCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  comment?: string; // optional because not all objects have it
}


export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  allProjects: Project[]; // or whatever type you defined
  setRender: Dispatch<SetStateAction<boolean | undefined>>; //todo: need to edit its just placeholder
  render: boolean | undefined;
  setProjectForTask: Dispatch<SetStateAction<string | undefined>>;
}

export type CreateProjectFormProps = {
  setRender: Dispatch<SetStateAction<boolean | undefined>>;
  render: boolean | undefined;
};


type ProjectRenderProps = {
  projectId: string;
  setRender: Dispatch<SetStateAction<boolean | undefined>>;
  render: boolean | undefined;
};

export type DeleteProjectType = ProjectRenderProps;

export type EditProjectType = ProjectRenderProps;
