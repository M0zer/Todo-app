// TodoContext.tsx
import { createContext, useState, type ReactNode } from 'react';
import type { Task } from '../models/task';

type UserTodos = {
	[userId: string]: Task[];
};

type TodoContextType = {
	todos: UserTodos;
	setTodos: (newTodos: UserTodos) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
	const [todos, setTodos] = useState<UserTodos>({});
	return (
		<TodoContext.Provider value={{ todos, setTodos }}>
			{children}
		</TodoContext.Provider>
	);
};

export default TodoContext;
