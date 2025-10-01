import TodoButton from './TodoButton';
import TodoItem from './TodoItem';

import TodoCounter from './TodoCounter';
import TodoForm from './TodoForm';
import { useTodoList } from './useTodoList';
import { useEffect } from 'react';

const Todolist = () => {
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
	} = useTodoList();

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	return (
		<div className="parent-container">
			<h1>Todo list</h1>
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
