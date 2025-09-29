import { useState } from 'react';
import TodoButton from './TodoButton';
import TodoItem from './TodoItem';
import type { Task } from '../models/task';
import TodoCounter from './TodoCounter';
import TodoForm from './TodoForm';

const Todolist = () => {
	const [tasks, setTasks] = useState<Task[]>([
		{ id: 10, text: 'első feladatom', completed: false, editable: false },
		{ id: 11, text: 'másdik feladatom', completed: false, editable: false },
		{
			id: 12,
			text: 'harmadik feladatom',
			completed: false,
			editable: false,
		},
		{
			id: 13,
			text: 'negyedik feladatom',
			completed: false,
			editable: false,
		},
	]);

	const [isModalOpen, setModalOpen] = useState(false);

	const completedCount = tasks.filter((task) => task.completed).length;
	const notCompletedCount = tasks.length - completedCount;

	const toggleCompleted = (index: number) => {
		const newTasks = [...tasks];
		newTasks[index].completed = !newTasks[index].completed;
		setTasks(newTasks);
	};
	const toggleEditable = (index: number) => {
		const newTasks = [...tasks];
		newTasks[index].editable = !newTasks[index].editable;
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
	const updateTask = (index: number, newText: string) => {
		const newTasks = [...tasks];
		newTasks[index].text = newText;
		newTasks[index].editable = !newTasks[index].editable;
		console.log(newTasks[index].text, newTasks[index].editable);
		setTasks(newTasks);
	};

	return (
		<div className="parent-container">
			<h1>Todo list</h1>
			<ul id="todo-list">
				{tasks.map((item, index) => (
					<TodoItem
						key={item.id}
						index={index}
						task={item}
						toggleCompleted={toggleCompleted}
						deleteTask={deleteTask}
						updateTask={updateTask}
						toggleEditable={toggleEditable}
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
