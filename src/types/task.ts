export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
    _id?: string; // Optional for new tasks
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt?: Date; // Optional, will be set by the server
    updatedAt?: Date; // Optional, will be set by the server
}