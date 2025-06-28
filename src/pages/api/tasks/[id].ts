import  type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("quicktask");
    const collection = db.collection("tasks");
    const {id} = req.query;

    if(!ObjectId.isValid(id as string)){
        return res.status(400).json({
            success: false,
            message: "Invalid task ID"
        });
    }

    const  _id = new ObjectId(id as string);

    switch (req.method) {
        case "PUT":
            try {
                const {title, description, status} = req.body;
                const updateDoc = {
                    $set:{
                        ...title && {title},
                        ...description && {description},
                        ...status && {status},
                        updatedAt: new Date(),
                    },
                };

                const task = await collection.updateOne({_id},updateDoc);
                res.status(200).json(
                    {success: true,
                    data: task
                    }
                );
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Failed to update    task",
                    error: error instanceof Error ? error.message : "Unknown error"
                });
            }
            break;

            case "DELETE":
                try {
                    const task = await collection.deleteOne({_id});                
                    res.status(200).json({
                        success: true,
                        data: task
                    });
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        message: "Failed to delete task",
                        error: error instanceof Error ? error.message : "Unknown error"
                    });
                }
                break;

                default:
                  res.setHeader('Allow', ['PUT', 'DELETE']);
                  res.status(405).end(`Method ${req.method} Not Allowed`);
}
}
