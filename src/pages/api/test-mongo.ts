import clientPromise from "@/lib/mongodb";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db('quicktask');
        const tasks = await db.collection('task').find({}).toArray();
        res.status(200).json({success: true, data: tasks, message: 'Tasks fetched successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, error: 'Database connection failed'})
    }
}