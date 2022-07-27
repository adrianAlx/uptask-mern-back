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

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, priority, deliveryDate, state } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { name, description, priority, deliveryDate, state },
      { new: true }
    );

    res.status(200).json({ msg: 'Tarea actualizada correctamente!', task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong!' });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    const project = await Project.findById(task.project);
    project.tasks.pull(task._id);
    await project.save();

    res.status(200).json({ msg: 'Tarea eleminada correctamente!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong!' });
  }
};
