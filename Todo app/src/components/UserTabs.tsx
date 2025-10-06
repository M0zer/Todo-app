import { Link, useParams } from 'react-router-dom';
import type { User } from '../models/user';

const UserTabs = ({ users }: { users: User[] }) => {
	const { userId = '' } = useParams<{ userId: string }>();

	return (
		<div className="user-tabs">
			{users.map((user: User) => (
				<Link
					key={user.id}
					to={`/todos/${user.id}`}
					className={`user-tab ${userId === String(user.id) ? 'user-tab-active' : ''}`}
				>
					{user.name}
				</Link>
			))}
		</div>
	);
};

export default UserTabs;
