import dbConnect from '../../../utils/dbConnect';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  try {
    // Establish a connection to the database
    await dbConnect();
    console.log('Connected to MongoDB');

    if (req.method === 'GET') {
      console.log('Handling GET request for tasks');
      const tasks = await Task.find({});
      console.log('Tasks found:', tasks);
      res.status(200).json({ success: true, data: tasks });
    } else if (req.method === 'POST') {
      console.log('Handling POST request for tasks', req.body);
      const task = new Task(req.body);
      const savedTask = await task.save();
      console.log('Task saved:', savedTask);
      res.status(201).json({ success: true, data: savedTask });
    } else {
      console.log('Method not allowed');
      res.status(405).json({ success: false, message: "Method not allowed" });
    }
  } catch (error) {
    console.error('Error in tasks API route:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}
