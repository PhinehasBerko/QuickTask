import React from "react";

import { Task } from "@/types/task";

interface TaskCardProps {
    task : Task;
}

const TaskCard =({task}: TaskCardProps) => {
    return (
        <div className="bg-white shadow rounded-lg p-4 mb-4 border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500">Status: {task.status}</p>
            <p className="text-xs text-gray-400">Created at: {new Date(task.createdAt ?? "").toLocaleDateString()}</p>
        </div>
    )
}

export default TaskCard;
// This component displays a single task card with title, description, and status.
// It can be used in the tasks list page to render each task.
// The TaskCard component is designed to be reusable and can be styled further as needed.
