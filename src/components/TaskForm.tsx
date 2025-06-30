"use client";
import React,{useState} from 'react';
import toast from 'react-hot-toast';

const TaskForm = () => {
    const [title,setTitle] = useState("");
    const [description, setDescription]  = useState("");
    const [isSubmitting, setIsSubmitting]  = useState(false);

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        if(!title.trim()) return;

        setIsSubmitting(true);

        try {
            const res = await fetch("api/tasks",{
                method: "POST",
                headers: { "Content-type": "application/json"},
                body: JSON.stringify({title, description }),

            });
            
            if(res.ok) {
                toast.success("Task created successfully👍")
                // Refresh thet page (SSR behaviour)
                window.location.reload();
            } else {
                toast.error("Failed to add task 😭");

            }
        } catch (error) {
            console.error("Error adding task", error);
            toast.error("Failed to add task 😭")
        } finally {
            setIsSubmitting(false);
        }
    };
  return (
    <form onSubmit={handleSubmit} className='mb-6'>
        <div className="mb-2">
            <input 
            type="text" 
            placeholder='Task title'
            value={title}
            onChange={(e) =>setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2" required 
            />
        </div>
        <div className="mb-2">
            <textarea 
            name="description" 
            placeholder='Task description (optional)'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            />
        </div>
        <button 
        type='submit'
        disabled = {isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
            {isSubmitting ? "Adding ..." : "Add Task"}
        </button>
    </form>
  )
};

export default TaskForm;