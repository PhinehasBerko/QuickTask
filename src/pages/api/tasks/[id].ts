import  type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("quicktask");
    const collection = db.collection("tasks");

    switch (req.method) {
        case "GET":
            try {
                const tasks = await collection.find({}).toArray();
                res.status(200).json(
                    {success: true,
                    data: tasks
                    }
                );
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Failed to fetch tasks",
                    error: error instanceof Error ? error.message : "Unknown error"
                });
            }
            break;

            case "POST":
                try {
                    const {title, description} = req.body;

                    if (!title || title.trim() === "") {
                        return res.status(400).json({
                            success: false,
                            message: "Title is required"
                        });
                    }

                    const newTask = {
                        title,
                        description: description || "",
                        status: "pending",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    };

                    const result = await collection.insertOne(newTask);
                    res.status(201).json({
                        success: true,
                        data: result.ops?.[0] ?? newTask
                    });
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        message: "Failed to create task",
                        error: error instanceof Error ? error.message : "Unknown error"
                    });
                }
                break;

                default:
                  res.setHeader('Allow', ['GET', 'POST']);
                  res.status(405).end(`Method ${req.method} Not Allowed`);
}
}
