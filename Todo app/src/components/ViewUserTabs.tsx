import { Link } from 'react-router-dom';
import UserTabButton from './UserTabButton';
import type { User } from '../models/user';

type ViewUserTabsProps = {
	users: User[];
	currentUserId: string;
	onAddUser: () => void;
	onEditUsers: () => void;
};

const ViewUserTabs = ({
	users,
	currentUserId,
	onAddUser,
	onEditUsers,
}: ViewUserTabsProps) => (
	<>
		<div className="user-tabs">
			{users.map((user) => (
				<Link
					key={user.id}
					to={`/todos/${user.id}`}
					className={`user-tab ${currentUserId === String(user.id) ? 'user-tab-active' : ''}`}
				>
					{user.name}
				</Link>
			))}
			<UserTabButton
				ariaLabel="Új felhasználó"
				className="add-user"
				onClick={onAddUser}
				label="+"
			/>
		</div>
		<UserTabButton
			ariaLabel="Felhasználók szerkesztése"
			className="edit-users"
			onClick={onEditUsers}
			label="Felhasználók szerkesztése"
		/>
	</>
);

export default ViewUserTabs;
