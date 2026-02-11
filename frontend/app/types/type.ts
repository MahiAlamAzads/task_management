import { Sidebar } from "@/components/ui/sidebar";

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
  render: boolean | undefined; //todo: need to edit its just placeholder
}
