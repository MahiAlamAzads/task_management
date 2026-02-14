import { taskCounter } from "@/app/helper/taskCounter";
import { CreateTaskForm } from "./CreateTask";
import { Button } from "./ui/button";
import { getStatusClass } from "@/app/helper/statusColorCheck";
import { ChevronDownIcon } from "lucide-react";
import { TaskType } from "@/app/types/type";

// can be a separated componenet easily
export default function AllTasks({ tasks = [], projectId, refetchTasks }: { tasks?: TaskType[]; projectId: string | undefined; refetchTasks: () => void }) {
    console.log("hfhdhdf", tasks)
    return (

        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" >
                    <CreateTaskForm projectId={projectId} onTaskCreated={refetchTasks} />
                </div>
                <div className="bg-muted/50 aspect-video rounded-xl" >
                    <div>
                        total task: {tasks.length}
                    </div>
                    <div>
                        total Pending: {taskCounter(tasks)[0]}
                    </div>
                    <div>
                        total in-progress: {taskCounter(tasks)[1]}
                    </div>
                    <div>
                        total completed: {taskCounter(tasks)[2]}
                    </div>
                </div>
                <div className="bg-muted/50 aspect-video rounded-xl" >
                    success: {taskCounter(tasks)[2] ? (taskCounter(tasks)[2] * 100) / tasks.length : "Please make a progression"}
                </div>
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" >

                <div className="space-y-4 p-4">
                    {tasks.map((task, index) => (
                        <div
                            key={task._id || index}
                            className="group flex justify-between items-start p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
                        >
                            {/* Left side: title + optional comment */}
                            <div className="flex flex-col break-words whitespace-normal w-40 sm:w-70 md:w-90 lg:w-150">
                                <p className="text-base font-semibold text-gray-800 line-clamp-2">
                                   {`${index + 1}. ${task.title}`}
                                </p>
                                {task.comment && (
                                    <p className="text-sm text-gray-500 mt-1 leading-snug line-clamp-3">
                                        {task.comment}
                                    </p>
                                )}
                            </div>

                            {/* Right side: status + chevron */}
                            <div className="flex items-center justify-center gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={(e) => e.stopPropagation()}
                                    className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusClass(
                                        task.status
                                    )}`}
                                >
                                    {task.status}
                                </Button>

                                <ChevronDownIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform group-data-[state=open]:rotate-180" />
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>

    )
}