"use client";
import React, { useState } from "react";

import { Task } from "@/types/task";
import Modal from "./Modal";
import EditTaskForm from "./EditTaskForm";

interface TaskCardProps {
    task : Task;
}

const TaskCard =({task}: TaskCardProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete  = async() =>{
        const confirmed = confirm("Are you sure you want to delete this task?");
        if(!confirmed) return;
        try {
            await fetch(`api/tasks/${task._id}`,{method: "DELETE",});
            window.location.reload();

        } catch (error) {
            console.error("Error deleting task", error);
        }
    }

    return (
        <>
            <div className="bg-white shadow rounded-lg p-4 mb-4 border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-semibold">{task.title}</h2>
                        <p className="text-gray-600">{task.description}</p>
                        <p className="text-sm text-gray-400 mt-1">Status: {task.status}</p>
                    </div>

                    <div className="flex gap-x-2">
                    <button     
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded text-sm"
                    >
                        Edit
                    </button>

                    <button 
                        onClick={handleDelete}
                        className="bg-red-200 hover:bg-red-400 px-3 py-1 rounded text-sm"
                    >
                        Delete
                    </button>
                    </div>


                </div>
            </div>   
            <Modal isOpen = {isEditing} onClose={() => setIsEditing(false)}>
                <EditTaskForm task={task} onClose={() =>setIsEditing(false)} />
                
            </Modal>
        </>
    )
}

export default TaskCard;
// This component displays a single task card with title, description, and status.
// It can be used in the tasks list page to render each task.
// The TaskCard component is designed to be reusable and can be styled further as needed.
