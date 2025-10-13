import { create } from 'zustand';
import type { Task } from '../models/task';

type TodoState = {
	userTasks: Record<string, Task[]>;
	currentUserId: string;
	setCurrentUserId: (id: string) => void;

	isModalOpen: boolean;
	setModalOpen: (open: boolean) => void;

	addTask: (task: Task) => void;
	toggleCompleted: (index: number) => void;
	toggleEditable: (index: number) => void;
	deleteTask: (index: number) => void;
	updateTask: (index: number, newText: string) => void;

	getTasksByUserId: (userId: string) => Task[];
};

export const useTodoStore = create<TodoState>((set, get) => ({
	userTasks: JSON.parse(localStorage.getItem('userTasks') || '{}'),
	currentUserId: '',
	isModalOpen: false,

	setCurrentUserId: (id: string) => set({ currentUserId: id }),

	setModalOpen: (open: boolean) => set({ isModalOpen: open }),

	addTask: (task: Task) => {
		const { currentUserId, userTasks } = get();
		const tasks = userTasks[currentUserId] || [];
		const updatedUserTasks = {
			...userTasks,
			[currentUserId]: [...tasks, task],
		};
		set({ userTasks: updatedUserTasks });
	},

	toggleCompleted: (index: number) => {
		const { currentUserId, userTasks } = get();
		const tasks = [...(userTasks[currentUserId] || [])];
		tasks[index].completed = !tasks[index].completed;
		const updatedUserTasks = { ...userTasks, [currentUserId]: tasks };
		set({ userTasks: updatedUserTasks });
	},

	toggleEditable: (index: number) => {
		const { currentUserId, userTasks } = get();
		const tasks = [...(userTasks[currentUserId] || [])];
		tasks[index].editable = !tasks[index].editable;
		const updatedUserTasks = { ...userTasks, [currentUserId]: tasks };
		set({ userTasks: updatedUserTasks });
	},

	deleteTask: (index: number) => {
		const { currentUserId, userTasks } = get();
		const tasks = [...(userTasks[currentUserId] || [])];
		tasks.splice(index, 1);
		const updatedUserTasks = { ...userTasks, [currentUserId]: tasks };
		set({ userTasks: updatedUserTasks });
	},

	updateTask: (index: number, newText: string) => {
		const { currentUserId, userTasks } = get();
		const tasks = [...(userTasks[currentUserId] || [])];
		tasks[index].text = newText;
		tasks[index].editable = false;
		const updatedUserTasks = { ...userTasks, [currentUserId]: tasks };
		set({ userTasks: updatedUserTasks });
	},

	getTasksByUserId: (userId: string) => {
		const tasks = get().userTasks[userId] || [];
		return tasks;
	},
}));
