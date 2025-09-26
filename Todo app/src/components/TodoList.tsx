import { useState } from 'react';
import TodoButton from './TodoButton';
import TodoItem from './TodoItem';
import type { Task } from '../models/task';
import TodoCounter from './TodoCounter';
import TodoForm from './TodoForm';

const Todolist = () => {
	const [tasks, setTasks] = useState<Task[]>([
		{ text: 'első feladatom', completed: false },
		{ text: 'másdik feladatom', completed: false },
		{ text: 'harmadik feladatom', completed: false },
		{ text: 'negyedik feladatom', completed: false },
	]);

	const [isModalOpen, setModalOpen] = useState(false);

	const completedCount = tasks.filter((task) => task.completed).length;
	const notCompletedCount = tasks.length - completedCount;

	const toggleCompleted = (index: number) => {
		const newTasks = [...tasks];
		newTasks[index].completed = !newTasks[index].completed;
		setTasks(newTasks);
	};
	const addTask = (item: Task) => {
		const newTasks = [...tasks];
		newTasks.push(item);
		setTasks(newTasks);
	};
	const deleteTask = (index: number) => {
		const newTasks = [...tasks];
		newTasks.splice(index, 1);
		setTasks(newTasks);
	};

	return (
		<div className="parent-container">
			<h1>Todo list</h1>
			<ul id="todo-list">
				{tasks.map((item, index) => (
					<TodoItem
						key={index}
						index={index}
						task={item}
						toggleCompleted={toggleCompleted}
						deleteTask={deleteTask}
					/>
				))}
			</ul>
			<TodoCounter todo={notCompletedCount} done={completedCount} />
			<TodoButton setModalOpen={setModalOpen} />
			{isModalOpen && (
				<TodoForm
					onClose={() => setModalOpen(false)}
					addTask={addTask}
				/>
			)}
		</div>
	);
};

export default Todolist;
