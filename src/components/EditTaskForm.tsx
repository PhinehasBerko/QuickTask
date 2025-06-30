"use client"
import React, { useState } from 'react';
import {Task, TaskStatus}  from "@/types/task";
import toast from 'react-hot-toast';

interface Props {
    task: Task;
    onClose : () => void;
}

const EditTaskForm = ({task, onClose}: Props) => {
    const [title, setTitle]= useState(task.title);
    const [description, setDescription] = useState(task.description || "");
    const [status, setStatus] = useState<TaskStatus>(task.status);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/tasks/${task._id}`,{
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({title, description, status}),
            });
    
            if (res.ok) {
                toast.success("Task updated successfully😂");
                window.location.reload(); // SSR refresh
            } else {
                toast.error("Failed to  update task😭")
            }
        } catch (error) {
            console.error("Error updating task: ",error);
            toast.error("An unexpected error occurred")
        } finally {
            setIsSubmitting(false);
          }
    }
  return (
    <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

        <label className="block mb-2">

        <span className="text-sm font-medium">Title</span>
        <input 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mt-1" 
        required
        />
        </label> {/* I will look into it use htmlFor="" */}
        <label htmlFor="" className="block mb-2">
            <span className="text-sm font-medium">Description</span>
            <textarea 
                value={description}
                onChange={(e) =>setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
        </label>
        <label className="block mb-2">
            <span className="text-sm font-medium">Status</span>
            <select 
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
            </select>
        </label>

        <div className="flex justify-end gap-2">
            <button 
            className="px-4 py-2 rounded border text-gray-600"
            type='button'
            onClick={onClose}
            >
                Cancel
            </button>
            <button 
                type='submit'
                disabled = {isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {isSubmitting ? "Saving...": "Save"}
            </button>
        </div>
    </form>
  )
}

export default EditTaskForm