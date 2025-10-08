import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useUserTabs } from './useUserTabs';

const UserTabs = () => {
	const { users, addUser, updateUser, deleteUser } = useUserTabs();
	const { userId = '' } = useParams<{ userId: string }>();
	const [editMode, setUserEditMode] = useState(false);
	const [editedNames, setUserEditedNames] = useState<{
		[id: string]: string;
	}>({});

	const handleEditUsers = () => {
		setUserEditedNames(
			Object.fromEntries(users.map((u) => [u.id, u.name])),
		);
		setUserEditMode(true);
	};

	const handleUserInput = (id: string, value: string) => {
		setUserEditedNames((prev) => ({ ...prev, [id]: value }));
	};

	const handleUserSave = () => {
		Object.entries(editedNames).forEach(([id, name]) => {
			if (name.trim() && name !== users.find((u) => u.id === id)?.name) {
				updateUser(id, name.trim());
			}
		});
		setUserEditMode(false);
		setUserEditedNames({});
	};

	const handleUserCancel = () => {
		setUserEditMode(false);
		setUserEditedNames({});
	};

	const handleAddUser = () => {
		const name = prompt('Új felhasználó neve:');
		if (name) addUser(name);
	};
	const handleDeleteUser = (id: string) => {
		deleteUser(id);
		setUserEditedNames((prev) => {
			const copy = { ...prev };
			delete copy[id];
			return copy;
		});
	};

	return editMode ? (
		<div className="user-tabs">
			{users.map((user) => (
				<span key={user.id} className="user-tab user-tab-edit">
					<input
						className="user-tab-input"
						value={editedNames[user.id] ?? user.name}
						onChange={(e) =>
							handleUserInput(String(user.id), e.target.value)
						}
					/>
					<button
						aria-label="Törlés"
						className="user-tab-btn delete"
						onClick={() => handleDeleteUser(user.id)}
					>
						✖
					</button>
				</span>
			))}
			<button
				aria-label="Mentés"
				className="user-tab-btn save"
				onClick={handleUserSave}
			>
				✔
			</button>
			<button
				aria-label="Mégse"
				className="user-tab-btn cancel"
				onClick={handleUserCancel}
			>
				✖
			</button>
		</div>
	) : (
		<>
			<div className="user-tabs">
				{users.map((user) => (
					<Link
						key={user.id}
						to={`/todos/${user.id}`}
						className={`user-tab ${userId === String(user.id) ? 'user-tab-active' : ''}`}
					>
						{user.name}
					</Link>
				))}
				<button className="add-user" onClick={handleAddUser}>
					+
				</button>
			</div>
			<button className="edit-users" onClick={handleEditUsers}>
				Felhasználók szerkesztése
			</button>
		</>
	);
};

export default UserTabs;
