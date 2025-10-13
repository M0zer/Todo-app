import { useEffect } from 'react';
import { useTodoStore } from './useTodoStore';

const SyncLocalStorage = () => {
	const userTasks = useTodoStore((state) => state.userTasks);
	useEffect(() => {
		localStorage.setItem('userTasks', JSON.stringify(userTasks));
	}, [userTasks]);
	return null;
};

export default SyncLocalStorage;
