import TodoButton from './TodoButton';
import TodoItem from './TodoItem';

import TodoCounter from './TodoCounter';
import TodoForm from './TodoForm';
import { useTodoList } from './useTodoList';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Todolist = () => {
	const { userId = '' } = useParams<{ userId: string }>();
	const {
		tasks,
		isModalOpen,
		setModalOpen,
		completedCount,
		notCompletedCount,
		toggleCompleted,
		toggleEditable,
		addTask,
		deleteTask,
		updateTask,
	} = useTodoList(userId);

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
		if (tasks.length === 0) {
			setModalOpen(true);
		}
	}, [tasks, setModalOpen]);

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

export default Todolist;
