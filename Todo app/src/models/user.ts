import type { Task } from './task';

export type User = {
	id: string | number;
	name: string;
	Tasks: Task[];
	editable: boolean;
};
