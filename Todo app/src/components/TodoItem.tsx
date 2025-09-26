import type { Task } from '../models/task';

const TodoItem = ({
	task,
	index,
	toggleCompleted,
	deleteTask,
}: {
	task: Task;
	index: number;
	toggleCompleted: (index: number) => void;
	deleteTask: (index: number) => void;
}) => {
	return (
		<>
			<li>
				<label>
					<p>{task.text}</p>
					<button onClick={() => toggleCompleted(index)}>
						{task.completed ? 'Kész' : 'Nincs Kész'}
					</button>
					<button onClick={() => deleteTask(index)}>Törlés</button>
				</label>
			</li>
		</>
	);
};

export default TodoItem;
