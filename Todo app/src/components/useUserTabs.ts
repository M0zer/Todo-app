import { useEffect, useState } from 'react';
import type { User } from '../models/user';

const LOCAL_STORAGE_KEY = 'usersList';

export const useUserTabs = () => {
	const [users, setUsers] = useState<User[]>(() => {
		const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
		return saved
			? JSON.parse(saved)
			: [
					{
						id: 'Default',
						name: 'Default',
						Tasks: [],
						editable: false,
					},
				];
	});

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
	}, [users]);

	const addUser = (name: string) => {
		const newUser: User = {
			id: crypto.randomUUID(),
			name,
			Tasks: [],
			editable: false,
		};
		setUsers((prev) => [...prev, newUser]);
	};

	const updateUser = (id: string, name: string) => {
		setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, name } : u)));
	};
	const deleteUser = (id: string) => {
		setUsers((prev) => prev.filter((user) => user.id !== id));
	};

	return { users, addUser, updateUser, deleteUser };
};
