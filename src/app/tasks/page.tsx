import React from 'react';
import { Task } from '@/types/task';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';

async function getTasks(): Promise<Task[]> {
    const res = await fetch ("http://localhost:3000/api/tasks", {
        cache: 'no-store', // Ensures fresh data on each request)
})
    if(!res.ok) {
        console.error("Failed to fetch tasks");
        return [];
    }
    const result = await res.json();
    return result.data as Task[];
}

const TasksPage = async() => {
    const tasks = getTasks();
    return(
        <main className ="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
            
            <TaskForm />
            {(await tasks).length === 0 ? (
                <p className='text-gray-500'> No tasks yet.</p>) :(
                    (await tasks).map((task) => <TaskCard key={task._id} task={task} />)
                )
            }
        </main>
    )
}

export default TasksPage;