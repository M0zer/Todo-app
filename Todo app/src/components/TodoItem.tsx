import { useEffect, useState } from 'react';
import type { Task } from '../models/task';

const TodoItem = ({
	task,
	index,
	toggleCompleted,
	deleteTask,
	updateTask,
	toggleEditable,
}: {
	task: Task;
	index: number;
	toggleCompleted: (index: number) => void;
	deleteTask: (index: number) => void;
	updateTask: (index: number, newText: string) => void;
	toggleEditable: (index: number) => void;
}) => {
	const [inputValue, setInputValue] = useState(task.text);

	useEffect(() => {
		setInputValue(task.text);
	}, [task.text]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleSave = () => {
		updateTask(index, inputValue);
	};

	return (
		<>
			<li>
				<label>
					{!task.editable && (
						<>
							<p>{inputValue}</p>

							<button onClick={() => toggleCompleted(index)}>
								{task.completed ? 'Kész' : 'Nincs Kész'}
							</button>
						</>
					)}
					{task.editable && (
						<>
							<input
								id="todo-input"
								type="text"
								className="form-input"
								autoFocus
								value={inputValue}
								onChange={handleChange}
							/>
						</>
					)}
					<button
						onClick={() => {
							if (task.editable) {
								handleSave();
							} else {
								toggleEditable(index);
							}
						}}
					>
						{task.editable ? 'Kész' : 'Szerkesztés'}
					</button>
					<button onClick={() => deleteTask(index)}>Törlés</button>
				</label>
			</li>
		</>
	);
};

export default TodoItem;
