import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { User } from '../models/user';

const LOCAL_STORAGE_KEY = 'usersList';

export const useUserTabs = () => {
	const { userId = '' } = useParams<{ userId: string }>();
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

	const [editMode, setEditMode] = useState(false);
	const [editedNames, setEditedNames] = useState<{ [id: string]: string }>(
		{},
	);

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

	const handleEditUsers = () => {
		setEditedNames(Object.fromEntries(users.map((u) => [u.id, u.name])));
		setEditMode(true);
	};

	const handleUserInput = (id: string, value: string) => {
		setEditedNames((prev) => ({ ...prev, [id]: value }));
	};

	const handleUserSave = () => {
		Object.entries(editedNames).forEach(([id, name]) => {
			const user = users.find((u) => u.id === id);
			if (user && name.trim() && name !== user.name) {
				updateUser(id, name.trim());
			}
		});
		setEditMode(false);
		setEditedNames({});
	};

	const handleUserCancel = () => {
		setEditMode(false);
		setEditedNames({});
	};

	const handleAddUser = () => {
		const name = prompt('Új felhasználó neve:');
		if (name) addUser(name);
	};

	const handleDeleteUser = (id: string) => {
		deleteUser(id);
		setEditedNames((prev) => {
			const copy = { ...prev };
			delete copy[id];
			return copy;
		});
	};

	return {
		userId,
		users,
		editMode,
		editedNames,
		setEditMode,
		setEditedNames,
		addUser,
		updateUser,
		deleteUser,
		handleEditUsers,
		handleUserInput,
		handleUserSave,
		handleUserCancel,
		handleAddUser,
		handleDeleteUser,
		setUsers,
	};
};
