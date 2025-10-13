import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTodoStore } from './useTodoStore';
import TodoButton from './TodoButton';
import TodoItem from './TodoItem';
import TodoCounter from './TodoCounter';
import TodoForm from './TodoForm';

const TodoList = () => {
	const { userId = '' } = useParams<{ userId: string }>();
	const setCurrentUserId = useTodoStore((state) => state.setCurrentUserId);
	const getTasksByUserId = useTodoStore((state) => state.getTasksByUserId);
	const isModalOpen = useTodoStore((state) => state.isModalOpen);
	const setModalOpen = useTodoStore((state) => state.setModalOpen);
	const addTask = useTodoStore((state) => state.addTask);
	const toggleCompleted = useTodoStore((state) => state.toggleCompleted);
	const toggleEditable = useTodoStore((state) => state.toggleEditable);
	const deleteTask = useTodoStore((state) => state.deleteTask);
	const updateTask = useTodoStore((state) => state.updateTask);

	useEffect(() => {
		setCurrentUserId(userId);
	}, [userId, setCurrentUserId]);

	const tasks = getTasksByUserId(userId);

	useEffect(() => {
		if (tasks.length === 0) {
			setModalOpen(true);
		}
	}, [tasks, setModalOpen]);

	const completedCount = tasks.filter((task) => task.completed).length;
	const notCompletedCount = tasks.length - completedCount;

	return (
		<div className="parent-container">
			<ul id="todo-list">
				{tasks.map((item, index) => (
					<TodoItem
						key={item.id}
						index={index}
						task={item}
						toggleCompleted={toggleCompleted}
						deleteTask={deleteTask}
						updateTask={updateTask}
						toggleEditable={toggleEditable}
					/>
				))}
			</ul>
			<TodoCounter todo={notCompletedCount} done={completedCount} />
			<TodoButton setModalOpen={setModalOpen} />
			{isModalOpen && (
				<TodoForm
					onClose={() => setModalOpen(false)}
					addTask={addTask}
				/>
			)}
		</div>
	);
};

export default TodoList;
