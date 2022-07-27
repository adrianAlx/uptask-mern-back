import { Project, Task } from '../models';

export const createTask = async (req, res) => {
  const { name, description, priority, project, deliveryDate } = req.body;

  try {
    const newTask = new Task({
      name,
      description,
      priority,
      project,
      deliveryDate,
    });
    await newTask.save();

    // Add this task to its project
    const itsProject = await Project.findById(project);
    itsProject.tasks.push(newTask);
    await itsProject.save();

    res.status(201).json({
      msg: 'Tarea creada satisfactoriamente!',
      task: newTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong!' });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate('project', 'name');

  res.status(200).json({ task });
};
