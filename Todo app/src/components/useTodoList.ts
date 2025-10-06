import { useState, useEffect } from 'react';
import type { Task } from '../models/task';

type UserTodos = {
	[userId: string]: Task[];
};

export const useTodoList = (userId: string) => {
	const [userTodosObj, setUserTodosObj] = useState<UserTodos>(() => {
		const saved = localStorage.getItem('userTodosObj');
		return saved ? JSON.parse(saved) : {};
	});

	const tasks = userTodosObj[userId] || [];

	const [isModalOpen, setModalOpen] = useState(tasks.length === 0);

	useEffect(() => {
		localStorage.setItem('userTodosObj', JSON.stringify(userTodosObj));
	}, [userTodosObj]);

	const setTasks = (newTasks: Task[]) => {
		setUserTodosObj((prev) => ({
			...prev,
			[userId]: newTasks,
		}));
	};

	const addTask = (item: Task) => {
		setTasks([...tasks, item]);
	};

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

	const completedCount = tasks.filter((task) => task.completed).length;
	const notCompletedCount = tasks.length - completedCount;

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
