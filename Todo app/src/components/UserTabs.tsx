import { useUserTabs } from './useUserTabs';
import EditUserTabs from './EditUserTabs';
import ViewUserTabs from './ViewUserTabs';

const UserTabs = () => {
	const {
		userId,
		users,
		editMode,
		editedNames,
		handleEditUsers,
		handleUserInput,
		handleUserSave,
		handleUserCancel,
		handleAddUser,
		handleDeleteUser,
	} = useUserTabs();
	return editMode ? (
		<EditUserTabs
			users={users}
			editedNames={editedNames}
			onNameChange={handleUserInput}
			onDeleteUser={handleDeleteUser}
			onSave={handleUserSave}
			onCancel={handleUserCancel}
		/>
	) : (
		<ViewUserTabs
			users={users}
			currentUserId={userId}
			onAddUser={handleAddUser}
			onEditUsers={handleEditUsers}
		/>
	);
};

export default UserTabs;
