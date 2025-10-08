import type { User } from '../models/user';
import UserTabButton from './UserTabButton';

type EditUserTabsProps = {
	users: User[];
	editedNames: { [id: string]: string };
	onNameChange: (id: string, name: string) => void;
	onDeleteUser: (id: string) => void;
	onSave: () => void;
	onCancel: () => void;
};

const EditUserTabs = ({
	users,
	editedNames,
	onNameChange,
	onDeleteUser,
	onSave,
	onCancel,
}: EditUserTabsProps) => (
	<div className="user-tabs">
		{users.map((user) => (
			<span key={user.id} className="user-tab user-tab-edit">
				<input
					className="user-tab-input"
					value={editedNames[user.id] ?? user.name}
					onChange={(e) => onNameChange(user.id, e.target.value)}
				/>
				<UserTabButton
					ariaLabel="Törlés"
					className="user-tab-btn delete"
					onClick={() => onDeleteUser(user.id)}
					label="✖"
				/>
			</span>
		))}
		<UserTabButton
			ariaLabel="Mentés"
			className="user-tab-btn save"
			onClick={onSave}
			label="✔"
		/>
		<UserTabButton
			ariaLabel="Mégse"
			className="user-tab-btn cancel"
			onClick={onCancel}
			label="✖"
		/>
	</div>
);

export default EditUserTabs;
