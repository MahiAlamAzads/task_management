import { Project } from "../types/type";
import { getJwtToken } from "./token";

export async function fetchProjects(setProjects: React.Dispatch<React.SetStateAction<Project[]>>) {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/`, {
        method: "GET",
        headers: {
            "authorization": `Bearer ${getJwtToken()}`,
            "Content-Type": "application/json"
        },
    })
    const data = await result.json();
    console.log("fixing: ", data)
    setProjects(data.result)
    return data;
}