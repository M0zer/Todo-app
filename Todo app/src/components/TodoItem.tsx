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
	}, [task.text, task.editable]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleSave = () => {
		updateTask(index, inputValue);
	};
	const handleCancel = () => {
		setInputValue(task.text);
		toggleEditable(index);
	};

	return (
		<>
			<li>
				<label>
					{!task.editable ? (
						<>
							<p>{inputValue}</p>
							<button onClick={() => toggleEditable(index)}>
								Szerkesztés
							</button>
							<button onClick={() => toggleCompleted(index)}>
								{task.completed ? 'Kész' : 'Nincs Kész'}
							</button>
						</>
					) : (
						<>
							<input
								id="todo-input"
								type="text"
								className="form-input"
								value={inputValue}
								onChange={handleChange}
							/>
							<button onClick={handleSave}>Módosít</button>
							<button onClick={handleCancel}>Mégse</button>
						</>
					)}
					<button onClick={() => deleteTask(index)}>Törlés</button>
				</label>
			</li>
		</>
	);
};

export default TodoItem;
