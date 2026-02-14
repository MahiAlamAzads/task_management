import { TaskType } from "../types/type";

export function taskCounter(tasks: TaskType[]){
  let pendingCount = 0;
  let completedCount = 0;
  let inProgressCount = 0;
  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].status == "pending") pendingCount++;
    if(tasks[i].status == "in-progress") inProgressCount++;
    if(tasks[i].status == "completed") completedCount++;
  }
  return [pendingCount,inProgressCount,completedCount]  //pic
}