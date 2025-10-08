import type { Task } from './task';

export type User = {
	id: string;
	name: string;
	Tasks: Task[];
	editable: boolean;
};
