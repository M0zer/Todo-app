import { useState } from 'react';
import type { Task } from '../models/task';

export const useTodoList = () => {
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
		const newTasks = [...tasks, item];
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
		setTasks(newTasks);
	};

	return {
		tasks,
		setTasks,
		isModalOpen,
		setModalOpen,
		completedCount,
		notCompletedCount,
		toggleCompleted,
		toggleEditable,
		addTask,
		deleteTask,
		updateTask,
	};
};
