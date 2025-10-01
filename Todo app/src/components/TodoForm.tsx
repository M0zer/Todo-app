import { useEffect, useState, type ChangeEvent } from 'react';
import type { Task } from '../models/task';

const TodoForm = ({
	onClose,
	addTask,
}: {
	onClose: () => void;
	addTask: (addTask: Task) => void;
}) => {
	const [inputValue, setInputValue] = useState('');
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};
	useEffect(() => {
		setInputValue('');
	}, []);

	const handleAddTask = () => {
		const uniqueId = crypto.randomUUID();
		addTask({
			id: uniqueId,
			text: inputValue,
			completed: false,
			editable: false,
		});
		setInputValue('');
	};

	return (
		<div className="modal-backdrop">
			<div className="modal-content">
				<label htmlFor="todo-input" className="form-label">
					Új feladat
				</label>
				<input
					id="todo-input"
					type="text"
					className="form-input"
					placeholder="Írd be a feladatot..."
					autoFocus
					value={inputValue}
					onChange={handleChange}
				/>
				<div className="form-actions">
					<button
						type="submit"
						className="form-button"
						onClick={handleAddTask}
					>
						Hozzáadás
					</button>
					<button
						type="button"
						className="form-button form-button--close"
						onClick={onClose}
					>
						Bezárás
					</button>
				</div>
			</div>
		</div>
	);
};

export default TodoForm;
